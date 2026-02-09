import { FAQItem, HelpCircle, SectionHeader } from './SharedComponents';

const FAQs = () => {
    const faqs = [
        {
            question: "What's the fastest sorting algorithm?",
            answer: "It depends! Quick Sort is fastest for general-purpose sorting of arrays due to excellent cache performance. However, for integers with limited range, Counting Sort (O(n+k)) or Radix Sort (O(nk)) can be faster. For linked lists, Merge Sort is best. Always consider your specific use case."
        },
        {
            question: "Why is Quick Sort preferred over Merge Sort for arrays?",
            answer: "Quick Sort has better cache locality since it operates in-place and accesses memory sequentially. It also uses less memory (O(log n) vs O(n)). Although Merge Sort has guaranteed O(n log n), Quick Sort's practical performance is typically 2-3x faster for arrays."
        },
        {
            question: "When should I use Binary Search?",
            answer: "Use Binary Search when your data is sorted and you need to search multiple times. If the data is unsorted, you'd need to sort it first (O(n log n)), which is only worth it if you'll search many times. For a single search on unsorted data, Linear Search is fine."
        },
        {
            question: "What does 'stable sort' mean and why does it matter?",
            answer: "A stable sort maintains the relative order of equal elements. This matters when sorting by multiple keys—e.g., sort students by name, then by grade. A stable sort preserves the name order within each grade. Merge Sort and Insertion Sort are stable; Quick Sort and Heap Sort are not."
        },
        {
            question: "What's the difference between in-place and out-of-place sorting?",
            answer: "In-place algorithms (Quick Sort, Heap Sort) modify the original array with O(1) extra space. Out-of-place algorithms (Merge Sort) require O(n) additional space for temporary arrays. In-place is better for memory-constrained environments."
        },
        {
            question: "How do I handle duplicate elements in Binary Search?",
            answer: "Standard Binary Search returns any matching index. To find the first occurrence, continue searching left after finding a match. To find the last occurrence, search right. These are called lower_bound and upper_bound variations."
        },
        {
            question: "Why is Bubble Sort taught if it's so inefficient?",
            answer: "Bubble Sort is educational—it clearly demonstrates comparison and swapping concepts. Understanding why it's inefficient (many unnecessary comparisons) helps appreciate why Quick Sort and Merge Sort are better. It's also easy to implement and debug."
        },
        {
            question: "What is the best algorithm for nearly sorted data?",
            answer: "Insertion Sort is excellent for nearly sorted data with O(n) best-case complexity. TimSort (used by Python and Java) is also optimized for real-world data that often has pre-sorted runs."
        },
        {
            question: "Can I use Binary Search on a linked list?",
            answer: "Technically yes, but it's inefficient. Binary Search requires O(1) random access to find the middle element. In a linked list, finding the middle takes O(n), making the overall complexity O(n log n)—worse than Linear Search's O(n). Use Linear Search for linked lists."
        },
        {
            question: "What sorting algorithm do programming languages use internally?",
            answer: "Most languages use hybrid algorithms: Python and Java use TimSort (Merge Sort + Insertion Sort). C++ STL uses IntroSort (Quick Sort + Heap Sort + Insertion Sort). These combine multiple algorithms' strengths."
        },
        {
            question: "How do I sort objects by multiple fields?",
            answer: "Use a stable sort and sort by secondary key first, then primary key. Alternatively, use a custom comparator that compares the primary key first, then the secondary key if primary keys are equal."
        },
        {
            question: "What's the space complexity of recursive algorithms?",
            answer: "Recursive algorithms use stack space proportional to recursion depth. Quick Sort uses O(log n) stack space (average). Merge Sort uses O(log n) stack space plus O(n) for temporary arrays. Tail-recursive algorithms can sometimes be optimized to O(1) space."
        }
    ];

    return (
        <section className="mb-16">
            <SectionHeader
                number="10"
                title="Frequently Asked Questions"
                icon={HelpCircle}
                subtitle="Interview & Common Doubts"
            />

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-300 mb-8">
                    Answers to the most common questions about searching and sorting algorithms—from interview prep to real-world implementation decisions.
                </p>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQs;
