import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MarketPlaceLayout from './MarketPlaceLayout';
import Loader from '../../shared/components/Loader';

// Lazy load marketplace pages
const Home = React.lazy(() => import('./pages/Home/Home'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail/ServiceDetail'));
const DigitalProducts = React.lazy(() => import('./pages/DigitalProducts/DigitalProducts'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail/ProductDetail'));
const CustomSolutions = React.lazy(() => import('./pages/CustomSolutions/CustomSolutions'));
const Support = React.lazy(() => import('./pages/Support/Support'));
const Cart = React.lazy(() => import('./pages/Cart/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout/Checkout'));
const ClientDashboard = React.lazy(() => import('./pages/ClientDashboard/ClientDashboard'));

const MarketPlaceRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MarketPlaceLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
          <Route path="products" element={<DigitalProducts />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="custom-solutions" element={<CustomSolutions />} />
          <Route path="support" element={<Support />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<ClientDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MarketPlaceRoutes;
