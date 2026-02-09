import { CheckCircle2, XCircle } from 'lucide-react';
import { BarChart3, ComparisonTable, KeyTakeaway, SectionHeader } from './SharedComponents';

const Section9_Comparisons = () => {
    const searchAlgorithms = [
        { name: 'Linear Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', stable: true, useCase: 'Unsorted/small data' },
        { name: 'Binary Search', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', stable: true, useCase: 'Sorted arrays' },
        { name: 'Jump Search', best: 'O(1)', average: 'O(√n)', worst: 'O(√n)', space: 'O(1)', stable: true, useCase: 'Large sorted arrays' },
        { name: 'Interpolation Search', best: 'O(1)', average: 'O(log log n)', worst: 'O(n)', space: 'O(1)', stable: true, useCase: 'Uniformly distributed data' },
    ];

    const sortAlgorithms = [
        { name: 'Bubble Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true, useCase: 'Educational' },
        { name: 'Selection Sort', best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: false, useCase: 'Minimize swaps' },
        { name: 'Insertion Sort ⭐', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true, useCase: 'Small/nearly sorted' },
        { name: 'Merge Sort ⭐⭐', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true, useCase: 'Linked lists, stability' },
        { name: 'Quick Sort ⭐⭐⭐', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false, useCase: 'General purpose' },
        { name: 'Heap Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: false, useCase: 'Guaranteed O(n log n), in-place' },
        { name: 'Counting Sort', best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)', space: 'O(k)', stable: true, useCase: 'Small integer range' },
        { name: 'Radix Sort', best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)', space: 'O(n+k)', stable: true, useCase: 'Fixed-length integers/strings' },
    ];

    return (
        <section className="mb-16">
            <SectionHeader
                number="9"
                title="Algorithm Comparison Charts"
                icon={BarChart3}
                subtitle="Master Reference Tables"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Use these comparison tables as your <strong>quick reference guide</strong> for choosing the right algorithm.
                    Bookmark this section for interviews and technical discussions!
                </p>

                {/* Searching Algorithms Comparison */}
                <h3 className="text-2xl font-bold text-white mt-10 mb-4">🔍 Searching Algorithms</h3>
                <ComparisonTable algorithms={searchAlgorithms} />

                {/* Sorting Algorithms Comparison */}
                <h3 className="text-2xl font-bold text-white mt-10 mb-4">📊 Sorting Algorithms</h3>
                <ComparisonTable algorithms={sortAlgorithms} />

                {/* Decision Flowchart */}
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">🤔 How to Choose the Right Algorithm</h3>

                <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-6">Decision Tree for Sorting</h4>

                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-slate-800/50">
                            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                                <span>Q: Is stability required?</span>
                            </div>
                            <div className="ml-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-400" />
                                    <span className="text-slate-300">Yes → Use <strong className="text-green-400">Merge Sort</strong> or <strong className="text-green-400">Insertion Sort</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <XCircle size={16} className="text-red-400" />
                                    <span className="text-slate-300">No → Continue...</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-800/50">
                            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                                <span>Q: Is data size small (n {'<'} 50)?</span>
                            </div>
                            <div className="ml-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-400" />
                                    <span className="text-slate-300">Yes → Use <strong className="text-green-400">Insertion Sort</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <XCircle size={16} className="text-red-400" />
                                    <span className="text-slate-300">No → Continue...</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-800/50">
                            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                                <span>Q: Is data nearly sorted?</span>
                            </div>
                            <div className="ml-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-400" />
                                    <span className="text-slate-300">Yes → Use <strong className="text-green-400">Insertion Sort</strong> or <strong className="text-green-400">TimSort</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <XCircle size={16} className="text-red-400" />
                                    <span className="text-slate-300">No → Continue...</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-800/50">
                            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                                <span>Q: Is memory a constraint?</span>
                            </div>
                            <div className="ml-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-400" />
                                    <span className="text-slate-300">Yes → Use <strong className="text-green-400">Quick Sort</strong> or <strong className="text-green-400">Heap Sort</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <XCircle size={16} className="text-red-400" />
                                    <span className="text-slate-300">No → Use <strong className="text-green-400">Merge Sort</strong></span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                            <div className="flex items-center gap-2 text-green-400 font-bold">
                                <span>Default Choice: Quick Sort (with random pivot)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Reference Cards */}
                <h3 className="text-2xl font-bold text-white mt-12 mb-6">⚡ Quick Reference Cards</h3>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                        <h4 className="text-cyan-400 font-bold text-lg mb-4">For Arrays (Random Access)</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>🔍 Search: <strong>Binary Search</strong></li>
                            <li>📊 Sort (general): <strong>Quick Sort</strong></li>
                            <li>📊 Sort (stable): <strong>Merge Sort</strong></li>
                            <li>📊 Sort (small n): <strong>Insertion Sort</strong></li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <h4 className="text-purple-400 font-bold text-lg mb-4">For Linked Lists (Sequential)</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>🔍 Search: <strong>Linear Search</strong></li>
                            <li>📊 Sort: <strong>Merge Sort</strong></li>
                            <li>❌ Avoid: Quick Sort, Binary Search</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                        <h4 className="text-green-400 font-bold text-lg mb-4">For Integers (Limited Range)</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>📊 Sort: <strong>Counting Sort</strong> (O(n+k))</li>
                            <li>📊 Sort (larger range): <strong>Radix Sort</strong></li>
                            <li>✅ Beats O(n log n) comparison-based sorts!</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                        <h4 className="text-amber-400 font-bold text-lg mb-4">For External Sorting (Disk)</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>📊 Sort: <strong>External Merge Sort</strong></li>
                            <li>📊 Reason: Sequential disk access</li>
                            <li>❌ Avoid: Quick Sort (random access)</li>
                        </ul>
                    </div>
                </div>

                <KeyTakeaway>
                    <p>
                        <strong>No single algorithm is best for all scenarios.</strong> Understanding the trade-offs between time, space, stability, and access patterns is key to making the right choice.
                        When in doubt, Quick Sort for arrays and Merge Sort for linked lists are safe defaults.
                    </p>
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section9_Comparisons;
