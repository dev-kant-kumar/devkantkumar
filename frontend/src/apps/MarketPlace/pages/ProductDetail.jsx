import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaDownload,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaCheck,
  FaEye
} from 'react-icons/fa';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock product data
    const mockProduct = {
      id: 'react-dashboard',
      title: 'Modern React Dashboard Template',
      description: 'Complete admin dashboard template with React, TypeScript, and Tailwind CSS',
      longDescription: 'This comprehensive dashboard template provides everything you need to build a modern admin interface. Built with the latest technologies including React 18, TypeScript, and Tailwind CSS, it offers a clean, responsive design with dark mode support.',
      image: '/api/placeholder/800/400',
      price: 49,
      originalPrice: 79,
      rating: 4.8,
      reviews: 234,
      downloads: 1250,
      category: 'templates',
      tags: ['React', 'TypeScript', 'Dashboard', 'Admin'],
      features: [
        'Responsive Design',
        'Dark Mode Support',
        '20+ Components',
        'TypeScript Support',
        'Tailwind CSS',
        'Chart Integration',
        'Authentication Pages',
        'Form Components'
      ],
      preview: '/api/placeholder/800/600',
      files: [
        'Source Code (React + TypeScript)',
        'Documentation (PDF)',
        'PSD Design Files',
        'Icon Pack',
        'Font Files'
      ],
      screenshots: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ],
      requirements: [
        'Node.js 16+',
        'React 18+',
        'Modern Browser',
        'Code Editor'
      ],
      changelog: [
        {
          version: '2.1.0',
          date: '2024-01-15',
          changes: ['Added dark mode', 'New chart components', 'Bug fixes']
        },
        {
          version: '2.0.0',
          date: '2023-12-01',
          changes: ['TypeScript migration', 'Updated dependencies', 'Performance improvements']
        }
      ]
    };

    setTimeout(() => {
      setProduct(mockProduct);
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

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'features', name: 'Features' },
    { id: 'files', name: 'Files Included' },
    { id: 'requirements', name: 'Requirements' },
    { id: 'changelog', name: 'Changelog' }
  ];

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
                <FaArrowLeft className="mr-2" />
                Back to Products
              </Link>
            </motion.div>

            {/* Product Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Template
                  </span>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-red-500">
                      <FaHeart />
                    </button>
                    <button className="text-gray-400 hover:text-blue-500">
                      <FaShare />
                    </button>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                <p className="text-gray-600 mb-4">{product.longDescription}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="ml-1">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <FaDownload className="mr-1" />
                    <span>{product.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Product Overview</h3>
                    <p className="text-gray-600 mb-6">{product.longDescription}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {product.screenshots.map((screenshot, index) => (
                        <img
                          key={index}
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Features Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'files' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Files Included</h3>
                    <div className="space-y-3">
                      {product.files.map((file, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <FaDownload className="text-blue-500 mr-3" />
                          <span className="text-gray-700">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">System Requirements</h3>
                    <div className="space-y-2">
                      {product.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center">
                          <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'changelog' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Version History</h3>
                    <div className="space-y-4">
                      {product.changelog.map((version, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">Version {version.version}</h4>
                            <span className="text-sm text-gray-500">{version.date}</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {version.changes.map((change, changeIndex) => (
                              <li key={changeIndex}>• {change}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              <div className="text-center mb-6">
                {product.price === 0 ? (
                  <div className="text-3xl font-bold text-green-600 mb-2">FREE</div>
                ) : (
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                )}
                <p className="text-sm text-gray-600">One-time purchase</p>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  {product.price === 0 ? 'Download Free' : 'Add to Cart
