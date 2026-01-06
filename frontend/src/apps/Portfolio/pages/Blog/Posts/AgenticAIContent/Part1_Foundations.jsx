import { ArrowRight, Layout, Target, TrendingUp, Zap } from "lucide-react";
import { AnalogyVisualizer, ComparisonDeck, InfoBox, MarketDataViz } from './SharedComponents';

export default function Part1_Foundations() {
  return (
    <div className="space-y-24">
      {/* Section 1.1: Executive Summary */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Part 1:</span> Foundations & Market Opportunity
        </h2>

        <p className="text-xl text-slate-300 leading-relaxed font-light">
           We are witnessing the most significant shift in artificial intelligence since the transformer architecture.
           We are moving from <strong className="text-white">AI that responds</strong> to <strong className="text-white">AI that acts</strong>.
        </p>

        <InfoBox type="pro" title="Executive Summary: Why This Matters Now">
           <ul className="space-y-3 mt-2">
               <li className="flex items-start gap-3">
                   <TrendingUp className="min-w-5 text-purple-400 mt-1" size={18} />
                   <span><strong>$199B Market by 2030:</strong> Agentic AI is projected to dominate enterprise software spend as companies move to autonomous workflows.</span>
               </li>
               <li className="flex items-start gap-3">
                   <Target className="min-w-5 text-purple-400 mt-1" size={18} />
                   <span><strong>93% Enterprise Adoption:</strong> Almost every Fortune 500 company has agentic pilots in scheduled for 2025.</span>
               </li>
               <li className="flex items-start gap-3">
                    <Zap className="min-w-5 text-purple-400 mt-1" size={18} />
                    <span><strong>From "Chat" to "Work":</strong> This guide is for developers and leaders who want to build systems that don't just talk, but execute complex jobs independently.</span>
               </li>
           </ul>
        </InfoBox>
      </section>

      {/* Section 1.2: What Is Agentic AI? */}
      <section className="space-y-8">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
            <Layout className="text-cyan-400" />
            1.2 What Is Agentic AI?
        </h3>
        <p className="text-slate-400 leading-8 text-lg">
            At its core, <strong>Agentic AI</strong> is a system capable of autonomous decision-making to achieve a high-level goal.
            Unlike a standard LLM (Large Language Model) which waits for a prompt and generates text, an Agent <strong className="text-white">loops</strong>:
            it perceives, reasons, acts, and reflects.
        </p>

        <div className="pl-6 border-l-2 border-slate-700 italic text-slate-400 text-lg">
            "Think of a standard LLM as a <strong>Brilliant Librarian</strong>—it knows everything but sits at a desk waiting for questions.
            Agentic AI is a <strong>Smart Employee</strong>—you give it a goal ('Improve sales'), and it goes out, researches, creates a plan, drafts emails, and sends them."
        </div>

        <h4 className="text-lg font-bold text-slate-200 mt-8">Interactive Analogy: Librarian vs. Agent</h4>
        <AnalogyVisualizer />

        <p className="text-slate-400 leading-8">
            The three hallmarks of a true agent are:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "Autonomy", desc: "Can invoke tools and make decisions without human hand-holding for every step." },
                { title: "Goal-Orientation", desc: "Understands higher-level objectives ('Book a flight') rather than just next-token prediction." },
                { title: "Adaptability", desc: "Can handle errors, retry failed steps, and change strategy if the first attempt fails." }
            ].map((item, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                    <div className="font-bold text-cyan-400 mb-2 text-lg">{item.title}</div>
                    <div className="text-slate-400 text-sm leading-relaxed">{item.desc}</div>
                </div>
            ))}
        </div>
      </section>

      {/* Section 1.3: Comparison */}
      <section className="space-y-8">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-100">1.3 The Critical Distinction</h3>
        <p className="text-slate-400 leading-8">
            It's easy to confuse "Generative AI" with "Agentic AI". While agents use generative models as their brain, the architecture wrapping them is fundamental.
            We are moving from <strong>content creation</strong> to <strong>task execution</strong>.
        </p>

        <ComparisonDeck />

        <InfoBox type="info" title="The Reasoning Gap">
            LLMs alone have a short-term horizon—they predict the next word. Agents bridge the <strong>"Reasoning Gap"</strong> by adding a scaffold that allows the model to "think" before it speaks (or acts), effectively giving it a working memory and a scratchpad to plan complex sequences.
        </InfoBox>
      </section>

      {/* Section 1.4: Why 2025? */}
      <section className="space-y-8">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-100">1.4 Why 2025 Is the Breakout Year</h3>
        <p className="text-slate-400 leading-8">
            Why didn't we have this in 2023? Three convergent trends have made 2025 the "Year of the Agent":
        </p>

        <div className="space-y-6">
            <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20 text-blue-400 font-bold text-xl">1</div>
                <div>
                    <h4 className="text-xl font-bold text-white mb-2">Model Reasoning & Speed</h4>
                    <p className="text-slate-400">Models like GPT-4o and Claude 3.5 Sonnet have become significantly better at following complex instructions and, crucially, faster and cheaper. Agent loops require many inference calls; lower latency makes them viable.</p>
                </div>
            </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center shrink-0 border border-purple-500/20 text-purple-400 font-bold text-xl">2</div>
                <div>
                    <h4 className="text-xl font-bold text-white mb-2">Tool Calling Standards</h4>
                    <p className="text-slate-400">The industry has standardized around function calling (OpenAI API, Anthropic Tool Use), allowing models to reliably output JSON to control software, rather than just outputting text and hoping regex catches it.</p>
                </div>
            </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-900/30 flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-400 font-bold text-xl">3</div>
                <div>
                    <h4 className="text-xl font-bold text-white mb-2">Framework Maturity</h4>
                    <p className="text-slate-400">Libraries like LangChain, LangGraph, and CrewAI have matured from experimental scripts to robust orchestration engines that handle the messy parts of state management and error handling.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Section 1.5: Business Case */}
      <section className="space-y-8">
         <h3 className="text-2xl md:text-3xl font-bold text-slate-100">1.5 The Business Case: ROI & Market Sizing</h3>
         <p className="text-slate-400 leading-8">
            The ROI for agentic systems is calculated differently than Copilots. A Copilot makes a human 20% faster; an Agent <strong className="text-white">removes the human loop entirely</strong> for specific tiered tasks, offering near-infinite scalability for things like Level 1 Support or Data Entry.
         </p>

         <MarketDataViz />

         <div className="bg-gradient-to-r from-slate-900 to-black p-8 rounded-2xl border border-slate-800">
             <h4 className="text-lg font-bold text-white mb-4">Strategic Advantage</h4>
             <p className="text-slate-400 mb-6">
                 Companies deploying agents are seeing a shift in their workforce composition. Instead of hiring more junior staff for repetitive cognitive labor, they are hiring "Agent Architects" to manage fleets of digital workers.
             </p>
             <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                 Start building your fleet <ArrowRight size={16} />
             </button>
         </div>
      </section>
    </div>
  );
}
