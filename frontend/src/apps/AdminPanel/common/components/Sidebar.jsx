import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Code,
    FileText,
    FolderOpen,
    LayoutDashboard,
    LifeBuoy,
    Mail,
    MailCheck,
    Megaphone,
    MessageSquare,
    Package,
    PenTool,
    PieChart,
    Settings,
    ShoppingBag,
    Users,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetPortfolioStatsQuery } from "../../store/api/adminApiSlice";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isCollapsed, setIsCollapsed }) => {
  const { data: statsData } = useGetPortfolioStatsQuery(undefined, {
    pollingInterval: 30000, // Poll every 30 seconds for new messages
  });

  const unreadCount = statsData?.data?.stats?.messages || 0;

  const [activeMode, setActiveMode] = useState('portfolio');
  const location = useLocation();

  // Auto-switch mode based on path
  useEffect(() => {
    if (location.pathname.includes('/marketplace')) {
      setActiveMode('marketplace');
    } else {
      setActiveMode('portfolio');
    }
  }, [location.pathname]);

  const portfolioItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Analytics", path: "/admin/analytics", icon: PieChart },
    { name: "Messages", path: "/admin/messages", icon: Mail },
    { name: "Projects", path: "/admin/projects", icon: FolderOpen },
    { name: "Skills", path: "/admin/skills", icon: Code },
    { name: "Content", path: "/admin/content", icon: FileText },
    { name: "Blog", path: "/admin/blog", icon: PenTool },
    { name: "Subscribers", path: "/admin/subscribers", icon: Users },
    { name: "Announcements", path: "/admin/announcements", icon: Megaphone },
    { name: "Emails", path: "/admin/emails", icon: MailCheck },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const marketplaceItems = [
    { name: "Overview", path: "/admin/marketplace", icon: PieChart },
    { name: "Products", path: "/admin/marketplace/products", icon: Package },
    { name: "Services", path: "/admin/marketplace/services", icon: Code },
    { name: "Orders", path: "/admin/marketplace/orders", icon: ShoppingBag },
    { name: "Customers", path: "/admin/marketplace/customers", icon: Users },
    { name: "Quotes", path: "/admin/marketplace/quotes", icon: MessageSquare },
    { name: "Support", path: "/admin/support/tickets", icon: LifeBuoy },
    { name: "Settings", path: "/admin/marketplace/settings", icon: Settings },
  ];

  const navigationItems = activeMode === 'portfolio' ? portfolioItems : marketplaceItems;

  const isActive = (path) => {
    // Exact match is always active
    if (location.pathname === path) return true;

    // Index/Dashboard routes should ONLY be active on exact match
    // This prevents "Overview" from being active when visiting "Products"
    if (path === "/admin" || path === "/admin/marketplace") return false;

    // For other routes, allow sub-path matching (e.g. "Products" active for "/products/new")
    if (location.pathname.startsWith(path)) {
        // Ensure we don't partial match (e.g. "/users" shouldn't match "/users-extra")
        const nextChar = location.pathname.charAt(path.length);
        return !nextChar || nextChar === '/';
    }

    return false;
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          x: isSidebarOpen ? 0 : (window.innerWidth < 1024 ? -280 : 0)
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 25 }}
        className={`fixed left-0 top-0 lg:top-16 h-screen lg:h-[calc(100vh-4rem)] z-50 lg:z-40 flex flex-col bg-white/80 dark:bg-black/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 transition-transform lg:transition-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header in Sidebar */}
        <div className="flex lg:hidden items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50">
           <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             Admin Panel
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
             <X size={20} />
           </button>
        </div>

        {/* --- Mode Switcher --- */}
        <div className="p-4 mb-2">
          {!isCollapsed ? (
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl backdrop-blur-md">
              <Link
                to="/admin"
                onClick={() => {
                  setActiveMode('portfolio');
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-300 ${
                  activeMode === 'portfolio'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Portfolio
              </Link>
              <Link
                to="/admin/marketplace"
                onClick={() => {
                  setActiveMode('marketplace');
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-300 ${
                  activeMode === 'marketplace'
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Market
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${activeMode === 'portfolio' ? 'bg-blue-500' : 'bg-gray-300'}`} />
               <div className={`w-2 h-2 rounded-full ${activeMode === 'marketplace' ? 'bg-purple-500' : 'bg-gray-300'}`} />
            </div>
          )}
        </div>

        {/* --- Navigation --- */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-none">
          <AnimatePresence mode="wait">
              <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
              >
               {navigationItems.map((item) => {
                   const active = isActive(item.path);
                   return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block group"
                        onClick={() => {
                          if (window.innerWidth < 1024) setIsSidebarOpen(false);
                        }}
                      >
                          <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-3 rounded-xl transition-all duration-300 group-hover:bg-gray-100/50 dark:group-hover:bg-gray-800/50`}>
                              {/* Active Pill Background */}
                              {active && (
                                  <motion.div
                                      layoutId="activePill"
                                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${activeMode === 'portfolio' ? 'from-blue-600/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-500/10' : 'from-purple-600/10 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-500/10'} border ${activeMode === 'portfolio' ? 'border-blue-200 dark:border-blue-800' : 'border-purple-200 dark:border-purple-800'}`}
                                      initial={false}
                                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                  />
                              )}

                              {/* Active Indicator Line (Left) */}
                              {active && (
                                  <motion.div
                                      layoutId="activeLine"
                                      className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${activeMode === 'portfolio' ? 'bg-blue-600' : 'bg-purple-600'}`}
                                  />
                              )}

                              <item.icon
                                  size={20}
                                  className={`relative z-10 transition-colors duration-300 ${active ? (activeMode === 'portfolio' ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400') : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}
                                  strokeWidth={active ? 2.5 : 2}
                              />

                              {!isCollapsed && (
                                <div className="flex-1 flex items-center justify-between">
                                  <span className={`relative z-10 ml-3 text-sm font-medium transition-colors duration-300 ${active ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                                      {item.name}
                                  </span>

                                  {item.name === "Messages" && unreadCount > 0 && (
                                    <span className="relative z-10 ml-2 px-1.5 py-0.5 min-w-[1.25rem] text-[10px] font-black bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                                      {unreadCount > 99 ? '99+' : unreadCount}
                                    </span>
                                  )}
                                </div>
                              )}

                              {isCollapsed && item.name === "Messages" && unreadCount > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border border-white dark:border-black shadow-sm" />
                              )}
                          </div>
                      </Link>
                   );
               })}
              </motion.div>
          </AnimatePresence>
        </nav>

        {/* --- Footer / User --- */}
        <div className="hidden lg:block p-4 border-t border-gray-200/50 dark:border-gray-800/50">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-full p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isCollapsed ? <ChevronRight size={20} /> : (
              <div className="flex items-center gap-2">
                  <ChevronLeft size={20} />
                  <span className="text-xs font-medium">Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
