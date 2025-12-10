import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../../shared/components/Loader';
import MarketPlaceLayout from './MarketPlaceLayout';

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
const DashboardLayout = React.lazy(() => import('./pages/ClientDashboard/DashboardLayout'));
const DashboardOverview = React.lazy(() => import('./pages/ClientDashboard/pages/DashboardOverview'));
const PurchasedServices = React.lazy(() => import('./pages/ClientDashboard/pages/PurchasedServices'));
const ServiceWorkspace = React.lazy(() => import('./pages/ClientDashboard/pages/ServiceWorkspace'));
const PurchasedProducts = React.lazy(() => import('./pages/ClientDashboard/pages/PurchasedProducts'));
const Settings = React.lazy(() => import('./pages/ClientDashboard/pages/Settings'));
const Orders = React.lazy(() => import('./pages/Orders/Orders'));
const Invoice = React.lazy(() => import('./pages/Invoice/Invoice'));
const Notifications = React.lazy(() => import('./pages/ClientDashboard/pages/Notifications'));
const SupportTickets = React.lazy(() => import('./pages/ClientDashboard/pages/SupportTickets'));
const Billing = React.lazy(() => import('./pages/ClientDashboard/pages/Billing'));
const Terms = React.lazy(() => import('./pages/Terms/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy/Privacy'));
const Refunds = React.lazy(() => import('./pages/Refunds/Refunds'));
const License = React.lazy(() => import('./pages/License/License'));
const Docs = React.lazy(() => import('./pages/Docs/Docs'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const FAQ = React.lazy(() => import('./pages/FAQ/FAQ'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

// User Management
const AuthLayout = React.lazy(() => import('./pages/UserManagement/AuthLayout'));
const SignIn = React.lazy(() => import('./pages/UserManagement/forms/SignIn/SignIn'));
const SignUp = React.lazy(() => import('./pages/UserManagement/forms/SignUp/SignUp'));
const ForgotPassword = React.lazy(() => import('./pages/UserManagement/forms/ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/UserManagement/forms/ResetPassword/ResetPassword'));

import PersistLogin from '../common/components/PersistLogin';

const MarketPlaceRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<MarketPlaceLayout />}>
            <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceId" element={<ServiceDetail />} />
          <Route path="products" element={<DigitalProducts />} />
          <Route path="products/templates" element={<DigitalProducts category="templates" />} />
          <Route path="products/components" element={<DigitalProducts category="components" />} />
          <Route path="products/tools" element={<DigitalProducts category="tools" />} />
          <Route path="products/courses" element={<DigitalProducts category="courses" />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="custom-solutions" element={<CustomSolutions />} />
          <Route path="support" element={<Support />} />
          <Route path="docs" element={<Docs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="refunds" element={<Refunds />} />
          <Route path="license" element={<License />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          {/* Dashboard Routes */}
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="orders" element={<Orders />} />
            <Route path="services" element={<PurchasedServices />} />
            <Route path="services/:serviceId" element={<ServiceWorkspace />} />
            <Route path="products" element={<PurchasedProducts />} />
            <Route path="orders/:orderId/invoice" element={<Invoice />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="support" element={<SupportTickets />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* User Management Routes */}
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MarketPlaceRoutes;
