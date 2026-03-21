import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    DollarSign,
    ExternalLink,
    HelpCircle,
    Info,
    Layout,
    Play,
    Sparkles,
    Star,
    Video,
    Zap,
    Image as ImageIcon,
    Mic,
    ShieldCheck
} from "lucide-react";
import { useState } from "react";

// =====================================================
// BLOG POST METADATA - SEO OPTIMIZED
// =====================================================
export const info = {
    slug: "free-ai-video-generators-2026",
    title: "5 Best FREE AI Video Generators 2026 (No Credit Card & Limits)",
    description: "Tired of paywalls? These 5 AI video generators are 100% FREE in 2026. No credit card, no watermarks, no credit limits. Arena, Qwen, Wan, Vheer & Digen compared.",
    excerpt: "Most \"free\" AI video tools are lying. Here are 5 that genuinely give you unlimited generations — no credit card, no watermark, no catch.",
    publishDate: "2026-03-21",
    modifiedDate: "2026-03-21",
    category: "Tools",
    featured: true,
    readTime: "7 min read",
    author: "Dev Kant Kumar",
    image: "/images/blog/free-ai-video-generators-2026.jpg",
    keywords: "free AI video generator no watermark, unlimited AI video generator 2026, Arena AI free video, Qwen AI video generator free, Wan AI unlimited videos, Best free AI video 2026, no credit card AI video",
    tags: [
        "AI Tools",
        "Video Generation",
        "Free Tools",
        "Content Creation",
        "2026",
        "Sora Alternatives",
        "Unlimited AI"
    ],
    faqs: [
        {
            question: "Are these AI video generators really free in 2026?",
            answer: "Yes! While many tools use 'freemium' models, the tools on this list either provide genuine unlimited generations (like Qwen AI), have community-based credit systems (Digen AI), or allow local execution (Wan AI) with no cost."
        },
        {
            question: "Do I need a credit card to sign up?",
            answer: "No. All tools mentioned here allow you to start generating videos without entering any credit card information. Some even allow anonymous use without an account."
        },
        {
            question: "Which free AI video tool is best for social media?",
            answer: "Qwen AI is excellent for social media because it generates synchronized audio along with the video. Digen AI is also great for beginners as it provides templates for quick social content."
        },
        {
            question: "Is there a watermark on the free videos?",
            answer: "The tools on this list, such as Arena AI and Wan AI (when run locally), do not add watermarks to your generated content, making them perfect for professional use."
        }
    ],
};

// =====================================================
// REUSABLE COMPONENTS
// =====================================================

const CTAButton = ({ href, children, variant = "primary", className = "" }) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-300 group whitespace-nowrap";
    const variants = {
        primary: "bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:from-purple-500 hover:to-indigo-400 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5",
        secondary: "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600",
        outline: "bg-transparent text-purple-400 border-2 border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-400",
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
    );
};

const ScreenshotPlaceholder = ({ tool, image }) => (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl">
        {image ? (
            <div className="relative group">
                <img
                    src={image}
                    alt={`${tool} Interface Screenshot`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-6">
                    <p className="text-white font-bold text-sm flex items-center gap-2">
                        <Layout className="w-4 h-4 text-purple-400" />
                        {tool} Dashboard
                    </p>
                </div>
            </div>
        ) : (
            <div className="aspect-video flex flex-col items-center justify-center p-8 text-center group hover:border-purple-500/50 transition-all duration-500 border-2 border-dashed border-slate-700">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500/10 transition-colors">
                    <ImageIcon className="w-8 h-8 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <p className="text-slate-400 font-medium mb-1">Screenshot of {tool} Interface</p>
                <p className="text-slate-600 text-sm italic">Reserved for tool UI showcase & generation results</p>
            </div>
        )}
    </div>
);

const VerdictBox = () => (
    <div className="bg-gradient-to-br from-purple-900/30 via-slate-900/50 to-indigo-900/30 border border-purple-500/30 rounded-2xl p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">The Verdict</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Arena AI is the best overall choice for pure visual quality</h3>
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/50 text-amber-400/50'}`} />
                        ))}
                    </div>
                    <span className="font-bold text-white">4.8/5</span>
                </div>
            </div>
            <CTAButton href="https://lmarena.ai" className="shrink-0">
                Try Arena AI Free
            </CTAButton>
        </div>
    </div>
);

