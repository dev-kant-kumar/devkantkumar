import { AlertTriangle, Archive } from 'lucide-react';

const Section8 = () => {
  return (
    <section className="mb-8 scroll-mt-20">
       {/* 4.4 Context API */}
       <div className="mb-8">
         <div className="flex items-center gap-4 mb-6">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
             <Archive size={24} className="text-white" />
           </div>
           <h3 className="text-2xl font-bold text-white m-0">4.4 React Context API</h3>
         </div>
         <p className="text-slate-400 font-medium mb-4">The Native Solution</p>
         <p className="text-slate-300 mb-4">
           <strong>When to use:</strong> Theme, Locale, Auth User. Data that rarely changes.
         </p>

         <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
            <h4 className="flex items-center gap-2 font-bold text-red-300 mb-2">
              <AlertTriangle size={18} /> The Performance Problem
            </h4>
            <p className="text-slate-300 text-sm">
              If you put high-frequency data (like a text input) in Context, <strong>EVERY component using that Context will re-render</strong> on every keystroke. This causes massive lag in large apps. Use Context only for things that change once per session.
            </p>
         </div>
       </div>
    </section>
  );
};

export default Section8;
