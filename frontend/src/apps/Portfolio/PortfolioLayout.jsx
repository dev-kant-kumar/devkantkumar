import { Outlet } from "react-router-dom";
import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import MagneticCursor from "./common/components/ui/MagneticCursor";
import PerformanceMonitor from "./common/components/ui/PerformanceMonitor";
import "./common/styles/animations.css";

const PortfolioLayout = () => {
  // Show performance monitor in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="relative">
      {/* Global Magnetic Cursor */}
      <MagneticCursor />

      {/* Performance Monitor (Development Only) */}
      {isDevelopment && <PerformanceMonitor showStats={false} />}

      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioLayout;
