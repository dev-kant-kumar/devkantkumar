import {
    ArrowRight, BookOpen,
    CheckCircle2, ChevronDown,
    ChevronRight, Code2, DollarSign, ExternalLink, FileSearch, Gavel,
    Headphones,
    ShoppingCart,
    Sparkles, Stethoscope, Target, TrendingUp,
    Users, Zap
} from "lucide-react";
import { useState } from "react";
import { CodeBlock, InfoBox } from './SharedComponents';

// Expandable Use Case Card
const UseCaseCard = ({
    icon: Icon, iconColor, bgColor, title, subtitle, stat,
    description, implementation, caseStudy, codeExample,
    isOpen, onToggle
}) => (
    <div className={`rounded-2xl border border-slate-700/50 overflow-hidden transition-all ${bgColor}`}>
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
                        <h4 className="font-bold text-white text-xl">{title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${iconColor.replace('text-', 'bg-').replace('400', '900/30')} ${iconColor}`}>{stat}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{subtitle}</p>
                </div>
            </div>
            {isOpen ? <ChevronDown className="text-slate-400 flex-shrink-0" size={20} /> : <ChevronRight className="text-slate-400 flex-shrink-0" size={20} />}
        </button>

        {isOpen && (
            <div className="px-6 pb-6 space-y-6 border-t border-slate-800/50">
                {/* Description */}
                <p className="pt-4 text-slate-400 leading-relaxed">{description}</p>

                {/* Case Study */}
                {caseStudy && (
                    <InfoBox type="info" title={`Case Study: ${caseStudy.company}`}>
                        {caseStudy.text}
                        {caseStudy.link && (
                            <a href={caseStudy.link} target="_blank" rel="noopener noreferrer"
                               className="flex items-center gap-1 text-cyan-400 mt-2 hover:underline">
                                Read More <ExternalLink size={14} />
                            </a>
                        )}
                    </InfoBox>
                )}

                {/* Implementation Steps */}
                <div className="space-y-3">
                    <h4 className="font-bold text-white flex items-center gap-2">
                        <Target size={16} className={iconColor} /> Implementation
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        {implementation.map((step, i) => (
                            <div key={i} className="flex gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${iconColor.replace('text-', 'bg-').replace('400', '500/20')} ${iconColor}`}>
                                    {i + 1}
                                </div>
                                <div>
                                    <div className="font-medium text-white text-sm">{step.title}</div>
                                    <div className="text-slate-500 text-xs">{step.desc}</div>
                                </div>
                            </div>
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
            </div>
        )}
    </div>
);

// ROI Metric Card
const ROICard = ({ label, value, subtext, icon: Icon }) => (
    <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 text-center">
        <Icon className="text-pink-400 mx-auto mb-3" size={24} />
        <div className="text-3xl font-black text-white mb-1">{value}</div>
        <div className="text-slate-400 text-sm">{label}</div>
        {subtext && <div className="text-slate-500 text-xs mt-1">{subtext}</div>}
    </div>
);

