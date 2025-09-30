import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import {
  selectIsAuthenticated,
  selectAuthLoading,
  initializeAuth,
} from '../../store/auth/adminAuthSlice';
import AdminLogin from './AdminLogin';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white animate-pulse" />
          </div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </motion.div>
      </div>
    );
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
