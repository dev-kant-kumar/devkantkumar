import { Check, Copy, Hash, ShieldCheck, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import ToolLayout from '../components/ToolLayout';

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

const digestHex = async (algo, text) => {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const HashRow = ({ algo, value }) => {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };
  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/40">
        <span className="text-sm font-semibold text-cyan-300 font-mono">{algo}</span>
        <button
          onClick={copy}
          disabled={!value}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40 px-2.5 py-1.5 text-xs"
        >
          {done ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {done ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-xs text-slate-200 font-mono break-all whitespace-pre-wrap">{value || '-'}</pre>
    </div>
  );
};

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({});

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setHashes({});
      return;
    }
    (async () => {
      const entries = await Promise.all(ALGOS.map(async (a) => [a, await digestHex(a, input)]));
      if (!cancelled) setHashes(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <ToolLayout
      title="Hash Generator (SHA-256, SHA-512)"
      description="Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes from any text instantly - computed securely in your browser."
      icon={Hash}
      slug="hash-generator"
      seoTitle="Hash Generator - SHA-256, SHA-512, SHA-1 Online Tool"
      seoDescription="Free online hash generator. Create SHA-1, SHA-256, SHA-384 and SHA-512 checksums from any text instantly. 100% client-side using the Web Crypto API - nothing is uploaded."
      seoKeywords="hash generator, sha256 generator, sha512 hash, sha1 hash, online hash tool, checksum generator, text to hash, sha hash online"
      features={[
        { icon: ShieldCheck, title: 'Runs In Your Browser', description: 'Hashes are computed with the native Web Crypto API. Your input never leaves your device.' },
        { icon: Zap, title: 'Live & Instant', description: 'Every SHA variant updates as you type - no button clicks, no waiting.' },
        { icon: Hash, title: 'Four Algorithms', description: 'SHA-1, SHA-256, SHA-384 and SHA-512 side by side, each copyable with one click.' },
      ]}
      faqs={[
        { question: 'Which hash algorithm should I use?', answer: 'For security-sensitive uses (integrity checks, signatures) prefer SHA-256 or SHA-512. SHA-1 is included for legacy compatibility but is considered cryptographically broken and should not be used for security.' },
        { question: 'Can I generate an MD5 hash here?', answer: 'This tool uses the browser Web Crypto API, which does not support MD5 because it is insecure. For checksums and security, use SHA-256 or SHA-512 instead.' },
        { question: 'Is my text uploaded anywhere?', answer: 'No. All hashing happens locally in your browser via crypto.subtle.digest. Nothing is sent to a server.' },
        { question: 'Why does an empty box show no hashes?', answer: 'Hashes are only shown once you enter text. Note that hashing an empty string still produces a valid hash - type at least one character to see results.' },
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Text to hash</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="Type or paste any text…"
            className="w-full p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500/50 resize-y"
          />
        </div>

        <div className="grid gap-4">
          {ALGOS.map((a) => (
            <HashRow key={a} algo={a} value={hashes[a]} />
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;
