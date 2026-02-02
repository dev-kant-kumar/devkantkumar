import { Check, Database } from 'lucide-react';
import { CodeBlock } from './Shared';

const Section5 = () => {
  return (
    <section id="tool-deep-dives" className="mb-20 scroll-mt-20">
         <h2 className="text-3xl font-bold text-white mb-8">Tool Deep-Dives</h2>

         <div className="prose prose-xl prose-invert max-w-none">

           {/* 4.1 TanStack Query */}
           <div className="mb-16">
             <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                 <Database size={24} className="text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white m-0">4.1 TanStack Query (React Query)</h3>
             </div>
             <p className="text-emerald-400 font-medium mb-4">The Server State Champion</p>
             <p className="text-slate-300">
               <strong>When to use:</strong> Anytime you fetch data from an API. Period.
             </p>

             <div className="grid md:grid-cols-2 gap-8 my-8">
                <div>
                  <h4 className="font-bold text-white mb-2">What It Solves:</h4>
                  <ul className="text-sm text-slate-300 space-y-2">
                    <li className="flex gap-2"><Check size={16} className="text-emerald-400 mt-1"/> Caching (fetch once, use everywhere)</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-400 mt-1"/> Background refetching</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-400 mt-1"/> Automatic retries</li>
                    <li className="flex gap-2"><Check size={16} className="text-emerald-400 mt-1"/> Optimistic updates</li>
                  </ul>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-sm font-mono text-slate-300">
                  // One line instead of 50
                  <br/>
                  <span className="text-purple-400">const</span> {'{'} data, isLoading {'}'} = <span className="text-blue-400">useQuery</span>(['products'], fetchProducts);
                </div>
             </div>

             <CodeBlock
               language="javascript"
               filename="components/ProductList.jsx"
               code={`import { useQuery } from '@tanstack/react-query';

function ProductList() {
  // 15 lines of boilerpate replaced by this:
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(res => res.json())
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`}
             />
           </div>
         </div>
    </section>
  );
};

export default Section5;
