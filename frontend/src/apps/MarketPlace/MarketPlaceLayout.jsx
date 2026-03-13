import { Outlet } from "react-router-dom";
import { OrganizationSchema } from "../../components/SEO/SchemaMarkup";
import usePageTracking from "../Portfolio/hooks/usePageTracking";
import CartProvider from "./common/components/CartProvider";
import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import PerformanceMonitor from "./common/components/ui/PerformanceMonitor";
import "./common/styles/animations.css";
import MarketPlaceSEOManager from "./components/SEO/MarketPlaceSEOManager";

const MarketPlaceLayout = () => {
  // Track marketplace page visits in custom analytics (same as portfolio)
  usePageTracking();

  // Show performance monitor in development mode
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <CartProvider>
      <MarketPlaceSEOManager />
      {/* SEO: Organization Schema for Google rich results */}
      <OrganizationSchema />
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
