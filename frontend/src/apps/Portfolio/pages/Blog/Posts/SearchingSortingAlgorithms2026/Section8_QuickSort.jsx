import { AlertTriangle, Target, Zap } from 'lucide-react';
import { ComplexityTable, InfoBox, KeyTakeaway, MultiLanguageCode, Pseudocode, SectionHeader, Shuffle, SubSectionHeader } from './SharedComponents';

const Section8_QuickSort = () => {
    const quickSortCode = {
        python: `# Quick Sort in Python
# Time: O(n log n) avg, O(n²) worst | Space: O(log n)

def quick_sort(arr):
    """
    Partition-based divide and conquer sorting.
    Choose pivot, partition, recursively sort partitions.
    """
    if len(arr) <= 1:
        return arr

    # Choose pivot (using last element)
    pivot = arr[-1]

    # Partition into three lists
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]

    # Recursively sort and combine
    return quick_sort(left) + [pivot] + quick_sort(right)

# In-place version (more efficient)
def quick_sort_inplace(arr, low, high):
    if low < high:
        # Partition and get pivot index
        pi = partition(arr, low, high)

        # Recursively sort partitions
        quick_sort_inplace(arr, low, pi - 1)
        quick_sort_inplace(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]  # Choose last element as pivot
    i = low - 1        # Index of smaller element

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example
arr = [10, 7, 8, 9, 1, 5]
quick_sort_inplace(arr, 0, len(arr) - 1)
print("Sorted:", arr)  # [1, 5, 7, 8, 9, 10]`,

        java: `// Quick Sort in Java
// Time: O(n log n) avg, O(n²) worst | Space: O(log n)

public class QuickSort {

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition and get pivot index
            int pi = partition(arr, low, high);

            // Recursively sort partitions
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];  // Last element as pivot
        int i = low - 1;        // Index of smaller element

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Place pivot in correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(java.util.Arrays.toString(arr));
    }
}`,

        cpp: `// Quick Sort in C++
// Time: O(n log n) avg, O(n²) worst | Space: O(log n)

#include <iostream>
#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    quickSort(arr, 0, arr.size() - 1);

    for (int num : arr) cout << num << " ";
    return 0;
}`,

        javascript: `// Quick Sort in JavaScript
// Time: O(n log n) avg, O(n²) worst | Space: O(log n)

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

const arr = [10, 7, 8, 9, 1, 5];
console.log("Sorted:", quickSort(arr));`,

        c: `// Quick Sort in C
// Time: O(n log n) avg, O(n²) worst | Space: O(log n)

#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }

    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    quickSort(arr, 0, n - 1);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    return 0;
}`
    };

    return (
        <section className="mb-16">
            <SectionHeader
                number="8"
                title="Quick Sort ⭐⭐⭐"
                icon={Shuffle}
                subtitle="The King of Sorting Algorithms"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Quick Sort is often considered the <strong>fastest general-purpose sorting algorithm</strong> in practice.
                    It uses the divide and conquer strategy with a clever partitioning scheme that sorts in-place with O(1) auxiliary space.
                </p>

                <div className="grid md:grid-cols-3 gap-4 my-8">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                        <Zap className="text-green-400 mx-auto mb-2" size={24} />
                        <div className="text-green-400 font-bold">Fastest in Practice</div>
                        <div className="text-slate-400 text-xs">Excellent cache performance</div>
                    </div>
                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                        <Target className="text-cyan-400 mx-auto mb-2" size={24} />
                        <div className="text-cyan-400 font-bold">In-Place</div>
                        <div className="text-slate-400 text-xs">O(log n) stack space</div>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                        <AlertTriangle className="text-amber-400 mx-auto mb-2" size={24} />
                        <div className="text-amber-400 font-bold">O(n²) Worst Case</div>
                        <div className="text-slate-400 text-xs">Poor pivot choice</div>
                    </div>
                </div>

                <SubSectionHeader title="How Quick Sort Works" />

                <p>
                    Quick Sort works by selecting a <strong>pivot</strong> element and <strong>partitioning</strong> the array so that elements smaller than the pivot go left, and larger elements go right. Then it recursively sorts the partitions.
                </p>

                {/* Visual Example */}
                <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-4">⚡ Partition Visualization: [10, 7, 8, 9, 1, 5]</h4>

                    <div className="space-y-4 text-sm">
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Step 1:</span>
                            <span className="text-slate-300 ml-2">Choose pivot = <span className="text-yellow-400">5</span> (last element)</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Step 2:</span>
                            <span className="text-slate-300 ml-2">Partition: elements {'<'}5 go LEFT, elements {'>'}5 go RIGHT</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Step 3:</span>
                            <span className="text-slate-300 ml-2">[<span className="text-blue-400">1</span>] | <span className="text-yellow-400">5</span> | [<span className="text-red-400">10, 7, 8, 9</span>] → Pivot in final position!</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Step 4:</span>
                            <span className="text-slate-300 ml-2">Recursively sort [1] (done) and [10, 7, 8, 9]</span>
                        </div>
                        <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                            <span className="text-green-400 font-bold">Result:</span>
                            <span className="text-slate-300 ml-2">[<span className="text-green-400">1, 5, 7, 8, 9, 10</span>] ✅</span>
                        </div>
                    </div>
                </div>

                <Pseudocode
                    title="Quick Sort Algorithm"
                    code={`FUNCTION QuickSort(array, low, high):
    IF low < high:
        // Partition and get pivot index
        pivotIndex = Partition(array, low, high)

        // Recursively sort elements before and after pivot
        QuickSort(array, low, pivotIndex - 1)
        QuickSort(array, pivotIndex + 1, high)

FUNCTION Partition(array, low, high):
    pivot = array[high]    // Choose last element as pivot
    i = low - 1            // Index of smaller element

    FOR j = low TO high - 1:
        IF array[j] <= pivot:
            i = i + 1
            SWAP(array[i], array[j])

    SWAP(array[i + 1], array[high])
    RETURN i + 1            // Return pivot's final position`}
                />

                <SubSectionHeader title="Code Implementation (5 Languages)" />
                <MultiLanguageCode codes={quickSortCode} title="quick_sort" />

                <SubSectionHeader title="Complexity Analysis" />
                <ComplexityTable
                    best="O(n log n)"
                    average="O(n log n)"
                    worst="O(n²)"
                    space="O(log n)"
                    stable={false}
                    inPlace={true}
                />

                <InfoBox type="warning" title="When Does O(n²) Happen?" icon={AlertTriangle}>
                    <p>The worst case occurs when:</p>
                    <ul className="mt-2 space-y-1">
                        <li>• Array is <strong>already sorted</strong> (if picking first/last as pivot)</li>
                        <li>• Array is <strong>reverse sorted</strong></li>
                        <li>• All elements are <strong>the same</strong></li>
                    </ul>
                    <p className="mt-2"><strong>Solution:</strong> Use randomized pivot or median-of-three pivot selection.</p>
                </InfoBox>

                {/* Pivot Selection Strategies */}
                <SubSectionHeader title="Pivot Selection Strategies" />

                <div className="grid md:grid-cols-3 gap-4 my-8">
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                        <h5 className="text-slate-400 font-bold mb-2">First/Last Element</h5>
                        <p className="text-slate-300 text-sm">Simple but poor for sorted data</p>
                        <span className="text-red-400 text-xs">❌ Not recommended</span>
                    </div>
                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <h5 className="text-cyan-400 font-bold mb-2">Random Element</h5>
                        <p className="text-slate-300 text-sm">Good average-case guarantee</p>
                        <span className="text-green-400 text-xs">✅ Recommended</span>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <h5 className="text-green-400 font-bold mb-2">Median-of-Three</h5>
                        <p className="text-slate-300 text-sm">Median of first, middle, last</p>
                        <span className="text-green-400 text-xs">✅ Best practice</span>
                    </div>
                </div>

                {/* Quick Sort vs Merge Sort */}
                <SubSectionHeader title="Quick Sort vs Merge Sort" />

                <div className="my-8 overflow-x-auto">
                    <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Aspect</th>
                                <th className="px-4 py-3 text-cyan-400 font-bold text-sm border-b border-slate-700">Quick Sort</th>
                                <th className="px-4 py-3 text-purple-400 font-bold text-sm border-b border-slate-700">Merge Sort</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900/50">
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Worst Case</td>
                                <td className="px-4 py-3 text-red-400">O(n²)</td>
                                <td className="px-4 py-3 text-green-400">O(n log n)</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Space</td>
                                <td className="px-4 py-3 text-green-400">O(log n)</td>
                                <td className="px-4 py-3 text-red-400">O(n)</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Stable</td>
                                <td className="px-4 py-3 text-red-400">❌ No</td>
                                <td className="px-4 py-3 text-green-400">✅ Yes</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">In-Place</td>
                                <td className="px-4 py-3 text-green-400">✅ Yes</td>
                                <td className="px-4 py-3 text-red-400">❌ No</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Cache Performance</td>
                                <td className="px-4 py-3 text-green-400">Excellent</td>
                                <td className="px-4 py-3 text-yellow-400">Good</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Practical Speed</td>
                                <td className="px-4 py-3 text-green-400">⭐ Faster</td>
                                <td className="px-4 py-3 text-yellow-400">Slower</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <SubSectionHeader title="When to Use Quick Sort" />

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                        <h4 className="text-green-400 font-bold mb-3">✅ Perfect For:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• <strong>Arrays</strong> (excellent cache locality)</li>
                            <li>• <strong>Memory-constrained</strong> environments</li>
                            <li>• When <strong>average-case performance</strong> matters</li>
                            <li>• <strong>General-purpose sorting</strong></li>
                            <li>• When you can use <strong>randomized pivot</strong></li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                        <h4 className="text-red-400 font-bold mb-3">❌ Avoid For:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• <strong>Linked lists</strong> (use Merge Sort)</li>
                            <li>• When <strong>stability</strong> is required</li>
                            <li>• <strong>Real-time systems</strong> (O(n²) worst case)</li>
                            <li>• Already sorted or nearly sorted data (without random pivot)</li>
                        </ul>
                    </div>
                </div>

                <InfoBox type="pro" title="Industry Usage">
                    Quick Sort (with modifications) is used by:
                    <ul className="mt-2 space-y-1">
                        <li>• C's <code className="text-cyan-300">qsort()</code></li>
                        <li>• C++ STL's <code className="text-cyan-300">std::sort()</code> (Introsort variant)</li>
                        <li>• Java's <code className="text-cyan-300">Arrays.sort()</code> for primitives</li>
                        <li>• Many database query engines</li>
                    </ul>
                </InfoBox>

                <KeyTakeaway>
                    <p>
                        Quick Sort is the <strong>go-to sorting algorithm for production code</strong> when working with arrays.
                        Its excellent cache performance and in-place nature make it faster than Merge Sort in practice, despite the O(n²) worst case.
                        Always use <strong>randomized or median-of-three pivot</strong> to avoid worst-case scenarios.
                    </p>
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section8_QuickSort;
