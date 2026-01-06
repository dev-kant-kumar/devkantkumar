import {
    ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Code2, Database,
    ExternalLink, Flame, Globe, Layers, Lightbulb, Package, Rocket,
    Server, Star, Terminal, TrendingUp, Users, Zap
} from "lucide-react";
import { useState } from "react";
import { CodeBlock, InfoBox } from './SharedComponents';

// Expandable Framework Card
const FrameworkCard = ({
    name, tagline, icon: Icon, iconColor, bgGradient,
    stats, pros, cons, useCases, codeExample, links,
    isOpen, onToggle
}) => (
    <div className={`rounded-2xl border border-slate-700/50 overflow-hidden transition-all ${bgGradient}`}>
        <button
            onClick={onToggle}
            className="w-full p-6 flex items-start justify-between hover:bg-white/5 transition-colors text-left"
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-slate-900/80 ${iconColor} border border-slate-700 flex-shrink-0`}>
                    <Icon size={28} />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h4 className="font-bold text-white text-xl">{name}</h4>
                        {stats.stars && (
                            <span className="flex items-center gap-1 text-xs text-yellow-400">
                                <Star size={12} /> {stats.stars}
                            </span>
                        )}
                    </div>
                    <p className="text-slate-400 text-sm max-w-lg">{tagline}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {stats.tags?.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-slate-800/50 text-slate-400 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                {isOpen ? <ChevronDown className="text-slate-400" size={20} /> : <ChevronRight className="text-slate-400" size={20} />}
            </div>
        </button>

        {isOpen && (
            <div className="px-6 pb-6 space-y-6 border-t border-slate-800/50">
                {/* Pros & Cons */}
                <div className="pt-4 grid md:grid-cols-2 gap-4">
                    <div className="bg-emerald-950/20 p-4 rounded-lg border border-emerald-900/30">
                        <div className="text-xs text-emerald-400 uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
                            <CheckCircle2 size={14} /> Strengths
                        </div>
                        <ul className="space-y-2 text-sm text-slate-300">
                            {pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-400">+</span> {pro}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red-950/20 p-4 rounded-lg border border-red-900/30">
                        <div className="text-xs text-red-400 uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
                            <Zap size={14} /> Limitations
                        </div>
                        <ul className="space-y-2 text-sm text-slate-300">
                            {cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-red-400">−</span> {con}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-bold">Best Use Cases</div>
                    <div className="flex flex-wrap gap-2">
                        {useCases.map((uc, i) => (
                            <span key={i} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm">{uc}</span>
                        ))}
                    </div>
                </div>

                {/* Code Example */}
                {codeExample && (
                    <CodeBlock
                        language="python"
                        filename={codeExample.filename}
                        code={codeExample.code}
                    />
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                    {links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors text-sm text-slate-300 hover:text-white">
                            {link.label} <ExternalLink size={12} />
                        </a>
                    ))}
                </div>
            </div>
        )}
    </div>
);

// Decision Flowchart Component
const DecisionFlowchart = () => (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h4 className="font-bold text-white mb-6 text-center">Quick Decision Guide</h4>
        <div className="space-y-4">
            {[
                { question: "Need complex state machines & conditional routing?", answer: "LangGraph", color: "text-orange-400" },
                { question: "Building role-based team of agents?", answer: "CrewAI", color: "text-green-400" },
                { question: "Multi-agent conversations & code execution?", answer: "AutoGen", color: "text-blue-400" },
                { question: "RAG-heavy with document retrieval focus?", answer: "LlamaIndex", color: "text-purple-400" },
                { question: "Simple handoff routing (support/sales)?", answer: "OpenAI Swarm", color: "text-white" },
                { question: "Already using React/Next.js?", answer: "Vercel AI SDK", color: "text-cyan-400" }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                    <div className="flex-1 text-slate-300 text-sm">{item.question}</div>
                    <ArrowRight size={16} className="text-slate-600" />
                    <div className={`font-bold ${item.color} min-w-[100px] text-right`}>{item.answer}</div>
                </div>
            ))}
        </div>
    </div>
);

export default function Part4_Frameworks() {
    const [openFrameworks, setOpenFrameworks] = useState(['langchain']);

    const toggleFramework = (id) => {
        setOpenFrameworks(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const frameworks = [
        {
            id: 'langchain',
            name: 'LangChain + LangGraph',
            tagline: 'The industry standard. Graph-based orchestration with explicit control flow, checkpointing, and human-in-the-loop support.',
            icon: Layers,
            iconColor: 'text-orange-400',
            bgGradient: 'bg-gradient-to-br from-orange-950/20 to-red-950/20',
            stats: { stars: '95k+', tags: ['Python', 'TypeScript', 'Production-Ready'] },
            pros: [
                'Most flexible and powerful orchestration',
                'Excellent documentation and community',
                'Native async, streaming, and checkpointing',
                'LangSmith integration for observability'
            ],
            cons: [
                'Steep learning curve for beginners',
                'Verbose syntax for simple use cases',
                'Frequent breaking changes between versions'
            ],
            useCases: ['Complex pipelines', 'Multi-agent workflows', 'Production systems', 'Enterprise deployments'],
            codeExample: {
                filename: 'langgraph_quickstart.py',
                code: `from langgraph.graph import StateGraph, END
from typing import TypedDict

class State(TypedDict):
    input: str
    result: str

def agent_node(state: State) -> State:
    # Your agent logic here
    result = llm.invoke(state["input"])
    return {"result": result}

# Build the graph
graph = StateGraph(State)
graph.add_node("agent", agent_node)
graph.set_entry_point("agent")
graph.add_edge("agent", END)

# Compile and run
app = graph.compile()
result = app.invoke({"input": "Explain quantum computing"})`
            },
            links: [
                { label: 'LangChain Docs', url: 'https://python.langchain.com/' },
                { label: 'LangGraph Docs', url: 'https://langchain-ai.github.io/langgraph/' },
                { label: 'GitHub', url: 'https://github.com/langchain-ai/langchain' }
            ]
        },
        {
            id: 'crewai',
            name: 'CrewAI',
            tagline: 'Role-based multi-agent framework. Define agents with roles, goals, and backstories—they collaborate like a real team.',
            icon: Users,
            iconColor: 'text-green-400',
            bgGradient: 'bg-gradient-to-br from-green-950/20 to-emerald-950/20',
            stats: { stars: '20k+', tags: ['Python', 'Beginner-Friendly', 'Role-Based'] },
            pros: [
                'Extremely intuitive API',
                'Human-readable agent definitions',
                'Built-in delegation and collaboration',
                'Great for non-engineers to understand'
            ],
            cons: [
                'Less granular control than LangGraph',
                'Limited customization of internals',
                'Newer, smaller community'
            ],
            useCases: ['Content generation crews', 'Research teams', 'Marketing automation', 'Rapid prototyping'],
            codeExample: {
                filename: 'crewai_quickstart.py',
                code: `from crewai import Agent, Task, Crew, Process

# Define agents with personas
researcher = Agent(
    role="Senior Research Analyst",
    goal="Uncover cutting-edge developments in AI",
    backstory="You're a veteran analyst with a keen eye for emerging tech.",
    tools=[search_tool]
)

writer = Agent(
    role="Tech Content Writer",
    goal="Create engaging content about AI developments",
    backstory="You're a skilled writer who makes complex topics accessible."
)

# Define tasks
research_task = Task(
    description="Research the latest AI agent frameworks in 2025",
    expected_output="A detailed report with 5 key findings",
    agent=researcher
)

write_task = Task(
    description="Write a blog post based on the research",
    expected_output="A 1000-word blog post",
    agent=writer
)

# Create and run the crew
crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff()`
            },
            links: [
                { label: 'CrewAI Docs', url: 'https://docs.crewai.com/' },
                { label: 'GitHub', url: 'https://github.com/joaomdmoura/crewAI' },
                { label: 'Examples', url: 'https://github.com/joaomdmoura/crewAI-examples' }
            ]
        },
        {
            id: 'autogen',
            name: 'Microsoft AutoGen',
            tagline: 'Conversation-driven multi-agent framework. Agents discuss and collaborate through natural dialogue to solve problems.',
            icon: Terminal,
            iconColor: 'text-blue-400',
            bgGradient: 'bg-gradient-to-br from-blue-950/20 to-indigo-950/20',
            stats: { stars: '35k+', tags: ['Python', 'Multi-Agent', 'Research-Grade'] },
            pros: [
                'Natural conversation-based collaboration',
                'Powerful code execution capabilities',
                'Excellent for research and experimentation',
                'Flexible agent configurations'
            ],
            cons: [
                'Can be hard to control precise outputs',
                'Conversations can go off-track',
                'Steeper learning curve for production'
            ],
            useCases: ['Code generation', 'Problem-solving discussions', 'Research experiments', 'Collaborative debugging'],
            codeExample: {
                filename: 'autogen_quickstart.py',
                code: `from autogen import AssistantAgent, UserProxyAgent

# Create an AI assistant
assistant = AssistantAgent(
    name="AI_Assistant",
    llm_config={"model": "gpt-4o"},
    system_message="You are a helpful AI assistant."
)

# Create a user proxy (can execute code)
user_proxy = UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    code_execution_config={"use_docker": False}
)

