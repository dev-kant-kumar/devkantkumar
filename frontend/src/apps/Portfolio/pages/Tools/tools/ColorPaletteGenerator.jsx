import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Blend,
  Check,
  ChevronDown,
  Compass,
  Copy,
  Disc3,
  Download,
  Eye,
  Grid3x3,
  Image as ImageIcon,
  ImageDown,
  Layers,
  Lock,
  Monitor,
  Palette,
  RefreshCw,
  Redo2,
  Save,
  Share2,
  Trash2,
  Undo2,
  Unlock,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';
import StructuredData from '../../../../../components/SEO/StructuredData';
import ColorWheel from './colorPalette/ColorWheel';
import ContrastMatrix from './colorPalette/ContrastMatrix';
import GradientStudio from './colorPalette/GradientStudio';
import PalettePreview from './colorPalette/PalettePreview';
import AccessibilityPanel from './colorPalette/AccessibilityPanel';
import ExploreGallery from './colorPalette/ExploreGallery';
import { nearestColorName } from './colorPalette/colorNames';
import {
  buildPalette,
  buildShades,
  buildVibePalette,
  clamp,
  colorFromHex,
  colorFromHsl,
  contrastRatio,
  decodeColors,
  encodeColors,
  formatColor,
  hexToOklch,
  hexToRgb,
  MODES,
  readableTextColor,
  VIBE_LIST,
  wcagGrade,
} from './colorPalette/colorUtils';

const SAVED_KEY = 'dkk_saved_palettes';

const WORKSPACE_TABS = [
  { id: 'preview', label: 'Live preview', icon: Monitor },
  { id: 'wheel', label: 'Color wheel', icon: Disc3 },
  { id: 'contrast', label: 'Contrast matrix', icon: Grid3x3 },
  { id: 'gradient', label: 'Gradient studio', icon: Blend },
  { id: 'accessibility', label: 'Accessibility', icon: Eye },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'export', label: 'Export', icon: Download },
];

const EXPORT_FORMATS = [
  { id: 'css', label: 'CSS vars' },
  { id: 'oklch', label: 'CSS OKLCH' },
  { id: 'scss', label: 'SCSS' },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'tailwind4', label: 'Tailwind v4' },
  { id: 'json', label: 'JSON' },
  { id: 'tokens', label: 'Design tokens' },
  { id: 'android', label: 'Android XML' },
  { id: 'swiftui', label: 'SwiftUI' },
  { id: 'array', label: 'Hex list' },
];

