import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPanelLayout from "./AdminPanelLayout.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

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

// Marketplace Pages
const MarketplaceOverview = React.lazy(() => import("./pages/Marketplace/Overview.jsx"));
const MarketProducts = React.lazy(() => import("./pages/Marketplace/Products.jsx"));
const ProductEditor = React.lazy(() => import("./pages/Marketplace/ProductEditor.jsx"));
const MarketServices = React.lazy(() => import("./pages/Marketplace/Services.jsx"));
const ServiceEditor = React.lazy(() => import("./pages/Marketplace/ServiceEditor.jsx"));
const MarketOrders = React.lazy(() => import("./pages/Marketplace/Orders.jsx"));
const MarketOrderDetail = React.lazy(() => import("./pages/Marketplace/OrderDetail.jsx"));
const MarketCustomers = React.lazy(() => import("./pages/Marketplace/Customers.jsx"));
const MarketCustomerDetail = React.lazy(() => import("./pages/Marketplace/CustomerDetail.jsx"));
const MarketQuoteRequests = React.lazy(() => import("./pages/Marketplace/QuoteRequests.jsx"));
const MarketSettings = React.lazy(() => import("./pages/Marketplace/Settings.jsx"));
const SupportTickets = React.lazy(() => import("./pages/Support/SupportTickets.jsx"));
const AdminNotifications = React.lazy(() => import("./pages/Notifications/AdminNotifications.jsx"));

const AdminPanelRoutes = () => {
  return (
    <ProtectedRoute>
      <Routes>
        {/* All admin routes wrapped in common layout */}
        <Route path="/" element={<AdminPanelLayout />}>
          {/* Dashboard - Analytics and overview */}
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="dashboard" element={<Navigate to="/admin" replace />} />

          {/* Messages Management */}
          <Route path="messages">
            <Route index element={<Messages />} />
            <Route path=":id" element={<Messages />} />
          </Route>

          {/* Marketplace Routes */}
          <Route path="marketplace">
            <Route index element={<MarketplaceOverview />} />
            <Route path="products" element={<MarketProducts />} />
            <Route path="products/new" element={<ProductEditor />} />
            <Route path="products/edit/:id" element={<ProductEditor />} />
            <Route path="services" element={<MarketServices />} />
            <Route path="services/new" element={<ServiceEditor />} />
            <Route path="services/edit/:id" element={<ServiceEditor />} />
            <Route path="orders" element={<MarketOrders />} />
            <Route path="orders/:id" element={<MarketOrderDetail />} />
            <Route path="customers" element={<MarketCustomers />} />
            <Route path="customers/:id" element={<MarketCustomerDetail />} />
            <Route path="quotes" element={<MarketQuoteRequests />} />
            <Route path="settings" element={<MarketSettings />} />
          </Route>

          {/* Support */}
          <Route path="support/tickets" element={<SupportTickets />} />

          {/* Notifications */}
          <Route path="notifications" element={<AdminNotifications />} />

          {/* Content Management - General content editing */}
          <Route path="content" element={<ContentManagement />} />

          {/* Subscribers Management */}
          <Route path="subscribers" element={<Subscribers />} />

          {/* Announcements Management */}
          <Route path="announcements" element={<Announcements />} />

          {/* Projects Management - CRUD operations for projects */}
          <Route path="projects">
            <Route index element={<ProjectsManagement />} />
            <Route path="new" element={<ProjectDetail />} /> {/* Reusing or will rename ProjectDetail */}
            <Route path="edit/:projectId" element={<ProjectDetail />} />
          </Route>

          {/* Skills Management - Technical expertise management */}
          <Route path="skills" element={<SkillsManagement />} />

          {/* Blog Management - Blog posts CRUD */}
          <Route path="blog">
             <Route index element={<BlogManagement />} />
             <Route path="new" element={<BlogPost />} />
             <Route path="edit/:slug" element={<BlogPost />} />
          </Route>

          {/* Email Tracking */}
          <Route path="emails" element={<EmailTracking />} />

          {/* Settings - Admin panel configuration */}
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default AdminPanelRoutes;
