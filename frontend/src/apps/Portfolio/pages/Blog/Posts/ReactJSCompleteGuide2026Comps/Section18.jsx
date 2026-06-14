import React from "react";
import { HelpCircle as QuestionIcon, CheckSquare } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section18 = () => {
  return (
    <section id="react-testing" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <CheckSquare size={32} className="text-orange-500" />
        Section 18: Testing React Components
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react testing tutorial jest 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Testing verifies that UI components match expected behaviors when interacting with users, without breaking features during updates.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="javascript"
          filename="Button.test.js"
          code={`// Standard Vitest/RTL component test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import ClickButton from './ClickButton';

test('renders button and processes click event', async () => {
  const handler = vi.fn();
  render(<ClickButton onClick={handler} label="Submit" />);

  const btn = screen.getByRole('button', { name: /submit/i });
  expect(btn).toBeInTheDocument();

  await userEvent.click(btn);
  expect(handler).toHaveBeenCalledTimes(1);
});`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 18 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is React Testing Library and what philosophy guides it?",
              a: "React Testing Library (RTL) is a component testing utility. Its core philosophy is: 'The more your tests resemble the way your software is used, the more confidence they can give you.' It tests user behavior rather than internal implementation details."
            },
            {
              q: "2. What is the difference between getBy, findBy, and queryBy?",
              a: "getBy: returns matching nodes synchronously, throwing an error if zero or multiple elements are found. queryBy: returns nodes synchronously, returning null if elements don't exist (useful for asserting element absence). findBy: returns a promise that resolves when elements appear in the DOM, useful for async elements."
            },
            {
              q: "3. How do you test asynchronous behavior in RTL?",
              a: "Use async/await with findBy queries (e.g., const item = await screen.findByText('Loaded')), or wrap state checks inside waitfor()."
            },
            {
              q: "4. What is the difference between fireEvent and userEvent?",
              a: "fireEvent dispatches raw DOM events synchronously. userEvent simulates realistic browser interactions (e.g., userEvent.click triggers hover, focus, mouse down, and click events), making it more reliable."
            },
            {
              q: "5. What is Mock Service Worker (MSW) and why is it preferred for API mocking?",
              a: "MSW intercepts requests at the network level using Service Workers. It lets you run tests without mocking window.fetch, keeping code clean and accurate."
            },
            {
              q: "6. What is snapshot testing and when should you avoid it?",
              a: "Snapshot testing compares rendered component markups against stored baselines. Avoid it for active, changing layouts, as minor structural updates invalidate snapshots, causing test noise."
            },
            {
              q: "7. How do you test a component that uses useContext?",
              a: "Wrap the test component in the matching Context.Provider inside render(), passing mock values in the provider value attribute."
            },
            {
              q: "8. How do you test a custom hook?",
              a: "Use the renderHook() utility, which runs the hook inside a test component and returns a 'result' object containing hook returns."
            },
            {
              q: "9. What is the difference between unit, integration, and E2E tests for React?",
              a: "Unit tests test single components or functions. Integration tests test how components communicate. E2E tests test the whole flow from client to server (using tools like Playwright)."
            },
            {
              q: "10. What is Vitest and how does it compare to Jest for React projects?",
              a: "Vitest is a Vite-native test runner. It is faster than Jest because it shares configurations directly with the Vite compiler, whereas Jest requires separate babel configurations."
            },
            {
              q: "11. How do you test error boundaries?",
              a: "By rendering a child component that intentionally throws an error, and asserting that the fallback layout replaces the child components."
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

export default Section18;