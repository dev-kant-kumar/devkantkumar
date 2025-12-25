// Function: Blog
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { sendNewsletterNotificationToDiscord } from "../../common/utils/Discords/sendEmail";
import { portfolioData } from "../../store/data/portfolioData";
import { localPostMetas, localPosts } from "./postsLocal";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const { personalInfo } = portfolioData;

  // Use local posts (no backend)
  const isLoading = false;
  const error = null;
  const blogPosts = localPostMetas;

  // Extract categories from blog posts
  const categories = React.useMemo(() => {
    if (!blogPosts.length) {
      return [{ name: "All", count: 0, value: "all" }];
    }
    const categoryMap = new Map();
    categoryMap.set("all", {
      name: "All",
      count: blogPosts.length,
      value: "all",
    });
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

  const blogResponse = {
    totalPosts: blogPosts.length,
    totalReaders: "10K+",
    totalCategories: categories.length,
  };

  const posts = blogPosts || [];
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const regularPosts = posts.filter(
    (post) => !post.featured || post.id !== featuredPost?.id
  );

  // Helper: resolve post component by slug
  const getPostComponentBySlug = (slug) =>
    localPosts.find((p) => p.meta.slug === slug)?.Component;

  // Prefer JSX image component for featured
  const renderFeaturedImageForMeta = (meta) => {
    const C = getPostComponentBySlug(meta.slug);
    // Use Image (CardImage) instead of FeaturedImage for the card view to avoid huge hero images
    const ImgComp = C?.Image || C?.FeaturedImage;
    if (typeof ImgComp === "function") return <ImgComp className="w-full h-full min-h-[300px] object-cover" />;
    if (React.isValidElement(ImgComp)) return React.cloneElement(ImgComp, { className: "w-full h-full min-h-[300px] object-cover" });
    return (
      <img
        src={meta.image}
        alt={meta.title}
        fetchpriority="high"
        loading="eager"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    );
  };

  // Prefer JSX image component for grid cards
  const renderCardImageForMeta = (meta) => {
    const C = getPostComponentBySlug(meta.slug);
    const ImgComp = C?.Image;
    if (typeof ImgComp === "function") return <ImgComp className="w-full h-full object-cover" />;
    if (React.isValidElement(ImgComp)) return React.cloneElement(ImgComp, { className: "w-full h-full object-cover" });
    return (
      <img
        src={meta.image}
        alt={meta.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    );
  };

  // Filter posts based on search and category
  const isFiltering = searchTerm !== "" || selectedCategory !== "all";
  const filteredPosts = React.useMemo(() => {
    // If filtering, search through ALL posts (including featured)
    // If not filtering, show only regular posts (featured is shown in hero)
    const sourcePosts = isFiltering ? posts : regularPosts;

    return sourcePosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      // Create key safely
      const postCategoryKey = post.category
        ? post.category.toLowerCase().replace(/\s+/g, "").replace(/\./g, "")
        : "";

      const matchesCategory =
        selectedCategory === "all" ||
        postCategoryKey === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, regularPosts, searchTerm, selectedCategory, isFiltering]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmittingNewsletter(true);

    try {
      // Simulate API call - replace with actual newsletter subscription API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Newsletter subscription:", email);

      // Send notification to Discord (non-blocking like on details page)
      sendNewsletterNotificationToDiscord(email).catch((err) =>
        console.error("Discord notification failed:", err)
      );

      setNewsletterSubmitted(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setNewsletterSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Mouse tracking for enhanced interactivity
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Removed backend loading/error gates by keeping isLoading=false and error=null
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Unable to Load Blog Posts
          </h2>
          <p className="text-slate-300 mb-4">
            {error?.message ||
              "Please check if the backend server is running on port 5000"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Blog - Thoughts & Tutorials | Dev Kant Kumar"
        description="Explore insights about web development, career growth, and the latest in tech. Join our community of developers and stay updated with industry trends."
        keywords="blog, web development, tutorials, tech insights, programming, career growth"
        canonicalUrl="/blog"
      />
      {/* Blog listing should use website schema */}
      <StructuredData type="website" />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

            {/* Dynamic Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
              animate={{
                x: mousePosition.x * 0.15 - 50,
                y: mousePosition.y * 0.15 - 50,
                scale: [1, 1.2, 1],
              }}
              transition={{
                x: { type: "spring", stiffness: 50, damping: 30 },
                y: { type: "spring", stiffness: 50, damping: 30 },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"
              animate={{
                x: -mousePosition.x * 0.1 + 50,
                y: -mousePosition.y * 0.1 + 50,
                scale: [1, 1.3, 1],
              }}
              transition={{
                x: { type: "spring", stiffness: 40, damping: 30 },
                y: { type: "spring", stiffness: 40, damping: 30 },
                scale: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl"
              animate={{
                x: mousePosition.x * 0.08,
                y: mousePosition.y * 0.08,
                scale: [1, 1.15, 1],
              }}
              transition={{
                x: { type: "spring", stiffness: 45, damping: 25 },
                y: { type: "spring", stiffness: 45, damping: 25 },
                scale: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
            />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 10,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Main Content */}
            <motion.div variants={itemVariants} className="mb-12">
              <motion.h1
                className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-white pt-50"
                variants={itemVariants}
              >
                Thoughts &{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
                  Tutorials
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Sharing insights about{" "}
                <span className="text-cyan-400 font-semibold">
                  web development
                </span>
                ,{" "}
                <span className="text-blue-400 font-semibold">
                  career growth
                </span>
                , and the{" "}
                <span className="text-purple-400 font-semibold">
                  latest in tech
                </span>
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-8 mb-12"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">
                    {blogResponse?.totalPosts || blogPosts.length}+
                  </div>
                  <div className="text-slate-400">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {blogResponse?.totalReaders || "10K+"}+
                  </div>
                  <div className="text-slate-400">Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {blogResponse?.totalCategories || categories.length}+
                  </div>
                  <div className="text-slate-400">Categories</div>
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div variants={itemVariants} className="max-w-xl mx-auto mt-16">
                <div className="relative p-8 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-white/10 overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5" />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Stay Updated with <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Latest Posts</span>
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Join our community of developers and get the latest tutorials delivered to your inbox.
                    </p>

                    {newsletterSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl p-4"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">
                          Successfully subscribed! Thank you for joining.
                        </span>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={handleNewsletterSubmit}
                        className="flex flex-col sm:flex-row gap-3"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          disabled={isSubmittingNewsletter}
                          className="flex-1 px-5 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          required
                        />
                        <motion.button
                          type="submit"
                          disabled={isSubmittingNewsletter || !email.trim()}
                          whileHover={{ scale: isSubmittingNewsletter ? 1 : 1.02 }}
                          whileTap={{ scale: isSubmittingNewsletter ? 1 : 0.98 }}
                          className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center min-w-[140px]"
                        >
                          {isSubmittingNewsletter ? (
                            <>
                              <svg
                                className="w-4 h-4 animate-spin mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Joining...
                            </>
                          ) : (
                            "Subscribe"
                          )}
                        </motion.button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Post - Only show when not filtering */}
        {featuredPost && !isFiltering && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-16 bg-slate-900/50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Featured Post
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="group block bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="lg:flex">
                    <div className="lg:w-1/2">
                      <div className="relative h-64 lg:h-full overflow-hidden">
                        {renderFeaturedImageForMeta(featuredPost)}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-cyan-500 text-white text-sm font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-slate-700 text-cyan-300 text-sm rounded-full">
                          {featuredPost.category}
                        </span>
                        <span className="text-slate-400 text-sm">
                          {featuredPost.readTime} •{" "}
                          {new Date(
                            featuredPost.publishDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={portfolioData.personalInfo.profileImage}
                            alt={portfolioData.personalInfo.name}
                            className="w-14 h-14 rounded-full object-cover shadow-lg border-2 border-slate-700/50"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-slate-900 rounded-full"></div>
                        </div>
                        <span className="text-slate-300">
                          {featuredPost.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Main Content */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex gap-12">
              {/* Posts Grid */}
              <div className="lg:w-2/3">
                {/* Search Bar */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full px-4 py-3 pl-12 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Posts Grid */}
                <motion.div
                  key={selectedCategory + searchTerm}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {filteredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      variants={itemVariants}
                      className="group relative"
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block h-full bg-slate-800/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <div className="absolute inset-0 bg-slate-900/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                          {renderCardImageForMeta(post)}
                          <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1.5 bg-slate-900/60 backdrop-blur-md border border-white/10 text-cyan-300 text-xs font-semibold rounded-full shadow-lg">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {new Date(post.publishDate).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {post.readTime}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300 line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed text-sm">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center text-cyan-400 font-medium text-sm group/btn">
                            Read Article
                            <svg
                              className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>

                {filteredPosts.length === 0 && (
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center py-12"
                  >
                    <p className="text-slate-400 text-lg">
                      No articles found matching your criteria.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 mt-12 lg:mt-0">
                {/* Categories */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCategory === category.value
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            : "text-slate-300 hover:bg-slate-700/50"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm opacity-70">
                          ({category.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

// End of file — ensure ONLY this export remains at bottom
export default Blog;
