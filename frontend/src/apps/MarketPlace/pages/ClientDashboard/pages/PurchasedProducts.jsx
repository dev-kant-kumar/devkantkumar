import { motion } from 'framer-motion';
import { Copy, Download, ExternalLink, Key, Search, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ecommerceUiKit from '../../../assets/images/ecommerce-ui-kit.png';

const PurchasedProducts = () => {
  const products = [
    {
      id: 'PRD-001',
      name: 'E-commerce UI Kit',
      version: 'v2.4.0',
      type: 'UI Kit',
      purchaseDate: 'Oct 24, 2023',
      licenseKey: 'XXXX-YYYY-ZZZZ-AAAA',
      fileSize: '145 MB',
      rating: 5,
      image: ecommerceUiKit
    },
    {
      id: 'PRD-002',
      name: 'SaaS Dashboard Template',
      version: 'v1.1.0',
      type: 'Template',
      purchaseDate: 'Oct 15, 2023',
      licenseKey: 'BBBB-CCCC-DDDD-EEEE',
      fileSize: '85 MB',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 'PRD-003',
      name: 'Mobile App UI Kit',
      version: 'v3.0.0',
      type: 'UI Kit',
      purchaseDate: 'Oct 10, 2023',
      licenseKey: 'FFFF-GGGG-HHHH-IIII',
      fileSize: '210 MB',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=300'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          <p className="mt-1 text-sm text-gray-500">Access your digital downloads and license keys.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Link to="/marketplace/products" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
            Browse Store
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100 group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="p-2 bg-white rounded-full text-gray-900 hover:text-green-600 transition-colors">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                {product.type}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={product.name}>{product.name}</h3>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-500">• {product.version}</span>
              </div>

              <div className="mt-auto space-y-3">
                {/* License Key */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <Key className="h-3 w-3" /> License Key
                    </span>
                    <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Copy License">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <code className="text-xs font-mono text-gray-700 block truncate bg-white px-2 py-1 rounded border border-gray-200">
                    {product.licenseKey}
                  </code>
                </div>

                {/* Download Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                  <Download className="h-4 w-4" />
                  Download ({product.fileSize})
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PurchasedProducts;
