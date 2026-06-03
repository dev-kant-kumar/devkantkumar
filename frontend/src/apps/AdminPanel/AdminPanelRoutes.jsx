import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPanelLayout from "./AdminPanelLayout.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import ErrorBoundary from "../../common/ErrorBoundary.jsx";

// Lazy load all pages for optimal performance and code splitting
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const ContentManagement = React.lazy(() => import("./pages/ContentManagement/ContentManagement.jsx"));
const ProjectsManagement = React.lazy(() => import("./pages/ProjectsManagement/ProjectsManagement.jsx"));
const ProjectDetail = React.lazy(() =>
  import("./pages/ProjectsManagement/ProjectDetail.jsx")
);
const SkillsManagement = React.lazy(() => import("./pages/SkillsManagement/SkillsManagement.jsx"));
const BlogManagement = React.lazy(() => import("./pages/BlogManagement/BlogManagement.jsx"));
const BlogPost = React.lazy(() => import("./pages/BlogManagement/BlogPost.jsx"));
const Subscribers = React.lazy(() => import("./pages/Subscribers/Subscribers.jsx"));
const Messages = React.lazy(() => import("./pages/Messages/Messages.jsx"));
const Settings = React.lazy(() => import("./pages/Settings/Settings.jsx"));
const Announcements = React.lazy(() => import("./pages/Announcements/Announcements.jsx"));
const AnalyticsPage = React.lazy(() => import("./pages/Analytics/Analytics.jsx"));
const EmailTracking = React.lazy(() => import("./pages/EmailTracking/EmailTracking.jsx"));
const EmailTemplates = React.lazy(() => import("./pages/EmailTemplates/EmailTemplates.jsx"));

// Marketplace Pages
const MarketplaceOverview = React.lazy(() => import("./pages/Marketplace/Overview.jsx"));
const MarketplaceAnalytics = React.lazy(() => import("./pages/Marketplace/MarketplaceAnalytics.jsx"));
const MarketProducts = React.lazy(() => import("./pages/Marketplace/Products.jsx"));
const ProductEditor = React.lazy(() => import("./pages/Marketplace/ProductEditor.jsx"));
const ProductAnalytics = React.lazy(() => import("./pages/Marketplace/ProductAnalytics.jsx"));
const MarketServices = React.lazy(() => import("./pages/Marketplace/Services.jsx"));
const ServiceEditor = React.lazy(() => import("./pages/Marketplace/ServiceEditor.jsx"));
const ServiceAnalytics = React.lazy(() => import("./pages/Marketplace/ServiceAnalytics.jsx"));
const MarketOrders = React.lazy(() => import("./pages/Marketplace/Orders.jsx"));
const MarketOrderDetail = React.lazy(() => import("./pages/Marketplace/OrderDetail.jsx"));
const MarketCustomers = React.lazy(() => import("./pages/Marketplace/Customers.jsx"));
const MarketCustomerDetail = React.lazy(() => import("./pages/Marketplace/CustomerDetail.jsx"));
const MarketQuoteRequests = React.lazy(() => import("./pages/Marketplace/QuoteRequests.jsx"));
const MarketSettings = React.lazy(() => import("./pages/Marketplace/Settings.jsx"));
const CouponManagement = React.lazy(() => import("./pages/Coupons/CouponManagement.jsx"));
const AdminReferrals = React.lazy(() => import("./pages/Referrals/AdminReferrals.jsx"));
const AdminProjects = React.lazy(() => import("./pages/Marketplace/Projects/AdminProjects.jsx"));
const AdminProjectWorkspace = React.lazy(() => import("./pages/Marketplace/Projects/AdminProjectWorkspace.jsx"));
const SupportTickets = React.lazy(() => import("./pages/Support/SupportTickets.jsx"));
const TicketDetail = React.lazy(() => import("./pages/Support/TicketDetail.jsx"));
const AdminNotifications = React.lazy(() => import("./pages/Notifications/AdminNotifications.jsx"));
const NotFound = React.lazy(() => import("./pages/NotFound.jsx"));

const AdminPanelRoutes = () => {
  return (
    <ProtectedRoute>
      <ErrorBoundary>
        <Routes>
          {/* All admin routes wrapped in common layout */}
          <Route path="/" element={<AdminPanelLayout />}>
            {/* Dashboard - Analytics and overview */}
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="dashboard" element={<Navigate to="/__dx9k_ctrl" replace />} />

            {/* Messages Management */}
            <Route path="messages">
              <Route index element={<Messages />} />
              <Route path=":id" element={<Messages />} />
            </Route>

            {/* Marketplace Routes */}
            <Route path="marketplace">
              <Route index element={<MarketplaceOverview />} />
              <Route path="analytics" element={<MarketplaceAnalytics />} />
              <Route path="products" element={<MarketProducts />} />
              <Route path="products/new" element={<ProductEditor />} />
              <Route path="products/edit/:id" element={<ProductEditor />} />
              <Route path="products/:id/analytics" element={<ProductAnalytics />} />
              <Route path="services" element={<MarketServices />} />
              <Route path="services/new" element={<ServiceEditor />} />
              <Route path="services/edit/:id" element={<ServiceEditor />} />
              <Route path="services/:id/analytics" element={<ServiceAnalytics />} />
              <Route path="orders" element={<MarketOrders />} />
              <Route path="orders/:id" element={<MarketOrderDetail />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/:id" element={<AdminProjectWorkspace />} />
              <Route path="customers" element={<MarketCustomers />} />
              <Route path="customers/:id" element={<MarketCustomerDetail />} />
              <Route path="quotes" element={<MarketQuoteRequests />} />
              <Route path="settings" element={<MarketSettings />} />
              <Route path="coupons" element={<CouponManagement />} />
              <Route path="referrals" element={<AdminReferrals />} />
            </Route>

            {/* Support */}
            <Route path="support/tickets">
              <Route index element={<SupportTickets />} />
              <Route path=":id" element={<TicketDetail />} />
            </Route>

            {/* Notifications */}
            <Route path="notifications" element={<AdminNotifications />} />

            {/* Content Management - General content editing */}
            <Route path="content" element={<ContentManagement />} />

            {/* Subscribers Management */}
            <Route path="subscribers" element={<Subscribers />} />

            {/* User and skills management */}
            <Route path="skills" element={<SkillsManagement />} />

            {/* Settings and configuration */}
            <Route path="settings" element={<Settings />} />

            {/* Blog management */}
            <Route path="blog">
              <Route index element={<BlogManagement />} />
              <Route path="new" element={<BlogPost />} />
              <Route path="edit/:id" element={<BlogPost />} />
            </Route>

            {/* Announcements */}
            <Route path="announcements" element={<Announcements />} />

            {/* Email Marketing */}
            <Route path="emails">
              <Route path="tracking" element={<EmailTracking />} />
              <Route path="templates" element={<EmailTemplates />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </ProtectedRoute>
  );
};

export default AdminPanelRoutes;
