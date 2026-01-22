import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const PortfolioRoutes = React.lazy(() =>
  import("./apps/Portfolio/PortfolioRoutes")
);
const AdminPanelRoutes = React.lazy(() =>
  import("./apps/AdminPanel/AdminPanelRoutes")
);
const MarketPlaceRoutes = React.lazy(() =>
  import("./apps/MarketPlace/MarketPlaceRoutes")
);

const AILabRoutes = React.lazy(() =>
  import("./apps/ai-lab/AILabRoutes")
);

const NotFound = React.lazy(() => import("./Pages/NotFound"));

import Loader from "./shared/components/Loader";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NotificationToast from "./common/components/NotificationToast";
import Analytics from "./components/SEO/Analytics";
import { SocketProvider } from "./context/SocketContext";
import { fetchUserLocation } from "./store/region/regionSlice";

// Add Toaster globally
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserLocation());
  }, [dispatch]);

  return (
    <SocketProvider>
      <div>
        <BrowserRouter>
          <Analytics />
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* routes must be <Route> only */}
              <Route path="/*" element={<PortfolioRoutes />} />
              <Route path="/admin/*" element={<AdminPanelRoutes />} />
              <Route path="/marketplace/*" element={<MarketPlaceRoutes />} />
              <Route path="/ai-lab/*" element={<AILabRoutes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Toaster MUST be outside <Routes> */}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0f172a",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                },
              }}
            />
          </Suspense>
        </BrowserRouter>
        <NotificationToast />
      </div>
    </SocketProvider>
  );
}

export default App;
