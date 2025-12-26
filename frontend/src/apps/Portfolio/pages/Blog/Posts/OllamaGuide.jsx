import {
    AlertTriangle,
    BookOpen,
    Calendar,
    Check,
    ChevronRight,
    Clock,
    Code,
    Copy,
    Cpu,
    Download,
    ExternalLink,
    FileVideo,
    Layers,
    Shield,
    Tag,
    Terminal,
    User,
    Zap
} from "lucide-react";
import React from "react";

function OllamaFeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-orange-950/30 to-slate-950 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1917_1px,transparent_1px),linear-gradient(to_bottom,#1c1917_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-[100px]" />

      {/* Content - fills full height */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-orange-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-orange-300 text-sm font-medium">Local AI</span>
        </div>

        {/* Icon Grid - larger */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Terminal size={28} className="text-orange-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 flex items-center justify-center">
            <Cpu size={40} className="text-orange-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Zap size={28} className="text-yellow-400" />
          </div>
        </div>

        {/* Title - larger */}
        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">Ollama </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Guide</span>
        </h2>

        {/* Subtitle - larger */}
        <p className="text-slate-400 text-lg">
          Run LLMs Locally on Your Machine
        </p>
      </div>
    </div>
  );
}

function OllamaCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0f0f0f] rounded-xl flex items-center justify-center relative overflow-hidden group border border-gray-800 hover:border-orange-500/50 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/40 via-[#0f0f0f] to-[#0f0f0f]" />
      <div className="relative flex flex-col items-center gap-3 text-gray-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-gray-800/50 border border-gray-700 shadow-lg">
          <img src="https://ollama.com/public/ollama.png" alt="Ollama Logo" className="w-10 h-10 invert" />
        </div>
        <span className="font-bold text-lg tracking-wide font-mono">Ollama Guide</span>
      </div>
    </div>
  );
}

function CodeBlock({ language = "bash", filename, code }) {
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
    <div className="relative my-8 rounded-xl border border-gray-700 bg-[#1e1e1e] overflow-hidden shadow-xl group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700">
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <Terminal size={14} className="text-orange-400" />
          <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-600 font-mono text-xs">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-gray-500 text-xs">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors text-xs"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="m-0 p-4 overflow-x-auto text-sm leading-relaxed bg-[#1e1e1e] text-gray-300 font-mono">
        <code>{code}</code>
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
      border: "border-green-500/20",
      bg: "bg-green-950/10",
      icon: "text-green-400",
      title: "text-green-300",
    },
    warning: {
      border: "border-yellow-500/20",
      bg: "bg-yellow-950/10",
      icon: "text-yellow-400",
      title: "text-yellow-300",
    },
    danger: {
      border: "border-red-500/20",
      bg: "bg-red-950/10",
      icon: "text-red-400",
      title: "text-red-300",
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div
      className={`my-8 p-5 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}
    >
      <div className="flex gap-4">
        {Icon && (
          <Icon size={24} className={`${style.icon} flex-shrink-0 mt-1`} />
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg ${style.title} mb-2`}>{title}</h4>
          )}
          <div className="text-gray-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ArticleMetadata() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 border-b border-gray-800">
      <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} className="text-orange-400" />
          <span className="font-medium text-gray-300">Dev Kant Kumar</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-orange-400" />
          <span>November 25, 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-orange-400" />
          <span>12 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-orange-400" />
          <span>AI • Local LLM • Tutorial</span>
        </div>
      </div>
    </div>
  );
}

