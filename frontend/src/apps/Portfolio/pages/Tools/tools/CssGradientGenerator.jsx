import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    Copy,
    Palette,
    RotateCw
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';

const CssGradientGenerator = () => {
  const [color1, setColor1] = useState('#8b5cf6'); // Violet-500
  const [color2, setColor2] = useState('#ec4899'); // Pink-500
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState('linear'); // linear, radial
  const [copied, setCopied] = useState(false);

  const getCss = () => {
    if (type === 'radial') {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
    return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCss());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const getRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

  const randomGradient = () => {
     setColor1(getRandomColor());
     setColor2(getRandomColor());
     setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <>
      <SEOHead
        title="CSS Gradient Generator - Free Online Color Tool | Dev Kant Kumar"
        description="Create beautiful CSS gradients visually. Generate linear and radial gradients, customize colors and angles, and get ready-to-use CSS code. Free tool for designers and developers."
        keywords="css gradient generator, gradient maker, linear gradient, radial gradient, css background generator, web design tools"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'CSS Gradient Generator',
          description: 'Create beautiful linear and radial CSS gradients visually.',
          category: 'DesignTool',
          keywords: ['css gradient', 'gradient generator', 'css background', 'color gradient'],
          slug: 'css-gradient-generator'
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
             {/* Left Column: Controls */}
             <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                      <Palette size={24} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">CSS Gradient Generator</h1>
                  </div>
                  <p className="text-slate-400 text-sm">Design beautiful background gradients instantly.</p>
                </motion.div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
                   {/* Colors */}
                   <div className="space-y-4">
                      <label className="text-slate-400 text-sm font-medium">Colors</label>
                      <div className="flex gap-4">
                         <div className="flex-1">
                            <input
                              type="color"
                              value={color1}
                              onChange={(e) => setColor1(e.target.value)}
                              className="w-full h-12 rounded-lg cursor-pointer bg-transparent border border-slate-700 p-1"
                            />
                            <input
                               type="text"
                               value={color1}
                               onChange={(e) => setColor1(e.target.value)}
                               className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white uppercase font-mono text-center"
                            />
                         </div>
                         <div className="flex-1">
                            <input
                              type="color"
                              value={color2}
                              onChange={(e) => setColor2(e.target.value)}
                              className="w-full h-12 rounded-lg cursor-pointer bg-transparent border border-slate-700 p-1"
                            />
                            <input
                               type="text"
                               value={color2}
                               onChange={(e) => setColor2(e.target.value)}
                               className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white uppercase font-mono text-center"
                            />
                         </div>
                      </div>
                   </div>

                   {/* Type & Angle */}
                   <div className="space-y-4">
                      <div className="flex justify-between items-center">
                         <label className="text-slate-400 text-sm font-medium">Direction</label>
                         <div className="flex bg-slate-800 rounded-lg p-1">
                            <button
                               onClick={() => setType('linear')}
                               className={`px-3 py-1 text-xs font-medium rounded ${type === 'linear' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                            >
                               Linear
                            </button>
                            <button
                               onClick={() => setType('radial')}
                               className={`px-3 py-1 text-xs font-medium rounded ${type === 'radial' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                            >
                               Radial
                            </button>
                         </div>
                      </div>

                      {type === 'linear' && (
                         <div>
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                               <span>Angle</span>
                               <span>{angle}°</span>
                            </div>
                            <input
                               type="range"
                               min="0"
                               max="360"
                               value={angle}
                               onChange={(e) => setAngle(Number(e.target.value))}
                               className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                            />
                         </div>
                      )}
                   </div>

                   <button
                     onClick={randomGradient}
                     className="w-full py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                   >
                     <RotateCw size={16} /> Randomize Colors
                   </button>
                </div>
             </div>

             {/* Right Column: Preview */}
             <div className="space-y-6">
                <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.2 }}
                   className="aspect-square w-full rounded-2xl shadow-2xl relative border border-white/10"
                   style={{
                      background: type === 'linear'
                        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
                        : `radial-gradient(circle, ${color1}, ${color2})`
                   }}
                >
                   <div className="absolute inset-4 border border-white/20 rounded-xl" />
                </motion.div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                   <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                      <span className="text-white font-medium text-sm">CSS Code</span>
                      <button
                         onClick={copyToClipboard}
                         className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-xs font-medium transition-colors"
                      >
                         {copied ? <Check size={14} /> : <Copy size={14} />}
                         {copied ? 'Copied!' : 'Copy CSS'}
                      </button>
                   </div>
                   <div className="p-4 bg-[#0d1117]">
                      <code className="text-pink-400 text-sm font-mono break-all">
                         {getCss()}
                      </code>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CssGradientGenerator;
