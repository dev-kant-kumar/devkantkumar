import { motion } from "framer-motion";
import "highlight.js/styles/github-dark.css";
import React from "react";
import { Link, useParams } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { sendNewsletterNotificationToDiscord } from "../../common/utils/Discords/sendEmail";
import { portfolioData } from "../../store/data/portfolioData";
import AdPlaceholder from "./components/AdPlaceholder";
import GiscusComments from "./components/GiscusComments";
import ReadingToolbar from "./components/ReadingToolbar";
import { localPosts } from "./postsLocal";

const BlogPost = () => {
  const { slug } = useParams();

  // Find local post by slug
  const entry = localPosts.find((p) => p.meta.slug === slug);
  const blogPost = entry?.meta;
  const PostComponent = entry?.Component;

  // Scroll to top when slug changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const isLoading = false;
  const error = null;
  const [readingProgress, setReadingProgress] = React.useState(0);

  // Reading Experience State
  const [fontSize, setFontSize] = React.useState(18);
  const [isReadingMode, setIsReadingMode] = React.useState(false);

  const [activeHeading, setActiveHeading] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = React.useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] =
    React.useState(false);




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


  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubmittingNewsletter(true);

    try {
      // Simulate API call - replace with actual newsletter subscription API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Send notification to Discord (non-blocking)
      // We use .catch() so it doesn't affect user experience if Discord fails
      sendNewsletterNotificationToDiscord(newsletterEmail).catch((err) =>
        console.error("Discord notification failed:", err)
      );

      setNewsletterSubmitted(true);
      setNewsletterEmail("");

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
    const headings = Array.from(container.querySelectorAll("h2, h3, h4")).map(
      (el) => {
        const level = parseInt(el.tagName[1], 10);
        const text = el.textContent.trim();
        let id = el.id;
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          el.id = id;
          el.classList.add("scroll-mt-24");
        }
        return { level, text, id };
      }
    );
    setTableOfContents(headings);
  }, [blogPost, slug, isReadingMode]); // Re-run when post changes or content re-renders

  // Nest headings (H2 -> H3/H4)
  const nestedTableOfContents = React.useMemo(() => {
    const nested = [];
    let currentH2 = null;

    tableOfContents.forEach((heading) => {
      if (heading.level === 2) {
        currentH2 = { ...heading, children: [] };
        nested.push(currentH2);
      } else if (currentH2 && heading.level > 2) {
        currentH2.children.push(heading);
      } else {
        // Fallback for top-level non-H2 or H3 without H2 parent
        nested.push({ ...heading, children: [] });
      }
    });
    return nested;
  }, [tableOfContents]);

  // Expandable sections state
  const [expandedSections, setExpandedSections] = React.useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Auto-expand parent of active heading
  React.useEffect(() => {
    if (activeHeading) {
      nestedTableOfContents.forEach((h2) => {
        if (h2.children.some((child) => child.id === activeHeading)) {
          setExpandedSections((prev) => ({ ...prev, [h2.id]: true }));
        }
      });
    }
  }, [activeHeading, nestedTableOfContents]);

  // Search State
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const searchInputRef = React.useRef(null);
  const navigate = React.useNavigate ? React.useNavigate() : (to) => window.location.href = to; // Fallback or use Hook if available (React Router v6)

  // Filter headings based on search query
  const filteredHeadings = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return tableOfContents.filter((heading) =>
      heading.text.toLowerCase().includes(query)
    );
  }, [searchQuery, tableOfContents]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        searchInputRef.current?.blur();
        setIsSearchFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Bookmark Feature State
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  // Check initial bookmark state
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(localStorage.getItem("blog_bookmarks") || "[]");
      setIsBookmarked(bookmarks.includes(slug));
    }
  }, [slug]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("blog_bookmarks") || "[]");
    let newBookmarks;

    if (bookmarks.includes(slug)) {
      newBookmarks = bookmarks.filter((s) => s !== slug);
      setIsBookmarked(false);
    } else {
      newBookmarks = [...bookmarks, slug];
      setIsBookmarked(true);
    }

    localStorage.setItem("blog_bookmarks", JSON.stringify(newBookmarks));
  };

  // Text-to-Speech State
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const speechRef = React.useRef(null);

  // Stop speech on unmount
  React.useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      const content = document.querySelector(".blog-content");
      if (!content) {
        alert("Sorry, I couldn't find the content to read.");
        return;
      }

      // Clean text for better speech
      // Exclude pre/code blocks if desired, or just read text.
      // For now, let's read everything but perhaps try to skip huge code blocks if easy,
      // but simple innerText is usually fine for a v1.
      const textToRead = content.innerText;

      if (!textToRead || !textToRead.trim()) {
        alert("The article content appears to be empty.");
        return;
      }

      if ('speechSynthesis' in window) {
        // Cancel any previous speech first
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToRead);

        // Robust voice loading function
        const setVoice = () => {
          const voices = window.speechSynthesis.getVoices();
          // Fallback logic: prefer Google US English, then any English, then default
          const voice = voices.find(v => v.name.includes("Google US English")) ||
                        voices.find(v => v.lang.startsWith("en-") && v.name.includes("Google")) ||
                        voices.find(v => v.lang.startsWith("en-")) ||
                        voices[0];

          if (voice) {
            utterance.voice = voice;
            console.log("Selected voice:", voice.name);
          }
        };

        // Try to set voice immediately, or wait for voices to load
        setVoice();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = setVoice;
        }

        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onend = () => {
          setIsSpeaking(false);
          setIsPaused(false);
        };

        utterance.onerror = (e) => {
          console.error("Speech error:", e);
          if (e.error !== 'interrupted' && e.error !== 'canceled') {
             alert("Speech error: " + e.error);
          }
          setIsSpeaking(false);
          setIsPaused(false);
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        setIsPaused(false);
      } else {
        alert("Text-to-Speech is not supported in this browser.");
      }
    }
  };

  const stopSpeak = () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
  };

  // Get related posts
  const relatedPosts = React.useMemo(() => {
    if (!blogPost) return [];
    const currentTags = blogPost.tags || [];
    const currentCategory = blogPost.category;

    return localPosts
      .filter((p) => p.meta.slug !== slug) // Exclude current post
      .map((p) => {
        let score = 0;
        if (p.meta.category === currentCategory) score += 3;
        const sharedTags = (p.meta.tags || []).filter((tag) =>
          currentTags.includes(tag)
        );
        score += sharedTags.length;
        return { ...p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((p) => ({ ...p.meta, Component: p.Component }));
  }, [blogPost, slug]);

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
        <div className="text-center max-w-md px-0">
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
      {blogPost.faqs && blogPost.faqs.length > 0 && (
        <StructuredData type="faq" pageData={blogPost} />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Reading Progress Bar */}
        {/* Reading Progress Bar - Premium Glass Effect */}
        <div className="fixed top-0 left-0 w-full h-1.5 z-50">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-xl border-b border-white/5"></div>
           <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            style={{ width: `${readingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>







        {/* Featured Image */}


        {/* Main Content */}
        <section className="relative pt-32 pb-16 lg:pb-24">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 pt-12">
            <div className={`lg:grid ${isReadingMode ? "lg:grid-cols-1" : "lg:grid-cols-12"} lg:gap-8 xl:gap-12 transition-all duration-300`}>



              {/* LEFT SIDEBAR - Table of Contents */}
              <aside className={`hidden ${isReadingMode ? "" : "lg:block"} lg:col-span-3 xl:col-span-3 transition-opacity duration-300`}>
                <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar pr-4 space-y-8">
                  {/* Table of Contents */}
                  {tableOfContents.length > 0 && (
                    <div className="space-y-6">
                      {/* Search Bar (Functional) */}
                      <div className="relative group z-50">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <svg className={`h-4 w-4 transition-colors ${isSearchFocused ? "text-cyan-400" : "text-slate-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                           </svg>
                         </div>
                         <input
                           ref={searchInputRef}
                           type="text"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           onFocus={() => setIsSearchFocused(true)}
                           onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} // Delay to allow click
                           placeholder="Search..."
                           className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-800/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 sm:text-sm transition-all shadow-inner"
                         />
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                           <span className="text-slate-600 text-xs border border-slate-700/50 rounded px-1.5 py-0.5">Ctrl K</span>
                         </div>

                         {/* Search Results Dropdown - Glassmorphism */}
                         {isSearchFocused && searchQuery && (
                           <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50 ring-1 ring-white/10">
                             {filteredHeadings.length > 0 ? (
                               <div className="py-2">
                                 <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                   On this page
                                 </div>
                                 {filteredHeadings.map((heading, idx) => (
                                   <button
                                     key={idx}
                                     className="w-full text-left block px-4 py-2.5 hover:bg-slate-800 transition-colors group"
                                     onClick={() => {
                                        const element = document.getElementById(heading.id);
                                        if (element) {
                                          const offset = 100;
                                          window.scrollTo({
                                            top: element.getBoundingClientRect().top + window.scrollY - offset,
                                            behavior: "smooth",
                                          });
                                        }
                                       setSearchQuery("");
                                       setIsSearchFocused(false);
                                     }}
                                   >
                                     <div className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 line-clamp-1">
                                       {heading.text}
                                     </div>
                                     <div className="text-xs text-slate-500 mt-0.5 capitalize">
                                        {heading.level === 2 ? "Section" : "Subsection"}
                                     </div>
                                   </button>
                                 ))}
                               </div>
                             ) : (
                               <div className="px-4 py-6 text-center text-slate-500 text-sm">
                                 No headings found for "{searchQuery}"
                               </div>
                             )}
                           </div>
                         )}
                      </div>

                      {/* Navigation Icons Row */}
                      <div className="flex items-center gap-1 border-b border-slate-800 pb-4">
                        <a href="/" className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors" title="Home">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </a>
                        <Link to="/blog" className="p-2 rounded-lg text-cyan-400 bg-cyan-500/10 transition-colors" title="Blog">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </Link>
                        <div className="w-px h-6 bg-slate-800 mx-1" />
                        <button
                          onClick={() => toggleBookmark()}
                          className={`p-2 rounded-lg transition-colors relative group ${
                            isBookmarked
                              ? "text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                          title={isBookmarked ? "Remove Bookmark" : "Bookmark this post"}
                        >
                           <svg
                             className={`w-5 h-5 transition-all duration-300 ${isBookmarked ? "fill-current scale-110" : "fill-none scale-100"}`}
                             viewBox="0 0 24 24"
                             stroke="currentColor"
                           >
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                           </svg>
                           {/* Tooltip feedback */}
                           <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                             {isBookmarked ? "Bookmarked" : "Bookmark"}
                           </span>
                        </button>
                        <div className="w-px h-6 bg-slate-800 mx-1" />
                        <button
                          onClick={() => setIsReadingMode(true)}
                          className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                          title="Focus Mode (Hide Sidebar)"
                        >
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                           </svg>
                        </button>

                        <div className="w-px h-6 bg-slate-800 mx-1" />

                        {/* TTS Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={handleSpeak}
                            className={`p-2 rounded-lg transition-colors ${isSpeaking && !isPaused ? "text-cyan-400 bg-cyan-400/10" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                            title={isSpeaking && !isPaused ? "Pause Reading" : "Read Aloud"}
                          >
                             {isSpeaking && !isPaused ? (
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                               </svg>
                             ) : (
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                               </svg>
                             )}
                          </button>

                          {(isSpeaking || isPaused) && (
                            <button
                              onClick={stopSpeak}
                              className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors animate-in fade-in slide-in-from-left-2"
                              title="Stop Reading"
                            >
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                               </svg>
                            </button>
                          )}
                        </div>
                      </div>

                      <nav className="relative">
                        <div className="space-y-1">
                          {nestedTableOfContents.map((h2, index) => {
                             const isActive = activeHeading === h2.id;
                             const hasChildren = h2.children.length > 0;
                             const isExpanded = expandedSections[h2.id];

                             // Check if any child is active
                             const isChildActive = h2.children.some(child => child.id === activeHeading);

                             return (
                               <div key={index} className="relative">
                                 {/* H2 Item (Section Header style if children, else Link style) */}
                                 <div className={`group flex items-center justify-between rounded-lg transition-colors duration-200 mb-1 ${
                                   isActive
                                     ? "bg-cyan-500/10 text-cyan-400 font-medium"
                                     : isChildActive
                                       ? "text-slate-200"
                                       : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                 }`}>
                                     <a
                                       href={`#${h2.id}`}
                                       className="flex-1 py-2 px-3 text-sm flex items-center gap-3"
                                       onClick={(e) => {
                                         e.preventDefault();
                                         const element = document.getElementById(h2.id);
                                         if (element) {
                                           const offset = 100;
                                           window.scrollTo({
                                             top: element.getBoundingClientRect().top + window.scrollY - offset,
                                             behavior: "smooth",
                                           });
                                           if (hasChildren && !isExpanded) toggleSection(h2.id);
                                         }
                                       }}
                                     >
                                        <span className={`transition-colors truncate`}>
                                          {h2.text}
                                        </span>
                                     </a>

                                     {/* Expand/Collapse Toggle */}
                                     {hasChildren && (
                                       <button
                                         onClick={(e) => {
                                             e.preventDefault();
                                             e.stopPropagation();
                                             toggleSection(h2.id);
                                         }}
                                         className={`p-1.5 mr-1.5 rounded-md hover:bg-slate-700/50 transition-colors ${
                                             isExpanded || isChildActive ? "text-slate-300" : "text-slate-500"
                                         }`}
                                         aria-label={isExpanded ? "Collapse section" : "Expand section"}
                                       >
                                           <svg
                                             className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                           >
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                           </svg>
                                       </button>
                                     )}
                                 </div>

                                 {/* Children (H3/H4) - Navigation Tree Style */}
                                 {hasChildren && isExpanded && (
                                   <div className="relative ml-px pl-0 space-y-0.5 mb-2">
                                        {/* Vertical Guide Line */}
                                        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-800" />

                                        {h2.children.map((child, cIndex) => {
                                           const isChildItemActive = activeHeading === child.id;
                                           return (
                                           <a
                                             key={cIndex}
                                             href={`#${child.id}`}
                                             className={`block py-1.5 pl-7 pr-3 text-xs rounded-r-lg border-l-[3px] transition-all duration-200 ${
                                               isChildItemActive
                                                 ? "border-cyan-400 bg-cyan-500/5 text-cyan-400 font-medium"
                                                 : "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700"
                                             }`}
                                             onClick={(e) => {
                                               e.preventDefault();
                                               const element = document.getElementById(child.id);
                                               if (element) {
                                                   const offset = 100;
                                                   window.scrollTo({
                                                     top: element.getBoundingClientRect().top + window.scrollY - offset,
                                                     behavior: "smooth",
                                                   });
                                               }
                                             }}
                                           >
                                             {child.text}
                                           </a>
                                        )})}
                                   </div>
                                 )}
                               </div>
                             );
                          })}
                        </div>
                      </nav>
                    </div>
                  )}

                  {/* Sidebar Ad Placeholder */}
                  <AdPlaceholder label="Advertisement" />

                  {/* Stay Updated Section */}
                  {/* Stay Updated Section */}
                  <div className="relative p-1 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900/50 overflow-hidden">
                    <div className="relative h-full bg-slate-950/80 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50">
                      {/* Glow Effect */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h3 className="text-base font-bold text-white">
                            Weekly Newsletter
                          </h3>
                        </div>

                        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                          Join 5,000+ developers getting the latest updates on AI & Engineering.
                        </p>

                        {newsletterSubmitted ? (
                          <div className="flex items-center justify-center gap-2 text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4 animate-in fade-in duration-300">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium text-sm">You're on the list!</span>
                          </div>
                        ) : (
                          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                            <div className="relative group">
                              <input
                                type="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="email@example.com"
                                disabled={isSubmittingNewsletter}
                                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all text-sm group-hover:border-slate-600/50"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={isSubmittingNewsletter || !newsletterEmail.trim()}
                              className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
                            >
                              {isSubmittingNewsletter ? (
                                <span className="flex items-center justify-center gap-2">
                                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Subscribing...
                                </span>
                              ) : "Subscribe Free"}
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* CENTER - Main Article */}
              <article className={`lg:col-span-9 xl:col-span-9 ${isReadingMode ? "lg:col-span-12" : ""} w-full transition-all duration-300`}>
                {/* Content Container */}
                <div className="w-full">


                  {/* Header Content */}
                  <div className="mb-12 border-b border-slate-800 pb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded-full border border-cyan-500/20">
                        {blogPost.category}
                      </span>
                      <span className="text-slate-500 text-sm">•</span>
                      <span className="text-slate-400 text-sm">{blogPost.readTime}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                      {blogPost.title}
                    </h1>

                    {blogPost.excerpt && (
                      <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mb-6">
                        {blogPost.excerpt}
                      </p>
                    )}

                    {/* Author & Share Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={portfolioData.personalInfo.profileImage}
                          alt={portfolioData.personalInfo.name}
                          className="w-10 h-10 rounded-full border border-slate-700"
                        />
                        <div>
                          <div className="text-white font-medium text-sm">{portfolioData.personalInfo.name}</div>
                          <div className="text-slate-500 text-xs">
                            {new Date(blogPost.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center gap-2">
                         <button
                            onClick={() => copyToClipboard(window.location.href)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all border border-slate-700/50 text-xs font-medium"
                            title="Copy link"
                          >
                            {copied ? (
                              <>
                                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Copied
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy link
                              </>
                            )}
                          </button>
                         <div className="flex items-center gap-1">
                            <button
                              onClick={() => shareArticle("twitter")}
                              className="p-1.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-cyan-400 transition-all border border-slate-700/50"
                              title="Share on Twitter"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                              </svg>
                            </button>
                             <button
                              onClick={() => shareArticle("linkedin")}
                              className="p-1.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-400 transition-all border border-slate-700/50"
                              title="Share on LinkedIn"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </button>
                         </div>
                      </div>
                    </div>
                  </div>



                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/10 via-transparent to-cyan-900/5 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div
                      style={{ fontSize: `${fontSize}px` }}
                      className="prose prose-lg md:prose-xl prose-invert max-w-none blog-content
                      text-slate-300 leading-[1.9] text-[1.125rem] font-normal tracking-normal

                      prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
                      prose-headings:text-shadow-sm

                      prose-h1:text-4xl prose-h1:lg:text-5xl prose-h1:leading-[1.15] prose-h1:mb-12 prose-h1:text-transparent prose-h1:bg-clip-text prose-h1:bg-gradient-to-br prose-h1:from-white prose-h1:to-slate-400

                      prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-white prose-h2:font-bold prose-h2:border-b prose-h2:border-slate-800/60 prose-h2:pb-4 prose-h2:flex prose-h2:items-center prose-h2:gap-3

                      prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-cyan-400 prose-h3:font-semibold prose-h3:tracking-wide

                      prose-p:leading-[1.9] prose-p:mb-8 prose-p:text-slate-300 prose-p:font-light

                      prose-a:text-cyan-400 prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-cyan-500/30 hover:prose-a:border-cyan-400 hover:prose-a:text-cyan-300 transition-all duration-200

                      prose-strong:text-white prose-strong:font-bold prose-strong:bg-slate-800/50 prose-strong:px-1 prose-strong:rounded

                      prose-code:text-cyan-200 prose-code:bg-slate-900/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[0.9em] prose-code:font-mono prose-code:border prose-code:border-slate-700/50 prose-code:shadow-sm prose-code:box-decoration-clone prose-code:before:content-none prose-code:after:content-none

                      prose-pre:bg-[#0B1120] prose-pre:border prose-pre:border-slate-800/80 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:shadow-2xl prose-pre:shadow-black/50

                      prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-li:marker:text-cyan-500
                      prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-3 prose-li:marker:text-cyan-500

                      prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-cyan-950/20 prose-blockquote:to-transparent prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-2xl prose-blockquote:my-10 prose-blockquote:text-slate-200 prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:shadow-inner

                      prose-img:rounded-2xl prose-img:shadow-2xl prose-img:shadow-black/50 prose-img:my-12 prose-img:border prose-img:border-slate-800/50 prose-img:transition-transform prose-img:hover:scale-[1.01] duration-500

                      prose-hr:border-slate-800 prose-hr:my-16"
                    >
                      {/* Render the JSX component post content */}
                      {PostComponent && <PostComponent />}
                    </div>

                    {/* In-Content Ad Placeholder (Bottom) */}
                    <div className="my-12">
                      <AdPlaceholder label="Advertisement" />
                    </div>

                    {/* Tags Section */}
                    {blogPost.tags && blogPost.tags.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-slate-700">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Tags
                        </h3>
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

                    {/* Author CTA - Premium Card */}
                    <div className="mt-16 pt-8 border-t border-slate-800/60">
                      <div className="relative group overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm p-8 transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-2xl hover:shadow-cyan-900/20">
                         {/* Subtle background glow */}
                         <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>

                        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
                          <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 to-blue-600">
                                <img
                                  src={portfolioData.personalInfo.profileImage}
                                  alt={portfolioData.personalInfo.name}
                                  className="w-full h-full rounded-full object-cover border-2 border-slate-900"
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full" title="Available for hire"></div>
                          </div>
                          <div className="text-center sm:text-left flex-1">
                             <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 mb-2">
                                <h4 className="text-2xl font-bold text-white whitespace-nowrap">
                                  {portfolioData.personalInfo.name}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20 uppercase tracking-wide">
                                  Author
                                </span>
                             </div>
                            <p className="text-slate-300 mb-6 leading-relaxed max-w-lg mx-auto sm:mx-0 font-light">
                              {portfolioData.personalInfo.title} passionate
                              about crafting high-performance user experiences.
                              I write about Agentic AI, React, and the future of web development.
                            </p>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                              <a
                                href={
                                  portfolioData.socialLinks.professional
                                    .linkedin
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/20 hover:bg-[#0077b5] hover:text-white transition-all duration-300 font-medium text-sm"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                LinkedIn
                              </a>
                              <a
                                href={
                                  portfolioData.socialLinks.professional.github
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm"
                              >
                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                GitHub
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div id="comments" className="mt-16 pt-8 border-t border-slate-700">
                      <GiscusComments />
                    </div>
                  </div>
                </div>
              </article>


            </div>
          </div>
        </section>


        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-slate-900/50 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group block bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-800/60 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/20"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-xl bg-slate-800">
                      {(() => {
                        const ImgComp =
                          post.Component?.CardImage ||
                          post.Component?.Image ||
                          post.Component?.FeaturedImage;

                        if (ImgComp) {
                          return (
                            <div className="w-full h-full">
                              <ImgComp className="w-full h-full object-cover" />
                            </div>
                          );
                        }

                        return (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        );
                      })()}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 bg-slate-900/80 text-cyan-300 text-xs font-medium rounded-full backdrop-blur-sm border border-slate-700/50">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{post.readTime}</span>
                        <span>
                          {new Date(post.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer Ad Placeholder */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdPlaceholder label="Advertisement" className="h-32" />
        </div>
      </div>
      <ReadingToolbar
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isReadingMode={isReadingMode}
        onReadingModeToggle={() => setIsReadingMode(!isReadingMode)}
      />
    </>
  );
};

export default BlogPost;