function TableOfContents() {
  const sections = [
    { id: "introduction", title: "Why Run Local AI?" },
    { id: "cost-analysis", title: "The $240/Year Saving" },
    { id: "what-is-ollama", title: "What is Ollama?" },
    { id: "installation", title: "Installation Guide" },
    { id: "running-models", title: "Running Llama 3" },
    { id: "models-list", title: "Best Models to Try" },
    { id: "modelfiles", title: "Custom Modelfiles" },
    { id: "uncensored", title: "Uncensored Models" },
    { id: "api-integration", title: "Building a React UI" },
    { id: "rag-guide", title: "RAG: Chat with Data" },
  ];

  return (
    <div className="my-10 p-6 rounded-xl bg-[#1e1e1e] border border-gray-800">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen size={20} className="text-orange-400" />
        <h3 className="text-xl font-bold text-white">Table of Contents</h3>
      </div>
      <nav className="space-y-2">
        {sections.map((section, idx) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group py-1.5"
          >
            <span className="text-gray-600 font-mono text-xs font-bold w-6">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <ChevronRight
              size={14}
              className="text-gray-700 group-hover:text-orange-400 transition-colors"
            />
            <span className="font-medium text-sm">{section.title}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

function ComparisonTable() {
    return (
        <div className="overflow-x-auto my-8 rounded-xl border border-gray-800">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-800/50">
                        <th className="p-4 text-gray-300 font-bold border-b border-gray-700">Feature</th>
                        <th className="p-4 text-orange-400 font-bold border-b border-gray-700">Local AI (Ollama)</th>
                        <th className="p-4 text-blue-400 font-bold border-b border-gray-700">Cloud AI (OpenAI)</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr className="bg-[#1e1e1e]">
                        <td className="p-4 border-b border-gray-800 text-gray-300 font-medium">Cost</td>
                        <td className="p-4 border-b border-gray-800 text-green-400 font-bold">Free (Forever)</td>
                        <td className="p-4 border-b border-gray-800 text-gray-400">$20/mo or pay-per-token</td>
                    </tr>
                    <tr className="bg-[#161616]">
                        <td className="p-4 border-b border-gray-800 text-gray-300 font-medium">Privacy</td>
                        <td className="p-4 border-b border-gray-800 text-green-400 font-bold">100% Private</td>
                        <td className="p-4 border-b border-gray-800 text-red-400">Data sent to servers</td>
                    </tr>
                    <tr className="bg-[#1e1e1e]">
                        <td className="p-4 border-b border-gray-800 text-gray-300 font-medium">Offline Use</td>
                        <td className="p-4 border-b border-gray-800 text-green-400 font-bold">Yes</td>
                        <td className="p-4 border-b border-gray-800 text-red-400">No</td>
                    </tr>
                    <tr className="bg-[#161616]">
                        <td className="p-4 border-b border-gray-800 text-gray-300 font-medium">Latency</td>
                        <td className="p-4 border-b border-gray-800 text-yellow-400">Hardware Dependent</td>
                        <td className="p-4 border-b border-gray-800 text-green-400">Consistent</td>
                    </tr>
                    <tr className="bg-[#1e1e1e]">
                        <td className="p-4 text-gray-300 font-medium">Censorship</td>
                        <td className="p-4 text-green-400 font-bold">Uncensored Models Available</td>
                        <td className="p-4 text-red-400">Strict Guardrails</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function OllamaGuidePost() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <OllamaFeaturedImage />
      <ArticleMetadata />

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Stop Paying for OpenAI: Run Llama 3 Locally with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              Ollama
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed font-light mb-8">
            Imagine having a ChatGPT-level AI running entirely on your laptop. No subscription fees, no privacy concerns, and no internet connection required. It sounds like sci-fi, but with <strong>Ollama</strong>, it's a reality today.
          </p>

          <TableOfContents />
        </section>

        {/* Why Run Local AI? */}
        <section id="introduction" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Shield size={24} className="text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Why Run Local AI?</h2>
            </div>
            <p className="mb-6">
                For years, we've relied on cloud giants like OpenAI and Anthropic. While convenient, they come with downsides: monthly costs, data privacy risks, and reliance on their servers. Local AI flips the script.
            </p>
            <ComparisonTable />
        </section>

        {/* Cost Analysis */}
        <section id="cost-analysis" className="mb-16 scroll-mt-24">
            <div className="p-6 rounded-xl bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-green-400">$</span> The $240/Year Saving
                </h3>
                <p className="text-gray-300 mb-4">
                    ChatGPT Plus costs <strong>$20/month</strong>. That's <strong>$240 a year</strong>.
                </p>
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <span className="text-gray-400">OpenAI API (GPT-4)</span>
                        <span className="text-red-400">~$0.03 / 1k tokens</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Claude 3 Opus</span>
                        <span className="text-red-400">~$0.075 / 1k tokens</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-white font-bold">Llama 3 (Local)</span>
                        <span className="text-green-400 font-bold">$0.00 / ∞ tokens</span>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-400 italic">
                    * The only cost is electricity, which is negligible for text generation.
                </p>
            </div>
        </section>

        {/* What is Ollama? */}
        <section id="what-is-ollama" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <Zap size={24} className="text-orange-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">What is Ollama?</h2>
          </div>
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              <strong>Ollama</strong> is the "Docker for AI". It simplifies the complex process of downloading, configuring, and running Large Language Models (LLMs) into a single command.
            </p>
            <p>
                Before Ollama, running a model meant dealing with Python environments, PyTorch dependencies, and complex configuration files. With Ollama, it's just:
            </p>
            <CodeBlock language="bash" code="ollama run llama3" />
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <Download size={24} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Installation Guide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <a href="https://ollama.com/download/mac" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl bg-[#1e1e1e] border border-gray-800 hover:border-orange-500 transition-colors group">
                <div className="text-center">
                    <span className="text-2xl mb-2 block">🍎</span>
                    <h3 className="font-bold text-white group-hover:text-orange-400">macOS</h3>
                    <p className="text-sm text-gray-500">Download .zip</p>
                </div>
            </a>
            <a href="https://ollama.com/download/windows" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl bg-[#1e1e1e] border border-gray-800 hover:border-blue-500 transition-colors group">
                <div className="text-center">
                    <span className="text-2xl mb-2 block">🪟</span>
                    <h3 className="font-bold text-white group-hover:text-blue-400">Windows</h3>
                    <p className="text-sm text-gray-500">Download .exe</p>
                </div>
            </a>
            <a href="https://ollama.com/download/linux" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl bg-[#1e1e1e] border border-gray-800 hover:border-yellow-500 transition-colors group">
                <div className="text-center">
                    <span className="text-2xl mb-2 block">🐧</span>
                    <h3 className="font-bold text-white group-hover:text-yellow-400">Linux</h3>
                    <p className="text-sm text-gray-500">Curl Command</p>
                </div>
            </a>
          </div>

          <p>For Linux users, simply run:</p>
          <CodeBlock
            language="bash"
            code="curl -fsSL https://ollama.com/install.sh | sh"
          />
        </section>

        {/* Running Models */}
        <section id="running-models" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Terminal size={24} className="text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Running Llama 3</h2>
          </div>
          <p className="mb-4">
            Once installed, open your terminal (Command Prompt or PowerShell on Windows) and run:
          </p>
          <CodeBlock
            language="bash"
            code="ollama run llama3"
          />
          <p className="text-sm text-gray-400 mb-6">
            The first time you run this, it will download the model (approx 4.7GB). Once finished, you'll drop straight into a chat interface.
          </p>

          <InfoBox type="tip" title="Hardware Requirements" icon={Cpu}>
            You don't need a supercomputer.
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Minimum:</strong> 8GB RAM (runs slowly on CPU)</li>
                <li><strong>Recommended:</strong> 16GB RAM + NVIDIA GPU (RTX 3060 or better)</li>
                <li><strong>Mac:</strong> M1/M2/M3 chips run Ollama incredibly fast due to unified memory.</li>
            </ul>
          </InfoBox>
        </section>

        {/* Models List */}
        <section id="models-list" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <Layers size={24} className="text-pink-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Best Models to Try</h2>
            </div>
            <div className="space-y-4">
                <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-white">llama3</h4>
                        <p className="text-sm text-gray-400">Meta's latest open model. Best balance of speed and intelligence.</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-300 font-mono">8B params</span>
                </div>
                <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-white">mistral</h4>
                        <p className="text-sm text-gray-400">A powerful 7B model that punches above its weight.</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-300 font-mono">7B params</span>
                </div>
                <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-white">gemma:7b</h4>
                        <p className="text-sm text-gray-400">Google's open model. Great for creative writing.</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-300 font-mono">7B params</span>
                </div>
                <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-white">codellama</h4>
                        <p className="text-sm text-gray-400">Specialized for coding tasks and debugging.</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-300 font-mono">7B params</span>
                </div>
            </div>
        </section>

        {/* Modelfiles */}
        <section id="modelfiles" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <FileVideo size={24} className="text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Beyond Chat: Custom Modelfiles</h2>
            </div>
            <p className="mb-4">
                You can "program" Ollama to behave in specific ways using a <code>Modelfile</code>. It's like a Dockerfile for AI.
            </p>
            <p className="mb-4">Create a file named <code>Modelfile</code>:</p>
            <CodeBlock
                language="dockerfile"
                filename="Modelfile"
                code={`FROM llama3

# Set the temperature (creativity)
PARAMETER temperature 0.7

# Set the system message
SYSTEM """
You are a Senior React Developer.
You only answer with code snippets and brief explanations.
You prefer Functional Components and Tailwind CSS.
"""`}
            />
            <p className="mb-4">Then build and run it:</p>
            <CodeBlock
                language="bash"
                code={`ollama create react-expert -f Modelfile
ollama run react-expert`}
            />
        </section>

        {/* Uncensored Models */}
        <section id="uncensored" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertTriangle size={24} className="text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">The Secret Weapon: Uncensored Models</h2>
            </div>
            <p className="mb-4">
                Corporate models like ChatGPT have strict "guardrails". They often refuse to answer harmless questions about controversial topics or creative writing prompts.
            </p>
            <p className="mb-4">
                <strong>Uncensored models</strong> remove these restrictions. The most popular is <strong>Dolphin</strong>.
            </p>
            <CodeBlock
                language="bash"
                code="ollama run dolphin-llama3"
            />
            <InfoBox type="warning" title="Use Responsibly" icon={Shield}>
                Uncensored means <em>uncensored</em>. These models will answer almost anything. Use your judgment and ethics.
            </InfoBox>
        </section>

        {/* API Integration */}
        <section id="api-integration" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Code size={24} className="text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Building a React UI</h2>
          </div>
          <p className="mb-4">
            Ollama runs a local API server by default on port <code>11434</code>. You can fetch data from it just like any other REST API.
          </p>
          <CodeBlock
            language="javascript"
            filename="App.jsx"
            code={`const generateResponse = async () => {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3',
      prompt: 'Why is the sky blue?',
      stream: false
    })
  });

  const data = await response.json();
  console.log(data.response);
};`}
          />
          <InfoBox type="warning" title="CORS Issue" icon={AlertTriangle}>
            By default, Ollama blocks browser requests. You need to set an environment variable to allow it.
            <div className="mt-2 font-mono text-sm bg-black/30 p-2 rounded border border-yellow-900/30 text-yellow-300">
                OLLAMA_ORIGINS="*" ollama serve
            </div>
          </InfoBox>
        </section>

        {/* RAG Guide */}
        <section id="rag-guide" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Layers size={24} className="text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">RAG 101: Chat with Your Documents</h2>
            </div>
            <p className="mb-4">
                <strong>Retrieval-Augmented Generation (RAG)</strong> lets you feed your own data (PDFs, notes, code) to the AI.
            </p>
            <p className="mb-4">
                Here is a simple concept using LangChain.js:
            </p>
            <CodeBlock
                language="javascript"
                filename="rag-demo.js"
                code={`import { Ollama } from "@langchain/community/llms/ollama";
import { RetrievalQAChain } from "langchain/chains";

const model = new Ollama({
  baseUrl: "http://localhost:11434",
  model: "llama3",
});

// Imagine 'vectorStore' contains your PDF data
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

const res = await chain.call({
  query: "Summarize the quarterly report based on the PDF."
});

console.log(res.text);`}
            />
        </section>

        {/* Conclusion */}
        <section className="mb-20">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">The Future is Local</h3>
            <p className="text-gray-300 mb-6">
              Running AI locally gives you freedom. You own the data, you control the model, and you don't pay a cent. It's the ultimate developer power move.
            </p>
            <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold transition-colors">
              Download Ollama Now <ExternalLink size={18} />
            </a>
          </div>
        </section>

        {/* Hidden SEO Keywords */}
        <div className="hidden">
          ollama tutorial, run llama 3 locally, local llm guide, private ai, free chatgpt alternative, ollama react integration, install ollama windows, best local llm models 2025.
        </div>

      </article>
    </div>
  );
}

// Attach image helpers
OllamaGuidePost.FeaturedImage = OllamaFeaturedImage;
OllamaGuidePost.Image = OllamaCardImage;
OllamaGuidePost.CardImage = OllamaCardImage;

// Post metadata
OllamaGuidePost.info = {
  id: "local-llm-ollama-guide-2025",
  slug: "local-llm-ollama-guide-2025",
  title: "Stop Paying for OpenAI: Run Llama 3 Locally with Ollama (2025 Guide)",
  excerpt:
    "Learn how to run powerful AI models like Llama 3 entirely on your laptop. No subscription fees, total privacy, and offline access using Ollama.",
  category: "AI & ML",
  author: "Dev Kant Kumar",
  readTime: "20 min read",
  image: "/devkantkumar.jpg",
  featuredImage: "/devkantkumar.jpg",
  featured: true,
  publishDate: "2025-11-25",
  modifiedDate: "2025-11-25",
  tags: [
    "ollama",
    "ai",
    "llama-3",
    "local-llm",
    "react",
    "privacy",
    "rag",
    "uncensored",
  ],
  faqs: [
    {
      question: "Is Ollama free?",
      answer: "Yes, Ollama is 100% free and open-source software."
    },
    {
      question: "Can I run Llama 3 on a laptop?",
      answer: "Yes! The 8B parameter version of Llama 3 runs smoothly on most modern laptops with at least 8GB of RAM, especially those with Apple Silicon (M1/M2/M3)."
    },
    {
      question: "Does Ollama work offline?",
      answer: "Yes. Once you download the model, Ollama works completely offline without any internet connection."
    },
    {
      question: "How do I use Ollama with React?",
      answer: "Ollama provides a local REST API running on port 11434. You can make fetch requests to it directly from your React application."
    }
  ]
};

export default OllamaGuidePost;
