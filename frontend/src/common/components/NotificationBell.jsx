import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CreditCard, ExternalLink, FileText, Info, MessageSquare, Package, Ticket, UserPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    useGetNotificationsQuery,
    useGetUnreadCountQuery,
    useMarkAllAsReadMutation,
    useMarkAsReadMutation,
} from '../../store/notification/notificationApi';
import { selectUnreadCount } from '../../store/notification/notificationSlice';

/**
 * Notification Bell component with dropdown
 * Shows unread count badge and recent notifications
 */
const NotificationBell = ({ isAdmin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get unread count from Redux (for real-time updates)
  const realtimeUnreadCount = useSelector(selectUnreadCount);

  // RTK Query hooks
  const { data: unreadData } = useGetUnreadCountQuery(undefined, {
    pollingInterval: 60000, // Poll every minute
  });
  const { data: notificationsData, isLoading } = useGetNotificationsQuery(
    { page: 1, limit: 5 },
    { skip: !isOpen }
  );

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  // Use realtime count if available, otherwise API count
  const unreadCount = realtimeUnreadCount || unreadData?.count || 0;
  const notifications = notificationsData?.notifications || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get icon based on notification type
  const getIcon = (type) => {
    const iconClass = "h-4 w-4";
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
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return notificationDate.toLocaleDateString();
  };

  const handleMarkAsRead = async (e, notificationId) => {
    e.preventDefault();
    e.stopPropagation();
    await markAsRead(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const notificationsLink = isAdmin
    ? '/admin/notifications'
    : '/marketplace/dashboard/notifications';

  // Helper to conditionally apply dark mode classes
  const d = (classes) => isAdmin ? classes : '';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full hover:bg-gray-100 ${d('dark:hover:bg-gray-800')} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
        aria-label="Notifications"
      >
        <Bell className={`h-5 w-5 text-gray-600 ${d('dark:text-gray-300')}`} />

        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={`absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-blue-600 rounded-full border-2 border-white ${d('dark:border-gray-900')}`}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-3 w-80 sm:w-96 bg-white/90 ${d('dark:bg-gray-900/95')} backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 ${d('dark:border-gray-700/50')} overflow-hidden z-50 ring-1 ring-black/5`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-5 py-4 border-b border-gray-100 ${d('dark:border-gray-800')}`}>
              <h3 className={`font-semibold text-gray-900 ${d('dark:text-white')}`}>Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className={`text-xs font-medium text-blue-600 hover:text-blue-700 ${d('dark:text-blue-400')} hover:underline transition-all`}
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[24rem] overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                  <div className={`h-16 w-16 bg-gray-50 ${d('dark:bg-gray-800/50')} rounded-full flex items-center justify-center mb-3`}>
                    <Bell className={`h-8 w-8 text-gray-300 ${d('dark:text-gray-600')}`} />
                  </div>
                  <p className={`text-gray-900 ${d('dark:text-white')} font-medium`}>No notifications yet</p>
                  <p className={`text-xs text-gray-500 ${d('dark:text-gray-400')} mt-1`}>
                    We'll let you know when something arrives.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <Link
                    key={notification._id}
                    to={notification.link || notificationsLink}
                    onClick={() => {
                      if (!notification.read) {
                        markAsRead(notification._id);
                      }
                      setIsOpen(false);
                    }}
                    className={`flex items-start gap-3 px-5 py-4 hover:bg-gray-50 ${d('dark:hover:bg-gray-800/50')} transition-colors border-b border-gray-100 ${d('dark:border-gray-800')} last:border-b-0 ${
                      !notification.read ? `bg-blue-50/40 ${d('dark:bg-blue-900/10')}` : ''
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                      !notification.read
                        ? `bg-white ${d('dark:bg-gray-800')} shadow-sm ring-1 ring-gray-200 ${d('dark:ring-gray-700')}`
                        : `bg-gray-100 ${d('dark:bg-gray-800/50')}`
                    }`}>
                      {getIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className={`text-sm font-medium truncate ${
                          !notification.read
                            ? `text-gray-900 ${d('dark:text-white')}`
                            : `text-gray-700 ${d('dark:text-gray-300')}`
                        }`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                        )}
                      </div>
                      <p className={`text-xs text-gray-500 ${d('dark:text-gray-400')} line-clamp-2 mt-1 leading-relaxed`}>
                        {notification.message}
                      </p>
                      <p className={`text-[10px] text-gray-400 ${d('dark:text-gray-500')} mt-2 font-medium`}>
                        {formatTimeAgo(notification.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Footer */}
            <Link
              to={notificationsLink}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-500 hover:text-emerald-600 ${d('dark:text-emerald-400')} hover:bg-gray-50 ${d('dark:hover:bg-gray-800/50')} border-t border-gray-100 ${d('dark:border-gray-800')} transition-colors`}
            >
              View all notifications
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
