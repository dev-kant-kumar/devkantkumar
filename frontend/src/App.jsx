import React, { Suspense } from "react";
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

const NotFound = React.lazy(() => import("./Pages/NotFound"));

const Test = React.lazy(() => import("./Pages/Test"));

import Loader from "./shared/components/Loader";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/*" element={<PortfolioRoutes />} />
            <Route path="/admin/*" element={<AdminPanelRoutes />} />
            <Route path="/marketplace/*" element={<MarketPlaceRoutes />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
