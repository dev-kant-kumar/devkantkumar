import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Map, 
  BookOpen, 
  Wrench, 
  ShoppingBag, 
  Compass, 
  FileText, 
  ArrowRight,
  Search
} from "lucide-react";
import SEOHead from "../../../components/SEO/SEOHead";
import { blogData } from "./Blog/data/blogData.js";

export default function Sitemap() {
  const [searchQuery, setSearchQuery] = useState("");

  const sections = [
    {
      title: "Navigation & Portfolio",
      icon: Compass,
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
      links: [
        { name: "Home Profile", path: "/" },
        { name: "About Story & Credentials", path: "/about" },
        { name: "Projects Portfolio", path: "/projects" },
        { name: "Technical Skills Matrix", path: "/skills" },
        { name: "Content Hub (YT / Articles)", path: "/content" },
        { name: "Frequently Asked Questions", path: "/faq" },
        { name: "Get in Touch / Contact", path: "/contact" },
      ]
    },
    {
      title: "Developer Tools",
      icon: Wrench,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      links: [
        { name: "All Tools Dashboard", path: "/tools" },
        { name: "JSON Formatter & Validator", path: "/tools/json-formatter" },
        { name: "Base64 Encoder & Decoder", path: "/tools/base64-encoder-decoder" },
        { name: "Secure Password Generator", path: "/tools/password-generator" },
        { name: "Lorem Ipsum Text Generator", path: "/tools/lorem-ipsum-generator" },
        { name: "Color Palette Creator", path: "/tools/color-palette-generator" },
        { name: "Dynamic QR Code Generator", path: "/tools/qr-code-generator" },
        { name: "Cryptographic UUID Generator", path: "/tools/uuid-generator" },
        { name: "CSS Gradient Maker", path: "/tools/css-gradient-generator" },
        { name: "SEO Meta Tag Generator", path: "/tools/meta-tag-generator" },
        { name: "Markdown Live Previewer", path: "/tools/markdown-previewer" },
        { name: "OG Open Graph Previewer", path: "/tools/og-preview" },
      ]
    },
    {
      title: "Marketplace Hub",
      icon: ShoppingBag,
      color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      links: [
        { name: "Marketplace Homepage", path: "/marketplace" },
        { name: "Professional Services", path: "/marketplace/services" },
        { name: "Digital Products & Templates", path: "/marketplace/products" },
        { name: "Custom Project Solutions", path: "/marketplace/custom-solutions" },
        { name: "Customer Support Portal", path: "/marketplace/support" },
        { name: "Marketplace Help & FAQ", path: "/marketplace/faq" },
        { name: "Terms of Service", path: "/marketplace/terms" },
        { name: "Privacy Policy", path: "/marketplace/privacy" },
        { name: "Refund & Return Policy", path: "/marketplace/refunds" },
        { name: "Software License Agreement", path: "/marketplace/license" },
        { name: "Marketplace Contact Desk", path: "/marketplace/contact" },
      ]
    },
    {
      title: "Legal & Documentation",
      icon: FileText,
      color: "text-slate-400 border-slate-500/20 bg-slate-500/5",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ]
    }
  ];

  // Dynamic Blog Post Links
  const blogSection = {
    title: "Blog Articles & Guides",
    icon: BookOpen,
    color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    links: blogData.map(post => ({
      name: post.title,
      path: `/blog/${post.slug}`
    }))
  };

  const allSections = [...sections, blogSection];

  // Search filter
  const filteredSections = allSections.map(sec => {
    const matchingLinks = sec.links.filter(link => 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.path.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...sec, links: matchingLinks };
  }).filter(sec => sec.links.length > 0);

  return (
    <>
      <SEOHead
        title="Site Map | Dev Kant Kumar"
        description="Navigate all resources, articles, online developer tools, and marketplace offerings of Dev Kant Kumar's digital workspace."
        canonicalUrl="/sitemap"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans py-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-slate-800 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                  <Map className="text-indigo-400" size={22} />
                </div>
                <span className="text-xs font-black tracking-widest text-indigo-400 uppercase">Index Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Complete Site Map
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Quickly locate articles, core portfolio pages, utility developer tools, and marketplace templates.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search pages and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 transition-colors shadow-inner"
              />
            </div>
          </div>

          {/* Grid Layout */}
          {filteredSections.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredSections.map((sec, idx) => {
                const Icon = sec.icon;
                return (
                  <motion.div
                    key={sec.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 hover:border-slate-800/80 transition-all duration-300 shadow-md flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800/60">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${sec.color}`}>
                        <Icon size={16} />
                      </div>
                      <h2 className="text-lg font-bold text-white tracking-wide">{sec.title}</h2>
                    </div>

                    <ul className="space-y-3 flex-1">
                      {sec.links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className="group flex items-center justify-between text-sm text-slate-400 hover:text-indigo-400 transition-colors py-1 cursor-pointer"
                          >
                            <span className="truncate pr-4 leading-relaxed group-hover:translate-x-0.5 transition-transform duration-300">
                              {link.name}
                            </span>
                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-indigo-400 shrink-0 font-medium">
                              <span className="font-mono text-[10px] text-slate-500 hidden sm:inline">{link.path}</span>
                              <ArrowRight size={12} />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/20 border border-slate-800/80 rounded-2xl">
              <p className="text-slate-500 text-sm">No pages found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
