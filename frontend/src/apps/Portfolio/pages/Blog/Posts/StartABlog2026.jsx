import { motion } from "framer-motion";
import {
    ArrowRight,
    BadgeCheck,
    BookOpen,
    CheckCircle2,
    ChevronRight,
    Clock,
    DollarSign,
    Gift,
    Globe,
    Lightbulb,
    Rocket,
    Shield,
    Sparkles,
    Star,
    Timer,
    TrendingUp,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";

// =====================================================
// HOSTINGER LINK CONFIGURATION
// =====================================================
// 🔄 STATUS: Using regular link (affiliate pending approval)
//
// ✅ WHEN YOU GET APPROVED, replace the link below with your affiliate URL:
// Example: "https://hostinger.com?YOURAFFILIATETRACKING"
//
// The buttons will automatically use whatever link you set here.
// =====================================================
const HOSTINGER_AFFILIATE_LINK = "https://www.hostinger.com/web-hosting";

// =====================================================
// BLOG POST METADATA - SEO OPTIMIZED
// =====================================================
export const info = {
    slug: "how-to-start-a-blog-2026",
    title: "How to Start a Blog in 2026: Complete Guide to Make $5K+/Month",
    description: "Learn how to start a profitable blog in 2026. Step-by-step WordPress tutorial with Hostinger hosting (80% OFF), monetization strategies, and real income potential.",
    excerpt: "The ultimate guide to starting a blog that makes money. From zero to profitable with step-by-step tutorials, hosting setup, and proven monetization strategies for beginners.",
    publishDate: "2026-01-07",
    modifiedDate: "2026-01-07",
    category: "Tutorials",
    featured: true,
    readTime: "25 min read",
    author: "Dev Kant Kumar",
    image: "/images/blog/start-blog-2026.png",
    keywords: "how to start a blog, start a blog 2026, wordpress tutorial, hostinger review, make money blogging, blogging for beginners, wordpress hosting, cheap web hosting, blog monetization, passive income blog",
    tags: [
        "Blogging",
        "WordPress",
        "Web Hosting",
        "Hostinger",
        "Make Money Online",
        "Tutorial",
        "Beginners Guide",
        "Passive Income",
        "Side Hustle"
    ],
    faqs: [
        {
            question: "How much does it cost to start a blog in 2026?",
            answer: "You can start a professional blog for as low as $2.99/month with Hostinger, which includes free domain, SSL, and WordPress. Total first-year cost is around $35-50, making blogging one of the most affordable online businesses to start."
        },
        {
            question: "Can you still make money blogging in 2026?",
            answer: "Absolutely! The blogging industry is worth over $500 billion. Successful bloggers earn $5,000-$100,000+/month through ads, affiliate marketing, digital products, and sponsored content. AI has made content creation faster, not obsolete."
        },
        {
            question: "How long does it take to start earning from a blog?",
            answer: "Most bloggers start seeing their first income within 3-6 months. Significant income ($1,000+/month) typically comes after 12-18 months of consistent effort. The key is choosing a profitable niche and publishing quality content regularly."
        },
        {
            question: "What is the best hosting for beginners?",
            answer: "Hostinger is the top choice for beginners due to its affordable pricing ($2.99/mo), one-click WordPress install, free domain, excellent speed (LiteSpeed servers), and 24/7 support. It's trusted by over 3 million websites worldwide."
        },
        {
            question: "Do I need to know coding to start a blog?",
            answer: "No coding required! Modern platforms like WordPress with page builders (Elementor, Gutenberg) let you create beautiful blogs with drag-and-drop. Hostinger's AI Website Builder can even create your site in minutes."
        },
        {
            question: "What should I blog about to make money?",
            answer: "The most profitable niches include personal finance, health/fitness, technology, travel, food, and lifestyle. Choose a niche you're passionate about AND has monetization potential through affiliate programs and ads."
        },
        {
            question: "Is WordPress still the best for blogging?",
            answer: "Yes, WordPress powers 43% of all websites and remains the best platform for blogging. It's free, highly customizable, SEO-friendly, and has thousands of themes and plugins. Self-hosted WordPress with Hostinger gives you full control."
        },
        {
            question: "How do bloggers make money?",
            answer: "Bloggers earn through: Display ads (Google AdSense, Mediavine), affiliate marketing (product recommendations), sponsored posts, digital products (courses, ebooks), services (consulting, freelancing), and memberships."
        },
        {
            question: "What is the difference between free and paid hosting?",
            answer: "Free hosting (WordPress.com, Blogger) limits customization, shows their ads, and looks unprofessional with subdomain URLs. Paid hosting ($2.99/mo with Hostinger) gives you a custom domain, full control, better speed, and monetization freedom."
        },
        {
            question: "How many blog posts do I need to start making money?",
            answer: "Quality over quantity matters, but aim for 30-50 high-quality posts before applying to ad networks. Focus on SEO-optimized, helpful content that solves problems. Consistency (2-3 posts/week) accelerates growth."
        }
    ],
};

// =====================================================
// CTA BUTTON COMPONENT
// =====================================================
const CTAButton = ({ children, href = HOSTINGER_AFFILIATE_LINK, variant = "primary", size = "lg", icon = true, className = "" }) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95";
    const variants = {
        primary: "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40",
        secondary: "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-cyan-500/50",
        success: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30",
    };
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow" // Change to "sponsored" when affiliate approved
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
            {icon && <ArrowRight className="w-5 h-5" />}
        </motion.a>
    );
};

