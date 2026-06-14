import React from "react";
import { MousePointer, HelpCircle as QuestionIcon } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section7 = () => {
  return (
    <section id="react-event-handling" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <MousePointer size={32} className="text-orange-500" />
        Section 7: Event Handling
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react event handling</strong></p>
      
      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Handling events in React is very similar to handling events on DOM elements, with some key syntactic differences: (1) React events are named using camelCase rather than lowercase, and (2) in JSX, you pass a function reference as the event handler rather than a string.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Synthetic Events</h3>
        <p className="text-slate-300 mb-6">
          React wraps native browser events in a <strong>SyntheticEvent</strong> instance. This wrapper provides cross-browser compatibility by standardizing event behaviors across different rendering engines, while matching the W3C spec.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="EventHandlers.jsx"
          code={`// Standard Event Handlers and parameters
const ButtonGroup = () => {
  const handleClick = (e) => {
    console.log("Button clicked!", e.target);
  };

  const handleCustomClick = (id, e) => {
    console.log("Item ID clicked:", id, "Event:", e);
  };

  return (
    <div className="flex gap-4">
      {/* Simple reference */}
      <button onClick={handleClick}>Click Me</button>

      {/* Passing arguments via inline arrow function */}
      <button onClick={(e) => handleCustomClick(101, e)}>Click 101</button>
    </div>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="ControlledFormSubmit.jsx"
          code={`// Preventing default behaviors in event handlers
const SearchForm = () => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("Submitting query:", query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 7 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What are synthetic events in React?",
              a: "Synthetic events are cross-browser wrappers around the browser's native events. They have the same interface as native events, including stopPropagation() and preventDefault(), but work identically across all platforms."
            },
            {
              q: "2. How do you pass arguments to an event handler in JSX?",
              a: "You can pass arguments by wrapping the handler in an anonymous arrow function, e.g., onClick={(e) => handleClick(id, e)}, or by using function binding, e.g., onClick={handleClick.bind(this, id)}."
            },
            {
              q: "3. What is e.preventDefault() and when would you use it in React?",
              a: "e.preventDefault() is used to stop default browser actions associated with an event. The most common use case is in form onSubmit handlers to prevent the browser from reloading the page during submission."
            },
            {
              q: "4. What is the difference between onClick={handleClick} and onClick={() => handleClick()}?",
              a: "onClick={handleClick} passes the function reference directly, so it is only executed when the click occurs. onClick={() => handleClick()} creates a new anonymous arrow function on every render cycle which then calls handleClick. While visually similar, inline arrow functions can cause performance overhead in rendering loops of critical child components."
            },
            {
              q: "5. How does React's event delegation work under the hood?",
              a: "React does not attach event listeners to individual DOM nodes. Instead, it delegates event listeners to the root element (e.g., #root) in React 17+. When an event bubbles up to the root, React maps it to the appropriate virtual element's handler."
            },
            {
              q: "6. What is e.stopPropagation() and when would you use it?",
              a: "e.stopPropagation() stops an event from bubbling up the DOM tree, preventing parent event handlers from catching the event."
            },
            {
              q: "7. How do you handle keyboard events in React?",
              a: "By attaching handlers like onKeyDown, onKeyUp, or onKeyPress and querying e.key or e.code to determine which key was pressed (e.g., e.key === 'Enter')."
            },
            {
              q: "8. What is the difference between onChange in React vs HTML?",
              a: "In native HTML, change triggers when the element loses focus. In React, onChange triggers immediately on every keystroke, behaving like the native 'input' event."
            },
            {
              q: "9. Why can't you return false to prevent default in React events?",
              a: "Unlike standard HTML event attributes where returning false stops default actions, React requires you to call e.preventDefault() explicitly."
            },
            {
              q: "10. How do you handle events in class components vs functional components?",
              a: "In class components, you bind event handler methods inside the constructor or declare them as arrow properties to preserve 'this'. In functional components, closures preserve lexical variables, eliminating 'this' context bindings."
            },
            {
              q: "11. What is event bubbling and how does React handle it?",
              a: "Event bubbling is the progression of an event from target node up through parent nodes. React handles this using standard capturing and bubbling phases, naming bubbling events like onClick and capture events like onClickCapture."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <h4 className="font-bold text-white text-lg mb-2">{item.q}</h4>
              <p className="text-slate-300 pl-4 border-l border-orange-500/30">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section7;