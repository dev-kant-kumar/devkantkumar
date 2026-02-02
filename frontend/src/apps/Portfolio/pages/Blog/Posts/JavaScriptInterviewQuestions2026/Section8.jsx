import { Award, Download, Star, Target } from 'lucide-react';
import { SectionHeader } from './SharedComponents';

const Section8 = () => {
  return (
    <section>
      <SectionHeader
        number="08"
        title="Bonus Materials"
        icon={Award}
        subtitle="Beyond The Interview"
      />

      {/* -------------------------------------------------------------------------
          QUICK REFERENCE CHEAT SHEET
         ------------------------------------------------------------------------- */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Download size={24} className="text-yellow-400" />
          Quick Reference Cheat Sheet
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Data Types Card */}
          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
            <h4 className="text-cyan-400 font-bold mb-4 uppercase tracking-wider text-xs">Data Types</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">Primitives:</span>
                <span className="text-cyan-300">7 types</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">typeof null:</span>
                <span className="text-red-300">"object"</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">Check Array:</span>
                <span className="text-green-300">Array.isArray()</span>
              </div>
            </div>
          </div>

          {/* This Keyword Card */}
          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-colors">
            <h4 className="text-purple-400 font-bold mb-4 uppercase tracking-wider text-xs">This Binding</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">obj.method():</span>
                <span className="text-purple-300">obj</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">call/apply:</span>
                <span className="text-purple-300">first arg</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">new Func():</span>
                <span className="text-purple-300">new object</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">Arrow func:</span>
                <span className="text-purple-300">lexical</span>
              </div>
            </div>
          </div>

          {/* Event Loop Card */}
          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-green-500/30 transition-colors">
            <h4 className="text-green-400 font-bold mb-4 uppercase tracking-wider text-xs">Event Loop</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">Sync First:</span>
                <span className="text-green-300">✓</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">Microtasks:</span>
                <span className="text-yellow-300">Priority</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">Macrotasks:</span>
                <span className="text-blue-300">Later</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-800 rounded">
                <span className="text-slate-400">Rule:</span>
                <span className="text-green-300">All micro → one macro</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* -------------------------------------------------------------------------
          MY PERSONAL INTERVIEW EXPERIENCE
         ------------------------------------------------------------------------- */}


      {/* -------------------------------------------------------------------------
          ACTUAL QUESTIONS I WAS ASKED
         ------------------------------------------------------------------------- */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Award size={24} className="text-purple-400" />
          Common Real World Interview Questions
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <h4 className="text-cyan-400 font-bold mb-4 uppercase tracking-wider text-xs">React Native Focus</h4>
            <ul className="text-slate-300 text-sm space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-cyan-500 mt-1">•</span>
                <div>
                  <strong>"Implement debounce for search input in React Native"</strong>
                  <p className="text-slate-500 text-xs mt-1">They wanted useCallback and optimization discussion</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500 mt-1">•</span>
                <div>
                  <strong>"Why does this useEffect cause infinite re-renders?"</strong>
                  <p className="text-slate-500 text-xs mt-1">Missing dependencies or incorrect closure usage</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <h4 className="text-purple-400 font-bold mb-4 uppercase tracking-wider text-xs">JavaScript Deep Dive</h4>
            <ul className="text-slate-300 text-sm space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <div>
                  <strong>"Write Promise.race() from scratch"</strong>
                  <p className="text-slate-500 text-xs mt-1">Testing Promise understanding and async patterns</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <div>
                  <strong>"Optimize this React component for performance"</strong>
                  <p className="text-slate-500 text-xs mt-1">Memo, useCallback, useMemo in action</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------
          NEXT STEPS & WHAT TO LEARN NEXT
         ------------------------------------------------------------------------- */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Target size={24} className="text-orange-400" />
          What's Next? Your Learning Path
        </h3>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl border border-orange-500/20">
            <h4 className="text-orange-400 font-bold mb-4">Immediate Next Steps (This Week)</h4>
            <ul className="grid md:grid-cols-2 gap-4 text-slate-300 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">1</div>
                <span>Master the Event Loop (draw it daily)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">2</div>
                <span>Practice 10 output questions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">3</div>
                <span>Implement 3 array polyfills</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">4</div>
                <span>Find a study partner</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border border-blue-500/20">
            <h4 className="text-blue-400 font-bold mb-4">Advanced Topics (Next Month)</h4>
            <ul className="grid md:grid-cols-2 gap-4 text-slate-300 text-sm">
              <li className="flex items-center gap-3">
                <Star size={16} className="text-blue-400" />
                <span>React.js Interview Questions</span>
              </li>
              <li className="flex items-center gap-3">
                <Star size={16} className="text-blue-400" />
                <span>React Native Specific Topics</span>
              </li>
              <li className="flex items-center gap-3">
                <Star size={16} className="text-blue-400" />
                <span>TypeScript Advanced Patterns</span>
              </li>
              <li className="flex items-center gap-3">
                <Star size={16} className="text-blue-400" />
                <span>System Design for Mobile Apps</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------
          FINAL WORD OF ENCOURAGEMENT
         ------------------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-8 rounded-xl border border-green-500/20 text-center">
        <h4 className="text-green-400 font-bold text-xl mb-4">You've Got This!</h4>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Remember, every senior developer was once a junior struggling with closures and the event loop.
          The difference isn't talent - it's consistency. Study a little every day, draw concepts,
          explain them to others, and practice relentlessly.
        </p>
        <p className="text-slate-400 text-sm mt-4 italic">
          "The best time to plant a tree was 20 years ago. The second best time is now." - Chinese Proverb
        </p>
      </div>

    </section>
  );
}

export default Section8;
