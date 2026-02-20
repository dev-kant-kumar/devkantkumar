import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import {
    AlertTriangle,
    BookOpen, Calendar, Check, Clock,
    Code2, Copy, Cpu, Database, GitBranch,
    Hash, Layers, Lightbulb, Lock,
    Repeat, Rocket, Server, Shield,
    Tag, Target,
    Terminal, TrendingUp, User, Zap
} from "lucide-react";
import React from "react";

// Register only the languages used in this post (keeps bundle small)
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("css", css);

/* ─────────────── Featured Image (Hero) ─────────────── */
function JSFeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-yellow-950/30 to-slate-950 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/15 rounded-full blur-[100px]" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-yellow-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          <span className="text-yellow-300 text-sm font-medium">2026 Complete Guide</span>
        </div>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Cpu size={28} className="text-yellow-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 flex items-center justify-center">
            <Code2 size={40} className="text-yellow-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Layers size={28} className="text-amber-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">JavaScript </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">Internals</span>
        </h1>
        <p className="text-slate-400 text-lg">How JS Works Under the Hood — From Engine to Event Loop</p>
      </div>
    </div>
  );
}

/* ─────────────── Card Image (Blog listing) ─────────────── */
function JSCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0f172a] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800 hover:border-yellow-500/50 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/40 via-[#0f172a] to-[#0f172a]" />
      <div className="relative flex flex-col items-center gap-3 text-slate-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-lg">
          <Code2 size={32} className="text-yellow-400" />
        </div>
        <span className="font-bold text-lg tracking-wide text-yellow-50">JavaScript Internals</span>
      </div>
    </div>
  );
}

