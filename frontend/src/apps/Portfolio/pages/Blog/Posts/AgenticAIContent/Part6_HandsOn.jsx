import { BookCheck, Mail, MessageSquareMore, Package, Sparkles, TerminalSquare, Users } from "lucide-react";
import { CodeBlock, InfoBox } from './SharedComponents';

export default function Part6_HandsOn() {
  return (
    <div className="space-y-24">
      <section className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Part 6:</span> Hands-On Tutorials
        </h2>

        <p className="text-xl text-slate-300 leading-relaxed font-light">
           Enough theory. Let's build <strong>3 real agents</strong> in Python that you can run today. Each project builds on the last.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
            {[
                { num: "1", title: "Research Agent", desc: "Search the web & summarize", icon: Sparkles, color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
                { num: "2", title: "Email Agent", desc: "Read, draft & send emails", icon: Mail, color: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
                { num: "3", title: "Multi-Agent Debate", desc: "Two agents debate, one judges", icon: Users, color: "bg-purple-500/10 border-purple-500/30 text-purple-400" }
            ].map((p) => (
                <div key={p.num} className={`p-5 rounded-xl border ${p.color.split(' ')[0]} ${p.color.split(' ')[1]}`}>
                    <p.icon className={p.color.split(' ')[2]} size={24} />
                    <div className="text-white font-bold mt-3">Project {p.num}: {p.title}</div>
                    <div className="text-slate-400 text-sm">{p.desc}</div>
                </div>
            ))}
        </div>
      </section>

      {/* PROJECT 1: Research Agent */}
      <section className="space-y-8 p-8 bg-emerald-950/20 rounded-2xl border border-emerald-500/20">
           <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
               <Sparkles className="text-emerald-400" />
               Project 1: Research Agent
           </h3>

           <div className="space-y-4">
               <h4 className="text-lg font-bold text-slate-200 flex items-center gap-2"><Package className="text-emerald-400" size={18} /> Prerequisites</h4>
               <p className="text-slate-400">You will need an OpenAI API key and a Tavily API key (best for AI web search).</p>
               <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-emerald-400 border border-slate-800">
                   pip install langchain langchain-openai tavily-python
               </div>
           </div>

           <div className="space-y-4">
               <h4 className="text-lg font-bold text-slate-200 flex items-center gap-2"><TerminalSquare className="text-emerald-400" size={18} /> The Code</h4>
               <p className="text-slate-400 leading-8">
                   We'll use LangChain's pre-built ReAct agent for simplicity, but under the hood, it's doing exactly what we visualized in Part 2.
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

print(f"\\n✅ Final Answer:\\n{result['output']}")`} />

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
           </div>
      </section>

      {/* PROJECT 2: Email Agent */}
      <section className="space-y-8 p-8 bg-blue-950/20 rounded-2xl border border-blue-500/20">
           <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
               <Mail className="text-blue-400" />
               Project 2: Email Automation Agent
           </h3>
           <p className="text-slate-400 leading-8">
               This agent can read an email from your inbox, understand its intent, draft a professional reply, and send it—all with one command.
               We'll use <strong>Gmail API</strong> and custom LangChain tools.
           </p>

           <div className="space-y-4">
               <h4 className="text-lg font-bold text-slate-200 flex items-center gap-2"><Package className="text-blue-400" size={18} /> Prerequisites</h4>
               <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-blue-400 border border-slate-800 space-y-1">
                   <div>pip install langchain langchain-openai google-api-python-client google-auth-oauthlib</div>
               </div>
               <p className="text-slate-500 text-sm">You'll also need to enable the Gmail API in Google Cloud Console and download your <code>credentials.json</code>.</p>
           </div>

           <CodeBlock language="python" filename="email_agent.py" code={`import os
import base64
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

os.environ["OPENAI_API_KEY"] = "sk-..."

# --- Gmail Setup (assumes you have token.json from OAuth flow) ---
creds = Credentials.from_authorized_user_file('token.json', ['https://www.googleapis.com/auth/gmail.modify'])
gmail_service = build('gmail', 'v1', credentials=creds)

# --- Define Tools ---
@tool
def read_latest_email() -> str:
    """Reads the latest unread email from the inbox."""
    results = gmail_service.users().messages().list(userId='me', labelIds=['INBOX', 'UNREAD'], maxResults=1).execute()
    messages = results.get('messages', [])
    if not messages:
        return "No unread emails found."

    msg = gmail_service.users().messages().get(userId='me', id=messages[0]['id'], format='full').execute()
    headers = {h['name']: h['value'] for h in msg['payload']['headers']}
    body = base64.urlsafe_b64decode(msg['payload']['body'].get('data', '')).decode('utf-8', errors='ignore')

    return f"From: {headers.get('From')}\\nSubject: {headers.get('Subject')}\\n\\nBody:\\n{body[:1000]}"

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Sends an email. Requires recipient email, subject, and body text."""
    from email.mime.text import MIMEText
    message = MIMEText(body)
    message['to'] = to
    message['subject'] = subject
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    gmail_service.users().messages().send(userId='me', body={'raw': raw}).execute()
    return f"Email sent to {to} with subject: {subject}"

# --- Agent Setup ---
llm = ChatOpenAI(model="gpt-4o")
tools = [read_latest_email, send_email]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful email assistant. Read emails, understand them, and draft professional replies."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
])

agent = create_tool_calling_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# --- Run ---
result = agent_executor.invoke({
    "input": "Read my latest email and draft a polite reply confirming I received it and will respond in detail within 24 hours."
})
print(result['output'])`} />

           <InfoBox type="warning" title="Security Note">
               Never commit your <code>token.json</code> or <code>credentials.json</code> to version control. Use environment variables or a secrets manager in production.
           </InfoBox>
      </section>

      {/* PROJECT 3: Multi-Agent Debate */}
      <section className="space-y-8 p-8 bg-purple-950/20 rounded-2xl border border-purple-500/20">
           <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
               <MessageSquareMore className="text-purple-400" />
               Project 3: Multi-Agent Debate
           </h3>
           <p className="text-slate-400 leading-8">
               This is where things get interesting. We'll create <strong>three agents</strong>: a <strong>Pro Agent</strong>, a <strong>Con Agent</strong>, and a <strong>Judge Agent</strong>.
               They will debate a topic, and the Judge will declare a winner. This is your introduction to <strong>multi-agent orchestration</strong>.
           </p>

           <CodeBlock language="python" filename="multi_agent_debate.py" code={`from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-4o", temperature=0.7)

TOPIC = "AI will replace 50% of white-collar jobs within 10 years."

def get_argument(role: str, topic: str, opponent_argument: str = "") -> str:
    """Gets an argument from either the Pro or Con agent."""
    system_msg = f"You are a debate expert arguing {role} the following topic. Be persuasive, use data."
    if opponent_argument:
        user_msg = f"Topic: {topic}\\n\\nYour opponent said: {opponent_argument}\\n\\nNow give your counter-argument (2-3 sentences):"
    else:
        user_msg = f"Topic: {topic}\\n\\nGive your opening argument (2-3 sentences):"

    response = llm.invoke([SystemMessage(content=system_msg), HumanMessage(content=user_msg)])
    return response.content

def judge_debate(topic: str, pro_args: list, con_args: list) -> str:
    """The Judge agent evaluates the debate and picks a winner."""
    transcript = "\\n".join([f"PRO: {p}\\nCON: {c}" for p, c in zip(pro_args, con_args)])

    system_msg = "You are an impartial debate judge. Evaluate the arguments based on logic, evidence, and persuasiveness."
    user_msg = f"Topic: {topic}\\n\\nDebate Transcript:\\n{transcript}\\n\\nWho won and why? Give a brief justification."

    response = llm.invoke([SystemMessage(content=system_msg), HumanMessage(content=user_msg)])
    return response.content

# --- Run the Debate ---
print(f"🎤 TOPIC: {TOPIC}\\n")

pro_arguments = []
con_arguments = []

for i in range(2):  # 2 rounds of debate
    print(f"--- Round {i+1} ---")
    pro_arg = get_argument("FOR", TOPIC, con_arguments[-1] if con_arguments else "")
    pro_arguments.append(pro_arg)
    print(f"🟢 PRO: {pro_arg}\\n")

    con_arg = get_argument("AGAINST", TOPIC, pro_arg)
    con_arguments.append(con_arg)
    print(f"🔴 CON: {con_arg}\\n")

print("--- JUDGE'S VERDICT ---")
verdict = judge_debate(TOPIC, pro_arguments, con_arguments)
print(f"⚖️ {verdict}")`} />

           <InfoBox type="pro" title="What You'll Learn">
               <ul className="mt-2 space-y-1">
                   <li>• How to pass context between multiple LLM calls.</li>
                   <li>• Basic patterns for agent-to-agent communication.</li>
                   <li>• Foundations for frameworks like <strong>LangGraph</strong> and <strong>CrewAI</strong>.</li>
               </ul>
           </InfoBox>
      </section>

      {/* Next Steps */}
      <section className="space-y-8">
          <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2"><BookCheck className="text-emerald-400" /> Next Steps</h3>
          <p className="text-slate-400">
              Congratulations! You've built 3 agents. Here's how to level up:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
              {[
                  { title: "Add Memory", desc: "Integrate a Vector DB (Pinecone, Weaviate) so your agent can 'remember' documents." },
                  { title: "Scale with LangGraph", desc: "Orchestrate complex workflows with conditional routing and parallel execution." },
                  { title: "Deploy to Production", desc: "Wrap your agent in a FastAPI backend and deploy to Replit, Vercel, or AWS Lambda." }
              ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
              ))}
          </div>
      </section>

    </div>
  );
}
