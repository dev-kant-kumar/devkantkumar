import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaCheckCircle,
    FaCreditCard,
    FaDownload,
    FaEnvelopeOpenText,
    FaFilter,
    FaFire,
    FaPaperPlane,
    FaRocket,
    FaSearch,
    FaShoppingCart,
    FaStar
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FAQ from '../../common/components/FAQ';
import Testimonials from '../../common/components/Testimonials';
import WhyChooseUs from '../../common/components/WhyChooseUs';

import { addToCart } from '../../store/cart/cartSlice';
import {
    filterProducts,
    selectFilteredProducts
} from '../../store/products/productsSlice';
import {
    setPriceRange,
    setSearchTerm,
    setSelectedCategory
} from '../../store/ui/marketplaceUISlice';
import reactDashboard from './Assets/Images/react_dashboard.png';

const DigitalProducts = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedCategory, priceRange, trustData } = useSelector((state) => state.marketplaceUI);
  const filteredProducts = useSelector(selectFilteredProducts);

  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState('');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'templates', name: 'Templates' },
    { id: 'themes', name: 'Themes' },
    { id: 'plugins', name: 'Plugins' },
    { id: 'graphics', name: 'Graphics' },
    { id: 'fonts', name: 'Fonts' },
    { id: 'courses', name: 'Courses' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'free', name: 'Free' },
    { id: 'low', name: 'Under $50' },
    { id: 'medium', name: '$50 - $100' },
    { id: 'high', name: '$100+' }
  ];





  // Sync filters with products slice
  useEffect(() => {
    dispatch(filterProducts({ searchTerm, category: selectedCategory, priceRange }));
  }, [dispatch, searchTerm, selectedCategory, priceRange]);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Product Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 text-sm font-bold mb-6 border border-yellow-400/30">
                <FaFire className="mr-2" /> DEAL OF THE WEEK
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                Modern React Dashboard <br />
                <span className="text-blue-400">Ultimate Bundle</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get our best-selling dashboard template with 50+ components, dark mode, and TypeScript support. Launch your SaaS in days, not months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/marketplace/products/react-dashboard"
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center"
                >
                  Get It Now - $49
                </Link>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center border border-white/10">
                  View Demo
                </button>
              </div>
              <div className="mt-8 flex items-center text-sm text-gray-400 space-x-6">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2" /> 1,250+ Sales
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-2" /> 4.9/5 Rating
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
              <img
                src={reactDashboard}
                alt="React Dashboard Preview"
                className="relative rounded-xl shadow-2xl border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 p-4 rounded-xl shadow-xl animate-bounce">
                <div className="text-xs font-bold text-gray-500 uppercase">Limited Time</div>
                <div className="text-2xl font-extrabold text-blue-600">40% OFF</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Signals Bar */}
      <WhyChooseUs />

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start building your next big project in minutes. It's that simple.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <FaCreditCard />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Purchase</h3>
              <p className="text-gray-600">Select the perfect asset for your project and complete the secure checkout process.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <FaEnvelopeOpenText />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Receive</h3>
              <p className="text-gray-600">Get an instant email with your download link and license key. No waiting.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <FaRocket />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Build</h3>
              <p className="text-gray-600">Integrate the asset into your project and launch faster than ever before.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8"
            >
              <div className="flex items-center mb-6">
                <FaFilter className="mr-2 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => dispatch(setPriceRange(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => dispatch(resetFilters())}
                className="w-full py-2.5 px-4 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
              <p className="text-gray-600 font-medium">
                Showing {filteredProducts.length} results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="relative overflow-hidden h-64 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.price === 0 && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                          FREE
                        </span>
                      )}
                      {product.originalPrice > product.price && product.price > 0 && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                          SALE
                        </span>
                      )}
                    </div>

                    {product.isPopular && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center border border-white/50">
                        <FaStar className="mr-1 text-yellow-400" /> POPULAR
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1.5" />
                        <span className="text-gray-900 font-bold text-sm">{product.rating}</span>
                        <span className="text-gray-400 text-xs ml-1">({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {product.description}
                    </p>

                    {/* Meta Info Row */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-center">
                        <FaDownload className="mr-2 text-blue-500" />
                        <span className="font-medium">{product.downloads.toLocaleString()} Downloads</span>
                      </div>
                      <div className="flex items-center">
                        <FaCheckCircle className="mr-2 text-green-500" />
                        <span className="font-medium">Verified</span>
                      </div>
                    </div>

                    {/* Pricing & Action Area - Spacious & Sales Focused */}
                    <div className="mt-auto">
                      <div className="flex items-end justify-between mb-5">
                        <div>
                          <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">Price</p>
                          {product.price === 0 ? (
                            <div className="text-3xl font-bold text-green-600">Free</div>
                          ) : (
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-lg text-gray-400 line-through font-medium">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        {product.originalPrice > product.price && product.price > 0 && (
                          <div className="bg-red-50 text-red-600 px-2 py-1 rounded-lg text-xs font-bold">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-5 gap-3">
                        <Link
                          to={`/marketplace/products/${product.id}`}
                          className="col-span-4 bg-blue-600 text-white py-3.5 rounded-xl font-bold text-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-0.5"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => {
                            dispatch(addToCart({
                              id: product.id,
                              title: product.title,
                              price: product.price,
                              image: product.image,
                              type: 'Digital Product'
                            }));
                          }}
                          className="col-span-1 flex items-center justify-center border-2 border-gray-100 rounded-xl text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all"
                        >
                          <FaShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="text-gray-300 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms to find what you're looking for.</p>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Newsletter Section */}
      <div className="bg-blue-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Get Our Free Designer Resource Pack
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join 10,000+ creators and get a free bundle of icons, fonts, and templates delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-6 py-4 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-xl transition-colors flex items-center justify-center">
              <FaPaperPlane className="mr-2" /> Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm text-blue-300">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalProducts;
