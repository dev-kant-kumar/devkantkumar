import { motion } from "framer-motion";
import {
    BookOpen,
    Bot,
    Check,
    Code as CodeIcon,
    Cpu,
    ExternalLink,
    Filter,
    Globe,
    Image as ImageIcon,
    Megaphone,
    Mic,
    Music,
    Palette,
    PenTool,
    Search,
    Sparkles,
    Star,
    TrendingUp,
    Video,
    X,
    Zap
} from "lucide-react";
import { useMemo, useState } from "react";

// Simple Icons imports
import {
    SiAirtable,
    SiAnthropic,
    SiCanva,
    SiClickup,
    SiDiscord,
    SiFigma,
    SiFramer,
    SiGithub,
    SiGoogle,
    SiGrammarly,
    SiLinear,
    SiMeta,
    SiNotion,
    SiOpenai,
    SiReplit,
    SiSemrush,
    SiSlack,
    SiStackblitz,
    SiSupabase,
    SiVercel,
    SiX,
    SiZapier
} from "@icons-pack/react-simple-icons";

// Import data from external file
import aiToolsData, { categories, pricingTypes } from "./data/aiToolsData";

// =====================================================
// BLOG POST METADATA
// =====================================================
export const info = {
    slug: "ultimate-ai-tools-directory-2025",
    title: "The Ultimate Directory of AI Tools (2025 Edition)",
    description: "A comprehensive, curated list of 86+ best AI tools available in 2025. Explore chatbots, image generators, coding assistants, and more.",
    excerpt: "A comprehensive, curated list of 86+ best AI tools available in 2025. Explore chatbots, image generators, coding assistants, and more.",
    publishDate: "2024-12-26",
    category: "AI Resources",
    tags: ["AI Tools", "Productivity", "Directory", "ChatGPT", "Midjourney"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
    featured: true,
    readTime: "15 min read",
    author: "Dev Kant Kumar",
};

// =====================================================
// ICON MAPPING
// =====================================================
const brandIcons = {
    "openai": SiOpenai,
    "anthropic": SiAnthropic,
    "google": SiGoogle,
    "microsoft": "",
    "meta": SiMeta,
    "x": SiX,
    "discord": SiDiscord,
    "github": SiGithub,
    "notion": SiNotion,
    "figma": SiFigma,
    "canva": SiCanva,
    "adobe": "",
    "grammarly": SiGrammarly,
    "zapier": SiZapier,
    "airtable": SiAirtable,
    "clickup": SiClickup,
    "slack": SiSlack,
    "vercel": SiVercel,
    "supabase": SiSupabase,
    "replit": SiReplit,
    "stackblitz": SiStackblitz,
    "semrush": SiSemrush,
    "linear": SiLinear,
    "framer": SiFramer,
};

// Tool to brand icon mapping
const toolIconMap = {
    "ChatGPT": "openai",
    "DALL-E 3": "openai",
    "Sora": "openai",
    "Claude": "anthropic",
    "Google Gemini": "google",
    "Google Imagen 3": "google",
    "Google Veo": "google",
    "NotebookLM": "google",
    "Google AI Studio": "google",
    "Vertex AI": "google",
    "Google Duet AI": "google",
    "MusicLM": "google",
    "Google Cloud Speech-to-Text": "google",
    "Microsoft Copilot": "microsoft",
    "Meta AI": "meta",
    "Grok": "x",
    "Midjourney": "discord",
    "GitHub Copilot": "github",
    "Notion": "notion",
    "Notion AI": "notion",
    "Figma AI": "figma",
    "Canva AI": "canva",
    "Adobe Firefly": "adobe",
    "Adobe Podcast": "adobe",
    "Grammarly": "grammarly",
    "Zapier": "zapier",
    "Airtable": "airtable",
    "ClickUp": "clickup",
    "v0 by Vercel": "vercel",
    "Lovable": "supabase",
    "Replit Ghostwriter": "replit",
    "Bolt.new": "stackblitz",
    "Semrush": "semrush",
    "Framer AI": "framer",
};

// Tool icon component
function ToolIcon({ name, logo, size = 24 }) {
    const brandKey = toolIconMap[name];
    const BrandIcon = brandKey ? brandIcons[brandKey] : null;

    if (BrandIcon) {
        return <BrandIcon size={size} className="text-slate-300" />;
    }

    // Fallback to emoji
    return <span className="text-2xl">{logo}</span>;
}

// =====================================================
// CATEGORY ICONS
// =====================================================
const categoryConfig = {
    "All": { icon: Globe },
    "Chatbots & Assistants": { icon: Bot },
    "Writing & Content": { icon: PenTool },
    "Image Generation": { icon: ImageIcon },
    "Video Generation": { icon: Video },
    "Coding & Development": { icon: CodeIcon },
    "Productivity & Automation": { icon: Zap },
    "Voice & Audio": { icon: Mic },
    "Music Generation": { icon: Music },
    "Research & Data": { icon: BookOpen },
    "Design & UI/UX": { icon: Palette },
    "Marketing & SEO": { icon: Megaphone },
};

const getCategoryIcon = (category) => categoryConfig[category]?.icon || Cpu;

// Pricing colors
const pricingColors = {
    "All": "slate",
    "Free": "emerald",
    "Freemium": "blue",
    "Premium": "purple",
    "Open Source": "green",
};

// =====================================================
// COMPONENTS
// =====================================================

function ToolCard({ tool }) {
    return (
        <motion.a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="group block bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all duration-200 no-underline"
        >
            <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-slate-700/50 border border-slate-600/50 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
                    <ToolIcon name={tool.name} logo={tool.logo} size={22} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors m-0 p-0 truncate">
                            {tool.name}
                        </h4>
                        {tool.featured && (
                            <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            tool.pricing === 'Free' ? 'bg-emerald-500/20 text-emerald-400' :
                            tool.pricing === 'Freemium' ? 'bg-blue-500/20 text-blue-400' :
                            tool.pricing === 'Open Source' ? 'bg-green-500/20 text-green-400' :
                            tool.pricing === 'Waitlist' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-purple-500/20 text-purple-400'
                        }`}>
                            {tool.pricing}
                        </span>
                        {tool.rating && (
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Star size={10} className="text-amber-400 fill-amber-400" />
                                {tool.rating}
                            </span>
                        )}
                    </div>
                </div>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 m-0 p-0">
                {tool.description}
            </p>
        </motion.a>
    );
}

function CategorySection({ category, tools }) {
    const Icon = getCategoryIcon(category);

    return (
        <div className="mb-12" id={category.toLowerCase().replace(/[^a-z]/g, '-')}>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Icon size={20} className="text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white m-0 p-0">{category}</h3>
                    <p className="text-sm text-slate-500 m-0 p-0">{tools.length} tools</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
        </div>
    );
}

function ModernFilters({
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activePricing,
    setActivePricing,
    resultCount,
    onCategoryClick
}) {
    return (
        <div className="mb-10 space-y-6">
            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search 86+ AI tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-700/50 rounded-2xl pl-14 pr-5 py-4 text-white text-lg placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all focus:outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Pills Container */}
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800/50">
                {/* Category Pills */}
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.slice(1).map(cat => {
                            const Icon = getCategoryIcon(cat);
                            const isActive = activeCategory === cat;
                            return (
                                <motion.button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(isActive ? "All" : cat);
                                        if (!isActive) onCategoryClick(cat);
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                                            : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                                    }`}
                                >
                                    <Icon size={15} />
                                    <span>{cat.split(' & ')[0].split(' ')[0]}</span>
                                    {isActive && <Check size={14} className="ml-1" />}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                <div className="h-px bg-slate-800 mb-5" />

                {/* Pricing Pills */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pricing</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {pricingTypes.map(type => {
                                const isActive = activePricing === type;
                                return (
                                    <motion.button
                                        key={type}
                                        onClick={() => setActivePricing(type)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                            isActive
                                                ? type === 'All'
                                                    ? 'bg-slate-600 text-white'
                                                    : type === 'Free'
                                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                                        : type === 'Freemium'
                                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                                            : type === 'Premium'
                                                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                                                                : 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                                                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                                        }`}
                                    >
                                        {type === 'All' ? '✨ All' : type}
                                        {isActive && type !== 'All' && <Check size={14} className="inline ml-1.5" />}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/30">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-sm font-medium text-slate-300">{resultCount}</span>
                        <span className="text-sm text-slate-500">tools found</span>
                    </div>
                </div>
            </div>

            {/* Active Filters Summary */}
            {(activeCategory !== "All" || activePricing !== "All" || searchQuery) && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 flex-wrap"
                >
                    <span className="text-sm text-slate-500">Active filters:</span>
                    {searchQuery && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-300">
                            "{searchQuery}"
                            <button onClick={() => setSearchQuery('')} className="text-slate-500 hover:text-white">
                                <X size={12} />
                            </button>
                        </span>
                    )}
                    {activeCategory !== "All" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm">
                            {activeCategory}
                            <button onClick={() => setActiveCategory('All')} className="text-cyan-400 hover:text-white">
                                <X size={12} />
                            </button>
                        </span>
                    )}
                    {activePricing !== "All" && (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${
                            activePricing === 'Free' ? 'bg-emerald-500/20 text-emerald-300' :
                            activePricing === 'Freemium' ? 'bg-blue-500/20 text-blue-300' :
                            activePricing === 'Premium' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-green-500/20 text-green-300'
                        }`}>
                            {activePricing}
                            <button onClick={() => setActivePricing('All')} className="hover:text-white">
                                <X size={12} />
                            </button>
                        </span>
                    )}
                    <button
                        onClick={() => {setSearchQuery(''); setActiveCategory('All'); setActivePricing('All');}}
                        className="text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                        Clear all
                    </button>
                </motion.div>
            )}
        </div>
    );
}

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function AIToolsDirectory() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activePricing, setActivePricing] = useState("All");

    const toolsByCategory = useMemo(() => {
        const grouped = {};
        categories.slice(1).forEach(cat => {
            grouped[cat] = [];
        });

        aiToolsData.forEach(tool => {
            const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
            const matchesPricing = activePricing === "All" || tool.pricing === activePricing;
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = searchQuery === "" ||
                tool.name.toLowerCase().includes(searchLower) ||
                tool.description.toLowerCase().includes(searchLower) ||
                tool.tags.some(tag => tag.toLowerCase().includes(searchLower));

            if (matchesCategory && matchesPricing && matchesSearch && grouped[tool.category]) {
                grouped[tool.category].push(tool);
            }
        });

        return grouped;
    }, [searchQuery, activeCategory, activePricing]);

    const totalFilteredCount = useMemo(() => {
        return Object.values(toolsByCategory).reduce((acc, tools) => acc + tools.length, 0);
    }, [toolsByCategory]);

    const featuredTools = useMemo(() => aiToolsData.filter(t => t.featured).slice(0, 6), []);

    const scrollToCategory = (category) => {
        const id = category.toLowerCase().replace(/[^a-z]/g, '-');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const showFeatured = searchQuery === "" && activeCategory === "All" && activePricing === "All";

    return (
        <div className="not-prose text-slate-300">
            {/* Hero Section */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                    <Sparkles size={16} className="text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-300">2025 AI Tools Directory</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI Tool</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    {aiToolsData.length} curated AI tools across {categories.length - 1} categories
                </p>
            </div>

            <ModernFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activePricing={activePricing}
                setActivePricing={setActivePricing}
                resultCount={totalFilteredCount}
                onCategoryClick={scrollToCategory}
            />

            {showFeatured && (
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp size={20} className="text-amber-400" />
                        <h3 className="text-xl font-bold text-white m-0 p-0">Featured Tools</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featuredTools.map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </div>
            )}

            {totalFilteredCount > 0 ? (
                categories.slice(1).map(category => {
                    const tools = toolsByCategory[category];
                    if (tools.length === 0) return null;
                    return (
                        <CategorySection
                            key={category}
                            category={category}
                            tools={tools}
                        />
                    );
                })
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <Filter size={48} className="text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-400 mb-2 m-0 p-0">No tools found</h3>
                    <p className="text-slate-500 mb-4 m-0 p-0">Try adjusting your filters</p>
                    <button
                        onClick={() => {setSearchQuery(''); setActiveCategory('All'); setActivePricing('All');}}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-400 transition-colors"
                    >
                        Clear Filters
                    </button>
                </motion.div>
            )}

            <div className="mt-16 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-white mb-2 m-0 p-0">Missing a tool?</h3>
                <p className="text-slate-400 mb-4 m-0 p-0">We're constantly updating this directory.</p>
                <a
                    href="#comments"
                    onClick={(e) => {
                        e.preventDefault();
                        const comments = document.getElementById('comments');
                        if (comments) {
                            comments.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="inline-block px-6 py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                    Suggest a Tool
                </a>
            </div>
        </div>
    );
}

// =====================================================
// IMAGE COMPONENTS
// =====================================================

// Thumbnail Image - for search results
function AIToolsThumbnail({ className = "" }) {
    return (
        <div className={`bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
            <Sparkles size={24} className="text-cyan-400 relative z-10" />
        </div>
    );
}

// Card Image - for blog listing
function AIToolsCardImage({ className = "" }) {
    return (
        <div className={`bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 relative overflow-hidden ${className}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />

            {/* Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3">
                    <Sparkles size={28} className="text-cyan-400" />
                </div>
                <span className="text-xs font-medium text-cyan-400 mb-1">2025 Edition</span>
                <h3 className="text-lg font-bold text-white leading-tight">AI Tools Directory</h3>
                <p className="text-sm text-slate-400 mt-1">86+ Curated Tools</p>
            </div>
        </div>
    );
}

// Featured Image - for featured carousel
function AIToolsFeaturedImage({ className = "" }) {
    return (
        <div className={`bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden ${className}`}>
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/15 rounded-full blur-[100px]" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-cyan-300 text-sm font-medium">2025 Edition</span>
                </div>

                {/* Icon Grid */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                        <Bot size={24} className="text-cyan-400" />
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <Sparkles size={28} className="text-cyan-400" />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                        <CodeIcon size={24} className="text-blue-400" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
                    <span className="text-white">AI Tools </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Directory</span>
                </h2>

                {/* Stats */}
                <div className="flex items-center gap-6 text-slate-400">
                    <span className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">86+</span> Tools
                    </span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                    <span className="flex items-center gap-2">
                        <span className="text-blue-400 font-bold">11</span> Categories
                    </span>
                </div>
            </div>
        </div>
    );
}

// Attach images to component
AIToolsDirectory.ThumbnailImage = AIToolsThumbnail;
AIToolsDirectory.CardImage = AIToolsCardImage;
AIToolsDirectory.FeaturedImage = AIToolsFeaturedImage;
AIToolsDirectory.info = info;
