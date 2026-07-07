import { AlertTriangle, Check, Copy, KeyRound, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import ToolLayout from '../components/ToolLayout';

// --- helpers --------------------------------------------------------------

const b64UrlDecode = (str) => {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4;
  if (pad) s += '='.repeat(4 - pad);
  // atob → binary string → decode as UTF-8
  const binary = atob(s);
  try {
    return decodeURIComponent(
      binary
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    );
  } catch {
    return binary;
  }
};

const prettyJson = (raw) => {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
};

const bytesToHex = (arr) =>
  [...arr].map((b) => b.toString(16).padStart(2, '0')).join('');

const bytesToBase64 = (arr, url = false) => {
  const b64 = btoa(String.fromCharCode(...arr));
  return url ? b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : b64;
};

const tsToDate = (seconds) => {
  if (!Number.isFinite(seconds)) return null;
  const d = new Date(seconds * 1000);
  return Number.isNaN(d.getTime()) ? null : d;
};

// --- component ------------------------------------------------------------

const CopyBtn = ({ text, small }) => {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };
  return (
    <button
      onClick={copy}
      disabled={!text}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40 ${
        small ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
      }`}
    >
      {done ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      {done ? 'Copied' : 'Copy'}
    </button>
  );
};

const JwtToolkit = () => {
  const [tab, setTab] = useState('decode');

  // Decode state
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState({ header: '', payload: '', error: '' });

  // Secret state
  const [byteLength, setByteLength] = useState(32);
  const [format, setFormat] = useState('base64url');
  const [secret, setSecret] = useState('');

  const decode = useCallback((value) => {
    if (!value.trim()) {
      setDecoded({ header: '', payload: '', error: '' });
      return;
    }
    const parts = value.trim().split('.');
    if (parts.length < 2) {
      setDecoded({ header: '', payload: '', error: 'Not a valid JWT - expected 3 dot-separated parts (header.payload.signature).' });
      return;
    }
    try {
      const header = prettyJson(b64UrlDecode(parts[0]));
      const payload = prettyJson(b64UrlDecode(parts[1]));
      setDecoded({ header, payload, error: '' });
    } catch {
      setDecoded({ header: '', payload: '', error: 'Could not decode this token. Check that it is a valid base64url-encoded JWT.' });
    }
  }, []);

  useEffect(() => {
    decode(token);
  }, [token, decode]);

  // Expiry insight from payload
  let expiryNote = null;
  try {
    const payloadObj = decoded.payload ? JSON.parse(decoded.payload) : null;
    if (payloadObj && payloadObj.exp) {
      const expDate = tsToDate(Number(payloadObj.exp));
      if (expDate) {
        const expired = expDate.getTime() < Date.now();
        expiryNote = { expired, text: expDate.toUTCString() };
      }
    }
  } catch {
    expiryNote = null;
  }

  const generateSecret = useCallback(() => {
    const arr = new Uint8Array(byteLength);
    crypto.getRandomValues(arr);
    if (format === 'hex') setSecret(bytesToHex(arr));
    else if (format === 'base64') setSecret(bytesToBase64(arr, false));
    else setSecret(bytesToBase64(arr, true));
  }, [byteLength, format]);

  useEffect(() => {
    generateSecret();
  }, [generateSecret]);

  const inputClass =
    'w-full p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500/50';

  return (
    <ToolLayout
      title="JWT Decoder & Secret Generator"
      description="Decode and inspect JSON Web Tokens, and generate cryptographically secure signing secrets - all in your browser."
      icon={KeyRound}
      slug="jwt-decoder"
      seoTitle="JWT Decoder & Secret Generator - Free Online JWT Tool"
      seoDescription="Free online JWT decoder and secret generator. Decode JWT header & payload, check token expiry, and generate secure HS256 signing secrets. 100% client-side - tokens never leave your browser."
      seoKeywords="jwt decoder, jwt secret generator, decode jwt, jwt token decoder, hs256 secret, jwt signing key generator, json web token decoder, jwt parser online"
      features={[
        { icon: ShieldCheck, title: '100% Client-Side', description: 'Tokens and secrets are generated and decoded entirely in your browser. Nothing is ever sent to a server.' },
        { icon: Zap, title: 'Instant Decode', description: 'Paste a JWT to instantly view its header and payload with syntax-friendly formatting and expiry detection.' },
        { icon: KeyRound, title: 'Secure Secrets', description: 'Generate signing secrets using the Web Crypto API (CSPRNG) in hex, base64, or base64url - ideal for HS256.' },
      ]}
      faqs={[
        { question: 'Is it safe to decode my JWT here?', answer: 'Yes. Decoding happens entirely in your browser using JavaScript - your token is never transmitted or logged. That said, avoid pasting production tokens containing live secrets into any online tool.' },
        { question: 'Does this verify the JWT signature?', answer: 'No. This tool decodes the header and payload (which are only base64url-encoded, not encrypted) and reads standard claims like exp. Signature verification requires the secret/public key and should be done server-side.' },
        { question: 'What length should my JWT secret be?', answer: 'For HS256, use a secret of at least 32 bytes (256 bits) of randomness. This tool defaults to 32 bytes. For HS512, prefer 64 bytes.' },
        { question: 'What is the difference between base64 and base64url?', answer: 'base64url replaces + and / with - and _ and drops padding, making it safe to use in URLs and JWT contexts. Use base64url if you are unsure.' },
      ]}
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'decode', label: 'Decode JWT' },
          { id: 'secret', label: 'Generate Secret' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              tab === t.id
                ? 'bg-cyan-500 text-slate-950 border-cyan-500'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:border-cyan-500/30'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'decode' ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Paste your JWT</label>
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              rows={4}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature"
              className={`${inputClass} resize-y break-all`}
            />
          </div>

          {decoded.error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              {decoded.error}
            </div>
          )}

          {expiryNote && (
            <div
              className={`flex items-center gap-2 p-3 rounded-xl text-sm border ${
                expiryNote.expired
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}
            >
              <AlertTriangle size={16} className="shrink-0" />
              {expiryNote.expired ? 'Token expired' : 'Token valid until'} - {expiryNote.text}
            </div>
          )}

          {decoded.header && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Header', value: decoded.header, accent: 'text-fuchsia-300' },
                { label: 'Payload', value: decoded.payload, accent: 'text-cyan-300' },
              ].map((box) => (
                <div key={box.label} className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/40">
                    <span className="text-sm font-semibold text-white">{box.label}</span>
                    <CopyBtn text={box.value} small />
                  </div>
                  <pre className={`p-4 text-xs ${box.accent} overflow-x-auto whitespace-pre-wrap break-words`}>
                    {box.value}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Length (bytes of entropy)</label>
              <select
                value={byteLength}
                onChange={(e) => setByteLength(Number(e.target.value))}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value={16}>16 bytes (128-bit)</option>
                <option value={32}>32 bytes (256-bit) - HS256</option>
                <option value={48}>48 bytes (384-bit) - HS384</option>
                <option value={64}>64 bytes (512-bit) - HS512</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Output format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="base64url">base64url (URL-safe)</option>
                <option value="base64">base64</option>
                <option value="hex">hex</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateSecret}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all"
          >
            <RefreshCw size={18} /> Generate Secret
          </button>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/40">
              <span className="text-sm font-semibold text-white">Your signing secret</span>
              <CopyBtn text={secret} small />
            </div>
            <pre className="p-4 text-sm text-emerald-300 font-mono break-all whitespace-pre-wrap">{secret}</pre>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Generated with the browser&apos;s cryptographically secure random number generator
            (<code className="text-slate-400">crypto.getRandomValues</code>). Store this secret in an
            environment variable - never commit it to source control.
          </p>
        </div>
      )}
    </ToolLayout>
  );
};

export default JwtToolkit;
