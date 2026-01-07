import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    Clock,
    DollarSign,
    Lightbulb,
    Mail,
    Minus,
    Sparkles,
    Star,
    TrendingUp,
    Users,
    Zap,
    Play
} from "lucide-react";
import { useState } from "react";

// =====================================================
// BLOG POST METADATA - SEO OPTIMIZED (Based on Real Search Data)
// =====================================================
export const info = {
    slug: "aweber-review-2026",
    title: "AWeber Review 2026: Best Email Marketing for Small Business?",
    description: "Complete AWeber review with pricing ($0-$20/mo), features, pros & cons. Discover why 100,000+ businesses trust AWeber for email marketing. Free plan available - no credit card required.",
    excerpt: "Is AWeber the right email marketing platform for your business in 2026? This honest review covers pricing, features, automation, and how it compares to Mailchimp and ConvertKit. Start free today.",
    publishDate: "2026-01-07",
    modifiedDate: "2026-01-07",
    category: "Tools",
    featured: true,
    readTime: "12 min read",
    author: "Dev Kant Kumar",
    image: "/images/blog/aweber-review-2026.png",
    // High-volume keywords based on search data
    keywords: "AWeber review, AWeber pricing, AWeber vs Mailchimp, best email marketing small business, AWeber free plan, email marketing for beginners, AWeber features 2026, AWeber tutorial, email newsletter software, AWeber alternatives",
    tags: [
        "AWeber Review",
        "Email Marketing",
        "Small Business Tools",
        "Newsletter Software",
        "Marketing Automation",
        "AWeber vs Mailchimp",
        "Free Email Marketing"
    ],
    faqs: [
        {
            question: "Is AWeber free to use?",
            answer: "Yes! AWeber offers a free plan for up to 500 subscribers with 3,000 emails per month. You get access to email templates, landing pages, sign-up forms, and basic automation. No credit card required to start."
        },
        {
            question: "How much does AWeber cost?",
            answer: "AWeber pricing starts at $0 (Free plan for 500 subscribers). The Lite plan is $12.50/month, Plus plan is $20/month for unlimited features, and the Unlimited enterprise plan starts at $899/month for large businesses."
        },
        {
            question: "Is AWeber good for beginners?",
            answer: "Absolutely! AWeber is known for its user-friendly interface, drag-and-drop editor, 600+ templates, and 24/7 customer support including live chat and phone. It's one of the most beginner-friendly email marketing platforms."
        },
        {
            question: "AWeber vs Mailchimp: Which is better?",
            answer: "AWeber is better for simplicity and customer support (24/7 phone + chat). Mailchimp offers more advanced automation. AWeber's free plan allows 500 subscribers vs Mailchimp's 500, but AWeber has better deliverability rates and doesn't penalize duplicate subscribers across lists."
        },
        {
            question: "Does AWeber have automation?",
            answer: "Yes, AWeber offers email automation including autoresponders, triggered emails, and campaign workflows. The free plan includes basic automation, while paid plans unlock more advanced sequences and behavioral triggers."
        },
        {
            question: "Can I sell products with AWeber?",
            answer: "Yes! AWeber allows you to sell digital products directly through your emails and landing pages without needing additional e-commerce software. This feature is available on paid plans."
        },
        {
            question: "What integrations does AWeber support?",
            answer: "AWeber integrates with 750+ third-party apps including WordPress, Shopify, WooCommerce, PayPal, Stripe, Facebook, and many more. It also connects with Zapier for even more integrations."
        },
        {
            question: "Is AWeber better than ConvertKit?",
            answer: "AWeber is more affordable and beginner-friendly with a genuine free plan. ConvertKit is better for advanced creators who need sophisticated automation. AWeber wins on pricing ($0 free vs ConvertKit's limited free), templates (600+ vs fewer), and phone support."
        }
    ],
};

// =====================================================
// AFFILIATE LINK CONFIGURATION
// =====================================================
const AFFILIATE_LINKS = {
    main: "https://devkantkumar.aweber.com",
    plusOnly: "https://devkantkumar.aweber.com/pro.htm",
};

