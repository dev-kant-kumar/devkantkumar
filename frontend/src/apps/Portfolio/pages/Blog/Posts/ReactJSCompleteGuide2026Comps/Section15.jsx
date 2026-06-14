import React from "react";
import { HelpCircle as QuestionIcon, PlusCircle } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section15 = () => {
  return (
    <section id="custom-hooks" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <PlusCircle size={32} className="text-orange-500" />
        Section 15: Custom Hooks
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react custom hooks examples</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Custom Hooks allow you to extract component state and lifecycle logic into reusable JavaScript functions, keeping components focused strictly on rendering UI.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="useLocalStorage.js"
          code={`// Custom Hook to manage local storage state
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`}
        />

        <CodeBlock
          language="jsx"
          filename="useDebounce.js"
          code={`// Custom Hook to debounce high-frequency state updates (like inputs)
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // Cleanup on update
  }, [value, delay]);

  return debouncedValue;
}`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 15 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is a custom hook in React?",
              a: "A custom hook is an arbitrary JavaScript function whose name starts with 'use', which can call other React hooks, abstracting complex component logic into a reusable block."
            },
            {
              q: "2. What naming convention must custom hooks follow and why?",
              a: "They must start with the prefix 'use'. This tells React's build tools and compiler that the function contains hook calls, enabling rules-of-hooks validations."
            },
            {
              q: "3. How do custom hooks differ from regular utility functions?",
              a: "Utility functions can perform calculations but cannot invoke state or lifecycle hooks. Custom hooks can execute other hooks (useState, useEffect) and manage component lifecycles."
            },
            {
              q: "4. Can custom hooks use other hooks? Can they use other custom hooks?",
              a: "Yes. Custom hooks can use core React hooks and call other custom hooks, creating nested logic abstractions."
            },
            {
              q: "5. How would you build a useFetch hook?",
              a: "Set up loading, error, and data state variables. Inside a useEffect, run an async fetch function that handles loading status, stores the response in state, and handles errors."
            },
            {
              q: "6. How do you test a custom hook?",
              a: "Using the renderHook() utility from React Testing Library. It wraps hook executions inside mock components, letting you inspect return values."
            },
            {
              q: "7. What is the benefit of custom hooks over HOCs or render props?",
              a: "Custom hooks do not add extra components to the DOM hierarchy, which avoids 'wrapper hell', simplifies unit tests, and allows for cleaner syntax."
            },
            {
              q: "8. How would you build a useDebounce hook?",
              a: "Maintain a debouncedState variable. Set up a useEffect that starts a setTimeout delay to update the debouncedState, and returns a cleanup callback that executes clearTimeout."
            },
            {
              q: "9. Can two components share state through a custom hook?",
              a: "No. Custom hooks share stateful *logic*, not state itself. Each component calling the hook initializes its own local state instance."
            },
            {
              q: "10. What is the difference between sharing logic and sharing state in custom hooks?",
              a: "Sharing logic means reusing state lifecycles (each component gets its own values). Sharing state means components read from the exact same data source (like Context or global stores)."
            },
            {
              q: "11. How would you build a useLocalStorage hook?",
              a: "Initialize useState with a lazy function that reads a key from localStorage. Write a useEffect that sets item values in localStorage whenever the key or value updates."
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

export default Section15;