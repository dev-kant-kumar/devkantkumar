import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    Copy,
    Download,
    Lock,
    Palette,
    RefreshCw,
    Unlock
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';

const ColorPaletteGenerator = () => {
  const [colors, setColors] = useState([]);
  const [copied, setCopied] = useState(null);
  const [harmonyMode, setHarmonyMode] = useState('random');

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generateRandomColor = () => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 40) + 50; // 50-90%
    const l = Math.floor(Math.random() * 40) + 30; // 30-70%
    return { h, s, l, hex: hslToHex(h, s, l), locked: false };
  };

  const generateHarmoniousColors = useCallback((mode) => {
    const baseHue = Math.floor(Math.random() * 360);
    const newColors = [];

    switch (mode) {
      case 'complementary':
        newColors.push({ h: baseHue, s: 70, l: 50, locked: false });
        newColors.push({ h: baseHue, s: 60, l: 70, locked: false });
        newColors.push({ h: (baseHue + 180) % 360, s: 70, l: 50, locked: false });
        newColors.push({ h: (baseHue + 180) % 360, s: 60, l: 70, locked: false });
        newColors.push({ h: baseHue, s: 50, l: 40, locked: false });
        break;
      case 'analogous':
        for (let i = 0; i < 5; i++) {
          newColors.push({ h: (baseHue + i * 30) % 360, s: 65, l: 50 + i * 5, locked: false });
        }
        break;
      case 'triadic':
        newColors.push({ h: baseHue, s: 70, l: 50, locked: false });
        newColors.push({ h: baseHue, s: 60, l: 65, locked: false });
        newColors.push({ h: (baseHue + 120) % 360, s: 70, l: 50, locked: false });
        newColors.push({ h: (baseHue + 240) % 360, s: 70, l: 50, locked: false });
        newColors.push({ h: (baseHue + 240) % 360, s: 60, l: 65, locked: false });
        break;
      case 'monochromatic':
        for (let i = 0; i < 5; i++) {
          newColors.push({ h: baseHue, s: 60, l: 25 + i * 12, locked: false });
        }
        break;
      default:
        for (let i = 0; i < 5; i++) {
          const color = generateRandomColor();
          newColors.push(color);
        }
    }

    return newColors.map(c => ({ ...c, hex: hslToHex(c.h, c.s, c.l) }));
  }, []);

  const generate = useCallback(() => {
    const newColors = generateHarmoniousColors(harmonyMode);
    setColors(prev => prev.map((c, i) => c.locked ? c : (newColors[i] || c)));
  }, [harmonyMode, generateHarmoniousColors]);

  const generateFresh = useCallback(() => {
    setColors(generateHarmoniousColors(harmonyMode));
  }, [harmonyMode, generateHarmoniousColors]);

  useEffect(() => {
    setColors(generateHarmoniousColors(harmonyMode));
  }, []);

  const toggleLock = (index) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, locked: !c.locked } : c));
  };

  const copyColor = async (hex, index) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const exportPalette = (format) => {
    let content = '';
    const filename = `palette-${Date.now()}`;

    switch (format) {
      case 'css':
        content = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
        break;
      case 'scss':
        content = colors.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n');
        break;
      case 'tailwind':
        content = `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${colors.map((c, i) => `        'custom-${i + 1}': '${c.hex}',`).join('\n')}\n      }\n    }\n  }\n}`;
        break;
      case 'json':
        content = JSON.stringify(colors.map(c => c.hex), null, 2);
        break;
      default:
        content = colors.map(c => c.hex).join('\n');
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format === 'tailwind' ? 'js' : format === 'json' ? 'json' : format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getContrastColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  return (
    <>
      <SEOHead
        title="Color Palette Generator - Free Color Scheme Tool | Dev Kant Kumar"
        description="Generate beautiful color palettes for your designs. Create harmonious color schemes with complementary, analogous, triadic, and monochromatic modes. Export as CSS, SCSS, or Tailwind."
        keywords="color palette generator, color scheme, color picker, palette generator, css colors, tailwind colors, design colors"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'Color Palette Generator',
          description: 'Generate beautiful harmonious color palettes for your designs.',
          category: 'DesignTool',
          keywords: ['color palette generator', 'color scheme', 'color picker', 'palette generator'],
          slug: 'color-palette-generator'
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
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
            <p className="text-slate-400 mt-2">Generate beautiful color schemes for your designs</p>
          </motion.div>

          {/* Harmony Mode */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              {['random', 'complementary', 'analogous', 'triadic', 'monochromatic'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => { setHarmonyMode(mode); }}
                  className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${
                    harmonyMode === mode
                      ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Color Palette */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <div className="grid grid-cols-5 gap-2 sm:gap-4 h-64 sm:h-80 rounded-2xl overflow-hidden">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyColor(color.hex, index)}
                >
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: getContrastColor(color.hex) }}
                  >
                    <span className="font-mono font-semibold text-sm sm:text-lg mb-2">{color.hex.toUpperCase()}</span>
                    {copied === index ? (
                      <Check size={24} />
                    ) : (
                      <Copy size={24} />
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLock(index); }}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: getContrastColor(color.hex) }}
                  >
                    {color.locked ? <Lock size={16} /> : <Unlock size={16} />}
                  </button>
                  {color.locked && (
                    <div className="absolute top-2 left-2" style={{ color: getContrastColor(color.hex) }}>
                      <Lock size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={generate}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all"
            >
              <RefreshCw size={20} />
              Generate (Space)
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 px-6 py-4 bg-slate-800 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-700 transition-all">
                <Download size={20} />
                Export
              </button>
              <div className="absolute top-full mt-2 left-0 w-40 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {['css', 'scss', 'tailwind', 'json'].map((format) => (
                  <button
                    key={format}
                    onClick={() => exportPalette(format)}
                    className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-700 hover:text-white uppercase text-sm"
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Color Values */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Color Values</h2>
            <div className="grid sm:grid-cols-5 gap-4">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ backgroundColor: color.hex }} />
                  <div>
                    <p className="font-mono text-white text-sm">{color.hex.toUpperCase()}</p>
                    <p className="text-slate-500 text-xs">HSL({color.h}, {color.s}%, {color.l}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Color Harmony Guide</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-slate-400 text-sm">
              <div><strong className="text-white">Complementary:</strong> Colors opposite on the color wheel. High contrast.</div>
              <div><strong className="text-white">Analogous:</strong> Colors next to each other. Harmonious and pleasing.</div>
              <div><strong className="text-white">Triadic:</strong> Three colors equally spaced. Vibrant and balanced.</div>
              <div><strong className="text-white">Monochromatic:</strong> Variations of one hue. Elegant and cohesive.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ColorPaletteGenerator;
