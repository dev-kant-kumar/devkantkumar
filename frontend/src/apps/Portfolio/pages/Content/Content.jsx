import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Youtube, 
  Linkedin, 
  BookOpen, 
  Clock, 
  Play, 
  ArrowUpRight, 
  Users, 
  Video, 
  Eye, 
  Sparkles, 
  Compass, 
  Flame, 
  UserCheck, 
  ExternalLink 
} from "lucide-react";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { API_URL } from "../../../../config/api";
import linkedinPosts from "../../store/data/linkedinPosts";
import { portfolioData } from "../../store/data/portfolioData";
import { localPostMetas, localPosts } from "../Blog/postsLocal";

const Content = () => {
  // Helper to get component by slug
  const getPostComponentBySlug = (slug) =>
    localPosts.find((p) => p.meta.slug === slug)?.Component;

  // Render card image (from Blog.jsx logic)
  const renderCardImage = (meta, className = "") => {
    const C = getPostComponentBySlug(meta.slug);
    // Prefer CardImage, then Image, then FeaturedImage
    const ImgComp = C?.CardImage || C?.Image || C?.FeaturedImage;
    if (typeof ImgComp === "function") return <ImgComp className={className} size="card" />;
    if (React.isValidElement(ImgComp)) return React.cloneElement(ImgComp, { className });
    // Fallback to static image
    return (
      <img src={meta.image} alt={meta.title} className={className} loading="lazy" />
    );
  };

  const [latestYouTubeVideo, setLatestYouTubeVideo] = useState(null);
  const [youTubeVideos, setYouTubeVideos] = useState([]);
  const [linkedInPosts, setLinkedInPosts] = useState(linkedinPosts ?? []);
  const [channelStats, setChannelStats] = useState(null);
  const [isYouTubeLoading, setIsYouTubeLoading] = useState(true);
  const [youTubeError, setYouTubeError] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const YOUTUBE_CHANNEL_URL =
    import.meta.env.VITE_YOUTUBE_CHANNEL_URL ||
    "https://www.youtube.com/@dev-code-space";

  // Fetch latest video, most viewed videos and channel stats via backend
  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        setIsYouTubeLoading(true);
        setYouTubeError(null);

        const response = await fetch(`${API_URL}/youtube/data`);
        const json = await response.json();

        if (json.status === 'success' && json.data) {
          const { latestVideo, youTubeVideos, channelStats } = json.data;

          if (latestVideo) setLatestYouTubeVideo(latestVideo);
          if (youTubeVideos) setYouTubeVideos(youTubeVideos);
          if (channelStats) setChannelStats(channelStats);
        } else {
          throw new Error(json.message || "Failed to load YouTube data");
        }
      } catch (error) {
        console.error("Failed to fetch YouTube data", error);
        setYouTubeError("Unable to load latest YouTube data right now.");
      } finally {
        setIsYouTubeLoading(false);
      }
    };

    fetchYouTubeData();
  }, []);

  const latestBlogPosts = (localPostMetas || []).slice(0, 3);

  const formatNumber = (value) => {
    if (!value && value !== 0) return "-";
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toLocaleString();
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { personalInfo } = portfolioData;

  return (
    <>
      <SEOHead
        title="Content Hub – YouTube & LinkedIn Insights"
        description="Watch my latest YouTube videos, explore LinkedIn insights, and stay updated with everything I create."
        keywords="content hub, YouTube, LinkedIn, devkantkumar, portfolio content, videos, posts"
        canonicalUrl="/content"
        type="website"
      />
      <StructuredData type="website" />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-hidden">
        {/* Background Grids & Ambient Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 min-h-[60vh] flex items-center justify-center pt-32 pb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase shadow-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Official Content Hub // dev_insights
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none text-white tracking-tight"
            >
              Creative
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl ml-4">
                Hub
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Sharing ideas, standardizing workflows, and building solutions. Here you'll find the latest deep dives from my YouTube channel, LinkedIn insights, and engineering blog.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3.5"
            >
              <div className="px-4 py-2 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-xl text-slate-300 text-xs font-mono flex items-center gap-2 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Knowledge Stream
              </div>
              <div className="px-4 py-2 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-xl text-slate-300 text-xs font-mono flex items-center gap-2 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Tech stack & PWA integrated
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Latest YouTube Video Section */}
        <section className="relative z-10 py-16 border-t border-slate-900/80 bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row items-stretch gap-8">
              
              {/* Main Player Component */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm shadow-md">
                    <Youtube size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      Latest Masterclass
                    </h2>
                    <p className="text-slate-500 text-xs font-mono mt-0.5 uppercase tracking-wider">
                      Streaming live from YouTube API
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative flex-1 flex flex-col bg-slate-950/80 border border-slate-900 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-xl shadow-2xl shadow-black/60"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-900">
                    {latestYouTubeVideo && playingVideoId === latestYouTubeVideo.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${latestYouTubeVideo.id}?autoplay=1`}
                        title={latestYouTubeVideo.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : latestYouTubeVideo && latestYouTubeVideo.thumbnail ? (
                      <>
                        <img
                          src={latestYouTubeVideo.thumbnail}
                          alt={latestYouTubeVideo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-2xl group-hover:blur-3xl transition-all duration-300" />
                            <button
                              type="button"
                              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/40 border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300"
                              aria-label="Play video"
                              onClick={() => setPlayingVideoId(latestYouTubeVideo.id)}
                            >
                              <Play className="w-6 h-6 text-white fill-current ml-1" />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full min-h-[350px] bg-slate-950/80 flex flex-col items-center justify-center p-8 text-center border border-slate-900/80 rounded-3xl backdrop-blur-xl relative overflow-hidden">
                        {/* Ambient red glow inside the offline card */}
                        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-red-500/5 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 mb-2">
                            <Youtube size={28} />
                          </div>
                          
                          <h4 className="text-xl font-bold text-white tracking-tight">YouTube Channel Offline</h4>
                          <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                            I regularly publish deep-dive software engineering tutorials, architectural masterclasses, and coding workflows. Explore my video tutorials and subscribe directly on my YouTube channel.
                          </p>
                          
                          <div className="flex flex-wrap justify-center gap-3 mt-2">
                            <a
                              href={YOUTUBE_CHANNEL_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-red-600/10 transition-all duration-300"
                            >
                              Visit My Channel
                              <ArrowUpRight size={14} className="ml-1.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {latestYouTubeVideo && (
                    <div className="p-6 md:p-8 flex flex-col gap-4 flex-1 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                            Published // {formatDate(latestYouTubeVideo.publishedAt)}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                          {latestYouTubeVideo.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                          {latestYouTubeVideo.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3.5 pt-2">
                        <a
                          href={`https://www.youtube.com/watch?v=${latestYouTubeVideo.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300"
                        >
                          Watch on YouTube
                          <ArrowUpRight size={14} className="ml-1.5" />
                        </a>
                        <a
                          href={YOUTUBE_CHANNEL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider hover:border-slate-700 hover:text-white transition-all duration-300"
                        >
                          Visit Channel
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* YouTube Statistics & Custom Branding Portal */}
              <div className="w-full lg:w-[380px] shrink-0 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-6 lg:invisible">
                  <div className="w-10 h-10" />
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  {/* Channel Stats Glass Capsule */}
                  <div className="flex-1 rounded-3xl bg-slate-950/80 border border-slate-900 p-6 backdrop-blur-xl overflow-hidden hover:border-cyan-500/20 transition-all duration-300 shadow-2xl shadow-black/50 flex flex-col justify-between">
                    <div>
                      {channelStats?.banner && (
                        <div className="relative h-20 -mx-6 -mt-6 mb-6 overflow-hidden border-b border-slate-900">
                          <img
                            src={channelStats.banner}
                            alt="Channel banner"
                            className="w-full h-full object-cover opacity-60"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        </div>
                      )}

                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden border border-cyan-400/20 shadow-md">
                            {channelStats?.avatar ? (
                              <img
                                src={channelStats.avatar}
                                alt={channelStats.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-black text-xl">
                                {personalInfo.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-4 border-slate-950 animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400 mb-0.5">
                            Creator Profile
                          </p>
                          <h3 className="text-base font-bold text-white truncate tracking-tight">
                            {channelStats?.title || "Dev Code Space"}
                          </h3>
                          <p className="text-xs text-slate-500 truncate">
                            {channelStats?.description || "Modern Dev Tutorials & Tech Insights."}
                          </p>
                        </div>
                      </div>

                      {/* Stats Modules with Glass Shadowing */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3 text-center hover:border-cyan-500/10 transition-colors shadow-inner">
                          <p className="text-[9px] font-mono text-slate-500 mb-1 uppercase font-bold tracking-wider">Subscribers</p>
                          <p className="text-sm font-black text-white font-mono">
                            {formatNumber(channelStats?.subscribers)}
                          </p>
                        </div>
                        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3 text-center hover:border-cyan-500/10 transition-colors shadow-inner">
                          <p className="text-[9px] font-mono text-slate-500 mb-1 uppercase font-bold tracking-wider">Videos</p>
                          <p className="text-sm font-black text-white font-mono">
                            {formatNumber(channelStats?.videos)}
                          </p>
                        </div>
                        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3 text-center hover:border-cyan-500/10 transition-colors shadow-inner">
                          <p className="text-[9px] font-mono text-slate-500 mb-1 uppercase font-bold tracking-wider">Views</p>
                          <p className="text-sm font-black text-white font-mono">
                            {formatNumber(channelStats?.views)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <a
                        href={YOUTUBE_CHANNEL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-red-600/10 hover:shadow-red-600/20 transition-all duration-300"
                      >
                        Subscribe on YouTube
                        <ExternalLink size={12} className="ml-1.5" />
                      </a>

                      {isYouTubeLoading && (
                        <p className="mt-3 text-[10px] font-mono text-slate-500 text-center animate-pulse">
                          Syncing with Google Server...
                        </p>
                      )}
                      {youTubeError && !isYouTubeLoading && (
                        <p className="mt-3 text-[10px] font-mono text-red-400 text-center">
                          {youTubeError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Curator Glass Pill */}
                  <div className="rounded-3xl bg-slate-950/50 border border-slate-900 p-5 backdrop-blur-xl flex items-center gap-4 hover:border-cyan-500/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm shadow-md">
                      DK
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-mono">
                        Lead Producer //
                        <span className="text-cyan-400 font-bold ml-1.5">
                          {personalInfo.name}
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider font-mono">
                        {personalInfo.title}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Video Grid Feed Section */}
        {youTubeVideos.length > 1 && (
          <section className="relative z-10 py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">
                    Technical Masterclasses
                  </h2>
                  <p className="text-slate-400 text-sm max-w-xl mt-1 leading-relaxed">
                    Explore deeper deep-dives focusing on microservices, agentic workflows, API systems, and robust developer structures.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@dev-code-space/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider hover:bg-slate-900 hover:border-cyan-500/40 hover:text-white transition-all duration-300"
                >
                  Explore Feed
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {youTubeVideos.slice(1).map((video) => (
                  <motion.article
                    key={video.id}
                    variants={itemVariants}
                    className="group relative flex flex-col h-full bg-slate-950/80 border border-slate-900 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-xl shadow-xl shadow-black/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.03)] cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-950 border-b border-slate-900 shrink-0">
                      {playingVideoId === video.id ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          {video.thumbnail && (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[9px] font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 shadow-md">
                            <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            YouTube
                          </div>
                          <button
                            type="button"
                            className="absolute inset-0 flex items-center justify-center"
                            aria-label="Play video"
                            onClick={() => setPlayingVideoId(video.id)}
                          >
                            <span className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 border border-white/20 group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col gap-3.5 flex-1 justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                          {formatDate(video.publishedAt)}
                        </span>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                          {video.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                          {video.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
                        >
                          Watch Video
                          <ArrowUpRight size={12} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* LinkedIn Stream Section */}
        <section className="relative z-10 py-20 border-t border-slate-900 bg-slate-950/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  LinkedIn Knowledge Stream
                </h2>
                <p className="text-slate-400 text-sm max-w-xl mt-1 leading-relaxed">
                  Real-time updates, framework paradigms, architectural designs, and brief technological insights.
                </p>
              </div>
              <a
                href="https://linkedin.com/in/devkantkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider hover:bg-slate-900 hover:border-cyan-500/40 hover:text-white transition-all duration-300"
              >
                Connect on LinkedIn
                <ArrowUpRight size={14} />
              </a>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {linkedInPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group relative flex flex-col h-full bg-slate-950/80 border border-slate-900 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-xl shadow-xl shadow-black/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.03)]"
                >
                  {post.type === "embed" ? (
                    <div className="relative w-full overflow-hidden rounded-3xl bg-slate-950 flex-1 flex flex-col justify-center">
                      <div
                        className="
                          [&>iframe]:w-full
                          [&>iframe]:h-auto
                          [&>iframe]:min-h-[465px]
                          [&>iframe]:rounded-3xl
                          [&>iframe]:border-0
                          [&>iframe]:overflow-hidden
                          p-2 bg-slate-950
                        "
                        dangerouslySetInnerHTML={{ __html: post.embedHtml }}
                      />
                    </div>
                  ) : (
                    <>
                      {/* Optional Thumbnail */}
                      {post.image ? (
                        <div className="relative h-48 overflow-hidden border-b border-slate-900 shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/10 border border-[#0a66c2]/30 flex items-center justify-center text-[#0a66c2] text-xs font-mono font-bold shadow-md backdrop-blur-md">
                              in
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300 shadow-md">
                              Post
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 pb-0 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/10 border border-[#0a66c2]/30 flex items-center justify-center text-[#0a66c2] text-xs font-mono font-bold shadow-md">
                            in
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-900 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 shadow-md">
                            Text Insight
                          </span>
                        </div>
                      )}

                      {/* Content Area */}
                      <div className="p-6 flex flex-col gap-3.5 flex-1 justify-between">
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                            {post.publishedAt ? formatDate(post.publishedAt) : "Recently Broadcasted"}
                          </span>
                          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed line-clamp-4">
                            {post.description || post.excerpt}
                          </p>
                        </div>

                        <div className="pt-2">
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
                          >
                            Read Post
                            <ArrowUpRight size={12} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Latest Blog Articles */}
        {latestBlogPosts.length > 0 && (
          <section className="relative z-10 py-20 border-t border-slate-900 bg-slate-950/40">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">
                    Engineering Journal
                  </h2>
                  <p className="text-slate-400 text-sm max-w-xl mt-1 leading-relaxed">
                    Long-form architectures, software design patterns, operational guides, and detailed coding posts.
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider hover:border-cyan-400 hover:bg-slate-950 transition-all duration-300"
                >
                  View Blog
                  <BookOpen size={14} />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestBlogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group relative flex flex-col h-full bg-slate-950/80 border border-slate-900 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-xl shadow-xl shadow-black/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.03)]"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-slate-900 shrink-0">
                      {renderCardImage(
                        post,
                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300 shadow-md">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-3.5 flex-1 justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {post.readTime}
                          </span>
                          <span>
                            {formatDate(post.publishDate || post.publishedAt)}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
                        >
                          Read Article
                          <ArrowUpRight size={12} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Content;
