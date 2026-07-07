import { Check, Clock, Copy, RefreshCw, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ToolLayout from '../components/ToolLayout';

const Field = ({ label, value }) => {
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
    <div className="flex items-center justify-between gap-3 bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-widest text-slate-500 font-mono font-bold mb-0.5">{label}</div>
        <div className="text-slate-100 font-mono text-sm break-all">{value || '-'}</div>
      </div>
      <button
        onClick={copy}
        disabled={!value}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40 px-2.5 py-1.5 text-xs"
      >
        {done ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      </button>
    </div>
  );
};

const TimestampConverter = () => {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  // Parse a Unix timestamp (auto-detect seconds vs milliseconds).
  const fromTimestamp = useMemo(() => {
    const raw = tsInput.trim();
    if (!raw || !/^\d+$/.test(raw)) return null;
    const num = Number(raw);
    const ms = raw.length > 10 ? num : num * 1000;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return {
      iso: d.toISOString(),
      utc: d.toUTCString(),
      local: d.toLocaleString(),
      relative: relative(d),
    };
  }, [tsInput]);

  // Convert a human date-time string into epoch values.
  const fromDate = useMemo(() => {
    const raw = dateInput.trim();
    if (!raw) return null;
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return null;
    return {
      seconds: String(Math.floor(d.getTime() / 1000)),
      millis: String(d.getTime()),
      iso: d.toISOString(),
    };
  }, [dateInput]);

  const inputClass =
    'w-full p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500/50';

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Convert Unix epoch timestamps to human-readable dates and back - seconds or milliseconds, local and UTC."
      icon={Clock}
      slug="timestamp-converter"
      seoTitle="Unix Timestamp Converter - Epoch to Date & Date to Epoch"
      seoDescription="Free online Unix timestamp converter. Convert epoch time (seconds or milliseconds) to a human-readable date in local and UTC, and convert any date back to a Unix timestamp. Live current epoch clock."
      seoKeywords="unix timestamp converter, epoch converter, timestamp to date, date to epoch, unix time, epoch time, convert timestamp, current unix timestamp"
      features={[
        { icon: RefreshCw, title: 'Two-Way Conversion', description: 'Epoch → date and date → epoch, with automatic seconds vs milliseconds detection.' },
        { icon: Clock, title: 'Live Current Epoch', description: 'A ticking clock shows the current Unix timestamp, one click to copy.' },
        { icon: Zap, title: 'Local + UTC', description: 'See ISO 8601, UTC, your local time, and a human relative time all at once.' },
      ]}
      faqs={[
        { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp (epoch time) is the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970, not counting leap seconds. It is a timezone-independent way to represent a point in time.' },
        { question: 'Seconds or milliseconds?', answer: 'JavaScript and many APIs use milliseconds; Unix systems typically use seconds. This tool auto-detects: values longer than 10 digits are treated as milliseconds.' },
        { question: 'What date formats can I paste?', answer: 'Any string the browser Date parser understands - for example 2026-07-07, 2026-07-07T13:45:00Z, or "July 7, 2026 13:45".' },
        { question: 'Is the conversion done privately?', answer: 'Yes, everything runs locally in your browser. No timestamps or dates are sent anywhere.' },
      ]}
    >
      <div className="space-y-8">
        {/* Live current epoch */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl px-5 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-cyan-400 font-mono font-bold mb-1">Current Unix time</div>
            <div className="text-2xl font-black text-white font-mono">{now}</div>
          </div>
          <button
            onClick={() => setTsInput(String(now))}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors"
          >
            Use now
          </button>
        </div>

        {/* Timestamp → date */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Timestamp → Date</label>
          <input
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder="e.g. 1751894700 or 1751894700000"
            className={inputClass}
            inputMode="numeric"
          />
          {tsInput && !fromTimestamp && (
            <p className="text-xs text-red-400 mt-2">Enter a valid numeric Unix timestamp.</p>
          )}
          {fromTimestamp && (
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <Field label="ISO 8601" value={fromTimestamp.iso} />
              <Field label="UTC" value={fromTimestamp.utc} />
              <Field label="Local time" value={fromTimestamp.local} />
              <Field label="Relative" value={fromTimestamp.relative} />
            </div>
          )}
        </div>

        {/* Date → timestamp */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Date → Timestamp</label>
          <input
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            placeholder="e.g. 2026-07-07T13:45:00Z"
            className={inputClass}
          />
          {dateInput && !fromDate && (
            <p className="text-xs text-red-400 mt-2">Could not parse that date. Try an ISO format like 2026-07-07.</p>
          )}
          {fromDate && (
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              <Field label="Seconds" value={fromDate.seconds} />
              <Field label="Milliseconds" value={fromDate.millis} />
              <Field label="ISO 8601" value={fromDate.iso} />
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

// Small human-friendly relative time (past/future).
function relative(date) {
  const diffMs = date.getTime() - Date.now();
  const abs = Math.abs(diffMs);
  const units = [
    ['year', 31536000000],
    ['month', 2592000000],
    ['day', 86400000],
    ['hour', 3600000],
    ['minute', 60000],
    ['second', 1000],
  ];
  for (const [name, ms] of units) {
    if (abs >= ms || name === 'second') {
      const value = Math.round(abs / ms);
      const plural = value === 1 ? name : `${name}s`;
      return diffMs >= 0 ? `in ${value} ${plural}` : `${value} ${plural} ago`;
    }
  }
  return 'just now';
}

export default TimestampConverter;
