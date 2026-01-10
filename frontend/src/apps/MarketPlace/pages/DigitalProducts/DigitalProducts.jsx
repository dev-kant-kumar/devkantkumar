import { motion } from 'framer-motion';
import {
  CheckCircle,
  CreditCard,
  Download,
  Filter,
  Flame,
  Mail,
  Rocket,
  Search,
  ShoppingCart,
  Star,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import PriceDisplay from '../../../../components/common/PriceDisplay';
import { useAddToCartMutation } from '../../../../store/cart/cartApi';
import FAQ from '../../common/components/FAQ';
import Testimonials from '../../common/components/Testimonials';
import WhyChooseUs from '../../common/components/WhyChooseUs';
import { useCurrency } from '../../context/CurrencyContext';
import { useGetProductsQuery } from '../../store/api/marketplaceApi';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import { addToCart } from '../../store/cart/cartSlice';

const DigitalProducts = ({ category: propCategory }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [addToCartApi, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const [selectedCategory, setSelectedCategory] = useState(propCategory || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [email,setEmail]=useState('');
  /*
     Use search params to sync URL with search state.
     This allows external links (like from header) to drive the search.
  */
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update searchTerm if URL changes (e.g. back button or fresh navigation)
  React.useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== searchTerm) {
       setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Build query params
  const queryParams = useMemo(() => {
    const params = { limit: 50 };
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (debouncedSearch) params.search = debouncedSearch;
    if (priceRange !== 'all' && priceRange !== 'free') {
      if (priceRange === 'low') {
        params.minPrice = 1;
        params.maxPrice = 50;
      } else if (priceRange === 'medium') {
        params.minPrice = 50;
        params.maxPrice = 100;
      } else if (priceRange === 'high') {
        params.minPrice = 100;
      }
    }
    return params;
  }, [selectedCategory, debouncedSearch, priceRange]);

  // Fetch real products from API
  const {
    data: productsData,
    isLoading,
    error
  } = useGetProductsQuery({
    category: propCategory,
    page: 1,
    limit: 10,
    ...queryParams // Merge existing queryParams for search/price filtering
  });
  const { getPrice, formatPrice } = useCurrency();

  const products = useMemo(() => {
    if (!productsData?.products) return []; // Adjusted from productsData?.data?.products
    let filteredProducts = productsData.products;

    // Client-side filter for free products if priceRange is 'free'
    if (priceRange === 'free') {
      filteredProducts = filteredProducts.filter(p => p.price === 0);
    }
    return filteredProducts;
  }, [productsData, priceRange]);


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

  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      try {
        await addToCartApi({
          productId: product._id,
          itemId: product._id, // legacy support
          quantity: 1,
          itemType: 'product'
        }).unwrap();
        toast.success(`Added "${product.title}" to cart!`);
      } catch (error) {
        console.error('Failed to add to cart:', error);
        toast.error(error?.data?.message || 'Failed to add to cart');
      }
    } else {
      const cartItem = {
        id: product._id,
        itemId: product._id,
        itemType: 'product',
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        regionalPricing: product.regionalPricing,
        image: product.images?.[0]?.url,
        quantity: 1,
      };
      dispatch(addToCart(cartItem));
      toast.success(`Added "${product.title}" to cart!`);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
  };

  // Get featured product (first one)
  const featuredProduct = products[0];

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
                <Flame className="mr-2 h-4 w-4" /> FEATURED PRODUCT
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                Premium Digital <br />
                <span className="text-blue-400">Products & Templates</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover high-quality templates, themes, plugins, and digital assets.
                Launch your project faster with our premium resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/marketplace/products"
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center"
                >
                  Browse Products
                </Link>
              </div>
              <div className="mt-8 flex items-center text-sm text-gray-400 space-x-6">
                <div className="flex items-center">
                  <CheckCircle className="text-green-400 mr-2 h-4 w-4" /> {products.length}+ Products
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-2 h-4 w-4" /> Top Quality
                </div>
              </div>
            </motion.div>
            {featuredProduct && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="absolute -inset-4 bg-blue-500/30 rounded-full blur-3xl"></div>
                <img
                  src={featuredProduct.images?.[0]?.url || '/api/placeholder/600/400'}
                  alt={featuredProduct.title}
                  className="relative rounded-xl shadow-2xl border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <WhyChooseUs />

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start building your next big project in minutes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <CreditCard className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Purchase</h3>
              <p className="text-gray-600">Select the perfect asset and complete checkout.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <Mail className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Receive</h3>
              <p className="text-gray-600">Get instant download link and license key.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <Rocket className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Build</h3>
              <p className="text-gray-600">Integrate and launch faster than ever.</p>
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
                <Filter className="mr-2 text-blue-600 h-5 w-5" />
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="w-full py-2.5 px-4 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50"
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
                Showing {products.length} results
              </p>
            </div>

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="text-center py-16 bg-white rounded-xl border">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load products</h3>
                <p className="text-gray-500">Please try again later</p>
              </div>
            )}

            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product, index) => {
                  return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                  >
                    <div className="relative overflow-hidden h-48 flex-shrink-0">
                      <img
                        src={product.images?.[0]?.url || '/api/placeholder/400/250'}
                        alt={product.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.price === 0 && (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">FREE</span>
                        )}
                        {product.originalPrice > product.price && product.price > 0 && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">SALE</span>
                        )}
                      </div>

                      {product.isPopular && (
                        <div className="absolute top-4 right-4 bg-white/90 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                          <Star className="mr-1 h-3 w-3 text-yellow-400 fill-current" /> POPULAR
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase">
                          {product.category || 'Product'}
                        </span>
                        <div className="flex items-center">
                          <Star className="text-yellow-400 mr-1 h-4 w-4 fill-current" />
                          <span className="text-gray-900 font-bold text-sm">{product.rating?.average || 0}</span>
                          <span className="text-gray-400 text-xs ml-1">({product.rating?.count || 0})</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-6 pb-6 border-b border-gray-100">
                        <div className="flex items-center">
                          <Download className="mr-2 h-4 w-4 text-blue-500" />
                          <span className="font-medium">{(product.downloads || 0).toLocaleString()} Downloads</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          <span className="font-medium">Verified</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-end justify-between mb-5">
                          <div>
                            <p className="text-xs text-gray-400 font-medium mb-1 uppercase">Price</p>
                            {product.price === 0 ? (
                              <div className="text-2xl font-bold text-green-600">Free</div>
                            ) : (
                                <PriceDisplay
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    showOriginal={product.originalPrice > product.price}
                                    className="text-2xl mb-1"
                                    textClass="text-gray-900"
                                />
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
                            to={`/marketplace/products/${product._id || product.slug}`}
                            className="col-span-4 bg-blue-600 text-white py-3 rounded-xl font-bold text-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="col-span-1 flex items-center justify-center border-2 border-gray-100 rounded-xl text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all"
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  );
                })}
              </div>
            )}

            {!isLoading && !error && products.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="text-gray-300 text-6xl mb-4">�</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or add products in the admin panel.</p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Newsletter */}
      <div className="bg-blue-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Get Updates on New Products
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join creators and get notified when we launch new templates and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-6 py-4 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-xl transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalProducts;
