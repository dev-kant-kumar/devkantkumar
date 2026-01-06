import { Database, Globe, Layers, Terminal } from "lucide-react";
import { InfoBox } from './SharedComponents';

export default function Part4_Frameworks() {
  const frameworks = [
      { name: "LangGraph", desc: "Stateful orchestration for complex multi-agent apps.", bestFor: "Production, Engineering Teams", icon: Layers, color: "text-orange-400" },
      { name: "AutoGen", desc: "Microsoft's conversational framework. Great for research.", bestFor: "Experimental, Code Gen", icon: Terminal, color: "text-blue-400" },
      { name: "CrewAI", desc: "Role-based agents. Very approachable syntax.", bestFor: "Content, Marketing, Quick Ops", icon: UsersIcon, color: "text-green-400" }, // UsersIcon defined below
      { name: "LlamaIndex", desc: "Data-first agents. RAG specialists.", bestFor: "Search, Q&A over Docs", icon: Database, color: "text-purple-400" },
      { name: "OpenAI Swarm", desc: "Lightweight, educational, client-side approach.", bestFor: "Learning, Simple Handoffs", icon: Globe, color: "text-white" },
  ];

  function UsersIcon(props) {
      return (
          <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      )
  }

  return (
    <div className="space-y-24">
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Part 4:</span> The Framework Landscape
        </h2>

        <p className="text-xl text-slate-300 leading-relaxed font-light">
           The "Agentic Stack" is still forming, but a few heavyweights have emerged.
           Choosing the wrong framework can lead to months of technical debt.
        </p>
      </section>

      {/* 4.1 Comparison Matrix */}
      <section>
          <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/50">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="bg-slate-950 border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider">
                          <th className="p-6 font-medium">Framework</th>
                          <th className="p-6 font-medium">Core Philosophy</th>
                          <th className="p-6 font-medium">Pros</th>
                          <th className="p-6 font-medium">Cons</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
                      {[
                        ["LangChain / LangGraph", "Graph-based. Explicit control flow.", "Extremely flexible. Industry standard.", "Steep learning curve. Verbose."],
                        ["Microsoft AutoGen", "Conversation-first. Agents talk to solve.", "Powerful multi-agent patterns.", "Hard to control precise outputs."],
                        ["CrewAI", "Role-based. 'Managers' and 'Workers'.", "Easy to start. Human-readable.", "Less granular control than LangGraph."],
                         ["OpenAI Swarm", "Hand-off pattern. Minimalist.", "Very simple. Good patterns.", "Experimental. Not for prod yet."],
                      ].map(([name, phil, pro, con], i) => (
                          <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                              <td className="p-6 font-bold text-white">{name}</td>
                              <td className="p-6">{phil}</td>
                              <td className="p-6 text-emerald-400">{pro}</td>
                              <td className="p-6 text-red-400">{con}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </section>

      {/* 4.2 Detailed Breakdown */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {frameworks.map((fw, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-slate-600 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-slate-950 ${fw.color} border border-slate-800 group-hover:scale-110 transition-transform`}>
                          <fw.icon size={24} />
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-black px-2 py-1 rounded border border-slate-800">{fw.bestFor}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{fw.name}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{fw.desc}</p>
              </div>
          ))}
      </section>

      <InfoBox type="warning" title="Warning: The Ecosystem is Volatile">
          These frameworks update weekly. Code you write for LangChain v0.1 might break in v0.3.
          <strong>Recommendation:</strong> Learn the <em>concepts</em> (chains, memory, tools), not just the syntax.
          Consider wrapping framework code in your own abstraction layer.
      </InfoBox>

    </div>
  );
}
