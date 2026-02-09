import { ComplexityTable, InfoBox, KeyTakeaway, MultiLanguageCode, Pseudocode, SectionHeader, SortAsc, SubSectionHeader } from './SharedComponents';

const Section4_BubbleSort = () => {
    const bubbleSortCode = {
        python: `# Bubble Sort in Python
# Time: O(n²) | Space: O(1)

def bubble_sort(arr):
    """
    Sort array by repeatedly swapping adjacent elements.
    """
    n = len(arr)

    for i in range(n):
        # Track if any swap happened
        swapped = False

        # Last i elements are already sorted
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap them
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        # Optimization: if no swaps, array is sorted
        if not swapped:
            break

    return arr

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
print("Sorted:", bubble_sort(arr))
# Output: [11, 12, 22, 25, 34, 64, 90]`,

        java: `// Bubble Sort in Java
// Time: O(n²) | Space: O(1)

public class BubbleSort {

    public static void bubbleSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n; i++) {
            boolean swapped = false;

            // Last i elements are sorted
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // Optimization: early exit
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }
}`,

        cpp: `// Bubble Sort in C++
// Time: O(n²) | Space: O(1)

#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 0; i < n; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }

        // Early exit if sorted
        if (!swapped) break;
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(arr);

    for (int num : arr) cout << num << " ";
    return 0;
}`,

        javascript: `// Bubble Sort in JavaScript
// Time: O(n²) | Space: O(1)

function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap using destructuring
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // Early exit optimization
        if (!swapped) break;
    }

    return arr;
}

const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Sorted:", bubbleSort(arr));`,

        c: `// Bubble Sort in C
// Time: O(n²) | Space: O(1)

#include <stdio.h>
#include <stdbool.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        if (!swapped) break;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    bubbleSort(arr, n);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    return 0;
}`
    };

    return (
        <section className="mb-16">
            <SectionHeader
                number="4"
                title="Bubble Sort"
                icon={SortAsc}
                subtitle="Simple but Slow"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Bubble Sort is the simplest sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order—like bubbles rising to the surface.
                </p>

                <SubSectionHeader title="How Bubble Sort Works" />

                <p>
                    Imagine bubbles in a glass of soda—heavier elements "sink" to the bottom while lighter ones "bubble up" to the top with each pass through the array.
                </p>

                {/* Visual Example */}
                <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-4">🫧 Visual Walkthrough: Sorting [64, 34, 25, 12]</h4>

                    <div className="space-y-4 text-sm">
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Pass 1:</span>
                            <span className="text-slate-300 ml-2">[<span className="text-red-400">64, 34</span>, 25, 12] → [34, <span className="text-red-400">64, 25</span>, 12] → [34, 25, <span className="text-red-400">64, 12</span>] → [34, 25, 12, <span className="text-green-400">64</span>]</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Pass 2:</span>
                            <span className="text-slate-300 ml-2">[<span className="text-red-400">34, 25</span>, 12, 64] → [25, <span className="text-red-400">34, 12</span>, 64] → [25, 12, <span className="text-green-400">34</span>, <span className="text-green-400">64</span>]</span>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                            <span className="text-cyan-400 font-bold">Pass 3:</span>
                            <span className="text-slate-300 ml-2">[<span className="text-red-400">25, 12</span>, 34, 64] → [<span className="text-green-400">12</span>, <span className="text-green-400">25</span>, <span className="text-green-400">34</span>, <span className="text-green-400">64</span>] ✅</span>
                        </div>
                    </div>
                </div>

                <Pseudocode
                    title="Bubble Sort Algorithm"
                    code={`FUNCTION BubbleSort(array):
    n = array.length

    FOR i = 0 TO n-1:
        swapped = false

        FOR j = 0 TO n-i-2:
            IF array[j] > array[j+1]:
                SWAP(array[j], array[j+1])
                swapped = true

        IF NOT swapped:    // Optimization
            BREAK          // Already sorted

    RETURN array
END FUNCTION`}
                />

                <SubSectionHeader title="Code Implementation (5 Languages)" />
                <MultiLanguageCode codes={bubbleSortCode} title="bubble_sort" />

                <SubSectionHeader title="Complexity Analysis" />
                <ComplexityTable
                    best="O(n)"
                    average="O(n²)"
                    worst="O(n²)"
                    space="O(1)"
                    stable={true}
                    inPlace={true}
                />

                <InfoBox type="info" title="Why O(n) Best Case?">
                    With the <code className="text-cyan-300">swapped</code> optimization, if the array is already sorted, we detect it in one pass and exit early—making it O(n) in the best case.
                </InfoBox>

                <SubSectionHeader title="When to Use Bubble Sort" />

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                        <h4 className="text-green-400 font-bold mb-3">✅ Good For:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• Educational purposes</li>
                            <li>• Very small arrays (n {'<'} 20)</li>
                            <li>• Nearly sorted data</li>
                            <li>• Checking if array is sorted</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                        <h4 className="text-red-400 font-bold mb-3">❌ Avoid For:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• Large datasets</li>
                            <li>• Production code (usually)</li>
                            <li>• Performance-critical applications</li>
                            <li>• Any serious sorting needs</li>
                        </ul>
                    </div>
                </div>

                <KeyTakeaway>
                    Bubble Sort is mainly used for <strong>educational purposes</strong> to understand sorting concepts.
                    In practice, use more efficient algorithms like Quick Sort or Merge Sort.
                    However, knowing Bubble Sort is important for interviews where you might be asked to explain basic sorting.
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section4_BubbleSort;
