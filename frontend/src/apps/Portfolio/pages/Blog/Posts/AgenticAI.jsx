import { BookOpen, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { AgenticFeaturedImage, AgenticThumbnail } from "./AgenticAIContent/SharedComponents";

// Import Parts
import Part10_Resources from "./AgenticAIContent/Part10_Resources";
import Part1_Foundations from "./AgenticAIContent/Part1_Foundations";
import Part2_Architecture from "./AgenticAIContent/Part2_Architecture";
import Part3_MultiAgent from "./AgenticAIContent/Part3_MultiAgent";
import Part4_Frameworks from "./AgenticAIContent/Part4_Frameworks";
import Part5_Patterns from "./AgenticAIContent/Part5_Patterns";
import Part6_HandsOn from "./AgenticAIContent/Part6_HandsOn";
import Part7_Enterprise from "./AgenticAIContent/Part7_Enterprise";
import Part8_UseCases from "./AgenticAIContent/Part8_UseCases";
import Part9_Future from "./AgenticAIContent/Part9_Future";

const AgenticAI = () => {
    const [progress, setProgress] = useState(0);

    // Scroll Progress Tracker
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
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 max-w-7xl">

        {/* Header Section */}
        <header className="mb-16 animate-fade-in">
           {/* Featured Image and Metadata preserved */}
           <AgenticFeaturedImage className="rounded-3xl shadow-2xl mb-12 min-h-[400px]" />

           <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8 border-b border-slate-800 pb-8">
               <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">DK</div>
                   <span className="text-slate-200">DevKant Kumar</span>
               </div>
               <div className="flex items-center gap-2">
                   <Clock size={16} />
                   <span>60 min read</span>
               </div>
               <div className="flex items-center gap-2">
                   <BookOpen size={16} />
                   <span>Updated Jan 2025</span>
               </div>
           </div>
        </header>

        {/* Main Content Area - Full Width */}
        <div className="max-w-none space-y-20">

            <section id="foundations" className="scroll-mt-24">
                <Part1_Foundations />
            </section>

            <section id="architecture" className="scroll-mt-24">
                <Part2_Architecture />
            </section>

            <section id="multi-agent" className="scroll-mt-24">
                <Part3_MultiAgent />
            </section>

            <section id="frameworks" className="scroll-mt-24">
                <Part4_Frameworks />
            </section>

            <section id="patterns" className="scroll-mt-24">
                <Part5_Patterns />
            </section>

            <section id="hands-on" className="scroll-mt-24">
                <Part6_HandsOn />
            </section>

            <section id="enterprise" className="scroll-mt-24">
                <Part7_Enterprise />
            </section>

            <section id="use-cases" className="scroll-mt-24">
                <Part8_UseCases />
            </section>

            <section id="future" className="scroll-mt-24">
                <Part9_Future />
            </section>

            <section id="resources" className="scroll-mt-24">
                <Part10_Resources />
            </section>

        </div>

      </div>
    </div>
  );
};

export const info = {
    slug: "agentic-ai-guide",
    title: "Agentic AI: The Complete Guide to Building Autonomous Systems",
    description: "The definitive 2025 guide to building AI agents. Covers architecture, design patterns (ReAct), frameworks (LangChain, CrewAI), and production scaling.",
    excerpt: "The definitive 2025 guide to building AI agents. Covers architecture, design patterns (ReAct), frameworks (LangChain, CrewAI), and production scaling.",
    publishDate: "2025-01-05",
    category: "AI Resources",
    tags: ["Agentic AI", "LangChain", "LLMs", "Autonomous Agents", "Python"],
    image: "/images/blog/agentic-ai.png",
    featured: true,
    readTime: "60 min read",
    author: "Dev Kant Kumar",
};

AgenticAI.info = info;
AgenticAI.FeaturedImage = AgenticFeaturedImage;
AgenticAI.ThumbnailImage = AgenticThumbnail;

export default AgenticAI;
