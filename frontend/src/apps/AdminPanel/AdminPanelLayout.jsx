import { Outlet } from "react-router-dom";
import Header from "./common/components/Header";
import Sidebar from "./common/components/Sidebar";
import PerformanceMonitor from "./common/components/ui/PerformanceMonitor";
import "./common/styles/animations.css";

const AdminPanelLayout = () => {
  // Show performance monitor in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-black overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-600 dark:selection:text-blue-400">

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 dark:bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Performance Monitor (Development Only) */}
      {isDevelopment && <PerformanceMonitor showStats={false} />}

      <Header />

      {/* Admin Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="relative z-10 pt-20 p-6 md:ml-[280px] min-h-[calc(100vh-5rem)] transition-all duration-300">
        <div className="max-w-7xl mx-auto">
             <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanelLayout;
