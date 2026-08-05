import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  Code,
  CreditCard,
  Database,
  Globe,
  Loader2,
  Mail,
  Palette,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  User,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormattedText from "../../../../components/FormattedText";
import { ItemListSchema } from "../../../../components/SEO/SchemaMarkup";
import PriceDisplay from "../../../../components/common/PriceDisplay";
import FAQ from "../../common/components/FAQ";
import Testimonials from "../../common/components/Testimonials";
import WhyChooseUs from "../../common/components/WhyChooseUs";
import WishlistButton from "../../common/components/WishlistButton";
import EmptyState from "../../common/components/ui/EmptyState";
import MarketplaceDropdown from "../../common/components/ui/MarketplaceDropdown.jsx";
import MarketPlaceSEO from "../../components/SEO/MarketPlaceSEO";
import { useCurrency } from "../../context/CurrencyContext";
import { useGetServicesQuery } from "../../store/api/marketplaceApi";
import { addToCart } from "../../store/cart/cartSlice";
import mobile from "./Assets/Images/Products/mobile_app_development.png";
import web from "./Assets/Images/Products/web_development.png";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const categories = [
    { id: "all", name: "All Services", icon: Globe },
    { id: "web-development", name: "Web Development", icon: Globe },
    { id: "mobile-development", name: "Mobile Apps", icon: Smartphone },
    { id: "ui-ux-design", name: "UI/UX Design", icon: Palette },
    { id: "backend-development", name: "Backend Development", icon: Database },
    { id: "consulting", name: "Consulting", icon: Shield },
    { id: "custom-solutions", name: "Custom Solutions", icon: Code },
  ];

  // Build query params
  const queryParams = useMemo(() => {
    const params = { limit: 50 };
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (debouncedSearch) params.search = debouncedSearch;
    if (priceRange !== "all") {
      if (priceRange === "low") {
        params.maxPrice = 1000;
      } else if (priceRange === "medium") {
        params.minPrice = 1000;
        params.maxPrice = 2000;
      } else if (priceRange === "high") {
        params.minPrice = 2000;
      }
    }
    return params;
  }, [selectedCategory, debouncedSearch, priceRange]);

  // Fetch real services from API
  const { data, isLoading, error } = useGetServicesQuery(queryParams);
  const services = data?.services || [];
  const { getPrice, formatPrice } = useCurrency();

  const handleAddToCart = (service) => {
    const pkg = service.packages?.[0];
    dispatch(
      addToCart({
        id: service._id,
        itemId: service._id,
        itemType: "service",
        title: service.title,
        price: pkg?.price || service.startingPrice || 0,
        image: service.images?.[0]?.url,
        quantity: 1,
        package: pkg?.name || "Standard",
      }),
    );
    toast.success("Added to cart!");
  };

  const handleBookNow = (service) => {
    handleAddToCart(service);
    navigate("/marketplace/checkout");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <MarketPlaceSEO
        title="Web Development & Full-Stack Services | Marketplace"
        description="Hire an expert full-stack developer for React apps, Node.js APIs, MERN stack development, SaaS MVPs, and custom web solutions."
        keywords={[
          "hire React developer",
          "web development services India",
          "Node.js developer for hire",
          "MERN stack development service",
          "SaaS MVP development",
          "custom web app development",
        ]}
        url="https://www.devkantkumar.com/marketplace/services"
        canonical="https://www.devkantkumar.com/marketplace/services"
        type="website"
      />
      <ItemListSchema
        items={services.map((s) => ({ ...s, type: "service" }))}
        listName="Web Development Services - Dev Kant Kumar Marketplace"
        listUrl="https://www.devkantkumar.com/marketplace/services"
      />

      {/* ───────────────────────── 1. Ultra-Modern Hero Section ───────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
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
                Verified Pro Full-Stack Developer Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Expert Development & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
                  Custom Software Solutions
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                From full-stack web applications to API integrations & SaaS MVPs. Work directly with a senior full-stack developer to launch your project.
              </p>
            </motion.div>

            {/* Live Search Input */}
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
                  placeholder="Search services (e.g. MERN, React, Mobile Apps, Consulting)..."
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
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
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

      {/* Trust Badges Strip */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-500 h-5 w-5" />
              <span>Verified Senior Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-600 h-5 w-5" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-amber-500 h-5 w-5" />
              <span>Fast 7-Day Turnaround</span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────── 2. Services Grid Section ───────────────────────── */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Developer Services</h2>
              <p className="text-sm font-medium text-slate-600 mt-1">Showing {services.length} active service packages</p>
            </div>
          {(selectedCategory !== "all" || debouncedSearch) && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="h-3 w-3" /> Clear filters
            </button>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200 animate-pulse space-y-4">
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load services</h3>
            <p className="text-gray-500">Please try refreshing or check back later.</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const defaultPkg = service.packages?.[0] || { price: service.startingPrice || 0, deliveryTime: 7 };
              const mainImg = service.images?.[0]?.url || "/api/placeholder/400/250";

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.08, 0.3) }}
                  className="bg-white rounded-2xl shadow-xs hover:shadow-xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col group relative"
                >
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={mainImg}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40"></div>

                    {/* Category Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-semibold uppercase">
                        {service.category?.replace(/-/g, " ") || "Service"}
                      </span>
                    </div>

                    {/* Wishlist Button Overlay */}
                    <div className="absolute top-3 right-3 z-10">
                      <WishlistButton itemId={service._id} type="service" />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Star className="text-yellow-400 h-4 w-4 fill-yellow-400 mr-1" />
                          <span className="font-bold text-gray-900">{service.rating?.average || 0}</span>
                          <span className="text-gray-400 ml-1">({service.rating?.count || 0})</span>
                        </div>
                        <span className="flex items-center text-gray-500">
                          <Clock className="h-3.5 w-3.5 text-emerald-600 mr-1" />
                          {defaultPkg.deliveryTime || 7} Days Delivery
                        </span>
                      </div>

                      <Link
                        to={`/marketplace/services/${service._id}`}
                        className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 mb-3 block"
                      >
                        {service.title}
                      </Link>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {service.features?.length > 0 && (
                        <div className="mb-4 space-y-1.5">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-600">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 flex-shrink-0" />
                              <span className="truncate">{typeof feature === "string" ? feature : feature.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">STARTING FROM</span>
                          <PriceDisplay
                            price={defaultPkg.price}
                            className="text-2xl"
                            textClass="text-gray-900 font-bold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={`/marketplace/services/${service._id}`}
                          className="py-2.5 px-3 bg-white border border-gray-200 hover:border-emerald-500 text-gray-800 hover:text-emerald-600 font-bold text-xs rounded-xl text-center transition-all flex items-center justify-center"
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleBookNow(service)}
                          className="py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Zap className="h-3.5 w-3.5" /> Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!isLoading && !error && services.length === 0 && (
          <EmptyState
            variant="services"
            title="No services found"
            description="Try modifying your search terms or category selection."
            actionLabel="Clear Filters"
            onAction={resetFilters}
          />
        )}
        </div>
      </section>

      {/* Why Choose Us & FAQs */}
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Services;
