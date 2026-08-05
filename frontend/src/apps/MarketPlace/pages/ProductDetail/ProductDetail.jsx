import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Eye,
  FileText,
  Flame,
  Loader2,
  Maximize2,
  RefreshCw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import PriceDisplay from "../../../../components/common/PriceDisplay";
import ShareModal from "../../../../components/common/ShareModal";
import FormattedText from "../../../../components/FormattedText";
import ReviewForm from "../../../../components/Reviews/ReviewForm";
import ReviewList from "../../../../components/Reviews/ReviewList";
import ProductSchema, {
  BreadcrumbSchema,
} from "../../../../components/SEO/SchemaMarkup";
import { useAddToCartMutation } from "../../../../store/cart/cartApi";
import RecommendationSection from "../../common/components/RecommendationSection";
import WishlistButton from "../../common/components/WishlistButton";
import UrgencyBadge from "../../common/components/UrgencyBadge";
import RecentPurchaseToast from "../../common/components/RecentPurchaseToast";
import MarketPlaceSEO from "../../components/SEO/MarketPlaceSEO";
import { useCurrency } from "../../context/CurrencyContext";
import { useGetProductByIdQuery } from "../../store/api/marketplaceApi";
import { selectIsAuthenticated } from "../../store/auth/authSlice";
import { addToCart } from "../../store/cart/cartSlice";

