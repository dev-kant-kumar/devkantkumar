import {
    AlertTriangle,
    Award,
    BookOpen,
    Calendar,
    Check,
    Clock,
    Code,
    Command,
    Copy,
    Cpu,
    Database,
    Download,
    ExternalLink,
    FileVideo,
    Film,
    Folder,
    Globe,
    HelpCircle,
    Layers,
    List,
    Lock,
    MessageSquare,
    Music,
    Play,
    Repeat,
    Search,
    Server,
    Settings,
    Shield,
    ShieldAlert,
    Terminal,
    TrendingUp,
    User,
    Video,
    Youtube,
    Zap
} from "lucide-react";
import React from "react";

function FeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-green-950/30 to-slate-950 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1a0c_1px,transparent_1px),linear-gradient(to_bottom,#0c1a0c_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-[100px]" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-green-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-green-300 text-sm font-medium">1800+ Sites Supported</span>
        </div>
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
        <h1 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">Complete yt-dlp Guide </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-400">2026</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Master video downloads from 1800+ platforms. The most comprehensive guide with 100+ commands, troubleshooting, and advanced techniques.
        </p>
      </div>
    </div>
  );
}

// Thumbnail Image - for search results
function ThumbnailImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-900 to-green-950 flex items-center justify-center relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-green-500/20" />
      <Terminal size={24} className="text-green-400 relative z-10" />
    </div>
  );
}

