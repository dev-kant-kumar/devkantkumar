import React from "react";
import { HelpCircle as QuestionIcon, Layout } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section19 = () => {
  return (
    <section id="react-patterns" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Layout size={32} className="text-orange-500" />
        Section 19: React Patterns & Best Practices
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react design patterns 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Design patterns resolve common architectural challenges in React development, keeping components extensible and easy to test.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="CompoundComponent.jsx"
          code={`// Compound Component Pattern (like select/option)
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext(undefined);

export const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.Tab = ({ index, label }) => {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  return (
    <button
      onClick={() => setActiveIndex(index)}
      className={activeIndex === index ? 'active' : ''}
    >
      {label}
    </button>
  );
};

Tabs.Panel = ({ index, children }) => {
  const { activeIndex } = useContext(TabsContext);
  return activeIndex === index ? <div>{children}</div> : null;
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 19 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is the compound component pattern?",
              a: "A pattern where components work together to share state implicitly (e.g., <Tabs> and <Tabs.Tab>). It provides clean APIs without forcing prop drilling."
            },
            {
              q: "2. What are Higher-Order Components? What are their downsides?",
              a: "An HOC is a function that takes a component and returns an upgraded component (e.g., withRouter(App)). Downsides: it adds noise to debugger trees, causes prop clashes, and is largely replaced by hooks."
            },
            {
              q: "3. What is the render props pattern? When would you still use it?",
              a: "A pattern where components accept functions that return JSX as props, delegating rendering logic. You use it in legacy libraries, though hooks are now preferred."
            },
            {
              q: "4. What is an Error Boundary? Can you make one with hooks?",
              a: "An Error Boundary is a class component that catches JavaScript errors in child trees. You cannot create one with functional components because hooks don't support getDerivedStateFromError or componentDidCatch."
            },
            {
              q: "5. What is a Portal and when do you need one?",
              a: "A Portal renders elements outside their parent DOM hierarchy, mounting them to separate DOM nodes (e.g., document.body). They are used for modals, tooltips, and dropdown overlays."
            },
            {
              q: "6. What is Suspense and how does it work with lazy loading?",
              a: "Suspense is a React feature that suspends rendering while resources load, displaying a fallback loader until client components resolve."
            },
            {
              q: "7. What is the presentational/container component pattern?",
              a: "A pattern separating business logic from UI representation. Container components manage state and fetches; Presentational components receive props and render elements."
            },
            {
              q: "8. What is lazy initialization of state and when is it useful?",
              a: "Passing a function to useState (e.g., useState(() => readDb())). It only executes during the component's initial mount, avoiding heavy calculations on re-renders."
            },
            {
              q: "9. What is composition over inheritance in React?",
              a: "React's design recommendation. Instead of extending class components, build modules by nesting components and passing elements as props (composition)."
            },
            {
              q: "10. How do you handle deeply nested context with multiple providers?",
              a: "By creating a unified wrapper provider (e.g., AppProviders) that groups all context tags, avoiding nested tag indentations at the root level."
            },
            {
              q: "11. What is a compound component and what are its advantages over prop-heavy APIs?",
              a: "It encapsulates state implicitly. Sibling components communicate via Context, giving developers control over layouts without needing long lists of parent parameters."
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

export default Section19;