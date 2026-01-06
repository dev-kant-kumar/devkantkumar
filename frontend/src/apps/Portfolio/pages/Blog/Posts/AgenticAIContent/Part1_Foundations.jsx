import {
    ArrowDown, ArrowRight, Blocks, BookOpen, Briefcase, CheckCircle2,
    DollarSign,
    Flame, Layout,
    Lightbulb, PlayCircle, Rocket,
    Target,
    TrendingUp, Users, Zap
} from "lucide-react";
import { AnalogyVisualizer, ComparisonDeck, InfoBox, MarketDataViz } from './SharedComponents';

// Animated Stat Card
const StatCard = ({ value, label, icon: Icon, color, delay }) => (
    <div
        className={`bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-xl border border-slate-800 hover:border-${color}-500/50 transition-all hover:-translate-y-1 cursor-default`}
        style={{ animationDelay: delay }}
    >
        <div className="flex items-center gap-3 mb-2">
            <Icon className={`text-${color}-400`} size={20} />
            <span className={`text-3xl font-black text-${color}-400`}>{value}</span>
        </div>
        <div className="text-slate-400 text-sm">{label}</div>
    </div>
);

// What You'll Learn Card
const LearnCard = ({ number, title, desc, href }) => (
    <a href={href} className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all cursor-pointer group">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
            {number}
        </div>
        <div>
            <div className="font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{title}</div>
            <div className="text-slate-400 text-sm">{desc}</div>
        </div>
    </a>
);

