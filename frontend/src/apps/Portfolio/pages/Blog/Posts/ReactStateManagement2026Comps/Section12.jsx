import { ClipboardCheck, Rocket, TestTube } from 'lucide-react';
import { CodeBlock } from './Shared';

const Section12 = () => {
  return (
    <section id="future-testing" className="mb-20 scroll-mt-20">
         <h2 className="text-3xl font-bold text-white mb-8">Best Practices & The Future</h2>

         {/* Testing */}
         <div className="mb-12">
            <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                <TestTube size={24} /> Testing State
            </h3>

            <CodeBlock
                language="javascript"
                filename="tests/useCounterStore.test.js"
                code={`import { renderHook, act } from '@testing-library/react';

test('increments counter', () => {
  const { result } = renderHook(() => useCounterStore());
  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});`}
            />
         </div>

         {/* Checklist */}
         <div className="mb-12">
            <h3 className="text-2xl font-bold text-lime-400 mb-6 flex items-center gap-2">
                <ClipboardCheck size={24} /> Best Practices Checklist
            </h3>
            <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6">
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-xs text-lime-400">✓</div>
                        <span className="text-slate-300"><strong>Separate by Data Origin:</strong> Server vs Client vs Environment.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-xs text-lime-400">✓</div>
                        <span className="text-slate-300"><strong>Start Simple:</strong> Don't add Redux until you feel the pain of not having it.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-xs text-lime-400">✓</div>
                        <span className="text-slate-300"><strong>Measure:</strong> Profile performance before optimizing.</span>
                    </li>
                </ul>
            </div>
         </div>

         {/* Future Trends */}
         <div>
            <h3 className="text-2xl font-bold text-fuchsia-400 mb-6 flex items-center gap-2">
                <Rocket size={24} /> Future Trends (2026+)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-slate-800/50 border border-slate-700">
                    <h4 className="font-bold text-white mb-2">React Server Components</h4>
                    <p className="text-sm text-slate-300">
                        More state moves to the server. Less client-side state management needed overall as we persist filter state in URLs.
                    </p>
                </div>
                <div className="p-5 rounded-lg bg-slate-800/50 border border-slate-700">
                    <h4 className="font-bold text-white mb-2">Signal-Based State</h4>
                    <p className="text-sm text-slate-300">
                        Fine-grained reactivity (like Solid.js signals) becoming standard for high-performance updates.
                    </p>
                </div>
            </div>
         </div>
    </section>
  );
};

export default Section12;
