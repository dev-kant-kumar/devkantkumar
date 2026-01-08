import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    Filter,
    Inbox,
    Mail,
    RefreshCw,
    RotateCcw,
    Search,
    Send,
    X,
    XCircle
} from 'lucide-react';
import { useCallback, useState } from 'react';
import {
    useGetEmailLogsQuery,
    useGetEmailStatsQuery,
    useGetEmailTypesQuery,
    useRetryEmailMutation
} from '../../store/api/emailTrackingApiSlice';

// --- Components ---

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700/50', icon: Clock },
    processing: { label: 'Processing', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-700/50', icon: RefreshCw },
    sent: { label: 'Sent', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700/50', icon: CheckCircle },
    failed: { label: 'Failed', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-700/50', icon: XCircle }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.className}`}>
      <Icon size={12} className={status === 'processing' ? 'animate-spin' : ''} />
      {config.label}
    </span>
  );
};

const TypeBadge = ({ type }) => {
  const typeLabels = {
    'verification-email': { label: 'Verify', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' },
    'password-reset-email': { label: 'Reset', color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20' },
    'email-change-otp': { label: 'OTP', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' },
    'password-change-otp': { label: 'OTP', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' },
    'order-confirmation-email': { label: 'Order', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' },
    'contact-admin-notification': { label: 'Contact', color: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20' },
    'contact-user-auto-reply': { label: 'Reply', color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20' },
    'newsletter-welcome-email': { label: 'Newsletter', color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20' },
    'generic-email': { label: 'General', color: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50' }
  };

  const config = typeLabels[type] || typeLabels['generic-email'];

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

const StatsCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform scale-150 -translate-y-2 translate-x-2`}>
        <Icon size={64} className={color} />
    </div>
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${color} bg-opacity-10 dark:bg-opacity-20 text-current shadow-sm`}>
        <Icon size={20} className={color} />
      </div>
    </div>
  </motion.div>
);

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(date).toLocaleDateString();
};

const EmailTracking = () => {
  // State
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    search: ''
  });
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Queries
  const { data: statsData, isLoading: statsLoading, refetch: refetchStats } = useGetEmailStatsQuery();
  const { data: logsData, isLoading: logsLoading, refetch: refetchLogs } = useGetEmailLogsQuery({
    page,
    limit: 15,
    ...filters
  });
  const { data: typesData } = useGetEmailTypesQuery();

  // Mutations
  const [retryEmail, { isLoading: isRetrying }] = useRetryEmailMutation();

  // Handlers
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const handleRefresh = useCallback(() => {
    refetchStats();
    refetchLogs();
  }, [refetchStats, refetchLogs]);

  const handleRetry = async (emailId) => {
    try {
      await retryEmail(emailId).unwrap();
      handleRefresh();
      if(selectedEmail && selectedEmail._id === emailId) {
          setSelectedEmail(null); // Close modal on retry to avoid stale state
      }
    } catch (error) {
      console.error('Failed to retry email:', error);
    }
  };

  const stats = statsData?.data?.overview || {};
  const emails = logsData?.data?.emails || [];
  const pagination = logsData?.data?.pagination || {};
  const emailTypes = typesData?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Mail size={16} />
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Communication</span>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Email Tracking
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Monitor delivery status and manage outgoing system emails.
          </p>
        </motion.div>

        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={statsLoading || logsLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50"
        >
            <RefreshCw size={18} className={statsLoading || logsLoading ? 'animate-spin' : ''} />
            <span>Refresh Data</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Sent"
          value={statsLoading ? '...' : stats.total?.toLocaleString() || 0}
          icon={Send}
          color="text-blue-500"
          delay={0.1}
        />
        <StatsCard
          title="Success Rate"
          value={statsLoading ? '...' : `${stats.successRate || 0}%`}
          icon={CheckCircle}
          color="text-emerald-500"
          delay={0.2}
        />
        <StatsCard
          title="Failed"
          value={statsLoading ? '...' : stats.failed?.toLocaleString() || 0}
          icon={AlertCircle}
          color="text-red-500"
          delay={0.3}
        />
        <StatsCard
          title="Pending"
          value={statsLoading ? '...' : (stats.pending + stats.processing) || 0}
          icon={Clock}
          color="text-orange-500"
          delay={0.4}
        />
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden"
      >
          {/* Filters Bar */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex flex-col md:flex-row gap-4 justify-between bg-gray-50/50 dark:bg-gray-800/20">
              <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by email or subject..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white placeholder-gray-400"
                  />
              </div>
              <div className="flex gap-3">
                  <div className="relative">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="pl-9 pr-8 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none appearance-none cursor-pointer dark:text-white text-sm min-w-[140px]"
                      >
                        <option value="">All Status</option>
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                      </select>
                  </div>
                  <div className="relative">
                       <Inbox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="pl-9 pr-8 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none appearance-none cursor-pointer dark:text-white text-sm min-w-[140px]"
                      >
                        <option value="">All Types</option>
                        {emailTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                  </div>
              </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {logsLoading ? (
               <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                   <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                   <p>Loading records...</p>
               </div>
            ) : emails.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Inbox size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No emails found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                </div>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                            <th className="px-6 py-4">Recipient</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Sent</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {emails.map((email) => (
                            <tr
                                key={email._id}
                                className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 dark:text-gray-200">{email.to}</div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        ID: {email._id.slice(-6)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="max-w-xs truncate text-gray-600 dark:text-gray-300" title={email.subject}>
                                        {email.subject}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <TypeBadge type={email.type} />
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={email.status} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                    {timeAgo(email.createdAt)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedEmail(email)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        {email.status === 'failed' && (
                                            <button
                                                onClick={() => handleRetry(email._id)}
                                                disabled={isRetrying}
                                                className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg transition-all disabled:opacity-50"
                                                title="Retry"
                                            >
                                                <RotateCcw size={18} className={isRetrying ? 'animate-spin' : ''} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/20">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing page <span className="font-semibold text-gray-900 dark:text-gray-200">{page}</span> of <span className="font-semibold text-gray-900 dark:text-gray-200">{pagination.pages}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                        disabled={page === pagination.pages}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
          )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
          {selectedEmail && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedEmail(null)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Mail size={20} className="text-blue-500" />
                            Email Details
                        </h2>
                        <button
                            onClick={() => setSelectedEmail(null)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-3">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">To</label>
                                        <div className="text-base font-medium text-gray-900 dark:text-gray-200 break-all">{selectedEmail.to}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">From</label>
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200 break-all opacity-80">{selectedEmail.from}</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Context</label>
                                    <div className="flex gap-4 items-center p-3 border border-gray-200 dark:border-gray-700 rounded-xl">
                                        <div>
                                            <div className="text-xs text-gray-500">Type</div>
                                            <div className="mt-1"><TypeBadge type={selectedEmail.type} /></div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Status</div>
                                            <div className="mt-1"><StatusBadge status={selectedEmail.status} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Subject</label>
                                    <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 text-sm">
                                        {selectedEmail.subject}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase">Queued At</div>
                                        <div className="text-sm font-medium mt-1 dark:text-gray-200">
                                            {new Date(selectedEmail.queuedAt).toLocaleDateString()}
                                            <div className="text-xs text-gray-400">{new Date(selectedEmail.queuedAt).toLocaleTimeString()}</div>
                                        </div>
                                    </div>
                                    {selectedEmail.sentAt ? (
                                        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl">
                                            <div className="text-xs text-gray-500 uppercase">Sent At</div>
                                            <div className="text-sm font-medium mt-1 text-emerald-600 dark:text-emerald-400">
                                                {new Date(selectedEmail.sentAt).toLocaleDateString()}
                                                <div className="text-xs opacity-75">{new Date(selectedEmail.sentAt).toLocaleTimeString()}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl opacity-50">
                                            <div className="text-xs text-gray-500 uppercase">Sent At</div>
                                            <div className="text-sm mt-1">-</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedEmail.error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl">
                                <h4 className="flex items-center gap-2 text-red-800 dark:text-red-400 font-semibold mb-2">
                                    <AlertCircle size={16} />
                                    Error Details
                                </h4>
                                <pre className="text-xs text-red-600 dark:text-red-300 whitespace-pre-wrap font-mono bg-white/50 dark:bg-black/20 p-3 rounded-lg overflow-x-auto">
                                    {selectedEmail.error.message || JSON.stringify(selectedEmail.error, null, 2)}
                                </pre>
                            </div>
                        )}

                        {selectedEmail.serverResponse?.messageId && (
                           <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center gap-3">
                               <div className="text-xs font-semibold text-gray-500 uppercase">Message ID</div>
                               <code className="text-xs bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 font-mono text-gray-600 dark:text-gray-400">
                                   {selectedEmail.serverResponse.messageId}
                               </code>
                           </div>
                        )}
                    </div>

                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end gap-3">
                        {selectedEmail.status === 'failed' && (
                            <button
                                onClick={() => handleRetry(selectedEmail._id)}
                                disabled={isRetrying}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
                            >
                                <RotateCcw size={16} className={isRetrying ? 'animate-spin' : ''} />
                                Retry Delivery
                            </button>
                        )}
                        <button
                            onClick={() => setSelectedEmail(null)}
                            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default EmailTracking;
