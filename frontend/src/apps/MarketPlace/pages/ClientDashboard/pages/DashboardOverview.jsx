import { motion } from 'framer-motion';
import { Download, Package, ShoppingBag, Star } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    { label: 'Total Orders', value: '24', icon: ShoppingBag, color: 'blue' },
    { label: 'Active Services', value: '3', icon: Package, color: 'purple' },
    { label: 'Downloads', value: '156', icon: Download, color: 'green' },
    { label: 'Reviews', value: '18', icon: Star, color: 'yellow' }
  ];

  const recentActivity = [
    { id: 1, type: 'order', message: 'New order placed for "E-commerce UI Kit"', time: '2 hours ago' },
    { id: 2, type: 'service', message: 'Project "Custom Website" moved to Development phase', time: '1 day ago' },
    { id: 3, type: 'download', message: 'Downloaded "SaaS Dashboard Template"', time: '3 days ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <li key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`
                    h-2 w-2 rounded-full mr-4
                    ${activity.type === 'order' ? 'bg-blue-500' : ''}
                    ${activity.type === 'service' ? 'bg-purple-500' : ''}
                    ${activity.type === 'download' ? 'bg-green-500' : ''}
                  `} />
                  <p className="text-sm text-gray-900">{activity.message}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
