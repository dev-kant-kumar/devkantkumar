import { AlertOctagon, AlertTriangle, Check, Copy, Info, Terminal, Zap } from "lucide-react";
import React from "react";

export function CodeBlock({ language = "jsx", filename, code }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  return (
    <div className="relative my-8 rounded-xl border border-slate-700/50 bg-slate-900/80 overflow-hidden shadow-2xl shadow-indigo-500/5">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-800/90 border-b border-slate-700/50">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          <Terminal size={16} className="text-indigo-400" />
          <span className="px-2.5 py-1 rounded-md bg-indigo-900/40 text-indigo-300 border border-indigo-700/40 font-mono font-semibold">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-slate-400">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/80 text-slate-200 hover:bg-slate-600 transition-all duration-200 text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="m-0 p-6 overflow-x-auto text-sm leading-loose bg-slate-950/50">
        <code className={`language-${language} text-slate-200`}>{code}</code>
      </pre>
    </div>
  );
}

export function InfoBox({ type = "info", title, children, icon: Icon }) {
  const styles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      icon: "text-blue-400",
      title: "text-blue-300",
      DefaultIcon: Info
    },
    tip: {
      border: "border-green-500/30",
      bg: "bg-green-500/10",
      icon: "text-green-400",
      title: "text-green-300",
      DefaultIcon: Zap
    },
    warning: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      icon: "text-yellow-400",
      title: "text-yellow-300",
      DefaultIcon: AlertTriangle
    },
    danger: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      icon: "text-red-400",
      title: "text-red-300",
      DefaultIcon: AlertOctagon
    },
  };

  const style = styles[type];
  const IconToUse = Icon || style.DefaultIcon;

  return (
    <div
      className={`my-8 p-6 rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm`}
    >
      <div className="flex gap-4">
        <IconToUse size={24} className={`${style.icon} flex-shrink-0 mt-1`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold text-lg ${style.title} mb-2`}>{title}</h4>
          )}
          <div className="text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
