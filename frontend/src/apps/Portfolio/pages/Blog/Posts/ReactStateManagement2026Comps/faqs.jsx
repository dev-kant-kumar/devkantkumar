import { useState } from 'react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is the best state management library for React in 2026?",
      answer: "There's no single 'best' library - it depends on your data type. Use TanStack Query for server data (API calls), Zustand for shared client state in small-medium apps, Redux Toolkit for enterprise apps with large teams, and React Context for slow-changing configuration like themes."
    },
    {
      question: "Do I need Redux in 2026?",
      answer: "Most apps don't need Redux anymore. Use Redux Toolkit only if you have a large team (5+ developers), complex app (15+ screens), need time-travel debugging, or require strict architectural patterns. For smaller projects, Zustand is simpler and lighter."
    },
    {
      question: "What's the difference between server state and client state?",
      answer: "Server state is data that originates from an API/database (user profiles, products, messages) and can become stale. Client state lives only in the browser (shopping cart, UI toggles, form inputs) and doesn't require syncing with a server. Use React Query for server state, Zustand or useState for client state."
    },
    {
      question: "When should I use Context API vs Zustand?",
      answer: "Use Context for slow-changing data (theme, locale, auth) that updates less than once per minute. Use Zustand for frequently updating data (search queries, real-time metrics, animations) because Context causes all consumers to re-render on every change."
    },
    {
      question: "Is React Query a state management library?",
      answer: "React Query is specifically for server state management - it handles API calls, caching, background refetching, and synchronization. It's not for managing client-side state like shopping carts or UI toggles. Most apps need React Query AND a client state solution like Zustand."
    },
    {
      question: "How do I improve React app performance with state management?",
      answer: "Use selective subscriptions in Zustand (only subscribe to needed data), split React Context into multiple providers, use React Query's stale-while-revalidate strategy, memoize expensive calculations with useMemo, and wrap pure components with React.memo."
    },
    {
      question: "Should I migrate from Redux to Zustand?",
      answer: "Migrate if bundle size is a concern, your team finds Redux too complex, or you don't need advanced debugging features. Don't migrate if you have a large team that benefits from Redux's strict patterns, need Redux DevTools time-travel debugging, or have a working Redux setup."
    },
    {
      question: "How do I prevent unnecessary re-renders in React?",
      answer: "Use Zustand's selective subscriptions, split Context providers by update frequency, memoize components with React.memo, use useMemo for expensive calculations, and avoid storing derived state. Profile with React DevTools to identify problem areas first."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-slate-900 rounded-2xl my-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-200 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Quick answers to common React state management questions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-purple-700 to-pink-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border-b"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-pink-700 transition-colors duration-200"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-100 text-lg pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-pink-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-200 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-blue-600 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="mb-6 text-blue-100">
            Join our community or leave a comment below
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#comments"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Ask in Comments
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
