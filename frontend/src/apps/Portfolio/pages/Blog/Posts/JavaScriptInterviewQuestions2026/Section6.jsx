import { Zap, Shield, Code, Puzzle } from 'lucide-react';
import { InfoBox, QuestionItem, SectionHeader, CodeSnippet } from './SharedComponents';

const Section6 = () => {
  return (
    <section>
      <SectionHeader
        number="06"
        title="Advanced Concepts"
        icon={Zap}
        subtitle="Senior Level Topics"
      />

      {/* -------------------------------------------------------------------------
          QUESTION 21: DEBOUNCING VS THROTTLING
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Explain Debouncing vs Throttling. When to use each?"
        answer={
           <>
             <p className="mb-4">
                Both techniques <strong>limit the rate</strong> at which a function gets called. They're crucial for performance optimization.
             </p>
             <div className="grid md:grid-cols-2 gap-6 mb-6">
                 <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                     <h4 className="text-cyan-400 font-bold mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                        <Zap size={14} /> Debouncing
                     </h4>
                     <p className="text-sm text-slate-400 mb-3">
                        Waits for a <strong>pause</strong> in events before executing. Perfect for search inputs, auto-save.
                     </p>
                     <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                         <code className="text-xs text-cyan-300">User types: a- b- c- [pause] → Function runs</code>
                     </div>
                 </div>
                 <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                     <h4 className="text-purple-400 font-bold mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                        <Shield size={14} /> Throttling
                     </h4>
                     <p className="text-sm text-slate-400 mb-3">
                        Guarantees execution at most <strong>once per time period</strong>. Ideal for scroll events, button clicks.
                     </p>
                     <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                         <code className="text-xs text-purple-300">User scrolls: ✅- ❌- ❌- ❌- ✅- ❌</code>
                     </div>
                 </div>
             </div>
           </>
        }
        code={`// Debounce Implementation
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle Implementation
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce(handleSearch, 300));`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 22: MEMOIZATION
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What is Memoization? Implement a memoize function."
        answer={
           <>
             <p className="mb-4">
                Memoization is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again.
             </p>
             <div className="flex gap-4 mb-4">
                 <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">Performance</div>
                 <div className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">Cache</div>
                 <div className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full border border-purple-500/20">Pure Functions</div>
             </div>
             <InfoBox type="tip" title="When to Memoize">
                 Use memoization for <strong>pure functions</strong> with expensive calculations that are called repeatedly with the same arguments.
             </InfoBox>
           </>
        }
        code={`// Basic Memoization Function
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Returning from cache:', key);
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    console.log('Computing and caching:', key);
    return result;
  };
}

// Example: Expensive Fibonacci
const fib = memoize(n => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(10)); // Fast after first call`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 23: DESIGN PATTERNS
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Explain common JavaScript Design Patterns."
        answer={
           <>
             <p className="mb-4">
                Design patterns are reusable solutions to commonly occurring problems. In JavaScript interviews, knowing these shows you understand software architecture.
             </p>
             <div className="space-y-4">
                 <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                     <h4 className="text-green-400 font-bold mb-3 uppercase tracking-wider text-xs flex items-center gap-2">
                        <Puzzle size={14} /> Module Pattern
                     </h4>
                     <p className="text-sm text-slate-400 mb-2">
                        Encapsulates private data and exposes public API using closures and IIFE.
                     </p>
                     <CodeSnippet language="javascript" code={`const Module = (function() {
  let privateVar = 'secret';
  
  return {
    getPrivate: () => privateVar,
    setPrivate: (val) => privateVar = val
  };
})();`} />
                 </div>

                 <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                     <h4 className="text-cyan-400 font-bold mb-3 uppercase tracking-wider text-xs flex items-center gap-2">
                        <Code size={14} /> Observer Pattern
                     </h4>
                     <p className="text-sm text-slate-400 mb-2">
                        Defines a one-to-many dependency between objects. When one object changes state, all dependents are notified.
                     </p>
                     <CodeSnippet language="javascript" code={`class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  notify(data) {
    this.observers.forEach(obs => obs.update(data));
  }
}`} />
                 </div>

                 <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                     <h4 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider text-xs">Factory Pattern</h4>
                     <p className="text-sm text-slate-400 mb-2">
                        Creates objects without specifying the exact class. Useful for creating similar objects with different configurations.
                     </p>
                     <CodeSnippet language="javascript" code={`class User {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

class UserFactory {
  static createUser(name, type) {
    return new User(name, type);
  }
}`} />
                 </div>
             </div>
           </>
        }
      />

      {/* -------------------------------------------------------------------------
          QUESTION 24: MEMORY LEAKS
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What are common causes of Memory Leaks in JavaScript?"
        answer={
           <>
             <p className="mb-4">
                Memory leaks occur when your application retains references to objects that are no longer needed, preventing garbage collection.
             </p>
             <div className="grid md:grid-cols-2 gap-4 mb-6">
                 <div className="space-y-3">
                     <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                         <strong className="text-red-400 text-sm block mb-1">Global Variables</strong>
                         <code className="text-xs text-red-300 bg-slate-900 px-1 py-0.5 rounded">window.leak = largeObject</code>
                     </div>
                     <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                         <strong className="text-orange-400 text-sm block mb-1">Forgotten Timers</strong>
                         <code className="text-xs text-orange-300 bg-slate-900 px-1 py-0.5 rounded">setInterval without clearInterval</code>
                     </div>
                 </div>
                 <div className="space-y-3">
                     <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                         <strong className="text-yellow-400 text-sm block mb-1">Detached DOM</strong>
                         <code className="text-xs text-yellow-300 bg-slate-900 px-1 py-0.5 rounded">Removed elements with JS references</code>
                     </div>
                     <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                         <strong className="text-amber-400 text-sm block mb-1">Closures</strong>
                         <code className="text-xs text-amber-300 bg-slate-900 px-1 py-0.5 rounded">Outer scope references in callbacks</code>
                     </div>
                 </div>
             </div>
             <InfoBox type="warning" title="React Native Context">
                 In React Native, memory leaks are critical because mobile devices have limited memory. Always cleanup useEffect subscriptions, event listeners, and intervals.
             </InfoBox>
           </>
        }
        code={`// Common Memory Leak Pattern
function createLeak() {
  const largeData = new Array(1000000).fill('data');
  
  // ❌ BAD: Closure keeps largeData alive forever
  setInterval(() => {
    console.log('Running...', largeData.length);
  }, 1000);
}

// ✅ GOOD: Cleanup properly
function createNoLeak() {
  const largeData = new Array(1000000).fill('data');
  
  const timer = setInterval(() => {
    console.log('Running...');
  }, 1000);
  
  // Cleanup function
  return () => {
    clearInterval(timer);
    largeData.length = 0; // Clear large array
  };
}`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 25: EVENT DELEGATION
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="What is Event Delegation and why is it important?"
        answer={
           <>
             <p className="mb-4">
                Event delegation is a technique where instead of adding event listeners to multiple child elements, you add a single listener to a parent element and use event bubbling to handle events.
             </p>
             <div className="grid md:grid-cols-2 gap-6 mb-6">
                 <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                     <h4 className="text-red-400 font-bold mb-2">❌ Without Delegation</h4>
                     <ul className="text-xs text-slate-400 space-y-1">
                         <li>• 100 buttons = 100 event listeners</li>
                         <li>• Higher memory usage</li>
                         <li>• Dynamic elements need new listeners</li>
                     </ul>
                 </div>
                 <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                     <h4 className="text-green-400 font-bold mb-2">✅ With Delegation</h4>
                     <ul className="text-xs text-slate-400 space-y-1">
                         <li>• 100 buttons = 1 event listener</li>
                         <li>• Better performance</li>
                         <li>• Works with dynamic elements</li>
                     </ul>
                 </div>
             </div>
           </>
        }
        code={`// ❌ BAD: Individual listeners
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// ✅ GOOD: Event delegation
document.getElementById('container').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    handleClick(e);
  }
});

// React Native Example (FlatList optimization)
<FlatList
  data={items}
  renderItem={({ item }) => <Item data={item} />}
  keyExtractor={item => item.id}
  // FlatList handles event delegation internally
/>`}
      />

    </section>
  );
}

export default Section6;
