import { motion } from 'framer-motion';
import { AlertCircle, Book, Code, Eye, Loader2, Package, Play, RefreshCw, Search, Settings, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
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
      // Show products from orders where payment is completed or order is processed
      const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'delivered'];
      const hasValidStatus = validStatuses.includes(order.status);
      const hasCompletedPayment = order.payment?.status === 'completed';

      if (!hasValidStatus && !hasCompletedPayment) return;

      order.items?.forEach(item => {
        if (item.itemType === 'product') {
          // Get populated product data
          const populatedProduct = item.itemId && typeof item.itemId === 'object' ? item.itemId : null;

          products.push({
            id: (populatedProduct?._id) || item.itemId,
            orderId: order._id,
            name: item.title,
            // Use populated product data for version, or fallback
            version: populatedProduct?.version || 'Latest',
            type: 'Digital Product',
            purchaseDate: new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            licenseKey: item.licenseType || 'Standard License',
            rating: populatedProduct?.rating?.average || 5,
            // Get image from populated product
            image: populatedProduct?.images?.[0]?.url || '/placeholder-product.png',
            // Download links from order item
            downloadLinks: item.downloadLinks || [],
            // Download files from populated product
            productFiles: populatedProduct?.downloadFiles || [],
            // External links from populated product
            demoUrl: populatedProduct?.demoUrl || null,
            documentationUrl: populatedProduct?.documentationUrl || null,
            sourceCodeUrl: populatedProduct?.sourceCodeUrl || null,
            // Features
            features: populatedProduct?.features || [],
            orderNumber: order.orderNumber,
            slug: populatedProduct?.slug,
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

  const navigate = useNavigate();

  // Handle navigation to details
  const handleManageProduct = (product) => {
    navigate(`/marketplace/dashboard/products/${product.orderId}/${product.id}`);
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
                {product.image && product.image !== '/placeholder-product.png' ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <Package className="h-16 w-16 text-green-600/50" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleManageProduct(product)}
                    className="p-2 bg-white rounded-full text-gray-900 hover:text-green-600 transition-colors cursor-pointer"
                    title="Manage & Download"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                  {product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-gray-900 hover:text-blue-600 transition-colors"
                      title="Live Demo"
                    >
                      <Play className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                  v{product.version}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={product.name}>{product.name}</h3>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">• {product.orderNumber}</span>
                </div>

                <p className="text-xs text-gray-500 mb-2">Purchased: {product.purchaseDate}</p>

                {/* Download Stats */}
                {product.downloadLinks?.length > 0 && (
                  <div className="mb-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-gray-600 font-medium">Downloads Left</span>
                      <span className={`${product.downloadLinks[0].isExhausted ? 'text-red-600' : 'text-green-600'}`}>
                        {product.downloadLinks[0].maxDownloads - product.downloadLinks[0].downloadCount}/{product.downloadLinks[0].maxDownloads}
                      </span>
                    </div>
                    {product.downloadLinks[0].expiresAt && (
                      <div className="text-[10px] text-gray-500">
                        Expires: {new Date(product.downloadLinks[0].expiresAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                )}

                {/* External Links */}
                {(product.demoUrl || product.documentationUrl || product.sourceCodeUrl) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.demoUrl && (
                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    )}
                    {product.documentationUrl && (
                      <a
                        href={product.documentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-1 rounded"
                      >
                        <Book className="h-3 w-3 mr-1" />
                        Docs
                      </a>
                    )}
                    {product.sourceCodeUrl && (
                      <a
                        href={product.sourceCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-gray-600 hover:text-gray-700 bg-gray-100 px-2 py-1 rounded"
                      >
                        <Code className="h-3 w-3 mr-1" />
                        Source
                      </a>
                    )}
                  </div>
                )}

                <div className="mt-auto">
                  {/* Download Button */}
                  <button
                    onClick={() => handleManageProduct(product)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Manage Product
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
