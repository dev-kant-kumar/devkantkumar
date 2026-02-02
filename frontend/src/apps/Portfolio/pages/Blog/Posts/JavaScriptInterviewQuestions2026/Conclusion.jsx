import { ArrowRight, BookOpen, Star } from 'lucide-react';
import { InfoBox } from './SharedComponents';

const Conclusion = () => {
  return (
    <section className="mt-20 mb-12">
      {/* -------------------------------------------------------------------------
          MAIN CONCLUSION SECTION
         ------------------------------------------------------------------------- */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 mb-6">
          <Star size={16} className="text-yellow-400" />
          <span className="text-yellow-300 text-sm font-bold uppercase tracking-wider">You Made It!</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Ace Your Interview</span>?
        </h2>

        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
          You've just covered 100+ JavaScript interview questions that differentiate junior developers from senior engineers.
          From fundamental data types to complex event loop mechanics, you now have the knowledge that gets you hired.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-sm">
            8 Complete Sections
          </div>
          <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-sm">
            25+ Code Examples
          </div>
          <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-sm">
            5 Output Challenges
          </div>
          <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-sm">
            Real Experience
          </div>
        </div>
      </div>



      {/* -------------------------------------------------------------------------
          RELATED CONTENT
         ------------------------------------------------------------------------- */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Continue Your Learning Journey</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="group cursor-pointer">
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-colors text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-2xl">
                01
              </div>
              <h4 className="text-white font-bold mb-2">React.js Interview Guide</h4>
              <p className="text-slate-400 text-sm mb-4">
                Hooks, Virtual DOM, Performance, State Management - Everything you need for React interviews.
              </p>
              <div className="text-cyan-400 text-sm font-bold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                Coming Soon <ArrowRight size={16} />
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-colors text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-2xl">
                02
              </div>
              <h4 className="text-white font-bold mb-2">React Native Guide</h4>
              <p className="text-slate-400 text-sm mb-4">
                Native modules, Performance optimization, Platform-specific code - Mobile development mastery.
              </p>
              <div className="text-emerald-400 text-sm font-bold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                In Progress <ArrowRight size={16} />
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-colors text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-2xl">
                03
              </div>
              <h4 className="text-white font-bold mb-2">System Design</h4>
              <p className="text-slate-400 text-sm mb-4">
                Scalability, Database design, Caching, Architecture patterns for senior roles.
              </p>
              <div className="text-purple-400 text-sm font-bold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                Planned <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------
          FINAL MESSAGE
         ------------------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-yellow-400/10 via-amber-500/10 to-orange-500/10 p-8 rounded-2xl border border-yellow-400/20 text-center">
        <BookOpen size={48} className="text-yellow-400 mx-auto mb-4" />
        <h3 className="text-3xl font-black text-white mb-4">
          Your Journey Starts Now
        </h3>
        <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
          Knowledge is useless without application. Practice these concepts, build projects, contribute to open source,
          and most importantly - never stop learning. The tech world waits for no one, but it rewards those who persist.
        </p>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 mb-6">
          <p className="text-slate-400 italic">
            "The expert in anything was once a beginner. The difference is persistence, not talent."
          </p>
        </div>


      </div>

      {/* -------------------------------------------------------------------------
          QUICK FAQ SECTION
         ------------------------------------------------------------------------- */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <h4 className="text-cyan-400 font-bold mb-2">How long should I study?</h4>
            <p className="text-slate-300 text-sm">
              Dedicate 1-2 hours daily for 2-3 weeks. Focus on understanding concepts, not memorizing.
            </p>
          </div>

          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <h4 className="text-cyan-400 font-bold mb-2">Are these questions outdated?</h4>
            <p className="text-slate-300 text-sm">
              Updated for 2026. JavaScript fundamentals don't change much, but I've included ES2021+ features.
            </p>
          </div>

          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <h4 className="text-cyan-400 font-bold mb-2">Can I use this for React interviews?</h4>
            <p className="text-slate-300 text-sm">
              Absolutely! React is built on JavaScript. Understanding these fundamentals is crucial for React interviews.
            </p>
          </div>

          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800">
            <h4 className="text-cyan-400 font-bold mb-2">Where can I practice more?</h4>
            <p className="text-slate-300 text-sm">
              I highly recommend building small projects. Try implementing a debounced search bar or a deep clone function in a real app.
            </p>
          </div>
        </div>
      </div>

      <InfoBox type="pro" title="One Final Word">
        <p className="text-sm text-slate-300">
          Remember, interviews are conversations, not interrogations. Be yourself, show your thought process,
          and don't be afraid to say "I don't know, but here's how I'd figure it out."
          That's what senior developers do every day.
        </p>
      </InfoBox>

    </section>
  );
};

export default Conclusion;
