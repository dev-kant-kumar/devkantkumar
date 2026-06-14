import React from "react";
import { HelpCircle as QuestionIcon, Zap } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section14 = () => {
  return (
    <section id="react-performance" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Zap size={32} className="text-orange-500" />
        Section 14: Performance Optimization
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react performance optimization 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Optimizing React applications involves preventing redundant updates, reducing bundle sizes, and compiling components using build-time optimization structures.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="MemoizedChild.jsx"
          code={`// Using React.memo to prevent re-renders when parent states change
import React, { useState } from 'react';

const ExpensiveDisplay = React.memo(({ title }) => {
  console.log("Expensive rendered!");
  return <h3>Display: {title}</h3>;
});

const Parent = () => {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setCount(c => c + 1)}>Clicks: {count}</button>
      {/* ExpensiveDisplay will NOT re-render when text changes because text is not a prop here */}
      <ExpensiveDisplay title="Stable Dashboard" />
    </div>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 14 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What triggers a re-render in React?",
              a: "A component re-renders if its local state changes, if a parent component forces a re-render, if props change references, or if a context value it consumes updates."
            },
            {
              q: "2. What is React.memo and how does it prevent re-renders?",
              a: "React.memo is a higher-order component. It performs a shallow comparison of incoming props; if props haven't changed reference, it skips rendering the component, reusing the last rendered result."
            },
            {
              q: "3. What is the difference between useMemo and React.memo?",
              a: "React.memo is a Higher-Order Component wrapping entire child elements. useMemo is a React Hook used inside components to memoize heavy calculations."
            },
            {
              q: "4. When should you NOT use useMemo or useCallback?",
              a: "Do not use them for simple, cheap operations. The compiler dependency-checking and caching logic has performance overhead, which can exceed the execution cost of a simple function."
            },
            {
              q: "5. What is code splitting and how do React.lazy and Suspense enable it?",
              a: "Code splitting splits bundling files into smaller modular scripts. React.lazy dynamically imports components while <Suspense> renders fallback placeholders (loaders) while the scripts resolve."
            },
            {
              q: "6. What is list virtualization and when do you need it?",
              a: "List virtualization only renders items currently visible in the user's viewport. You need it when rendering thousands of items to avoid slowing down DOM structures."
            },
            {
              q: "7. What is the React Profiler and how do you use it to find performance issues?",
              a: "A tool in DevTools that collects data on when components render, how long they take, and why they scheduled the update, pointing out bottlenecks."
            },
            {
              q: "8. What is referential equality and why does it matter for React performance?",
              a: "JavaScript objects/arrays/functions compare by reference pointer, not values. Passing inline objects or functions down as props causes children to assume props changed reference, triggering redundant renders."
            },
            {
              q: "9. How does the React Compiler in 2026 change memoization strategy?",
              a: "It automates optimization. Developers no longer need to write useMemo or useCallback, as the compiler does it automatically at compile-time."
            },
            {
              q: "10. What is the key prop's role in performance during list updates?",
              a: "It tells React which DOM nodes can be reused or moved during list operations, preventing nodes from being completely destroyed and rebuilt."
            },
            {
              q: "11. What is tree shaking and how does it reduce bundle size?",
              a: "A build optimization process (like in Vite/Rollup) that analyzes import chains and strips unused code from the final bundle scripts."
            },
            {
              q: "12. How do you measure and improve Core Web Vitals in a React app?",
              a: "Track metrics (LCP, FID, CLS) using Lighthouse. Improve them via image optimizations, lazy loading, script splitting, CDN distribution, and layout stability."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <h4 className="font-bold text-white text-lg mb-2">{item.q}</h4>
              <p className="text-slate-300 pl-4 border-l border-orange-500/30">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section14;