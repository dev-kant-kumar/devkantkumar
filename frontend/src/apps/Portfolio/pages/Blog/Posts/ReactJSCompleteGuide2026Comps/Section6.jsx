import React from "react";
import { HelpCircle as QuestionIcon, Anchor, GitCommit } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section6 = () => {
  return (
    <section id="react-hooks" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Anchor size={32} className="text-orange-500" />
        Section 6: Hooks Deep Dive
      </h2>
      <p className="text-slate-400 mb-6">
        Target Keyword: <strong>react hooks explained 2026</strong>
      </p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Hooks are functions that let you "hook into" React state and lifecycle features from functional components. By eliminating class components, hooks allow you to organize side effects and stateful logic into isolated, reusable functions.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Rules of Hooks</h3>
        <ul className="list-disc list-inside space-y-2 mb-8 text-slate-300">
          <li><strong>Top-Level Calls Only:</strong> Do not call Hooks inside loops, conditions, or nested functions. This ensures React loads hooks in the same order on every render.</li>
          <li><strong>React Functions Only:</strong> Call Hooks only from React functional components or custom Hooks.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>

        <CodeBlock
          language="jsx"
          filename="UseEffectCleanup.jsx"
          code={`// useEffect with Fetch and AbortController cleanup
import React, { useState, useEffect } from 'react';

const UserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const loadData = async () => {
      try {
        const res = await fetch(\`https://api.example.com/users/\${userId}\`, {
          signal: controller.signal
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    };

    loadData();

    // Cleanup cancels pending requests when component updates/unmounts
    return () => controller.abort();
  }, [userId]);

  return <div>{user ? user.name : "Loading..."}</div>;
};`}
        />

        <CodeBlock
          language="jsx"
          filename="UseRefExample.jsx"
          code={`// useRef for DOM access and tracking previous state value
const AutoFocusInput = ({ value }) => {
  const inputRef = React.useRef(null);
  const prevValRef = React.useRef("");

  React.useEffect(() => {
    // Focus DOM input element on mount
    inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    // Keep track of previous state value
    prevValRef.current = value;
  }, [value]);

  return (
    <div>
      <input ref={inputRef} type="text" value={value} />
      <p>Previous Value: {prevValRef.current}</p>
    </div>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="UseReducerExample.jsx"
          code={`// useReducer for complex form states
const formReducer = (state, action) => {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return { name: '', email: '' };
    default:
      return state;
  }
};

const UserForm = () => {
  const [state, dispatch] = React.useReducer(formReducer, { name: '', email: '' });

  return (
    <form>
      <input
        value={state.name}
        onChange={(e) => dispatch({ type: 'FIELD_CHANGE', field: 'name', value: e.target.value })}
      />
      <input
        value={state.email}
        onChange={(e) => dispatch({ type: 'FIELD_CHANGE', field: 'email', value: e.target.value })}
      />
    </form>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="Memoization.jsx"
          code={`// useMemo and useCallback to stabilize references
const ExpensiveComponent = ({ list, onProcess }) => {
  // Memoizes calculations to prevent recalculating on every render
  const sortedList = React.useMemo(() => {
    return [...list].sort((a, b) => b.score - a.score);
  }, [list]);

  // Memoizes function reference to prevent child re-renders
  const handleItemClick = React.useCallback((id) => {
    onProcess(id);
  }, [onProcess]);

  return (
    <ul>
      {sortedList.map(item => (
        <li key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 6 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What are React Hooks and why were they introduced?",
              a: "Hooks are functions that let you use state and lifecycle methods in functional components. They were introduced in React 16.8 to share stateful logic without changing component hierarchies, avoid class component boilerplate, and prevent 'wrapper hell' caused by render props and HOCs."
            },
            {
              q: "2. What are the two rules of hooks?",
              a: "Rules: (1) Only call Hooks at the top level of your functional components (never in loops, conditions, or nested functions), and (2) Only call Hooks from React function components or custom Hooks."
            },
            {
              q: "3. Explain the useEffect dependency array - what does [], [dep], and no array do?",
              a: "No array: The effect runs after *every* render. Empty array ([]): The effect runs once after the initial render (mount). Dependency array ([dep]): The effect runs after the initial render and again whenever any item inside the dependency array changes references between renders."
            },
            {
              q: "4. How do you clean up a useEffect? Why is cleanup important?",
              a: "You clean up an effect by returning a function from your useEffect callback. React calls this cleanup function when the component unmounts or before re-running the effect due to a dependency change. Cleanup is critical to prevent memory leaks, cancel active API requests, or clear intervals."
            },
            {
              q: "5. What is the difference between useEffect and useLayoutEffect?",
              a: "useEffect runs asynchronously *after* the browser paints the screen, making it ideal for standard async operations like fetches. useLayoutEffect runs synchronously *before* the browser paints the screen, right after DOM mutations. It is used to measure layouts or prevent UI flickers before the screen updates."
            },
            {
              q: "6. When would you use useReducer over useState?",
              a: "Use useReducer when a component has complex state logic involving multiple sub-values, when the next state depends on the previous state, or when actions trigger updates across multiple variables. It encapsulates state transformations cleanly into a reducer function."
            },
            {
              q: "7. What is the difference between useMemo and useCallback?",
              a: "useMemo caches (memoizes) the *result* of a function calculation. useCallback caches the *function reference* itself. useMemo is for expensive calculations; useCallback is for preserving functional identities passed as props to memoized children."
            },
            {
              q: "8. How does useRef differ from state? What are its two main use cases?",
              a: "Mutating a Ref's .current property does not trigger a component re-render, whereas modifying state does. Ref's two main use cases are: (1) accessing DOM nodes directly, and (2) storing mutable values that persist across renders without causing layout updates."
            },
            {
              q: "9. What is useContext and when should you use it vs prop drilling?",
              a: "useContext consumes values directly from a React Context Provider without passing props down. Use it for global configurations like themes, authentication contexts, or internationalization parameters, but avoid it for high-frequency state updates due to re-render overhead."
            },
            {
              q: "10. What is the useTransition hook and what problem does it solve?",
              a: "useTransition is a concurrent Hook that lets you mark state updates as non-urgent transitions. It prevents heavy UI calculations from blocking user interactions (like typing in an input field) by running the update in the background."
            },
            {
              q: "11. What is the new use() hook in React 19?",
              a: "The use() hook in React 19 resolves promises and consumes Context inline. Unlike standard Hooks, use() can be called conditionally inside loops or if blocks, bringing native support for asynchronous control flow."
            },
            {
              q: "12. How does the React Compiler reduce the need for useMemo and useCallback?",
              a: "The compiler automatically checks component structures and wraps values/methods in memoization during build time. This means developers no longer have to manually manage dependencies or write useMemo/useCallback declarations."
            },
            {
              q: "13. Can you call hooks inside conditions? What happens if you do?",
              a: "No, calling hooks inside conditions violates the Rules of Hooks. React identifies hooks by their call order. Changing the sequence or number of hooks called between renders breaks React's internal array index mapping, causing state bugs."
            },
            {
              q: "14. What is useId and why is it useful for accessibility?",
              a: "useId generates unique, stable ID strings that persist between client renders and server-side renders. It is used to bind HTML input elements to labels or ARIA descriptions, avoiding ID clashes in micro-frontend environments."
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

export default Section6;
