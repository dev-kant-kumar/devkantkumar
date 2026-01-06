import {
  AlertTriangle,
  Bot, Brain, Briefcase, CheckCircle2,
  ChevronDown, ChevronRight, Clock, Code2, Cpu,
  Eye, Globe, Layers, Lightbulb, Mic, Monitor, Rocket,
  Shield, Sparkles, Target, Telescope, TrendingUp, Users, Zap
} from "lucide-react";
import { useState } from "react";
import { InfoBox } from './SharedComponents';

// Timeline Item Component
const TimelineItem = ({ year, title, items, color, isOpen, onToggle }) => (
    <div className="relative">
        {/* Timeline Node */}
        <div className={`absolute left-0 top-0 w-4 h-4 rounded-full bg-${color}-500 border-4 border-slate-950 z-10`}></div>

        {/* Content */}
        <div className="ml-8 pb-8">
            <button
                onClick={onToggle}
                className="w-full text-left flex items-center gap-3 group"
            >
                <span className={`text-${color}-400 font-black text-2xl`}>{year}</span>
                <span className="text-white font-bold text-lg">{title}</span>
                {isOpen ? <ChevronDown size={18} className="text-slate-500" /> : <ChevronRight size={18} className="text-slate-500" />}
            </button>

            {isOpen && (
                <div className="mt-4 space-y-3">
                    {items.map((item, i) => (
                        <div key={i} className="flex gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                            <item.icon className={`text-${color}-400 flex-shrink-0 mt-0.5`} size={18} />
                            <div>
                                <div className="font-semibold text-white mb-1">{item.title}</div>
                                <div className="text-slate-400 text-sm">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

// Emerging Tech Card
const TechCard = ({ icon: Icon, title, description, status, statusColor, companies }) => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-slate-800`}>
                <Icon className="text-purple-400" size={24} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full bg-${statusColor}-900/30 text-${statusColor}-400 font-medium`}>
                {status}
            </span>
        </div>
        <h4 className="font-bold text-white text-lg mb-2">{title}</h4>
        <p className="text-slate-400 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
            {companies.map((company, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">{company}</span>
            ))}
        </div>
    </div>
);

export default function Part9_Future() {
    const [openTimelines, setOpenTimelines] = useState(['2025']);

    const toggleTimeline = (year) => {
        setOpenTimelines(prev =>
            prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
        );
    };

    const timeline = [
        {
            year: "2025",
            title: "The Year of the Agent",
            color: "cyan",
            items: [
                { icon: Bot, title: "Agent-First Products Ship", desc: "Devin, GitHub Copilot Workspace, Replit Agent, and dozens more move from beta to GA. First real production deployments at scale." },
                { icon: Monitor, title: "Computer Use Goes Mainstream", desc: "Claude Computer Use, OpenAI Operator—agents that control your screen like a human. Browser automation becomes trivial." },
                { icon: Layers, title: "Framework War Heats Up", desc: "LangGraph, CrewAI, AutoGen battle for dominance. Expect consolidation and clearer winners by year-end." },
                { icon: Briefcase, title: "Enterprise Pilots Everywhere", desc: "93% of Fortune 500 running agentic pilots. Focus on customer service, code generation, and data processing." }
            ]
        },
        {
            year: "2026",
            title: "Specialization & Trust",
            color: "blue",
            items: [
                { icon: Shield, title: "Safety Standards Emerge", desc: "First formal certifications for agentic AI safety. OWASP-style guidelines become mandatory for enterprise." },
                { icon: Brain, title: "Domain-Specific Agents", desc: "Legal agents, medical agents, financial agents—each with specialized training and regulatory compliance." },
                { icon: Users, title: "Agent-to-Agent Protocols", desc: "Standardized protocols for agents to communicate. Early versions of the 'Internet of Agents'." },
                { icon: TrendingUp, title: "First Unicorns", desc: "Agent-native startups hit $1B+ valuations. The 'Salesforce of Agents' emerges." }
            ]
        },
        {
            year: "2027",
            title: "Multimodal Revolution",
            color: "purple",
            items: [
                { icon: Eye, title: "Vision-First Agents", desc: "Agents that see your screen, documents, and physical workspace. UI understanding becomes as good as humans." },
                { icon: Mic, title: "Voice-Native Agents", desc: "Real-time voice agents indistinguishable from humans. Call centers fully automated." },
                { icon: Cpu, title: "On-Device Agents", desc: "Powerful agents running on phones and laptops. Apple Intelligence-style local agents with cloud fallback." },
                { icon: Code2, title: "Agents Write Agents", desc: "Meta-agents that design, test, and deploy other agents. Human role shifts to oversight." }
            ]
        },
        {
            year: "2028-2030",
            title: "The Autonomous Enterprise",
            color: "pink",
            items: [
                { icon: Globe, title: "Agent Marketplaces", desc: "Hire specialized agents via APIs—legal, accounting, design. Pay-per-task economy. Agent-to-agent commerce." },
                { icon: Sparkles, title: "Self-Improving Systems", desc: "Agents use RL to update their own prompts and tools based on success rates. Continuous learning on the job." },
                { icon: Rocket, title: "Full Workflow Automation", desc: "Complete business processes—from customer inquiry to fulfillment—run by agent orchestrations." },
                { icon: Target, title: "AGI Agents?", desc: "The line between narrow agents and general intelligence blurs. Agents that can learn any task." }
            ]
        }
    ];

    return (
        <div className="space-y-20">
            {/* Header */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Part 9:</span> The Future (2025-2030)
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed font-light max-w-3xl">
                    We are at day one. The next five years will transform how software is built, how companies operate, and how humans work alongside AI.
                    <strong className="text-white"> Here's what's coming.</strong>
                </p>

                <InfoBox type="warning" title="Predictions Are Hard">
                    Everything below is my best synthesis of research papers, industry trends, and conversations with people building this technology.
                    The timeline could compress (AI moves fast) or extend (regulations, safety concerns). Take specific dates with a grain of salt.
                </InfoBox>
            </section>

            {/* Timeline */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Clock className="text-purple-400" />
                    9.1 The 5-Year Timeline
                </h3>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"></div>

                    <div className="space-y-2">
                        {timeline.map((item) => (
                            <TimelineItem
                                key={item.year}
                                {...item}
                                isOpen={openTimelines.includes(item.year)}
                                onToggle={() => toggleTimeline(item.year)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Emerging Technologies */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Lightbulb className="text-purple-400" />
                    9.2 Emerging Technologies to Watch
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <TechCard
                        icon={Monitor}
                        title="Computer Use / GUI Agents"
                        description="Agents that control mouse and keyboard like a human. Can use any software without APIs."
                        status="Now Shipping"
                        statusColor="emerald"
                        companies={["Anthropic Claude", "OpenAI Operator", "Browser Use"]}
                    />
                    <TechCard
                        icon={Brain}
                        title="Long-Context Reasoning"
                        description="Models with 1M+ token context that can hold entire codebases. Enables new agent patterns."
                        status="Early 2025"
                        statusColor="blue"
                        companies={["Gemini 2.0", "Claude 3.5", "GPT-5?"]}
                    />
                    <TechCard
                        icon={Cpu}
                        title="On-Device LLMs"
                        description="Run agents locally on phones and laptops. Privacy-first, low latency, offline capable."
                        status="Maturing"
                        statusColor="amber"
                        companies={["Apple MLX", "Qualcomm AI Hub", "Google MediaPipe"]}
                    />
                    <TechCard
                        icon={Zap}
                        title="Reinforcement Learning for Agents"
                        description="Agents that learn from task success/failure. Self-improving without human retraining."
                        status="Research"
                        statusColor="purple"
                        companies={["DeepMind", "OpenAI", "Anthropic"]}
                    />
                    <TechCard
                        icon={Globe}
                        title="Agent-to-Agent Protocols"
                        description="Standardized ways for agents to discover, negotiate with, and pay each other."
                        status="Emerging"
                        statusColor="cyan"
                        companies={["LangChain MCP", "AutoGPT Forge", "Startups"]}
                    />
                    <TechCard
                        icon={Shield}
                        title="Formal Verification for AI"
                        description="Mathematical proofs that agents behave safely. Beyond empirical testing."
                        status="Research"
                        statusColor="red"
                        companies={["Anthropic", "DeepMind", "Academia"]}
                    />
                </div>
            </section>

            {/* Risks & Challenges */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <AlertTriangle className="text-amber-400" />
                    9.3 Risks & Open Challenges
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        {
                            title: "Reliability at Scale",
                            desc: "99% accuracy sounds great until you realize that's 1 failure per 100 tasks. At enterprise scale, that's thousands of daily failures requiring human review.",
                            level: "High"
                        },
                        {
                            title: "Prompt Injection",
                            desc: "Malicious instructions hidden in emails, documents, or websites that hijack agent behavior. The #1 security vulnerability.",
                            level: "Critical"
                        },
                        {
                            title: "Hallucination in Actions",
                            desc: "An agent that hallucinates text is annoying. An agent that hallucinates an API call can delete your database.",
                            level: "High"
                        },
                        {
                            title: "Regulatory Uncertainty",
                            desc: "Who's liable when an agent makes a mistake? The developer? The company? The AI vendor? Laws are still catching up.",
                            level: "Medium"
                        },
                        {
                            title: "Cost at Scale",
                            desc: "Agent loops are expensive—20-100 LLM calls per task. At enterprise volumes, costs can spiral without careful engineering.",
                            level: "Medium"
                        },
                        {
                            title: "Job Displacement",
                            desc: "Agents will automate roles. Society needs to prepare with retraining, safety nets, and new job categories.",
                            level: "Long-term"
                        }
                    ].map((risk, i) => (
                        <div key={i} className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle size={16} className="text-amber-400" />
                                <span className="font-bold text-white">{risk.title}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${
                                    risk.level === 'Critical' ? 'bg-red-900/30 text-red-400' :
                                    risk.level === 'High' ? 'bg-amber-900/30 text-amber-400' :
                                    'bg-slate-800 text-slate-400'
                                }`}>
                                    {risk.level}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm">{risk.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How to Prepare */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Rocket className="text-purple-400" />
                    9.4 How to Prepare (Actionable)
                </h3>

                <div className="space-y-4">
                    {[
                        {
                            role: "For Developers",
                            actions: [
                                "Master LangGraph and at least one other framework (CrewAI or AutoGen)",
                                "Build 3+ portfolio projects with real tool integrations",
                                "Understand security: prompt injection, sandboxing, guardrails",
                                "Learn to instrument and debug agent systems (LangSmith)"
                            ]
                        },
                        {
                            role: "For Tech Leaders",
                            actions: [
                                "Identify 2-3 high-volume, rules-based processes for pilot automation",
                                "Start with human-in-the-loop—build trust before full autonomy",
                                "Build or hire agent expertise now; the talent market will tighten",
                                "Budget for observability and safety infrastructure"
                            ]
                        },
                        {
                            role: "For Career Changers",
                            actions: [
                                "Follow the 90-day roadmap in Part 10",
                                "Join LangChain Discord and Reddit communities",
                                "Contribute to open-source agent projects for visibility",
                                "Document your learning publicly (blog, Twitter, YouTube)"
                            ]
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
                            <h4 className="font-bold text-white mb-3">{item.role}</h4>
                            <ul className="space-y-2">
                                {item.actions.map((action, j) => (
                                    <li key={j} className="flex items-start gap-2 text-slate-300 text-sm">
                                        <CheckCircle2 size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                                        {action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Key Predictions */}
            <section className="bg-gradient-to-br from-indigo-950/30 to-purple-950/30 p-8 rounded-2xl border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Telescope className="text-purple-400" />
                    My Top 5 Predictions for 2030
                </h3>

                <div className="space-y-4">
                    {[
                        { num: 1, text: "90% of Level 1 support will be fully autonomous agents." },
                        { num: 2, text: "Every developer will work with AI agents daily—pair programming becomes pair-with-agent." },
                        { num: 3, text: "Agent marketplaces will be a $50B+ industry—hire an agent like you hire a contractor." },
                        { num: 4, text: "'Agent Engineer' will be a top-5 highest-paid tech role." },
                        { num: 5, text: "The majority of new software will be built by agents, reviewed by humans." }
                    ].map((pred) => (
                        <div key={pred.num} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">
                                {pred.num}
                            </div>
                            <p className="text-slate-200">{pred.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="text-center space-y-6">
                <div className="flex items-center justify-center gap-2 text-slate-400">
                    <Sparkles className="text-purple-400" size={20} />
                    The future is being built right now.
                </div>
                <a href="#resources" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-bold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                    <Rocket size={18} /> Start Your 90-Day Roadmap
                </a>
            </section>
        </div>
    );
}
