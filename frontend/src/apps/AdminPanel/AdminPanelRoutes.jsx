import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPanelLayout from "./AdminPanelLayout.jsx";

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
const Settings = React.lazy(() => import("./pages/Settings/Settings.jsx"));

const AdminPanelRoutes = () => {
  return (
    <Routes>
      {/* All admin routes wrapped in common layout */}
      <Route path="/" element={<AdminPanelLayout />}>
        {/* Dashboard - Analytics and overview */}
        <Route index element={<Dashboard />} />

        {/* Content Management - General content editing */}
        <Route path="content" element={<ContentManagement />} />

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
  );
};

export default AdminPanelRoutes;
