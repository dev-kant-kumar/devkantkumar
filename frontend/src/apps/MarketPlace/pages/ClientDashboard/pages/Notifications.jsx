import { motion } from 'framer-motion';
import { Bell, Info, MessageSquare, Package } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New Message from Alex M.',
      message: 'I have uploaded the initial wireframes for your review.',
      time: '10 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'order',
      title: 'Order #ORD-7352 Completed',
      message: 'Your order for "E-commerce UI Kit" has been processed successfully.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'system',
      title: 'Password Updated',
      message: 'Your account password was successfully changed.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'order',
      title: 'Order #ORD-7351 Processing',
      message: 'We have received your order and are currently processing it.',
      time: '2 days ago',
      read: true,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'order': return <Package className="h-5 w-5 text-green-500" />;
      case 'system': return <Info className="h-5 w-5 text-gray-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">Stay updated with your latest activity.</p>
        </div>
        <button className="text-sm font-medium text-green-600 hover:text-green-700">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/30' : ''}`}
            >
              <div className={`p-2 rounded-full flex-shrink-0 ${!notification.read ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </p>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
              )}
            </motion.div>
          ))}
        </div>
        {notifications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p>No new notifications</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;
