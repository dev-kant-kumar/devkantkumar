import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Code,
  FolderOpen,
  FileText,
  Mail,
  ShoppingCart,
  Settings,
  ExternalLink,
  Calendar,
  Download,
  HelpCircle
} from "lucide-react";

const Sitemap = () => {
  const siteStructure = {
    portfolio: {
      title: "Portfolio",
      description: "Personal portfolio and professional showcase",
      icon: <User className="w-5 h-5" />,
      pages: [
        { name: "Home", path: "/", icon: <Home className="w-4 h-4" />, description: "Welcome page and overview" },
        { name: "About", path: "/about", icon: <User className="w-4 h-4" />, description: "Personal background and experience" },
        { name: "Skills", path: "/skills", icon: <Code className="w-4 h-4" />, description: "Technical skills and expertise" },
        { name: "Projects", path: "/projects", icon: <FolderOpen className="w-4 h-4" />, description: "Portfolio projects and case studies" },
        { name: "Blog", path: "/blog", icon: <FileText className="w-4 h-4" />, description: "Technical articles and insights" },
        { name: "Contact", path: "/contact", icon: <Mail className="w-4 h-4" />, description: "Get in touch and connect" },
        { name: "FAQ", path: "/faq", icon: <HelpCircle className="w-4 h-4" />, description: "Frequently asked questions" },
      ]
    },
    marketplace: {
      title: "Marketplace",
      description: "Digital services and products platform",
      icon: <ShoppingCart className="w-5 h-5" />,
      pages: [
        { name: "Marketplace Home", path: "/marketplace", icon: <Home className="w-4 h-4" />, description: "Services and products overview" },
        { name: "Services", path: "/marketplace/services", icon: <Code className="w-4 h-4" />, description: "Development services offered" },
        { name: "Products", path: "/marketplace/products", icon: <FolderOpen className="w-4 h-4" />, description: "Digital products and templates" },
        { name: "Custom Solutions", path: "/marketplace/custom-solutions", icon: <Settings className="w-4 h-4" />, description: "Tailored development solutions" },
        { name: "Support", path: "/marketplace/support", icon: <Mail className="w-4 h-4" />, description: "Customer support and help" },
      ]
    },
    admin: {
      title: "Admin Panel",
      description: "Content management system",
      icon: <Settings className="w-5 h-5" />,
      pages: [
        { name: "Dashboard", path: "/admin", icon: <Home className="w-4 h-4" />, description: "Admin overview and analytics" },
        { name: "Content Management", path: "/admin/content", icon: <FileText className="w-4 h-4" />, description: "Manage site content" },
        { name: "Project Management", path: "/admin/projects", icon: <FolderOpen className="w-4 h-4" />, description: "Manage portfolio projects" },
        { name: "Skills Management", path: "/admin/skills", icon: <Code className="w-4 h-4" />, description: "Manage technical skills" },
        { name: "Blog Management", path: "/admin/blog", icon: <FileText className="w-4 h-4" />, description: "Manage blog posts" },
        { name: "Settings", path: "/admin/settings", icon: <Settings className="w-4 h-4" />, description: "System configuration" },
      ]
    },
    resources: {
      title: "Resources & Downloads",
      description: "Important files and external links",
      icon: <Download className="w-5 h-5" />,
      pages: [
        { name: "Resume (PDF)", path: "/resume.pdf", icon: <Download className="w-4 h-4" />, description: "Download professional resume", external: true },
        { name: "Sitemap (XML)", path: "/sitemap.xml", icon: <FileText className="w-4 h-4" />, description: "XML sitemap for search engines", external: true },
        { name: "Robots.txt", path: "/robots.txt", icon: <FileText className="w-4 h-4" />, description: "Search engine crawling instructions", external: true },
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Site Map
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Complete navigation guide to all pages and sections of the website.
            Explore the full structure of my digital presence.
          </p>

          {/* Breadcrumb */}
          <nav className="flex justify-center mt-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-400">/</li>
              <li className="text-slate-300">Sitemap</li>
            </ol>
          </nav>
        </motion.div>

        {/* Site Structure */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:gap-12"
        >
          {Object.entries(siteStructure).map(([key, section]) => (
            <motion.section
              key={key}
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
            >
              {/* Section Header */}
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl mr-4">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {section.title}
                  </h2>
                  <p className="text-slate-400">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Pages Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.pages.map((page, index) => (
                  <motion.div
                    key={page.path}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    {page.external ? (
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-10 h-10 bg-slate-600/50 rounded-lg mr-3 group-hover:bg-cyan-500/20 transition-colors">
                          {page.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3 className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                              {page.name}
                            </h3>
                            <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
                          </div>
                          <p className="text-sm text-slate-400 mt-1">
                            {page.description}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <Link
                        to={page.path}
                        className="flex items-start p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-10 h-10 bg-slate-600/50 rounded-lg mr-3 group-hover:bg-cyan-500/20 transition-colors">
                          {page.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                            {page.name}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1">
                            {page.description}
                          </p>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">
              Need Help Navigating?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              This sitemap provides a complete overview of all available pages and sections.
              Each link will take you directly to the respective page or resource.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Link>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-slate-500 flex items-center justify-center">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Sitemap;
