// Top-level imports
import {
  AlertCircle,
  BookOpen,
  Box,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Copy,
  Database,
  FileCode,
  FolderTree,
  GitBranch,
  HelpCircle,
  Layers,
  Lock,
  Package,
  PlayCircle,
  Settings,
  Share2,
  Shield,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Video,
  Workflow,
  Zap
} from "lucide-react";
import React from "react";

function AssembliesFeaturedImage() {
  return (
    <div className="w-full h-[700px] bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1123] relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-900/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-blue-900/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(circle at center, black 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Central Visual */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-12 group">
          {/* Orbital Rings */}
          <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full w-56 h-56 -m-8 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full w-72 h-72 -m-16 animate-[spin_18s_linear_infinite_reverse]" />
          <div className="absolute inset-0 border border-indigo-500/20 rounded-full w-96 h-96 -m-28 animate-[spin_25s_linear_infinite]" />

          {/* Core Icon Container */}
          <div className="w-40 h-40 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_80px_rgba(139,92,246,0.6)] relative overflow-hidden transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
            <Package size={72} className="text-white drop-shadow-2xl relative z-10" />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-5xl px-6 relative z-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/80 border border-purple-500/40 rounded-full text-purple-300 text-sm font-semibold backdrop-blur-xl shadow-lg shadow-purple-500/20 mb-8 hover:border-purple-400/60 transition-all duration-300 cursor-default">
            <Code size={18} className="text-purple-400" />
            <span>.NET Framework</span>
            <span className="text-slate-600 mx-1">•</span>
            <span className="text-blue-300">Unit 3</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8 tracking-tight drop-shadow-2xl">
            Mastering
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              .NET Assemblies
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            The complete guide to <span className="text-white font-medium">Private & Shared Assemblies</span>, side-by-side execution, and building robust .NET applications in Visual Studio 2026.
          </p>
        </div>
      </div>
    </div>
  );
}

function AssembliesCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-gradient-to-br from-purple-950/50 to-blue-950/50 rounded-xl flex items-center justify-center relative overflow-hidden group border border-purple-800/50 hover:border-purple-500/50 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/50 via-transparent to-blue-900/50" />
      </div>
      <div className="relative flex flex-col items-center gap-3 text-purple-100 transform group-hover:scale-110 transition-transform duration-300">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-400/40 shadow-lg shadow-purple-500/20">
          <Package size={32} className="text-purple-300" />
        </div>
        <span className="font-bold text-lg tracking-wide text-slate-200 group-hover:text-white transition-colors">.NET Assemblies</span>
      </div>
    </div>
  );
}

function YouTubeEmbed({ videoId, title }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-purple-500/30 shadow-2xl my-12 aspect-video bg-slate-900/50">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function CodeBlock({ language = "csharp", filename, code }) {
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
    <div className="relative my-8 rounded-xl border border-purple-700/30 bg-[#0a0e27] overflow-hidden shadow-2xl shadow-black/50 group">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-b border-purple-800/30">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <Terminal size={16} className="text-purple-400" />
          <span className="px-2.5 py-1 rounded-md bg-purple-950/50 text-purple-300 border border-purple-800/50 font-mono font-semibold text-xs">
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
            <CheckCircle size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="m-0 p-6 overflow-x-auto text-sm leading-loose bg-[#0a0e27]">
        <code className={`language-${language} text-slate-300 font-mono`}>{code}</code>
      </pre>
    </div>
  );
}

function InfoBox({ type = "info", title, children, icon: Icon }) {
  const styles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-950/20",
      icon: "text-blue-400",
      title: "text-blue-300",
    },
    tip: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20",
      icon: "text-emerald-400",
      title: "text-emerald-300",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-950/20",
      icon: "text-amber-400",
      title: "text-amber-300",
    },
    note: {
      border: "border-purple-500/30",
      bg: "bg-purple-950/20",
      icon: "text-purple-400",
      title: "text-purple-300",
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`my-8 p-6 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}>
      <div className="flex gap-4">
        {Icon && (
          <Icon size={24} className={`${style.icon} flex-shrink-0 mt-1`} />
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg ${style.title} mb-3`}>{title}</h4>
          )}
          <div className="text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ImagePlaceholder({ title, description }) {
  return (
    <div className="my-8 p-12 rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-950/10 flex flex-col items-center justify-center gap-3 hover:border-purple-500/50 transition-colors">
      <Box size={48} className="text-purple-400/50" />
      <div className="text-center">
        <p className="text-purple-300 font-semibold text-lg mb-1">{title}</p>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

function VideoEmbed() {
  return (
    <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-purple-950/40 to-blue-950/40 border border-purple-500/30 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30">
          <Video size={28} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Video Tutorial</h3>
          <p className="text-slate-400 text-sm">Watch the step-by-step guide</p>
        </div>
      </div>

      <div className="aspect-video rounded-xl overflow-hidden bg-slate-900/50 border border-purple-700/30 flex items-center justify-center">
        <div className="text-center">
          <PlayCircle size={64} className="text-purple-400 mx-auto mb-4 opacity-50" />
          <p className="text-slate-400 font-medium">YouTube Video: Creating Private Assemblies</p>
          <p className="text-slate-500 text-sm mt-2">Video will be embedded here</p>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-slate-900/50 border border-purple-700/20">
        <p className="text-slate-300 text-sm leading-relaxed">
          <strong className="text-purple-300">Coming Soon:</strong> A comprehensive video walkthrough demonstrating how to create private assemblies in Visual Studio 2026, covering all the steps discussed in this guide.
        </p>
      </div>
    </div>
  );
}

function TableOfContents() {
  const sections = [
    { id: "introduction", title: "Introduction to .NET Assemblies", icon: BookOpen },
    { id: "what-are-assemblies", title: "What Are .NET Assemblies?", icon: Package },
    { id: "types-of-assemblies", title: "Types of Assemblies", icon: Layers },
    { id: "private-assemblies", title: "Private Assemblies", icon: Lock },
    { id: "shared-assemblies", title: "Shared Assemblies", icon: Share2 },
    { id: "side-by-side", title: "Side-by-Side Execution", icon: GitBranch },
    { id: "benefits", title: "Benefits Over Predecessors", icon: TrendingUp },
    { id: "creating-private", title: "Creating Private Assemblies", icon: Code },
    { id: "creating-shared", title: "Creating Shared Assemblies", icon: Users },
    { id: "faq", title: "FAQ & Common Questions", icon: HelpCircle },
  ];

  return (
    <div className="my-12 p-8 rounded-xl bg-gradient-to-br from-slate-900/80 to-purple-950/30 border border-purple-800/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
          <BookOpen size={24} className="text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Table of Contents</h3>
      </div>
      <nav className="space-y-2">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors group py-3 px-4 rounded-lg hover:bg-purple-950/30"
            >
              <span className="text-purple-500/60 font-mono text-sm font-semibold w-8">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <Icon size={18} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
              <span className="font-medium flex-1">{section.title}</span>
              <ChevronRight size={16} className="text-slate-700 group-hover:text-purple-400 transition-colors" />
            </a>
          );
        })}
      </nav>
    </div>
  );
}

