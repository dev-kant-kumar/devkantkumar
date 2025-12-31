import { motion } from "framer-motion";
import {
    Activity,
    ArrowRight,
    Clock,
    FileText,
    FolderOpen,
    Sparkles,
    Eye,
    MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { useGetDashboardAnalyticsQuery, useGetPortfolioStatsQuery } from "../../store/api/adminApiSlice";

const SkeletonStat = () => (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-32 animate-pulse" />
);

const SkeletonChart = () => (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-[400px] animate-pulse" />
);

const Dashboard = () => {
    const { data: portfolioData, isLoading: isLoadingStats } = useGetPortfolioStatsQuery();
    const { data: analyticsDataResponse, isLoading: isLoadingAnalytics } = useGetDashboardAnalyticsQuery();

    const statsData = portfolioData?.data?.stats || {
        projects: 0,
        blogs: 0,
        skills: 0,
        messages: 0,
        pageViews: 0
    };

    const recentActivity = portfolioData?.data?.recentActivity || [];

    const isLoading = isLoadingStats || isLoadingAnalytics;

    if (isLoading) {
        return (
            <div className="space-y-8 p-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <SkeletonStat key={i} />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <SkeletonChart />
                    </div>
                    <div>
                        <SkeletonChart />
                    </div>
                </div>
            </div>
        );
    }

    const gaData = analyticsDataResponse?.data?.googleAnalytics?.ga;
    const gscData = analyticsDataResponse?.data?.googleAnalytics?.gsc?.overview || {
        clicks: 0,
        impressions: 0,
        ctr: 0,
        position: 0
    };

    const isFallback = gaData?.isFallback || analyticsDataResponse?.data?.googleAnalytics?.gsc?.isFallback;
    const lastUpdated = gaData?.lastUpdated ? new Date(gaData.lastUpdated).toLocaleTimeString() : 'Just now';

    const stats = [
        {
            name: "Total Projects",
            value: statsData.projects,
            icon: FolderOpen,
            color: "from-blue-500 to-indigo-600",
            bgGlow: "bg-blue-500/10",
            text: "text-blue-600 dark:text-blue-400",
            description: "Showcasing your work"
        },
        {
            name: "Blog Posts",
            value: statsData.blogs,
            icon: FileText,
            color: "from-purple-500 to-violet-600",
            bgGlow: "bg-purple-500/10",
            text: "text-purple-600 dark:text-purple-400",
            description: "Sharing your thoughts"
        },
        {
            name: "Page Views",
            value: (gaData?.overview?.pageViews || statsData.pageViews || 0).toLocaleString(),
            icon: Eye,
            color: "from-green-500 to-emerald-600",
            bgGlow: "bg-green-500/10",
            text: "text-green-600 dark:text-green-400",
            description: "Total GA4 platform reach"
        },
        {
            name: "Unread Messages",
            value: statsData.messages,
            icon: MessageSquare,
            color: "from-orange-500 to-red-600",
            bgGlow: "bg-orange-500/10",
            text: "text-orange-600 dark:text-orange-400",
            description: "Pending inquiries"
        },
    ];

    const searchStats = [
        { name: "Search Clicks", value: gscData.clicks?.toLocaleString() || "0", label: "Total Clicks" },
        { name: "Impressions", value: gscData.impressions?.toLocaleString() || "0", label: "Search Visibility" },
        { name: "Avg CTR", value: `${gscData.ctr || 0}%`, label: "Click Through Rate" },
        { name: "Avg Position", value: gscData.position || 0, label: "Search Ranking" },
    ];

    const chartData = analyticsDataResponse?.data?.visitStats?.map(item => ({
        name: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
        views: item.views
    })) || [
        { name: 'Mon', views: 0 },
        { name: 'Tue', views: 0 },
        { name: 'Wed', views: 0 },
        { name: 'Thu', views: 0 },
        { name: 'Fri', views: 0 },
        { name: 'Sat', views: 0 },
        { name: 'Sun', views: 0 },
    ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Sparkles size={16} />
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Overview</span>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Portfolio Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Welcome back! Here's the latest pulse of your professional portfolio.
          </p>
        </motion.div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <Clock size={16} />
            <span>Updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Fallback Warning Stripe */}
      {isFallback && (
          <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-6 py-3 bg-blue-500/5 border border-blue-500/10 rounded-2xl"
          >
              <Activity className="text-blue-500" size={18} />
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tight">
                  Displaying real-time baseline data. Google index sync in progress.
              </p>
          </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform scale-150 -translate-y-2 translate-x-2 ${stat.text}`}>
                <Icon size={64} />
              </div>
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg shadow-black/5`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm relative z-10">
                 <span className="text-gray-400 dark:text-gray-500 text-xs">{stat.description}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid: Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Visitor Analytics Chart */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="lg:col-span-2 space-y-8"
        >
          <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500/50 w-fit pb-1">Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">Portfolio traffic over the last week</p>
              </div>
              <div className="flex gap-2">
                 <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200/50 dark:border-blue-700/50 tracking-wide uppercase">Views</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.3} />
                  <XAxis
                     dataKey="name"
                     axisLine={false}
                     tickLine={false}
                     tick={{fontSize: 12, fill: '#6B7280'}}
                  />
                  <YAxis
                     axisLine={false}
                     tickLine={false}
                     tick={{fontSize: 12, fill: '#6B7280'}}
                  />
                  <Tooltip
                     contentStyle={{
                       borderRadius: '16px',
                       border: 'none',
                       boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                       backgroundColor: 'rgba(255,255,255,0.9)',
                       backdropFilter: 'blur(8px)'
                     }}
                  />
                  <Area
                     type="monotone"
                     dataKey="views"
                     stroke="#3b82f6"
                     strokeWidth={3}
                     fillOpacity={1}
                     fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Search Console Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {searchStats.map((stat, idx) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-center"
              >
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.name}</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">

          {/* Recent Activity */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Live Activity</h3>
              <Activity size={20} className="text-blue-500" />
            </div>
            <div className="space-y-4">
              {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 group cursor-default">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 ${
                    activity.type === 'project' ? 'bg-blue-500' :
                    activity.type === 'blog' ? 'bg-purple-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {activity.action}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                      <Clock size={10} className="mr-1" />
                      {new Date(activity.time).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 text-center py-4 italic">No recent activity found.</p>
              )}
            </div>
          </motion.div>

          {/* Premium Quick Actions */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-gradient-to-br from-gray-900 to-blue-900 dark:from-gray-800 dark:to-indigo-900 p-6 rounded-2xl border border-white/10 shadow-xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                Quick Start
                <ArrowRight size={18} />
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <Link to="/admin/projects" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all group">
                   <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">Add New Project</span>
                      <FolderOpen size={16} className="text-blue-300 group-hover:scale-110 transition-transform"/>
                   </div>
                </Link>
                <Link to="/admin/blog" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all group">
                   <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">Write Blog Post</span>
                      <FileText size={16} className="text-purple-300 group-hover:scale-110 transition-transform"/>
                   </div>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
