import React from "react";
import { HelpCircle as QuestionIcon, Globe } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section20 = () => {
  return (
    <section id="react-data-fetching" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Globe size={32} className="text-orange-500" />
        Section 20: React and APIs - Data Fetching
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react data fetching 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Connecting React components to remote REST or GraphQL APIs is a core requirement of modern applications. React provides hook paradigms to fetch and cache remote resources.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="TanStackQueryDemo.jsx"
          code={`// Fetching data with TanStack Query (React Query)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchTodos = () => fetch('/api/todos').then(res => res.json());
const addTodoApi = (newTodo) => fetch('/api/todos', {
  method: 'POST',
  body: JSON.stringify(newTodo)
}).then(res => res.json());

const TaskList = () => {
  const queryClient = useQueryClient();
  
  // GET Query
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  });

  // POST Mutation
  const mutation = useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      // Invalidate cache and trigger refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  if (isLoading) return <span>Loading tasks...</span>;
  if (error) return <span>Error loading tasks</span>;

  return (
    <div>
      <button onClick={() => mutation.mutate({ text: 'New Task' })}>Add Task</button>
      <ul>
        {todos.map(t => <li key={t.id}>{t.text}</li>)}
      </ul>
    </div>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 20 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. How do you fetch data in React?",
              a: "Using the fetch API or Axios inside useEffect, or by utilizing server state managers like TanStack Query or SWR."
            },
            {
              q: "2. What is a race condition in useEffect data fetching and how do you fix it?",
              a: "A race condition occurs when multiple async requests resolve out of order. Fix it using an active boolean flag or an AbortController to cancel previous requests."
            },
            {
              q: "3. What is an AbortController and how is it used?",
              a: "A browser utility that cancels active fetch requests. You associate it with a fetch via options and trigger controller.abort() inside the useEffect cleanup function."
            },
            {
              q: "4. What is TanStack Query and why is it preferred over manual useEffect fetching?",
              a: "A state manager built for async data. It handles cache layers, eliminates request duplicates, manages loading/error flags, and manages retries automatically."
            },
            {
              q: "5. What is the difference between server state and client state?",
              a: "Client state is local to browsers (toggles, input text). Server state belongs to databases and requires API requests to read or modify."
            },
            {
              q: "6. What is stale-while-revalidate and how does it improve UX?",
              a: "An update pattern serving cached values immediately, while running background fetch checks to refresh the data when the call resolves."
            },
            {
              q: "7. What is useQuery and what does it return?",
              a: "A hook that fetches data. It returns variables like data, isLoading, isError, status, and refetch functions."
            },
            {
              q: "8. What is useMutation and how do you invalidate queries after mutation?",
              a: "A hook for API writes (POST/PUT). Invalidate caches using queryClient.invalidateQueries({ queryKey }) inside the mutation's onSuccess callback."
            },
            {
              q: "9. What is the difference between Axios and Fetch?",
              a: "Axios auto-parses JSON, supports interceptors, and handles timeouts out of the box. Fetch requires double Promises (response.json()) and manual error parsing."
            },
            {
              q: "10. How do you implement pagination with TanStack Query?",
              a: "Bind page parameters to query keys (e.g., ['todos', page]). Updating page state triggers queries for the new key, caching page subsets."
            },
            {
              q: "11. What is SWR and how does it compare to TanStack Query?",
              a: "SWR is a lightweight caching library from Vercel. It is simpler than TanStack Query, offering basic caching hooks but fewer mutations and cache-management features."
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

export default Section20;