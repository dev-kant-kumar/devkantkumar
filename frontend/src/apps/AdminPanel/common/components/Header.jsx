import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Menu, Settings, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../store/auth/adminAuthSlice";

import { useGetAdminProfileQuery } from "../../store/api/adminApiSlice";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const { data: profile } = useGetAdminProfileQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Content", path: "/admin/content" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Skills", path: "/admin/skills" },
    { name: "Blog", path: "/admin/blog" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const panelSwitchItems = [
    { name: "Portfolio", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Admin", path: "/admin", current: true },
  ];

  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
          : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/admin" className="flex items-center group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Admin
                  </span>
                  <span className="text-gray-900 dark:text-white ml-2">
                    Panel
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Content Management
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Panel Switcher & Profile */}
          <div className="hidden lg:flex items-center space-x-3">


              {/* Notifications */}
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <Bell size={20} />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {profile?.avatar?.url ? (
                    <img
                      src={profile.avatar.url}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                      {profile?.firstName ? (
                        profile.firstName[0].toUpperCase()
                      ) : (
                        <User size={18} />
                      )}
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                    >
                      {profile && (
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {profile.firstName} {profile.lastName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {profile.email}
                          </p>
                        </div>
                      )}
                      <Link
                        to="/admin/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Panel Switcher (Settings Icon - at the end) */}
              <div className="relative" ref={panelRef}>
                <button
                  onClick={() => setIsPanelOpen(!isPanelOpen)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isPanelOpen
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  title="Switch Panel"
                >
                  <Settings size={18} />
                </button>

                <AnimatePresence>
                  {isPanelOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-[60]"
                    >
                      <div className="p-1.5">
                        <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Switch Panel
                        </div>
                        {panelSwitchItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsPanelOpen(false)}
                            className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                              item.current
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
