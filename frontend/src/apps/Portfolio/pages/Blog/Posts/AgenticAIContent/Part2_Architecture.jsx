import { Activity, Cpu, Database, Layers, Settings ,Brain} from "lucide-react";
import { AgentAnatomyInteractive, CodeBlock, InfoBox, SciFiAgentSimulation } from './SharedComponents';

export default function Part2_Architecture() {
  return (
    <div className="space-y-24">
      {/* 2.1 The 6 Essential Components */}
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Part 2:</span> Core Architecture
        </h2>s

        <p className="text-xl text-slate-300 leading-relaxed font-light">
           An Agent isn't just a model; it's a <strong>Cognitive Architecture</strong>.
           To build one, you need to understand the six pillars that make autonomy possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-cyan-900/30 group-hover:text-cyan-400 transition-colors"><Cpu size={20}/></div>
                    <h4 className="font-bold text-white">1. Perception</h4>
                </div>
                <p className="text-slate-400 text-sm">How agents interpret input—not just text, but images (Vision), audio, and data streams.</p>
            </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-purple-900/30 group-hover:text-purple-400 transition-colors"><Brain size={20}/></div> {/* Brain is not imported but used in shared, wait. Using standard icon from lucide if available or generic */}
                    <h4 className="font-bold text-white">2. Reasoning Engine</h4>
                </div>
                <p className="text-slate-400 text-sm">The "Brain" (LLM) that plans tasks, breaks down goals, and decides valid next steps.</p>
            </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-red-500/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-red-900/30 group-hover:text-red-400 transition-colors"><Database size={20}/></div>
                    <h4 className="font-bold text-white">3. Memory Systems</h4>
                </div>
                <p className="text-slate-400 text-sm">Short-term context window + Long-term Vector DBs to maintain state across sessions.</p>
            </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-amber-900/30 group-hover:text-amber-400 transition-colors"><Settings size={20}/></div>
                    <h4 className="font-bold text-white">4. Action Layer</h4>
                </div>
                <p className="text-slate-400 text-sm">The "Hands" of the agent. Tools, APIs, and scripts it can execute to affect the world.</p>
            </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-emerald-900/30 group-hover:text-emerald-400 transition-colors"><Activity size={20}/></div>
                    <h4 className="font-bold text-white">5. Feedback Loop</h4>
                </div>
                <p className="text-slate-400 text-sm">Eval mechanisms to check if an action succeeded or failed, and self-correct.</p>
            </div>
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-900/30 group-hover:text-blue-400 transition-colors"><Layers size={20}/></div>
                    <h4 className="font-bold text-white">6. Orchestration</h4>
                </div>
                <p className="text-slate-400 text-sm">The runtime environment that manages the loop, state, and errors (the "OS").</p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-100 mt-12 mb-6">Interactive Anatomy</h3>
        <p className="text-slate-400 mb-8">
            Explore the anatomy of a production-grade agent below. Click the nodes to see how they function.
        </p>
        <AgentAnatomyInteractive />

      </section>

      {/* 2.2 & 2.3 Agent Lifecycle */}
      <section className="space-y-8">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-100">2.2 The Agent Lifecycle: A Living Loop</h3>
        <p className="text-slate-400 leading-8">
            Unlike procedural code which runs A → B → C, an agent runs in a <strong>Loop</strong> until a stop condition is met.
            This is often called the <strong>ReAct Pattern</strong> (Reason + Act).
        </p>
        <div className="pl-6 border-l-2 border-slate-700 text-slate-400 italic">
            "The agent perceives the state of the world, reasons about what to do next to get closer to the goal, acts using a tool, and then perceives the new state."
        </div>

        <div className="my-8">
             <h4 className="text-lg font-bold text-emerald-400 mb-4 tracking-widest uppercase">System Visualization: Agent Runtime</h4>
             {/* Note: In a real app we might lazy load this heavy component */}
             <SciFiAgentSimulation />
        </div>

        <InfoBox type="tip" title="The Loop in Pseudocode">
            <p className="mb-4">Here is the fundamental logic that drives 90% of agent frameworks today:</p>
            <CodeBlock language="python" filename="agent_loop.py" code={`while not task.is_complete():
    # 1. Perception
    context = memory.retrieve(task.goal)

    # 2. Reasoning
    plan = llm.generate_plan(context, tools)

    # 3. Action
    if plan.action:
        result = tools.execute(plan.action)
        memory.add(result)

    # 4. Reflection
    if result.status == 'error':
        llm.reflect_on_error(result)
    else:
        task.update_progress(result)`} />
        </InfoBox>

      </section>

      {/* 2.4 Memory Architecture */}
      <section className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">2.3 Memory: Making Agents Stateful</h3>
          <p className="text-slate-400 leading-8">
              A naive LLM call is stateless. To build an agent that can work on a task for days, you need <strong>Persistence</strong>.
              We typically divide memory into:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li><strong className="text-white">Short-term Memory:</strong> The immediate context window (Chat History). Contains the current reasoning chain.</li>
              <li><strong className="text-white">Long-term Memory:</strong> A Vector Database (like Pinecone/Chroma) where the agent stores documents, past learnings, and large datasets to "recall" later via Semantic Search.</li>
          </ul>
      </section>

      {/* 2.5 Tool Use */}
      <section className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">2.4 Tool Use & Function Calling</h3>
          <p className="text-slate-400 leading-8">
              Tools are the bridge between the AI brain and the digital world. A "Tool" is simply an API wrapper that the LLM knows how to call.
              Modern models are fine-tuned to output <strong>Structured JSON</strong> matching a tool's schema.
          </p>

          <CodeBlock language="json" filename="tool_schema.json" code={`{
  "name": "search_database",
  "description": "Search the user database for a specific customer by email.",
  "parameters": {
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "description": "The customer's email address"
      },
      "include_orders": {
        "type": "boolean",
        "description": "Whether to include order history"
      }
    },
    "required": ["email"]
  }
}`} />
          <p className="text-slate-400 text-sm mt-2">
              The LLM sees this definition and outputs <code>{`{"name": "search_database", "arguments": {"email": "alice@example.com"}}`}</code> exactly when it needs that data.
          </p>
      </section>

    </div>
  );
}
