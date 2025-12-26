import {
    AlertTriangle,
    BookOpen,
    Calendar,
    Check,
    ChevronRight,
    Clock,
    Command,
    Copy,
    Download,
    ExternalLink,
    FileVideo,
    Folder,
    Image as ImageIcon,
    Layers,
    List,
    Music,
    Play,
    Shield,
    Tag,
    Terminal,
    Type,
    User,
    Youtube,
} from "lucide-react";
import React from "react";

function YtDlpFeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-green-950/30 to-slate-950 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1a0c_1px,transparent_1px),linear-gradient(to_bottom,#0c1a0c_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-[100px]" />

      {/* Content - fills full height */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-green-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-green-300 text-sm font-medium">CLI Tool</span>
        </div>

        {/* Icon Grid - larger */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Terminal size={28} className="text-green-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-green-500/20 border border-red-500/30 flex items-center justify-center">
            <Youtube size={40} className="text-red-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Download size={28} className="text-green-400" />
          </div>
        </div>

        {/* Title - larger */}
        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">yt-dlp </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-400">Guide</span>
        </h2>

        {/* Subtitle - larger */}
        <p className="text-slate-400 text-lg">
          Download Videos Like a Pro
        </p>
      </div>
    </div>
  );
}

function YtDlpCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0f0f0f] rounded-xl flex items-center justify-center relative overflow-hidden group border border-gray-800 hover:border-green-500/50 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/40 via-[#0f0f0f] to-[#0f0f0f]" />
      <div className="relative flex flex-col items-center gap-3 text-gray-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-gray-800/50 border border-gray-700 shadow-lg">
          <Terminal size={32} className="text-green-400" />
        </div>
        <span className="font-bold text-lg tracking-wide font-mono">yt-dlp Guide</span>
      </div>
    </div>
  );
}

function CodeBlock({ language = "bash", filename, code }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="relative my-8 rounded-xl border border-gray-700 bg-[#1e1e1e] overflow-hidden shadow-xl group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700">
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <Terminal size={14} className="text-green-400" />
          <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-600 font-mono text-xs">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-gray-500 text-xs">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors text-xs"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="m-0 p-4 overflow-x-auto text-sm leading-relaxed bg-[#1e1e1e] text-gray-300 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function InfoBox({ type = "info", title, children, icon: Icon }) {
  const styles = {
    info: {
      border: "border-blue-500/20",
      bg: "bg-blue-950/10",
      icon: "text-blue-400",
      title: "text-blue-300",
    },
    tip: {
      border: "border-green-500/20",
      bg: "bg-green-950/10",
      icon: "text-green-400",
      title: "text-green-300",
    },
    warning: {
      border: "border-yellow-500/20",
      bg: "bg-yellow-950/10",
      icon: "text-yellow-400",
      title: "text-yellow-300",
    },
    danger: {
      border: "border-red-500/20",
      bg: "bg-red-950/10",
      icon: "text-red-400",
      title: "text-red-300",
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div
      className={`my-8 p-5 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}
    >
      <div className="flex gap-4">
        {Icon && (
          <Icon size={24} className={`${style.icon} flex-shrink-0 mt-1`} />
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg ${style.title} mb-2`}>{title}</h4>
          )}
          <div className="text-gray-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ArticleMetadata() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 border-b border-gray-800">
      <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} className="text-green-400" />
          <span className="font-medium text-gray-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-green-400" />
          <span>November 24, 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-green-400" />
          <span>10 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-green-400" />
          <span>Tutorial • CLI • YouTube</span>
        </div>
      </div>
    </div>
  );
}

