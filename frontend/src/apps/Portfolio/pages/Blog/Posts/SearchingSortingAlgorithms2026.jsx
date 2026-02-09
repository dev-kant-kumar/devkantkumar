import Conclusion from "./SearchingSortingAlgorithms2026/Conclusion";
import FAQs from "./SearchingSortingAlgorithms2026/FAQs";
import Introduction from "./SearchingSortingAlgorithms2026/Introduction";
import Section1Complexity from "./SearchingSortingAlgorithms2026/Section1_Complexity";
import Section2LinearSearch from "./SearchingSortingAlgorithms2026/Section2_LinearSearch";
import Section3BinarySearch from "./SearchingSortingAlgorithms2026/Section3_BinarySearch";
import Section4BubbleSort from "./SearchingSortingAlgorithms2026/Section4_BubbleSort";
import Section5SelectionSort from "./SearchingSortingAlgorithms2026/Section5_SelectionSort";
import Section6InsertionSort from "./SearchingSortingAlgorithms2026/Section6_InsertionSort";
import Section7MergeSort from "./SearchingSortingAlgorithms2026/Section7_MergeSort";
import Section8QuickSort from "./SearchingSortingAlgorithms2026/Section8_QuickSort";
import Section9Comparisons from "./SearchingSortingAlgorithms2026/Section9_Comparisons";

// --- Main Blog Post Component ---

export default function SearchingSortingAlgorithms2026() {
    return (
        <article className="max-w-4xl mx-auto px-4 md:px-0 py-8">
            <Introduction />
            <Section1Complexity />
            <Section2LinearSearch />
            <Section3BinarySearch />
            <Section4BubbleSort />
            <Section5SelectionSort />
            <Section6InsertionSort />
            <Section7MergeSort />
            <Section8QuickSort />
            <Section9Comparisons />
            <FAQs />
            <Conclusion />
        </article>
    );
}

// Blog post metadata for the blog system - SEO OPTIMIZED
SearchingSortingAlgorithms2026.info = {
    id: "searching-sorting-algorithms-2026",
    slug: "searching-sorting-algorithms-guide",
    title: "Searching & Sorting Algorithms: Complete Guide with Code in 5 Languages",
    excerpt: "Master Linear Search, Binary Search, Bubble Sort, Merge Sort, Quick Sort & more. Code in Python, Java, C++, JavaScript, C.",
    category: "Data Structures & Algorithms",
    author: "Dev Kant Kumar",
    readTime: "45 min read",
    publishDate: "2026-02-09",
    image: "/images/blog/SearchingSortingAlgorithms2026.png",
    featured: true,
    tags: ["DSA", "Algorithms", "Sorting", "Searching", "Interview", "Python", "Java", "C++", "JavaScript", "Binary Search", "Quick Sort", "Merge Sort"],
    description: "Comprehensive guide to searching and sorting algorithms with implementations in Python, Java, C++, JavaScript, and C. Perfect for coding interviews, DSA preparation, and computer science students. Covers Linear Search, Binary Search, Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and complexity analysis.",
    keywords: [
        "searching algorithms",
        "sorting algorithms",
        "binary search algorithm",
        "quick sort algorithm",
        "merge sort algorithm",
        "bubble sort",
        "insertion sort",
        "selection sort",
        "DSA tutorial",
        "data structures and algorithms",
        "coding interview preparation",
        "algorithm complexity",
        "Big O notation",
        "time complexity",
        "space complexity",
        "Python algorithms",
        "Java algorithms",
        "C++ algorithms",
        "JavaScript algorithms"
    ],
    schema: {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Searching & Sorting Algorithms: Complete Guide with Code in 5 Languages",
        "description": "Comprehensive guide covering Linear Search, Binary Search, Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort with implementations in Python, Java, C++, JavaScript, and C.",
        "author": {
            "@type": "Person",
            "name": "Dev Kant Kumar"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Dev Kant Kumar Blog"
        },
        "datePublished": "2026-02-09",
        "dateModified": "2026-02-09",
        "keywords": "searching algorithms, sorting algorithms, binary search, quick sort, merge sort, DSA, data structures",
        "articleSection": "Data Structures & Algorithms",
        "wordCount": 12000,
        "proficiencyLevel": "Beginner to Intermediate"
    }
};
