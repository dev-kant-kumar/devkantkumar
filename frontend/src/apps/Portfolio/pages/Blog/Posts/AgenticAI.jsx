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

      <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 max-w-7xl">

        {/* Header Section */}
        <header className="mb-16 animate-fade-in">
           {/* Featured Image - Full Width, No Gap */}
           <div className="-mx-4 md:-mx-6 lg:-mx-8 -mt-8">
             <AgenticFeaturedImage className="shadow-2xl mb-12 min-h-[400px] w-full" />
           </div>

           <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8 border-b border-slate-800 pb-8">
               <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">DK</div>
                   <span className="text-slate-200">Dev Kant Kumar</span>
               </div>
               <div className="flex items-center gap-2">
                   <Clock size={16} />
                   <span>60 min read</span>
               </div>
               <div className="flex items-center gap-2">
                   <BookOpen size={16} />
                   <span>Updated Jan 2026</span>
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
    title: "Agentic AI: The Complete Guide to Building Autonomous AI Agents (2026)",
    description: "Master agentic AI with this comprehensive guide. Learn to build autonomous AI agents using LangChain, LangGraph, CrewAI, and AutoGen. Covers ReAct pattern, multi-agent systems, RAG, tool calling, and production deployment. With 8 runnable code examples and a 90-day learning roadmap.",
    excerpt: "The definitive 2026 guide to building AI agents. Covers agentic AI architecture, design patterns (ReAct, Reflection), frameworks (LangChain, LangGraph, CrewAI, AutoGen), multi-agent orchestration, and production scaling with hands-on Python tutorials.",
    publishDate: "2026-01-07",
    category: "AI Resources",
    // SEO-optimized tags based on real search volume data
    tags: [
        "Agentic AI",
        "AI Agents",
        "LangChain",
        "LangGraph",
        "CrewAI",
        "AutoGen",
        "Autonomous AI",
        "LLM Agents",
        "Multi-Agent Systems",
        "ReAct Pattern",
        "RAG",
        "AI Automation",
        "Python AI",
        "OpenAI Agents",
        "AI Tutorial",
        "Build AI Agents",
        "AI Agent Framework"
    ],
    image: "/images/blog/agentic-ai.png",
    featured: true,
    readTime: "60 min read",
    author: "Dev Kant Kumar",
    modifiedDate: "2026-01-07",
    // Additional SEO metadata
    keywords: "agentic ai, ai agents, autonomous ai, langchain tutorial, langgraph tutorial, crewai, autogen, multi-agent systems, react pattern ai, llm agents, build ai agents, ai agent framework, autonomous agents python, ai automation, rag ai, tool calling llm, ai agent development, production ai agents",
    // FAQ Schema for rich snippets
    faqs: [
        {
            question: "What is Agentic AI?",
            answer: "Agentic AI refers to artificial intelligence systems that can operate autonomously, make decisions, and perform multi-step tasks without constant human intervention. Unlike traditional AI that responds to single queries, agentic AI can plan, use tools, maintain memory, and complete complex workflows independently."
        },
        {
            question: "What is the difference between Generative AI and Agentic AI?",
            answer: "Generative AI creates content (text, images, code) based on prompts, while Agentic AI takes actions to complete tasks. Generative AI responds once; Agentic AI runs in loops, uses tools, and can execute multi-step plans autonomously."
        },
        {
            question: "What is the ReAct pattern in AI agents?",
            answer: "ReAct (Reason + Act) is a foundational design pattern where an AI agent alternates between reasoning about what to do next and taking actions. The loop continues until the task is complete: Think → Act → Observe → Repeat."
        },
        {
            question: "Which framework is best for building AI agents?",
            answer: "LangChain with LangGraph is the most mature and production-ready choice with 115K+ GitHub stars. CrewAI is excellent for multi-agent role-based systems, while AutoGen (by Microsoft) excels at complex agent conversations. The best choice depends on your use case."
        },
        {
            question: "How much do AI Agent Engineers earn?",
            answer: "AI Agent Engineers (also called Agentic AI Engineers) are among the highest-paid roles in tech. Salaries range from $100K-$400K+ depending on experience and location, with the market projected to reach $236 billion by 2034."
        },
        {
            question: "What tools do AI agents use?",
            answer: "AI agents can use various tools including web search APIs (Tavily, Serper), code execution environments, database queries, email APIs, file system access, browser automation, and custom business APIs. Tools are defined with schemas that LLMs can understand and call."
        },
        {
            question: "What is a multi-agent system?",
            answer: "A multi-agent system uses multiple specialized AI agents working together, each with a distinct role (researcher, writer, reviewer). They can be organized hierarchically, sequentially, or collaboratively to handle complex tasks that single agents cannot."
        },
        {
            question: "How do I get started with building AI agents?",
            answer: "Start by learning Python and understanding LLM APIs (OpenAI). Then master LangChain basics, implement the ReAct pattern, add tool calling, and progress to multi-agent systems. Follow a structured 90-day roadmap covering foundations, intermediate patterns, and production deployment."
        }
    ],
};

AgenticAI.info = info;
AgenticAI.FeaturedImage = AgenticFeaturedImage;
AgenticAI.ThumbnailImage = AgenticThumbnail;

export default AgenticAI;
