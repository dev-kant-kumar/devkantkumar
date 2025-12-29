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
const Content = React.lazy(() => import("./pages/Content/Content.jsx"));
const Test = React.lazy(() => import("./pages/Test/Test.jsx"));

// Additional pages
const FAQ = React.lazy(() => import("./pages/FAQ.jsx"));
const Sitemap = React.lazy(() => import("./pages/Sitemap.jsx"));

// Legal pages
const PrivacyPolicy = React.lazy(() =>
  import("./pages/Legal/PrivacyPolicy.jsx")
);
const TermsOfService = React.lazy(() =>
  import("./pages/Legal/TermsOfService.jsx")
);

// Tools pages
const Tools = React.lazy(() => import("./pages/Tools/Tools.jsx"));
const ToolPage = React.lazy(() => import("./pages/Tools/ToolPage.jsx"));

import Loader from "../../shared/components/Loader.jsx";

const PortfolioRoutes = () => {
  return (
    <React.Suspense fallback={<Loader />}>
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

          {/* Content hub page - YouTube + LinkedIn + Blog */}
          <Route path="content" element={<Content />} />

          {/* Blog listing page */}
          <Route path="blog" element={<Blog />} />

          {/* Individual blog post */}
          <Route path="blog/:slug" element={<BlogPost />} />

          {/* Contact page - Form + alternative methods */}
          <Route path="contact" element={<Contact />} />

          {/* FAQ page - Frequently asked questions */}
          <Route path="faq" element={<FAQ />} />

          {/* Sitemap page - Site structure overview */}
          <Route path="sitemap" element={<Sitemap />} />

          {/* Legal pages */}
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />

          {/* Test page */}
          <Route path="test" element={<Test />} />

          {/* Tools pages - Free developer tools */}
          <Route path="tools" element={<Tools />} />
          <Route path="tools/:toolSlug" element={<ToolPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default PortfolioRoutes;
