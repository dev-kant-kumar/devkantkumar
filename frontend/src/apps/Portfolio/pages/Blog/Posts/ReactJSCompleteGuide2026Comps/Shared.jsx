import { AlertOctagon, AlertTriangle, Check, Copy, Info, Terminal, Zap } from "lucide-react";
import React from "react";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);

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

  const highlightedHtml = React.useMemo(() => {
    try {
      const lang = hljs.getLanguage(language) ? language : null;
      if (lang) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } catch {
      return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }, [code, language]);

  const lines = code.trim().split("\n");
  const lineCount = lines.length;

  return (
    <div className="relative my-8 rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-orange-500/5 group bg-[#0d1117]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-800/90 border-b border-slate-700/50">
        <div className="flex items-center gap-3 text-slate-300 text-sm">
          {/* macOS window controls */}
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <Terminal size={14} className="text-orange-400" />
          <span className="px-2.5 py-1 rounded-md bg-orange-950/40 text-orange-300 border border-orange-700/40 font-mono font-semibold text-xs">
            {language.toUpperCase()}
          </span>
          {filename && (
            <span className="font-mono text-slate-400 text-xs">{filename}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/80 text-slate-200 hover:bg-slate-600 transition-all duration-200 text-xs font-medium"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body with line numbers */}
      <div className="flex overflow-x-auto" style={{ background: "transparent" }}>
        {/* Line numbers gutter */}
        <div
          aria-hidden="true"
          className="select-none flex-shrink-0 border-r border-slate-700/40 text-right font-mono text-sm leading-loose text-slate-600 py-6 pr-4 pl-4"
          style={{ minWidth: `${String(lineCount).length * 0.65 + 3}ch` }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Actual highlighted code */}
        <pre className="m-0 pl-5 pr-6 py-6 flex-1 text-sm leading-loose hljs overflow-x-visible" style={{ background: "transparent" }}>
          <code
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            style={{ background: "transparent", padding: 0 }}
          />
        </pre>
      </div>
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
