import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const TYPES = ['linear', 'radial', 'conic'];

const GradientStudio = ({ colors }) => {
  const [type, setType] = useState('linear');
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const stops = colors.map((c) => c.hex).join(', ');
  const css =
    type === 'linear'
      ? `linear-gradient(${angle}deg, ${stops})`
      : type === 'radial'
        ? `radial-gradient(circle at 50% 50%, ${stops})`
        : `conic-gradient(from ${angle}deg at 50% 50%, ${stops})`;

  const fullCss = `background: ${css};`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-colors ${
                type === t ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {type !== 'radial' && (
          <label className="flex items-center gap-2 text-xs text-slate-400">
            Angle
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-40 accent-cyan-500" />
            <span className="font-mono text-slate-300 w-10">{angle}deg</span>
          </label>
        )}
      </div>

      <div className="h-56 rounded-2xl border border-slate-800 mb-4" style={{ background: css }} />

      <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/40">
          <span className="text-sm font-semibold text-white">CSS</span>
          <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors px-2.5 py-1.5 text-xs">
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 text-xs text-emerald-300 font-mono break-all whitespace-pre-wrap">{fullCss}</pre>
      </div>
    </div>
  );
};

export default GradientStudio;
