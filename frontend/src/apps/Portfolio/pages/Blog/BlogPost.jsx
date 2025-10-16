import { AnimatePresence, motion } from "framer-motion";
import "highlight.js/styles/github-dark.css";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Analytics from "../../../../components/SEO/Analytics";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { portfolioData } from "../../store/data/portfolioData";
import { localPosts } from "./postsLocal";

const BlogPost = () => {
  const { slug } = useParams();

  // Find local post by slug
  const entry = localPosts.find(p => p.meta.slug === slug);
  const blogPost = entry?.meta;
  const PostComponent = entry?.Component;

  const isLoading = false;
  const error = null;
  const [readingProgress, setReadingProgress] = React.useState(0);

  const [activeHeading, setActiveHeading] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = React.useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = React.useState(false);

  // Feedback system state
  const [feedback, setFeedback] = React.useState(null); // 'like' or 'dislike'
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);
  const [feedbackData, setFeedbackData] = React.useState({
    email: '',
    comment: '',
    type: null
  });
  const [feedbackErrors, setFeedbackErrors] = React.useState({});
  const [isSubmittingFeedback, setIsSubmittingFeedback] = React.useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);

  // Reading progress and active heading tracking
  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));

      // Find active heading
      const headings = document.querySelectorAll(
        "h1[id], h2[id], h3[id], h4[id]"
      );
      let current = "";
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100 && rect.top >= -100) {
          current = heading.id;
        }
      });
      setActiveHeading(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  // Handle feedback button click
  const handleFeedbackClick = (type) => {
    if (feedbackSubmitted) return;

    setFeedback(type);
    setFeedbackData(prev => ({ ...prev, type }));
    setShowFeedbackForm(true);
    setFeedbackErrors({});
  };

  // Validate feedback form
  const validateFeedbackForm = () => {
    const errors = {};

    if (!feedbackData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(feedbackData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!feedbackData.comment.trim()) {
      errors.comment = 'Please provide your feedback';
    } else if (feedbackData.comment.trim().length < 10) {
      errors.comment = 'Feedback must be at least 10 characters long';
    }

    return errors;
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFeedbackForm();
    if (Object.keys(errors).length > 0) {
      setFeedbackErrors(errors);
      return;
    }

    setIsSubmittingFeedback(true);
    setFeedbackErrors({});

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would typically send the feedback to your backend
      console.log('Feedback submitted:', {
        blogSlug: slug,
        type: feedbackData.type,
        email: feedbackData.email,
        comment: feedbackData.comment,
        timestamp: new Date().toISOString()
      });

      setFeedbackSubmitted(true);
      setShowFeedbackForm(false);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFeedbackData({ email: '', comment: '', type: null });
        setFeedback(null);
      }, 3000);

    } catch (error) {
      setFeedbackErrors({ submit: 'Failed to submit feedback. Please try again.' });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFeedbackData(prev => ({ ...prev, [field]: value }));

    // Clear specific field error when user starts typing
    if (feedbackErrors[field]) {
      setFeedbackErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubmittingNewsletter(true);

    try {
      // Simulate API call - replace with actual newsletter subscription API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', newsletterEmail);

      setNewsletterSubmitted(true);
      setNewsletterEmail('');

      // Reset success message after 3 seconds
      setTimeout(() => {
        setNewsletterSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const shareArticle = (platform) => {
    const url = window.location.href;
    const title = blogPost?.title || "";

    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  // Build table of contents from rendered headings (h2–h4)
  const [tableOfContents, setTableOfContents] = React.useState([]);
  React.useEffect(() => {
    const container = document.querySelector(".blog-content");
    if (!container) {
      setTableOfContents([]);
      return;
    }
    const headings = Array.from(container.querySelectorAll("h2, h3, h4")).map((el) => {
      const level = parseInt(el.tagName[1], 10);
      const text = el.textContent.trim();
      let id = el.id;
      if (!id) {
        id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        el.id = id;
        el.classList.add("scroll-mt-24");
      }
      return { level, text, id };
    });
    setTableOfContents(headings);
  }, [slug]);

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

  // Render hero image, preferring JSX component
  const renderHeroImage = () => {
    const ImgComp =
      PostComponent?.FeaturedImage ||
      PostComponent?.Image ||
      blogPost?.FeaturedImage ||
      blogPost?.Image;

    if (typeof ImgComp === 'function') return <ImgComp />;
    if (React.isValidElement(ImgComp)) return ImgComp;
    if (blogPost?.image) {
      return (
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      );
    }
    return null;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-slate-300 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  // Handle error or missing post
  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Article Not Found
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${blogPost.title} | ${portfolioData.personalInfo.name}`}
        description={blogPost.excerpt}
        keywords={blogPost.tags?.join(", ")}
        canonicalUrl={`/blog/${blogPost.slug}`}
        image={blogPost.image}
        type="article"
        publishedTime={blogPost.publishDate}
        modifiedTime={blogPost.modifiedDate || blogPost.publishDate}
        author={portfolioData.personalInfo.name}
      />
      <StructuredData type="blog" pageData={blogPost} />
      <Analytics />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-800/50 z-50 backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            style={{ width: `${readingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative pt-24 pb-8 overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 text-sm font-medium rounded-full border border-cyan-500/20">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                  {blogPost.category}
                </span>
                <span className="text-slate-500 text-sm">•</span>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {blogPost.readTime}
                </div>
                <span className="text-slate-500 text-sm">•</span>
                <time className="text-slate-400 text-sm">
                  {new Date(blogPost.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                {blogPost.title}
              </h1>

              {blogPost.excerpt && (
                <p className="text-xl text-slate-400 leading-relaxed mb-8">
                  {blogPost.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={portfolioData.personalInfo.profileImage}
                      alt={portfolioData.personalInfo.name}
                      className="w-14 h-14 rounded-full object-cover shadow-lg border-2 border-slate-700/50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {portfolioData.personalInfo.name}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {portfolioData.personalInfo.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-sm mr-2">Share:</span>
                  <button
                    onClick={() => shareArticle("twitter")}
                    className="p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-cyan-400 transition-all border border-slate-700/50"
                    title="Share on Twitter"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => shareArticle("linkedin")}
                    className="p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-400 transition-all border border-slate-700/50"
                    title="Share on LinkedIn"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => shareArticle("facebook")}
                    className="p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-500 transition-all border border-slate-700/50"
                    title="Share on Facebook"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Image */}
        {(PostComponent?.FeaturedImage || PostComponent?.Image || blogPost?.image) && (
          <motion.section
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pb-12"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[21/9] bg-slate-800">
                  {renderHeroImage()}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.section>
        )}

        {/* Main Content */}
        <section className="pt-4 pb-8 lg:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
              {/* Sidebar - Left (Desktop) */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-28 space-y-6">
                  {/* Table of Contents */}
                  {tableOfContents.length > 0 && (
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                      <h4 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <svg
                          className="w-4 h-4 text-cyan-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                        On This Page
                      </h4>
                      <nav className="space-y-1">
                        {tableOfContents.map((heading, index) => (
                          <a
                            key={index}
                            href={`#${heading.id}`}
                            className={`block py-2 text-sm transition-all border-l-2 ${
                              activeHeading === heading.id
                                ? "border-cyan-400 text-cyan-400 pl-4 font-medium"
                                : "border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600 pl-4"
                            } ${
                              heading.level === 3
                                ? "pl-6"
                                : heading.level === 4
                                ? "pl-8"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById(
                                heading.id
                              );
                              if (element) {
                                const offset = 100;
                                const elementPosition =
                                  element.getBoundingClientRect().top;
                                const offsetPosition =
                                  elementPosition + window.scrollY - offset;
                                window.scrollTo({
                                  top: offsetPosition,
                                  behavior: "smooth",
                                });
                              }
                            }}
                          >
                            {heading.text}
                          </a>
                        ))}
                      </nav>
                    </div>
                  )}

                  {/* Stay Updated Section */}
                  <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/20">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl mb-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        Stay Updated
                      </h3>
                      <p className="text-slate-300 mb-4 text-sm">
                        Get the latest articles delivered to your inbox.
                      </p>

                      {newsletterSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg p-3"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium text-sm">Successfully subscribed!</span>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                          <input
                            type="email"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={isSubmittingNewsletter}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            required
                          />
                          <button
                            type="submit"
                            disabled={isSubmittingNewsletter || !newsletterEmail.trim()}
                            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-medium shadow-lg shadow-cyan-500/25 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isSubmittingNewsletter ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Subscribing...
                              </>
                            ) : (
                              'Subscribe'
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Article */}
              <article className="lg:col-span-9">
                <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 p-10 sm:p-16 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/10 via-transparent to-cyan-900/5 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div
                      className="prose prose-xl prose-invert max-w-none blog-content text-slate-300 leading-loose text-lg font-light
                  prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
                  prose-h1:text-5xl prose-h1:mt-0 prose-h1:mb-10 prose-h1:leading-tight prose-h1:bg-gradient-to-r prose-h1:from-white prose-h1:to-slate-300 prose-h1:bg-clip-text prose-h1:text-transparent
                  prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-700 prose-h2:text-cyan-300 prose-h2:relative prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:bottom-0 prose-h2:before:w-16 prose-h2:before:h-0.5 prose-h2:before:bg-gradient-to-r prose-h2:before:from-cyan-400 prose-h2:before:to-blue-500
                  prose-h3:text-2xl prose-h3:mt-16 prose-h3:mb-6 prose-h3:text-slate-200 prose-h3:font-semibold
                  prose-h4:text-xl prose-h4:mt-12 prose-h4:mb-4 prose-h4:text-slate-300 prose-h4:font-medium
                  prose-h5:text-lg prose-h5:mt-8 prose-h5:mb-3 prose-h5:text-slate-400 prose-h5:font-medium
                  prose-h6:text-base prose-h6:mt-6 prose-h6:mb-2 prose-h6:text-slate-500 prose-h6:font-medium
                  prose-p:text-slate-300 prose-p:leading-loose prose-p:mb-8 prose-p:text-lg prose-p:font-light
                  prose-a:text-cyan-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-cyan-300 prose-a:underline-offset-4 hover:prose-a:underline prose-a:transition-colors prose-a:duration-200
                  prose-strong:text-white prose-strong:font-semibold prose-strong:bg-gradient-to-r prose-strong:from-cyan-400 prose-strong:to-blue-400 prose-strong:bg-clip-text prose-strong:text-transparent
                  prose-em:text-slate-200 prose-em:italic prose-em:font-medium
                  prose-code:text-cyan-300 prose-code:bg-slate-800/80 prose-code:px-2.5 prose-code:py-1.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-slate-700 prose-code:before:content-[''] prose-code:after:content-['']
                  prose-pre:bg-slate-950/90 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-pre:p-8 prose-pre:overflow-x-auto prose-pre:shadow-2xl prose-pre:my-10 prose-pre:backdrop-blur-sm
                  prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-slate-300 prose-pre:code:border-0
                  prose-ul:text-slate-300 prose-ul:space-y-3 prose-ul:my-8 prose-ul:pl-6
                  prose-ol:text-slate-300 prose-ol:space-y-3 prose-ol:my-8 prose-ol:pl-6
                  prose-li:text-slate-300 prose-li:leading-loose prose-li:my-3 prose-li:text-lg prose-li:font-light
                  prose-li:marker:text-cyan-400
                  prose-blockquote:border-l-4 prose-blockquote:border-cyan-400 prose-blockquote:bg-slate-800/40 prose-blockquote:p-8 prose-blockquote:rounded-r-xl prose-blockquote:my-10 prose-blockquote:not-italic prose-blockquote:backdrop-blur-sm
                  prose-blockquote:text-slate-200 prose-blockquote:text-xl prose-blockquote:leading-relaxed prose-blockquote:font-light prose-blockquote:relative
                  prose-table:border-collapse prose-table:border prose-table:border-slate-700 prose-table:my-10 prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-xl
                  prose-th:border prose-th:border-slate-700 prose-th:bg-slate-800/60 prose-th:p-4 prose-th:text-white prose-th:font-semibold prose-th:text-left prose-th:text-sm prose-th:uppercase prose-th:tracking-wider
                  prose-td:border prose-td:border-slate-700 prose-td:p-4 prose-td:text-slate-300 prose-td:text-base
                  prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-700 prose-img:my-10 prose-img:w-full prose-img:object-cover
                  prose-hr:border-slate-700 prose-hr:my-16 prose-hr:border-t-2
                  [&>h1]:text-5xl [&>h1]:mt-0 [&>h1]:mb-10 [&>h1]:leading-tight [&>h1]:font-bold [&>h1]:bg-gradient-to-r [&>h1]:from-white [&>h1]:to-slate-300 [&>h1]:bg-clip-text [&>h1]:text-transparent [&>h1]:scroll-mt-24
                  [&>h2]:text-3xl [&>h2]:mt-20 [&>h2]:mb-8 [&>h2]:pb-4 [&>h2]:border-b [&>h2]:border-slate-700 [&>h2]:text-cyan-300 [&>h2]:font-bold [&>h2]:scroll-mt-24 [&>h2]:relative [&>h2]:before:absolute [&>h2]:before:left-0 [&>h2]:before:bottom-0 [&>h2]:before:w-16 [&>h2]:before:h-0.5 [&>h2]:before:bg-gradient-to-r [&>h2]:before:from-cyan-400 [&>h2]:before:to-blue-500
                  [&>h3]:text-2xl [&>h3]:mt-16 [&>h3]:mb-6 [&>h3]:text-slate-200 [&>h3]:font-semibold [&>h3]:scroll-mt-24
                  [&>h4]:text-xl [&>h4]:mt-12 [&>h4]:mb-4 [&>h4]:text-slate-300 [&>h4]:font-medium [&>h4]:scroll-mt-24
                  [&>h5]:text-lg [&>h5]:mt-8 [&>h5]:mb-3 [&>h5]:text-slate-400 [&>h5]:font-medium [&>h5]:scroll-mt-24
                  [&>h6]:text-base [&>h6]:mt-6 [&>h6]:mb-2 [&>h6]:text-slate-500 [&>h6]:font-medium [&>h6]:scroll-mt-24
                  [&>p]:mb-8 [&>p]:leading-loose [&>p]:text-lg [&>p]:font-light
                  [&>ul]:my-8 [&>ul]:pl-6 [&>ul]:space-y-3
                  [&>ol]:my-8 [&>ol]:pl-6 [&>ol]:space-y-3
                  [&>li]:my-3 [&>li]:leading-loose [&>li]:text-lg [&>li]:font-light [&>li]:marker:text-cyan-400
                  [&>pre]:bg-slate-950/90 [&>pre]:border [&>pre]:border-slate-800 [&>pre]:rounded-xl [&>pre]:p-8 [&>pre]:overflow-x-auto [&>pre]:shadow-2xl [&>pre]:my-10 [&>pre]:backdrop-blur-sm
                  [&>code]:text-cyan-300 [&>code]:bg-slate-800/80 [&>code]:px-2.5 [&>code]:py-1.5 [&>code]:rounded-md [&>code]:text-sm [&>code]:font-mono [&>code]:border [&>code]:border-slate-700
                  [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-400 [&>blockquote]:bg-slate-800/40 [&>blockquote]:p-8 [&>blockquote]:rounded-r-xl [&>blockquote]:my-10 [&>blockquote]:backdrop-blur-sm [&>blockquote]:text-slate-200 [&>blockquote]:text-xl [&>blockquote]:leading-relaxed [&>blockquote]:font-light [&>blockquote]:relative [&>blockquote]:not-italic
                  [&>table]:border-collapse [&>table]:border [&>table]:border-slate-700 [&>table]:my-10 [&>table]:rounded-lg [&>table]:overflow-hidden [&>table]:shadow-xl [&>table]:w-full
                  [&>thead>tr>th]:border [&>thead>tr>th]:border-slate-700 [&>thead>tr>th]:bg-slate-800/60 [&>thead>tr>th]:p-4 [&>thead>tr>th]:text-white [&>thead>tr>th]:font-semibold [&>thead>tr>th]:text-left [&>thead>tr>th]:text-sm [&>thead>tr>th]:uppercase [&>thead>tr>th]:tracking-wider
                  [&>tbody>tr>td]:border [&>tbody>tr>td]:border-slate-700 [&>tbody>tr>td]:p-4 [&>tbody>tr>td]:text-slate-300 [&>tbody>tr>td]:text-base
                  [&>img]:rounded-xl [&>img]:shadow-2xl [&>img]:border [&>img]:border-slate-700 [&>img]:my-10 [&>img]:w-full [&>img]:object-cover
                  [&>hr]:border-slate-700 [&>hr]:my-16 [&>hr]:border-t-2
                  [&>a]:text-cyan-400 [&>a]:font-medium [&>a]:underline-offset-4 [&>a]:transition-colors [&>a]:duration-200 hover:[&>a]:text-cyan-300 hover:[&>a]:underline
                  [&>strong]:text-white [&>strong]:font-semibold [&>strong]:bg-gradient-to-r [&>strong]:from-cyan-400 [&>strong]:to-blue-400 [&>strong]:bg-clip-text [&>strong]:text-transparent
                  [&>em]:text-slate-200 [&>em]:italic [&>em]:font-medium"
                    >
                      {/* Render the JSX component post content */}
                    {PostComponent && <PostComponent />}
                    </div>

                    {/* Tags Section */}
                    {blogPost.tags && blogPost.tags.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-slate-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {blogPost.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Author CTA */}
                    <div className="mt-12 pt-8 border-t border-slate-700">
                      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600">
                        <div className="flex items-start gap-6">
                          <div className="relative flex-shrink-0">
                            <img
                              src={portfolioData.personalInfo.profileImage}
                              alt={portfolioData.personalInfo.name}
                              className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-slate-600"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-slate-900 rounded-full"></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-2">
                              {portfolioData.personalInfo.name}
                            </h4>
                            <p className="text-slate-300 mb-4 leading-relaxed">
                              {portfolioData.personalInfo.title} passionate about creating innovative web solutions.
                              I share insights on modern development practices, emerging technologies,
                              and practical coding tips.
                            </p>
                            <div className="flex items-center gap-4">
                              <a
                                href={portfolioData.socialLinks.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-cyan-400 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                              </a>
                              <a
                                href={portfolioData.socialLinks.professional.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-blue-400 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </a>
                              <a
                                href={portfolioData.socialLinks.professional.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Share Section */}
                    <div className="mt-8 pt-8 border-t border-slate-700">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-sm">
                            Share this article:
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => shareArticle("twitter")}
                              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-cyan-400 transition-all"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => shareArticle("linkedin")}
                              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-blue-400 transition-all"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                copyToClipboard(window.location.href)
                              }
                              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-all"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {/* Feedback System */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm">Was this helpful?</span>
                            <button
                              onClick={() => handleFeedbackClick('like')}
                              disabled={feedbackSubmitted}
                              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                                feedback === 'like'
                                  ? 'bg-green-600 text-white'
                                  : feedbackSubmitted
                                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-green-400'
                              }`}
                            >
                              👍 Yes
                            </button>
                            <button
                              onClick={() => handleFeedbackClick('dislike')}
                              disabled={feedbackSubmitted}
                              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                                feedback === 'dislike'
                                  ? 'bg-red-600 text-white'
                                  : feedbackSubmitted
                                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400'
                              }`}
                            >
                              👎 No
                            </button>
                          </div>

                          {/* Feedback Success Message */}
                          {feedbackSubmitted && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 text-green-400 text-sm"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Thank you for your feedback!
                            </motion.div>
                          )}

                          {/* Feedback Form */}
                          <AnimatePresence>
                            {showFeedbackForm && !feedbackSubmitted && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                              >
                                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                      Email Address *
                                    </label>
                                    <input
                                      type="email"
                                      value={feedbackData.email}
                                      onChange={(e) => handleInputChange('email', e.target.value)}
                                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                                        feedbackErrors.email
                                          ? 'border-red-500 focus:ring-red-500'
                                          : 'border-slate-600 focus:ring-cyan-500'
                                      }`}
                                      placeholder="your.email@example.com"
                                    />
                                    {feedbackErrors.email && (
                                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {feedbackErrors.email}
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                      Your Feedback *
                                    </label>
                                    <textarea
                                      value={feedbackData.comment}
                                      onChange={(e) => handleInputChange('comment', e.target.value)}
                                      rows={3}
                                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors resize-none ${
                                        feedbackErrors.comment
                                          ? 'border-red-500 focus:ring-red-500'
                                          : 'border-slate-600 focus:ring-cyan-500'
                                      }`}
                                      placeholder={`Please share your ${feedback === 'like' ? 'thoughts on what you found helpful' : 'suggestions for improvement'}...`}
                                    />
                                    {feedbackErrors.comment && (
                                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {feedbackErrors.comment}
                                      </p>
                                    )}
                                  </div>

                                  {feedbackErrors.submit && (
                                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                                      <p className="text-sm text-red-400 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {feedbackErrors.submit}
                                      </p>
                                    </div>
                                  )}

                                  <div className="flex gap-3">
                                    <button
                                      type="submit"
                                      disabled={isSubmittingFeedback}
                                      className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                      {isSubmittingFeedback ? (
                                        <>
                                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                          Submitting...
                                        </>
                                      ) : (
                                        'Submit Feedback'
                                      )}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowFeedbackForm(false);
                                        setFeedback(null);
                                        setFeedbackData({ email: '', comment: '', type: null });
                                        setFeedbackErrors({});
                                      }}
                                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm font-medium transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Continue Reading
              </h2>
              <p className="text-slate-400 text-lg">
                Explore more articles on similar topics
              </p>
            </div>

            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-medium border border-slate-700 group"
              >
                View All Articles
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Copy Success Toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-24 right-8 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg z-50 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BlogPost;
