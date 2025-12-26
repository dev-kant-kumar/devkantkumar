// Blog.jsx - Modern Premium Blog Page
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    Filter,
    Flame,
    Rss,
    Search,
    Sparkles,
    TrendingUp,
    X,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { sendNewsletterNotificationToDiscord } from "../../common/utils/Discords/sendEmail";
import { portfolioData } from "../../store/data/portfolioData";
import { localPostMetas, localPosts } from "./postsLocal";

// ============================================
// CATEGORY CONFIG
// ============================================
const categoryIcons = {
  "all": Filter,
  "web development": BookOpen,
  "ai resources": Sparkles,
  "tutorials": BookOpen,
  "career": TrendingUp,
  "tools": Flame,
};

// ============================================
// MAIN COMPONENT
// ============================================
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [email, setEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const featuredRef = useRef(null);

  const { personalInfo } = portfolioData;
  const blogPosts = localPostMetas;

  // Categories
  const categories = useMemo(() => {
    const categoryMap = new Map();
    categoryMap.set("all", { name: "All Posts", count: blogPosts.length, value: "all" });
    blogPosts.forEach((post) => {
      const category = post.category;
      if (category) {
        const key = category.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");
        if (categoryMap.has(key)) {
          categoryMap.get(key).count++;
        } else {
          categoryMap.set(key, { name: category, count: 1, value: key });
        }
      }
    });
    return Array.from(categoryMap.values());
  }, [blogPosts]);

  // Featured posts
  const featuredPosts = useMemo(() =>
    blogPosts.filter((post) => post.featured).slice(0, 5),
    [blogPosts]
  );

  // Regular posts
  const posts = blogPosts || [];
  const regularPosts = posts.filter((p) => !featuredPosts.some((f) => f.id === p.id));

  // Image helpers - 3 sizes: Thumbnail (search), Card, Featured
  const getPostComponentBySlug = (slug) =>
    localPosts.find((p) => p.meta.slug === slug)?.Component;

  // Thumbnail image - for search results (small)
  const renderThumbnail = (meta, className = "") => {
    const C = getPostComponentBySlug(meta.slug);
    const ImgComp = C?.ThumbnailImage || C?.CardImage || C?.Image;
    if (typeof ImgComp === "function") return <ImgComp className={className} size="thumbnail" />;
    if (React.isValidElement(ImgComp)) return React.cloneElement(ImgComp, { className });
    return (
      <img src={meta.image} alt={meta.title} className={className} loading="lazy" />
    );
  };

  // Card image - for blog listing cards (medium)
  const renderCardImage = (meta, className = "") => {
    const C = getPostComponentBySlug(meta.slug);
    const ImgComp = C?.CardImage || C?.Image || C?.FeaturedImage;
    if (typeof ImgComp === "function") return <ImgComp className={className} size="card" />;
    if (React.isValidElement(ImgComp)) return React.cloneElement(ImgComp, { className });
    return (
      <img src={meta.image} alt={meta.title} className={className} loading="lazy" />
    );
  };

  // Featured image - for featured carousel (large)
  const renderFeaturedImage = (meta, className = "") => {
    const C = getPostComponentBySlug(meta.slug);
    const ImgComp = C?.FeaturedImage || C?.CardImage || C?.Image;
    if (typeof ImgComp === "function") return <ImgComp className={className} size="featured" />;
    if (React.isValidElement(ImgComp)) return React.cloneElement(ImgComp, { className });
    return (
      <img src={meta.image} alt={meta.title} className={className} loading="lazy" />
    );
  };

  // Filtering - Always show all posts in grid (featured carousel is separate UI element)
  const isFiltering = searchTerm !== "" || selectedCategory !== "all";
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (!post || !post.title) return false; // Safety check
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        (post.title || "").toLowerCase().includes(searchLower) ||
        (post.excerpt || "").toLowerCase().includes(searchLower) ||
        (post.description || "").toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchLower));
      const postCategoryKey = post.category
        ? post.category.toLowerCase().replace(/\s+/g, "").replace(/\./g, "")
        : "";
      const matchesCategory = selectedCategory === "all" || postCategoryKey === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  // Newsletter
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmittingNewsletter(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      sendNewsletterNotificationToDiscord(email).catch(console.error);
      setNewsletterSubmitted(true);
      setEmail("");
      setTimeout(() => setNewsletterSubmitted(false), 4000);
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  // Featured carousel auto-advance
  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredPosts.length]);

  // Keyboard shortcut for search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextFeatured = () => setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length);
  const prevFeatured = () => setFeaturedIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      <SEOHead
        title="Blog - Thoughts & Tutorials | Dev Kant Kumar"
        description="Explore insights about web development, AI, career growth, and the latest in tech. Join our community of developers."
        keywords="blog, web development, tutorials, tech insights, AI, programming"
        canonicalUrl="/blog"
      />
      <StructuredData type="website" />

      <div className="min-h-screen bg-slate-950">
        {/* ============================================ */}
        {/* CLEAN HERO */}
        {/* ============================================ */}
        <section className="relative overflow-hidden">
          {/* Subtle Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
            {/* Main Row: Title + Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Blog
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  {blogPosts.length} articles on development, AI & tech
                </p>
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white transition-all w-full md:w-auto"
              >
                <Search size={18} />
                <span className="text-sm">Search posts...</span>
                <kbd className="hidden lg:inline-flex items-center ml-auto px-2 py-0.5 text-xs bg-slate-700/50 rounded text-slate-500">⌘K</kbd>
              </button>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SEARCH MODAL */}
        {/* ============================================ */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
              onClick={() => setIsSearchOpen(false)}
            >
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3 p-4 border-b border-slate-800">
                  <Search size={20} className="text-slate-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles, topics, tags..."
                    className="flex-1 bg-transparent text-white text-lg placeholder:text-slate-500 focus:outline-none"
                    autoFocus
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-slate-800 rounded-lg">
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>
                {searchTerm && (
                  <div className="max-h-[400px] overflow-y-auto p-2">
                    {filteredPosts.slice(0, 5).map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                          {renderThumbnail(post, "w-full h-full object-cover")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">{post.title}</h4>
                          <p className="text-slate-500 text-sm truncate">{post.excerpt}</p>
                        </div>
                        <ArrowRight size={16} className="text-slate-600 shrink-0" />
                      </Link>
                    ))}
                    {filteredPosts.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        No articles found for "{searchTerm}"
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================ */}
        {/* CATEGORY BAR - Simplified */}
        {/* ============================================ */}
        <section className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-3 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex items-center gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-cyan-500 text-white"
                          : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-xs ${isActive ? 'text-cyan-200' : 'text-slate-500'}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* FEATURED CAROUSEL */}
        {/* ============================================ */}
        {!isFiltering && featuredPosts.length > 0 && (
          <section className="py-12 bg-gradient-to-b from-slate-900/50 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Flame size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Featured Posts</h2>
                    <p className="text-slate-500 text-sm">Editor's picks for you</p>
                  </div>
                </div>
                {featuredPosts.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevFeatured}
                      className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex gap-1.5">
                      {featuredPosts.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setFeaturedIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === featuredIndex ? "w-6 bg-cyan-400" : "bg-slate-700 hover:bg-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextFeatured}
                      className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Featured Card - Side by Side Layout */}
              <div ref={featuredRef} className="relative">
                <AnimatePresence mode="wait">
                  {featuredPosts[featuredIndex] && (
                    <motion.div
                      key={featuredPosts[featuredIndex].slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={`/blog/${featuredPosts[featuredIndex].slug}`}
                        className="group block bg-slate-900/80 border border-slate-800/50 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                      >
                        <div className="flex flex-col lg:flex-row">
                          {/* Image Side */}
                          <div className="lg:w-1/2 relative h-64 lg:h-[400px] overflow-hidden">
                            {renderFeaturedImage(
                              featuredPosts[featuredIndex],
                              "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/50 hidden lg:block" />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-full shadow-lg">
                                ⭐ Featured
                              </span>
                            </div>
                          </div>

                          {/* Content Side */}
                          <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full">
                                {featuredPosts[featuredIndex].category}
                              </span>
                            </div>

                            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors leading-tight line-clamp-2">
                              {featuredPosts[featuredIndex].title}
                            </h3>

                            <p className="text-slate-400 text-base lg:text-lg mb-6 line-clamp-3 leading-relaxed">
                              {featuredPosts[featuredIndex].excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img
                                  src={personalInfo.profileImage}
                                  alt={personalInfo.name}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30"
                                />
                                <div>
                                  <span className="text-white font-medium block">
                                    {featuredPosts[featuredIndex].author}
                                  </span>
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 text-sm">
                                    <span className="flex items-center gap-1 whitespace-nowrap">
                                      <Calendar size={12} />
                                      {new Date(featuredPosts[featuredIndex].publishDate).toLocaleDateString("en-US", {
                                        month: "short", day: "numeric", year: "numeric"
                                      })}
                                    </span>
                                    <span className="flex items-center gap-1 whitespace-nowrap">
                                      <Clock size={12} />
                                      {featuredPosts[featuredIndex].readTime}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-xl text-cyan-400 font-medium group-hover:bg-cyan-500 group-hover:text-white transition-all">
                                Read Article
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* POSTS GRID */}
        {/* ============================================ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isFiltering ? "Search Results" : "Latest Articles"}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} {isFiltering ? "found" : ""}
                  </p>
                </div>
              </div>
              {isFiltering && (
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all"
                >
                  <X size={16} />
                  Clear filters
                </button>
              )}
            </div>

            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block h-full bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {renderCardImage(
                        post,
                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm text-cyan-300 text-xs font-medium rounded-full border border-slate-700/50">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(post.publishDate).toLocaleDateString("en-US", {
                            month: "short", day: "numeric"
                          })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-slate-500 text-xs">{post.author}</span>
                        </div>
                        <span className="text-cyan-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Read <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                  <Search size={32} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">No articles found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-medium transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* ============================================ */}
        {/* NEWSLETTER CTA */}
        {/* ============================================ */}
        <section className="py-16 border-t border-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 p-8 lg:p-12"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                  <Rss size={16} className="text-cyan-400" />
                  <span className="text-cyan-300 text-sm font-medium">Newsletter</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Stay in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">loop</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                  Get the latest articles, tutorials, and insights delivered straight to your inbox. No spam, unsubscribe anytime.
                </p>

                {newsletterSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">You're subscribed! Check your inbox.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={isSubmittingNewsletter}
                      className="flex-1 px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 disabled:opacity-50"
                      required
                    />
                    <motion.button
                      type="submit"
                      disabled={isSubmittingNewsletter || !email.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmittingNewsletter ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Subscribing...
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
