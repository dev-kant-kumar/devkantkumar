import { Layers } from 'lucide-react';
import { InfoBox, QuestionItem, SectionHeader } from './SharedComponents';

const Section2 = () => {
  return (
    <section>
      <SectionHeader
        number="02"
        title="Functions & Scope"
        icon={Layers}
        subtitle="The Heart of JS"
      />

      {/* -------------------------------------------------------------------------
          QUESTION 6: CLOSURES
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Deep Dive: What is a Closure? Why is it powerful?"
        answer={
          <>
            <p className="mb-4">
               A <strong>Closure</strong> is created when a function is defined inside another function, allowing the inner function to access the outer function's variables—even after the outer function has finished executing.
            </p>

            <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 mb-6">
                <h4 className="text-purple-400 font-bold mb-4 uppercase tracking-wider text-xs">Core Concept</h4>
                <div className="grid md:grid-cols-2 gap-8">
                     <div>
                        <strong className="text-white block mb-2">Lexical Scope</strong>
                        <p className="text-sm text-slate-400">
                            Inner functions contain the scope of parent functions even if the parent has returned.
                        </p>
                     </div>
                     <div>
                        <strong className="text-white block mb-2">Data Privacy</strong>
                        <p className="text-sm text-slate-400">
                            Closures are often used to emulate private variables (Module Pattern).
                        </p>
                     </div>
                </div>
            </div>

            <InfoBox type="tip" title="Interview Analogy">
                Think of a closure like a <strong>backpack</strong>. When a function leaves the scope where it was created, it takes a "backpack" of variables from that scope with it.
            </InfoBox>
          </>
        }
        code={`function outer() {
  const secret = "I am hidden";

  function inner() {
    console.log(secret); // Accessing 'secret' from closure
  }

  return inner;
}

const myFunc = outer(); // outer() finishes execution here.
myFunc(); // logs "I am hidden" (It still remembers!)`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 7: LOOP CLOSURE TRAP
         ------------------------------------------------------------------------- */}
      <QuestionItem
        type="trick"
        question="Output Challenge: The Loop Closure Trap"
        answer={
            <>
                <p className="mb-4">
                    This is a classic interview favorite. It tests your understanding of <code>var</code> (function scope) vs <code>let</code> (block scope) inside loops.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-red-500/20 bg-red-500/5 p-4 rounded-xl">
                        <strong className="text-red-400 block mb-2 text-sm">The Problem (Values are 3, 3, 3)</strong>
                        <p className="text-xs text-slate-400">
                            <code>var i</code> is shared across all iterations. By the time setTimeout runs, the loop has finished and <code>i</code> is 3.
                        </p>
                    </div>
                    <div className="border border-green-500/20 bg-green-500/5 p-4 rounded-xl">
                        <strong className="text-green-400 block mb-2 text-sm">The Fix (Values are 0, 1, 2)</strong>
                         <p className="text-xs text-slate-400">
                            <code>let i</code> creates a new binding (new <code>i</code>) for <strong>each iteration</strong> of the loop.
                        </p>
                    </div>
                </div>
            </>
        }
        code={`// ❌ BAD (Outputs 3, 3, 3)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// ✅ GOOD (Outputs 0, 1, 2) - ES6 Solution
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// 🧠 OLD SCHOOL (IIFE Solution)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 8: CALL / APPLY / BIND
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Explain Call, Apply, and Bind. When to use which?"
        answer={
           <>
             <p className="mb-4">
                These methods allow you to explicitly set the value of <code>this</code> for a function.
             </p>
             <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <strong className="text-cyan-400 block mb-2">Call</strong>
                    <p className="text-xs text-slate-400 mb-2">Invokes function immediately.</p>
                    <p className="text-xs text-slate-500">Args: Comma separated <code>(this, arg1, arg2)</code></p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <strong className="text-cyan-400 block mb-2">Apply</strong>
                     <p className="text-xs text-slate-400 mb-2">Invokes function immediately.</p>
                    <p className="text-xs text-slate-500">Args: Array <code>(this, [arg1, arg2])</code></p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <strong className="text-purple-400 block mb-2">Bind</strong>
                     <p className="text-xs text-slate-400 mb-2"><strong>Returns a new function</strong>.</p>
                    <p className="text-xs text-slate-500">Does not execute immediately. Useful for events.</p>
                </div>
             </div>
           </>
        }
        code={`const person = { name: "Dev" };
function say(greeting) { console.log(greeting + ", " + this.name); }

// Call
say.call(person, "Hello"); // "Hello, Dev"

// Apply
say.apply(person, ["Hi"]); // "Hi, Dev"

// Bind
const sayHello = say.bind(person, "Hola");
sayHello(); // "Hola, Dev"`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 9: CURRYING
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What is Currying? Write a curry function."
        answer={
            <>
                <p className="mb-4">
                    Currying is the process of transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.
                    <code>f(a, b, c)</code> becomes <code>f(a)(b)(c)</code>.
                </p>
                <div className="flex gap-4 mb-4">
                    <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">Functional Programming</div>
                    <div className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">Reusability</div>
                </div>
            </>
        }
        code={`// Regular function
function add(a, b) {
    return a + b;
}

// Curried function
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

// Arrow syntax (cleaner)
const arrowAdd = a => b => a + b;

console.log(curriedAdd(2)(3)); // 5
console.log(arrowAdd(5)(10));  // 15`}
      />

       {/* -------------------------------------------------------------------------
          QUESTION 10: IIFE
         ------------------------------------------------------------------------- */}
       <QuestionItem
        question="What is an IIFE (Immediately Invoked Function Expression)?"
        answer={
           <>
            <p>
                A function that runs as soon as it is defined.
                Before ES6 Modules, this was the primary way to create <strong>module patterns</strong> and avoid polluting the global namespace.
            </p>
           </>
        }
        code={`(function() {
  var privateVar = "I am safe";
  console.log("I run immediately!");
})();

// console.log(privateVar); // ReferenceError`}
      />

    </section>
  );
}

export default Section2;