function AssembliesPost() {
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <AssembliesFeaturedImage />

      {/* Metadata */}
      <div className="max-w-4xl mx-auto px-6 py-8 border-b border-slate-800/50">
        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <Code size={16} className="text-purple-400" />
            <span className="font-medium text-slate-300">Dev Kant Kumar</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-purple-400" />
            <span>35 min read</span>
          </div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-purple-400" />
            <span>.NET • C# • Assemblies</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <p className="text-2xl text-slate-300 leading-relaxed font-light mb-8">
            In the world of .NET development, <strong className="text-white">assemblies</strong> are the fundamental building blocks of application deployment and execution. Whether you're building a simple console app or a complex enterprise system, understanding assemblies is crucial for creating maintainable, secure, and efficient applications.
          </p>

          <TableOfContents />
        </section>

        {/* Section 1: Introduction */}
        <section id="introduction" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <BookOpen size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Introduction to .NET Assemblies
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Before .NET, developers struggled with DLL Hell—a nightmare of versioning conflicts and dependency management. COM components required complex registration, and distributing applications was fraught with compatibility issues. .NET assemblies revolutionized this landscape by introducing a self-describing, version-aware deployment model.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              An assembly is the fundamental unit of deployment, versioning, and security in .NET applications. Think of it as a smart container that packages compiled code, resources, metadata, and versioning information into a single logical unit.
            </p>

            <InfoBox type="note" title="Why Assemblies Matter" icon={Sparkles}>
              Assemblies solve critical problems that plagued earlier development models:
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>✓ <strong>Self-describing:</strong> No registry entries needed</li>
                <li>✓ <strong>Version-aware:</strong> Multiple versions can coexist</li>
                <li>✓ <strong>Secure:</strong> Built-in code access security</li>
                <li>✓ <strong>Portable:</strong> XCOPY deployment works</li>
              </ul>
            </InfoBox>
          </div>
        </section>

        {/* Section 2: What Are Assemblies */}
        <section id="what-are-assemblies" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Package size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              What Are .NET Assemblies?
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              A .NET assembly is a compiled code library used for deployment, versioning, and security. It's a collection of types and resources that work together to form a logical unit of functionality. Every .NET application consists of one or more assemblies.
            </p>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Assembly Structure</h3>

            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              An assembly contains four key components:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <FileCode size={24} className="text-purple-400" />
                  <h4 className="text-xl font-bold text-purple-300">Assembly Manifest</h4>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Metadata describing the assembly including version, culture, referenced assemblies, and exported types.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-blue-950/30 border border-blue-500/30 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Code size={24} className="text-blue-400" />
                  <h4 className="text-xl font-bold text-blue-300">Type Metadata</h4>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Complete information about every type defined in the assembly—classes, interfaces, enums, delegates, etc.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-indigo-950/30 border border-indigo-500/30 hover:border-indigo-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Database size={24} className="text-indigo-400" />
                  <h4 className="text-xl font-bold text-indigo-300">IL Code</h4>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Microsoft Intermediate Language (MSIL) compiled from source code, executed by the CLR's JIT compiler.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <FolderTree size={24} className="text-cyan-400" />
                  <h4 className="text-xl font-bold text-cyan-300">Resources</h4>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Embedded files like images, strings, configuration data, and other non-code assets.
                </p>
              </div>
            </div>

            <ImagePlaceholder
              title="Assembly Structure Diagram"
              description="Visual representation of assembly components and their relationships"
            />
          </div>
        </section>

        {/* Section 3: Types of Assemblies */}
        <section id="types-of-assemblies" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Layers size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Types of Assemblies
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              .NET assemblies come in four primary types, each serving specific purposes in application architecture:
            </p>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">1. Private Assemblies</h3>
            <div className="p-6 rounded-xl bg-slate-900/50 border border-purple-500/30 mb-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Private assemblies are the default and most common type. They are deployed in the application's directory and are accessible only to that specific application.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span><strong>Location:</strong> Application's base directory or subdirectory</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span><strong>Scope:</strong> Single application only</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span><strong>Versioning:</strong> No strict version enforcement</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span><strong>Use Case:</strong> Application-specific libraries and components</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">2. Shared Assemblies</h3>
            <div className="p-6 rounded-xl bg-slate-900/50 border border-blue-500/30 mb-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Shared assemblies (also called strong-named assemblies) can be shared across multiple applications. They must have a strong name and are typically installed in the Global Assembly Cache (GAC).
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                  <span><strong>Location:</strong> Global Assembly Cache (GAC)</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                  <span><strong>Scope:</strong> Multiple applications system-wide</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                  <span><strong>Versioning:</strong> Strict version enforcement with strong name</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                  <span><strong>Use Case:</strong> Common libraries shared across applications</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">3. Process Assemblies (EXE)</h3>
            <div className="p-6 rounded-xl bg-slate-900/50 border border-indigo-500/30 mb-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Process assemblies are executable files (.exe) that can be launched directly. They contain an entry point (Main method) and can run as standalone processes.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-indigo-400 mt-1 flex-shrink-0" />
                  <span><strong>Extension:</strong> .exe file</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-indigo-400 mt-1 flex-shrink-0" />
                  <span><strong>Entry Point:</strong> Contains Main() method</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-indigo-400 mt-1 flex-shrink-0" />
                  <span><strong>Execution:</strong> Runs in its own process</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-indigo-400 mt-1 flex-shrink-0" />
                  <span><strong>Use Case:</strong> Applications, console tools, Windows services</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">4. Library Assemblies (DLL)</h3>
            <div className="p-6 rounded-xl bg-slate-900/50 border border-cyan-500/30 mb-6">
              <p className="text-slate-300 leading-relaxed mb-4">
                Library assemblies are dynamic link libraries (.dll) that provide reusable code. They cannot execute independently and must be referenced by process assemblies.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                  <span><strong>Extension:</strong> .dll file</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                  <span><strong>Entry Point:</strong> No Main() method</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                  <span><strong>Execution:</strong> Loaded into host process</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
                  <span><strong>Use Case:</strong> Class libraries, utilities, frameworks</span>
                </div>
              </div>
            </div>

            <ImagePlaceholder
              title="Assembly Types Comparison"
              description="Visual comparison of Private, Shared, Process, and Library assemblies"
            />
          </div>
        </section>

        {/* Section 4: Private Assemblies Deep Dive */}
        <section id="private-assemblies" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Lock size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Private Assemblies: Deep Dive
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Private assemblies are the workhorses of .NET development. They're simple, isolated, and perfect for application-specific code that doesn't need to be shared globally.
            </p>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Characteristics of Private Assemblies</h3>

            <div className="space-y-6 my-8">
              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900/40 border border-purple-500/30">
                <h4 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <Target size={20} />
                  Application-Scoped
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Private assemblies are bound to a single application. They reside in the application's directory structure and are not visible to other applications on the system. This isolation prevents conflicts and ensures that updates to one application don't affect others.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900/40 border border-purple-500/30">
                <h4 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <FolderTree size={20} />
                  Simple Deployment
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Deployment is as easy as copying files. XCOPY deployment works perfectly—just copy the application folder to any location, and it runs. No registry entries, no GAC installation, no complex setup procedures required.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900/40 border border-purple-500/30">
                <h4 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <Shield size={20} />
                  Version Flexibility
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Version conflicts are minimized because each application has its own copy. Different applications can use different versions of the same assembly without interference. The CLR doesn't enforce strict version matching for private assemblies.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Probing for Private Assemblies</h3>

            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              When the CLR needs to load a private assembly, it follows a specific search pattern called "probing":
            </p>

            <CodeBlock
              language="text"
              filename="Assembly Probing Path"
              code={`1. Application Base Directory
   → C:\\MyApp\\MyApp.exe looks for MyLib.dll

2. Culture-Specific Subdirectories
   → C:\\MyApp\\en-US\\MyLib.dll (for English-US culture)

3. Subdirectories specified in <probing> element
   → C:\\MyApp\\bin\\MyLib.dll
   → C:\\MyApp\\lib\\MyLib.dll

The search stops at the first match found.`}
            />

            <InfoBox type="tip" title="Pro Tip: Organizing Private Assemblies" icon={Workflow}>
              Create a clear folder structure for your assemblies:
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• <code className="text-purple-300">bin/</code> - Core application assemblies</li>
                <li>• <code className="text-purple-300">lib/</code> - Third-party libraries</li>
                <li>• <code className="text-purple-300">plugins/</code> - Optional extensions</li>
                <li>• <code className="text-purple-300">resources/</code> - Localized resources</li>
              </ul>
            </InfoBox>
          </div>
        </section>

        {/* Section 5: Shared Assemblies Deep Dive */}
        <section id="shared-assemblies" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Share2 size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Shared Assemblies: Deep Dive
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Shared assemblies (strong-named assemblies) enable code reuse across multiple applications while maintaining version integrity and security through digital signatures.
            </p>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">What Makes an Assembly "Shared"?</h3>

            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              A shared assembly must have a <strong className="text-white">strong name</strong>, which consists of four components:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-xl bg-blue-950/30 border border-blue-500/30">
                <div className="text-blue-300 font-mono text-lg font-bold mb-2">1. Simple Name</div>
                <p className="text-slate-400">The assembly's text name (e.g., "System.Data")</p>
              </div>
              <div className="p-6 rounded-xl bg-blue-950/30 border border-blue-500/30">
                <div className="text-blue-300 font-mono text-lg font-bold mb-2">2. Version Number</div>
                <p className="text-slate-400">Four-part version (e.g., "4.0.0.0")</p>
              </div>
              <div className="p-6 rounded-xl bg-blue-950/30 border border-blue-500/30">
                <div className="text-blue-300 font-mono text-lg font-bold mb-2">3. Culture</div>
                <p className="text-slate-400">Optional culture info (e.g., "neutral" or "en-US")</p>
              </div>
              <div className="p-6 rounded-xl bg-blue-950/30 border border-blue-500/30">
                <div className="text-blue-300 font-mono text-lg font-bold mb-2">4. Public Key Token</div>
                <p className="text-slate-400">Cryptographic signature (16-character hex)</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">The Global Assembly Cache (GAC)</h3>

            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              The GAC is a machine-wide code cache located at <code className="text-purple-300">C:\Windows\Microsoft.NET\assembly</code>. It stores assemblies specifically designated to be shared by multiple applications.
            </p>

            <InfoBox type="info" title="GAC Benefits" icon={Database}>
              <ul className="space-y-2 text-slate-300">
                <li>✓ <strong>Version Management:</strong> Multiple versions coexist peacefully</li>
                <li>✓ <strong>Security:</strong> Strong-name verification prevents tampering</li>
                <li>✓ <strong>Performance:</strong> Shared assemblies loaded once for all apps</li>
                <li>✓ <strong>Central Updates:</strong> Update once, affect all applications</li>
              </ul>
            </InfoBox>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Strong Name Anatomy</h3>

            <CodeBlock
              language="text"
              filename="Strong Name Example"
              code={`System.Data,
  Version=4.0.0.0,
  Culture=neutral,
  PublicKeyToken=b77a5c561934e089

Breaking it down:
• Simple Name: System.Data
• Version: 4.0.0.0 (Major.Minor.Build.Revision)
• Culture: neutral (not culture-specific)
• Public Key Token: b77a5c561934e089 (derived from public key)`}
            />

            <ImagePlaceholder
              title="GAC Architecture Diagram"
              description="Visual representation of the Global Assembly Cache structure and version management"
            />
          </div>
        </section>

        {/* Section 6: Side-by-Side Execution */}
        <section id="side-by-side" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <GitBranch size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Side-by-Side Execution
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              One of .NET's most powerful features is the ability to run multiple versions of the same assembly simultaneously on a single machine. This eliminates the infamous "DLL Hell" problem that plagued COM development.
            </p>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">How Side-by-Side Works</h3>

            <div className="p-8 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900/40 border border-emerald-500/30 my-8">
              <h4 className="text-2xl font-bold text-emerald-300 mb-4">The Scenario</h4>
              <p className="text-slate-300 leading-relaxed mb-6">
                Imagine you have two applications on the same machine:
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-emerald-500/20">
                  <div className="font-bold text-emerald-300 mb-2">Application A (Legacy)</div>
                  <div className="text-slate-400 font-mono text-sm">Uses SharedLib version 1.0.0.0</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/50 border border-emerald-500/20">
                  <div className="font-bold text-emerald-300 mb-2">Application B (Modern)</div>
                  <div className="text-slate-400 font-mono text-sm">Uses SharedLib version 2.0.0.0</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mt-6">
                With side-by-side execution, <strong className="text-white">both applications run perfectly</strong> without conflict. Each loads its required version from the GAC independently.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Implementation Details</h3>

            <CodeBlock
              language="xml"
              filename="app.config"
              code={`<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <runtime>
    <!-- Bind to specific version -->
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <dependentAssembly>
        <assemblyIdentity name="SharedLib"
                          publicKeyToken="b77a5c561934e089"
                          culture="neutral" />
        <bindingRedirect oldVersion="1.0.0.0"
                         newVersion="2.0.0.0" />
      </dependentAssembly>
    </assemblyBinding>
  </runtime>
</configuration>`}
            />

            <InfoBox type="tip" title="Version Binding Strategies" icon={Settings}>
              You have multiple options for version binding:
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• <strong>Exact Match:</strong> Load only the specified version</li>
                <li>• <strong>Redirect:</strong> Redirect old versions to new ones</li>
                <li>• <strong>Publisher Policy:</strong> Let the component vendor decide</li>
                <li>• <strong>Machine Config:</strong> System-wide version policies</li>
              </ul>
            </InfoBox>

            <ImagePlaceholder
              title="Side-by-Side Execution Diagram"
              description="Visual showing multiple assembly versions loaded simultaneously"
            />
          </div>
        </section>

        {/* Section 7: Benefits Over Predecessors */}
        <section id="benefits" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Benefits Over Predecessors
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              .NET assemblies represent a quantum leap over previous component technologies like COM, DLLs, and ActiveX controls. Let's explore the revolutionary improvements:
            </p>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">1. Elimination of DLL Hell</h3>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 rounded-xl bg-red-950/30 border border-red-500/30">
                <h4 className="text-xl font-bold text-red-300 mb-3">❌ The Old Way (COM/DLL)</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>• Single version per system</li>
                  <li>• Overwriting breaks other apps</li>
                  <li>• Registry corruption issues</li>
                  <li>• Complex versioning conflicts</li>
                  <li>• "It works on my machine" syndrome</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <h4 className="text-xl font-bold text-emerald-300 mb-3">✓ The .NET Way (Assemblies)</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>• Multiple versions coexist</li>
                  <li>• Isolated by application</li>
                  <li>• No registry dependencies</li>
                  <li>• Strong-name verification</li>
                  <li>• XCOPY deployment works</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">2. Self-Describing Architecture</h3>

            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Unlike COM components that required separate type libraries (TLB files) and registry entries, .NET assemblies are completely self-describing:
            </p>

            <div className="space-y-4 my-8">
              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900/40 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <FileCode size={24} className="text-blue-400" />
                  <h4 className="text-xl font-bold text-blue-300">Embedded Metadata</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  All type information is embedded within the assembly itself. No external files needed. The metadata includes complete details about every class, method, property, and parameter.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900/40 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={24} className="text-purple-400" />
                  <h4 className="text-xl font-bold text-purple-300">Version Information</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  The manifest contains version numbers, dependencies, security permissions, and cultural information. The CLR uses this to make intelligent loading decisions.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-900/40 border border-indigo-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <Zap size={24} className="text-indigo-400" />
                  <h4 className="text-xl font-bold text-indigo-300">No Registration Required</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Simply copy the files—no regsvr32, no COM registration, no installer complexity. This dramatically simplifies deployment and testing scenarios.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">3. Enhanced Security Model</h3>

            <CodeBlock
              language="csharp"
              filename="Security Features"
              code={`// Code Access Security (CAS)
[assembly: SecurityPermission(
    SecurityAction.RequestMinimum,
    Execution = true)]

// Strong Name Verification
// - Ensures assembly hasn't been tampered with
// - Cryptographic signature validation
// - Publisher identity verification

// Evidence-Based Security
// - Where did the assembly come from?
// - Internet, Intranet, or Local machine?
// - Different trust levels applied automatically`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">4. Simplified Deployment</h3>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-4 px-4 text-slate-200 font-bold">Aspect</th>
                    <th className="py-4 px-4 text-red-400 font-bold">COM Components</th>
                    <th className="py-4 px-4 text-emerald-400 font-bold">.NET Assemblies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 px-4 text-slate-300">Registration</td>
                    <td className="py-4 px-4 text-slate-400">Required (Registry)</td>
                    <td className="py-4 px-4 text-emerald-400">Not Required</td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 px-4 text-slate-300">Installation</td>
                    <td className="py-4 px-4 text-slate-400">Complex installer</td>
                    <td className="py-4 px-4 text-emerald-400">Simple file copy</td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 px-4 text-slate-300">Uninstallation</td>
                    <td className="py-4 px-4 text-slate-400">Leave registry residue</td>
                    <td className="py-4 px-4 text-emerald-400">Delete folder</td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 px-4 text-slate-300">Versioning</td>
                    <td className="py-4 px-4 text-slate-400">One version only</td>
                    <td className="py-4 px-4 text-emerald-400">Side-by-side support</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-slate-300">Testing</td>
                    <td className="py-4 px-4 text-slate-400">System-wide impact</td>
                    <td className="py-4 px-4 text-emerald-400">Isolated testing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="note" title="Real-World Impact" icon={Target}>
              These improvements translate to tangible benefits:
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• <strong>95% reduction</strong> in deployment-related support calls</li>
                <li>• <strong>Zero downtime</strong> updates for many scenarios</li>
                <li>• <strong>Developer productivity</strong> increased by focusing on features, not deployment issues</li>
                <li>• <strong>Testing efficiency</strong> improved with isolated test environments</li>
              </ul>
            </InfoBox>
          </div>
        </section>

        {/* Section 8: Creating Private Assemblies */}
        <section id="creating-private" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Code size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Creating Private Assemblies in Visual Studio 2026
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Let's walk through the complete process of creating private assemblies using the latest Visual Studio 2026 tools and .NET 8/9 framework.
            </p>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 1: Create a Class Library Project</h3>

            <CodeBlock
              language="bash"
              filename="Terminal"
              code={`# Using .NET CLI (Recommended for 2026)
dotnet new classlib -n MyPrivateLibrary -f net9.0

# Or using Visual Studio 2026:
# File → New → Project → Class Library (.NET 9.0)`}
            />

            <ImagePlaceholder
              title="Visual Studio 2026 - New Project Dialog"
              description="Screenshot showing Class Library project creation in VS 2026"
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 2: Implement Your Library Code</h3>

            <CodeBlock
              language="csharp"
              filename="MathHelper.cs"
              code={`using System;

namespace MyPrivateLibrary
{
    /// <summary>
    /// A simple math utility class for demonstration
    /// </summary>
    public class MathHelper
    {
        /// <summary>
        /// Adds two integers and returns the result
        /// </summary>
        public int Add(int a, int b)
        {
            return a + b;
        }

        /// <summary>
        /// Multiplies two integers
        /// </summary>
        public int Multiply(int a, int b)
        {
            return a * b;
        }

        /// <summary>
        /// Calculates factorial recursively
        /// </summary>
        public long Factorial(int n)
        {
            if (n <= 1) return 1;
            return n * Factorial(n - 1);
        }
    }

    /// <summary>
    /// String manipulation utilities
    /// </summary>
    public class StringHelper
    {
        /// <summary>
        /// Reverses a string
        /// </summary>
        public string Reverse(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            char[] charArray = input.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }

        /// <summary>
        /// Checks if a string is a palindrome
        /// </summary>
        public bool IsPalindrome(string input)
        {
            if (string.IsNullOrEmpty(input))
                return false;

            string cleaned = input.ToLower()
                .Replace(" ", "");
            return cleaned == Reverse(cleaned);
        }
    }
}`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 3: Configure Project Properties</h3>

            <CodeBlock
              language="xml"
              filename="MyPrivateLibrary.csproj"
              code={`<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <!-- Target Framework -->
    <TargetFramework>net9.0</TargetFramework>

    <!-- Assembly Information -->
    <AssemblyName>MyPrivateLibrary</AssemblyName>
    <RootNamespace>MyPrivateLibrary</RootNamespace>

    <!-- Version Information -->
    <Version>1.0.0</Version>
    <AssemblyVersion>1.0.0.0</AssemblyVersion>
    <FileVersion>1.0.0.0</FileVersion>

    <!-- Documentation -->
    <GenerateDocumentationFile>true</GenerateDocumentationFile>

    <!-- Nullable Reference Types (C# 9+) -->
    <Nullable>enable</Nullable>

    <!-- Language Version -->
    <LangVersion>latest</LangVersion>
  </PropertyGroup>

  <PropertyGroup>
    <!-- Package/Assembly Metadata -->
    <Authors>Your Name</Authors>
    <Company>Your Company</Company>
    <Product>MyPrivateLibrary</Product>
    <Description>A private assembly for application-specific utilities</Description>
    <Copyright>Copyright © 2026</Copyright>
  </PropertyGroup>

</Project>`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 4: Build the Assembly</h3>

            <CodeBlock
              language="bash"
              filename="Terminal"
              code={`# Build in Debug mode
dotnet build

# Build in Release mode (optimized)
dotnet build -c Release

# Output location:
# bin/Debug/net9.0/MyPrivateLibrary.dll
# bin/Release/net9.0/MyPrivateLibrary.dll`}
            />

            <InfoBox type="tip" title="Build Configuration Tips" icon={Settings}>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Debug:</strong> Use during development (includes debug symbols, no optimization)</li>
                <li>• <strong>Release:</strong> Use for production (optimized, smaller size)</li>
                <li>• Check <code className="text-purple-300">bin</code> folder for output DLL and PDB files</li>
                <li>• PDB files contain debugging information</li>
              </ul>
            </InfoBox>

            <ImagePlaceholder
              title="Build Output Structure"
              description="File explorer showing the generated DLL, PDB, and XML documentation files"
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 5: Create a Console App to Use the Library</h3>

            <CodeBlock
              language="bash"
              filename="Terminal"
              code={`# Create console application
dotnet new console -n MyConsoleApp -f net9.0

# Add reference to private library
cd MyConsoleApp
dotnet add reference ../MyPrivateLibrary/MyPrivateLibrary.csproj`}
            />

            <CodeBlock
              language="csharp"
              filename="Program.cs"
              code={`using MyPrivateLibrary;
using System;

namespace MyConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Private Assembly Demo ===\\n");

            // Using MathHelper
            var mathHelper = new MathHelper();
            Console.WriteLine($"Add(5, 3) = {mathHelper.Add(5, 3)}");
            Console.WriteLine($"Multiply(4, 7) = {mathHelper.Multiply(4, 7)}");
            Console.WriteLine($"Factorial(5) = {mathHelper.Factorial(5)}");

            Console.WriteLine();

            // Using StringHelper
            var stringHelper = new StringHelper();
            string testString = "racecar";
            Console.WriteLine($"Original: {testString}");
            Console.WriteLine($"Reversed: {stringHelper.Reverse(testString)}");
            Console.WriteLine($"Is Palindrome: {stringHelper.IsPalindrome(testString)}");

            Console.WriteLine("\\nPress any key to exit...");
            Console.ReadKey();
        }
    }
}`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 6: Run and Verify</h3>

            <CodeBlock
              language="bash"
              filename="Terminal"
              code={`# Run the application
dotnet run

# Expected output:
# === Private Assembly Demo ===
#
# Add(5, 3) = 8
# Multiply(4, 7) = 28
# Factorial(5) = 120
#
# Original: racecar
# Reversed: racecar
# Is Palindrome: True`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 7: Verify Private Assembly Deployment</h3>

            <CodeBlock
              language="bash"
              filename="File Structure"
              code={`MyConsoleApp/
├── bin/
│   └── Debug/
│       └── net9.0/
│           ├── MyConsoleApp.exe          ← Main executable
│           ├── MyConsoleApp.dll
│           ├── MyPrivateLibrary.dll      ← Private assembly (copied here!)
│           ├── MyConsoleApp.pdb
│           └── MyPrivateLibrary.pdb

The private assembly is copied to the application's output directory.
This is XCOPY deployment in action!`}
            />

            <InfoBox type="note" title="Key Observations" icon={AlertCircle}>
              <ul className="space-y-2 text-slate-300">
                <li>• The private assembly DLL is <strong>copied</strong> to the application directory</li>
                <li>• No GAC installation required</li>
                <li>• Each application gets its own copy</li>
                <li>• Updates to one app don't affect others</li>
                <li>• Perfect isolation between applications</li>
              </ul>
            </InfoBox>

            <YouTubeEmbed videoId="rIKXJxv-8QQ" title="How to Create and Use Private Assembly" />
          </div>
        </section>

        {/* Section 9: Creating Shared Assemblies */}
        <section id="creating-shared" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Users size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Creating Shared Assemblies in Visual Studio 2026
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Creating shared assemblies requires additional steps to generate a strong name and install the assembly in the GAC. Let's walk through the complete modern workflow.
            </p>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 1: Create the Class Library</h3>

            <CodeBlock
              language="bash"
              filename="Terminal"
              code={`# Create shared library project
dotnet new classlib -n MySharedLibrary -f net9.0
cd MySharedLibrary`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 2: Generate a Strong Name Key</h3>

            <CodeBlock
              language="bash"
              filename="Terminal"
              code={`# Using .NET SDK (Modern approach for 2026)
dotnet new tool-manifest
dotnet tool install --local dotnet-sn

# Generate strong name key pair
dotnet sn -k MySharedLibrary.snk

# Alternative: Using Visual Studio Developer Command Prompt
sn -k MySharedLibrary.snk

# This creates a .snk file containing public/private key pair`}
            />

            <InfoBox type="warning" title="Security Best Practice" icon={Lock}>
              <p className="text-slate-300">
                The <code className="text-amber-300">.snk</code> file contains your private key. <strong className="text-white">Never</strong> commit this to public source control! Use these strategies:
              </p>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• Add <code className="text-purple-300">*.snk</code> to <code className="text-purple-300">.gitignore</code></li>
                <li>• Use delay signing for open-source projects</li>
                <li>• Store keys in secure key vaults for enterprise</li>
                <li>• Consider using Azure Key Vault or similar services</li>
              </ul>
            </InfoBox>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 3: Configure Strong Naming</h3>

            <CodeBlock
              language="xml"
              filename="MySharedLibrary.csproj"
              code={`<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>

    <!-- Strong Name Configuration -->
    <SignAssembly>true</SignAssembly>
    <AssemblyOriginatorKeyFile>MySharedLibrary.snk</AssemblyOriginatorKeyFile>

    <!-- Assembly Information -->
    <AssemblyName>MySharedLibrary</AssemblyName>
    <RootNamespace>MySharedLibrary</RootNamespace>

    <!-- Versioning (Critical for shared assemblies!) -->
    <Version>1.0.0</Version>
    <AssemblyVersion>1.0.0.0</AssemblyVersion>
    <FileVersion>1.0.0.0</FileVersion>

    <!-- Documentation -->
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <PropertyGroup>
    <Authors>Your Name</Authors>
    <Company>Your Company</Company>
    <Product>MySharedLibrary</Product>
    <Description>A shared assembly for system-wide utilities</Description>
    <Copyright>Copyright © 2026</Copyright>
  </PropertyGroup>

</Project>`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 4: Implement Shared Functionality</h3>

            <CodeBlock
              language="csharp"
              filename="SharedUtilities.cs"
              code={`using System;
using System.Text;

namespace MySharedLibrary
{
    /// <summary>
    /// Shared utility class available system-wide
    /// </summary>
    public class SharedUtilities
    {
        /// <summary>
        /// Generates a unique identifier
        /// </summary>
        public string GenerateUniqueId()
        {
            return Guid.NewGuid().ToString("N");
        }

        /// <summary>
        /// Formats bytes into human-readable size
        /// </summary>
        public string FormatFileSize(long bytes)
        {
            string[] sizes = { "B", "KB", "MB", "GB", "TB" };
            double len = bytes;
            int order = 0;

            while (len >= 1024 && order < sizes.Length - 1)
            {
                order++;
                len = len / 1024;
            }

            return $"{len:0.##} {sizes[order]}";
        }

        /// <summary>
        /// Encodes string to Base64
        /// </summary>
        public string EncodeBase64(string input)
        {
            var bytes = Encoding.UTF8.GetBytes(input);
            return Convert.ToBase64String(bytes);
        }

        /// <summary>
        /// Decodes Base64 string
        /// </summary>
        public string DecodeBase64(string input)
        {
            var bytes = Convert.FromBase64String(input);
            return Encoding.UTF8.GetString(bytes);
        }
    }
}`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 5: Build and Verify Strong Name</h3>

            <CodeBlock
              language="bash"
              filename="Terminal"
              code={`# Build the assembly
dotnet build -c Release

# Verify strong name signing
sn -v bin/Release/net9.0/MySharedLibrary.dll

# Expected output:
# Assembly 'MySharedLibrary.dll' is valid

# View assembly information including public key token
sn -T bin/Release/net9.0/MySharedLibrary.dll

# Output shows something like:
# Public key token is a1b2c3d4e5f67890`}
            />

            <InfoBox type="info" title="Understanding the Public Key Token" icon={Shield}>
              The public key token is a 16-character hexadecimal hash of the public key. It's used to uniquely identify your assembly in the GAC and in assembly references. Think of it as your assembly's fingerprint.
            </InfoBox>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 6: Install to Global Assembly Cache</h3>

            <CodeBlock
              language="bash"
              filename="Administrator Command Prompt / PowerShell"
              code={`# Method 1: Using gacutil (Classic approach)
# Requires Visual Studio Developer Command Prompt with Admin rights
gacutil /i bin\\Release\\net9.0\\MySharedLibrary.dll

# Method 2: Using PowerShell (Modern approach for 2026)
# Must run as Administrator
[System.Reflection.Assembly]::Load("System.EnterpriseServices, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a")
$publish = New-Object System.EnterpriseServices.Internal.Publish
$publish.GacInstall("C:\\Full\\Path\\To\\MySharedLibrary.dll")

# Verify installation
gacutil /l MySharedLibrary

# Or browse GAC location:
# C:\\Windows\\Microsoft.NET\\assembly\\GAC_MSIL\\MySharedLibrary`}
            />

            <InfoBox type="warning" title="Administrator Rights Required" icon={AlertCircle}>
              Installing to the GAC requires administrator privileges because you're modifying a system-wide cache. Always test thoroughly before GAC installation in production environments.
            </InfoBox>

            <ImagePlaceholder
              title="GAC Installation Process"
              description="Screenshots showing the GAC installation steps and verification"
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 7: Reference from Applications</h3>

            <CodeBlock
              language="xml"
              filename="App.csproj - Referencing Shared Assembly"
              code={`<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <!-- Reference by strong name -->
    <Reference Include="MySharedLibrary">
      <HintPath>..\\MySharedLibrary\\bin\\Release\\net9.0\\MySharedLibrary.dll</HintPath>
      <!-- The assembly will be resolved from GAC at runtime -->
    </Reference>
  </ItemGroup>

</Project>`}
            />

            <CodeBlock
              language="csharp"
              filename="Program.cs - Using Shared Assembly"
              code={`using MySharedLibrary;
using System;

namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Shared Assembly Demo ===\\n");

            var utils = new SharedUtilities();

            // Generate unique ID
            string id = utils.GenerateUniqueId();
            Console.WriteLine($"Generated ID: {id}");

            // Format file size
            long bytes = 1073741824; // 1 GB
            Console.WriteLine($"File Size: {utils.FormatFileSize(bytes)}");

            // Base64 encoding
            string original = "Hello, Shared Assembly!";
            string encoded = utils.EncodeBase64(original);
            string decoded = utils.DecodeBase64(encoded);

            Console.WriteLine($"\\nOriginal: {original}");
            Console.WriteLine($"Encoded: {encoded}");
            Console.WriteLine($"Decoded: {decoded}");

            Console.WriteLine("\\nThis assembly is loaded from the GAC!");
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 8: Verify Assembly Loading</h3>

            <CodeBlock
              language="csharp"
              filename="VerifyAssemblyLocation.cs"
              code={`using System;
using System.Reflection;

namespace MyApp
{
    class AssemblyVerifier
    {
        public static void VerifyLoadLocation()
        {
            // Get the loaded assembly
            Assembly sharedAssembly = Assembly.Load(
                "MySharedLibrary, Version=1.0.0.0, Culture=neutral, PublicKeyToken=a1b2c3d4e5f67890"
            );

            // Display assembly information
            Console.WriteLine("Assembly Full Name:");
            Console.WriteLine(sharedAssembly.FullName);
            Console.WriteLine();

            Console.WriteLine("Assembly Location:");
            Console.WriteLine(sharedAssembly.Location);
            Console.WriteLine();

            // Check if loaded from GAC
            Console.WriteLine("Loaded from GAC: " + sharedAssembly.GlobalAssemblyCache);
        }
    }
}`}
            />

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 9: Managing Multiple Versions</h3>

            <CodeBlock
              language="bash"
              filename="Terminal - Creating Version 2.0"
              code={`# Update version in .csproj
# Change: <Version>2.0.0</Version>
# Change: <AssemblyVersion>2.0.0.0</AssemblyVersion>

# Rebuild
dotnet build -c Release

# Install new version to GAC (both versions will coexist)
gacutil /i bin\\Release\\net9.0\\MySharedLibrary.dll

# List all versions in GAC
gacutil /l MySharedLibrary

# Output shows:
# MySharedLibrary, Version=1.0.0.0, Culture=neutral, PublicKeyToken=a1b2...
# MySharedLibrary, Version=2.0.0.0, Culture=neutral, PublicKeyToken=a1b2...`}
            />

            <InfoBox type="tip" title="Version Management Best Practices" icon={GitBranch}>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Semantic Versioning:</strong> Use Major.Minor.Patch format</li>
                <li>• <strong>Breaking Changes:</strong> Increment major version</li>
                <li>• <strong>New Features:</strong> Increment minor version</li>
                <li>• <strong>Bug Fixes:</strong> Increment patch version</li>
                <li>• <strong>Document Changes:</strong> Maintain a changelog</li>
                <li>• <strong>Test Compatibility:</strong> Verify with all dependent applications</li>
              </ul>
            </InfoBox>

            <h3 className="text-2xl font-bold text-white mt-10 mb-4">Step 10: Uninstalling from GAC</h3>

            <CodeBlock
              language="bash"
              filename="Administrator Command Prompt"
              code={`# Uninstall specific version
gacutil /u MySharedLibrary,Version=1.0.0.0

# Uninstall all versions
gacutil /u MySharedLibrary

# Verify removal
gacutil /l MySharedLibrary

# Should show: "Number of items = 0" if all removed`}
            />

            <ImagePlaceholder
              title="Side-by-Side Versions in GAC"
              description="Screenshot showing multiple versions of the same assembly in GAC"
            />

            <YouTubeEmbed videoId="yZ36IDEXaKY" title="How to Create and Use Shared Assembly" />
          </div>
        </section>

        {/* Section 10: FAQ */}
        <section id="faq" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <HelpCircle size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              FAQ & Common Questions
            </h2>
          </div>

          <div className="prose prose-xl prose-invert max-w-none">
            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-indigo-500/30 hover:border-indigo-500/50 transition-colors">
                <h4 className="text-xl font-bold text-indigo-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  What's the difference between a DLL and an assembly?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  A DLL is a physical file format, while an assembly is a logical unit of deployment. An assembly can consist of one or more files (DLLs, EXEs, resources), but includes metadata and manifest information that DLLs alone don't have. Traditional Win32 DLLs lack version information and self-description that .NET assemblies provide.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                <h4 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  When should I use private vs. shared assemblies?
                </h4>
                <p className="text-slate-300 leading-relaxed mb-3">
                  <strong className="text-white">Use Private Assemblies when:</strong>
                </p>
                <ul className="space-y-1 text-slate-400 ml-6 mb-3">
                  <li>• Building application-specific functionality</li>
                  <li>• You want simple XCOPY deployment</li>
                  <li>• Different apps need different versions</li>
                  <li>• You don't need system-wide sharing</li>
                </ul>
                <p className="text-slate-300 leading-relaxed mb-3">
                  <strong className="text-white">Use Shared Assemblies when:</strong>
                </p>
                <ul className="space-y-1 text-slate-400 ml-6">
                  <li>• Multiple applications need the same code</li>
                  <li>• You need strict version control</li>
                  <li>• Security and tamper-proofing are important</li>
                  <li>• Building enterprise-wide libraries</li>
                </ul>
              </div>

              {/* FAQ 3 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-blue-500/30 hover:border-blue-500/50 transition-colors">
                <h4 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  Can I convert a private assembly to a shared assembly later?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Yes, but you need to add strong naming. Generate a .snk file, configure your project for signing, rebuild, and install to the GAC. However, existing applications referencing the private assembly will need to be updated to reference the strong-named version. This is a breaking change that requires recompilation of dependent applications.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors">
                <h4 className="text-xl font-bold text-emerald-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  What happens if I update a shared assembly in the GAC?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  If you install a new version with the same version number, it replaces the old one (not recommended in production). If you install with a different version number, both versions coexist side-by-side. Applications bound to specific versions continue using their required version. You can use binding redirects in app.config to redirect applications to newer versions.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
                <h4 className="text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  How do I debug assemblies loaded from the GAC?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Visual Studio can debug GAC assemblies, but you need the PDB (symbol) files. Best practice: develop and debug using private assemblies, then install to GAC only for final testing. You can also use the "Copy Local" property set to true during development, which copies the assembly to your application directory instead of loading from the GAC.
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-pink-500/30 hover:border-pink-500/50 transition-colors">
                <h4 className="text-xl font-bold text-pink-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  What is delay signing and when should I use it?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Delay signing allows you to create a strong-named assembly using only the public key, reserving space for the signature to be added later with the private key. This is useful for open-source projects where you want to allow contributors to build the assembly without exposing your private key. The final signature is applied during the build/release process using the private key securely stored by the organization.
                </p>
              </div>

              {/* FAQ 7 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-orange-500/30 hover:border-orange-500/50 transition-colors">
                <h4 className="text-xl font-bold text-orange-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  Can assemblies reference different framework versions?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Yes, but with limitations. A .NET Framework 4.8 assembly can't directly use a .NET 6+ assembly. However, .NET Core/5+ uses .NET Standard for compatibility. Assemblies targeting .NET Standard 2.0 can be used by both .NET Framework 4.6.1+ and .NET Core/5+. For new projects, target the latest .NET version unless you need compatibility with older frameworks.
                </p>
              </div>

              {/* FAQ 8 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-violet-500/30 hover:border-violet-500/50 transition-colors">
                <h4 className="text-xl font-bold text-violet-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  How do I view the contents of an assembly?
                </h4>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Several tools can inspect assemblies:
                </p>
                <ul className="space-y-2 text-slate-400 ml-6">
                  <li>• <strong className="text-violet-300">ildasm.exe</strong> - IL Disassembler (ships with Visual Studio)</li>
                  <li>• <strong className="text-violet-300">ILSpy</strong> - Open-source .NET assembly browser</li>
                  <li>• <strong className="text-violet-300">dotPeek</strong> - Free decompiler from JetBrains</li>
                  <li>• <strong className="text-violet-300">Reflector</strong> - Commercial .NET decompiler</li>
                </ul>
              </div>

              {/* FAQ 9 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-red-500/30 hover:border-red-500/50 transition-colors">
                <h4 className="text-xl font-bold text-red-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  What is the AssemblyLoadContext and when should I use it?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  <code className="text-red-300">AssemblyLoadContext</code> (introduced in .NET Core) provides isolation for loading assemblies. It's useful for plugin architectures, where you want to load/unload assemblies dynamically, or when you need multiple versions of the same assembly in a single process. Think of it as creating separate "domains" for assembly loading (replacing AppDomains from .NET Framework).
                </p>
              </div>

              {/* FAQ 10 */}
              <div className="p-6 rounded-xl bg-slate-900/50 border border-teal-500/30 hover:border-teal-500/50 transition-colors">
                <h4 className="text-xl font-bold text-teal-300 mb-3 flex items-center gap-2">
                  <HelpCircle size={20} />
                  Are there any performance differences between private and shared assemblies?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Shared assemblies in the GAC have a slight advantage: they're verified once at installation and can be shared in memory across processes. However, the difference is negligible in most applications. The real benefits of shared assemblies are versioning and system-wide updates, not performance. For modern cloud and container deployments, private assemblies are often preferred for simplicity.
                </p>
              </div>
            </div>

            <InfoBox type="note" title="Additional Resources" icon={BookOpen}>
              <p className="text-slate-300 mb-3">
                For more information about .NET assemblies, check these resources:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Microsoft Docs:</strong> Official .NET Assembly documentation</li>
                <li>• <strong>.NET CLI Reference:</strong> Command-line tools for assembly management</li>
                <li>• <strong>Strong Naming Guide:</strong> Best practices for strong-named assemblies</li>
                <li>• <strong>GAC Utilities:</strong> Tools and utilities for GAC management</li>
              </ul>
            </InfoBox>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-20">
          <div className="my-12 p-10 rounded-2xl bg-gradient-to-r from-purple-950/50 to-blue-950/50 border border-purple-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -mr-36 -mt-36"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30">
                  <Sparkles size={28} className="text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  Mastering Assembly Management
                </h3>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Understanding .NET assemblies is fundamental to building robust, maintainable, and scalable applications. Whether you're creating simple console apps with private assemblies or enterprise systems with shared libraries, the principles we've covered form the foundation of professional .NET development.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                As you continue your journey with .NET, remember that assembly management is not just about technical implementation—it's about architecting systems that are easy to deploy, update, and maintain over time. The side-by-side execution model and strong naming eliminate the versioning nightmares of the past, giving you the freedom to innovate without fear of breaking existing systems.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-300">
                  <CheckCircle size={18} />
                  <span className="font-semibold">Private Assemblies</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300">
                  <CheckCircle size={18} />
                  <span className="font-semibold">Shared Assemblies</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                  <CheckCircle size={18} />
                  <span className="font-semibold">Side-by-Side Execution</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                  <CheckCircle size={18} />
                  <span className="font-semibold">GAC Management</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-700/50">
            <h4 className="text-2xl font-bold text-white mb-4">What's Next?</h4>
            <p className="text-slate-300 leading-relaxed mb-4">
              Now that you understand assemblies, explore these advanced topics:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-300">
                <ChevronRight size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Assembly Binding and Redirection:</strong> Advanced version management techniques</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <ChevronRight size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">NuGet Packages:</strong> Modern package management for .NET</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <ChevronRight size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Reflection and Dynamic Loading:</strong> Runtime assembly manipulation</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <ChevronRight size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Plugin Architectures:</strong> Building extensible applications</span>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </div>
  );
}

// Attach component helpers
AssembliesPost.FeaturedImage = AssembliesFeaturedImage;
AssembliesPost.Image = AssembliesCardImage;
AssembliesPost.CardImage = AssembliesCardImage;

// Enhanced post metadata
AssembliesPost.info = {
  id: "dotnet-assemblies-complete-guide",
  slug: "dotnet-assemblies-complete-guide",
  title: "Mastering .NET Assemblies: Complete Guide to Private & Shared Assemblies",
  excerpt:
    "A comprehensive guide to understanding .NET assemblies, including private and shared assemblies, side-by-side execution, GAC management, and step-by-step tutorials for Visual Studio 2026.",
  category: ".NET & C#",
  author: "Dev Kant Kumar",
  readTime: "35 min read",
  image: "/dotnet-assemblies-cover.jpg",
  featuredImage: "/dotnet-assemblies-cover.jpg",
  featured: false,
  publishDate: "2025-11-29",
  modifiedDate: "2025-11-29",
  tags: [
    "dotnet",
    "csharp",
    "assemblies",
    "gac",
    "visual-studio",
    "programming",
    "tutorial",
    "advanced"
  ],
};

export default AssembliesPost;
