import React from "react";
import { HelpCircle as QuestionIcon, Folder } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section21 = () => {
  return (
    <section id="react-architecture" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Folder size={32} className="text-orange-500" />
        Section 21: React Project Architecture
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react project structure best practices 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Structuring massive codebase files requires a predictable layout system that isolates domains, manages dependency rules, and keeps code clean.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="text"
          filename="FolderStructure.txt"
          code={`src/
  features/         # Domain-driven features
    auth/
      components/   # Auth-specific widgets
      hooks/        # Auth logic
      api/          # Auth service/fetches
      types/        # Auth types
    dashboard/
  shared/           # Shared modules
    components/     # Reusable buttons, cards
    hooks/          # useLocalStorage, useFetch
    utils/          # Helper calculations
  pages/            # View entry layouts
  app/              # Router configs and providers
  index.css         # Global style tokens`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 21 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. How do you structure a large-scale React project?",
              a: "Use a domain-driven, feature-based layout, grouping related components, hooks, and API queries under dedicated feature subdirectories."
            },
            {
              q: "2. What is a feature-based folder structure and why is it preferred?",
              a: "Grouping files by feature domain (e.g., auth, billing) rather than file type (e.g., components, styles). It keeps files localized and easy to find."
            },
            {
              q: "3. What are barrel files and what are their trade-offs?",
              a: "Barrel files (index.js exports) consolidate imports under single filenames. Trade-offs: clean import lines, but they can cause circular dependencies and hinder tree shaking if not configured correctly."
            },
            {
              q: "4. What is the difference between CRA and Vite? Why is Vite preferred?",
              a: "CRA uses Webpack to bundle code on startup. Vite uses native ES Modules during development to render files instantly, compiling bundles using Rollup."
            },
            {
              q: "5. How do you handle environment variables in a React app?",
              a: "Store them in .env files prefixed with VITE_ (e.g., VITE_API_URL). Access them in code using import.meta.env.VITE_API_URL."
            },
            {
              q: "6. What is ESLint and how do you configure it for a React + TypeScript project?",
              a: "ESLint is a static code analyzer. Configure it with typescript-eslint plugins to enforce styling rules, verify hook layouts, and prevent compile errors."
            },
            {
              q: "7. What is Husky and what pre-commit hooks would you set up?",
              a: "Husky runs scripts (like eslint check, vitest run) during git commit actions, preventing broken changes from pushing to main branches."
            },
            {
              q: "8. How do you set up absolute imports in a React + Vite project?",
              a: "Add resolve.alias configurations in vite.config.js and path definitions inside tsconfig.json (e.g., mapping '@' to '/src')."
            },
            {
              q: "9. What is a monorepo and when would you use one for React projects?",
              a: "A single repository containing multiple applications and shared packages. Use it when maintaining web and mobile projects (React Native) that share code."
            },
            {
              q: "10. How do you organize shared components vs feature-specific components?",
              a: "Place generic, non-business elements (e.g., buttons, loaders) in shared/components. Place feature-specific UI (e.g., LoginForm) inside the feature's components folder."
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

export default Section21;