// Card Image - for blog listing cards
function CardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0B1120] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800/60 hover:border-green-500/50 transition-all duration-500 shadow-2xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-500"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-500 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl flex items-center justify-center mb-4 group-hover:shadow-green-500/20 group-hover:border-green-500/30 transition-all">
          <Terminal size={32} className="text-green-400 group-hover:scale-110 transition-transform duration-500" />
        </div>
        <span className="font-bold text-slate-200 tracking-wide text-sm group-hover:text-green-300 transition-colors">YT-DLP GUIDE</span>
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
    } catch {}
  };

  return (
    <div className="relative my-6 rounded-xl border border-gray-700 bg-[#1e1e1e] overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700">
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <Terminal size={14} className="text-green-400" />
          <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-600 font-mono text-xs">
            {language.toUpperCase()}
          </span>
          {filename && <span className="font-mono text-gray-500 text-xs">{filename}</span>}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors text-xs"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
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
    info: { border: "border-blue-500/20", bg: "bg-blue-950/10", icon: "text-blue-400", title: "text-blue-300" },
    tip: { border: "border-green-500/20", bg: "bg-green-950/10", icon: "text-green-400", title: "text-green-300" },
    warning: { border: "border-yellow-500/20", bg: "bg-yellow-950/10", icon: "text-yellow-400", title: "text-yellow-300" },
    danger: { border: "border-red-500/20", bg: "bg-red-950/10", icon: "text-red-400", title: "text-red-300" },
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`my-6 p-5 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}>
      <div className="flex gap-4">
        {Icon && <Icon size={24} className={`${style.icon} flex-shrink-0 mt-1`} />}
        <div className="flex-1">
          {title && <h4 className={`font-bold text-lg ${style.title} mb-2`}>{title}</h4>}
          <div className="text-gray-300 leading-relaxed text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

function TableOfContents() {
  const sections = [
    { id: "what-is", title: "What is yt-dlp?", icon: HelpCircle },
    { id: "installation", title: "Installation Guide", icon: Download },
    { id: "supported-sites", title: "1800+ Supported Sites", icon: Globe },
    { id: "basic-commands", title: "Basic Commands", icon: Terminal },
    { id: "quality-selection", title: "Quality & Format Selection", icon: Settings },
    { id: "advanced-features", title: "Advanced Features", icon: Zap },
    { id: "authentication", title: "Authentication & Cookies", icon: Lock },
    { id: "playlists", title: "Playlists & Channels", icon: List },
    { id: "sponsorblock", title: "SponsorBlock Integration", icon: Shield },
    { id: "troubleshooting", title: "Troubleshooting", icon: AlertTriangle },
    { id: "performance", title: "Performance Optimization", icon: TrendingUp },
    { id: "faq", title: "FAQ (50+ Questions)", icon: MessageSquare },
  ];

  return (
    <nav className="my-12 p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <BookOpen size={28} className="text-green-400" />
        Table of Contents
      </h2>
      <div className="grid md:grid-cols-2 gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/30 hover:border-green-500/50 transition-all group"
          >
            <section.icon size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-gray-300 group-hover:text-white text-sm">{section.title}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function YtDlpUltimateGuide() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 font-sans selection:bg-green-500/30">
      <FeaturedImage />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8 pb-8 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-green-400" />
            <span>Updated: January 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-green-400" />
            <span>45 min comprehensive read</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-green-400" />
            <span>100+ Commands • Expert Level</span>
          </div>
        </div>

        {/* Quick Answer - For Featured Snippets & High CTR */}
        <section id="is-yt-dlp-working" className="mb-8 p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-xl scroll-mt-24">
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <Check size={24} className="text-green-400" />
            Is yt-dlp Still Working in 2026?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            <strong className="text-green-400">Yes!</strong> yt-dlp is actively maintained with daily updates as of January 2026.
            It's the best tool to download videos from YouTube and 1800+ other sites on Windows, Linux, and macOS.
          </p>
          <div className="bg-black/30 p-4 rounded-lg border border-green-900/50">
            <p className="text-sm text-gray-400 mb-2">If you're getting errors like "Sign in to confirm you're not a bot", run this to fix:</p>
            <code className="text-green-400 font-mono text-sm">yt-dlp --cookies-from-browser chrome URL</code>
          </div>
        </section>

        <TableOfContents />

        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-4xl font-black text-white mb-6">
            yt-dlp Not Working? The Complete Fix & Download Guide (2026)
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Welcome to the most comprehensive yt-dlp guide on the internet. Whether you're getting errors, slow downloads, or just starting out — this guide covers installation, troubleshooting, and 100+ commands that professionals use daily.
          </p>
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl">
              <Globe size={32} className="text-green-400 mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">1800+ Sites</h3>
              <p className="text-gray-400 text-sm">Download from YouTube, TikTok, Instagram, Vimeo, and 1800+ more platforms</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl">
              <Zap size={32} className="text-blue-400 mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">Active Development</h3>
              <p className="text-gray-400 text-sm">Daily updates, bug fixes, and new features added constantly</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl">
              <Shield size={32} className="text-purple-400 mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">100% Free & Open</h3>
              <p className="text-gray-400 text-sm">No ads, no malware, no subscription fees. Pure open-source power</p>
            </div>
          </div>
        </section>

        {/* What is yt-dlp */}
        <section id="what-is" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Command size={24} className="text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">What is yt-dlp?</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            yt-dlp is a feature-rich command-line tool for downloading videos and audio from over 1800 websites. It's a community-maintained fork of youtube-dl, created in early 2021 when the original project became less actively maintained. Since then, it has become the gold standard for video downloading, surpassing its predecessor in every way.
          </p>

          <h3 className="text-2xl font-bold text-white mb-4 mt-8">Why yt-dlp Over youtube-dl?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, title: "Faster Downloads", desc: "Multi-threaded downloads with parallel connections for 5-10x speed improvements" },
              { icon: Settings, title: "Better Format Selection", desc: "Advanced format sorting with support for 8K, HDR10, Dolby Vision, and AV1 codec" },
              { icon: Zap, title: "Active Development", desc: "Daily updates with bug fixes. youtube-dl had months-long gaps between releases" },
              { icon: Shield, title: "SponsorBlock Built-in", desc: "Automatically skip sponsored segments in YouTube videos during download" },
              { icon: Code, title: "Plugin System", desc: "External extractors can be loaded for custom or private platforms" },
              { icon: Cpu, title: "Better Performance", desc: "Optimized codebase with faster regex parsing and improved memory management" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
                <item.icon size={20} className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-white">{item.title}:</strong>
                  <span className="text-gray-400 text-sm ml-2">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <Download size={24} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Installation Guide</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Server size={20} className="text-blue-400" />
                Windows Installation (Multiple Methods)
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Method 1: Winget (Recommended)</h4>
                  <p className="text-gray-400 text-sm mb-3">Automatically adds to PATH, handles updates easily</p>
                  <CodeBlock code="winget install yt-dlp" />
                </div>

                <div>
                  <h4 className="font-bold text-green-400 mb-2">Method 2: Chocolatey</h4>
                  <CodeBlock code="choco install yt-dlp" />
                </div>

                <div>
                  <h4 className="font-bold text-green-400 mb-2">Method 3: Scoop</h4>
                  <CodeBlock code="scoop install yt-dlp" />
                </div>

                <div>
                  <h4 className="font-bold text-green-400 mb-2">Method 4: Python pip</h4>
                  <CodeBlock code="pip install -U yt-dlp" />
                </div>

                <div>
                  <h4 className="font-bold text-green-400 mb-2">Method 5: Direct Binary Download</h4>
                  <p className="text-gray-400 text-sm mb-3">Download from GitHub releases and add to PATH manually</p>
                  <CodeBlock code="# Download yt-dlp.exe from GitHub
# Place in C:\yt-dlp\
# Add C:\yt-dlp to System Environment Variables > Path" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Server size={20} className="text-purple-400" />
                macOS Installation
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Homebrew (Recommended)</h4>
                  <CodeBlock code="brew install yt-dlp" />
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-2">MacPorts</h4>
                  <CodeBlock code="sudo port install yt-dlp" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Server size={20} className="text-orange-400" />
                Linux Installation
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Ubuntu/Debian</h4>
                  <CodeBlock code="sudo apt install yt-dlp" />
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Fedora</h4>
                  <CodeBlock code="sudo dnf install yt-dlp" />
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Arch Linux</h4>
                  <CodeBlock code="sudo pacman -S yt-dlp" />
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Universal (curl)</h4>
                  <CodeBlock code="sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp" />
                </div>
              </div>
            </div>

            <InfoBox type="tip" title="Essential: Install FFmpeg" icon={Layers}>
              <p className="mb-3">FFmpeg is required for merging video+audio streams, format conversions, and post-processing. Almost all advanced features require FFmpeg.</p>
              <div className="space-y-2 bg-black/30 p-3 rounded border border-green-900/30 text-sm">
                <div><strong className="text-green-400">Windows:</strong> <code>winget install Gyan.FFmpeg</code></div>
                <div><strong className="text-green-400">macOS:</strong> <code>brew install ffmpeg</code></div>
                <div><strong className="text-green-400">Linux:</strong> <code>sudo apt install ffmpeg</code></div>
              </div>
            </InfoBox>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Verification</h3>
              <CodeBlock code="yt-dlp --version" />
              <p className="text-gray-400 text-sm mt-2">Expected output: A date like <code>2025.01.15</code></p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Updating yt-dlp</h3>
              <div className="space-y-3">
                <CodeBlock code="# Self-update (for binary installations)
yt-dlp -U

# Update to nightly builds (bleeding edge)
yt-dlp --update-to nightly

# Update via pip
pip install -U yt-dlp" />
              </div>
            </div>
          </div>
        </section>

        {/* Supported Sites */}
        <section id="supported-sites" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Globe size={24} className="text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">1800+ Supported Sites</h2>
          </div>

          <p className="text-gray-300 mb-6">
            yt-dlp supports over 1800 websites across virtually every category. Here's a comprehensive breakdown:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Video size={20} className="text-red-400" />
                Video Streaming Platforms
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>YouTube</strong> (videos, live streams, playlists, channels, Shorts, Music)</li>
                <li>• <strong>Vimeo</strong> (public, private, password-protected)</li>
                <li>• <strong>Dailymotion</strong></li>
                <li>• <strong>Twitch</strong> (VODs, clips, live streams)</li>
                <li>• <strong>Rumble</strong></li>
                <li>• <strong>Odysee/LBRY</strong></li>
              </ul>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-400" />
                Social Media Platforms
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>TikTok</strong> (videos, profiles, hashtags)</li>
                <li>• <strong>Instagram</strong> (posts, stories, reels, IGTV)</li>
                <li>• <strong>Facebook</strong> (videos, live streams)</li>
                <li>• <strong>Twitter/X</strong> (videos, spaces audio)</li>
                <li>• <strong>Reddit</strong> (videos, v.redd.it)</li>
                <li>• <strong>LinkedIn</strong></li>
              </ul>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-green-400" />
                Educational Platforms
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Coursera</strong></li>
                <li>• <strong>Udemy</strong></li>
                <li>• <strong>Khan Academy</strong></li>
                <li>• <strong>LinkedIn Learning</strong></li>
                <li>• <strong>edX</strong></li>
                <li>• <strong>Skillshare</strong></li>
                <li>• <strong>TED Talks</strong></li>
              </ul>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Globe size={20} className="text-yellow-400" />
                Regional Platforms
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Bilibili</strong> (China)</li>
                <li>• <strong>Niconico</strong> (Japan)</li>
                <li>• <strong>VK</strong> (Russia)</li>
                <li>• <strong>Youku</strong> (China)</li>
                <li>• <strong>Naver</strong> (Korea)</li>
                <li>• <strong>Kakao</strong> (Korea)</li>
              </ul>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Film size={20} className="text-pink-400" />
                News & Media
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>CNN, BBC, NBC</strong></li>
                <li>• <strong>The Guardian, New York Times</strong></li>
                <li>• <strong>Reuters, AP News</strong></li>
                <li>• <strong>Conde Nast</strong> (Wired, GQ, Vogue, Vanity Fair)</li>
                <li>• <strong>Vice News</strong></li>
              </ul>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Database size={20} className="text-cyan-400" />
                File Hosting & Others
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Dropbox, Google Drive</strong> (public links)</li>
                <li>• <strong>Archive.org</strong></li>
                <li>• <strong>SoundCloud, Bandcamp</strong></li>
                <li>• <strong>Podcasts</strong> (various providers)</li>
                <li>• <strong>Patreon</strong> (supporter content)</li>
              </ul>
            </div>
          </div>

          <InfoBox type="info" title="View Complete List" icon={Search}>
            To see all 1800+ supported extractors, visit the official GitHub page or run:
            <CodeBlock code="yt-dlp --list-extractors" />
          </InfoBox>
        </section>

        {/* Basic Commands */}
        <section id="basic-commands" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <Terminal size={24} className="text-orange-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Essential Basic Commands</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Play size={20} className="text-green-400" />
                Simple Download
              </h3>
              <p className="text-gray-400 mb-3 text-sm">Downloads best available quality (video+audio merged)</p>
              <CodeBlock code='yt-dlp "https://www.youtube.com/watch?v=VIDEO_ID"' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Music size={20} className="text-pink-400" />
                Audio Extraction
              </h3>
              <CodeBlock code='# Extract as MP3
yt-dlp -x --audio-format mp3 URL

# Extract as M4A (better quality)
yt-dlp -x --audio-format m4a URL

# Extract as FLAC (lossless)
yt-dlp -x --audio-format flac URL

# Best audio quality (no conversion)
yt-dlp -f bestaudio URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <FileVideo size={20} className="text-blue-400" />
                Video Quality Selection
              </h3>
              <CodeBlock code='# Best overall quality
yt-dlp -f "bestvideo+bestaudio" URL

# Specific resolution
yt-dlp -f "bestvideo[height<=1080]+bestaudio" URL

# 4K video
yt-dlp -f "bestvideo[height<=2160]+bestaudio" URL

# 8K video (if available)
yt-dlp -f "bestvideo[height<=4320]+bestaudio" URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <List size={20} className="text-yellow-400" />
                Playlist Downloads
              </h3>
              <CodeBlock code='# Download entire playlist
yt-dlp -i PLAYLIST_URL

# Download from specific index
yt-dlp --playlist-start 5 PLAYLIST_URL

# Download range
yt-dlp --playlist-start 10 --playlist-end 20 PLAYLIST_URL

# Download with playlist position in filename
yt-dlp -o "%(playlist_index)s - %(title)s.%(ext)s" PLAYLIST_URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Folder size={20} className="text-cyan-400" />
                Custom Output Paths
              </h3>
              <CodeBlock code='# Save to specific folder
yt-dlp -o "D:/Videos/%(title)s.%(ext)s" URL

# Organize by uploader
yt-dlp -o "~/Downloads/%(uploader)s/%(title)s.%(ext)s" URL

# Organize by date
yt-dlp -o "Videos/%(upload_date)s/%(title)s.%(ext)s" URL

# Complex template
yt-dlp -o "%(uploader)s/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" URL' />
            </div>
          </div>
        </section>

        {/* Quality & Format Selection */}
        <section id="quality-selection" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <Settings size={24} className="text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Advanced Quality & Format Selection</h2>
          </div>

          <p className="text-gray-300 mb-6">Master the art of format selection to get exactly what you want. Understanding format codes is key to unlocking yt-dlp's full power.</p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">List Available Formats</h3>
              <CodeBlock code="yt-dlp -F URL" />
              <p className="text-gray-400 text-sm mt-2">This shows all available video and audio streams with their IDs, resolutions, codecs, and file sizes</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Format Selection Examples</h3>
              <CodeBlock code='# Download specific format by ID
yt-dlp -f 137+140 URL

# Best video with VP9 codec + best audio
yt-dlp -f "bestvideo[vcodec^=vp9]+bestaudio" URL

# Best 1080p or lower
yt-dlp -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" URL

# Prefer 60fps
yt-dlp -f "bestvideo[fps>=60]+bestaudio" URL

# HDR video
yt-dlp -f "bestvideo[vcodec*=hev1]+bestaudio" URL

# AV1 codec (modern, efficient)
yt-dlp -f "bestvideo[vcodec^=av01]+bestaudio" URL

# Best MP4 format (for compatibility)
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]" URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Understanding Format Specifiers</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { code: "bestvideo", desc: "Best quality video-only stream" },
                  { code: "bestaudio", desc: "Best quality audio-only stream" },
                  { code: "best", desc: "Best quality single-file format" },
                  { code: "worst", desc: "Lowest quality format" },
                  { code: "[height<=1080]", desc: "Filter by max resolution" },
                  { code: "[fps>=60]", desc: "Filter by framerate" },
                  { code: "[vcodec^=vp9]", desc: "Filter by video codec" },
                  { code: "[acodec=opus]", desc: "Filter by audio codec" },
                  { code: "[filesize<100M]", desc: "Filter by file size" },
                  { code: "[ext=mp4]", desc: "Filter by container format" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-800">
                    <code className="text-green-400 font-bold text-sm">{item.code}</code>
                    <p className="text-gray-400 text-xs mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <InfoBox type="tip" title="Pro Tip: Format Selection Strategy" icon={Award}>
              <p className="mb-2">For best results, always use format selection that merges separate streams:</p>
              <code className="block bg-black/40 p-2 rounded text-sm text-green-300">-f "bestvideo+bestaudio"</code>
              <p className="mt-3">YouTube stores high-quality videos and audio separately. Merging them gives you the best possible quality. Requires FFmpeg!</p>
            </InfoBox>
          </div>
        </section>

        {/* Advanced Features */}
        <section id="advanced-features" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Zap size={24} className="text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Advanced Features & Options</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Subtitle Downloads</h3>
              <CodeBlock code='# Download all available subtitles
yt-dlp --write-subs --sub-langs all URL

# Download specific language
yt-dlp --write-subs --sub-lang en URL

# Auto-generated subtitles
yt-dlp --write-auto-subs --sub-lang en URL

# Embed subtitles in video
yt-dlp --embed-subs --sub-lang en URL

# Download subtitle only (no video)
yt-dlp --skip-download --write-subs URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Thumbnail Operations</h3>
              <CodeBlock code='# Download thumbnail
yt-dlp --write-thumbnail URL

# Embed thumbnail in audio file
yt-dlp --embed-thumbnail -x --audio-format mp3 URL

# Convert thumbnail to jpg
yt-dlp --write-thumbnail --convert-thumbnails jpg URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Metadata & Description</h3>
              <CodeBlock code='# Embed metadata in file
yt-dlp --embed-metadata URL

# Write description to file
yt-dlp --write-description URL

# Write info json
yt-dlp --write-info-json URL

# Write all metadata
yt-dlp --write-info-json --write-description --write-annotations URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Post-Processing</h3>
              <CodeBlock code='# Convert to MP4
yt-dlp --recode-video mp4 URL

# Re-encode audio
yt-dlp --audio-quality 0 -x --audio-format mp3 URL

# Remove sponsor segments (SponsorBlock)
yt-dlp --sponsorblock-remove all URL

# Split chapters into separate files
yt-dlp --split-chapters URL

# Add chapters from description
yt-dlp --no-embed-chapters URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Network & Download Control</h3>
              <CodeBlock code='# Limit download speed
yt-dlp --limit-rate 1M URL

# Use multiple connections (aria2c)
yt-dlp --external-downloader aria2c --external-downloader-args "-x 16 -k 1M" URL

# Use proxy
yt-dlp --proxy socks5://127.0.0.1:9050 URL

# Retry on failure
yt-dlp --retries 10 URL

# Set timeout
yt-dlp --socket-timeout 30 URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Batch Downloads</h3>
              <CodeBlock code='# Download from URL list
yt-dlp -a urls.txt

# Download archive (skip already downloaded)
yt-dlp --download-archive archive.txt URL

# Continue incomplete downloads
yt-dlp --continue URL

# Ignore errors and continue
yt-dlp -i URL' />
            </div>
          </div>
        </section>

        {/* Authentication & Cookies */}
        <section id="authentication" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <Lock size={24} className="text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Authentication & Cookie Management</h2>
          </div>

          <p className="text-gray-300 mb-6">
            For age-restricted, member-only, or private videos, you need to authenticate. Here are all the methods:
          </p>

          <div className="space-y-8">
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap size={20} className="text-blue-400" />
                Method 1: Browser Cookies (Easiest)
              </h3>
              <p className="text-gray-300 mb-4">yt-dlp can extract cookies directly from your browser</p>
              <CodeBlock code='# Chrome/Chromium
yt-dlp --cookies-from-browser chrome URL

# Firefox
yt-dlp --cookies-from-browser firefox URL

# Edge
yt-dlp --cookies-from-browser edge URL

# Safari
yt-dlp --cookies-from-browser safari URL

# Brave
yt-dlp --cookies-from-browser brave URL' />
              <InfoBox type="warning" title="Browser Lock Issue" icon={AlertTriangle}>
                If you get "database is locked" errors, close your browser completely before running the command.
              </InfoBox>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-900/20 to-emerald-800/20 border border-green-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Download size={20} className="text-green-400" />
                Method 2: Cookie File Export
              </h3>
              <p className="text-gray-300 mb-4">Best for servers/VPS or when Method 1 fails</p>
              <div className="space-y-4">
                <div>
                  <p className="text-white font-bold mb-2">Step 1: Install Browser Extension</p>
                  <p className="text-gray-300 text-sm">Install "Get cookies.txt LOCALLY" extension</p>
                </div>
                <div>
                  <p className="text-white font-bold mb-2">Step 2: Export Cookies</p>
                  <p className="text-gray-300 text-sm">Visit YouTube (logged in), click extension, export to cookies.txt</p>
                </div>
                <div>
                  <p className="text-white font-bold mb-2">Step 3: Use Cookie File</p>
                  <CodeBlock code="yt-dlp --cookies cookies.txt URL" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-800/20 border border-purple-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User size={20} className="text-purple-400" />
                Method 3: Username/Password (Not Recommended)
              </h3>
              <CodeBlock code='# Direct login (less secure)
yt-dlp -u username -p password URL

# Use netrc file (better)
yt-dlp --netrc URL' />
              <InfoBox type="danger" title="Security Warning" icon={ShieldAlert}>
                Storing passwords in command history is insecure. Prefer cookie-based methods or use --netrc with a protected .netrc file.
              </InfoBox>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Two-Factor Authentication</h3>
              <CodeBlock code='# If 2FA is enabled
yt-dlp -u username -p password --twofactor CODE URL

# Or use cookies (recommended)
yt-dlp --cookies-from-browser chrome URL' />
            </div>
          </div>
        </section>

        {/* SponsorBlock */}
        <section id="sponsorblock" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <Shield size={24} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">SponsorBlock Integration</h2>
          </div>

          <p className="text-gray-300 mb-6">
            SponsorBlock is a crowdsourced database of sponsor segments in YouTube videos. yt-dlp can automatically skip or remove these segments!
          </p>

          <div className="space-y-6">
            <CodeBlock code='# Mark sponsor segments (adds chapters)
yt-dlp --sponsorblock-mark all URL

# Remove sponsor segments entirely
yt-dlp --sponsorblock-remove all URL

# Remove specific categories
yt-dlp --sponsorblock-remove sponsor,selfpromo URL

# Mark specific categories
yt-dlp --sponsorblock-mark intro,outro,sponsor URL

# Get SponsorBlock info without downloading
yt-dlp --print-json --sponsorblock-mark all URL' />

            <div>
              <h3 className="text-xl font-bold text-white mb-3">SponsorBlock Categories</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: "sponsor", desc: "Paid promotion" },
                  { name: "intro", desc: "Intermission/Intro Animation" },
                  { name: "outro", desc: "Endcards/Credits" },
                  { name: "selfpromo", desc: "Self-promotion" },
                  { name: "interaction", desc: "Interaction Reminder (Subscribe)" },
                  { name: "music_offtopic", desc: "Non-Music Section in Music Videos" },
                  { name: "preview", desc: "Preview/Recap" },
                  { name: "filler", desc: "Filler Tangent" },
                ].map((cat, i) => (
                  <div key={i} className="bg-[#1e1e1e] p-3 rounded border border-gray-800">
                    <code className="text-green-400 text-sm font-bold">{cat.name}</code>
                    <p className="text-gray-400 text-xs mt-1">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <InfoBox type="tip" title="SponsorBlock + Best Quality" icon={Award}>
              Combine SponsorBlock with quality selection for the ultimate experience:
              <CodeBlock code='yt-dlp -f "bestvideo+bestaudio" --sponsorblock-remove all --embed-subs URL' />
            </InfoBox>
          </div>
        </section>

        {/* Playlists & Channels */}
        <section id="playlists" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <List size={24} className="text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Mastering Playlists & Channels</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Playlist Downloads</h3>
              <CodeBlock code='# Download entire playlist
yt-dlp -i PLAYLIST_URL

# Download only videos 5-10
yt-dlp --playlist-start 5 --playlist-end 10 URL

# Download latest 5 videos
yt-dlp --playlist-end 5 URL

# Reverse order (oldest first)
yt-dlp --playlist-reverse URL

# Random order
yt-dlp --playlist-random URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Channel Downloads</h3>
              <CodeBlock code='# Download all videos from channel
yt-dlp "https://www.youtube.com/@channelname/videos"

# Download only Shorts
yt-dlp "https://www.youtube.com/@channelname/shorts"

# Download only Streams
yt-dlp "https://www.youtube.com/@channelname/streams"

# Download only Playlists
yt-dlp "https://www.youtube.com/@channelname/playlists"' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Filtering by Date</h3>
              <CodeBlock code='# Videos uploaded after specific date
yt-dlp --dateafter 20240101 URL

# Videos uploaded before specific date
yt-dlp --datebefore 20241231 URL

# Videos from date range
yt-dlp --dateafter 20240101 --datebefore 20240630 URL

# Only videos from this year
yt-dlp --dateafter now-1year URL' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Advanced Playlist Organization</h3>
              <CodeBlock code='# Organize by playlist and index
yt-dlp -o "%(playlist)s/%(playlist_index)02d - %(title)s.%(ext)s" URL

# Include uploader in path
yt-dlp -o "%(uploader)s/%(playlist)s/%(title)s.%(ext)s" URL

# Separate audio and video playlists
yt-dlp -o "Music/%(title)s.%(ext)s" -x --audio-format mp3 MUSIC_PLAYLIST
yt-dlp -o "Videos/%(title)s.%(ext)s" VIDEO_PLAYLIST' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Download Archive (Skip Downloaded)</h3>
              <CodeBlock code='# Create download archive
yt-dlp --download-archive downloaded.txt URL

# Skip already downloaded videos
yt-dlp --download-archive downloaded.txt PLAYLIST_URL

# Useful for regularly updated playlists
yt-dlp --download-archive archive.txt "https://www.youtube.com/@channel/videos"' />
              <InfoBox type="tip" title="Pro Tip: Automation" icon={Zap}>
                Use --download-archive with scheduled tasks (cron/Task Scheduler) to automatically download new videos from your favorite channels!
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Common Issues & Solutions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 text-lg mb-3">Error: "yt-dlp is not recognized"</h4>
              <p className="text-gray-300 mb-3">yt-dlp is not in your system PATH</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong className="text-white">Solution 1:</strong> Restart your terminal after installation</p>
                <p><strong className="text-white">Solution 2:</strong> Add yt-dlp folder to System Environment Variables → Path</p>
                <p><strong className="text-white">Solution 3:</strong> Use full path: <code>C:\path\to\yt-dlp.exe URL</code></p>
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 text-lg mb-3">Error: "ffprobe/ffmpeg not found"</h4>
              <p className="text-gray-300 mb-3">FFmpeg is not installed or not in PATH</p>
              <CodeBlock code='# Install FFmpeg
# Windows: winget install Gyan.FFmpeg
# macOS: brew install ffmpeg
# Linux: sudo apt install ffmpeg' />
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 text-lg mb-3">Error: "Sign in to confirm you're not a bot"</h4>
              <p className="text-gray-300 mb-3">YouTube is blocking your IP / requires authentication</p>
              <CodeBlock code='# Solution: Use cookies
yt-dlp --cookies-from-browser chrome URL

# Or use cookie file
yt-dlp --cookies cookies.txt URL' />
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 text-lg mb-3">Error: "Unable to extract video data"</h4>
              <p className="text-gray-300 mb-3">yt-dlp is outdated or site structure changed</p>
              <CodeBlock code='# Update yt-dlp
yt-dlp -U

# Try nightly build
yt-dlp --update-to nightly' />
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 text-lg mb-3">Error: "Requested format not available"</h4>
              <p className="text-gray-300 mb-3">The format you specified doesn't exist</p>
              <CodeBlock code='# List available formats first
yt-dlp -F URL

# Then select appropriate format
yt-dlp -f FORMAT_ID URL' />
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 text-lg mb-3">Slow Download Speeds</h4>
              <p className="text-gray-300 mb-3">YouTube throttling or single-threaded download</p>
              <CodeBlock code='# Use aria2c for multi-connection downloads
yt-dlp --external-downloader aria2c --external-downloader-args "-x 16 -k 1M" URL

# Install aria2c first:
# Windows: winget install aria2
# macOS: brew install aria2
# Linux: sudo apt install aria2' />
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 text-lg mb-3">Database Locked (Cookie Extraction)</h4>
              <p className="text-gray-300 mb-3">Browser is still running</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong className="text-white">Solution:</strong> Close your browser completely, then run:</p>
                <CodeBlock code="yt-dlp --cookies-from-browser chrome URL" />
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
              <h4 className="font-bold text-red-400 text-lg mb-3">Age-Restricted / Private Video Error</h4>
              <p className="text-gray-300 mb-3">Need authentication</p>
              <CodeBlock code='# Method 1: Browser cookies
yt-dlp --cookies-from-browser chrome URL

# Method 2: Cookie file
yt-dlp --cookies cookies.txt URL' />
            </div>
          </div>
        </section>

        {/* Performance Optimization */}
        <section id="performance" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <TrendingUp size={24} className="text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Performance Optimization Tips</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-6 rounded-xl border border-green-500/30">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Zap size={20} className="text-green-400" />
                Use External Downloader
              </h3>
              <p className="text-gray-300 text-sm mb-3">aria2c provides 5-10x faster downloads</p>
              <CodeBlock code='yt-dlp --external-downloader aria2c \\
  --external-downloader-args "-x 16 -k 1M" URL' />
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-6 rounded-xl border border-blue-500/30">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Database size={20} className="text-blue-400" />
                Concurrent Downloads
              </h3>
              <p className="text-gray-300 text-sm mb-3">Download multiple videos simultaneously</p>
              <CodeBlock code='# Download 4 videos concurrently
yt-dlp --concurrent-fragments 4 URL

# Or use GNU parallel
parallel -j 4 yt-dlp :::: urls.txt' />
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-purple-500/30">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Settings size={20} className="text-purple-400" />
                Optimize File Size
              </h3>
              <p className="text-gray-300 text-sm mb-3">Balance quality and file size</p>
              <CodeBlock code='# Use efficient codecs
yt-dlp -f "bestvideo[vcodec^=av01]+bestaudio" URL

# Limit resolution
yt-dlp -f "bestvideo[height<=1080]+bestaudio" URL' />
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-6 rounded-xl border border-orange-500/30">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Server size={20} className="text-orange-400" />
                Bypass Throttling
              </h3>
              <p className="text-gray-300 text-sm mb-3">Avoid YouTube's speed limits</p>
              <CodeBlock code='# Use different IP (VPN/Proxy)
yt-dlp --proxy socks5://proxy:port URL

# Rotate user agent
yt-dlp --user-agent "Mozilla/5.0..." URL' />
            </div>
          </div>
        </section>

        {/* FAQ Section - 50+ Questions */}
        <section id="faq" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <MessageSquare size={24} className="text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions (50+)</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <Download size={20} /> Installation & Setup
            </h3>

            {[
              {
                q: "Is yt-dlp free?",
                a: "Yes, 100% free and open-source under the Unlicense license."
              },
              {
                q: "Which is better: yt-dlp or youtube-dl?",
                a: "yt-dlp is significantly better - it's actively maintained, faster, has more features, better format selection, and SponsorBlock integration."
              },
              {
                q: "Do I need Python installed?",
                a: "No, if you use the standalone binary. Python is only required if installing via pip."
              },
              {
                q: "Why is FFmpeg required?",
                a: "FFmpeg merges separate video/audio streams, converts formats, and handles post-processing. Without it, you can't get high-quality merged downloads."
              },
              {
                q: "How do I update yt-dlp?",
                a: "Run: yt-dlp -U (for binary) or pip install -U yt-dlp (for pip installation)"
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <Terminal size={20} /> Usage & Commands
            </h3>

            {[
              {
                q: "How do I download 4K videos?",
                a: 'Use: yt-dlp -f "bestvideo[height<=2160]+bestaudio" URL - This downloads 4K quality and merges with best audio.'
              },
              {
                q: "How do I download only audio as MP3?",
                a: "Use: yt-dlp -x --audio-format mp3 URL"
              },
              {
                q: "Can I download entire playlists?",
                a: "Yes! Use: yt-dlp -i PLAYLIST_URL (the -i flag ignores errors for private/deleted videos)"
              },
              {
                q: "How do I download videos from Instagram/TikTok?",
                a: "Same as YouTube! Just paste the URL: yt-dlp URL - yt-dlp supports 1800+ sites automatically."
              },
              {
                q: "How do I save videos to a specific folder?",
                a: 'Use: yt-dlp -o "D:/Videos/%(title)s.%(ext)s" URL'
              },
              {
                q: "How do I download subtitles?",
                a: "Use: yt-dlp --write-subs --sub-lang en URL (or --embed-subs to embed them in the video)"
              },
              {
                q: "Can I download live streams?",
                a: "Yes! yt-dlp can record ongoing live streams. Just paste the live stream URL."
              },
              {
                q: "How do I limit download speed?",
                a: "Use: yt-dlp --limit-rate 1M URL (limits to 1MB/s)"
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <Lock size={20} /> Authentication & Access
            </h3>

            {[
              {
                q: "How do I download age-restricted videos?",
                a: 'Use cookies: yt-dlp --cookies-from-browser chrome URL'
              },
              {
                q: "How do I download member-only YouTube videos?",
                a: "Use cookies from your logged-in browser: yt-dlp --cookies-from-browser chrome URL"
              },
              {
                q: "What are cookies and why do I need them?",
                a: "Cookies are your login session data. They prove to YouTube that you're logged in and have access to restricted content."
              },
              {
                q: "Is it safe to use cookies?",
                a: "Yes, but keep your cookies.txt file private - it contains your login session. Don't share it."
              },
              {
                q: "Can I download private Vimeo videos?",
                a: "Yes, if you have access. Use: yt-dlp --cookies-from-browser chrome VIMEO_URL"
              },
              {
                q: "How do I handle two-factor authentication?",
                a: "Use cookies-from-browser method - it bypasses the need for 2FA since you're already logged in."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <AlertTriangle size={20} /> Troubleshooting
            </h3>

            {[
              {
                q: "Why is download so slow?",
                a: "YouTube throttles single-threaded downloads. Use aria2c: yt-dlp --external-downloader aria2c --external-downloader-args '-x 16' URL"
              },
              {
                q: "Error: 'database is locked' when using cookies",
                a: "Close your browser completely before running yt-dlp --cookies-from-browser"
              },
              {
                q: "Error: 'Sign in to confirm you're not a bot'",
                a: "YouTube is blocking you. Use cookies: yt-dlp --cookies-from-browser chrome URL"
              },
              {
                q: "Video and audio are separate files - how to merge?",
                a: "Install FFmpeg and use: yt-dlp -f 'bestvideo+bestaudio' URL - it will auto-merge."
              },
              {
                q: "Why does yt-dlp fail on some videos?",
                a: "Update yt-dlp (run yt-dlp -U) or try nightly: yt-dlp --update-to nightly"
              },
              {
                q: "How do I fix 'Unable to extract video data'?",
                a: "Update yt-dlp to the latest version: yt-dlp -U"
              },
              {
                q: "Can't download from a specific site - what to do?",
                a: "Check if the site is supported: yt-dlp --list-extractors | grep sitename"
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <Settings size={20} /> Advanced Features
            </h3>

            {[
              {
                q: "How do I remove sponsored segments automatically?",
                a: "Use SponsorBlock: yt-dlp --sponsorblock-remove all URL"
              },
              {
                q: "Can I download a YouTube channel?",
                a: "Yes! yt-dlp 'https://www.youtube.com/@channelname/videos'"
              },
              {
                q: "How do I avoid re-downloading videos?",
                a: "Use download archive: yt-dlp --download-archive archive.txt URL"
              },
              {
                q: "Can I download thumbnails separately?",
                a: "Yes: yt-dlp --write-thumbnail --skip-download URL"
              },
              {
                q: "How do I embed metadata in files?",
                a: "Use: yt-dlp --embed-metadata --embed-thumbnail --embed-subs URL"
              },
              {
                q: "Can I download only new videos from a playlist?",
                a: "Yes, use --download-archive to track what's downloaded, then run periodically."
              },
              {
                q: "How do I split videos by chapters?",
                a: "Use: yt-dlp --split-chapters URL"
              },
              {
                q: "Can I download videos uploaded after a specific date?",
                a: "Yes: yt-dlp --dateafter 20240101 CHANNEL_URL"
              },
              {
                q: "How do I use a proxy?",
                a: "Use: yt-dlp --proxy socks5://proxy:port URL"
              },
              {
                q: "Can I automate daily downloads?",
                a: "Yes! Use cron (Linux/Mac) or Task Scheduler (Windows) with --download-archive."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <Shield size={20} /> Legal & Ethics
            </h3>

            {[
              {
                q: "Is it legal to use yt-dlp?",
                a: "yt-dlp itself is legal. However, downloading copyrighted content without permission may violate terms of service or local laws."
              },
              {
                q: "Can I get banned from YouTube?",
                a: "YouTube's Terms of Service prohibit downloading, but enforcement varies. Use responsibly and for personal/educational purposes."
              },
              {
                q: "What content is safe to download?",
                a: "Your own videos, Creative Commons content, public domain material, or content you have explicit permission to download."
              },
              {
                q: "Can I distribute downloaded videos?",
                a: "Generally no, unless the content is explicitly licensed for redistribution (like Creative Commons)."
              },
              {
                q: "Is yt-dlp safe from malware?",
                a: "Yes, when downloaded from official sources (GitHub, official website). Never download from third-party sites."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <Code size={20} /> Platform-Specific
            </h3>

            {[
              {
                q: "Can yt-dlp download Instagram stories?",
                a: "Yes, but you need to be logged in: yt-dlp --cookies-from-browser chrome INSTAGRAM_URL"
              },
              {
                q: "Does yt-dlp work with TikTok?",
                a: "Yes! Just paste the TikTok URL. No watermarks are removed automatically."
              },
              {
                q: "Can I download Twitter/X videos?",
                a: "Yes, yt-dlp supports Twitter/X videos natively."
              },
              {
                q: "Does it work with Facebook videos?",
                a: "Yes, including Facebook Live streams."
              },
              {
                q: "Can I download Twitch VODs?",
                a: "Yes! Twitch streams, clips, and VODs are fully supported."
              },
              {
                q: "Does yt-dlp work with Reddit videos?",
                a: "Yes, v.redd.it links are supported."
              },
              {
                q: "Can I download from Netflix/Disney+?",
                a: "No. These are DRM-protected paid services and downloading violates their terms."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Configuration File */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Settings size={24} className="text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Creating a Configuration File</h2>
          </div>

          <p className="text-gray-300 mb-6">
            Tired of typing the same options? Create a config file to set your default preferences!
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Config File Location</h3>
              <div className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-800 space-y-2 text-sm">
                <div><strong className="text-green-400">Windows:</strong> <code>%APPDATA%/yt-dlp/config.txt</code></div>
                <div><strong className="text-green-400">Linux:</strong> <code>~/.config/yt-dlp/config</code></div>
                <div><strong className="text-green-400">macOS:</strong> <code>~/Library/Preferences/yt-dlp/config</code></div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Example Configuration</h3>
              <CodeBlock code='# Output template
-o "~/Downloads/%(uploader)s/%(title)s.%(ext)s"

# Always download best quality
-f "bestvideo+bestaudio"

# Embed metadata
--embed-metadata
--embed-thumbnail
--embed-subs

# Download subtitles
--write-subs
--sub-lang en

# SponsorBlock
--sponsorblock-remove all

# Ignore errors
-i

# Use aria2c
--external-downloader aria2c
--external-downloader-args "-x 16 -k 1M"

# Cookie handling
--cookies-from-browser chrome' />
            </div>

            <InfoBox type="tip" title="Override Config Options" icon={Command}>
              You can override config file options by specifying them on the command line. Command-line options always take precedence over config file settings.
            </InfoBox>
          </div>
        </section>

        {/* Automation Examples */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
              <Repeat size={24} className="text-pink-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Automation & Scripting</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Batch Script for Windows</h3>
              <CodeBlock language="batch" code='@echo off
echo Downloading videos from channels...

yt-dlp --download-archive archive.txt ^
  -o "Videos/%%(uploader)s/%%(title)s.%%(ext)s" ^
  -f "bestvideo+bestaudio" ^
  --sponsorblock-remove all ^
  "https://www.youtube.com/@channel1/videos" ^
  "https://www.youtube.com/@channel2/videos"

echo Done!
pause' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Bash Script for Linux/Mac</h3>
              <CodeBlock language="bash" code='#!/bin/bash

# Download from multiple channels
channels=(
  "https://www.youtube.com/@channel1/videos"
  "https://www.youtube.com/@channel2/videos"
  "https://www.youtube.com/@channel3/videos"
)

for channel in "${channels[@]}"; do
  yt-dlp --download-archive archive.txt \\
    -o "~/Videos/%(uploader)s/%(title)s.%(ext)s" \\
    -f "bestvideo+bestaudio" \\
    --sponsorblock-remove all \\
    "$channel"
done

echo "All downloads complete!"' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Cron Job (Auto-download daily)</h3>
              <CodeBlock language="bash" code='# Edit crontab
crontab -e

# Add this line (runs daily at 2 AM)
0 2 * * * /usr/local/bin/yt-dlp --download-archive ~/archive.txt -o "~/Videos/%(title)s.%(ext)s" "https://www.youtube.com/@channel/videos"' />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Windows Task Scheduler</h3>
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
                <ol className="space-y-3 text-gray-300 text-sm list-decimal list-inside">
                  <li>Open Task Scheduler</li>
                  <li>Create Basic Task</li>
                  <li>Set trigger (e.g., Daily at 2:00 AM)</li>
                  <li>Action: Start a program</li>
                  <li>Program: <code className="bg-black/40 px-2 py-1 rounded text-green-400">yt-dlp</code></li>
                  <li>Arguments: <code className="bg-black/40 px-2 py-1 rounded text-green-400">--download-archive archive.txt -o "Videos/%(title)s.%(ext)s" URL</code></li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Use Cases */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
              <Award size={24} className="text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Advanced Use Cases & Pro Tips</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">🎓 Archive Educational Content</h3>
              <CodeBlock code='# Download entire course playlists with organized structure
yt-dlp --download-archive coursera-archive.txt \\
  -o "Courses/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" \\
  --write-subs --embed-subs \\
  --embed-metadata \\
  COURSE_PLAYLIST_URL' />
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-6 rounded-xl border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4">🎵 Build Music Library from YouTube</h3>
              <CodeBlock code='# Extract high-quality audio with embedded artwork
yt-dlp -x --audio-format m4a \\
  --audio-quality 0 \\
  --embed-thumbnail \\
  --embed-metadata \\
  --add-metadata \\
  -o "Music/%(artist)s/%(album)s/%(track_number)s - %(title)s.%(ext)s" \\
  MUSIC_PLAYLIST_URL' />
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-6 rounded-xl border border-green-500/30">
              <h3 className="text-xl font-bold text-white mb-4">📺 Download Entire TV Series/Documentary</h3>
              <CodeBlock code='# Download with episode numbering
yt-dlp -o "Shows/%(series)s/Season %(season_number)s/%(series)s - S%(season_number)sE%(episode_number)s - %(title)s.%(ext)s" \\
  -f "bestvideo[height<=1080]+bestaudio" \\
  --embed-metadata \\
  SERIES_PLAYLIST_URL' />
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-6 rounded-xl border border-orange-500/30">
              <h3 className="text-xl font-bold text-white mb-4">🎮 Download Gaming VODs from Twitch</h3>
              <CodeBlock code='# Download Twitch VOD with chat replay
yt-dlp -f "best" \\
  --write-thumbnail \\
  --embed-metadata \\
  -o "Twitch/%(uploader)s/%(title)s.%(ext)s" \\
  TWITCH_VOD_URL' />
            </div>

            <div className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 p-6 rounded-xl border border-yellow-500/30">
              <h3 className="text-xl font-bold text-white mb-4">📱 Download TikTok Without Watermark</h3>
              <CodeBlock code='# TikTok download (watermark depends on format availability)
yt-dlp -f "best" \\
  -o "TikTok/%(uploader)s/%(title)s.%(ext)s" \\
  TIKTOK_URL' />
            </div>
          </div>
        </section>

        {/* Resources & Links */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gray-500/10 border border-gray-500/20">
              <ExternalLink size={24} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Official Resources</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors group">
              <Code size={24} className="text-green-400" />
              <div>
                <div className="text-white font-bold group-hover:text-green-400">GitHub Repository</div>
                <div className="text-gray-400 text-xs">Source code & latest releases</div>
              </div>
            </a>

            <a href="https://github.com/yt-dlp/yt-dlp#readme" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors group">
              <BookOpen size={24} className="text-blue-400" />
              <div>
                <div className="text-white font-bold group-hover:text-green-400">Official Documentation</div>
                <div className="text-gray-400 text-xs">Complete command reference</div>
              </div>
            </a>

            <a href="https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors group">
              <Globe size={24} className="text-purple-400" />
              <div>
                <div className="text-white font-bold group-hover:text-green-400">Supported Sites List</div>
                <div className="text-gray-400 text-xs">All 1800+ supported platforms</div>
              </div>
            </a>

            <a href="https://github.com/yt-dlp/yt-dlp/issues" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[#1e1e1e] rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors group">
              <MessageSquare size={24} className="text-orange-400" />
              <div>
                <div className="text-white font-bold group-hover:text-green-400">Report Issues</div>
                <div className="text-gray-400 text-xs">Bug reports & feature requests</div>
              </div>
            </a>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <InfoBox type="warning" title="Legal Disclaimer & Responsible Use" icon={Shield}>
          <div className="space-y-3 text-sm">
            <p>This guide is for educational purposes. Users are responsible for complying with:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>YouTube's Terms of Service and platform policies</li>
              <li>Copyright laws in their jurisdiction</li>
              <li>Fair use guidelines and content licensing</li>
            </ul>
            <p className="mt-3"><strong>Recommended uses:</strong> Archiving your own content, downloading Creative Commons material, educational purposes with proper attribution, or content you have explicit permission to download.</p>
          </div>
        </InfoBox>

        {/* Conclusion */}
        <section className="mb-16">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">You're Now a yt-dlp Expert! 🎉</h2>
            <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
              You've learned everything from basic downloads to advanced automation. yt-dlp is an incredibly powerful tool - use it wisely and responsibly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#top" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold transition-colors inline-flex items-center gap-2">
                Back to Top <ExternalLink size={18} />
              </a>
              <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-bold transition-colors inline-flex items-center gap-2">
                Star on GitHub <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* SEO Keywords (Hidden) */}
        <div className="hidden" aria-hidden="true">
          yt-dlp tutorial, yt-dlp commands, download youtube videos command line, yt-dlp guide 2026, youtube downloader cli, best video downloader, yt-dlp vs youtube-dl, yt-dlp installation windows, yt-dlp 4k download, download instagram videos, download tiktok videos, yt-dlp sponsorblock, yt-dlp cookies authentication, yt-dlp playlist download, yt-dlp format selection, yt-dlp ffmpeg, yt-dlp audio extraction, yt-dlp mp3 download, yt-dlp subtitle download, yt-dlp channel download, yt-dlp download archive, yt-dlp automation, yt-dlp config file, yt-dlp aria2c, yt-dlp external downloader, yt-dlp twitch download, yt-dlp reddit download, yt-dlp facebook download, yt-dlp proxy, yt-dlp age restricted, yt-dlp member only, yt-dlp private video, yt-dlp troubleshooting, yt-dlp not recognized error, yt-dlp database locked, yt-dlp bot error, yt-dlp slow download fix, yt-dlp best quality, yt-dlp 8k download, yt-dlp hdr download, yt-dlp av1 codec, yt-dlp vp9 codec, yt-dlp metadata embed, yt-dlp thumbnail download, yt-dlp chapter split, yt-dlp date filter, yt-dlp batch download, youtube video downloader 2026, free youtube downloader command line, yt-dlp linux installation, yt-dlp mac installation, yt-dlp update command, yt-dlp nightly build, how to use yt-dlp, yt-dlp beginner guide, yt-dlp advanced tutorial, yt-dlp pro tips, yt-dlp output template, yt-dlp best settings, is yt-dlp still working 2026, yt-dlp sign in to confirm you're not a bot, yt-dlp cookies from browser, yt-dlp instagram extractor, yt-dlp tiktok support, yt-dlp supported sites list, yt-dlp netflix support, yt-dlp not working, yt-dlp installation guide 2026, yt-dlp latest version january 2026, yt-dlp login youtube, yt-dlp concurrent downloads
        </div>
      </div>
    </div>
  );
}

// Static image properties for blog listing
YtDlpUltimateGuide.FeaturedImage = FeaturedImage;
YtDlpUltimateGuide.CardImage = CardImage;
YtDlpUltimateGuide.ThumbnailImage = ThumbnailImage;
YtDlpUltimateGuide.Image = CardImage;

// Blog metadata for listing page
YtDlpUltimateGuide.info = {
  id: "yt-dlp-ultimate-guide-2026",
  slug: "yt-dlp-ultimate-guide-2026",
  // Click-worthy title matching problem-search intent
  title: "yt-dlp Not Working? Fix Errors & Download Guide (2026)",
  // Optimized meta description for CTR
  excerpt: "Fix yt-dlp errors in 2026: 'Sign in to confirm you're not a bot', slow downloads, cookies setup. Step-by-step installation for Windows, Linux & macOS with 100+ commands.",
  // SEO keywords based on actual search queries
  keywords: "yt-dlp 2026, yt-dlp not working, yt-dlp sign in to confirm you're not a bot, yt-dlp cookies from browser, yt-dlp slow download fix, yt-dlp installation guide 2026, is yt-dlp still working, yt-dlp supported sites, yt-dlp netflix, yt-dlp instagram, yt-dlp tiktok",
  category: "Tutorials",
  author: "Dev Kant Kumar",
  readTime: "45 min read",
  image: "/images/blog/yt-dlp-guide.png",
  featured: true,
  publishDate: "2026-01-06",
  modifiedDate: "2026-01-07",
  tags: [
    "yt-dlp",
    "YouTube",
    "Video Download",
    "Command Line",
    "Tutorial",
    "FFmpeg",
    "SponsorBlock",
    "Automation",
    "Troubleshooting"
  ],
  faqs: [
    {
      question: "Is yt-dlp still working in 2026?",
      answer: "Yes! yt-dlp is actively maintained with daily updates as of January 2026. It's the best tool to download videos from YouTube and 1800+ other sites. If you're having issues, update to the latest version with: yt-dlp -U"
    },
    {
      question: "How do I fix 'Sign in to confirm you're not a bot' error?",
      answer: "Use cookies from your browser: yt-dlp --cookies-from-browser chrome URL. This authenticates your download requests and bypasses the bot detection."
    },
    {
      question: "Is yt-dlp free to use?",
      answer: "Yes, yt-dlp is 100% free and open-source under the Unlicense license. It has no ads, no malware, and no subscription fees."
    },
    {
      question: "What is the difference between yt-dlp and youtube-dl?",
      answer: "yt-dlp is a more actively maintained fork of youtube-dl with faster downloads, better format selection, SponsorBlock integration, and daily updates."
    },
    {
      question: "Does yt-dlp support Netflix?",
      answer: "No. Netflix uses DRM (Digital Rights Management) protection which yt-dlp cannot bypass. yt-dlp only works with sites that don't use DRM encryption."
    },
    {
      question: "How do I fix slow yt-dlp downloads?",
      answer: "YouTube throttles single-threaded downloads. Use aria2c for 5-10x faster speeds: yt-dlp --external-downloader aria2c --external-downloader-args '-x 16' URL"
    },
    {
      question: "How do I download age-restricted YouTube videos?",
      answer: "Use cookies from your browser: yt-dlp --cookies-from-browser chrome URL"
    }
  ]
};

export default YtDlpUltimateGuide;
