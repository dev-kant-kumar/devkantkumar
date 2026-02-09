import { Shield, Zap } from 'lucide-react';
import { ComplexityTable, GitBranch, InfoBox, KeyTakeaway, MultiLanguageCode, Pseudocode, SectionHeader, SubSectionHeader } from './SharedComponents';

const Section7_MergeSort = () => {
    const mergeSortCode = {
        python: `# Merge Sort in Python
# Time: O(n log n) | Space: O(n)

def merge_sort(arr):
    """
    Divide and conquer sorting algorithm.
    Splits array, sorts halves, merges back.
    """
    if len(arr) <= 1:
        return arr

    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    # Conquer (merge)
    return merge(left, right)

def merge(left, right):
    """
    Merge two sorted arrays into one sorted array.
    """
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result

# Example
arr = [38, 27, 43, 3, 9, 82, 10]
print("Sorted:", merge_sort(arr))
# Output: [3, 9, 10, 27, 38, 43, 82]`,

        java: `// Merge Sort in Java
// Time: O(n log n) | Space: O(n)

public class MergeSort {

    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            // Merge sorted halves
            merge(arr, left, mid, right);
        }
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        // Create temp arrays
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] L = new int[n1];
        int[] R = new int[n2];

        // Copy data to temp arrays
        for (int i = 0; i < n1; i++)
            L[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            R[j] = arr[mid + 1 + j];

        // Merge temp arrays back
        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }

        // Copy remaining elements
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(arr, 0, arr.length - 1);
        System.out.println(java.util.Arrays.toString(arr));
    }
}`,

        cpp: `// Merge Sort in C++
// Time: O(n log n) | Space: O(n)

#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> L(arr.begin() + left, arr.begin() + mid + 1);
    vector<int> R(arr.begin() + mid + 1, arr.begin() + right + 1);

    int i = 0, j = 0, k = left;

    while (i < L.size() && j < R.size()) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < L.size()) arr[k++] = L[i++];
    while (j < R.size()) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(arr, 0, arr.size() - 1);

    for (int num : arr) cout << num << " ";
    return 0;
}`,

        javascript: `// Merge Sort in JavaScript
// Time: O(n log n) | Space: O(n)

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    // Divide
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    // Conquer
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    // Append remaining
    return [...result, ...left.slice(i), ...right.slice(j)];
}

const arr = [38, 27, 43, 3, 9, 82, 10];
console.log("Sorted:", mergeSort(arr));`,

        c: `// Merge Sort in C
// Time: O(n log n) | Space: O(n)

#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int *L = (int*)malloc(n1 * sizeof(int));
    int *R = (int*)malloc(n2 * sizeof(int));

    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);

    mergeSort(arr, 0, n - 1);

    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    return 0;
}`
    };

    return (
        <section className="mb-16">
            <SectionHeader
                number="7"
                title="Merge Sort ⭐⭐"
                icon={GitBranch}
                subtitle="Divide and Conquer Master"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Merge Sort is a <strong>divide and conquer</strong> algorithm that divides the array into halves, recursively sorts them, and merges the sorted halves. It guarantees O(n log n) performance in <strong>all cases</strong>.
                </p>

                <div className="grid md:grid-cols-2 gap-4 my-8">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                        <Shield className="text-green-400" size={24} />
                        <div>
                            <div className="text-green-400 font-bold">Guaranteed O(n log n)</div>
                            <div className="text-slate-400 text-sm">Always consistent performance</div>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3">
                        <Zap className="text-cyan-400" size={24} />
                        <div>
                            <div className="text-cyan-400 font-bold">Stable Sort</div>
                            <div className="text-slate-400 text-sm">Preserves order of equal elements</div>
                        </div>
                    </div>
                </div>

                <SubSectionHeader title="How Merge Sort Works" />

                <p>
                    The algorithm has two main steps: <strong>Divide</strong> (split array in half until single elements) and <strong>Conquer</strong> (merge sorted halves back together).
                </p>

                {/* Visual Tree */}
                <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-6">🌳 Divide & Conquer Visualization</h4>

                    <div className="space-y-6">
                        {/* Split Phase */}
                        <div>
                            <div className="text-cyan-400 font-bold mb-3">📐 DIVIDE Phase:</div>
                            <div className="flex flex-col items-center space-y-2 text-sm">
                                <div className="px-4 py-2 bg-slate-800 rounded">[38, 27, 43, 3, 9, 82, 10]</div>
                                <div className="text-slate-500">↓ split ↓</div>
                                <div className="flex gap-4">
                                    <div className="px-3 py-1 bg-slate-700 rounded">[38, 27, 43]</div>
                                    <div className="px-3 py-1 bg-slate-700 rounded">[3, 9, 82, 10]</div>
                                </div>
                                <div className="text-slate-500">↓ split ↓</div>
                                <div className="flex gap-2 flex-wrap justify-center">
                                    <div className="px-2 py-1 bg-slate-600 rounded text-xs">[38]</div>
                                    <div className="px-2 py-1 bg-slate-600 rounded text-xs">[27, 43]</div>
                                    <div className="px-2 py-1 bg-slate-600 rounded text-xs">[3, 9]</div>
                                    <div className="px-2 py-1 bg-slate-600 rounded text-xs">[82, 10]</div>
                                </div>
                            </div>
                        </div>

                        {/* Merge Phase */}
                        <div>
                            <div className="text-green-400 font-bold mb-3">🔗 CONQUER Phase (Merge):</div>
                            <div className="flex flex-col items-center space-y-2 text-sm">
                                <div className="flex gap-2 flex-wrap justify-center">
                                    <div className="px-2 py-1 bg-green-800/50 rounded text-xs border border-green-500/30">[27, 43]</div>
                                    <div className="px-2 py-1 bg-green-800/50 rounded text-xs border border-green-500/30">[3, 9]</div>
                                    <div className="px-2 py-1 bg-green-800/50 rounded text-xs border border-green-500/30">[10, 82]</div>
                                </div>
                                <div className="text-slate-500">↑ merge ↑</div>
                                <div className="flex gap-4">
                                    <div className="px-3 py-1 bg-green-700/50 rounded border border-green-500/30">[27, 38, 43]</div>
                                    <div className="px-3 py-1 bg-green-700/50 rounded border border-green-500/30">[3, 9, 10, 82]</div>
                                </div>
                                <div className="text-slate-500">↑ merge ↑</div>
                                <div className="px-4 py-2 bg-green-500/20 rounded border border-green-500/30 text-green-400 font-bold">[3, 9, 10, 27, 38, 43, 82] ✅</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Pseudocode
                    title="Merge Sort Algorithm"
                    code={`FUNCTION MergeSort(array):
    IF array.length <= 1:
        RETURN array

    // Divide
    mid = array.length / 2
    left = MergeSort(array[0...mid])
    right = MergeSort(array[mid...end])

    // Conquer
    RETURN Merge(left, right)

FUNCTION Merge(left, right):
    result = []
    i = j = 0

    WHILE i < left.length AND j < right.length:
        IF left[i] <= right[j]:
            result.append(left[i++])
        ELSE:
            result.append(right[j++])

    // Append remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    RETURN result`}
                />

                <SubSectionHeader title="Code Implementation (5 Languages)" />
                <MultiLanguageCode codes={mergeSortCode} title="merge_sort" />

                <SubSectionHeader title="Complexity Analysis" />
                <ComplexityTable
                    best="O(n log n)"
                    average="O(n log n)"
                    worst="O(n log n)"
                    space="O(n)"
                    stable={true}
                    inPlace={false}
                />

                <div className="my-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                    <h4 className="text-purple-400 font-bold mb-4">🧮 Why O(n log n)?</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                        <p><strong>log n splits:</strong> Array gets halved log₂(n) times until single elements</p>
                        <p><strong>n merges per level:</strong> Each level processes all n elements during merge</p>
                        <p><strong>Total:</strong> n × log n = <span className="text-purple-400 font-bold">O(n log n)</span></p>
                    </div>
                </div>

                <SubSectionHeader title="When to Use Merge Sort" />

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                        <h4 className="text-green-400 font-bold mb-3">✅ Perfect For:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• <strong>Linked lists</strong> (no random access needed)</li>
                            <li>• <strong>External sorting</strong> (files don't fit in memory)</li>
                            <li>• When <strong>stability</strong> is required</li>
                            <li>• When <strong>guaranteed O(n log n)</strong> is needed</li>
                            <li>• <strong>Parallel processing</strong> (easy to parallelize)</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                        <h4 className="text-red-400 font-bold mb-3">⚠️ Considerations:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• Requires <strong>O(n) extra space</strong></li>
                            <li>• Slower than QuickSort in practice for arrays</li>
                            <li>• Higher constant factors than simpler sorts</li>
                            <li>• Cache performance not as good as in-place sorts</li>
                        </ul>
                    </div>
                </div>

                <InfoBox type="pro" title="Industry Usage">
                    Merge Sort forms the basis of <strong>TimSort</strong>, used by Python's <code>sort()</code> and Java's <code>Arrays.sort()</code> for objects.
                    TimSort combines Merge Sort's guaranteed performance with Insertion Sort's efficiency for small arrays.
                </InfoBox>

                <KeyTakeaway>
                    <p>
                        Merge Sort is the <strong>gold standard for stable, guaranteed O(n log n) sorting</strong>.
                        Choose it when you need predictable performance, stability, or are sorting linked lists.
                        The O(n) space tradeoff is worth it in many real-world scenarios.
                    </p>
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section7_MergeSort;
