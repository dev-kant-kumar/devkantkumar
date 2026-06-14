import React from "react";
import { HelpCircle as QuestionIcon, List } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section9 = () => {
  return (
    <section id="lists-and-keys" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <List size={32} className="text-orange-500" />
        Section 9: Lists and Keys
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react lists and keys</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Rendering lists of data is a core task in modern applications. React uses standard JavaScript array map methods to iterate over arrays and return elements. However, each child element in a list must be given a unique, stable <code>key</code> prop to help React identify adjustments.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="ListRenderingDemo.jsx"
          code={`// Standard list rendering with key and removal actions
const ContactList = () => {
  const [contacts, setContacts] = React.useState([
    { id: 'uid-1', name: 'John Doe', email: 'john@example.com' },
    { id: 'uid-2', name: 'Jane Smith', email: 'jane@example.com' }
  ]);

  const deleteContact = (id) => {
    // Filter array (creates new reference)
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <ul className="divide-y">
      {contacts.map((contact) => (
        // KEY is attached to root tag returned by map loop
        <li key={contact.id} className="py-2 flex justify-between">
          <span>{contact.name} ({contact.email})</span>
          <button onClick={() => deleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 9 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. Why does React require a key prop on list items?",
              a: "React requires a key prop during reconciliation to map virtual elements to DOM nodes. Stable keys allow React to recognize when items are added, deleted, or reordered, avoiding redundant DOM repaints."
            },
            {
              q: "2. What is wrong with using array index as a key?",
              a: "If list items can be reordered, sorted, or removed, using index as a key leads to rendering bugs. React identifies state by key; if keys change index values, local state values (like active inputs) get bound to the wrong UI item."
            },
            {
              q: "3. What makes a good key value?",
              a: "A good key is a unique, stable string identifier that does not change between render passes. Database IDs (UUIDs, auto-incrementing index values from databases) are ideal."
            },
            {
              q: "4. Does the key prop get passed to child components?",
              a: "No. The key is reserved internally by React and is not passed to the child component as a prop. If a child component needs the key's value, you must pass it explicitly under a different prop name."
            },
            {
              q: "5. What happens when keys change between renders?",
              a: "If a key changes, React completely destroys the corresponding DOM node, resets its local state, and recreates a new DOM node. This can be used intentionally to reset form states."
            },
            {
              q: "6. How would you render a list and handle removing an item from it?",
              a: "Map over the array and assign the unique ID as the key. Pass the ID to a removal callback that updates the state array using .filter()."
            },
            {
              q: "7. How do you render a nested/hierarchical list in React?",
              a: "By nesting .map() loops. Ensure the outer loop maps outer items with a unique outer key, and the inner loop maps inner items with a unique inner key."
            },
            {
              q: "8. What is the difference between map() and forEach() for rendering?",
              a: "map() returns a new array containing JSX elements, which React can render. forEach() returns undefined, which renders nothing in React."
            },
            {
              q: "9. How do you handle an empty list gracefully in React?",
              a: "Use a ternary check on list length (e.g., list.length === 0 ? <EmptyState /> : list.map(...)) to display placeholder text when the collection is empty."
            },
            {
              q: "10. How would you implement pagination over a large list?",
              a: "By keeping track of a 'currentPage' state and using array slice methods (e.g., list.slice(start, end)) to only render the subset of items for the active page."
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

export default Section9;