import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    Check,
    CheckCircle,
    Copy,
    Download,
    FileJson,
    Maximize2,
    Minimize2,
    Sparkles,
    Trash2,
    Upload
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to format');
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError('');
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput('');
    }
  }, [input, indentSize]);

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to minify');
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput('');
    }
  }, [input]);

  const validateJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to validate');
      return;
    }
    try {
      JSON.parse(input);
      setError('');
      setOutput('✅ Valid JSON!');
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput('');
    }
  }, [input]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output || input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const downloadJson = () => {
    const content = output || input;
    if (!content) return;
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInput(event.target?.result || '');
        setError('');
        setOutput('');
      };
      reader.readAsText(file);
    }
  };

  const sampleJson = () => {
    setInput(JSON.stringify({
      name: "Dev Kant Kumar",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      experience: { years: 3, projects: 50 },
      available: true
    }, null, 2));
    setError('');
    setOutput('');
  };

  return (
    <>
      <SEOHead
        title="JSON Formatter & Validator Online - Free Tool | Dev Kant Kumar"
        description="Free online JSON formatter, beautifier, minifier and validator. Format JSON with syntax highlighting, validate JSON structure, and minify JSON data. No signup required."
        keywords="json formatter, json validator, json beautifier, json minifier, format json online, validate json, json parser, json tool"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'JSON Formatter & Validator',
          description: 'Format, beautify, minify, and validate JSON data online.',
          category: 'DeveloperApplication',
          keywords: ['json formatter', 'json validator', 'json beautifier', 'json minifier'],
          slug: 'json-formatter'
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Tools
            </Link>
          </nav>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                <FileJson size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  JSON Formatter & Validator
                </h1>
                <p className="text-slate-400 mt-1">
                  Format, beautify, minify, and validate JSON data online
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Tool Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid lg:grid-cols-2 gap-6 mb-8"
          >
            {/* Input Panel */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <span className="text-white font-medium">Input JSON</span>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                    <Upload size={18} />
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={sampleJson}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                    title="Load Sample"
                  >
                    <Sparkles size={18} />
                  </button>
                  <button
                    onClick={clearAll}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                    title="Clear"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Paste your JSON here...\n\nExample:\n{\n  "name": "value"\n}'
                className="w-full h-80 p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none placeholder:text-slate-600"
                spellCheck={false}
              />
            </div>

            {/* Output Panel */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <span className="text-white font-medium">Output</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    disabled={!output && !input}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white disabled:opacity-50"
                    title="Copy"
                  >
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                  <button
                    onClick={downloadJson}
                    disabled={!output && !input}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white disabled:opacity-50"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
              <div className="relative h-80 overflow-auto">
                {error ? (
                  <div className="p-4 text-red-400 font-mono text-sm flex items-start gap-2">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                ) : output ? (
                  <pre className="p-4 text-green-400 font-mono text-sm whitespace-pre-wrap">
                    {output}
                  </pre>
                ) : (
                  <div className="p-4 text-slate-600 font-mono text-sm">
                    Formatted output will appear here...
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            {/* Indent Size */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl">
              <span className="text-slate-400 text-sm">Indent:</span>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>1 tab</option>
              </select>
            </div>

            <button
              onClick={formatJson}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              <Maximize2 size={18} />
              Format / Beautify
            </button>

            <button
              onClick={minifyJson}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-700 transition-all"
            >
              <Minimize2 size={18} />
              Minify
            </button>

            <button
              onClick={validateJson}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-700 transition-all"
            >
              <CheckCircle size={18} />
              Validate Only
            </button>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">About JSON Formatter</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">What is JSON?</h3>
                <p className="text-slate-400 leading-relaxed">
                  JSON (JavaScript Object Notation) is a lightweight data interchange format
                  that is easy for humans to read and write, and easy for machines to parse
                  and generate. It's commonly used for APIs and configuration files.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Features</h3>
                <ul className="text-slate-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Format & beautify JSON with custom indentation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Minify JSON to reduce file size
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Validate JSON syntax with error detection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Upload JSON files or paste directly
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Download formatted output
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default JsonFormatter;
