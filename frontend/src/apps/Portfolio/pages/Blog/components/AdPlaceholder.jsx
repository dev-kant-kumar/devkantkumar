
const AdPlaceholder = ({ className = "", label = "Advertisement" }) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center p-4 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
      <span className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">
        {label}
      </span>
      <div className="w-16 h-16 bg-slate-700/30 rounded-lg flex items-center justify-center mb-2">
        <span className="text-2xl">📢</span>
      </div>
      <p className="text-xs text-slate-500 max-w-[200px]">
        Space reserved for Google AdSense
      </p>
    </div>
  );
};

export default AdPlaceholder;
