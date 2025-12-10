import {
  Bell,
  Box,
  CreditCard,
  Download,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingBag
} from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout, selectCurrentUser, selectIsAuthenticated } from '../../store/auth/authSlice';

import { useGetMeQuery, useLogoutMutation } from '../../store/auth/authApi';
import { setCredentials } from '../../store/auth/authSlice';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const [logoutApi] = useLogoutMutation();

  // Fetch fresh user data on mount
  const { data: userData } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  // Update store and local storage when fresh data arrives
  useEffect(() => {
    if (userData?.data) {
      // We need the token to be preserved, so we get it from store or local storage
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(setCredentials({ user: userData.data, token }));
      }
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/marketplace/auth/signin', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return null;

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(logout());
      navigate('/marketplace/auth/signin');
    }
  };

  const navigation = [
    { name: 'Overview', href: '/marketplace/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'My Orders', href: '/marketplace/dashboard/orders', icon: ShoppingBag, exact: false },
    { name: 'My Services', href: '/marketplace/dashboard/services', icon: Box, exact: false },
    { name: 'My Products', href: '/marketplace/dashboard/products', icon: Download, exact: false },
    { name: 'Billing & Plans', href: '/marketplace/dashboard/billing', icon: CreditCard, exact: false },
    { name: 'Support Tickets', href: '/marketplace/dashboard/support', icon: MessageSquare, exact: false },
    { name: 'Settings', href: '/marketplace/dashboard/settings', icon: Settings, exact: false },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.href;
    }
    return location.pathname.startsWith(item.href);
  };

  const displayName = user?.firstName ? `${user.firstName} ${user.lastName}` : user?.name || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Client Portal
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/marketplace/dashboard/notifications" className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </Link>
              <div className="flex items-center space-x-3 ml-4 border-l border-gray-200 pl-4">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                  {initial}
                </div>
                <span className="text-sm font-medium text-gray-700">{displayName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                    ${isActive(item)
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      flex-shrink-0 -ml-1 mr-3 h-5 w-5 transition-colors
                      ${isActive(item) ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors mt-8"
              >
                <LogOut className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
