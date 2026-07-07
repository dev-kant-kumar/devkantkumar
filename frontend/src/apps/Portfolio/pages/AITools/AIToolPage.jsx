import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  Sparkles,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import ToolIcon from "./ToolIcon";
import {
  buildFaqs,
  getAlternatives,
  getToolBySlug,
  pricingBlurb,
} from "./utils";

const pricingStyles = {
  Free: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  Freemium: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
  Premium: "text-violet-300 border-violet-500/30 bg-violet-500/10",
  "Open Source": "text-amber-300 border-amber-500/30 bg-amber-500/10",
};

const AIToolPage = () => {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  if (!tool) return <Navigate to="/ai-tools" replace />;

  const alternatives = getAlternatives(tool, 6);
  const faqs = buildFaqs(tool);
  const seoTitle = `${tool.name} Review 2026: Features, Pricing & Alternatives`;
  const seoDescription = `${tool.description} See ${tool.name} pricing, key features, ratings and the best alternatives in our AI tools directory.`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={[
          `${tool.name.toLowerCase()} review`,
          `${tool.name.toLowerCase()} pricing`,
          `${tool.name.toLowerCase()} alternatives`,
          tool.category.toLowerCase(),
          "ai tools",
          "best ai tools 2026",
          ...(tool.tags || []),
        ]}
      />
      <StructuredData type="aiTool" pageData={tool} />
      <StructuredData type="faq" pageData={{ faqs }} />
      <StructuredData
        type="breadcrumbs"
        pageData={{
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "AI Tools", path: "/ai-tools" },
            { name: tool.name, path: `/ai-tools/${tool.slug}` },
          ],
        }}
      />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-hidden pb-24">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pt-32">
          {/* Breadcrumb nav */}
          <nav className="mb-10" aria-label="Breadcrumb">
            <Link
              to="/ai-tools"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group text-sm font-semibold"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to AI Tools Directory
            </Link>
          </nav>

          {/* Hero */}
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-start gap-5 flex-wrap">
              <div className="leading-none p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/30 shadow-lg">
                <ToolIcon tool={tool} size={56} />
              </div>
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-[11px] font-mono font-bold tracking-widest uppercase">
                    <Sparkles size={11} /> {tool.category}
                  </span>
                  {tool.pricing && (
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                        pricingStyles[tool.pricing] ||
                        "text-slate-300 border-slate-700 bg-slate-800/50"
                      }`}
                    >
                      {tool.pricing}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {tool.name} Review <span className="text-cyan-400">2026</span>
                </h1>
                <div className="flex items-center gap-5 mt-4 text-sm text-slate-400 flex-wrap">
                  {tool.rating && (
                    <span className="inline-flex items-center gap-1.5">
                      <Star
                        size={15}
                        className="text-amber-400 fill-amber-400"
                      />
                      <strong className="text-white">{tool.rating}</strong> /
                      5.0
                    </span>
                  )}
                  {tool.users && (
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={15} className="text-cyan-400" />
                      {tool.users} users
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-8">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/20"
              >
                Visit {tool.name}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.header>

          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-black text-white mb-4">
              What is {tool.name}?
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
              {tool.description}
            </p>
            <p className="text-slate-400 leading-relaxed text-sm mt-4">
              {pricingBlurb(tool)} It sits in the{" "}
              <strong className="text-slate-200">{tool.category}</strong>{" "}
              category of our{" "}
              <Link to="/ai-tools" className="text-cyan-400 hover:underline">
                AI tools directory
              </Link>
              , where you can compare it against similar tools below.
            </p>

            {/* Key facts */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {[
                { label: "Category", value: tool.category },
                { label: "Pricing", value: tool.pricing },
                { label: "Rating", value: tool.rating ? `${tool.rating} / 5` : "-" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4"
                >
                  <div className="text-[11px] uppercase tracking-widest text-slate-500 font-mono font-bold mb-1">
                    {f.label}
                  </div>
                  <div className="text-slate-100 font-semibold text-sm">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags / capabilities */}
            {tool.tags?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                  <Tag size={14} className="text-cyan-400" /> Key capabilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-medium"
                    >
                      <Check size={12} className="text-emerald-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.section>

          {/* Alternatives - internal linking engine */}
          {alternatives.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mb-12"
            >
              <h2 className="text-2xl font-black text-white mb-2">
                Best {tool.name} Alternatives
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                Other {tool.category.toLowerCase()} tools worth comparing.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    to={`/ai-tools/${alt.slug}`}
                    className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 hover:bg-slate-900/70 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <ToolIcon tool={alt} size={28} />
                      <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {alt.name}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {alt.description}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mb-12"
            >
              <h2 className="text-2xl font-black text-white mb-6">
                {tool.name} FAQ
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6"
                  >
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Closing CTA */}
          <div className="text-center bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-violet-500/10 border border-cyan-500/20 rounded-3xl p-8">
            <h2 className="text-xl font-black text-white mb-2">
              Ready to try {tool.name}?
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              {pricingBlurb(tool)}
            </p>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all"
            >
              Visit {tool.name} <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIToolPage;