# Start a conversation
user_proxy.initiate_chat(
    assistant,
    message="Write a Python function to calculate fibonacci numbers, then test it."
)
# The assistant writes code, user_proxy executes it, they iterate until done`
            },
            links: [
                { label: 'AutoGen Docs', url: 'https://microsoft.github.io/autogen/' },
                { label: 'GitHub', url: 'https://github.com/microsoft/autogen' },
                { label: 'Studio', url: 'https://autogen-studio.com/' }
            ]
        },
        {
            id: 'llamaindex',
            name: 'LlamaIndex',
            tagline: 'Data-first framework. Specializes in connecting LLMs to your data through advanced indexing and retrieval.',
            icon: Database,
            iconColor: 'text-purple-400',
            bgGradient: 'bg-gradient-to-br from-purple-950/20 to-violet-950/20',
            stats: { stars: '35k+', tags: ['Python', 'TypeScript', 'RAG-Focused'] },
            pros: [
                'Best-in-class RAG capabilities',
                'Advanced indexing strategies',
                'Great for document Q&A',
                'Production-ready with LlamaCloud'
            ],
            cons: [
                'Less focused on multi-agent orchestration',
                'Can be overkill for simple chat apps',
                'Primarily RAG-focused'
            ],
            useCases: ['Document Q&A', 'Knowledge bases', 'Enterprise search', 'Data-heavy applications'],
            codeExample: {
                filename: 'llamaindex_quickstart.py',
                code: `from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.openai import OpenAI

# Load documents
documents = SimpleDirectoryReader("./data").load_data()

# Create index
index = VectorStoreIndex.from_documents(documents)

# Create a query engine (automatically retrieves relevant docs)
query_engine = index.as_query_engine()

# Ask questions over your data
response = query_engine.query("What are the key findings in the Q3 report?")
print(response)

# Or use as an agent with tools
from llama_index.core.agent import ReActAgent
agent = ReActAgent.from_tools([query_tool, web_search_tool], llm=OpenAI())
agent.chat("Compare our Q3 results to industry benchmarks")`
            },
            links: [
                { label: 'LlamaIndex Docs', url: 'https://docs.llamaindex.ai/' },
                { label: 'GitHub', url: 'https://github.com/run-llama/llama_index' },
                { label: 'LlamaCloud', url: 'https://cloud.llamaindex.ai/' }
            ]
        },
        {
            id: 'swarm',
            name: 'OpenAI Swarm',
            tagline: 'Minimalist, educational framework demonstrating agent handoff patterns. Lightweight and easy to understand.',
            icon: Globe,
            iconColor: 'text-white',
            bgGradient: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50',
            stats: { stars: '15k+', tags: ['Python', 'Educational', 'Lightweight'] },
            pros: [
                'Extremely simple API',
                'Great for learning agent patterns',
                'Clean handoff mechanism',
                'Minimal dependencies'
            ],
            cons: [
                'Experimental, not for production',
                'Limited features compared to others',
                'No built-in memory or persistence'
            ],
            useCases: ['Learning agent concepts', 'Prototyping', 'Customer service routing', 'Simple handoffs'],
            codeExample: {
                filename: 'swarm_quickstart.py',
                code: `from swarm import Swarm, Agent

client = Swarm()

def transfer_to_sales():
    """Transfer to sales agent for pricing questions."""
    return sales_agent

def transfer_to_support():
    """Transfer to support agent for technical issues."""
    return support_agent

triage_agent = Agent(
    name="Triage",
    instructions="Determine user intent. Transfer to Sales or Support.",
    functions=[transfer_to_sales, transfer_to_support]
)

sales_agent = Agent(name="Sales", instructions="Help with pricing and plans.")
support_agent = Agent(name="Support", instructions="Help with technical issues.")

# Run - automatically routes based on user message
response = client.run(
    agent=triage_agent,
    messages=[{"role": "user", "content": "How much does the pro plan cost?"}]
)
# Routes to sales_agent automatically`
            },
            links: [
                { label: 'GitHub', url: 'https://github.com/openai/swarm' },
                { label: 'Cookbook', url: 'https://cookbook.openai.com/examples/orchestrating_agents' }
            ]
        },
        {
            id: 'vercel',
            name: 'Vercel AI SDK',
            tagline: 'Full-stack TypeScript SDK for building AI apps. Streaming, tools, and UI components out of the box.',
            icon: Rocket,
            iconColor: 'text-cyan-400',
            bgGradient: 'bg-gradient-to-br from-cyan-950/20 to-teal-950/20',
            stats: { stars: '10k+', tags: ['TypeScript', 'React', 'Full-Stack'] },
            pros: [
                'First-class React/Next.js integration',
                'Built-in streaming UI components',
                'Multi-provider (OpenAI, Anthropic, etc.)',
                'Excellent developer experience'
            ],
            cons: [
                'TypeScript/JavaScript only',
                'Less mature agent features',
                'Best suited for web apps'
            ],
            useCases: ['Next.js AI apps', 'Chat interfaces', 'Streaming responses', 'Web-first products'],
            codeExample: {
                filename: 'vercel_ai_example.ts',
                code: `import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Define tools
const weatherTool = tool({
  description: 'Get current weather for a location',
  parameters: z.object({ location: z.string() }),
  execute: async ({ location }) => {
    // Call weather API
    return { temperature: 72, condition: 'Sunny' };
  }
});

// Run agent with tools
const { text, toolCalls } = await generateText({
  model: openai('gpt-4o'),
  tools: { getWeather: weatherTool },
  maxSteps: 5, // Agent loop iterations
  prompt: "What's the weather in San Francisco?"
});

// In React with useChat hook
import { useChat } from 'ai/react';
const { messages, input, handleSubmit } = useChat();`
            },
            links: [
                { label: 'AI SDK Docs', url: 'https://sdk.vercel.ai/docs' },
                { label: 'GitHub', url: 'https://github.com/vercel/ai' },
                { label: 'Templates', url: 'https://vercel.com/templates/ai' }
            ]
        }
    ];

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Part 4:</span> The Framework Landscape
                </h2>

                <p className="text-xl text-slate-300 leading-relaxed font-light">
                    The "Agentic Stack" is still forming, but clear leaders have emerged.
                    <strong className="text-white"> Choosing the wrong framework can cost months of refactoring.</strong>
                    This guide helps you pick the right tool for your use case.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    {[
                        { value: "6", label: "Major Frameworks", icon: Package },
                        { value: "200k+", label: "Combined GitHub Stars", icon: Star },
                        { value: "2", label: "Languages (Python/TS)", icon: Code2 },
                        { value: "Weekly", label: "Update Frequency", icon: TrendingUp }
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center">
                            <stat.icon className="mx-auto text-orange-400 mb-2" size={20} />
                            <div className="text-2xl font-black text-white">{stat.value}</div>
                            <div className="text-xs text-slate-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Decision Flowchart */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Lightbulb className="text-orange-400" />
                    4.1 Which Framework Should I Use?
                </h3>
                <DecisionFlowchart />
            </section>

            {/* Framework Deep Dives */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Flame className="text-orange-400" />
                    4.2 Framework Deep Dives
                </h3>
                <p className="text-slate-400">
                    Click each framework to see strengths, limitations, use cases, and <strong className="text-white">runnable code examples</strong>.
                </p>

                <div className="space-y-4">
                    {frameworks.map((fw) => (
                        <FrameworkCard
                            key={fw.id}
                            {...fw}
                            isOpen={openFrameworks.includes(fw.id)}
                            onToggle={() => toggleFramework(fw.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Comparison Table */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Server className="text-orange-400" />
                    4.3 At-a-Glance Comparison
                </h3>

                <div className="overflow-x-auto rounded-xl border border-slate-700">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-4 text-left">Framework</th>
                                <th className="p-4 text-left">Primary Pattern</th>
                                <th className="p-4 text-left">Learning Curve</th>
                                <th className="p-4 text-left">Production Ready</th>
                                <th className="p-4 text-left">Best For</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                            {[
                                ['LangGraph', 'State Machines', 'Medium', '✅ Yes', 'Complex workflows'],
                                ['CrewAI', 'Role-Based Teams', 'Easy', '✅ Yes', 'Content & research'],
                                ['AutoGen', 'Conversations', 'Medium', '⚠️ Partial', 'Research & code gen'],
                                ['LlamaIndex', 'RAG & Retrieval', 'Easy', '✅ Yes', 'Document Q&A'],
                                ['OpenAI Swarm', 'Handoffs', 'Very Easy', '❌ No', 'Learning & prototypes'],
                                ['Vercel AI SDK', 'Streaming Chat', 'Easy', '✅ Yes', 'Web apps (React/Next.js)']
                            ].map(([name, pattern, curve, prod, best], i) => (
                                <tr key={i} className="hover:bg-slate-900/50">
                                    <td className="p-4 font-bold text-white">{name}</td>
                                    <td className="p-4">{pattern}</td>
                                    <td className="p-4">{curve}</td>
                                    <td className="p-4">{prod}</td>
                                    <td className="p-4 text-slate-400">{best}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Ecosystem Warning */}
            <InfoBox type="warning" title="⚠️ The Ecosystem is Volatile">
                These frameworks update <strong>weekly</strong>. Code written for LangChain v0.1 often breaks in v0.3.
                <br /><br />
                <strong>Recommendations:</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Learn the <em>concepts</em> (graphs, tools, memory), not just syntax</li>
                    <li>Wrap framework code in your own abstraction layer</li>
                    <li>Pin dependencies to specific versions in production</li>
                    <li>Subscribe to changelogs (LangChain has a Discord)</li>
                </ul>
            </InfoBox>

            {/* My Recommendation */}
            <section className="bg-gradient-to-br from-orange-950/30 to-red-950/30 p-8 rounded-2xl border border-orange-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Flame className="text-orange-400" /> My Recommendation for 2025
                </h3>
                <div className="space-y-4 text-slate-300">
                    <p>
                        <strong className="text-white">Start with CrewAI</strong> if you're new—it's the most intuitive way to understand multi-agent concepts.
                    </p>
                    <p>
                        <strong className="text-white">Graduate to LangGraph</strong> when you need conditional routing, human-in-the-loop, or complex state management.
                    </p>
                    <p>
                        <strong className="text-white">Use Vercel AI SDK</strong> if you're building a web product with React/Next.js.
                    </p>
                    <p className="text-slate-400 text-sm">
                        All of these can be combined—many production systems use LlamaIndex for RAG + LangGraph for orchestration.
                    </p>
                </div>
            </section>
        </div>
    );
}
