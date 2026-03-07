import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, CheckCircle, ClipboardList, Clock, FileText, Globe, History as HistoryIcon, Link2, Loader2, MessageSquare, RefreshCw, Target } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useParams } from 'react-router-dom';
import PremiumButton from '../../../common/components/PremiumButton';
import { useApproveRequirementsMutation, useGetAdminOrderByIdQuery, useRequestRequirementsChangesMutation } from '../../../store/api/adminApiSlice';

import AdminPhaseManager from '../components/AdminPhaseManager';
import AdminProjectTimeline from './AdminProjectTimeline';

import ServicePhaseHistory from '../../../../MarketPlace/pages/ClientDashboard/components/ServicePhaseHistory';
import AdminProjectFiles from './AdminProjectFiles';
import AdminProjectMessages from './AdminProjectMessages';

// Status colors mapping
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
  awaiting_requirements: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
  completed: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
  delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300',
  revising: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300',
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
          <button
            onClick={() => setActiveTab('activity')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
              ${activeTab === 'activity'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }
            `}
          >
            <HistoryIcon className="h-4 w-4" />
            Phase Activity
            {order.requirementsData?.status === 'submitted' && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
            )}
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
              {order?.items?.[0]?.itemType === 'service' && (
                <AdminPhaseManager order={order} />
              )}
              <AdminProjectTimeline order={order} refetch={refetch} />
              <ServicePhaseHistory timeline={order.timeline} />
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
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(order.estimatedDelivery) || 'TBD'}
                      </span>
                      {order.estimatedDelivery && new Date(order.estimatedDelivery) < new Date() && order.status !== 'completed' && order.status !== 'cancelled' && (
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                          Delayed by {Math.ceil((new Date() - new Date(order.estimatedDelivery)) / (1000 * 60 * 60 * 24))} days
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total Amount</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(order.payment?.amount?.total, order.payment?.amount?.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Payment Status</span>
                    <span className={`text-sm font-medium capitalize ${
                      order.payment?.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                      order.payment?.status === 'failed' ? 'text-red-600 dark:text-red-400' :
                      'text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {order.payment?.status || 'pending'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Revisions Used</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.revisionsUsed || 0} / {serviceItem?.selectedPackage?.revisions || 5}
                    </span>
                  </div>
                  {order.revisionDeadline && (
                    <div className="flex justify-between items-center py-3 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Revision Deadline</span>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatDate(order.revisionDeadline)}
                        </span>
                        {(() => {
                          const diff = new Date(order.revisionDeadline) - new Date();
                          if (diff > 0) {
                            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            return (
                              <p className="text-[10px] font-bold text-green-500 uppercase tracking-wide">
                                Ends in {days}d {hours}h {mins}m
                              </p>
                            );
                          }
                          return (
                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide">Expired</p>
                          );
                        })()}
                      </div>
                    </div>
                  )}
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
        {activeTab === 'activity' && <AdminPhaseActivity order={order} refetch={refetch} />}
      </div>
    </motion.div>
  );
};

// Question icon mapper for rich display
const QUESTION_ICONS = {
  'project description': FileText,
  'description': FileText,
  'goals': Target,
  'goals & objectives': Target,
  'objectives': Target,
  'target audience': Globe,
  'audience': Globe,
  'references': Link2,
  'references & links': Link2,
  'links': Link2,
};

const getQuestionIcon = (question) => {
  const lowerQ = question?.toLowerCase() || '';
  for (const [key, Icon] of Object.entries(QUESTION_ICONS)) {
    if (lowerQ.includes(key)) return Icon;
  }
  return ClipboardList;
};

const ICON_COLORS = [
  'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
  'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
];