export default function Part1_Foundations() {
    return (
        <div className="space-y-20">
            {/* HERO: Hook Section - First 5 seconds matter */}
            <section className="space-y-8">
                {/* Main Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                        Agentic AI
                    </span>
                    <br />
                    The Complete Guide to<br />
                    Building Autonomous Systems
                </h1>

                {/* Value Proposition - Why keep reading */}
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
                    ChatGPT answers questions. <strong className="text-white">Agents complete tasks.</strong>
                    <br />
                    <span className="text-slate-400">
                        This guide will teach you to build AI systems that research, code, email, and execute autonomously.
                    </span>
                </p>

                {/* Social Proof Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard value="$199B" label="Agentic AI market by 2030" icon={TrendingUp} color="cyan" delay="0ms" />
                    <StatCard value="93%" label="Fortune 500 with 2025 pilots" icon={Briefcase} color="blue" delay="50ms" />
                    <StatCard value="10x" label="Developer productivity gains" icon={Zap} color="purple" delay="100ms" />
                    <StatCard value="8" label="Production patterns covered" icon={Blocks} color="pink" delay="150ms" />
                </div>

                {/* CTA Bar */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="#hands-on" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                        <PlayCircle size={18} /> Skip to Hands-On Projects
                    </a>
                    <a href="#resources" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-slate-200 transition-colors">
                        View 90-Day Roadmap <ArrowRight size={16} />
                    </a>
                </div>
            </section>

            {/* What You'll Learn - Promise to the reader */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-slate-400 uppercase tracking-wider">
                    <BookOpen size={16} className="text-cyan-400" />
                    What You'll Master
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                    <LearnCard number="1" title="Core Agent Architecture" desc="How agents reason, plan, and execute with LLMs" href="#architecture" />
                    <LearnCard number="2" title="Multi-Agent Systems" desc="Build teams of specialized agents that collaborate" href="#multi-agent" />
                    <LearnCard number="3" title="Production Patterns" desc="ReAct, Reflection, Human-in-the-Loop, Guardrails" href="#patterns" />
                    <LearnCard number="4" title="Framework Mastery" desc="LangChain, CrewAI, LangGraph hands-on" href="#frameworks" />
                    <LearnCard number="5" title="Real Projects" desc="3 complete, runnable agent applications" href="#hands-on" />
                    <LearnCard number="6" title="Career Path" desc="90-day roadmap to Agent Engineer role" href="#resources" />
                </div>
            </section>

            {/* Quick Hook: Before/After */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Lightbulb className="text-amber-400" />
                    The Paradigm Shift in 30 Seconds
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            2023: ChatGPT Era
                        </div>
                        <div className="space-y-2">
                            <div className="p-3 bg-slate-800/50 rounded-lg text-slate-400 text-sm">
                                <strong className="text-slate-300">You:</strong> "Write me an email to cancel my subscription"
                            </div>
                            <div className="p-3 bg-slate-800/50 rounded-lg text-slate-400 text-sm">
                                <strong className="text-slate-300">AI:</strong> "Here's a draft email: Dear Support..."
                            </div>
                            <div className="p-3 bg-red-950/30 rounded-lg text-red-400 text-sm border border-red-500/20">
                                ❌ You still have to copy, paste, log in, send, and verify
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                            2025: Agentic Era
                        </div>
                        <div className="space-y-2">
                            <div className="p-3 bg-slate-800/50 rounded-lg text-slate-400 text-sm">
                                <strong className="text-slate-300">You:</strong> "Cancel my subscription to Netflix"
                            </div>
                            <div className="p-3 bg-emerald-950/30 rounded-lg text-emerald-300 text-sm border border-emerald-500/20">
                                <strong className="text-emerald-400">Agent:</strong><br/>
                                ✓ Logged into netflix.com<br/>
                                ✓ Navigated to Account → Cancel<br/>
                                ✓ Confirmed cancellation<br/>
                                ✓ Screenshot saved to /confirmations
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Part 1 Header */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Part 1:</span> Foundations & Market Opportunity
                </h2>

                <p className="text-xl text-slate-300 leading-relaxed font-light">
                    We are witnessing the most significant shift in AI since the transformer architecture.
                    We are moving from <strong className="text-white">AI that responds</strong> to <strong className="text-white">AI that acts</strong>.
                </p>
            </section>

            {/* Section 1.1: What Is Agentic AI */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
                    <Layout className="text-cyan-400" />
                    1.1 What Is Agentic AI?
                </h3>
                <p className="text-slate-400 leading-8 text-lg">
                    At its core, <strong className="text-white">Agentic AI</strong> is a system capable of autonomous decision-making to achieve a high-level goal.
                    Unlike a standard LLM which waits for prompts and generates text, an Agent <strong className="text-white">loops</strong>:
                    it perceives, reasons, acts, and reflects.
                </p>

                <div className="pl-6 border-l-4 border-cyan-500/50 italic text-slate-300 text-lg bg-cyan-950/10 py-4 pr-4 rounded-r-lg">
                    "Think of a standard LLM as a <strong className="text-white">Brilliant Librarian</strong>—it knows everything but sits at a desk waiting for questions.
                    Agentic AI is a <strong className="text-white">Smart Employee</strong>—you give it a goal ('Improve sales'), and it goes out, researches, creates a plan, drafts emails, and sends them."
                </div>

                <h4 className="text-lg font-bold text-slate-200 pt-4">Interactive: Librarian vs. Agent</h4>
                <AnalogyVisualizer />

                <p className="text-slate-400 leading-8">
                    The three hallmarks of a true agent:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Zap,
                            title: "Autonomy",
                            desc: "Invokes tools and makes decisions without human hand-holding for every step.",
                            color: "cyan"
                        },
                        {
                            icon: Target,
                            title: "Goal-Orientation",
                            desc: "Understands higher-level objectives ('Book a flight') rather than just next-token prediction.",
                            color: "blue"
                        },
                        {
                            icon: Rocket,
                            title: "Adaptability",
                            desc: "Handles errors, retries failed steps, and changes strategy if needed.",
                            color: "purple"
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors">
                            <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-4`}>
                                <item.icon className={`text-${item.color}-400`} size={24} />
                            </div>
                            <div className="font-bold text-white mb-2 text-lg">{item.title}</div>
                            <div className="text-slate-400 text-sm leading-relaxed">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 1.2: The Critical Distinction */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
                    1.2 The Critical Distinction: Generative vs Agentic
                </h3>
                <p className="text-slate-400 leading-8">
                    It's easy to confuse "Generative AI" with "Agentic AI". While agents use generative models as their brain, the architecture wrapping them is fundamental.
                    We are moving from <strong className="text-white">content creation</strong> to <strong className="text-white">task execution</strong>.
                </p>

                <ComparisonDeck />

                <InfoBox type="info" title="The Reasoning Gap">
                    LLMs alone have a short-term horizon—they predict the next word. Agents bridge the <strong>"Reasoning Gap"</strong> by adding scaffolding that allows the model to "think" before it speaks (or acts), giving it working memory and a scratchpad to plan complex sequences.
                </InfoBox>
            </section>

            {/* Section 1.3: Why 2025? */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100">1.3 Why 2025 Is the Breakout Year</h3>
                <p className="text-slate-400 leading-8">
                    Why didn't we have this in 2023? <strong className="text-white">Three convergent trends</strong> have made 2025 the "Year of the Agent":
                </p>

                <div className="space-y-4">
                    {[
                        {
                            num: 1,
                            color: "blue",
                            title: "Model Reasoning & Speed",
                            desc: "Models like GPT-4o and Claude 3.5 Sonnet follow complex instructions better and run faster. Agent loops require many inference calls; lower latency makes them viable.",
                            stat: "3x faster than GPT-4"
                        },
                        {
                            num: 2,
                            color: "purple",
                            title: "Tool Calling Standards",
                            desc: "The industry standardized around function calling (OpenAI API, Anthropic Tool Use), allowing models to reliably output JSON to control software.",
                            stat: "99%+ reliable tool calls"
                        },
                        {
                            num: 3,
                            color: "emerald",
                            title: "Framework Maturity",
                            desc: "LangChain, LangGraph, and CrewAI have matured from experimental scripts to robust orchestration engines with proper state management.",
                            stat: "95k+ GitHub stars"
                        }
                    ].map((item) => (
                        <div key={item.num} className="flex gap-4 p-5 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className={`w-12 h-12 rounded-lg bg-${item.color}-900/30 flex items-center justify-center shrink-0 border border-${item.color}-500/20 text-${item.color}-400 font-bold text-xl`}>
                                {item.num}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                    <span className={`text-xs px-2 py-0.5 bg-${item.color}-900/30 text-${item.color}-400 rounded-full`}>{item.stat}</span>
                                </div>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 1.4: Business Case */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
                    <DollarSign className="text-emerald-400" />
                    1.4 The Business Case: ROI & Market Sizing
                </h3>
                <p className="text-slate-400 leading-8">
                    The ROI for agentic systems is calculated differently than Copilots. A Copilot makes a human 20% faster; an Agent <strong className="text-white">removes the human loop entirely</strong> for specific tiered tasks, offering near-infinite scalability for things like Level 1 Support or Data Entry.
                </p>

                <MarketDataViz />

                <div className="bg-gradient-to-r from-cyan-950/50 to-blue-950/50 p-8 rounded-2xl border border-cyan-500/20">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Flame className="text-cyan-400" />
                        New Job Title: Agent Engineer
                    </h4>
                    <p className="text-slate-300 mb-6">
                        Companies deploying agents are shifting workforce composition. Instead of hiring junior staff for repetitive cognitive labor, they're hiring <strong className="text-white">"Agent Architects"</strong> to manage fleets of digital workers.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800">
                            <div className="text-xs text-slate-500 mb-1">Junior Agent Engineer</div>
                            <div className="text-emerald-400 font-bold">$100K - $140K</div>
                        </div>
                        <div className="px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800">
                            <div className="text-xs text-slate-500 mb-1">Senior Agent Engineer</div>
                            <div className="text-emerald-400 font-bold">$180K - $250K</div>
                        </div>
                        <div className="px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800">
                            <div className="text-xs text-slate-500 mb-1">Agent Architect</div>
                            <div className="text-emerald-400 font-bold">$250K - $400K+</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 1.5: Who This Guide Is For */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
                    <Users className="text-cyan-400" />
                    1.5 Who This Guide Is For
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        {
                            title: "Developers",
                            desc: "Who want to build AI systems that do more than chat",
                            prereqs: ["Python basics", "API experience", "Curiosity"]
                        },
                        {
                            title: "Tech Leaders",
                            desc: "Evaluating agentic AI for their organization",
                            prereqs: ["ROI focus", "Team building", "Architecture decisions"]
                        },
                        {
                            title: "Career Switchers",
                            desc: "Looking to enter the hottest segment of AI",
                            prereqs: ["Programming fundamentals", "Motivation", "90-day commitment"]
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                            <div className="font-bold text-white text-lg mb-2">{item.title}</div>
                            <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
                            <div className="space-y-1">
                                {item.prereqs.map((p, j) => (
                                    <div key={j} className="flex items-center gap-2 text-xs text-slate-500">
                                        <CheckCircle2 size={12} className="text-cyan-400" />
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Continue Reading CTA */}
            <section className="text-center space-y-6 pt-8">
                <div className="text-slate-400">
                    Ready to understand how agents actually work?
                </div>
                <a href="#agent-anatomy" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-lg transition-colors">
                    Continue to Part 2: Agent Anatomy <ArrowDown className="animate-bounce" size={18} />
                </a>
            </section>
        </div>
    );
}
