import { AlertTriangle, BookOpen, Database, Gamepad2, GitBranch, Search, Smartphone, XCircle } from 'lucide-react';
import { Binary, ComplexityTable, InfoBox, KeyTakeaway, MultiLanguageCode, Pseudocode, SectionHeader, SubSectionHeader } from './SharedComponents';

const Section3_BinarySearch = () => {
    // Iterative Binary Search in 5 languages
    const binarySearchIterative = {
        python: `# Binary Search (Iterative) in Python
# Time: O(log n) | Space: O(1)

def binary_search(arr, target):
    """
    Search for target in SORTED array using divide and conquer.
    Returns index if found, -1 otherwise.
    """
    left = 0
    right = len(arr) - 1

    while left <= right:
        # Calculate middle index (avoids overflow)
        mid = left + (right - left) // 2

        if arr[mid] == target:
            return mid           # Found! Return index
        elif arr[mid] < target:
            left = mid + 1       # Target is in right half
        else:
            right = mid - 1      # Target is in left half

    return -1  # Not found

# Example usage
arr = [11, 12, 22, 25, 34, 64, 90]  # Must be sorted!
target = 25

result = binary_search(arr, target)
print(f"Element found at index {result}")  # Output: 3`,

        java: `// Binary Search (Iterative) in Java
// Time: O(log n) | Space: O(1)

public class BinarySearch {

    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            // Calculate middle (avoids overflow)
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;           // Found!
            } else if (arr[mid] < target) {
                left = mid + 1;       // Search right half
            } else {
                right = mid - 1;      // Search left half
            }
        }

        return -1;  // Not found
    }

    public static void main(String[] args) {
        int[] arr = {11, 12, 22, 25, 34, 64, 90};
        int target = 25;

        int result = binarySearch(arr, target);
        System.out.println("Element found at index " + result);
    }
}`,

        cpp: `// Binary Search (Iterative) in C++
// Time: O(log n) | Space: O(1)

#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        // Calculate middle (avoids overflow)
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;           // Found!
        } else if (arr[mid] < target) {
            left = mid + 1;       // Search right half
        } else {
            right = mid - 1;      // Search left half
        }
    }

    return -1;  // Not found
}

int main() {
    vector<int> arr = {11, 12, 22, 25, 34, 64, 90};
    int target = 25;

    int result = binarySearch(arr, target);
    cout << "Element found at index " << result << endl;

    return 0;
}`,

        javascript: `// Binary Search (Iterative) in JavaScript
// Time: O(log n) | Space: O(1)

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // Calculate middle index
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) {
            return mid;           // Found!
        } else if (arr[mid] < target) {
            left = mid + 1;       // Search right half
        } else {
            right = mid - 1;      // Search left half
        }
    }

    return -1;  // Not found
}

// Example usage
const arr = [11, 12, 22, 25, 34, 64, 90];
const target = 25;

console.log(\`Element found at index \${binarySearch(arr, target)}\`);`,

        c: `// Binary Search (Iterative) in C
// Time: O(log n) | Space: O(1)

#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;

    while (left <= right) {
        // Calculate middle (avoids overflow)
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;           // Found!
        } else if (arr[mid] < target) {
            left = mid + 1;       // Search right half
        } else {
            right = mid - 1;      // Search left half
        }
    }

    return -1;  // Not found
}

int main() {
    int arr[] = {11, 12, 22, 25, 34, 64, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 25;

    int result = binarySearch(arr, n, target);
    printf("Element found at index %d\\n", result);

    return 0;
}`
    };

    // Recursive Binary Search
    const binarySearchRecursive = {
        python: `# Binary Search (Recursive) in Python
# Time: O(log n) | Space: O(log n) - due to call stack

def binary_search_recursive(arr, target, left, right):
    """
    Recursive binary search implementation.
    """
    # Base case: element not found
    if left > right:
        return -1

    mid = left + (right - left) // 2

    if arr[mid] == target:
        return mid                  # Found!
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Helper function for cleaner API
def binary_search(arr, target):
    return binary_search_recursive(arr, target, 0, len(arr) - 1)

# Example usage
arr = [11, 12, 22, 25, 34, 64, 90]
print(f"Found at index: {binary_search(arr, 25)}")`,

        java: `// Binary Search (Recursive) in Java
// Time: O(log n) | Space: O(log n) - call stack

public class BinarySearchRecursive {

    public static int binarySearch(int[] arr, int target, int left, int right) {
        // Base case
        if (left > right) {
            return -1;
        }

        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            return binarySearch(arr, target, mid + 1, right);
        } else {
            return binarySearch(arr, target, left, mid - 1);
        }
    }

    public static void main(String[] args) {
        int[] arr = {11, 12, 22, 25, 34, 64, 90};
        int result = binarySearch(arr, 25, 0, arr.length - 1);
        System.out.println("Found at index: " + result);
    }
}`,

        cpp: `// Binary Search (Recursive) in C++
// Time: O(log n) | Space: O(log n) - call stack

#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target, int left, int right) {
    // Base case
    if (left > right) {
        return -1;
    }

    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, right);
    } else {
        return binarySearch(arr, target, left, mid - 1);
    }
}

int main() {
    vector<int> arr = {11, 12, 22, 25, 34, 64, 90};
    cout << "Found at: " << binarySearch(arr, 25, 0, arr.size() - 1);
    return 0;
}`,

        javascript: `// Binary Search (Recursive) in JavaScript
// Time: O(log n) | Space: O(log n) - call stack

function binarySearchRecursive(arr, target, left, right) {
    // Base case
    if (left > right) {
        return -1;
    }

    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Helper function
const binarySearch = (arr, target) =>
    binarySearchRecursive(arr, target, 0, arr.length - 1);

console.log(\`Found at: \${binarySearch([11, 12, 22, 25, 34, 64, 90], 25)}\`);`,

        c: `// Binary Search (Recursive) in C
// Time: O(log n) | Space: O(log n) - call stack

#include <stdio.h>

int binarySearch(int arr[], int target, int left, int right) {
    // Base case
    if (left > right) {
        return -1;
    }

    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, right);
    } else {
        return binarySearch(arr, target, left, mid - 1);
    }
}

int main() {
    int arr[] = {11, 12, 22, 25, 34, 64, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Found at: %d\\n", binarySearch(arr, 25, 0, n - 1));
    return 0;
}`
    };

    return (
        <section className="mb-16">
            <SectionHeader
                number="3"
                title="Binary Search ⭐"
                icon={Binary}
                subtitle="The Most Important Search Algorithm"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Binary Search is the <strong>most important searching algorithm</strong> you'll ever learn.
                    It reduces search time from O(n) to O(log n) by repeatedly dividing the search space in half—a concept called <strong>divide and conquer</strong>.
                </p>

                <InfoBox type="warning" title="Critical Prerequisite" icon={AlertTriangle}>
                    Binary Search <strong>only works on sorted arrays</strong>. If your data is unsorted, you must sort it first (O(n log n)) or use Linear Search.
                    However, if you're searching multiple times, the cost of sorting once is worth it.
                </InfoBox>

                {/* How It Works */}
                <SubSectionHeader title="How Binary Search Works" />

                <p>
                    Imagine you're looking for a word in a dictionary. You don't start from page 1—you open to the middle,
                    see if your word comes before or after, and eliminate half the pages with each step. That's binary search!
                </p>

                {/* Step-by-step visualization */}
                <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-lg font-bold text-white mb-4">
                        🔍 Visual Walkthrough: Finding 25 in [11, 12, 22, 25, 34, 64, 90]
                    </h4>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="p-4 rounded-lg bg-slate-800/50">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-1 bg-cyan-500 text-white text-xs font-bold rounded">Step 1</span>
                                <span className="text-slate-400 text-sm">left=0, right=6, mid=3</span>
                            </div>
                            <div className="flex gap-2 mb-2">
                                {[11, 12, 22, 25, 34, 64, 90].map((num, idx) => (
                                    <div key={idx} className={`w-10 h-10 flex items-center justify-center rounded font-mono text-sm
                                        ${idx === 3 ? 'bg-cyan-500 text-white ring-2 ring-cyan-400' :
                                          idx >= 0 && idx <= 6 ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                        {num}
                                    </div>
                                ))}
                            </div>
                            <p className="text-slate-300 text-sm">arr[3] = 25 = target → <span className="text-green-400 font-bold">FOUND! ✅</span></p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <h5 className="text-amber-400 font-bold mb-2">Another Example: Finding 12</h5>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">Step 1</span>
                                <span className="text-slate-300">mid=3 → arr[3]=25 {'>'} 12 → Search LEFT half [0..2]</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">Step 2</span>
                                <span className="text-slate-300">mid=1 → arr[1]=12 = target → <span className="text-green-400 font-bold">FOUND!</span></span>
                            </div>
                            <p className="text-slate-400 mt-2">Only 2 comparisons instead of 7 with linear search!</p>
                        </div>
                    </div>
                </div>

                {/* Pseudocode */}
                <Pseudocode
                    title="Binary Search Algorithm"
                    code={`FUNCTION BinarySearch(array, target):
    left = 0
    right = array.length - 1

    WHILE left <= right:
        mid = left + (right - left) / 2    // Avoid overflow

        IF array[mid] == target:
            RETURN mid                      // Found!
        ELSE IF array[mid] < target:
            left = mid + 1                  // Search right half
        ELSE:
            right = mid - 1                 // Search left half
    END WHILE

    RETURN -1                              // Not found
END FUNCTION`}
                />

                {/* Iterative Implementation */}
                <SubSectionHeader title="Iterative Implementation (Preferred)" />

                <p>
                    The iterative approach is generally preferred because it uses <strong>O(1) space</strong> and avoids the overhead of recursive function calls.
                </p>

                <MultiLanguageCode
                    codes={binarySearchIterative}
                    title="binary_search_iterative"
                />

                {/* Recursive Implementation */}
                <SubSectionHeader title="Recursive Implementation" />

                <p>
                    The recursive approach is more elegant and mirrors the divide-and-conquer concept, but uses <strong>O(log n) space</strong> for the call stack.
                </p>

                <MultiLanguageCode
                    codes={binarySearchRecursive}
                    title="binary_search_recursive"
                />

                {/* Complexity Analysis */}
                <SubSectionHeader title="Complexity Analysis" />

                <ComplexityTable
                    best="O(1)"
                    average="O(log n)"
                    worst="O(log n)"
                    space="O(1) iterative / O(log n) recursive"
                />

                {/* Why Log n */}
                <div className="my-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                    <h4 className="text-purple-400 font-bold mb-4">🧮 Why O(log n)? The Math Explained</h4>
                    <p className="text-slate-300 text-sm mb-4">
                        Each iteration divides the search space in half:
                    </p>
                    <div className="font-mono text-center text-slate-300 space-y-1 text-sm">
                        <p>n → n/2 → n/4 → n/8 → ... → 1</p>
                        <p className="text-purple-400">After k steps: n/2^k = 1 → k = log₂(n)</p>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-slate-800/50">
                            <div className="text-2xl font-bold text-cyan-400">100</div>
                            <div className="text-slate-400 text-xs">elements</div>
                            <div className="text-white font-bold">~7 steps</div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-800/50">
                            <div className="text-2xl font-bold text-cyan-400">1,000</div>
                            <div className="text-slate-400 text-xs">elements</div>
                            <div className="text-white font-bold">~10 steps</div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-800/50">
                            <div className="text-2xl font-bold text-cyan-400">1M</div>
                            <div className="text-slate-400 text-xs">elements</div>
                            <div className="text-white font-bold">~20 steps</div>
                        </div>
                    </div>
                </div>

                {/* Common Mistakes */}
                <SubSectionHeader title="Common Mistakes & Edge Cases" />

                <div className="space-y-4 my-8">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-start gap-3">
                            <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                            <div>
                                <h5 className="text-red-400 font-bold">❌ Integer Overflow Bug</h5>
                                <p className="text-slate-300 text-sm mt-1">
                                    <code className="text-red-300 bg-slate-800 px-1 rounded">mid = (left + right) / 2</code> can overflow!
                                </p>
                                <p className="text-slate-400 text-sm mt-1">
                                    ✅ Fix: <code className="text-green-300 bg-slate-800 px-1 rounded">mid = left + (right - left) / 2</code>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-start gap-3">
                            <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                            <div>
                                <h5 className="text-red-400 font-bold">❌ Infinite Loop</h5>
                                <p className="text-slate-300 text-sm mt-1">
                                    Wrong: <code className="text-red-300 bg-slate-800 px-1 rounded">while (left {'<'} right)</code> — misses edge case
                                </p>
                                <p className="text-slate-400 text-sm mt-1">
                                    ✅ Fix: <code className="text-green-300 bg-slate-800 px-1 rounded">while (left {'<'}= right)</code>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-start gap-3">
                            <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                            <div>
                                <h5 className="text-red-400 font-bold">❌ Off-by-One Error</h5>
                                <p className="text-slate-300 text-sm mt-1">
                                    Wrong: <code className="text-red-300 bg-slate-800 px-1 rounded">left = mid</code> or <code className="text-red-300 bg-slate-800 px-1 rounded">right = mid</code>
                                </p>
                                <p className="text-slate-400 text-sm mt-1">
                                    ✅ Fix: <code className="text-green-300 bg-slate-800 px-1 rounded">left = mid + 1</code> and <code className="text-green-300 bg-slate-800 px-1 rounded">right = mid - 1</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edge Cases */}
                <InfoBox type="tip" title="Edge Cases to Handle">
                    <ul className="space-y-1 mt-2">
                        <li>• <strong>Empty array</strong> — return -1</li>
                        <li>• <strong>Single element</strong> — check if it matches</li>
                        <li>• <strong>Target smaller than all elements</strong> — return -1</li>
                        <li>• <strong>Target larger than all elements</strong> — return -1</li>
                        <li>• <strong>Duplicate elements</strong> — returns any matching index (variations exist for first/last)</li>
                    </ul>
                </InfoBox>

                {/* Binary Search Variations */}
                <SubSectionHeader title="Binary Search Variations" />

                <div className="grid md:grid-cols-2 gap-4 my-8">
                    {[
                        { name: "Lower Bound", desc: "Find first element ≥ target" },
                        { name: "Upper Bound", desc: "Find first element > target" },
                        { name: "First Occurrence", desc: "Find leftmost matching index" },
                        { name: "Last Occurrence", desc: "Find rightmost matching index" },
                        { name: "Search in Rotated Array", desc: "Modified binary search for rotated sorted arrays" },
                        { name: "Peak Element", desc: "Find local maximum in array" },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <h5 className="text-cyan-400 font-bold">{item.name}</h5>
                            <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Real-World Applications */}
                <SubSectionHeader title="Real-World Applications" />

                <div className="grid md:grid-cols-3 gap-4 my-8">
                    {[
                        { icon: BookOpen, title: 'Dictionary Lookup', desc: 'Finding words in sorted dictionaries', color: 'text-blue-400 bg-blue-500/10' },
                        { icon: Search, title: 'Search Engines', desc: 'Searching indexed, sorted data', color: 'text-cyan-400 bg-cyan-500/10' },
                        { icon: Database, title: 'Database Indexing', desc: 'B-tree searches are based on binary search', color: 'text-purple-400 bg-purple-500/10' },
                        { icon: GitBranch, title: 'Version Control', desc: 'Git bisect uses binary search to find bugs', color: 'text-orange-400 bg-orange-500/10' },
                        { icon: Gamepad2, title: 'Game Development', desc: 'Collision detection & pathfinding', color: 'text-pink-400 bg-pink-500/10' },
                        { icon: Smartphone, title: 'Autocomplete', desc: 'Prefix matching in sorted lists', color: 'text-green-400 bg-green-500/10' },
                    ].map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={idx} className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-center hover:border-slate-700 transition-colors">
                                <div className={`inline-flex p-3 rounded-xl ${item.color}`}>
                                    <IconComponent size={28} />
                                </div>
                                <h5 className="text-white font-bold mt-3">{item.title}</h5>
                                <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <KeyTakeaway>
                    <p>
                        Binary Search is <strong>the gold standard for searching sorted data</strong>.
                        Its O(log n) complexity makes it incredibly efficient—searching through a billion elements takes only about 30 comparisons!
                        Master both iterative and recursive implementations, as interviewers love testing edge cases and variations.
                    </p>
                </KeyTakeaway>

            </div>
        </section>
    );
};

export default Section3_BinarySearch;
