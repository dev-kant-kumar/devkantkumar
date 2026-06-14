import {
    Activity,
    BarChart3,
    Clock,
    Code2,
    Database,
    Layers,
    User
} from "lucide-react";
import React from "react";

// Lazy-loaded subcomponents
const Introduction = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Introduction"));
const Section1 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section1"));
const Section2 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section2"));
const Section3 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section3"));
const Section4 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section4"));
const Section5 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section5"));
const Section6 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section6"));
const Section7 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section7"));
const Section8 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section8"));
const Section9 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section9"));
const Section10 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section10"));
const Section11 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section11"));
const Section12 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section12"));
const Section13 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section13"));
const Section14 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section14"));
const Section15 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section15"));
const Section16 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section16"));
const Section17 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section17"));
const Section18 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section18"));
const Section19 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section19"));
const Section20 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section20"));
const Section21 = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Section21"));
const Resources = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Resources"));
const Conclusion = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/Conclusion"));
const Faqs = React.lazy(() => import("./ReactJSCompleteGuide2026Comps/faqs"));

function FeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-orange-950/40 to-slate-950 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-orange-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-orange-300 text-sm font-medium">Complete Guide 2026</span>
        </div>

        {/* Icon Grid */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Code2 size={28} className="text-orange-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center">
            <Layers size={40} className="text-orange-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Activity size={28} className="text-amber-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">React JS </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500">Complete Guide</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg">
          Beginner to Master (with 200+ Interview Questions)
        </p>
      </div>
    </div>
  );
}

function CardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0f172a] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800 hover:border-orange-500/50 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/40 via-[#0f172a] to-[#0f172a]" />
      <div className="relative flex flex-col items-center gap-3 text-slate-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-lg">
          <Layers size={32} className="text-orange-400" />
        </div>
        <span className="font-bold text-lg tracking-wide text-orange-50">
          React JS Complete Guide
        </span>
      </div>
    </div>
  );
}

function ArticleMetadata() {
  return (
    <div className="py-8 border-b border-slate-800/50">
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm px-6">
        <div className="flex items-center gap-2">
          <User size={16} className="text-orange-400" />
          <span className="font-medium text-slate-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-orange-400" />
          <span>90 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-orange-400" />
          <span>Beginner - Advanced</span>
        </div>
      </div>
    </div>
  );
}

function ReactJSCompleteGuide2026() {
  return (
    <div className="min-h-screen">
      <FeaturedImage />
      <ArticleMetadata />

      <article className="py-12">
        <Introduction />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
        <Section10 />
        <Section11 />
        <Section12 />
        <Section13 />
        <Section14 />
        <Section15 />
        <Section16 />
        <Section17 />
        <Section18 />
        <Section19 />
        <Section20 />
        <Section21 />
        <Resources />
        <Conclusion />
        <Faqs />
      </article>
    </div>
  );
}

// Attach helpers for list rendering and previews
ReactJSCompleteGuide2026.FeaturedImage = FeaturedImage;
ReactJSCompleteGuide2026.Image = CardImage;
ReactJSCompleteGuide2026.CardImage = CardImage;

// Metadata for auto-indexing in postsLocal.js
ReactJSCompleteGuide2026.info = {
  id: "react-js-complete-guide-2026",
  slug: "react-js-complete-guide-2026",
  title: "React JS Complete Guide 2026: Beginner to Master",
  excerpt:
    "The only React JS guide you need in 2026. Master components, hooks, state management, performance, React 19, and more - with 200+ interview questions and real code examples.",
  description: "Master React JS in 2026. Learn components, hooks, state management, performance, React 19, and 200+ interview questions with code examples.",
  category: "React",
  author: "Dev Kant Kumar",
  readTime: "90 min read",
  image: "/images/blog/react-js-complete-guide-2026-og.png",
  featuredImage: "/images/blog/react-js-complete-guide-2026-og.png",
  featured: true,
  publishDate: "2026-06-14",
  modifiedDate: "2026-06-14",
  keywords: "react js complete guide 2026, react js tutorial 2026, react hooks explained, react interview questions 2026, react state management, react 19 features, react js beginner to advanced, react performance optimization, react for react native developers",
  tags: [
    "React",
    "JavaScript",
    "Frontend",
    "Web Development",
    "Interview Prep",
    "React 19",
    "Hooks",
    "State Management",
  ],
  faqs: [
    {
      question: "What is the best way to learn React in 2026?",
      answer: "Master JavaScript ES6+ first. Then learn core React: Components, Props, State, and Hooks. Build real projects, understand caching with TanStack Query, and learn TypeScript."
    },
    {
      question: "Do I need to learn Redux in 2026?",
      answer: "Not initially. Most modern apps use Zustand for lightweight global state, and TanStack Query for server cache. Redux is still used in large enterprises, but it is no longer the default for new projects."
    },
    {
      question: "Is React 19 backward compatible?",
      answer: "Yes, mostly. It removes some old deprecated APIs, but standard functional components work fine. The biggest change is automatic ref forwarding and async Actions."
    }
  ]
};

export default ReactJSCompleteGuide2026;
