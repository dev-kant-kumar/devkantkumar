import { ArrowLeftRight, Briefcase } from 'lucide-react';
import { CodeBlock } from './Shared';

const Section11 = () => {
  return (
    <section id="case-studies" className="mb-20 scroll-mt-20">
         <h2 className="text-3xl font-bold text-white mb-8">Case Studies & Migration</h2>

         {/* Migration Strategies */}
         <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                <ArrowLeftRight size={24} /> Migration Strategies
            </h3>

            <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-white mb-2">Redux → Zustand</h4>
                <p className="text-slate-300 mb-4">Migrate if you want to reduce boilerplate and don't need Time Travel.</p>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                        <span className="text-slate-400 text-sm font-mono block mb-1">Step 1: Install</span>
                        <code className="text-emerald-400">npm install zustand</code>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                        <span className="text-slate-400 text-sm font-mono block mb-1">Step 2: Create Store</span>
                        <p className="text-sm text-slate-300">Create a Zustand store for ONE slice of your Redux state.</p>
                    </div>
                </div>
            </div>

             <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6">
                <h4 className="font-bold text-white mb-2">Fetch → React Query</h4>
                <p className="text-slate-300 mb-4">Migrate to get caching and auto-refetching.</p>
                <CodeBlock
                    language="javascript"
                    code={`// Old: Manual fetch + useState
useEffect(() => {
  fetch('/api/users').then(r => r.json()).then(setUsers);
}, []);

// New: React Query
const { data: users } = useQuery(['users'], () =>
  fetch('/api/users').then(r => r.json())
);`}
                />
            </div>
         </div>

         {/* Real World Case Studies */}
         <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
                <Briefcase size={24} /> Real-World Case Studies
            </h3>

            <div className="space-y-6">
                <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                    <h4 className="text-xl font-bold text-white mb-2">1. E-Commerce App (Medium)</h4>
                    <p className="text-sm text-slate-300 mb-4">Requirements: Product catalog, cart, auth.</p>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-900 p-3 rounded border border-slate-800">
                            <strong className="text-emerald-400 block mb-1">React Query</strong>
                            Products, Orders, Inventory
                        </div>
                        <div className="bg-slate-900 p-3 rounded border border-slate-800">
                            <strong className="text-indigo-400 block mb-1">Zustand</strong>
                            Shopping Cart (Client State)
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                    <h4 className="text-xl font-bold text-white mb-2">2. Enterprise SaaS (High Complexity)</h4>
                    <p className="text-sm text-slate-300 mb-4">Requirements: 50+ screens, audit logging, huge team.</p>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800 text-sm">
                        <strong className="text-purple-400 block mb-1">Redux Toolkit</strong>
                        <p className="text-slate-400">Enforced structure, middleware for logs, DevTools for debugging complex flows.</p>
                    </div>
                </div>
            </div>
         </div>
    </section>
  );
};

export default Section11;