export default function Part8_UseCases() {
    const [openCases, setOpenCases] = useState(['support']);

    const toggleCase = (id) => {
        setOpenCases(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const useCases = [
        {
            id: 'support',
            icon: Headphones,
            iconColor: 'text-cyan-400',
            bgColor: 'bg-cyan-950/10',
            title: 'Customer Support Automation',
            subtitle: 'Resolve tickets without human intervention',
            stat: '70% Auto-Resolution',
            description: 'Not just a chatbot. A true agentic support system can check order status in Shopify, issue a refund in Stripe, reset passwords, and email users—all autonomously. This is the #1 deployed use case for enterprise agents in 2025.',
            caseStudy: {
                company: 'Klarna',
                text: 'In 2024, Klarna reported their AI assistant handles 2.3 million customer conversations monthly—equivalent to 700 full-time agents. It processes refunds, updates accounts, and resolves tickets with 90%+ satisfaction.',
                link: 'https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/'
            },
            implementation: [
                { title: 'Intent Classification', desc: 'Route queries to specialized handlers' },
                { title: 'Tool Integration', desc: 'Connect to Shopify, Stripe, Auth systems' },
                { title: 'ReAct Orchestration', desc: 'Agent reasons and acts in a loop' },
                { title: 'Human Handoff', desc: 'Escalate low-confidence cases' }
            ],
            codeExample: {
                filename: 'support_agent.py',
                code: `from langchain.tools import tool
from langchain.agents import create_tool_calling_agent, AgentExecutor

@tool
def get_order_status(order_id: str) -> str:
    """Fetch order status from Shopify."""
    order = shopify.Order.find(order_id)
    return f"Order {order_id}: {order.fulfillment_status}"

@tool
def issue_refund(order_id: str, reason: str) -> str:
    """Process a refund via Stripe."""
    order = shopify.Order.find(order_id)
    refund = stripe.Refund.create(payment_intent=order.payment_id)
    return f"Refund of $" + "{refund.amount/100} processed"

@tool
def escalate_to_human(summary: str) -> str:
    """Create a ticket for human review."""
    ticket = zendesk.create_ticket(summary=summary, priority="high")
    return f"Escalated. Ticket #{ticket.id} created."

tools = [get_order_status, issue_refund, escalate_to_human]
agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)`
            }
        },
        {
            id: 'codegen',
            icon: Code2,
            iconColor: 'text-purple-400',
            bgColor: 'bg-purple-950/10',
            title: 'Code Review & Test Generation',
            subtitle: 'Automate PR reviews and test coverage',
            stat: '40% Time Saved',
            description: 'An agent that reads Pull Requests, writes unit tests for new code, runs them in a sandbox, and auto-fixes simple bugs before a human reviews. Used internally at Google, Meta, and Anthropic.',
            caseStudy: {
                company: 'GitHub Copilot',
                text: 'GitHub reports developers using Copilot complete tasks 55% faster. The newer Copilot Workspace can plan entire features, generate code across files, and run tests autonomously.',
                link: 'https://github.blog/2024-04-29-github-copilot-workspace/'
            },
            implementation: [
                { title: 'Parse PR Diff', desc: 'Extract changed functions and context' },
                { title: 'Generate Tests', desc: 'Create pytest/jest covering edge cases' },
                { title: 'Execute Sandbox', desc: 'Run tests in isolated Docker container' },
                { title: 'Self-Correct', desc: 'If tests fail, attempt auto-fix' }
            ],
            codeExample: {
                filename: 'code_review_agent.py',
                code: `def review_pull_request(pr_diff: str) -> dict:
    # 1. Analyze the diff
    analysis = llm.invoke(f"Analyze this PR diff for issues:\\n{pr_diff}")

    # 2. Generate tests for new functions
    new_functions = extract_functions(pr_diff)
    tests = []
    for fn in new_functions:
        test_code = llm.invoke(f"Write pytest tests for:\\n{fn}")
        tests.append(test_code)

    # 3. Run tests in sandbox
    results = []
    for test in tests:
        passed, output = run_in_sandbox(test)
        if not passed:
            # 4. Attempt self-correction
            fix = llm.invoke(f"Fix this failing test:\\n{output}")
            results.append({"status": "fixed", "fix": fix})
        else:
            results.append({"status": "passed"})

    return {"analysis": analysis, "test_results": results}`
            }
        },
        {
            id: 'sales',
            icon: ShoppingCart,
            iconColor: 'text-emerald-400',
            bgColor: 'bg-emerald-950/10',
            title: 'Sales Outreach & Lead Qualification',
            subtitle: 'Personalized outreach at scale',
            stat: '3x Reply Rates',
            description: 'Agents that research prospects on LinkedIn, craft personalized emails, send follow-ups, and qualify leads based on responses. Handles the top of the funnel so reps focus on closing.',
            caseStudy: {
                company: '11x.ai (Alice)',
                text: '11x.ai\'s Alice SDR agent has been deployed at 100+ companies. It researches prospects, writes personalized outreach, handles objections, and books meetings—generating $50M+ in pipeline.',
                link: 'https://www.11x.ai/'
            },
            implementation: [
                { title: 'Prospect Research', desc: 'Scrape LinkedIn, company websites' },
                { title: 'Personalization', desc: 'Generate custom email based on research' },
                { title: 'Send & Track', desc: 'Use email API, track opens/replies' },
                { title: 'Qualify & Route', desc: 'Score responses, book meetings' }
            ],
            codeExample: {
                filename: 'sales_agent.py',
                code: `@tool
def research_prospect(linkedin_url: str) -> str:
    """Research a prospect from their LinkedIn profile."""
    profile = scrape_linkedin(linkedin_url)
    return f"Name: {profile.name}, Role: {profile.title}, Company: {profile.company}"

@tool
def generate_outreach(prospect_info: str, product: str) -> str:
    """Generate personalized cold email."""
    email = llm.invoke(f"""
        Write a cold email for:
        Prospect: {prospect_info}
        Product: {product}
        Keep it under 100 words, mention one specific detail about them.
    """)
    return email.content

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Send email via SendGrid."""
    response = sendgrid.send(to=to, subject=subject, body=body)
    return f"Email sent to {to}. Message ID: {response.id}"`
            }
        },
        {
            id: 'research',
            icon: FileSearch,
            iconColor: 'text-blue-400',
            bgColor: 'bg-blue-950/10',
            title: 'Research & Report Generation',
            subtitle: 'Deep research in minutes, not hours',
            stat: '10x Faster',
            description: 'Agents that search multiple sources, synthesize findings, fact-check claims, and generate structured reports. Used by analysts, consultants, and researchers.',
            caseStudy: {
                company: 'Perplexity',
                text: 'Perplexity\'s research agent searches the web in real-time, synthesizes sources, and provides cited answers. It processes 100M+ queries monthly and is valued at $9B.',
                link: 'https://www.perplexity.ai/'
            },
            implementation: [
                { title: 'Query Decomposition', desc: 'Break complex question into sub-queries' },
                { title: 'Multi-Source Search', desc: 'Search Tavily, academic DBs, news' },
                { title: 'Synthesize & Cite', desc: 'Combine findings with source links' },
                { title: 'Format Report', desc: 'Generate structured document' }
            ],
            codeExample: {
                filename: 'research_agent.py',
                code: `from langchain_community.tools.tavily_search import TavilySearchResults

@tool
def search_web(query: str) -> str:
    """Search the web for current information."""
    search = TavilySearchResults(max_results=5)
    results = search.invoke(query)
    return format_results(results)

@tool
def search_academic(query: str) -> str:
    """Search academic papers on Semantic Scholar."""
    papers = semantic_scholar.search(query, limit=5)
    return format_papers(papers)

def research_topic(topic: str) -> str:
    # 1. Decompose into sub-questions
    questions = llm.invoke(f"Break this into 3 research questions: {topic}")

    # 2. Search for each
    findings = []
    for q in questions:
        web_results = search_web(q)
        academic_results = search_academic(q)
        findings.append(synthesize(web_results, academic_results))

    # 3. Generate report
    return llm.invoke(f"Create a report from: {findings}")`
            }
        },
        {
            id: 'legal',
            icon: Gavel,
            iconColor: 'text-amber-400',
            bgColor: 'bg-amber-950/10',
            title: 'Legal Document Analysis',
            subtitle: 'Contract review and due diligence',
            stat: '80% Cost Reduction',
            description: 'Agents that read contracts, flag risky clauses, compare against templates, and generate redlines. Handles the grunt work so lawyers focus on strategy.',
            caseStudy: {
                company: 'Harvey AI',
                text: 'Harvey AI has raised $100M+ and is deployed at top law firms including A&O. It reviews contracts, researches case law, and drafts documents—saving junior associate hours.',
                link: 'https://www.harvey.ai/'
            },
            implementation: [
                { title: 'Document Ingestion', desc: 'Parse PDFs, extract text and structure' },
                { title: 'Clause Extraction', desc: 'Identify key clauses (indemnity, liability)' },
                { title: 'Risk Analysis', desc: 'Compare against standard templates' },
                { title: 'Redline Generation', desc: 'Suggest changes with comments' }
            ],
            codeExample: {
                filename: 'legal_agent.py',
                code: `@tool
def extract_clauses(document: str) -> str:
    """Extract key clauses from a legal document."""
    clauses = llm.invoke(f"""
        Extract these clauses from the document:
        - Limitation of Liability
        - Indemnification
        - Termination
        - Confidentiality

        Document: {document}
    """)
    return clauses.content

@tool
def analyze_risk(clause: str, template: str) -> str:
    """Compare clause against standard template and flag risks."""
    analysis = llm.invoke(f"""
        Compare this clause to our template. Flag any risks:
        Clause: {clause}
        Template: {template}
    """)
    return analysis.content`
            }
        },
        {
            id: 'healthcare',
            icon: Stethoscope,
            iconColor: 'text-red-400',
            bgColor: 'bg-red-950/10',
            title: 'Healthcare Triage & Documentation',
            subtitle: 'Pre-screening and clinical notes',
            stat: '99% Accuracy in Pilots',
            description: 'Agents that pre-screen patients, summarize 50-page medical histories into 1-page briefs, schedule appointments, and draft clinical notes for physician review.',
            caseStudy: {
                company: 'Abridge',
                text: 'Abridge\'s AI listens to patient-doctor conversations and generates structured clinical notes in real-time. It\'s deployed in major health systems and saves 2+ hours of documentation daily.',
                link: 'https://www.abridge.com/'
            },
            implementation: [
                { title: 'Symptom Collection', desc: 'Conversational intake via voice/chat' },
                { title: 'History Summarization', desc: 'Compress EHR data into brief' },
                { title: 'Triage Classification', desc: 'Urgency scoring with routing' },
                { title: 'Note Generation', desc: 'Draft SOAP notes for review' }
            ],
            codeExample: null
        }
    ];

    return (
        <div className="space-y-20">
            {/* Header */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">Part 8:</span> Real-World Use Cases
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed font-light max-w-3xl">
                    Theory is great, but who is actually making money with this?
                    <strong className="text-white"> Here are 6 high-impact use cases with implementation details, case studies, and code.</strong>
                </p>

                {/* ROI Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <ROICard icon={DollarSign} value="$199B" label="Market by 2030" subtext="McKinsey 2024" />
                    <ROICard icon={Users} value="70%" label="Support Auto-Resolution" subtext="Industry average" />
                    <ROICard icon={Zap} value="10x" label="Research Speed" subtext="Analyst tasks" />
                    <ROICard icon={TrendingUp} value="3x" label="Sales Reply Rates" subtext="With personalization" />
                </div>
            </section>

            {/* Use Cases */}
            <section className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <Sparkles className="text-pink-400" />
                    Deep Dive: 6 Production Use Cases
                </h3>
                <p className="text-slate-400 text-sm">Click each use case to expand implementation details and code.</p>

                <div className="space-y-3">
                    {useCases.map((uc) => (
                        <UseCaseCard
                            key={uc.id}
                            {...uc}
                            isOpen={openCases.includes(uc.id)}
                            onToggle={() => toggleCase(uc.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Key Insights */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <BookOpen className="text-pink-400" />
                    Key Insights Across Use Cases
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-white mb-3">What Works</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5" />
                                <span>High-volume, rules-based tasks (support, triage)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5" />
                                <span>Clear success criteria and feedback loops</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5" />
                                <span>Human-in-the-loop for edge cases</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5" />
                                <span>Starting with internal tools before customer-facing</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-white mb-3">What Doesn't Work (Yet)</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="text-red-400">×</span>
                                <span>Fully autonomous high-stakes decisions (medical diagnosis)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400">×</span>
                                <span>Tasks requiring common sense reasoning</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400">×</span>
                                <span>Domains with no structured data or APIs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-400">×</span>
                                <span>Replacing all human judgment</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center pt-8">
                <a href="#hands-on" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full font-bold text-white shadow-lg hover:shadow-pink-500/25 transform hover:-translate-y-1 transition-all">
                    Ready to build? Go to Hands-On Tutorial <ArrowRight size={18} />
                </a>
            </div>
        </div>
    );
}
