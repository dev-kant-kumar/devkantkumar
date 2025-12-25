import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import linkedinPosts from "../../store/data/linkedinPosts";
import { portfolioData } from "../../store/data/portfolioData";
import { localPostMetas } from "../Blog/postsLocal";

const Content = () => {
  const [latestYouTubeVideo, setLatestYouTubeVideo] = useState(null);
  const [youTubeVideos, setYouTubeVideos] = useState([]);
  const [linkedInPosts, setLinkedInPosts] = useState(linkedinPosts ?? []);
  const [channelStats, setChannelStats] = useState(null);
  const [isYouTubeLoading, setIsYouTubeLoading] = useState(true);
  const [youTubeError, setYouTubeError] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
  const YOUTUBE_CHANNEL_URL =
    import.meta.env.VITE_YOUTUBE_CHANNEL_URL ||
    "https://www.youtube.com/@dev-kant-kumar";

  // Fetch latest video, most viewed videos and channel stats
  useEffect(() => {
    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      setIsYouTubeLoading(false);
      setYouTubeError("YouTube configuration is missing.");
      return;
    }

    const fetchYouTubeData = async () => {
      try {
        setIsYouTubeLoading(true);
        setYouTubeError(null);

        const base = "https://www.googleapis.com/youtube/v3";

        const [searchRes, statsRes, mostViewedRes] = await Promise.all([
          // Latest video
          fetch(
            `${base}/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=1`
          ),
          // Channel statistics + branding
          fetch(
            `${base}/channels?key=${YOUTUBE_API_KEY}&id=${YOUTUBE_CHANNEL_ID}&part=snippet,statistics,brandingSettings`
          ),
          // Most viewed videos for grid
          fetch(
            `${base}/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=viewCount&type=video&maxResults=7`
          ),
        ]);

        const [searchJson, statsJson, mostViewedJson] = await Promise.all([
          searchRes.json(),
          statsRes.json(),
          mostViewedRes.json(),
        ]);

        // Latest video
        const latestItem = searchJson.items?.[0];
        if (latestItem) {
          const videoId = latestItem.id?.videoId || latestItem.id;
          setLatestYouTubeVideo({
            id: videoId,
            title: latestItem.snippet.title,
            description: latestItem.snippet.description,
            publishedAt: latestItem.snippet.publishedAt,
            thumbnail:
              latestItem.snippet.thumbnails?.high?.url ||
              latestItem.snippet.thumbnails?.medium?.url,
          });
        }

        // Most viewed videos (for grid)
        const mostViewedItems = (mostViewedJson.items || []).filter(
          (item) => item.id?.videoId
        );
        setYouTubeVideos(
          mostViewedItems.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            thumbnail:
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.medium?.url,
          }))
        );

        // Channel stats card
        const channel = statsJson.items?.[0];
        if (channel) {
          // Some APIs return bannerExternalUrl without protocol; normalize it
          const rawBanner = channel.brandingSettings?.image?.bannerExternalUrl;
          const bannerUrl = rawBanner
            ? rawBanner.startsWith("http")
              ? rawBanner
              : `https:${rawBanner}`
            : null;

          const rawAvatar = channel.snippet.thumbnails?.high?.url;
          const avatarUrl = rawAvatar
            ? rawAvatar.startsWith("http")
              ? rawAvatar
              : `https:${rawAvatar}`
            : null;

          setChannelStats({
            title: channel.snippet.title,
            description: channel.snippet.description,
            subscribers: channel.statistics.subscriberCount,
            videos: channel.statistics.videoCount,
            views: channel.statistics.viewCount,
            banner: bannerUrl,
            avatar: avatarUrl,
          });
        }
      } catch (error) {
        console.error("Failed to fetch YouTube data", error);
        setYouTubeError("Unable to load latest YouTube data right now.");
      } finally {
        setIsYouTubeLoading(false);
      }
    };

    fetchYouTubeData();
  }, [YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID]);

  // Placeholder: Fetch recent LinkedIn posts
  useEffect(() => {
    // TODO: Replace this placeholder with a real LinkedIn API or custom backend integration.
    // Example approach:
    // 1. Build a small serverless function that fetches latest posts from LinkedIn API.
    // 2. Expose only the required fields (text, image, url, publishedAt).
    // 3. Call that endpoint from here and set state.
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
    return new Date(dateString).toLocaleDateString();
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

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
          {/* Background Effects (matching Projects/Blog) */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-xl shadow-lg shadow-cyan-500/10">
                <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
                Official Content Hub
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-white"
            >
              Content
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl ml-3">
                Hub
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Watch my latest YouTube videos, explore LinkedIn insights, and
              stay updated with everything I create.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="px-4 py-2 rounded-full bg-slate-900/60 border border-cyan-500/20 text-slate-200 text-sm flex items-center gap-2 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                New content every week
              </div>
              <div className="px-4 py-2 rounded-full bg-slate-900/60 border border-cyan-500/20 text-slate-200 text-sm flex items-center gap-2 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                YouTube • LinkedIn • Blog
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Latest YouTube Video */}
        <section className="py-16 bg-slate-900/40 border-y border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-red-500/80 to-orange-500/80 text-white font-bold text-sm shadow-lg shadow-red-500/30">
                    YT
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Latest YouTube Video
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Automatically pull your newest upload once the API is
                      configured.
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-cyan-500/40 transition-all duration-500 shadow-xl shadow-black/40"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {latestYouTubeVideo &&
                    playingVideoId === latestYouTubeVideo.id ? (
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
                        {/* Glass overlay + play button */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-cyan-500/40 blur-xl group-hover:blur-2xl transition-all duration-300" />
                            <button
                              type="button"
                              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/40 border border-white/20"
                              aria-label="Play video"
                              onClick={() =>
                                setPlayingVideoId(latestYouTubeVideo.id)
                              }
                            >
                              <svg
                                className="w-7 h-7 text-white ml-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <p className="text-slate-400 text-sm">
                          Connect YouTube API to display your latest video.
                        </p>
                      </div>
                    )}
                  </div>

                  {latestYouTubeVideo && (
                    <div className="p-8 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {latestYouTubeVideo.title}
                        </h3>
                        <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                          Published {formatDate(latestYouTubeVideo.publishedAt)}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3">
                        {latestYouTubeVideo.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={`https://www.youtube.com/watch?v=${latestYouTubeVideo.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                        >
                          Watch on YouTube
                        </a>
                        <a
                          href={YOUTUBE_CHANNEL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-600 text-slate-200 text-sm font-medium hover:border-cyan-400 hover:text-white transition-all duration-300"
                        >
                          Visit channel
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Side details */}
              <div className="w-full max-w-md lg:max-w-sm space-y-6">
                {/* YouTube channel stats card */}
                <div className="rounded-2xl bg-slate-900/60 border border-cyan-500/30 p-6 backdrop-blur-xl overflow-hidden">
                  {channelStats?.banner && (
                    <div className="relative h-20 -mx-6 -mt-6 mb-6 overflow-hidden">
                      <img
                        src={channelStats.banner}
                        alt="Channel banner"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden border border-cyan-400/40">
                        {channelStats?.avatar ? (
                          <img
                            src={channelStats.avatar}
                            alt={channelStats.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-semibold text-xl">
                            {personalInfo.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs uppercase tracking-wide text-cyan-400 mb-1">
                        YouTube Channel
                      </p>
                      <h3 className="text-lg font-semibold text-white truncate">
                        {channelStats?.title || personalInfo.name}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">
                        {channelStats?.description ||
                          "Welcome to my coding & tech content hub."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 mb-1">Subscribers</p>
                      <p className="text-sm font-semibold text-white">
                        {formatNumber(channelStats?.subscribers)}
                      </p>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 mb-1">Videos</p>
                      <p className="text-sm font-semibold text-white">
                        {formatNumber(channelStats?.videos)}
                      </p>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 mb-1">Total Views</p>
                      <p className="text-sm font-semibold text-white">
                        {formatNumber(channelStats?.views)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                  >
                    Visit YouTube Channel
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 7l-10 10M8 7h9v9"
                      />
                    </svg>
                  </a>

                  {isYouTubeLoading && (
                    <p className="mt-3 text-[11px] text-slate-500">
                      Loading channel stats...
                    </p>
                  )}
                  {youTubeError && !isYouTubeLoading && (
                    <p className="mt-3 text-[11px] text-red-400">
                      {youTubeError}
                    </p>
                  )}
                </div>

                <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    DK
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">
                      Curated by
                      <span className="text-cyan-400 font-semibold ml-1">
                        {personalInfo.name}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {personalInfo.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More YouTube Videos Grid */}
        {youTubeVideos.length > 1 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    More Videos from the Channel
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base max-w-xl">
                    Deep dives into AI agents, MCP, and modern developer
                    tooling.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@dev-kant-kumar/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/70 border border-cyan-500/30 text-cyan-300 text-sm font-medium hover:bg-slate-900 hover:border-cyan-400 transition-all duration-300"
                >
                  View all videos
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10M8 7h9v9"
                    />
                  </svg>
                </a>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {youTubeVideos.slice(1).map((video) => (
                  <motion.article
                    key={video.id}
                    variants={itemVariants}
                    className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden shadow-lg shadow-black/30"
                  >
                    <div className="relative h-40 overflow-hidden">
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
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600/90 text-[11px] uppercase tracking-wide text-white flex items-center gap-1">
                            <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
                            Video
                          </div>
                          <button
                            type="button"
                            className="absolute inset-0 flex items-center justify-center"
                            aria-label="Play video"
                            onClick={() => setPlayingVideoId(video.id)}
                          >
                            <span className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 border border-white/20">
                              <svg
                                className="w-6 h-6 text-white ml-0.5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1 mb-3">
                        <span>{formatDate(video.publishedAt)}</span>
                      </div>
                      <div className="flex">
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                        >
                          Watch on YouTube
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 7l-10 10M8 7h9v9"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Overlay link removed in favor of explicit button CTA to mirror blog cards */}
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* LinkedIn Posts */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Recent LinkedIn Posts
                </h2>
                <p className="text-slate-400 text-sm md:text-base max-w-xl">
                  Short-form ideas around development, content creation, and
                  career growth.
                </p>
              </div>
              <a
                href="https://linkedin.com/in/devkantkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/70 border border-cyan-500/30 text-cyan-300 text-sm font-medium hover:bg-slate-900 hover:border-cyan-400 transition-all duration-300"
              >
                View all on LinkedIn
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 7l-10 10M8 7h9v9"
                  />
                </svg>
              </a>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {linkedInPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden shadow-lg shadow-black/30"
                >
                  {/* If EMBED post → Render iframe full height */}
                  {post.type === "embed" ? (
                    <div className="relative w-full overflow-hidden rounded-xl">
                      <div
                        className="
                          [&>iframe]:w-full
                          [&>iframe]:h-auto
                          [&>iframe]:min-h-[465px]
                          [&>iframe]:rounded-xl
                          [&>iframe]:border-0
                          [&>iframe]:overflow-hidden
                        "
                        dangerouslySetInnerHTML={{ __html: post.embedHtml }}
                      />
                    </div>
                  ) : (
                    <>
                      {/* Thumbnail / Image Section (optional) */}
                      <div className="relative h-60 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900" />

                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {/* LinkedIn Badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-[#0a66c2] flex items-center justify-center text-white text-xs font-bold">
                            in
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] uppercase tracking-wide text-slate-200">
                            LinkedIn Post
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 space-y-3">
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                          {post.description || post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                          <span>
                            {post.publishedAt
                              ? formatDate(post.publishedAt)
                              : "Recently Posted"}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            View on LinkedIn
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 7l-10 10M8 7h9v9"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0"
                        aria-label="View on LinkedIn"
                      />
                    </>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Latest Blog Articles */}
        {latestBlogPosts.length > 0 && (
          <section className="py-20 bg-slate-900/40 border-t border-slate-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Latest Blog Articles
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base max-w-xl">
                    A quick glimpse into recent long-form content from my blog.
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/40 text-cyan-300 text-sm font-medium hover:border-cyan-400 hover:bg-slate-900/80 transition-all duration-300"
                >
                  View all articles
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 7l-10 10M8 7h9v9"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {latestBlogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden shadow-lg shadow-black/30"
                  >
                    <div className="relative h-40 overflow-hidden bg-slate-800">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] uppercase tracking-wide text-slate-200">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <span>{post.readTime}</span>
                        <span>
                          {formatDate(post.publishDate || post.publishedAt)}
                        </span>
                      </div>
                      <div className="pt-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                        >
                          Read article
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 7l-10 10M8 7h9v9"
                            />
                          </svg>
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
