import { motion } from 'framer-motion';
import { AlertCircle, Download, Package, RefreshCw, ShoppingBag, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../../store/auth/authSlice';
import { useGetUserOrdersQuery } from '../../../store/orders/ordersApi';

const DashboardOverview = () => {
  const user = useSelector(selectCurrentUser);
  const displayName = user?.firstName || user?.name || 'User';

  // Fetch real orders
  const { data: ordersData, isLoading, isError, refetch } = useGetUserOrdersQuery();
  // Handle both array response and object with orders/data property
  const orders = Array.isArray(ordersData) ? ordersData : (ordersData?.orders || ordersData?.data || []);

  // Calculate real stats from orders
  const totalOrders = orders.length;
  const activeServices = orders.filter(o =>
    o.items?.some(item => item.itemType === 'service') &&
    ['confirmed', 'in_progress', 'pending'].includes(o.status)
  ).length;
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'delivered').length;
  const totalProducts = orders.reduce((acc, order) => {
    return acc + (order.items?.filter(item => item.itemType === 'product').length || 0);
  }, 0);

  const stats = [
    { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingBag, color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Active Services', value: activeServices.toString(), icon: Package, color: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Products Owned', value: totalProducts.toString(), icon: Download, color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Completed', value: completedOrders.toString(), icon: Star, color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' }
  ];

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

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24"></div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-64"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load dashboard</h3>
        <p className="text-gray-500 mb-4">Something went wrong while fetching your data.</p>
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
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}!</h2>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 truncate" title={stat.label}>{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          <Link
            to="/marketplace/dashboard/orders"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            View All
          </Link>
        </div>
        {orders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {orders.slice(0, 5).map((order) => (
              <li key={order._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {order.items?.[0]?.title || 'Order'}
                        {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                      </p>
                      <p className="text-xs text-gray-500">
                        #{order.orderNumber || order._id?.substring(order._id.length - 8).toUpperCase()} • {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-12 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h4>
            <p className="text-sm text-gray-500 mb-4">Start shopping to see your orders here.</p>
            <Link
              to="/marketplace/products"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
