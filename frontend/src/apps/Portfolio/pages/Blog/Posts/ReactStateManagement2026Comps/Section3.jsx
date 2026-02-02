import { Activity, Ban, BookOpen, Box, Server } from 'lucide-react';
import { InfoBox } from './Shared';

const Section3 = () => {
  return (
    <section id="no-library" className="mb-20 scroll-mt-20">
         <h2 className="text-3xl font-bold text-white mb-2">When You DON'T Need a Library</h2>
         <p className="text-xl text-red-400 mb-8">The Overengineering Trap</p>

         <div className="prose prose-xl prose-invert max-w-none">
           <p className="text-lg text-slate-300 leading-relaxed mb-6">
             Here is the dirty secret: <strong className="text-white">Most apps DON'T need Redux, Zustand, or any global state library.</strong>
           </p>

           <div className="grid md:grid-cols-2 gap-6 mb-8">
             <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
               <h4 className="flex items-center gap-2 font-bold text-white mb-4">
                 <Ban size={20} className="text-red-400" />
                 1. Small to Medium Apps
               </h4>
               <p className="text-slate-400 text-sm mb-3">If you have less than 10 screens and a small team.</p>
               <p className="text-slate-300 text-sm">
                 <strong>Solution:</strong> useState + Context API.
                 <br/>
                 <strong>Why:</strong> Adding a library adds bundle size and complexity for minimal benefit.
               </p>
             </div>

             <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
               <h4 className="flex items-center gap-2 font-bold text-white mb-4">
                 <BookOpen size={20} className="text-blue-400" />
                 2. Read-Heavy Apps (Blogs)
               </h4>
               <p className="text-slate-400 text-sm mb-3">Blogs, dashboards, documentation sites.</p>
               <p className="text-slate-300 text-sm">
                 <strong>Solution:</strong> React Query (for data) + minimal local state.
                 <br/>
                 <strong>Why:</strong> You have a data-fetching problem, not a state management problem.
               </p>
             </div>

             <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
               <h4 className="flex items-center gap-2 font-bold text-white mb-4">
                 <Box size={20} className="text-yellow-400" />
                 3. Isolated Features
               </h4>
               <p className="text-slate-400 text-sm mb-3">Each page is self-contained.</p>
               <p className="text-slate-300 text-sm">
                 <strong>Solution:</strong> Keep state local to the page.
                 <br/>
                 <strong>Why:</strong> If components don't share data, you don't need a manager.
               </p>
             </div>

             <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
               <h4 className="flex items-center gap-2 font-bold text-white mb-4">
                 <Server size={20} className="text-purple-400" />
                 4. Server Component Apps
               </h4>
               <p className="text-slate-400 text-sm mb-3">Next.js App Router, Remix.</p>
               <p className="text-slate-300 text-sm">
                 <strong>Solution:</strong> URL state + Server Components.
                 <br/>
                 <strong>Why:</strong> Keeping state in the URL (search params) makes it shareable and persistent.
               </p>
             </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 my-8">
             <h3 className="text-2xl font-bold text-white mb-6 text-center">The "Do I Need It?" Checklist</h3>
             <div className="grid md:grid-cols-2 gap-8">
               <div>
                 <h4 className="font-bold text-emerald-400 mb-4 text-center">You might need a library if:</h4>
                 <ul className="space-y-3">
                   {['10+ screens sharing state', 'Team of 3+ developers', 'Complex data dependencies', 'Need for undo/redo', 'Real-time syncing required'].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-slate-300">
                       <div className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-xs text-emerald-400">✓</div>
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
               <div>
                 <h4 className="font-bold text-slate-400 mb-4 text-center">Stick with React if:</h4>
                 <ul className="space-y-3">
                   {['Small team (1-2 devs)', 'Simple CRUD operations', 'Each page is independent', 'State is mostly UI toggles', 'You just want to "learn Redux"'].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-slate-400">
                       <div className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-xs text-slate-500">✓</div>
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
           </div>

           <div className="border-l-4 border-indigo-500 pl-6 py-2 my-8">
             <p className="text-lg text-slate-300 italic">
               "I spent 2 weeks adding Redux to a project that had 5 components. The entire state could've been managed by useState and props. Don't be me."
               <span className="block text-sm text-slate-500 mt-2 not-italic font-bold">— Every developer, eventually</span>
             </p>
           </div>

           <InfoBox type="tip" title="Cost-Benefit Rule" icon={Activity}>
             Start simple. Add complexity only when the pain of <strong className="text-indigo-400">NOT</strong> having a library exceeds the pain of <strong className="text-indigo-400">learning/maintaining</strong> one.
           </InfoBox>
         </div>
    </section>
  );
};

export default Section3;
