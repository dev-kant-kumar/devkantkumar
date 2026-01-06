import {
    BookOpen, ChevronDown, ChevronRight, Clock, Code2,
    ExternalLink, FileCode2,
    Github, GraduationCap,
    Layers, Play, Rocket, Server, Sparkles, Target, Terminal,
    Trophy, Wrench, Zap
} from "lucide-react";
import { useState } from "react";
import { InfoBox } from './SharedComponents';

// Expandable Week Component
const WeekCard = ({ week, title, hours, phase, topics, project, resources, isOpen, onToggle }) => {
    const phaseColors = {
        beginner: "border-emerald-500/30 bg-emerald-950/20",
        intermediate: "border-blue-500/30 bg-blue-950/20",
        advanced: "border-purple-500/30 bg-purple-950/20"
    };

    const phaseAccent = {
        beginner: "text-emerald-400",
        intermediate: "text-blue-400",
        advanced: "text-purple-400"
    };

    return (
        <div className={`rounded-xl border ${phaseColors[phase]} overflow-hidden transition-all duration-300`}>
            {/* Header - Always Visible */}
            <button
                onClick={onToggle}
                className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-lg ${phaseAccent[phase]}`}>
                        {week}
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-white text-lg">{title}</div>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                            <span className="flex items-center gap-1"><Clock size={12} /> {hours}</span>
                            <span>•</span>
                            <span className={phaseAccent[phase]}>{project}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 hidden md:block">{topics.length} topics</span>
                    {isOpen ? <ChevronDown className="text-slate-400" size={20} /> : <ChevronRight className="text-slate-400" size={20} />}
                </div>
            </button>

            {/* Expanded Content */}
            {isOpen && (
                <div className="px-5 pb-5 space-y-6 border-t border-slate-800/50">
                    {/* Topics */}
                    <div className="pt-4 space-y-4">
                        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <Layers size={14} /> Topics & Subtopics
                        </h4>
                        <div className="space-y-3">
                            {topics.map((topic, i) => (
                                <div key={i} className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                                    <div className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <topic.icon size={16} className={phaseAccent[phase]} />
                                        {topic.name}
                                    </div>
                                    <ul className="space-y-1.5 text-sm text-slate-400">
                                        {topic.subtopics.map((sub, j) => (
                                            <li key={j} className="flex items-start gap-2">
                                                <span className="text-slate-600 mt-1">→</span>
                                                <span>{sub}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <Code2 size={14} /> Build Project
                        </h4>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-4 border border-slate-700">
                            <div className="font-bold text-white text-lg mb-2">{project}</div>
                            <p className="text-slate-400 text-sm">{resources.projectDescription}</p>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <BookOpen size={14} /> Resources for This Week
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                            {resources.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 transition-colors border border-slate-800 group"
                                >
                                    <link.icon size={16} className={link.iconColor || "text-slate-400"} />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-slate-200 group-hover:text-white truncate">{link.title}</div>
                                        <div className="text-xs text-slate-500 truncate">{link.type}</div>
                                    </div>
                                    <ExternalLink size={12} className="text-slate-600 group-hover:text-slate-400" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Packages */}
                    {resources.packages && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                                <Terminal size={14} /> Install
                            </h4>
                            <div className="bg-black/50 p-3 rounded-lg font-mono text-sm text-emerald-400 border border-slate-800">
                                pip install {resources.packages.join(" ")}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Phase Header Component
const PhaseHeader = ({ icon: Icon, title, subtitle, color, isExpanded, onToggle }) => (
    <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:bg-slate-900/50 transition-colors`}
    >
        <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-${color}-500/10 border border-${color}-500/30 flex items-center justify-center`}>
                <Icon className={`text-${color}-400`} size={28} />
            </div>
            <div className="text-left">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <div className={`text-sm text-${color}-400 font-semibold`}>{subtitle}</div>
            </div>
        </div>
        {isExpanded ? <ChevronDown className="text-slate-400" size={24} /> : <ChevronRight className="text-slate-400" size={24} />}
    </button>
);

// --- ROADMAP DATA ---
const roadmapData = {
    phase1: [
        {
            week: 1,
            title: "LLM Fundamentals & First Agent",
            hours: "10-12 hrs",
            phase: "beginner",
            project: "Research Agent",
            topics: [
                {
                    name: "LLM Basics",
                    icon: Sparkles,
                    subtopics: [
                        "How LLMs work (tokenization, attention, generation)",
                        "Temperature, top-p, and other generation parameters",
                        "API structure: messages, roles, system prompts",
                        "Token counting and context window limits"
                    ]
                },
                {
                    name: "Prompt Engineering",
                    icon: FileCode2,
                    subtopics: [
                        "Zero-shot vs few-shot prompting",
                        "Chain-of-thought (CoT) reasoning",
                        "Structured output (JSON mode)",
                        "System prompts for agent behavior"
                    ]
                },
                {
                    name: "ReAct Pattern Introduction",
                    icon: Zap,
                    subtopics: [
                        "Reason + Act loop explained",
                        "Thought → Action → Observation cycle",
                        "Understanding verbose agent output",
                        "When to use ReAct vs simple chains"
                    ]
                }
            ],
            resources: {
                projectDescription: "Build a Research Agent that searches the web using Tavily API and synthesizes findings into a coherent summary. You'll implement the ReAct pattern and understand how agents reason.",
                packages: ["langchain", "langchain-openai", "tavily-python"],
                links: [
                    { title: "LangChain Quickstart", url: "https://python.langchain.com/docs/get_started/quickstart", icon: BookOpen, iconColor: "text-emerald-400", type: "Documentation" },
                    { title: "ReAct Paper", url: "https://arxiv.org/abs/2210.03629", icon: FileCode2, iconColor: "text-blue-400", type: "Research Paper" },
                    { title: "Tavily API Docs", url: "https://docs.tavily.com/", icon: Wrench, iconColor: "text-purple-400", type: "API Docs" },
                    { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", icon: GraduationCap, iconColor: "text-yellow-400", type: "Tutorial" }
                ]
            }
        },
        {
            week: 2,
            title: "Tool Creation & API Integration",
            hours: "12-15 hrs",
            phase: "beginner",
            project: "Email Automation Agent",
            topics: [
                {
                    name: "Tool Definition",
                    icon: Wrench,
                    subtopics: [
                        "The @tool decorator pattern",
                        "Pydantic schemas for structured inputs",
                        "Writing effective tool descriptions (critical for LLM selection)",
                        "Return value formatting"
                    ]
                },
                {
                    name: "OAuth & APIs",
                    icon: Server,
                    subtopics: [
                        "OAuth 2.0 flow basics",
                        "Gmail API setup and credentials",
                        "Secure credential management",
                        "Rate limiting and error handling"
                    ]
                },
                {
                    name: "Agent-Tool Binding",
                    icon: Layers,
                    subtopics: [
                        "create_tool_calling_agent vs create_react_agent",
                        "Tool selection behavior",
                        "Debugging tool call failures",
                        "Multi-tool agents"
                    ]
                }
            ],
            resources: {
                projectDescription: "Build an Email Agent that reads your latest unread email, understands its intent, drafts a professional reply, and can send it via Gmail API. Learn secure API integration.",
                packages: ["langchain", "langchain-openai", "google-api-python-client", "google-auth-oauthlib"],
                links: [
                    { title: "LangChain Tools Guide", url: "https://python.langchain.com/docs/how_to/custom_tools/", icon: BookOpen, iconColor: "text-emerald-400", type: "Documentation" },
                    { title: "Gmail API Quickstart", url: "https://developers.google.com/gmail/api/quickstart/python", icon: Wrench, iconColor: "text-red-400", type: "API Docs" },
                    { title: "Function Calling (OpenAI)", url: "https://platform.openai.com/docs/guides/function-calling", icon: FileCode2, iconColor: "text-green-400", type: "Documentation" },
                    { title: "OAuth 2.0 Explained", url: "https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow", icon: GraduationCap, iconColor: "text-orange-400", type: "Tutorial" }
                ]
            }
        },
        {
            week: 3,
            title: "Memory & RAG Basics",
            hours: "12-15 hrs",
            phase: "beginner",
            project: "PDF Q&A Agent",
            topics: [
                {
                    name: "Embeddings",
                    icon: Layers,
                    subtopics: [
                        "What are embeddings and why they matter",
                        "OpenAI embeddings vs open-source (e5, bge)",
                        "Cosine similarity and semantic search",
                        "Embedding dimensions and tradeoffs"
                    ]
                },
                {
                    name: "Vector Databases",
                    icon: Server,
                    subtopics: [
                        "ChromaDB setup (local, fast, free)",
                        "Pinecone for production (managed)",
                        "FAISS for in-memory search",
                        "Indexing strategies and metadata filtering"
                    ]
                },
                {
                    name: "Document Processing",
                    icon: FileCode2,
                    subtopics: [
                        "PDF loading and parsing",
                        "Chunking strategies (fixed, semantic, recursive)",
                        "Chunk size and overlap optimization",
                        "Handling tables, images, and complex layouts"
                    ]
                }
            ],
            resources: {
                projectDescription: "Build a PDF Q&A Agent that loads a document, chunks it intelligently, stores embeddings in ChromaDB, and answers questions with source citations.",
                packages: ["langchain", "langchain-openai", "chromadb", "pypdf"],
                links: [
                    { title: "RAG Tutorial (LangChain)", url: "https://python.langchain.com/docs/tutorials/rag/", icon: BookOpen, iconColor: "text-emerald-400", type: "Tutorial" },
                    { title: "ChromaDB Docs", url: "https://docs.trychroma.com/", icon: Server, iconColor: "text-amber-400", type: "Documentation" },
                    { title: "Chunking Strategies", url: "https://www.pinecone.io/learn/chunking-strategies/", icon: GraduationCap, iconColor: "text-blue-400", type: "Guide" },
                    { title: "OpenAI Embeddings", url: "https://platform.openai.com/docs/guides/embeddings", icon: Sparkles, iconColor: "text-green-400", type: "Documentation" }
                ]
            }
        },
        {
            week: 4,
            title: "Multi-Agent Fundamentals",
            hours: "10-12 hrs",
            phase: "beginner",
            project: "Multi-Agent Debate System",
            topics: [
                {
                    name: "Agent Communication",
                    icon: Layers,
                    subtopics: [
                        "Message passing between agents",
                        "Shared state vs isolated state",
                        "Turn-taking and conversation flow",
                        "Agent personas and role definition"
                    ]
                },
                {
                    name: "Orchestration Basics",
                    icon: Zap,
                    subtopics: [
                        "Sequential vs parallel execution",
                        "Supervisor patterns",
                        "Result aggregation",
                        "Error propagation"
                    ]
                },
                {
                    name: "Debate Architecture",
                    icon: Code2,
                    subtopics: [
                        "Pro/Con agent design",
                        "Judge agent evaluation criteria",
                        "Round-based interaction",
                        "Scoring and verdict generation"
                    ]
                }
            ],
            resources: {
                projectDescription: "Build a Debate System with 3 agents: Pro Agent argues for a topic, Con Agent argues against, and Judge Agent evaluates and declares a winner based on logic and evidence.",
                packages: ["langchain", "langchain-openai"],
                links: [
                    { title: "Multi-Agent Collaboration", url: "https://python.langchain.com/docs/how_to/agent_executor/", icon: BookOpen, iconColor: "text-emerald-400", type: "Documentation" },
                    { title: "Agent Architectures", url: "https://www.anthropic.com/research/building-effective-agents", icon: FileCode2, iconColor: "text-purple-400", type: "Research" },
                    { title: "LangGraph Intro", url: "https://langchain-ai.github.io/langgraph/", icon: Layers, iconColor: "text-blue-400", type: "Documentation" },
                    { title: "AutoGen Multi-Agent", url: "https://microsoft.github.io/autogen/", icon: Github, iconColor: "text-white", type: "Framework" }
                ]
            }
        }
    ],
    phase2: [
        {
            week: 5,
            title: "LangGraph Deep Dive",
            hours: "15-18 hrs",
            phase: "intermediate",
            project: "Content Pipeline (Research → Write → Edit)",
            topics: [
                {
                    name: "Graph Theory Basics",
                    icon: Layers,
                    subtopics: [
                        "Nodes, edges, and state machines",
                        "StateGraph construction",
                        "Conditional edges and routing",
                        "Cycles and loops in graphs"
                    ]
                },
                {
                    name: "State Management",
                    icon: Server,
                    subtopics: [
                        "TypedDict state schemas",
                        "State updates and reducers",
                        "Checkpointing for persistence",
                        "Human-in-the-loop breakpoints"
                    ]
                },
                {
                    name: "Advanced Patterns",
                    icon: Zap,
                    subtopics: [
                        "Parallel node execution",
                        "Subgraphs and composition",
                        "Dynamic routing based on LLM output",
                        "Streaming intermediate results"
                    ]
                }
            ],
            resources: {
                projectDescription: "Build a Content Pipeline that orchestrates 3 agents: Researcher gathers info, Writer creates content, Editor refines it. Uses LangGraph for state management and conditional routing.",
                packages: ["langgraph", "langchain", "langchain-openai"],
                links: [
                    { title: "LangGraph Quickstart", url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/", icon: BookOpen, iconColor: "text-blue-400", type: "Tutorial" },
                    { title: "LangGraph Concepts", url: "https://langchain-ai.github.io/langgraph/concepts/", icon: Layers, iconColor: "text-emerald-400", type: "Documentation" },
                    { title: "Human-in-the-Loop", url: "https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/breakpoints/", icon: Wrench, iconColor: "text-purple-400", type: "Guide" },
                    { title: "LangGraph Examples", url: "https://github.com/langchain-ai/langgraph/tree/main/examples", icon: Github, iconColor: "text-white", type: "Code Examples" }
                ]
            }
        },
        {
            week: 6,
            title: "Error Handling & Self-Correction",
            hours: "12-15 hrs",
            phase: "intermediate",
            project: "Self-Healing Code Agent",
            topics: [
                {
                    name: "Reflection Pattern",
                    icon: Zap,
                    subtopics: [
                        "Error analysis prompts",
                        "Self-critique and improvement",
                        "Retry strategies with context",
                        "Learning from failures"
                    ]
                },
                {
                    name: "Reliability Engineering",
                    icon: Server,
                    subtopics: [
                        "Exponential backoff",
                        "Circuit breaker pattern",
                        "Fallback strategies",
                        "Graceful degradation"
                    ]
                },
                {
                    name: "Cost Management",
                    icon: Wrench,
                    subtopics: [
                        "Token tracking and budgets",
                        "Max iteration limits",
                        "Model tiering (expensive for hard, cheap for easy)",
                        "Caching strategies"
                    ]
                }
            ],
            resources: {
                projectDescription: "Build a Self-Healing Code Agent that generates Python code, runs tests, and when tests fail, analyzes the error and automatically fixes the code. Implements the Reflection pattern.",
                packages: ["langchain", "langchain-openai", "pytest"],
                links: [
                    { title: "Reflexion Paper", url: "https://arxiv.org/abs/2303.11366", icon: FileCode2, iconColor: "text-purple-400", type: "Research Paper" },
                    { title: "LangChain Fallbacks", url: "https://python.langchain.com/docs/how_to/fallbacks/", icon: BookOpen, iconColor: "text-emerald-400", type: "Documentation" },
                    { title: "Error Handling Patterns", url: "https://langchain-ai.github.io/langgraph/how-tos/", icon: Layers, iconColor: "text-blue-400", type: "Guide" },
                    { title: "Cost Tracking (LangSmith)", url: "https://docs.smith.langchain.com/", icon: Wrench, iconColor: "text-yellow-400", type: "Tool" }
                ]
            }
        },
        {
            week: 7,
            title: "FastAPI Backend Development",
            hours: "15-18 hrs",
            phase: "intermediate",
            project: "Agent-as-a-Service API",
            topics: [
                {
                    name: "FastAPI Fundamentals",
                    icon: Server,
                    subtopics: [
                        "Route definitions and path parameters",
                        "Request/response models with Pydantic",
                        "Async/await patterns",
                        "Dependency injection"
                    ]
                },
                {
                    name: "Streaming Responses",
                    icon: Zap,
                    subtopics: [
                        "Server-Sent Events (SSE)",
                        "Streaming agent thoughts in real-time",
                        "WebSocket alternatives",
                        "Client-side handling"
                    ]
                },
                {
                    name: "API Design",
                    icon: Layers,
                    subtopics: [
                        "Job submission and polling patterns",
                        "Authentication (API keys, JWT)",
                        "Rate limiting",
                        "OpenAPI documentation"
                    ]
                }
            ],
            resources: {
                projectDescription: "Wrap your Content Pipeline in a production-ready FastAPI backend with streaming responses, job management, and automatic API documentation.",
                packages: ["fastapi", "uvicorn", "sse-starlette", "pydantic"],
                links: [
                    { title: "FastAPI Docs", url: "https://fastapi.tiangolo.com/", icon: BookOpen, iconColor: "text-emerald-400", type: "Documentation" },
                    { title: "LangChain + FastAPI", url: "https://python.langchain.com/docs/langserve/", icon: Layers, iconColor: "text-blue-400", type: "Integration Guide" },
                    { title: "SSE with FastAPI", url: "https://github.com/sysid/sse-starlette", icon: Github, iconColor: "text-white", type: "Library" },
                    { title: "LangServe", url: "https://github.com/langchain-ai/langserve", icon: Rocket, iconColor: "text-purple-400", type: "Framework" }
                ]
            }
        },
        {
            week: 8,
            title: "Deployment & Observability",
            hours: "12-15 hrs",
            phase: "intermediate",
            project: "Production Deployment + Monitoring",
            topics: [
                {
                    name: "Containerization",
                    icon: Server,
                    subtopics: [
                        "Dockerfile best practices",
                        "Multi-stage builds",
                        "Environment variables and secrets",
                        "Health checks"
                    ]
                },
                {
                    name: "Cloud Deployment",
                    icon: Rocket,
                    subtopics: [
                        "Railway / Render (simple)",
                        "AWS Lambda + API Gateway",
                        "Google Cloud Run",
                        "Kubernetes basics"
                    ]
                },
                {
                    name: "Observability",
                    icon: Layers,
                    subtopics: [
                        "LangSmith tracing setup",
                        "Langfuse (open-source alternative)",
                        "Cost and latency dashboards",
                        "Alerting on failures"
                    ]
                }
            ],
            resources: {
                projectDescription: "Dockerize your Agent API, deploy to a cloud platform, and set up LangSmith for full observability. You'll have a production-ready, monitored agent system.",
                packages: ["docker", "langsmith"],
                links: [
                    { title: "LangSmith Quickstart", url: "https://docs.smith.langchain.com/", icon: BookOpen, iconColor: "text-yellow-400", type: "Documentation" },
                    { title: "Langfuse", url: "https://langfuse.com/", icon: Layers, iconColor: "text-emerald-400", type: "Tool" },
                    { title: "Railway Deployment", url: "https://railway.app/", icon: Rocket, iconColor: "text-purple-400", type: "Platform" },
                    { title: "Docker for Python", url: "https://docs.docker.com/language/python/", icon: Server, iconColor: "text-blue-400", type: "Guide" }
                ]
            }
        }
    ],
    phase3: [
        {
            week: 9,
            title: "CrewAI & Role-Based Systems",
            hours: "15-18 hrs",
            phase: "advanced",
            project: "Startup Crew (CEO, Engineer, Marketer)",
            topics: [
                {
                    name: "CrewAI Framework",
                    icon: Layers,
                    subtopics: [
                        "Agents, Tasks, and Crews",
                        "Role, Goal, and Backstory design",
                        "Sequential vs hierarchical crews",
                        "Task delegation and handoff"
                    ]
                },
                {
                    name: "Role Engineering",
                    icon: Wrench,
                    subtopics: [
                        "Defining effective agent personas",
                        "Skill specialization",
                        "Inter-agent communication protocols",
                        "Conflict resolution"
                    ]
                },
                {
                    name: "Production Patterns",
                    icon: Server,
                    subtopics: [
                        "Crew caching and memory",
                        "Tool sharing between agents",
                        "Output parsing and validation",
                        "Crew-level error handling"
                    ]
                }
            ],
            resources: {
                projectDescription: "Build a Startup Crew with specialized agents: CEO (strategy), Engineer (implementation), Marketer (messaging). They collaborate to analyze a product idea and produce a go-to-market plan.",
                packages: ["crewai", "crewai-tools"],
                links: [
                    { title: "CrewAI Docs", url: "https://docs.crewai.com/", icon: BookOpen, iconColor: "text-cyan-400", type: "Documentation" },
                    { title: "CrewAI Examples", url: "https://github.com/joaomdmoura/crewAI-examples", icon: Github, iconColor: "text-white", type: "Code Examples" },
                    { title: "Agent Role Design", url: "https://www.crewai.com/blog", icon: GraduationCap, iconColor: "text-purple-400", type: "Blog" },
                    { title: "CrewAI YouTube", url: "https://www.youtube.com/@craborAI", icon: Play, iconColor: "text-red-400", type: "Video" }
                ]
            }
        },
        {
            week: 10,
            title: "Browser Automation & Computer Use",
            hours: "15-18 hrs",
            phase: "advanced",
            project: "Web Research Agent (navigates sites, fills forms)",
            topics: [
                {
                    name: "Browser Control",
                    icon: Layers,
                    subtopics: [
                        "Playwright setup and basics",
                        "Page navigation and interaction",
                        "Form filling and clicking",
                        "Screenshot and DOM extraction"
                    ]
                },
                {
                    name: "Computer Use APIs",
                    icon: Zap,
                    subtopics: [
                        "Claude Computer Use overview",
                        "OpenAI Operator patterns",
                        "Vision-based vs DOM-based control",
                        "Combining approaches"
                    ]
                },
                {
                    name: "Safety & Guardrails",
                    icon: Wrench,
                    subtopics: [
                        "Domain allowlisting",
                        "Action approval workflows",
                        "Session isolation",
                        "Anti-detection considerations"
                    ]
                }
            ],
            resources: {
                projectDescription: "Build a Web Research Agent that can navigate websites, extract information, fill forms, and compile research—all controlled by natural language commands.",
                packages: ["playwright", "browser-use"],
                links: [
                    { title: "Playwright Docs", url: "https://playwright.dev/python/", icon: BookOpen, iconColor: "text-emerald-400", type: "Documentation" },
                    { title: "Browser-Use Library", url: "https://github.com/browser-use/browser-use", icon: Github, iconColor: "text-white", type: "Library" },
                    { title: "Claude Computer Use", url: "https://docs.anthropic.com/en/docs/agents-and-tools/computer-use", icon: Zap, iconColor: "text-purple-400", type: "Documentation" },
                    { title: "Skyvern (Open Source)", url: "https://github.com/Skyvern-AI/skyvern", icon: Github, iconColor: "text-white", type: "Framework" }
                ]
            }
        },
        {
            week: 11,
            title: "Enterprise Security & Compliance",
            hours: "12-15 hrs",
            phase: "advanced",
            project: "Compliant Customer Support Agent",
            topics: [
                {
                    name: "Security Hardening",
                    icon: Server,
                    subtopics: [
                        "Permission systems and ACLs",
                        "Input validation and sanitization",
                        "Prompt injection defenses",
                        "Audit logging"
                    ]
                },
                {
                    name: "Data Privacy",
                    icon: Wrench,
                    subtopics: [
                        "PII detection and redaction",
                        "Data masking in prompts",
                        "GDPR/CCPA considerations",
                        "Data retention policies"
                    ]
                },
                {
                    name: "Compliance",
                    icon: Layers,
                    subtopics: [
                        "SOC 2 requirements for AI",
                        "Explainability and audit trails",
                        "Model governance",
                        "Incident response"
                    ]
                }
            ],
            resources: {
                projectDescription: "Enhance the Customer Support Agent from Part 8 with enterprise-grade security: PII detection, permission systems, audit logging, and prompt injection defenses.",
                packages: ["presidio-analyzer", "presidio-anonymizer"],
                links: [
                    { title: "OWASP LLM Top 10", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", icon: BookOpen, iconColor: "text-red-400", type: "Security Guide" },
                    { title: "Microsoft Presidio", url: "https://microsoft.github.io/presidio/", icon: Wrench, iconColor: "text-blue-400", type: "PII Tool" },
                    { title: "LLM Security Best Practices", url: "https://www.anthropic.com/research/many-shot-jailbreaking", icon: FileCode2, iconColor: "text-purple-400", type: "Research" },
                    { title: "Guardrails AI", url: "https://www.guardrailsai.com/", icon: Layers, iconColor: "text-emerald-400", type: "Framework" }
                ]
            }
        },
        {
            week: 12,
            title: "Capstone Project",
            hours: "20+ hrs",
            phase: "advanced",
            project: "Your Portfolio-Ready Agent System",
            topics: [
                {
                    name: "Project Planning",
                    icon: Target,
                    subtopics: [
                        "Choose your domain (Support, Code, Research, Sales)",
                        "Define scope and success criteria",
                        "Architecture design",
                        "Risk assessment"
                    ]
                },
                {
                    name: "Implementation",
                    icon: Code2,
                    subtopics: [
                        "Core agent development",
                        "Tool integration",
                        "UI/API layer",
                        "Testing and validation"
                    ]
                },
                {
                    name: "Portfolio Preparation",
                    icon: Rocket,
                    subtopics: [
                        "README and documentation",
                        "Demo video creation",
                        "Live deployment",
                        "Blog post or case study"
                    ]
                }
            ],
            resources: {
                projectDescription: "Apply everything you've learned to build a complete, end-to-end agent system of your choice. Document it thoroughly and share it with the world!",
                links: [
                    { title: "LangChain Templates", url: "https://github.com/langchain-ai/langchain-template", icon: Github, iconColor: "text-white", type: "Starter Template" },
                    { title: "Project Ideas", url: "https://github.com/Shubhamsaboo/awesome-llm-apps", icon: Sparkles, iconColor: "text-yellow-400", type: "Inspiration" },
                    { title: "Loom (Demo Videos)", url: "https://www.loom.com/", icon: Play, iconColor: "text-purple-400", type: "Tool" },
                    { title: "Dev.to (Blog)", url: "https://dev.to/", icon: BookOpen, iconColor: "text-emerald-400", type: "Publishing" }
                ]
            }
        }
    ]
};

export default function Part10_Resources() {
    const [openWeeks, setOpenWeeks] = useState([1]); // Week 1 open by default
    const [openPhases, setOpenPhases] = useState({ phase1: true, phase2: true, phase3: true });

    const toggleWeek = (week) => {
        setOpenWeeks(prev =>
            prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week]
        );
    };

    const togglePhase = (phase) => {
        setOpenPhases(prev => ({ ...prev, [phase]: !prev[phase] }));
    };

    return (
        <div className="space-y-16 pb-24 border-b border-slate-800">
            {/* Hero */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Part 10:</span> The Complete 90-Day Roadmap
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed font-light max-w-3xl">
                    A structured, week-by-week curriculum to take you from beginner to production-ready Agent Engineer.
                    Each week includes detailed topics, a hands-on project, and curated resources.
                </p>

                <InfoBox type="tip" title="How to Use This Roadmap">
                    <strong>Click any week to expand</strong> and see detailed topics, subtopics, the build project, and curated resources.
                    <strong>Estimated time: 10-15 hours per week.</strong> Go at your own pace—consistency beats speed.
                </InfoBox>
            </section>

            {/* PHASE 1 */}
            <section className="space-y-4">
                <PhaseHeader
                    icon={Target}
                    title="Phase 1: Foundations"
                    subtitle="Weeks 1-4 • ~45 Hours • Build 4 Agents"
                    color="emerald"
                    isExpanded={openPhases.phase1}
                    onToggle={() => togglePhase('phase1')}
                />
                {openPhases.phase1 && (
                    <div className="space-y-3 pl-4 border-l-2 border-emerald-500/30">
                        {roadmapData.phase1.map((week) => (
                            <WeekCard
                                key={week.week}
                                {...week}
                                isOpen={openWeeks.includes(week.week)}
                                onToggle={() => toggleWeek(week.week)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* PHASE 2 */}
            <section className="space-y-4">
                <PhaseHeader
                    icon={Zap}
                    title="Phase 2: Production Skills"
                    subtitle="Weeks 5-8 • ~55 Hours • Build & Deploy"
                    color="blue"
                    isExpanded={openPhases.phase2}
                    onToggle={() => togglePhase('phase2')}
                />
                {openPhases.phase2 && (
                    <div className="space-y-3 pl-4 border-l-2 border-blue-500/30">
                        {roadmapData.phase2.map((week) => (
                            <WeekCard
                                key={week.week}
                                {...week}
                                isOpen={openWeeks.includes(week.week)}
                                onToggle={() => toggleWeek(week.week)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* PHASE 3 */}
            <section className="space-y-4">
                <PhaseHeader
                    icon={Trophy}
                    title="Phase 3: Advanced & Specialization"
                    subtitle="Weeks 9-12 • ~60 Hours • Enterprise Ready"
                    color="purple"
                    isExpanded={openPhases.phase3}
                    onToggle={() => togglePhase('phase3')}
                />
                {openPhases.phase3 && (
                    <div className="space-y-3 pl-4 border-l-2 border-purple-500/30">
                        {roadmapData.phase3.map((week) => (
                            <WeekCard
                                key={week.week}
                                {...week}
                                isOpen={openWeeks.includes(week.week)}
                                onToggle={() => toggleWeek(week.week)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* CTA */}
            <div className="text-center space-y-6 pt-8">
                <Sparkles className="mx-auto text-teal-400" size={40} />
                <h3 className="text-3xl font-black text-white">Ready to Start Week 1?</h3>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Bookmark this page and begin your journey. Share your progress with me on Twitter/X!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#hands-on" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full font-bold text-white shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all">
                        <Rocket size={18} /> Go to Part 6: Hands-On
                    </a>
                </div>
            </div>
        </div>
    );
}
