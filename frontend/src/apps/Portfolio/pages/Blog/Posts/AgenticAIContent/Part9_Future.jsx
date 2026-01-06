import { Mic, Sparkles, Telescope } from "lucide-react";

export default function Part9_Future() {
  return (
    <div className="space-y-24">
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Part 9:</span> The Future (2025-2030)
        </h2>
        <p className="text-xl text-slate-300 leading-relaxed font-light">
           We are at day one. What does the next 5 years look like?
        </p>
      </section>

      <section className="space-y-12">
          <div className="flex gap-6 items-start">
               <div className="p-4 bg-purple-900/20 rounded-2xl text-purple-400"><Telescope size={32} /></div>
               <div>
                   <h3 className="text-2xl font-bold text-white mb-3">Self-Improving Agents</h3>
                   <p className="text-slate-400 leading-relaxed">
                       Currently, if an agent fails, a human fixes the code.
                       In the future, agents will use <strong>Reinforcement Learning (RL)</strong> to update their own system prompts and tool definitions based on success/fail rates, effectively "learning on the job."
                   </p>
               </div>
          </div>

           <div className="flex gap-6 items-start">
               <div className="p-4 bg-pink-900/20 rounded-2xl text-pink-400"><Mic size={32} /></div>
               <div>
                   <h3 className="text-2xl font-bold text-white mb-3">Multimodal Natives</h3>
                   <p className="text-slate-400 leading-relaxed">
                       Agents won't just read text. They will watch your screen, listen to meetings, and speak back with human emotion.
                       OpenAI's GPT-4o is just the first step towards <strong>OMNI-models</strong> that perceive reality fully.
                   </p>
               </div>
          </div>

           <div className="flex gap-6 items-start">
               <div className="p-4 bg-indigo-900/20 rounded-2xl text-indigo-400"><Sparkles size={32} /></div>
               <div>
                   <h3 className="text-2xl font-bold text-white mb-3">Agent Marketplaces</h3>
                   <p className="text-slate-400 leading-relaxed">
                       You won't build everything. You will hire a "Legal Agent" from a Law Firm's API and payment will settle via crypto-rails automatically per task.
                       The <strong>Internet of Agents</strong> is coming.
                   </p>
               </div>
          </div>
      </section>
    </div>
  );
}
