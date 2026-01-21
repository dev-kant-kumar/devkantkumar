import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Loader2, LogOut, Menu, Package, Search, Server, Settings, ShoppingCart, Star, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetCartQuery } from '../../../../store/cart/cartApi';
import { useCurrency } from '../../context/CurrencyContext';
import { useGetProductsQuery, useGetServicesQuery } from '../../store/api/marketplaceApi';
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
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const searchInputRef = useRef(null);
  const { formatPrice } = useCurrency();

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) setRecentSearches(JSON.parse(saved).slice(0, 5));
    } catch (e) { /* ignore */ }
  }, []);

  // Debounce search query for API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        setDebouncedQuery(searchQuery.trim());
      } else {
        setDebouncedQuery("");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch products and services based on debounced query
  const { data: productsData, isLoading: isLoadingProducts } = useGetProductsQuery(
    { search: debouncedQuery, limit: 5 },
    { skip: !debouncedQuery }
  );
  const { data: servicesData, isLoading: isLoadingServices } = useGetServicesQuery(
    { search: debouncedQuery, limit: 5 },
    { skip: !debouncedQuery }
  );

  const isSearching = isLoadingProducts || isLoadingServices;
  const products = productsData?.products || [];
  const services = servicesData?.services || [];
  const hasResults = products.length > 0 || services.length > 0;

  // Save search to recent
  const saveRecentSearch = useCallback((query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
      navigate(`/marketplace/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleResultClick = (type, id) => {
    saveRecentSearch(searchQuery);
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/marketplace/${type}/${id}`);
  };

  const handleRecentClick = (query) => {
    setSearchQuery(query);
    searchInputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const [logoutApi] = useLogoutMutation();

  const dropdownRef = useRef(null);
  const panelRef = useRef(null);

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
    };

    // Keyboard shortcuts for search
    const handleKeyDown = (event) => {
      // Cmd+K or Ctrl+K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      // Escape to close search
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

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



            {/* Search Button - Opens modal */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              title="Search (⌘K)"
            >
              <Search size={20} />
            </button>

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

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-2xl mx-auto mt-20 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="flex items-center px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <Search className="h-5 w-5 text-gray-400 mr-3" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, services, templates..."
                      className="flex-1 bg-transparent border-none text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 py-3"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      ESC
                    </button>
                  </div>
                  {/* Search Results / Quick Links */}
                  <div className="max-h-[60vh] overflow-y-auto">

                    {/* Loading State */}
                    {isSearching && debouncedQuery && (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                        <span className="ml-2 text-gray-500">Searching...</span>
                      </div>
                    )}

                    {/* Live Results */}
                    {!isSearching && debouncedQuery && hasResults && (
                      <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {/* Products Section */}
                        {products.length > 0 && (
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <Package className="h-3.5 w-3.5 mr-1.5" />
                                Products
                              </div>
                              <span className="text-xs text-gray-400">{products.length} found</span>
                            </div>
                            <div className="space-y-2">
                              {products.map((product) => (
                                <button
                                  key={product._id}
                                  onClick={() => handleResultClick('products', product._id)}
                                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left group"
                                >
                                  <img
                                    src={product.images?.[0]?.url || '/placeholder-product.png'}
                                    alt={product.title}
                                    className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-green-600">
                                      {product.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-sm font-bold text-green-600">
                                        {formatPrice(product.price)}
                                      </span>
                                      {product.rating?.average > 0 && (
                                        <div className="flex items-center text-xs text-gray-400">
                                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                                          {product.rating.average}
                                        </div>
                                      )}
                                      <span className="text-xs text-gray-400 capitalize">{product.category}</span>
                                    </div>
                                  </div>
                                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-green-600" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Services Section */}
                        {services.length > 0 && (
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <Server className="h-3.5 w-3.5 mr-1.5" />
                                Services
                              </div>
                              <span className="text-xs text-gray-400">{services.length} found</span>
                            </div>
                            <div className="space-y-2">
                              {services.map((service) => (
                                <button
                                  key={service._id}
                                  onClick={() => handleResultClick('services', service._id)}
                                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left group"
                                >
                                  <img
                                    src={service.images?.[0]?.url || '/placeholder-service.png'}
                                    alt={service.title}
                                    className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-green-600">
                                      {service.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-sm font-bold text-green-600">
                                        From {formatPrice(service.packages?.[0]?.price || 0)}
                                      </span>
                                      {service.rating?.average > 0 && (
                                        <div className="flex items-center text-xs text-gray-400">
                                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                                          {service.rating.average}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-green-600" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* View All Results Button */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                          <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                          >
                            View all results for "{searchQuery}"
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* No Results */}
                    {!isSearching && debouncedQuery && !hasResults && (
                      <div className="text-center py-8 px-4">
                        <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-600 dark:text-gray-400 font-medium">No results for "{debouncedQuery}"</p>
                        <p className="text-sm text-gray-400 mt-1">Try different keywords or browse categories</p>
                      </div>
                    )}

                    {/* Recent Searches & Quick Links (when no query) */}
                    {!debouncedQuery && (
                      <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                Recent Searches
                              </div>
                              <button
                                onClick={clearRecentSearches}
                                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                              >
                                Clear all
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {recentSearches.map((query, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleRecentClick(query)}
                                  className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                  {query}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quick Links */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Quick Links</p>
                          <div className="flex flex-wrap gap-2">
                            <Link
                              to="/marketplace/products"
                              onClick={() => setIsSearchOpen(false)}
                              className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                            >
                              All Products
                            </Link>
                            <Link
                              to="/marketplace/services"
                              onClick={() => setIsSearchOpen(false)}
                              className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                            >
                              All Services
                            </Link>
                            <Link
                              to="/marketplace/custom-solutions"
                              onClick={() => setIsSearchOpen(false)}
                              className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                            >
                              Custom Solutions
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
