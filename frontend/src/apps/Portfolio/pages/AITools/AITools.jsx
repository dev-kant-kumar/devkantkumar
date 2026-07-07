import { motion } from "framer-motion";
import { ArrowUpRight, Search, Sparkles, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../../../components/SEO/SEOHead";
import StructuredData from "../../../../components/SEO/StructuredData";
import { categories } from "../Blog/Posts/data/aiToolsData";
import ToolIcon from "./ToolIcon";
import { allAiTools } from "./utils";

const pricingStyles = {
  Free: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  Freemium: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
  Premium: "text-violet-300 border-violet-500/30 bg-violet-500/10",
  "Open Source": "text-amber-300 border-amber-500/30 bg-amber-500/10",
};

const AITools = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allAiTools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        (tool.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <>
      <SEOHead
        title="AI Tools Directory 2026: 100+ Best AI Tools Reviewed"
        description="Browse 100+ of the best AI tools of 2026 across 11 categories - chatbots, image & video generation, coding assistants, writing and more. Compare features, pricing and alternatives."
        keywords={[
          "ai tools directory",
          "best ai tools 2026",
          "free ai tools",
          "ai tools list",
          "chatgpt alternatives",
          "ai coding assistant",
          "ai image generator",
        ]}
      />
      <StructuredData
        type="itemList"
        pageData={{
          items: allAiTools.map((t) => ({ id: t.slug })),
        }}
      />
      <StructuredData
        type="breadcrumbs"
        pageData={{
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "AI Tools", path: "/ai-tools" },
          ],
        }}
      />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-hidden pb-24">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles size={12} /> AI Tools Directory
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              100+ Best AI Tools of{" "}
              <span className="text-cyan-400">2026</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Hand-picked AI tools across {categories.length - 1} categories.
              Compare features, pricing and alternatives - then click any tool
              for a full breakdown.
            </p>
          </motion.header>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 100+ AI tools…"
                aria-label="Search AI tools"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500 text-slate-950 border-cyan-500"
                    : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-cyan-500/30 hover:text-cyan-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-center text-sm text-slate-500 mb-6">
            Showing <strong className="text-slate-300">{filtered.length}</strong>{" "}
            tools
          </p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tool, idx) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.02, 0.4) }}
              >
                <Link
                  to={`/ai-tools/${tool.slug}`}
                  className="group flex flex-col h-full bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 hover:bg-slate-900/70 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <ToolIcon tool={tool} size={40} />
                      <div>
                        <h2 className="font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                          {tool.name}
                        </h2>
                        {tool.rating && (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                            <Star
                              size={12}
                              className="text-amber-400 fill-amber-400"
                            />
                            {tool.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-600 group-hover:text-cyan-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 flex-1">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {tool.category}
                    </span>
                    {tool.pricing && (
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          pricingStyles[tool.pricing] ||
                          "text-slate-300 border-slate-700 bg-slate-800/50"
                        }`}
                      >
                        {tool.pricing}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-slate-500 py-16">
              No tools match your search. Try a different keyword or category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AITools;