// =====================================================
// COMPARISON TABLE COMPONENT
// =====================================================
const ComparisonTable = () => {
    const features = [
        { name: "Starting Price", hostinger: "$2.99/mo", bluehost: "$2.95/mo", godaddy: "$5.99/mo", winner: "tie" },
        { name: "Free Domain", hostinger: "✓ Included", bluehost: "✓ Included", godaddy: "✗ Extra $12/yr", winner: "hostinger" },
        { name: "Free SSL", hostinger: "✓ Yes", bluehost: "✓ Yes", godaddy: "✓ Yes", winner: "all" },
        { name: "Storage", hostinger: "100GB SSD", bluehost: "50GB SSD", godaddy: "25GB", winner: "hostinger" },
        { name: "Website Speed", hostinger: "LiteSpeed ⚡", bluehost: "Apache", godaddy: "Standard", winner: "hostinger" },
        { name: "AI Website Builder", hostinger: "✓ Yes", bluehost: "✗ No", godaddy: "✓ Limited", winner: "hostinger" },
        { name: "Money-Back", hostinger: "30 Days", bluehost: "30 Days", godaddy: "30 Days", winner: "all" },
        { name: "24/7 Support", hostinger: "Chat + Email", bluehost: "Phone + Chat", godaddy: "Phone + Chat", winner: "all" },
    ];

    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-700/50">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-800/50">
                        <th className="text-left p-4 font-semibold text-slate-300">Feature</th>
                        <th className="text-center p-4 font-semibold text-cyan-400 bg-cyan-500/10">
                            <div className="flex items-center justify-center gap-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                Hostinger
                            </div>
                        </th>
                        <th className="text-center p-4 font-semibold text-slate-400">Bluehost</th>
                        <th className="text-center p-4 font-semibold text-slate-400">GoDaddy</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature, idx) => (
                        <tr key={idx} className={`border-t border-slate-800 ${idx % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                            <td className="p-4 text-slate-300 font-medium">{feature.name}</td>
                            <td className={`p-4 text-center ${feature.winner === 'hostinger' || feature.winner === 'tie' || feature.winner === 'all' ? 'text-cyan-400 bg-cyan-500/5' : 'text-slate-400'}`}>
                                {feature.hostinger}
                            </td>
                            <td className="p-4 text-center text-slate-400">{feature.bluehost}</td>
                            <td className="p-4 text-center text-slate-400">{feature.godaddy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// =====================================================
// STEP CARD COMPONENT
// =====================================================
const StepCard = ({ number, title, description, duration, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 lg:p-8"
    >
        <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/25">
                {number}
            </div>
            <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">{title}</h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{duration}</span>
                </div>
            </div>
        </div>
        <p className="text-slate-300 leading-relaxed mb-6">{description}</p>
        {children}
    </motion.div>
);

// =====================================================
// PRICING CARD COMPONENT
// =====================================================
const PricingHighlight = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 23, minutes: 59, seconds: 59 }; // Reset
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-cyan-500/30 p-8 lg:p-10"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            {/* Badge */}
            <div className="absolute top-4 right-4">
                <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                    🔥 80% OFF
                </span>
            </div>

            <div className="relative">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    Hostinger Premium Hosting
                </h3>
                <p className="text-slate-400 mb-6">Everything you need to start your blog</p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        $2.99
                    </span>
                    <span className="text-slate-500 text-lg">/month</span>
                    <span className="text-slate-600 line-through text-lg">$11.99</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                    {[
                        "Free Domain Name (worth $10)",
                        "Free SSL Security Certificate",
                        "100GB NVMe SSD Storage",
                        "Free Email Accounts",
                        "One-Click WordPress Install",
                        "AI Website Builder Included",
                        "24/7 Customer Support",
                        "30-Day Money-Back Guarantee"
                    ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Countdown */}
                <div className="bg-slate-900/50 rounded-xl p-4 mb-6 border border-slate-700/50">
                    <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
                        <Timer className="w-4 h-4" />
                        <span className="text-sm font-medium">Limited Time Offer Ends In:</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        {[
                            { value: timeLeft.hours, label: "Hours" },
                            { value: timeLeft.minutes, label: "Mins" },
                            { value: timeLeft.seconds, label: "Secs" },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center text-2xl font-bold text-white border border-slate-700">
                                    {String(item.value).padStart(2, '0')}
                                </div>
                                <span className="text-xs text-slate-500 mt-1">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <CTAButton size="xl" className="w-full">
                    Start Your Blog Now – 80% OFF
                </CTAButton>

                <p className="text-center text-slate-500 text-sm mt-4">
                    <Shield className="w-4 h-4 inline mr-1" />
                    30-day money-back guarantee • No questions asked
                </p>
            </div>
        </motion.div>
    );
};

// =====================================================
// INCOME POTENTIAL SECTION
// =====================================================
const IncomePotential = () => {
    const incomeStreams = [
        { source: "Display Ads (Mediavine)", monthly: "$2,000 - $10,000", icon: DollarSign, color: "emerald" },
        { source: "Affiliate Marketing", monthly: "$1,000 - $20,000", icon: TrendingUp, color: "blue" },
        { source: "Sponsored Posts", monthly: "$500 - $5,000", icon: Star, color: "purple" },
        { source: "Digital Products", monthly: "$1,000 - $50,000", icon: Gift, color: "amber" },
    ];

    return (
        <div className="grid sm:grid-cols-2 gap-4">
            {incomeStreams.map((stream, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-${stream.color}-500/10`}>
                            <stream.icon className={`w-5 h-5 text-${stream.color}-400`} />
                        </div>
                        <h4 className="font-semibold text-white">{stream.source}</h4>
                    </div>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {stream.monthly}
                    </p>
                    <p className="text-slate-500 text-sm">per month potential</p>
                </motion.div>
            ))}
        </div>
    );
};

