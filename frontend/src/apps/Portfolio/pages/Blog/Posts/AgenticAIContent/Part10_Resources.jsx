import { Book, CheckSquare, Github, Twitter, Youtube } from "lucide-react";

export default function Part10_Resources() {
  return (
    <div className="space-y-24 pb-24 border-b border-slate-800">
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Part 10:</span> Your Action Plan
        </h2>
        <p className="text-xl text-slate-300 leading-relaxed font-light">
           Don't just read. Build. Here is your 30-day roadmap.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Roadmap */}
          <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><CheckSquare className="text-teal-400"/> 30-Day Sprint</h3>
              <ul className="space-y-6 relative border-l border-slate-700 ml-3 pl-8">
                   <li className="relative">
                       <div className="absolute -left-[39px] w-5 h-5 bg-slate-900 border-2 border-teal-500 rounded-full"></div>
                       <strong className="text-teal-400 block mb-1">Week 1: Foundations</strong>
                       <span className="text-slate-400 text-sm">Build the "Research Agent" from Part 6. Get comfortable with OpenAI API and JSON Mode.</span>
                   </li>
                   <li className="relative">
                       <div className="absolute -left-[39px] w-5 h-5 bg-slate-900 border-2 border-slate-600 rounded-full"></div>
                       <strong className="text-white block mb-1">Week 2: Memory</strong>
                       <span className="text-slate-400 text-sm">Add a Vector DB (Pinecone). Let your agent "remember" a PDF document you upload.</span>
                   </li>
                   <li className="relative">
                       <div className="absolute -left-[39px] w-5 h-5 bg-slate-900 border-2 border-slate-600 rounded-full"></div>
                       <strong className="text-white block mb-1">Week 3: Multi-Agent</strong>
                       <span className="text-slate-400 text-sm">Use LangGraph to make a "Manager" that delegates to your Researcher + a new "Writer" agent.</span>
                   </li>
                     <li className="relative">
                       <div className="absolute -left-[39px] w-5 h-5 bg-slate-900 border-2 border-slate-600 rounded-full"></div>
                       <strong className="text-white block mb-1">Week 4: Deployment</strong>
                       <span className="text-slate-400 text-sm">Wrap it in a FastAPI backend. Deploy to Replit/Vercel. Share with friends.</span>
                   </li>
              </ul>
          </div>

          {/* Resources */}
          <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Book className="text-teal-400"/> Essential Resources</h3>

              <div className="space-y-4">
                  <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800 group">
                      <Github size={24} className="text-white"/>
                      <div>
                          <div className="font-bold text-slate-200 group-hover:text-teal-400 transition-colors">LangChain AI</div>
                          <div className="text-xs text-slate-500">The most popular framework repo. Star it.</div>
                      </div>
                  </a>
                   <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800 group">
                      <Youtube size={24} className="text-red-500"/>
                      <div>
                          <div className="font-bold text-slate-200 group-hover:text-teal-400 transition-colors">Harrison Chase</div>
                          <div className="text-xs text-slate-500">Creator of LangChain. Excellent tutorials.</div>
                      </div>
                  </a>
                   <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800 group">
                      <Twitter size={24} className="text-blue-400"/>
                      <div>
                          <div className="font-bold text-slate-200 group-hover:text-teal-400 transition-colors">Andrej Karpathy</div>
                          <div className="text-xs text-slate-500">Follow for deep insights on LLM OS.</div>
                      </div>
                  </a>
              </div>
          </div>
      </section>

      <div className="pt-24 text-center">
          <h3 className="text-3xl font-black text-white mb-6">Build something amazing?</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              I want to see it. Tag me within your demos on Twitter/X or LinkedIn.
              The future is agentic, and we are building it together.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full font-bold text-white shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all">
              Share Your Project
          </button>
      </div>

    </div>
  );
}
