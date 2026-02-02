import { AlertTriangle, Cpu } from 'lucide-react';
import { InfoBox, QuestionItem, SectionHeader } from './SharedComponents';

const Section3 = () => {
  return (
    <section>
      <SectionHeader
        number="03"
        title="Async JS & The Event Loop"
        icon={Cpu}
        subtitle="Mastering Concurrency"
      />

       <InfoBox type="warning" title="Critical Context" icon={AlertTriangle}>
            This is where 50% of candidates fail. You <strong>must</strong> understand that JavaScript is single-threaded but handles async operations via the <strong>Event Loop</strong>.
        </InfoBox>

      {/* -------------------------------------------------------------------------
          QUESTION 11: EVENT LOOP
         ------------------------------------------------------------------------- */}
      <QuestionItem
        id="microtask-queue"
        question="How does the Event Loop actually work? (Microtasks vs Macrotasks)"
        answer={
          <>
            <p className="mb-6">
               The Event Loop is the mechanism that allows JS to perform non-blocking operations. It coordinates the execution of code between the Call Stack and various Queues.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-cyan-400 font-bold mb-4 uppercase tracking-wider text-xs">1. Call Stack</h4>
                    <p className="text-sm text-slate-400">
                        LIFO (Last In, First Out). Where your synchronous code runs.
                    </p>
                </div>
                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                     <h4 className="text-purple-400 font-bold mb-4 uppercase tracking-wider text-xs">2. Web APIs</h4>
                    <p className="text-sm text-slate-400">
                        Where browser handles async things (DOM events, fetch, setTimeout).
                    </p>
                </div>
                 <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                     <h4 className="text-yellow-400 font-bold mb-4 uppercase tracking-wider text-xs">3. Microtask Queue</h4>
                    <p className="text-sm text-slate-400">
                        <strong>High Priority</strong>. Promises (`.then`), `queueMicrotask`, MutationObserver.
                    </p>
                </div>
                 <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
                     <h4 className="text-green-400 font-bold mb-4 uppercase tracking-wider text-xs">4. Task Queue (Macrotask)</h4>
                    <p className="text-sm text-slate-400">
                        <strong>Low Priority</strong>. `setTimeout`, `setInterval`, `setImmediate`.
                    </p>
                </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
                <strong>The Golden Rule:</strong> The Event Loop checks if the Stack is empty. If yes, it runs <em>ALL</em> Microtasks until the queue is clear, and <em>THEN</em> runs just <em>ONE</em> Macrotask.
            </div>
          </>
        }
      />

      {/* -------------------------------------------------------------------------
          QUESTION 12: OUTPUT CHALLENGE
         ------------------------------------------------------------------------- */}
      <QuestionItem
        type="trick"
        question="Output Challenge: Async Priority"
        answer={
           <>
            <p className="mb-4">
                Predict the order of logs. Remember: Sync &gt; Microtask &gt; Macrotask.
            </p>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                    <span className="text-slate-400 font-mono text-sm">1. console.log('1')</span>
                    <span className="text-white font-bold text-xs uppercase bg-slate-700 px-2 py-1 rounded">Sync</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                     <span className="text-slate-400 font-mono text-sm">2. Promise.resolve().then(...)</span>
                    <span className="text-yellow-400 font-bold text-xs uppercase bg-yellow-400/10 px-2 py-1 rounded">Microtask</span>
                </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                     <span className="text-slate-400 font-mono text-sm">3. setTimeout(...)</span>
                    <span className="text-green-400 font-bold text-xs uppercase bg-green-400/10 px-2 py-1 rounded">Macrotask</span>
                </div>
            </div>
           </>
        }
        code={`console.log('1'); // Sync

setTimeout(() => console.log('2'), 0); // Macrotask

Promise.resolve().then(() => console.log('3')); // Microtask

console.log('4'); // Sync

// Output Order:
// 1
// 4
// 3
// 2`}
      />

      {/* -------------------------------------------------------------------------
          QUESTION 13: PROMISE METHODS
         ------------------------------------------------------------------------- */}
      <QuestionItem
        question="Explain Promise.all vs allSettled vs race vs any"
        answer={
           <>
             <p className="mb-6">
                Modern JS provides powerful concurrency methods for handling multiple promises.
             </p>
             <div className="grid md:grid-cols-2 gap-4">

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2">Promise.all()</strong>
                    <p className="text-xs text-slate-400 mb-2">"All or Nothing"</p>
                    <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                        <li>Resolves when <strong>all</strong> resolve.</li>
                        <li>Rejects immediately if <strong>one</strong> rejects.</li>
                    </ul>
                 </div>

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2">Promise.allSettled()</strong>
                    <p className="text-xs text-slate-400 mb-2">"Wait for Everyone"</p>
                    <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                        <li>Waits for all to finish (success or fail).</li>
                        <li>Returns array of objects `{`{ status, value/reason }`}`.</li>
                    </ul>
                 </div>

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2">Promise.race()</strong>
                    <p className="text-xs text-slate-400 mb-2">"First One Wins"</p>
                    <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                        <li>Settles as soon as the <strong>first</strong> promise settles (resolves OR rejects).</li>
                    </ul>
                 </div>

                 <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <strong className="text-white block mb-2">Promise.any() (ES2021)</strong>
                    <p className="text-xs text-slate-400 mb-2">"First Success Wins"</p>
                    <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                        <li>Resolves as soon as the <strong>first</strong> promise fulfills.</li>
                        <li>Rejects only if <strong>all</strong> reject (AggregateError).</li>
                    </ul>
                 </div>

             </div>
           </>
        }
      />

       {/* -------------------------------------------------------------------------
          QUESTION 14: ASYNC / AWAIT
         ------------------------------------------------------------------------- */}
       <QuestionItem
        question="What is Async/Await and how does error handling work?"
        answer={
           <>
            <p className="mb-4">
                <code>async/await</code> is syntactic sugar built on top of Promises. It makes asynchronous code look and behave like synchronous code.
            </p>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <strong className="text-white block mb-2 text-sm">Key Rules</strong>
                <ul className="list-disc pl-4 text-xs text-slate-300 space-y-2">
                    <li>An <code>async</code> function <strong>always</strong> returns a Promise.</li>
                    <li><code>await</code> pauses the execution of its surrounding async function until the Promise settles.</li>
                    <li>It does <strong>not</strong> block the main thread (Call Stack).</li>
                </ul>
            </div>
           </>
        }
        code={`async function fetchData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Oops!", error); // Handles rejection here
  }
}

// Without async/await (Promise Chains)
fetch('/api/user')
  .then(res => res.json())
  .then(data => ...)
  .catch(err => ...)`}
      />

    </section>
  );
}

export default Section3;
