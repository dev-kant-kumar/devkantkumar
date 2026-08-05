import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Code2,
  Database,
  Download,
  Eye,
  FileText,
  Flame,
  Globe,
  Headset,
  Layout,
  Loader2,
  Lock,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormattedText from "../../../../components/FormattedText";
import { ItemListSchema } from "../../../../components/SEO/SchemaMarkup";
import PriceDisplay from "../../../../components/common/PriceDisplay";
import FAQ from "../../common/components/FAQ";
import Testimonials from "../../common/components/Testimonials";
import TrustSignals from "../../common/components/TrustSignals";
import WhyChooseUs from "../../common/components/WhyChooseUs";
import EmptyState from "../../common/components/ui/EmptyState";
import WishlistButton from "../../common/components/WishlistButton";
import MarketPlaceSEO from "../../components/SEO/MarketPlaceSEO";
import { useGetTrendingQuery } from "../../store/api/marketplaceApi";
import { addToCart } from "../../store/cart/cartSlice";

const CATEGORY_SHOWCASE = [
  {
    id: "notes",
    title: "Study Notes & Guides",
    desc: "Concise BCA, MCA & developer syllabus notes, cheat sheets & PDFs",
    icon: BookOpen,
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-600",
    badge: "50+ Notes",
    link: "/marketplace/products/notes",
  },
  {
    id: "templates",
    title: "Website Templates",
    desc: "Production-ready React, Next.js & Tailwind CSS website starters",
    icon: Code2,
    color: "from-purple-500/10 to-indigo-500/10 border-purple-500/30 text-purple-600",
    badge: "Best Seller",
    link: "/marketplace/products/templates",
  },
  {
    id: "components",
    title: "UI Components",
    desc: "Drop-in dashboard widgets, form kits & UI elements",
    icon: Tag,
    color: "from-indigo-500/10 to-blue-500/10 border-indigo-500/30 text-indigo-600",
    badge: "Popular",
    link: "/marketplace/products/components",
  },
  {
    id: "courses",
    title: "Full-Stack Courses",
    desc: "Project-based MERN, React & Node.js video courses & guides",
    icon: Rocket,
    color: "from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-600",
    badge: "Top Rated",
    link: "/marketplace/products/courses",
  },
  {
    id: "tools",
    title: "Dev Tools & Scripts",
    desc: "Automation scripts, boilerplate APIs & developer tools",
    icon: Wrench,
    color: "from-cyan-500/10 to-teal-500/10 border-cyan-500/30 text-cyan-600",
    badge: "Essential",
    link: "/marketplace/products/tools",
  },
  {
    id: "services",
    title: "Pro Dev Services",
    desc: "Hire expert full-stack developer for custom apps & MVPs",
    icon: Globe,
    color: "from-rose-500/10 to-pink-500/10 border-rose-500/30 text-rose-600",
    badge: "Verified Pro",
    link: "/marketplace/services",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState("");

  const { data: trendingData, isLoading } = useGetTrendingQuery({ limit: 6 });

  const featuredProducts = trendingData?.products || [];
  const featuredServices = trendingData?.services || [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/marketplace/products?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const handleAddProductToCart = (product) => {
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
  };

  const handleBuyProductNow = (product) => {
    handleAddProductToCart(product);
    navigate("/marketplace/checkout");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <MarketPlaceSEO
        title="Dev Kant Kumar Marketplace - React Templates, Study Notes & Services"
        description="Buy premium React templates, Next.js boilerplates, BCA/MCA study notes, and hire full-stack developer services. Instant digital download."
        keywords={[
          "React templates",
          "Next.js boilerplate",
          "MERN stack kit",
          "developer study notes",
          "BCA MCA study material",
          "hire full stack developer",
          "React components",
        ]}
        url="https://www.devkantkumar.com/marketplace"
        canonical="https://www.devkantkumar.com/marketplace"
        type="website"
      />
      <ItemListSchema
        items={[
          ...featuredServices.map((s) => ({ ...s, type: "service" })),
          ...featuredProducts.map((p) => ({ ...p, type: "product" })),
        ]}
        listName="Dev Kant Kumar Marketplace - Featured Services & Digital Products"
        listUrl="https://www.devkantkumar.com/marketplace"
      />

      {/* ───────────────────────── 1. Ultra-Modern Glassmorphism Hero Section ───────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Background ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-emerald-500/10">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                🚀 The #1 Digital Marketplace for Devs & Students
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                Build & Learn Faster with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
                  Verified Digital Resources
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover production-ready React templates, BCA/MCA study notes, UI kits, and professional developer services — with 100% instant digital delivery.
              </p>
            </motion.div>

            {/* Universal Hero Search Bar */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all shadow-2xl">
                <Search className="h-5 w-5 text-gray-300 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search templates, BCA/MCA notes, UI kits, services..."
                  className="w-full py-4 pl-3 pr-24 text-white placeholder-gray-400 bg-transparent focus:outline-none text-base"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Search
                </button>
              </div>
            </motion.form>

            {/* Live Metrics Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-300 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>500+ Digital Assets</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-emerald-400" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                <span>100% Secure Checkout</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── 2. Visual Category Showcase Grid ───────────────────────── */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/60 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_SHOWCASE.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={cat.link}
                    className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${cat.color} border shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      {cat.desc}
                    </p>

                    <div className="flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                      Explore Collection <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── 3. Top-Rated Developer Services Section ───────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">PRO SERVICES</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Top-Rated Developer Services</h2>
              <p className="text-sm font-medium text-slate-600 mt-1">Hire an experienced developer for web apps, mobile apps & custom code.</p>
            </div>
            <Link
              to="/marketplace/services"
              className="mt-4 md:mt-0 flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              View All Services <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border animate-pulse space-y-3">
                  <div className="aspect-video bg-gray-200 rounded-xl"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : featuredServices.length === 0 ? (
            <EmptyState
              variant="services"
              actionLabel="Request Custom Solution"
              actionLink="/marketplace/custom-solutions"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.slice(0, 3).map((service, index) => {
                const defaultPkg = service.packages?.[0] || { price: service.startingPrice || 0, deliveryTime: 7 };
                return (
                  <motion.div
                    key={service._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 flex flex-col group"
                  >
                    <div className="aspect-video overflow-hidden relative bg-gray-100">
                      <img
                        src={service.images?.[0]?.url || "/api/placeholder/400/250"}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center shadow-xs">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                        {service.rating?.average || 0} ({service.rating?.count || 0})
                      </div>
                      <div className="absolute top-3 left-3">
                        <WishlistButton itemId={service._id} type="service" />
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-semibold uppercase">
                            {service.category?.replace(/-/g, " ") || "Service"}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 text-emerald-600 mr-1" />
                            {defaultPkg.deliveryTime || 7} Days
                          </span>
                        </div>

                        <Link
                          to={`/marketplace/services/${service.slug || service._id}`}
                          className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-2 block"
                        >
                          {service.title}
                        </Link>

                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase block">STARTING AT</span>
                          <PriceDisplay
                            price={defaultPkg.price}
                            className="text-xl"
                            textClass="text-gray-900 font-bold"
                          />
                        </div>
                        <Link
                          to={`/marketplace/services/${service.slug || service._id}`}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1"
                        >
                          <Zap className="h-3.5 w-3.5" /> View Package
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────── 4. Trending Products & Notes Section ───────────────────────── */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">DIGITAL STORE</span>
              <h2 className="text-3xl font-extrabold text-slate-900">Trending Digital Products & Notes</h2>
              <p className="text-sm font-medium text-slate-600 mt-1">Instant download React starters, UI templates, and study guides.</p>
            </div>
            <Link
              to="/marketplace/products"
              className="mt-4 md:mt-0 flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Browse All Products <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border animate-pulse space-y-3">
                  <div className="aspect-video bg-gray-200 rounded-xl"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <EmptyState variant="products" actionLabel="View Catalog" actionLink="/marketplace/products" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product, index) => {
                const hasDiscount = product.originalPrice > product.price && product.price > 0;
                const sales = product.downloads || product.analytics?.totalSales || 0;

                return (
                  <motion.div
                    key={product._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-xs hover:shadow-xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    <div className="aspect-video relative bg-gray-100 overflow-hidden">
                      <img
                        src={product.images?.[0]?.url || "/api/placeholder/400/250"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 z-10">
                        <WishlistButton itemId={product._id} type="product" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                          {product.category || "Digital"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
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

                        <Link
                          to={`/marketplace/products/${product.slug || product._id}`}
                          className="text-base font-bold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-2 block"
                        >
                          {product.title}
                        </Link>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <PriceDisplay
                          price={product.price}
                          originalPrice={product.originalPrice}
                          showOriginal={hasDiscount}
                          className="text-lg"
                          textClass="text-gray-900 font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => handleBuyProductNow(product)}
                          className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
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
        </div>
      </section>

      {/* ───────────────────────── 5. "How It Works" 3-Step Section ───────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">SIMPLE & SECURE</span>
            <h2 className="text-3xl font-extrabold text-slate-900">How The Marketplace Works</h2>
            <p className="text-sm font-medium text-slate-600 mt-2">Access your digital code or study notes in 3 easy steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl text-center border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-xs">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Browse & Preview</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Explore hand-crafted templates, syllabus notes, and developer packages with live previews.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl text-center border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-xs">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Secure Payment</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pay securely via UPI, Cards, or Net Banking with 256-Bit SSL protection.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl text-center border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5 shadow-xs">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Download & Access</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Download your files immediately from your client dashboard with free lifetime updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Testimonials */}
      <WhyChooseUs />
      <Testimonials />
      <FAQ />

      {/* ───────────────────────── 6. High-Conversion Custom Quote CTA ───────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-400/10 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30 mb-6 shadow-lg shadow-emerald-500/10">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Need Something Custom Built?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight max-w-3xl mx-auto leading-tight">
            Have a Specific Project or Custom Feature Idea?
          </h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Get a tailored technical quote and fixed timeline directly from a senior full-stack developer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/marketplace/custom-solutions"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-xl text-base shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Request Custom Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/marketplace/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-base transition-all backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
