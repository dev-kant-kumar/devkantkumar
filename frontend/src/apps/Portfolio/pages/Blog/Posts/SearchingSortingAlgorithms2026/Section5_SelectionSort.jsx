import { ComplexityTable, InfoBox, KeyTakeaway, MultiLanguageCode, Pseudocode, SectionHeader, SortDesc, SubSectionHeader } from './SharedComponents';

const Section5_SelectionSort = () => {
    const selectionSortCode = {
        python: `# Selection Sort in Python
# Time: O(n²) | Space: O(1)

def selection_sort(arr):
    """
    Sort by repeatedly finding minimum and placing at beginning.
    """
    n = len(arr)

    for i in range(n):
        # Find minimum element in unsorted portion
        min_idx = i

        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap minimum with first unsorted position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr

# Example
arr = [64, 25, 12, 22, 11]
print("Sorted:", selection_sort(arr))
# Output: [11, 12, 22, 25, 64]`,

        java: `// Selection Sort in Java
// Time: O(n²) | Space: O(1)

public class SelectionSort {

    public static void selectionSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n; i++) {
            // Find minimum in unsorted portion
            int minIdx = i;

            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }

            // Swap with first unsorted position
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }
}`,

        cpp: `// Selection Sort in C++
// Time: O(n²) | Space: O(1)

#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 0; i < n; i++) {
        int minIdx = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        swap(arr[i], arr[minIdx]);
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    selectionSort(arr);

    for (int num : arr) cout << num << " ";
    return 0;
}`,

        javascript: `// Selection Sort in JavaScript
// Time: O(n²) | Space: O(1)

function selectionSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;

        // Find minimum in remaining unsorted
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        // Swap
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    return arr;
}

const arr = [64, 25, 12, 22, 11];
console.log("Sorted:", selectionSort(arr));`,

        c: `// Selection Sort in C
// Time: O(n²) | Space: O(1)

#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        int minIdx = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        // Swap
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);

    selectionSort(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    return 0;
}`
    };

    return (
        <section className="mb-16">
            <SectionHeader
                number="5"
                title="Selection Sort"
                icon={SortDesc}
                subtitle="Find Minimum, Swap, Repeat"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Selection Sort works by repeatedly <strong>selecting the smallest element</strong> from the unsorted portion and moving it to the sorted portion. Think of it as finding the best card in your hand and placing it first.
                </p>

                <SubSectionHeader title="How Selection Sort Works" />

                <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-4">🎯 Visual Walkthrough: Sorting [64, 25, 12, 22, 11]</h4>

                    <div className="space-y-4 text-sm">
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Pass 1:</span>
                            <span className="text-slate-300 ml-2">Find min (<span className="text-yellow-400">11</span>) → Swap with index 0 → [<span className="text-green-400">11</span>, 25, 12, 22, 64]</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Pass 2:</span>
                            <span className="text-slate-300 ml-2">Find min (<span className="text-yellow-400">12</span>) → Swap with index 1 → [<span className="text-green-400">11, 12</span>, 25, 22, 64]</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Pass 3:</span>
                            <span className="text-slate-300 ml-2">Find min (<span className="text-yellow-400">22</span>) → Swap with index 2 → [<span className="text-green-400">11, 12, 22</span>, 25, 64]</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Pass 4:</span>
                            <span className="text-slate-300 ml-2">Find min (<span className="text-yellow-400">25</span>) → Already in place → [<span className="text-green-400">11, 12, 22, 25, 64</span>] ✅</span>
                        </div>
                    </div>
                </div>

                <Pseudocode
                    title="Selection Sort Algorithm"
                    code={`FUNCTION SelectionSort(array):
    n = array.length

    FOR i = 0 TO n-1:
        minIndex = i

        // Find minimum in unsorted portion
        FOR j = i+1 TO n-1:
            IF array[j] < array[minIndex]:
                minIndex = j

        // Swap minimum with first unsorted element
        SWAP(array[i], array[minIndex])

    RETURN array
END FUNCTION`}
                />

                <SubSectionHeader title="Code Implementation (5 Languages)" />
                <MultiLanguageCode codes={selectionSortCode} title="selection_sort" />

                <SubSectionHeader title="Complexity Analysis" />
                <ComplexityTable
                    best="O(n²)"
                    average="O(n²)"
                    worst="O(n²)"
                    space="O(1)"
                    stable={false}
                    inPlace={true}
                />

                <InfoBox type="warning" title="Not Stable!">
                    Selection Sort is <strong>not stable</strong>—it can change the relative order of equal elements.
                    If stability matters (e.g., sorting by multiple fields), use Insertion Sort or Merge Sort instead.
                </InfoBox>

                <SubSectionHeader title="Selection Sort vs Bubble Sort" />

                <div className="my-8 overflow-x-auto pb-2">
                    <table className="w-full min-w-[600px] text-left border-collapse rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-4 py-3 text-white font-bold text-sm border-b border-slate-700">Aspect</th>
                                <th className="px-4 py-3 text-cyan-400 font-bold text-sm border-b border-slate-700">Selection Sort</th>
                                <th className="px-4 py-3 text-purple-400 font-bold text-sm border-b border-slate-700">Bubble Sort</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900/50">
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Swaps</td>
                                <td className="px-4 py-3 text-green-400">O(n) - fewer swaps</td>
                                <td className="px-4 py-3 text-red-400">O(n²) - many swaps</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Best Case</td>
                                <td className="px-4 py-3 text-yellow-400">O(n²)</td>
                                <td className="px-4 py-3 text-green-400">O(n)</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Stable</td>
                                <td className="px-4 py-3 text-red-400">❌ No</td>
                                <td className="px-4 py-3 text-green-400">✅ Yes</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300 font-medium">Memory Writes</td>
                                <td className="px-4 py-3 text-green-400">Fewer</td>
                                <td className="px-4 py-3 text-red-400">More</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <KeyTakeaway>
                    Selection Sort performs <strong>fewer swaps</strong> than Bubble Sort (O(n) vs O(n²)), making it better when write operations are expensive (e.g., flash memory).
                    However, it's still O(n²) overall and not suitable for large datasets.
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section5_SelectionSort;
