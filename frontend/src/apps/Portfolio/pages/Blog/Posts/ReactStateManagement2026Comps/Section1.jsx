import { Database, Layers, Settings, ToggleLeft, Zap } from 'lucide-react';

const Section1 = () => {
  return (
    <section id="tldr" className="mb-20 scroll-mt-20">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Zap size={32} className="text-yellow-400" />
        TL;DR: The Executive Summary
      </h2>
      <p className="text-slate-400 mb-8">For developers who just want the answer.</p>

      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden mb-8">
        <div className="bg-slate-800/50 p-4 border-b border-slate-700/50 font-semibold text-slate-200">
          The 2026 Rule of Thumb
        </div>
        <div className="p-6 space-y-4">
           <div className="flex gap-4">
             <div className="mt-1"><ToggleLeft size={20} className="text-cyan-400" /></div>
             <div>
               <strong className="text-white block">Local UI State (toggle, input value)</strong>
               <span className="text-slate-400">→ useState / useReducer</span>
             </div>
           </div>
           <div className="flex gap-4">
             <div className="mt-1"><Settings size={20} className="text-purple-400" /></div>
             <div>
               <strong className="text-white block">Slow-changing Environment (theme, auth, locale)</strong>
               <span className="text-slate-400">→ React Context API</span>
             </div>
           </div>
           <div className="flex gap-4">
             <div className="mt-1"><Database size={20} className="text-emerald-400" /></div>
             <div>
               <strong className="text-white block">Server Data (API, database, real-time)</strong>
               <span className="text-slate-400">→ TanStack Query (React Query) <span className="text-emerald-500 text-sm ml-2">← handles 80% of "state"</span></span>
             </div>
           </div>
           <div className="flex gap-4">
             <div className="mt-1"><Layers size={20} className="text-indigo-400" /></div>
             <div>
               <strong className="text-white block">Shared Client State (cart, notifications, global UI)</strong>
               <span className="text-slate-400">→ Zustand (lightweight) or Redux Toolkit (enterprise)</span>
             </div>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/30">
           <h4 className="font-bold text-white mb-3">Key Stats (2026)</h4>
           <ul className="space-y-2 text-sm text-slate-300">
             <li>• <strong className="text-emerald-400">React Query</strong> manages ~80% of what we used to call "state"</li>
             <li>• <strong className="text-indigo-400">Zustand</strong>: 30%+ YoY growth, in 40%+ of new projects</li>
             <li>• <strong className="text-purple-400">Redux Toolkit</strong>: Still dominant in enterprise (5+ devs, 10+ screens)</li>
             <li>• <strong className="text-red-400">Context API</strong>: Perfect for theme/auth, terrible for high-frequency updates</li>
           </ul>
        </div>

        <div className="p-5 rounded-lg bg-indigo-900/10 border border-indigo-500/20 flex flex-col justify-center">
           <h4 className="font-bold text-indigo-300 mb-2">Decision Framework</h4>
           <p className="text-slate-300 italic">
             "Choose NOT by library popularity, but by <strong className="text-white">DATA ORIGIN</strong> and <strong className="text-white">UPDATE FREQUENCY</strong>."
           </p>
        </div>
      </div>
    </section>
  );
};

export default Section1;
