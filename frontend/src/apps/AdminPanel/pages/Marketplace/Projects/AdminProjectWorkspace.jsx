import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Clock, FileText, MessageSquare, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import PremiumButton from '../../../common/components/PremiumButton';
import { useGetAdminOrderByIdQuery } from '../../../store/api/adminApiSlice';

import AdminProjectTimeline from './AdminProjectTimeline';

import AdminProjectFiles from './AdminProjectFiles';
import AdminProjectMessages from './AdminProjectMessages';

// Status colors mapping
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
  completed: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
};

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-96" />
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 bg-gray-200 dark:bg-gray-700 rounded-xl h-96" />
      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64" />
    </div>
  </div>
);

// Error state
const ErrorState = ({ error, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16"
  >
    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
      <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load project</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
      {error?.data?.message || error?.message || 'Something went wrong while loading project details.'}
    </p>
    <PremiumButton
      onClick={onRetry}
      label="Try Again"
      icon={RefreshCw}
    />
  </motion.div>
);

const AdminProjectWorkspace = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview');

  const { data: orderResponse, isLoading, isError, error, refetch } = useGetAdminOrderByIdQuery(id, {
    skip: !id,
    pollingInterval: 30000,
  });

  const order = orderResponse?.data || orderResponse;

  const calculateProgress = (order) => {
    if (!order?.timeline || order.timeline.length === 0) return 0;
    if (order.status === 'completed') return 100;
    if (order.status === 'cancelled') return 0;

    const completedStatuses = ['completed', 'delivered', 'payment_completed'];
    const completed = order.timeline.filter(entry =>
      completedStatuses.includes(entry.status)
    ).length;

    const totalMilestones = 5;
    return Math.min(Math.round((completed / totalMilestones) * 100), 95);
  };

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

  if (isLoading) {
    return (
      <div className="p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Link to="/admin/marketplace/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
        </Link>
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <Link to="/admin/marketplace/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
        </Link>
        <div className="text-center py-16 text-gray-500">
          Project not found
        </div>
      </div>
    );
  }

  const progress = calculateProgress(order);
  const serviceItem = order.items?.find(item => item.itemType === 'service') || order.items?.[0];
  const serviceName = serviceItem?.title || 'Unknown Service Project';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link to="/admin/marketplace/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{serviceName}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                {order.status?.replace('_', ' ')}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Project ID: #{order._id.substring(order._id.length - 8).toUpperCase()} • Client: {order.billing?.firstName} {order.billing?.lastName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PremiumButton
              onClick={() => setActiveTab('messages')}
              label="Message Client"
              icon={MessageSquare}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
              ${activeTab === 'overview'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }
            `}
          >
            <Clock className="h-4 w-4" />
            Overview & Timeline
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
              ${activeTab === 'messages'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }
            `}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
            {order.communication?.messages?.length > 0 && (
              <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full">
                {order.communication.messages.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
              ${activeTab === 'files'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }
            `}
          >
            <FileText className="h-4 w-4" />
            Files & Assets
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Timeline Area */}
            <div className="lg:col-span-2 space-y-8">
              <AdminProjectTimeline order={order} refetch={refetch} />
            </div>

            {/* Sidebar Stats Area */}
            <div className="space-y-6">
              <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4">Project Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Overall Progress</span>
                      <span className="font-bold text-gray-900 dark:text-white">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Start Date</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Est. Delivery</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(order.estimatedDelivery) || 'TBD'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total Amount</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              {serviceItem?.selectedPackage && (
                <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4">Package Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Plan</span>
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300 capitalize px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 rounded border border-purple-100 dark:border-purple-800">
                        {serviceItem.selectedPackage.name || 'Standard'}
                      </span>
                    </div>
                    {serviceItem.selectedPackage.deliveryTime && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Delivery Time</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {serviceItem.selectedPackage.deliveryTime} days
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && <AdminProjectMessages orderId={order._id} />}
        {activeTab === 'files' && <AdminProjectFiles orderId={order._id} order={order} />}
      </div>
    </motion.div>
  );
};

export default AdminProjectWorkspace;
