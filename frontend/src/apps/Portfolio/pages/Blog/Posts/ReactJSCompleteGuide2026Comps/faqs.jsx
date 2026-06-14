import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Faqs = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqItems = [
    {
      q: "What is the best way to learn React in 2026?",
      a: "Master JavaScript ES6+ first. Then learn core React: Components, Props, State, and Hooks. Build real projects, understand caching with TanStack Query, and learn TypeScript."
    },
    {
      q: "Do I need to learn Redux in 2026?",
      a: "Not initially. Most modern apps use Zustand for lightweight global state, and TanStack Query for server cache. Redux is still used in large enterprises, but it is no longer the default for new projects."
    },
    {
      q: "Is React 19 backward compatible?",
      a: "Yes, mostly. It removes some old deprecated APIs, but standard functional components work fine. The biggest change is automatic ref forwarding and async Actions."
    },
    {
      q: "Should I learn Next.js or React?",
      a: "Learn React fundamentals first. Next.js is a framework built on top of React. Without a solid understanding of components, hooks, and state, Next.js features like Server Components will be confusing."
    }
  ];

  return (
    <section id="faqs" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <HelpCircle size={32} className="text-orange-500" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqItems.map((item, idx) => (
          <div key={idx} className="border border-slate-800 rounded-xl bg-slate-900/30 overflow-hidden">
            <button
              onClick={() => toggle(idx)}
              className="w-full p-5 text-left font-bold text-white hover:bg-slate-800/20 flex justify-between items-center transition-colors"
            >
              <span>{item.q}</span>
              {openIdx === idx ? <ChevronUp size={20} className="text-orange-500" /> : <ChevronDown size={20} className="text-slate-500" />}
            </button>
            {openIdx === idx && (
              <div className="p-5 border-t border-slate-800 text-slate-300 bg-slate-950/20 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;