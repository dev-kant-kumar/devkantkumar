import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Code2,
  CreditCard,
  Download,
  Eye,
  FileText,
  Filter,
  Flame,
  Grid,
  Heart,
  Layout,
  List,
  Loader2,
  Mail,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import FormattedText from "../../../../components/FormattedText";
import { ItemListSchema } from "../../../../components/SEO/SchemaMarkup";
import PriceDisplay from "../../../../components/common/PriceDisplay";
import { useAddToCartMutation } from "../../../../store/cart/cartApi";
import FAQ from "../../common/components/FAQ";
import Testimonials from "../../common/components/Testimonials";
import WhyChooseUs from "../../common/components/WhyChooseUs";
import WishlistButton from "../../common/components/WishlistButton";
import EmptyState from "../../common/components/ui/EmptyState";
import MarketplaceDropdown from "../../common/components/ui/MarketplaceDropdown.jsx";
import MarketPlaceSEO from "../../components/SEO/MarketPlaceSEO";
import { useCurrency } from "../../context/CurrencyContext";
import {
  useGetProductsQuery,
  useSubscribeMutation,
} from "../../store/api/marketplaceApi";
import { selectIsAuthenticated } from "../../store/auth/authSlice";
import { addToCart } from "../../store/cart/cartSlice";

// Per-category SEO data
const CATEGORY_SEO = {
  all: {
    title: "React Templates & Digital Products | Marketplace",
    description:
      "Download premium React dashboards, Next.js templates, Tailwind CSS UI kits, and university study notes. Instant digital download.",
    keywords: [
      "buy React template",
      "Next.js starter template download",
      "React admin dashboard template",
      "Tailwind CSS UI kit",
      "MERN boilerplate",
      "developer study notes",
      "premium website template India",
    ],
  },
  templates: {
    title: "Premium Website Templates | React, Next.js & HTML",
    description:
      "Buy production-ready website templates built with React, Next.js, and Tailwind CSS. Instantly downloadable, fully customizable.",
    keywords: [
      "website templates download",
      "React website template",
      "Next.js template buy",
      "HTML CSS template",
      "landing page template India",
    ],
  },
  themes: {
    title: "Premium UI Themes | Dark & Light Design Systems",
    description:
      "Explore professional dark and light UI themes for React and Next.js apps. Beautiful design systems with instant download and free updates.",
    keywords: ["React UI theme", "dark mode theme", "Next.js theme download"],
  },
  plugins: {
    title: "React Plugins & Extensions | Ready-to-Use Components",
    description:
      "Drop-in React plugins for auth, payments, charts, tables, and more. Save weeks of development time with our battle-tested code packages.",
    keywords: ["React plugin", "React component library buy", "auth plugin React"],
  },
  graphics: {
    title: "Digital Graphics & Design Assets | SVG, Icons & Illustrations",
    description:
      "Download premium SVG illustrations, icon sets, and UI graphics for your web projects. Commercial license included.",
    keywords: ["buy SVG illustration", "icon set download", "UI graphics assets"],
  },
  fonts: {
    title: "Premium Web Fonts & Typography Kits",
    description:
      "Download premium web font bundles and typography kits optimized for React and Next.js.",
    keywords: ["web font download", "typography kit", "premium font license"],
  },
  courses: {
    title: "Web Development Courses | React, MERN & Full Stack",
    description:
      "Learn React, Node.js, MongoDB, and full-stack web development with practical, project-based online courses.",
    keywords: ["React course India", "MERN stack course", "full stack course buy"],
  },
  notes: {
    title: "Study Notes & Developer Reference Guides | Buy & Download",
    description:
      "Download concise, well-structured study notes and developer reference guides for BCA, MCA, React, JavaScript, DSA, and system design.",
    keywords: [
      "developer notes download",
      "React notes PDF",
      "JavaScript cheat sheet",
      "BCA MCA notes India",
    ],
  },
  ebooks: {
    title: "Programming eBooks | React, JavaScript & Web Dev",
    description:
      "Buy premium programming eBooks on React, JavaScript, Node.js, and web development.",
    keywords: ["programming ebook buy", "React ebook download", "JavaScript ebook"],
  },
};

