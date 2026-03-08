import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    Clock,
    DollarSign,
    FileText,
    Globe,
    Minus,
    Sparkles,
    Star,
    Users,
    Video,
    Zap
} from "lucide-react";
import { useState } from "react";

// =====================================================
// BLOG POST METADATA - SEO OPTIMIZED
// =====================================================
export const info = {
    slug: "golpo-ai-review-2026",
    title: "Golpo AI Review 2026: Is This $39 Whiteboard Video Tool Actually Worth It?",
    description: "Honest Golpo AI review 2026 — real results, full pricing breakdown, free vs paid, and whether it's worth it for YouTubers, educators, and developers. Read before you buy.",
    excerpt: "Golpo AI generates genuinely impressive whiteboard explainer videos from just a text prompt or document. The output quality is real. But is it worth $39/month? Find out in our comprehensive review.",
    publishDate: "2026-03-08",
    modifiedDate: "2026-03-08",
    category: "AI Tools",
    featured: true,
    readTime: "8 min read",
    author: "Dev Kant Kumar",
    image: "/images/blog/golpo-ai-review-2026.png",
    keywords: "Golpo AI review, Golpo AI pricing, whiteboard video generator AI, text to whiteboard video, document to video AI, Golpo vs Canva, Golpo Free plan, AI presentation maker",
    tags: [
        "Golpo AI",
        "AI Video Generator",
        "Whiteboard Animation",
        "EdTech",
        "Content Creation",
        "Productivity"
    ],
    faqs: [
        {
            question: "Is Golpo AI free?",
            answer: "Golpo AI has a free plan that gives you 1 credit (enough for a 1-minute video). However, you cannot download the video on the free plan—it serves mostly as a demo of the output quality."
        },
        {
            question: "How much does Golpo AI cost?",
            answer: "Golpo AI pricing starts at $39.99/month for the Starter plan, which gives you 20 credits (minutes) of generation. The Creator plan is $99.99/month for 60 credits, and Growth is $199.99 for 150 credits plus Script Mode and Color Videos."
        },
        {
            question: "Can I use Golpo AI to convert a PDF or GitHub README to video?",
            answer: "Yes, this is Golpo's killer feature. You can paste a GitHub README, upload a PDF, or link a Jira board or Google Doc, and it will turn that document into a coherent whiteboard explainer video."
        },
        {
            question: "Does Golpo AI support languages other than English?",
            answer: "Yes, Golpo AI supports over 50 languages including Hindi, Spanish, Bengali, French, and more. However, Multilingual support is a $40 Add-on on the Starter plan, or included natively on the Creator plan ($99.99/mo)."
        }
    ],
};

// =====================================================
// AFFILIATE LINK CONFIGURATION
// =====================================================
const AFFILIATE_LINKS = {
    main: "https://video.golpoai.com?via=dev-code-space",
};

// =====================================================
// REUSABLE CTA BUTTON COMPONENT
// =====================================================
const CTAButton = ({ href, children, variant = "primary", className = "" }) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base whitespace-nowrap transition-all duration-300 group";
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5",
        secondary: "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600",
        outline: "bg-transparent text-blue-400 border-2 border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400",
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
    );
};

// =====================================================
// VERDICT BOX COMPONENT
// =====================================================
const VerdictBox = () => (
    <div className="bg-gradient-to-br from-indigo-900/30 via-slate-900/50 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">Editor's Verdict</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Golpo AI generates genuinely impressive whiteboard explainer videos</h3>
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/50 text-amber-400/50'}`} />
                        ))}
                    </div>
                    <span className="font-bold text-white">4.0/5</span>
                </div>
            </div>
            <CTAButton href={AFFILIATE_LINKS.main}>
                Try Golpo AI Free
            </CTAButton>
        </div>
        <p className="mt-4 text-slate-300 italic\">
            "The output quality is real. But the free plan is severely limited, the download is paywalled, and $39/month is steep — especially outside the US. Here's what you need to know before spending a rupee."
        </p>
    </div>
);