function TableOfContents() {
  const sections = [
    { id: "introduction", title: "Why Use Terminal?" },
    { id: "what-is-yt-dlp", title: "What is yt-dlp?" },
    { id: "installation", title: "How to Install" },
    { id: "basic-usage", title: "Basic Usage" },
    { id: "commands", title: "Full Command List" },
    { id: "output-template", title: "Output Templates" },
    { id: "common-errors", title: "Common Errors & Fixes" },
  ];

  return (
    <div className="my-10 p-6 rounded-xl bg-[#1e1e1e] border border-gray-800">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen size={20} className="text-green-400" />
        <h3 className="text-xl font-bold text-white">Table of Contents</h3>
      </div>
      <nav className="space-y-2">
        {sections.map((section, idx) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group py-1.5"
          >
            <span className="text-gray-600 font-mono text-xs font-bold w-6">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <ChevronRight
              size={14}
              className="text-gray-700 group-hover:text-green-400 transition-colors"
            />
            <span className="font-medium text-sm">{section.title}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

function YouTubeEmbed({ videoId, title }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-gray-800 shadow-2xl my-8 aspect-video">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function YtDlpGuidePost() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 font-sans selection:bg-green-500/30 selection:text-green-200">
      <YtDlpFeaturedImage />
      <ArticleMetadata />

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            How to Download YouTube Videos Using{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Terminal
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed font-light mb-8">
            Tired of sketchy "YouTube Downloader" websites filled with popups, ads, and malware risks? There is a better way. It's faster, safer, and completely free. Meet <strong>yt-dlp</strong>, the command-line tool that gives you total control over your downloads.
          </p>

          <TableOfContents />
        </section>

        {/* What is yt-dlp */}
        <section id="what-is-yt-dlp" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Command size={24} className="text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">What is yt-dlp?</h2>
          </div>
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              <strong>yt-dlp</strong> is a feature-rich command-line audio/video downloader. It is a fork of the now-inactive <em>youtube-dl</em> project, but with significant improvements:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 my-6 list-none pl-0">
              <li className="flex items-start gap-3 bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
                <Check size={20} className="text-green-400 mt-1" />
                <span><strong>Faster Speeds:</strong> Bypasses YouTube's throttling.</span>
              </li>
              <li className="flex items-start gap-3 bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
                <Check size={20} className="text-green-400 mt-1" />
                <span><strong>Better Format Support:</strong> Downloads 4K, 8K, and HDR easily.</span>
              </li>
              <li className="flex items-start gap-3 bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
                <Check size={20} className="text-green-400 mt-1" />
                <span><strong>Active Development:</strong> Frequent updates to fix bugs.</span>
              </li>
              <li className="flex items-start gap-3 bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
                <Check size={20} className="text-green-400 mt-1" />
                <span><strong>SponsorBlock:</strong> Can automatically skip sponsored segments.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <Download size={24} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">How to Install yt-dlp</h2>
          </div>

          <p className="mb-4">The easiest way to install on Windows is using <strong>Winget</strong> (Windows Package Manager).</p>

          <CodeBlock
            language="powershell"
            code="winget install yt-dlp"
            filename="Terminal"
          />

          <YouTubeEmbed videoId="xBo1kjwvnkE" title="How to Install yt-dlp using Winget" />

          <InfoBox type="tip" title="FFmpeg Required" icon={Layers}>
            For the best experience (merging video+audio, converting formats), you also need <strong>FFmpeg</strong>.
            <div className="mt-2 font-mono text-sm bg-black/30 p-2 rounded border border-green-900/30 text-green-300">
              winget install Gyan.FFmpeg
            </div>
          </InfoBox>

          <h3 className="text-xl font-bold text-white mt-8 mb-4">Verification</h3>
          <p>Open a new terminal window and type:</p>
          <CodeBlock language="bash" code="yt-dlp --version" />
          <p>If you see a date (e.g., <code>2025.01.15</code>), you are ready to go!</p>
        </section>

        {/* Basic Usage */}
        <section id="basic-usage" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Play size={24} className="text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Basic Usage</h2>
          </div>
          <p className="mb-4">The simplest command is just the tool name followed by the URL.</p>
          <CodeBlock
            language="bash"
            code="yt-dlp https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />

          <YouTubeEmbed videoId="cohxxiF2dOg" title="How to Download YouTube Videos" />
          <p className="text-sm text-gray-500 italic">
            This will download the best available quality into your current folder.
          </p>
        </section>

        {/* Full Command List */}
        <section id="commands" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <List size={24} className="text-orange-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Full Command List</h2>
          </div>

          <div className="space-y-10">
            {/* Best Quality */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <FileVideo size={20} className="text-blue-400" />
                Download Best Quality (4K/HD)
              </h3>
              <p className="mb-3 text-gray-400">Forces the downloader to merge the best video stream with the best audio stream.</p>
              <CodeBlock
                language="bash"
                code="yt-dlp -f bestvideo+bestaudio <url>"
              />
            </div>

            {/* Audio Only */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <Music size={20} className="text-pink-400" />
                Download Audio (MP3)
              </h3>
              <p className="mb-3 text-gray-400">Extracts audio and converts it to MP3 format.</p>
              <CodeBlock
                language="bash"
                code="yt-dlp -x --audio-format mp3 <url>"
              />
            </div>

            {/* Playlist */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <List size={20} className="text-yellow-400" />
                Download Entire Playlist
              </h3>
              <p className="mb-3 text-gray-400">Downloads every video in a playlist. Use <code>-i</code> to ignore errors.</p>
              <CodeBlock
                language="bash"
                code="yt-dlp -i <playlist_url>"
              />
            </div>

            {/* Custom Folder */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <Folder size={20} className="text-cyan-400" />
                Set Custom Download Folder
              </h3>
              <p className="mb-3 text-gray-400">Save files to a specific location with a specific naming pattern.</p>
              <CodeBlock
                language="bash"
                code='yt-dlp -o "D:/Videos/%(title)s.%(ext)s" <url>'
              />
            </div>

            {/* Subtitles */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <Type size={20} className="text-gray-400" />
                Download Subtitles
              </h3>
              <p className="mb-3 text-gray-400">Downloads English subtitles if available.</p>
              <CodeBlock
                language="bash"
                code='yt-dlp --write-subs --sub-lang "en" <url>'
              />
            </div>

            {/* Thumbnail */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <ImageIcon size={20} className="text-indigo-400" />
                Download Thumbnail
              </h3>
              <p className="mb-3 text-gray-400">Saves the video thumbnail as an image file.</p>
              <CodeBlock
                language="bash"
                code="yt-dlp --write-thumbnail <url>"
              />
            </div>
          </div>
        </section>

        {/* Output Template Guide */}
        <section id="output-template" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
              <Tag size={24} className="text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Output Template Guide</h2>
          </div>
          <p className="mb-4">
            The <code>-o</code> flag is powerful. You can use variables to rename your files automatically.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
              <code className="text-green-400 font-bold">%(title)s</code>
              <p className="text-sm text-gray-400 mt-1">Video Title</p>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
              <code className="text-green-400 font-bold">%(uploader)s</code>
              <p className="text-sm text-gray-400 mt-1">Channel Name</p>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
              <code className="text-green-400 font-bold">%(upload_date)s</code>
              <p className="text-sm text-gray-400 mt-1">Date (YYYYMMDD)</p>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
              <code className="text-green-400 font-bold">%(playlist_index)s</code>
              <p className="text-sm text-gray-400 mt-1">Position in Playlist</p>
            </div>
          </div>
          <p className="mt-4 text-gray-400">Example for organizing by channel:</p>
          <CodeBlock
            language="bash"
            code='yt-dlp -o "C:/YouTube/%(uploader)s/%(title)s.%(ext)s" <url>'
          />
        </section>

        {/* Common Errors */}
        <section id="common-errors" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Common Errors & Fixes</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 mb-2">"ffprobe/ffmpeg not found"</h4>
              <p className="text-gray-400 text-sm mb-3">You are trying to merge audio/video but FFmpeg isn't installed or in your PATH.</p>
              <div className="bg-black/30 p-2 rounded text-sm font-mono text-gray-300">Fix: Run <code>winget install Gyan.FFmpeg</code> and restart terminal.</div>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 mb-2">"Sign in to confirm you’re not a bot"</h4>
              <p className="text-gray-400 text-sm mb-3">YouTube is blocking your IP temporarily.</p>
              <div className="bg-black/30 p-2 rounded text-sm font-mono text-gray-300">Fix: Use cookies from your browser with <code>--cookies-from-browser chrome</code></div>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="mb-16">
          <InfoBox type="warning" title="Legal Disclaimer" icon={Shield}>
            Downloading copyrighted content without permission may violate YouTube's Terms of Service. This guide is for educational purposes and for archiving your own content or Creative Commons videos.
          </InfoBox>
        </section>

        {/* Full Tutorial Video */}
        <section className="mb-16">
           <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <Youtube size={24} className="text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Watch the Full Guide</h2>
           </div>
           <YouTubeEmbed videoId="unqqyJj7j1s" title="Complete yt-dlp Guide: Installation & Usage" />
        </section>

        {/* Conclusion */}
        <section className="mb-20">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Master the Terminal</h3>
            <p className="text-gray-300 mb-6">
              Once you get comfortable with yt-dlp, you'll never go back to sketchy websites. It's the ultimate power tool for video archiving.
            </p>
            <a href="https://www.youtube.com/channel/UCV2ZTkM7UAT6g_Q513dOIoQ?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold transition-colors">
              Subscribe for More Tutorials <ExternalLink size={18} />
            </a>
          </div>
        </section>

        {/* Hidden SEO Keywords */}
        <div className="hidden">
          yt-dlp commands, download YouTube videos terminal, YouTube video downloader CLI, yt-dlp tutorial 2025, download YouTube playlists, windows terminal downloader, best youtube downloader reddit, 4k video downloader free.
        </div>

      </article>
    </div>
  );
}

// Attach image helpers
YtDlpGuidePost.FeaturedImage = YtDlpFeaturedImage;
YtDlpGuidePost.Image = YtDlpCardImage;
YtDlpGuidePost.CardImage = YtDlpCardImage;

// Post metadata
YtDlpGuidePost.info = {
  id: "yt-dlp-guide",
  slug: "yt-dlp-guide",
  title: "How to Download YouTube Videos Using Terminal (yt-dlp Full Guide + Commands 2025)",
  excerpt:
    "The ultimate guide to using yt-dlp. Learn how to download 4K videos, playlists, audio-only, and bypass restrictions using the command line. No ads, no malware, just speed.",
  category: "Dev Tools",
  author: "Dev Kant Kumar",
  readTime: "10 min read",
  image: "/devkantkumar.jpg",
  featuredImage: "/devkantkumar.jpg",
  featured: false,
  publishDate: "2025-11-24",
  modifiedDate: "2025-11-24",
  tags: [
    "yt-dlp",
    "youtube-dl",
    "cli",
    "terminal",
    "video-download",
    "open-source",
    "command-line",
  ],
  faqs: [
    {
      question: "Is yt-dlp free?",
      answer: "Yes, yt-dlp is 100% free and open-source software."
    },
    {
      question: "Is it legal to download YouTube videos?",
      answer: "It depends on your local laws and YouTube's terms of service. Generally, downloading for personal offline use is a gray area, but distributing copyrighted content is illegal."
    },
    {
      question: "How do I update yt-dlp?",
      answer: "Run 'yt-dlp -U' in your terminal."
    }
  ]
};

export default YtDlpGuidePost;
