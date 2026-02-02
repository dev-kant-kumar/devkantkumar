import { Bug, Zap } from 'lucide-react';
import { CodeBlock } from './Shared';

const Section10 = () => {
  return (
    <section id="performance-debugging" className="mb-20 scroll-mt-20">
         <h2 className="text-3xl font-bold text-white mb-8">Performance & Debugging</h2>

         {/* Performance */}
         <div className="mb-12">
            <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                <Zap size={24} /> Performance Optimization
            </h3>
            <p className="text-slate-300 mb-6">
                90% of React performance issues are unnecessary re-renders. Here is how to fix them.
            </p>

            <h4 className="text-xl font-bold text-white mb-4">1. Selective Subscriptions (Zustand)</h4>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 font-bold mb-2">❌ Bad: Re-renders on ANY change</p>
                    <CodeBlock
                        language="javascript"
                        code={`const store = useStore(); // Listens to EVERYTHING`}
                    />
                </div>
                <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
                    <p className="text-emerald-400 font-bold mb-2">✅ Good: Only re-renders for itemCount</p>
                    <CodeBlock
                        language="javascript"
                        code={`const itemCount = useStore(state => state.items.length);`}
                    />
                </div>
            </div>

            <h4 className="text-xl font-bold text-white mb-4">2. React.memo & useMemo</h4>
            <CodeBlock
                language="javascript"
                code={`// Only re-render if props actually change
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* ... */}</div>;
});

// Memoize expensive calculations
const total = useMemo(() => items.reduce((a, b) => a + b, 0), [items]);`}
            />
         </div>

         {/* Debugging */}
         <div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center gap-2">
                <Bug size={24} /> Debugging & DevTools
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-5 rounded-lg bg-slate-800 border border-slate-700">
                    <h4 className="font-bold text-white mb-2">React Query DevTools</h4>
                    <p className="text-sm text-slate-400 mb-3">Must-have for visualizing server state.</p>
                    <ul className="text-sm text-slate-300 list-disc pl-4 space-y-1">
                        <li>View cache status (fresh/stale)</li>
                        <li>Force refetch</li>
                        <li>Inspect query keys</li>
                    </ul>
                </div>

                <div className="p-5 rounded-lg bg-slate-800 border border-slate-700">
                    <h4 className="font-bold text-white mb-2">Zustand DevTools</h4>
                    <p className="text-sm text-slate-400 mb-3">Connects to Redux DevTools extension.</p>
                    <CodeBlock
                        language="javascript"
                        code={`import { devtools } from 'zustand/middleware';
const useStore = create(devtools(...));`}
                    />
                </div>

                <div className="p-5 rounded-lg bg-slate-800 border border-slate-700">
                    <h4 className="font-bold text-white mb-2">React Profiler</h4>
                    <p className="text-sm text-slate-400 mb-3">Built into React DevTools.</p>
                    <ul className="text-sm text-slate-300 list-disc pl-4 space-y-1">
                        <li>Identify re-renders</li>
                        <li>Measure render time</li>
                        <li>Find performance bottlenecks</li>
                    </ul>
                </div>
            </div>
         </div>
    </section>
  );
};

export default Section10;
