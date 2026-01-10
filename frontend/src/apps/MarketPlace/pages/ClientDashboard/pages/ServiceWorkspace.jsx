import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, CheckCircle, Clock, FileText, MessageSquare, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../store/orders/ordersApi';
import ServiceChat from '../components/ServiceChat';
import ServiceFiles from '../components/ServiceFiles';

// Status colors mapping
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

// Timeline status colors
const TIMELINE_STATUS_COLORS = {
  completed: 'bg-green-500',
  active: 'bg-blue-500',
  in_progress: 'bg-blue-500',
  pending: 'bg-gray-200',
  created: 'bg-gray-400',
  payment_completed: 'bg-green-500',
  delivered: 'bg-green-500',
  message: 'bg-indigo-500',
};

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-4 bg-gray-200 rounded w-32" />
    <div className="h-8 bg-gray-200 rounded w-96" />
    <div className="h-4 bg-gray-200 rounded w-64" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 bg-gray-200 rounded-xl h-96" />
      <div className="bg-gray-200 rounded-xl h-64" />
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
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <AlertCircle className="h-8 w-8 text-red-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load order</h3>
    <p className="text-gray-500 mb-6 text-center max-w-md">
      {error?.data?.message || error?.message || 'Something went wrong while loading order details.'}
    </p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      <RefreshCw className="h-4 w-4" />
      Try Again
    </button>
  </motion.div>
);

const ServiceWorkspace = () => {
  const { serviceId } = useParams(); // This is actually the orderId
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview');

  // Fetch real order data
  const { data: order, isLoading, isError, error, refetch } = useGetOrderByIdQuery(serviceId, {
    skip: !serviceId,
    pollingInterval: 60000, // Refresh every minute
  });

  // Calculate progress from timeline
  const calculateProgress = (order) => {
    if (!order?.timeline || order.timeline.length === 0) return 0;
    if (order.status === 'completed') return 100;
    if (order.status === 'cancelled') return 0;

    // Count completed milestones
    const completedStatuses = ['completed', 'delivered', 'payment_completed'];
    const completed = order.timeline.filter(entry =>
      completedStatuses.includes(entry.status)
    ).length;

    // Assume 5 major milestones: created, confirmed, in_progress, delivered, completed
    const totalMilestones = 5;
    return Math.min(Math.round((completed / totalMilestones) * 100), 95);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format currency
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
        <Link to="/marketplace/dashboard/services" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Services
        </Link>
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <Link to="/marketplace/dashboard/services" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Services
        </Link>
        <div className="text-center py-16 text-gray-500">
          Order not found
        </div>
      </div>
    );
  }

  const progress = calculateProgress(order);
  const serviceItem = order.items?.find(item => item.itemType === 'service');
  const serviceName = serviceItem?.title || order.items?.[0]?.title || 'Service Project';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link to="/marketplace/dashboard/services" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Services
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{serviceName}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                {order.status?.replace('_', ' ')}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Order: {order.orderNumber} • Created {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('messages')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </button>
            {order.status === 'in_progress' && (
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm">
                View Progress
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === 'overview'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <Clock className="h-4 w-4" />
            Timeline & Overview
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === 'messages'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
            {order.communication?.messages?.length > 0 && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                {order.communication.messages.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === 'files'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
            {/* Timeline */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Project Timeline</h3>
                <div className="relative">
                  <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200" />
                  <div className="space-y-8">
                    {order.timeline && order.timeline.length > 0 ? (
                      order.timeline.map((entry, index) => (
                        <div key={entry._id || index} className="relative flex items-start pl-12">
                          <div
                            className={`
                              absolute left-0 top-1 h-8 w-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10
                              ${TIMELINE_STATUS_COLORS[entry.status] || 'bg-gray-300'}
                            `}
                          >
                            {['completed', 'delivered', 'payment_completed'].includes(entry.status) && (
                              <CheckCircle className="h-4 w-4 text-white" />
                            )}
                            {entry.status === 'in_progress' && (
                              <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">
                              {entry.message}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(entry.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No timeline entries yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Project Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Overall Progress</span>
                      <span className="font-bold text-gray-900">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Start Date</span>
                    <span className="text-sm font-medium text-gray-900">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Est. Delivery</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(order.estimatedDelivery) || 'TBD'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Total Amount</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Payment Status</span>
                    <span className={`text-sm font-medium ${order.payment?.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {order.payment?.status?.replace('_', ' ') || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              {order.items && order.items.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={item._id || index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500 capitalize">{item.itemType}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.price, order.payment?.amount?.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Package Details */}
              {serviceItem?.selectedPackage && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Package Details</h3>
                  <div className="space-y-3">
                    {/* Package Name */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Package</span>
                      <span className="text-sm font-medium text-gray-900 capitalize px-2 py-0.5 bg-purple-50 rounded border border-purple-100">
                        {serviceItem.selectedPackage.name || 'Standard'}
                      </span>
                    </div>
                    {/* Delivery Time */}
                    {serviceItem.selectedPackage.deliveryTime && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Delivery Time</span>
                        <span className="text-sm font-medium text-gray-900">
                          {serviceItem.selectedPackage.deliveryTime} days
                        </span>
                      </div>
                    )}
                    {/* Revisions */}
                    {serviceItem.selectedPackage.revisions !== undefined && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Revisions</span>
                        <span className="text-sm font-medium text-gray-900">
                          {serviceItem.selectedPackage.revisions === -1 || serviceItem.selectedPackage.revisions === 'Unlimited'
                            ? 'Unlimited'
                            : serviceItem.selectedPackage.revisions}
                        </span>
                      </div>
                    )}
                    {/* Features */}
                    {serviceItem.selectedPackage.features && serviceItem.selectedPackage.features.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Includes</span>
                        <ul className="mt-2 space-y-1.5">
                          {serviceItem.selectedPackage.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && <ServiceChat orderId={serviceId} />}
        {activeTab === 'files' && <ServiceFiles orderId={serviceId} order={order} />}
      </div>
    </motion.div>
  );
};

export default ServiceWorkspace;
