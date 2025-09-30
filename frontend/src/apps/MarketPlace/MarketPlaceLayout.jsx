import { Outlet } from "react-router-dom";
import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import CartProvider from "./common/components/CartProvider";
import PerformanceMonitor from "./common/components/ui/PerformanceMonitor";
import "./common/styles/animations.css";

const MarketPlaceLayout = () => {
  // Show performance monitor in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900">
        {/* Performance Monitor (Development Only) */}
        {isDevelopment && <PerformanceMonitor showStats={false} />}

        <Header />

        <main className="relative pt-20">
          <Outlet />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
};

export default MarketPlaceLayout;
