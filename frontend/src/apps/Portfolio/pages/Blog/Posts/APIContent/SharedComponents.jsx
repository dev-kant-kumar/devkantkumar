import {
    Check,
    Copy,
    Globe,
    Layers,
    Server,
    Terminal
} from "lucide-react";
import React from "react";

// ─── Featured Image (full-width hero) ───────────────────────────────────────
export function APIFeaturedImage({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 relative overflow-hidden ${className}`}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center py-14 px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-blue-500/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-blue-300 text-sm font-medium">
            2026 Production Guide
          </span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Globe size={28} className="text-emerald-400" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-blue-500/30 flex items-center justify-center">
            <Server size={40} className="text-blue-400" />
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
            <Layers size={28} className="text-purple-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
          <span className="text-white">Node.js API </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500">
            Mastery
          </span>
        </h2>

        <p className="text-slate-400 text-lg">
          REST · GraphQL · gRPC · WebSockets · 25 Topics · 100+ Code Examples
        </p>
      </div>
    </div>
  );
}

// ─── Card Image (blog listing) ──────────────────────────────────────────────
export function APICardImage({ className = "h-48" }) {
  return (
    <div
      className={`w-full bg-[#0f172a] rounded-xl flex items-center justify-center relative overflow-hidden group border border-slate-800 hover:border-blue-500/50 transition-all duration-500 ${className}`}
    >
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0f172a] to-[#0f172a]" />
      <div className="relative flex flex-col items-center gap-3 text-slate-100 transform group-hover:scale-105 transition-transform duration-300">
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-lg">
          <Server size={32} className="text-blue-400" />
        </div>
        <span className="font-bold text-lg tracking-wide text-blue-50">
          Node.js API Mastery
        </span>
      </div>
    </div>
  );
}

// ─── Thumbnail (search results) ─────────────────────────────────────────────
export function APIThumbnailImage({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-4 ${className}`}
    >
      <Server size={24} className="text-blue-300" />
      <span className="text-white font-bold ml-2 text-sm">API Guide</span>
    </div>
  );
}

// ─── Code Block ─────────────────────────────────────────────────────────────
export function CodeBlock({ language = "js", filename, code }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* no-op */
    }
  };

  // Language label map
  const labelMap = {
    js: "JAVASCRIPT",
    javascript: "JAVASCRIPT",
    ts: "TYPESCRIPT",
    typescript: "TYPESCRIPT",
    graphql: "GRAPHQL",
    protobuf: "PROTOBUF",
    yaml: "YAML",
    nginx: "NGINX",
    dockerfile: "DOCKERFILE",
    xml: "XML",
    json: "JSON",
    bash: "BASH",
    batch: "BATCH",
    sql: "SQL",
    tsx: "TSX",
    jsx: "JSX",
  };

  return (
    <div className="relative my-6 rounded-xl border border-slate-700/50 bg-slate-900/80 overflow-hidden shadow-2xl shadow-blue-500/5">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-800/90 border-b border-slate-700/50">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Terminal size={16} className="text-blue-400" />
          <span className="px-2.5 py-1 rounded-md bg-blue-900/40 text-blue-300 border border-blue-700/40 font-mono font-semibold">
            {labelMap[language] || language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-slate-400">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/80 text-slate-200 hover:bg-slate-600 transition-all duration-200 text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="m-0 p-6 overflow-x-auto text-sm leading-relaxed bg-slate-950/50">
        <code className={`language-${language} text-slate-200`}>{code}</code>
      </pre>
    </div>
  );
}

// ─── Info Box ───────────────────────────────────────────────────────────────
export function InfoBox({ type = "info", title, children, icon: Icon }) {
  const styles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      icon: "text-blue-400",
      title: "text-blue-300",
    },
    tip: {
      border: "border-green-500/30",
      bg: "bg-green-500/10",
      icon: "text-green-400",
      title: "text-green-300",
    },
    warning: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      icon: "text-yellow-400",
      title: "text-yellow-300",
    },
    danger: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      icon: "text-red-400",
      title: "text-red-300",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`my-8 p-6 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}
    >
      <div className="flex gap-4">
        {Icon && (
          <Icon size={24} className={`${style.icon} flex-shrink-0 mt-1`} />
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg ${style.title} mb-2`}>
              {title}
            </h4>
          )}
          <div className="text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Section Heading ────────────────────────────────────────────────────────
export function SectionHeading({
  id,
  icon: Icon,
  iconColor = "text-blue-400",
  gradient = "from-blue-500 to-cyan-600",
  children,
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
      >
        <Icon size={24} className="text-white" />
      </div>
      <h2 id={id} className="text-3xl md:text-4xl font-bold text-white scroll-mt-24">
        {children}
      </h2>
    </div>
  );
}

// ─── Comparison Table ───────────────────────────────────────────────────────
export function ComparisonTable({ headers, rows }) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-700/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-800/90">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-blue-300 border-b border-slate-700/50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-slate-900/50" : "bg-slate-900/30"
              } hover:bg-slate-800/50 transition-colors`}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 border-b border-slate-800/50 ${
                    j === 0 ? "font-semibold text-white" : "text-slate-300"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
