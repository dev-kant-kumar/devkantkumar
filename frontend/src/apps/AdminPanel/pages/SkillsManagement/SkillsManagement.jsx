import React from "react";
import { motion } from "framer-motion";

const SkillsManagement = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skills Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your technical skills and expertise levels.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Skills management features will be implemented here.
        </p>
      </motion.div>
    </div>
  );
};

export default SkillsManagement;
