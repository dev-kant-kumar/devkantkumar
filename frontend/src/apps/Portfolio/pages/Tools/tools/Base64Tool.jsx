import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    ArrowRightLeft,
    Check,
    Copy,
    Hash,
    Trash2
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [urlSafe, setUrlSafe] = useState(false);

  const encode = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter text to encode');
      setOutput('');
      return;
    }
    try {
      let encoded = btoa(unescape(encodeURIComponent(input)));
      if (urlSafe) {
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
      setOutput(encoded);
      setError('');
    } catch (e) {
      setError('Encoding failed: ' + e.message);
      setOutput('');
    }
  }, [input, urlSafe]);

  const decode = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter Base64 to decode');
      setOutput('');
      return;
    }
    try {
      let base64 = input;
      if (urlSafe) {
        base64 = input.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
      }
      const decoded = decodeURIComponent(escape(atob(base64)));
      setOutput(decoded);
      setError('');
    } catch (e) {
      setError('Invalid Base64 string');
      setOutput('');
    }
  }, [input, urlSafe]);

  const process = () => {
    if (mode === 'encode') encode();
    else decode();
  };

  const swapMode = () => {
    setMode(m => m === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
    setError('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <>
      <SEOHead
        title="Base64 Encoder & Decoder Online - Free Tool | Dev Kant Kumar"
        description="Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings instantly. Supports URL-safe Base64 encoding. No signup required."
        keywords="base64 encoder, base64 decoder, encode base64, decode base64, base64 converter, text to base64, base64 online"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'Base64 Encoder & Decoder',
          description: 'Encode and decode Base64 strings online. Supports URL-safe mode.',
          category: 'DeveloperApplication',
          keywords: ['base64 encoder', 'base64 decoder', 'base64 converter', 'encode base64'],
          slug: 'base64-encoder-decoder'
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <Hash size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Base64 Encoder & Decoder</h1>
                <p className="text-slate-400 mt-1">Encode and decode Base64 strings online</p>
              </div>
            </div>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setMode('encode')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  mode === 'encode'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Encode
              </button>
              <button onClick={swapMode} className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
                <ArrowRightLeft size={20} className="text-slate-400" />
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  mode === 'decode'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Decode
              </button>
            </div>
          </motion.div>

          {/* Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <span className="text-white font-medium">{mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}</span>
                <button onClick={clearAll} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white">
                  <Trash2 size={18} />
                </button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                className="w-full h-40 p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none"
              />
            </div>
          </motion.div>

          {/* Options & Process */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <label className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={urlSafe}
                onChange={(e) => setUrlSafe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-slate-300 text-sm">URL-Safe Mode</span>
            </label>

            <button
              onClick={process}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </button>
          </motion.div>

          {/* Output */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <span className="text-white font-medium">Result</span>
                <button
                  onClick={copyToClipboard}
                  disabled={!output}
                  className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white disabled:opacity-50"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
              <div className="p-4 min-h-[120px]">
                {error ? (
                  <div className="text-red-400 font-mono text-sm flex items-center gap-2">
                    <AlertCircle size={18} /> {error}
                  </div>
                ) : output ? (
                  <pre className="text-cyan-400 font-mono text-sm whitespace-pre-wrap break-all">{output}</pre>
                ) : (
                  <span className="text-slate-600 font-mono text-sm">Result will appear here...</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What is Base64?</h2>
            <p className="text-slate-400 leading-relaxed">
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
              It's commonly used for encoding data in emails, embedding images in HTML/CSS, and transmitting
              data over protocols that only support text. URL-safe Base64 uses different characters to avoid
              issues in URLs and filenames.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Base64Tool;
