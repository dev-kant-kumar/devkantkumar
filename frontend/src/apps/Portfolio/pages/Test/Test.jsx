import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BarChart,
  BarChart3,
  Bookmark,
  Bot,
  Boxes,
  Briefcase,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  Code as CodeIcon,
  Cpu,
  DollarSign,
  ExternalLink,
  Eye,
  Filter, Globe,
  GraduationCap,
  Heart, Image as ImageIcon,
  Languages,
  Megaphone, MessageSquare,
  Music, Palette,
  PenTool,
  Search, Shield,
  Sparkles, Star,
  Target, TestTube,
  TrendingUp, Users, Video,
  X,
  Zap
} from "lucide-react";
import { useMemo, useState } from "react";

// =====================================================
// COMPREHENSIVE DATA STRUCTURE
// =====================================================

const categories = [
    "All Tools",
    "Chatbots & Assistants",
    "Writing & Content",
    "Image Generation",
    "Video Creation",
    "Audio & Music",
    "Coding & Development",
    "Productivity & Automation",
    "Data & Analytics",
    "Marketing & SEO",
    "Design & UI/UX",
    "Business & Finance",
    "Education & Learning",
    "Healthcare & Wellness",
    "Customer Support",
    "Research & Science",
    "Translation & Language",
    "Legal & Compliance",
    "HR & Recruitment",
    "Sales & CRM"
];

const pricingTypes = ["All", "Free", "Freemium", "Premium", "Enterprise", "Open Source"];
const useCases = ["Personal", "Business", "Enterprise", "Developers", "Creators", "Students", "Agencies"];

// Import the comprehensive tools data
// import { aiToolsDatabase } from './toolsData';

