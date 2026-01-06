import { Package, TerminalSquare } from "lucide-react";
import { CodeBlock, InfoBox } from './SharedComponents';

export default function Part6_HandsOn() {
  return (
    <div className="space-y-24">
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Part 6:</span> Hands-On Tutorial
        </h2>

        <p className="text-xl text-slate-300 leading-relaxed font-light">
           Enough theory. Let's build a real <strong>Research Agent</strong> in Python that can search the web and write a summary.
        </p>
      </section>

      <section className="space-y-8">
           <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
               <Package className="text-emerald-400" />
               6.1 Prerequisites
           </h3>
           <p className="text-slate-400">You will need an OpenAI API key and a Tavily API key (best for AI web search).</p>
           <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-emerald-400 border border-slate-800">
               pip install langchain langchain-openai tavily-python
           </div>
      </section>

      <section className="space-y-8">
          <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
               <TerminalSquare className="text-emerald-400" />
               6.2 The Code: 50 Lines of Power
          </h3>
          <p className="text-slate-400 leading-8">
              We'll use LangChain's pre-built react agent for simplicity, but under the hood, it's doing exactly what we visualized in Part 2.
          </p>

          <CodeBlock language="python" filename="research_agent.py" code={`import os
from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.agents import create_react_agent, AgentExecutor
from langchain import hub

# 1. Setup Environment
os.environ["OPENAI_API_KEY"] = "sk-..."
os.environ["TAVILY_API_KEY"] = "tvly-..."

# 2. Define Tools
# Tavily is a search engine optimized for LLMs (returns text, not just links)
search = TavilySearchResults(max_results=3)
tools = [search]

# 3. Initialize LLM
llm = ChatOpenAI(model="gpt-4o")

# 4. Pull the ReAct Prompt (Standard reasoning template)
prompt = hub.pull("hwchase17/react")

# 5. Create the Agent
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# 6. Run It!
print("🧠 Agent Starting...")
result = agent_executor.invoke({
    "input": "What is the current state of Solid State Batteries in 2025? Are they commercially viable yet?"
})

print(f"\\n✅ Final Answer:\\n{result['output']}\"")`} />

          <InfoBox type="tip" title="Understanding the Output">
              When you run this with <code>verbose=True</code>, you will see the agent:
              <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li><strong>Thought:</strong> "I need to search for 'Solid State Batteries 2025 commercial viability'."</li>
                  <li><strong>Action:</strong> <code>tavily_search_results_json(...)</code></li>
                  <li><strong>Observation:</strong> (The raw search results from Google)</li>
                  <li><strong>Thought:</strong> "The results say Toyota and QuantumScape are piloting cars in 2025. I have enough info."</li>
                  <li><strong>Final Answer:</strong> "Solid state batteries are entering limited commercial pilots in 2025..."</li>
              </ol>
          </InfoBox>
      </section>

      <section className="space-y-8">
          <h3 className="text-2xl font-bold text-slate-100">6.3 Next Steps</h3>
          <p className="text-slate-400">
              This is a single agent. To go deeper, try adding a <strong>File Writer Tool</strong> so it can save its report to disk, or create a second agent to review the first agent's work (Multi-Agent).
          </p>
      </section>

    </div>
  );
}
