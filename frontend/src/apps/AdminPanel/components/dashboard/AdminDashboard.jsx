import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  MessageSquare,
  FolderOpen,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Eye,
  Calendar,
} from 'lucide-react';

// RTK Query hooks
import {
  useGetDashboardOverviewQuery,
  useGetDashboardStatsQuery,
  useGetDashboardAnalyticsQuery,
  useGetProjectsQuery,
  useGetContactMessagesQuery,
} from '../../store/api/adminApiSlice';

// UI slice selectors and actions
import {
  selectDashboardOverview,
  selectDashboardStats,
  selectDashboardAnalytics,
  selectProjectsList,
  selectMessagesUnreadCount,
  selectIsDataRefreshNeeded,
  markDataForRefresh,
  setActiveSection,
} from '../../store/ui/adminUISlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // RTK Query hooks with automatic caching and refetching
  const {
    data: overviewData,
    isLoading: isOverviewLoading,
    error: overviewError,
    refetch: refetchOverview,
  } = useGetDashboardOverviewQuery(undefined, {
    pollingInterval: 300000, // Poll every 5 minutes
    refetchOnMountOrArgChange: true,
  });

  const {
    data: statsData,
    isLoading: isStatsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useGetDashboardStatsQuery(undefined, {
    pollingInterval: 600000, // Poll every 10 minutes
  });

  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    error: analyticsError,
  } = useGetDashboardAnalyticsQuery({
    period: '30d',
    metrics: ['views', 'projects', 'messages'],
  });

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = useGetProjectsQuery({
    page: 1,
    limit: 5,
    status: 'published',
  });

  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useGetContactMessagesQuery({
    page: 1,
    limit: 5,
    unreadOnly: true,
  });

  // Selectors for cached data from UI slice
  const cachedOverview = useSelector(selectDashboardOverview);
  const cachedStats = useSelector(selectDashboardStats);
  const cachedAnalytics = useSelector(selectDashboardAnalytics);
  const cachedProjects = useSelector(selectProjectsList);
  const unreadMessagesCount = useSelector(selectMessagesUnreadCount);

  // Check if data refresh is needed
  const isDashboardRefreshNeeded = useSelector(selectIsDataRefreshNeeded('dashboard'));
  const isProjectsRefreshNeeded = useSelector(selectIsDataRefreshNeeded('projects'));

  // Set active section on mount
  useEffect(() => {
    dispatch(setActiveSection('dashboard'));
  }, [dispatch]);

  // Handle manual refresh
  const handleRefreshAll = () => {
    refetchOverview();
    refetchStats();
    dispatch(markDataForRefresh(['dashboard', 'projects', 'messages']));
  };

  // Loading state
  const isLoading = isOverviewLoading || isStatsLoading || isAnalyticsLoading;

  // Error handling
  const hasError = overviewError || statsError || analyticsError || projectsError || messagesError;

  // Use RTK Query data or fallback to cached data
  const overview = overviewData?.data || cachedOverview;
  const stats = statsData?.data || cachedStats;
  const analytics = analyticsData?.data || cachedAnalytics;
  const recentProjects = projectsData?.data?.projects || cachedProjects?.slice(0, 5);
  const unreadMessages = messagesData?.data?.messages || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Here's what's happening with your portfolio.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefreshAll}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </motion.button>
        </div>

        {/* Error Banner */}
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">
                Some data couldn't be loaded. Using cached data where available.
              </p>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Projects"
            value={stats?.totalProjects || overview?.projectsCount || 0}
            icon={FolderOpen}
            trend={stats?.projectsTrend}
            isLoading={isStatsLoading}
            color="blue"
          />

          <StatsCard
            title="Total Views"
            value={stats?.totalViews || overview?.totalViews || 0}
            icon={Eye}
            trend={stats?.viewsTrend}
            isLoading={isStatsLoading}
            color="green"
          />

          <StatsCard
            title="Unread Messages"
            value={unreadMessagesCount || unreadMessages?.length || 0}
            icon={MessageSquare}
            trend={stats?.messagesTrend}
            isLoading={isMessagesLoading}
            color="orange"
          />

          <StatsCard
            title="This Month"
            value={analytics?.currentMonth?.total || 0}
            icon={Calendar}
            trend={analytics?.monthlyTrend}
            isLoading={isAnalyticsLoading}
            color="purple"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Projects
              </h2>
              {isProjectsRefreshNeeded && (
                <span className="text-xs text-orange-500">Refresh needed</span>
              )}
            </div>

            {isProjectsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentProjects?.length > 0 ? (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {project.status} • {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {project.views || 0} views
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No projects found
              </p>
            )}
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Unread Messages
              </h2>
              {unreadMessagesCount > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {unreadMessagesCount} new
                </span>
              )}
            </div>

            {isMessagesLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : unreadMessages?.length > 0 ? (
              <div className="space-y-3">
                {unreadMessages.map((message) => (
                  <div
                    key={message.id}
                    className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {message.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {message.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No unread messages
              </p>
            )}
          </motion.div>
        </div>

        {/* Analytics Chart */}
        {analytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Analytics Overview
              </h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {analytics.totalViews || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Views
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {analytics.uniqueVisitors || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Unique Visitors
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {analytics.avgSessionDuration || '0m'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Session
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, trend, isLoading, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          {isLoading ? (
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {trend && !isLoading && (
        <div className="flex items-center mt-4">
          <TrendingUp className={`h-4 w-4 mr-1 ${
            trend > 0 ? 'text-green-500' : 'text-red-500'
          }`} />
          <span className={`text-sm font-medium ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
