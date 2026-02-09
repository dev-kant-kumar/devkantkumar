import {
    Activity,
    BarChart3,
    Clock,
    Database,
    Layers,
    User
} from "lucide-react";
import React from "react";
const Introduction = React.lazy(()=>import("./ReactStateManagement2026Comps/Introduction"));
const Section1 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section1"));
const Section2 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section2"));
const Section3 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section3"));
const Section4 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section4"));
const Section5 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section5"));
const Section6 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section6"));
const Section7 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section7"));
const Section8 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section8"));
const Section9 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section9"));
const Section10 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section10"));
const Section11 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section11"));
const Section12 = React.lazy(()=>import("./ReactStateManagement2026Comps/Section12"));
const Resources = React.lazy(()=>import("./ReactStateManagement2026Comps/Resources"))
const Conclusion = React.lazy(()=>import("./ReactStateManagement2026Comps/Conclusion"));
const Faqs = React.lazy(()=>import("./ReactStateManagement2026Comps/faqs"))


// --- Components ---

function FeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-indigo-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-indigo-300 text-sm font-medium">2026 Guide</span>
        </div>

        {/* Icon Grid */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Database size={28} className="text-emerald-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Layers size={40} className="text-indigo-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Activity size={28} className="text-purple-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">React State </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500">Management</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg">
          The Complete 2026 Practical Guide
        </p>
      </div>
    </div>
  );
}

function CardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0f172a] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0f172a] to-[#0f172a]" />
      <div className="relative flex flex-col items-center gap-3 text-slate-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-lg">
          <Layers size={32} className="text-indigo-400" />
        </div>
        <span className="font-bold text-lg tracking-wide text-indigo-50">
          State Management 2026
        </span>
      </div>
    </div>
  );
}


function ArticleMetadata() {
  return (
    <div className="py-8 border-b border-slate-800/50">
      <div className="flex flex-wrap items-center  gap-6 text-slate-400 text-sm px-6">
        <div className="flex items-center gap-2">
          <User size={16} className="text-indigo-400" />
          <span className="font-medium text-slate-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-400" />
          <span>20 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-indigo-400" />
          <span>Beginner - Advanced</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---

function ReactStateManagement2026() {
  return (
    <div className="min-h-screen">
      <FeaturedImage />
      <ArticleMetadata />

      <article className="py-12">
        <Introduction/>
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Section5/>
        <Section6/>
        <Section7/>
        <Section8/>
        <Section9/>
        <Section10/>
        <Section11/>
        <Section12/>
        <Resources/>
        <Conclusion/>
        <Faqs/>
      </article>
    </div>
  );
}

// Attach image helpers
ReactStateManagement2026.FeaturedImage = FeaturedImage;
ReactStateManagement2026.Image = CardImage;
ReactStateManagement2026.CardImage = CardImage;

// Metadata
ReactStateManagement2026.info = {
  id: "react-state-management-2026",
  slug: "react-state-management-2026",
  title: "React State Management in 2026: The Complete Practical Guide",
  excerpt:
    "Zustand vs Redux vs React Query? Master React state management in 2026 with decision trees and real examples.",
  category: "React",
  author: "Dev Kant Kumar",
  readTime: "20 min read",
  image: "/images/blog/react-state-management.png", // Placeholder image path
  featuredImage: "/images/blog/react-state-management.png",
  featured: true,
  publishDate: "2026-01-26", // Current date as per metadata
  modifiedDate: "2026-01-26",
  keywords: "react state management 2026, best react state management, react state management guide, zustand vs redux, react query tutorial",
  tags: [
    "react",
    "state-management",
    "zustand",
    "redux",
    "tanstack-query",
    "performance",
    "frontend-architecture",
  ],
  faqs: [
    {
      question: "Which React state management library is best in 2026?",
      answer: "There is no single best library. Use TanStack Query for server state, Zustand for client state in small/medium apps, and Redux Toolkit for large enterprise applications."
    },
    {
      question: "Is Redux dead in 2026?",
      answer: "No, Redux Toolkit remains the standard for large-scale enterprise applications with complex state needs, though it's less common for smaller projects where Zustand dominates."
    },
    {
      question: "Do I need a state management library?",
      answer: "Not always. For many apps, React's built-in useState, useReducer, and Context API combined with a data fetching library like React Query are sufficient."
    }
  ]
};

export default ReactStateManagement2026;
