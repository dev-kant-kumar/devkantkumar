import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Clock,
    CreditCard,
    Loader2,
    Mail,
    MessageSquare,
    Package,
    Phone,
    Plus,
    RefreshCw,
    Send,
    Truck,
    User
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import {
    useAddAdminMessageMutation,
    useAddMilestoneMutation,
    useGetAdminOrderByIdQuery,
    useMarkOrderDeliveredMutation,
    useUpdateAdminOrderStatusMutation
} from '../../store/api/adminApiSlice';

const STATUS_COLORS = {
  pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  confirmed: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  in_progress: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  completed: 'bg-green-50 text-green-700 ring-green-600/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
  delivered: 'bg-green-50 text-green-700 ring-green-600/20',
};

const TIMELINE_COLORS = {
  created: 'bg-gray-500',
  pending: 'bg-yellow-500',
  confirmed: 'bg-blue-500',
  payment_completed: 'bg-green-500',
  in_progress: 'bg-purple-500',
  completed: 'bg-green-500',
  delivered: 'bg-green-500',
  message: 'bg-indigo-500',
  cancelled: 'bg-red-500',
};

const OrderDetail = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [newMilestone, setNewMilestone] = useState({ status: '', message: '' });
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // API Queries
  const { data: orderData, isLoading, isError, error, refetch } = useGetAdminOrderByIdQuery(id, {
    skip: !id,
    pollingInterval: 30000,
  });

  // Mutations
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateAdminOrderStatusMutation();
  const [addMilestone, { isLoading: isAddingMilestone }] = useAddMilestoneMutation();
  const [addMessage, { isLoading: isSendingMessage }] = useAddAdminMessageMutation();
  const [markDelivered, { isLoading: isDelivering }] = useMarkOrderDeliveredMutation();

  const order = orderData?.data || orderData;

  // Format functions
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Handlers
  const handleStatusChange = async (newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update status');
    }
  };

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    if (!newMilestone.status || !newMilestone.message) return;

    try {
      await addMilestone({ id, ...newMilestone }).unwrap();
      toast.success('Milestone added');
      setNewMilestone({ status: '', message: '' });
      setShowMilestoneForm(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add milestone');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await addMessage({ id, message: newMessage.trim() }).unwrap();
      toast.success('Message sent');
      setNewMessage('');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to send message');
    }
  };

  const handleDelivery = async () => {
    try {
      await markDelivered({ id, deliveryNotes }).unwrap();
      toast.success('Order marked as delivered');
      setShowDeliveryModal(false);
      setDeliveryNotes('');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to mark as delivered');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Failed to load order</h3>
        <p className="text-gray-500 mb-4">{error?.data?.message || 'Something went wrong'}</p>
        <button onClick={refetch} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16 text-gray-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link to="/admin/marketplace/orders" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Order #{order.orderNumber}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset ${STATUS_COLORS[order.status]}`}>
              {order.status?.replace('_', ' ')}
            </span>
          </div>
          <p className="text-gray-500 mt-1">Created {formatDate(order.createdAt)}</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdatingStatus}
            className="px-4 py-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-gray-900 dark:text-gray-100"
          >
            <option value="pending" className="bg-white dark:bg-gray-800">Pending</option>
            <option value="confirmed" className="bg-white dark:bg-gray-800">Confirmed</option>
            <option value="in_progress" className="bg-white dark:bg-gray-800">In Progress</option>
            <option value="completed" className="bg-white dark:bg-gray-800">Completed</option>
            <option value="cancelled" className="bg-white dark:bg-gray-800">Cancelled</option>
          </select>

          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <button
              onClick={() => setShowDeliveryModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
            >
              <Truck className="h-4 w-4" /> Mark Delivered
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" /> Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.billing?.firstName} {order.billing?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                  <Mail className="h-4 w-4" /> {order.billing?.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                  <Phone className="h-4 w-4" /> {order.billing?.phone || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {order.billing?.address?.city}, {order.billing?.address?.country}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-500" /> Order Items
            </h3>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100/50 dark:border-gray-700/50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-500 capitalize">{item.itemType} × {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(item.price, order.payment?.amount?.currency)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                <p className="font-bold text-gray-900 dark:text-white">Total</p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Section */}
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              Messages ({order.communication?.messages?.length || 0})
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 mb-4 pr-1">
              {order.communication?.messages?.length > 0 ? (
                order.communication.messages.map((msg, index) => (
                  <div key={index} className={`p-3 rounded-lg ${msg.sender?.role === 'admin' ? 'bg-blue-50/50 dark:bg-blue-900/20 ml-8' : 'bg-gray-50/50 dark:bg-gray-700/30 mr-8'} border border-gray-100/50 dark:border-gray-700/30`}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {msg.sender?.firstName || 'Customer'}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(msg.timestamp)}</p>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No messages yet</p>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a reply..."
                className="flex-1 px-4 py-2 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm dark:text-white placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || isSendingMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg shadow-blue-600/20"
              >
                {isSendingMessage ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Timeline & Payment */}
        <div className="space-y-6">
          {/* Payment Info */}
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-500" /> Payment Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`font-medium ${order.payment?.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.payment?.status || 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">{order.payment?.method || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(order.payment?.amount?.subtotal, order.payment?.amount?.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(order.payment?.amount?.tax, order.payment?.amount?.currency)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200/50 dark:border-gray-600/50">
                <span className="font-bold text-gray-900 dark:text-white">Total</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" /> Timeline
              </h3>
              <button
                onClick={() => setShowMilestoneForm(!showMilestoneForm)}
                className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {showMilestoneForm && (
              <form onSubmit={handleAddMilestone} className="mb-4 p-3 bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50 rounded-xl space-y-3 backdrop-blur-sm">
                <select
                  value={newMilestone.status}
                  onChange={(e) => setNewMilestone(p => ({ ...p, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-sm bg-white/50 dark:bg-gray-800/50 dark:text-white"
                >
                  <option value="">Select status...</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Under Review</option>
                  <option value="completed">Completed</option>
                  <option value="delivered">Delivered</option>
                </select>
                <input
                  type="text"
                  value={newMilestone.message}
                  onChange={(e) => setNewMilestone(p => ({ ...p, message: e.target.value }))}
                  placeholder="Milestone description..."
                  className="w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-sm bg-white/50 dark:bg-gray-800/50 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isAddingMilestone}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  {isAddingMilestone ? 'Adding...' : 'Add Milestone'}
                </button>
              </form>
            )}

            <div className="relative">
              <div className="absolute top-0 left-3 h-full w-0.5 bg-gray-200/50 dark:bg-gray-600/50" />
              <div className="space-y-4">
                {order.timeline?.map((entry, index) => (
                  <div key={index} className="relative flex items-start pl-8">
                    <div className={`absolute left-0 top-1 h-6 w-6 rounded-full ${TIMELINE_COLORS[entry.status] || 'bg-gray-400'} ring-4 ring-white dark:ring-gray-900 flex items-center justify-center`}>
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{entry.message}</p>
                      <p className="text-xs text-gray-500">{formatDate(entry.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700 shadow-2xl"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mark Order as Delivered</h3>
            <textarea
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="Delivery notes (optional)..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700/50 dark:text-white mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelivery}
                disabled={isDelivering}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors shadow-lg shadow-green-600/20"
              >
                {isDelivering ? 'Processing...' : 'Confirm Delivery'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
