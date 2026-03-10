import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, CheckCircle, Clock, FileText, MessageSquare, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useParams } from 'react-router-dom';
import { calculateProjectProgress } from '../../../../../shared/utils/serviceUtils';
import { useGetServiceByIdQuery } from '../../../store/api/marketplaceApi';
import { useApproveDeliveryMutation, useGetOrderByIdQuery, useRequestRevisionMutation } from '../../../store/orders/ordersApi';


import ClientPhaseAction from '../components/ClientPhaseAction';
import ServiceChat from '../components/ServiceChat';
import ServiceFiles from '../components/ServiceFiles';
import ServicePhaseActivity from '../components/ServicePhaseActivity';
import ServicePhaseHistory from '../components/ServicePhaseHistory';

const PHASES = [
  { id: 'requirements_gathering', label: 'Requirements' },
  { id: 'legal_documentation', label: 'Legal' },
  { id: 'planning_scoping', label: 'Planning' },
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Dev' },
  { id: 'testing_qa', label: 'Testing' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'revision_window', label: 'Revisions' },
  { id: 'support_window', label: 'Support' },
  { id: 'completed', label: 'Done' }
];

// Returns the index of the CURRENTLY ACTIVE phase (the one in progress right now).
// order.currentPhase is set by the backend to the NEXT phase when the previous one
// is completed — so it IS the active phase, not a completed one.
const getActivePhaseIndex = (order) => {
  if (!order) return 0;
  if (order.status === 'completed') return PHASES.length - 1;

  const phaseIds = PHASES.map(p => p.id);

  const legacyMap = {
    'payment_completed': 'requirements_gathering',
    'delivered': 'delivery',
    'revision_window_closed': 'support_window'
  };

  // PRIMARY: use currentPhase directly — it IS the active (in-progress) phase
  if (order.currentPhase) {
    const mappedCurrent = legacyMap[order.currentPhase] || order.currentPhase;
    const currentIdx = phaseIds.indexOf(mappedCurrent);
    if (currentIdx !== -1) return currentIdx;
  }

  // FALLBACK: derive from the highest completed timeline event + 1
  const completedEvents = [...(order.timeline || [])].reverse();
  let highestCompletedIndex = -1;

  for (const event of completedEvents) {
    const rawStatus = event.status;
    const mappedStatus = legacyMap[rawStatus] || rawStatus;
    const idx = phaseIds.indexOf(mappedStatus);
    if (idx !== -1) {
      highestCompletedIndex = Math.max(highestCompletedIndex, idx);
    }
  }

  if (highestCompletedIndex >= 0) {
    return Math.min(highestCompletedIndex + 1, PHASES.length - 1);
  }

  return 0;
};

