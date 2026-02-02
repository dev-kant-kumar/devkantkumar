import { ArrowRight } from 'lucide-react';
import { CodeBlock } from './Shared';

const Section4 = () => {
  return (
    <section id="decision-tree" className="mb-20 scroll-mt-20">
         <h2 className="text-3xl font-bold text-white mb-2">The Decision Tree</h2>
         <p className="text-xl text-emerald-400 mb-8">Visual, Interactive Decision Framework</p>

         <div className="prose prose-xl prose-invert max-w-none">
           <p className="text-lg text-slate-300 leading-relaxed mb-6">
             The question isn't "which library is best?" but <strong className="text-white">"what kind of data am I managing?"</strong>
           </p>

           <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 mb-10 overflow-x-auto">
             <h3 className="text-2xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">
               State Management Decision Flowchart
             </h3>

             <div className="flex flex-col items-center gap-6 min-w-[600px]">
               {/* Step 1 */}
               <div className="p-4 rounded-lg bg-slate-800 border border-slate-600 w-full max-w-lg text-center font-bold text-white">
                 1. Is this data from an API / Database?
               </div>
               <div className="flex gap-32 relative">
                 <span className="text-emerald-400 font-bold absolute left-1/4 -top-4">YES</span>
                 <span className="text-red-400 font-bold absolute right-1/4 -top-4">NO</span>
                 <ArrowRight className="rotate-90 text-slate-600 h-8" />
                 <ArrowRight className="rotate-90 text-slate-600 h-8" />
               </div>

               <div className="grid grid-cols-2 gap-12 w-full max-w-2xl">
                 <div className="p-4 rounded-lg bg-emerald-900/30 border border-emerald-500/50 text-center">
                   <h4 className="font-bold text-emerald-300 mb-1">Use TanStack Query</h4>
                   <p className="text-xs text-emerald-200/70">Users, Products, Messages</p>
                 </div>

                 <div className="flex flex-col items-center gap-6">
                    <div className="p-4 rounded-lg bg-slate-800 border border-slate-600 w-full text-center font-bold text-white">
                      2. Shared across multiple components?
                    </div>

                    <div className="grid grid-cols-2 gap-8 w-full">
                       <div className="flex flex-col items-center">
                          <span className="text-red-400 font-bold mb-2">NO</span>
                          <div className="p-3 rounded-lg bg-orange-900/30 border border-orange-500/50 w-full text-center">
                             <h4 className="font-bold text-orange-300 text-sm">useState</h4>
                          </div>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-emerald-400 font-bold mb-2">YES</span>
                          <div className="p-3 rounded-lg bg-slate-800 border border-slate-600 w-full text-center text-sm font-bold text-white">
                             3. Frequency?
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full pl-32">
                       <div className="flex flex-col items-center">
                          <span className="text-purple-300 text-xs mb-1">RARELY</span>
                          <div className="p-2 rounded bg-purple-900/30 border border-purple-500/50 w-full text-center">
                             <span className="text-xs font-bold text-purple-300">Context API</span>
                          </div>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-indigo-300 text-xs mb-1">OFTEN</span>
                          <div className="p-2 rounded bg-indigo-900/30 border border-indigo-500/50 w-full text-center">
                             <span className="text-xs font-bold text-indigo-300">Zustand / Redux</span>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
           </div>

           <h4 className="text-xl font-bold text-white mb-6">Priority Matrix</h4>
           <div className="overflow-x-auto mb-10">
             <table className="w-full text-left text-sm border-collapse">
               <thead>
                 <tr className="bg-slate-800/50 border-b border-slate-700 text-slate-200">
                   <th className="p-4">Data Type</th>
                   <th className="p-4">Update Frequency</th>
                   <th className="p-4">Components</th>
                   <th className="p-4">Recommended Tool</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800 text-slate-400">
                 <tr className="hover:bg-slate-800/20">
                   <td className="p-4 text-white font-medium">Server / API Data</td>
                   <td className="p-4">Any</td>
                   <td className="p-4">Any</td>
                   <td className="p-4 text-emerald-400 font-bold">TanStack Query</td>
                 </tr>
                 <tr className="hover:bg-slate-800/20">
                   <td className="p-4 text-white font-medium">Local UI State</td>
                   <td className="p-4">Any</td>
                   <td className="p-4">1 Component</td>
                   <td className="p-4 text-orange-400 font-bold">useState / useReducer</td>
                 </tr>
                 <tr className="hover:bg-slate-800/20">
                   <td className="p-4 text-white font-medium">Theme / Config</td>
                   <td className="p-4">Rarely (&lt; 1/min)</td>
                   <td className="p-4">Many</td>
                   <td className="p-4 text-purple-400 font-bold">Context API</td>
                 </tr>
                 <tr className="hover:bg-slate-800/20">
                   <td className="p-4 text-white font-medium">Shopping Cart</td>
                   <td className="p-4">Moderate</td>
                   <td className="p-4">Many</td>
                   <td className="p-4 text-indigo-400 font-bold">Zustand</td>
                 </tr>
                 <tr className="hover:bg-slate-800/20">
                   <td className="p-4 text-white font-medium">Enterprise State</td>
                   <td className="p-4">Moderate</td>
                   <td className="p-4">Many (10+)</td>
                   <td className="p-4 text-purple-500 font-bold">Redux Toolkit</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <h4 className="text-xl font-bold text-white mb-4">The Hybrid Approach (2026 Standard)</h4>
           <p className="text-slate-300 mb-4">Most production apps use 2-3 tools, not one. Don't force one tool to do everything.</p>

           <CodeBlock
             language="javascript"
             filename="architecture/store.js"
             code={`// 1. Server data (80% of your "state")
// TanStack Query handles ALL API calls, caching, loading states
const { data: user } = useQuery(['user'], fetchUser);

// 2. Shared client state (15% of your state)
// Zustand handles cart, notifications, global UI
const cart = useCartStore((state) => state.items);

// 3. Environment (5% of your state)
// Context handles theme, auth token, locale
const theme = useContext(ThemeContext);

// 4. Local UI (not really "state management")
// useState handles toggles, form inputs
const [isOpen, setIsOpen] = useState(false);`}
           />

         </div>
    </section>
  );
};

export default Section4;
