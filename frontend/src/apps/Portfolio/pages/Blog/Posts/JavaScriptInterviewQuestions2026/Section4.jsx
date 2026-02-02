import { Box, Share2 } from 'lucide-react';
import { InfoBox, QuestionItem, SectionHeader } from './SharedComponents';

const Section4 = () => {
  return (
    <section>
      <SectionHeader
        number="04"
        title="Objects & Prototypes"
        icon={Box}
        subtitle="The Object-Oriented Nature"
      />

      {/* -------------------------------------------------------------------------
          QUESTION 15: PROTOTYPES
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What is the Prototype Chain? Explain Prototypal Inheritance."
        answer={
          <>
            <p className="mb-4">
               JavaScript is <strong>prototype-based</strong>, not class-based (classes are just syntactic sugar).
               Every object has a hidden property <code>[[Prototype]]</code> (accessed via <code>__proto__</code>) that points to another object.
            </p>

            <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 mb-6">
                <h4 className="text-cyan-400 font-bold mb-4 uppercase tracking-wider text-xs">The Chain Lookup</h4>
                <div className="flex flex-col gap-4 relative">
                     {/* Visual Chain */}
                     <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 relative z-10 w-fit">
                        <span className="text-white text-sm font-mono">myArr.map()</span>
                        <span className="ml-2 text-xs text-slate-400"> (Does myArr have it? No.)</span>
                     </div>
                     <div className="w-0.5 h-4 bg-slate-600 ml-6"></div>
                     <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 relative z-10 w-fit">
                        <span className="text-purple-400 text-sm font-mono">Array.prototype</span>
                        <span className="ml-2 text-xs text-slate-400"> (Found it here!)</span>
                     </div>
                     <div className="w-0.5 h-4 bg-slate-600 ml-6"></div>
                     <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 relative z-10 w-fit opacity-50">
                        <span className="text-slate-500 text-sm font-mono">Object.prototype</span>
                        <span className="ml-2 text-xs text-slate-600"> (End of chain is null)</span>
                     </div>
                </div>
            </div>

            <InfoBox type="tip" title="Performance">
                Searching up the prototype chain takes time. Accessing properties that don't exist traverses the entire chain until <code>null</code> is reached.
            </InfoBox>
          </>
        }
        code={`const animal = {
  eats: true,
  walk() { console.log("Animal walk"); }
};

const rabbit = {
  jumps: true,
  __proto__: animal // Inherits from animal
};

rabbit.walk(); // "Animal walk" (Found on prototype)
console.log(rabbit.eats); // true`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 16: THIS KEYWORD
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="How does 'this' work? (The 4 Rules)"
        answer={
           <>
             <p className="mb-6">
                The value of <code>this</code> depends on <strong>how the function is called</strong>, not where it is defined.
             </p>
             <div className="grid md:grid-cols-2 gap-4">

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-blue-500/30 transition-colors">
                    <strong className="text-blue-400 block mb-2 uppercase text-xs tracking-wider">1. Implicit Binding</strong>
                    <p className="text-xs text-slate-400 mb-2">Called with a dot <code>obj.func()</code>.</p>
                    <code className="text-xs text-blue-300 bg-slate-900 px-2 py-1 rounded block w-max">this = obj</code>
                 </div>

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-green-500/30 transition-colors">
                    <strong className="text-green-400 block mb-2 uppercase text-xs tracking-wider">2. Explicit Binding</strong>
                    <p className="text-xs text-slate-400 mb-2">Using <code>call</code>, <code>apply</code>, <code>bind</code>.</p>
                    <code className="text-xs text-green-300 bg-slate-900 px-2 py-1 rounded block w-max">this = argument passed</code>
                 </div>

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-purple-500/30 transition-colors">
                    <strong className="text-purple-400 block mb-2 uppercase text-xs tracking-wider">3. New Binding</strong>
                    <p className="text-xs text-slate-400 mb-2">Called with <code>new</code> keyword.</p>
                    <code className="text-xs text-purple-300 bg-slate-900 px-2 py-1 rounded block w-max">this = new empty object</code>
                 </div>

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-red-500/30 transition-colors">
                    <strong className="text-red-400 block mb-2 uppercase text-xs tracking-wider">4. Default Binding</strong>
                    <p className="text-xs text-slate-400 mb-2">Standalone call <code>func()</code>.</p>
                    <code className="text-xs text-red-300 bg-slate-900 px-2 py-1 rounded block w-max">this = window / undefined</code>
                 </div>

             </div>
             <div className="mt-4 text-xs text-slate-500">
                *Arrow functions don't have their own <code>this</code>. They inherit it from the surrounding (lexical) scope.
             </div>
           </>
        }
      />

      {/* -------------------------------------------------------------------------
          QUESTION 17: DEEP VS SHALLOW COPY
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What is the difference between Shallow Copy and Deep Copy?"
        answer={
           <>
            <p className="mb-4">
                Copying objects in JS can be tricky because simple assignment (<code>=</code>) only copies the <strong>reference</strong>, not the value.
            </p>
            <div className="space-y-4">
                <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <h4 className="flex items-center gap-2 text-white font-bold mb-2">
                        <Share2 size={16} className="text-yellow-400"/> Shallow Copy
                    </h4>
                    <p className="text-sm text-slate-400 mb-2">
                        Copies the top-level properties. Nested objects are still references (shared).
                    </p>
                    <div className="flex gap-2">
                         <span className="px-2 py-1 bg-slate-800 text-xs text-cyan-300 rounded font-mono">...spread</span>
                         <span className="px-2 py-1 bg-slate-800 text-xs text-cyan-300 rounded font-mono">Object.assign</span>
                    </div>
                </div>

                 <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <h4 className="flex items-center gap-2 text-white font-bold mb-2">
                        <Box size={16} className="text-green-400"/> Deep Copy
                    </h4>
                    <p className="text-sm text-slate-400 mb-2">
                        Creates a completely independent clone, including all nested objects.
                    </p>
                    <div className="flex gap-2">
                         <span className="px-2 py-1 bg-slate-800 text-xs text-green-300 rounded font-mono">structuredClone()</span>
                         <span className="px-2 py-1 bg-slate-800 text-xs text-green-300 rounded font-mono">JSON.parse(JSON.stringify())</span>
                    </div>
                </div>
            </div>
           </>
        }
        code={`const original = { fit: "gym", dates: { day: 1 } };

// Shallow Copy
const shallow = { ...original };
shallow.dates.day = 99;
console.log(original.dates.day); // 99 (Affected! 😱)

// Deep Copy
const deep = structuredClone(original);
deep.dates.day = 500;
console.log(original.dates.day); // 99 (Safe! 🛡️)`}
      />

    </section>
  );
}

export default Section4;
