import { Timer, TrendingUp, Zap } from 'lucide-react';
import { InfoBox, KeyTakeaway, SectionHeader } from './SharedComponents';

const Section1_Complexity = () => {
    return (
        <section className="mb-16">
            <SectionHeader
                number="1"
                title="Understanding Algorithm Complexity"
                icon={Timer}
                subtitle="Big O Notation & Analysis"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Before diving into specific algorithms, you need to understand <strong>how we measure algorithm efficiency</strong>.
                    This is crucial for choosing the right algorithm and for technical interviews where complexity analysis is expected.
                </p>

                {/* Time Complexity Section */}
                <h3 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-3">
                    <Timer size={24} className="text-cyan-400" />
                    Time Complexity (Big O Notation)
                </h3>

                <p>
                    Time complexity describes <strong>how the runtime of an algorithm grows</strong> as the input size increases.
                    We use Big O notation to express the worst-case scenario, giving us an upper bound on the algorithm's performance.
                </p>

                <InfoBox type="info" title="Why Big O?">
                    Big O notation ignores constants and lower-order terms because they become insignificant as input grows.
                    An O(n) algorithm with a large constant is still better than O(n²) for large inputs.
                </InfoBox>

                {/* Complexity Classes Table */}
                <div className="my-10 overflow-x-auto">
                    <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Notation</th>
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Name</th>
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Example</th>
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">n=100</th>
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">n=10,000</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900/50">
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                                <td className="px-4 py-3 font-mono text-green-400 font-bold">O(1)</td>
                                <td className="px-4 py-3 text-slate-300">Constant</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Array access, hash lookup</td>
                                <td className="px-4 py-3 text-green-400">1</td>
                                <td className="px-4 py-3 text-green-400">1</td>
                            </tr>
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                                <td className="px-4 py-3 font-mono text-green-400 font-bold">O(log n)</td>
                                <td className="px-4 py-3 text-slate-300">Logarithmic</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Binary search</td>
                                <td className="px-4 py-3 text-green-400">~7</td>
                                <td className="px-4 py-3 text-green-400">~13</td>
                            </tr>
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                                <td className="px-4 py-3 font-mono text-cyan-400 font-bold">O(n)</td>
                                <td className="px-4 py-3 text-slate-300">Linear</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Linear search, single loop</td>
                                <td className="px-4 py-3 text-cyan-400">100</td>
                                <td className="px-4 py-3 text-cyan-400">10,000</td>
                            </tr>
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                                <td className="px-4 py-3 font-mono text-yellow-400 font-bold">O(n log n)</td>
                                <td className="px-4 py-3 text-slate-300">Linearithmic</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Merge sort, Quick sort</td>
                                <td className="px-4 py-3 text-yellow-400">~664</td>
                                <td className="px-4 py-3 text-yellow-400">~132,877</td>
                            </tr>
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                                <td className="px-4 py-3 font-mono text-orange-400 font-bold">O(n²)</td>
                                <td className="px-4 py-3 text-slate-300">Quadratic</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Bubble sort, nested loops</td>
                                <td className="px-4 py-3 text-orange-400">10,000</td>
                                <td className="px-4 py-3 text-orange-400">100,000,000</td>
                            </tr>
                            <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                                <td className="px-4 py-3 font-mono text-red-400 font-bold">O(2ⁿ)</td>
                                <td className="px-4 py-3 text-slate-300">Exponential</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Recursive Fibonacci (naive)</td>
                                <td className="px-4 py-3 text-red-400">2¹⁰⁰ ⚠️</td>
                                <td className="px-4 py-3 text-red-400">∞</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Visual Chart Alternative */}
                <div className="my-10 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <TrendingUp className="text-cyan-400" />
                        Growth Rate Comparison
                    </h4>
                    <div className="grid grid-cols-6 gap-2 text-center text-xs">
                        <div className="p-3 rounded-lg bg-green-500/20 text-green-400 font-bold">O(1)</div>
                        <div className="p-3 rounded-lg bg-green-500/20 text-green-400 font-bold">O(log n)</div>
                        <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold">O(n)</div>
                        <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400 font-bold">O(n log n)</div>
                        <div className="p-3 rounded-lg bg-orange-500/20 text-orange-400 font-bold">O(n²)</div>
                        <div className="p-3 rounded-lg bg-red-500/20 text-red-400 font-bold">O(2ⁿ)</div>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <span className="text-green-400 text-sm">🚀 Fast</span>
                        <div className="flex-1 h-1 mx-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded"></div>
                        <span className="text-red-400 text-sm">🐌 Slow</span>
                    </div>
                </div>

                {/* Space Complexity Section */}
                <h3 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-3">
                    <Zap size={24} className="text-purple-400" />
                    Space Complexity
                </h3>

                <p>
                    Space complexity measures <strong>how much additional memory</strong> an algorithm needs relative to its input size.
                    This is crucial when working with limited memory or large datasets.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                        <h4 className="text-green-400 font-bold mb-3">In-Place Algorithms (O(1))</h4>
                        <p className="text-slate-400 text-sm mb-3">
                            Modify input directly without using extra space proportional to input.
                        </p>
                        <ul className="text-slate-300 text-sm space-y-1">
                            <li>✅ Bubble Sort</li>
                            <li>✅ Selection Sort</li>
                            <li>✅ Insertion Sort</li>
                            <li>✅ Quick Sort</li>
                            <li>✅ Heap Sort</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                        <h4 className="text-amber-400 font-bold mb-3">Out-of-Place Algorithms</h4>
                        <p className="text-slate-400 text-sm mb-3">
                            Require additional memory for temporary storage.
                        </p>
                        <ul className="text-slate-300 text-sm space-y-1">
                            <li>⚠️ Merge Sort — O(n)</li>
                            <li>⚠️ Counting Sort — O(k)</li>
                            <li>⚠️ Radix Sort — O(n + k)</li>
                            <li>⚠️ Bucket Sort — O(n)</li>
                        </ul>
                    </div>
                </div>

                {/* Best, Average, Worst Cases */}
                <h3 className="text-2xl font-bold text-white mt-10 mb-4">
                    Best, Average, and Worst Cases
                </h3>

                <p>
                    Algorithms can perform differently depending on the input:
                </p>

                <div className="my-8 overflow-x-auto">
                    <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Case</th>
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Description</th>
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Example</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900/50">
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-green-400 font-bold">Best Case</td>
                                <td className="px-4 py-3 text-slate-300">Most favorable input</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Binary search finds target at first comparison</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-yellow-400 font-bold">Average Case</td>
                                <td className="px-4 py-3 text-slate-300">Expected performance on random input</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Target found after ~log n comparisons</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-red-400 font-bold">Worst Case</td>
                                <td className="px-4 py-3 text-slate-300">Most unfavorable input</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">QuickSort on already sorted array (poor pivot)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <InfoBox type="warning" title="Interview Alert">
                    When asked about time complexity, always clarify: "Are you asking about best, average, or worst case?"
                    Most interviewers expect the <strong>worst case</strong> unless specified otherwise.
                </InfoBox>

                {/* How to Analyze */}
                <h3 className="text-2xl font-bold text-white mt-10 mb-4">
                    How to Analyze Algorithm Complexity
                </h3>

                <ol className="space-y-4 my-8">
                    <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center">1</span>
                        <div>
                            <strong className="text-white">Count the basic operations</strong>
                            <p className="text-slate-400 text-sm">Identify operations like comparisons, assignments, and arithmetic.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center">2</span>
                        <div>
                            <strong className="text-white">Look at loops</strong>
                            <p className="text-slate-400 text-sm">Single loop over n elements → O(n), Nested loops → O(n²)</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center">3</span>
                        <div>
                            <strong className="text-white">Consider recursion</strong>
                            <p className="text-slate-400 text-sm">Use recurrence relations (T(n) = 2T(n/2) + O(n) for Merge Sort)</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center">4</span>
                        <div>
                            <strong className="text-white">Drop constants and lower-order terms</strong>
                            <p className="text-slate-400 text-sm">O(3n² + 5n + 10) simplifies to O(n²)</p>
                        </div>
                    </li>
                </ol>

                <KeyTakeaway>
                    <p>
                        Understanding complexity is <strong>essential for choosing the right algorithm</strong>.
                        A difference between O(n) and O(n²) can mean the difference between an algorithm that runs in seconds vs. one that takes hours on large inputs.
                        In interviews, always discuss complexity tradeoffs when proposing solutions.
                    </p>
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section1_Complexity;
