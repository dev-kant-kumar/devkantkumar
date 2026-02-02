import React from 'react';
import { Rocket } from 'lucide-react';
import { SectionHeader, QuestionItem, CodeSnippet, RapidFireSection } from './SharedComponents';

const Section5 = () => {

  const es6RapidFire = [
      { q: "What are Template Literals?", a: "String literals allowing embedded expressions (`${exp}`), multi-line strings, and string interpolation. Enclosed by backticks." },
      { q: "What is Object Destructuring?", a: "Extracting properties from objects into distinct variables. `const { name } = user;`" },
      { q: "What is Array Destructuring?", a: "Unpacking values from arrays. `const [first, second] = arr;`" },
      { q: "What is the Spread Operator (...)?", a: "Expands an iterable into individual elements. Used for copying arrays/objects or passing args." },
      { q: "What is the Rest Operator (...)?", a: "Collects multiple elements into a single array (e.g., function arguments `(...args)`)." },
      { q: "What are Default Parameters?", a: "Initializing function parameters with default values if no value or `undefined` is passed." },
      { q: "What is `for...of` loop?", a: "Loops over iterable objects (Arrays, Strings, Maps, Sets) delivering values (unlike `for...in` which delivers keys)." },
      { q: "What is a Symbol?", a: "A primitive data type returning a unique, immutable identifier, often used for private object properties." },
      { q: "What is an Iterator?", a: "An object with a `next()` method returning `{ value, done }`." },
      { q: "What is a Generator function?", a: "A function denoted by `function*` that can pause execution (`yield`) and resume later." },
      { q: "What is Optional Chaining (?.)?", a: "Safely accesses nested properties. `obj?.prop` returns `undefined` instead of throwing error if `obj` is nullish." },
      { q: "What is Nullish Coalescing (??)?", a: "Returns the right-side operand when left is `null` or `undefined` (unlike `||` which checks for falsy)." },
  ];

  return (
    <section>
      <SectionHeader
        number="05"
        title="ES6+ Modern Features"
        icon={Rocket}
        subtitle="The Modern Standard"
      />

      {/* -------------------------------------------------------------------------
          QUESTION 18: ES6 CLASSES
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Explain ES6 Classes and how they differ from the prototype method."
        answer={
          <>
            <p className="mb-4">
              Classes in JS are "syntactic sugar" over the existing prototype-based inheritance. They provide a cleaner, more familiar syntax for creating objects and dealing with inheritance.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-cyan-400 font-bold mb-4 uppercase tracking-wider text-xs">Features</h4>
                    <ul className="list-disc pl-4 text-sm text-slate-400 space-y-2">
                        <li><strong>Constructor:</strong> Special method for initialization.</li>
                        <li><strong>Super:</strong> Calls parent constructor/methods.</li>
                        <li><strong>Static:</strong> Methods called on the class, not instances.</li>
                        <li><strong>Getters/Setters:</strong> Encapsulate property access.</li>
                    </ul>
                </div>
                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                     <h4 className="text-purple-400 font-bold mb-4 uppercase tracking-wider text-xs">Under the Hood</h4>
                     <p className="text-sm text-slate-400">
                        <code>class Animal</code> remains a function. <br/>
                        Methods defined in the class are added to <code>Animal.prototype</code>.
                     </p>
                </div>
            </div>
          </>
        }
        code={`class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    super.speak(); // Calls parent speak
    console.log(this.name + ' barks.');
  }
}

const d = new Dog('Rex');
d.speak();
// "Rex makes a noise."
// "Rex barks."`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 19: ES MODULES
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What are ES6 Modules? (Import / Export)"
        answer={
           <>
            <p className="mb-4">
                Modules allow splitting code into separate files. They rely on <code>import</code> and <code>export</code> statements.
                They run in <strong>strict mode</strong> automatically.
            </p>
            <div className="grid md:grid-cols-2 gap-4">

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-green-500/30 transition-colors">
                    <strong className="text-green-400 block mb-2 uppercase text-xs tracking-wider">Named Export</strong>
                    <code className="text-xs text-slate-400 bg-slate-900 px-1 py-0.5 rounded">export const add = ...</code>
                    <p className="text-xs text-slate-500 mt-2">Import with curly braces: <br/><code>import &#123; add &#125; from './math'</code></p>
                 </div>

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-blue-500/30 transition-colors">
                    <strong className="text-blue-400 block mb-2 uppercase text-xs tracking-wider">Default Export</strong>
                    <code className="text-xs text-slate-400 bg-slate-900 px-1 py-0.5 rounded">export default User</code>
                    <p className="text-xs text-slate-500 mt-2">Import without braces, any name: <br/><code>import User from './user'</code></p>
                 </div>

            </div>
           </>
        }
      />

      {/* -------------------------------------------------------------------------
          QUESTION 20: NULLISH COALESCING vs OR
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Difference between ?? (Nullish Coalescing) and || (Logical OR)"
        answer={
           <>
            <p className="mb-4">
               A common bug source. <code>||</code> falls back on <strong>Falsy</strong> (0, "", false), whereas <code>??</code> falls back only on <strong>Nullish</strong> (null, undefined).
            </p>
            <CodeSnippet
                language="javascript"
                code={`const count = 0;

// The PROBLEM with ||
const amount = count || 10;
console.log(amount); // 10 (Oops! 0 is falsy, but valid)

// The FIX with ??
const correctAmount = count ?? 10;
console.log(correctAmount); // 0 (Correct! 0 is not null/undefined)`}
            />
           </>
        }
      />

      <div className="my-8">
           <h3 className="text-xl font-bold text-white mb-6 pl-4 border-l-4 border-cyan-500">More ES6+ Essentials</h3>
           <RapidFireSection questions={es6RapidFire} />
      </div>

    </section>
  );
}

export default Section5;
