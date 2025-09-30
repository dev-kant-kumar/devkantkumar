import { Outlet } from "react-router-dom";
import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import Sidebar from "./common/components/Sidebar";
import PerformanceMonitor from "./common/components/ui/PerformanceMonitor";
import "./common/styles/animations.css";

const AdminPanelLayout = () => {
  // Show performance monitor in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Performance Monitor (Development Only) */}
      {isDevelopment && <PerformanceMonitor showStats={false} />}

      <Header />

      {/* Admin Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="pt-20 p-6 md:ml-[280px] min-h-[calc(100vh-5rem)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AdminPanelLayout;
