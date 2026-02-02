import { Check, Code2, GitBranch, Lightbulb, Zap } from 'lucide-react';

const Introduction = () => {
  return (
    <section className="mb-16">
      <p className="text-2xl text-slate-300 leading-relaxed font-light mb-8">
        It's 2026, and you're staring at 15+ state management libraries. Redux? Only for enterprise? Context API? Performance issues? Zustand? Jotai? Recoil? Which one do you actually need?
      </p>

      <div className="prose prose-xl prose-invert max-w-none">
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          Most developers pick tools based on popularity or what they used in their last job, not actual app needs. This leads to two extremes: over-engineering simple apps with Redux boilerplate, or creating "prop drilling hell" in complex apps because they feared adding a library.
        </p>

        <div className="my-8 p-6 rounded-xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Lightbulb size={24} className="text-indigo-400" />
            The specific problem
          </h3>
          <p className="text-slate-300 italic mb-4">
            "Your React app is like a busy kitchen. If you're reaching into the fridge (API) to get ingredients every time someone orders, AND trying to cook on the stove, AND managing multiple counters—everything becomes chaos."
          </p>
          <p className="text-slate-300">
            By the end of this guide, you'll have a clear, practical decision framework for ANY app. We're moving beyond "it depends" to concrete rules used in production in 2026.
          </p>
        </div>

        <h4 className="text-xl font-bold text-white mb-4">What You'll Learn:</h4>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3">
            <Check size={20} className="text-emerald-400 mt-1 flex-shrink-0" />
            <span className="text-slate-300">When you <strong className="text-white">DON'T</strong> need a state management library at all</span>
          </li>
          <li className="flex items-start gap-3">
            <Check size={20} className="text-emerald-400 mt-1 flex-shrink-0" />
            <span className="text-slate-300">How to choose based on <strong className="text-white">Data Origin</strong>, not hype</span>
          </li>
          <li className="flex items-start gap-3">
            <Check size={20} className="text-emerald-400 mt-1 flex-shrink-0" />
            <span className="text-slate-300">Practical production patterns with <strong className="text-white">Zustand, Redux Toolkit, and React Query</strong></span>
          </li>
        </ul>

        <div className="grid sm:grid-cols-3 gap-4">
           <a href="#decision-tree" className="flex items-center justify-center gap-2 p-4 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-slate-800/80 transition-all text-slate-300 hover:text-white font-medium">
             <GitBranch size={18} /> Decision Tree
           </a>
           <a href="#tool-deep-dives" className="flex items-center justify-center gap-2 p-4 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-slate-800/80 transition-all text-slate-300 hover:text-white font-medium">
             <Code2 size={18} /> Code Examples
           </a>
           <a href="#tldr" className="flex items-center justify-center gap-2 p-4 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-slate-800/80 transition-all text-slate-300 hover:text-white font-medium">
             <Zap size={18} /> TL;DR Summary
           </a>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
