import { ComplexityTable, InfoBox, KeyTakeaway, MultiLanguageCode, Pseudocode, Search, SectionHeader, SubSectionHeader } from './SharedComponents';

const Section2_LinearSearch = () => {
    // Code examples in 5 languages
    const linearSearchCode = {
        python: `# Linear Search in Python
# Time: O(n) | Space: O(1)

def linear_search(arr, target):
    """
    Search for target in array sequentially.
    Returns index if found, -1 otherwise.
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Found! Return index
    return -1  # Not found

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
target = 22

result = linear_search(arr, target)
if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found")

# Output: Element found at index 4`,

        java: `// Linear Search in Java
// Time: O(n) | Space: O(1)

public class LinearSearch {

    public static int linearSearch(int[] arr, int target) {
        // Iterate through each element
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Found! Return index
            }
        }
        return -1;  // Not found
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        int target = 22;

        int result = linearSearch(arr, target);

        if (result != -1) {
            System.out.println("Element found at index " + result);
        } else {
            System.out.println("Element not found");
        }
    }
}
// Output: Element found at index 4`,

        cpp: `// Linear Search in C++
// Time: O(n) | Space: O(1)

#include <iostream>
#include <vector>
using namespace std;

int linearSearch(vector<int>& arr, int target) {
    // Iterate through each element
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;  // Found! Return index
        }
    }
    return -1;  // Not found
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    int target = 22;

    int result = linearSearch(arr, target);

    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }

    return 0;
}
// Output: Element found at index 4`,

        javascript: `// Linear Search in JavaScript
// Time: O(n) | Space: O(1)

function linearSearch(arr, target) {
    // Iterate through each element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;  // Found! Return index
        }
    }
    return -1;  // Not found
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
const target = 22;

const result = linearSearch(arr, target);

if (result !== -1) {
    console.log(\`Element found at index \${result}\`);
} else {
    console.log("Element not found");
}
// Output: Element found at index 4`,

        c: `// Linear Search in C
// Time: O(n) | Space: O(1)

#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    // Iterate through each element
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;  // Found! Return index
        }
    }
    return -1;  // Not found
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 22;

    int result = linearSearch(arr, n, target);

    if (result != -1) {
        printf("Element found at index %d\\n", result);
    } else {
        printf("Element not found\\n");
    }

    return 0;
}
// Output: Element found at index 4`
    };

    return (
        <section className="mb-16">
            <SectionHeader
                number="2"
                title="Linear Search"
                icon={Search}
                subtitle="The Simplest Search Algorithm"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Linear Search is the simplest searching algorithm. It sequentially checks each element of the list until a match is found or the entire list has been searched.
                </p>

                {/* How It Works */}
                <SubSectionHeader title="How Linear Search Works" />

                <p>
                    Think of Linear Search like looking for a specific card in a shuffled deck. You start from the first card and check each one until you find the card you're looking for (or reach the end).
                </p>

                {/* Step-by-step visualization */}
                <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-4">
                        🔍 Step-by-Step Example: Finding 22 in [64, 34, 25, 12, 22, 11, 90]
                    </h4>
                    <div className="space-y-4">
                        {[
                            { step: 1, compare: 64, result: "64 ≠ 22, move to next" },
                            { step: 2, compare: 34, result: "34 ≠ 22, move to next" },
                            { step: 3, compare: 25, result: "25 ≠ 22, move to next" },
                            { step: 4, compare: 12, result: "12 ≠ 22, move to next" },
                            { step: 5, compare: 22, result: "22 = 22, FOUND at index 4! ✅" },
                        ].map((item, idx) => (
                            <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg ${idx === 4 ? 'bg-green-500/10 border border-green-500/30' : 'bg-slate-800/30'}`}>
                                <span className={`px-3 py-1 rounded font-mono text-sm ${idx === 4 ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                                    Step {item.step}
                                </span>
                                <span className="text-slate-300">Compare {item.compare} → {item.result}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pseudocode */}
                <Pseudocode
                    title="Linear Search Algorithm"
                    code={`FUNCTION LinearSearch(array, target):
    FOR i = 0 TO array.length - 1:
        IF array[i] == target:
            RETURN i        // Element found
    END FOR
    RETURN -1              // Element not found
END FUNCTION`}
                />

                {/* Code Implementations */}
                <SubSectionHeader title="Code Implementation (5 Languages)" />

                <MultiLanguageCode
                    codes={linearSearchCode}
                    title="linear_search"
                />

                {/* Complexity Analysis */}
                <SubSectionHeader title="Complexity Analysis" />

                <ComplexityTable
                    best="O(1)"
                    average="O(n)"
                    worst="O(n)"
                    space="O(1)"
                    stable={true}
                    inPlace={true}
                />

                <InfoBox type="info" title="Complexity Explanation">
                    <ul className="space-y-2 mt-2">
                        <li><strong>Best Case O(1):</strong> Target is at the first position</li>
                        <li><strong>Average Case O(n):</strong> Target is somewhere in the middle, need to check ~n/2 elements</li>
                        <li><strong>Worst Case O(n):</strong> Target is at the last position or not present</li>
                        <li><strong>Space O(1):</strong> Only uses a few variables, no extra space proportional to input</li>
                    </ul>
                </InfoBox>

                {/* When to Use */}
                <SubSectionHeader title="When to Use Linear Search" />

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                        <h4 className="text-green-400 font-bold mb-3">✅ Use Linear Search When:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• Array is <strong>unsorted</strong></li>
                            <li>• Array is <strong>small</strong> (n &lt; 100)</li>
                            <li>• Searching <strong>only once</strong></li>
                            <li>• Data is stored in <strong>linked list</strong></li>
                            <li>• <strong>Simplicity</strong> is more important than speed</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                        <h4 className="text-red-400 font-bold mb-3">❌ Avoid Linear Search When:</h4>
                        <ul className="text-slate-300 text-sm space-y-2">
                            <li>• Array is <strong>sorted</strong> (use Binary Search)</li>
                            <li>• Array is <strong>large</strong> (n &gt; 1000)</li>
                            <li>• Need to search <strong>multiple times</strong></li>
                            <li>• <strong>Performance</strong> is critical</li>
                            <li>• Have access to <strong>hash tables</strong></li>
                        </ul>
                    </div>
                </div>

                {/* Advantages & Disadvantages */}
                <SubSectionHeader title="Advantages & Disadvantages" />

                <div className="my-8 overflow-x-auto">
                    <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-4 py-3 text-green-400 font-bold text-sm border-b border-slate-700">Advantages</th>
                                <th className="px-4 py-3 text-red-400 font-bold text-sm border-b border-slate-700">Disadvantages</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900/50">
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300">Simple to implement</td>
                                <td className="px-4 py-3 text-slate-300">Slow for large datasets</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300">Works on unsorted arrays</td>
                                <td className="px-4 py-3 text-slate-300">O(n) time complexity</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300">No preprocessing required</td>
                                <td className="px-4 py-3 text-slate-300">Not suitable for frequent searches</td>
                            </tr>
                            <tr className="border-b border-slate-800">
                                <td className="px-4 py-3 text-slate-300">Works on linked lists</td>
                                <td className="px-4 py-3 text-slate-300">Less efficient than binary search on sorted data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <KeyTakeaway>
                    <p>
                        Linear Search is your <strong>go-to algorithm for small or unsorted data</strong>.
                        It's the baseline that every other search algorithm improves upon.
                        While it's not efficient for large datasets, its simplicity makes it valuable for quick prototypes and situations where simplicity trumps performance.
                    </p>
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section2_LinearSearch;
