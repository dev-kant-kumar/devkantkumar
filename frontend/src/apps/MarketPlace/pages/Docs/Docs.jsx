import { motion } from 'framer-motion';
import { Book, Code, FileText, Search, Terminal } from 'lucide-react';

const Docs = () => {
  const categories = [
    {
      title: 'Getting Started',
      icon: Book,
      links: ['Introduction', 'Installation', 'Configuration', 'Quick Start']
    },
    {
      title: 'Components',
      icon: Code,
      links: ['Buttons', 'Forms', 'Navigation', 'Cards', 'Modals']
    },
    {
      title: 'API Reference',
      icon: Terminal,
      links: ['Authentication', 'Users', 'Products', 'Orders']
    },
    {
      title: 'Guides',
      icon: FileText,
      links: ['Best Practices', 'Deployment', 'Security', 'Performance']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Documentation
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Everything you need to build amazing products with our tools and services.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-white/30 focus:border-white text-lg text-gray-900 shadow-xl placeholder-gray-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <category.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
              </div>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center group">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2 group-hover:bg-blue-600 transition-colors"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docs;