// =====================================================
// MOCK DATABASE (Replace with your actual data)
// =====================================================
const aiToolsDatabase = [
    // Top Tier - Must Have Tools
    { id: 1, name: "ChatGPT", slug: "chatgpt", category: "Chatbots & Assistants", description: "OpenAI's flagship conversational AI powered by GPT-4.1 and o1 reasoning models. Handles text, images, code generation, data analysis, and complex problem-solving with 128K context window.", url: "https://chat.openai.com", pricing: "Freemium", featured: true, trending: true, tags: ["conversation", "gpt4", "reasoning", "multimodal", "code", "analysis"], logo: "🤖", rating: 4.8, users: "200M+", release: "2022", verified: true, useCases: ["Personal", "Business", "Developers"], keyFeatures: ["GPT-4.1 & o1 models", "128K context", "DALL-E 3 images", "Code interpreter", "Web browsing", "Custom GPTs"], integration: ["API", "iOS", "Android", "Web"], languages: ["100+"], lastUpdated: "Dec 2024" },

    { id: 2, name: "Claude", slug: "claude", category: "Chatbots & Assistants", description: "Anthropic's AI assistant with extended 200K context, exceptional coding abilities, artifact creation for documents and apps, and emphasis on safety and accuracy.", url: "https://claude.ai", pricing: "Freemium", featured: true, trending: true, tags: ["coding", "documents", "long-context", "ethical-ai", "artifacts"], logo: "🧠", rating: 4.9, users: "50M+", release: "2023", verified: true, useCases: ["Business", "Developers", "Enterprise"], keyFeatures: ["200K context window", "Artifact creation", "Superior coding", "PDF analysis", "Project knowledge", "Team collaboration"], integration: ["API", "Web", "iOS", "Android"], languages: ["Multiple"], lastUpdated: "Dec 2024" },

    { id: 3, name: "Google Gemini", slug: "gemini", category: "Chatbots & Assistants", description: "Google's multimodal AI with real-time web access, YouTube video analysis, Google Workspace integration, and the powerful Gemini 2.0 model for complex reasoning.", url: "https://gemini.google.com", pricing: "Freemium", featured: true, trending: true, tags: ["multimodal", "google", "workspace", "search", "real-time"], logo: "✨", rating: 4.7, users: "100M+", release: "2023", verified: true, useCases: ["Personal", "Business", "Enterprise"], keyFeatures: ["Real-time web search", "YouTube analysis", "Workspace integration", "Gemini 2.0", "Image understanding", "Code execution"], integration: ["Workspace", "Android", "Web"], languages: ["40+"], lastUpdated: "Dec 2024" },

    { id: 4, name: "Microsoft Copilot", slug: "copilot", category: "Chatbots & Assistants", description: "GPT-4 powered assistant deeply integrated across Windows 11, Edge browser, Office 365 apps with enterprise-grade security and compliance features.", url: "https://copilot.microsoft.com", pricing: "Freemium", featured: true, tags: ["microsoft", "office", "enterprise", "integration", "windows"], logo: "💼", rating: 4.6, users: "75M+", release: "2023", verified: true, useCases: ["Business", "Enterprise"], keyFeatures: ["Office 365 integration", "Enterprise security", "Commercial data protection", "Designer (DALL-E)", "Bing search", "Windows integration"], integration: ["Office 365", "Windows", "Edge"], languages: ["40+"], lastUpdated: "Dec 2024" },

    { id: 5, name: "Perplexity AI", slug: "perplexity", category: "Chatbots & Assistants", description: "AI-powered answer engine with cited sources, real-time information access, comprehensive research capabilities, and Pro Search for deep dive investigations.", url: "https://perplexity.ai", pricing: "Freemium", featured: true, trending: true, tags: ["research", "citations", "search", "accuracy", "sources"], logo: "🔍", rating: 4.8, users: "30M+", release: "2022", verified: true, useCases: ["Personal", "Business", "Students"], keyFeatures: ["Cited sources", "Pro Search mode", "Follow-up questions", "Mobile apps", "Collections", "API access"], integration: ["API", "iOS", "Android", "Chrome"], languages: ["Multiple"], lastUpdated: "Dec 2024" },

    // Image Generation Leaders
    { id: 10, name: "Midjourney", slug: "midjourney", category: "Image Generation", description: "Industry-leading AI art generator producing stunning photorealistic and artistic images via Discord. Version 6.1 offers unprecedented detail and style control.", url: "https://midjourney.com", pricing: "Premium", featured: true, trending: true, tags: ["art", "photorealistic", "discord", "v6", "professional"], logo: "🎨", rating: 4.9, users: "20M+", release: "2022", verified: true, useCases: ["Creators", "Business", "Agencies"], keyFeatures: ["V6.1 model", "Style consistency", "High resolution", "Aspect ratios", "Discord interface", "Commercial license"], integration: ["Discord", "Web (Alpha)"], languages: ["English"], lastUpdated: "Dec 2024" },

    { id: 11, name: "DALL-E 3", slug: "dalle3", category: "Image Generation", description: "OpenAI's advanced image generator with superior text rendering and prompt following, integrated directly into ChatGPT Plus and Microsoft Designer.", url: "https://openai.com/dall-e-3", pricing: "Freemium", featured: true, tags: ["text-rendering", "integration", "openai", "chatgpt"], logo: "🖼️", rating: 4.8, users: "50M+", release: "2023", verified: true, useCases: ["Personal", "Creators", "Business"], keyFeatures: ["Text in images", "ChatGPT integration", "Prompt rewriting", "Safety features", "Multiple variations", "Commercial use"], integration: ["ChatGPT", "Bing", "API"], languages: ["Multiple"], lastUpdated: "Oct 2023" },

    { id: 12, name: "Stable Diffusion", slug: "stable-diffusion", category: "Image Generation", description: "Open-source image generation model that runs locally with complete control, customization through LoRA models, and active community development.", url: "https://stability.ai", pricing: "Open Source", featured: true, tags: ["open-source", "local", "customizable", "lora", "community"], logo: "🌊", rating: 4.7, users: "100M+", release: "2022", verified: true, useCases: ["Developers", "Creators", "Personal"], keyFeatures: ["Open source", "Local deployment", "LoRA training", "ControlNet", "Unlimited generation", "No censorship"], integration: ["Python", "ComfyUI", "Automatic1111"], languages: ["All"], lastUpdated: "Dec 2024" },

    // Video Generation
    { id: 20, name: "Runway Gen-3", slug: "runway", category: "Video Creation", description: "Hollywood-grade AI video generation with advanced motion control, camera movements, and cinematic quality output. Used in major film productions.", url: "https://runwayml.com", pricing: "Freemium", featured: true, trending: true, tags: ["cinematic", "motion-control", "professional", "gen3", "film"], logo: "🎬", rating: 4.9, users: "3M+", release: "2024", verified: true, useCases: ["Creators", "Business", "Agencies"], keyFeatures: ["Gen-3 Alpha", "Motion brush", "Camera control", "Text-to-video", "Image-to-video", "Extend video"], integration: ["Web", "API"], languages: ["English"], lastUpdated: "Dec 2024" },

    { id: 21, name: "Sora", slug: "sora", category: "Video Creation", description: "OpenAI's revolutionary text-to-video model creating up to 60-second videos with complex scenes, multiple characters, and realistic physics.", url: "https://openai.com/sora", pricing: "Waitlist", featured: true, trending: true, tags: ["openai", "text-to-video", "revolutionary", "60s", "physics"], logo: "🌌", rating: 4.8, users: "Limited", release: "2024", verified: true, useCases: ["Creators", "Business"], keyFeatures: ["60s videos", "Complex scenes", "Realistic physics", "Character consistency", "World simulation", "Style control"], integration: ["Waitlist only"], languages: ["English"], lastUpdated: "Feb 2024" },

    // Add 100+ more tools across all categories...
    // Coding Tools
    { id: 30, name: "GitHub Copilot", slug: "copilot-github", category: "Coding & Development", description: "AI pair programmer by GitHub and OpenAI with intelligent code completion, chat assistance, PR reviews, and support for all programming languages.", url: "https://github.com/features/copilot", pricing: "Premium", featured: true, tags: ["code-completion", "github", "multi-language", "pair-programming"], logo: "💻", rating: 4.8, users: "50M+", release: "2021", verified: true, useCases: ["Developers", "Business", "Enterprise"], keyFeatures: ["Code completion", "Chat interface", "PR assistance", "Security scanning", "CLI tool", "Multi-language"], integration: ["VS Code", "JetBrains", "Neovim", "Visual Studio"], languages: ["All"], lastUpdated: "Dec 2024" },

    { id: 31, name: "Cursor", slug: "cursor", category: "Coding & Development", description: "AI-first code editor with codebase-aware completions, natural language commands, GPT-4 integration, and instant codebase understanding.", url: "https://cursor.sh", pricing: "Freemium", featured: true, trending: true, tags: ["editor", "codebase-aware", "commands", "gpt4"], logo: "⌨️", rating: 4.9, users: "1M+", release: "2023", verified: true, useCases: ["Developers", "Business"], keyFeatures: ["Codebase understanding", "Natural language edit", "GPT-4 integration", "Multi-file editing", "Terminal integration", "Fast performance"], integration: ["Standalone editor"], languages: ["All"], lastUpdated: "Dec 2024" },

    // Writing Tools
    { id: 40, name: "Jasper AI", slug: "jasper", category: "Writing & Content", description: "Enterprise AI writing platform with 50+ templates, brand voice customization, team collaboration, and SEO optimization for marketing content.", url: "https://jasper.ai", pricing: "Premium", featured: true, tags: ["marketing", "templates", "brand-voice", "enterprise", "seo"], logo: "✍️", rating: 4.7, users: "10M+", release: "2021", verified: true, useCases: ["Business", "Agencies", "Enterprise"], keyFeatures: ["50+ templates", "Brand voice", "Team collaboration", "SEO mode", "Plagiarism checker", "Chrome extension"], integration: ["Chrome", "Surfer SEO", "Grammarly"], languages: ["30+"], lastUpdated: "Dec 2024" },

    { id: 41, name: "Grammarly", slug: "grammarly", category: "Writing & Content", description: "Comprehensive AI writing assistant with grammar checking, tone detection, plagiarism detection, style suggestions, and generative AI writing.", url: "https://grammarly.com", pricing: "Freemium", featured: true, tags: ["grammar", "editing", "tone", "plagiarism", "writing"], logo: "📚", rating: 4.8, users: "30M+", release: "2009", verified: true, useCases: ["Personal", "Business", "Students"], keyFeatures: ["Grammar checking", "Tone detector", "Plagiarism check", "GrammarlyGO", "Style guide", "Cross-platform"], integration: ["Chrome", "Word", "Gmail", "Docs"], languages: ["English"], lastUpdated: "Dec 2024" },

    // Productivity
    { id: 50, name: "Notion AI", slug: "notion-ai", category: "Productivity & Automation", description: "Built-in AI for Notion workspace with content generation, editing, summarization, database operations, and seamless workflow integration.", url: "https://notion.so/product/ai", pricing: "Freemium", featured: true, tags: ["workspace", "productivity", "database", "collaboration"], logo: "📋", rating: 4.8, users: "100M+", release: "2023", verified: true, useCases: ["Personal", "Business", "Enterprise"], keyFeatures: ["AI writing", "Autofill databases", "Summarization", "Q&A on docs", "Translation", "Brainstorming"], integration: ["Notion workspace"], languages: ["10+"], lastUpdated: "Dec 2024" },

    // Add 100+ more entries covering:
    // - Audio & Music (ElevenLabs, Suno, Udio, etc.)
    // - Marketing & SEO (Surfer, Semrush AI, etc.)
    // - Data & Analytics (Julius, Polymer, etc.)
    // - Design tools (Figma AI, Framer AI, etc.)
    // - Business tools (various categories)
    // This is a template - expand with real comprehensive data
];

