// Top-level imports
import {
    Brain,
    Calendar,
    Check,
    Clock,
    Copy,
    Database,
    Layers,
    Lock,
    Rocket,
    Shield,
    Sparkles,
    Tag,
    Target,
    Terminal,
    TrendingUp,
    User,
    Wand2,
    Workflow
} from "lucide-react";
import React from "react";

function AntiGravityFeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-950 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[100px]" />

      {/* Content - fills full height */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-indigo-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-indigo-300 text-sm font-medium">Google DeepMind</span>
        </div>

        {/* Orbital Icon - larger */}
        <div className="relative mb-8">
          <div className="absolute inset-0 w-24 h-24 border border-indigo-500/30 rounded-full animate-[spin_10s_linear_infinite]" style={{margin: "-12px"}} />
          <div className="absolute inset-0 w-32 h-32 border border-fuchsia-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{margin: "-24px"}} />
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Sparkles size={40} className="text-indigo-400" />
          </div>
        </div>

        {/* Title - larger */}
        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">Anti </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">Gravity</span>
        </h2>

        {/* Subtitle - larger */}
        <p className="text-slate-400 text-lg">
          The Future of Agentic Coding
        </p>
      </div>
    </div>
  );
}

// Thumbnail Image - for search results
function AntiGravityThumbnail({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20" />
      <Sparkles size={24} className="text-indigo-400 relative z-10" />
    </div>
  );
}

function AntiGravityCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#030712] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/40 via-transparent to-fuchsia-900/40" />
      </div>
      <div className="relative flex flex-col items-center gap-3 text-indigo-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 shadow-lg shadow-indigo-500/10">
            <Sparkles size={28} className="text-indigo-300" />
        </div>
        <span className="font-bold text-lg tracking-wide text-slate-200 group-hover:text-white transition-colors">Anti Gravity</span>
      </div>
    </div>
  );
}

function CodeBlock({ language = "javascript", filename, code }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="relative my-10 rounded-xl border border-slate-700/50 bg-[#0B1120] overflow-hidden shadow-2xl shadow-black/50 group">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <Terminal size={16} className="text-indigo-400" />
          <span className="px-2.5 py-1 rounded-md bg-indigo-950/50 text-indigo-300 border border-indigo-800/50 font-mono font-semibold text-xs">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-slate-500">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200 text-xs font-medium"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="m-0 p-6 overflow-x-auto text-sm leading-loose bg-[#0B1120]">
        <code className={`language-${language} text-slate-300 font-mono`}>{code}</code>
      </pre>
    </div>
  );
}

function InfoBox({ type = "info", title, children, icon: Icon }) {
  const styles = {
    info: {
      border: "border-blue-500/20",
      bg: "bg-blue-950/10",
      icon: "text-blue-400",
      title: "text-blue-300",
    },
    tip: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-950/10",
      icon: "text-emerald-400",
      title: "text-emerald-300",
    },
    warning: {
      border: "border-amber-500/20",
      bg: "bg-amber-950/10",
      icon: "text-amber-400",
      title: "text-amber-300",
    },
    future: {
      border: "border-fuchsia-500/20",
      bg: "bg-fuchsia-950/10",
      icon: "text-fuchsia-400",
      title: "text-fuchsia-300",
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div
      className={`my-10 p-6 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}
    >
      <div className="flex gap-4">
        {Icon && (
          <Icon size={24} className={`${style.icon} flex-shrink-0 mt-1`} />
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg ${style.title} mb-2`}>{title}</h4>
          )}
          <div className="text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ArticleMetadata() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 border-b border-slate-800/50">
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} className="text-indigo-400" />
          <span className="font-medium text-slate-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-indigo-400" />
          <span>November 19, 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-400" />
          <span>25 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-indigo-400" />
          <span>AI • DeepMind • Future</span>
        </div>
      </div>
    </div>
  );
}



