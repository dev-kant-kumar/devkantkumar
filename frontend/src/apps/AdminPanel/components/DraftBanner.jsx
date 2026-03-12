import { AlertTriangle, RotateCcw, X } from "lucide-react";

/**
 * Banner shown when an autosaved draft is detected.
 */
export default function DraftBanner({ timestamp, onRestore, onDiscard }) {
  const timeAgo = timestamp ? formatTimeAgo(timestamp) : "";

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 animate-in slide-in-from-top-2 duration-300">
      <AlertTriangle size={18} className="flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">
        Unsaved draft found{timeAgo ? ` (${timeAgo})` : ""}. Pick up where you
        left off?
      </p>
      <button
        type="button"
        onClick={onRestore}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors"
      >
        <RotateCcw size={14} />
        Restore
      </button>
      <button
        type="button"
        onClick={onDiscard}
        className="p-1.5 rounded-lg hover:bg-amber-200/60 dark:hover:bg-amber-800/40 text-amber-600 dark:text-amber-400 transition-colors"
        title="Discard draft"
      >
        <X size={16} />
      </button>
    </div>
  );
}

function formatTimeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
