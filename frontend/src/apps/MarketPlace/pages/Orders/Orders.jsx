import { motion } from 'framer-motion';
import { AlertCircle, ChevronRight, Download, Loader2, Package, RefreshCw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import { useGetUserOrdersQuery } from '../../store/orders/ordersApi';

const Orders = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch real orders
  const { data: ordersData, isLoading, isError, refetch } = useGetUserOrdersQuery();
  // Handle both array response and object with orders/data property
  const orders = Array.isArray(ordersData) ? ordersData : (ordersData?.orders || ordersData?.data || []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/marketplace/auth/signin', { state: { from: '/marketplace/dashboard/orders' } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.items?.some(item => item.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Format helpers
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load orders</h3>
        <p className="text-gray-500 mb-4">Something went wrong while fetching your orders.</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
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
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage your purchase history</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {orders.length === 0 ? 'No orders yet' : 'No matching orders'}
          </h3>
          <p className="text-gray-500 mb-4">
            {orders.length === 0
              ? 'Start shopping to see your orders here.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          {orders.length === 0 && (
            <Link
              to="/marketplace/products"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
            >
              Browse Products
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Product Icon */}
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center border border-green-200">
                      <Package className="h-8 w-8 text-green-600" />
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.items?.[0]?.title || 'Order'}
                          {order.items?.length > 1 && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                              +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Order #{order.orderNumber || order._id?.substring(order._id.length - 8).toUpperCase()} • {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)}
                        </p>
                        <p className="text-xs text-gray-500">{order.items?.length || 0} item(s)</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(order.status)} capitalize`}>
                        {order.status?.replace('_', ' ')}
                      </span>

                      <div className="flex items-center gap-3">
                        {(order.status === 'completed' || order.status === 'delivered') && (
                          <Link
                            to={`/marketplace/dashboard/orders/${order._id}/invoice`}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <Download className="h-4 w-4 mr-1.5" />
                            Invoice
                          </Link>
                        )}
                        {order.items?.some(item => item.itemType === 'service') && (
                          <Link
                            to={`/marketplace/dashboard/services/${order._id}`}
                            className="flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium group"
                          >
                            View Workspace
                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar for Processing Orders */}
              {(order.status === 'in_progress' || order.status === 'confirmed') && (
                <div className="bg-blue-50 px-6 py-3 border-t border-blue-100 flex items-center gap-3">
                  <Package className="h-4 w-4 text-blue-600 animate-pulse" />
                  <span className="text-sm text-blue-700 font-medium">
                    {order.status === 'confirmed'
                      ? 'Your order has been confirmed and is being prepared.'
                      : 'Your order is in progress. You can track updates in the workspace.'}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Orders;
