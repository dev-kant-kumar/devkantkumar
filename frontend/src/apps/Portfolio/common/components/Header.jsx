import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Grid3X3, LayoutDashboard, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InstallPrompt from "../../../../components/PWA/InstallPrompt";
import { portfolioData } from "../../store/data/portfolioData";
import AnnouncementBanner from "./AnnouncementBanner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const { personalInfo } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Primary navigation items (always visible)
  const primaryNavItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Explore dropdown items
  const exploreItems = [
    { name: "About", path: "/about", icon: User, description: "Learn about me" },
    { name: "Skills", path: "/skills", icon: LayoutDashboard, description: "Technical expertise" },
    { name: "Projects", path: "/projects", icon: Grid3X3, description: "My portfolio work" },
    { name: "Content", path: "/content", icon: LayoutDashboard, description: "Videos & media" },
  ];

  // Tools dropdown items
  const toolsItems = [
    { name: "All Tools", path: "/tools", description: "Developer utilities" },
    { name: "JSON Formatter", path: "/tools/json-formatter", description: "Format & validate JSON" },
    { name: "OG Preview", path: "/tools/og-preview", description: "Social share preview" },
    { name: "QR Generator", path: "/tools/qr-code-generator", description: "Create QR codes" },
  ];

  // Panel switcher (Admin areas)
  const panelItems = [
    { name: "Portfolio", path: "/", current: true },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Admin", path: "/admin" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isDropdownActive = (items) => {
    return items.some(item => isActive(item.path));
  };

  const handleDropdownToggle = (dropdownName, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBanner />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group shrink-0">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xl font-bold">
                  {personalInfo.name.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className={
                        index === 0
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                          : "text-white ml-1.5"
                      }
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider group-hover:text-cyan-300 transition-colors duration-300">
                  {personalInfo.title}
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Primary Nav Items */}
              {primaryNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive(item.path)
                      ? "text-cyan-300 bg-cyan-500/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Explore Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => handleDropdownToggle("explore", e)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isDropdownActive(exploreItems) || activeDropdown === "explore"
                      ? "text-cyan-300 bg-cyan-500/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Explore
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === "explore" ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "explore" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[60]"
                    >
                      <div className="p-2">
                        {exploreItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              to={item.path}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                isActive(item.path)
                                  ? "bg-cyan-500/20 text-cyan-300"
                                  : "text-slate-300 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <Icon size={18} className="shrink-0 text-slate-400" />
                              <div>
                                <div className="font-medium text-sm">{item.name}</div>
                                <div className="text-xs text-slate-500">{item.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => handleDropdownToggle("tools", e)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isDropdownActive(toolsItems) || activeDropdown === "tools"
                      ? "text-cyan-300 bg-cyan-500/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Tools
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === "tools" ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "tools" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[60]"
                    >
                      <div className="p-2">
                        {toolsItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`block px-3 py-2.5 rounded-lg transition-all ${
                              isActive(item.path)
                                ? "bg-cyan-500/20 text-cyan-300"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-slate-500">{item.description}</div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Install Button */}
              <InstallPrompt />

              {/* Panel Switcher (Settings - at the end) */}
              <div className="relative">
                <button
                  onClick={(e) => handleDropdownToggle("panels", e)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    activeDropdown === "panels"
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  title="Switch Panel"
                >
                  <Settings size={18} />
                </button>

                <AnimatePresence>
                  {activeDropdown === "panels" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-44 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[60]"
                    >
                      <div className="p-2 space-y-1">
                        <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Switch Panel
                        </div>
                        {panelItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                              item.current
                                ? "bg-cyan-500/20 text-cyan-300 font-medium"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
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

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <motion.svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="px-2 pt-2 pb-6 space-y-1 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 rounded-b-2xl mt-2">
                  {/* Primary Items */}
                  {primaryNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? "text-cyan-300 bg-cyan-500/20 border border-cyan-500/30"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Explore Section */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Explore
                    </p>
                    {exploreItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? "text-cyan-300 bg-cyan-500/10"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Tools Section */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Tools
                    </p>
                    {toolsItems.slice(0, 3).map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? "text-cyan-300 bg-cyan-500/10"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Panel Switcher */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Switch Panel
                    </p>
                    <div className="flex gap-2 px-4">
                      {panelItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`flex-1 text-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                            item.current
                              ? "bg-cyan-500 text-white"
                              : "bg-slate-800 text-slate-400 hover:text-white"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </div>
  );
};

export default Header;
