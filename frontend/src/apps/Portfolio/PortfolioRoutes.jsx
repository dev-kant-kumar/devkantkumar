import React from "react";
import { Route, Routes } from "react-router-dom";
import PortfolioLayout from "./PortfolioLayout.jsx";

// Lazy load all pages for optimal performance and code splitting
const Home = React.lazy(() => import("./pages/Home/Home.jsx"));
const About = React.lazy(() => import("./pages/About/About.jsx"));

const Projects = React.lazy(() => import("./pages/Projects/Projects.jsx"));
const ProjectDetail = React.lazy(() =>
  import("./pages/Projects/ProjectDetail.jsx")
);
const Skills = React.lazy(() => import("./pages/Skills/Skills.jsx"));
const Blog = React.lazy(() => import("./pages/Blog/Blog.jsx"));
const BlogPost = React.lazy(() => import("./pages/Blog/BlogPost.jsx"));
const Contact = React.lazy(() => import("./pages/Contact/Contact.jsx"));

const PortfolioRoutes = () => {
  return (
    <Routes>
      {/* All portfolio routes wrapped in common layout */}
      <Route path="/" element={<PortfolioLayout />}>
        {/* Home page - Hero + Featured work */}
        <Route index element={<Home />} />

        {/* About page - Personal story, values, certifications */}
        <Route path="about" element={<About />} />



        {/* Projects listing page - Grid with filters */}
        <Route path="projects" element={<Projects />} />

        {/* Individual project case study */}
        <Route path="projects/:projectId" element={<ProjectDetail />} />

        {/* Skills page - Technical expertise matrix */}
        <Route path="skills" element={<Skills />} />

        {/* Blog listing page */}
        <Route path="blog" element={<Blog />} />

        {/* Individual blog post */}
        <Route path="blog/:slug" element={<BlogPost />} />

        {/* Contact page - Form + alternative methods */}
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default PortfolioRoutes;