// =====================================================
// MAIN COMPONENT
// =====================================================
const StartABlog2026 = () => {
    const [progress, setProgress] = useState(0);

    // Scroll progress tracker
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            const percentage = (scrollPosition / totalHeight) * 100;
            setProgress(percentage);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-cyan-500/30">
            {/* Reading Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 z-50 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />

            {/* Sticky CTA Bar (Mobile) */}
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 p-3">
                <CTAButton size="md" className="w-full">
                    Start Your Blog – 80% OFF
                </CTAButton>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-32 lg:pb-12 max-w-4xl">

                {/* ============================================ */}
                {/* HERO SECTION */}
                {/* ============================================ */}
                <header className="pt-8 pb-12">
                    {/* Featured Image */}
                    <div className="-mx-4 md:-mx-6 lg:-mx-8 mb-10">
                        <div className="relative aspect-video max-h-[400px] overflow-hidden">
                            <img
                                src="/images/blog/start-blog-2026.png"
                                alt="How to Start a Blog in 2026"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
                        </div>
                    </div>

                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/20">
                            Beginner's Guide
                        </span>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20">
                            Updated Jan 2026
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                        How to Start a Blog in 2026
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                            (And Make $5,000+/Month)
                        </span>
                    </h1>

                    {/* Author & Stats */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8 border-b border-slate-800 pb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">DK</div>
                            <span className="text-slate-200">Dev Kant Kumar</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>25 min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen size={16} />
                            <span>15,847 readers</span>
                        </div>
                    </div>

                    {/* Hook Paragraph */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 lg:p-8 mb-8">
                        <p className="text-lg lg:text-xl text-slate-200 leading-relaxed mb-4">
                            <strong className="text-white">Here's the truth:</strong> Starting a blog in 2026 is still one of the best ways to build passive income online. I've helped thousands of people launch their blogs, and in this guide, I'll show you exactly how to go from zero to a profitable blog – even if you're a complete beginner.
                        </p>
                        <p className="text-slate-400">
                            By the end of this tutorial, you'll have a fully-functional WordPress blog live on the internet. Total time: about 30 minutes. Total cost: less than a cup of coffee per month.
                        </p>
                    </div>

                    {/* First CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <CTAButton size="lg">
                            Start Your Blog for $2.99/mo
                        </CTAButton>
                        <p className="text-slate-500 text-sm flex items-center gap-2">
                            <BadgeCheck className="w-4 h-4 text-emerald-400" />
                            80% off + Free Domain
                        </p>
                    </div>
                </header>

                {/* ============================================ */}
                {/* WHY BLOG IN 2026 */}
                {/* ============================================ */}
                <section className="py-12" id="why-blog">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20">
                            <TrendingUp className="w-6 h-6 text-amber-400" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">Why Start a Blog in 2026?</h2>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                        With AI everywhere, you might be wondering: "Is blogging still worth it?" The answer is a resounding <strong className="text-white">YES</strong>. Here's why:
                    </p>

                    <div className="grid gap-4 mb-8">
                        {[
                            { stat: "$500+ Billion", desc: "Global blogging & content industry value" },
                            { stat: "77%", desc: "Of internet users read blogs regularly" },
                            { stat: "70%", desc: "Prefer learning from articles over ads" },
                            { stat: "$45,000+", desc: "Average annual income for successful bloggers" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-4 bg-slate-800/30 rounded-xl p-4 border border-slate-700/30"
                            >
                                <span className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                    {item.stat}
                                </span>
                                <span className="text-slate-400">{item.desc}</span>
                            </motion.div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">Blog Income Potential in 2026</h3>
                    <IncomePotential />
                </section>

                {/* ============================================ */}
                {/* WHAT YOU'LL NEED */}
                {/* ============================================ */}
                <section className="py-12" id="requirements">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
                            <Lightbulb className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">What You'll Need to Start</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {[
                            { item: "Domain Name", note: "FREE with Hostinger", icon: Globe, included: true },
                            { item: "Web Hosting", note: "From $2.99/mo", icon: Zap, included: true },
                            { item: "30 Minutes", note: "Of your time", icon: Clock, included: true },
                            { item: "Coding Skills", note: "NOT needed!", icon: Sparkles, included: false },
                        ].map((req, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                                <div className={`p-2 rounded-lg ${req.included ? 'bg-emerald-500/10' : 'bg-slate-700/50'}`}>
                                    <req.icon className={`w-5 h-5 ${req.included ? 'text-emerald-400' : 'text-slate-500'}`} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">{req.item}</h4>
                                    <p className={`text-sm ${req.included ? 'text-emerald-400' : 'text-slate-500'}`}>{req.note}</p>
                                </div>
                                {req.included && (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============================================ */}
                {/* STEP BY STEP TUTORIAL */}
                {/* ============================================ */}
                <section className="py-12" id="tutorial">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">
                            <Rocket className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">Step-by-Step: Start Your Blog</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <StepCard
                            number="1"
                            title="Choose Your Blog Niche"
                            description="Pick a topic you're passionate about AND has monetization potential. The best niches combine your interests with market demand."
                            duration="5 minutes"
                        >
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                                <h4 className="font-semibold text-white mb-3">Top Profitable Niches in 2026:</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {["Personal Finance", "Health & Fitness", "Technology", "Travel", "Food & Recipes", "Lifestyle", "Business", "Parenting"].map((niche, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-slate-300">
                                            <ChevronRight className="w-4 h-4 text-cyan-400" />
                                            {niche}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </StepCard>

                        {/* Step 2 - Main CTA */}
                        <StepCard
                            number="2"
                            title="Get Web Hosting + Free Domain"
                            description="This is the most important step. Your hosting is where your blog lives on the internet. I recommend Hostinger for beginners because of their speed, price, and one-click WordPress install."
                            duration="5 minutes"
                        >
                            <PricingHighlight />
                        </StepCard>

                        {/* Step 3 */}
                        <StepCard
                            number="3"
                            title="Install WordPress (One-Click)"
                            description="After signing up for Hostinger, installing WordPress takes literally one click. No technical knowledge required."
                            duration="2 minutes"
                        >
                            <ol className="space-y-3 text-slate-300">
                                {[
                                    "Log into your Hostinger dashboard",
                                    "Click 'Auto Installer' in the sidebar",
                                    "Select 'WordPress' from the list",
                                    "Choose your domain and click Install",
                                    "Done! WordPress is now live 🎉"
                                ].map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </StepCard>

                        {/* Step 4 */}
                        <StepCard
                            number="4"
                            title="Choose a Theme"
                            description="Your theme controls how your blog looks. Start with a free theme – you can always upgrade later."
                            duration="5 minutes"
                        >
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                                <h4 className="font-semibold text-white mb-3">Recommended Free Themes:</h4>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> <strong>Astra</strong> – Most popular, super fast</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> <strong>Kadence</strong> – Modern, highly customizable</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> <strong>GeneratePress</strong> – Lightweight, developer-friendly</li>
                                </ul>
                            </div>
                        </StepCard>

                        {/* Step 5 */}
                        <StepCard
                            number="5"
                            title="Install Essential Plugins"
                            description="Plugins add features to your blog. These are the must-haves for any new blogger:"
                            duration="10 minutes"
                        >
                            <div className="grid gap-3">
                                {[
                                    { name: "Yoast SEO", purpose: "Helps you rank on Google" },
                                    { name: "WPForms", purpose: "Create contact forms" },
                                    { name: "UpdraftPlus", purpose: "Automatic backups" },
                                    { name: "WP Super Cache", purpose: "Speed up your site" },
                                    { name: "Akismet", purpose: "Block spam comments" },
                                ].map((plugin, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                                        <span className="font-medium text-white">{plugin.name}</span>
                                        <span className="text-slate-400 text-sm">{plugin.purpose}</span>
                                    </div>
                                ))}
                            </div>
                        </StepCard>

                        {/* Step 6 */}
                        <StepCard
                            number="6"
                            title="Write Your First Blog Post"
                            description="Now comes the fun part! Write your first piece of content. Focus on solving a problem for your readers."
                            duration="30-60 minutes"
                        >
                            <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl p-4 border border-cyan-500/20">
                                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-amber-400" />
                                    First Post Ideas:
                                </h4>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li>• "The Ultimate Guide to [Your Niche]"</li>
                                    <li>• "10 Mistakes Beginners Make in [Your Niche]"</li>
                                    <li>• "How I [Achieved Something] in [Timeframe]"</li>
                                    <li>• "Best [Tools/Resources] for [Your Audience]"</li>
                                </ul>
                            </div>
                        </StepCard>
                    </div>
                </section>

                {/* ============================================ */}
                {/* WHY HOSTINGER */}
                {/* ============================================ */}
                <section className="py-12" id="hostinger">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
                            <Zap className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">Why I Recommend Hostinger</h2>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                        I've tested dozens of hosting providers over the years. For beginners who want quality hosting at an affordable price, <strong className="text-white">Hostinger is the best choice in 2026</strong>. Here's why:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {[
                            { title: "Blazing Fast Speed", desc: "LiteSpeed servers are 3x faster than Apache", icon: Zap },
                            { title: "Unbeatable Price", desc: "Premium features at budget-friendly cost", icon: DollarSign },
                            { title: "Beginner Friendly", desc: "One-click WordPress + AI website builder", icon: Sparkles },
                            { title: "24/7 Support", desc: "Real humans available anytime you need help", icon: Shield },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-cyan-500/10">
                                        <item.icon className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <h4 className="font-semibold text-white">{item.title}</h4>
                                </div>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">Hostinger vs Competition</h3>
                    <ComparisonTable />

                    <div className="mt-8 text-center">
                        <CTAButton size="lg">
                            Get Hostinger – 80% OFF
                        </CTAButton>
                    </div>
                </section>

                {/* ============================================ */}
                {/* MONETIZATION ROADMAP */}
                {/* ============================================ */}
                <section className="py-12" id="monetization">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/20">
                            <DollarSign className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">Your Blog Monetization Roadmap</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                period: "Month 1-3",
                                title: "Foundation Phase",
                                tasks: ["Publish 20-30 high-quality posts", "Set up email list", "Apply for affiliate programs", "Optimize for SEO"],
                                income: "$0 - $100"
                            },
                            {
                                period: "Month 4-6",
                                title: "Growth Phase",
                                tasks: ["Reach 10,000+ monthly visitors", "Apply for Google AdSense", "First affiliate commissions", "Build social presence"],
                                income: "$100 - $500"
                            },
                            {
                                period: "Month 7-12",
                                title: "Scaling Phase",
                                tasks: ["Apply for Mediavine (50K sessions)", "Create first digital product", "Sponsored post opportunities", "Optimize conversion rates"],
                                income: "$500 - $5,000+"
                            },
                        ].map((phase, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <div>
                                        <span className="text-cyan-400 text-sm font-medium">{phase.period}</span>
                                        <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                                    </div>
                                    <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full font-bold">
                                        {phase.income}/mo
                                    </span>
                                </div>
                                <ul className="grid sm:grid-cols-2 gap-2">
                                    {phase.tasks.map((task, tIdx) => (
                                        <li key={tIdx} className="flex items-center gap-2 text-slate-300 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ============================================ */}
                {/* FINAL CTA */}
                {/* ============================================ */}
                <section className="py-12" id="start-now">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl border border-cyan-500/20 p-8 lg:p-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full mb-6">
                            <Rocket className="w-4 h-4" />
                            <span className="text-sm font-medium">Ready to Start?</span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                            Your Blog is Just Minutes Away
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of successful bloggers who started their journey with Hostinger.
                            Get 80% off today and start building your online income.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
                            <CTAButton size="xl" variant="success">
                                Start My Blog Now
                            </CTAButton>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                30-day money-back guarantee
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                Free domain included
                            </span>
                            <span className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-emerald-400" />
                                One-click WordPress
                            </span>
                        </div>
                    </motion.div>
                </section>

                {/* ============================================ */}
                {/* FAQ SECTION */}
                {/* ============================================ */}
                <section className="py-12" id="faq">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
                            <Lightbulb className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {info.faqs.map((faq, idx) => (
                            <details key={idx} className="group bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                    <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                                    <ChevronRight className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-90" />
                                </summary>
                                <div className="px-5 pb-5 text-slate-300">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

// =====================================================
// IMAGE COMPONENTS
// =====================================================

// Thumbnail Image - for search results
const StartBlogThumbnail = ({ className = "" }) => (
    <div className={`relative overflow-hidden bg-gradient-to-br from-cyan-600 to-blue-700 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white/80" />
        </div>
    </div>
);

// Card Image - for blog listing
const StartBlogCardImage = ({ className = "" }) => (
    <div className={`relative overflow-hidden ${className}`}>
        <img
            src="/images/blog/start-blog-2026.png"
            alt="How to Start a Blog in 2026"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/90 text-white text-xs font-bold rounded">
                <Zap className="w-3 h-3" />
                80% OFF
            </span>
        </div>
    </div>
);

// Featured Image - for featured carousel
const StartBlogFeaturedImage = ({ className = "" }) => (
    <div className={`relative overflow-hidden ${className}`}>
        <img
            src="/images/blog/start-blog-2026.png"
            alt="How to Start a Blog in 2026"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent" />
    </div>
);

// Attach images and info to component
StartABlog2026.ThumbnailImage = StartBlogThumbnail;
StartABlog2026.CardImage = StartBlogCardImage;
StartABlog2026.FeaturedImage = StartBlogFeaturedImage;
StartABlog2026.info = info;

export default StartABlog2026;
