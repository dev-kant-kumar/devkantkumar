import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Download,
    Link as LinkIcon,
    QrCode,
    Settings
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';
import StructuredData from '../../../../../components/SEO/StructuredData';

const QrCodeGenerator = () => {
  const [text, setText] = useState('https://www.devkantkumar.com');
  const [size, setSize] = useState(300);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate QR URL using api.qrserver.com
  // Format: https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example&color=000000&bgcolor=FFFFFF
  useEffect(() => {
     const generate = () => {
        if (!text) return;
        setLoading(true);
        const encodedText = encodeURIComponent(text);
        const colorClean = color.replace('#', '');
        const bgClean = bgColor.replace('#', '');
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&color=${colorClean}&bgcolor=${bgClean}&margin=10`;
        setQrUrl(url);
     };

     // Debounce generation
     const timer = setTimeout(generate, 500);
     return () => clearTimeout(timer);
  }, [text, size, color, bgColor]);

  const handleImageLoad = () => {
     setLoading(false);
  };

  const downloadQr = async () => {
    try {
       const response = await fetch(qrUrl);
       const blob = await response.blob();
       const url = window.URL.createObjectURL(blob);
       const link = document.createElement('a');
       link.href = url;
       link.download = `qrcode-${Date.now()}.png`;
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
       window.URL.revokeObjectURL(url);
    } catch (error) {
       console.error('Download failed:', error);
       alert('Failed to download QR Code. Please try distinct right-click > save image.');
    }
  };

  return (
    <>
      <SEOHead
        title="QR Code Generator - Free Online QR Creator | Dev Kant Kumar"
        description="Create custom QR Codes instantly for free. Generate QR codes for URLs, text, chemicals, and more. Customize colors and download high-quality PNGs."
        keywords="qr code generator, free qr code, create qr code, custom qr code, qr code maker, qr code online"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'QR Code Generator',
          description: 'Create custom QR codes for URLs, text, and more.',
          category: 'DesignTool',
          keywords: ['qr code generator', 'qr creator', 'qrcode maker', 'free qr code'],
          slug: 'qr-code-generator'
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <div className="grid md:grid-cols-2 gap-8">
             {/* Controls */}
             <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                         <QrCode size={24} className="text-white" />
                      </div>
                      <h1 className="text-2xl font-bold text-white">QR Code Generator</h1>
                   </div>
                   <p className="text-slate-400 text-sm">Create custom QR codes for your links instantly.</p>
                </motion.div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
                   {/* Content Input */}
                   <div>
                      <label className="text-slate-400 text-sm font-medium block mb-2">Content (URL or Text)</label>
                      <div className="relative">
                         <LinkIcon size={16} className="absolute left-3 top-3.5 text-slate-500" />
                         <input
                           type="text"
                           value={text}
                           onChange={(e) => setText(e.target.value)}
                           placeholder="https://example.com"
                           className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
                         />
                      </div>
                   </div>

                   {/* Customization */}
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                         <Settings size={14} /> Customize
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-xs text-slate-500 block mb-1">Foreground</label>
                            <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700">
                               <input
                                  type="color"
                                  value={color}
                                  onChange={(e) => setColor(e.target.value)}
                                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0"
                               />
                               <span className="text-xs text-slate-300 font-mono">{color}</span>
                            </div>
                         </div>
                         <div>
                            <label className="text-xs text-slate-500 block mb-1">Background</label>
                             <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700">
                               <input
                                  type="color"
                                  value={bgColor}
                                  onChange={(e) => setBgColor(e.target.value)}
                                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0"
                               />
                               <span className="text-xs text-slate-300 font-mono">{bgColor}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Preview */}
             <div className="flex flex-col">
                <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.2 }}
                   className="flex-1 bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl min-h-[400px]"
                >
                   {qrUrl && (
                      <div className="relative">
                         {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                               <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                         )}
                         <img
                           src={qrUrl}
                           alt="QR Code"
                           className="w-64 h-64 object-contain"
                           onLoad={handleImageLoad}
                         />
                      </div>
                   )}
                   <p className="mt-4 text-slate-400 text-sm text-center">
                      Scans to: <span className="text-emerald-600 font-medium truncate max-w-[200px] inline-block align-bottom">{text}</span>
                   </p>
                </motion.div>

                <button
                   onClick={downloadQr}
                   disabled={!text}
                   className="mt-6 w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   <Download size={20} /> Download PNG
                </button>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QrCodeGenerator;
