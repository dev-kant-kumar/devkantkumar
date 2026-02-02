import { Brain, Trophy, Zap } from 'lucide-react';
import { InfoBox, QuestionItem, SectionHeader } from './SharedComponents';

const Section7 = () => {
  return (
    <section>
      <SectionHeader
        number="07"
        title="Output-Based Challenges"
        icon={Brain}
        subtitle="Test Your Understanding"
      />

      <InfoBox type="warning" title="Pro Tip">
        These questions test your <strong>mental execution</strong> ability. Interviewers use these to see if you understand JavaScript's behavior, not just syntax.
      </InfoBox>

      {/* -------------------------------------------------------------------------
          CHALLENGE 1: THE VAR LOOP TRAP
         ------------------------------------------------------------------------- */}
      <QuestionItem
        type="trick"
        question="🏆 Challenge 1: The Classic Var Loop"
        answer={
          <>
            <p className="mb-4">
              This question has eliminated countless candidates. Test your understanding of <code>var</code> scoping vs <code>let</code> block scoping.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2">What's the Output?</h4>
                <code className="text-xs text-red-300 bg-slate-900 p-2 rounded block">
                  {`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`}
                </code>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <h4 className="text-green-400 font-bold mb-2">Answer & Explanation</h4>
                <p className="text-green-300 font-bold text-lg mb-2">3, 3, 3</p>
                <p className="text-xs text-slate-400">
                  <code>var i</code> is function-scoped and shared across all iterations. By the time setTimeout callbacks run, the loop has finished and <code>i</code> equals 3.
                </p>
              </div>
            </div>
          </>
        }
        code={`// Why this happens:
console.log('Before loop:'); // Before loop starts

for (var i = 0; i < 3; i++) {
  console.log('Iteration:', i); // 0, 1, 2
  setTimeout(() => console.log('Timeout:', i), 100);
}

console.log('After loop:', i); // 3 (loop finished)

// setTimeout callbacks all see the same i = 3

// FIX 1: Use let (ES6)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// FIX 2: IIFE (Old school)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100); // 0, 1, 2
  })(i);
}`}
      />

      {/* -------------------------------------------------------------------------
          CHALLENGE 2: HOISTING CONFUSION
         ------------------------------------------------------------------------- */}
      <QuestionItem
        type="trick"
        question="🏆 Challenge 2: Hoisting Madness"
        answer={
          <>
            <p className="mb-4">
              This tests your understanding of hoisting for variables, function declarations, and function expressions.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2">What's the Output?</h4>
                <code className="text-xs text-red-300 bg-slate-900 p-2 rounded block">
                  {`console.log(a);
console.log(b);
console.log(c);

var a = 1;
let b = 2;
const c = 3;

function d() { return 4; }
var e = function() { return 5; };

console.log(d());
console.log(e());`}
                </code>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <h4 className="text-green-400 font-bold mb-2">Answer & Explanation</h4>
                <p className="text-green-300 font-bold text-xs mb-2">
                  undefined<br/>
                  ReferenceError<br/>
                  ReferenceError<br/>
                  4<br/>
                  TypeError
                </p>
                <p className="text-xs text-slate-400">
                  - <code>var a</code> is hoisted as <code>undefined</code><br/>
                  - <code>let b, const c</code> are in TDZ<br/>
                  - Function <code>d</code> is fully hoisted<br/>
                  - Function expression <code>e</code> is undefined
                </p>
              </div>
            </div>
          </>
        }
        code={`// What JavaScript actually does:
// 1. Variable declarations are hoisted
var a; // undefined
// let b; // TDZ (can't access)
// const c; // TDZ (can't access)

// 2. Function declaration is fully hoisted
function d() { return 4; }
var e; // undefined

// 3. Execution starts
console.log(a); // undefined
// console.log(b); // ReferenceError (TDZ)
// console.log(c); // ReferenceError (TDZ)

a = 1;
b = 2; // TDZ ends here
c = 3; // TDZ ends here

console.log(d()); // 4 (works, function is hoisted)
console.log(e()); // TypeError (e is undefined)
e = function() { return 5; };`}
      />

      {/* -------------------------------------------------------------------------
          CHALLENGE 3: EVENT LOOP ORDER
         ------------------------------------------------------------------------- */}
      <QuestionItem
        type="trick"
        question="🏆 Challenge 3: Event Loop Priority Puzzle"
        answer={
          <>
            <p className="mb-4">
              Test your understanding of the Event Loop, microtasks vs macrotasks, and execution order.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2">What's the Output?</h4>
                <code className="text-xs text-red-300 bg-slate-900 p-2 rounded block">
                  {`console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => console.log('5'), 0);
});

console.log('6');`}
                </code>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <h4 className="text-green-400 font-bold mb-2">Answer & Execution Order</h4>
                <p className="text-green-300 font-bold text-xs mb-2">
                  1, 6, 3, 4, 2, 5
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>🔄 <strong>Sync:</strong> 1, 6 (immediate)</p>
                  <p>📋 <strong>Microtasks:</strong> 3, 4 (Promise resolves)</p>
                  <p>🗂️ <strong>Macrotasks:</strong> 2 (setTimeout)</p>
                  <p>🔄 <strong>New Microtask:</strong> 5 (from Promise in microtask)</p>
                </div>
              </div>
            </div>
          </>
        }
        code={`// Event Loop Breakdown:
// 1. Call Stack: ['1'] → logs 1
console.log('1'); // Sync

// 2. Set up async operations
setTimeout(() => console.log('2'), 0); // Macrotask Queue
Promise.resolve().then(() => console.log('3')); // Microtask Queue

// 3. Call Stack: ['6'] → logs 6  
console.log('6'); // Sync

// 4. Call Stack empty → Process Microtasks first
Promise.resolve().then(() => {
  console.log('4'); // Microtask
  setTimeout(() => console.log('5'), 0); // New Macrotask
});

// 5. Microtasks done → Process one Macrotask
setTimeout(() => console.log('2'), 0); // Logs 2

// 6. Check Microtasks again (none)
// 7. Next Macrotask
setTimeout(() => console.log('5'), 0); // Logs 5`}
      />

      {/* -------------------------------------------------------------------------
          CHALLENGE 4: THIS BINDING MADNESS
         ------------------------------------------------------------------------- */}
      <QuestionItem
        type="trick"
        question="🏆 Challenge 4: The 'this' Keyword Maze"
        answer={
          <>
            <p className="mb-4">
              This tests the 4 rules of <code>this</code> binding and how arrow functions change the game.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2">What's the Output?</h4>
                <code className="text-xs text-red-300 bg-slate-900 p-2 rounded block">
                  {`const obj = {
  name: 'Dev',
  regular: function() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
  nested: {
    name: 'Nested',
    regular: function() {
      console.log(this.name);
    },
    arrow: () => {
      console.log(this.name);
    }
  }
};

const standalone = obj.regular;
obj.regular();
standalone();
obj.arrow();
obj.nested.regular();
obj.nested.arrow();`}
                </code>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <h4 className="text-green-400 font-bold mb-2">Answer & 'this' Analysis</h4>
                <p className="text-green-300 font-bold text-xs mb-2">
                  "Dev"<br/>
                  undefined<br/>
                  undefined<br/>
                  "Nested"<br/>
                  undefined
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>1️⃣ <code>obj.regular()</code> - Implicit: this = obj</p>
                  <p>2️⃣ <code>standalone()</code> - Default: this = undefined (strict mode)</p>
                  <p>3️⃣ <code>obj.arrow()</code> - Arrow: inherits lexical this</p>
                  <p>4️⃣ <code>obj.nested.regular()</code> - Implicit: this = nested</p>
                  <p>5️⃣ <code>obj.nested.arrow()</code> - Arrow: inherits lexical this</p>
                </div>
              </div>
            </div>
          </>
        }
        code={`// 'this' binding breakdown:

// 1. Implicit Binding ✅
obj.regular(); // this = obj → "Dev"

// 2. Default Binding (strict mode)
const standalone = obj.regular;
standalone(); // this = undefined → undefined.name = TypeError

// 3. Arrow Function - No own 'this'
obj.arrow(); // Inherits from global scope → undefined

// 4. Nested Implicit Binding ✅
obj.nested.regular(); // this = obj.nested → "Nested"

// 5. Nested Arrow Function - No own 'this'
obj.nested.arrow(); // Inherits from global scope → undefined

// Arrow functions don't create their own 'this'
// They inherit 'this' from the surrounding scope (lexical scope)`}
      />

      {/* -------------------------------------------------------------------------
          CHALLENGE 5: CLOSURE PUZZLE
         ------------------------------------------------------------------------- */}
      <QuestionItem
        type="trick"
        question="🏆 Challenge 5: Advanced Closure Counter"
        answer={
          <>
            <p className="mb-4">
              This tests closure understanding with functions returning functions that maintain state.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2">What's the Output?</h4>
                <code className="text-xs text-red-300 bg-slate-900 p-2 rounded block">
                  {`function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => count = 0,
    getValue: () => count
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment();
counter1.increment();
counter2.increment();

console.log(counter1.getValue());
console.log(counter2.getValue());

counter1.reset();
console.log(counter1.getValue());
console.log(counter2.getValue());`}
                </code>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <h4 className="text-green-400 font-bold mb-2">Answer & Closure Analysis</h4>
                <p className="text-green-300 font-bold text-xs mb-2">
                  2<br/>
                  1<br/>
                  0<br/>
                  1
                </p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>🧠 Each <code>createCounter()</code> creates independent closure</p>
                  <p>📊 <code>counter1</code> increments to 2</p>
                  <p>📊 <code>counter2</code> increments to 1 (separate from counter1)</p>
                  <p>🔄 <code>counter1.reset()</code> affects only counter1</p>
                  <p>📊 <code>counter2</code> remains at 1</p>
                </div>
              </div>
            </div>
          </>
        }
        code={`// Visualizing the closures:

// counter1 closure:
// count: 0 → 1 → 2
const counter1 = createCounter();
counter1.increment(); // count = 1
counter1.increment(); // count = 2

// counter2 closure (completely separate):
// count: 0 → 1
const counter2 = createCounter();
counter2.increment(); // count = 1

// Each counter maintains its own 'count' variable
// They don't interfere with each other because
// they have separate closure scopes

// Reset only affects counter1's closure
counter1.reset(); // counter1.count = 0
// counter2.count is still 1`}
      />

      <InfoBox type="pro" title="How to Approach Output Questions">
        <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
          <li><strong>Identify the concept</strong> being tested (closures, hoisting, event loop, etc.)</li>
          <li><strong>Mental execution</strong> - trace the code step by step</li>
          <li><strong>Consider edge cases</strong> - what happens with undefined, null, etc.</li>
          <li><strong>Explain the 'why'</strong> - interviewers want your reasoning, not just the answer</li>
        </ol>
      </InfoBox>

    </section>
  );
}

export default Section7;
