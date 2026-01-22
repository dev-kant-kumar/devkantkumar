import { AnimatePresence, motion } from 'framer-motion';
import {
    Bell, Check, CreditCard, FileText,
    Filter,
    Info, Loader2, MessageSquare,
    Package, RefreshCw, Ticket, Trash2, UserPlus
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    useClearAllNotificationsMutation,
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
    useGetUnreadCountQuery,
    useMarkAllAsReadMutation,
    useMarkAsReadMutation,
} from '../../../../store/notification/notificationApi';

const AdminNotifications = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState(null);

  const { data, isLoading, isFetching, refetch } = useGetNotificationsQuery({
    page,
    limit: 20,
    unreadOnly: filter === 'unread',
    type: typeFilter,
  });

  const { data: unreadData } = useGetUnreadCountQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead, { isLoading: isMarkingAll }] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [clearAllNotifications, { isLoading: isClearing }] = useClearAllNotificationsMutation();

  const notifications = data?.notifications || [];
  const pagination = data?.pagination || {};
  const unreadCount = unreadData?.count || 0;

  const getIcon = (type) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'order_created':
      case 'order_status':
      case 'order_completed':
        return <Package className={`${iconClass} text-green-500`} />;
      case 'payment_received':
      case 'payment_failed':
        return <CreditCard className={`${iconClass} text-blue-500`} />;
      case 'support_ticket':
      case 'support_response':
        return <Ticket className={`${iconClass} text-orange-500`} />;
      case 'quote_request':
      case 'quote_response':
        return <FileText className={`${iconClass} text-purple-500`} />;
      case 'message':
        return <MessageSquare className={`${iconClass} text-indigo-500`} />;
      case 'welcome':
        return <UserPlus className={`${iconClass} text-emerald-500`} />;
      case 'system':
        return <Info className={`${iconClass} text-gray-400`} />;
      default:
        return <Bell className={`${iconClass} text-gray-400`} />;
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInSeconds = Math.floor((now - notificationDate) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return notificationDate.toLocaleDateString();
  };

  const getTypeLabel = (type) => {
    const labels = {
      order_created: 'New Order',
      order_status: 'Order Update',
      order_completed: 'Order Complete',
      payment_received: 'Payment',
      payment_failed: 'Payment Failed',
      support_ticket: 'New Ticket',
      support_response: 'Ticket Response',
      quote_request: 'Quote Request',
      quote_response: 'Quote Response',
      message: 'Message',
      welcome: 'Welcome',
      system: 'System',
    };
    return labels[type] || 'Notification';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/10 text-red-500 border border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border border-orange-500/20';
      case 'low': return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
    }
  };

  const handleMarkAsRead = async (e, notificationId) => {
    e.preventDefault();
    e.stopPropagation();
    await markAsRead(notificationId);
  };

  const handleDelete = async (e, notificationId) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteNotification(notificationId);
  };

  const typeOptions = [
    { value: null, label: 'All Types' },
    { value: 'order_created', label: 'New Orders' },
    { value: 'payment_received', label: 'Payments' },
    { value: 'support_ticket', label: 'Support Tickets' },
    { value: 'quote_request', label: 'Quote Requests' },
    { value: 'message', label: 'Messages' },
    { value: 'system', label: 'System' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Bell size={16} />
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Updates</span>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Notifications Center
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Manage real-time alerts and system updates.
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                {unreadCount} unread
              </span>
            )}
          </p>
        </motion.div>

        <div className="flex items-center gap-2">
            <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl bg-white/60 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-all shadow-sm"
                title="Refresh"
            >
                <RefreshCw className={`h-5 w-5 ${isFetching ? 'animate-spin' : ''}`} />
            </button>

            {unreadCount > 0 && (
            <button
                onClick={() => markAllAsRead()}
                disabled={isMarkingAll}
                className="px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/30 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-sm"
            >
                {isMarkingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Mark all read'}
            </button>
            )}

            {notifications.length > 0 && (
            <button
                onClick={() => clearAllNotifications()}
                disabled={isClearing}
                className="px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md border border-red-200/50 dark:border-red-800/30 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shadow-sm"
            >
                {isClearing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Clear all'}
            </button>
            )}
        </div>
      </div>

      {/* Main Content Area - Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden"
      >

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100/50 dark:border-gray-700/50 flex flex-wrap gap-4 items-center justify-between bg-gray-50/30 dark:bg-gray-800/30">
            <div className="flex bg-gray-200/50 dark:bg-gray-700/50 p-1 rounded-xl">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    filter === 'all'
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    filter === 'unread'
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    Unread
                </button>
            </div>

            <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <select
                    value={typeFilter || ''}
                    onChange={(e) => setTypeFilter(e.target.value || null)}
                    className="bg-transparent border-none text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-0 cursor-pointer"
                >
                    {typeOptions.map((option) => (
                        <option key={option.value || 'all'} value={option.value || ''} className="dark:bg-gray-800">
                        {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>

        {/* List Content */}
        <div className="min-h-[400px]">
            {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="h-10 w-10 animate-spin mb-3 text-blue-500" />
                <p>Loading notifications...</p>
            </div>
            ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="h-20 w-20 bg-gray-50 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                    <Bell className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">All caught up!</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
                {filter === 'unread'
                    ? "You have no unread notifications at the moment."
                    : "No notifications to display found for your current filters."}
                </p>
                {filter !== 'all' && (
                    <button
                        onClick={() => setFilter('all')}
                        className="mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                        View all notifications
                    </button>
                )}
            </div>
            ) : (
            <div className="divide-y divide-gray-100/10 dark:divide-gray-800/50">
                <AnimatePresence>
                {notifications.map((notification, index) => (
                    <motion.div
                    key={notification._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0, padding: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group p-5 flex items-start gap-5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors cursor-default ${
                        !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''
                    }`}
                    >
                        {/* Icon/Avatar */}
                        <div className={`p-3 rounded-2xl flex-shrink-0 relative ${
                            !notification.read
                            ? 'bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700'
                            : 'bg-gray-100 dark:bg-gray-800/50 text-opacity-50'
                        }`}>
                            {getIcon(notification.type)}
                            {!notification.read && (
                                <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className={`text-base font-semibold ${
                                            !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                        }`}>
                                            {notification.title}
                                        </h4>
                                        <span className={`text-xs px-2 py-0.5 rounded-md font-medium border ${getPriorityColor(notification.priority || 'low')}`}>
                                            {getTypeLabel(notification.type)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {notification.message}
                                    </p>

                                    <div className="flex items-center gap-3 pt-2">
                                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                            {formatTimeAgo(notification.createdAt)}
                                        </p>

                                        {notification.link && (
                                            <>
                                                <span className="text-gray-300 dark:text-gray-700">•</span>
                                                <Link
                                                    to={notification.link}
                                                    className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline"
                                                >
                                                    View Details
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Actions Menu - Visible on Hover */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {!notification.read && (
                                    <button
                                        onClick={(e) => handleMarkAsRead(e, notification._id)}
                                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                        title="Mark as read"
                                    >
                                        <Check className="h-4 w-4" />
                                    </button>
                                    )}
                                    <button
                                    onClick={(e) => handleDelete(e, notification._id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
            )}
        </div>

        {/* Footer/Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/40">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Page {pagination.page} of {pagination.pages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!pagination.hasMore || isFetching}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminNotifications;
