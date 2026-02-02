import { AlertTriangle, Archive, Box, Layout, Server, Zap } from 'lucide-react';
import { CodeBlock, InfoBox } from './Shared';

const Section2 = () => {
  return (
    <section id="kitchen-analogy" className="mb-20 scroll-mt-20">
        <h2 className="text-3xl font-bold text-white mb-2">The Kitchen Analogy</h2>
        <p className="text-xl text-indigo-400 mb-8">Making State Management Intuitive</p>

        <div className="prose prose-xl prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            Stop thinking about "global state" vs "local state." Start thinking about <strong className="text-white">WHERE</strong> your data lives and <strong className="text-white">HOW OFTEN</strong> it changes.
          </p>

          <div className="bg-slate-950 p-6 rounded-xl border-2 border-slate-800 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Layout size={120} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Your React App = A Busy Restaurant Kitchen</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 1. The Stove */}
              <div className="p-5 rounded-lg bg-orange-900/10 border border-orange-500/30">
                 <h4 className="font-bold text-orange-300 mb-2 flex items-center gap-2">
                   <Zap size={20} /> 1. The Stove (Local UI State)
                 </h4>
                 <p className="text-sm text-slate-300 mb-3">Component-specific, temporary, ephemeral.</p>
                 <ul className="text-sm text-slate-400 space-y-1 pl-4 list-disc">
                   <li>Form input values</li>
                   <li>Dropdown open/closed</li>
                   <li>Hover states</li>
                 </ul>
                 <p className="mt-3 text-xs font-mono text-orange-200 bg-orange-950/50 p-2 rounded">
                   Tool: useState, useReducer
                 </p>
              </div>

              {/* 2. The Counter */}
              <div className="p-5 rounded-lg bg-indigo-900/10 border border-indigo-500/30">
                 <h4 className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                   <Box size={20} /> 2. The Counter (Shared Client State)
                 </h4>
                 <p className="text-sm text-slate-300 mb-3">Client-side data multiple components need to use.</p>
                 <ul className="text-sm text-slate-400 space-y-1 pl-4 list-disc">
                   <li>Shopping cart</li>
                   <li>Notification queue</li>
                   <li>Multi-step form data</li>
                 </ul>
                 <p className="mt-3 text-xs font-mono text-indigo-200 bg-indigo-950/50 p-2 rounded">
                   Tool: Zustand, Redux Toolkit
                 </p>
              </div>

              {/* 3. The Fridge */}
              <div className="p-5 rounded-lg bg-emerald-900/10 border border-emerald-500/30">
                 <h4 className="font-bold text-emerald-300 mb-2 flex items-center gap-2">
                   <Server size={20} /> 3. The Fridge (Server State)
                 </h4>
                 <p className="text-sm text-slate-300 mb-3">Data that originates on a server/API.</p>
                 <ul className="text-sm text-slate-400 space-y-1 pl-4 list-disc">
                   <li>Product listings</li>
                   <li>User profiles</li>
                   <li>Search results</li>
                 </ul>
                 <p className="mt-3 text-xs font-mono text-emerald-200 bg-emerald-950/50 p-2 rounded">
                   Tool: TanStack Query
                 </p>
              </div>

              {/* 4. The Pantry */}
              <div className="p-5 rounded-lg bg-slate-800/50 border border-slate-700">
                 <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2">
                   <Archive size={20} /> 4. The Pantry (Environment)
                 </h4>
                 <p className="text-sm text-slate-300 mb-3">Rarely-changing, app-wide settings.</p>
                 <ul className="text-sm text-slate-400 space-y-1 pl-4 list-disc">
                   <li>Theme (light/dark)</li>
                   <li>Locale/language</li>
                   <li>Feature flags</li>
                 </ul>
                 <p className="mt-3 text-xs font-mono text-slate-200 bg-slate-900/50 p-2 rounded">
                   Tool: React Context API
                 </p>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-bold text-white mt-8 mb-4">1. The Stove (Local UI State)</h4>
          <p className="text-slate-300">
            It's hot, immediate, and specific to what you're cooking RIGHT NOW. You don't put a frying pan in the fridge. Similarly, don't put temporary UI state in Redux.
          </p>

          <CodeBlock
            language="jsx"
            filename="components/SearchBar.jsx"
            code={`// Perfect use of local state
function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}`}
          />

          <h4 className="text-xl font-bold text-white mt-8 mb-4">3. The Fridge (Server State)</h4>
          <p className="text-slate-300">
            Data from the API is different. It can go stale (someone else updated it). It needs loading states. It needs error handling.
            <strong className="block mt-2 text-white">The Big Mistake: "Most apps treat server data as regular state. This is wrong."</strong>
          </p>

          <InfoBox type="warning" title="The Kitchen Rule" icon={AlertTriangle}>
            <p className="italic font-medium text-slate-200">
              "If you're trying to cook on the stove, while reaching into the fridge every second, while someone's reorganizing the counter—you're going to burn something. Separate your zones."
            </p>
          </InfoBox>

        </div>
    </section>
  );
};

export default Section2;
