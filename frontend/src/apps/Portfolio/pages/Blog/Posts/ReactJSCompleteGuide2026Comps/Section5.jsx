import React from "react";
import { HelpCircle as QuestionIcon, Sparkles, RefreshCw } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section5 = () => {
  return (
    <section id="react-state" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Sparkles size={32} className="text-orange-500" />
        Section 5: State - Making Components Dynamic
      </h2>
      <p className="text-slate-400 mb-6">
        Target Keyword: <strong>react state management useState</strong>
      </p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          State is a built-in object that allows React components to store, modify, and track their own local, dynamic data. Unlike props, which are configuration values passed into a component from its parent, state is private, internal, and completely controlled by the component itself.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">The Rule of Immutability</h3>
        <p className="text-slate-300 mb-4">
          React relies on reference changes to detect state mutations and trigger re-renders. If you mutate state directly (e.g., <code>state.value = 10</code>), React cannot notice the change, resulting in frozen UIs. You must always construct new arrays or objects when updating complex states.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>

        <CodeBlock
          language="jsx"
          filename="CounterState.jsx"
          code={`// Counter showing standard useState and functional updates
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Bad if multiple updates are queued: setCount(count + 1);
    // Good: Functional updates guarantee latest prev state
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex gap-4 items-center">
      <span>Count: {count}</span>
      <button onClick={increment}>Add</button>
    </div>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="ToggleBoolean.jsx"
          code={`// Toggling boolean values cleanly
const LightSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <button onClick={() => setIsOn(prev => !prev)}>
      {isOn ? "ON" : "OFF"}
    </button>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="ObjectState.jsx"
          code={`// Correctly updating objects with the spread operator
const UserProfile = () => {
  const [user, setUser] = useState({ name: 'Dev', age: 27 });

  const birthday = () => {
    // WRONG: user.age = user.age + 1; setUser(user); (No reference change)
    // RIGHT: Spread details and overwrite target property
    setUser((prevUser) => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  };

  return <button onClick={birthday}>Age: {user.age}</button>;
};`}
        />

        <CodeBlock
          language="jsx"
          filename="ArrayState.jsx"
          code={`// Correctly modifying arrays
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    // Add item (creates new array)
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const removeTodo = (id) => {
    // Remove item (creates filtered array)
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

  return <button onClick={() => addTodo("Learn State")}>Add Task</button>;
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 5 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is state in React and how is it different from props?",
              a: "State is local, mutable variable data managed internally by a component, used to track dynamic values between renders. Props are read-only configuration attributes passed by a parent to configure the child."
            },
            {
              q: "2. What does useState return?",
              a: "useState returns an array containing exactly two items: (1) the current state value, and (2) an updater function that allows you to change the state and trigger a re-render."
            },
            {
              q: "3. Why are state updates asynchronous in React?",
              a: "React batches multiple state updates together into a single render pass to optimize performance. If state updates were synchronous, updating three state variables consecutively would cause three expensive, redundant visual updates."
            },
            {
              q: "4. What is a functional update in useState and when should you use it?",
              a: "A functional update is passing a callback function to the state updater (e.g., setState(prev => prev + 1)). You should use it whenever your new state depends on the previous state value to prevent bugs caused by async batching."
            },
            {
              q: "5. How do you update a nested object inside state without mutating it?",
              a: "You must deep-copy nested levels using the spread operator or libraries like Immer (e.g., setState(prev => ({ ...prev, profile: { ...prev.profile, age: 30 } }))). Direct mutations will not change the outer reference, so React will not re-render."
            },
            {
              q: "6. Why is immutability important in React state?",
              a: "Immutability allows React to perform cheap shadow reference equality checks (prev === next) to verify if data has changed. If state was mutated directly, comparing references would yield true, making state change detection computationally expensive."
            },
            {
              q: "7. What is derived state and why should you avoid storing it in state?",
              a: "Derived state is data that can be calculated directly from existing props or state (e.g., item count from an array state). Storing it in a separate state creates synchronization bugs. It is best to compute derived values during the render process."
            },
            {
              q: "8. When should you use one state object vs multiple useState calls?",
              a: "Use multiple useState calls when tracking independent variables (e.g., value and loading state). Use a single state object when variables are deeply related and updated together (e.g., username, password form states)."
            },
            {
              q: "9. What is 'lifting state up' and when should you do it?",
              a: "Lifting state up is moving state to a common parent component. You do it when two or more sibling components need to sync or share the same state data."
            },
            {
              q: "10. What happens when you call setState with the same value?",
              a: "React performs an Object.is equality check. If the new state matches the current state, React bails out of rendering the component and its children, preventing redundant renders."
            },
            {
              q: "11. How does React batch state updates?",
              a: "In React 18+, automatic batching consolidates all state updates triggered within event handlers, timeouts, promises, and native events into a single render cycle at the end of the microtask queue."
            },
            {
              q: "12. What is the difference between state and a ref for storing values?",
              a: "Updating state triggers a component re-render, making it ideal for values rendered on the UI. Updating a Ref (useRef) mutates the .current property directly without triggering a re-render, making it ideal for persistent values not shown in the DOM (like timers)."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <h4 className="font-bold text-white text-lg mb-2">
                {item.q}
              </h4>
              <p className="text-slate-300 pl-4 border-l border-orange-500/30">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section5;
