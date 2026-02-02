import { Box } from 'lucide-react';

const Section7 = () => {
  return (
    <section className="mb-20 scroll-mt-20">
       {/* 4.3 Redux Toolkit */}
       <div className="mb-16">
         <div className="flex items-center gap-4 mb-6">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
             <Box size={24} className="text-white" />
           </div>
           <h3 className="text-2xl font-bold text-white m-0">4.3 Redux Toolkit</h3>
         </div>
         <p className="text-purple-400 font-medium mb-4">The Enterprise Standard</p>
         <p className="text-slate-300">
           <strong>When to use:</strong> Large teams (5+), complex state, need for strict patterns and time-travel debugging.
         </p>

       </div>
    </section>
  );
};

export default Section7;