/* ─────────────── CodeBlock ─────────────── */
function CodeBlock({ language = "javascript", filename, code }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  // Highlighted HTML via highlight.js (memoized)
  const highlightedHtml = React.useMemo(() => {
    try {
      const lang = hljs.getLanguage(language) ? language : "javascript";
      return hljs.highlight(code, { language: lang }).value;
    } catch {
      return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }, [code, language]);

  // Trim code and count lines for the gutter
  const lines = code.trim().split("\n");
  const lineCount = lines.length;

  return (
    <div className="relative my-8 rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-yellow-500/5 group" style={{ background: "#0d1117" }}>

      {/* ── Header bar ── */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-800/90 border-b border-slate-700/50">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          {/* macOS traffic-light dots */}
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <Terminal size={14} className="text-yellow-400 ml-1" />
          <span className="px-2.5 py-1 rounded-md bg-yellow-900/40 text-yellow-300 border border-yellow-700/40 font-mono font-semibold text-xs">
            {language.toUpperCase()}
          </span>
          {filename && <span className="font-mono text-slate-400 text-xs">{filename}</span>}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/80 text-slate-200 hover:bg-slate-600 transition-all duration-200 text-xs font-medium"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* ── Code body with line-number gutter ── */}
      <div className="flex overflow-x-auto" style={{ background: "transparent" }}>

        {/* Gutter: line numbers */}
        <div
          aria-hidden="true"
          className="select-none flex-shrink-0 border-r border-slate-700/40 text-right font-mono text-sm leading-loose text-slate-600 py-6 pr-4 pl-4"
          style={{ minWidth: `${String(lineCount).length * 0.65 + 3}ch` }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Actual highlighted code */}
        <pre className="m-0 pl-5 pr-6 py-6 flex-1 text-sm leading-loose hljs overflow-x-visible" style={{ background: "transparent" }}>
          <code
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            style={{ background: "transparent", padding: 0 }}
          />
        </pre>
      </div>
    </div>
  );
}


/* ─────────────── InfoBox ─────────────── */
function InfoBox({ type = "info", title, children, icon: Icon }) {
  const styles = {
    info:    { border: "border-blue-500/30", bg: "bg-blue-500/10", icon: "text-blue-400", title: "text-blue-300" },
    tip:     { border: "border-green-500/30", bg: "bg-green-500/10", icon: "text-green-400", title: "text-green-300" },
    warning: { border: "border-yellow-500/30", bg: "bg-yellow-500/10", icon: "text-yellow-400", title: "text-yellow-300" },
    danger:  { border: "border-red-500/30", bg: "bg-red-500/10", icon: "text-red-400", title: "text-red-300" },
  };
  const s = styles[type];
  return (
    <div className={`my-8 p-6 rounded-xl border ${s.border} ${s.bg} backdrop-blur-sm`}>
      <div className="flex gap-4">
        {Icon && <Icon size={24} className={`${s.icon} flex-shrink-0 mt-1`} />}
        <div className="flex-1">
          {title && <h4 className={`font-bold text-lg ${s.title} mb-2`}>{title}</h4>}
          <div className="text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── DiagramBox ─────────────── */
function DiagramBox({ title, children, color = "yellow" }) {
  const colors = {
    yellow: { border: "border-yellow-500/30", title: "text-yellow-300", bg: "bg-yellow-500/5" },
    cyan:   { border: "border-cyan-500/30", title: "text-cyan-300", bg: "bg-cyan-500/5" },
    purple: { border: "border-purple-500/30", title: "text-purple-300", bg: "bg-purple-500/5" },
    green:  { border: "border-green-500/30", title: "text-green-300", bg: "bg-green-500/5" },
    red:    { border: "border-red-500/30", title: "text-red-300", bg: "bg-red-500/5" },
  };
  const c = colors[color];
  return (
    <div className={`my-8 rounded-xl border ${c.border} ${c.bg} overflow-hidden`}>
      {title && <div className={`px-5 py-3 border-b ${c.border} bg-slate-900/50`}><h4 className={`font-bold ${c.title} flex items-center gap-2`}><Layers size={16} />{title}</h4></div>}
      <pre className="p-6 overflow-x-auto text-sm leading-relaxed text-slate-300 font-mono bg-slate-950/30">{children}</pre>
    </div>
  );
}

/* ─────────────── SectionHeader ─────────────── */
function SectionHeader({ id, number, title, icon: Icon, gradient }) {
  return (
    <div id={id} className="scroll-mt-20 flex items-center gap-4 mb-8">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <span className="text-yellow-400/60 text-sm font-mono">Chapter {number}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{title}</h2>
      </div>
    </div>
  );
}

/* ─────────────── ArticleMetadata ─────────────── */
function ArticleMetadata() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 border-b border-slate-800/50">
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
        <div className="flex items-center gap-2"><User size={16} className="text-yellow-400" /><span className="font-medium text-slate-300">Dev Kant Kumar</span></div>
        <div className="flex items-center gap-2"><Calendar size={16} className="text-yellow-400" /><span>February 20, 2026</span></div>
        <div className="flex items-center gap-2"><Clock size={16} className="text-yellow-400" /><span>55 min read</span></div>
        <div className="flex items-center gap-2"><Tag size={16} className="text-yellow-400" /><span>JavaScript • V8 Engine • Event Loop</span></div>
      </div>
    </div>
  );
}

/* ─────────────── Table of Contents ─────────────── */
const tocItems = [
  { id: "big-picture", num: "01", title: "The Big Picture" },
  { id: "js-engine", num: "02", title: "JavaScript Engine" },
  { id: "jit-compilation", num: "03", title: "How JS Code is Compiled" },
  { id: "execution-context", num: "04", title: "Execution Context" },
  { id: "memory-code-phase", num: "05", title: "Memory Phase & Code Phase" },
  { id: "hoisting", num: "06", title: "Hoisting" },
  { id: "call-stack", num: "07", title: "The Call Stack" },
  { id: "scope", num: "08", title: "Scope & Scope Chain" },
  { id: "closures", num: "09", title: "Closures" },
  { id: "this-keyword", num: "10", title: "The this Keyword" },
  { id: "prototype", num: "11", title: "Prototype & Prototype Chain" },
  { id: "async-js", num: "12", title: "Asynchronous JavaScript" },
  { id: "web-apis", num: "13", title: "Web APIs & libuv" },
  { id: "task-queues", num: "14", title: "Task Queue & Microtask Queue" },
  { id: "event-loop", num: "15", title: "The Event Loop" },
  { id: "promises", num: "16", title: "Promises Internals" },
  { id: "async-await", num: "17", title: "async/await Internals" },
  { id: "memory-gc", num: "18", title: "Memory Management & GC" },
  { id: "complete-flow", num: "19", title: "Complete Flow Diagram" },
  { id: "cheatsheet", num: "20", title: "Quick Reference Cheatsheet" },
];

function TableOfContents() {
  return (
    <div className="my-12 p-8 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><BookOpen size={24} className="text-yellow-400" />Table of Contents</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {tocItems.map(item => (
          <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/60 transition-all group">
            <span className="text-yellow-400/60 font-mono text-sm w-6">{item.num}</span>
            <span className="text-slate-300 group-hover:text-yellow-300 transition-colors">{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
function JavaScriptInternals2026() {
  return (
    <div className="min-h-screen">
      <JSFeaturedImage />
      <ArticleMetadata />

      <article className="max-w-6xl mx-auto px-6 py-12">
        {/* Intro */}
        <section className="mb-16">
          <p className="text-2xl text-slate-300 leading-relaxed font-light mb-8">
            Every line of JavaScript you write goes through a breathtaking journey — from raw text to optimized machine code, through execution contexts, call stacks, and event loops. This is the <strong className="text-white">most comprehensive guide on the internet</strong> to understanding <em>how JavaScript actually works under the hood</em>. Whether you're preparing for a senior-level interview or simply want to write better code, mastering these internals is what separates good developers from great ones.
          </p>
          <InfoBox type="info" title="Who is this for?" icon={Target}>
            <p>This 20-chapter deep-dive covers everything from V8 engine internals to garbage collection. It's designed for developers who want to go beyond syntax and truly understand the <strong className="text-white">mechanics behind their code</strong>. Diagrams, code examples, and real-world analogies are used throughout.</p>
          </InfoBox>
        </section>

        <TableOfContents />

        {/* ═══════ SECTION 1: The Big Picture ═══════ */}
        <section className="mb-20">
          <SectionHeader id="big-picture" number="01" title="The Big Picture" icon={Target} gradient="from-yellow-500 to-amber-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">Before diving deep, let's trace the complete journey of your JavaScript code — from the moment you write it to the moment it produces results on screen.</p>

            <DiagramBox title="JavaScript Code Lifecycle" color="yellow">{`You write JS code
       ↓
JS Engine receives it (V8 in Chrome/Node, SpiderMonkey in Firefox)
       ↓
Parser → tokenizes → builds AST (Abstract Syntax Tree)
       ↓
Interpreter (Ignition) → converts to Bytecode (runs immediately)
       ↓
Profiler watches → hot code → JIT Compiler (TurboFan) → optimized Machine Code
       ↓
Global Execution Context created
       ↓
Memory Phase → Code Phase
       ↓
Call Stack manages execution
       ↓
Async work → Web APIs / libuv → Queues → Event Loop → Call Stack`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">4 Things That Define JavaScript</h3>
            <div className="grid md:grid-cols-2 gap-4 my-8">
              {[
                { title: "Single-Threaded", desc: "One call stack, one thing at a time. No parallel execution in the main thread.", color: "yellow" },
                { title: "Non-Blocking", desc: "Async operations are offloaded so the main thread never freezes.", color: "green" },
                { title: "Dynamically Typed", desc: "Types are checked at runtime, not compile time. Variables can hold any type.", color: "cyan" },
                { title: "JIT Compiled", desc: "Not purely interpreted or compiled — it's a hybrid approach for maximum performance.", color: "purple" },
              ].map((item, i) => (
                <div key={i} className={`p-5 rounded-xl bg-${item.color}-900/20 border border-${item.color}-700/30`}>
                  <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Check size={18} className={`text-${item.color}-400`} />{item.title}</h4>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <InfoBox type="tip" title="Why This Matters" icon={Lightbulb}>
              Understanding this flow means you'll know <em>why</em> your code behaves the way it does. Bugs in hoisting, event loop timing, and closure behavior all trace back to these internals.
            </InfoBox>
          </div>
        </section>

        {/* ═══════ SECTION 2: JavaScript Engine ═══════ */}
        <section className="mb-20">
          <SectionHeader id="js-engine" number="02" title="JavaScript Engine" icon={Cpu} gradient="from-cyan-500 to-blue-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">The engine is the program that reads and executes your JavaScript. Different browsers and runtimes use different engines, but they all follow the same fundamental principles.</p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-slate-700">
                  <th className="py-3 px-4 text-yellow-300 font-bold">Environment</th>
                  <th className="py-3 px-4 text-yellow-300 font-bold">Engine</th>
                  <th className="py-3 px-4 text-yellow-300 font-bold">Written In</th>
                </tr></thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Chrome / Node.js</td><td className="py-3 px-4">V8</td><td className="py-3 px-4">C++</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Firefox</td><td className="py-3 px-4">SpiderMonkey</td><td className="py-3 px-4">C / C++</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-medium text-white">Safari</td><td className="py-3 px-4">JavaScriptCore (Nitro)</td><td className="py-3 px-4">C++</td></tr>
                  <tr><td className="py-3 px-4 font-medium text-white">Edge (Legacy)</td><td className="py-3 px-4">Chakra</td><td className="py-3 px-4">C++</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><Layers size={24} className="text-cyan-400" />Inside the V8 Engine</h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">V8 has two main components that work together to execute your code:</p>

            <DiagramBox title="V8 Engine Architecture" color="cyan">{`┌─────────────────────────────────────────┐
│               V8 ENGINE                 │
│                                         │
│  ┌──────────────┐   ┌────────────────┐  │
│  │   Memory     │   │   Call Stack   │  │
│  │    Heap      │   │                │  │
│  │              │   │  (where code   │  │
│  │ (where objs  │   │   executes)    │  │
│  │  are stored) │   │                │  │
│  └──────────────┘   └────────────────┘  │
└─────────────────────────────────────────┘`}</DiagramBox>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-xl bg-cyan-900/20 border border-cyan-700/30">
                <h4 className="text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2"><Database size={20} />Memory Heap</h4>
                <p className="text-slate-300">An unstructured memory pool where objects, arrays, and functions are stored. Memory allocation happens here dynamically as your program runs.</p>
              </div>
              <div className="p-6 rounded-xl bg-blue-900/20 border border-blue-700/30">
                <h4 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2"><Layers size={20} />Call Stack</h4>
                <p className="text-slate-300">A LIFO data structure that tracks which function is currently executing. Every function call pushes a new frame; every return pops one off.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 3: JIT Compilation ═══════ */}
        <section className="mb-20">
          <SectionHeader id="jit-compilation" number="03" title="How JS Code is Compiled" icon={Zap} gradient="from-green-500 to-emerald-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">JavaScript uses <strong className="text-white">JIT (Just-In-Time) Compilation</strong> — a hybrid approach that combines the fast startup of an interpreter with the raw speed of a compiler.</p>

            <DiagramBox title="JIT Compilation Pipeline" color="green">{`Source Code
     ↓
┌─────────────┐
│   PARSER    │  → checks syntax, tokenizes code
└─────────────┘
     ↓
┌─────────────┐
│     AST     │  → Abstract Syntax Tree (tree structure of your code)
└─────────────┘
     ↓
┌─────────────┐
│ INTERPRETER │  → converts to Bytecode, starts executing immediately
│  (Ignition) │    (fast startup, slower execution)
└─────────────┘
     ↓ (profiler detects "hot" functions — called repeatedly)
┌─────────────┐
│JIT COMPILER │  → recompiles hot code into optimized Machine Code
│ (TurboFan)  │    (slower to compile, much faster to run)
└─────────────┘
     ↓
 Machine Code runs directly on CPU`}</DiagramBox>

            <InfoBox type="warning" title="Performance Insight" icon={AlertTriangle}>
              Writing predictable, consistent code (same types, same object shapes) helps V8 optimize better. Changing types randomly forces V8 to <strong className="text-white">de-optimize</strong>, falling back to slower bytecode execution.
            </InfoBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">What is the AST?</h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">The Abstract Syntax Tree is a tree representation of your code's structure. Every expression, statement, and declaration becomes a node in this tree.</p>

            <CodeBlock language="javascript" filename="AST Example" code={`// Your code:
const x = 5 + 3

// AST representation (simplified):
{
  type: "VariableDeclaration",
  kind: "const",
  declarations: [{
    type: "VariableDeclarator",
    id: { type: "Identifier", name: "x" },
    init: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Literal", value: 5 },
      right: { type: "Literal", value: 3 }
    }
  }]
}

// Visualize any code's AST at → astexplorer.net`} />
          </div>
        </section>

        {/* ═══════ SECTION 4: Execution Context ═══════ */}
        <section className="mb-20">
          <SectionHeader id="execution-context" number="04" title="Execution Context" icon={Layers} gradient="from-purple-500 to-pink-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">An Execution Context (EC) is the <strong className="text-white">environment</strong> in which JavaScript code is evaluated and executed. Think of it as a container that holds everything needed to run a piece of code.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">Three Types of Execution Context</h3>
            <div className="space-y-4 my-8">
              <div className="p-5 rounded-xl bg-purple-900/20 border border-purple-700/30">
                <h4 className="text-lg font-bold text-purple-300 mb-2">Global Execution Context</h4>
                <p className="text-slate-300">Created once when the script starts. <code className="text-yellow-300">this</code> = <code className="text-yellow-300">window</code> (browser) or <code className="text-yellow-300">module</code> (Node.js). Only one exists per program.</p>
              </div>
              <div className="p-5 rounded-xl bg-blue-900/20 border border-blue-700/30">
                <h4 className="text-lg font-bold text-blue-300 mb-2">Function Execution Context</h4>
                <p className="text-slate-300">Created every time a function is called. Each call gets a brand-new EC, even recursive calls to the same function.</p>
              </div>
              <div className="p-5 rounded-xl bg-red-900/20 border border-red-700/30">
                <h4 className="text-lg font-bold text-red-300 mb-2">Eval Execution Context</h4>
                <p className="text-slate-300">Created inside <code className="text-yellow-300">eval()</code>. Avoid using eval — it's a security risk and blocks engine optimizations.</p>
              </div>
            </div>

            <DiagramBox title="Inside an Execution Context" color="purple">{`┌──────────────────────────────────────────┐
│           EXECUTION CONTEXT              │
│                                          │
│  ┌─────────────────────────────────┐     │
│  │      Variable Environment       │     │
│  │  (var declarations, functions)  │     │
│  └─────────────────────────────────┘     │
│                                          │
│  ┌─────────────────────────────────┐     │
│  │        Lexical Environment      │     │
│  │  (let, const, outer reference)  │     │
│  └─────────────────────────────────┘     │
│                                          │
│  ┌─────────────────────────────────┐     │
│  │          'this' binding         │     │
│  └─────────────────────────────────┘     │
└──────────────────────────────────────────┘`}</DiagramBox>
          </div>
        </section>

        {/* ═══════ SECTION 5: Memory Phase & Code Phase ═══════ */}
        <section className="mb-20">
          <SectionHeader id="memory-code-phase" number="05" title="Memory Phase & Code Phase" icon={Database} gradient="from-amber-500 to-orange-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">Every Execution Context is created in <strong className="text-white">two distinct phases</strong>. Understanding these phases is the key to understanding hoisting.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">Phase 1 — Memory Creation (Hoisting Phase)</h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">The JS engine scans the <em>entire</em> code BEFORE executing a single line:</p>

            <DiagramBox title="Memory Allocation Rules" color="yellow">{`For var declarations  → stored with value: undefined
For let/const         → stored but in Temporal Dead Zone (TDZ)
For function declarations → stored with FULL function definition
For function expressions → treated like var (undefined)`}</DiagramBox>

            <CodeBlock language="javascript" filename="memory-phase.js" code={`// What you write:
console.log(a)      // undefined (not error — var hoisted)
console.log(b)      // ReferenceError — TDZ
console.log(greet)  // [Function: greet] — fully hoisted

var a = 10
let b = 20
function greet() { return "hello" }`} />

            <DiagramBox title="Memory Phase — Before Any Code Runs" color="cyan">{`┌────────────────────────────────────────┐
│  Variable Environment                  │
│                                        │
│  a        →  undefined                 │
│  b        →  <TDZ — uninitialized>     │
│  greet    →  function greet() {...}    │
└────────────────────────────────────────┘`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Phase 2 — Code Execution Phase</h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">Code runs <strong className="text-white">line by line</strong>, top to bottom. Values get assigned to previously allocated memory slots.</p>

            <DiagramBox title="Code Execution — Line by Line" color="green">{`┌────────────────────────────────────────┐
│  Line 4: a = 10  →  a updated from undefined to 10  │
│  Line 5: b = 20  →  b initialized, TDZ ends         │
│  Line 6: greet already stored — no update needed     │
└────────────────────────────────────────┘`}</DiagramBox>
          </div>
        </section>

        {/* ═══════ SECTION 6: Hoisting ═══════ */}
        <section className="mb-20">
          <SectionHeader id="hoisting" number="06" title="Hoisting" icon={TrendingUp} gradient="from-red-500 to-rose-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">Hoisting is the behavior where <strong className="text-white">declarations are processed during the Memory Phase</strong> before any code executes. It's not that code physically moves — rather, the engine already knows about declarations before running anything.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">var Hoisting</h3>
            <CodeBlock language="javascript" code={`console.log(x)  // undefined (hoisted, not initialized)
var x = 5
console.log(x)  // 5

// JS sees it as:
var x           // declaration hoisted to top
console.log(x)  // undefined
x = 5           // assignment stays here
console.log(x)  // 5`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">let & const — Temporal Dead Zone (TDZ)</h3>
            <CodeBlock language="javascript" code={`console.log(y)  // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10

// let and const ARE hoisted (JS knows they exist)
// but they're in TDZ from start of scope until declaration line
// accessing them in TDZ = ReferenceError`} />

            <DiagramBox title="TDZ Visualized" color="red">{`┌── start of scope ────────────────────────┐
│  ← TDZ for y (exists but not accessible) │
│  ← TDZ for y                             │
│  let y = 10  ← TDZ ENDS here             │
│  console.log(y)  ← safe to access now    │
└──────────────────────────────────────────┘`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Function Hoisting</h3>
            <CodeBlock language="javascript" code={`// Function DECLARATION — fully hoisted
greet()  // ✅ "Hello" — works before declaration
function greet() { console.log("Hello") }

// Function EXPRESSION — NOT fully hoisted (treated like var)
sayHi()  // ❌ TypeError: sayHi is not a function
var sayHi = function() { console.log("Hi") }

// Arrow function — same as function expression
sayBye() // ❌ TypeError
var sayBye = () => console.log("Bye")`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Hoisting Summary Table</h3>
            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-slate-700">
                  <th className="py-3 px-4 text-yellow-300">Declaration</th>
                  <th className="py-3 px-4 text-yellow-300">Hoisted?</th>
                  <th className="py-3 px-4 text-yellow-300">Initial Value</th>
                  <th className="py-3 px-4 text-yellow-300">Accessible Before Init?</th>
                </tr></thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800"><td className="py-3 px-4"><code className="text-yellow-300">var</code></td><td className="py-3 px-4">✅ Yes</td><td className="py-3 px-4"><code>undefined</code></td><td className="py-3 px-4">✅ Yes (gets undefined)</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4"><code className="text-yellow-300">let</code></td><td className="py-3 px-4">✅ Yes</td><td className="py-3 px-4">TDZ</td><td className="py-3 px-4">❌ No (ReferenceError)</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4"><code className="text-yellow-300">const</code></td><td className="py-3 px-4">✅ Yes</td><td className="py-3 px-4">TDZ</td><td className="py-3 px-4">❌ No (ReferenceError)</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4"><code className="text-yellow-300">function</code> declaration</td><td className="py-3 px-4">✅ Yes</td><td className="py-3 px-4">Full definition</td><td className="py-3 px-4">✅ Yes</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4"><code className="text-yellow-300">function</code> expression</td><td className="py-3 px-4">✅ (as var)</td><td className="py-3 px-4"><code>undefined</code></td><td className="py-3 px-4">❌ No (TypeError)</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-yellow-300">class</code></td><td className="py-3 px-4">✅ Yes</td><td className="py-3 px-4">TDZ</td><td className="py-3 px-4">❌ No (ReferenceError)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 7: Call Stack ═══════ */}
        <section className="mb-20">
          <SectionHeader id="call-stack" number="07" title="The Call Stack" icon={Layers} gradient="from-indigo-500 to-violet-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">The Call Stack is a <strong className="text-white">LIFO (Last In, First Out)</strong> data structure that tracks execution contexts. JS can only execute what's on <strong className="text-white">top</strong> of the stack.</p>

            <CodeBlock language="javascript" filename="call-stack-demo.js" code={`function multiply(a, b) {
    return a * b
}
function square(n) {
    return multiply(n, n)
}
function printSquare(n) {
    const result = square(n)
    console.log(result)
}
printSquare(4)  // Output: 16`} />

            <DiagramBox title="Call Stack Step-by-Step" color="purple">{`Step 1: Script starts               Step 2: printSquare(4)
┌──────────────────────┐            ┌──────────────────────┐
│  Global EC           │  ← only    │  printSquare EC      │  ← pushed
└──────────────────────┘            ├──────────────────────┤
                                    │  Global EC           │
                                    └──────────────────────┘

Step 3: square(4)                   Step 4: multiply(4,4)
┌──────────────────────┐            ┌──────────────────────┐
│  square EC           │  ← pushed  │  multiply EC         │  ← TOP
├──────────────────────┤            ├──────────────────────┤
│  printSquare EC      │            │  square EC           │
├──────────────────────┤            ├──────────────────────┤
│  Global EC           │            │  printSquare EC      │
└──────────────────────┘            ├──────────────────────┤
                                    │  Global EC           │
                                    └──────────────────────┘

Step 5: multiply returns 16 → POPPED
Step 6: square returns 16   → POPPED
Step 7: console.log(16)     → POPPED
Step 8: printSquare done    → POPPED
Step 9: Global EC           → POPPED (program ends)`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><AlertTriangle size={24} className="text-red-400" />Stack Overflow</h3>
            <CodeBlock language="javascript" code={`function infinite() {
    return infinite()  // calls itself forever
}
infinite()
// ❌ RangeError: Maximum call stack size exceeded
// Stack grows until memory runs out — this is a "stack overflow"`} />

            <InfoBox type="danger" title="Interview Tip" icon={AlertTriangle}>
              The call stack has a <strong className="text-white">finite size limit</strong> (varies by engine, typically ~10,000–25,000 frames). Infinite recursion without a base case will always crash. Use tail-call optimization or convert recursion to iteration for deep call chains.
            </InfoBox>
          </div>
        </section>

        {/* ═══════ SECTION 8: Scope & Scope Chain ═══════ */}
        <section className="mb-20">
          <SectionHeader id="scope" number="08" title="Scope & Scope Chain" icon={GitBranch} gradient="from-teal-500 to-cyan-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6"><strong className="text-white">Scope</strong> determines where a variable is accessible. JavaScript has three types of scope, and they nest to form a <strong className="text-white">scope chain</strong>.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">Three Types of Scope</h3>
            <CodeBlock language="javascript" filename="scope-types.js" code={`// 1. GLOBAL SCOPE
var globalVar = "I'm everywhere"

function example() {
    // 2. FUNCTION SCOPE
    var funcVar = "only inside this function"

    if (true) {
        // 3. BLOCK SCOPE (let/const only)
        let blockVar = "only inside this block"
        var notBlockScoped = "I leak out to function scope"
    }

    console.log(notBlockScoped)  // ✅ accessible (var ignores blocks)
    console.log(blockVar)        // ❌ ReferenceError (let is block scoped)
}`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Scope Chain</h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">When JS looks for a variable, it searches up the chain: Current scope → Outer scope → ... → Global scope → ReferenceError</p>

            <CodeBlock language="javascript" filename="scope-chain.js" code={`const a = 'global'

function outer() {
    const b = 'outer'
    function middle() {
        const c = 'middle'
        function inner() {
            const d = 'inner'
            console.log(d)  // ✅ found in own scope
            console.log(c)  // ✅ found in middle scope (1 level up)
            console.log(b)  // ✅ found in outer scope (2 levels up)
            console.log(a)  // ✅ found in global scope (3 levels up)
            console.log(e)  // ❌ ReferenceError — not found anywhere
        }
        inner()
    }
    middle()
}
outer()`} />

            <DiagramBox title="Scope Chain Lookup Path" color="cyan">{`inner() scope  →  middle() scope  →  outer() scope  →  Global scope  →  ❌ ReferenceError
     d                  c                   b                  a`}</DiagramBox>

            <InfoBox type="tip" title="Key Insight" icon={Lightbulb}>
              The scope chain is determined by where functions are <strong className="text-white">written</strong> (lexical scope), NOT where they are <em>called</em>. This is called <strong className="text-white">lexical scoping</strong> — the physical position in your code determines variable access.
            </InfoBox>
          </div>
        </section>

        {/* ═══════ SECTION 9: Closures ═══════ */}
        <section className="mb-20">
          <SectionHeader id="closures" number="09" title="Closures" icon={Lock} gradient="from-pink-500 to-rose-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">A closure is a function that <strong className="text-white">remembers the variables from its outer scope</strong> even after the outer function has finished executing. This is one of the most powerful and commonly misunderstood concepts in JavaScript.</p>

            <CodeBlock language="javascript" filename="closure-basics.js" code={`function makeCounter() {
    let count = 0        // this variable "closes over" into inner function

    return function() {
        count++
        return count
    }
}

const counter = makeCounter()
// makeCounter() has finished — its EC is gone from call stack
// BUT count still lives because the inner function holds a reference

console.log(counter())  // 1
console.log(counter())  // 2
console.log(counter())  // 3`} />

            <DiagramBox title="How Closures Work Internally" color="purple">{`makeCounter() finishes and pops off call stack
BUT the returned function holds a reference to:
┌────────────────────────────────────┐
│  Closure (makeCounter scope)       │
│  count: 0 → 1 → 2 → 3             │
│  (stays in memory heap)            │
└────────────────────────────────────┘
Garbage collector won't clean this
because the inner function still references it`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real-World Uses of Closures</h3>
            <CodeBlock language="javascript" filename="closure-patterns.js" code={`// 1. DATA PRIVACY (encapsulation)
function createBankAccount(initialBalance) {
    let balance = initialBalance  // private — can't access directly
    return {
        deposit: (amount) => { balance += amount },
        withdraw: (amount) => { balance -= amount },
        getBalance: () => balance
    }
}
const account = createBankAccount(1000)
account.deposit(500)
console.log(account.getBalance())  // 1500
console.log(account.balance)       // undefined — no direct access!

// 2. FUNCTION FACTORIES
function multiply(x) {
    return (y) => x * y     // closes over x
}
const double = multiply(2)
const triple = multiply(3)
double(5)   // 10
triple(5)   // 15

// 3. MEMOIZATION
function memoize(fn) {
    const cache = {}         // closes over cache
    return function(n) {
        if (cache[n]) return cache[n]
        cache[n] = fn(n)
        return cache[n]
    }
}`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><AlertTriangle size={24} className="text-red-400" />Classic Closure Gotcha</h3>
            <CodeBlock language="javascript" filename="closure-gotcha.js" code={`// ❌ BUG — var doesn't create new scope per iteration
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000)
}
// Output: 3, 3, 3  (NOT 0, 1, 2)
// All closures share the SAME i (var is function scoped)

// ✅ FIX 1 — use let (block scoped, new binding per iteration)
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000)
}
// Output: 0, 1, 2

// ✅ FIX 2 — use IIFE to create new scope
for (var i = 0; i < 3; i++) {
    ((j) => {
        setTimeout(() => console.log(j), 1000)
    })(i)
}`} />
          </div>
        </section>

        {/* ═══════ SECTION 10: The this Keyword ═══════ */}
        <section className="mb-20">
          <SectionHeader id="this-keyword" number="10" title="The this Keyword" icon={Target} gradient="from-orange-500 to-red-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6"><code className="text-yellow-300">this</code> refers to the <strong className="text-white">object that is currently executing the function</strong>. Unlike most languages, it's determined at <strong className="text-white">call time</strong>, not definition time (except arrow functions).</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">5 Rules of <code className="text-yellow-300">this</code></h3>
            <CodeBlock language="javascript" filename="this-rules.js" code={`// RULE 1: Global context
console.log(this)  // window (browser) / {} (Node module)

// RULE 2: Object method — this = the object
const user = {
    name: "Dev Kant",
    greet() { console.log(this.name) }  // "Dev Kant"
}
user.greet()

// RULE 3: Regular function — this = undefined (strict) or window
function standalone() {
    console.log(this)  // undefined in strict mode
}
standalone()

// RULE 4: Arrow function — this = inherited from surrounding scope
const obj = {
    name: "Dev Kant",
    greet: () => {
        console.log(this.name)  // undefined! arrow has no own 'this'
    },
    greetCorrect() {
        const arrow = () => console.log(this.name)  // ✅ inherits
        arrow()
    }
}

// RULE 5: Constructor / new keyword — this = newly created object
function Person(name) {
    this.name = name    // this = new empty object
}
const dev = new Person("Dev Kant")
console.log(dev.name)  // "Dev Kant"`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Explicitly Setting <code className="text-yellow-300">this</code></h3>
            <CodeBlock language="javascript" code={`function introduce(greeting) {
    console.log(\`\${greeting}, I'm \${this.name}\`)
}
const person = { name: "Dev Kant" }

// call — invoke immediately, pass args individually
introduce.call(person, "Hello")

// apply — invoke immediately, pass args as array
introduce.apply(person, ["Hi"])

// bind — returns NEW function with this permanently bound
const boundIntroduce = introduce.bind(person)
boundIntroduce("Hey")`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6"><code className="text-yellow-300">this</code> Summary Table</h3>
            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-slate-700">
                  <th className="py-3 px-4 text-yellow-300">Context</th>
                  <th className="py-3 px-4 text-yellow-300">this value</th>
                </tr></thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">Global (browser)</td><td className="py-3 px-4"><code>window</code></td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">Global (Node strict)</td><td className="py-3 px-4"><code>{"{}"}</code></td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">Object method</td><td className="py-3 px-4">The object</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">Regular function</td><td className="py-3 px-4"><code>undefined</code> (strict) / <code>window</code></td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">Arrow function</td><td className="py-3 px-4">Lexical (from surrounding scope)</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4"><code>new</code> keyword</td><td className="py-3 px-4">Newly created object</td></tr>
                  <tr><td className="py-3 px-4"><code>call / apply / bind</code></td><td className="py-3 px-4">Whatever you pass</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 11: Prototype & Prototype Chain ═══════ */}
        <section className="mb-20">
          <SectionHeader id="prototype" number="11" title="Prototype & Prototype Chain" icon={GitBranch} gradient="from-emerald-500 to-green-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">Every object in JS has a hidden <code className="text-yellow-300">[[Prototype]]</code> property pointing to another object. This forms the <strong className="text-white">prototype chain</strong> — JavaScript's inheritance system.</p>

            <CodeBlock language="javascript" filename="prototype-basics.js" code={`const arr = [1, 2, 3]
// arr has access to .map(), .filter(), .push() etc.
// but YOU didn't define them — where do they come from?
// Answer: arr → Array.prototype → Object.prototype → null

function Dog(name) {
    this.name = name
}
Dog.prototype.bark = function() {
    console.log(\`\${this.name} says Woof!\`)
}

const dog1 = new Dog("Bruno")
dog1.bark()  // "Bruno says Woof!"

// When JS looks up dog1.bark:
// 1. Check dog1 own properties → not found
// 2. Check Dog.prototype → found! ✅ execute it`} />

            <DiagramBox title="Prototype Chain" color="green">{`dog1 object
  name: "Bruno"
  [[Prototype]] → Dog.prototype
                    bark: function
                    [[Prototype]] → Object.prototype
                                      toString: function
                                      hasOwnProperty: function
                                      [[Prototype]] → null (end of chain)`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">ES6 Classes = Prototype Syntax Sugar</h3>
            <CodeBlock language="javascript" filename="class-sugar.js" code={`// Class syntax (modern, clean)
class Animal {
    constructor(name) { this.name = name }
    speak() { console.log(\`\${this.name} makes a sound\`) }
}

class Dog extends Animal {
    speak() { console.log(\`\${this.name} barks\`) }
}

// Under the hood, JS is STILL using prototypes
// 'extends' sets up the prototype chain
// 'super()' calls the parent constructor
// Classes are just a cleaner API for the same mechanism`} />

            <InfoBox type="info" title="Key Takeaway" icon={Lightbulb}>
              Classes in JavaScript are <strong className="text-white">not like classes in Java or C++</strong>. They're syntactic sugar over prototypal inheritance. The <code className="text-yellow-300">extends</code> keyword simply creates the prototype chain for you.
            </InfoBox>
          </div>
        </section>

        {/* ═══════ SECTION 12: Asynchronous JavaScript ═══════ */}
        <section className="mb-20">
          <SectionHeader id="async-js" number="12" title="Asynchronous JavaScript" icon={Repeat} gradient="from-blue-500 to-indigo-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">JS is single-threaded — it can only do one thing at a time. But the real world needs async operations: network requests, timers, file reads. How does JS handle this without freezing?</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6 flex items-center gap-3"><AlertTriangle size={24} className="text-red-400" />The Problem</h3>
            <CodeBlock language="javascript" code={`// If JS were purely synchronous:
const data = fetch('https://api.example.com/data')  // takes 2 seconds
console.log(data)   // everything FREEZES for 2 seconds
// User can't click, scroll, type — completely blocked`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><Rocket size={24} className="text-green-400" />The Solution — Offloading to the Environment</h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">JS doesn't handle async work itself. It hands it off to the <strong className="text-white">environment</strong>:</p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-xl bg-cyan-900/20 border border-cyan-700/30">
                <h4 className="text-lg font-bold text-cyan-300 mb-2">Browser → Web APIs</h4>
                <p className="text-slate-300 text-sm">fetch, setTimeout, DOM events, localStorage</p>
              </div>
              <div className="p-5 rounded-xl bg-green-900/20 border border-green-700/30">
                <h4 className="text-lg font-bold text-green-300 mb-2">Node.js → libuv</h4>
                <p className="text-slate-300 text-sm">File system, network, timers, crypto</p>
              </div>
            </div>

            <DiagramBox title="Async Offloading Flow" color="cyan">{`JS (single thread)                  Environment (multi-threaded)
       │                                      │
       │── setTimeout(fn, 2000) ──────────────▶│ Timer starts here
       │                                       │ JS moves on immediately
       │── fetch(url) ────────────────────────▶│ HTTP request here
       │                                       │
       │ (continues executing other code)      │ (handling async in bg)
       │                                       │
       │                          ◀────────────│ Timer done, response ready
       │                          (callback/promise pushed to queue)
       │
    Event Loop picks up from queue when call stack is empty`}</DiagramBox>
          </div>
        </section>

        {/* ═══════ SECTION 13: Web APIs & libuv ═══════ */}
        <section className="mb-20">
          <SectionHeader id="web-apis" number="13" title="Web APIs & libuv" icon={Server} gradient="from-violet-500 to-purple-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <h3 className="text-2xl font-bold text-white mt-4 mb-6">In the Browser — Web APIs</h3>
            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-slate-700">
                  <th className="py-3 px-4 text-yellow-300">API</th>
                  <th className="py-3 px-4 text-yellow-300">Purpose</th>
                </tr></thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-mono">setTimeout / setInterval</td><td className="py-3 px-4">Timer API</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-mono">fetch / XMLHttpRequest</td><td className="py-3 px-4">Network API</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-mono">addEventListener</td><td className="py-3 px-4">DOM Events API</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-mono">localStorage</td><td className="py-3 px-4">Storage API</td></tr>
                  <tr><td className="py-3 px-4 font-mono">Geolocation</td><td className="py-3 px-4">Device API</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">In Node.js — libuv</h3>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">libuv is a C++ library that gives Node.js async I/O capabilities.</p>
            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-slate-700">
                  <th className="py-3 px-4 text-yellow-300">Operation</th>
                  <th className="py-3 px-4 text-yellow-300">Handled By</th>
                </tr></thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">File System (fs)</td><td className="py-3 px-4">libuv thread pool</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">Network (http)</td><td className="py-3 px-4">OS kernel (epoll/kqueue)</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">DNS lookups</td><td className="py-3 px-4">libuv thread pool</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4">Crypto (heavy)</td><td className="py-3 px-4">libuv thread pool</td></tr>
                  <tr><td className="py-3 px-4">Timers</td><td className="py-3 px-4">libuv timer mechanism</td></tr>
                </tbody>
              </table>
            </div>

            <DiagramBox title="Node.js Architecture" color="purple">{`┌─────────────────────────────────────────────────────┐
│                    Your JS Code                     │
├─────────────────────────────────────────────────────┤
│                    Node.js APIs                     │
├─────────────────────────────────────────────────────┤
│              V8 Engine    │    libuv                │
│           (executes JS)   │  (async I/O)            │
│                           │  - Thread Pool (4)      │
│                           │  - Event Loop           │
│                           │  - OS Async             │
└─────────────────────────────────────────────────────┘`}</DiagramBox>
          </div>
        </section>

        {/* ═══════ SECTION 14: Task Queue & Microtask Queue ═══════ */}
        <section className="mb-20">
          <SectionHeader id="task-queues" number="14" title="Task Queue & Microtask Queue" icon={Layers} gradient="from-amber-500 to-yellow-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">When async operations complete, their callbacks don't go directly to the call stack. They wait in <strong className="text-white">queues</strong>, each with different priorities.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">Two Queues, Different Priorities</h3>
            <div className="space-y-4 my-8">
              <div className="p-6 rounded-xl bg-green-900/20 border border-green-500/30">
                <h4 className="text-xl font-bold text-green-300 mb-3">🔥 Microtask Queue (HIGH PRIORITY)</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2"><Check size={16} className="text-green-400 mt-1 flex-shrink-0" /><span>Promise .then() / .catch() / .finally()</span></li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-green-400 mt-1 flex-shrink-0" /><span>async/await continuations</span></li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-green-400 mt-1 flex-shrink-0" /><span>queueMicrotask()</span></li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-green-400 mt-1 flex-shrink-0" /><span>MutationObserver callbacks</span></li>
                </ul>
                <p className="text-green-400 font-semibold mt-3 text-sm">↑ Processed COMPLETELY before any macrotask</p>
              </div>
              <div className="p-6 rounded-xl bg-blue-900/20 border border-blue-500/30">
                <h4 className="text-xl font-bold text-blue-300 mb-3">📋 Macrotask Queue (LOWER PRIORITY)</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2"><Check size={16} className="text-blue-400 mt-1 flex-shrink-0" /><span>setTimeout / setInterval callbacks</span></li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-blue-400 mt-1 flex-shrink-0" /><span>setImmediate (Node.js)</span></li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-blue-400 mt-1 flex-shrink-0" /><span>I/O callbacks</span></li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-blue-400 mt-1 flex-shrink-0" /><span>UI rendering (browser)</span></li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Proof — Queue Priority</h3>
            <CodeBlock language="javascript" filename="queue-priority.js" code={`console.log('1 — synchronous')

setTimeout(() => console.log('2 — macrotask'), 0)

Promise.resolve().then(() => console.log('3 — microtask'))

console.log('4 — synchronous')

// OUTPUT:
// 1 — synchronous
// 4 — synchronous
// 3 — microtask      ← runs BEFORE macrotask even with 0ms timeout!
// 2 — macrotask`} />

            <InfoBox type="warning" title="This Is an Interview Favorite!" icon={AlertTriangle}>
              The order of execution (sync → microtasks → macrotasks) is one of the most commonly asked questions in JavaScript interviews. Understanding <em>why</em> microtasks run before macrotasks requires understanding the event loop — covered next.
            </InfoBox>
          </div>
        </section>

        {/* ═══════ SECTION 15: The Event Loop ═══════ */}
        <section className="mb-20">
          <SectionHeader id="event-loop" number="15" title="The Event Loop" icon={Repeat} gradient="from-cyan-500 to-teal-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">The Event Loop is the <strong className="text-white">heart of JavaScript's asynchronous model</strong>. It bridges the call stack to the task queues, ensuring non-blocking execution.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">The Event Loop Algorithm</h3>
            <DiagramBox title="Event Loop Tick — Exact Order" color="cyan">{`1. Execute ALL synchronous code (drain the call stack)
2. Process ALL microtasks (drain microtask queue completely)
   → if microtasks add more microtasks, process those too
   → keep going until microtask queue is EMPTY
3. Pick ONE macrotask from macrotask queue
4. Execute it (may add to call stack)
5. Process ALL microtasks again (step 2)
6. Render (browser only — if needed)
7. Pick next macrotask (step 3)
8. Repeat forever`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Full Event Loop Diagram</h3>
            <DiagramBox title="Complete Event Loop Architecture" color="yellow">{`┌──────────────────────────────────────────────────────────┐
│                      YOUR CODE                           │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│                     CALL STACK                            │
│  ┌──────────────┐                                        │
│  │  current fn  │  ← executes one thing at a time        │
│  └──────────────┘                                        │
└────────────────┬─────────────────┬───────────────────────┘
     │ empty?                      │ async call?
     │                             ▼
     │              ┌──────────────────────────────┐
     │              │  WEB APIs / libuv             │
     │              │  setTimeout → timer           │
     │              │  fetch → HTTP request         │
     │              └──────────┬───────────────────┘
     │                         │ work done
     │              ┌──────────▼───────────────────┐
     │         ┌────▼──────────┐   ┌──────────────▼──┐
     │         │ MICROTASK     │   │   MACROTASK      │
     │         │ QUEUE         │   │   QUEUE          │
     │         │ (promises)    │   │ (setTimeout etc) │
     │         └────┬──────────┘   └─────────────────┘
     │              │ priority ↑        │ lower priority
     └──────────────▼───────────────────┘
                    ↑
               EVENT LOOP
         (bridges queues → stack)
         checks: is call stack empty?
         → yes: push next task
         → no: wait`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><AlertTriangle size={24} className="text-red-400" />Microtask Starvation (Edge Case)</h3>
            <CodeBlock language="javascript" filename="starvation.js" code={`// ⚠️ This will NEVER execute the setTimeout!
function keepAddingMicrotasks() {
    Promise.resolve().then(keepAddingMicrotasks)
    // keeps adding to microtask queue infinitely
    // event loop never gets to macrotask queue
}
keepAddingMicrotasks()
setTimeout(() => console.log('never runs'), 0)

// The microtask queue never empties, so the macrotask
// (setTimeout callback) is starved and never executes`} />

            <InfoBox type="danger" title="Critical Warning" icon={AlertTriangle}>
              Microtask starvation can freeze your entire application. If microtasks keep spawning more microtasks, macrotasks (including UI rendering) will never execute. Always ensure your microtask chains have a definite end.
            </InfoBox>
          </div>
        </section>

        {/* ═══════ SECTION 16: Promises Internals ═══════ */}
        <section className="mb-20">
          <SectionHeader id="promises" number="16" title="Promises Internals" icon={Hash} gradient="from-blue-500 to-cyan-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">A Promise is an object representing the <strong className="text-white">eventual completion or failure</strong> of an asynchronous operation.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">Three States of a Promise</h3>
            <DiagramBox title="Promise State Machine" color="cyan">{`PENDING ──── resolve(value) ────▶ FULFILLED ✅
     │
     └─────── reject(reason) ────▶ REJECTED ❌

Once settled (fulfilled or rejected), state NEVER changes.
A promise can only transition ONCE.`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">How Promises Work Internally</h3>
            <CodeBlock language="javascript" filename="promise-internals.js" code={`// When you create a Promise:
const p = new Promise((resolve, reject) => {
    // executor runs SYNCHRONOUSLY immediately
    setTimeout(() => resolve(42), 1000)
})

// p is in PENDING state right now

p.then(value => console.log(value))
// .then() registers a callback — doesn't run yet
// when resolve(42) fires after 1 second:
// → callback goes to MICROTASK QUEUE
// → event loop picks it up → runs it → prints 42`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Promise Chaining</h3>
            <CodeBlock language="javascript" code={`fetch('/api/user')
    .then(response => response.json())      // returns new Promise
    .then(data => data.name)               // returns new Promise
    .then(name => console.log(name))       // chain continues
    .catch(err => console.error(err))      // catches any error above
    .finally(() => console.log('done'))    // always runs

// Each .then() returns a NEW Promise — this enables chaining`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Promise Static Methods</h3>
            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-slate-700">
                  <th className="py-3 px-4 text-yellow-300">Method</th>
                  <th className="py-3 px-4 text-yellow-300">Resolves When</th>
                  <th className="py-3 px-4 text-yellow-300">Rejects When</th>
                </tr></thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-mono text-cyan-300">Promise.all()</td><td className="py-3 px-4">ALL resolve</td><td className="py-3 px-4">ANY rejects</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-mono text-cyan-300">Promise.allSettled()</td><td className="py-3 px-4">ALL settle (always)</td><td className="py-3 px-4">Never rejects</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-3 px-4 font-mono text-cyan-300">Promise.race()</td><td className="py-3 px-4">First to settle</td><td className="py-3 px-4">First to settle</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-cyan-300">Promise.any()</td><td className="py-3 px-4">First SUCCESS</td><td className="py-3 px-4">ALL reject</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 17: async/await Internals ═══════ */}
        <section className="mb-20">
          <SectionHeader id="async-await" number="17" title="async/await Internals" icon={Zap} gradient="from-purple-500 to-indigo-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6"><code className="text-yellow-300">async/await</code> is <strong className="text-white">syntactic sugar over Promises</strong>. It makes async code look synchronous while behaving the same way under the hood.</p>

            <CodeBlock language="javascript" filename="async-vs-promise.js" code={`// Promise version
function getUser() {
    return fetch('/api/user')
        .then(res => res.json())
        .then(data => data.name)
}

// async/await version — same thing, cleaner syntax
async function getUser() {
    const res = await fetch('/api/user')   // pauses HERE
    const data = await res.json()         // pauses HERE
    return data.name
}`} />

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">What Actually Happens with await</h3>
            <CodeBlock language="javascript" filename="await-flow.js" code={`async function example() {
    console.log('A')
    const result = await Promise.resolve(42)
    // Everything AFTER await goes into microtask queue
    console.log('B', result)  // this runs later
}

console.log('1')
example()
console.log('2')

// Output:
// 1
// A        ← async function starts synchronously
// 2        ← continues synchronous code after example() call
// B 42     ← microtask runs after call stack clears`} />

            <DiagramBox title="async/await Execution Flow" color="purple">{`async function hits await
        ↓
pauses function execution
registers continuation as microtask
        ↓
returns control to caller
        ↓
caller continues synchronously
        ↓
call stack empties
        ↓
event loop picks up continuation from microtask queue
        ↓
async function resumes after await line`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Error Handling with try/catch</h3>
            <CodeBlock language="javascript" filename="async-error.js" code={`async function getData() {
    try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('HTTP error!')
        const data = await res.json()
        return data
    } catch (err) {
        console.error('Failed:', err.message)
    } finally {
        console.log('cleanup always runs')
    }
}`} />
          </div>
        </section>

        {/* ═══════ SECTION 18: Memory Management & GC ═══════ */}
        <section className="mb-20">
          <SectionHeader id="memory-gc" number="18" title="Memory Management & Garbage Collection" icon={Shield} gradient="from-red-500 to-pink-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">JS automatically manages memory — you don't free it manually like C/C++. Understanding how it works helps you avoid <strong className="text-white">memory leaks</strong>.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-6">Memory Lifecycle</h3>
            <DiagramBox title="Three Stages of Memory" color="red">{`1. ALLOCATE   → JS allocates memory when you declare variables, objects
2. USE        → read/write the value
3. RELEASE    → garbage collector frees memory when no longer needed`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Garbage Collection — Mark & Sweep</h3>
            <DiagramBox title="V8 Mark & Sweep Algorithm" color="green">{`1. Start from "roots" (global variables, call stack variables)
2. Mark everything reachable from roots
3. Sweep (delete) everything NOT marked
4. Compact memory (optional — reduces fragmentation)

"Reachable" = can be accessed from root via references
"Unreachable" = garbage, will be collected`}</DiagramBox>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"><AlertTriangle size={24} className="text-red-400" />Common Memory Leaks</h3>
            <CodeBlock language="javascript" filename="memory-leaks.js" code={`// ❌ LEAK 1: Accidental globals
function leak() {
    forgotVar = "I'm global now"  // no let/const/var → goes to window
}

// ❌ LEAK 2: Forgotten timers
const data = hugeDataSet
setInterval(() => {
    processData(data)  // data is never freed, timer keeps reference
}, 1000)
// Always clearInterval() when done!

// ❌ LEAK 3: Detached DOM nodes
let element = document.getElementById('btn')
document.body.removeChild(element)  // removed from DOM
// BUT element variable still holds reference — NOT garbage collected
element = null  // ✅ fix: explicitly null the reference

// ❌ LEAK 4: Closures holding large data
function process() {
    const bigData = new Array(1000000).fill('data')
    return function() {
        // closes over bigData even if not using it
        return 'done'
    }
}`} />

            <InfoBox type="warning" title="Pro Tip" icon={Lightbulb}>
              Use Chrome DevTools Memory tab to detect leaks. Take heap snapshots before and after user actions — if memory keeps growing without being released, you have a leak.
            </InfoBox>
          </div>
        </section>

        {/* ═══════ SECTION 19: Complete Flow Diagram ═══════ */}
        <section className="mb-20">
          <SectionHeader id="complete-flow" number="19" title="Complete Flow Diagram" icon={Rocket} gradient="from-yellow-500 to-amber-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">Here's the <strong className="text-white">master diagram</strong> that ties every concept together — from source code to execution to async handling. This is the single most important visualization in this entire guide.</p>

            <DiagramBox title="JavaScript Complete Flow — Master Diagram" color="yellow">{`SOURCE CODE
    │
    ▼
┌─────────────────────┐
│   JS ENGINE (V8)    │
│  Parser             │ → tokenize → AST
│  Ignition           │ → bytecode (fast start)
│  TurboFan           │ → machine code (hot paths)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────────┐
│              GLOBAL EXECUTION CONTEXT            │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           MEMORY PHASE                   │   │
│  │  var → undefined                         │   │
│  │  let/const → TDZ                         │   │
│  │  function → full definition              │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           CODE PHASE                     │   │
│  │  line by line execution                  │   │
│  │  values assigned                         │   │
│  │  functions called → new EC created       │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────┐     ┌──────────────────────────────┐
│     CALL STACK      │     │    WEB APIs / libuv           │
│                     │────▶│  setTimeout ──▶ timer        │
│  [current EC]       │     │  fetch ──────▶ HTTP          │
│  [outer EC]         │     │  fs.read ────▶ disk I/O      │
│  [Global EC]        │◀────│                              │
└─────────────────────┘     └──────────────┬───────────────┘
           ▲                               │ done
           │                    ┌──────────▼───────────────┐
           │             ┌──────▼───────┐  ┌─────────────▼─┐
           │             │  MICROTASK   │  │  MACROTASK    │
           │             │    QUEUE     │  │    QUEUE      │
           │             │ Promise.then │  │ setTimeout cb │
           │             │ await cont.  │  │ setInterval   │
           │             └──────┬───────┘  └──────┬────────┘
           │                    │ priority 1       │ priority 2
           │                    └────────┬─────────┘
           │                    ┌────────▼─────────┐
           └────────────────────│   EVENT LOOP     │
                                │ 1. stack empty?  │
                                │ 2. drain micros  │
                                │ 3. one macro     │
                                │ 4. repeat        │
                                └──────────────────┘`}</DiagramBox>
          </div>
        </section>

        {/* ═══════ INTERNAL LINKS — Related Articles ═══════ */}
        <section className="mb-20">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/40 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-2">Keep Learning — Related Articles</h2>
            <p className="text-slate-400 mb-8">These posts complement what you just learned. Reading them together will solidify your understanding.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  slug: "javascript-interview-questions-2026",
                  title: "100+ JavaScript Interview Questions & Answers 2026",
                  desc: "Put your internals knowledge to the test. Covers closures, event loop, promises, hoisting, and more with answers.",
                  tag: "JavaScript · Interview",
                  color: "yellow",
                  emoji: "🎯"
                },
                {
                  slug: "react-server-components-2025",
                  title: "React Server Components: Complete Guide 2026",
                  desc: "Understanding JS internals makes RSC click. Learn how React leverages the event loop, async rendering, and suspense.",
                  tag: "React · Architecture",
                  color: "cyan",
                  emoji: "⚛️"
                },
                {
                  slug: "react-state-management-2026",
                  title: "React State Management 2026",
                  desc: "Closures and execution contexts are at the heart of hooks and state management. Connect the dots here.",
                  tag: "React · State",
                  color: "purple",
                  emoji: "🔄"
                },
              ].map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group block p-5 rounded-xl bg-${post.color}-900/10 border border-${post.color}-700/30 hover:border-${post.color}-500/50 hover:bg-${post.color}-900/20 transition-all duration-300`}
                >
                  <div className="text-2xl mb-3">{post.emoji}</div>
                  <h3 className={`font-bold text-white group-hover:text-${post.color}-300 transition-colors mb-2 text-sm leading-snug`}>{post.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">{post.desc}</p>
                  <span className={`text-xs font-mono text-${post.color}-400/70`}>{post.tag}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 20: Quick Reference Cheatsheet ═══════ */}
        <section className="mb-20">
          <SectionHeader id="cheatsheet" number="20" title="Quick Reference Cheatsheet" icon={BookOpen} gradient="from-green-500 to-emerald-600" />
          <div className="prose prose-xl prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <h4 className="text-lg font-bold text-yellow-300 mb-4">Execution Context</h4>
                <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{`Global EC   → created once, window/global as 'this'
Function EC → created on every function call
Both have   → Memory Phase + Code Phase`}</pre>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <h4 className="text-lg font-bold text-yellow-300 mb-4">Hoisting</h4>
                <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{`var         → hoisted, initialized to undefined
let/const   → hoisted, in TDZ (ReferenceError)
function    → fully hoisted with body
func expr   → hoisted as var (undefined)`}</pre>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <h4 className="text-lg font-bold text-yellow-300 mb-4">Scope</h4>
                <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{`var         → function scoped (ignores blocks)
let/const   → block scoped
Scope chain → inner → outer → global → ReferenceError`}</pre>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <h4 className="text-lg font-bold text-yellow-300 mb-4">Closures</h4>
                <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{`Function + its outer scope references = closure
Outer function can finish, inner still has access
Used for: data privacy, factories, memoization`}</pre>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <h4 className="text-lg font-bold text-yellow-300 mb-4">this Keyword</h4>
                <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{`Global    → window / undefined (strict)
Method    → the object
Arrow fn  → lexical (from surrounding scope)
new       → new object
call/apply→ explicitly set`}</pre>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <h4 className="text-lg font-bold text-yellow-300 mb-4">Async Priority Order</h4>
                <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{`1. Synchronous code (call stack)
2. Microtask queue (ALL) — Promises, await
3. ONE Macrotask — setTimeout, I/O
4. Microtask queue again (ALL)
5. Next Macrotask — repeat`}</pre>
              </div>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-700/50 md:col-span-2">
                <h4 className="text-lg font-bold text-yellow-300 mb-4">Memory</h4>
                <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{`Heap   → objects, arrays, functions stored here
Stack  → primitives + references stored here
GC     → mark & sweep, removes unreachable objects
Leaks  → globals, forgotten timers, detached DOM, closures`}</pre>
              </div>
            </div>

            {/* Recommended Resources */}
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-700/30">
              <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-3"><Rocket size={24} />Recommended Next Steps</h3>
              <div className="space-y-4">
                {[
                  { emoji: "📖", text: "Read: You Don't Know JS (free on GitHub) — github.com/getify/You-Dont-Know-JS" },
                  { emoji: "🎬", text: 'Watch: "What the heck is the event loop?" — Philip Roberts (JSConf EU, YouTube)' },
                  { emoji: "💻", text: "Practice: javascript.info — best interactive JS reference" },
                  { emoji: "🔍", text: "Visualize: latentflip.com/loupe — visualize call stack + event loop live" },
                  { emoji: "🌳", text: "AST Explorer: astexplorer.net — see how V8 parses your code" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Author note */}
            <div className="mt-12 text-center text-slate-500 italic">
              <p>Notes by Dev Kant Kumar | JavaScript Mastery Journey 2026</p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

// Attach image helpers
JavaScriptInternals2026.FeaturedImage = JSFeaturedImage;
JavaScriptInternals2026.Image = JSCardImage;
JavaScriptInternals2026.CardImage = JSCardImage;

// SEO Metadata
JavaScriptInternals2026.info = {
  id: "javascript-internals-2026",
  slug: "javascript-internals-2026",
  title: "JavaScript Internals 2026: How JS Works Under the Hood — Engine, Event Loop, Closures & More",
  excerpt: "The most comprehensive guide to JavaScript internals on the internet. Master V8 engine, execution context, hoisting, closures, prototypes, event loop, promises, async/await, and garbage collection with visual diagrams and real-world examples.",
  category: "JavaScript",
  author: "Dev Kant Kumar",
  readTime: "55 min read",
  image: "/images/blog/js-internals-2026.png",
  featuredImage: "/images/blog/js-internals-2026.png",
  featured: true,
  publishDate: "2026-02-20",
  modifiedDate: "2026-02-20",
  keywords: "javascript internals, how javascript works, V8 engine, event loop explained, javascript execution context, hoisting javascript, closures javascript, call stack javascript, scope chain, prototype chain, microtask queue, macrotask queue, garbage collection javascript, JIT compilation, async await internals, promise internals, javascript memory management, temporal dead zone, this keyword javascript, javascript under the hood",
  tags: [
    "javascript", "v8-engine", "event-loop", "closures", "hoisting",
    "execution-context", "call-stack", "scope-chain", "prototypes",
    "async-await", "promises", "garbage-collection", "web-development",
    "javascript-internals", "interview-preparation"
  ],
  faqs: [
    { question: "How does the JavaScript engine work?", answer: "The JS engine (like V8) parses your code into an AST, converts it to bytecode via an interpreter (Ignition), and optimizes hot code paths using a JIT compiler (TurboFan) into machine code for maximum performance." },
    { question: "What is the difference between the call stack and the memory heap?", answer: "The call stack is a LIFO data structure tracking function execution order, while the memory heap is an unstructured memory pool where objects, arrays, and functions are dynamically allocated." },
    { question: "What is hoisting in JavaScript?", answer: "Hoisting is JavaScript's behavior of processing declarations during the memory creation phase before code execution. var declarations are initialized to undefined, function declarations are fully hoisted, while let/const enter a Temporal Dead Zone." },
    { question: "What is the Temporal Dead Zone (TDZ)?", answer: "The TDZ is the period between entering a scope and the actual declaration of a let or const variable. Accessing the variable during this period throws a ReferenceError, even though the engine knows the variable exists." },
    { question: "How does the event loop work in JavaScript?", answer: "The event loop continuously checks if the call stack is empty. When empty, it first drains all microtasks (Promise callbacks, async/await continuations), then picks one macrotask (setTimeout, I/O), executes it, and repeats." },
    { question: "What is the difference between microtask and macrotask queues?", answer: "Microtasks (Promise.then, async/await, queueMicrotask) have higher priority and are fully drained before any macrotask. Macrotasks (setTimeout, setInterval, I/O) are processed one at a time with microtask draining between each." },
    { question: "What are closures in JavaScript?", answer: "A closure is a function that retains access to variables from its outer (enclosing) scope even after the outer function has finished executing. The inner function 'closes over' these variables, keeping them alive in memory." },
    { question: "How does the 'this' keyword work in JavaScript?", answer: "The value of 'this' depends on how a function is called: in object methods it refers to the object, in constructors to the new instance, in arrow functions it's lexically inherited, and in global context it's window (browser) or undefined (strict mode)." },
    { question: "What is garbage collection in JavaScript?", answer: "JavaScript uses automatic memory management with a Mark & Sweep algorithm. The garbage collector starts from root references, marks all reachable objects, and sweeps (frees) unreachable memory. Common leaks include forgotten timers, detached DOM nodes, and accidental globals." },
    { question: "What is JIT compilation?", answer: "JIT (Just-In-Time) compilation is V8's hybrid approach: code is first interpreted into bytecode for fast startup (Ignition), then frequently-executed 'hot' functions are recompiled into optimized machine code (TurboFan) for faster execution." }
  ]
};

export default JavaScriptInternals2026;
