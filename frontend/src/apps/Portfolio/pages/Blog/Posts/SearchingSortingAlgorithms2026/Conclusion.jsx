import { ArrowRight, BookOpen, CheckCircle2, Code, Star } from 'lucide-react';
import { InfoBox } from './SharedComponents';

const Conclusion = () => {
    return (
        <section className="mb-16">
            {/* Conclusion Header */}
            <div className="mt-20 mb-8">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white">Conclusion & Next Steps</h2>
                        <div className="flex items-center gap-2 text-xs text-green-400 mt-1 uppercase tracking-wider font-bold">
                            <Star size={12} /> Your Roadmap Forward
                        </div>
                    </div>
                </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Congratulations! You've completed a comprehensive journey through the most fundamental algorithms in computer science.
                    Let's recap what you've learned and outline your next steps.
                </p>

                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-6 my-10">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                        <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                            <Code size={20} /> Searching Algorithms
                        </h3>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Linear Search — O(n) for unsorted data</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Binary Search — O(log n) for sorted data</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> When to use each approach</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <h3 className="text-purple-400 font-bold text-lg mb-4 flex items-center gap-2">
                            <Code size={20} /> Simple Sorting Algorithms
                        </h3>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Bubble Sort — Educational baseline</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Selection Sort — Minimize swaps</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Insertion Sort — Best for small/nearly sorted</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                        <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                            <Code size={20} /> Advanced Sorting Algorithms
                        </h3>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Merge Sort — Stable, guaranteed O(n log n)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Quick Sort — Fastest in practice</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Algorithm trade-offs & comparisons</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                        <h3 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                            <Code size={20} /> Key Concepts
                        </h3>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Big O complexity analysis</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Time vs Space trade-offs</li>
                            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Stability and in-place sorting</li>
                        </ul>
                    </div>
                </div>

                {/* Key Takeaways */}
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">🎯 Key Takeaways</h3>

                <div className="space-y-4 my-8">
                    {[
                        "Binary Search is essential—it appears in 30%+ of coding interviews and is the foundation for many advanced algorithms.",
                        "Quick Sort is the go-to for general sorting, but always use randomized pivot selection to avoid O(n²) worst case.",
                        "Merge Sort is your friend when stability matters or when sorting linked lists and external data.",
                        "Insertion Sort isn't just educational—it's used in production as part of hybrid algorithms like TimSort.",
                        "Understanding WHY an algorithm works is more important than memorizing code. Focus on the core logic."
                    ].map((takeaway, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm">
                                {idx + 1}
                            </span>
                            <p className="text-slate-300">{takeaway}</p>
                        </div>
                    ))}
                </div>

                {/* Next Steps */}
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">📚 What to Learn Next</h3>

                <div className="grid md:grid-cols-2 gap-4 my-8">
                    {[
                        { title: 'Advanced Data Structures', desc: 'Trees, Graphs, Hash Tables', level: 'Intermediate' },
                        { title: 'Dynamic Programming', desc: 'Optimization problems', level: 'Advanced' },
                        { title: 'Graph Algorithms', desc: 'BFS, DFS, Dijkstra', level: 'Intermediate' },
                        { title: 'Advanced Sorting', desc: 'Heap Sort, Counting Sort, Radix Sort', level: 'Intermediate' },
                    ].map((topic, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all group cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{topic.title}</h4>
                                <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">{topic.level}</span>
                            </div>
                            <p className="text-slate-400 text-sm">{topic.desc}</p>
                        </div>
                    ))}
                </div>

                <InfoBox type="pro" title="Practice Makes Perfect" icon={BookOpen}>
                    <p>
                        The best way to solidify your understanding is through <strong>practice</strong>.
                        Try implementing each algorithm from scratch without looking at the code.
                        Solve problems on LeetCode, HackerRank, or Codeforces that use these algorithms.
                    </p>
                </InfoBox>

                {/* CTA */}
                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">🚀 Ready to Level Up?</h3>
                    <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                        Stay updated with more DSA guides, interview tips, and coding tutorials.
                        Follow for regular updates on algorithms, data structures, and software engineering.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-colors"
                        >
                            More Tutorials <ArrowRight size={18} />
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Conclusion;
