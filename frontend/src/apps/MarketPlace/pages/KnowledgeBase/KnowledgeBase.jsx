import { motion } from 'framer-motion';
import { ChevronRight, FileText, MessageCircle, Search, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  const categories = [
    {
      title: 'Account & Billing',
      icon: 'User',
      count: 12,
      articles: ['Managing subscription', 'Updating payment method', 'Password reset']
    },
    {
      title: 'Getting Started',
      icon: 'Zap',
      count: 8,
      articles: ['Platform overview', 'First purchase guide', 'Setting up profile']
    },
    {
      title: 'Orders & Shipping',
      icon: 'Package',
      count: 15,
      articles: ['Tracking orders', 'Refund policy', 'Digital downloads']
    },
    {
      title: 'Technical Support',
      icon: 'Cpu',
      count: 24,
      articles: ['API keys', 'Integration guide', 'Troubleshooting errors']
    }
  ];

  const popularArticles = [
    { title: 'How to download purchased assets?', category: 'Orders', views: 2450 },
    { title: 'Understanding license types', category: 'General', views: 1890 },
    { title: 'Fixing "Access Denied" error', category: 'Technical', views: 1560 },
    { title: 'Requesting a refund', category: 'Billing', views: 1240 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Knowledge Base
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Find instant answers to your questions
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-white/30 focus:border-white text-lg text-gray-900 shadow-xl placeholder-gray-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Categories Grid */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{cat.title}</h3>
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {cat.count} articles
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {cat.articles.map((article, i) => (
                      <li key={i}>
                        <Link to="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm group">
                          <FileText size={16} className="mr-2 text-gray-400 group-hover:text-blue-600" />
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-5 text-sm font-semibold">
                    View all <ChevronRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - Popular */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Popular Articles</h3>
              <div className="space-y-4">
                {popularArticles.map((article, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex justify-between items-start pb-4 border-b last:border-0 border-gray-100"
                  >
                    <div>
                      <Link to="#" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors block mb-1">
                        {article.title}
                      </Link>
                      <span className="text-xs text-gray-500">{article.category}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                       <ThumbsUp size={12} className="mr-1" />
                       {article.views}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 cursor-pointer">Can't find an answer?</h4>
                  <p className="text-xs text-gray-600 mb-3">Our support team is here to help.</p>
                  <Link to="/marketplace/support" className="text-sm font-bold text-blue-600 hover:underline">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
