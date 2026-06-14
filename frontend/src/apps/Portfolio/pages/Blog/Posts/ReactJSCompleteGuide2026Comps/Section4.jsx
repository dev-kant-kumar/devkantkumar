import React from "react";
import { HelpCircle as QuestionIcon, CornerDownRight, ShieldAlert, Layers } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section4 = () => {
  return (
    <section id="react-props" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <CornerDownRight size={32} className="text-orange-500" />
        Section 4: Props - Passing Data Down
      </h2>
      <p className="text-slate-400 mb-6">
        Target Keyword: <strong>react props explained</strong>
      </p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Props (short for "properties") are read-only inputs passed from a parent component down to a child component. In React's unidirectional data flow model, props represent configuration parameters that customize how children render and behave.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Core Attributes of Props</h3>
        <ul className="list-disc list-inside space-y-2 mb-8 text-slate-300">
          <li><strong>Immutability:</strong> A component must never modify its own props. They are read-only from the child's perspective.</li>
          <li><strong>Data Variety:</strong> You can pass strings, numbers, booleans, arrays, objects, functions, or even entire JSX elements as props.</li>
          <li><strong>Unidirectional Flow:</strong> Data travels strictly downwards, which makes predicting application flow much simpler.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>

        <CodeBlock
          language="jsx"
          filename="PassingProps.jsx"
          code={`// Parent passing dynamic variables and functions to a child
const Dashboard = () => {
  const handleAlert = (msg) => alert(msg);
  
  return (
    <div className="p-8">
      <WelcomeBanner
        username="Dev"
        age={28}
        isAdmin={true}
        tags={['react', 'web']}
        onAlert={handleAlert}
      />
    </div>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="DefaultProps.jsx"
          code={`// Best practice: default props via ES6 destructuring parameters
const WelcomeBanner = ({ username, age = 18, isAdmin = false, onAlert }) => {
  return (
    <div className="banner">
      <h1>Welcome back, {username}!</h1>
      <p>Age: {age} {isAdmin && "(Admin Access)"}</p>
      <button onClick={() => onAlert("Hello from banner")}>Trigger Alert</button>
    </div>
  );
};`}
        />

        <CodeBlock
          language="javascript"
          filename="PropTypesExample.js"
          code={`// Runtime type checking via PropTypes (legacy, preferred is TypeScript)
import PropTypes from 'prop-types';

const UserBadge = ({ label, level }) => {
  return <span className={\`badge-\${level}\`}>{label}</span>;
};

UserBadge.propTypes = {
  label: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['bronze', 'silver', 'gold']).isRequired
};`}
        />

        <CodeBlock
          language="jsx"
          filename="PropDrillingVisual.jsx"
          code={`// Visualizing prop drilling: forwarding props down multiple levels
const TopComponent = () => {
  const [theme] = React.useState("dark");
  return <MiddleComponent theme={theme} />;
};

const MiddleComponent = ({ theme }) => {
  // Theme is unused here, only forwarded
  return <BottomComponent theme={theme} />;
};

const BottomComponent = ({ theme }) => {
  return <div className={\`box theme-\${theme}\`}>Styled Content</div>;
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 4 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What are props in React? Are they mutable?",
              a: "Props (properties) are read-only configuration inputs passed from a parent component to a child. They are immutable. A child component must never modify the props it receives; changing props violates React's pure-function component design."
            },
            {
              q: "2. How is data flow different between props and state?",
              a: "Props represent external configuration data received from a parent, which are read-only and trigger renders when changed by the parent. State represents internal, private, and mutable data managed locally inside the component itself."
            },
            {
              q: "3. What is prop drilling and why is it a problem?",
              a: "Prop drilling is the process of passing props through multiple levels of intermediate components that don't need the data, simply to reach a deeply nested child component. It creates highly coupled, hard-to-maintain components and clutters component APIs."
            },
            {
              q: "4. How do you set default values for props?",
              a: "The modern standard in functional components is to use ES6 default parameter syntax directly in the function signature (e.g., const MyComponent = ({ title = 'Default' }) => ...). Historically, components used MyComponent.defaultProps = {}."
            },
            {
              q: "5. What is PropTypes and when would you use it over TypeScript?",
              a: "PropTypes is a runtime type-checking library. TypeScript performs compile-time static type-checking. TypeScript is generally preferred because it catches errors before run-time without adding bundle overhead. You would use PropTypes if you are maintaining a legacy JavaScript application or building a library that needs runtime validation."
            },
            {
              q: "6. How do you pass a function as a prop and why is this pattern useful?",
              a: "You pass a function by reference (e.g., <Button onClick={handleClick} />). This is useful because it allows a child component to trigger logic inside the parent component, enabling child-to-parent communication."
            },
            {
              q: "7. What is the key prop? Why does React require it in lists?",
              a: "The key prop is a special string attribute you must include when rendering lists of elements. React uses keys during the reconciliation process to identify which items have changed, been added, or been removed, optimizing DOM updates."
            },
            {
              q: "8. What happens when you use index as key in a list?",
              a: "Using the array index as a key can cause rendering errors and state bugs if the list is sorted, filtered, or items are added/deleted. React assumes item identity based on key, so swapping index positions can map local states (like inputs) to the wrong list elements."
            },
            {
              q: "9. Can you modify props inside a component? What happens if you try?",
              a: "No, modifying props directly causes a TypeError in strict mode or causes silent bugs because React will not track the mutation and will not trigger a re-render. Always treat props as read-only constants."
            },
            {
              q: "10. How do you spread props onto a component?",
              a: "You spread props using the JSX spread operator: <Child {...props} />. This passes all key-value pairs of the props object as separate props. Use it carefully, as it can pass redundant or invalid HTML attributes down."
            },
            {
              q: "11. What is the difference between props.children and regular props?",
              a: "Regular props are passed as named attributes (e.g., title='Home'). props.children is a special, automatically populated prop containing the elements nested between the opening and closing tags of the component."
            },
            {
              q: "12. How would you pass data from child to parent in React?",
              a: "You pass data by invoking a callback function received as a prop from the parent. The child calls the function and passes the data as an argument, which the parent then receives and processes (e.g., updating its own state)."
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

export default Section4;