// =====================================================
// PRICING TABLE COMPONENT
// =====================================================
const PricingTable = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            credits: "1 credit",
            features: ["1 minute of video generation", "Watermarked video output", "Limited voice styles", "Cannot download video (Paywalled)"],
            highlighted: false,
            cta: "Test Free",
        },
        {
            name: "Starter",
            price: "$39.99",
            period: "/month",
            credits: "20 credits",
            features: ["30 sec videos available", "No watermark", "Full voice options", "Multilingual is a $40 Add-on", "Download videos"],
            highlighted: false,
            cta: "Get Starter",
        },
        {
            name: "Creator",
            price: "$99.99",
            period: "/month",
            credits: "60 credits",
            features: ["15 sec videos available", "Vertical video support", "Multilingual included", "Voice instructions included"],
            highlighted: true,
            cta: "Get Creator",
        },
        {
            name: "Growth",
            price: "$199.99",
            period: "/month",
            credits: "150 credits",
            features: ["Edit script before creation", "Longer videos (up to 4 min)", "Color video generation", "Improved video style (beta)"],
            highlighted: false,
            cta: "Get Growth",
        },
    ];

    return (
        <div className="grid md:grid-cols-2 gap-6 my-12 max-w-4xl mx-auto">
            {plans.map((plan, idx) => (
                <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative rounded-2xl p-6 ${
                        plan.highlighted
                            ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-2 border-indigo-500/50 shadow-xl shadow-indigo-500/10'
                            : 'bg-slate-900/50 border border-slate-800'
                    }`}
                >
                    {plan.highlighted && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                            Best For Creators
                        </div>
                    )}
                    <div className="text-center mb-6">
                        <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                        <div className="flex items-end justify-center gap-1">
                            <span className="text-4xl font-black text-white">{plan.price}</span>
                            <span className="text-slate-400 mb-1">{plan.period}</span>
                        </div>
                        <p className="text-indigo-400 font-bold text-sm mt-2">{plan.credits} / month</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                {feature.includes('Cannot') || feature.includes('Watermark') ?
                                    <Minus className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> :
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                                }
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <CTAButton
                        href={AFFILIATE_LINKS.main}
                        variant={plan.highlighted ? "primary" : "secondary"}
                        className="w-full"
                    >
                        {plan.cta}
                    </CTAButton>
                </motion.div>
            ))}
        </div>
    );
};

// =====================================================
// PROS/CONS COMPONENT
// =====================================================
const ProsCons = () => (
    <div className="grid md:grid-cols-2 gap-6 my-12">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Check className="w-6 h-6" />
                What's Actually Good
            </h4>
            <ul className="space-y-3">
                {[
                    "The output quality is real, custom-drawn animation.",
                    "Document-to-video feature is incredible (PDFs, Git, etc).",
                    "50+ languages supported with AI voices (Creator tier or Add-on).",
                    "Voice customization (Creator) and cloning (Business).",
                    "Fast generation (under 5 mins for 1-minute video)."
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <Minus className="w-6 h-6" />
                What's Actually Bad
            </h4>
            <ul className="space-y-3">
                {[
                    "Can't download your video on the free plan.",
                    "Pricing is extremely steep ($99.99/mo for 60 min, $199.99/mo for color/editing).",
                    "Basic features like Script Mode & Color are locked behind $199.99 Growth plan.",
                    "Pricing isn't region-sensitive (No PPP yet for India/etc).",
                    "Free plan acts more like a demo interface."
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                        <Minus className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// =====================================================
// FEATURE CARD COMPONENT
// =====================================================
const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/30 transition-colors group">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
            <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
);

// =====================================================
// COMPARISON TABLE COMPONENT
// =====================================================
const ComparisonTable = () => (
    <div className="overflow-x-auto my-12">
        <table className="w-full border-collapse">
            <thead>
                <tr className="border-b border-slate-800">
                    <th className="text-left p-4 text-slate-400 font-medium">Tool</th>
                    <th className="text-center p-4 text-indigo-400 font-bold">Golpo AI</th>
                    <th className="text-center p-4 text-slate-400 font-medium">Canva</th>
                    <th className="text-center p-4 text-slate-400 font-medium">Invideo AI</th>
                    <th className="text-center p-4 text-slate-400 font-medium">Synthesia</th>
                </tr>
            </thead>
            <tbody>
                {[
                    { feature: "Primary Style", golpo: "Whiteboard sketch", canva: "Slideshow/Animation", invideo: "Stock footage", synthesia: "Avatar presenter" },
                    { feature: "Starting Price", golpo: "$39.99/mo", canva: "$0 - $13/mo", invideo: "Free (watermark)", synthesia: "$22/mo" },
                    { feature: "Free Download", golpo: "❌ No", canva: "✅ Yes", invideo: "✅ (watermarked)", synthesia: "❌ No" },
                    { feature: "Best For", golpo: "Explainers & Docs", canva: "General Video", invideo: "Social Media", synthesia: "Corp Training" },
                ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                        <td className="p-4 text-slate-300 font-medium">{row.feature}</td>
                        <td className="p-4 text-center text-white font-bold">{row.golpo}</td>
                        <td className="p-4 text-center text-slate-400">{row.canva}</td>
                        <td className="p-4 text-center text-slate-400">{row.invideo}</td>
                        <td className="p-4 text-center text-slate-400">{row.synthesia}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// =====================================================
// MAIN BLOG POST COMPONENT
// =====================================================
const GolpoAIReview2026 = () => {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 max-w-4xl">

                {/* Hero Section */}
                <header className="py-12 md:py-16">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-6">
                        <Video className="w-4 h-4 text-indigo-400" />
                        <span className="text-indigo-400 text-sm font-medium">AI Video Tools Review</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                        {info.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">DK</div>
                            <span>{info.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{info.readTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Updated March 2026</span>
                        </div>
                    </div>

                    {/* Verdict Box */}
                    <VerdictBox />

                    {/* Intro Paragraph */}
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        Before spending a rupee (or a dollar), here's the brutally honest truth about Golpo AI. Founded in 2024 by two Stanford CS brothers and backed by Y Combinator, Golpo aims to disrupt how we communicate technical topics.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed mb-8">
                        It directly solves a problem that tools like Sora and Veo 3 don't: <strong className="text-white">practical communication</strong>. Sora makes cinematic clips. Golpo explains things. That is a huge difference. Today, we look at if it delivers on that promise.
                    </p>
                </header>

                {/* Quick Summary */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Zap className="text-amber-400" />
                        Who Should Actually Buy Golpo AI?
                    </h2>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    ✅ Buy it if you are:
                                </h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li>• A course creator who needs consistent explainer videos</li>
                                    <li>• A developer advocate turning documentation into video</li>
                                    <li>• A corporate trainer creating onboarding content</li>
                                    <li>• A YouTuber needing weekly explainer volume</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                                    <Minus className="w-5 h-5" />
                                    ❌ Skip it if you are:
                                </h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li>• A solo creator just starting out with no budget</li>
                                    <li>• Someone who only needs 1-2 videos a month</li>
                                    <li>• A creator who needs cinematic/marketing clips</li>
                                    <li>• Based in developing markets where $39 is steep</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Step by step */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">How Golpo AI Actually Works (Step by Step)</h2>
                    <p className="text-slate-300 mb-6">The generation itself is genuinely fast — mostly under 5 minutes for a 1-minute video. The sketch-style animation looks clean and professional, not like a cheap slideshow. Here's the workflow:</p>
                    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-4">
                        <p className="text-slate-300"><strong className="text-indigo-400">1.</strong> Go to <a href={AFFILIATE_LINKS.main} className="text-blue-400 hover:underline">video.golpoai.com</a></p>
                        <p className="text-slate-300"><strong className="text-indigo-400">2.</strong> Sign up free — you get 1 credit (= 1 minute of video)</p>
                        <p className="text-slate-300"><strong className="text-indigo-400">3.</strong> Type your topic or paste a document into the prompt box</p>
                        <p className="text-slate-300"><strong className="text-indigo-400">4.</strong> Choose style: <strong>Golpo Sketch</strong> (B&W line art) or <strong>Golpo Canvas</strong> (older 2.0 style)</p>
                        <p className="text-slate-300"><strong className="text-indigo-400">5.</strong> Set your voice tone, accent, and language (50+ supported)</p>
                        <p className="text-slate-300"><strong className="text-indigo-400">6.</strong> Hit generate — your high-quality video is ready in minutes</p>

                        {/* Screenshot Embed */}
                        <div className="my-6 rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl relative">
                            <img
                                src="/images/blog/golpo-ai-ui-generation-2026.png"
                                alt="Golpo AI Video Generation UI Interface"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                        </div>

                        <p className="text-slate-300"><strong className="text-indigo-400">7.</strong> Watch in browser... and then hit the paywall to download 😅</p>
                    </div>
                </section>

                {/* Pros & Cons */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Honest Breakdown: Good & Bad</h2>
                    <ProsCons />
                </section>

                {/* Key Features */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Sparkles className="text-purple-400" />
                        Best Features Explained
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FeatureCard
                            icon={Video}
                            title="Real Output Quality"
                            description="The whiteboard sketch animation looks genuinely professional. It draws custom animations that match your content, avoiding the 'cheap slideshow' look."
                        />
                        <FeatureCard
                            icon={FileText}
                            title="Document-to-Video"
                            description="This is the killer feature. Paste a GitHub README, upload a PDF, or link a Jira board, and it produces a coherent explainer. Unmatched right now."
                        />
                        <FeatureCard
                            icon={Globe}
                            title="50+ Languages Supported"
                            description="For non-English creators in Hindi, Spanish, Bengali, French, etc. You can create content natively with high-quality AI voiceovers."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Voice Customization"
                            description="Describe a voice like 'British accent, talk like a professor' or clone your own voice completely on paid plans."
                        />
                    </div>
                </section>

                {/* Pricing & Free Plan */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <DollarSign className="text-emerald-400" />
                        Golpo AI Free Plan & Pricing (2026)
                    </h2>
                    <p className="text-slate-300 mb-6">
                        The brutal truth about the Free Plan: You can generate and watch your video for free, but you <strong className="text-white">cannot download it without paying</strong>. It is practically a demo.
                        Golpo operates on a credit system: 1 credit = 1 minute of video generation. Notice that essential features—like Script Mode, Color Videos, and Multilingual Support—are locked behind higher tiers ($199.99/mo Growth) or paid Add-ons.
                    </p>
                    <PricingTable />
                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 flex items-center gap-4">
                        <Zap className="w-6 h-6 text-indigo-400 flex-shrink-0" />
                        <p className="text-slate-300 text-sm">
                            <strong className="text-white">Note for Indian Creators:</strong> $39.99/month roughly translates to ₹3,400/month. For only 20 minutes of video, heavy creators might burn through budgets very fast. No PPP pricing yet.
                        </p>
                    </div>
                </section>

                {/* Comparison */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">How Golpo AI Compares</h2>
                    <p className="text-slate-300 mb-6">
                        No other tool converts raw documents into whiteboard-style videos this cleanly. Here's a quick comparison.
                    </p>
                    <ComparisonTable />
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mt-6">
                        <h4 className="text-lg font-bold text-white mb-3">The Standout Aspect</h4>
                        <p className="text-slate-300 leading-relaxed">
                            <strong className="text-indigo-400">Golpo's specific advantage</strong> lies in education and doc-to-video. If you want social media b-roll, go to Invideo. If you want talking heads, Synthesia. For complex whiteboard explanations, Golpo wins hands-down.
                        </p>
                    </div>
                </section>

                {/* Final Verdict Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/40 border border-indigo-500/30 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Is Golpo AI Worth It in 2026?
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                            Yes, if you're a business, educator, or developer advocate who currently pays external editors to make explainer videos—Golpo will save you significant money and hours. But for individual beginners, it might be tough to justify.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <CTAButton href={AFFILIATE_LINKS.main} variant="primary">
                                Try Golpo AI Free
                            </CTAButton>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
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

                {/* Standard Disclosure */}
                <div className="text-center text-slate-500 text-sm border-t border-slate-800 pt-8">
                    <p>
                        <strong>About the Author:</strong> Written by Dev Kant Kumar — Full Stack Developer & YouTuber at Dev Code Space. Details are based on personal testing of Golpo AI's output and capabilities.
                    </p>
                </div>

            </div>
        </div>
    );
};

// NextJS / Vite exports compatibility
GolpoAIReview2026.info = info;
export default GolpoAIReview2026;