// Admin Phase Activity Tab (Consolidated Requirements + History)
const AdminPhaseActivity = ({ order, refetch }) => {
  const [approveRequirements, { isLoading: isApproving }] = useApproveRequirementsMutation();
  const [requestRequirementsChanges, { isLoading: isRequesting }] = useRequestRequirementsChangesMutation();
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const reqData = order?.requirementsData;
  const responses = reqData?.responses || [];
  const attachments = reqData?.attachments || [];
  const feedbackHistory = reqData?.feedbackHistory || [];
  const status = reqData?.status || 'pending';
  const revision = reqData?.revision || 0;

  const handleApprove = async () => {
    try {
      await approveRequirements({ id: order._id }).unwrap();
      toast.success('Requirements approved! Project is now in progress.');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to approve requirements');
    }
  };

  const handleRequestChanges = async () => {
    if (!feedback.trim()) {
      toast.error('Please provide feedback for the client.');
      return;
    }
    try {
      await requestRequirementsChanges({ id: order._id, feedback: feedback.trim() }).unwrap();
      toast.success('Changes requested! The client will be notified.');
      setShowChangesModal(false);
      setFeedback('');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to request changes');
    }
  };

  if (status === 'pending' || responses.length === 0) {
    if (['in_progress', 'delivered', 'completed', 'revising'].includes(order.status)) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400"
        >
          <div className="h-16 w-16 mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Requirements Handled</h3>
          <p className="text-sm mt-2 text-center max-w-md">
            This project is currently marked as {order.status.replace('_', ' ')}. Requirements were likely gathered externally or bypassed.
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400"
      >
        <ClipboardList className="h-16 w-16 opacity-20 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No Requirements Submitted Yet</h3>
        <p className="text-sm mt-2">The client hasn&apos;t submitted project requirements yet.</p>
      </motion.div>
    );
  }

  const isReviewable = ['submitted', 'resubmitted'].includes(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Status Banner — Submitted / Resubmitted */}
      {isReviewable && (
        <div className="bg-gradient-to-r from-purple-900/60 to-purple-800/40 dark:from-purple-900/80 dark:to-purple-800/60 backdrop-blur-xl rounded-xl p-6 border border-purple-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <ClipboardList className="h-6 w-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {status === 'resubmitted' ? 'Revised Requirements' : 'Requirements Review Required'}
              </h3>
              <p className="text-sm text-purple-200">
                {status === 'resubmitted' && <span className="bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded text-xs font-bold mr-2">Revision #{revision}</span>}
                Submitted on {reqData.submittedAt ? new Date(reqData.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-5 py-2.5 bg-transparent border border-red-400 text-red-300 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors"
              onClick={() => setShowChangesModal(true)}
            >
              Request Changes
            </button>
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-green-900/30"
            >
              {isApproving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              Approve & Start
            </button>
          </div>
        </div>
      )}

      {/* Status Banner — Changes Requested */}
      {status === 'changes_requested' && (
        <div className="bg-gradient-to-r from-amber-900/60 to-orange-800/40 dark:from-amber-900/80 dark:to-orange-800/60 backdrop-blur-xl rounded-xl p-6 border border-amber-700/50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Changes Requested — Waiting for Client</h3>
              <p className="text-sm text-amber-200 mt-1">
                You requested changes. The client will revise and resubmit.
              </p>
            </div>
          </div>
          {reqData.adminFeedback && (
            <div className="mt-4 bg-amber-950/30 rounded-lg p-4 border border-amber-700/30">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">Your Feedback</p>
              <p className="text-sm text-amber-100 whitespace-pre-wrap">{reqData.adminFeedback}</p>
            </div>
          )}
        </div>
      )}

      {/* Status Banner — Approved */}
      {status === 'approved' && (
        <div className="bg-green-900/30 backdrop-blur-xl rounded-xl p-6 border border-green-700/50 flex items-center gap-4">
          <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Requirements Approved</h3>
            <p className="text-sm text-green-200">
              {revision > 0 && <span className="bg-green-500/30 text-green-200 px-2 py-0.5 rounded text-xs font-bold mr-2">After {revision} revision{revision > 1 ? 's' : ''}</span>}
              Approved on {reqData.approvedAt ? new Date(reqData.approvedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown'}
            </p>
          </div>
        </div>
      )}

      {/* Feedback History */}
      {feedbackHistory.length > 0 && (
        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            Feedback History
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">{feedbackHistory.length}</span>
          </h4>
          <div className="space-y-3">
            {feedbackHistory.map((entry, idx) => (
              <div key={idx} className="flex gap-3 border-l-2 border-amber-400 pl-4 py-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{entry.feedback}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {entry.timestamp ? new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Unknown'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Activity History Section */}
      <div className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <HistoryIcon className="h-4 w-4" />
            Project Activity History
          </h3>
        </div>
        <ServicePhaseHistory timeline={order.timeline} />
      </div>

      {/* Requirement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {responses.map((resp, idx) => {
          const Icon = getQuestionIcon(resp.question);
          const colorClass = ICON_COLORS[idx % ICON_COLORS.length];
          return (
            <div
              key={idx}
              className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">{resp.question}</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                {resp.answer || 'Not provided by the client.'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-500" />
            Attachments
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">{attachments.length}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {attachments.map((att, idx) => (
              <a
                key={idx}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{att.name}</p>
                  {att.size > 0 && (
                    <p className="text-xs text-gray-500">{(att.size / 1024).toFixed(1)} KB</p>
                  )}
                </div>
                <Link2 className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Request Changes Modal */}
      {showChangesModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-lg w-full"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Request Changes</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Provide specific feedback for the client to revise their requirements.
              </p>
            </div>
            <div className="p-6">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                placeholder="e.g., Please provide more details about the target audience, color scheme preferences, and specific pages needed..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none text-gray-900 dark:text-white placeholder-gray-400"
              />
              <p className="text-xs text-gray-400 mt-2">
                This feedback will be shown to the client on their requirements page.
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => { setShowChangesModal(false); setFeedback(''); }}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestChanges}
                disabled={isRequesting || !feedback.trim()}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isRequesting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                Send Feedback
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminProjectWorkspace;
