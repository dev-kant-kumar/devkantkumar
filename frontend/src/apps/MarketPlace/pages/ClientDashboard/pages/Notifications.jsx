import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Check, CreditCard, FileText, Info, Loader2, MessageSquare, Package, Ticket, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    useClearAllNotificationsMutation,
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
    useGetUnreadCountQuery,
    useMarkAllAsReadMutation,
    useMarkAsReadMutation,
} from '../../../../../store/notification/notificationApi';

const Notifications = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all'); // all, unread
  const [typeFilter, setTypeFilter] = useState(null);

  // RTK Query hooks
  const { data, isLoading, isFetching } = useGetNotificationsQuery({
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

  // Get icon based on notification type
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
        return <Info className={`${iconClass} text-gray-500`} />;
      default:
        return <Bell className={`${iconClass} text-gray-500`} />;
    }
  };

  // Format time ago
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

  // Get type label
  const getTypeLabel = (type) => {
    const labels = {
      order_created: 'Order',
      order_status: 'Order',
      order_completed: 'Order',
      payment_received: 'Payment',
      payment_failed: 'Payment',
      support_ticket: 'Support',
      support_response: 'Support',
      quote_request: 'Quote',
      quote_response: 'Quote',
      message: 'Message',
      welcome: 'Welcome',
      system: 'System',
    };
    return labels[type] || 'Notification';
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
    { value: 'order_status', label: 'Orders' },
    { value: 'support_response', label: 'Support' },
    { value: 'quote_response', label: 'Quotes' },
    { value: 'message', label: 'Messages' },
    { value: 'system', label: 'System' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your latest activity.
            {unreadCount > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsRead()}
              disabled={isMarkingAll}
              className="text-sm font-medium text-green-600 hover:text-green-700 disabled:opacity-50 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
            >
              {isMarkingAll ? 'Marking...' : 'Mark all as read'}
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={() => clearAllNotifications()}
              disabled={isClearing}
              className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              {isClearing ? 'Clearing...' : 'Clear all'}
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              filter === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              filter === 'unread'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Unread
          </button>
        </div>

        <select
          value={typeFilter || ''}
          onChange={(e) => setTypeFilter(e.target.value || null)}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {typeOptions.map((option) => (
            <option key={option.value || 'all'} value={option.value || ''}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Bell className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
            <p className="text-sm">
              {filter === 'unread'
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  {/* Icon */}
                  <div className={`p-2.5 rounded-full flex-shrink-0 ${
                    !notification.read
                      ? 'bg-white shadow-sm ring-1 ring-gray-100'
                      : 'bg-gray-100'
                  }`}>
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {getTypeLabel(notification.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>

                      {/* Time & Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.read && (
                          <button
                            onClick={(e) => handleMarkAsRead(e, notification._id)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => handleDelete(e, notification._id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Link */}
                    {notification.link && (
                      <Link
                        to={notification.link}
                        className="inline-flex items-center gap-1 mt-2 text-sm text-green-600 hover:text-green-700 font-medium"
                      >
                        View details →
                      </Link>
                    )}
                  </div>

                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!pagination.hasMore || isFetching}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Loading overlay for pagination */}
        {isFetching && !isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-green-500 animate-spin" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;
