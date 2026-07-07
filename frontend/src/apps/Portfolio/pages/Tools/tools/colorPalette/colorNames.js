import { hexToRgb } from './colorUtils';

// A compact set of common, recognizable color names for nearest-match labeling.
const NAMED_COLORS = [
  ['Black', '#000000'], ['White', '#ffffff'], ['Slate', '#64748b'], ['Gray', '#6b7280'],
  ['Silver', '#c0c0c0'], ['Charcoal', '#36454f'], ['Snow', '#fffafa'], ['Ivory', '#fffff0'],
  ['Red', '#ef4444'], ['Crimson', '#dc143c'], ['Scarlet', '#ff2400'], ['Maroon', '#800000'],
  ['Rose', '#f43f5e'], ['Pink', '#ec4899'], ['Salmon', '#fa8072'], ['Coral', '#ff7f50'],
  ['Orange', '#f97316'], ['Tangerine', '#f28500'], ['Amber', '#f59e0b'], ['Gold', '#ffd700'],
  ['Yellow', '#eab308'], ['Lemon', '#fff44f'], ['Mustard', '#ffdb58'], ['Cream', '#fffdd0'],
  ['Lime', '#84cc16'], ['Chartreuse', '#7fff00'], ['Olive', '#808000'], ['Green', '#22c55e'],
  ['Emerald', '#10b981'], ['Forest', '#228b22'], ['Mint', '#98ff98'], ['Sage', '#9caf88'],
  ['Teal', '#14b8a6'], ['Turquoise', '#40e0d0'], ['Cyan', '#06b6d4'], ['Aqua', '#00ffff'],
  ['Sky', '#0ea5e9'], ['Azure', '#007fff'], ['Blue', '#3b82f6'], ['Navy', '#000080'],
  ['Cobalt', '#0047ab'], ['Indigo', '#6366f1'], ['Periwinkle', '#ccccff'], ['Violet', '#8b5cf6'],
  ['Purple', '#a855f7'], ['Lavender', '#e6e6fa'], ['Plum', '#8e4585'], ['Magenta', '#d946ef'],
  ['Fuchsia', '#ff00ff'], ['Mauve', '#e0b0ff'], ['Brown', '#92400e'], ['Chocolate', '#7b3f00'],
  ['Tan', '#d2b48c'], ['Beige', '#f5f5dc'], ['Khaki', '#c3b091'], ['Terracotta', '#e2725b'],
  ['Rust', '#b7410e'], ['Burgundy', '#800020'], ['Peach', '#ffe5b4'], ['Apricot', '#fbceb1'],
];

const dist = (a, b) => (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;

export const nearestColorName = (hex) => {
  const rgb = hexToRgb(hex);
  let best = NAMED_COLORS[0];
  let bestD = Infinity;
  for (const c of NAMED_COLORS) {
    const d = dist(rgb, hexToRgb(c[1]));
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best[0];
};

// Tailwind palette (shades 400/500/600) for nearest-utility suggestions.
const TW = {
  slate: ['#94a3b8', '#64748b', '#475569'], gray: ['#9ca3af', '#6b7280', '#4b5563'],
  red: ['#f87171', '#ef4444', '#dc2626'], orange: ['#fb923c', '#f97316', '#ea580c'],
  amber: ['#fbbf24', '#f59e0b', '#d97706'], yellow: ['#facc15', '#eab308', '#ca8a04'],
  lime: ['#a3e635', '#84cc16', '#65a30d'], green: ['#4ade80', '#22c55e', '#16a34a'],
  emerald: ['#34d399', '#10b981', '#059669'], teal: ['#2dd4bf', '#14b8a6', '#0d9488'],
  cyan: ['#22d3ee', '#06b6d4', '#0891b2'], sky: ['#38bdf8', '#0ea5e9', '#0284c7'],
  blue: ['#60a5fa', '#3b82f6', '#2563eb'], indigo: ['#818cf8', '#6366f1', '#4f46e5'],
  violet: ['#a78bfa', '#8b5cf6', '#7c3aed'], purple: ['#c084fc', '#a855f7', '#9333ea'],
  fuchsia: ['#e879f9', '#d946ef', '#c026d3'], pink: ['#f472b6', '#ec4899', '#db2777'],
  rose: ['#fb7185', '#f43f5e', '#e11d48'],
};
const SHADE = ['400', '500', '600'];

export const nearestTailwind = (hex) => {
  const rgb = hexToRgb(hex);
  let best = 'slate-500';
  let bestD = Infinity;
  for (const [name, shades] of Object.entries(TW)) {
    shades.forEach((h, i) => {
      const d = dist(rgb, hexToRgb(h));
      if (d < bestD) {
        bestD = d;
        best = `${name}-${SHADE[i]}`;
      }
    });
  }
  return best;
};