// Category Metadata Configuration with Icons & Colors
const CATEGORIES_CONFIG = [
  { id: "all", name: "All Products", icon: Layout, color: "text-emerald-600 bg-emerald-50" },
  { id: "notes", name: "Study Notes", icon: BookOpen, color: "text-emerald-600 bg-emerald-50" },
  { id: "templates", name: "Templates", icon: Code2, color: "text-purple-600 bg-purple-50" },
  { id: "components", name: "UI Components", icon: Tag, color: "text-indigo-600 bg-indigo-50" },
  { id: "courses", name: "Courses", icon: Rocket, color: "text-amber-600 bg-amber-50" },
  { id: "tools", name: "Dev Tools", icon: Wrench, color: "text-cyan-600 bg-cyan-50" },
  { id: "themes", name: "Themes", icon: Palette, color: "text-rose-600 bg-rose-50" },
  { id: "ebooks", name: "eBooks", icon: FileText, color: "text-teal-600 bg-teal-50" },
];

/* ───────────────────────── Quick View Modal Component ───────────────────────── */
const QuickViewModal = ({ product, isOpen, onClose, onAddToCart, onBuyNow }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    setActiveImgIdx(0);
  }, [product]);

  if (!isOpen || !product) return null;

  const currentImg = product.images?.[activeImgIdx]?.url || product.images?.[0]?.url || "/api/placeholder/600/400";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Preview */}
          <div className="bg-gray-900 p-6 flex flex-col justify-between relative min-h-[350px]">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-800 relative">
              <img
                src={currentImg}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImgIdx === idx
                        ? "border-blue-500 ring-2 ring-blue-500/30"
                        : "border-gray-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase">
                  {product.category || "Digital Product"}
                </span>
                <span className="text-xs text-gray-400">v{product.version || "1.0.0"}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h2>

              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Star className="text-yellow-400 h-4 w-4 fill-yellow-400 mr-1" />
                  <span className="font-bold text-gray-900">{product.rating?.average || 0}</span>
                  <span className="text-gray-400 ml-1">({product.rating?.count || 0})</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Download className="h-3.5 w-3.5 text-emerald-600" />
                  {(product.downloads || product.totalSales || 0).toLocaleString()} downloads
                </span>
              </div>

              <FormattedText
                text={product.description}
                variant="card"
                truncate={160}
                className="text-gray-600 text-sm leading-relaxed mb-6"
              />

              {product.features?.length > 0 && (
                <div className="mb-6 space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Highlights</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Pricing & Action */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">PRICE</span>
                  <PriceDisplay
                    price={product.price}
                    originalPrice={product.originalPrice}
                    showOriginal={true}
                    className="text-3xl"
                    textClass="text-gray-900 font-bold"
                  />
                </div>
                {product.originalPrice > product.price && (
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-xs font-bold shadow-sm animate-pulse">
                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product);
                  }}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onBuyNow(product);
                  }}
                  className="py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="h-4 w-4" />
                  Buy Now
                </button>
              </div>

              <Link
                to={`/marketplace/products/${product.slug || product._id}`}
                className="block text-center text-xs text-emerald-600 hover:underline font-semibold"
                onClick={onClose}
              >
                View Full Product Details & Reviews →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ───────────────────────── Main Component ───────────────────────── */
