import { Wand2 } from 'lucide-react';
import { contrastRatio, readableTextColor, wcagGrade } from './colorUtils';

const gradeColor = (grade) => {
  if (grade === 'AAA') return '#10b981';
  if (grade === 'AA') return '#22d3ee';
  if (grade === 'AA Large') return '#f59e0b';
  return '#f43f5e';
};

const ContrastMatrix = ({ colors, onAutoFix }) => {
  // Best text (black/white) contrast for each color, for the quick-read row.
  const textReadouts = colors.map((c) => {
    const white = contrastRatio(c.hex, '#ffffff');
    const black = contrastRatio(c.hex, '#000000');
    const best = white >= black ? { on: 'White', ratio: white } : { on: 'Black', ratio: black };
    return { hex: c.hex, ...best, grade: wcagGrade(best.ratio) };
  });

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h3 className="text-white font-bold">Contrast matrix</h3>
          <p className="text-xs text-slate-500">Ratio of every color as background against every other as text. AA needs 4.5:1, AAA needs 7:1.</p>
        </div>
        <button
          onClick={onAutoFix}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-colors"
        >
          <Wand2 size={14} /> Auto-fix to AA
        </button>
      </div>

      {/* Text-on-color quick read */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
        {textReadouts.map((t, i) => (
          <div key={i} className="rounded-lg p-2.5 flex items-center justify-between" style={{ background: t.hex, color: readableTextColor(t.hex) }}>
            <span className="text-xs font-mono font-semibold">{t.hex.toUpperCase()}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.2)' }}>
              {t.grade} · {t.ratio.toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Full matrix */}
      <div className="overflow-x-auto">
        <table className="border-separate" style={{ borderSpacing: '4px' }}>
          <thead>
            <tr>
              <th className="w-8 h-8" />
              {colors.map((c, i) => (
                <th key={i} className="w-12 h-8">
                  <span className="block w-full h-6 rounded" style={{ background: c.hex }} title={`text: ${c.hex.toUpperCase()}`} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {colors.map((rowC, ri) => (
              <tr key={ri}>
                <th>
                  <span className="block w-8 h-8 rounded" style={{ background: rowC.hex }} title={`bg: ${rowC.hex.toUpperCase()}`} />
                </th>
                {colors.map((colC, ci) => {
                  if (ri === ci) {
                    return <td key={ci} className="w-12 h-8 text-center text-slate-700">-</td>;
                  }
                  const ratio = contrastRatio(rowC.hex, colC.hex);
                  const grade = wcagGrade(ratio);
                  return (
                    <td key={ci} className="w-12 h-8">
                      <div
                        className="w-full h-8 rounded flex items-center justify-center text-[11px] font-bold"
                        style={{ background: rowC.hex, color: colC.hex, outline: `1.5px solid ${gradeColor(grade)}` }}
                        title={`${grade} · ${ratio.toFixed(2)}:1`}
                      >
                        {ratio.toFixed(1)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 text-[11px] text-slate-400">
        {[['AAA (7:1+)', '#10b981'], ['AA (4.5:1+)', '#22d3ee'], ['AA Large (3:1+)', '#f59e0b'], ['Fail', '#f43f5e']].map(([label, c]) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: c }} /> {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ContrastMatrix;