function AntiGravityPost() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <AntiGravityFeaturedImage />
      <ArticleMetadata />

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <p className="text-2xl text-slate-300 leading-relaxed font-light mb-8">
            For decades, software engineering has been a battle against friction. We spend hours fighting syntax errors, wrestling with boilerplate, managing complex dependencies, and context-switching between documentation and code. <strong className="text-white">Google's Project Anti Gravity</strong> isn't just another AI autocomplete tool—it's a fundamental paradigm shift that promises to lift the heavy lifting off your shoulders, allowing you to focus purely on architecture and logic.
          </p>

        </section>

        {/* Section 1: The Gravity of Legacy Coding */}
        <section id="introduction" className="mb-20 scroll-mt-20">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center border border-slate-600/50">
              <Target size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white text-center md:text-left">
              The Gravity of Legacy Coding
            </h2>
          </div>
          <div className="prose prose-xl prose-invert max-w-none">
             <p className="text-lg text-slate-300 leading-relaxed mb-6">
                We've all felt it. The "gravity" of a large codebase. As a project grows, it becomes heavier. The velocity that you had on Day 1 evaporates by Day 100. You spend more time reading old code, debugging obscure race conditions, and configuring build tools than you do actually building new features.
             </p>
             <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Traditional IDEs, even those equipped with LLM-based autocomplete, only address the surface level of this problem. They help you type faster, but they don't help you <em>think</em> faster. They don't understand the <strong>implications</strong> of your changes across the entire system.
             </p>
          </div>
        </section>

        {/* Section 2: What is Anti Gravity */}
        <section id="what-is-antigravity" className="mb-20 scroll-mt-20">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white text-center md:text-left">
              What is Anti Gravity?
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Anti Gravity is Google DeepMind's latest leap in AI-assisted development. It is an <strong>Agentic IDE</strong>. Unlike Copilot, which acts as a fancy autocomplete, Anti Gravity is an autonomous agent that lives inside your development environment. It has read-write access to your file system, terminal, and browser (in a sandboxed environment).
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="p-8 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                <h4 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-3">
                  <Brain size={24} />
                  Deep Understanding
                </h4>
                <p className="text-slate-400 leading-relaxed">
                    It builds a semantic graph of your entire codebase. It knows that changing a return type in `api/user.ts` will break the component in `components/Profile.tsx`, and it proactively offers to fix it.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-fuchsia-950/30 border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-colors">
                <h4 className="text-xl font-bold text-fuchsia-300 mb-4 flex items-center gap-3">
                  <Rocket size={24} />
                  Autonomous Action
                </h4>
                <p className="text-slate-400 leading-relaxed">
                    Give it a high-level goal: "Refactor the auth flow to use NextAuth v5." It plans the steps, edits multiple files, runs the test suite, fixes any regressions, and presents a PR for your review.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Architecture */}
        <section id="architecture" className="mb-20 scroll-mt-20">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Database size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white text-center md:text-left">
              Architecture: The Context Engine
            </h2>
          </div>
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                The core differentiator of Anti Gravity is its <strong>Context Engine</strong>. Most LLMs have a limited context window. You can't paste a 100,000-line codebase into ChatGPT. Anti Gravity solves this using a RAG (Retrieval-Augmented Generation) pipeline specialized for code syntax trees.
            </p>

            <InfoBox type="info" title="How it works" icon={Layers}>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 mt-2">
                    <li><strong>Indexing:</strong> On startup, it parses your code into an AST (Abstract Syntax Tree).</li>
                    <li><strong>Embedding:</strong> It generates vector embeddings for every function, class, and module.</li>
                    <li><strong>Retrieval:</strong> When you ask a question, it retrieves not just text matches, but <em>semantically related</em> code.</li>
                    <li><strong>Reasoning:</strong> It uses a specialized "Chain of Thought" model to plan changes before executing them.</li>
                </ol>
            </InfoBox>
          </div>
        </section>

        {/* Section 4: Agentic Workflow */}
        <section id="agentic-workflow" className="mb-20 scroll-mt-20">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Workflow size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white text-center md:text-left">
              Agentic Workflow in Action
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
             <p className="text-lg text-slate-300 leading-relaxed mb-6">
                The magic lies in the "Loop". Anti Gravity doesn't just output code and hope for the best. It operates in a feedback loop of <strong>Thought &rarr; Action &rarr; Observation</strong>. This mimics how a senior engineer works.
             </p>

             <CodeBlock
              language="markdown"
              filename="AntiGravity_Thinking_Process.md"
              code={`# Task: Fix the login bug reported in issue #42

1. **Analyze**: I see a 401 error in the logs. Let me check the auth middleware.
2. **Hypothesis**: The token expiration check might be off by a few seconds due to clock skew.
3. **Action**: I will add a 5-second grace period to the token verification in \`auth.js\`.
4. **Verify**: Running \`npm test\`.
5. **Observation**: Tests passed.
6. **Conclusion**: Bug fixed. Committing changes.`}
            />

            <p className="text-lg text-slate-300 leading-relaxed my-6">
                This capability allows it to handle tasks that were previously impossible for AI, such as:
            </p>

            <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-slate-300">
                    <Check size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Large Refactors:</strong> "Rename the `User` class to `Customer` everywhere and update all imports."</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                    <Check size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Test-Driven Development:</strong> "Write a test for the new payment API, then implement the API until the test passes."</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                    <Check size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <span><strong>Debugging:</strong> "The app crashes when I click 'Submit'. Find the bug and fix it."</span>
                </li>
            </ul>

            <InfoBox type="future" title="The Shift" icon={Wand2}>
              This shifts the developer's role from "writer of code" to "architect of solutions". You define the *what* and the *why*, and Anti Gravity handles the *how*.
            </InfoBox>
          </div>
        </section>

        {/* Section 5: Comparison */}
        <section id="comparison" className="mb-20 scroll-mt-20">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white text-center md:text-left">
              Anti Gravity vs. The Rest
            </h2>
          </div>
          <div className="prose prose-xl prose-invert max-w-none">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="py-4 px-4 text-slate-200 font-bold">Feature</th>
                            <th className="py-4 px-4 text-indigo-400 font-bold">Anti Gravity</th>
                            <th className="py-4 px-4 text-slate-400 font-medium">Cursor</th>
                            <th className="py-4 px-4 text-slate-400 font-medium">GitHub Copilot</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-800/50">
                            <td className="py-4 px-4 text-slate-300">Context Awareness</td>
                            <td className="py-4 px-4 text-indigo-300 font-semibold">Full Workspace Graph</td>
                            <td className="py-4 px-4 text-slate-400">File + References</td>
                            <td className="py-4 px-4 text-slate-400">Open Files</td>
                        </tr>
                        <tr className="border-b border-slate-800/50">
                            <td className="py-4 px-4 text-slate-300">Agency</td>
                            <td className="py-4 px-4 text-indigo-300 font-semibold">Autonomous Loop</td>
                            <td className="py-4 px-4 text-slate-400">Conversational Edits</td>
                            <td className="py-4 px-4 text-slate-400">Autocomplete</td>
                        </tr>
                        <tr className="border-b border-slate-800/50">
                            <td className="py-4 px-4 text-slate-300">Tool Usage</td>
                            <td className="py-4 px-4 text-indigo-300 font-semibold">Terminal, Browser, File System</td>
                            <td className="py-4 px-4 text-slate-400">Limited</td>
                            <td className="py-4 px-4 text-slate-400">None</td>
                        </tr>
                        <tr>
                            <td className="py-4 px-4 text-slate-300">Multi-file Edits</td>
                            <td className="py-4 px-4 text-indigo-300 font-semibold">Native & Atomic</td>
                            <td className="py-4 px-4 text-slate-400">Supported</td>
                            <td className="py-4 px-4 text-slate-400">Limited</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </section>

        {/* Section 6: Security */}
        <section id="security" className="mb-20 scroll-mt-20">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-gray-600 flex items-center justify-center border border-slate-600">
              <Shield size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white text-center md:text-left">
              Enterprise Security & Privacy
            </h2>
          </div>
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Giving an AI read-write access to your codebase sounds scary. Google understands this. Anti Gravity is built with a <strong>Zero-Trust Architecture</strong>.
            </p>
             <ul className="space-y-4 my-6">
              <li className="flex items-start gap-3 text-slate-300">
                <Lock size={20} className="text-indigo-400 mt-1 flex-shrink-0" />
                <span><strong>Local Execution:</strong> The agent runs locally on your machine or in a private cloud instance. Your code never leaves your perimeter unless you explicitly allow it.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Lock size={20} className="text-indigo-400 mt-1 flex-shrink-0" />
                <span><strong>Human in the Loop:</strong> Every "Action" (file write, command execution) can be configured to require human approval.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Lock size={20} className="text-indigo-400 mt-1 flex-shrink-0" />
                <span><strong>Audit Logs:</strong> Every thought and action is logged. You can replay the agent's decision-making process to understand why it made a change.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section id="roadmap" className="mb-20 scroll-mt-20">
           <div className="my-12 p-10 rounded-2xl bg-gradient-to-r from-indigo-950/50 to-fuchsia-950/50 border border-indigo-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
                The Road to Singularity
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-6 relative z-10">
                Anti Gravity isn't just a tool; it's a glimpse into the future of software engineering. As models get smarter and context windows get larger, the friction of coding will approach zero.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed relative z-10">
                We are entering an era where the only limit to what you can build is your imagination. The heavy lifting is over. It's time to fly.
              </p>
            </div>
        </section>

      </article>
    </div>
  );
}

// Attach image helpers
AntiGravityPost.FeaturedImage = AntiGravityFeaturedImage;
AntiGravityPost.CardImage = AntiGravityCardImage;
AntiGravityPost.ThumbnailImage = AntiGravityThumbnail;
AntiGravityPost.Image = AntiGravityCardImage;

// Enhanced post metadata
AntiGravityPost.info = {
  id: "google-anti-gravity-ai",
  slug: "google-anti-gravity-ai",
  title: "Google Anti Gravity: The Future of Agentic Coding",
  excerpt:
    "Discover Google's revolutionary AI code editor that defies the laws of legacy development. Experience true agentic workflows, deep context mastery, and a weightless coding experience.",
  category: "AI & Future",
  author: "Dev Kant Kumar",
  readTime: "25 min read",
  image: "/devkantkumar.jpg", // Using existing image as placeholder or if available
  featuredImage: "/devkantkumar.jpg",
  featured: true,
  publishDate: "2025-11-19",
  modifiedDate: "2025-11-19",
  tags: [
    "ai",
    "google",
    "anti-gravity",
    "agentic-coding",
    "future-tech",
    "productivity",
    "deepmind",
  ],
};

export default AntiGravityPost;
