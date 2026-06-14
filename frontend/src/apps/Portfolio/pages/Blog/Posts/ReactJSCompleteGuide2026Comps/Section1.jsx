import React from "react";
import { Code, HelpCircle as QuestionIcon, FileCode, CheckCircle } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section1 = () => {
  return (
    <section id="js-prerequisites" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Code size={32} className="text-orange-500" />
        Section 1: JavaScript Prerequisites for React
      </h2>
      <p className="text-slate-400 mb-6">
        Target Keyword: <strong>javascript concepts for react</strong>
      </p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Before diving into React, mastering modern JavaScript (ES6+) is non-negotiable. React is not a new language; it is standard JavaScript syntax augmented with JSX. Under the hood, state updates, component layouts, and side effects rely heavily on language-level features like closures, lexical scoping, asynchronous event loops, and array manipulations.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Core Concepts Covered</h3>
        <ul className="list-disc list-inside space-y-2 mb-8 text-slate-300">
          <li><strong>Arrow Functions & Lexical `this`:</strong> Simplifying event handling and scoping.</li>
          <li><strong>Destructuring & Spread/Rest Operators:</strong> Efficient prop extraction and state copying.</li>
          <li><strong>Template Literals:</strong> Dynamically injecting variables into UI strings.</li>
          <li><strong>Array Methods:</strong> Transforming lists using `.map()`, `.filter()`, and `.reduce()`.</li>
          <li><strong>ES6 Modules:</strong> Component scoping via standard `import` and `export`.</li>
          <li><strong>Promises & Async/Await:</strong> Asynchronous remote data fetching pipelines.</li>
          <li><strong>Optional Chaining & Nullish Coalescing:</strong> Guarding against runtime errors with `?.` and `??`.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>

        <CodeBlock
          language="javascript"
          filename="ArrowFunctions.js"
          code={`// Regular function syntax (requires manual binding in class components)
function clickHandlerRegular() {
  console.log(this); // 'this' depends on invocation context
}

// Arrow function syntax (lexically binds 'this' of parent scope)
const clickHandlerArrow = () => {
  console.log(this); // 'this' is preserved lexically
};`}
        />

        <CodeBlock
          language="jsx"
          filename="DestructuringProps.jsx"
          code={`// Destructuring props directly inside function signature
const UserProfile = ({ username, role = "Developer", status }) => {
  return (
    <div className="p-4 rounded border">
      <h2>{username}</h2>
      <p>Role: {role}</p>
      <span>Status: {status}</span>
    </div>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="ListRendering.jsx"
          code={`// Rendering lists using .map()
const ItemList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};`}
        />

        <CodeBlock
          language="javascript"
          filename="FetchData.js"
          code={`// Asynchronous data fetching with async/await and error handling
const fetchUserData = async (userId, signal) => {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`, { signal });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Fetch failed: ", error);
    }
    throw error;
  }
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 1 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is the difference between var, let, and const?",
              a: "var is function-scoped, hoisted (initialized as undefined), and can be redeclared. let and const are block-scoped, hoisted but kept in the Temporal Dead Zone (TDZ) until evaluation, and cannot be redeclared. const forbids re-assignment of the variable identifier itself, although properties of objects assigned to const can still be mutated."
            },
            {
              q: "2. How does destructuring work and why is it used heavily in React?",
              a: "Destructuring allows unpacking values from arrays or properties from objects into distinct variables. In React, it is heavily used to extract props directly in functional component signatures and to unpack state and state setters returned by the useState hook."
            },
            {
              q: "3. What is the spread operator and how is it used with props?",
              a: "The spread operator (...) spreads the contents of an object or array. In React, it's used to forward all props from a parent component directly to a child component (e.g., <Child {...props} />), though this pattern should be used selectively to avoid passing unneeded attributes."
            },
            {
              q: "4. Explain Promise vs async/await with a fetch example.",
              a: "Promises handle asynchronous actions using callback chaining (.then().catch()). async/await is syntactic sugar over Promises, making async code write and read like synchronous code. It uses try/catch blocks for clean error handling."
            },
            {
              q: "5. What is optional chaining and when would you use it in a React component?",
              a: "Optional chaining (?.) reads nested properties of an object without throwing a ReferenceError if a reference is nullish (null or undefined). You would use it when rendering data from async API responses that might not be fully loaded yet (e.g., user?.address?.street)."
            },
            {
              q: "6. What are arrow functions and how do they handle 'this' differently?",
              a: "Arrow functions do not have their own 'this' binding. They lexically capture the 'this' value of their surrounding execution context. This eliminates the need to call .bind(this) on event handler methods in React class components."
            },
            {
              q: "7. What is the difference between named and default exports?",
              a: "Default exports export a single primary resource from a file (e.g., export default Component) and can be imported under any name without curly braces. Named exports export multiple resources from a single file (e.g., export { ComponentA, ComponentB }) and must be imported using curly braces matching the exact exported name."
            },
            {
              q: "8. What does .map() return and why is it used to render lists?",
              a: ".map() transforms an array by applying a callback function to each item, returning a new array. It is used in React because JSX can render arrays of elements directly, mapping raw data to JSX elements."
            },
            {
              q: "9. How does template literal differ from string concatenation?",
              a: "Template literals use backticks (`) and allow embedded expressions (${expression}) and multi-line strings directly, whereas string concatenation uses '+' which is harder to read and maintain for complex dynamic strings."
            },
            {
              q: "10. What is the nullish coalescing operator (??) and how does it differ from ||?",
              a: "The ?? operator returns the right-hand operand only if the left-hand operand is null or undefined. The logical OR (||) operator returns the right-hand operand for any falsy value (e.g., '', 0, false), which can cause bugs in React when 0 or false are valid UI values."
            },
            {
              q: "11. Explain closures and give an example relevant to React hooks.",
              a: "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment). React hooks like useEffect and useCallback close over variables (props, state) from the render cycle in which they were defined. If dependency arrays are omitted or configured incorrectly, it can lead to 'stale closures' where hooks reference outdated variables."
            },
            {
              q: "12. What is the event loop and why does it matter in React's async patterns?",
              a: "The JavaScript event loop manages asynchronous tasks. It executes code, collects and processes events, and runs queued sub-tasks (macro-tasks like setTimeout and micro-tasks like Promise resolutions). It matters in React because state updates are batched asynchronously, executing after the call stack clears to optimize rendering performance."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <h4 className="font-bold text-white text-lg mb-2 flex items-start gap-2">
                <span>{item.q}</span>
              </h4>
              <p className="text-slate-300 pl-4 border-l border-orange-500/30">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section1;
