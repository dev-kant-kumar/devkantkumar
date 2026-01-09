import { motion } from 'framer-motion';
import { AlertCircle, Copy, Download, Key, Loader2, Package, RefreshCw, Search, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery, useRegenerateDownloadLinksMutation } from '../../../store/orders/ordersApi';

const PurchasedProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user orders and filter for product orders
  const { data: ordersData, isLoading, isError, error, refetch } = useGetUserOrdersQuery();

  // Regenerate download links mutation
  const [regenerateLinks, { isLoading: isRegenerating }] = useRegenerateDownloadLinksMutation();

  // Extract products from orders
  const getProductsFromOrders = () => {
    if (!ordersData) return [];

    const products = [];
    const orders = Array.isArray(ordersData) ? ordersData : ordersData.orders || [];

    orders.forEach(order => {
      // Only show products from completed/confirmed orders
      if (!['confirmed', 'completed'].includes(order.status)) return;

      order.items?.forEach(item => {
        if (item.itemType === 'product') {
          products.push({
            id: item._id || item.itemId,
            orderId: order._id,
            name: item.title,
            version: 'Latest',
            type: 'Digital Product',
            purchaseDate: new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            licenseKey: item.licenseType || 'Standard License',
            fileSize: 'Click to download',
            rating: 5,
            image: '/placeholder-product.png', // Default image
            downloadLinks: item.downloadLinks || [],
            orderNumber: order.orderNumber,
          });
        }
      });
    });

    return products;
  };

  const products = getProductsFromOrders();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Copy license key
  const handleCopyLicense = (license) => {
    navigator.clipboard.writeText(license);
    toast.success('License key copied!');
  };

  // Handle download
  const handleDownload = (product) => {
    if (product.downloadLinks && product.downloadLinks.length > 0) {
      const validLink = product.downloadLinks.find(link =>
        !link.expiresAt || new Date(link.expiresAt) > new Date()
      );

      if (validLink) {
        window.open(validLink.url, '_blank');
        toast.success('Download started!');
      } else {
        toast.error('Download links expired. Regenerating...');
        handleRegenerate(product);
      }
    } else {
      toast.error('No download links available');
    }
  };

  // Regenerate download links
  const handleRegenerate = async (product) => {
    try {
      await regenerateLinks({
        orderId: product.orderId,
        itemId: product.id,
      }).unwrap();
      toast.success('Download links regenerated!');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to regenerate links');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-gray-500">Loading your products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
        <p className="text-gray-700 font-medium mb-2">Failed to load products</p>
        <p className="text-sm text-gray-500 mb-4">{error?.data?.message || 'Something went wrong'}</p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

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

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
            You haven't purchased any digital products yet. Browse our store to find templates, UI kits, and more.
          </p>
          <Link
            to="/marketplace/products"
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={`${product.orderId}-${product.id}`}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 group flex items-center justify-center">
                <Package className="h-16 w-16 text-green-600/50" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleDownload(product)}
                    className="p-2 bg-white rounded-full text-gray-900 hover:text-green-600 transition-colors"
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
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

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">• {product.orderNumber}</span>
                </div>

                <p className="text-xs text-gray-500 mb-4">Purchased: {product.purchaseDate}</p>

                <div className="mt-auto space-y-3">
                  {/* License Key */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Key className="h-3 w-3" /> License
                      </span>
                      <button
                        onClick={() => handleCopyLicense(product.licenseKey)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy License"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <code className="text-xs font-mono text-gray-700 block truncate bg-white px-2 py-1 rounded border border-gray-200">
                      {product.licenseKey}
                    </code>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(product)}
                    disabled={isRegenerating}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
                  >
                    {isRegenerating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {product.downloadLinks?.length > 0 ? 'Download' : 'Request Download'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PurchasedProducts;
