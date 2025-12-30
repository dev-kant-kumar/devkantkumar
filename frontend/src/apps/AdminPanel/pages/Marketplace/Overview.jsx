import {
    Activity,
    Clock,
    DollarSign,
    Package,
    ShoppingBag,
    TrendingUp
} from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { useGetMarketplaceStatsQuery } from '../../store/api/adminApiSlice';

const Overview = () => {
  const { data, isLoading } = useGetMarketplaceStatsQuery();
  const stats = data?.stats || {
    products: 0,
    services: 0,
    orders: 0,
    revenue: 0,
    revenueTimeline: [],
    statusDistribution: []
  };

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
      title: 'Total Orders',
      value: stats.orders,
      icon: ShoppingBag,
      color: 'from-blue-500 to-indigo-600',
      bgGlow: 'bg-blue-500/10',
      text: 'text-blue-600 dark:text-blue-400',
      trend: '+4.3%',
      trendUp: true,
      description: 'All time orders'
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
      icon: Activity,
      color: 'from-orange-500 to-red-600',
      bgGlow: 'bg-orange-500/10',
      text: 'text-orange-600 dark:text-orange-400',
      trend: '+5.4%',
      trendUp: true,
      description: 'Freelance services live'
    }
  ];

  // Prepare Pie Chart Data
  const pieData = stats.statusDistribution?.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count
  })) || [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Prepare Area Chart Data (Timeline)
  const areaData = stats.revenueTimeline || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform scale-150 -translate-y-2 translate-x-2 ${stat.text}`}>
                    <Icon size={64} />
                </div>
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm relative z-10">
                <span className={`flex items-center gap-1 font-medium ${stat.text} bg-white/50 dark:bg-gray-800/50 px-2 py-0.5 rounded-full`}>
                   <TrendingUp size={14} />
                   {stat.trend}
                </span>
                <span className="text-gray-400 dark:text-gray-500 text-xs">{stat.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Trend</h3>
                <p className="text-sm text-gray-500">Income over the last 30 days</p>
            </div>
            <div className="h-[300px] w-full">
                {areaData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="_id"
                                axisLine={false}
                                tickLine={false}
                                tick={{fontSize: 12, fill: '#6B7280'}}
                                minTickGap={30}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{fontSize: 12, fill: '#6B7280'}}
                                tickFormatter={(value) => `₹${value}`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value) => [`₹${value}`, 'Revenue']}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8884d8"
                                strokeWidth={3}
                                insertOpacity={1}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <DollarSign size={48} className="mb-2 opacity-50" />
                        <p>No revenue data available yet</p>
                    </div>
                )}
            </div>
        </div>

        {/* Order Status Distribution */}
        <div className="lg:col-span-1 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
             <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Status</h3>
                <p className="text-sm text-gray-500">Distribution by current status</p>
            </div>
            <div className="h-[300px] w-full">
                {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <ShoppingBag size={48} className="mb-2 opacity-50" />
                        <p>No orders available yet</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;
