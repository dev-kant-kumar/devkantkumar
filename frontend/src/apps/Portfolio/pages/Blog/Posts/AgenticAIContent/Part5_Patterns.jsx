import { GitBranch, RefreshCw } from "lucide-react";
import { CodeBlock, InfoBox, ReActLiveTerminal } from './SharedComponents';

export default function Part5_Patterns() {
  return (
    <div className="space-y-24">
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Part 5:</span> Design Patterns
        </h2>

        <p className="text-xl text-slate-300 leading-relaxed font-light">
           Just as React.js has "Hooks" and "Context", Agentic Engineering has its own set of proven design patterns.
           Mastering these separates the "demos" from reliable production systems.
        </p>
      </section>

      {/* 5.1 ReAct Pattern */}
      <section className="space-y-8">
         <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
             <RefreshCw className="text-emerald-400 animate-spin-slow" />
             5.1 The ReAct Pattern
         </h3>
         <p className="text-slate-400 leading-8">
             <strong>Reason + Act</strong>. This is the "Hello World" of agents but also the foundation of the most complex ones.
             The model explicitly writes down a "Thought", then an "Action", then observes the "Result".
         </p>

         <div className="my-8">
             <h4 className="text-lg font-bold text-slate-200 mb-4 text-center">Live Simulation: ReAct Loop</h4>
             <ReActLiveTerminal />
         </div>
      </section>

      {/* 5.2 Reflection */}
      <section className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
             <GitBranch className="text-pink-400" />
             5.2 Reflection (Self-Correction)
          </h3>
          <p className="text-slate-400 leading-8">
              Agents get stuck. A "Reflection" step allows the agent to look at its past actions and errors <em>before</em> trying again.
          </p>
          <CodeBlock language="python" filename="reflection_pattern.py" code={`def run_agent_with_reflection(goal):
    plan = generate_plan(goal)
    attempt = execute(plan)

    if attempt.failed:
        # CRITICAL STEP: Ask the agent WHY it failed
        critique = llm.analyze_error(attempt.error_trace)

        # Update plan based on critique
        new_plan = llm.revise_plan(plan, critique)
        return execute(new_plan)

    return attempt.result`} />
      </section>

      {/* 5.3 Context Management */}
      <section className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">5.3 Context Management at Scale</h3>
          <p className="text-slate-400 leading-8">
              The "Context Window" is your RAM. If you stuff it with 50 pages of logs, the agent becomes slow, expensive, and "dumber" (confused).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                  <h4 className="font-bold text-white mb-2">Technique 1: Summarization</h4>
                  <p className="text-slate-400 text-sm">Every 5 turns, ask the LLM to summarize the conversation so far into a single paragraph. Keep only the summary + last 5 messages.</p>
              </div>
               <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                  <h4 className="font-bold text-white mb-2">Technique 2: Vector Retrieval</h4>
                  <p className="text-slate-400 text-sm">Don't put the whole manual in context. Store it in a Vector DB and only fetch the 3 paragraphs relevant to the current user question.</p>
              </div>
          </div>
      </section>

      <InfoBox type="pro" title="Best Practice: Rate Limiting">
          Agents are hyper-active API callers. They can accidentally DDoS your internal services (or burn your OpenAI credits in minutes).
          <strong>Always implement a hard limit on loops (e.g., Max 10 steps) and a budget manager.</strong>
      </InfoBox>

    </div>
  );
}
