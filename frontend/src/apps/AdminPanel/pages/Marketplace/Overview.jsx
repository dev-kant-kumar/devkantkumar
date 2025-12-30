import {
    Activity,
    DollarSign,
    Package,
    ShoppingBag,
    Users
} from 'lucide-react';
import { useGetMarketplaceStatsQuery } from '../../store/api/adminApiSlice';

import {
    ArrowDownRight,
    ArrowUpRight,
    Clock
} from 'lucide-react';

const Overview = () => {
  const { data, isLoading } = useGetMarketplaceStatsQuery();
  const stats = data?.stats || { products: 0, services: 0, orders: 0, revenue: 0 };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.revenue),
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgGlow: 'bg-green-500/10',
      text: 'text-green-600 dark:text-green-400',
      trend: '+12.5%',
      trendUp: true,
      description: 'Total earnings'
    },
    {
      title: 'Active Orders',
      value: stats.orders,
      icon: ShoppingBag,
      color: 'from-blue-500 to-indigo-600',
      bgGlow: 'bg-blue-500/10',
      text: 'text-blue-600 dark:text-blue-400',
      trend: '+4.3%',
      trendUp: true,
      description: 'Orders pending or processing'
    },
    {
      title: 'Products Listed',
      value: stats.products,
      icon: Package,
      color: 'from-purple-500 to-violet-600',
      bgGlow: 'bg-purple-500/10',
      text: 'text-purple-600 dark:text-purple-400',
      trend: '+2.1%',
      trendUp: true,
      description: 'Digital assets available'
    },
    {
      title: 'Active Services',
      value: stats.services,
      icon: Users,
      color: 'from-orange-500 to-red-600',
      bgGlow: 'bg-orange-500/10',
      text: 'text-orange-600 dark:text-orange-400',
      trend: '+5.4%',
      trendUp: true,
      description: 'Freelance services live'
    }
  ];

  // Mock data for the CSS Chart
  const revenueData = [40, 65, 45, 80, 55, 90, 70];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Marketplace Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Monitor metrics, analyze revenue, and manage your platform.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
            <Clock size={16} />
            <span>Updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
           [...Array(4)].map((_, i) => (
               <div key={i} className="h-40 bg-gray-100 dark:bg-gray-800/50 rounded-2xl animate-pulse"></div>
           ))
        ) : (
           statCards.map((stat, index) => (
             <div
               key={index}
               className="group relative bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
             >
               <div className="flex justify-between items-start mb-4">
                 <div className={`p-3 rounded-xl ${stat.bgGlow} transition-colors group-hover:bg-opacity-20`}>
                   <stat.icon size={24} className={stat.text} />
                 </div>
                 <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                   {stat.trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                   {stat.trend}
                 </div>
               </div>

               <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
                 {stat.value}
               </h3>
               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                 {stat.title}
               </p>
             </div>
           ))
        )}
      </div>

      {/* Analytics & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Revenue Chart (CSS Based) */}
          <div className="lg:col-span-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 flex flex-col h-[400px]">
              <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Activity size={20} className="text-blue-500" />
                      Revenue Analytics
                  </h3>
                  <select className="bg-transparent text-sm active:outline-none focus:outline-none text-gray-500 dark:text-gray-400 border-none cursor-pointer">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                  </select>
              </div>

              {/* CSS Bar Chart */}
              <div className="flex-1 flex items-end justify-between gap-4 px-2 pb-2">
                  {revenueData.map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full relative h-[250px] bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-hidden">
                              <div
                                style={{ height: `${height}%` }}
                                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-purple-500 opacity-80 group-hover:opacity-100 transition-all duration-300 rounded-t-xl"
                              />
                          </div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{days[i]}</span>
                      </div>
                  ))}
              </div>
          </div>

          {/* Quick Actions / Recent Activity Placeholder */}
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
               <div className="space-y-6">
                   {[1, 2, 3, 4].map((_, i) => (
                       <div key={i} className="flex items-start gap-4 p-3 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50">
                           <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                               <ShoppingBag size={18} className="text-blue-600 dark:text-blue-400" />
                           </div>
                           <div>
                               <p className="text-sm font-semibold text-gray-900 dark:text-white">New Order #102{i}</p>
                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                   Placed by <span className="text-blue-500">Alex Morgan</span> • 2 mins ago
                               </p>
                           </div>
                       </div>
                   ))}
               </div>
               <button className="w-full mt-6 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors">
                   View All Orders
               </button>
          </div>
      </div>
    </div>
  );
};

export default Overview;