// Generate more tools for demo purposes
const generateMoreTools = () => {
    const additionalCategories = categories.slice(6); // Categories beyond the first ones
    const moreTools = [];
    let id = 100;

    additionalCategories.forEach(category => {
        for (let i = 0; i < 8; i++) {
            moreTools.push({
                id: id++,
                name: `${category} Tool ${i + 1}`,
                slug: `${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i + 1}`,
                category,
                description: `Professional ${category.toLowerCase()} solution with AI-powered features, automation capabilities, and enterprise-grade performance for modern workflows.`,
                url: "https://example.com",
                pricing: ["Free", "Freemium", "Premium"][i % 3],
                featured: i === 0,
                trending: i < 2,
                tags: ["ai", "automation", "professional", category.toLowerCase()],
                logo: ["🚀", "⚡", "🎯", "🔥", "💎", "🌟", "✨", "🎨"][i],
                rating: 4.3 + (Math.random() * 0.6),
                users: ["10K+", "100K+", "1M+", "5M+", "10M+"][Math.floor(Math.random() * 5)],
                release: "2023",
                verified: i < 3,
                useCases: ["Business", "Enterprise"],
                keyFeatures: ["AI-powered", "Automation", "Analytics", "Integration", "Scalable", "Secure"],
                integration: ["Web", "API"],
                languages: ["English"],
                lastUpdated: "2024"
            });
        }
    });

    return moreTools;
};

