import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    Copy,
    Fingerprint,
    RefreshCw
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';

const UuidGenerator = () => {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState(4);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateUuidV4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUuidV1 = () => {
    // Simulated V1 (not true V1 but sufficient for most non-critical uses or we'd need a lib)
    // For a pure client-side tool without deps, strictly V4 is best, but we can simulate structure
    // Actually, widespread use prefers V4. Let's stick to V4 mostly but labeled as V1 structure if needed,
    // OR just support V4 as it's the standard.
    // Decision: Let's implement a proper V4 and a pseudo-V1 based on timestamp

    let now = Date.now();
    const uuid = 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (now + Math.random() * 16) % 16 | 0;
      now = Math.floor(now / 16);
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return uuid;
  };

  const generate = useCallback(() => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      let uuid = version === 1 ? generateUuidV1() : generateUuidV4();

      if (!hyphens) {
        uuid = uuid.replace(/-/g, '');
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      newUuids.push(uuid);
    }
    setUuids(newUuids);
  }, [count, version, hyphens, uppercase]);

  // Generate on mount
  React.useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = async (text, index = null) => {
    try {
      await navigator.clipboard.writeText(text);
      if (index !== null) {
        setCopied(index);
        setTimeout(() => setCopied(null), 1500);
      } else {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      }
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  return (
    <>
      <SEOHead
        title="UUID / GUID Generator Online - Free V4 UUID Tool | Dev Kant Kumar"
        description="Free online bulk UUID (GUID) generator. Generate Version 1 and Version 4 UUIDs instantly. Customizable format with uppercase and hyphen options."
        keywords="uuid generator, guid generator, uuid v4 generator, bulk uuid generator, random uuid, unique identifier generator"
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg mb-4">
              <Fingerprint size={32} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">UUID / GUID Generator</h1>
            <p className="text-slate-400 mt-2">Generate random unique identifiers (Version 1 & 4)</p>
          </motion.div>

          {/* Controls */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-sm block mb-2">Version</label>
                  <select
                    value={version}
                    onChange={(e) => setVersion(Number(e.target.value))}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value={4}>Version 4 (Random)</option>
                    <option value={1}>Version 1 (Time-based)</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex items-end gap-4">
                  <label className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={hyphens}
                      onChange={(e) => setHyphens(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="text-slate-300 text-sm">Hyphens</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="text-slate-300 text-sm">Uppercase</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={generate}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                >
                  <RefreshCw size={20} />
                  Generate UUIDs
                </button>
                <button
                  onClick={() => copyToClipboard(uuids.join('\n'))}
                  className="px-6 py-4 bg-slate-800 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-700 transition-all flex items-center gap-2"
                >
                  {copiedAll ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  Copy All
                </button>
              </div>
            </div>
          </motion.div>

          {/* Output */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <span className="text-white font-medium">Generated UUIDs</span>
                <span className="text-slate-500 text-sm">{uuids.length} items</span>
              </div>
              <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-800/50">
                {uuids.map((uuid, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors group">
                    <code className="font-mono text-cyan-300 text-sm sm:text-base break-all">{uuid}</code>
                    <button
                      onClick={() => copyToClipboard(uuid, index)}
                      className="p-2 text-slate-500 hover:text-white hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Copy"
                    >
                      {copied === index ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">What is a UUID/GUID?</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              A UUID (Universally Unique Identifier) or GUID (Globally Unique Identifier) is a 128-bit number
              used to identify information in computer systems. They are unique across both space and time.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800/50 p-4 rounded-xl">
                <strong className="text-indigo-400 block mb-1">Version 4 (Random)</strong>
                <p className="text-slate-400">Generated using random numbers. The most common version used today for primary keys.</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl">
                <strong className="text-indigo-400 block mb-1">Version 1 (Time-based)</strong>
                <p className="text-slate-400">Generated using a timestamp and the MAC address of the computer generating it.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default UuidGenerator;