/* ───────────────────────── Skeleton Loading Component ───────────────────────── */
const ProductDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-14 flex items-center gap-4">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-px bg-gray-200"></div>
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery skeleton */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200">
            <div className="aspect-video rounded-xl bg-gray-200 animate-pulse"></div>
            <div className="flex gap-2 mt-2 px-2 pb-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 rounded-lg bg-gray-200 animate-pulse flex-shrink-0"></div>
              ))}
            </div>
          </div>
          {/* Info skeleton */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-3">
              <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-4 pt-6 border-t border-gray-100">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-48 w-full bg-gray-100 rounded-xl animate-pulse mt-4"></div>
          </div>
        </div>
        {/* Sidebar skeleton */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-14 w-full bg-blue-100 rounded-xl animate-pulse"></div>
            <div className="h-14 w-full bg-gray-100 rounded-xl animate-pulse"></div>
            <div className="h-14 w-full bg-gray-100 rounded-xl animate-pulse"></div>
            <div className="space-y-3 pt-4 border-t border-gray-100">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ───────────────────────── Discount Badge Component ───────────────────────── */
const AnimatedDiscountBadge = ({ price, originalPrice }) => {
  if (!originalPrice || originalPrice <= price) return null;
  const percent = Math.round(((originalPrice - price) / originalPrice) * 100);
  if (percent <= 0) return null;

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-green-500/30 animate-pulse"
    >
      <Flame className="h-3 w-3" />
      SAVE {percent}%
    </motion.span>
  );
};

/* ───────────────────────── FAQ Accordion Item ───────────────────────── */
const FaqItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <span className="font-medium text-gray-900 pr-4">{question}</span>
      <ChevronDown
        className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ───────────────────────── Main Component ───────────────────────── */
const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const galleryImageRef = useRef(null);
  const reviewsSectionRef = useRef(null);

  // Fetch real product data
  const {
    data: productData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const product = productData?.product || productData;
  const { getPrice, formatPrice } = useCurrency();
  const priceData = getPrice(product);

  const imageCount = product?.images?.length || 0;

  // Auto-scroll product images when not interacted with
  useEffect(() => {
    if (!isAutoScrolling || isLightboxOpen || imageCount <= 1) return;

    const timer = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % imageCount);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoScrolling, isLightboxOpen, imageCount]);

  // [Improvement #4] Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev === 0 ? imageCount - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev === imageCount - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, imageCount]);

  // Handle add to cart
  const [addToCartApi, { isLoading: isAdding }] = useAddToCartMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleAddToCart = async () => {
    if (!product) return;

    if (isAuthenticated) {
      try {
        await addToCartApi({
          productId: product._id,
          quantity: 1,
        }).unwrap();
        toast.success("Added to cart!");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to add to cart");
      }
    } else {
      dispatch(
        addToCart({
          id: product._id,
          itemId: product._id,
          itemType: "product",
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          regionalPricing: product.regionalPricing,
          image: product.images?.[0]?.url,
          quantity: 1,
        }),
      );
      toast.success("Added to cart!");
    }
  };

  // [Improvement #8] Buy Now handler
  const handleBuyNow = async () => {
    if (!product) return;

    if (isAuthenticated) {
      try {
        await addToCartApi({
          productId: product._id,
          quantity: 1,
        }).unwrap();
        navigate("/marketplace/checkout");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to process");
      }
    } else {
      dispatch(
        addToCart({
          id: product._id,
          itemId: product._id,
          itemType: "product",
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          regionalPricing: product.regionalPricing,
          image: product.images?.[0]?.url,
          quantity: 1,
        }),
      );
      navigate("/marketplace/checkout");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  // Copy link handler for breadcrumb
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  }, []);

  // Smooth scroll to reviews tab
  const scrollToReviews = useCallback(() => {
    setActiveTab("reviews");
    setTimeout(() => {
      reviewsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  // [Improvement #5] Zoom on hover handler
  const handleZoomMove = useCallback((e) => {
    if (!galleryImageRef.current) return;
    const rect = galleryImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
    setIsZooming(true);
  }, []);

  const handleZoomLeave = useCallback(() => {
    setZoomStyle({});
    setIsZooming(false);
  }, []);

  // [Improvement #7] Generate product-specific FAQs
  const getProductFaqs = useCallback(() => {
    if (!product) return [];

    const licenseName = (product.license || "personal").charAt(0).toUpperCase() + (product.license || "personal").slice(1);

    const faqs = [
      {
        question: "What do I get after purchasing?",
        answer: `After completing your purchase, you'll receive instant access to download all included files. ${
          product.downloadFiles?.length
            ? `This product includes ${product.downloadFiles.length} file(s) in ${[...new Set(product.downloadFiles.map(f => f.format || "ZIP"))].join(", ")} format.`
            : "All files will be available in your dashboard immediately."
        }`,
      },
      {
        question: "What license is included?",
        answer: `This product comes with a ${licenseName} License. ${
          product.license === "personal"
            ? "You can use it for personal, non-commercial projects."
            : product.license === "commercial"
              ? "You can use it for both personal and commercial projects."
              : "You can use it for personal, commercial, and client projects with extended rights."
        }`,
      },
      {
        question: "Will I receive updates?",
        answer: `Yes! All purchases include free lifetime updates. The current version is v${product.version || "1.0.0"}, last updated on ${new Date(product.lastUpdated || product.updatedAt).toLocaleDateString()}.`,
      },
      {
        question: "Can I get a refund?",
        answer: "We offer refunds within 7 days of purchase if the product doesn't match its description or has major issues. Since digital products can be downloaded immediately, refund requests are reviewed on a case-by-case basis.",
      },
    ];

    if (product.requirements?.length > 0) {
      faqs.push({
        question: "What are the system requirements?",
        answer: `To use this product, you'll need: ${product.requirements.join(", ")}.`,
      });
    }

    if (["notes", "ebooks", "courses"].includes(product.category?.toLowerCase())) {
      faqs.push({
        question: "Is this content up to date?",
        answer: `Yes, this content is regularly reviewed and updated to ensure accuracy. It was last updated on ${new Date(product.lastUpdated || product.updatedAt).toLocaleDateString()}.`,
      });
    }

    return faqs;
  }, [product]);

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "features", name: "Features" },
    { id: "files", name: "Files Included" },
    { id: "requirements", name: "Requirements" },
    { id: "faq", name: "FAQ" },
    { id: "reviews", name: "Reviews" },
  ];

  // [Improvement #2] Skeleton loading state
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load product
          </h1>
          <p className="text-gray-600 mb-4">
            {error?.data?.message || "Something went wrong"}
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {/* noindex: an unknown product slug returns 200 via the SPA fallback, so
            signal not-found to avoid a Soft 404. */}
        <MarketPlaceSEO title="Product Not Found" noindex={true} />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <Link
            to="/marketplace/products"
            className="text-blue-600 hover:underline"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const rawSeoTitle = product.seo?.metaTitle || product.title;
  const cleanSeoTitle = rawSeoTitle.length > 46 ? rawSeoTitle.substring(0, 43) + "..." : rawSeoTitle;

  const rawSeoDesc = product.seo?.metaDescription || product.description;
  const cleanSeoDesc = rawSeoDesc.length > 160 ? rawSeoDesc.substring(0, 157) + "..." : rawSeoDesc;

  // [Improvement #6] Sales/download count
  const salesCount = product.analytics?.totalSales || product.totalSales || product.downloads || 0;

  // [Improvement #9] Check if category supports TOC
  const showToc = ["notes", "ebooks", "courses"].includes(product.category?.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketPlaceSEO
        title={cleanSeoTitle}
        description={cleanSeoDesc}
        image={product.images?.[0]?.url?.replace(
          '/upload/',
          '/upload/w_1200,h_630,c_fill,g_auto,f_jpg,q_auto/'
        )}
        type="product"
        canonical={`https://www.devkantkumar.com/marketplace/products/${product.slug || product._id}`}
        keywords={product.seo?.keywords?.length > 0 ? product.seo.keywords : [
          product.title,
          product.category,
          "buy",
          "download",
          "React template",
        ].filter(Boolean)}
        product={{
          price: product.price,
          currency: "INR",
          availability: product.isActive ? "in stock" : "out of stock",
          retailerItemId: product._id,
          brand: "Dev Kant Kumar Marketplace",
          category: product.category,
        }}
      />
      <ProductSchema product={product} reviews={product.reviews || []} />
      <BreadcrumbSchema
        items={[
          { name: "Marketplace", url: "/marketplace" },
          { name: "Products", url: "/marketplace/products" },
          {
            name: product.title,
            url: `/marketplace/products/${product.slug || product._id}`,
          },
        ]}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link
            to="/marketplace/products"
            className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline">Back to Products</span>
          </Link>
          <div className="h-4 w-px bg-gray-300 mx-4"></div>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
          {/* Copy link button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
            title="Copy product link"
          >
            {linkCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span className="hidden sm:inline text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-32 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Section */}
            <div
              className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 overflow-hidden"
              onMouseEnter={() => setIsAutoScrolling(false)}
              onMouseLeave={() => setIsAutoScrolling(true)}
            >
              {/* [Improvement #5] Zoom-enabled main image */}
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative group">
                <div
                  ref={galleryImageRef}
                  className="w-full h-full overflow-hidden"
                  onMouseMove={handleZoomMove}
                  onMouseLeave={handleZoomLeave}
                  onClick={() => setIsLightboxOpen(true)}
                  style={{ cursor: isZooming ? "zoom-out" : "zoom-in" }}
                >
                  <img
                    src={
                      product.images?.[selectedImageIndex]?.url ||
                      product.images?.[0]?.url ||
                      "/api/placeholder/800/450"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-200"
                    style={isZooming ? zoomStyle : {}}
                  />
                </div>

                {/* Expand / Lightbox overlay button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1 text-xs font-medium"
                  title="View full screen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* [Improvement #1] Image counter pill */}
                {imageCount > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span>{selectedImageIndex + 1} / {imageCount}</span>
                  </div>
                )}

                {/* Prev/Next navigation arrows on hover */}
                {imageCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) =>
                          prev === 0 ? imageCount - 1 : prev - 1
                        );
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) =>
                          prev === imageCount - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* [Improvement #1] Thumbnails + dot indicators */}
              {imageCount > 1 && (
                <>
                  {/* Dot indicators */}
                  <div className="flex justify-center gap-1.5 mt-2">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`rounded-full transition-all cursor-pointer ${
                          selectedImageIndex === idx
                            ? "w-6 h-2 bg-blue-600"
                            : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                  {/* Thumbnails list */}
                  <div className="flex gap-2 mt-2 px-2 pb-2 overflow-x-auto">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          selectedImageIndex === idx
                            ? "border-blue-600 ring-2 ring-blue-600/30 shadow-sm"
                            : "border-gray-200 hover:border-blue-400 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={`${product.title} — preview image ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-opacity duration-300"
                          style={{ backgroundColor: '#e5e7eb' }}
                          onLoad={(e) => { e.target.style.opacity = '1'; }}
                          onLoadStart={(e) => { if (e.target) e.target.style.opacity = '0.4'; }}
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* [Improvement #4] Lightbox / Fullscreen Modal with keyboard nav */}
            {isLightboxOpen && (
              <div
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setIsLightboxOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
                {/* Image counter in lightbox */}
                {imageCount > 1 && (
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
                    {selectedImageIndex + 1} / {imageCount}
                  </div>
                )}
                <div
                  className="relative max-w-5xl max-h-[90vh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={
                      product.images?.[selectedImageIndex]?.url ||
                      product.images?.[0]?.url
                    }
                    alt={product.title}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  />
                  {imageCount > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? imageCount - 1 : prev - 1
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === imageCount - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Product Info & Tabs */}
            <div ref={reviewsSectionRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 lg:p-8 pb-0">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                {/* Metadata row with sales count, rating, reading time */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                    {product.category}
                  </span>
                  <span>v{product.version || "1.0.0"}</span>
                  <span>•</span>
                  <span>
                    Updated{" "}
                    {new Date(
                      product.lastUpdated || product.updatedAt,
                    ).toLocaleDateString()}
                  </span>
                  {salesCount > 0 && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full font-medium">
                        <Download className="h-3.5 w-3.5" />
                        {salesCount > 999
                          ? `${(salesCount / 1000).toFixed(1)}k`
                          : salesCount}+ downloads
                      </span>
                    </>
                  )}
                  {product.views > 0 && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Eye className="h-3.5 w-3.5" />
                        {product.views > 999
                          ? `${(product.views / 1000).toFixed(1)}k`
                          : product.views} views
                      </span>
                    </>
                  )}
                  {/* Clickable star rating → scroll to reviews */}
                  {product.rating?.average > 0 && (
                    <>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={scrollToReviews}
                        className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2.5 py-0.5 rounded-full font-medium hover:bg-yellow-100 transition-colors cursor-pointer"
                      >
                        <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                        {product.rating.average.toFixed(1)}
                        <span className="text-yellow-600/70">({product.rating.count})</span>
                      </button>
                    </>
                  )}
                  {/* Reading time / page count for notes & ebooks */}
                  {showToc && (
                    <>
                      <span>•</span>
                      {product.downloadFiles?.some(f => f.size) ? (
                        <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
                          <FileText className="h-3.5 w-3.5" />
                          {(() => {
                            const totalBytes = product.downloadFiles.reduce((sum, f) => sum + (f.size || 0), 0);
                            const totalMB = totalBytes / 1024 / 1024;
                            const estimatedPages = Math.max(1, Math.round(totalMB * 8));
                            return `~${estimatedPages} pages`;
                          })()}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        {(() => {
                          const featureCount = product.features?.length || 0;
                          const readMins = Math.max(5, featureCount * 3);
                          return readMins >= 60 ? `${(readMins / 60).toFixed(1)} hr read` : `${readMins} min read`;
                        })()}
                      </span>
                    </>
                  )}
                </div>

                {/* Last purchased inline text */}
                {salesCount > 0 && (
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-gray-500">
                      <ShoppingBag className="h-3.5 w-3.5 inline mr-1 text-green-600" />
                      Last purchased <span className="font-medium text-gray-700">{(() => {
                        let h = 0;
                        const s = String(product._id || '');
                        for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
                        return Math.abs(h) % 45 + 2;
                      })()} minutes ago</span>
                    </span>
                  </div>
                )}

                <div className="lg:hidden mb-8 space-y-6 pb-6 border-b border-gray-100">
                  {/* [Improvement #10] Mobile price with animated discount badge */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <PriceDisplay
                      price={product.price}
                      originalPrice={product.originalPrice}
                      showOriginal={true}
                      className="text-3xl"
                      textClass="text-gray-900"
                    />
                    <AnimatedDiscountBadge price={product.price} originalPrice={product.originalPrice} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className="col-span-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isAdding ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ShoppingCart size={18} />
                      )}
                      {isAdding ? "Adding..." : "Add to Cart"}
                    </button>
                    {/* [Improvement #8] Buy Now button - mobile */}
                    <button
                      onClick={handleBuyNow}
                      disabled={isAdding}
                      className="col-span-1 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-green-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      <Zap size={18} />
                      Buy Now
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <WishlistButton
                      itemId={product._id}
                      type="product"
                      showText={true}
                      text="Wishlist"
                      className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    />
                    <button
                      onClick={handleShare}
                      className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    >
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
                  <UrgencyBadge productId={product._id} type="product" />
                </div>

                <FormattedText
                  text={product.description}
                  variant="full"
                  className="text-lg leading-relaxed mb-8"
                />
              </div>

              {/* Tabs Header */}
              <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 px-8 min-w-max">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabs Content */}
              <div className="p-6 lg:p-8 min-h-[300px]">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "overview" && (
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">
                        Product Overview
                      </h3>
                      <FormattedText
                        text={product.longDescription || product.description}
                        variant="full"
                      />

                      {/* [Improvement #9] Table of Contents for Notes/Ebooks */}
                      {showToc && product.features?.length > 0 && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            What's Inside
                          </h4>
                          <ol className="space-y-2">
                            {product.features.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-gray-700"
                              >
                                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="pt-1">{item}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "features" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(product.features || []).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-xl bg-gray-50"
                        >
                          <Check className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {(!product.features || product.features.length === 0) && (
                        <p className="text-gray-500 italic">
                          No specific features listed.
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "files" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Included Files
                      </h3>
                      {(product.downloadFiles || []).map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                              <Download size={20} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {file.size
                                  ? (file.size / 1024 / 1024).toFixed(2) + " MB"
                                  : "N/A"}{" "}
                                • {file.format || "ZIP"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "requirements" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        System Requirements
                      </h3>
                      <ul className="space-y-2">
                        {(product.requirements || []).length > 0 ? (
                          product.requirements.map((req, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              {req}
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">
                            No specific system requirements listed.
                          </p>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* [Improvement #7] FAQ Tab */}
                  {activeTab === "faq" && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Frequently Asked Questions
                      </h3>
                      {getProductFaqs().map((faq, idx) => (
                        <FaqItem
                          key={idx}
                          question={faq.question}
                          answer={faq.answer}
                          isOpen={openFaqIndex === idx}
                          onToggle={() =>
                            setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)
                          }
                        />
                      ))}
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-8">
                      <ReviewForm productId={product._id} />
                      <ReviewList productId={product._id} />
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* Purchase Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
              {/* [Improvement #10] Desktop price with animated discount badge */}
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <PriceDisplay
                  price={product.price}
                  originalPrice={product.originalPrice}
                  showOriginal={true}
                  className="text-4xl"
                  textClass="text-gray-900"
                />
              </div>
              <div className="mb-6">
                <AnimatedDiscountBadge price={product.price} originalPrice={product.originalPrice} />
              </div>

              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isAdding ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ShoppingCart size={20} />
                  )}
                  {isAdding ? "Adding..." : "Add to Cart"}
                </button>
                {/* [Improvement #8] Buy Now button - desktop */}
                <button
                  onClick={handleBuyNow}
                  disabled={isAdding}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Zap size={20} />
                  Buy Now
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleShare}
                    className="py-3.5 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                  <WishlistButton
                    itemId={product._id}
                    type="product"
                    showText={true}
                    text="Wishlist"
                    className="py-3.5 bg-white border-2 border-gray-200 hover:border-red-500 text-gray-700 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  />
                </div>
                <UrgencyBadge productId={product._id} type="product" />
              </div>

              {/* Premium Buyer Protection & Benefits */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Included Benefits & Protection
                </h4>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100/80 hover:bg-blue-50 transition-colors">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-500/20 flex-shrink-0 mt-0.5">
                    <Download className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Instant Download</div>
                    <div className="text-xs text-gray-500">Access files immediately after checkout</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100/80 hover:bg-emerald-50 transition-colors">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-500/20 flex-shrink-0 mt-0.5">
                    <RefreshCw className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Free Lifetime Updates</div>
                    <div className="text-xs text-gray-500">Get future revisions & fixes for free</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100/80 hover:bg-purple-50 transition-colors">
                  <div className="p-2 rounded-lg bg-purple-600 text-white shadow-sm shadow-purple-500/20 flex-shrink-0 mt-0.5">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {(product.license || "Personal").charAt(0).toUpperCase() + (product.license || "Personal").slice(1)} License
                    </div>
                    <div className="text-xs text-gray-500">Verified authentic digital download</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-center gap-2 text-xs font-medium text-gray-500 border-t border-dashed border-gray-200">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>256-Bit SSL Encrypted & 100% Safe Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={product?.title}
        text={product?.description}
      />

      {/* Recommendations – Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <RecommendationSection
          mode="related"
          productId={product?._id || productId}
          limit={6}
        />
      </div>

      {/* Recommendations – Personalized / Trending */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecommendationSection mode="personalized" limit={6} />
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:hidden z-50 flex items-center justify-between gap-4 safe-area-bottom">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Total Price</span>
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            showOriginal={false}
            className="text-xl"
            textClass="text-gray-900 font-bold"
          />
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold text-base shadow-blue-500/20 active:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-75"
        >
          {isAdding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart size={18} />
          )}
          Add to Cart
        </button>
      </div>

      {/* Social proof: recent purchase toast */}
      <RecentPurchaseToast productId={product._id} productTitle={product.title} />
    </div>
  );
};

export default ProductDetail;
