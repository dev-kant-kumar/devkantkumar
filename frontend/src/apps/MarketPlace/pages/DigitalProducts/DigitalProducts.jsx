import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Download,
  Eye,
  ShoppingCart,
  Heart,
  Grid,
  List
} from 'lucide-react';

const DigitalProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'templates', name: 'Website Templates' },
    { id: 'components', name: 'UI Components' },
    { id: 'themes', name: 'Themes' },
    { id: 'plugins', name: 'Plugins' },
    { id: 'graphics', name: 'Graphics' },
    { id: 'fonts', name: 'Fonts' }
  ];

  const products = [
    {
      id: 'react-dashboard',
      title: 'React Admin Dashboard',
      description: 'Complete admin dashboard template with 50+ components',
      category: 'templates',
      price: 79,
      originalPrice: 129,
      rating: 4.9,
      reviews: 234,
      downloads: 1520,
      image: '/api/placeholder/400/300',
      tags: ['React', 'Dashboard', 'Admin', 'TypeScript'],
      featured: true,
      preview: true
    },
    {
      id: 'ui-kit',
      title: 'Modern UI Component Kit',
      description: '100+ premium React components ready to use',
      category: 'components',
      price: 49,
      originalPrice: 79,
      rating: 4.8,
      reviews: 189,
      downloads: 2340,
      image: '/api/placeholder/400/300',
      tags: ['React', 'Components', 'UI Kit', 'Styled'],
      featured: false,
      preview: true
    },
    {
      id: 'nextjs-starter',
      title: 'Next.js Starter Template',
      description: 'Production-ready Next.js template with authentication',
      category: 'templates',
      price: 99,
      originalPrice: 149,
      rating: 5.0,
      reviews: 156,
      downloads: 890,
      image: '/api/placeholder/400/300',
      tags: ['Next.js', 'Authentication', 'TypeScript', 'Tailwind'],
      featured: true,
      preview: true
    },
    {
      id: 'icon-pack',
      title: 'Premium Icon Collection',
      description: '500+ high-quality SVG icons for web and mobile',
      category: 'graphics',
      price: 29,
      originalPrice: 49,
      rating: 4.7,
      reviews: 445,
      downloads: 3200,
      image: '/api/placeholder/400/300',
      tags: ['Icons', 'SVG', 'Graphics', 'Design'],
      featured: false,
      preview: false
    },
    {
      id: 'wordpress-theme',
      title: 'Business WordPress Theme',
      description: 'Professional WordPress theme for business websites',
      category: 'themes',
      price: 59,
      originalPrice: 89,
      rating: 4.6,
      reviews: 312,
      downloads: 1780,
      image: '/api/placeholder/400/300',
      tags: ['WordPress', 'Business', 'Responsive', 'SEO'],
      featured: false,
      preview: true
    },
    {
      id: 'animation-library',
      title: 'CSS Animation Library',
      description: 'Collection of smooth CSS animations and transitions',
      category: 'components',
      price: 39,
      originalPrice: 59,
      rating: 4.8,
      reviews: 267,
      downloads: 1950,
      image: '/api/placeholder/400/300',
      tags: ['CSS', 'Animations', 'Transitions', 'Effects'],
      featured: false,
      preview: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'free' && product.price === 0) ||
                        (priceRange === 'low' && product.price > 0 && product.price <= 50) ||
                        (priceRange === 'medium' && product.price > 50 && product.price <= 100) ||
                        (priceRange === 'high' && product.price > 100);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Digital Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium digital products to accelerate your development workflow
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="low">$1 - $50</option>
                  <option value="medium">$51 - $100</option>
                  <option value="high">$100+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Most Downloaded</option>
                </select>
              </div>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                    />
                    {product.featured && (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-2">
                      {product.preview && (
                        <button className="bg-white bg-opacity-90 p-1 rounded hover:bg-opacity-100">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                      )}
                      <button className="bg-white bg-opacity-90 p-1 rounded hover:bg-opacity-100">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {categories.find(cat => cat.id === product.category)?.name}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{product.downloads.toLocaleString()} downloads</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {product.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{product.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/marketplace/products/${product.id}`}
                          className="bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors text-sm"
                        >
                          View Details
                        </Link>
                        <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors flex items-center text-sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalProducts;