// =====================================================
// MAIN BLOG POST COMPONENT
// =====================================================
const FreeAIVideoGenerators2026 = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const tools = [
        {
            name: "Arena AI",
            bestFor: "Highest quality output, comparing top models side by side",
            rating: 4.8,
            badge: "Editor's Choice",
            description: "Built by LMSYS, Arena gives you access to Sora, Kling, Veo, and Runway in 'Battle Mode'. You get top-tier cinematic quality completely free.",
            steps: [
                "Go to lmarena.ai",
                "Switch to Battle Mode → enable Video Generation",
                "Type your prompt and generate",
                "Compare two videos side by side"
            ],
            limitations: "Videos are short clips, no audio natively, limited aspect ratio control.",
            link: "https://lmarena.ai",
            image: "/images/blog/arena-ai.jpg",
            icon: Sparkles
        },
        {
            name: "Qwen AI",
            bestFor: "Unlimited generations, built-in audio synchronization",
            rating: 4.7,
            description: "Alibaba's Qwen provides a generous free tier with built-in audio generation. It's essentially unlimited for most users.",
            steps: [
                "Visit qwen.ai and create a free account",
                "Select Qwen 2.5 Max model",
                "Click More → Video Generation",
                "Choose aspect ratio and generate"
            ],
            limitations: "Servers can be congested; generation can take 10-20 minutes during peak hours.",
            link: "https://qwen.ai",
            image: "/images/blog/qwen-ai.jpg",
            icon: Mic
        },
        {
            name: "Wan AI",
            bestFor: "Lip sync and character-driven videos",
            rating: 4.6,
            description: "Wan stands out with exceptional lip-syncing. Running it locally via Pinokio browser gives you truly unlimited power.",
            steps: [
                "Download Pinokio browser",
                "Search for Wan AI and install locally",
                "Run it on your own hardware",
                "Zero credits or server limits"
            ],
            limitations: "Local mode needs a strong GPU (RTX 3060+). Web version has a credit system.",
            link: "https://pinokio.computer",
            image: "/images/blog/wan-ai.jpg",
            icon: ShieldCheck
        },
        {
            name: "Vheer",
            bestFor: "Image-to-video, luxury niche B-roll",
            rating: 4.5,
            description: "Vheer is a permanent free studio specializing in cinematic B-roll, particularly through its powerful image-to-video workflow.",
            steps: [
                "Go to vheer.com (no account required)",
                "Create a high-quality still image first",
                "Upload image to Image-to-Video tool",
                "Adjust camera motion and generate"
            ],
            limitations: "The Free tier uses the 'Quality' model; Pro models require a subscription.",
            link: "https://vheer.com",
            image: "/images/blog/vheer-ai.jpg",
            icon: ImageIcon
        },
        {
            name: "Digen AI",
            bestFor: "Social media creators using templates",
            rating: 4.4,
            description: "Perfect for beginners who don't want to start from scratch. Uses a community credit system to offer 300+ daily credits.",
            steps: [
                "Sign up at digen.ai",
                "Browse through viral video templates",
                "Customize the prompt with your content",
                "Participate in community to earn daily credits"
            ],
            limitations: "Template-based approach offers less freedom for custom experimental projects.",
            link: "https://digen.ai",
            image: "/images/blog/digen-ai.jpg",
            icon: Layout
        }
    ];

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-purple-500/30">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 max-w-4xl">

                {/* Hero Section */}
                <header className="py-12 md:py-16">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                            <Video className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 text-sm font-medium">AI Tools Review 2026</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 text-sm font-medium">Verified: March 2026</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                        5 Free AI Video Generators That{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                            Actually Have No Limits
                        </span>{" "}
                        in 2026
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">DK</div>
                            <span>Dev Kant Kumar</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>7 min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>March 2026</span>
                        </div>
                    </div>

                    <VerdictBox />

                    <div className="prose prose-invert max-w-none">
                        <p className="text-xl text-slate-200 leading-relaxed mb-6">
                            You find a promising AI video generator. Sign up. Generate one video. Then the paywall hits — <strong className="text-white">2 credits left, upgrade for $29/month.</strong> Sound familiar?
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                            In 2026, the bait-and-switch is everywhere. But there are tools that genuinely give you <strong className="text-purple-400">unlimited generations</strong> with no watermarks and no credit card required. I've tested over 30 platforms to find the 5 that actually deliver on the promise of free.
                        </p>
                    </div>

                    {/* Quick Comparison - CTR Boost */}
                    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden mt-8 mb-12 shadow-xl">
                        <div className="bg-slate-800/50 p-4 border-b border-slate-700/50">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                Quick Comparison: 2026 Top Free Picks
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-400 uppercase bg-slate-800/20">
                                    <tr>
                                        <th className="px-6 py-3">Tool</th>
                                        <th className="px-6 py-3 text-center">Best For</th>
                                        <th className="px-6 py-3 text-right">Verdict</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {tools.slice(0, 3).map((tool, i) => (
                                        <tr key={i} className="hover:bg-slate-800/30">
                                            <td className="px-6 py-4 font-bold text-white">{tool.name}</td>
                                            <td className="px-6 py-4 text-slate-400 text-center">{tool.bestFor.split(',')[0]}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-purple-400 font-bold">★ {tool.rating}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </header>

                {/* Tool Detailed Sections */}
                <section className="space-y-16">
                    {tools.map((tool, idx) => (
                        <div key={idx} className="scroll-mt-20">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                        <tool.icon className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        {idx + 1}. {tool.name}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    {tool.badge && (
                                        <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-500 text-xs font-bold rounded-full uppercase tracking-tighter shadow-lg shadow-amber-500/5">
                                            🏆 {tool.badge}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-800 text-slate-800'}`} />
                                        ))}
                                        <span className="ml-2 text-white font-black text-sm">{tool.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                                    <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                        <Star className="w-4 h-4 text-amber-400" />
                                        Best for:
                                    </h4>
                                    <p className="text-slate-300 text-sm mb-4">{tool.bestFor}</p>
                                    <p className="text-slate-400 leading-relaxed">{tool.description}</p>
                                </div>
                                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                                    <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        How to use it:
                                    </h4>
                                    <ul className="space-y-2">
                                        {tool.steps.map((step, i) => (
                                            <li key={i} className="flex gap-2 text-sm text-slate-300">
                                                <span className="text-purple-500 font-bold">{i + 1}.</span>
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <ScreenshotPlaceholder tool={tool.name} image={tool.image} />

                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
                                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    Honest Limitations:
                                </h4>
                                <p className="text-slate-300 text-sm">{tool.limitations}</p>
                            </div>

                            <div className="flex justify-center">
                                <CTAButton href={tool.link} variant="outline" className="w-full sm:w-auto">
                                    Visit {tool.name} Website
                                </CTAButton>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Comparison Table */}
                <section className="mt-24 mb-24">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Which AI Video Tool Should You Use?</h2>
                    <div className="overflow-x-auto rounded-2xl border border-slate-800">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900 border-b border-slate-800">
                                <tr>
                                    <th className="p-4 text-slate-400 font-bold">Goal</th>
                                    <th className="p-4 text-purple-400 font-bold">Recommended Tool</th>
                                    <th className="p-4 text-slate-400 font-bold">Key Strength</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {tools.map((tool, i) => (
                                    <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                                        <td className="p-4 text-slate-300 font-medium">{tool.bestFor.split(',')[0]}</td>
                                        <td className="p-4 text-white font-bold">{tool.name}</td>
                                        <td className="p-4 text-slate-400 text-sm">{tool.bestFor.split(',')[1] || "Unlimited Generations"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* The Best Workflow Section */}
                <section className="mb-24">
                    <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-black text-white mb-6">The Workflow That Gets The Best Results</h2>
                        <p className="text-lg text-slate-300 mb-8">
                            Across all these tools, one pattern consistently produces better output: <strong className="text-white">generate your image first, then animate it.</strong> Giving the model a precise visual reference removes guesswork.
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            {[
                                { step: "1. Capture Stills", desc: "Use Vheer to generate a high-quality still image", icon: ImageIcon },
                                { step: "2. Animate", desc: "Feed that image into Wan AI or Arena for motion", icon: Zap },
                                { step: "3. Voice & Sound", desc: "Add audio using Qwen's built-in generator", icon: Mic },
                                { step: "4. Final Polish", desc: "Stabilize in CapCut (free, no watermark)", icon: Sparkles }
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                                        <item.icon className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2 whitespace-nowrap">{item.step}</h4>
                                    <p className="text-xs text-slate-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-slate-400 italic text-center">
                            This pipeline produces results that rival paid platforms costing $100+/month.
                        </p>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
                        <HelpCircle className="w-6 h-6 text-purple-400" />
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {info.faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                                >
                                    <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                                    <div className={`w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>
                                        <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
                                    </div>
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6">
                                        <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA/Thought */}
                <section className="text-center py-12 border-t border-slate-800">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Final Thought</h2>
                    <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        The barrier to professional video production has collapsed in 2026. These tools aren't compromises — they're legitimate
                        alternatives to paid platforms. Start with Arena to understand quality, then use Qwen for audio support.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <CTAButton href="https://lmarena.ai" variant="primary">
                            Explore Arena AI
                        </CTAButton>
                        <CTAButton href="https://qwen.ai" variant="secondary">
                            Try Qwen AI
                        </CTAButton>
                    </div>
                    <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 text-sm">
                        <div className="flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Tested for 2026</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            <span>100% Free Tiers</span>
                        </div>
                    </div>
                </section>

                {/* Internal Links for SEO */}
                <div className="mt-8 p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50 text-center">
                    <p className="text-sm text-slate-500 italic">
                        Check out our other guides: Learn about our <a href="/blog/ultimate-ai-tools-directory-2026" className="text-purple-400 hover:underline">Ultimate AI Tools Directory</a> or explore the <a href="/blog/agentic-ai-guide" className="text-purple-400 hover:underline">Full Agentic AI Guide</a>.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default FreeAIVideoGenerators2026;
