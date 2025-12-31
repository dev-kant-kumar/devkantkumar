import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    initializeAuth,
    selectIsAuthenticated,
} from '../../store/auth/adminAuthSlice';
import AdminLogin from './AdminLogin';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