const allTools = [...aiToolsDatabase, ...generateMoreTools()];

// =====================================================
// COMPONENTS
// =====================================================

function HeroSection({ totalTools }) {
    return (
        <div className="relative w-full min-h-[600px] flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-800 bg-[#020617] mb-12">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/30 to-[#020617]" />
            </div>

            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse animation-delay-1000" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/15 rounded-full blur-[100px] animate-pulse animation-delay-2000" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-md mb-8 hover:border-cyan-400/40 transition-all group"
                >
                    <Sparkles size={16} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-bold tracking-wide text-cyan-100 uppercase">The Complete 2025 AI Stack</span>
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 leading-[1.05]"
                >
                    The World's Most<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                        Complete AI Directory
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    <strong className="text-white">{totalTools}+ curated AI tools</strong> across 20 categories.
                    Your single source of truth for finding, comparing, and deploying the perfect AI solution.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <a href="#directory" className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-cyan-500/50 hover:scale-105 flex items-center gap-2">
                        Explore All Tools
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </a>
                    <button className="px-8 py-4 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl text-white font-bold text-lg hover:bg-slate-700 transition-all flex items-center gap-2">
                        <Bookmark size={20} />
                        Save for Later
                    </button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400"
                >
                    <div className="flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-400" />
                        <span className="text-sm font-medium">Daily Updates</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={20} className="text-cyan-400" />
                        <span className="text-sm font-medium">10M+ Monthly Visitors</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={20} className="text-purple-400" />
                        <span className="text-sm font-medium">Verified Tools Only</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function StatsDashboard() {
    const stats = [
        { label: "AI Tools Listed", value: allTools.length, icon: Boxes, color: "from-cyan-500 to-blue-500" },
        { label: "Categories", value: categories.length, icon: BarChart3, color: "from-purple-500 to-pink-500" },
        { label: "Updated Daily", value: "24/7", icon: Clock, color: "from-green-500 to-emerald-500" },
        { label: "Always Free", value: "100%", icon: Heart, color: "from-red-500 to-orange-500" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all hover:scale-105"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                    <div className="relative">
                        <stat.icon className="w-8 h-8 text-slate-600 group-hover:text-cyan-400 transition-colors mb-3" />
                        <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function ToolCard({ tool }) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const categoryIcons = {
        "Chatbots & Assistants": Bot,
        "Writing & Content": PenTool,
        "Image Generation": ImageIcon,
        "Video Creation": Video,
        "Audio & Music": Music,
        "Coding & Development": CodeIcon,
        "Productivity & Automation": Zap,
        "Data & Analytics": BarChart,
        "Marketing & SEO": Megaphone,
        "Design & UI/UX": Palette,
        "Business & Finance": Briefcase,
        "Education & Learning": GraduationCap,
        "Healthcare & Wellness": Heart,
        "Customer Support": MessageSquare,
        "Research & Science": TestTube,
        "Translation & Language": Languages,
        "Legal & Compliance": Shield,
        "HR & Recruitment": Users,
        "Sales & CRM": Target,
    };

    const Icon = categoryIcons[tool.category] || Cpu;

    const pricingColors = {
        "Free": "from-emerald-500 to-green-500",
        "Freemium": "from-blue-500 to-cyan-500",
        "Premium": "from-purple-500 to-pink-500",
        "Enterprise": "from-orange-500 to-red-500",
        "Open Source": "from-teal-500 to-blue-500",
        "Waitlist": "from-amber-500 to-yellow-500"
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col h-full bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10"
        >
            {/* Status Badges */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                {tool.featured && (
                    <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-black text-white shadow-lg flex items-center gap-1">
                        <Star size={12} className="fill-white" />
                        FEATURED
                    </div>
                )}
                {tool.trending && (
                    <div className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-xs font-black text-white shadow-lg flex items-center gap-1">
                        <TrendingUp size={12} />
                        TRENDING
                    </div>
                )}
                {tool.verified && (
                    <div className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-black text-white shadow-lg flex items-center gap-1">
                        <CheckCircle size={12} />
                        VERIFIED
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-300 shadow-lg">
                            {tool.logo}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-900 rounded-full border-2 border-slate-800 flex items-center justify-center">
                            <Icon size={14} className="text-cyan-400" />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black text-white mb-1 group-hover:text-cyan-300 transition-colors truncate">
                            {tool.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono truncate">{tool.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                                <Star size={14} className="text-amber-400 fill-amber-400" />
                                <span className="text-sm font-bold text-slate-300">{tool.rating}</span>
                            </div>
                            <span className="text-slate-600">•</span>
                            <span className="text-xs text-slate-400">{tool.users} users</span>
                        </div>
                    </div>
                </div>

                {/* Pricing Badge */}
                <div className={`inline-flex self-start items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r ${pricingColors[tool.pricing] || pricingColors.Freemium} bg-opacity-10 border border-white/10 mb-4`}>
                    <DollarSign size={12} className="text-white" />
                    <span className="text-xs font-black text-white uppercase">{tool.pricing}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {tool.description}
                </p>

                {/* Key Features */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {tool.keyFeatures.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                <Check size={12} className="text-cyan-400" />
                                <span className="text-xs text-slate-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 min-h-[24px]">
                    {tool.tags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="text-xs text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-slate-800/50 flex gap-2">
                    <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold transition-all group/btn shadow-lg hover:shadow-cyan-500/50"
                    >
                        <span>Visit Website</span>
                        <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                    <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`px-4 py-3 rounded-xl border transition-all ${
                            isBookmarked
                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                    >
                        <Bookmark size={16} className={isBookmarked ? 'fill-cyan-400' : ''} />
                    </button>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/20 rounded-3xl pointer-events-none transition-all duration-300" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 pointer-events-none -z-10" />
        </motion.div>
    );
}

function FilterBar({
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activePricing,
    setActivePricing,
    filteredCount,
    isSearchFocused,
    setIsSearchFocused
}) {
    const categoryIcons = {
        "All Tools": Globe,
        "Chatbots & Assistants": Bot,
        "Writing & Content": PenTool,
        "Image Generation": ImageIcon,
        "Video Creation": Video,
        "Audio & Music": Music,
        "Coding & Development": CodeIcon,
        "Productivity & Automation": Zap,
        "Data & Analytics": BarChart,
        "Marketing & SEO": Megaphone,
        "Design & UI/UX": Palette,
        "Business & Finance": Briefcase,
        "Education & Learning": GraduationCap,
        "Healthcare & Wellness": Heart,
        "Customer Support": MessageSquare,
        "Research & Science": TestTube,
        "Translation & Language": Languages,
        "Legal & Compliance": Shield,
        "HR & Recruitment": Users,
        "Sales & CRM": Target,
    };

    return (
        <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-y border-slate-800 shadow-2xl mb-8 -mx-4 px-4 py-6">
            <div className="max-w-[1800px] mx-auto">
                {/* Top Row: Title + Search + Pricing Filter */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-3xl font-black text-white flex items-center gap-3 mb-2">
                            <Globe size={32} className="text-cyan-400" />
                            AI Tools Directory
                        </h2>
                        <p className="text-sm text-slate-400 font-mono flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                <Eye size={14} className="text-cyan-400" />
                                <span className="font-bold text-cyan-400">{filteredCount}</span>
                            </span>
                            TOOLS FOUND
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        {/* Search */}
                        <div className="relative w-full sm:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className={`w-5 h-5 transition-colors ${isSearchFocused ? 'text-cyan-400' : 'text-slate-500'}`} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search tools, features, categories..."
                                className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 pl-12 pr-4 py-3.5 transition-all shadow-inner placeholder:text-slate-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Pricing Filter */}
                        <div className="relative">
                            <select
                                value={activePricing}
                                onChange={(e) => setActivePricing(e.target.value)}
                                className="w-full sm:w-auto appearance-none bg-slate-900 border border-slate-700 text-white text-sm rounded-xl pl-4 pr-10 py-3.5 cursor-pointer hover:border-slate-600 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                            >
                                {pricingTypes.map(type => (
                                    <option key={type} value={type}>{type === "All" ? "All Pricing" : type}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Categories Scroll */}
                <div className="relative">
                    <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-2 px-2">
                        {categories.map((cat) => {
                            const Icon = categoryIcons[cat] || Cpu;
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                                        isActive
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white shadow-lg shadow-cyan-500/30 scale-105"
                                            : "bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-600"
                                    }`}
                                >
                                    <Icon size={16} className={isActive ? "animate-pulse" : ""} />
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-slate-950/95 to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-slate-950/95 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}

function FeaturedSection({ tools }) {
    if (tools.length === 0) return null;

    return (
        <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-white flex items-center gap-3 mb-2">
                        <Star size={28} className="text-amber-400 fill-amber-400" />
                        Featured & Trending
                    </h2>
                    <p className="text-slate-400">Hand-picked tools leading the AI revolution</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.slice(0, 6).map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
        </div>
    );
}

function EmptyState({ onReset }) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 flex items-center justify-center mb-6">
                <Filter size={40} className="text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-300 mb-3">No tools match your criteria</h3>
            <p className="text-slate-500 mb-8 max-w-md">
                Try adjusting your filters or search query to discover more AI tools.
            </p>
            <button
                onClick={onReset}
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
            >
                <Filter size={18} />
                Clear All Filters
            </button>
        </div>
    );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function AIToolsDirectory() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Tools");
    const [activePricing, setActivePricing] = useState("All");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Filter Logic
    const filteredTools = useMemo(() => {
        return allTools.filter((tool) => {
            const matchesCategory = activeCategory === "All Tools" || tool.category === activeCategory;
            const matchesPricing = activePricing === "All" || tool.pricing === activePricing;

            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = searchQuery === "" ||
                tool.name.toLowerCase().includes(searchLower) ||
                tool.description.toLowerCase().includes(searchLower) ||
                tool.category.toLowerCase().includes(searchLower) ||
                tool.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
                tool.keyFeatures.some((feature) => feature.toLowerCase().includes(searchLower));

            return matchesCategory && matchesPricing && matchesSearch;
        });
    }, [searchQuery, activeCategory, activePricing]);

    const featuredTools = useMemo(() =>
        allTools.filter(t => t.featured || t.trending).slice(0, 6),
    []);

    const handleReset = () => {
        setSearchQuery('');
        setActiveCategory('All Tools');
        setActivePricing('All');
    };

    const showFeatured = searchQuery === "" && activeCategory === "All Tools" && activePricing === "All";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
            <div className="max-w-[1800px] mx-auto px-4 py-8">
                {/* Hero */}
                <HeroSection totalTools={allTools.length} />

                {/* Stats */}
                <StatsDashboard />

                {/* Featured Section */}
                {showFeatured && <FeaturedSection tools={featuredTools} />}

                {/* Main Directory */}
                <div id="directory">
                    <FilterBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        activePricing={activePricing}
                        setActivePricing={setActivePricing}
                        filteredCount={filteredTools.length}
                        isSearchFocused={isSearchFocused}
                        setIsSearchFocused={setIsSearchFocused}
                    />

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            {filteredTools.length > 0 ? (
                                filteredTools.map((tool) => (
                                    <ToolCard key={tool.id} tool={tool} />
                                ))
                            ) : (
                                <EmptyState onReset={handleReset} />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Load More / Pagination could go here */}
                    {filteredTools.length > 0 && (
                        <div className="mt-12 text-center">
                            <p className="text-slate-500 text-sm">
                                Showing {filteredTools.length} of {allTools.length} tools
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer CTA */}
                <div className="mt-24 mb-12 p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 text-center">
                    <h2 className="text-4xl font-black text-white mb-4">Can't find what you need?</h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        We're constantly adding new AI tools. Submit your favorite tool or request a specific category.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-cyan-500/50">
                            Submit a Tool
                        </button>
                        <button className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold hover:bg-slate-700 transition-all">
                            Request Category
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
