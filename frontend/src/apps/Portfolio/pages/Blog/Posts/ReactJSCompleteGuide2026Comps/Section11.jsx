import React from "react";
import { HelpCircle as QuestionIcon, Network } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section11 = () => {
  return (
    <section id="context-api" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Network size={32} className="text-orange-500" />
        Section 11: Context API
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react context api tutorial 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          The React Context API solves the prop drilling problem by providing a way to share values globally down a component tree without manually threading props through intermediate layout layers.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="ThemeContext.jsx"
          code={`// Full Context Setup: Creation, Provider, and Custom Hook
import React, { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext(undefined);

// 2. Create Custom Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create Custom Hook to consume context safely
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 11 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is the Context API and what problem does it solve?",
              a: "The Context API allows sharing data globally down a component tree without prop drilling. It solves the issue of threading variables (like theme, locale, user session) through multiple middle components that have no interest in the values."
            },
            {
              q: "2. What are the three parts of the Context API?",
              a: "Parts: (1) React.createContext() to define the context, (2) Context.Provider to wrap parent hierarchies and declare values, and (3) React.useContext() to read context values in child components."
            },
            {
              q: "3. How do you provide and consume context?",
              a: "Provide context by wrapping components in <Context.Provider value={value}>. Consume it inside functional components by executing const contextVal = useContext(Context)."
            },
            {
              q: "4. What is the performance problem with Context and how do you mitigate it?",
              a: "Whenever the Provider's value reference updates, all components consuming that context are forced to re-render. To mitigate this, split context into separate providers (e.g., StateProvider and DispatchProvider), wrap child elements in React.memo, or compute state using state libraries."
            },
            {
              q: "5. Can you have multiple contexts in one app?",
              a: "Yes. You can nest multiple context providers at the root or at feature-level boundaries to separate concerns (e.g., ThemeProvider inside AuthProvider)."
            },
            {
              q: "6. What is the difference between Context API and Redux?",
              a: "Context is a dependency injection tool built into React. Redux is an external state management library that provides developer tools, middleware, actions, and reducers. Redux is optimized for high-frequency updates; Context causes cascading re-renders when data shifts."
            },
            {
              q: "7. When should you use Context API vs a state management library?",
              a: "Use Context for static or slow-changing global data (theme, auth, lang). Use state management libraries (Zustand, Redux) for frequent, complex, or performance-critical state updates (e.g., gaming engines, multi-column forms)."
            },
            {
              q: "8. What happens when a Context value changes? Which components re-render?",
              a: "Every component that imports useContext() referencing that specific context will re-render, regardless of whether they consume the specific field that changed inside the context value."
            },
            {
              q: "9. How do you create a custom hook that wraps a context?",
              a: "Define a hook that calls useContext(MyContext), checks if the return is undefined (indicating consumer is placed outside provider bounds), and throws a clear error if so."
            },
            {
              q: "10. What is the default value of a context and when is it used?",
              a: "The default value is passed when calling createContext(defaultValue). It is only used if a component consumes context without being wrapped inside a matching Provider in its parent hierarchy."
            },
            {
              q: "11. How do you split context to avoid unnecessary re-renders?",
              a: "By storing state in one context (e.g., stateContext) and dispatch functions in another (e.g., dispatchContext). This prevents state changes from causing re-renders in components that only trigger actions."
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

export default Section11;