import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Download,
  Eye,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Code,
  FileText,
  Smartphone,
  Monitor
} from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock product data - in real app, this would come from API
  useEffect(() => {
    const mockProducts = {
      'react-dashboard': {
        id: 'react-dashboard',
        title: 'React Admin Dashboard',
        description: 'Complete admin dashboard template with 50+ components',
        longDescription: 'A comprehensive React admin dashboard template built with modern technologies. Features include user management, analytics, charts, tables, forms, and much more. Perfect for building admin panels, CRM systems, and business applications.',
        price: 79,
        originalPrice: 129,
        rating: 4.9,
        reviews: 234,
        downloads: 1520,
        category: 'Templates',
        tags: ['React', 'Dashboard', 'Admin', 'TypeScript', 'Tailwind CSS'],
        images: [
          '/api/placeholder/800/600',
          '/api/placeholder/800/600',
          '/api/placeholder/800/600',
          '/api/placeholder/800/600'
        ],
        features: [
          'React 18 with TypeScript',
          '50+ Reusable Components',
          'Responsive Design',
          'Dark/Light Theme',
          'Authentication System',
          'Charts & Analytics',
          'Data Tables',
          'Form Components',
          'Documentation Included',
          'Lifetime Updates'
        ],
        specifications: {
          'Framework': 'React 18',
          'Language': 'TypeScript',
          'Styling': 'Tailwind CSS',
          'Charts': 'Chart.js',
          'Icons': 'Lucide React',
          'Build Tool': 'Vite',
          'Package Manager': 'npm/yarn',
          'Browser Support': 'Modern browsers'
        },
        includes: [
          'Source Code',
          'Documentation',
          'Design Files (Figma)',
          'Installation Guide',
          'Component Library',
          'Example Pages',
          'Assets & Icons'
        ],
        changelog: [
          {
            version: '2.1.0',
            date: '2024-01-15',
            changes: [
              'Added new dashboard layouts',
              'Improved mobile responsiveness',
              'Bug fixes and performance improvements'
            ]
          },
          {
            version: '2.0.0',
            date: '2023-12-01',
            changes: [
              'Complete redesign',
              'Added TypeScript support',
              'New component library'
            ]
          }
        ]
      }
    };

    setTimeout(() => {
      setProduct(mockProducts[productId] || mockProducts['react-dashboard']);
      setLoading(false);
    }, 1000);
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/marketplace/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
            <span>/</span>
            <Link to="/marketplace/products" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link
                to="/marketplace/products"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </motion.div>

            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            >
              <div className="aspect-video">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {product.category}
                </span>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-500">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6">{product.longDescription}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1 h-4 w-4 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="ml-1">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Download className="mr-1 h-4 w-4" />
                  <span>{product.downloads.toLocaleString()} downloads</span>
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  <span>Live Preview</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0 h-4 w-4" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.includes.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6 sticky top-8"
            >
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">One-time purchase, lifetime access</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <Eye className="mr-2 h-4 w-4" />
                  Live Preview
                </button>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">File Format:</span>
                  <span className="font-medium">React/TypeScript</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">File Size:</span>
                  <span className="font-medium">~15 MB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">Jan 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">License:</span>
                  <span className="font-medium">Commercial Use</span>
                </div>
              </div>

              {/* Compatible Devices */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Compatible with:</h4>
                <div className="flex space-x-4">
                  <div className="flex items-center text-gray-600">
                    <Monitor className="h-4 w-4 mr-1" />
                    <span className="text-sm">Desktop</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Smartphone className="h-4 w-4 mr-1" />
                    <span className="text-sm">Mobile</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
