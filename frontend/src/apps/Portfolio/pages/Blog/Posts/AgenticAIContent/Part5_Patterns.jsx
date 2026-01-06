import {
    ArrowRight, Brain, CheckCircle2, ChevronDown, ChevronRight,
    Copy,
    GitBranch, Layers,
    RefreshCw, Route, Shield,
    Sparkles, Target, User, Wrench
} from "lucide-react";
import { useState } from "react";
import { CodeBlock, InfoBox, ReActLiveTerminal } from './SharedComponents';

// Expandable Pattern Card
const PatternCard = ({
    id, icon: Icon, iconColor, title, subtitle, description,
    whenToUse, codeExample, tips,
    isOpen, onToggle
}) => (
    <div className="rounded-2xl border border-slate-700/50 overflow-hidden transition-all bg-slate-900/30">
        <button
            onClick={onToggle}
            className="w-full p-5 flex items-start justify-between hover:bg-white/5 transition-colors text-left"
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-slate-900 ${iconColor} border border-slate-700 flex-shrink-0`}>
                    <Icon size={24} />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h4 className="font-bold text-white text-lg">{title}</h4>
                        <span className="text-xs text-slate-500">{subtitle}</span>
                    </div>
                    <p className="text-slate-400 text-sm max-w-2xl">{description}</p>
                </div>
            </div>
            {isOpen ? <ChevronDown className="text-slate-400 flex-shrink-0" size={20} /> : <ChevronRight className="text-slate-400 flex-shrink-0" size={20} />}
        </button>

        {isOpen && (
            <div className="px-5 pb-5 pt-4 space-y-5 border-t border-slate-800/50">
                {/* When to Use */}
                <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    <div className="text-xs text-emerald-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                        <Target size={12} /> When to Use
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-300">
                        {whenToUse.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Code Example */}
                <CodeBlock
                    language="python"
                    filename={codeExample.filename}
                    code={codeExample.code}
                />

                {/* Tips */}
                {tips && (
                    <InfoBox type="tip" title="Pro Tips">
                        <ul className="mt-2 space-y-1 text-sm">
                            {tips.map((tip, i) => (
                                <li key={i}>• {tip}</li>
                            ))}
                        </ul>
                    </InfoBox>
                )}
            </div>
        )}
    </div>
);

export default function Part5_Patterns() {
    const [openPatterns, setOpenPatterns] = useState(['react']);

    const togglePattern = (id) => {
        setOpenPatterns(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const patterns = [
        {
            id: 'react',
            icon: RefreshCw,
            iconColor: 'text-emerald-400',
            title: '5.1 ReAct (Reason + Act)',
            subtitle: 'Foundational',
            description: 'The agent explicitly writes Thought → Action → Observation in a loop until it reaches a final answer.',
            whenToUse: [
                'General-purpose agent tasks',
                'When you need transparent reasoning',
                'Multi-step problems requiring tool use',
                'Debugging—the thought process is visible'
            ],
            codeExample: {
                filename: 'react_loop.py',
                code: `from langchain_openai import ChatOpenAI
from langchain import hub
from langchain.agents import create_react_agent, AgentExecutor
from langchain_community.tools.tavily_search import TavilySearchResults

llm = ChatOpenAI(model="gpt-4o")
tools = [TavilySearchResults(max_results=3)]

# Pull the standard ReAct prompt
prompt = hub.pull("hwchase17/react")

# Create agent
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Run with verbose=True to see Thought/Action/Observation
result = executor.invoke({"input": "What's the latest news about SpaceX Starship?"})
print(result["output"])`
            },
            tips: [
                'Always set verbose=True during development',
                'Limit max iterations to prevent infinite loops',
                'The ReAct prompt template matters—customize it for your domain'
            ]
        },
        {
            id: 'planning',
            icon: Target,
            iconColor: 'text-blue-400',
            title: '5.2 Plan-and-Execute',
            subtitle: 'Strategic',
            description: 'First generate a high-level plan, then execute each step. Better for complex, multi-stage tasks.',
            whenToUse: [
                'Multi-step tasks that benefit from upfront planning',
                'When you want to show a plan to users before executing',
                'Research or report generation',
                'Tasks where the order of steps matters'
            ],
            codeExample: {
                filename: 'plan_and_execute.py',
                code: `from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-4o")

def plan_and_execute(task: str):
    # Step 1: Generate a plan
    plan_response = llm.invoke([
        SystemMessage(content="""You are a strategic planner. Given a task, break it down into 3-5 specific, actionable steps. Output as a numbered list."""),
        HumanMessage(content=f"Task: {task}")
    ])
    plan = plan_response.content
    print(f"📋 PLAN:\\n{plan}\\n")

    # Step 2: Execute each step
    steps = [s.strip() for s in plan.split("\\n") if s.strip() and s[0].isdigit()]
    results = []

    for i, step in enumerate(steps, 1):
        print(f"🔄 Executing Step {i}: {step}")
        step_result = llm.invoke([
            SystemMessage(content="Execute this step and provide the result."),
            HumanMessage(content=f"Step: {step}\\n\\nPrevious results: {results}")
        ])
        results.append(step_result.content)
        print(f"✅ Result: {step_result.content[:100]}...\\n")

    return results

# Usage
plan_and_execute("Research and write a 500-word blog post about AI agents in 2025")`
            },
            tips: [
                'Show the plan to users for approval before execution',
                'Allow plan revision based on intermediate results',
                'Good for tasks where you want human-in-the-loop oversight'
            ]
        },
        {
            id: 'reflection',
            icon: GitBranch,
            iconColor: 'text-pink-400',
            title: '5.3 Reflection (Self-Correction)',
            subtitle: 'Error Recovery',
            description: 'When an action fails, the agent analyzes what went wrong and generates a corrected approach.',
            whenToUse: [
                'Code generation that needs to pass tests',
                'Tasks with high failure rates',
                'When you want automatic retry with improvement',
                'Complex multi-step workflows'
            ],
            codeExample: {
                filename: 'reflection_pattern.py',
                code: `from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-4o")

def execute_with_reflection(task: str, max_attempts: int = 3):
    attempt = 0
    context = ""

    while attempt < max_attempts:
        attempt += 1
        print(f"\\n🔄 Attempt {attempt}/{max_attempts}")

        try:
            # Generate solution considering past failures
            response = llm.invoke([
                SystemMessage(content="You are a helpful assistant. Learn from any past errors."),
                HumanMessage(content=f"Task: {task}\\n\\n{context}")
            ])
            result = response.content

            # Validate the result (your custom validation logic)
            validate(result)  # Raises exception if invalid

            print(f"✅ Success on attempt {attempt}")
            return result

        except Exception as e:
            error = str(e)
            print(f"❌ Failed: {error}")

            # REFLECTION: Analyze what went wrong
            reflection = llm.invoke([
                SystemMessage(content="Analyze this error. What went wrong and how should we fix it?"),
                HumanMessage(content=f"Task: {task}\\nAttempt: {attempt}\\nError: {error}")
            ])

            # Add reflection to context for next attempt
            context += f"\\n\\nAttempt {attempt} failed: {error}\\nReflection: {reflection.content}"
            print(f"🤔 Reflection: {reflection.content[:150]}...")

    raise Exception(f"Failed after {max_attempts} attempts")`
            },
            tips: [
                'Cap max attempts to prevent infinite loops',
                'Include the error AND the reflection in the next attempt',
                'Use a cheaper model for reflection to save costs'
            ]
        },
        {
            id: 'routing',
            icon: Route,
            iconColor: 'text-amber-400',
            title: '5.4 Semantic Routing',
            subtitle: 'Intent Classification',
            description: 'Route user requests to different agents or workflows based on intent classification.',
            whenToUse: [
                'Multi-domain support systems',
                'When different requests need different handling',
                'Optimizing for cost (route simple queries to cheaper models)',
                'Customer service with specialized departments'
            ],
            codeExample: {
                filename: 'semantic_routing.py',
                code: `from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from enum import Enum

llm = ChatOpenAI(model="gpt-4o-mini")  # Fast model for routing

class Route(Enum):
    TECHNICAL = "technical"
    BILLING = "billing"
    SALES = "sales"
    GENERAL = "general"

def classify_intent(query: str) -> Route:
    """Classify user query into a route."""
    response = llm.invoke([
        SystemMessage(content="""Classify this query into one category:
- TECHNICAL: bugs, errors, how-to questions
- BILLING: payments, invoices, refunds
- SALES: pricing, plans, upgrades
- GENERAL: anything else

Respond with just the category name."""),
        HumanMessage(content=query)
    ])
    return Route(response.content.strip().lower())

def handle_query(query: str):
    route = classify_intent(query)
    print(f"🔀 Routing to: {route.value}")

    # Route to specialized handler
    handlers = {
        Route.TECHNICAL: technical_agent,
        Route.BILLING: billing_agent,
        Route.SALES: sales_agent,
        Route.GENERAL: general_agent,
    }
    return handlers[route](query)

# Example specialized handlers
def technical_agent(q): return f"[Technical] Searching docs for: {q}"
def billing_agent(q): return f"[Billing] Checking account for: {q}"
def sales_agent(q): return f"[Sales] Preparing quote for: {q}"
def general_agent(q): return f"[General] I can help with: {q}"`
            },
            tips: [
                'Use a fast, cheap model for classification',
                'Include fallback/general route for edge cases',
                'Log routing decisions for analysis'
            ]
        },
        {
            id: 'tools',
            icon: Wrench,
            iconColor: 'text-orange-400',
            title: '5.5 Tool Definition',
            subtitle: 'Core Building Block',
            description: 'Clean patterns for defining tools that work across LangChain, OpenAI, and Anthropic.',
            whenToUse: [
                'Any agent that needs to interact with APIs',
                'When you want structured tool inputs',
                'Building reusable tool libraries',
                'Cross-framework compatibility'
            ],
            codeExample: {
                filename: 'tool_patterns.py',
                code: `from langchain.tools import tool
from pydantic import BaseModel, Field
from typing import Optional

# Pattern 1: Simple function tool
@tool
def search_web(query: str) -> str:
    """Search the web for current information. Use for news, facts, or recent events."""
    # Your search implementation
    return f"Results for: {query}"

# Pattern 2: Pydantic schema for complex inputs
class CreateTaskInput(BaseModel):
    """Schema for creating a new task."""
    title: str = Field(description="The task title")
    priority: str = Field(description="Priority: low, medium, or high")
    due_date: Optional[str] = Field(None, description="Due date in YYYY-MM-DD format")

@tool(args_schema=CreateTaskInput)
def create_task(title: str, priority: str, due_date: Optional[str] = None) -> str:
    """Create a new task in the task management system. Use when user wants to add a todo."""
    return f"Created task: {title} (Priority: {priority}, Due: {due_date or 'None'})"

# Pattern 3: Tool with error handling
@tool
def divide_numbers(a: float, b: float) -> str:
    """Divide two numbers. Returns the result or an error message."""
    if b == 0:
        return "Error: Cannot divide by zero"
    return str(a / b)

# Register all tools
tools = [search_web, create_task, divide_numbers]`
            },
            tips: [
                'Docstrings are CRITICAL—the LLM reads them to decide when to use tools',
                'Always handle errors gracefully within tools',
                'Use Pydantic for tools with 3+ parameters'
            ]
        },
        {
            id: 'human',
            icon: User,
            iconColor: 'text-purple-400',
            title: '5.6 Human-in-the-Loop (HITL)',
            subtitle: 'Safety Critical',
            description: 'Pause agent execution at key points for human approval before continuing.',
            whenToUse: [
                'Destructive operations (delete, send, purchase)',
                'High-stakes decisions',
                'Compliance requirements',
                'Building user trust with a new system'
            ],
            codeExample: {
                filename: 'human_in_loop.py',
                code: `from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict

class State(TypedDict):
    query: str
    draft_email: str
    approved: bool

def draft_email(state: State) -> State:
    # Agent drafts the email
    draft = f"Dear Customer, regarding '{state['query']}'..."
    return {"draft_email": draft}

def send_email(state: State) -> State:
    if state["approved"]:
        print(f"📧 SENDING: {state['draft_email']}")
        # Actually send the email
    return state

def check_approval(state: State) -> str:
    # Route based on approval status
    return "send" if state.get("approved") else "wait"

# Build graph with human checkpoint
workflow = StateGraph(State)
workflow.add_node("draft", draft_email)
workflow.add_node("send", send_email)

workflow.set_entry_point("draft")
workflow.add_conditional_edges("draft", check_approval, {"send": "send", "wait": END})
workflow.add_edge("send", END)

# Compile with checkpointing (enables resume)
memory = MemorySaver()
app = workflow.compile(checkpointer=memory, interrupt_before=["send"])

# Usage:
# 1. Run until interrupt: app.invoke({"query": "refund request"}, config)
# 2. Show draft to human, get approval
# 3. Update state with approved=True
# 4. Resume: app.invoke(None, config)  # Continues from checkpoint`
            },
            tips: [
                'Use LangGraph checkpointing for proper state persistence',
                'Log all human decisions for audit trails',
                'Timeout long-pending approvals'
            ]
        },
        {
            id: 'context',
            icon: Layers,
            iconColor: 'text-cyan-400',
            title: '5.7 Context Window Management',
            subtitle: 'Scalability',
            description: 'Strategies to prevent context overflow in long-running agents.',
            whenToUse: [
                'Long conversations (10+ turns)',
                'Agents processing large documents',
                'Multi-step workflows with lots of intermediate data',
                'Cost optimization (smaller context = cheaper)'
            ],
            codeExample: {
                filename: 'context_management.py',
                code: `from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")  # Cheap model for summarization

def sliding_window(messages: list, window_size: int = 10) -> list:
    """Keep only the last N messages."""
    if len(messages) <= window_size:
        return messages
    return messages[-window_size:]

def summarize_and_trim(messages: list, max_messages: int = 15) -> list:
    """Summarize older messages when context grows too large."""
    if len(messages) <= max_messages:
        return messages

    # Split into old and recent
    split_at = len(messages) // 2
    old_messages = messages[:split_at]
    recent_messages = messages[split_at:]

    # Summarize old messages
    old_text = "\\n".join([f"{m['role']}: {m['content']}" for m in old_messages])
    summary = llm.invoke(f"Summarize this conversation briefly:\\n{old_text}").content

    # Return summary + recent messages
    return [{"role": "system", "content": f"Previous context: {summary}"}] + recent_messages

def token_budget_trim(messages: list, max_tokens: int = 8000) -> list:
    """Trim messages to fit within token budget."""
    import tiktoken
    enc = tiktoken.encoding_for_model("gpt-4o")

    total_tokens = 0
    kept = []

    # Keep messages from most recent, working backward
    for msg in reversed(messages):
        msg_tokens = len(enc.encode(msg["content"]))
        if total_tokens + msg_tokens > max_tokens:
            break
        kept.insert(0, msg)
        total_tokens += msg_tokens

    return kept`
            },
            tips: [
                'Use tiktoken to count tokens accurately',
                'Summarize with a fast, cheap model (gpt-4o-mini)',
                'Keep system prompts and recent messages, drop the middle'
            ]
        },
        {
            id: 'guardrails',
            icon: Shield,
            iconColor: 'text-red-400',
            title: '5.8 Guardrails & Safety',
            subtitle: 'Production Required',
            description: 'Validate inputs and outputs to prevent harmful or incorrect agent behavior.',
            whenToUse: [
                'Any production agent',
                'Agents with external access (APIs, databases)',
                'Handling user-generated content',
                'Compliance and safety-critical applications'
            ],
            codeExample: {
                filename: 'guardrails.py',
                code: `from langchain_openai import ChatOpenAI
import re

llm = ChatOpenAI(model="gpt-4o-mini")

# Guardrail 1: Input validation
def validate_input(user_input: str) -> str:
    """Sanitize and validate user input."""
    # Check length
    if len(user_input) > 10000:
        raise ValueError("Input too long")

    # Check for injection patterns
    injection_patterns = [
        r"ignore.*previous.*instructions",
        r"system.*prompt",
        r"you are now",
    ]
    for pattern in injection_patterns:
        if re.search(pattern, user_input.lower()):
            raise ValueError("Potentially malicious input detected")

    return user_input.strip()

# Guardrail 2: Output validation
def validate_output(output: str, context: str) -> str:
    """Ensure output is appropriate."""
    # Check for hallucinated URLs or emails
    urls = re.findall(r'https?://\\S+', output)
    for url in urls:
        if not is_valid_url(url):  # Your validation function
            output = output.replace(url, "[INVALID URL REMOVED]")

    # Check for PII leakage
    if contains_pii(output):  # Your PII detection function
        raise ValueError("Output contains PII")

    return output

# Guardrail 3: Action limits
class ActionLimiter:
    def __init__(self, max_actions: int = 20, max_cost: float = 1.0):
        self.action_count = 0
        self.total_cost = 0.0
        self.max_actions = max_actions
        self.max_cost = max_cost

    def check(self, estimated_cost: float = 0.01):
        self.action_count += 1
        self.total_cost += estimated_cost

        if self.action_count > self.max_actions:
            raise RuntimeError(f"Max actions exceeded: {self.max_actions}")
        if self.total_cost > self.max_cost:
            raise RuntimeError(f"Cost budget exceeded: ${self.max_cost}")

# Usage
limiter = ActionLimiter(max_actions=15, max_cost=0.50)`
            },
            tips: [
                'Validate BOTH input and output',
                'Set hard limits on actions and cost from day 1',
                'Log all blocked/sanitized content for analysis',
                'Use regex for pattern-based detection, LLM for semantic checks'
            ]
        }
    ];

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Part 5:</span> Design Patterns
                </h2>

                <p className="text-xl text-slate-300 leading-relaxed font-light">
                    Just as React.js has "Hooks" and "Context", Agentic Engineering has its own proven patterns.
                    <strong className="text-white"> Mastering these separates demos from production systems.</strong>
                </p>

                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center gap-3">
                    <Copy className="text-emerald-400 flex-shrink-0" size={20} />
                    <span className="text-emerald-300 text-sm">All code snippets are <strong>copy-paste ready</strong>. Click any pattern to expand.</span>
                </div>

                {/* Pattern Overview Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                    {[
                        { name: 'ReAct', icon: RefreshCw, color: 'text-emerald-400' },
                        { name: 'Plan', icon: Target, color: 'text-blue-400' },
                        { name: 'Reflect', icon: GitBranch, color: 'text-pink-400' },
                        { name: 'Route', icon: Route, color: 'text-amber-400' },
                        { name: 'Tools', icon: Wrench, color: 'text-orange-400' },
                        { name: 'HITL', icon: User, color: 'text-purple-400' },
                        { name: 'Context', icon: Layers, color: 'text-cyan-400' },
                        { name: 'Guards', icon: Shield, color: 'text-red-400' }
                    ].map((p, i) => (
                        <div key={i} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
                            <p.icon className={p.color} size={16} />
                            <span className="text-slate-300 text-sm font-medium">{p.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Live ReAct Demo */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                    <Sparkles className="text-emerald-400" size={18} />
                    Live Demo: ReAct Loop in Action
                </h3>
                <ReActLiveTerminal />
            </section>

            {/* All Patterns */}
            <section className="space-y-4">
                {patterns.map((pattern) => (
                    <PatternCard
                        key={pattern.id}
                        {...pattern}
                        isOpen={openPatterns.includes(pattern.id)}
                        onToggle={() => togglePattern(pattern.id)}
                    />
                ))}
            </section>

            {/* Summary */}
            <section className="bg-gradient-to-br from-emerald-950/30 to-cyan-950/30 p-8 rounded-2xl border border-emerald-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Brain className="text-emerald-400" /> Pattern Selection Cheat Sheet
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-300">
                            <ArrowRight size={12} className="text-emerald-400" />
                            <span><strong>Simple task?</strong> → ReAct</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <ArrowRight size={12} className="text-emerald-400" />
                            <span><strong>Complex multi-step?</strong> → Plan-and-Execute</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <ArrowRight size={12} className="text-emerald-400" />
                            <span><strong>Failures expected?</strong> → Reflection</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <ArrowRight size={12} className="text-emerald-400" />
                            <span><strong>Multi-domain?</strong> → Semantic Routing</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-300">
                            <ArrowRight size={12} className="text-emerald-400" />
                            <span><strong>High-stakes?</strong> → Human-in-the-Loop</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <ArrowRight size={12} className="text-emerald-400" />
                            <span><strong>Long conversations?</strong> → Context Management</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <ArrowRight size={12} className="text-emerald-400" />
                            <span><strong>Production?</strong> → Guardrails (always)</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <ArrowRight size={12} className="text-emerald-400" />
                            <span><strong>Need APIs?</strong> → Tool Definition patterns</span>
                        </div>
                    </div>
                </div>
            </section>

            <InfoBox type="warning" title="Critical: Combine Patterns">
                Real production agents combine multiple patterns. A typical setup:
                <strong> Routing → ReAct (with Tools) → Reflection → Human Approval → Guardrails on output.</strong>
                Don't pick one—layer them appropriately.
            </InfoBox>
        </div>
    );
}
