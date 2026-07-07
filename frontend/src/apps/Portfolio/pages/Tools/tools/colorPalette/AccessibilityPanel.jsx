import { Eye } from 'lucide-react';
import { readableTextColor, simulateCvd } from './colorUtils';

const TYPES = [
  { id: 'normal', label: 'Normal vision', note: 'How everyone else sees it' },
  { id: 'deuteranopia', label: 'Deuteranopia', note: 'Red-green (most common, ~6% of men)' },
  { id: 'protanopia', label: 'Protanopia', note: 'Red-green (reduced red)' },
  { id: 'tritanopia', label: 'Tritanopia', note: 'Blue-yellow (rare)' },
  { id: 'achromatopsia', label: 'Achromatopsia', note: 'Full color blindness (grayscale)' },
];

const AccessibilityPanel = ({ colors }) => (
  <div>
    <div className="flex items-center gap-2 mb-1">
      <Eye size={18} className="text-cyan-400" />
      <h3 className="text-white font-bold">Color-blindness simulation</h3>
    </div>
    <p className="text-xs text-slate-500 mb-5">
      Check that your palette stays distinguishable for people with color-vision deficiencies. If two rows look identical, those colors will be hard to tell apart.
    </p>

    <div className="space-y-4">
      {TYPES.map((t) => (
        <div key={t.id}>
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-sm font-semibold text-slate-200">{t.label}</span>
            <span className="text-[11px] text-slate-500">{t.note}</span>
          </div>
          <div className="flex rounded-xl overflow-hidden border border-slate-800 h-14">
            {colors.map((c, i) => {
              const shown = t.id === 'normal' ? c.hex : simulateCvd(c.hex, t.id);
              return (
                <div
                  key={i}
                  className="flex-1 flex items-center justify-center"
                  style={{ background: shown, color: readableTextColor(shown) }}
                >
                  <span className="text-[10px] font-mono font-semibold opacity-80">{shown.toUpperCase()}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AccessibilityPanel;
