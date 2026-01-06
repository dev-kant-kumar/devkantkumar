
import {
    Activity,
    AlertTriangle,
    BookOpen,
    Bot,
    Brain,
    CheckCircle,
    ChevronDown,
    Code as CodeIcon,
    Copy,
    Database,
    Eye,
    HardDrive,
    Network,
    Scan,
    Settings,
    Shield,
    Sparkles,
    Target,
    Terminal,
    User,
    Workflow,
    Zap
} from "lucide-react";
import React from "react";

// --- Visual Components (Premium 2.0) ---

export function AgenticFeaturedImage({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-950 via-cyan-950/30 to-slate-950 relative overflow-hidden ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />

      {/* Content - fills full height */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center py-12 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-cyan-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-300 text-sm font-medium">2025 Guide</span>
        </div>

        {/* Icon Grid - larger */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Brain size={28} className="text-cyan-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Bot size={40} className="text-cyan-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Network size={28} className="text-purple-400" />
          </div>
        </div>

        {/* Title - larger */}
        <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
          <span className="text-white">Agentic </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">AI</span>
        </h2>

        {/* Subtitle - larger */}
        <p className="text-slate-400 text-lg">
          The Complete 2025 Engineering Guide
        </p>
      </div>
    </div>
  );
}

// Thumbnail Image - for search results
export function AgenticThumbnail({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-slate-900 to-cyan-950 flex items-center justify-center relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
      <Bot size={24} className="text-cyan-400 relative z-10" />
    </div>
  );
}

export function AgenticCardImage({ className = "h-48" }) {
  return (
    <div className={`w-full bg-[#0B1120] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800/60 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-500"
             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

        <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-500 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl flex items-center justify-center mb-4 group-hover:shadow-cyan-500/20 group-hover:border-cyan-500/30 transition-all">
                <Bot size={32} className="text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="font-bold text-slate-200 tracking-wide text-sm group-hover:text-cyan-300 transition-colors">AGENTIC AI</span>
        </div>
    </div>
  );
}

// --- Helper Components (Premium 2.0) ---

export function CodeBlock({ language = "python", filename, code }) {
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const copyToClipboard = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  };

  return (
    <div className="relative my-10 rounded-xl overflow-hidden shadow-2xl border border-slate-800/60 bg-[#0B1120] group ring-1 ring-white/5 transition-all duration-300">

      {/* MacOS-style Header - Clickable for toggle */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-slate-800 cursor-pointer hover:bg-[#1f2937] transition-colors select-none"
      >
        <div className="flex items-center gap-4">
            <div className="flex gap-2"> {/* Window Controls */}
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></div>
            </div>
            {filename && <span className="text-xs font-mono text-slate-500 ml-2">{filename}</span>}
            {!isExpanded && <span className="text-xs text-slate-600 italic ml-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to expand</span>}
        </div>

        <div className="flex items-center gap-3">
             <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{language}</span>
             <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 transition-colors z-10"
                title="Copy Code"
                >
                {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
            <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown size={16} className="text-slate-500" />
            </div>
        </div>
      </div>

      {/* Code Area - Collapsible */}
      <div className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-0 bg-[#0B1120] relative border-t border-slate-800/50 flex">
             <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                <CodeIcon size={100} />
             </div>

             {/* Line Numbers */}
             <div className="hidden md:block py-4 pr-2 pl-4 text-right font-mono text-sm text-slate-700 select-none border-r border-slate-800/50 bg-[#0F1623]">
                {code.trim().split('\n').map((_, i) => (
                    <div key={i} className="leading-relaxed">{i + 1}</div>
                ))}
             </div>

             {/* Code Content */}
             <div className="flex-1 overflow-x-auto p-4">
                 <pre className="font-mono text-sm leading-relaxed text-slate-300">
                    <code>{code.trim()}</code>
                 </pre>
             </div>
          </div>
      </div>
    </div>
  );
}

export function InfoBox({ type = "info", title, children, icon: Icon }) {
  const configs = {
    info:    { style: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-400", Icon: Brain },
    tip:     { style: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400", Icon: Zap },
    warning: { style: "from-amber-500/10 to-transparent border-amber-500/20 text-amber-400", Icon: AlertTriangle }, // Added Icon fallback
    danger:  { style: "from-red-500/10 to-transparent border-red-500/20 text-red-400", Icon: Shield },
    pro:     { style: "from-purple-500/10 to-transparent border-purple-500/20 text-purple-400", Icon: Sparkles }
  };

  // Use provided Icon or fallback to config icon
  const config = configs[type];
  const DisplayIcon = Icon || config.Icon;

  return (
    <div className={`my-8 relative overflow-hidden rounded-xl border-l-[4px] border ${config.style.split(' ')[2]} bg-gradient-to-r ${config.style.split(' ')[0]} ${config.style.split(' ')[1]}`}>
        <div className="absolute top-0 right-0 p-4 opacity-[0.05] pointer-events-none transform translate-x-2 -translate-y-2">
            <DisplayIcon size={120} />
        </div>

        <div className="p-6 relative z-10">
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-slate-950/30 ${config.style.split(' ').pop()}`}>
                    <DisplayIcon size={20} />
                </div>
                <div>
                   {title && <h4 className={`font-bold text-base mb-2 ${config.style.split(' ').pop()}`}>{title}</h4>}
                   <div className="text-slate-300/90 text-sm leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    </div>
  );
}





// --- Sci-Fi Holographic Simulation ---

export function SciFiAgentSimulation() {
    const [phase, setPhase] = React.useState(0);
    const [logs, setLogs] = React.useState([]);

    // Phases: 0: Idle/Scan, 1: Perception, 2: Reasoning, 3: Action, 4: Reflection
    const phases = [
        { name: "SYSTEM IDLE", color: "text-slate-500", status: "STANDBY" },
        { name: "PERCEPTION LAYER", color: "text-emerald-400", status: "INGESTING DATA" },
        { name: "NEURAL PROCESSING", color: "text-indigo-400", status: "CALCULATING VECTORS" },
        { name: "ACTION EXECUTION", color: "text-amber-400", status: "ENGAGING TOOLS" },
        { name: "MEMORY SYNTHESIS", color: "text-cyan-400", status: "UPDATING VECTORS" },
    ];

    // Simulation Loop
    React.useEffect(() => {
        const interval = setInterval(() => {
            setPhase(p => {
                const next = (p + 1) % 5;
                // Add log entry
                const timestamp = new Date().toISOString().split('T')[1].slice(0,8);
                const newLog = `[${timestamp}] ${phases[next].status} initiated...`;
                setLogs(prev => [newLog, ...prev].slice(0, 6));
                return next;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-[850px] bg-[#030712] rounded-3xl border border-slate-800 relative overflow-hidden group perspective-[2000px] font-mono select-none">

            {/* 1. Background Grid & Starfield */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(60deg)_scale(3)] opacity-30 origin-bottom animate-[grid-scroll_20s_linear_infinite]" />

            {/* 2. HUD Overlay (Flat) */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-50">
                {/* Top Bar */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-emerald-500/80">
                            <Activity size={16} className="animate-pulse" />
                            <span className="text-xs tracking-[0.2em] font-bold">AGENT_01_LIVE</span>
                        </div>
                        <div className="text-[10px] text-slate-500">v4.2.0-alpha • LATENCY: 12ms</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                         <div className={`text-xl font-bold tracking-widest transition-colors duration-500 ${phases[phase].color}`}>
                             {phases[phase].name}
                         </div>
                         <div className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-400">
                             {phases[phase].status}
                         </div>
                    </div>
                </div>

                {/* Side Panels */}
                {/* Side Panels - Moved to Bottom Left to clear Perception Orbit */ }
                 <div className="absolute left-6 bottom-6 w-56 space-y-4 hidden md:block">
                     <div className="p-3 bg-slate-900/80 border-l-2 border-emerald-500/50 backdrop-blur-md rounded-r-lg">
                         <div className="text-[10px] text-slate-500 mb-1 flex justify-between">
                             <span>SYSTEM LOAD</span>
                             <span className="text-emerald-500">OPTICAL</span>
                        </div>
                         <div className="flex items-end gap-1 h-6">
                             {[40, 65, 30, 80, 55, 90, 45, 60, 35].map((h, i) => (
                                 <div key={i} className="flex-1 bg-emerald-500/20" style={{ height: `${h}%` }} >
                                     <div className="w-full bg-emerald-500/60" style={{ height: '20%' }}></div>
                                 </div>
                             ))}
                         </div>
                     </div>
                     <div className="p-3 bg-slate-900/80 border-l-2 border-blue-500/50 backdrop-blur-md transition-all duration-300 rounded-r-lg">
                         <div className="text-[10px] text-slate-500 mb-1">TOKEN STREAM</div>
                        <div className="text-xl font-bold text-blue-400 font-mono tracking-tighter">
                            {(window.tokenCount || 1240) + Math.floor(Math.random()*50)}
                            <span className="text-[10px] font-normal text-slate-600 ml-2">tks/s</span>
                        </div>
                     </div>
                 </div>

                {/* Bottom Log - Moved to Bottom Right to clear Memory Orbit */ }
                 <div className="absolute right-6 bottom-6 w-80 bg-slate-900/80 border border-slate-700/50 backdrop-blur-md p-3 rounded-lg hidden md:block">
                     <div className="text-[10px] text-slate-500 mb-2 border-b border-slate-800 pb-1 flex justify-between">
                         <span className="flex items-center gap-2"><Terminal size={10} /> KERNEL.LOG</span>
                         <span className="text-emerald-500/50 animate-pulse">● REC</span>
                     </div>
                     <div className="space-y-1 font-mono text-[10px] h-24 overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none z-10" />
                         {logs.map((log, i) => (
                             <div key={i} className={`truncate ${i === 0 ? 'text-white font-bold' : 'text-slate-500 opacity-70'}`}>
                                 <span className="text-emerald-500 mr-2">{">"}</span>{log}
                             </div>
                         ))}
                     </div>
                 </div>
             </div>

            {/* 3. 3D Scene */}
            <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] [transform:rotateX(25deg)_translateY(-50px)] scale-[0.6] md:scale-100 transition-transform origin-center">

                {/* Central Core (Gyroscope) */}
                <div className={`relative w-40 h-40 [transform-style:preserve-3d] transition-all duration-1000 ${phase === 2 ? 'scale-125' : 'scale-100'}`}>
                     {/* Core Glow */}
                    <div className={`absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse transition-opacity duration-500 ${phase === 2 ? 'opacity-100' : 'opacity-20'}`} />

                    {/* Rings */}
                    <div className="absolute inset-0 border border-indigo-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-2 border border-cyan-400/30 rounded-full animate-[spin_15s_linear_infinite_reverse] [transform:rotateX(60deg)]" />
                    <div className="absolute inset-4 border border-purple-500/30 rounded-full animate-[spin_8s_linear_infinite] [transform:rotateY(60deg)]" />

                    {/* Inner Brain */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-slate-900 rounded-full border border-indigo-400/50 shadow-[0_0_30px_inset_rgba(99,102,241,0.2)] flex items-center justify-center">
                             <Brain size={32} className={`text-indigo-400 animate-pulse ${phase === 2 ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''}`} />
                        </div>
                    </div>

                    {/* Connecting Beams to Orbiters */}
                    <svg className="absolute inset-0 overflow-visible [transform:rotateX(-20deg)] opacity-60 pointer-events-none">
                        <line x1="50%" y1="50%" x2="10%" y2="50%" className={`stroke-emerald-500/30 transition-all duration-500 ${phase === 1 ? 'stroke-emerald-400 stroke-2' : 'stroke-1'}`} />
                         <line x1="50%" y1="50%" x2="90%" y2="50%" className={`stroke-amber-500/30 transition-all duration-500 ${phase === 3 ? 'stroke-amber-400 stroke-2' : 'stroke-1'}`} />
                         <line x1="50%" y1="50%" x2="50%" y2="90%" className={`stroke-cyan-500/30 transition-all duration-500 ${phase === 4 ? 'stroke-cyan-400 stroke-2' : 'stroke-1'}`} />
                    </svg>
                </div>

                {/* Orbiting Modules */}
                {/* Perception (Left) */}
                <div className={`absolute left-4 md:left-24 transition-all duration-700 ${phase === 1 ? 'scale-110 brightness-125' : 'scale-90 brightness-50 opacity-60'} [transform:translateZ(50px)]`}>
                     <div className="w-24 h-24 bg-slate-900/90 border border-emerald-500/50 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.1)] relative group/mod">
                        <Scan size={24} className="text-emerald-400 mb-2 group-hover/mod:animate-spin" />
                        <div className="text-[10px] text-emerald-300 font-bold tracking-wider">PERCEPTION</div>
                        {/* Scanning beam */}
                        <div className={`absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent animate-scan ${phase === 1 ? 'opacity-100' : 'opacity-0'}`} />
                     </div>
                </div>

                {/* Tools (Right) */}
                <div className={`absolute right-4 md:right-24 transition-all duration-700 ${phase === 3 ? 'scale-110 brightness-125' : 'scale-90 brightness-50 opacity-60'} [transform:translateZ(50px)]`}>
                     <div className="w-24 h-24 bg-slate-900/90 border border-amber-500/50 rounded-xl flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                        <Terminal size={24} className="text-amber-400 mb-2" />
                        <div className="text-[10px] text-amber-300 font-bold tracking-wider">TOOLS</div>
                        {/* Blip */}
                        <div className={`absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full ${phase === 3 ? 'animate-ping' : ''}`} />
                     </div>
                </div>

                {/* Memory (Bottom) */}
                 <div className={`absolute bottom-10 md:bottom-20 transition-all duration-700 ${phase === 4 ? 'scale-110 brightness-125' : 'scale-90 brightness-50 opacity-60'} [transform:translateZ(80px)]`}>
                     <div className="w-32 h-20 bg-slate-900/90 border border-cyan-500/50 rounded-xl flex items-center justify-center gap-3 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                        <HardDrive size={24} className="text-cyan-400" />
                         <div className="text-left">
                             <div className="text-[10px] text-cyan-300 font-bold tracking-wider">MEMORY</div>
                             <div className="text-[8px] text-slate-400">VECTOR_DB: OK</div>
                         </div>
                     </div>
                </div>

            </div>

        </div>
    );
}

// --- End Sci-Fi Simulation ---


// --- Part 1 Specific Interactive Components ---

export function AnalogyVisualizer() {
  const [activeMode, setActiveMode] = React.useState('librarian'); // 'librarian' | 'agent'

  return (
    <div className="w-full my-12 bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm group hover:border-slate-700 transition-all duration-500">
      {/* Toggle Controls */}
      <div className="flex border-b border-slate-800/50">
        <button
          onClick={() => setActiveMode('librarian')}
          className={`flex-1 py-4 text-sm tracking-widest font-bold uppercase transition-all duration-300 ${activeMode === 'librarian' ? 'bg-slate-800/50 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          The Librarian (LLM)
        </button>
        <button
          onClick={() => setActiveMode('agent')}
          className={`flex-1 py-4 text-sm tracking-widest font-bold uppercase transition-all duration-300 ${activeMode === 'agent' ? 'bg-slate-800/50 text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          The Employee (Agent)
        </button>
      </div>

      {/* Visualization Area */}
      <div className="relative h-96 bg-[#030712] overflow-hidden">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

         {/* MODE: LIBRARIAN */}
         <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${activeMode === 'librarian' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
            <div className="flex items-center gap-8 md:gap-16">
                {/* User */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <User size={32} className="text-slate-400" />
                    </div>
                    <div className="bg-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300 border border-slate-700 relative">
                        "What is 2+2?"
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-t border-r border-slate-700 ml-1"></div>
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-[2px] bg-slate-700 relative">
                         <div className="absolute inset-0 bg-cyan-500 w-1/2 animate-[progress_2s_linear_infinite]" />
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Retrieval</span>
                </div>

                {/* Librarian */}
                <div className="flex flex-col items-center gap-4 relative">
                    <div className="w-24 h-24 rounded-2xl bg-cyan-900/20 border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                         <BookOpen size={40} className="text-cyan-400" />
                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full animate-ping" />
                    </div>
                    <div className="bg-cyan-950/50 px-4 py-2 rounded-xl text-xs text-cyan-200 border border-cyan-500/30 text-center">
                        "Here is the answer."
                        <br/>
                        <span className="text-[10px] text-cyan-500/70">(Static Knowledge)</span>
                    </div>
                </div>
            </div>
         </div>

         {/* MODE: AGENT */}
         <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${activeMode === 'agent' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
            {/* Cycle Animation */}
             <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
                {/* Central Agent */}
                <div className="relative z-10 w-28 h-28 rounded-full bg-[#0B1120] border-2 border-purple-500 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                    <Bot size={40} className="text-purple-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-purple-300 mt-2 tracking-widest">AGENT</span>
                </div>

                {/* Orbiting Nodes */}
                <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-slate-700 animate-[spin_20s_linear_infinite]">
                    {/* Node 1: Tool */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/50 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                        <Terminal size={20} className="text-amber-400" />
                    </div>
                     {/* Node 2: Memory */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-xl bg-slate-900 border border-emerald-500/50 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                        <HardDrive size={20} className="text-emerald-400" />
                    </div>
                     {/* Node 3: Plan */}
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-slate-900 border border-blue-500/50 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                        <Workflow size={20} className="text-blue-400" />
                    </div>
                     {/* Node 4: Critic */}
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-slate-900 border border-red-500/50 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                        <Scan size={20} className="text-red-400" />
                    </div>
                </div>

                {/* Interactions */}
                <div className="absolute top-12 left-12 animate-fade-in-up">
                    <div className="px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-[10px] text-slate-300">
                        Goal: "Plan Trip"
                    </div>
                </div>
                 <div className="absolute bottom-12 right-12 animate-fade-in-up delay-700">
                    <div className="px-3 py-1.5 bg-purple-900/30 rounded-lg border border-purple-500/30 text-[10px] text-purple-300">
                        Action: Book Flight
                    </div>
                </div>

             </div>
         </div>

      </div>
       <div className="p-6 bg-[#0B1120] border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
                {activeMode === 'librarian'
                    ? "Static. Passive. Returns what exists in the database."
                    : "Dynamic. Active. Creates new outcomes by using tools and reasoning."}
            </p>
       </div>
    </div>
  );
}

export function ComparisonDeck() {
  const cards = [
    {
        title: "Traditional AI",
        desc: "Pattern Recognition",
        icon: Database,
        visual: "bg-slate-800 border-slate-700 text-slate-400",
        exam: "Full Text Search, Spam Filters"
    },
    {
        title: "Generative AI",
        desc: "Content Creation",
        icon: Sparkles,
        visual: "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30 text-indigo-300",
        exam: "ChatGPT, Midjourney"
    },
    {
        title: "Agentic AI",
        desc: "Goal Execution",
        icon: Bot,
        visual: "bg-[#0B1120] border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)] text-cyan-400 scale-105 z-10",
        exam: "Software Engineer Agent, Data Analyst"
    }
  ];

  return (
    <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {cards.map((card, idx) => (
            <div key={idx} className={`p-8 rounded-2xl border flex flex-col items-center text-center gap-6 relative group overflow-hidden transition-all duration-300 hover:-translate-y-2 ${card.visual}`}>
                {/* Glow for Agentic */}
                {idx === 2 && <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${idx === 2 ? 'bg-cyan-500/10' : 'bg-slate-900/50'}`}>
                    <card.icon size={32} />
                </div>

                <div>
                    <h4 className={`text-xl font-bold mb-2 ${idx === 2 ? 'text-white' : 'text-slate-200'}`}>{card.title}</h4>
                    <p className={`text-sm mb-4 ${idx === 2 ? 'text-cyan-200' : 'text-slate-400'}`}>{card.desc}</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono border ${idx === 2 ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
                        Ex: {card.exam}
                    </div>
                </div>

                {/* Hover Reveal for Agentic */}
                {idx === 2 && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                )}
            </div>
        ))}
    </div>
  )
}

export function MarketDataViz() {
  return (
      <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
            { label: "Projected Market", value: "$199B", sub: "by 2030", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5" },
            { label: "Productivity", value: "10x", sub: "in Coding & Data", color: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/5" },
            { label: "Operations", value: "24/7", sub: "Uptime", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5" },
        ].map((item, idx) => (
            <div key={idx} className={`relative p-8 rounded-3xl border ${item.border} ${item.bg} backdrop-blur-sm flex flex-col items-center justify-center group overflow-hidden`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-transparent to-black/20" />
                <h3 className={`text-5xl md:text-6xl font-black mb-2 tracking-tighter ${item.color} drop-shadow-sm`}>
                    {item.value}
                </h3>
                <span className="text-slate-300 font-medium text-lg">{item.label}</span>
                <span className="text-slate-500 text-sm mt-1">{item.sub}</span>
            </div>
        ))}
      </div>
  )
}

export function ReActLiveTerminal() {
    const [lines, setLines] = React.useState([
        { type: 'system', content: 'Initializing Agent Loop...' },
        { type: 'user', content: '> Research the current stock price of NVIDIA and analyze if it is a buy.' },
    ]);

    // Use a ref to check if simulation is running to prevent double intervals
    const simulationRef = React.useRef(false);

    React.useEffect(() => {
        if (simulationRef.current) return;
        simulationRef.current = true;

        const sequence = [
            { type: 'thought', content: 'THOUGHT: I need to search for the current price of NVDA and recent analyst ratings.', delay: 1000 },
            { type: 'command', content: 'ACTION: search_web("NVDA stock price")', delay: 2500 },
            { type: 'output', content: 'OBSERVATION: NVDA is trading at $142.50 (+2.5%) as of 10:30 AM EST.', delay: 4000 },
            { type: 'thought', content: 'THOUGHT: Now I need to find recent earnings reports to determine "buy" rating.', delay: 5500 },
            { type: 'command', content: 'ACTION: search_news("NVIDIA earnings analysis 2025")', delay: 7000 },
            { type: 'output', content: 'OBSERVATION: Record revenue reported. Analysts from Goldman and JP Morgan maintain "Overweight" rating.', delay: 9000 },
            { type: 'result', content: 'FINAL ANSWER: Based on the current price of $142.50 and strong analyst consensus driven by record revenue, NVIDIA is rated as a STRONG BUY.', delay: 11000 },
             { type: 'system', content: 'Agent finished in 11.2s', delay: 12000 }
        ];

        let timeouts = [];

        sequence.forEach(step => {
            timeouts.push(setTimeout(() => {
                setLines(prev => {
                     // Keep only last 6 lines to prevent overflow if desired, or scroll.
                     // Let's keep all for now but styled safely.
                     if (step.type === 'system' && step.delay > 10000) return [sequence[1], ...prev, step]; // Resetish logic could go here but let's just append
                     return [...prev, step];
                });
            }, step.delay));
        });

        // Loop effect? simpler to just run once for this demo.
        // Or maybe reset after 15s.
        timeouts.push(setTimeout(() => {
             setLines([
                { type: 'system', content: 'Initializing Agent Loop...' },
                { type: 'user', content: '> Research the current stock price of NVIDIA and analyze if it is a buy.' },
             ]);
              // Trigger re-run?
              // For simplicity in a blog, a continuous loop is nice but might be distracting.
              // Let's just leave it at the end state or loop gently.
              // Note: react useEffect with [] runs once.
        }, 15000));

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="w-full max-w-3xl mx-auto my-12 rounded-xl overflow-hidden bg-[#1E1E1E] border border-slate-700 shadow-2xl font-mono text-sm leading-relaxed relative group">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-black/50">
                 <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/80" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                     <div className="w-3 h-3 rounded-full bg-green-500/80" />
                 </div>
                 <div className="text-slate-500 text-xs">agent_terminal_v2.exe</div>
            </div>

            <div className="p-6 h-[400px] overflow-hidden flex flex-col justify-end relative">
                 <div className="absolute inset-0 p-6 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                    {lines.map((line, idx) => (
                        <div key={idx} className={`animate-fade-in-up ${
                            line.type === 'system' ? 'text-slate-500 italic' :
                            line.type === 'user' ? 'text-white font-bold' :
                            line.type === 'thought' ? 'text-purple-400' :
                            line.type === 'command' ? 'text-amber-400' :
                            line.type === 'output' ? 'text-emerald-400' :
                            'text-cyan-400 font-bold bg-cyan-900/10 p-2 rounded border-l-2 border-cyan-500'
                        }`}>
                            {line.type === 'command' && <span className="text-amber-600 mr-2">$</span>}
                            {line.content}
                        </div>
                    ))}
                    {/* Blinking cursor */}
                    <div className="w-2 h-4 bg-slate-500 animate-pulse mt-1" />
                 </div>
            </div>

             {/* Scanline effect */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20" />
        </div>
    )
}

export function AgentAnatomyInteractive() {
  const [activeNode, setActiveNode] = React.useState('brain');

  const nodes = [
    {
      id: "brain",
      icon: Brain,
      title: "The Brain",
      desc: "LLM Reasoning Engine",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      position: "top-0 left-1/2 -translate-x-1/2",
      details: {
        subtitle: "Decision & Orchestration",
        content: "The LLM acts as the cognitive core. It holds the goal in context, reasons about the next step, and selects which tool to call.",
        tech: ["GPT-4o", "Claude 3.5", "Llama 3"]
      }
    },
    {
      id: "memory",
      icon: Database,
      title: "Memory",
      desc: "Context & Vector DB",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      position: "top-1/3 left-0",
      details: {
        subtitle: "Short & Long Term Storage",
        content: "Agents need to remember past actions. Short-term memory lives in the context window; long-term memory lives in a Vector Database (RAG).",
        tech: ["Pinecone", "Redis", "Postgres"]
      }
    },
    {
      id: "tools",
      icon: Settings,
      title: "Tools",
      desc: "Action Space",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      position: "top-1/3 right-0",
      details: {
        subtitle: "Interacting with the World",
        content: "Capabilities defined by schemas. The agent fills these schemas to execute code, search the web, or query APIs.",
        tech: ["OpenAPI", "Selenium", "Python REPL"]
      }
    },
    {
      id: "planning",
      icon: Workflow,
      title: "Planning",
      desc: "Decomposition",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      position: "bottom-1/3 left-0",
      details: {
        subtitle: "Breaking Down Complexity",
        content: "Methods like Chain-of-Thought or Tree-of-Thoughts help agents break massive goals into atomic, executable steps.",
        tech: ["CoT", "ReAct", "Reflection"]
      }
    },
    {
      id: "perception",
      icon: Eye,
      title: "Perception",
      desc: "Multimodal Inputs",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      position: "bottom-1/3 right-0",
      details: {
        subtitle: "Seeing & Hearing",
        content: "Encoders that transform pixels, audio, and documents into embeddings the LLM can understand.",
        tech: ["CLIP", "Whisper", "OCR"]
      }
    },
    {
      id: "feedback",
      icon: Target,
      title: "Feedback",
      desc: "Self-Correction",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      position: "bottom-0 left-1/2 -translate-x-1/2",
      details: {
        subtitle: "Learning from Errors",
        content: "The ability to look at a failed output, analyze the error trace, and try a different approach.",
        tech: ["Reflexion", "Critic", "Human-in-the-loop"]
      }
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-20 p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row gap-8">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* Left: Interactive Diagram */}
      <div className="relative flex-1 h-[500px] flex items-center justify-center scale-[0.6] sm:scale-75 md:scale-100 transition-transform origin-center">
        {/* Connecting Lines (Simplified for CSS) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
             <div className="w-64 h-64 border-2 border-dashed border-slate-500 rounded-full animate-[spin_60s_linear_infinite]" />
             <div className="absolute w-96 h-96 border border-slate-700 rounded-full opacity-30" />
        </div>

        {/* Central Core */}
        <div className="relative z-10 w-32 h-32 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <span className="text-xs font-mono text-slate-500 tracking-widest">AGENT</span>
        </div>

        {/* Nodes */}
        {nodes.map((node) => {
           const angle = (nodes.indexOf(node) / nodes.length) * 2 * Math.PI - Math.PI / 2;
           const radius = 160; // px
           const x = Math.cos(angle) * radius;
           const y = Math.sin(angle) * radius;

           return (
             <div
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`absolute w-24 h-24 rounded-2xl border backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 z-20 hover:scale-110 ${activeNode === node.id ? `ring-2 ring-offset-2 ring-offset-slate-900 ${node.color} bg-slate-800 ${node.border}` : 'bg-slate-900/80 border-slate-700 text-slate-500'}`}
                style={{
                    transform: `translate(${x}px, ${y}px)`,
                }}
             >
                <node.icon size={28} className="mb-2" />
                <span className="text-[10px] font-bold text-center leading-none">{node.title}</span>
             </div>
           )
        })}
      </div>

      {/* Right: Info Panel */}
      <div className="relative flex-1 bg-slate-900/50 rounded-2xl border border-slate-700 p-8 flex flex-col justify-center backdrop-blur-md">
          {nodes.map((node) => (
             <div key={node.id} className={`transition-all duration-500 ${activeNode === node.id ? 'opacity-100 scale-100 absolute inset-8' : 'opacity-0 scale-95 absolute inset-8 pointer-events-none'}`}>
                 <div className={`w-12 h-12 rounded-lg ${node.bg} ${node.color} flex items-center justify-center mb-6`}>
                     <node.icon size={24} />
                 </div>
                 <h3 className="text-3xl font-bold text-white mb-2">{node.title}</h3>
                 <div className={`text-lg font-medium mb-6 ${node.color}`}>{node.details.subtitle}</div>
                 <p className="text-slate-400 leading-relaxed mb-8">{node.details.content}</p>

                 <div>
                     <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3 block">Technologies</span>
                     <div className="flex flex-wrap gap-2">
                         {node.details.tech.map(t => (
                             <span key={t} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">{t}</span>
                         ))}
                     </div>
                 </div>
             </div>
          ))}
      </div>

    </div>
  );
}
