import { BarChart3, BookOpen, Clock, Database, Gamepad2, Search, Smartphone, SortAsc, Star, Store, Target, Zap } from 'lucide-react';
import { InfoBox } from './SharedComponents';

const Introduction = () => {
    return (
        <section className="mb-8 sm:mb-12 md:mb-16">
            {/* Hero Section */}
            <div className="mb-8 sm:mb-12 md:mb-16 text-center">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-4 sm:mb-6">
                    <Star size={12} className="text-cyan-400 sm:w-3.5 sm:h-3.5" />
                    <span className="text-cyan-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Complete DSA Guide 2026</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Searching & Sorting</span>
                    <br />Algorithms Explained
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
                    Master the fundamental algorithms that power everything from database queries to Google search.
                    Complete with code in Python, Java, C++, JavaScript, and C.
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
                        <Clock size={14} className="text-cyan-400 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">45-60 min read</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
                        <Target size={14} className="text-cyan-400 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">15+ Algorithms</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
                        <Zap size={14} className="text-cyan-400 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">5 Languages</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mx-0">
                    <img
                        src="/images/blog/SearchingSortingAlgorithms2026.png"
                        alt="Searching and Sorting Algorithms Complete Guide 2026"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Introduction Content */}
            <div className="prose prose-invert prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300">

                <p className="lead text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8">
                    Imagine you're in a library with a million books, and you need to find a specific one. Would you check every single book from the first shelf? Or would you use a smarter approach—perhaps starting from the middle and eliminating half the options with each step?
                </p>

                <p className="text-sm sm:text-base">
                    This is the essence of <strong>searching and sorting algorithms</strong>—the backbone of computer science and the foundation of every software system you interact with daily. From the autocomplete in your search bar to the way your social media feed is organized, these algorithms are working silently behind the scenes.
                </p>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <Search size={18} className="text-cyan-400 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <span>Why These Algorithms Matter</span>
                </h3>

                <p className="text-sm sm:text-base">
                    Understanding searching and sorting isn't just about passing coding interviews (though it absolutely helps there). It's about developing the <strong>algorithmic thinking</strong> that separates average developers from exceptional ones. When you understand why binary search is O(log n) or why QuickSort beats BubbleSort in practice, you'll start seeing optimization opportunities everywhere.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8 md:my-10">
                    <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/20">
                                <Search size={16} className="text-cyan-400 sm:w-5 sm:h-5" />
                            </div>
                            <h4 className="text-white font-bold text-sm sm:text-base">Searching Algorithms</h4>
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm">
                            Finding specific data in a collection. Used in databases, file systems, and virtually every application that retrieves information.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/20">
                                <SortAsc size={16} className="text-purple-400 sm:w-5 sm:h-5" />
                            </div>
                            <h4 className="text-white font-bold text-sm sm:text-base">Sorting Algorithms</h4>
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm">
                            Organizing data in a specific order. Critical for efficient searching, data analysis, and presenting information to users.
                        </p>
                    </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <Target size={18} className="text-purple-400 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <span>What You'll Learn</span>
                </h3>

                <p>
                    This comprehensive guide covers everything you need to master searching and sorting:
                </p>

                <ul className="space-y-2 sm:space-y-3 my-4 sm:my-6 md:my-8">
                    <li className="flex gap-2 sm:gap-3 items-start">
                        <span className="text-cyan-400 mt-1 sm:mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base"><strong className="text-white">Algorithm Complexity Analysis</strong> — Understanding Big O notation and how to evaluate algorithm efficiency</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3 items-start">
                        <span className="text-cyan-400 mt-1 sm:mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base"><strong className="text-white">Searching Algorithms</strong> — Linear Search, Binary Search, Jump Search, and Interpolation Search</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3 items-start">
                        <span className="text-cyan-400 mt-1 sm:mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base"><strong className="text-white">Simple Sorting Algorithms</strong> — Bubble Sort, Selection Sort, and Insertion Sort</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3 items-start">
                        <span className="text-cyan-400 mt-1 sm:mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base"><strong className="text-white">Advanced Sorting Algorithms</strong> — Merge Sort, Quick Sort, and Heap Sort</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3 items-start">
                        <span className="text-cyan-400 mt-1 sm:mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base"><strong className="text-white">Non-Comparison Sorts</strong> — Counting Sort and Radix Sort</span>
                    </li>
                    <li className="flex gap-2 sm:gap-3 items-start">
                        <span className="text-cyan-400 mt-1 sm:mt-1.5 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base"><strong className="text-white">Practical Applications</strong> — Real-world use cases and interview patterns</span>
                    </li>
                </ul>

                <InfoBox type="pro" title="How to Use This Guide" icon={BookOpen}>
                    <p className="text-xs sm:text-sm">
                        Each algorithm includes a visual explanation, pseudocode, implementations in <strong>5 programming languages</strong> (Python, Java, C++, JavaScript, C), complexity analysis, and practical use cases.
                    </p>
                    <p className="mt-2 text-xs sm:text-sm">
                        Whether you're a beginner learning DSA or preparing for FAANG interviews, this guide has you covered.
                    </p>
                </InfoBox>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <Zap size={18} className="text-amber-400 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <span>Real-World Applications</span>
                </h3>

                <p className="text-sm sm:text-base">
                    Every time you use a computer or smartphone, you're benefiting from these algorithms:
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 my-6 sm:my-8">
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
                            <div key={idx} className="p-3 sm:p-4 rounded-lg bg-slate-800/50 border border-slate-700 text-center hover:border-slate-600 transition-colors">
                                <div className={`inline-flex p-2 sm:p-3 rounded-xl ${item.color} mb-2 sm:mb-3`}>
                                    <IconComponent size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <h5 className="text-white font-bold text-xs sm:text-sm">{item.title}</h5>
                                <p className="text-slate-400 text-[10px] sm:text-xs mt-1 leading-tight">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <InfoBox type="tip" title="Interview Tip">
                    <p className="text-xs sm:text-sm">
                        Sorting and searching questions appear in <strong>over 60% of technical interviews</strong>. Mastering these fundamentals gives you a significant edge over other candidates. Companies like Google, Amazon, and Microsoft frequently test these concepts.
                    </p>
                </InfoBox>

            </div>
        </section>
    );
};

export default Introduction;
