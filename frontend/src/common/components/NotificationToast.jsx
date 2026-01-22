import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CreditCard, FileText, Info, MessageSquare, Package, Ticket, UserPlus, X } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideNotificationToast, selectToastState } from '../../store/notification/notificationSlice';

/**
 * Toast notification component that appears when new notifications arrive
 * Auto-dismisses after 5 seconds
 */
const NotificationToast = () => {
  const dispatch = useDispatch();
  const { show, notification } = useSelector(selectToastState);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideNotificationToast());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  const getIcon = (type) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'order_created':
      case 'order_status':
      case 'order_completed':
        return <Package className={`${iconClass} text-green-400`} />;
      case 'payment_received':
      case 'payment_failed':
        return <CreditCard className={`${iconClass} text-blue-400`} />;
      case 'support_ticket':
      case 'support_response':
        return <Ticket className={`${iconClass} text-orange-400`} />;
      case 'quote_request':
      case 'quote_response':
        return <FileText className={`${iconClass} text-purple-400`} />;
      case 'message':
        return <MessageSquare className={`${iconClass} text-indigo-400`} />;
      case 'welcome':
        return <UserPlus className={`${iconClass} text-emerald-400`} />;
      case 'system':
        return <Info className={`${iconClass} text-gray-400`} />;
      default:
        return <Bell className={`${iconClass} text-gray-400`} />;
    }
  };

  if (!notification) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-4 right-4 z-[100] max-w-sm w-full"
        >
          <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            {/* Progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"
            />

            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 p-2 rounded-full bg-gray-800">
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-white truncate">
                      {notification.title}
                    </p>
                    <button
                      onClick={() => dispatch(hideNotificationToast())}
                      className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  {notification.link && (
                    <Link
                      to={notification.link}
                      onClick={() => dispatch(hideNotificationToast())}
                      className="inline-flex items-center gap-1 mt-2 text-sm text-green-400 hover:text-green-300 font-medium"
                    >
                      View details →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
