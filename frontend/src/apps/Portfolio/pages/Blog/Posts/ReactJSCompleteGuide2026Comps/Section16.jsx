import React from "react";
import { HelpCircle as QuestionIcon, Shield } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section16 = () => {
  return (
    <section id="react-typescript" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Shield size={32} className="text-orange-500" />
        Section 16: React with TypeScript
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react typescript tutorial 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          TypeScript provides static type analysis, which prevents runtime bugs and enhances IDE autocompletions in large React codebases.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="tsx"
          filename="TypedProps.tsx"
          code={`// Typing Props and Event handlers in React + TypeScript
import React, { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary';
}

const PrimaryButton: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return <button onClick={onClick} className={\`btn btn-\${variant}\`}>{label}</button>;
};

const InputForm = () => {
  const [val, setVal] = useState<string>(""); // Generics on useState

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  return <input type="text" value={val} onChange={handleChange} />;
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 16 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What are the benefits of using TypeScript with React?",
              a: "Static type-checking catches type mismatches before runtime. It offers rich IDE autocomplete, improves refactoring speed, and serves as self-documenting code."
            },
            {
              q: "2. How do you type props in a React component?",
              a: "By defining an interface or type alias mapping keys to types, and typing the props argument, e.g., const MyComponent = ({ label }: MyProps) => ..."
            },
            {
              q: "3. What is the difference between interface and type for props?",
              a: "Interfaces support declaration merging and are optimized for extension. Types can declare unions (|), intersections (&), and primitive mappings, which are useful for complex props."
            },
            {
              q: "4. How do you type useState when the initial value is null?",
              a: "Pass a union parameter into the useState generic: const [user, setUser] = useState<User | null>(null)."
            },
            {
              q: "5. How do you type an onChange event on an input?",
              a: "Use React.ChangeEvent<HTMLInputElement> for input tags, or React.FormEvent for general forms."
            },
            {
              q: "6. What is React.FC and why do some developers avoid it?",
              a: "React.FC stands for FunctionComponent. Some developers avoid it because it historically included implicit children properties, which was solved in React 18."
            },
            {
              q: "7. How do you type the children prop?",
              a: "Explicitly declare it inside the props interface as React.ReactNode (which supports text, elements, fragments, or arrays)."
            },
            {
              q: "8. What is React.ReactNode vs React.ReactElement?",
              a: "React.ReactElement represents a single JSX node object returned by createElement. React.ReactNode represents any renderable item: elements, fragments, strings, numbers, or arrays."
            },
            {
              q: "9. How do you type a generic reusable component?",
              a: "Declare a generic type variable in the component definition: const List = <T,>({ items }: { items: T[] }) => ..."
            },
            {
              q: "10. How do you type useRef when using it for a DOM element?",
              a: "Initialize it with the DOM node type and null: const inputRef = useRef<HTMLInputElement>(null)."
            },
            {
              q: "11. What is ComponentProps<typeof Component> useful for?",
              a: "It extracts the prop types from an existing React component, letting you reuse them without needing to export the original interface."
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

export default Section16;