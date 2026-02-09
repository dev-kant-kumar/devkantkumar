import { BookOpen, Clock, Search, SortAsc, Star, Target, Zap ,Smartphone,Store, Database, BarChart3, Gamepad2} from 'lucide-react';
import { InfoBox } from './SharedComponents';

const Introduction = () => {
    return (
        <section className="mb-16">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-6">
                    <Star size={14} className="text-cyan-400" />
                    <span className="text-cyan-300 text-xs font-bold uppercase tracking-wider">Complete DSA Guide 2026</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Searching & Sorting</span>
                    <br />Algorithms Explained
                </h1>

                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                    Master the fundamental algorithms that power everything from database queries to Google search.
                    Complete with code in Python, Java, C++, JavaScript, and C.
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={16} className="text-cyan-400" />
                        <span className="text-sm">45-60 min read</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Target size={16} className="text-cyan-400" />
                        <span className="text-sm">15+ Algorithms</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Zap size={16} className="text-cyan-400" />
                        <span className="text-sm">5 Programming Languages</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                    <img
                        src="/images/blog/SearchingSortingAlgorithms2026.png"
                        alt="Searching and Sorting Algorithms Complete Guide 2026"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Introduction Content */}
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300">

                <p className="lead text-xl text-slate-300 mb-8">
                    Imagine you're in a library with a million books, and you need to find a specific one. Would you check every single book from the first shelf? Or would you use a smarter approach—perhaps starting from the middle and eliminating half the options with each step?
                </p>

                <p>
                    This is the essence of <strong>searching and sorting algorithms</strong>—the backbone of computer science and the foundation of every software system you interact with daily. From the autocomplete in your search bar to the way your social media feed is organized, these algorithms are working silently behind the scenes.
                </p>

                <h3 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-3">
                    <Search size={24} className="text-cyan-400" />
                    Why These Algorithms Matter
                </h3>

                <p>
                    Understanding searching and sorting isn't just about passing coding interviews (though it absolutely helps there). It's about developing the <strong>algorithmic thinking</strong> that separates average developers from exceptional ones. When you understand why binary search is O(log n) or why QuickSort beats BubbleSort in practice, you'll start seeing optimization opportunities everywhere.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-10">
                    <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-cyan-500/20">
                                <Search size={20} className="text-cyan-400" />
                            </div>
                            <h4 className="text-white font-bold">Searching Algorithms</h4>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Finding specific data in a collection. Used in databases, file systems, and virtually every application that retrieves information.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-purple-500/20">
                                <SortAsc size={20} className="text-purple-400" />
                            </div>
                            <h4 className="text-white font-bold">Sorting Algorithms</h4>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Organizing data in a specific order. Critical for efficient searching, data analysis, and presenting information to users.
                        </p>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-3">
                    <Target size={24} className="text-purple-400" />
                    What You'll Learn
                </h3>

                <p>
                    This comprehensive guide covers everything you need to master searching and sorting:
                </p>

                <ul className="space-y-2 my-6">
                    <li><strong>Algorithm Complexity Analysis</strong> — Understanding Big O notation and how to evaluate algorithm efficiency</li>
                    <li><strong>Searching Algorithms</strong> — Linear Search, Binary Search, Jump Search, and Interpolation Search</li>
                    <li><strong>Simple Sorting Algorithms</strong> — Bubble Sort, Selection Sort, and Insertion Sort</li>
                    <li><strong>Advanced Sorting Algorithms</strong> — Merge Sort, Quick Sort, and Heap Sort</li>
                    <li><strong>Non-Comparison Sorts</strong> — Counting Sort and Radix Sort</li>
                    <li><strong>Practical Applications</strong> — Real-world use cases and interview patterns</li>
                </ul>

                <InfoBox type="pro" title="How to Use This Guide" icon={BookOpen}>
                    <p>
                        Each algorithm includes a visual explanation, pseudocode, implementations in <strong>5 programming languages</strong> (Python, Java, C++, JavaScript, C), complexity analysis, and practical use cases.
                    </p>
                    <p className="mt-2">
                        Whether you're a beginner learning DSA or preparing for FAANG interviews, this guide has you covered.
                    </p>
                </InfoBox>

                <h3 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-3">
                    <Zap size={24} className="text-amber-400" />
                    Real-World Applications
                </h3>

                <p>
                    Every time you use a computer or smartphone, you're benefiting from these algorithms:
                </p>

                <div className="grid md:grid-cols-3 gap-4 my-8">
                    {[
                        { icon: Search, title: 'Search Engines', desc: 'Binary search on indexed data', color: 'text-cyan-400 bg-cyan-500/10' },
                        { icon: Smartphone, title: 'Social Media', desc: 'Sorting feeds by relevance', color: 'text-blue-400 bg-blue-500/10' },
                        { icon: Store, title: 'E-Commerce', desc: 'Product sorting & filtering', color: 'text-green-400 bg-green-500/10' },
                        { icon: Database, title: 'Databases', desc: 'B-tree search & indexing', color: 'text-purple-400 bg-purple-500/10' },
                        { icon: Gamepad2, title: 'Gaming', desc: 'Collision detection sorting', color: 'text-pink-400 bg-pink-500/10' },
                        { icon: BarChart3, title: 'Data Analytics', desc: 'Sorting for visualization', color: 'text-orange-400 bg-orange-500/10' },
                    ].map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 text-center hover:border-slate-600 transition-colors">
                                <div className={`inline-flex p-3 rounded-xl ${item.color}`}>
                                    <IconComponent size={28} />
                                </div>
                                <h5 className="text-white font-bold mt-3">{item.title}</h5>
                                <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <InfoBox type="tip" title="Interview Tip">
                    Sorting and searching questions appear in <strong>over 60% of technical interviews</strong>. Mastering these fundamentals gives you a significant edge over other candidates. Companies like Google, Amazon, and Microsoft frequently test these concepts.
                </InfoBox>

            </div>
        </section>
    );
};

export default Introduction;