// =====================================================
// REUSABLE CTA BUTTON COMPONENT
// =====================================================
const CTAButton = ({ href, children, variant = "primary", className = "" }) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-300 group";
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
    <div className="bg-gradient-to-br from-blue-900/30 via-slate-900/50 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">Editor's Verdict</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">AWeber is the best choice for beginners & small businesses</h3>
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/50 text-amber-400/50'}`} />
                        ))}
                    </div>
                    <span className="font-bold text-white">4.5/5</span>
                </div>
            </div>
            <CTAButton href={AFFILIATE_LINKS.main}>
                Try AWeber Free
            </CTAButton>
        </div>
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
            subscribers: "500",
            features: ["3,000 emails/month", "Email templates", "Landing pages", "Sign-up forms", "Basic automation", "AWeber branding"],
            highlighted: false,
            cta: "Start Free",
        },
        {
            name: "Lite",
            price: "$12.50",
            period: "/month",
            subscribers: "500+",
            features: ["Unlimited emails", "3 landing pages", "3 automations", "1 custom segment", "Email support", "AWeber branding"],
            highlighted: false,
            cta: "Get Lite",
        },
        {
            name: "Plus",
            price: "$20",
            period: "/month",
            subscribers: "500+",
            features: ["Unlimited everything", "Advanced analytics", "No AWeber branding", "Priority support", "Sell products", "Advanced automation"],
            highlighted: true,
            cta: "Get Plus",
        },
    ];

    return (
        <div className="grid md:grid-cols-3 gap-6 my-12">
            {plans.map((plan, idx) => (
                <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative rounded-2xl p-6 ${
                        plan.highlighted
                            ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50 shadow-xl shadow-blue-500/10'
                            : 'bg-slate-900/50 border border-slate-800'
                    }`}
                >
                    {plan.highlighted && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                            Most Popular
                        </div>
                    )}
                    <div className="text-center mb-6">
                        <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                        <div className="flex items-end justify-center gap-1">
                            <span className="text-4xl font-black text-white">{plan.price}</span>
                            <span className="text-slate-400 mb-1">{plan.period}</span>
                        </div>
                        <p className="text-slate-400 text-sm mt-2">Up to {plan.subscribers} subscribers</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <CTAButton
                        href={plan.name === "Plus" ? AFFILIATE_LINKS.plusOnly : AFFILIATE_LINKS.main}
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
                Pros
            </h4>
            <ul className="space-y-3">
                {[
                    "Genuine free plan (500 subscribers, no CC)",
                    "24/7 customer support including phone",
                    "600+ email templates",
                    "Easy drag-and-drop editor",
                    "Excellent deliverability rates",
                    "750+ integrations",
                    "25+ years of experience",
                    "Landing page builder included"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <Minus className="w-6 h-6" />
                Cons
            </h4>
            <ul className="space-y-3">
                {[
                    "AWeber branding on free plan",
                    "Limited automation compared to competitors",
                    "Price increased in late 2024",
                    "No SMS marketing option",
                    "Template designs could be more modern"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                        <Minus className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        {item}
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
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-colors group">
        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
            <Icon className="w-6 h-6 text-blue-400" />
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
                    <th className="text-left p-4 text-slate-400 font-medium">Feature</th>
                    <th className="text-center p-4 text-blue-400 font-bold">AWeber</th>
                    <th className="text-center p-4 text-slate-400 font-medium">Mailchimp</th>
                    <th className="text-center p-4 text-slate-400 font-medium">ConvertKit</th>
                </tr>
            </thead>
            <tbody>
                {[
                    { feature: "Free Plan Subscribers", aweber: "500", mailchimp: "500", convertkit: "300" },
                    { feature: "Free Plan Emails", aweber: "3,000/mo", mailchimp: "1,000/mo", convertkit: "Unlimited" },
                    { feature: "Templates", aweber: "600+", mailchimp: "100+", convertkit: "Limited" },
                    { feature: "24/7 Phone Support", aweber: "✓", mailchimp: "✗", convertkit: "✗" },
                    { feature: "Landing Pages (Free)", aweber: "✓", mailchimp: "✓", convertkit: "Limited" },
                    { feature: "Automation (Free)", aweber: "Basic", mailchimp: "Limited", convertkit: "Good" },
                    { feature: "Starting Price (Paid)", aweber: "$12.50/mo", mailchimp: "$13/mo", convertkit: "$25/mo" },
                ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                        <td className="p-4 text-slate-300">{row.feature}</td>
                        <td className="p-4 text-center text-white font-medium">{row.aweber}</td>
                        <td className="p-4 text-center text-slate-400">{row.mailchimp}</td>
                        <td className="p-4 text-center text-slate-400">{row.convertkit}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// =====================================================
// MAIN BLOG POST COMPONENT
// =====================================================
const AWeberReview2026 = () => {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 max-w-4xl">

                {/* Hero Section */}
                <header className="py-12 md:py-16">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">Email Marketing Review</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                        AWeber Review 2026: Is It Still the{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            Best Email Marketing
                        </span>{" "}
                        for Small Business?
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xs">DK</div>
                            <span>Dev Kant Kumar</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>12 min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Updated Jan 2026</span>
                        </div>
                    </div>

                    {/* Verdict Box */}
                    <VerdictBox />

                    {/* Intro Paragraph */}
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        Looking for an email marketing platform that's <strong className="text-white">simple, affordable, and reliable</strong>? After 25+ years in the industry, AWeber remains one of the most trusted names in email marketing, serving over 100,000 businesses worldwide.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed mb-8">
                        In this comprehensive review, I'll cover everything you need to know about AWeber in 2026: features, pricing, pros & cons, and how it compares to competitors like Mailchimp and ConvertKit. <strong className="text-white">Spoiler: There's a free plan with no credit card required.</strong>
                    </p>

                    {/* AWeber Video Banner Section */}
                    <div className="my-12">
                        <div className="bg-gradient-to-br from-blue-900/20 via-slate-900/80 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 md:p-8 overflow-hidden">
                            <div className="flex items-center gap-2 mb-4">
                                <Play className="w-5 h-5 text-blue-400" />
                                <h3 className="text-lg font-bold text-white">Watch: AWeber in Action</h3>
                            </div>

                            {/* Wistia Video Embed */}
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-slate-900">
                                <iframe
                                    src="//fast.wistia.net/embed/iframe/vjqvtvm1y5"
                                    title="AWeber Demo Video"
                                    allowTransparency={true}
                                    frameBorder="0"
                                    scrolling="no"
                                    className="wistia_embed w-full h-full"
                                    name="wistia_embed"
                                    allowFullScreen
                                />
                            </div>

                            {/* Affiliate Banner */}
                            <a
                                href={AFFILIATE_LINKS.main}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                            >
                                <img
                                    src="https://www.aweber.com/images/advocate/aweber-free-480x100.png"
                                    alt="AWeber Free: Email marketing for free. No credit card required."
                                    className="w-full max-w-md mx-auto"
                                />
                            </a>
                        </div>
                    </div>
                </header>

                {/* Quick Summary */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Zap className="text-amber-400" />
                        Quick Summary: Who AWeber Is For
                    </h2>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Perfect For
                                </h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li>• Small businesses starting email marketing</li>
                                    <li>• Bloggers building their first list</li>
                                    <li>• Solopreneurs who want simplicity</li>
                                    <li>• Anyone who values customer support</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                                    <Minus className="w-5 h-5" />
                                    Not Ideal For
                                </h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li>• Large enterprises needing complex automation</li>
                                    <li>• Users who need SMS marketing</li>
                                    <li>• Those requiring ultra-modern templates</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pros & Cons */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">AWeber Pros & Cons</h2>
                    <ProsCons />
                </section>

                {/* Key Features */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Sparkles className="text-purple-400" />
                        Key Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FeatureCard
                            icon={Mail}
                            title="Drag-and-Drop Email Builder"
                            description="Create beautiful emails without coding. Choose from 600+ templates or build from scratch with the intuitive editor."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Email Automation"
                            description="Set up autoresponders and triggered email sequences to nurture leads automatically. Welcome series, drip campaigns, and more."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Landing Page Builder"
                            description="Build high-converting landing pages to capture leads. No coding required, with templates optimized for conversions."
                        />
                        <FeatureCard
                            icon={TrendingUp}
                            title="Analytics & Reporting"
                            description="Track opens, clicks, and conversions with detailed reports. Understand what works and optimize your campaigns."
                        />
                        <FeatureCard
                            icon={DollarSign}
                            title="Sell Digital Products"
                            description="Sell ebooks, courses, and digital downloads directly through AWeber. Built-in e-commerce without extra tools."
                        />
                        <FeatureCard
                            icon={Lightbulb}
                            title="Smart Designer (AI)"
                            description="Enter your website URL and AWeber's AI creates custom email templates matching your brand automatically."
                        />
                    </div>
                </section>

                {/* Pricing */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <DollarSign className="text-emerald-400" />
                        AWeber Pricing 2026
                    </h2>
                    <p className="text-slate-300 mb-8">
                        AWeber offers transparent pricing based on subscriber count. The free plan is one of the most generous in the industry, and paid plans start at just $12.50/month.
                    </p>
                    <PricingTable />
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-center gap-4">
                        <Zap className="w-6 h-6 text-blue-400 flex-shrink-0" />
                        <p className="text-slate-300 text-sm">
                            <strong className="text-white">Pro Tip:</strong> Start with the free plan to test AWeber, then upgrade to Plus when you need advanced features or want to remove branding.
                        </p>
                    </div>
                </section>

                {/* Comparison */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">AWeber vs Competitors</h2>
                    <p className="text-slate-300 mb-6">
                        How does AWeber stack up against Mailchimp and ConvertKit? Here's a quick comparison:
                    </p>
                    <ComparisonTable />
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mt-6">
                        <h4 className="text-lg font-bold text-white mb-3">The Verdict</h4>
                        <p className="text-slate-300 leading-relaxed">
                            <strong className="text-blue-400">AWeber wins</strong> on customer support (24/7 phone!), template variety (600+), and value for beginners. If you prioritize simplicity and reliability over complex automation, AWeber is the clear choice.
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-blue-600/20 via-slate-900 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Ready to Grow Your Email List?
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                            Join 100,000+ businesses using AWeber. Start with the free plan—no credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <CTAButton href={AFFILIATE_LINKS.main} variant="primary">
                                Start Free Today
                            </CTAButton>
                            <CTAButton href={AFFILIATE_LINKS.plusOnly} variant="outline">
                                View Plus Features
                            </CTAButton>
                        </div>
                        <p className="text-slate-500 text-sm mt-6">
                            ✓ No credit card required &nbsp; ✓ 500 subscribers free &nbsp; ✓ Cancel anytime
                        </p>
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

                {/* Final CTA */}
                <section className="mb-16 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">My Final Verdict</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                        AWeber remains one of the best email marketing platforms for small businesses in 2026. With its free plan, excellent support, and proven deliverability, it's the safest choice for beginners. <strong className="text-white">Give it a try—it costs nothing to start.</strong>
                    </p>
                    <CTAButton href={AFFILIATE_LINKS.main} variant="primary" className="text-lg px-8 py-4">
                        Get AWeber Free Now
                    </CTAButton>
                </section>

                {/* Disclosure */}
                <div className="text-center text-slate-500 text-sm border-t border-slate-800 pt-8">
                    <p>
                        <strong>Disclosure:</strong> This post contains affiliate links. If you purchase through these links, I may earn a commission at no extra cost to you. I only recommend products I genuinely believe in.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AWeberReview2026;
