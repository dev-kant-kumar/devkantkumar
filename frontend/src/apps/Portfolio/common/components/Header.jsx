/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { 
  ChevronDown, 
  LayoutDashboard, 
  User, 
  Grid3X3, 
  Video, 
  ShoppingBag,
  Sparkles,
  Zap,
  Activity
} from "lucide-react";
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
      const isScrolled = window.scrollY > 15;
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

  const toolsCount = 12; // True actual developer tools count

  // Top level navigation links (excluding dropdown)
  const primaryNavLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Tools", path: "/tools", badge: toolsCount.toString() },
  ];

  // More Dropdown items by section
  const moreAboutItems = [
    { name: "About me", path: "/about", icon: User, description: "My journey & background" },
    { name: "Skills", path: "/skills", icon: Grid3X3, description: "Technical expertise matrix" },
    { name: "Content", path: "/content", icon: Video, description: "Masterclasses & media stream" },
  ];

  const moreServicesItems = [
    { name: "Marketplace", path: "/marketplace", icon: ShoppingBag, description: "SaaS templates & custom solutions" },
    { name: "Admin Panel", path: "/admin", icon: LayoutDashboard, description: "Secure control panel dashboard" },
  ];

  // Helper arrays for route checks
  const allDropdownItems = [...moreAboutItems, ...moreServicesItems];

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
      
      {/* Floating Capsule Header Container */}
      <div className={`w-full transition-all duration-500 ease-in-out ${
        scrolled 
          ? "pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" 
          : "pt-0 px-0 max-w-full"
      }`}>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full transition-all duration-500 relative ${
            scrolled
              ? "bg-slate-950/80 backdrop-blur-2xl border border-slate-900/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] shadow-cyan-950/5"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          {/* Cybernetic Accent Glow Line at top of the capsule when scrolled */}
          {scrolled && (
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-[0.5px]" />
          )}

          <nav className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 relative">
              
              {/* Logo / Brand Cockpit */}
              <Link to="/" className="flex items-center group shrink-0 relative z-10">
                <motion.div
                  className="relative flex flex-col justify-center"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xl font-black tracking-tight leading-none flex items-center">
                    {personalInfo.name.split(" ").map((word, index) => (
                      <span
                        key={index}
                        className={
                          index === 0
                            ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent relative drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                            : "text-white ml-1.5"
                        }
                      >
                        {word}
                      </span>
                    ))}
                    {/* Glowing status pulse dot for online aesthetic */}
                    <span className="relative flex h-2 w-2 ml-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold group-hover:text-cyan-400 transition-colors duration-300 mt-1 flex items-center gap-1.5">
                    <Activity size={8} className="text-cyan-500 animate-pulse" />
                    {personalInfo.title}
                  </div>
                </motion.div>
              </Link>

              {/* Desktop Telemetry Navigation Bar */}
              <div className="hidden lg:flex items-center gap-8 h-full">
                {/* Primary Nav Links with Slide-Over Neon Indicator */}
                <div className="flex items-center gap-6 h-full">
                  {primaryNavLinks.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`relative flex items-center h-16 px-1.5 text-sm font-semibold transition-all duration-300 font-mono tracking-tight group outline-none focus:outline-none focus-visible:outline-none ${
                          active
                            ? "text-cyan-300 font-bold"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="relative z-10 flex items-center">
                          {item.name}
                          {item.badge && (
                            <span className="bg-cyan-950/80 text-cyan-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ml-2 border border-cyan-500/20 shadow-inner group-hover:border-cyan-400/40 transition-colors">
                              {item.badge}
                            </span>
                          )}
                        </span>

                        {/* Interactive sliding border (Framer Motion Magic) */}
                        {active && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_-2px_10px_rgba(34,211,238,0.4)]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* More Dropdown Portal */}
                <div className="relative h-full flex items-center">
                  <button
                    onClick={(e) => handleDropdownToggle("more", e)}
                    className={`flex items-center gap-1.5 h-16 px-1.5 text-sm font-semibold transition-all duration-300 cursor-pointer font-mono tracking-tight border-b-2 outline-none focus:outline-none focus-visible:outline-none ${
                      isDropdownActive(allDropdownItems) || activeDropdown === "more"
                        ? "text-cyan-300 border-cyan-400"
                        : "text-slate-400 border-transparent hover:text-white"
                    }`}
                  >
                    <span>More</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 text-slate-500 ${activeDropdown === "more" ? "rotate-180 text-cyan-400" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === "more" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full right-0 mt-2.5 w-60 bg-slate-950/98 backdrop-blur-3xl border border-slate-900/90 rounded-2xl shadow-3xl overflow-hidden z-[60] p-4 space-y-4 shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
                      >
                        {/* Glowing radial ambient background dot inside dropdown */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                        {/* About Section */}
                        <div className="space-y-2.5 relative z-10">
                          <p className="px-2.5 text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1.5">
                            <Sparkles size={8} className="text-slate-500" />
                            About
                          </p>
                          <div className="space-y-1">
                            {moreAboutItems.map((item) => {
                              const Icon = item.icon;
                              const currentActive = isActive(item.path);
                              return (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-300 group ${
                                    currentActive
                                      ? "bg-cyan-500/10 text-cyan-300"
                                      : "text-slate-300 hover:bg-slate-900/60 hover:text-white"
                                  }`}
                                >
                                  <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border transition-all ${
                                    currentActive 
                                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-md"
                                      : "bg-slate-900 border-slate-850 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20 shadow-inner"
                                  }`}>
                                    <Icon size={14} />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-semibold text-xs text-slate-200 group-hover:text-white transition-colors">{item.name}</div>
                                    <div className="text-[10px] text-slate-500 truncate mt-0.5 font-mono">{item.description}</div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Dropdown Divider */}
                        <div className="border-t border-slate-900" />

                        {/* Services Section */}
                        <div className="space-y-2.5 relative z-10">
                          <p className="px-2.5 text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1.5">
                            <Zap size={8} className="text-slate-500" />
                            Services
                          </p>
                          <div className="space-y-1">
                            {moreServicesItems.map((item) => {
                              const Icon = item.icon;
                              const currentActive = isActive(item.path);
                              const isAdmin = item.path === "/admin";
                              return (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-300 group ${
                                    currentActive
                                      ? isAdmin ? "bg-purple-500/10 text-purple-300" : "bg-cyan-500/10 text-cyan-300"
                                      : "text-slate-300 hover:bg-slate-900/60 hover:text-white"
                                  }`}
                                >
                                  <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border transition-all ${
                                    currentActive 
                                      ? isAdmin
                                        ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                                        : "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                                      : "bg-slate-900 border-slate-850 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20 shadow-inner"
                                  }`}>
                                    <Icon size={14} />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-semibold text-xs text-slate-200 group-hover:text-white transition-colors">{item.name}</div>
                                    <div className="text-[10px] text-slate-500 truncate mt-0.5 font-mono">{item.description}</div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Desktop Actions Cockpit */}
              <div className="hidden lg:flex items-center gap-3.5 shrink-0 relative z-10">
                {/* Install Prompt */}
                <InstallPrompt />

                {/* Icon-Only Marketplace Button (ShoppingBag) with Ambient Glow */}
                <Link
                  to="/marketplace"
                  title="Marketplace"
                  aria-label="Marketplace"
                  className="w-9 h-9 flex items-center justify-center bg-slate-950/60 border border-slate-900 hover:border-cyan-500/40 text-cyan-400 hover:text-cyan-300 rounded-xl transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:scale-105 backdrop-blur-xl shrink-0"
                >
                  <ShoppingBag size={16} />
                </Link>

                {/* Stark Contrast Glowing White CTA Button with Tactile Active State */}
                <Link
                  to="/contact"
                  className="relative group/btn overflow-hidden px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-950 text-xs font-mono font-black tracking-wider uppercase rounded-xl transition-all duration-300 shrink-0 select-none shadow-[0_0_20px_rgba(255,255,255,0.18)] hover:shadow-[0_0_30px_rgba(255,255,255,0.38)] hover:scale-[1.03] active:scale-[0.96] active:bg-slate-200 active:shadow-[0_0_10px_rgba(255,255,255,0.1)] border border-transparent active:border-slate-350"
                >
                  {/* Dynamic Glossy Sheen Sweep on Hover */}
                  <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-slate-950/[0.04] to-transparent -translate-x-full group-hover/btn:animate-[projectMarquee_1.2s_linear_infinite]" />
                  
                  <span className="relative z-10 flex items-center gap-1.5">
                    Hire me
                    <Zap size={11} className="fill-current text-slate-950" />
                  </span>
                </Link>
              </div>

              {/* Mobile Header Actions (Persistent CTA & Drawer Trigger) */}
              <div className="flex lg:hidden items-center gap-2 relative z-10">
                {/* Persistent Stark Contrast White Button with Tactile Active State */}
                <Link
                  to="/contact"
                  className="px-3.5 py-1.5 bg-white text-slate-950 text-xs font-mono font-black uppercase tracking-wide rounded-xl shadow-lg shadow-white/10 transition-all hover:scale-[1.03] active:scale-[0.95] active:bg-slate-200 active:shadow-[0_0_5px_rgba(255,255,255,0.05)] shrink-0"
                >
                  Hire me
                </Link>

                {/* Mobile menu button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 shrink-0"
                >
                  <motion.svg
                    className="h-5 w-5"
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
            </div>

            {/* Mobile Drawer Navigation with Obsidian styling */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:hidden overflow-hidden"
                >
                  <div className="px-2 pt-2 pb-6 space-y-4 bg-slate-950/95 backdrop-blur-xl border-t border-slate-900 rounded-b-2xl mt-2 relative">
                    {/* Background glows inside mobile drawer */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                    {/* Primary Links */}
                    <div className="space-y-1.5 relative z-10">
                      {primaryNavLinks.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`block px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 font-mono ${
                            isActive(item.path)
                              ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/20"
                              : "text-slate-300 hover:text-white hover:bg-slate-900"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            {item.badge && (
                              <span className="bg-cyan-500/10 text-cyan-400 text-xs font-mono px-2 py-0.5 rounded-full border border-cyan-500/20">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Divider + More Pages Label */}
                    <div className="pt-2 border-t border-slate-900 relative z-10">
                      <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5">
                        <Sparkles size={8} />
                        More Pages
                      </p>
                      
                      {/* Secondary Smaller Links with Icons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {moreAboutItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              to={item.path}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                                isActive(item.path)
                                  ? "text-cyan-300 bg-cyan-500/10"
                                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Icon size={14} className="text-slate-500 shrink-0" />
                              <span className="font-mono text-xs">{item.name}</span>
                            </Link>
                          );
                        })}

                        {/* Admin panel listed secondary */}
                        <Link
                          to="/admin"
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                            isActive("/admin")
                              ? "text-purple-300 bg-purple-500/10"
                              : "text-slate-400 hover:text-purple-300 hover:bg-slate-900/60"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <LayoutDashboard size={14} className="text-slate-500 shrink-0" />
                          <span className="font-mono text-xs">Admin Panel</span>
                        </Link>
                      </div>
                    </div>

                    {/* View Marketplace Full-width Teal CTA */}
                    <div className="pt-3 border-t border-slate-900 relative z-10">
                      <Link
                        to="/marketplace"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:text-teal-300 hover:border-teal-500/40 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-teal-500/5 hover:shadow-teal-500/15"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <ShoppingBag size={14} />
                        View Marketplace
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.header>
      </div>
    </div>
  );
};

export default Header;
