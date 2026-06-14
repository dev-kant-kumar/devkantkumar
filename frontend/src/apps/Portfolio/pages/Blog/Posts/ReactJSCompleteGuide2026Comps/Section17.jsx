import React from "react";
import { HelpCircle as QuestionIcon, Cpu } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section17 = () => {
  return (
    <section id="react-19" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Cpu size={32} className="text-orange-500" />
        Section 17: React 19 - New Features
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react 19 new features 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          React 19 marks a major shift towards compiler-driven optimizations and async UI transitions, making modern applications faster and reducing developer boilerplate.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="UseHookPromise.jsx"
          code={`// React 19 use() Hook resolving promises inline
import React, { use, Suspense } from 'react';

const fetchMessage = () => fetch('/api/msg').then(res => res.json());
const msgPromise = fetchMessage(); // Define outside or memoize

const MessagePanel = () => {
  // use() resolves the promise during rendering
  const message = use(msgPromise);
  return <p>Fetched Message: {message.text}</p>;
};

const App = () => (
  <Suspense fallback={<div>Loading promise...</div>}>
    <MessagePanel />
  </Suspense>
);`}
        />

        <CodeBlock
          language="jsx"
          filename="OptimisticUpdate.jsx"
          code={`// useOptimistic Hook for instant UI updates
import { useOptimistic, useState } from 'react';

const TaskPanel = () => {
  const [tasks, setTasks] = useState([{ id: 1, text: "Learn React" }]);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (state, newTaskText) => [...state, { id: Date.now(), text: newTaskText, sending: true }]
  );

  const addTask = async (formData) => {
    const text = formData.get("taskText");
    setOptimisticTasks(text); // Trigger instant optimistic view
    
    // Perform real network request
    await fetch('/api/tasks', { method: 'POST', body: JSON.stringify({ text }) });
    setTasks(prev => [...prev, { id: Date.now(), text }]);
  };

  return (
    <form action={addTask}>
      <input name="taskText" required />
      <button type="submit">Add Task</button>
      <ul>
        {optimisticTasks.map(t => (
          <li key={t.id}>{t.text} {t.sending && "(Sending...)"}</li>
        ))}
      </ul>
    </form>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 17 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is the React Compiler and what does it automate?",
              a: "The React Compiler is a build-time tool that auto-memoizes component values and functional references, removing the need for manual useMemo and useCallback hooks."
            },
            {
              q: "2. What are React Server Components and how do they differ from regular components?",
              a: "Server Components render exclusively on the server, sending pre-rendered structures to the client. This reduces client bundle sizes since client code doesn't need data fetching dependencies."
            },
            {
              q: "3. What is the use() hook and what can it consume?",
              a: "The use() hook is a React 19 hook that can consume Promises and Context inline. Unlike standard hooks, it can be called inside conditions and loops."
            },
            {
              q: "4. What are React Actions in React 19?",
              a: "Actions are asynchronous transitions. When you pass an async function to HTML elements (like <form action={handler}>), React automatically handles pending states, error boundaries, and optimistic updates."
            },
            {
              q: "5. What is useOptimistic and when would you use it?",
              a: "useOptimistic is a hook that temporarily renders expected data while an async operation completes. It's used to make UI updates feel instant, reverting to server state if the request fails."
            },
            {
              q: "6. What is useFormStatus and what problem does it solve?",
              a: "useFormStatus is a hook that accesses submission details of parent forms without prop drilling. It returns properties like 'pending' and 'data'."
            },
            {
              q: "7. How has ref handling changed in React 19?",
              a: "React 19 supports passing 'ref' as a standard prop to functional components. This deprecates the React.forwardRef() wrapper."
            },
            {
              q: "8. What is the difference between Server Components and SSR?",
              a: "SSR (Server-Side Rendering) converts HTML on servers to return complete static structures. Server Components are rendering units that never re-render on clients; they yield interactive JSON structures, not plain HTML, and can coexist with client components."
            },
            {
              q: "9. What is a Server Action?",
              a: "A Server Action is a client-callable function that executes on the server. You declare it using the 'use server' directive at the top of the function block."
            },
            {
              q: "10. How does React 19 handle document metadata (<title>, <meta>)?",
              a: "React 19 natively supports rendering metadata tags (title, meta, link) directly inside components. It automatically hoists them to the HTML document head, removing the need for libraries like React Helmet."
            },
            {
              q: "11. What is useDeferredValue and how does it help with performance?",
              a: "It defers updating heavy parts of the UI while keeping the text inputs responsive, rendering background components with stale values until tasks complete."
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

export default Section17;