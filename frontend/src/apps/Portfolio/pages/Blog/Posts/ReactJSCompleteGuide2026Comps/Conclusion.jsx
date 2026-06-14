import React from "react";
import { CheckCircle2 } from "lucide-react";

const Conclusion = () => {
  return (
    <section id="conclusion" className="mb-16 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Mastering React in 2026 is about understanding how components render, how data flows, and where application state belongs. By focusing on the core fundamentals-clean components, proper state placement, and effective side-effect management-you lay the foundation for web and mobile development excellence.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Whether you are preparing for technical interviews, refactoring legacy class components, or initializing a greenfield project with React 19, keep these principles close. Keep coding, keep experimenting, and remember: composition always wins.
        </p>
        <div className="p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex gap-4 items-center">
          <CheckCircle2 size={32} className="text-orange-500 flex-shrink-0" />
          <p className="text-slate-200 font-semibold m-0">
            You've completed the guide! Go build something great.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Conclusion;