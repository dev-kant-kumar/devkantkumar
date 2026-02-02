import { BookOpen, Star } from 'lucide-react';
import { InfoBox } from './SharedComponents';

const Introduction = () => {
  return (
    <section className="mb-12">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-6">
            <Star size={14} className="text-yellow-400" />
            <span className="text-yellow-300 text-xs font-bold uppercase tracking-wider">Updated for 2026</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          100+ <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">JavaScript</span> Interview Questions
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The definitive guide. From simple data types to complex microtask queues, mastering these 100+ questions will separate you from 90% of candidates.
        </p>

        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img
              src="/images/blog/JavaScriptInterviewQuestions2026.png"
              alt="JavaScript Interview Questions 2026 Cover"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-code:text-cyan-300 prose-strong:text-white">
        <p className="lead text-xl text-slate-300 mb-8">
            Let's be real—JavaScript interviews can be brutal. You think you know the language, then someone asks you to explain the output of a tricky closure loop or <a href="#microtask-queue" className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 transition-colors">how the microtask queue really works</a>.
        </p>

        <p>
           In the world of modern web development, the difference between a junior developer and a senior engineer often comes down to deep theoretical understanding. It's not just about writing code; it's about knowing <em>how</em> the code executes.
        </p>

        <p>
            This isn't just a list of questions copied from a textbook. This is a collection of <strong>real-world questions</strong>, practical scenarios, and "gotchas" that are frequently asked in technical interviews. Whether you're aiming for a role at a top-tier tech company or a fast-paced startup, mastery of these topics is essential.
        </p>

        <InfoBox type="pro" title="How to use this guide" icon={BookOpen}>
            This isn't a list to memorize. It's a curriculum. It is broken down into <strong>Deep Dive</strong> sections for the heavy concepts (Closures, Promises) and a <strong>Rapid Fire</strong> section for quick fact-checking.
        </InfoBox>
      </div>
    </section>
  )
}

export default Introduction;