const ColorPaletteGenerator = () => {
  const [colors, setColors] = useState([]);
  const [count, setCount] = useState(5);
  const [harmonyMode, setHarmonyMode] = useState('random');
  const [vibe, setVibe] = useState('');
  const [format, setFormat] = useState('hex');
  const [tab, setTab] = useState('preview');
  const [copied, setCopied] = useState(null);
  const [toast, setToast] = useState('');
  const [openShades, setOpenShades] = useState(null);
  const [saved, setSaved] = useState([]);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const fileRef = useRef(null);
  const initialised = useRef(false);
  const colorsRef = useRef(colors);
  const actionsRef = useRef({});

  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1600);
  };

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1400);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  // ------- history (undo / redo)
  const snapshot = () => {
    setPast((p) => [...p.slice(-49), colorsRef.current]);
    setFuture([]);
  };
  const commit = (next) => {
    snapshot();
    setColors(next);
  };
  const undo = () => {
    setPast((p) => {
      if (!p.length) return p;
      setFuture((f) => [colorsRef.current, ...f].slice(0, 50));
      setColors(p[p.length - 1]);
      return p.slice(0, -1);
    });
  };
  const redo = () => {
    setFuture((f) => {
      if (!f.length) return f;
      setPast((p) => [...p.slice(-49), colorsRef.current]);
      setColors(f[0]);
      return f.slice(1);
    });
  };

  // Initial load: shared URL palette if present, else fresh + saved list.
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('colors');
    const fromUrl = shared ? decodeColors(shared) : null;
    if (fromUrl) {
      setColors(fromUrl);
      setCount(fromUrl.length);
    } else {
      setColors(buildPalette('random', 5));
    }
  }, []);

  const regenerate = (fresh = false) => {
    const cur = colorsRef.current;
    const next = vibe ? buildVibePalette(vibe, count) : buildPalette(harmonyMode, count);
    const merged = fresh || cur.length !== count ? next : cur.map((c, i) => (c.locked ? c : next[i] || c));
    commit(merged);
  };

  // Regenerate when mode/vibe/count change (after first paint).
  useEffect(() => {
    if (!initialised.current) return;
    commit(vibe ? buildVibePalette(vibe, count) : buildPalette(harmonyMode, count));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [harmonyMode, count, vibe]);

  // Keyboard: space = generate, ctrl/cmd+z = undo, +shift = redo.
  actionsRef.current = { regenerate, undo, redo };
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea';
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) actionsRef.current.redo();
        else actionsRef.current.undo();
        return;
      }
      if (e.code === 'Space' && !typing) {
        e.preventDefault();
        actionsRef.current.regenerate(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleLock = (index) =>
    commit(colors.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c)));

  const setColorHex = (index, hex) =>
    commit(colors.map((c, i) => (i === index ? colorFromHex(hex, c.locked) : c)));

  // Nudge lightest & darkest colors until they pass AA against each other.
  const autoFixContrast = () => {
    if (colors.length < 2) return;
    const arr = [...colors];
    let li = 0;
    let di = 0;
    arr.forEach((c, i) => {
      if (c.l > arr[li].l) li = i;
      if (c.l < arr[di].l) di = i;
    });
    let light = arr[li];
    let dark = arr[di];
    let guard = 0;
    while (contrastRatio(light.hex, dark.hex) < 4.5 && guard < 60) {
      if (light.l < 96) light = colorFromHsl(light.h, light.s, light.l + 2, light.locked);
      if (dark.l > 6) dark = colorFromHsl(dark.h, dark.s, dark.l - 2, dark.locked);
      guard += 1;
    }
    arr[li] = light;
    arr[di] = dark;
    commit(arr);
    flash('Adjusted lightest & darkest colors toward AA');
  };

  // ------- image extraction
  const extractFromImage = (file) => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 120;
      const scale = Math.min(size / img.width, size / img.height, 1);
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const buckets = {};
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 125) continue;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const key = `${r >> 5}-${g >> 5}-${b >> 5}`;
        if (!buckets[key]) buckets[key] = { n: 0, r: 0, g: 0, b: 0 };
        buckets[key].n += 1;
        buckets[key].r += r;
        buckets[key].g += g;
        buckets[key].b += b;
      }
      const sorted = Object.values(buckets)
        .sort((a, b) => b.n - a.n)
        .slice(0, count)
        .map((bk) => {
          const r = Math.round(bk.r / bk.n);
          const g = Math.round(bk.g / bk.n);
          const b = Math.round(bk.b / bk.n);
          const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
          return colorFromHex(hex);
        });
      if (sorted.length) {
        setCount(sorted.length);
        commit(sorted);
        flash(`Extracted ${sorted.length} colors from image`);
      }
    };
    img.src = URL.createObjectURL(file);
  };

  // ------- exports
  const exportContent = (fmt) => {
    switch (fmt) {
      case 'css':
        return `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
      case 'oklch':
        return `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${hexToOklch(c.hex)};`).join('\n')}\n}`;
      case 'scss':
        return colors.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n');
      case 'tailwind':
        return `// tailwind.config.js\ncolors: {\n${colors.map((c, i) => `  'brand-${(i + 1) * 100}': '${c.hex}',`).join('\n')}\n}`;
      case 'tailwind4':
        return `@theme {\n${colors.map((c, i) => `  --color-brand-${(i + 1) * 100}: ${c.hex};`).join('\n')}\n}`;
      case 'json':
        return JSON.stringify(colors.map((c) => c.hex), null, 2);
      case 'tokens':
        return JSON.stringify(
          { color: Object.fromEntries(colors.map((c, i) => [`brand-${i + 1}`, { $type: 'color', $value: c.hex }])) },
          null,
          2,
        );
      case 'android':
        return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${colors
          .map((c, i) => `  <color name="brand_${i + 1}">${c.hex.toUpperCase()}</color>`)
          .join('\n')}\n</resources>`;
      case 'swiftui':
        return `import SwiftUI\n\nextension Color {\n${colors
          .map((c, i) => {
            const { r, g, b } = hexToRgb(c.hex);
            return `  static let brand${i + 1} = Color(red: ${(r / 255).toFixed(3)}, green: ${(g / 255).toFixed(3)}, blue: ${(b / 255).toFixed(3)})`;
          })
          .join('\n')}\n}`;
      default:
        return colors.map((c) => c.hex).join('\n');
    }
  };

  const EXT = { tailwind: 'js', tailwind4: 'css', oklch: 'css', json: 'json', tokens: 'json', android: 'xml', swiftui: 'swift', array: 'txt' };

  const downloadExport = (fmt) => {
    const blob = new Blob([exportContent(fmt)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette-${Date.now()}.${EXT[fmt] || fmt}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPng = () => {
    const w = 1200;
    const h = 360;
    const n = colors.length || 1;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    const cw = w / n;
    colors.forEach((c, i) => {
      ctx.fillStyle = c.hex;
      ctx.fillRect(i * cw, 0, cw + 1, h);
      ctx.fillStyle = readableTextColor(c.hex);
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(c.hex.toUpperCase(), i * cw + cw / 2, h - 28);
    });
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `palette-${Date.now()}.png`;
    a.click();
    flash('Downloaded PNG poster');
  };

  // ------- share + save
  const sharePalette = () => {
    const encoded = encodeColors(colors);
    const url = `${window.location.origin}/tools/color-palette-generator?colors=${encoded}`;
    window.history.replaceState(null, '', `?colors=${encoded}`);
    copy(url, 'share');
    flash('Share link copied to clipboard');
  };

  const savePalette = () => {
    const entry = { id: Date.now(), colors: colors.map((c) => c.hex) };
    setSaved((prev) => {
      const next = [entry, ...prev].slice(0, 24);
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    flash('Palette saved');
  };

  const applySaved = (entry) => {
    const cols = entry.colors.map((hex) => colorFromHex(hex));
    setCount(cols.length);
    commit(cols);
  };

  const applyExplore = (hexes) => {
    const cols = hexes.map((hex) => colorFromHex(hex));
    setVibe('');
    setCount(cols.length);
    commit(cols);
    setTab('preview');
    window.history.replaceState(null, '', `?colors=${encodeColors(cols)}`);
    flash('Palette loaded');
  };

  const deleteSaved = (id) =>
    setSaved((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });

  const faqs = [
    { q: 'How do I lock a color while generating?', a: 'Hover a swatch and click the lock icon. Locked colors stay fixed when you press Generate or the spacebar, so you can lock the ones you like and reroll the rest.' },
    { q: 'What is the live preview for?', a: 'The live preview applies your palette to a real landing page, dashboard or mobile app mockup, auto-assigning roles like background, primary and accent so you can judge the palette in context before you build.' },
    { q: 'How does the contrast matrix and auto-fix work?', a: 'The matrix shows the WCAG contrast ratio of every color pairing (AA needs 4.5:1, AAA needs 7:1). Auto-fix nudges the lightest and darkest colors until they pass AA, giving you a usable text/background pair.' },
    { q: 'Can I create a palette from an image?', a: 'Yes. Click "From image" and upload any photo - the tool samples it on a canvas and extracts its dominant colors.' },
    { q: 'What can I export the palette to?', a: 'CSS variables, CSS OKLCH, SCSS, Tailwind (v3 and v4 @theme), a JSON array, W3C design tokens, Android XML, SwiftUI, a plain hex list, and a PNG poster image. Undo and redo are available with Ctrl/Cmd+Z.' },
  ];

  return (
    <>
      <SEOHead
        title="Color Palette Generator - Preview, Contrast Check & Export"
        description="Advanced color palette generator with live UI preview, interactive color wheel, WCAG contrast matrix with auto-fix, gradient studio, image extraction, and export to CSS, OKLCH, Tailwind, SwiftUI, Android & PNG. Free and client-side."
        keywords="color palette generator, color scheme generator, color wheel, palette from image, wcag contrast checker, gradient generator, oklch, tailwind color generator, css color variables, ui color preview"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'Color Palette Generator',
          description: 'Create palettes, preview them on real UI, use a color wheel, check WCAG contrast, build gradients and export to CSS, OKLCH, Tailwind, SwiftUI, Android or PNG.',
          category: 'DesignApplication',
          keywords: ['color palette generator', 'color wheel', 'palette from image', 'wcag contrast', 'gradient generator', 'tailwind colors'],
          slug: 'color-palette-generator',
        }}
      />
      <StructuredData type="faq" pageData={{ faqs: faqs.map((f) => ({ question: f.q, answer: f.a })) }} />
      <StructuredData
        type="breadcrumbs"
        pageData={{
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: 'Color Palette Generator', path: '/tools/color-palette-generator' },
          ],
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-violet-500 shadow-lg mb-4">
              <Palette size={32} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Color Palette Generator</h1>
            <p className="text-slate-400 mt-2">
              Generate schemes, preview on real UI, tune on a wheel, check contrast, build gradients and export anywhere.
            </p>
          </motion.div>

          {/* Harmony modes */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => { setHarmonyMode(mode); setVibe(''); }}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium capitalize transition-all border ${
                  !vibe && harmonyMode === mode
                    ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white border-transparent shadow-lg'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {mode.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Vibe starters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mr-1">Vibe</span>
            {VIBE_LIST.map((v) => (
              <button
                key={v}
                onClick={() => setVibe(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all ${
                  vibe === v
                    ? 'bg-cyan-500 text-slate-950 border-cyan-500'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Command bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-xl p-1">
              <button onClick={() => setCount((c) => clamp(c - 1, 3, 8))} className="w-8 h-8 rounded-lg text-slate-300 hover:bg-slate-800 disabled:opacity-30" disabled={count <= 3} aria-label="Fewer colors">-</button>
              <span className="w-10 text-center text-sm font-mono text-white">{count}</span>
              <button onClick={() => setCount((c) => clamp(c + 1, 3, 8))} className="w-8 h-8 rounded-lg text-slate-300 hover:bg-slate-800 disabled:opacity-30" disabled={count >= 8} aria-label="More colors">+</button>
            </div>

            <div className="flex bg-slate-900/60 border border-slate-800 rounded-xl p-1">
              {['hex', 'rgb', 'hsl'].map((f) => (
                <button key={f} onClick={() => setFormat(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors ${format === f ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>{f}</button>
              ))}
            </div>

            {/* Undo / redo */}
            <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-xl p-1">
              <button onClick={undo} disabled={!past.length} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-800 disabled:opacity-30" title="Undo (Ctrl+Z)"><Undo2 size={15} /></button>
              <button onClick={redo} disabled={!future.length} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-800 disabled:opacity-30" title="Redo (Ctrl+Shift+Z)"><Redo2 size={15} /></button>
            </div>

            <button onClick={() => regenerate(false)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all">
              <RefreshCw size={16} /> Generate <span className="hidden sm:inline text-white/70 text-xs">(Space)</span>
            </button>

            <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 border border-slate-800 text-slate-200 rounded-xl hover:border-slate-700 transition-all">
              <ImageIcon size={16} /> From image
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => extractFromImage(e.target.files?.[0])} />

            <button onClick={sharePalette} className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 border border-slate-800 text-slate-200 rounded-xl hover:border-slate-700 transition-all">
              <Share2 size={16} /> Share
            </button>
            <button onClick={savePalette} className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 border border-slate-800 text-slate-200 rounded-xl hover:border-slate-700 transition-all">
              <Save size={16} /> Save
            </button>
          </div>

          {/* Palette canvas */}
          <div className="flex flex-wrap gap-2 sm:gap-3 rounded-2xl mb-8">
            {colors.map((color, index) => {
              const text = readableTextColor(color.hex);
              const cWhite = contrastRatio(color.hex, '#ffffff');
              const cBlack = contrastRatio(color.hex, '#000000');
              const best = cWhite >= cBlack ? { label: 'White', ratio: cWhite } : { label: 'Black', ratio: cBlack };
              const grade = wcagGrade(best.ratio);
              const shadesOpen = openShades === index;
              return (
                <div key={index} className="flex-1 min-w-[130px]">
                  <div
                    className="relative group h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
                    style={{ backgroundColor: color.hex, color: text }}
                    onClick={() => copy(formatColor(color, format), `sw-${index}`)}
                  >
                    <div className="absolute top-2 inset-x-2 flex items-center justify-between">
                      <button onClick={(e) => { e.stopPropagation(); toggleLock(index); }} className="p-2 rounded-lg bg-black/15 hover:bg-black/30 transition" style={{ color: text }} aria-label={color.locked ? 'Unlock color' : 'Lock color'}>
                        {color.locked ? <Lock size={16} /> : <Unlock size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </button>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}>
                        {grade === 'Fail' ? 'Low contrast' : `${grade} on ${best.label}`}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono font-bold text-sm sm:text-base">{formatColor(color, format)}</span>
                      <span className="text-[11px] font-medium opacity-70">{nearestColorName(color.hex)}</span>
                      <span className="mt-1 inline-flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {copied === `sw-${index}` ? <Check size={14} /> : <Copy size={14} />}
                        {copied === `sw-${index}` ? 'Copied' : 'Click to copy'}
                      </span>
                    </div>

                    <div className="absolute bottom-2 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <label className="p-1.5 rounded-lg bg-black/15 hover:bg-black/30 cursor-pointer" onClick={(e) => e.stopPropagation()} title="Edit color">
                        <input type="color" value={color.hex} onChange={(e) => setColorHex(index, e.target.value)} className="w-4 h-4 opacity-0 absolute" />
                        <Palette size={15} style={{ color: text }} />
                      </label>
                      <button onClick={(e) => { e.stopPropagation(); setOpenShades(shadesOpen ? null : index); }} className="p-1.5 rounded-lg bg-black/15 hover:bg-black/30" style={{ color: text }} title="Tints & shades">
                        <Layers size={15} />
                      </button>
                    </div>
                  </div>

                  {shadesOpen && (
                    <div className="mt-2 grid grid-cols-9 gap-1 rounded-lg overflow-hidden">
                      {buildShades(color).map((sh) => (
                        <button key={sh} className="h-8 relative group/sh" style={{ backgroundColor: sh }} onClick={() => copy(sh.toUpperCase(), `sh-${index}-${sh}`)} title={sh.toUpperCase()}>
                          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/sh:opacity-100">
                            {copied === `sh-${index}-${sh}` ? <Check size={12} style={{ color: readableTextColor(sh) }} /> : <Copy size={11} style={{ color: readableTextColor(sh) }} />}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Workspace tabs */}
          <div className="flex gap-1 p-1 bg-slate-900/60 border border-slate-800 rounded-xl mb-5 overflow-x-auto">
            {WORKSPACE_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  tab === t.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <t.icon size={15} /> {t.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 min-h-[300px]">
            {tab === 'preview' && colors.length > 0 && <PalettePreview colors={colors} />}
            {tab === 'wheel' && colors.length > 0 && <ColorWheel colors={colors} onDragStart={snapshot} onChange={setColors} />}
            {tab === 'contrast' && colors.length > 0 && <ContrastMatrix colors={colors} onAutoFix={autoFixContrast} />}
            {tab === 'gradient' && colors.length > 0 && <GradientStudio colors={colors} />}
            {tab === 'accessibility' && colors.length > 0 && <AccessibilityPanel colors={colors} />}
            {tab === 'explore' && <ExploreGallery onApply={applyExplore} />}
            {tab === 'export' && (
              <div>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <h2 className="text-lg font-bold text-white">Export palette</h2>
                  <button onClick={downloadPng} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-rose-500 to-violet-500 text-white hover:shadow-lg hover:shadow-rose-500/25 transition-all">
                    <ImageDown size={14} /> Download PNG poster
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {EXPORT_FORMATS.map((fmt) => (
                    <div key={fmt.id} className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-900/40">
                        <span className="text-xs font-bold uppercase text-slate-300">{fmt.label}</span>
                        <div className="flex gap-1">
                          <button onClick={() => copy(exportContent(fmt.id), `ex-${fmt.id}`)} className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800" title="Copy">
                            {copied === `ex-${fmt.id}` ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          </button>
                          <button onClick={() => downloadExport(fmt.id)} className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800" title="Download">
                            <Download size={13} />
                          </button>
                        </div>
                      </div>
                      <pre className="p-3 text-[11px] text-slate-400 font-mono overflow-x-auto max-h-28">{exportContent(fmt.id)}</pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Saved palettes */}
          {saved.length > 0 && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Saved palettes</h2>
              <div className="space-y-2">
                {saved.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3">
                    <button onClick={() => applySaved(entry)} className="flex-1 flex h-9 rounded-lg overflow-hidden border border-slate-800" title="Apply palette">
                      {entry.colors.map((hex, i) => (
                        <span key={i} className="flex-1" style={{ backgroundColor: hex }} />
                      ))}
                    </button>
                    <button onClick={() => deleteSaved(entry.id)} className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800" title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-slate-800/60 pb-3">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-slate-200 font-semibold text-sm">
                    {f.q}
                    <ChevronDown size={16} className="text-slate-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Harmony guide */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Color harmony guide</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-slate-300 text-sm">
              <div><strong className="text-white">Complementary:</strong> Opposite hues on the wheel. Bold, high-contrast pairings.</div>
              <div><strong className="text-white">Analogous:</strong> Neighboring hues. Calm and cohesive.</div>
              <div><strong className="text-white">Triadic:</strong> Three evenly spaced hues. Vibrant yet balanced.</div>
              <div><strong className="text-white">Tetradic:</strong> Two complementary pairs. Rich and varied.</div>
              <div><strong className="text-white">Split-complementary:</strong> A base plus two neighbors of its complement. High contrast, easier to balance.</div>
              <div><strong className="text-white">Monochromatic:</strong> One hue across many lightness values. Elegant and minimal.</div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm shadow-2xl">
          {toast}
        </div>
      )}
    </>
  );
};

export default ColorPaletteGenerator;
