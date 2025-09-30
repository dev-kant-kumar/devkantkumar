import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaStar,
  FaDownload,
  FaShoppingCart,
  FaHeart,
  FaFilter,
  FaSearch,
  FaTag
} from 'react-icons/fa';

const DigitalProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [loading, setLoading] = useState(true);

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
    { id: '1-25', name: '$1 - $25' },
    { id: '25-50', name: '$25 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100+', name: '$100+' }
  ];

  // Mock products data
  useEffect(() => {
    const mockProducts = [
      {
        id: 'react-dashboard',
        title: 'Modern React Dashboard Template',
        description: 'Complete admin dashboard template with React, TypeScript, and Tailwind CSS',
        image: '/api/placeholder/400/250',
        price: 49,
        originalPrice: 79,
        rating: 4.8,
        reviews: 234,
        downloads: 1250,
        category: 'templates',
        tags: ['React', 'TypeScript', 'Dashboard', 'Admin'],
        features: ['Responsive Design', 'Dark Mode', '20+ Components', 'TypeScript Support'],
        preview: '/api/placeholder/800/600',
        files: ['Source Code', 'Documentation', 'PSD Files']
      },
      {
        id: 'ecommerce-theme',
        title: 'E-commerce WordPress Theme',
        description: 'Professional e-commerce theme for WordPress with WooCommerce integration',
        image: '/api/placeholder/400/250',
        price: 69,
        originalPrice: 99,
        rating: 4.9,
        reviews: 189,
        downloads: 890,
        category: 'themes',
        tags: ['WordPress', 'WooCommerce', 'E-commerce', 'Responsive'],
        features: ['WooCommerce Ready', 'Mobile Responsive', 'SEO Optimized', 'One-Click Demo'],
        preview: '/api/placeholder/800/600',
        files: ['Theme Files', 'Documentation', 'Demo Content']
      },
      {
        id: 'seo-plugin',
        title: 'Advanced SEO Plugin',
        description: 'Powerful SEO plugin to boost your website rankings and performance',
        image: '/api/placeholder/400/250',
        price: 29,
        originalPrice: 49,
        rating: 4.7,
        reviews: 156,
        downloads: 2100,
        category: 'plugins',
        tags: ['SEO', 'WordPress', 'Analytics', 'Performance'],
        features: ['Schema Markup', 'XML Sitemaps', 'Meta Optimization', 'Analytics Integration'],
        preview: '/api/placeholder/800/600',
        files: ['Plugin Files', 'User Guide', 'Video Tutorials']
      },
      {
        id: 'icon-pack',
        title: 'Premium Icon Pack - 500+ Icons',
        description: 'High-quality vector icons for web and mobile applications',
        image: '/api/placeholder/400/250',
        price: 19,
        originalPrice: 35,
        rating: 4.6,
        reviews: 89,
        downloads: 1680,
        category: 'graphics',
        tags: ['Icons', 'Vector', 'SVG', 'UI'],
        features: ['500+ Icons', 'Multiple Formats', 'Scalable Vector', 'Commercial License'],
        preview: '/api/placeholder/800/600',
        files: ['SVG Files', 'PNG Files', 'Icon Font', 'License']
      },
      {
        id: 'web-dev-course',
        title: 'Complete Web Development Course',
        description: 'Learn modern web development from scratch to advanced level',
        image: '/api/placeholder/400/250',
        price: 0,
        originalPrice: 199,
        rating: 4.9,
        reviews: 567,
        downloads: 3200,
        category: 'courses',
        tags: ['Education', 'Web Development', 'JavaScript', 'React'],
        features: ['40+ Hours Content', 'Project-Based Learning', 'Certificate', 'Lifetime Access'],
        preview: '/api/placeholder/800/600',
        files: ['Video Lessons', 'Source Code', 'Resources', 'Certificate']
      },
      {
        id: 'modern-font',
        title: 'Modern Sans Serif Font Family',
        description: 'Professional font family with multiple weights and styles',
        image: '/api/placeholder/400/250',
        price: 39,
        originalPrice: 59,
        rating: 4.8,
        reviews: 78,
        downloads: 456,
        category: 'fonts',
        tags: ['Typography', 'Font', 'Sans Serif', 'Modern'],
        features: ['8 Weights', 'Italic Styles', 'Web Fonts', 'Commercial License'],
        preview: '/api/placeholder/800/600',
        files: ['OTF Files', 'TTF Files', 'Web Fonts', 'License']
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (priceRange !== 'all') {
      if (priceRange === 'free') {
        filtered = filtered.filter(product => product.price === 0);
      } else {
        const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
        filtered = filtered.filter(product => {
          if (priceRange === '100+') {
            return product.price >= 100;
          }
          return product.price >= parseInt(min) && product.price <= parseInt(max);
        });
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Digital Products</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download premium digital products to enhance your projects and skills
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6 sticky top-8"
            >
              <div className="flex items-center mb-4">
                <FaFilter className="mr-2 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                    {product.price === 0 && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        FREE
                      </div>
                    )}
                    {product.originalPrice > product.price && product.price > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        SALE
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <FaHeart className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FaDownload className="mr-1" />
                      <span>{product.downloads.toLocaleString()} downloads</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs flex items-center"
                        >
                          <FaTag className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {product.price === 0 ? (
                          <div className="text-xl font-bold text-green-600">FREE</div>
                        ) : (
                          <div className="flex items-center">
                            <span className="text-xl font-bold text-gray-900">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <FaShoppingCart className="text-gray-600" />
                        </button>
                        <Link
                          to={`/marketplace/products/${product.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalProducts;
