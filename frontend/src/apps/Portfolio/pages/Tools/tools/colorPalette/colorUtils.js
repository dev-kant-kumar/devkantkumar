// Shared color math for the Color Palette Generator and its workspace panels.

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const hslToHex = (h, s, l) => {
  h = (h + 360) % 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const colorFromHsl = (h, s, l, locked = false) => ({
  h: (Math.round(h) + 360) % 360,
  s: clamp(Math.round(s), 0, 100),
  l: clamp(Math.round(l), 0, 100),
  hex: hslToHex(h, s, l),
  locked,
});

export const colorFromHex = (hex, locked = false) => {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return { h, s, l, hex: hex.toLowerCase(), locked };
};

// WCAG relative luminance + contrast ratio
export const relLuminance = ({ r, g, b }) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

export const contrastRatio = (hexA, hexB) => {
  const L1 = relLuminance(hexToRgb(hexA));
  const L2 = relLuminance(hexToRgb(hexB));
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
};

export const wcagGrade = (ratio) => (ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail');

export const readableTextColor = (hex) => (relLuminance(hexToRgb(hex)) > 0.4 ? '#0f172a' : '#ffffff');

export const formatColor = (color, fmt) => {
  if (fmt === 'rgb') {
    const { r, g, b } = hexToRgb(color.hex);
    return `rgb(${r}, ${g}, ${b})`;
  }
  if (fmt === 'hsl') return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
  return color.hex.toUpperCase();
};

// sRGB hex -> OKLCH string, e.g. "oklch(62.3% 0.19 29.2)"
export const hexToOklch = (hex) => {
  const toLinear = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const { r, g, b } = hexToRgb(hex);
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(A * A + B * B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
};

// ------- harmony rules
export const HARMONY_OFFSETS = {
  complementary: [0, 180],
  triadic: [0, 120, 240],
  tetradic: [0, 90, 180, 270],
  'split-complementary': [0, 150, 210],
};

export const MODES = [
  'random',
  'complementary',
  'analogous',
  'triadic',
  'tetradic',
  'split-complementary',
  'monochromatic',
];

export const buildPalette = (mode, count, baseHue = randInt(0, 360)) => {
  const out = [];
  for (let i = 0; i < count; i++) {
    if (mode === 'random') {
      out.push(colorFromHsl(randInt(0, 360), randInt(55, 90), randInt(35, 70)));
    } else if (mode === 'monochromatic') {
      const l = 22 + (i * 56) / Math.max(1, count - 1);
      out.push(colorFromHsl(baseHue, randInt(50, 65), l));
    } else if (mode === 'analogous') {
      const h = baseHue + (i - (count - 1) / 2) * 28;
      out.push(colorFromHsl(h, 65, 46 + (i % 3) * 9));
    } else {
      const offsets = HARMONY_OFFSETS[mode];
      const h = baseHue + offsets[i % offsets.length];
      const tier = Math.floor(i / offsets.length);
      out.push(colorFromHsl(h, 62 + (i % 2) * 12, clamp(50 + tier * 14 - (i % 2) * 6, 28, 74)));
    }
  }
  return out;
};

// ------- vibe / keyword palettes
export const VIBES = {
  sunset: { hues: [12, 28, 340, 300, 45], s: [70, 92], l: [45, 66] },
  ocean: { hues: [190, 205, 220, 178, 235], s: [55, 82], l: [34, 62] },
  forest: { hues: [95, 130, 145, 35, 80], s: [38, 70], l: [26, 56] },
  pastel: { hues: [340, 200, 55, 280, 130], s: [35, 55], l: [78, 88] },
  cyberpunk: { hues: [285, 320, 190, 240, 160], s: [82, 100], l: [46, 62] },
  corporate: { hues: [212, 218, 205, 224, 200], s: [28, 58], l: [32, 68] },
  earthy: { hues: [22, 36, 15, 45, 60], s: [30, 55], l: [34, 60] },
  candy: { hues: [330, 200, 48, 275, 165], s: [70, 92], l: [60, 76] },
  vintage: { hues: [32, 15, 48, 190, 5], s: [24, 46], l: [44, 66] },
  noir: { hues: [220, 220, 220, 220, 220], s: [4, 14], l: [12, 82] },
};

export const VIBE_LIST = Object.keys(VIBES);

export const buildVibePalette = (vibe, count) => {
  const v = VIBES[vibe];
  if (!v) return buildPalette('random', count);
  const out = [];
  for (let i = 0; i < count; i++) {
    const h = v.hues[i % v.hues.length] + randInt(-8, 8);
    const s = randInt(v.s[0], v.s[1]);
    const l =
      vibe === 'noir'
        ? clamp(v.l[0] + (i * (v.l[1] - v.l[0])) / Math.max(1, count - 1), 0, 100)
        : randInt(v.l[0], v.l[1]);
    out.push(colorFromHsl(h, s, l));
  }
  return out;
};

// ------- color-vision-deficiency simulation
const CVD_MATRICES = {
  protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
};

export const simulateCvd = (hex, type) => {
  const { r, g, b } = hexToRgb(hex);
  if (type === 'achromatopsia') {
    const y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    return `#${[y, y, y].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  }
  const m = CVD_MATRICES[type];
  if (!m) return hex;
  const nr = clamp(Math.round(m[0] * r + m[1] * g + m[2] * b), 0, 255);
  const ng = clamp(Math.round(m[3] * r + m[4] * g + m[5] * b), 0, 255);
  const nb = clamp(Math.round(m[6] * r + m[7] * g + m[8] * b), 0, 255);
  return `#${[nr, ng, nb].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

// tints (toward white) + shades (toward black) for one color
export const buildShades = (color) => {
  const steps = [92, 82, 70, 58, color.l, 40, 30, 20, 12];
  const uniq = [...new Set(steps)].sort((a, b) => b - a);
  return uniq.map((l) => hslToHex(color.h, color.s, l));
};

// ------- URL <-> colors
export const encodeColors = (colors) => colors.map((c) => c.hex.replace('#', '')).join('-');

export const decodeColors = (str) => {
  const parts = str.split('-').filter((p) => /^[0-9a-fA-F]{6}$/.test(p));
  return parts.length ? parts.map((p) => colorFromHex(`#${p}`)) : null;
};

// ------- map a palette to semantic UI roles for the live preview
// A real product uses a palette as BRAND colors on a neutral canvas, not as a
// full-bleed background. So we derive a neutral (light or dark) canvas tinted by
// the palette's hue, and use the vibrant colors only for primary/accent.
export const assignRoles = (colors, offset = 0, scheme = 'light') => {
  const fallback = {
    background: '#0f172a', surface: '#1e293b', text: '#f8fafc',
    primary: '#38bdf8', accent: '#a855f7', onPrimary: '#0f172a',
    muted: 'rgba(255,255,255,0.65)', border: 'rgba(255,255,255,0.12)',
  };
  if (!colors.length) return fallback;

  // Score for "brand" usability: saturated AND mid-lightness (avoid near-black/near-white).
  const brandScore = (c) => c.s * (1 - Math.abs(c.l - 55) / 90);
  const vivid = [...colors].sort((a, b) => brandScore(b) - brandScore(a));

  const primaryC = vivid[offset % vivid.length];
  const primary = primaryC.hex;

  // Accent = the remaining vivid color with the most different hue from primary.
  const others = vivid.filter((c) => c.hex !== primary);
  const hueDiff = (a, b) => {
    const d = Math.abs(a - b) % 360;
    return d > 180 ? 360 - d : d;
  };
  const accentC = others.length
    ? others.reduce((best, c) => (hueDiff(c.h, primaryC.h) > hueDiff(best.h, primaryC.h) ? c : best), others[0])
    : primaryC;
  const accent = accentC.hex;

  const dark = scheme === 'dark';
  const th = primaryC.h; // tint neutrals with the primary hue
  const background = hslToHex(th, dark ? 16 : 15, dark ? 8 : 98);
  const surface = hslToHex(th, dark ? 16 : 30, dark ? 14 : 100);
  const text = hslToHex(th, dark ? 8 : 20, dark ? 96 : 13);

  return {
    background,
    surface,
    text,
    primary,
    accent,
    onPrimary: readableTextColor(primary),
    muted: dark ? 'rgba(255,255,255,0.58)' : 'rgba(15,23,42,0.55)',
    border: dark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)',
  };
};
