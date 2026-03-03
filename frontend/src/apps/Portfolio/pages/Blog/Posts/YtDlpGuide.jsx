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
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-8 md:py-12 px-4 md:px-8 text-center">
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">Complete yt-dlp Guide </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-400">2026</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl px-2">
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
  const [hoveredLine, setHoveredLine] = React.useState(-1);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  // Bash syntax highlighting
  const highlightLine = (line) => {
    if (!line) return <span>{"\n"}</span>;

    // Full-line comment
    if (line.trimStart().startsWith("#")) {
      return <span style={{ color: "#6A9955", fontStyle: "italic" }}>{line}</span>;
    }

    // Tokenize and highlight
    const tokens = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      let matched = false;

      // Strings (double-quoted)
      const dqMatch = remaining.match(/^"([^"]*?)"/);
      if (dqMatch) {
        tokens.push(<span key={key++} style={{ color: "#CE9178" }}>{dqMatch[0]}</span>);
        remaining = remaining.slice(dqMatch[0].length);
        matched = true;
        continue;
      }

      // Strings (single-quoted)
      const sqMatch = remaining.match(/^'([^']*?)'/);
      if (sqMatch) {
        tokens.push(<span key={key++} style={{ color: "#CE9178" }}>{sqMatch[0]}</span>);
        remaining = remaining.slice(sqMatch[0].length);
        matched = true;
        continue;
      }

      // URLs
      const urlMatch = remaining.match(/^https?:\/\/[^\s)]+/);
      if (urlMatch) {
        tokens.push(<span key={key++} style={{ color: "#4FC1FF", textDecoration: "underline", textDecorationColor: "#4FC1FF40" }}>{urlMatch[0]}</span>);
        remaining = remaining.slice(urlMatch[0].length);
        matched = true;
        continue;
      }

      // Variables ($VAR, ${VAR})
      const varMatch = remaining.match(/^\$\{?[A-Za-z_][A-Za-z0-9_]*\}?/);
      if (varMatch) {
        tokens.push(<span key={key++} style={{ color: "#C586C0" }}>{varMatch[0]}</span>);
        remaining = remaining.slice(varMatch[0].length);
        matched = true;
        continue;
      }

      // Flags (--flag, -f)
      const flagMatch = remaining.match(/^--?[a-zA-Z][\w-]*/);
      if (flagMatch) {
        tokens.push(<span key={key++} style={{ color: "#9CDCFE" }}>{flagMatch[0]}</span>);
        remaining = remaining.slice(flagMatch[0].length);
        matched = true;
        continue;
      }

      // Known commands (first word of line or after pipe/semicolon)
      const cmdMatch = remaining.match(/^(yt-dlp|sudo|pip|pip3|brew|apt|dnf|pacman|winget|choco|scoop|curl|wget|chmod|ffmpeg|ffprobe|aria2c|python|python3|npm|npx|mkdir|cd|echo|cat|grep|xargs|crontab|tar|install)\b/);
      if (cmdMatch && (tokens.length === 0 || tokens[tokens.length - 1]?.props?.children === " ")) {
        tokens.push(<span key={key++} style={{ color: "#DCDCAA" }}>{cmdMatch[0]}</span>);
        remaining = remaining.slice(cmdMatch[0].length);
        matched = true;
        continue;
      }

      // Pipes, redirects, semicolons
      const opMatch = remaining.match(/^(\||&&|;|>|>>|<|2>&1)/);
      if (opMatch) {
        tokens.push(<span key={key++} style={{ color: "#D4D4D4", fontWeight: "bold" }}>{opMatch[0]}</span>);
        remaining = remaining.slice(opMatch[0].length);
        matched = true;
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^\b\d+(\.\d+)?\b/);
      if (numMatch) {
        tokens.push(<span key={key++} style={{ color: "#B5CEA8" }}>{numMatch[0]}</span>);
        remaining = remaining.slice(numMatch[0].length);
        matched = true;
        continue;
      }

      if (!matched) {
        // Plain text — grab until next special char
        const plainMatch = remaining.match(/^[^\s"'$\-|&;><]+/);
        if (plainMatch) {
          tokens.push(<span key={key++} style={{ color: "#D4D4D4" }}>{plainMatch[0]}</span>);
          remaining = remaining.slice(plainMatch[0].length);
        } else {
          tokens.push(<span key={key++} style={{ color: "#D4D4D4" }}>{remaining[0]}</span>);
          remaining = remaining.slice(1);
        }
      }
    }

    return <>{tokens}</>;
  };

  const lines = code.split("\n");
  const lineCount = lines.length;
  const gutterWidth = lineCount >= 100 ? "w-12" : lineCount >= 10 ? "w-10" : "w-8";

  return (
    <div className="relative my-6 rounded-xl border border-[#3c3c3c] bg-[#1e1e1e] overflow-hidden shadow-2xl max-w-full" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      {/* Title bar — VS Code style */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#2d2d2d] border-b border-[#3c3c3c]">
        <div className="flex items-center gap-3">
          {/* Traffic light dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Terminal size={13} className="text-green-400" />
            <span className="px-2 py-0.5 rounded bg-[#1e1e1e] text-gray-400 border border-[#3c3c3c] font-mono text-[10px] uppercase tracking-wider">
              {language}
            </span>
            {filename && <span className="font-mono text-gray-500 text-[11px] hidden sm:inline">{filename}</span>}
          </div>
        </div>
        <button
          onClick={copyToClipboard}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all ${
            copied
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "hover:bg-[#3c3c3c] text-gray-500 hover:text-gray-300 border border-transparent"
          }`}
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      {/* Code area with line numbers */}
      <div className="overflow-x-auto max-w-full">
        <div className="flex min-w-fit">
          {/* Line number gutter */}
          <div className={`${gutterWidth} flex-shrink-0 bg-[#1e1e1e] border-r border-[#2d2d2d] select-none py-3`}>
            {lines.map((_, i) => (
              <div
                key={i}
                className={`px-2 text-right font-mono text-[11px] leading-[1.6rem] transition-colors ${
                  hoveredLine === i ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          <pre className="m-0 py-3 pl-4 pr-4 flex-1 text-[13px] leading-[1.6rem] bg-[#1e1e1e] font-mono min-w-0">
            <code>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`transition-colors rounded-sm ${
                    hoveredLine === i ? "bg-[#2a2d2e]" : ""
                  }`}
                  onMouseEnter={() => setHoveredLine(i)}
                  onMouseLeave={() => setHoveredLine(-1)}
                >
                  {highlightLine(line)}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
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
    <div className={`my-6 p-4 md:p-5 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm max-w-full overflow-hidden`}>
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

// Section heading with anchor link support
function SectionHeading({ id, icon: Icon, iconColor = "text-blue-400", iconBg = "bg-blue-500/10 border-blue-500/20", children }) {
  const [linkCopied, setLinkCopied] = React.useState(false);

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-3 mb-6 group">
      {Icon && (
        <div className={`p-2 rounded-lg ${iconBg} border`}>
          <Icon size={24} className={iconColor} />
        </div>
      )}
      <h2 id={id} className="text-2xl md:text-3xl font-bold text-white scroll-mt-24 flex-1">{children}</h2>
      <button
        onClick={copyLink}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-green-400"
        title="Copy link to this section"
      >
        {linkCopied ? <Check size={16} className="text-green-400" /> : <ExternalLink size={16} />}
      </button>
    </div>
  );
}

// Sticky quick-nav for mobile
function StickyQuickNav() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-[#1a1a2e]/95 backdrop-blur-xl border-t border-gray-700/50 px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around gap-1 max-w-lg mx-auto">
          {[
            { id: "installation", label: "Install", icon: Download },
            { id: "troubleshooting", label: "Fix Errors", icon: AlertTriangle },
            { id: "faq", label: "FAQ", icon: MessageSquare },
            { id: null, label: "Top ↑", icon: null },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => item.id ? scrollTo(item.id) : window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-all active:scale-95 flex-1"
            >
              {item.icon && <item.icon size={16} />}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
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
    <nav className="my-8 md:my-12 p-4 md:p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3">
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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const searchInputRef = React.useRef(null);

  // Searchable items: FAQ questions + section headings
  const searchableItems = React.useMemo(() => [
    // Sections
    { type: "section", label: "What is yt-dlp?", id: "what-is" },
    { type: "section", label: "Installation Guide", id: "installation" },
    { type: "section", label: "1800+ Supported Sites", id: "supported-sites" },
    { type: "section", label: "Basic Commands", id: "basic-commands" },
    { type: "section", label: "Quality & Format Selection", id: "quality-selection" },
    { type: "section", label: "Advanced Features", id: "advanced-features" },
    { type: "section", label: "Authentication & Cookies", id: "authentication" },
    { type: "section", label: "SponsorBlock Integration", id: "sponsorblock" },
    { type: "section", label: "Playlists & Channels", id: "playlists" },
    { type: "section", label: "Troubleshooting", id: "troubleshooting" },
    { type: "section", label: "Performance Optimization", id: "performance" },
    { type: "section", label: "FAQ", id: "faq" },
    // Key FAQ questions (mapped to FAQ section)
    { type: "faq", label: "Is yt-dlp still working in 2026?", id: "is-yt-dlp-working" },
    { type: "faq", label: "Does yt-dlp support Netflix?", id: "faq" },
    { type: "faq", label: "yt-dlp Netflix Widevine L3 DRM", id: "faq" },
    { type: "faq", label: "Netflix downloader working 2026", id: "faq" },
    { type: "faq", label: "DRM protected video download", id: "faq" },
    { type: "faq", label: "Sign in to confirm you're not a bot", id: "troubleshooting" },
    { type: "faq", label: "yt-dlp not working fix", id: "troubleshooting" },
    { type: "faq", label: "yt-dlp stopped working", id: "troubleshooting" },
    { type: "faq", label: "Slow download speed fix aria2c", id: "performance" },
    { type: "faq", label: "Cookies from browser Chrome Firefox", id: "authentication" },
    { type: "faq", label: "Age restricted video download", id: "authentication" },
    { type: "faq", label: "How to install yt-dlp Windows", id: "installation" },
    { type: "faq", label: "How to install yt-dlp Mac macOS", id: "installation" },
    { type: "faq", label: "How to install yt-dlp Linux", id: "installation" },
    { type: "faq", label: "Download MP3 audio extraction", id: "basic-commands" },
    { type: "faq", label: "4K 8K video download quality", id: "quality-selection" },
    { type: "faq", label: "Playlist channel download", id: "playlists" },
    { type: "faq", label: "TikTok download support 2026", id: "faq" },
    { type: "faq", label: "Instagram Reels stories download", id: "faq" },
    { type: "faq", label: "Rumble Patreon Twitch download", id: "faq" },
    { type: "faq", label: "Pornhub not working 2026", id: "faq" },
    { type: "faq", label: "SponsorBlock remove sponsors", id: "sponsorblock" },
    { type: "faq", label: "FFmpeg not found error", id: "troubleshooting" },
    { type: "faq", label: "Database locked cookie error", id: "troubleshooting" },
    { type: "faq", label: "Requested format not available", id: "troubleshooting" },
    { type: "faq", label: "N challenge solving failed", id: "faq" },
    { type: "faq", label: "Is yt-dlp safe secure malware", id: "faq" },
    { type: "faq", label: "youtube-dl vs yt-dlp comparison", id: "what-is" },
    { type: "faq", label: "Configuration config file setup", id: "faq" },
    { type: "faq", label: "Automation cron task scheduler", id: "faq" },
    { type: "faq", label: "yt-dlp update latest version", id: "installation" },
    { type: "faq", label: "Subtitle download embed", id: "advanced-features" },
  ], []);

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const words = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return searchableItems
      .filter(item => {
        const label = item.label.toLowerCase();
        return words.every(w => label.includes(w));
      })
      .slice(0, 8);
  }, [searchQuery, searchableItems]);

  const handleSearchSelect = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    }
    setSearchQuery("");
    setIsSearchFocused(false);
    searchInputRef.current?.blur();
  };

  // Keyboard shortcut: Ctrl+K to focus search
  React.useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 font-sans selection:bg-green-500/30 overflow-x-hidden">
      <FeaturedImage />

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 overflow-hidden">

        {/* Trust Signal Banner */}
        <div className="mb-6 md:mb-8 p-4 md:p-5 bg-gradient-to-r from-slate-900/80 via-green-950/30 to-slate-900/80 border border-green-500/20 rounded-2xl backdrop-blur-sm">
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4 md:gap-10">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">134K+</div>
              <div className="text-[10px] md:text-xs text-gray-400 mt-1">Google Searches<br/>Found This Guide</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">1800+</div>
              <div className="text-[10px] md:text-xs text-gray-400 mt-1">Supported<br/>Platforms</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">100+</div>
              <div className="text-[10px] md:text-xs text-gray-400 mt-1">Commands<br/>Covered</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">50+</div>
              <div className="text-[10px] md:text-xs text-gray-400 mt-1">FAQs<br/>Answered</div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">Ranked on Google for 1,000+ yt-dlp related search queries • Updated March 2026</p>
        </div>

        {/* Prominent Search Bar */}
        <div className="mb-8 md:mb-10 relative z-30">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-5 flex items-center pointer-events-none">
              <Search size={18} className={`transition-colors ${isSearchFocused ? "text-green-400" : "text-gray-500"}`} />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder='Search... e.g. "Netflix", "not working", "cookies"'
              className="w-full pl-11 md:pl-14 pr-4 md:pr-24 py-3 md:py-4 bg-[#1a1a2e] border-2 border-gray-700 rounded-xl md:rounded-2xl text-white text-base md:text-lg placeholder-gray-500 focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 focus:bg-[#1a1a35] transition-all shadow-lg shadow-black/20"
            />
            <div className="absolute inset-y-0 right-0 pr-4 md:pr-5 hidden md:flex items-center pointer-events-none gap-2">
              <span className="text-gray-600 text-xs border border-gray-700 rounded-md px-2 py-1 font-mono">Ctrl+K</span>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a2e]/98 backdrop-blur-2xl border border-gray-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 md:px-5 py-3 hover:bg-green-500/10 transition-colors flex items-center gap-2 md:gap-3 group"
                      onMouseDown={(e) => { e.preventDefault(); handleSearchSelect(item.id); }}
                    >
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.type === "section"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-green-500/20 text-green-400 border border-green-500/30"
                      }`}>
                        {item.type === "section" ? "Section" : "FAQ"}
                      </span>
                      <span className="text-gray-200 group-hover:text-white text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-6 text-center text-gray-500 text-sm">
                  No results for "{searchQuery}" — try "Netflix", "install", "cookies", or "not working"
                </div>
              )}
            </div>
          )}

          {/* Quick search suggestions when not focused */}
          {!isSearchFocused && (
            <div className="flex flex-wrap items-center gap-2 mt-3 justify-center">
              <span className="text-gray-600 text-xs">Popular:</span>
              {["Netflix support", "Not working", "Install Windows", "Cookies fix", "Slow download", "TikTok", "Age restricted"].map((term) => (
                <button
                  key={term}
                  onClick={() => { setSearchQuery(term); searchInputRef.current?.focus(); }}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700/50 text-gray-400 hover:text-green-400 hover:border-green-500/40 hover:bg-green-500/10 transition-all cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-gray-400 text-xs md:text-sm mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-green-400" />
            <span>Updated: March 2026</span>
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
        <section id="is-yt-dlp-working" className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-xl scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <Check size={24} className="text-green-400" />
            Is yt-dlp Still Working in 2026?
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
            <strong className="text-green-400">Yes!</strong> yt-dlp is actively maintained with daily updates as of March 2026.
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
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6">
            yt-dlp Not Working? The Complete Fix & Download Guide (2026)
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4 md:mb-6">
            Welcome to the most comprehensive yt-dlp guide on the internet. Whether you're getting errors, slow downloads, or just starting out — this guide covers installation, troubleshooting, and 100+ commands that professionals use daily.
          </p>
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="p-4 md:p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl">
              <Globe size={32} className="text-green-400 mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">1800+ Sites</h3>
              <p className="text-gray-400 text-sm">Download from YouTube, TikTok, Instagram, Vimeo, and 1800+ more platforms</p>
            </div>
            <div className="p-4 md:p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl">
              <Zap size={32} className="text-blue-400 mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">Active Development</h3>
              <p className="text-gray-400 text-sm">Daily updates, bug fixes, and new features added constantly</p>
            </div>
            <div className="p-4 md:p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl">
              <Shield size={32} className="text-purple-400 mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">100% Free & Open</h3>
              <p className="text-gray-400 text-sm">No ads, no malware, no subscription fees. Pure open-source power</p>
            </div>
          </div>
        </section>

        {/* What is yt-dlp */}
        <section id="what-is" className="mb-16 scroll-mt-24">
          <SectionHeading id="what-is" icon={Command} iconColor="text-blue-400" iconBg="bg-blue-500/10 border-blue-500/20">What is yt-dlp?</SectionHeading>
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
          <SectionHeading id="installation" icon={Download} iconColor="text-green-400" iconBg="bg-green-500/10 border-green-500/20">Installation Guide</SectionHeading>

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
          <SectionHeading id="supported-sites" icon={Globe} iconColor="text-purple-400" iconBg="bg-purple-500/10 border-purple-500/20">1800+ Supported Sites</SectionHeading>

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
                <li>• <strong>Instagram</strong> (posts, stories, reels, IGTV) - requires cookies for private content</li>
                <li>• <strong>Facebook</strong> (videos, live streams, stories)</li>
                <li>• <strong>Twitter/X</strong> (videos, Twitter Spaces audio recordings)</li>
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
                Regional Platforms (Korea, China, Japan, Russia)
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Naver TV</strong> (Korea) - Full support for Naver TV videos and channels</li>
                <li>• <strong>Kakao TV</strong> (Korea) - Download Kakao TV content directly</li>
                <li>• <strong>Bilibili</strong> (China)</li>
                <li>• <strong>Niconico</strong> (Japan)</li>
                <li>• <strong>VK</strong> (Russia) - VK videos and stories</li>
                <li>• <strong>Youku</strong> (China)</li>
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

          {/* Netflix & DRM Warning - Targeting GSC queries */}
          <div className="mt-8 p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-xl border border-red-500/30">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldAlert size={20} className="text-red-400" />
              Does yt-dlp Support Netflix? (DRM-Protected Sites)
            </h3>
            <p className="text-gray-300 mb-4">
              <strong className="text-red-400">No.</strong> yt-dlp does NOT support Netflix, Disney+, Amazon Prime Video, Hulu, or HBO Max. These platforms use <strong>DRM (Digital Rights Management)</strong> encryption that yt-dlp cannot bypass.
            </p>
            <div className="bg-black/30 p-4 rounded-lg border border-red-900/30">
              <h4 className="text-white font-bold text-sm mb-2">Sites NOT supported:</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Netflix, Disney+, Amazon Prime Video</li>
                <li>• HBO Max, Hulu, Peacock, Paramount+</li>
                <li>• Apple TV+, Crunchyroll Premium</li>
              </ul>
              <p className="text-gray-500 text-xs mt-3">
                These services use Widevine DRM. Attempting to bypass DRM is illegal in many jurisdictions.
              </p>
            </div>
          </div>
        </section>

        {/* Basic Commands */}
        <section id="basic-commands" className="mb-16 scroll-mt-24">
          <SectionHeading id="basic-commands" icon={Terminal} iconColor="text-orange-400" iconBg="bg-orange-500/10 border-orange-500/20">Essential Basic Commands</SectionHeading>

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
          <SectionHeading id="quality-selection" icon={Settings} iconColor="text-red-400" iconBg="bg-red-500/10 border-red-500/20">Advanced Quality & Format Selection</SectionHeading>

          <p className="text-gray-300 mb-6">Master the art of format selection to get exactly what you want. Understanding format codes is key to unlocking yt-dlp's full power.</p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">List Available Formats</h3>
              <CodeBlock code="yt-dlp -F URL" />
              <p className="text-gray-400 text-sm mt-2">This shows all available video and audio streams with their IDs, resolutions, codecs, and file sizes</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Format Selection Examples (4K, 8K, HDR)</h3>
              <CodeBlock code='# Download specific format by ID
yt-dlp -f 137+140 URL

# Download 8K video (4320p) - if available
yt-dlp -f "bestvideo[height<=4320]+bestaudio" URL

# Download 4K video (2160p)
yt-dlp -f "bestvideo[height<=2160]+bestaudio" URL

# Best video with VP9 codec + best audio
yt-dlp -f "bestvideo[vcodec^=vp9]+bestaudio" URL

# Best 1080p or lower
yt-dlp -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" URL

# Prefer 60fps
yt-dlp -f "bestvideo[fps>=60]+bestaudio" URL

# HDR video (HEVC/H.265)
yt-dlp -f "bestvideo[vcodec*=hev1]+bestaudio" URL

# AV1 codec (modern, efficient, best for 4K/8K)
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
          <SectionHeading id="advanced-features" icon={Zap} iconColor="text-purple-400" iconBg="bg-purple-500/10 border-purple-500/20">Advanced Features & Options</SectionHeading>

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
              <h3 className="text-xl font-bold text-white mb-3">Post-Processing & Chapter Embedding</h3>
              <CodeBlock code='# Convert to MP4 (--recode-video)
yt-dlp --recode-video mp4 URL

# Embed chapters from YouTube (--embed-chapters)
yt-dlp --embed-chapters URL

# Split chapters into separate files
yt-dlp --split-chapters URL

# Remove sponsor segments (SponsorBlock)
yt-dlp --sponsorblock-remove all URL

# Re-encode audio
yt-dlp --audio-quality 0 -x --audio-format mp3 URL

# Recode with specific codec
yt-dlp --recode-video mp4 --postprocessor-args "ffmpeg:-c:v libx264 -preset fast" URL' />
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
          <SectionHeading id="authentication" icon={Lock} iconColor="text-yellow-400" iconBg="bg-yellow-500/10 border-yellow-500/20">Authentication & Cookie Management</SectionHeading>

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
          <SectionHeading id="sponsorblock" icon={Shield} iconColor="text-green-400" iconBg="bg-green-500/10 border-green-500/20">SponsorBlock Integration</SectionHeading>

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
          <SectionHeading id="playlists" icon={List} iconColor="text-cyan-400" iconBg="bg-cyan-500/10 border-cyan-500/20">Mastering Playlists & Channels</SectionHeading>

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
          <SectionHeading id="troubleshooting" icon={AlertTriangle} iconColor="text-red-400" iconBg="bg-red-500/10 border-red-500/20">Common Issues & Solutions</SectionHeading>

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
          <SectionHeading id="performance" icon={TrendingUp} iconColor="text-blue-400" iconBg="bg-blue-500/10 border-blue-500/20">Performance Optimization Tips</SectionHeading>

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
          <SectionHeading id="faq" icon={MessageSquare} iconColor="text-yellow-400" iconBg="bg-yellow-500/10 border-yellow-500/20">Frequently Asked Questions (50+)</SectionHeading>

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
              <Globe size={20} /> Netflix, DRM & Widevine (2026)
            </h3>

            {[
              {
                q: "Can yt-dlp download from Netflix in 2026?",
                a: "No. yt-dlp does NOT support Netflix. Netflix uses Widevine DRM (Digital Rights Management) encryption that yt-dlp cannot and does not attempt to bypass. This applies to all Netflix content worldwide."
              },
              {
                q: "Does yt-dlp support Netflix Widevine L3 decryption?",
                a: "No. yt-dlp has no Widevine L3 or any DRM decryption capability. It is designed for sites that serve unprotected video streams. Netflix, Disney+, Amazon Prime, HBO Max, and similar services use Widevine DRM which is illegal to circumvent in most jurisdictions."
              },
              {
                q: "Is there a yt-dlp Netflix downloader working in 2026?",
                a: "No. There is no legitimate yt-dlp Netflix downloader. Any tool claiming to download Netflix via yt-dlp is either a scam, malware, or illegal. Netflix content is protected by Widevine DRM which yt-dlp does not bypass."
              },
              {
                q: "Can yt-dlp download DRM-protected videos?",
                a: "No. yt-dlp only works with sites that serve unprotected video streams. Sites using DRM (Widevine, FairPlay, PlayReady) like Netflix, Disney+, Amazon Prime Video, HBO Max, Hulu, and Apple TV+ are NOT supported."
              },
              {
                q: "What streaming services does yt-dlp NOT support?",
                a: "yt-dlp does NOT support: Netflix, Disney+, Amazon Prime Video, HBO Max, Hulu, Peacock, Paramount+, Apple TV+, Crunchyroll Premium, or any service using DRM encryption. It works with YouTube, Vimeo, TikTok, Instagram, and 1800+ other non-DRM platforms."
              },
              {
                q: "Does yt-dlp have a Netflix extractor?",
                a: "No. yt-dlp does not have and has never had a Netflix extractor. The yt-dlp project explicitly does not support DRM-protected services. Check supported sites with: yt-dlp --list-extractors"
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <TrendingUp size={20} /> yt-dlp Status & Updates (March 2026)
            </h3>

            {[
              {
                q: "Is yt-dlp still working in March 2026?",
                a: "Yes! yt-dlp is fully working and actively maintained as of March 2026. The project receives daily updates with bug fixes and new features. If you're experiencing issues, update to the latest version with: yt-dlp -U"
              },
              {
                q: "Is yt-dlp actively maintained in 2026?",
                a: "Yes, very actively. yt-dlp has multiple maintainers and receives daily commits on GitHub. It's the most actively maintained video downloader available, far surpassing the original youtube-dl in update frequency."
              },
              {
                q: "What is the current status of yt-dlp in 2026?",
                a: "yt-dlp is fully operational as of March 2026. It supports 1800+ sites, receives regular updates, and has a large active community. Latest releases are available at: github.com/yt-dlp/yt-dlp/releases"
              },
              {
                q: "Has yt-dlp stopped working?",
                a: "No. If yt-dlp stopped working for you, it's likely an outdated version. Run yt-dlp -U to update. YouTube frequently changes their systems, requiring yt-dlp updates. For the latest fixes, try: yt-dlp --update-to nightly"
              },
              {
                q: "What is the latest version of yt-dlp in 2026?",
                a: "yt-dlp releases updates frequently. Check the latest version with: yt-dlp --version. To update: yt-dlp -U. For bleeding-edge fixes: yt-dlp --update-to nightly. Visit github.com/yt-dlp/yt-dlp/releases for release notes."
              },
              {
                q: "Is youtube-dl or yt-dlp better in 2026?",
                a: "yt-dlp is significantly better. youtube-dl has very infrequent updates, while yt-dlp receives daily updates, has faster downloads, SponsorBlock integration, better format selection, and supports more sites. yt-dlp is the recommended choice in 2026."
              },
              {
                q: "Is yt-dlp safe to use in 2026?",
                a: "Yes, yt-dlp is safe when downloaded from the official GitHub repository (github.com/yt-dlp/yt-dlp). It's open-source, has no ads or malware, and is audited by the community. Never download from unofficial third-party websites."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <Lock size={20} /> Cookies, Bot Detection & Age Restriction
            </h3>

            {[
              {
                q: "How do I fix 'Sign in to confirm you're not a bot' in 2026?",
                a: "Use browser cookies: yt-dlp --cookies-from-browser chrome URL. This sends your logged-in session with the request, bypassing YouTube's bot detection. If Chrome doesn't work, try Firefox: yt-dlp --cookies-from-browser firefox URL"
              },
              {
                q: "Which browser works best for yt-dlp cookies — Firefox or Chrome?",
                a: "Both work well. Chrome is most commonly used, but Firefox cookies can be more reliable on some systems since Firefox doesn't encrypt cookies as aggressively. Try: yt-dlp --cookies-from-browser firefox URL if Chrome fails."
              },
              {
                q: "Do YouTube cookies expire for yt-dlp?",
                a: "Yes, YouTube cookies typically expire after a few weeks to months. If yt-dlp stops working with cookies, export fresh cookies. For --cookies-from-browser, cookies are extracted fresh each time, so they don't expire as long as you're logged in."
              },
              {
                q: "How do I fix yt-dlp 'Sign in to confirm your age' error?",
                a: "Use cookies from your browser (must be logged into an 18+ YouTube account): yt-dlp --cookies-from-browser chrome URL. This authenticates you and bypasses the age gate."
              },
              {
                q: "How do I fix 'yt-dlp can't download age restricted videos'?",
                a: "Age-restricted videos require authentication. Use: yt-dlp --cookies-from-browser chrome URL. Make sure you're logged into YouTube on that browser with an account that has age verification completed."
              },
              {
                q: "How do I fix 'Requested format is not available' in yt-dlp?",
                a: "List available formats first with: yt-dlp -F URL. Then pick a valid format ID. Or use flexible selection: yt-dlp -f 'bestvideo[height<=1080]+bestaudio/best' URL — the /best fallback handles cases where separate streams aren't available."
              },
              {
                q: "How do I fix yt-dlp N challenge solving failed?",
                a: "This usually means yt-dlp is outdated. YouTube's N challenge changes frequently. Update immediately: yt-dlp -U. If still failing, try the nightly build: yt-dlp --update-to nightly. Using cookies also helps: yt-dlp --cookies-from-browser chrome URL"
              },
              {
                q: "How to use yt-dlp with Firefox cookies for TikTok?",
                a: "Use: yt-dlp --cookies-from-browser firefox TIKTOK_URL. Close Firefox first to avoid database lock errors. For persistent issues, export cookies to a file using 'Get cookies.txt LOCALLY' extension and use: yt-dlp --cookies cookies.txt URL"
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#1e1e1e] rounded-lg border border-gray-800 p-4 cursor-pointer hover:border-green-500/50 transition-colors">
                <summary className="font-bold text-white">{faq.q}</summary>
                <p className="text-gray-400 mt-3 text-sm pl-4">{faq.a}</p>
              </details>
            ))}

            <h3 className="text-2xl font-bold text-green-400 mb-4 mt-12 flex items-center gap-2">
              <Code size={20} /> Platform-Specific (2026)
            </h3>

            {[
              {
                q: "Does yt-dlp support Instagram in 2026?",
                a: "Yes! yt-dlp supports Instagram posts, Reels, stories, and IGTV. For private content, use cookies: yt-dlp --cookies-from-browser chrome INSTAGRAM_URL"
              },
              {
                q: "Does yt-dlp support TikTok in 2026?",
                a: "Yes! yt-dlp natively supports TikTok videos. Just paste the URL: yt-dlp TIKTOK_URL. No cookies needed for public videos."
              },
              {
                q: "Does yt-dlp support Rumble in 2026?",
                a: "Yes! yt-dlp has a Rumble extractor that works in 2026. Just paste the Rumble video URL: yt-dlp RUMBLE_URL"
              },
              {
                q: "Does yt-dlp support Patreon in 2026?",
                a: "Yes, yt-dlp can download public Patreon video content. For supporter-only content, you need cookies from a logged-in session: yt-dlp --cookies-from-browser chrome PATREON_URL"
              },
              {
                q: "Does yt-dlp support Pornhub in 2026?",
                a: "yt-dlp includes extractors for many adult sites. If a specific site isn't working, update yt-dlp with yt-dlp -U. For premium content, use cookies: yt-dlp --cookies-from-browser chrome URL"
              },
              {
                q: "Why is yt-dlp Pornhub not working in 2026?",
                a: "Adult sites frequently change their page structure. First update yt-dlp: yt-dlp -U. If still failing, try the nightly build: yt-dlp --update-to nightly. Some content requires cookies: yt-dlp --cookies-from-browser chrome URL"
              },
              {
                q: "Can yt-dlp download Instagram stories?",
                a: "Yes, but you need to be logged in: yt-dlp --cookies-from-browser chrome INSTAGRAM_URL"
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


      </div>
      <StickyQuickNav />
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
  // Balanced title for both informational ("yt-dlp 2026") and troubleshooting ("yt-dlp not working") intent
  title: "yt-dlp Ultimate Guide 2026: Download, Fix Errors & 100+ Commands",
  // Optimized meta description for CTR — hits top GSC queries and includes freshness signal
  excerpt: "The complete yt-dlp guide — updated March 2026. Download videos from YouTube & 1800+ sites. Fix 'not a bot' errors, speed up downloads with aria2c, install on Windows/Linux/Mac. 100+ commands included.",
  // SEO keywords based on actual GSC search queries
  keywords: "yt-dlp 2026, yt-dlp not working, yt-dlp not working 2026, does yt-dlp still work, yt-dlp still working 2026, yt-dlp stopped working, yt-dlp netflix, yt-dlp netflix support 2026, yt-dlp widevine l3, yt-dlp drm, yt-dlp sign in to confirm you're not a bot, yt-dlp cookies from browser, yt-dlp age restricted, yt-dlp n challenge solving failed, yt-dlp requested format not available, yt-dlp installation guide 2026, yt-dlp supported sites, yt-dlp tutorial 2026, yt-dlp instagram 2026, yt-dlp tiktok 2026, yt-dlp rumble 2026, yt-dlp patreon 2026, yt-dlp pornhub not working 2026, yt-dlp safe 2026, yt-dlp status 2026, yt-dlp aria2c, yt-dlp ffmpeg",
  category: "Tutorials",
  author: "Dev Kant Kumar",
  readTime: "45 min read",
  image: "/images/blog/yt-dlp-guide.png",
  featured: true,
  publishDate: "2026-01-06",
  modifiedDate: "2026-03-03",
  howTo: {
    name: "How to Use yt-dlp to Download Videos in 2026",
    description: "Complete step-by-step guide to install and use yt-dlp for downloading videos from YouTube and 1800+ websites.",
    totalTime: "PT15M",
    steps: [
      { name: "Install yt-dlp", text: "Install yt-dlp using your preferred method. Windows: winget install yt-dlp. macOS: brew install yt-dlp. Linux: sudo apt install yt-dlp. Or use pip: pip install -U yt-dlp" },
      { name: "Install FFmpeg", text: "Install FFmpeg for merging video and audio streams. Windows: winget install Gyan.FFmpeg. macOS: brew install ffmpeg. Linux: sudo apt install ffmpeg" },
      { name: "Download a video", text: "Run: yt-dlp \"https://www.youtube.com/watch?v=VIDEO_ID\" to download the best available quality." },
      { name: "Select quality", text: "Use format selection for specific quality: yt-dlp -f \"bestvideo[height<=1080]+bestaudio\" URL for 1080p, or change 1080 to 2160 for 4K." },
      { name: "Extract audio", text: "Extract audio as MP3: yt-dlp -x --audio-format mp3 URL. Use m4a or flac for higher quality formats." },
      { name: "Fix authentication errors", text: "If you get 'Sign in to confirm you're not a bot', use cookies: yt-dlp --cookies-from-browser chrome URL" },
      { name: "Speed up downloads", text: "Use aria2c for faster downloads: yt-dlp --external-downloader aria2c --external-downloader-args \"-x 16 -k 1M\" URL" }
    ]
  },
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
      answer: "Yes! yt-dlp is actively maintained with daily updates as of March 2026. It's the best tool to download videos from YouTube and 1800+ other sites. If you're having issues, update to the latest version with: yt-dlp -U"
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
    },
    {
      question: "Does yt-dlp support Naver TV and Kakao TV?",
      answer: "Yes! yt-dlp fully supports both Naver TV (Korea) and Kakao TV. Just paste the video URL directly: yt-dlp URL"
    },
    {
      question: "Can yt-dlp download 8K videos?",
      answer: "Yes! yt-dlp supports 8K (4320p) downloads if the source video is available in 8K. Use: yt-dlp -f 'bestvideo[height<=4320]+bestaudio' URL"
    },
    {
      question: "How do I embed chapters in downloaded videos?",
      answer: "Use the --embed-chapters flag: yt-dlp --embed-chapters URL. This embeds YouTube chapter markers into the video file."
    },
    {
      question: "Can yt-dlp download Twitter Spaces?",
      answer: "Yes! yt-dlp can download Twitter/X Spaces audio recordings. Just paste the Spaces recording URL."
    },
    {
      question: "How do I use concurrent downloads with yt-dlp?",
      answer: "Use --concurrent-fragments N for parallel fragment downloads: yt-dlp --concurrent-fragments 4 URL. For downloading multiple videos at once, use a batch file or xargs."
    },
    {
      question: "Why is yt-dlp not working in 2026?",
      answer: "yt-dlp IS working in 2026. If you're getting errors, first update to the latest version with yt-dlp -U. Common fixes: use --cookies-from-browser chrome for bot detection errors, install FFmpeg for merge errors, and use aria2c for slow downloads."
    },
    {
      question: "How do I install yt-dlp on Windows?",
      answer: "The easiest way is via winget: winget install yt-dlp. You can also use pip install yt-dlp, choco install yt-dlp, or download the binary from GitHub releases."
    },
    {
      question: "How do I download only audio as MP3 with yt-dlp?",
      answer: "Use: yt-dlp -x --audio-format mp3 URL. This extracts the audio and converts it to MP3. Requires FFmpeg to be installed."
    },
    {
      question: "Can yt-dlp download entire YouTube playlists?",
      answer: "Yes! Use: yt-dlp -i PLAYLIST_URL. The -i flag skips errors for unavailable videos. Add --download-archive archive.txt to avoid re-downloading."
    },
    {
      question: "How do I download Instagram Reels with yt-dlp?",
      answer: "Just paste the Reel URL: yt-dlp URL. For private accounts, use cookies: yt-dlp --cookies-from-browser chrome URL"
    },
    {
      question: "Does yt-dlp work with adult sites?",
      answer: "yt-dlp supports many video sites including some adult platforms. If a site is not working, try updating yt-dlp with yt-dlp -U or use cookies with --cookies-from-browser chrome."
    },
    {
      question: "How do I download TikTok videos with yt-dlp?",
      answer: "Simply paste the TikTok video URL: yt-dlp URL. yt-dlp natively supports TikTok without any special configuration."
    },
    {
      question: "Can I remove sponsor segments from downloaded videos?",
      answer: "Yes! Use SponsorBlock integration: yt-dlp --sponsorblock-remove all URL. This automatically removes sponsored segments from YouTube videos."
    },
    {
      question: "Can yt-dlp download from Netflix in 2026?",
      answer: "No. yt-dlp does NOT support Netflix. Netflix uses Widevine DRM encryption that yt-dlp cannot and does not attempt to bypass. This applies to all Netflix content worldwide."
    },
    {
      question: "Does yt-dlp support Netflix Widevine L3 decryption?",
      answer: "No. yt-dlp has no Widevine L3 or any DRM decryption capability. Netflix, Disney+, Amazon Prime, HBO Max use Widevine DRM which is illegal to circumvent in most jurisdictions."
    },
    {
      question: "Is there a yt-dlp Netflix downloader working in 2026?",
      answer: "No. There is no legitimate yt-dlp Netflix downloader. Any tool claiming to download Netflix via yt-dlp is either a scam, malware, or illegal."
    },
    {
      question: "Can yt-dlp download DRM-protected videos?",
      answer: "No. yt-dlp only works with sites that serve unprotected video streams. Sites using DRM like Netflix, Disney+, Amazon Prime Video, HBO Max, Hulu, and Apple TV+ are NOT supported."
    },
    {
      question: "Is yt-dlp still working in March 2026?",
      answer: "Yes! yt-dlp is fully working and actively maintained as of March 2026. The project receives daily updates. If you're experiencing issues, update with: yt-dlp -U"
    },
    {
      question: "Is yt-dlp actively maintained in 2026?",
      answer: "Yes, very actively. yt-dlp has multiple maintainers and receives daily commits on GitHub. It's the most actively maintained video downloader available."
    },
    {
      question: "Has yt-dlp stopped working?",
      answer: "No. If yt-dlp stopped working for you, it's likely an outdated version. Run yt-dlp -U to update. For latest fixes, try: yt-dlp --update-to nightly"
    },
    {
      question: "Is yt-dlp safe to use in 2026?",
      answer: "Yes, yt-dlp is safe when downloaded from the official GitHub repository. It's open-source, has no ads or malware, and is audited by the community. Never download from unofficial websites."
    },
    {
      question: "Is youtube-dl or yt-dlp better in 2026?",
      answer: "yt-dlp is significantly better. youtube-dl has infrequent updates, while yt-dlp receives daily updates, faster downloads, SponsorBlock integration, and supports more sites."
    },
    {
      question: "How do I fix 'Sign in to confirm you're not a bot' in yt-dlp 2026?",
      answer: "Use browser cookies: yt-dlp --cookies-from-browser chrome URL. If Chrome fails, try Firefox: yt-dlp --cookies-from-browser firefox URL"
    },
    {
      question: "Which browser works best for yt-dlp cookies — Firefox or Chrome?",
      answer: "Both work well. Firefox cookies can be more reliable on some systems since Firefox doesn't encrypt cookies as aggressively. Try yt-dlp --cookies-from-browser firefox URL if Chrome fails."
    },
    {
      question: "How do I fix yt-dlp N challenge solving failed?",
      answer: "Update yt-dlp immediately: yt-dlp -U. If still failing, try nightly: yt-dlp --update-to nightly. Using cookies also helps: yt-dlp --cookies-from-browser chrome URL"
    },
    {
      question: "How do I fix 'Requested format is not available' in yt-dlp?",
      answer: "List available formats with: yt-dlp -F URL. Then use flexible selection: yt-dlp -f 'bestvideo[height<=1080]+bestaudio/best' URL"
    },
    {
      question: "Does yt-dlp support Instagram in 2026?",
      answer: "Yes! yt-dlp supports Instagram posts, Reels, stories, and IGTV. For private content, use cookies: yt-dlp --cookies-from-browser chrome URL"
    },
    {
      question: "Does yt-dlp support TikTok in 2026?",
      answer: "Yes! yt-dlp natively supports TikTok videos. Just paste the URL: yt-dlp TIKTOK_URL"
    },
    {
      question: "Does yt-dlp support Rumble in 2026?",
      answer: "Yes! yt-dlp has a Rumble extractor that works in 2026. Just paste the Rumble video URL."
    },
    {
      question: "Does yt-dlp support Patreon in 2026?",
      answer: "Yes, yt-dlp can download public Patreon video content. For supporter-only content, use cookies: yt-dlp --cookies-from-browser chrome URL"
    },
    {
      question: "Why is yt-dlp Pornhub not working in 2026?",
      answer: "Update yt-dlp: yt-dlp -U. If still failing, try nightly: yt-dlp --update-to nightly. Some content requires cookies: yt-dlp --cookies-from-browser chrome URL"
    },
    {
      question: "Does yt-dlp have a Netflix extractor?",
      answer: "No. yt-dlp does not have and has never had a Netflix extractor. The project does not support DRM-protected services. Check supported sites with: yt-dlp --list-extractors"
    },
    {
      question: "Do YouTube cookies expire for yt-dlp?",
      answer: "Yes, YouTube cookies typically expire after a few weeks to months. With --cookies-from-browser, cookies are extracted fresh each time, so they don't expire as long as you're logged in."
    }
  ]
};

export default YtDlpUltimateGuide;
