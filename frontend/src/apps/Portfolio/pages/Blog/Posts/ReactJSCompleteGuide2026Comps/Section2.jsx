import React from "react";
import { Cpu, HelpCircle as QuestionIcon, FileCode, CheckCircle, Database } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section2 = () => {
  return (
    <section id="react-fundamentals" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Cpu size={32} className="text-orange-500" />
        Section 2: React Fundamentals - What is React?
      </h2>
      <p className="text-slate-400 mb-6">
        Target Keyword: <strong>what is react js 2026</strong>
      </p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          At its core, React is a declarative, component-based JavaScript library for building user interfaces. React's primary innovation is the separation of state representation from DOM mutations. By expressing the UI as a pure function of state, React eliminates the error-prone manual DOM manipulations of the past.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Virtual DOM vs Real DOM</h3>
        <p className="text-slate-300 mb-4">
          Updating the Real DOM is slow because it requires layout recalculations, CSS reflows, and repaints. React avoids this bottleneck by maintaining a lightweight in-memory representation of the DOM tree: the <strong>Virtual DOM</strong>.
        </p>

        {/* Text/CSS Diagram of Virtual DOM vs Real DOM */}
        <div className="my-8 p-6 rounded-xl bg-slate-900/80 border border-slate-700/50 flex flex-col md:flex-row gap-6 justify-around items-center">
          <div className="flex-1 text-center p-4 rounded bg-slate-950 border border-orange-500/30">
            <h4 className="text-orange-400 font-bold mb-2">State Change</h4>
            <p className="text-xs text-slate-400">User clicks button, updates state variable</p>
          </div>
          <div className="text-slate-500">→</div>
          <div className="flex-1 text-center p-4 rounded bg-slate-950 border border-blue-500/30">
            <h4 className="text-blue-400 font-bold mb-2">Virtual DOM Re-render</h4>
            <p className="text-xs text-slate-400">React builds a new Virtual DOM tree representing updated state</p>
          </div>
          <div className="text-slate-500">→</div>
          <div className="flex-1 text-center p-4 rounded bg-slate-950 border border-green-500/30">
            <h4 className="text-green-400 font-bold mb-2">Diffing & Reconcile</h4>
            <p className="text-xs text-slate-400">Fiber engine compares trees, compiles minimal changes, updates Real DOM</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>

        <CodeBlock
          language="jsx"
          filename="HelloWorld.jsx"
          code={`// Simple Hello World structure
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Hello World from React 19!</h1>;
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);`}
        />

        <CodeBlock
          language="javascript"
          filename="JSX_vs_CreateElement.js"
          code={`// JSX Representation
const elementJSX = <h1 className="title">Hello World</h1>;

// Compiled equivalent (using plain React.createElement)
const elementPlain = React.createElement(
  'h1',
  { className: 'title' },
  'Hello World'
);`}
        />

        <CodeBlock
          language="javascript"
          filename="VirtualDomDiff.js"
          code={`// Conceptual representation of a Virtual DOM Node
const vNode = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Virtual DOM Demo' } }
    ]
  }
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <Database size={24} className="text-orange-400" />
          🎯 Section 2 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is React and how does it differ from a framework like Angular?",
              a: "React is an open-source, component-based UI library focused strictly on the View layer of an application. Angular is a full-featured MVC framework that provides out-of-the-box solutions for routing, state management, form validation, and HTTP requests. React offers more architectural flexibility, relying on its ecosystem for secondary capabilities."
            },
            {
              q: "2. What is the Virtual DOM and how does it improve performance?",
              a: "The Virtual DOM is a lightweight JavaScript representation of the Real DOM. When state changes, React updates the Virtual DOM first. It then compares this updated tree with the previous Virtual DOM tree (a process called diffing) to find the minimum number of changes needed, executing only those specific modifications to the Real DOM, which prevents expensive layout reflows."
            },
            {
              q: "3. Explain the reconciliation process in React.",
              a: "Reconciliation is the algorithm React uses to diff the Virtual DOM trees and update the UI. It operates on an O(N) heuristic based on two assumptions: (1) two elements of different types will produce different trees, and (2) child elements can be marked as stable across renders using a unique key prop."
            },
            {
              q: "4. What is React Fiber and what problem does it solve?",
              a: "React Fiber is the complete rewrite of React's core reconciliation algorithm introduced in React 16. It solves the limitation of synchronous rendering, which blocked the main thread on large trees. Fiber enables incremental rendering, allowing React to pause, abort, or reuse rendering work to prioritize high-priority updates (like animations or user inputs)."
            },
            {
              q: "5. What is the difference between declarative and imperative programming?",
              a: "Imperative programming requires writing step-by-step instructions telling the browser *how* to update the DOM (e.g., document.createElement, appendChild). Declarative programming describes *what* the UI should look like based on the current state, and the library (React) handles updating the DOM to match that description."
            },
            {
              q: "6. What is JSX? Is it required in React?",
              a: "JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows writing HTML-like tags within a JavaScript file. It is not strictly required-you can write plain React.createElement() calls-but it is highly recommended because it improves readability and developer experience."
            },
            {
              q: "7. What does ReactDOM.render() do? What replaced it in React 18+?",
              a: "ReactDOM.render() mounted a React component tree to a specific DOM node in React 17 and below. In React 18 and 19, it was deprecated and replaced by createRoot(), which enables concurrent features by initializing the rendering pipeline under the new concurrent scheduler."
            },
            {
              q: "8. What are the major changes introduced in React 19?",
              a: "React 19 introduced the React Compiler (automatic memoization, eliminating useMemo and useCallback), React Actions (async transitions for form states), the use() hook (to resolve promises and consume context inline), direct support for document metadata tags (title, meta), and automatic ref forwarding without forwardRef."
            },
            {
              q: "9. What is the React Compiler and how does it change development?",
              a: "The React Compiler (formerly React Forget) is a build-time compiler that analyzes React code and automatically injects memoization logic. It ensures that components and values only re-render when their dependencies actually change, saving developers from manually writing useMemo, useCallback, or React.memo."
            },
            {
              q: "10. Why does React use a one-way data flow?",
              a: "One-way data flow (or unidirectional data flow) means data flows in a single direction: down from parent components to children via props. This constraint makes the app more predictable, easier to debug, and simpler to reason about, as data mutations are localized to specific components."
            },
            {
              q: "11. What is StrictMode in React and when should you use it?",
              a: "StrictMode is a development-only tool that highlights potential problems in an application. It triggers intentional double-rendering of components to check for side effects, alerts you about legacy API usage, and flags memory leaks. It should wrap the root component during development."
            },
            {
              q: "12. What is the difference between React, ReactDOM, and React Native?",
              a: "React is the core library containing the component blueprint, state lifecycle, and hooks. ReactDOM is the renderer specifically for web browsers, mapping components to DOM nodes. React Native is the renderer for mobile apps, mapping React components to native iOS and Android UI elements."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <h4 className="font-bold text-white text-lg mb-2">
                {item.q}
              </h4>
              <p className="text-slate-300 pl-4 border-l border-orange-500/30">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
