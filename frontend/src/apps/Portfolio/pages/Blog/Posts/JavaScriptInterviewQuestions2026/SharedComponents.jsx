import {
    AlertTriangle,
    Brain,
    Check,
    Copy,
    Heart,
    Lightbulb,
    Star,
    Target,
    Terminal,
    Zap
} from 'lucide-react';
import { useState } from 'react';

export function InfoBox({ type = "info", title, children, icon: Icon }) {
  const configs = {
    info:    { style: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-400", Icon: Lightbulb },
    tip:     { style: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400", Icon: Zap },
    warning: { style: "from-amber-500/10 to-transparent border-amber-500/20 text-amber-400", Icon: AlertTriangle },
    danger:  { style: "from-red-500/10 to-transparent border-red-500/20 text-red-400", Icon: AlertTriangle },
    pro:     { style: "from-purple-500/10 to-transparent border-purple-500/20 text-purple-400", Icon: Star }
  };
  const config = configs[type] || configs.info;
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

export function CodeSnippet({ code, language = "javascript", title }) {
    const [copied, setCopied] = useState(false);
    const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10); // Mock likes
    const [isLiked, setIsLiked] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLike = () => {
        if (isLiked) {
            setLikes(p => p - 1);
        } else {
            setLikes(p => p + 1);
        }
        setIsLiked(!isLiked);
    };

    const lines = code.trim().split('\n');

    return (
        <div className="my-8 rounded-xl overflow-hidden bg-[#0B1120] border border-slate-800 shadow-2xl group">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#151b2b] border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                    </div>

                    {/* File / Language Badge */}
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 font-mono">
                         <Terminal size={12} className="text-cyan-400" />
                         <span>{title || 'Example.js'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                     <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800/30 rounded text-xs text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        {language.toUpperCase()}
                     </div>
                </div>
            </div>

            {/* Code Content */}
            <div className="relative group/code">
                {/* Actions Overlay (Visible on hover) */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover/code:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-slate-800/80 backdrop-blur border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all shadow-lg"
                        title="Copy code"
                    >
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>

                    <button
                        onClick={handleLike}
                        className={`p-2 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-lg hover:bg-slate-700 transition-all shadow-lg flex flex-col items-center gap-1 ${isLiked ? 'text-pink-500 border-pink-500/30' : 'text-slate-300'}`}
                        title="Like snippet"
                    >
                        <Heart size={16} className={isLiked ? "fill-current" : ""} />
                        <span className="text-[10px] font-bold">{likes}</span>
                    </button>
                </div>

                <div className="p-0 overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            {lines.map((line, i) => (
                                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="w-12 px-2 text-right select-none text-slate-600/50 text-xs font-mono border-r border-slate-800/50 bg-[#0d121c]">
                                        {i + 1}
                                    </td>
                                    <td className="pl-4 pr-12 text-sm text-slate-300 font-mono whitespace-pre py-0.5 leading-relaxed">
                                        {line}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

             {/* Footer Status Bar */}
             <div className="px-4 py-1.5 bg-[#151b2b] border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>UTF-8</span>
                <span>Ln {lines.length}, Col 0</span>
             </div>
        </div>
    );
}

export function SectionHeader({ number, title, icon: Icon, subtitle }) {
    return (
      <div className="mt-20 mb-8">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 font-bold text-xl">
            {number}
            </div>
            <div>
            <h2 className="text-2xl md:text-3xl font-black text-white">{title}</h2>
            {Icon && <div className="flex items-center gap-2 text-xs text-cyan-400 mt-1 uppercase tracking-wider font-bold"><Icon size={12} /> {subtitle || "Key Topic"}</div>}
            </div>
        </div>
      </div>
    );
}

export function QuestionItem({ question, answer, code, type = "normal", id }) {
    return (
        <div id={id} className={`mb-12 border-l-2 border-slate-800 pl-6 hover:border-cyan-500/50 transition-colors group ${id ? 'scroll-mt-24' : ''}`}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-start gap-3 group-hover:text-cyan-400 transition-colors">
                <span className="text-cyan-400 mt-1">
                    {type === 'trick' ? <Brain size={20} className="text-pink-500" /> : <Target size={20} />}
                </span>
                {question}
            </h3>
            <div className="prose prose-invert prose-slate max-w-none text-slate-300">
                {answer}
            </div>
             {code && (
                <div className="mt-6">
                     <CodeSnippet code={code} />
                </div>
            )}
        </div>
    );
}

export function RapidFireSection({ questions }) {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {questions.map((q, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <div className="font-bold text-white text-sm mb-2 flex items-start gap-2">
                        <span className="text-cyan-500">Q{i + 1}.</span> {q.q}
                    </div>
                    <div className="text-slate-400 text-xs leading-relaxed border-t border-slate-800 pt-2 mt-2">
                        {q.a}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function InteractivePlayground({ title, initialCode, challenge }) {
    return (
        <div className="my-8">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                <h4 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                    <Code size={18} /> Interactive Playground
                </h4>
                <p className="text-slate-300 text-sm mb-4">
                    Try this concept yourself! Modify the code below and see the output in real-time.
                </p>
                
                {challenge && (
                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 mb-4">
                        <h5 className="text-yellow-400 font-bold text-sm mb-2">Challenge:</h5>
                        <p className="text-slate-300 text-xs">{challenge}</p>
                    </div>
                )}
                
                <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                    <div className="bg-slate-800 px-4 py-2 border-b border-slate-600">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-xs text-slate-400 font-mono">{title}</span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2">
                        <div className="p-4 border-r border-slate-700">
                            <h5 className="text-cyan-400 font-bold text-xs mb-2 uppercase">JavaScript Code</h5>
                            <textarea 
                                className="w-full h-32 bg-slate-800 border border-slate-600 rounded p-2 text-xs text-slate-300 font-mono resize-none focus:outline-none focus:border-cyan-500"
                                defaultValue={initialCode}
                                spellCheck={false}
                            />
                        </div>
                        <div className="p-4 bg-slate-950">
                            <h5 className="text-emerald-400 font-bold text-xs mb-2 uppercase">Output</h5>
                            <div className="bg-slate-900 border border-slate-600 rounded p-2 h-24">
                                <code className="text-xs text-emerald-300 font-mono">// Run the code to see output</code>
                            </div>
                            <button className="mt-2 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded transition-colors">
                                Run Code
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                    <h5 className="text-purple-400 font-bold text-xs mb-1 uppercase">💡 Pro Tip</h5>
                    <p className="text-slate-300 text-xs">
                        Try changing values, adding console.log statements, or breaking the code to understand edge cases. 
                        This is how real developers learn!
                    </p>
                </div>
            </div>
        </div>
    );
}

export function PolyfillChallenge({ functionName, description, difficulty = "medium" }) {
    const difficultyColors = {
        easy: "text-green-400 bg-green-500/10 border-green-500/20",
        medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", 
        hard: "text-red-400 bg-red-500/10 border-red-500/20"
    };

    return (
        <div className="my-8">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6 rounded-xl border border-amber-500/20">
                <div className="flex items-center gap-2 mb-4">
                    <Target size={20} className="text-amber-400" />
                    <h4 className="text-amber-400 font-bold">Polyfill Challenge: Implement {functionName}</h4>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${difficultyColors[difficulty]}`}>
                        {difficulty.toUpperCase()}
                    </span>
                </div>
                
                <p className="text-slate-300 text-sm mb-6">{description}</p>
                
                <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                    <h5 className="text-slate-400 font-bold text-sm mb-3">Your Task:</h5>
                    <p className="text-slate-300 text-xs mb-4">
                        Implement the <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">{functionName}</code> method 
                        from scratch without using the built-in version. Handle edge cases and follow the official specification.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h6 className="text-white font-bold text-xs mb-2">❌ Don't Use:</h6>
                            <div className="text-red-400 text-xs font-mono bg-slate-800 p-2 rounded">
                                // Built-in {functionName} method
                            </div>
                        </div>
                        <div>
                            <h6 className="text-green-400 font-bold text-xs mb-2">✅ Requirements:</h6>
                            <ul className="text-green-300 text-xs space-y-1 list-disc pl-4">
                                <li>Handle all data types</li>
                                <li>Maintain immutability where required</li>
                                <li>Return expected results</li>
                                <li>Handle edge cases (empty arrays, null, etc.)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="text-center">
                    <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg transition-colors">
                        Show Solution
                    </button>
                    <p className="text-slate-400 text-xs mt-2">
                        Try implementing it yourself first! Senior developers are expected to write these from scratch.
                    </p>
                </div>
            </div>
        </div>
    );
}
