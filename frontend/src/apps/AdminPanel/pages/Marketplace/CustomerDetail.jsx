import {
    ArrowLeft,
    Calendar,
    ChevronRight,
    CreditCard,
    DollarSign,
    Mail,
    Package,
    Shield,
    ShoppingBag,
    User
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useGetCustomerByIdQuery } from '../../store/api/adminApiSlice';

const CustomerDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCustomerByIdQuery(id);

  const customer = data?.customer;
  const orders = data?.orders || [];
  const stats = data?.stats || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/30 dark:text-yellow-300',
      confirmed: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-300',
      completed: 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-300',
      cancelled: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-300'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 ring-gray-600/20';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <User size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer Not Found</h2>
        <Link to="/admin/marketplace/customers" className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
          Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <Link
          to="/admin/marketplace/customers"
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Customers
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset
                ${customer.isActive !== false
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 ring-green-600/20'
                  : 'bg-gray-50 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400 ring-gray-600/20'
              }`}>
                {customer.isActive !== false ? 'Active' : 'Inactive'}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span>Customer since {formatDate(customer.createdAt)}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign size={64} />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            ₹{(stats.totalSpent || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShoppingBag size={64} />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {stats.totalOrders || 0}
          </p>
        </div>

        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard size={64} />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Order Value</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            ₹{(stats.averageOrderValue || 0).toFixed(2)}
          </p>
        </div>

        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar size={64} />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Order</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-2 truncate">
            {stats.lastOrderDate ? formatDate(stats.lastOrderDate) : 'Never'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact & Address Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white break-all">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">User Role</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{customer.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Account ID</p>
                  <p className="text-xs font-mono font-medium text-gray-900 dark:text-white">{customer._id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Book Placeholder for now - can be expanded if address data exists on user object */}
          {customer.addresses && customer.addresses.length > 0 && (
             <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Address Book</h3>
                {/* Address implementation would go here */}
             </div>
          )}
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order History</h3>
              <span className="text-sm text-gray-500">{orders.length} orders</span>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <Package size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders placed yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
                      <th className="px-6 py-4 font-semibold text-xs uppercase text-gray-500 dark:text-gray-400">Order ID</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase text-gray-500 dark:text-gray-400">Date</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase text-gray-500 dark:text-gray-400">Status</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase text-gray-500 dark:text-gray-400">Amount</th>
                      <th className="px-6 py-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                            #{order._id.substring(order._id.length - 8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {order.payment?.amount?.currency} {(order.payment?.amount?.total || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
