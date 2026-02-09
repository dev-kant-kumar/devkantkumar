import { ComplexityTable, InfoBox, KeyTakeaway, Layers, MultiLanguageCode, Pseudocode, SectionHeader, SubSectionHeader } from './SharedComponents';

const Section6_InsertionSort = () => {
    const insertionSortCode = {
        python: `# Insertion Sort in Python
# Time: O(n²) worst | O(n) best | Space: O(1)

def insertion_sort(arr):
    """
    Sort by building sorted portion one element at a time.
    Like sorting playing cards in your hand.
    """
    n = len(arr)

    for i in range(1, n):
        key = arr[i]  # Element to insert
        j = i - 1

        # Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        # Insert key at correct position
        arr[j + 1] = key

    return arr

# Example
arr = [12, 11, 13, 5, 6]
print("Sorted:", insertion_sort(arr))
# Output: [5, 6, 11, 12, 13]`,

        java: `// Insertion Sort in Java
// Time: O(n²) worst | O(n) best | Space: O(1)

public class InsertionSort {

    public static void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            // Shift elements greater than key
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            // Insert key at correct position
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        insertionSort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }
}`,

        cpp: `// Insertion Sort in C++
// Time: O(n²) worst | O(n) best | Space: O(1)

#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Shift elements greater than key
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6};
    insertionSort(arr);

    for (int num : arr) cout << num << " ";
    return 0;
}`,

        javascript: `// Insertion Sort in JavaScript
// Time: O(n²) worst | O(n) best | Space: O(1)

function insertionSort(arr) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        // Shift elements greater than key
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }

    return arr;
}

const arr = [12, 11, 13, 5, 6];
console.log("Sorted:", insertionSort(arr));`,

        c: `// Insertion Sort in C
// Time: O(n²) worst | O(n) best | Space: O(1)

#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Shift elements greater than key
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    insertionSort(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    return 0;
}`
    };

    return (
        <section className="mb-16">
            <SectionHeader
                number="6"
                title="Insertion Sort ⭐"
                icon={Layers}
                subtitle="Best for Small & Nearly Sorted Data"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Insertion Sort builds the final sorted array one item at a time. It's like sorting playing cards in your hand—you pick each card and insert it into its correct position among the already-sorted cards.
                </p>

                <InfoBox type="tip" title="Real-World Favorite">
                    Despite being O(n²), Insertion Sort is <strong>often used in practice</strong> for small arrays or nearly-sorted data.
                    Even languages like Python and Java use it as part of their hybrid sorting algorithms (TimSort) for small subarrays!
                </InfoBox>

                <SubSectionHeader title="How Insertion Sort Works" />

                <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-4">🃏 Visual Walkthrough: Sorting [12, 11, 13, 5, 6]</h4>

                    <div className="space-y-4 text-sm">
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Start:</span>
                            <span className="text-slate-300 ml-2">[<span className="text-green-400">12</span> | 11, 13, 5, 6] — First element is "sorted"</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Insert 11:</span>
                            <span className="text-slate-300 ml-2">11 {'<'} 12 → Shift 12 right → [<span className="text-green-400">11, 12</span> | 13, 5, 6]</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Insert 13:</span>
                            <span className="text-slate-300 ml-2">13 {'>'} 12 → Already in place → [<span className="text-green-400">11, 12, 13</span> | 5, 6]</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Insert 5:</span>
                            <span className="text-slate-300 ml-2">5 {'<'} all → Shift all right → [<span className="text-green-400">5, 11, 12, 13</span> | 6]</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Insert 6:</span>
                            <span className="text-slate-300 ml-2">6 goes after 5 → [<span className="text-green-400">5, 6, 11, 12, 13</span>] ✅</span>
                        </div>
                    </div>
                </div>

                <Pseudocode
                    title="Insertion Sort Algorithm"
                    code={`FUNCTION InsertionSort(array):
    n = array.length

    FOR i = 1 TO n-1:
        key = array[i]          // Current element to insert
        j = i - 1

        // Shift elements greater than key
        WHILE j >= 0 AND array[j] > key:
            array[j + 1] = array[j]
            j = j - 1

        // Insert key at correct position
        array[j + 1] = key

    RETURN array
END FUNCTION`}
                />

                <SubSectionHeader title="Code Implementation (5 Languages)" />
                <MultiLanguageCode codes={insertionSortCode} title="insertion_sort" />

                <SubSectionHeader title="Complexity Analysis" />
                <ComplexityTable
                    best="O(n)"
                    average="O(n²)"
                    worst="O(n²)"
                    space="O(1)"
                    stable={true}
                    inPlace={true}
                />

                <div className="my-8 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20">
                    <h4 className="text-green-400 font-bold mb-4">🚀 Why O(n) Best Case?</h4>
                    <p className="text-slate-300 text-sm">
                        When the array is <strong>already sorted</strong>, the inner while loop never executes—each element is already greater than the previous one. We only do one comparison per element, giving us O(n).
                    </p>
                    <p className="text-slate-400 text-sm mt-2">
                        This makes Insertion Sort <strong>ideal for nearly-sorted data</strong> or as a final pass after a more efficient algorithm.
                    </p>
                </div>

                <SubSectionHeader title="When to Use Insertion Sort" />

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                        <h4 className="text-green-400 font-bold mb-3">✅ Perfect For:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• <strong>Small arrays</strong> (n {'<'} 50)</li>
                            <li>• <strong>Nearly sorted</strong> data</li>
                            <li>• <strong>Online sorting</strong> (data arrives one at a time)</li>
                            <li>• <strong>Stable sorting</strong> required</li>
                            <li>• <strong>Hybrid algorithms</strong> (final pass)</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                        <h4 className="text-red-400 font-bold mb-3">❌ Avoid For:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• Large random datasets</li>
                            <li>• Reverse-sorted data</li>
                            <li>• Performance-critical large sorts</li>
                        </ul>
                    </div>
                </div>

                <SubSectionHeader title="Comparison: Simple Sorting Algorithms" />

                <div className="my-8 overflow-x-auto">
                    <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Algorithm</th>
                                <th className="px-4 py-3 text-green-400 font-bold text-sm border-b border-slate-700">Best</th>
                                <th className="px-4 py-3 text-yellow-400 font-bold text-sm border-b border-slate-700">Average</th>
                                <th className="px-4 py-3 text-red-400 font-bold text-sm border-b border-slate-700">Worst</th>
                                <th className="px-4 py-3 text-cyan-400 font-bold text-sm border-b border-slate-700">Stable</th>
                                <th className="px-4 py-3 text-purple-400 font-bold text-sm border-b border-slate-700">Best Use</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900/50">
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-white font-bold">Bubble Sort</td>
                                <td className="px-4 py-3 font-mono text-green-400">O(n)</td>
                                <td className="px-4 py-3 font-mono text-yellow-400">O(n²)</td>
                                <td className="px-4 py-3 font-mono text-red-400">O(n²)</td>
                                <td className="px-4 py-3">✅</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Educational</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-white font-bold">Selection Sort</td>
                                <td className="px-4 py-3 font-mono text-yellow-400">O(n²)</td>
                                <td className="px-4 py-3 font-mono text-yellow-400">O(n²)</td>
                                <td className="px-4 py-3 font-mono text-red-400">O(n²)</td>
                                <td className="px-4 py-3">❌</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Minimize swaps</td>
                            </tr>
                            <tr className="border-b border-slate-800 bg-cyan-500/5">
                                <td className="px-4 py-3 text-cyan-400 font-bold">Insertion Sort ⭐</td>
                                <td className="px-4 py-3 font-mono text-green-400">O(n)</td>
                                <td className="px-4 py-3 font-mono text-yellow-400">O(n²)</td>
                                <td className="px-4 py-3 font-mono text-red-400">O(n²)</td>
                                <td className="px-4 py-3">✅</td>
                                <td className="px-4 py-3 text-slate-400 text-sm">Small/nearly sorted</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <KeyTakeaway>
                    <p>
                        Among simple O(n²) sorting algorithms, <strong>Insertion Sort is the most practical</strong>.
                        Its O(n) best case for nearly-sorted data and stability make it valuable in real-world scenarios.
                        It's used in production code (TimSort, IntroSort) as the final sorting pass for small subarrays.
                    </p>
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section6_InsertionSort;
