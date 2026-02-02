import Conclusion from "./JavaScriptInterviewQuestions2026/Conclusion";
import Introduction from "./JavaScriptInterviewQuestions2026/Introduction";
import Section1 from "./JavaScriptInterviewQuestions2026/Section1";
import Section2 from "./JavaScriptInterviewQuestions2026/Section2";
import Section3 from "./JavaScriptInterviewQuestions2026/Section3";
import Section4 from "./JavaScriptInterviewQuestions2026/Section4";
import Section5 from "./JavaScriptInterviewQuestions2026/Section5";
import Section6 from "./JavaScriptInterviewQuestions2026/Section6";
import Section7 from "./JavaScriptInterviewQuestions2026/Section7";
import Section8 from "./JavaScriptInterviewQuestions2026/Section8";

// --- Main Blog Post Component ---

export default function JavaScriptInterviewQuestions2026() {
  return (
    <article className="max-w-4xl mx-auto px-4 md:px-0 py-8">
        <Introduction />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Conclusion />
    </article>
  );
}

// Blog post metadata for the blog system
JavaScriptInterviewQuestions2026.info = {
    id: "javascript-interview-questions-2026",
    slug: "javascript-interview-questions-2026",
    title: "100+ JavaScript Interview Questions & Answers for 2026",
    excerpt: "The ultimate guide to acing your JavaScript interviews. From closures and event loops to 100+ rapid-fire questions.",
    category: "JavaScript",
    author: "Dev Kant Kumar",
    readTime: "45 min read",
    publishDate: "2026-02-03",
    image: "/images/blog/JavaScriptInterviewQuestions2026.png",
    featured: true,
    tags: ["JavaScript", "Interview", "Web Development", "2026", "Front-end", "ES6"],
    description: "Comprehensive 100+ JavaScript Interview Questions Guide. Deep dives into Closures, Promises, Event Loop, and Rapid Fire rounds."
};
