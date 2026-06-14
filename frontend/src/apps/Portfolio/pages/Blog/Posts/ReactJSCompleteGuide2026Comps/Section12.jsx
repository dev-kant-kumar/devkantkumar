import React from "react";
import { HelpCircle as QuestionIcon, Database } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section12 = () => {
  return (
    <section id="state-management" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Database size={32} className="text-orange-500" />
        Section 12: State Management Libraries
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react state management 2026 zustand redux</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          For larger apps, native React state can become complex. In 2026, global state is divided into: <strong>Server state</strong> (handled by TanStack Query) and <strong>Client state</strong> (Zustand for lightweight needs, Redux Toolkit for complex enterprise setups).
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="javascript"
          filename="ZustandStore.js"
          code={`// Creating a lightweight Zustand Store
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] })
}));

// Usage in Component:
// const items = useCartStore((state) => state.items);
// const addItem = useCartStore((state) => state.addItem);`}
        />

        <CodeBlock
          language="javascript"
          filename="ReduxSlice.js"
          code={`// Standard Redux Toolkit Slice
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false },
  reducers: {
    setUser: (state, action) => {
      // Immer handles mutability safety under the hood
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 12 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is the difference between local state, server state, and global state?",
              a: "Local state: state scoped to a single component (useState). Server state: cached data fetched from APIs (useQuery). Global state: state shared across multiple pages or unrelated layout components (Zustand, Redux)."
            },
            {
              q: "2. What is Redux and what is the Redux data flow?",
              a: "Redux is a predictable state container. Unidirectional data flow: Components trigger Actions -> Dispatch relays actions to Reducers -> Reducers update the Store state -> Store notifies subscribing components to re-render."
            },
            {
              q: "3. What is Redux Toolkit and how does it simplify Redux?",
              a: "Redux Toolkit (RTK) is the official opinionated toolset for Redux. It removes boilerplate by generating action creators automatically, configuring standard store setups, and integrating Immer to allow 'mutable' assignment syntax in reducers."
            },
            {
              q: "4. What are slices in Redux Toolkit?",
              a: "A Slice is a collection of Redux reducer logic and actions bundled together for a specific domain module (e.g., auth, cart)."
            },
            {
              q: "5. What is Zustand and how does it differ from Redux?",
              a: "Zustand is a lightweight state manager that uses closures and hook structures. It requires no Providers, has minimal boilerplate, and operates via simple state actions without complex action/reducer pipelines."
            },
            {
              q: "6. Why is Zustand preferred over Redux for smaller apps in 2026?",
              a: "Zustand sets up in under 5 lines of code, adds minimal bundle weight (~1KB), doesn't require nesting components in Providers, and allows selector-based subscription optimization."
            },
            {
              q: "7. What is TanStack Query and what problem does it solve?",
              a: "TanStack Query is a server-state library. It manages remote data caching, syncs local states with backends, handles loading/error statuses, and provides stale-while-revalidate utilities."
            },
            {
              q: "8. What is the difference between useQuery and useMutation?",
              a: "useQuery is used for fetching/GET requests (read data). useMutation is used for creating/updating/deleting/POST/PUT/DELETE requests (write/mutate data)."
            },
            {
              q: "9. What is stale-while-revalidate and why is it powerful for UX?",
              a: "It returns cached stale data immediately to make the UI feel instant, while simultaneously refetching fresh data in the background to update the cache and screen."
            },
            {
              q: "10. When should you use Context API vs Zustand vs Redux?",
              a: "Context: slow-changing global variables. Zustand: medium-to-large apps needing clean global states. Redux: massive enterprises with elaborate state pipelines and debugging logs."
            },
            {
              q: "11. What is the single source of truth principle?",
              a: "A state architecture design where every piece of data is owned by only one place, ensuring different parts of the application do not hold out-of-sync copies."
            },
            {
              q: "12. How does React Query's caching work?",
              a: "It caches API responses under specific query keys. If a query is rendered within cache limits, React Query serves it from cache while resolving background revalidation based on configuration."
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

export default Section12;