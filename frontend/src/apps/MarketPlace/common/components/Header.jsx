import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, Search, Settings, ShoppingCart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetCartQuery } from '../../../../store/cart/cartApi'; // Points to src/store/cart/cartApi
import { useLogoutMutation } from '../../store/auth/authApi';
import { logout, selectCurrentUser, selectIsAuthenticated } from '../../store/auth/authSlice';
import { selectCartItemCount } from '../../store/cart/cartSlice';
import LocationSelector from "./LocationSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // const cartCount = useSelector(selectCartItemCount);  // Fetch cart data for real-time count
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !isAuthenticated // Skip if not logged in
  });

  const localCartCount = useSelector(selectCartItemCount);
  const cartCount = isAuthenticated ? (cartData?.cart?.items?.length || 0) : localCartCount;

  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const [logoutApi] = useLogoutMutation();

  const dropdownRef = useRef(null);
  const panelRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(logout());
      setIsProfileOpen(false);
      navigate('/marketplace/auth/signin');
    }
  };

  const navigationItems = [
    { name: "Home", path: "/marketplace" },
    { name: "Services", path: "/marketplace/services" },
    { name: "Products", path: "/marketplace/products" },
    { name: "Custom Solutions", path: "/marketplace/custom-solutions" },
    { name: "Support", path: "/marketplace/support" },
  ];

  const panelSwitchItems = [
    { name: "Portfolio", path: "/" },
    { name: "Marketplace", path: "/marketplace", current: true },
    { name: "Admin", path: "/admin" },
  ];

  const isActive = (path) => {
    if (path === "/marketplace" && location.pathname === "/marketplace") return true;
    if (path !== "/marketplace" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
          : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/marketplace" className="flex items-center group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Market
                </span>
                <span className="text-gray-900 dark:text-white ml-1">Place</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider group-hover:text-green-500 transition-colors duration-300">
                Digital Services & Products
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    isActive(item.path)
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>


          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">



            {/* Search */}
            <div className="relative" ref={searchRef}>
                <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64 bg-gray-100 dark:bg-gray-800 rounded-lg px-2' : 'w-10'}`}>
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex-shrink-0"
                    >
                        <Search size={20} />
                    </button>

                    <AnimatePresence>
                        {isSearchOpen && (
                            <motion.form
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: '100%' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="flex-grow overflow-hidden"
                                onSubmit={handleSearchSubmit}
                            >
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Cart */}
            <Link
              to="/marketplace/cart"
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth / Profile */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                    {(user?.firstName || user?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/marketplace/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/marketplace/dashboard/orders"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/marketplace/dashboard/billing"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Billing & Plans
                      </Link>
                      <Link
                        to="/marketplace/dashboard/support"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Support Tickets
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/marketplace/auth/signin"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/marketplace/auth/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

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
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium"
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

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

            {/* Location Selector */}
            <LocationSelector />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Cart */}
            <Link
              to="/marketplace/cart"
              className="relative p-2 text-gray-600 dark:text-gray-400"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Auth */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                          {(user?.firstName || user?.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                      </div>

                      <div className="pl-4 space-y-1 mt-2 mb-2">
                        <Link
                          to="/marketplace/dashboard"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard Overview
                        </Link>
                        <Link
                          to="/marketplace/dashboard/orders"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/marketplace/dashboard/services"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Services
                        </Link>
                        <Link
                          to="/marketplace/dashboard/products"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Products
                        </Link>
                        <Link
                          to="/marketplace/dashboard/billing"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Billing & Plans
                        </Link>
                        <Link
                          to="/marketplace/dashboard/support"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Support Tickets
                        </Link>
                        <Link
                          to="/marketplace/dashboard/settings"
                          className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Settings
                        </Link>
                      </div>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="px-4 space-y-2">
                      <Link
                        to="/marketplace/auth/signin"
                        className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/marketplace/auth/signup"
                        className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Panel Switcher */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Switch Panel
                  </div>
                  {panelSwitchItems.map((panel) => (
                    <Link
                      key={panel.name}
                      to={panel.path}
                      className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        panel.current
                          ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {panel.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
