import React from "react";
import { Route, Routes } from "react-router-dom";
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
const Settings = React.lazy(() => import("./pages/Settings/Settings.jsx"));
const Announcements = React.lazy(() => import("./pages/Announcements/Announcements.jsx"));

// Marketplace Pages
const MarketplaceOverview = React.lazy(() => import("./pages/Marketplace/Overview.jsx"));
const MarketProducts = React.lazy(() => import("./pages/Marketplace/Products.jsx"));
const ProductEditor = React.lazy(() => import("./pages/Marketplace/ProductEditor.jsx"));
const MarketServices = React.lazy(() => import("./pages/Marketplace/Services.jsx"));
const ServiceEditor = React.lazy(() => import("./pages/Marketplace/ServiceEditor.jsx"));
const MarketOrders = React.lazy(() => import("./pages/Marketplace/Orders.jsx"));
const MarketCustomers = React.lazy(() => import("./pages/Marketplace/Customers.jsx"));
const MarketCustomerDetail = React.lazy(() => import("./pages/Marketplace/CustomerDetail.jsx"));
const MarketSettings = React.lazy(() => import("./pages/Marketplace/Settings.jsx"));

const AdminPanelRoutes = () => {
  return (
    <ProtectedRoute>
      <Routes>
        {/* All admin routes wrapped in common layout */}
        <Route path="/" element={<AdminPanelLayout />}>
          {/* Dashboard - Analytics and overview */}
          <Route index element={<Dashboard />} />

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
            <Route path="customers" element={<MarketCustomers />} />
            <Route path="customers/:id" element={<MarketCustomerDetail />} />
            <Route path="settings" element={<MarketSettings />} />
          </Route>

          {/* Content Management - General content editing */}
          <Route path="content" element={<ContentManagement />} />

          {/* Blog Management - CRUD operations for blog posts */}
          <Route path="blog" element={<BlogManagement />} />
          <Route path="blog/new" element={<BlogPost />} />
          <Route path="blog/edit/:slug" element={<BlogPost />} />

          {/* Subscribers Management */}
          <Route path="subscribers" element={<Subscribers />} />

          {/* Announcements Management */}
          <Route path="announcements" element={<Announcements />} />

          {/* Projects Management - CRUD operations for projects */}
          <Route path="projects" element={<ProjectsManagement />} />

          {/* Individual project management */}
          <Route path="projects/:projectId" element={<ProjectDetail />} />

          {/* Skills Management - Technical expertise management */}
          <Route path="skills" element={<SkillsManagement />} />

          {/* Blog Management - Blog posts CRUD */}
          <Route path="blog" element={<BlogManagement />} />

          {/* Individual blog post management */}
          <Route path="blog/:slug" element={<BlogPost />} />

          {/* Settings - Admin panel configuration */}
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default AdminPanelRoutes;
