import React from "react";
import { HelpCircle as QuestionIcon, RefreshCcw } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section8 = () => {
  return (
    <section id="conditional-rendering" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <RefreshCcw size={32} className="text-orange-500" />
        Section 8: Conditional Rendering
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react conditional rendering</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Conditional rendering in React refers to the practice of showing different parts of the UI depending on state or prop conditions. Because JSX is synthesized into plain JavaScript expressions, standard syntax like if statements, ternaries, and logical operators are fully operational.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="ConditionalPatterns.jsx"
          code={`// Common conditional rendering patterns
const LoadingSpinner = () => <div>Loading...</div>;
const ErrorMessage = ({ error }) => <div>Error: {error}</div>;

const UserPanel = ({ isLoading, error, data }) => {
  // Pattern 1: Early return (ideal for top-level checks)
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return null; // Render nothing

  return (
    <div className="profile">
      <h2>{data.name}</h2>
      {/* Pattern 2: Ternary operator inside JSX */}
      {data.isPremium ? (
        <span className="badge-gold">Premium Member</span>
      ) : (
        <span className="badge-free">Free Account</span>
      )}
      
      {/* Pattern 3: Short-circuit logical AND (&&) */}
      {data.hasNotifications && <span className="dot">●</span>}
    </div>
  );
};`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 8 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What are the different ways to conditionally render in React?",
              a: "Ways: (1) if/else statements (valid outside JSX), (2) ternary operators (condition ? expr1 : expr2), (3) logical AND operator (condition && JSX), (4) early return from the component, and (5) switch/case blocks mapped to helper methods."
            },
            {
              q: "2. What is the danger of using && with falsy values like 0?",
              a: "If the left-hand operand evaluates to 0, JavaScript treats it as falsy and returns the number 0 instead of executing the right-hand operand. React renders numbers directly, meaning the text '0' will be output onto the screen. To prevent this, convert the condition to a boolean explicitly, e.g., array.length > 0 && <List />."
            },
            {
              q: "3. When would you return null from a component?",
              a: "You return null when you want to explicitly hide a component from rendering (e.g., hiding a dialog modal or loading overlay when its display flag is false) without affecting other DOM nodes."
            },
            {
              q: "4. What is the ternary operator pattern for conditional rendering?",
              a: "It is used within JSX to select between two different elements based on a boolean parameter. Example: {isLoggedIn ? <LogoutButton /> : <LoginButton />}."
            },
            {
              q: "5. How do you render different components based on user role?",
              a: "You can map roles to components inside a configuration object or use switch-case statements, returning the correct markup matching the user's role."
            },
            {
              q: "6. How is conditional rendering in React different from v-if in Vue?",
              a: "Vue's v-if is a template directive that compiles down to rendering code. React has no special template directives-it relies on standard JavaScript syntax (ternaries, logic operators, early returns) because JSX compiles directly to normal JS function calls."
            },
            {
              q: "7. What is the 'early return' pattern and why is it cleaner?",
              a: "Early return is writing condition checks at the top of a component function that return JSX immediately (e.g., if (loading) return <Loader />). This prevents deep nesting of nested ternaries inside the main return statement, making the code much easier to read."
            },
            {
              q: "8. How do you handle loading, error, and success states in one component?",
              a: "By checking status values in order (often using early returns) to return the specific views for each status (Loading, Error, and then final Data Layout)."
            },
            {
              q: "9. Can you use a switch statement inside JSX? What's the alternative?",
              a: "You cannot write a switch block directly inside JSX brackets because JSX only accepts JavaScript expressions, not statement blocks. The alternative is to execute the switch inside a helper function or IIFE (Immediately Invoked Function Expression) and call it inside JSX."
            },
            {
              q: "10. How do you conditionally apply CSS classes in React?",
              a: "Using template literals (e.g., className={`box ${active ? 'active' : ''}`}) or library utilities like 'clsx' or 'classnames' for clean class merges."
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

export default Section8;