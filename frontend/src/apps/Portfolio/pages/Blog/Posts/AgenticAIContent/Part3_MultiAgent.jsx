import {
    ArrowRight, Blocks, Briefcase, CheckCircle2, ChevronDown, ChevronRight,
    Code2, ExternalLink, GitBranch, GitMerge, Layers, MessageSquare,
    Network, Share2, Sparkles, Users
} from "lucide-react";
import { useState } from "react";
import { CodeBlock, InfoBox } from './SharedComponents';

// Expandable Pattern Card
const PatternCard = ({ icon: Icon, iconColor, bgColor, title, tag, tagColor, description, bestFor, example, codeExample, isOpen, onToggle }) => (
    <div className={`rounded-2xl border border-slate-700/50 overflow-hidden transition-all ${bgColor}`}>
        <button
            onClick={onToggle}
            className="w-full p-6 flex items-start justify-between hover:bg-white/5 transition-colors text-left"
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 ${iconColor.replace('text-', 'bg-').replace('400', '900/30')} ${iconColor} rounded-xl flex-shrink-0`}>
                    <Icon size={24} />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-white text-lg">{title}</h4>
                        {tag && <span className={`text-xs ${tagColor} uppercase tracking-widest font-bold`}>{tag}</span>}
                    </div>
                    <p className="text-slate-400 text-sm">{description}</p>
                </div>
            </div>
            {isOpen ? <ChevronDown className="text-slate-400 flex-shrink-0" size={20} /> : <ChevronRight className="text-slate-400 flex-shrink-0" size={20} />}
        </button>

        {isOpen && (
            <div className="px-6 pb-6 space-y-4 border-t border-slate-800/50">
                <div className="pt-4 grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Best For</div>
                        <p className="text-slate-300 text-sm">{bestFor}</p>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Real-World Example</div>
                        <p className="text-slate-300 text-sm">{example}</p>
                    </div>
                </div>
                {codeExample && (
                    <CodeBlock
                        language="python"
                        filename={codeExample.filename}
                        code={codeExample.code}
                    />
                )}
            </div>
        )}
    </div>
);

// Architecture Diagram Component
const ArchitectureDiagram = ({ type }) => {
    const diagrams = {
        hierarchical: (
            <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
                        Manager
                    </div>
                    <div className="w-0.5 h-6 bg-slate-600"></div>
                    <div className="w-40 h-0.5 bg-slate-600"></div>
                </div>
                <div className="flex gap-6">
                    {['Research', 'Writer', 'Editor'].map((role, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-slate-600"></div>
                            <div className="w-14 h-14 rounded-lg bg-slate-800 border-2 border-purple-500/50 flex items-center justify-center text-[10px] text-slate-300">
                                {role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        sequential: (
            <div className="flex items-center justify-center gap-2 py-4">
                {['Input', 'Research', 'Draft', 'Edit', 'Output'].map((step, i, arr) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-[10px] ${
                            i === 0 || i === arr.length - 1
                                ? 'bg-slate-900 border border-blue-500/50 text-slate-400'
                                : 'bg-slate-800 border-2 border-blue-500 text-white font-semibold'
                        }`}>
                            {step}
                        </div>
                        {i < arr.length - 1 && <ArrowRight size={16} className="text-slate-600" />}
                    </div>
                ))}
            </div>
        ),
        collaborative: (
            <div className="flex justify-center py-4">
                <div className="relative w-48 h-48">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-xs font-bold">
                        Shared<br/>Chat
                    </div>
                    {[
                        { label: 'A1', top: '0%', left: '50%', tx: '-50%', ty: '0' },
                        { label: 'A2', top: '75%', left: '10%', tx: '0', ty: '0' },
                        { label: 'A3', top: '75%', left: '90%', tx: '-100%', ty: '0' }
                    ].map((agent, i) => (
                        <div key={i} className="absolute w-12 h-12 rounded-full bg-slate-800 border-2 border-emerald-500/50 flex items-center justify-center text-xs text-white"
                            style={{ top: agent.top, left: agent.left, transform: `translate(${agent.tx}, ${agent.ty})` }}>
                            {agent.label}
                        </div>
                    ))}
                </div>
            </div>
        ),
        swarm: (
            <div className="flex justify-center gap-4 py-4">
                {['Triage', 'Sales', 'Support', 'Billing'].map((agent, i, arr) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-14 h-14 rounded-lg bg-slate-800 border-2 border-amber-500/50 flex items-center justify-center text-[10px] text-white">
                            {agent}
                        </div>
                        {i < arr.length - 1 && (
                            <div className="flex flex-col items-center gap-1">
                                <ArrowRight size={12} className="text-amber-500/50" />
                                <span className="text-[8px] text-slate-500">handoff</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    };

    return diagrams[type] || null;
};

export default function Part3_MultiAgent() {
    const [openPatterns, setOpenPatterns] = useState(['hierarchical']);

    const togglePattern = (id) => {
        setOpenPatterns(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const patterns = [
        {
            id: 'hierarchical',
            icon: Users,
            iconColor: 'text-purple-400',
            bgColor: 'bg-slate-900/50',
            title: '1. The Manager (Hierarchical)',
            tag: 'Most Common',
            tagColor: 'text-purple-400',
            description: 'A "Manager" agent breaks down tasks and delegates to specialist workers who report back.',
            bestFor: 'Complex goals requiring diverse skills—"Build a marketing campaign" → Researcher + Copywriter + Designer + Analyst.',
            example: 'CrewAI uses this pattern. A "CEO" agent coordinates "Marketing Lead" and "Tech Lead" agents for product launches.',
            codeExample: {
                filename: 'hierarchical_crew.py',
                code: `from crewai import Agent, Task, Crew, Process

# Define specialized agents
researcher = Agent(
    role="Research Analyst",
    goal="Gather comprehensive market data",
    backstory="Expert at finding insights in data",
    tools=[search_tool, scrape_tool]
)

writer = Agent(
    role="Content Writer",
    goal="Create engaging content from research",
    backstory="Award-winning copywriter"
)

# Manager coordinates automatically
manager = Agent(
    role="Project Manager",
    goal="Coordinate team and ensure quality",
    allow_delegation=True  # Can assign tasks to others
)

# Create hierarchical crew
crew = Crew(
    agents=[manager, researcher, writer],
    process=Process.hierarchical,  # Manager delegates
    manager_agent=manager
)

result = crew.kickoff(inputs={"topic": "AI in Healthcare 2025"})`
            }
        },
        {
            id: 'sequential',
            icon: GitMerge,
            iconColor: 'text-blue-400',
            bgColor: 'bg-slate-900/50',
            title: '2. The Pipeline (Sequential)',
            tag: 'Predictable',
            tagColor: 'text-blue-400',
            description: 'Like an assembly line—output of Agent A becomes input for Agent B, in a fixed order.',
            bestFor: 'Step-by-step workflows where order matters: Research → Outline → Draft → Edit → Publish.',
            example: 'LangGraph pipelines for content generation. Each stage has clear inputs/outputs.',
            codeExample: {
                filename: 'sequential_pipeline.py',
                code: `from langgraph.graph import StateGraph, END
from typing import TypedDict

class State(TypedDict):
    topic: str
    research: str
    draft: str
    final: str

def research_node(state: State) -> State:
    """Step 1: Gather research on the topic"""
    research = researcher_agent.invoke(state["topic"])
    return {"research": research}

def draft_node(state: State) -> State:
    """Step 2: Write draft based on research"""
    draft = writer_agent.invoke(state["research"])
    return {"draft": draft}

def edit_node(state: State) -> State:
    """Step 3: Edit and polish the draft"""
    final = editor_agent.invoke(state["draft"])
    return {"final": final}

# Build the sequential graph
workflow = StateGraph(State)
workflow.add_node("research", research_node)
workflow.add_node("draft", draft_node)
workflow.add_node("edit", edit_node)

# Connect in sequence
workflow.set_entry_point("research")
workflow.add_edge("research", "draft")
workflow.add_edge("draft", "edit")
workflow.add_edge("edit", END)

# Compile and run
app = workflow.compile()
result = app.invoke({"topic": "Quantum Computing for Beginners"})`
            }
        },
        {
            id: 'collaborative',
            icon: MessageSquare,
            iconColor: 'text-emerald-400',
            bgColor: 'bg-slate-900/50',
            title: '3. The Group Chat (Collaborative)',
            tag: 'Dynamic',
            tagColor: 'text-emerald-400',
            description: 'Agents share a conversation and "jump in" when relevant. Requires a controller to prevent chaos.',
            bestFor: 'Brainstorming, debates, and problems requiring multiple perspectives simultaneously.',
            example: 'Microsoft AutoGen GroupChat—agents with different expertise discuss and build on each other\'s ideas.',
            codeExample: {
                filename: 'group_chat.py',
                code: `from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager

# Define agents with different roles
engineer = AssistantAgent(
    name="Engineer",
    system_message="You are a senior software engineer. Provide technical solutions."
)

product_manager = AssistantAgent(
    name="ProductManager",
    system_message="You are a product manager. Focus on user needs and priorities."
)

designer = AssistantAgent(
    name="Designer",
    system_message="You are a UX designer. Consider user experience and accessibility."
)

user_proxy = UserProxyAgent(name="User", code_execution_config=False)

# Create group chat with all agents
groupchat = GroupChat(
    agents=[user_proxy, engineer, product_manager, designer],
    messages=[],
    max_round=12,
    speaker_selection_method="auto"  # LLM decides who speaks next
)

manager = GroupChatManager(groupchat=groupchat)

# Start the discussion
user_proxy.initiate_chat(
    manager,
    message="We need to design a new mobile app for booking doctor appointments. Let's discuss features, tech stack, and UX."
)`
            }
        },
        {
            id: 'swarm',
            icon: Share2,
            iconColor: 'text-amber-400',
            bgColor: 'bg-slate-900/50',
            title: '4. The Swarm (Handoff-Based)',
            tag: 'Scalable',
            tagColor: 'text-amber-400',
            description: 'Independent agents that don\'t know about each other but can "hand off" tasks when needed.',
            bestFor: 'Customer service triage, routing. Agent says "I can\'t help with billing, transferring you..."',
            example: 'OpenAI Swarm framework. A triage agent routes to Sales, Support, or Billing based on user intent.',
            codeExample: {
                filename: 'swarm_handoff.py',
                code: `from swarm import Swarm, Agent

client = Swarm()

# Define handoff functions
def transfer_to_sales():
    """Transfer the conversation to the sales agent."""
    return sales_agent

def transfer_to_support():
    """Transfer the conversation to the support agent."""
    return support_agent

# Triage agent determines intent and hands off
triage_agent = Agent(
    name="Triage",
    instructions="Determine if the user needs Sales or Support. Transfer accordingly.",
    functions=[transfer_to_sales, transfer_to_support]
)

sales_agent = Agent(
    name="Sales",
    instructions="Help users with pricing, plans, and purchases."
)

support_agent = Agent(
    name="Support",
    instructions="Help users with technical issues and troubleshooting."
)

# Run the swarm - starts with triage
response = client.run(
    agent=triage_agent,
    messages=[{"role": "user", "content": "I'm having trouble logging in"}]
)
# Auto-routes to support_agent based on intent`
            }
        }
    ];

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Part 3:</span> Multi-Agent Systems
                </h2>

                <p className="text-xl text-slate-300 leading-relaxed font-light">
                    One agent is powerful; a team is unstoppable.
                    Just as a single employee cannot run an entire corporation, a single agent has finite context and expertise.
                    <strong className="text-white"> Multi-Agent Systems (MAS)</strong> are the key to scaling complexity.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    {[
                        { value: "4", label: "Core Patterns" },
                        { value: "3-10x", label: "Complexity Reduction" },
                        { value: "85%", label: "Of Production Systems Use MAS" },
                        { value: "∞", label: "Scalability" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center">
                            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{stat.value}</div>
                            <div className="text-xs text-slate-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <InfoBox type="pro" title="The Specialist Principle">
                    It's often better to have three specialized agents (Researcher, Writer, Editor) than one generalist "super-agent".
                    <strong> Smaller prompts are more robust, cheaper, and easier to debug.</strong> This mirrors how high-performing human teams work.
                </InfoBox>
            </section>

            {/* Why Multi-Agent */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
                    <Sparkles className="text-purple-400" />
                    3.1 Why Multi-Agent?
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Layers,
                            title: "Context Specialization",
                            desc: "Each agent has a focused system prompt and smaller context window. No single agent needs to hold all the instructions."
                        },
                        {
                            icon: GitBranch,
                            title: "Parallel Execution",
                            desc: "Multiple agents can work simultaneously. Research and Design can happen in parallel, then merge."
                        },
                        {
                            icon: Blocks,
                            title: "Modularity & Debugging",
                            desc: "When something breaks, you know exactly which agent failed. Replace or fix in isolation."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                            <item.icon className="text-purple-400 mb-4" size={28} />
                            <h4 className="font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-slate-400 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Coordination Patterns */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
                    <Network className="text-purple-400" />
                    3.2 Coordination Patterns
                </h3>
                <p className="text-slate-400 leading-8">
                    How do agents work together? There are <strong className="text-white">four dominant patterns</strong> in production systems today.
                    Click each pattern to see architecture diagrams, use cases, and runnable code.
                </p>

                <div className="space-y-4">
                    {patterns.map((pattern) => (
                        <div key={pattern.id}>
                            <PatternCard
                                {...pattern}
                                isOpen={openPatterns.includes(pattern.id)}
                                onToggle={() => togglePattern(pattern.id)}
                            />
                            {openPatterns.includes(pattern.id) && (
                                <div className="mt-2 p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 text-center">Architecture Diagram</div>
                                    <ArchitectureDiagram type={pattern.id} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* State & Communication */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
                    <Briefcase className="text-pink-400" />
                    3.3 State Management & Communication
                </h3>

                <p className="text-slate-400 leading-8">
                    Agents don't text each other on WhatsApp. They communicate via <strong className="text-white">structured state</strong> and <strong className="text-white">message passing</strong>.
                    Understanding this is critical for debugging multi-agent systems.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                        <h4 className="font-bold text-white flex items-center gap-2">
                            <MessageSquare size={18} className="text-pink-400" />
                            Message Passing
                        </h4>
                        <p className="text-slate-400 text-sm">
                            Agents share a conversation history (list of messages). Each agent reads the history and adds their response.
                        </p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-xs text-slate-300 border border-slate-800">
{`[
  {"role": "user", "content": "Write a blog post about AI"},
  {"role": "manager", "content": "Researcher, find 3 recent AI trends."},
  {"role": "researcher", "content": "1. Agents 2. RAG 3. MoE"},
  {"role": "manager", "content": "Writer, draft post using these."}
]`}
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                        <h4 className="font-bold text-white flex items-center gap-2">
                            <Layers size={18} className="text-pink-400" />
                            Shared State (LangGraph)
                        </h4>
                        <p className="text-slate-400 text-sm">
                            A TypedDict or Pydantic model that all nodes read from and write to. More structured than messages.
                        </p>
                        <div className="bg-black/50 p-3 rounded-lg font-mono text-xs text-slate-300 border border-slate-800">
{`class State(TypedDict):
    topic: str           # Initial input
    research: str        # Added by researcher
    outline: list[str]   # Added by planner
    draft: str           # Added by writer
    final: str           # Added by editor`}
                        </div>
                    </div>
                </div>

                <InfoBox type="warning" title="Context Window Pressure">
                    In multi-agent systems, the shared history grows fast. A 10-agent discussion can hit 100K tokens quickly.
                    <strong> Always implement summarization</strong>—periodically compress old messages to keep within limits.
                </InfoBox>
            </section>

            {/* Framework Comparison */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
                    <Code2 className="text-pink-400" />
                    3.4 When to Use Which Framework
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-slate-400 border-b border-slate-800">
                                <th className="py-3 px-4">Framework</th>
                                <th className="py-3 px-4">Pattern</th>
                                <th className="py-3 px-4">Best For</th>
                                <th className="py-3 px-4">Learning Curve</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-slate-800/50 hover:bg-slate-900/50">
                                <td className="py-4 px-4 font-bold">LangGraph</td>
                                <td className="py-4 px-4">Sequential, Conditional</td>
                                <td className="py-4 px-4">Complex workflows with state machines</td>
                                <td className="py-4 px-4"><span className="text-amber-400">Medium</span></td>
                            </tr>
                            <tr className="border-b border-slate-800/50 hover:bg-slate-900/50">
                                <td className="py-4 px-4 font-bold">CrewAI</td>
                                <td className="py-4 px-4">Hierarchical</td>
                                <td className="py-4 px-4">Role-based teams with clear delegation</td>
                                <td className="py-4 px-4"><span className="text-emerald-400">Easy</span></td>
                            </tr>
                            <tr className="border-b border-slate-800/50 hover:bg-slate-900/50">
                                <td className="py-4 px-4 font-bold">AutoGen</td>
                                <td className="py-4 px-4">Collaborative Chat</td>
                                <td className="py-4 px-4">Dynamic discussions, code execution</td>
                                <td className="py-4 px-4"><span className="text-amber-400">Medium</span></td>
                            </tr>
                            <tr className="hover:bg-slate-900/50">
                                <td className="py-4 px-4 font-bold">OpenAI Swarm</td>
                                <td className="py-4 px-4">Handoff</td>
                                <td className="py-4 px-4">Customer service routing, triage</td>
                                <td className="py-4 px-4"><span className="text-emerald-400">Easy</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap gap-3">
                    {[
                        { name: "LangGraph", url: "https://langchain-ai.github.io/langgraph/" },
                        { name: "CrewAI", url: "https://docs.crewai.com/" },
                        { name: "AutoGen", url: "https://microsoft.github.io/autogen/" },
                        { name: "OpenAI Swarm", url: "https://github.com/openai/swarm" }
                    ].map((fw) => (
                        <a key={fw.name} href={fw.url} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-purple-500/50 transition-colors text-sm text-slate-300 hover:text-white">
                            {fw.name} <ExternalLink size={12} />
                        </a>
                    ))}
                </div>
            </section>

            {/* Key Takeaways */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-400" />
                    Key Takeaways
                </h3>

                <div className="bg-gradient-to-br from-purple-950/30 to-pink-950/30 p-6 rounded-xl border border-purple-500/20">
                    <ul className="space-y-3 text-slate-300">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                            <span><strong className="text-white">Specialization beats generalization.</strong> Break complex tasks into focused agents with smaller prompts.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                            <span><strong className="text-white">Choose your pattern wisely.</strong> Hierarchical for delegation, Sequential for pipelines, Swarm for routing.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                            <span><strong className="text-white">Start simple.</strong> Begin with 2-3 agents. Add complexity only when needed.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                            <span><strong className="text-white">Mind the context.</strong> Multi-agent conversations explode in size. Implement summarization early.</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
