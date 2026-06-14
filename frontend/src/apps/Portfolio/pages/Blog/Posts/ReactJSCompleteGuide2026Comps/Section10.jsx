import React from "react";
import { HelpCircle as QuestionIcon, CheckSquare } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section10 = () => {
  return (
    <section id="react-forms" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <CheckSquare size={32} className="text-orange-500" />
        Section 10: Forms in React
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react forms controlled uncontrolled</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Form handling in React highlights the split between the DOM's native state management and React's component state. React handles this through two different paradigms: <strong>Controlled components</strong> and <strong>Uncontrolled components</strong>.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="ControlledForm.jsx"
          code={`// Standard Controlled inputs using a unified handler
const RegisterForm = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    subscribed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="username" value={formData.username} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input type="checkbox" name="subscribed" checked={formData.subscribed} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="UncontrolledForm.jsx"
          code={`// Uncontrolled input utilizing useRef
const QuickContact = () => {
  const emailRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Read input directly from the DOM reference
    alert("Email submitted: " + emailRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" ref={emailRef} defaultValue="default@example.com" />
      <button type="submit">Send</button>
    </form>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 10 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is a controlled component in React?",
              a: "A controlled component is an input element whose value is determined and updated by React state. Changes are handled via a callback function (like onChange) which updates the state variable."
            },
            {
              q: "2. What is an uncontrolled component and when would you use one?",
              a: "An uncontrolled component is an input element whose value is managed directly by the DOM. You query it using Refs. They are useful for legacy integrations, simple non-validated fields, or file inputs where browser security forbids programmatic state control."
            },
            {
              q: "3. What is the difference between value and defaultValue on an input?",
              a: "value binds an input directly to state, locking its value (controlled). defaultValue only configures the initial value when the element mounts, allowing the user to type freely without state bindings (uncontrolled)."
            },
            {
              q: "4. How do you handle multiple form inputs with a single state object?",
              a: "By setting the 'name' attribute on each input to match properties in a state object, and writing a generic handler: setState(prev => ({ ...prev, [e.target.name]: e.target.value }))."
            },
            {
              q: "5. How do you prevent default form submission in React?",
              a: "Call e.preventDefault() in the onSubmit handler. This stops browser page refreshes, letting React process validation and API calls."
            },
            {
              q: "6. How do you reset a form in React?",
              a: "For controlled forms, reset the state object back to its initial properties. For uncontrolled forms, invoke formRef.current.reset() directly."
            },
            {
              q: "7. What are the React equivalents for select, textarea, and checkbox?",
              a: "select takes a value prop matching selected option values. textarea takes value as a standard attribute rather than HTML innerText children. checkbox takes a checked boolean prop instead of value."
            },
            {
              q: "8. How would you implement form validation without a library?",
              a: "By maintaining an 'errors' state object. Validate fields in handleSubmit or onChange, populate the errors object with error strings, and render warning messages if errors exist."
            },
            {
              q: "9. Why is React Hook Form preferred over manual form state in production?",
              a: "React Hook Form manages form states in uncontrolled references, drastically reducing re-renders on every keystroke. It provides fast validation, small bundles, and clean syntax."
            },
            {
              q: "10. What is the ref prop used for in forms?",
              a: "The ref prop provides access to raw HTML DOM nodes. It's used to trigger element focus, scroll inputs into view, or read values in uncontrolled forms."
            },
            {
              q: "11. How do you handle file inputs in React?",
              a: "File inputs are always uncontrolled. Keep state references to files using onChange, reading the file list from e.target.files[0] and attaching it to a FormData object for uploads."
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

export default Section10;