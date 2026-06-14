import React from "react";
import { Layers, HelpCircle as QuestionIcon, Code, Clipboard } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section3 = () => {
  return (
    <section id="react-components" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Layers size={32} className="text-orange-500" />
        Section 3: Components - The Building Blocks
      </h2>
      <p className="text-slate-400 mb-6">
        Target Keyword: <strong>react components explained 2026</strong>
      </p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Components are the primary structural building blocks of a React application. They allow you to partition the user interface into independent, reusable, and isolated pieces. By conceptualizing the UI as a tree of component nodes, you can compose highly complex applications from simple, self-contained widgets.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Functional vs Class Components</h3>
        <p className="text-slate-300 mb-4">
          Historically, Class components were required to manage state and lifecycle hooks. Since React 16.8 and the introduction of React Hooks, <strong>Functional components</strong> have become the modern industry standard. They are simpler, compile to less boilerplate, and optimize better under compiler systems.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>

        <CodeBlock
          language="jsx"
          filename="FunctionalComponent.jsx"
          code={`// Modern Functional Component syntax
import React from 'react';

const ProfileCard = ({ name, bio }) => {
  return (
    <div className="profile-card">
      <h3>{name}</h3>
      <p>{bio}</p>
    </div>
  );
};

export default ProfileCard;`}
        />

        <CodeBlock
          language="jsx"
          filename="ClassComponent.jsx"
          code={`// Legacy Class Component syntax (kept for reference and interview prep)
import React, { Component } from 'react';

class LegacyProfileCard extends Component {
  render() {
    const { name, bio } = this.props;
    return (
      <div className="profile-card">
        <h3>{name}</h3>
        <p>{bio}</p>
      </div>
    );
  }
}

export default LegacyProfileCard;`}
        />

        <CodeBlock
          language="jsx"
          filename="ComponentComposition.jsx"
          code={`// Composing parents and children
const Header = () => <header><h1>My Dashboard</h1></header>;
const Footer = () => <footer>© 2026</footer>;

const PageLayout = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <p>Main content goes here.</p>
      </main>
      <Footer />
    </div>
  );
};`}
        />

        <CodeBlock
          language="jsx"
          filename="ChildrenProp.jsx"
          code={`// Reusable wrapper using the 'children' prop
const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

// Usage:
// <Modal isOpen={true}>
//   <h2>Login</h2>
//   <input type="text" placeholder="Username" />
// </Modal>`}
        />

        <CodeBlock
          language="jsx"
          filename="Fragments.jsx"
          code={`// Fragment usage to return adjacent elements without wrapper div
const TableRow = () => {
  return (
    <React.Fragment>
      <td>Name</td>
      <td>Email</td>
    </React.Fragment>
  );
};

// Short syntax:
const ShortTableRow = () => {
  return (
    <>
      <td>Name</td>
      <td>Email</td>
    </>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 3 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is the difference between a functional and a class component?",
              a: "Functional components are plain JavaScript functions that accept props as arguments and return JSX. Class components are ES6 classes that extend React.Component, requiring a render() method and managing state via this.state. Functional components are preferred due to Hooks, shorter syntax, and better performance."
            },
            {
              q: "2. Why are functional components preferred in 2026?",
              a: "Functional components are cleaner, require less boilerplate, and facilitate code sharing via custom Hooks. With React 19's compiler, functional code can be automatically optimized, which is much harder to achieve with Class components due to complex lexical binding."
            },
            {
              q: "3. What are the JSX syntax rules? What are common mistakes?",
              a: "JSX rules: (1) must return a single root element or Fragment, (2) tags must be explicitly closed, (3) JavaScript values in JSX must be wrapped in curly braces {}, and (4) HTML attributes must use camelCase (e.g., class becomes className, onclick becomes onClick). Common mistakes include leaving elements unclosed or returning multiple root-level sibling nodes."
            },
            {
              q: "4. What is a Fragment and why use it instead of a wrapper <div>?",
              a: "A Fragment (<React.Fragment> or <></>) wraps multiple adjacent sibling elements without adding an extra node to the real DOM. This maintains correct HTML structure (crucial for grid, flexbox, or tables) and keeps the DOM tree shallow."
            },
            {
              q: "5. What is the children prop and how is it used?",
              a: "The children prop is a special prop passed automatically to every component. It contains whatever JSX is written between the component's opening and closing tags. It enables container components to render dynamic child content (composition)."
            },
            {
              q: "6. Can a React component return null? When would you do this?",
              a: "Yes, a component can return null. React will render nothing in its place. This is used for conditional rendering, such as hiding overlays, modals, banners, or tooltips when their display conditions are not met."
            },
            {
              q: "7. What is component composition and why is it preferred over inheritance?",
              a: "Component composition is the practice of building components by nesting other components or using children. React's official model recommends composition because it provides maximum flexibility. Component inheritance creates deep hierarchies that make code sharing rigid and fragile."
            },
            {
              q: "8. How do you name React components and why does casing matter?",
              a: "React components must be named in PascalCase (e.g., UserCard, Sidebar). This casing is critical because React uses it to distinguish custom components from built-in HTML tags (which are written in lowercase, e.g., <div>, <span>)."
            },
            {
              q: "9. What happens if you return multiple elements without a wrapper in JSX?",
              a: "It will throw a syntax compilation error. The JSX compiler converts tags into React.createElement() calls. A function cannot return multiple separate function calls at the top level, so they must be enclosed within a single parent node or Fragment."
            },
            {
              q: "10. What is the difference between a component and an element in React?",
              a: "A React element is a plain JavaScript object describing what you want to see on screen (returned by React.createElement()). A React component is a function or class that optionally accepts input (props) and returns a React element tree."
            },
            {
              q: "11. What does 'lifting state up' mean?",
              a: "'Lifting state up' is the practice of moving state variables to the closest common ancestor of components that need to share that data. This allows parent components to control child states via props."
            },
            {
              q: "12. What is the difference between controlled and uncontrolled components?",
              a: "Controlled components have their form data managed by React state, synced via value and onChange props. Uncontrolled components store their form data directly in the DOM, accessed when needed using Refs."
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

export default Section3;
