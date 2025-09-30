import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGetBlogPostsQuery } from '../../store/api/baseApi';
import { portfolioData } from '../../store/data/portfolioData';
import SEOHead from '../../../../components/SEO/SEOHead';
import StructuredData from '../../../../components/SEO/StructuredData';
import Analytics from '../../../../components/SEO/Analytics';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { personalInfo } = portfolioData;

  const { data: blogResponse, isLoading, error } = useGetBlogPostsQuery();
  const blogPosts = blogResponse?.data || [];

  // Mock categories for now
  const categories = [
    { name: 'All', count: 24, value: 'all' },
    { name: 'Development', count: 24, value: 'development' },
    { name: 'React', count: 18, value: 'react' },
    { name: 'Node.js', count: 12, value: 'nodejs' },
    { name: 'Career', count: 8, value: 'career' },
    { name: 'Remote Work', count: 15, value: 'remote' },
  ];

  // Mock blog posts for demonstration
  const mockPosts = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      slug: "getting-started-with-react-hooks",
      excerpt: "Learn how to use React Hooks to manage state and side effects in functional components effectively.",
      category: "React",
      readTime: "5 min read",
      publishedAt: "2024-01-15",
      featured: true,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      author: "Dev Kant Kumar"
    },
    {
      id: 2,
      title: "Building RESTful APIs with Node.js",
      slug: "building-restful-apis-nodejs",
      excerpt: "A comprehensive guide to creating robust and scalable REST APIs using Node.js and Express.",
      category: "Node.js",
      readTime: "8 min read",
      publishedAt: "2024-01-10",
      featured: false,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      author: "Dev Kant Kumar"
    },
    {
      id: 3,
      title: "Remote Work Best Practices",
      slug: "remote-work-best-practices",
      excerpt: "Tips and strategies for staying productive and maintaining work-life balance while working remotely.",
      category: "Remote Work",
      readTime: "6 min read",
      publishedAt: "2024-01-05",
      featured: false,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
      author: "Dev Kant Kumar"
    },
    {
      id: 4,
      title: "MongoDB Performance Optimization",
      slug: "mongodb-performance-optimization",
      excerpt: "Learn advanced techniques to optimize your MongoDB queries and improve database performance.",
      category: "Development",
      readTime: "10 min read",
      publishedAt: "2024-01-01",
      featured: false,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      author: "Dev Kant Kumar"
    },
    {
      id: 5,
      title: "Career Growth for Developers",
      slug: "career-growth-for-developers",
      excerpt: "Strategic advice for advancing your career as a software developer in today's competitive market.",
      category: "Career",
      readTime: "7 min read",
      publishedAt: "2023-12-28",
      featured: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      author: "Dev Kant Kumar"
    },
    {
      id: 6,
      title: "Modern JavaScript ES2024 Features",
      slug: "modern-javascript-es2024-features",
      excerpt: "Explore the latest JavaScript features and how they can improve your development workflow.",
      category: "Development",
      readTime: "9 min read",
      publishedAt: "2023-12-25",
      featured: false,
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
      author: "Dev Kant Kumar"
    }
  ];

  const posts = blogPosts.length > 0 ? blogPosts : mockPosts;
  const featuredPost = posts.find(post => post.featured) || posts[0];
  const regularPosts = posts.filter(post => !post.featured || post.id !== featuredPost.id);

  // Filter posts based on search and category
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
                           post.category.toLowerCase().replace('.', '').replace(' ', '') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
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

  return (
    <>
      <SEOHead
        title="Blog - Thoughts & Tutorials | Dev Kant Kumar"
        description="Explore insights about web development, career growth, and the latest in tech. Join our community of developers and stay updated with industry trends."
        keywords="blog, web development, tutorials, tech insights, programming, career growth"
        canonicalUrl="/blog"
      />
      <StructuredData type="blog" data={blogPosts} />
      <Analytics />

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
                className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-white"
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
                <span className="text-cyan-400 font-semibold">web development</span>,{" "}
                <span className="text-blue-400 font-semibold">career growth</span>, and the{" "}
                <span className="text-purple-400 font-semibold">latest in tech</span>
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-8 mb-12"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{blogPosts.length}+</div>
                  <div className="text-slate-400">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">10K+</div>
                  <div className="text-slate-400">Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">5+</div>
                  <div className="text-slate-400">Categories</div>
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div variants={itemVariants} className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Stay Updated with Latest Posts
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/25"
                  >
                    Subscribe
                  </motion.button>
                </form>
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

        {/* Featured Post */}
        {featuredPost && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-16 bg-slate-900/50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Featured Post</h2>
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
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
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
                        {featuredPost.readTime} • {new Date(featuredPost.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        DK
                      </div>
                      <span className="text-slate-300">{featuredPost.author}</span>
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
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Posts Grid */}
                <motion.div
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
                      className="group"
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 bg-slate-900/80 text-cyan-300 text-xs font-medium rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-300 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>{post.readTime}</span>
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
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
                    <p className="text-slate-400 text-lg">No articles found matching your criteria.</p>
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
                  <h3 className="text-xl font-bold text-white mb-6">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCategory === category.value
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'text-slate-300 hover:bg-slate-700/50'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm opacity-70">({category.count})</span>
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

export default Blog;
