import React from 'react';
import { SiJavascript } from '@icons-pack/react-simple-icons';
import { SectionHeader, QuestionItem, InfoBox } from './SharedComponents';

const Section1 = () => {
  return (
    <section>
      <SectionHeader
        number="01"
        title="JavaScript Fundamentals"
        icon={SiJavascript}
        subtitle="The Building Blocks"
      />

      {/* -------------------------------------------------------------------------
          QUESTION 1: DATA TYPES
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What are the data types in JavaScript? Explain each with examples."
        answer={
          <>
             <p className="mb-4">
              JavaScript is a <strong>dynamically typed</strong> language, meaning you don't need to define the type of a variable usually.
              There are <strong>8 standard data types</strong> in the latest ECMAScript standard.
            </p>

            <div className="space-y-6">

              {/* Primitive Types Container */}
              <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                <h4 className="text-cyan-400 font-bold mb-6 uppercase tracking-wider text-sm border-b border-slate-800 pb-2">1. Primitives (Immutable)</h4>

                {/* GRID LAYOUT: 7 Items in 2 Columns - CARD STYLE */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2 text-lg">String</strong>
                    <p className="text-xs text-slate-400 mb-3">Represents textual data.</p>
                    <code className="text-xs text-cyan-300 bg-slate-900 px-2 py-1 rounded block w-max">const name = "Dev";</code>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2 text-lg">Number</strong>
                    <p className="text-xs text-slate-400 mb-3">Integers & floats. (Max: ±2^53 - 1).</p>
                    <code className="text-xs text-cyan-300 bg-slate-900 px-2 py-1 rounded block w-max">let age = 25;</code>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2 text-lg">BigInt (ES11)</strong>
                    <p className="text-xs text-slate-400 mb-3">For large integers &gt; 2^53 - 1. Suffix <code>n</code>.</p>
                    <code className="text-xs text-cyan-300 bg-slate-900 px-2 py-1 rounded block w-max">const big = 900n;</code>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2 text-lg">Boolean</strong>
                    <p className="text-xs text-slate-400 mb-3">Logical entity.</p>
                    <code className="text-xs text-cyan-300 bg-slate-900 px-2 py-1 rounded block w-max">true / false</code>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2 text-lg">Undefined</strong>
                    <p className="text-xs text-slate-400">Variable declared but not assigned.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2 text-lg">Null</strong>
                    <p className="text-xs text-slate-400">Intentional absence of any object value.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors md:col-span-2">
                    <strong className="text-white block mb-2 text-lg">Symbol (ES6)</strong>
                    <p className="text-xs text-slate-400 mb-3">Unique, immutable identifier for object properties.</p>
                    <code className="text-xs text-cyan-300 bg-slate-900 px-2 py-1 rounded block w-max">const id = Symbol('id');</code>
                  </div>
                </div>
              </div>

               {/* Reference Types Container */}
               <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                <h4 className="text-purple-400 font-bold mb-4 uppercase tracking-wider text-sm">2. Non-Primitive (Reference)</h4>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-purple-500/30 transition-colors">
                    <strong className="text-white block mb-2 text-lg">Object</strong>
                    <p className="text-sm text-slate-400 mb-3">
                        Used to store keyed collections of varying data and more complex entities.
                        Includes <strong>Arrays</strong>, <strong>Functions</strong>, <strong>Dates</strong>, etc.
                    </p>
                    <code className="text-xs text-purple-300 bg-slate-950 px-2 py-1 rounded block w-max">const user = &#123; name: "Dev" &#125;;</code>
                </div>
              </div>
            </div>

            <InfoBox type="warning" title="The 'typeof null' Bug">
               Always remember: <code>typeof null</code> returns <code>"object"</code>. This is a historical bug in JavaScript. Correct check: <code>value === null</code>.
            </InfoBox>
          </>
        }
      />

      {/* -------------------------------------------------------------------------
          QUESTION 2: VAR vs LET vs CONST
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Explain var vs let vs const in depth."
        answer={
          <>
            <p className="mb-4">
              Before ES6 (2015), <code>var</code> was the only way to declare variables. <code>let</code> and <code>const</code> were introduced to fix issues with hoisting and scope leakage.
            </p>

            <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
                 {/* VAR */}
                <div className="border border-red-500/20 bg-red-500/5 p-4 rounded-xl">
                    <strong className="text-red-400 block mb-2 text-lg">var</strong>
                    <ul className="space-y-2 text-slate-400 list-disc pl-4 text-xs">
                        <li><strong>Scope:</strong> Function</li>
                        <li><strong>Hoisting:</strong> Yes (undefined)</li>
                        <li><strong>Reassign:</strong> Yes</li>
                        <li><strong>Redeclare:</strong> Yes</li>
                    </ul>
                </div>
                 {/* LET */}
                 <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 rounded-xl">
                    <strong className="text-yellow-400 block mb-2 text-lg">let</strong>
                    <ul className="space-y-2 text-slate-400 list-disc pl-4 text-xs">
                        <li><strong>Scope:</strong> Block <code>&#123;&#125;</code></li>
                        <li><strong>Hoisting:</strong> TDZ*</li>
                        <li><strong>Reassign:</strong> Yes</li>
                        <li><strong>Redeclare:</strong> No</li>
                    </ul>
                </div>
                 {/* CONST */}
                 <div className="border border-green-500/20 bg-green-500/5 p-4 rounded-xl">
                    <strong className="text-green-400 block mb-2 text-lg">const</strong>
                    <ul className="space-y-2 text-slate-400 list-disc pl-4 text-xs">
                        <li><strong>Scope:</strong> Block <code>&#123;&#125;</code></li>
                        <li><strong>Hoisting:</strong> TDZ*</li>
                        <li><strong>Reassign:</strong> No</li>
                        <li><strong>Redeclare:</strong> No</li>
                    </ul>
                </div>
            </div>

            <p className="text-xs text-slate-500 mb-4">
                *TDZ (Temporal Dead Zone): The time between entering the scope and the actual variable declaration.
            </p>
          </>
        }
        code={`// 1. Scope Difference
if (true) {
  var a = 10;
  let b = 20;
}
console.log(a); // 10 (Leaked!)
console.log(b); // ReferenceError

// 2. Hoisting
console.log(x); // undefined
var x = 5;

// console.log(y); // ReferenceError (TDZ)
let y = 5;`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 3: HOISTING
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What is Hoisting? Declaration vs Expression?"
        answer={
           <>
            <p className="mb-2">
                Hoisting moves declarations to the top of the scope.
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <strong className="text-cyan-400 text-sm block mb-1">Function Declaration</strong>
                    <p className="text-xs text-slate-400">Fully hoisted. Can be called before definition.</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <strong className="text-purple-400 text-sm block mb-1">Function Expression</strong>
                    <p className="text-xs text-slate-400">Variable hoisted as undefined. Assignment stays.</p>
                </div>
            </div>
           </>
        }
        code={`greet(); // "Hello!"
function greet() { console.log("Hello!"); }

// sayBi(); // TypeError: sayBi is not a function
var sayBi = function() { console.log("Bye!"); };`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 4: COERCION & EQUALITY
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Explain Type Coercion and Equality (== vs ===)."
        answer={
           <>
             <p className="mb-4">
                <strong>Implicit Coercion</strong> happens when operators convert types automatically.
             </p>

             <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Coercion Examples</h4>
                    <ul className="text-sm space-y-2 font-mono text-slate-300">
                        <li className="flex justify-between bg-slate-900 px-2 py-1 rounded">
                            <span>'2' + 2</span> <span className="text-cyan-400">'22'</span>
                        </li>
                        <li className="flex justify-between bg-slate-900 px-2 py-1 rounded">
                            <span>'2' - 2</span> <span className="text-cyan-400">0</span>
                        </li>
                        <li className="flex justify-between bg-slate-900 px-2 py-1 rounded">
                            <span>true + 1</span> <span className="text-cyan-400">2</span>
                        </li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Equality check</h4>
                     <ul className="text-sm space-y-2 font-mono text-slate-300">
                        <li className="flex justify-between bg-slate-900 px-2 py-1 rounded">
                            <span>0 == false</span> <span className="text-green-400">true</span>
                        </li>
                        <li className="flex justify-between bg-slate-900 px-2 py-1 rounded">
                            <span>0 === false</span> <span className="text-red-400">false</span>
                        </li>
                        <li className="flex justify-between bg-slate-900 px-2 py-1 rounded">
                            <span>null == undefined</span> <span className="text-green-400">true</span>
                        </li>
                    </ul>
                 </div>
             </div>

             <div className="mt-4">
                <InfoBox type="tip" title="Rule of thumb">
                    Always use <code>===</code> (Strict) unless checking for null/undefined specifically.
                </InfoBox>
             </div>
           </>
        }
      />

        {/* -------------------------------------------------------------------------
          QUESTION 5: TRUTHY & FALSY
         ------------------------------------------------------------------------- */}
       <QuestionItem
        question="What are Truthy and Falsy values?"
        answer={
           <>
             <p className="mb-4">
                Values that resolve to <code>true</code> or <code>false</code> in boolean contexts.
             </p>
             <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <strong className="text-red-400 block border-b border-red-500/20 pb-2 mb-2">The 6 Falsy Values</strong>
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 font-mono">
                        <span>false</span>
                        <span>0</span>
                        <span>""</span>
                        <span>null</span>
                        <span>undefined</span>
                        <span>NaN</span>
                    </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                    <strong className="text-green-400 block border-b border-green-500/20 pb-2 mb-2">Truthy Examples</strong>
                     <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 font-mono">
                        <span>[]</span>
                        <span>&#123;&#125;</span>
                        <span>"0"</span>
                        <span>"false"</span>
                        <span>-1</span>
                        <span>Infinity</span>
                    </div>
                </div>
             </div>
           </>
        }
      />



    </section>
  );
}

export default Section1;
