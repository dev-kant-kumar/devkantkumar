import React from "react";
import { ExternalLink, Github, Youtube, Sparkles } from "lucide-react";

const Resources = () => {
  return (
    <section id="resources" className="mb-16 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-6">Resources & Next Steps</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-white text-lg mb-2">Recommended Documentation</h4>
            <p className="text-slate-400 text-sm mb-4">Official resources to deepen your understanding.</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <ExternalLink size={14} className="text-orange-500" />
                <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-orange-400 hover:underline">React Official Docs</a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink size={14} className="text-orange-500" />
                <a href="https://reactrouter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 hover:underline">React Router v6 Docs</a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink size={14} className="text-orange-500" />
                <a href="https://tanstack.com/query/latest" target="_blank" rel="noreferrer" className="hover:text-orange-400 hover:underline">TanStack Query Docs</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-slate-900 border border-orange-500/20 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
              <Sparkles size={20} className="text-orange-400" />
              Join the Community
            </h4>
            <p className="text-slate-400 text-sm mb-4">Connect and follow for regular web & mobile tutorials.</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Github size={14} className="text-slate-400" />
                <a href="https://github.com/dev-kant-kumar" target="_blank" rel="noreferrer" className="hover:text-orange-400 hover:underline">GitHub: dev-kant-kumar</a>
              </li>
              <li className="flex items-center gap-2">
                <Youtube size={14} className="text-red-500" />
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 hover:underline">YouTube: Dev Code Space</a>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            Need consulting? Unyrise Tech is open for custom designs & code solutions.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;