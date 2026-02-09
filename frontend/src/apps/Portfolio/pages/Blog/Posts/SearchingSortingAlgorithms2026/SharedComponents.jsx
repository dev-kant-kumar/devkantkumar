import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    Binary,
    BookOpen,
    Check,
    ChevronDown,
    ChevronRight,
    Clock,
    Code,
    Copy,
    Database,
    Flame,
    GitBranch,
    Heart,
    HelpCircle,
    Layers,
    Lightbulb,
    List,
    PlayCircle,
    Search,
    Shuffle,
    SortAsc,
    SortDesc,
    Star,
    Target,
    Terminal,
    Timer,
    TrendingUp,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import { FaJava } from 'react-icons/fa';
import { SiC, SiCplusplus, SiJavascript, SiPython } from 'react-icons/si';

// =========================================
// SHARED COMPONENTS FOR DSA BLOG
// =========================================

/**
 * InfoBox - Highlighted information boxes
 */
export function InfoBox({ type = "info", title, children, icon: Icon }) {
    const configs = {
        info: { style: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-400", Icon: Lightbulb },
        tip: { style: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400", Icon: Zap },
        warning: { style: "from-amber-500/10 to-transparent border-amber-500/20 text-amber-400", Icon: AlertTriangle },
        danger: { style: "from-red-500/10 to-transparent border-red-500/20 text-red-400", Icon: AlertTriangle },
        pro: { style: "from-purple-500/10 to-transparent border-purple-500/20 text-purple-400", Icon: Star },
        complexity: { style: "from-cyan-500/10 to-transparent border-cyan-500/20 text-cyan-400", Icon: Timer }
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

/**
 * CodeSnippet - Multi-language code display with tabs
 */
export function CodeSnippet({ code, language = "javascript", title, nested = false }) {
    const [copied, setCopied] = useState(false);
    const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
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

    const content = (
        <>
            {!nested && (
                <div className="flex items-center justify-between px-4 py-3 bg-[#151b2b] border-b border-slate-800/50">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 mr-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 font-mono">
                            <Terminal size={12} className="text-cyan-400" />
                            <span>{title || `example.${language}`}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800/30 rounded text-xs text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                            {language.toUpperCase()}
                        </div>
                    </div>
                </div>
            )}

            <div className="relative group/code">
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

            <div className="px-4 py-1.5 bg-[#151b2b] border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>UTF-8</span>
                <span>Ln {lines.length}, Col 0</span>
            </div>
        </>
    );

    if (nested) {
        return content;
    }

    return (
        <div className="my-8 rounded-xl overflow-hidden bg-[#0B1120] border border-slate-800 shadow-2xl group">
            {content}
        </div>
    );
}

/**
 * MultiLanguageCode - Tabbed code display for multiple languages
 */
export function MultiLanguageCode({ codes, title }) {
    const [activeTab, setActiveTab] = useState(Object.keys(codes)[0]);

    // Using react-icons for authentic language branding
    const languageConfig = {
        python: { icon: SiPython, color: 'text-[#3776AB]', bg: 'bg-[#3776AB]/10', name: 'Python' },
        java: { icon: FaJava, color: 'text-[#ED8B00]', bg: 'bg-[#ED8B00]/10', name: 'Java' },
        cpp: { icon: SiCplusplus, color: 'text-[#00599C]', bg: 'bg-[#00599C]/10', name: 'C++' },
        javascript: { icon: SiJavascript, color: 'text-[#F7DF1E]', bg: 'bg-[#F7DF1E]/10', name: 'JavaScript' },
        c: { icon: SiC, color: 'text-[#A8B9CC]', bg: 'bg-[#A8B9CC]/10', name: 'C' }
    };

    return (
        <div className="my-6 md:my-8 rounded-xl overflow-hidden bg-[#0B1120] border border-slate-800 shadow-2xl">
            {/* Language Tabs - Responsive scrollable on mobile */}
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-[#151b2b] border-b border-slate-800/50 overflow-x-auto scrollbar-hide">
                {Object.keys(codes).map((lang) => {
                    const config = languageConfig[lang] || { icon: Code, color: 'text-slate-400', bg: 'bg-slate-800/50', name: lang };
                    const IconComponent = config.icon;
                    const isActive = activeTab === lang;

                    return (
                        <button
                            key={lang}
                            onClick={() => setActiveTab(lang)}
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                                isActive
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300 border border-transparent'
                            }`}
                        >
                            <span className={`p-1 rounded ${isActive ? `${config.bg} ${config.color}` : 'bg-slate-800/50'}`}>
                                <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </span>
                            <span>{config.name}</span>
                        </button>
                    );
                })}
            </div>

            {/* Code Display */}
            <CodeSnippet code={codes[activeTab]} language={activeTab} title={title} nested={true} />
        </div>
    );
}

/**
 * SectionHeader - Major section headers with numbers
 */
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

/**
 * SubSectionHeader - Smaller section headers
 */
export function SubSectionHeader({ title, icon: Icon }) {
    return (
        <div className="mt-12 mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                {Icon && <Icon size={24} className="text-cyan-400" />}
                {title}
            </h3>
        </div>
    );
}

/**
 * ComplexityTable - Display time/space complexity
 */
export function ComplexityTable({ best, average, worst, space, stable, inPlace }) {
    return (
        <div className="my-8 overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
                <thead>
                    <tr className="bg-slate-800/50">
                        <th className="px-4 py-3 text-cyan-400 font-bold text-sm border-b border-slate-700">Metric</th>
                        <th className="px-4 py-3 text-cyan-400 font-bold text-sm border-b border-slate-700">Value</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-900/50">
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-slate-300 font-medium">Best Case</td>
                        <td className="px-4 py-3 font-mono text-green-400">{best}</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-slate-300 font-medium">Average Case</td>
                        <td className="px-4 py-3 font-mono text-yellow-400">{average}</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-slate-300 font-medium">Worst Case</td>
                        <td className="px-4 py-3 font-mono text-red-400">{worst}</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-slate-300 font-medium">Space Complexity</td>
                        <td className="px-4 py-3 font-mono text-purple-400">{space}</td>
                    </tr>
                    {stable !== undefined && (
                        <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                            <td className="px-4 py-3 text-slate-300 font-medium">Stable?</td>
                            <td className="px-4 py-3">
                                {stable ? <span className="text-green-400">✅ Yes</span> : <span className="text-red-400">❌ No</span>}
                            </td>
                        </tr>
                    )}
                    {inPlace !== undefined && (
                        <tr className="hover:bg-slate-800/30">
                            <td className="px-4 py-3 text-slate-300 font-medium">In-Place?</td>
                            <td className="px-4 py-3">
                                {inPlace ? <span className="text-green-400">✅ Yes</span> : <span className="text-red-400">❌ No</span>}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

/**
 * AlgorithmVisualization - Step-by-step visualization description
 */
export function AlgorithmVisualization({ title, steps, arrayExample }) {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
                <PlayCircle className="text-cyan-400" size={24} />
                <h4 className="text-lg font-bold text-white">{title}</h4>
            </div>

            {/* Array Display */}
            {arrayExample && (
                <div className="flex flex-wrap gap-2 mb-6 p-4 bg-slate-950/50 rounded-lg">
                    {arrayExample.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center justify-center w-12 h-12 rounded-lg font-bold text-lg transition-all ${
                                item.highlight
                                    ? 'bg-cyan-500 text-white scale-110'
                                    : item.sorted
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                        >
                            {item.value}
                        </div>
                    ))}
                </div>
            )}

            {/* Steps */}
            <div className="space-y-3">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                            idx === currentStep
                                ? 'bg-cyan-500/10 border border-cyan-500/30'
                                : 'bg-slate-800/30'
                        }`}
                    >
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            idx < currentStep ? 'bg-green-500 text-white' : idx === currentStep ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-400'
                        }`}>
                            {idx < currentStep ? <Check size={12} /> : idx + 1}
                        </div>
                        <p className="text-slate-300 text-sm">{step}</p>
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg disabled:opacity-50"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
}

/**
 * ComparisonTable - Compare multiple algorithms
 */
export function ComparisonTable({ algorithms }) {
    return (
        <div className="my-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                        <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Algorithm</th>
                        <th className="px-4 py-3 text-green-400 font-bold text-sm border-b border-slate-700">Best</th>
                        <th className="px-4 py-3 text-yellow-400 font-bold text-sm border-b border-slate-700">Average</th>
                        <th className="px-4 py-3 text-red-400 font-bold text-sm border-b border-slate-700">Worst</th>
                        <th className="px-4 py-3 text-purple-400 font-bold text-sm border-b border-slate-700">Space</th>
                        <th className="px-4 py-3 text-cyan-400 font-bold text-sm border-b border-slate-700">Stable?</th>
                        <th className="px-4 py-3 text-slate-400 font-bold text-sm border-b border-slate-700">When to Use</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-900/50">
                    {algorithms.map((algo, idx) => (
                        <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30">
                            <td className="px-4 py-3 font-bold text-white">{algo.name}</td>
                            <td className="px-4 py-3 font-mono text-green-400">{algo.best}</td>
                            <td className="px-4 py-3 font-mono text-yellow-400">{algo.average}</td>
                            <td className="px-4 py-3 font-mono text-red-400">{algo.worst}</td>
                            <td className="px-4 py-3 font-mono text-purple-400">{algo.space}</td>
                            <td className="px-4 py-3">{algo.stable ? '✅' : '❌'}</td>
                            <td className="px-4 py-3 text-slate-400 text-sm">{algo.useCase}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/**
 * PracticeProblems - List of practice problems
 */
export function PracticeProblems({ problems }) {
    return (
        <div className="my-8">
            <div className="grid gap-4 md:grid-cols-2">
                {problems.map((problem, idx) => (
                    <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                            }`}>
                                {problem.difficulty}
                            </span>
                            <span className="text-slate-500 text-xs">{problem.platform}</span>
                        </div>
                        <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                            {problem.title}
                        </h4>
                        <p className="text-slate-400 text-sm mb-3">{problem.description}</p>
                        <a
                            href={problem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-cyan-400 text-sm hover:text-cyan-300"
                        >
                            Solve Now <ArrowRight size={14} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * FAQItem - Collapsible FAQ
 */
export function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-800 rounded-xl overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
            >
                <span className="text-white font-bold">{question}</span>
                {isOpen ? <ChevronDown className="text-cyan-400" /> : <ChevronRight className="text-slate-400" />}
            </button>
            {isOpen && (
                <div className="p-4 bg-slate-950/50 border-t border-slate-800">
                    <p className="text-slate-300 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
}

/**
 * Pseudocode - Display pseudocode with styling
 */
export function Pseudocode({ code, title }) {
    return (
        <div className="my-8 rounded-xl overflow-hidden bg-slate-900/50 border border-slate-700">
            <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
                <Code size={16} className="text-purple-400" />
                <span className="text-purple-400 font-bold text-sm">{title || 'Pseudocode'}</span>
            </div>
            <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
                {code}
            </pre>
        </div>
    );
}

/**
 * KeyTakeaway - Highlighted key points
 */
export function KeyTakeaway({ children }) {
    return (
        <div className="my-8 p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Star size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-amber-400 mb-2">Key Takeaway</h4>
                    <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
}

export { BarChart3, Binary, BookOpen, Clock, Database, Flame, GitBranch, HelpCircle, Layers, List, Search, Shuffle, SortAsc, SortDesc, Target, Timer, TrendingUp };