const DigitalProducts = ({ category: propCategory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [addToCartApi] = useAddToCartMutation();
  const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();

  // State management
  const [selectedCategory, setSelectedCategory] = useState(propCategory || "all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortOption, setSortOption] = useState("popular");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [email, setEmail] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  // Sync state if category prop changes
  useEffect(() => {
    if (propCategory) setSelectedCategory(propCategory);
  }, [propCategory]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sync search input with URL query param
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Query Params
  const queryParams = useMemo(() => {
    const params = { limit: 50 };
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (debouncedSearch) params.search = debouncedSearch;
    if (priceRange !== "all" && priceRange !== "free") {
      if (priceRange === "low") {
        params.minPrice = 1;
        params.maxPrice = 100;
      } else if (priceRange === "medium") {
        params.minPrice = 100;
        params.maxPrice = 500;
      } else if (priceRange === "high") {
        params.minPrice = 500;
      }
    }
    return params;
  }, [selectedCategory, debouncedSearch, priceRange]);

  // API Call
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    category: propCategory,
    page: 1,
    limit: 50,
    ...queryParams,
  });

  // Client-side processing (sorting & price filtering)
  const products = useMemo(() => {
    if (!productsData?.products) return [];
    let list = [...productsData.products];

    if (priceRange === "free") {
      list = list.filter((p) => p.price === 0);
    }

    // Sort options
    if (sortOption === "popular") {
      list.sort((a, b) => (b.downloads || b.analytics?.totalSales || 0) - (a.downloads || a.analytics?.totalSales || 0));
    } else if (sortOption === "rating") {
      list.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
    } else if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return list;
  }, [productsData, priceRange, sortOption]);

  // Handlers
  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      try {
        await addToCartApi({
          productId: product._id,
          quantity: 1,
          itemType: "product",
        }).unwrap();
        toast.success(`Added "${product.title}" to cart!`);
      } catch (err) {
        toast.error(err?.data?.message || "Failed to add to cart");
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
      toast.success(`Added "${product.title}" to cart!`);
    }
  };

  const handleBuyNow = async (product) => {
    await handleAddToCart(product);
    navigate("/marketplace/checkout");
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    try {
      await subscribe({ email, source: "digital_products" }).unwrap();
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error(err?.data?.message || "Subscription failed");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSortOption("popular");
    setSearchParams({});
    navigate("/marketplace/products");
  };

  // SEO Config
  const catKey = propCategory && CATEGORY_SEO[propCategory] ? propCategory : "all";
  const catSEO = CATEGORY_SEO[catKey];
  const canonicalUrl = "https://www.devkantkumar.com/marketplace/products";

  return (
    <div className="min-h-screen bg-slate-50">
      <MarketPlaceSEO
        title={catSEO.title}
        description={catSEO.description}
        keywords={catSEO.keywords}
        url={canonicalUrl}
        canonical={canonicalUrl}
        type="website"
      />
      <ItemListSchema
        items={products.map((p) => ({ ...p, type: "product" }))}
        listName="Digital Products Catalog"
        listUrl={canonicalUrl}
      />

      {/* ───────────────────────── 1. Ultra-Modern Glassmorphism Hero Showcase ───────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Background glow effects - Emerald Brand Palette */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-emerald-500/10">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                Verified Digital Assets, Templates & Study Notes
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Build & Study Faster with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
                  Premium Digital Resources
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Explore hand-crafted React templates, UI components, syllabus study notes, and developer toolkits — all backed by instant digital download.
              </p>
            </motion.div>

            {/* Live Search Bar inside Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto relative shadow-2xl rounded-2xl"
            >
              <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all">
                <Search className="h-5 w-5 text-gray-300 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search templates, study notes, components..."
                  className="w-full py-4 pl-3 pr-10 text-white placeholder-gray-400 bg-transparent focus:outline-none text-base"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="mr-3 text-gray-400 hover:text-white p-1 rounded-full cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Category Chips Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto"
          >
            {CATEGORIES_CONFIG.map((cat) => {
              const IconComponent = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (cat.id === "all") {
                      navigate("/marketplace/products");
                    } else {
                      navigate(`/marketplace/products/${cat.id}`);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── 2. Controls & Filter Toolbar ───────────────────────── */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Product count & active filter summary */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-900">
                {isLoading ? "Loading products..." : `${products.length} Products`}
              </span>
              {(selectedCategory !== "all" || priceRange !== "all" || debouncedSearch) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-emerald-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <X className="h-3 w-3" /> Clear filters
                </button>
              )}
            </div>

            {/* Right: Filter dropdowns & Grid/List view toggle */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Price Range Selector */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {[
                  { id: "all", label: "All Prices" },
                  { id: "low", label: "Under ₹100" },
                  { id: "medium", label: "₹100–₹500" },
                  { id: "high", label: "₹500+" },
                ].map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setPriceRange(range.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      priceRange === range.id
                        ? "bg-white text-emerald-600 shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="py-2 px-3 bg-gray-100 border-none rounded-xl text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="popular">🔥 Most Popular</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="newest">✨ Newest Arrivals</option>
                <option value="price-asc">💵 Price: Low to High</option>
                <option value="price-desc">💎 Price: High to Low</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-emerald-600 shadow-xs"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-white text-emerald-600 shadow-xs"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── 3. Products Catalog Grid / List ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Loading Skeletons */}
        {isLoading && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-xs border border-gray-200 animate-pulse space-y-3"
              >
                <div className="aspect-video bg-gray-200 rounded-xl"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded-xl mt-4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load marketplace products</h3>
            <p className="text-gray-500 mb-4">Please check your connection and try again.</p>
          </div>
        )}

        {/* Catalog Items */}
        {!isLoading && !error && products.length > 0 && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {products.map((product, index) => {
              const mainImg = product.images?.[0]?.url || "/api/placeholder/400/250";
              const sales = product.downloads || product.analytics?.totalSales || 0;
              const hasDiscount = product.originalPrice > product.price && product.price > 0;
              const discountPercent = hasDiscount
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              /* ── Grid View Item Card ── */
              if (viewMode === "grid") {
                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                    className="bg-white rounded-2xl shadow-xs hover:shadow-xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col group relative"
                  >
                    {/* Thumbnail area */}
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={mainImg}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>

                      {/* Wishlist Button Overlay */}
                      <div className="absolute top-3 right-3 z-10">
                        <WishlistButton itemId={product._id} type="product" />
                      </div>

                      {/* Category Pill Overlay */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                          {product.category || "Digital"}
                        </span>
                        {hasDiscount && (
                          <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-xs animate-pulse">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      {/* Quick View Button on Hover */}
                      <button
                        type="button"
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-xl text-xs font-bold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center gap-1 shadow-md"
                      >
                        <Eye className="h-3.5 w-3.5" /> Quick View
                      </button>
                    </div>

                    {/* Content area */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <Link
                          to={`/marketplace/products/${product.slug || product._id}`}
                          className="text-base font-bold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-2 block"
                        >
                          {product.title}
                        </Link>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Star className="text-yellow-400 h-3.5 w-3.5 fill-yellow-400 mr-1" />
                            <span className="font-bold text-gray-800">{product.rating?.average || 0}</span>
                            <span className="text-gray-400 ml-0.5">({product.rating?.count || 0})</span>
                          </div>
                          {sales > 0 && (
                            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                              <Download className="h-3 w-3" />
                              {sales > 999 ? `${(sales / 1000).toFixed(1)}k` : sales}+
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                          {product.description}
                        </p>
                      </div>

                      {/* Price & Action Footer */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <PriceDisplay
                            price={product.price}
                            originalPrice={product.originalPrice}
                            showOriginal={hasDiscount}
                            className="text-lg"
                            textClass="text-gray-900 font-bold"
                          />
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            className="p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBuyNow(product)}
                            className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Zap className="h-3.5 w-3.5" /> Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              /* ── List View Item Row ── */
              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-5"
                >
                  <div className="w-full sm:w-48 h-32 aspect-video sm:aspect-auto bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative group">
                    <img src={mainImg} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    {hasDiscount && (
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex-grow space-y-2 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start text-xs">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-semibold">
                        {product.category || "Digital"}
                      </span>
                      <span className="text-gray-400">• v{product.version || "1.0.0"}</span>
                    </div>

                    <Link
                      to={`/marketplace/products/${product.slug || product._id}`}
                      className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-1"
                    >
                      {product.title}
                    </Link>

                    <p className="text-xs text-gray-500 line-clamp-2 max-w-2xl">{product.description}</p>
                  </div>

                  <div className="flex flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5 w-full sm:w-48 flex-shrink-0">
                    <PriceDisplay
                      price={product.price}
                      originalPrice={product.originalPrice}
                      showOriginal={hasDiscount}
                      className="text-xl mb-3"
                      textClass="text-gray-900 font-bold"
                    />

                    <div className="flex items-center gap-2 w-full">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" /> Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBuyNow(product)}
                        className="flex-1 py-2 px-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Zap className="h-3.5 w-3.5" /> Buy
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (() => {
          const activeCatObj = CATEGORIES_CONFIG.find((c) => c.id === selectedCategory);
          const catName = activeCatObj ? activeCatObj.name : "Digital Assets";
          const emptyTitle = selectedCategory !== "all" ? `${catName} Coming Soon` : "No digital assets found";
          const emptyDesc = selectedCategory !== "all"
            ? `We are currently curating premium ${catName.toLowerCase()} for you. Clear filters to explore all available marketplace products!`
            : "Try modifying your search keywords or active category filters to view products.";

          return (
            <EmptyState
              variant="products"
              title={emptyTitle}
              description={emptyDesc}
              actionLabel="Clear Filters & View All Products"
              onAction={resetFilters}
              showNewsletter={true}
            />
          );
        })()}
      </section>

      {/* ───────────────────────── 4. Quick View Drawer Modal ───────────────────────── */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p) => {
          handleAddToCart(p);
          setQuickViewProduct(null);
        }}
        onBuyNow={(p) => {
          setQuickViewProduct(null);
          handleBuyNow(p);
        }}
      />

      {/* ───────────────────────── 5. Marketplace Guarantee & Trust Section ───────────────────────── */}
      <WhyChooseUs />

      {/* FAQ & Support Section */}
      <FAQ />

      {/* ───────────────────────── 6. Deal Newsletter Nudge ───────────────────────── */}
      <section className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 py-16 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30 mb-4 inline-block">
            🎁 Exclusive Creator Deals & New Releases
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Never Miss a Premium Resource</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Get instant alerts when new study notes, React templates, and developer kits are released.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubscribing}
              className="flex-grow px-5 py-3.5 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm disabled:opacity-75"
            />
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isSubscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe Free"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalProducts;
