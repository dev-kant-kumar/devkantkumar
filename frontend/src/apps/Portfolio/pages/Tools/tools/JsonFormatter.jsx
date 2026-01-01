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
    Upload,
    Wand2
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const inputRef = useRef(null);
  const inputLineRef = useRef(null);
  const outputRef = useRef(null);
  const outputLineRef = useRef(null);

  // Sync scroll between textarea and line numbers
  const syncScroll = useCallback((source, target) => {
    if (source?.current && target?.current) {
      target.current.scrollTop = source.current.scrollTop;
    }
  }, []);

  // Generate line numbers with error highlighting
  const getLineNumbers = useCallback((text) => {
    if (!text) return [{ number: 1, isError: false }];
    const lines = text.split('\n').length;
    return Array.from({ length: Math.max(lines, 1) }, (_, i) => ({
      number: i + 1,
      isError: errorDetails?.line === i + 1
    }));
  }, [errorDetails]);

  // Enhanced error message parsing
  const parseErrorMessage = useCallback((message, inputText) => {
    try {
      // Chrome/Node style: "at line X column Y"
      let match = message.match(/at line (\d+) column (\d+)/i);
      if (match) {
        return {
          line: parseInt(match[1], 10),
          column: parseInt(match[2], 10)
        };
      }

      // Firefox style: "line X column Y"
      match = message.match(/line (\d+) column (\d+)/i);
      if (match) {
        return {
          line: parseInt(match[1], 10),
          column: parseInt(match[2], 10)
        };
      }

      // Position-only style: "at position X"
      match = message.match(/at position (\d+)/i);
      if (match) {
        const pos = parseInt(match[1], 10);
        const before = inputText.substring(0, pos);
        const lines = before.split('\n');
        return {
          line: lines.length,
          column: lines[lines.length - 1].length + 1
        };
      }

      // Safari style: "JSON Parse error: Expected..."
      match = message.match(/JSON Parse error/i);
      if (match) {
        // Try to find line number in subsequent text
        const lineMatch = message.match(/(\d+)/);
        if (lineMatch) {
          return { line: parseInt(lineMatch[1], 10), column: 1 };
        }
      }
    } catch (e) {
      console.error('Error parsing error message:', e);
    }
    return null;
  }, []);

  // Format JSON with validation
  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to format');
      setOutput('');
      setErrorDetails(null);
      return;
    }

    setIsProcessing(true);
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError('');
      setErrorDetails(null);
    } catch (e) {
      const details = parseErrorMessage(e.message, input);
      setError(`Invalid JSON: ${e.message}`);
      setErrorDetails(details);
      setOutput('');
    } finally {
      setIsProcessing(false);
    }
  }, [input, indentSize, parseErrorMessage]);

  // Minify JSON
  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to minify');
      setOutput('');
      setErrorDetails(null);
      return;
    }

    setIsProcessing(true);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
      setErrorDetails(null);
    } catch (e) {
      const details = parseErrorMessage(e.message, input);
      setError(`Invalid JSON: ${e.message}`);
      setErrorDetails(details);
      setOutput('');
    } finally {
      setIsProcessing(false);
    }
  }, [input, parseErrorMessage]);

  // Validate JSON
  const validateJson = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to validate');
      setOutput('');
      setErrorDetails(null);
      return;
    }

    setIsProcessing(true);
    try {
      JSON.parse(input);
      setError('');
      setErrorDetails(null);
      setOutput('✅ Valid JSON!');
    } catch (e) {
      const details = parseErrorMessage(e.message, input);
      setError(`Invalid JSON: ${e.message}`);
      setErrorDetails(details);
      setOutput('');
    } finally {
      setIsProcessing(false);
    }
  }, [input, parseErrorMessage]);

  // Copy to clipboard with error handling
  const copyToClipboard = async () => {
    const contentToCopy = output || input;
    if (!contentToCopy.trim()) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(contentToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = contentToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  };

  // Clear all fields
  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
    setErrorDetails(null);
  }, []);

  // Download JSON file
  const downloadJson = useCallback(() => {
    const content = output || input;
    if (!content.trim()) return;

    try {
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      a.href = url;
      a.download = `formatted-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to download:', e);
      setError('Failed to download file');
    }
  }, [output, input]);

  // Handle file upload with validation
  const handleFileUpload = useCallback((e) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      setError('Please upload a valid JSON file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setInput(text);
        setError('');
        setOutput('');
        setErrorDetails(null);
      }
    };

    reader.onerror = () => {
      setError('Failed to read file');
    };

    reader.readAsText(file);

    // Reset file input
    if (e.target) {
      e.target.value = '';
    }
  }, []);

  // Enhanced auto-fix with better error handling
  const handleAutoFix = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to fix');
      return;
    }

    setIsProcessing(true);
    let fixed = input;

    try {
      // 1. Normalize line endings
      fixed = fixed.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

      // 2. Remove BOM if present
      if (fixed.charCodeAt(0) === 0xFEFF) {
        fixed = fixed.slice(1);
      }

      // 3. Convert smart/curly quotes to standard quotes
      fixed = fixed.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"');
      fixed = fixed.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");

      // 4. Remove comments (single line and multi-line)
      fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');
      fixed = fixed.replace(/\/\/.*/g, '');

      // 5. Convert single quotes to double quotes for property names and string values
      fixed = fixed.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

      // 6. Wrap unquoted keys
      fixed = fixed.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

      // 7. Remove trailing commas before closing brackets/braces
      fixed = fixed.replace(/,(\s*[\]}])/g, '$1');

      // 8. Fix missing commas between array/object elements
      fixed = fixed.replace(/("\s*:\s*(?:"[^"]*"|[^,}\]]+))(\s+")([^"]*"\s*:)/g, '$1,$2$3');
      fixed = fixed.replace(/(\}|\]|"|\d|true|false|null)(\s*)(\{|\[|")/g, '$1,$2$3');

      // 9. Remove multiple consecutive commas
      fixed = fixed.replace(/,+/g, ',');

      // 10. Fix common value typos
      fixed = fixed.replace(/:\s*undefined/g, ': null');
      fixed = fixed.replace(/:\s*True/g, ': true');
      fixed = fixed.replace(/:\s*False/g, ': false');
      fixed = fixed.replace(/:\s*None/g, ': null');

      // First attempt to parse
      try {
        const parsed = JSON.parse(fixed);
        const formatted = JSON.stringify(parsed, null, indentSize);
        setInput(formatted);
        setError('');
        setErrorDetails(null);
        setOutput(formatted);
      } catch (e) {
        // More aggressive fix: wrap unquoted values
        let aggressive = fixed.replace(/:\s*([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*[,}\]])/g, ': "$1"');

        try {
          const parsed = JSON.parse(aggressive);
          const formatted = JSON.stringify(parsed, null, indentSize);
          setInput(formatted);
          setError('');
          setErrorDetails(null);
          setOutput(formatted);
        } catch (innerE) {
          throw e; // Throw original error for better debugging
        }
      }
    } catch (e) {
      const details = parseErrorMessage(e.message, fixed);
      setError(`Auto-fix could not repair JSON: ${e.message}`);
      setErrorDetails(details);
    } finally {
      setIsProcessing(false);
    }
  }, [input, indentSize, parseErrorMessage]);

  // Load sample JSON
  const sampleJson = useCallback(() => {
    const sample = {
      name: "Dev Kant Kumar",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      experience: {
        years: 3,
        projects: 50,
        technologies: ["Frontend", "Backend", "DevOps"]
      },
      contact: {
        email: "dev@example.com",
        github: "devkantkumar"
      },
      available: true
    };
    setInput(JSON.stringify(sample, null, 2));
    setError('');
    setOutput('');
    setErrorDetails(null);
  }, []);

  // Clear error details when input changes
  useEffect(() => {
    if (errorDetails && input) {
      const timeoutId = setTimeout(() => {
        setErrorDetails(null);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [input, errorDetails]);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    accept=".json,application/json"
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
            <div className="flex h-80 bg-slate-900/50 relative">
              {/* Line Numbers */}
              <div
                ref={inputLineRef}
                className="w-12 py-4 bg-slate-900 border-r border-slate-800 text-slate-600 font-mono text-xs text-right pr-3 overflow-hidden select-none whitespace-pre leading-[20px]"
              >
                {getLineNumbers(input).map(line => (
                  <div
                    key={line.number}
                    className={`h-[20px] ${line.isError ? 'text-red-500 font-bold bg-red-500/10' : ''}`}
                    title={line.isError ? error : ''}
                  >
                    {line.number}
                  </div>
                ))}
              </div>

              <div className="flex-1 relative overflow-hidden">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onScroll={() => syncScroll(inputRef, inputLineRef)}
                  placeholder='Paste your JSON here...\n\nExample:\n{\n  "name": "value"\n}'
                  className="w-full h-full p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none placeholder:text-slate-600 leading-[20px] absolute inset-0 z-10"
                  spellCheck={false}
                />

                {/* Error Highlight */}
                {errorDetails && inputRef.current && (
                  <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{ transform: `translateY(${-(inputRef.current.scrollTop || 0)}px)` }}
                  >
                    <div
                      className="absolute w-full bg-red-500/10 border-y border-red-500/20"
                      style={{
                        top: `${(errorDetails.line - 1) * 20 + 16}px`,
                        height: '20px'
                      }}
                    >
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded-full border border-red-500/30">
                        <AlertCircle size={10} />
                        Line {errorDetails.line}
                        {errorDetails.column && `, Col ${errorDetails.column}`}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
              <span className="text-white font-medium">Output</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!output && !input}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Copy"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
                <button
                  onClick={downloadJson}
                  disabled={!output && !input}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Download"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
            <div className="relative h-80 flex bg-slate-900/50">
              {error ? (
                <div className="p-4 text-red-400 font-mono text-sm flex items-start gap-2 overflow-auto w-full">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 break-words">{error}</div>
                </div>
              ) : output ? (
                <>
                  <div
                    ref={outputLineRef}
                    className="w-12 py-4 bg-slate-900 border-r border-slate-800 text-slate-600 font-mono text-xs text-right pr-3 overflow-hidden select-none whitespace-pre leading-[20px]"
                  >
                    {getLineNumbers(output).map(line => (
                      <div key={line.number} className="h-[20px]">
                        {line.number}
                      </div>
                    ))}
                  </div>
                  <div
                    ref={outputRef}
                    onScroll={() => syncScroll(outputRef, outputLineRef)}
                    className="flex-1 overflow-auto"
                  >
                    <pre className="p-4 text-green-400 font-mono text-sm whitespace-pre leading-[20px]">
                      {output}
                    </pre>
                  </div>
                </>
              ) : (
                <div className="p-4 text-slate-600 font-mono text-sm flex items-center justify-center w-full">
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
              <option value={8}>8 spaces</option>
            </select>
          </div>

          <button
            onClick={formatJson}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Maximize2 size={18} />
            Format / Beautify
          </button>

          <button
            onClick={minifyJson}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minimize2 size={18} />
            Minify
          </button>

          <button
            onClick={handleAutoFix}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 size={18} />
            Magic Fix
          </button>

          <button
            onClick={validateJson}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  Format & beautify JSON with custom indentation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  Minify JSON to reduce file size
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  Validate JSON syntax with detailed error detection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  Magic Fix automatically repairs common JSON errors
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  Upload JSON files or paste directly (10MB limit)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  Download formatted output with timestamp
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JsonFormatter;
