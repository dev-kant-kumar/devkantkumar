import React from "react";
import { BookOpen, CheckCircle, ChevronRight, Cpu, HelpCircle } from "lucide-react";
import { InfoBox } from "./Shared";

const Introduction = () => {
  return (
    <section id="introduction" className="mb-16 scroll-mt-24">
      <p className="text-2xl text-slate-300 leading-relaxed font-light mb-8">
        "You can't master React Native without first mastering React. This is the guide I wish existed when I started."
      </p>

      <div className="prose prose-xl prose-invert max-w-none">
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          In 2026, React continues to dominate the web development landscape. Powering over 11 million active websites and commanding a 42% adoption rate among professional developers, React's ecosystem is stronger than ever. The release of React 19 has solidified its position by introducing compiler-driven optimizations and native server-side capabilities that eliminate years of boilerplate.
        </p>

        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          As a developer, my own journey with React Native made one thing abundantly clear: <strong>your mobile apps are only as solid as your web fundamentals</strong>. The virtual DOM, state synchronization, component lifecycles, and hook behaviors are identical across both environments. Mastering React isn't just about building web applications; it is the absolute foundation for cross-platform mastery.
        </p>

        <InfoBox type="info" title="Why This Guide Exists" icon={Cpu}>
          This is a zero-fluff, comprehensive resource designed to take you from a Javascript developer to a React expert. Inside, you will find 21 key architectural sections, complete code examples built for React 19/2026, and over 200 interview questions with detailed answers to prepare you for senior roles.
        </InfoBox>

        <h3 className="text-2xl font-bold text-white mb-4">Prerequisites</h3>
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="text-orange-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              <strong>JavaScript ES6+:</strong> Comfort with arrow functions, destructuring, and array methods.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="text-orange-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              <strong>Basic HTML & CSS:</strong> Understanding of semantic layouts and styling paradigms.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="text-orange-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300">
              <strong>Terminal & Node.js:</strong> Familiarity with running package scripts (`npm`, `npx`).
            </span>
          </li>
        </ul>

        <div className="my-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-orange-400" />
            Quick Navigation Index
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {[
              { label: "1. JS Prerequisites", href: "#js-prerequisites" },
              { label: "2. React Fundamentals", href: "#react-fundamentals" },
              { label: "3. React Components", href: "#react-components" },
              { label: "4. React Props", href: "#react-props" },
              { label: "5. React State", href: "#react-state" },
              { label: "6. Hooks Deep Dive", href: "#react-hooks" },
              { label: "7. Event Handling", href: "#react-event-handling" },
              { label: "8. Conditional Rendering", href: "#conditional-rendering" },
              { label: "9. Lists and Keys", href: "#lists-and-keys" },
              { label: "10. Forms in React", href: "#react-forms" },
              { label: "11. Context API", href: "#context-api" },
              { label: "12. State Management", href: "#state-management" },
              { label: "13. React Router", href: "#react-router" },
              { label: "14. Performance Optimization", href: "#react-performance" },
              { label: "15. Custom Hooks", href: "#custom-hooks" },
              { label: "16. React with TypeScript", href: "#react-typescript" },
              { label: "17. React 19 Features", href: "#react-19" },
              { label: "18. Testing Components", href: "#react-testing" },
              { label: "19. React Patterns", href: "#react-patterns" },
              { label: "20. React and APIs", href: "#react-data-fetching" },
              { label: "21. Project Architecture", href: "#react-architecture" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="flex items-center gap-1 text-slate-400 hover:text-orange-400 hover:underline transition-colors"
              >
                <ChevronRight size={14} className="text-orange-500" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
