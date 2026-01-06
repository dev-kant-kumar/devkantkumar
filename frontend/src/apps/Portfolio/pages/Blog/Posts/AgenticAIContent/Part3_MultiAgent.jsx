import { Briefcase, GitMerge, MessageSquare, Network, Share2, Users } from "lucide-react";
import { InfoBox } from './SharedComponents';

export default function Part3_MultiAgent() {
  return (
    <div className="space-y-24">
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Part 3:</span> Multi-Agent Systems
        </h2>

        <p className="text-xl text-slate-300 leading-relaxed font-light">
           One agent is powerful; a team is unstoppable.
           Just as a single human employee cannot run an entire corporation, a single agent has finite context and expertise.
           <strong>Multi-Agent Systems (MAS)</strong> are the key to scaling complexity.
        </p>

        <InfoBox type="info" title="The Specialist Principle">
            It is often better to have three specialized agents (Researcher, Writer, Editor) than one generalist "super-agent".
            Smaller prompts are more robust, cheaper, and easier to debug.
        </InfoBox>
      </section>

      {/* 3.1 Coordination Patterns */}
      <section className="space-y-12">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
              <Network className="text-purple-400" />
              3.2 Coordination Patterns
          </h3>
          <p className="text-slate-400 leading-8">
              How do agents work together? There are four dominant patterns in use today:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pattern 1: Hierarchical */}
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-purple-900/20 text-purple-400 rounded-xl"><Users size={24} /></div>
                      <div>
                          <h4 className="font-bold text-white text-lg">1. The Manager (Hierarchical)</h4>
                          <span className="text-xs text-purple-400 uppercase tracking-widest font-bold">Most Common</span>
                      </div>
                  </div>
                  <div className="space-y-4">
                      <div className="flex justify-center mb-6">
                          {/* Mini Diagram */}
                          <div className="flex flex-col items-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-white flex items-center justify-center font-bold text-white text-xs">Mgr</div>
                              <div className="h-4 w-0.5 bg-slate-600"></div>
                              <div className="w-24 h-0.5 bg-slate-600"></div>
                              <div className="flex gap-4">
                                  <div className="flex flex-col items-center"><div className="h-2 w-0.5 bg-slate-600"></div><div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-purple-500 flex items-center justify-center text-[8px]">A1</div></div>
                                  <div className="flex flex-col items-center"><div className="h-2 w-0.5 bg-slate-600"></div><div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-purple-500 flex items-center justify-center text-[8px]">A2</div></div>
                                  <div className="flex flex-col items-center"><div className="h-2 w-0.5 bg-slate-600"></div><div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-purple-500 flex items-center justify-center text-[8px]">A3</div></div>
                              </div>
                          </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                          A simplistic "Manager" agent breaks down a user request and delegates subtasks to specialist workers.
                          The workers report back to the manager, who aggregates the final answer.
                      </p>
                      <div className="text-xs text-slate-500 bg-black/20 p-2 rounded border border-slate-800">
                          <strong>Best for:</strong> Complex goals requiring diverse skills (e.g., "Build a website" &rarr; Designer + Coder + Tester).
                      </div>
                  </div>
              </div>

              {/* Pattern 2: Sequential */}
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-900/20 text-blue-400 rounded-xl"><GitMerge size={24} /></div>
                      <div>
                          <h4 className="font-bold text-white text-lg">2. The Pipeline (Sequential)</h4>
                          <span className="text-xs text-blue-400 uppercase tracking-widest font-bold">Predictable</span>
                      </div>
                  </div>
                  <div className="space-y-4">
                      <div className="flex justify-center mb-6 items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-blue-500 flex items-center justify-center text-[8px]">Input</div>
                            <div className="w-4 h-0.5 bg-slate-600"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center text-[8px]">A1</div>
                            <div className="w-4 h-0.5 bg-slate-600"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center text-[8px]">A2</div>
                            <div className="w-4 h-0.5 bg-slate-600"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-blue-500 flex items-center justify-center text-[8px]">Res</div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                          Like a factory assembly line. Output of Agent A becomes the input for Agent B.
                          Excellent for deterministic workflows like Content Creation (Outline &rarr; Draft &rarr; Edit).
                      </p>
                       <div className="text-xs text-slate-500 bg-black/20 p-2 rounded border border-slate-800">
                          <strong>Best for:</strong> Step-by-step processes where order matters.
                      </div>
                  </div>
              </div>

               {/* Pattern 3: Collaborative */}
               <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-emerald-900/20 text-emerald-400 rounded-xl"><MessageSquare size={24} /></div>
                      <div>
                          <h4 className="font-bold text-white text-lg">3. The Joint Chat (Collaborative)</h4>
                      </div>
                  </div>
                   <div className="space-y-4">
                      <p className="text-slate-400 text-sm leading-relaxed">
                          Agents share a single message thread and can "jump in" when they have something to contribute.
                          Require a controller to prevent chaos.
                      </p>
                      <div className="text-xs text-slate-500 bg-black/20 p-2 rounded border border-slate-800">
                          <strong>Example:</strong> Microsoft AutoGen's GroupChat.
                      </div>
                   </div>
              </div>

               {/* Pattern 4: Swarm */}
               <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-amber-900/20 text-amber-400 rounded-xl"><Share2 size={24} /></div>
                      <div>
                          <h4 className="font-bold text-white text-lg">4. The Swarm (Sparsely Connected)</h4>
                      </div>
                  </div>
                   <div className="space-y-4">
                      <p className="text-slate-400 text-sm leading-relaxed">
                          Independent agents that don't know about each other but can "hand off" tasks.
                          Agent A says "I can't do this, transferring to Agent B."
                      </p>
                       <div className="text-xs text-slate-500 bg-black/20 p-2 rounded border border-slate-800">
                          <strong>Example:</strong> OpenAI's Swarm framework (Customer Support triage).
                      </div>
                   </div>
              </div>
          </div>
      </section>

      {/* 3.3 Communication */}
      <section className="space-y-8">
           <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
              <Briefcase className="text-pink-400" />
              3.3 How Agents Talk (Protocols)
          </h3>
          <p className="text-slate-400 leading-8">
              Agents don't text each other on WhatsApp. They communicate via structured <strong className="text-white">Message Passing</strong>.
              Usually, this is a shared list of JSON objects:
          </p>
          <div className="bg-[#1e1e1e] p-4 rounded-lg border border-slate-700 font-mono text-xs text-slate-300">
              {`[
  { "role": "user", "content": "Build me a snake game." },
  { "role": "manager", "content": "Coder, please write the python script. Designer, create the assets." },
  { "role": "coder", "content": "Here is the main.py..." },
  { "role": "designer", "content": "Here are the sprites..." }
]`}
          </div>
          <p className="text-slate-400 text-sm">
              The "Orchestrator" manages this history, pruning it so it doesn't exceed the context limit.
          </p>
      </section>

    </div>
  );
}