// Status colors mapping
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  revising: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  delivered: 'bg-cyan-100 text-cyan-800 border-cyan-200',
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
  revising: 'bg-indigo-500',
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
  const [showRevisionPrompt, setShowRevisionPrompt] = useState(false);
  const [revisionMessage, setRevisionMessage] = useState('');
  const [isSubmittingRevision, setIsSubmittingRevision] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);

  const [requestRevision] = useRequestRevisionMutation();
  const [approveDelivery] = useApproveDeliveryMutation();
  const [isApprovingDelivery, setIsApprovingDelivery] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');


  // Fetch real order data
  const { data: order, isLoading, isError, error, refetch } = useGetOrderByIdQuery(serviceId, {
    skip: !serviceId,
    pollingInterval: 60000, // Refresh every minute
  });

  const serviceItem = order?.items?.find((item) => item.itemType === "service");

  // Fetch LIVE service data to ensure it reflects recent admin updates (features, support window, etc)
  const serviceIdToFetch = typeof serviceItem?.itemId === 'object' ? serviceItem?.itemId?._id : serviceItem?.itemId;
  const { data: liveService } = useGetServiceByIdQuery(serviceIdToFetch, {
    skip: !serviceIdToFetch,
  });

  // Find the specific package from live data (case-insensitive)
  const livePackage = liveService?.packages?.find(p =>
    p.name?.toLowerCase() === serviceItem?.selectedPackage?.name?.toLowerCase()
  );

  // Helper to calculate dynamic deadline based on live package window
  const calculateDynamicDeadline = () => {
    // Priority 1: Backend source of truth
    if (order?.revisionDeadline) return order.revisionDeadline;

    // Priority 2: Live calculation if backend hasn't set it yet
    const pkg = livePackage || serviceItem?.selectedPackage;

    // Find the 'delivered' status in the timeline
    const deliveryEvent = order?.timeline?.find(e => e.status === 'delivered');
    const deliveryDate = deliveryEvent?.timestamp;

    if (!pkg?.revisionWindow || !deliveryDate) return null;

    const { duration, unit } = pkg.revisionWindow;
    const deadline = new Date(deliveryDate);

    const numDuration = Number(duration);
    if (isNaN(numDuration)) return null;

    switch (unit) {
      case "days": deadline.setDate(deadline.getDate() + numDuration); break;
      case "weeks": deadline.setDate(deadline.getDate() + numDuration * 7); break;
      case "months": deadline.setMonth(deadline.getMonth() + numDuration); break;
      case "years": deadline.setFullYear(deadline.getFullYear() + numDuration); break;
      default: deadline.setDate(deadline.getDate() + numDuration);
    }
    return deadline.toISOString();
  };

  const dynamicDeadline = calculateDynamicDeadline();

  // Update countdown every minute
  useEffect(() => {
    const updateCountdown = () => {
      if (!dynamicDeadline) return;

      const now = new Date();
      const end = new Date(dynamicDeadline);
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      let countdownStr = '';
      if (days > 0) countdownStr += `${days}d `;
      if (hours > 0 || days > 0) countdownStr += `${hours}h `;
      countdownStr += `${minutes}m`;

      setTimeLeft(countdownStr);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [dynamicDeadline]);


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

  // Calculate delay
  const calculateDelay = (estimatedDelivery, status) => {
    if (!estimatedDelivery || status === 'completed' || status === 'cancelled') return 0;
    const estDate = new Date(estimatedDelivery);
    const now = new Date();
    if (now > estDate) {
      const diffTime = Math.abs(now - estDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  // Handle approve delivery
  const handleApproveDelivery = async () => {
    setIsApprovingDelivery(true);
    try {
      await approveDelivery({ orderId: serviceId }).unwrap();
      toast.success('Delivery approved! Project marked as complete.');
      setShowApproveConfirm(false);
    } catch (err) {
      console.error('Failed to approve delivery:', err);
      toast.error(err?.data?.message || 'Failed to approve delivery');
    } finally {
      setIsApprovingDelivery(false);
    }
  };

  // Handle request revision
  const handleRequestRevision = async () => {
    if (!revisionMessage.trim()) return;

    setIsSubmittingRevision(true);
    try {
      await requestRevision({
        orderId: serviceId,
        message: revisionMessage
      }).unwrap();
      setShowRevisionPrompt(false);
      setRevisionMessage('');
    } catch (err) {
      console.error('Failed to request revision:', err);
      toast.error(err?.data?.message || 'Failed to request revision');
    } finally {
      setIsSubmittingRevision(false);
    }
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

  const progress = calculateProjectProgress(order);

  // Helper to determine display data (Live vs Snapshot)
  const displayPackage = livePackage || serviceItem?.selectedPackage;
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
              <button
                onClick={() => setActiveTab('activity')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm">
                View Progress
              </button>
            )}
            {order.status === 'delivered' && (
              <button
                onClick={() => setShowRevisionPrompt(true)}
                disabled={dynamicDeadline && new Date() > new Date(dynamicDeadline)}
                className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors shadow-sm ${
                  dynamicDeadline && new Date() > new Date(dynamicDeadline)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {dynamicDeadline && new Date() > new Date(dynamicDeadline) ? 'Revision Window Closed' : 'Request Revision'}
              </button>
            )}
            {order.status === 'delivered' && (
              <button
                onClick={() => setShowApproveConfirm(true)}
                disabled={isApprovingDelivery}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {isApprovingDelivery ? 'Approving...' : 'Approve & Complete'}
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


          <button
            onClick={() => setActiveTab('activity')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === 'activity'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <CheckCircle className="h-4 w-4" />
            Phase Activity
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            {/* Mission Trajectory Dashboard (Light Mode Glassmorphic) */}
            <div className="w-full bg-slate-50 rounded-[2rem] shadow-xl border border-gray-200 p-8 pt-10 pb-12 overflow-visible relative mt-4">
              {/* Subtle radial background effect overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white opacity-80 mix-blend-multiply rounded-[2rem]" />

              <div className="relative z-10 w-full max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-widest uppercase flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      Mission Trajectory
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 font-mono uppercase tracking-widest border-l-2 border-blue-200 pl-2">
                      T+ {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-light text-gray-900 font-mono tracking-tight">{progress}%</span>
                    <p className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase mt-1 opacity-90">Overall Progress</p>
                  </div>
                </div>

                {/* SVG Curve Timeline */}
                <div className="relative w-full mt-12 pb-4">
                  <svg viewBox="0 0 1000 160" className="w-full h-auto overflow-visible" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComponentTransfer in="blur" result="glow">
                          <feFuncA type="linear" slope="0.5" />
                        </feComponentTransfer>
                        <feComposite in="SourceGraphic" in2="glow" operator="over" />
                      </filter>
                      <linearGradient id="activePathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <clipPath id="progressClip">
                        <rect x="-20" y="-20" height="200" style={{ width: `${70 + (getActivePhaseIndex(order) / (PHASES.length - 1)) * 900}px`, transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                      </clipPath>
                    </defs>

                    {/* Background Arc */}
                    <path
                      d="M 50,110 Q 500,20 950,110"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Active Glowing Arc */}
                    <path
                      d="M 50,110 Q 500,20 950,110"
                      fill="none"
                      stroke="url(#activePathGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      clipPath="url(#progressClip)"
                      filter="url(#cyanGlow)"
                    />

                    {/* Phase Nodes */}
                    {PHASES.map((phase, index) => {
                      const t = index / (PHASES.length - 1);
                      const x = Math.pow(1-t, 2)*50 + 2*(1-t)*t*500 + Math.pow(t, 2)*950;
                      const y = Math.pow(1-t, 2)*110 + 2*(1-t)*t*20 + Math.pow(t, 2)*110;

                      const activeIdx = getActivePhaseIndex(order);
                      const isCompleted = index < activeIdx || order.status === 'completed';
                      const isCurrent = index === activeIdx && order.status !== 'completed';

                      return (
                        <g key={phase.id} style={{ transition: 'all 0.5s ease' }}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isCurrent ? "8" : "6"}
                            fill={isCompleted || isCurrent ? "#0ea5e9" : "#f8fafc"}
                            stroke={isCompleted ? "#ffffff" : isCurrent ? "#3b82f6" : "#cbd5e1"}
                            strokeWidth={isCurrent ? "3" : "2"}
                            filter={isCompleted || isCurrent ? "url(#cyanGlow)" : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))"}
                          />
                          {isCurrent && (
                            <circle cx={x} cy={y} r="16" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-ping" opacity="0.6" style={{ transformOrigin: `${x}px ${y}px` }} />
                          )}
                          <text
                            x={x}
                            y={y + 35}
                            textAnchor="middle"
                            fill={isCompleted || isCurrent ? "#0f172a" : "#64748b"}
                            fontSize="11"
                            className="font-mono uppercase tracking-[0.15em] transition-all duration-500 font-semibold"
                          >
                            {phase.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>

            {/* Active Action Center */}
            <ClientPhaseAction order={order} setActiveTab={setActiveTab} />

            {/* Bottom Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity (Left 2 cols) */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6">Recent Activity Updates</h3>
                  <div className="relative">
                    <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200" />
                    <div className="space-y-6">
                      {order.timeline && order.timeline.length > 0 ? (
                        [...order.timeline].reverse().slice(0, 5).map((entry, index) => (
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
                              <h4 className="text-sm font-medium text-gray-800">
                                {entry.message}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1">
                                {formatDate(entry.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500 text-sm">
                          No recent timeline activity
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phase Deliverables / Outputs */}
                <ServicePhaseHistory timeline={order.timeline} />
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
                    <div className="text-right">
                      <span className={`text-sm font-medium ${calculateDelay(order.estimatedDelivery, order.status) > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatDate(order.estimatedDelivery)}
                      </span>
                      {calculateDelay(order.estimatedDelivery, order.status) > 0 && (
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">
                          Delayed by {calculateDelay(order.estimatedDelivery, order.status)} days
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Total Amount</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(order.payment?.amount?.total, order.payment?.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Payment Status</span>
                    <span className={`text-sm font-medium ${order.payment?.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {order.payment?.status?.replace('_', ' ') || 'Pending'}
                    </span>
                  </div>
                  {/* Revision Stats */}
                  {serviceItem?.selectedPackage && (
                    <div className="flex justify-between items-center py-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Revisions Used</span>
                      <span className="text-sm font-medium text-gray-900">
                        {order.revisionsUsed || 0} / {
                          displayPackage?.revisions === -1 || displayPackage?.revisions === 'Unlimited'
                          ? '∞'
                          : displayPackage?.revisions
                        }
                      </span>
                    </div>
                  )}

                  {/* Revision Deadline */}
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Revision Deadline</span>
                    <div className="text-right">
                      {dynamicDeadline ? (
                        <>
                          <span className={`text-sm font-medium ${new Date() > new Date(dynamicDeadline) ? 'text-red-600' : 'text-indigo-600'}`}>
                            {formatDate(dynamicDeadline)}
                          </span>
                          {new Date() <= new Date(dynamicDeadline) && (
                            <p className={`text-[10px] mt-0.5 font-bold uppercase tracking-tight ${order?.status === 'delivered' ? 'text-indigo-500 animate-pulse' : 'text-gray-400'}`}>
                              {timeLeft ? `Ends in ${timeLeft}` : `Revisions end in ${Math.ceil((new Date(dynamicDeadline) - new Date()) / (1000 * 60 * 60 * 24))} days`}
                            </p>
                          )}
                          {new Date() > new Date(dynamicDeadline) && (
                             <p className="text-[10px] text-red-400 mt-0.5 font-bold uppercase">Window Expired</p>
                          )}
                        </>
                      ) : (
                        <span className="text-sm font-medium text-gray-400 whitespace-nowrap">
                           {order?.timeline?.some(e => e.status === 'delivered') ? 'N/A' : 'Pending Delivery'}
                        </span>
                      )}
                    </div>
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
                          {formatCurrency(item.price, order.payment?.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Package Details */}
              {displayPackage && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Package Details</h3>
                  <div className="space-y-3">
                    {/* Package Name */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Package</span>
                      <span className="text-sm font-medium text-gray-900 capitalize px-2 py-0.5 bg-purple-50 rounded border border-purple-100">
                        {displayPackage.name}
                      </span>
                    </div>
                    {/* Support Window */}
                    {displayPackage.revisionWindow && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Support Window</span>
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {displayPackage.revisionWindow.duration} {displayPackage.revisionWindow.unit}
                        </span>
                      </div>
                    )}
                    {/* Delivery Time */}
                    {displayPackage.deliveryTime && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Delivery Time</span>
                        <span className="text-sm font-medium text-gray-900">
                          {displayPackage.deliveryTime} days
                        </span>
                      </div>
                    )}
                    {/* Revisions */}
                    {displayPackage.revisions !== undefined && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Revisions</span>
                        <span className="text-sm font-medium text-gray-900">
                          {displayPackage.revisions === -1 || displayPackage.revisions === 'Unlimited'
                            ? 'Unlimited'
                            : displayPackage.revisions}
                        </span>
                      </div>
                    )}
                    {/* Features */}
                    {displayPackage.features && displayPackage.features.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Includes</span>
                        <ul className="mt-2 space-y-1.5">
                          {displayPackage.features.map((feature, idx) => (
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
          </div>
          </motion.div>
        )}

        {activeTab === 'messages' && <ServiceChat orderId={serviceId} />}
        {activeTab === 'files' && <ServiceFiles orderId={serviceId} order={order} />}
        {activeTab === 'activity' && <ServicePhaseActivity order={order} liveService={liveService} />}
      </div>

      {/* Approve & Complete Confirmation Modal */}
      {showApproveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 w-full max-w-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Approve Delivery?</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              By approving, you confirm you have received all deliverables and are satisfied with the work. This will mark the project as <strong>Complete</strong> and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                disabled={isApprovingDelivery}
                onClick={() => setShowApproveConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isApprovingDelivery}
                onClick={handleApproveDelivery}
                className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isApprovingDelivery ? 'Approving...' : 'Yes, Approve & Complete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Revision Prompt Modal */}
      {showRevisionPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Request Revision</h3>
            <p className="text-sm text-gray-500 mb-4">
              Please describe what you'd like to change. This will reset the project status to "Revising".
            </p>
            <textarea
              value={revisionMessage}
              onChange={(e) => setRevisionMessage(e.target.value)}
              placeholder="E.g. Change the color of the header to blue..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                disabled={isSubmittingRevision}
                onClick={() => setShowRevisionPrompt(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isSubmittingRevision || !revisionMessage.trim()}
                onClick={handleRequestRevision}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmittingRevision ? 'Submitting...' : 'Send Request'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceWorkspace;
