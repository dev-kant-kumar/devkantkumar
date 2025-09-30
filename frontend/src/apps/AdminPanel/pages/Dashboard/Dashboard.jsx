import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  FolderOpen,
  TrendingUp,
  Activity,
  Clock,
  Eye,
  MessageSquare
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    { name: "Total Projects", value: "12", icon: FolderOpen, change: "+2", changeType: "positive" },
    { name: "Blog Posts", value: "24", icon: FileText, change: "+5", changeType: "positive" },
    { name: "Page Views", value: "1,234", icon: Eye, change: "+12%", changeType: "positive" },
    { name: "Messages", value: "8", icon: MessageSquare, change: "3 new", changeType: "neutral" },
  ];

  const recentActivity = [
    { action: "New project added", time: "2 hours ago", type: "project" },
    { action: "Blog post published", time: "5 hours ago", type: "blog" },
    { action: "Skills updated", time: "1 day ago", type: "skills" },
    { action: "Contact form submission", time: "2 days ago", type: "contact" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <Activity size={20} className="text-gray-600 dark:text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <Clock size={12} className="mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <TrendingUp size={20} className="text-gray-600 dark:text-gray-400" />
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
              <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Add New Project
              </div>
              <div className="text-xs text-blue-500 dark:text-blue-300 mt-1">
                Showcase your latest work
              </div>
            </button>
            <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
              <div className="text-sm font-medium text-green-600 dark:text-green-400">
                Write Blog Post
              </div>
              <div className="text-xs text-green-500 dark:text-green-300 mt-1">
                Share your knowledge
              </div>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200">
              <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Update Skills
              </div>
              <div className="text-xs text-purple-500 dark:text-purple-300 mt-1">
                Keep your expertise current
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
