import { motion } from 'framer-motion';
import { AlertCircle, CreditCard, Download, Loader2, Package, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../../store/orders/ordersApi';

const Billing = () => {
  // Fetch real orders for invoice history
  const { data: ordersData, isLoading, isError, refetch } = useGetUserOrdersQuery();
  // Handle both array response and object with orders/data property
  const orders = Array.isArray(ordersData) ? ordersData : (ordersData?.orders || ordersData?.data || []);

  // Get completed/delivered orders for invoice history
  const paidOrders = orders
    .filter(order => order.payment?.status === 'completed')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format currency helper
  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
        <p className="mt-1 text-sm text-gray-500">View your payment history and download invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="h-32 w-32 text-green-600" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Account Status</h3>
                  <p className="text-sm text-gray-500">Your account is in good standing.</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">Active</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>All purchases are protected</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Secure payment processing via Razorpay</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Invoices available for all paid orders</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/marketplace/products"
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Browse Products
                </Link>
                <Link
                  to="/marketplace/services"
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>

          {/* Payment Methods Note */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Payment Methods</h3>
                <p className="text-sm text-gray-500">
                  We use Razorpay for secure payments. Your card details are never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Invoice History</h3>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-green-600" />
            </div>
          ) : isError ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-2">Failed to load invoices</p>
              <button
                onClick={() => refetch()}
                className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1 mx-auto"
              >
                <RefreshCw className="h-3 w-3" /> Retry
              </button>
            </div>
          ) : paidOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No invoices yet</p>
              <p className="text-xs text-gray-400 mt-1">Invoices will appear here after your first purchase.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paidOrders.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)} • {order.items?.length || 0} item(s)
                    </p>
                  </div>
                  <Link
                    to={`/marketplace/dashboard/orders/${order._id}/invoice`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Download Invoice"
                  >
                    <Download className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {paidOrders.length > 5 && (
            <Link
              to="/marketplace/dashboard/orders"
              className="w-full mt-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              View All Orders
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Billing;
