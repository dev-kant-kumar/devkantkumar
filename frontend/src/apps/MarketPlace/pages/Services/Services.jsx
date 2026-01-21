import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    CheckCircle,
    Clock,
    Code,
    Database,
    Globe,
    Loader2,
    Palette,
    Search,
    Shield,
    ShieldCheck,
    Smartphone,
    Star,
    User,
    Zap
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PriceDisplay from "../../../../components/common/PriceDisplay";
import FAQ from '../../common/components/FAQ';
import Testimonials from '../../common/components/Testimonials';
import WhyChooseUs from '../../common/components/WhyChooseUs';
import { useCurrency } from '../../context/CurrencyContext';
import { useGetServicesQuery } from '../../store/api/marketplaceApi';
import { addToCart } from '../../store/cart/cartSlice';
import mobile from "./Assets/Images/Products/mobile_app_development.png";
import web from "./Assets/Images/Products/web_development.png";

const Services = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const categories = [
    { id: 'all', name: 'All Services', icon: Globe },
    { id: 'web-development', name: 'Web Development', icon: Globe },
    { id: 'mobile-development', name: 'Mobile Apps', icon: Smartphone },
    { id: 'ui-ux-design', name: 'UI/UX Design', icon: Palette },
    { id: 'backend-development', name: 'Backend Development', icon: Database },
    { id: 'consulting', name: 'Consulting', icon: Shield },
    { id: 'custom-solutions', name: 'Custom Solutions', icon: Code }
  ];

  // Build query params
  const queryParams = useMemo(() => {
    const params = { limit: 50 };
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (debouncedSearch) params.search = debouncedSearch;
    if (priceRange !== 'all') {
      if (priceRange === 'low') {
        params.maxPrice = 1000;
      } else if (priceRange === 'medium') {
        params.minPrice = 1000;
        params.maxPrice = 2000;
      } else if (priceRange === 'high') {
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
    dispatch(addToCart({
      id: service._id,
      itemId: service._id,
      itemType: 'service',
      title: service.title,
      price: pkg?.price || service.startingPrice || 0,
      image: service.images?.[0]?.url,
      quantity: 1,
      package: pkg?.name || 'Standard',
    }));
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/50 text-blue-200 text-sm font-bold mb-6 border border-blue-700">
                <Award className="mr-2 h-4 w-4" /> PREMIUM DEVELOPMENT SERVICES
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                Expert Solutions for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Digital Growth
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                From custom web applications to enterprise solutions. Hire top talent to build your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center"
                >
                  Explore Services
                </button>
                <Link
                  to="/marketplace/custom-solutions"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center border border-white/10"
                >
                  Custom Quote
                </Link>
              </div>
              <div className="mt-8 flex items-center text-sm text-gray-400 space-x-6">
                <div className="flex items-center">
                  <CheckCircle className="text-green-400 mr-2 h-5 w-5" /> {services.length}+ Services
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-2 h-5 w-5" /> 4.9/5 Rating
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-blue-500/30 rounded-full blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <img src={web} alt="Web Development" className="rounded-2xl shadow-2xl border border-white/10 transform translate-y-8" />
                <img src={mobile} alt="Mobile Development" className="rounded-2xl shadow-2xl border border-white/10 transform -translate-y-8" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 text-lg" />
              <span>Verified Pro Sellers</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="text-blue-500 mr-2 text-lg" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center">
              <Zap className="text-yellow-500 mr-2 text-lg" />
              <span>Fast Turnaround Time</span>
            </div>
          </div>
        </div>
      </div>

      <WhyChooseUs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Services</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $1,000</option>
                  <option value="medium">$1,000 - $2,000</option>
                  <option value="high">$2,000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div id="services-grid" className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{services.length} services found</p>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              </div>
            )}

            {error && (
              <div className="text-center py-12 bg-white rounded-xl">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Failed to load services</h3>
                <p className="text-gray-600">Please try again later</p>
              </div>
            )}

            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
                  >
                    <img
                      src={service.images?.[0]?.url || '/api/placeholder/400/250'}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium capitalize">
                          {service.category?.replace(/-/g, ' ') || 'Service'}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {service.rating?.average || 0} ({service.rating?.count || 0})
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                      {service.features && (
                        <div className="mb-4 space-y-1">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-500">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                              {typeof feature === 'string' ? feature : feature.name}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-500 mb-4 pt-4 border-t border-gray-100">
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-4 flex items-center">
                          Dev Kant Kumar
                          <CheckCircle className="h-3 w-3 text-blue-500 ml-1" />
                        </span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{service.packages?.[0]?.deliveryTime || 7} days</span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {(() => {
                             const defaultPkg = service.packages?.[0] || { price: service.startingPrice || 0 };
                             return (
                                <PriceDisplay price={defaultPkg.price} className="text-2xl" textClass="text-blue-600" />
                             );
                        })()}
                        <Link
                          to={`/marketplace/services/${service._id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center font-medium"
                        >
                          View Offer
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && !error && services.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl">
                <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later for new services.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Simple, transparent, and efficient.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Select Service', desc: 'Choose the package that fits your needs.' },
              { step: '02', title: 'Briefing', desc: 'Share your requirements and details.' },
              { step: '03', title: 'Development', desc: 'We build with regular updates.' },
              { step: '04', title: 'Delivery', desc: 'Receive your project with source code.' }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Testimonials />
      <FAQ />

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            We specialize in custom software solutions tailored to your needs.
          </p>
          <Link
            to="/marketplace/custom-solutions"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get a Custom Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
