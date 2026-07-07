import { ArrowRightLeft, Check, Copy, Link2, ShieldCheck, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import ToolLayout from '../components/ToolLayout';

const UrlEncoderDecoder = () => {
  const [mode, setMode] = useState('encode');
  const [component, setComponent] = useState(true); // encodeURIComponent vs encodeURI
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(component ? encodeURIComponent(input) : encodeURI(input));
      } else {
        setOutput(component ? decodeURIComponent(input) : decodeURI(input));
      }
      setError('');
    } catch {
      setOutput('');
      setError('Could not decode - the input contains an invalid percent-encoding sequence.');
    }
  }, [input, mode, component]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  const inputClass =
    'w-full p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500/50 resize-y';

  return (
    <ToolLayout
      title="URL Encoder / Decoder"
      description="Percent-encode and decode URLs and query strings instantly - with full URI or single-component modes."
      icon={Link2}
      slug="url-encoder-decoder"
      seoTitle="URL Encoder / Decoder - Free Online Percent-Encoding Tool"
      seoDescription="Free online URL encoder and decoder. Percent-encode or decode URLs, query parameters and special characters using encodeURIComponent or encodeURI. Runs entirely in your browser."
      seoKeywords="url encoder, url decoder, percent encoding, encodeuricomponent, url encode online, decode url, query string encoder, escape url"
      features={[
        { icon: ArrowRightLeft, title: 'Encode & Decode', description: 'Switch between encoding and decoding with a single toggle - output updates live.' },
        { icon: Link2, title: 'Component or Full URI', description: 'Choose encodeURIComponent for query values, or encodeURI to preserve full-URL characters like : / ?.' },
        { icon: ShieldCheck, title: 'Private by Design', description: 'Runs entirely client-side. Your URLs and data are never sent to a server.' },
      ]}
      faqs={[
        { question: 'When should I use component vs full-URI mode?', answer: 'Use component mode (encodeURIComponent) when encoding a single query-string value or path segment - it escapes characters like & = ? / :. Use full-URI mode (encodeURI) when encoding a whole URL you want to keep functional, as it leaves reserved characters intact.' },
        { question: 'Why did decoding fail?', answer: 'Decoding fails when the input has a malformed percent sequence (for example a lone % not followed by two hex digits). Check the input for stray % characters.' },
        { question: 'Does this handle Unicode and emoji?', answer: 'Yes. Characters are handled as UTF-8, so accented letters, non-Latin scripts and emoji encode and decode correctly.' },
        { question: 'Is my data uploaded?', answer: 'No. Encoding and decoding happen locally in your browser using the native JavaScript functions.' },
      ]}
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            {[
              { id: 'encode', label: 'Encode' },
              { id: 'decode', label: 'Decode' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  mode === m.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-500'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:border-cyan-500/30'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-xl cursor-pointer text-sm text-slate-300">
            <input
              type="checkbox"
              checked={component}
              onChange={(e) => setComponent(e.target.checked)}
              className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
            Component mode (encodeURIComponent)
          </label>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder={mode === 'encode' ? 'https://example.com/search?q=hello world & more' : 'https%3A%2F%2Fexample.com%2F'}
            className={inputClass}
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{error}</div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-slate-400">Output</label>
            <button
              onClick={copy}
              disabled={!output}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40 px-2.5 py-1.5 text-xs"
            >
              {done ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {done ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="min-h-[6rem] p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-emerald-300 font-mono break-all whitespace-pre-wrap">
            {output || <span className="text-slate-600">Result appears here…</span>}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UrlEncoderDecoder;
