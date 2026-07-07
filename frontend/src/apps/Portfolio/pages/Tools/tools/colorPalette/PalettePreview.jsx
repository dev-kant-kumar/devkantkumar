import { Bell, LayoutDashboard, Monitor, Search, Shuffle, Smartphone, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { assignRoles } from './colorUtils';

const MOCKUPS = [
  { id: 'landing', label: 'Landing', icon: Monitor },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'mobile', label: 'Mobile app', icon: Smartphone },
];

// --- Landing page mockup -------------------------------------------------
const Landing = (r) => (
  <div style={{ background: r.background, color: r.text }} className="rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${r.border}` }}>
      <div className="flex items-center gap-2 font-bold">
        <span className="w-5 h-5 rounded-md" style={{ background: r.primary }} />
        Nova
      </div>
      <div className="hidden sm:flex items-center gap-4 text-xs" style={{ color: r.muted }}>
        <span>Features</span><span>Pricing</span><span>Docs</span>
      </div>
      <span className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: r.primary, color: r.onPrimary }}>
        Get started
      </span>
    </div>
    <div className="px-5 sm:px-8 py-10 text-center">
      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-4" style={{ background: r.accent, color: r.onPrimary }}>
        New - v2.0 is here
      </span>
      <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-3">Ship beautiful products faster</h3>
      <p className="text-sm max-w-md mx-auto mb-6" style={{ color: r.muted }}>
        A single toolkit that brings design, code and color together in perfect harmony.
      </p>
      <div className="flex items-center justify-center gap-3">
        <span className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: r.primary, color: r.onPrimary }}>Start free</span>
        <span className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ border: `1px solid ${r.accent}`, color: r.text }}>Live demo</span>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 px-5 sm:px-8 pb-8">
      {['Fast', 'Flexible', 'Accessible'].map((t) => (
        <div key={t} className="p-3 rounded-xl" style={{ background: r.surface, border: `1px solid ${r.border}` }}>
          <span className="w-6 h-6 rounded-md flex items-center justify-center mb-2" style={{ background: r.accent, color: r.onPrimary }}>
            <Star size={13} />
          </span>
          <div className="text-xs font-bold">{t}</div>
          <div className="text-[10px]" style={{ color: r.muted }}>Built for teams that move.</div>
        </div>
      ))}
    </div>
  </div>
);

// --- Dashboard mockup ----------------------------------------------------
const Dashboard = (r) => (
  <div style={{ background: r.background, color: r.text }} className="rounded-xl overflow-hidden flex min-h-[320px]">
    <div className="hidden sm:flex flex-col gap-1 w-40 p-3" style={{ background: r.surface, borderRight: `1px solid ${r.border}` }}>
      <div className="flex items-center gap-2 font-bold mb-3">
        <span className="w-5 h-5 rounded-md" style={{ background: r.primary }} /> Console
      </div>
      {['Overview', 'Analytics', 'Reports', 'Settings'].map((n, i) => (
        <div
          key={n}
          className="px-3 py-2 rounded-lg text-xs font-semibold"
          style={i === 1 ? { background: r.primary, color: r.onPrimary } : { color: r.muted }}
        >
          {n}
        </div>
      ))}
    </div>
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-bold">Analytics</div>
        <span className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: r.accent, color: r.onPrimary }}>Export</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[['Revenue', '$48k'], ['Users', '12.4k'], ['Churn', '1.2%']].map(([k, v]) => (
          <div key={k} className="p-3 rounded-xl" style={{ background: r.surface, border: `1px solid ${r.border}` }}>
            <div className="text-[10px]" style={{ color: r.muted }}>{k}</div>
            <div className="text-lg font-black">{v}</div>
            <div className="text-[10px] flex items-center gap-1" style={{ color: r.primary }}><TrendingUp size={11} /> +8%</div>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: r.surface, border: `1px solid ${r.border}` }}>
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i % 2 ? r.accent : r.primary }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- Mobile app mockup ---------------------------------------------------
const Mobile = (r) => (
  <div className="flex justify-center">
    <div className="w-[230px] rounded-[2rem] p-2.5" style={{ background: r.surface, border: `1px solid ${r.border}` }}>
      <div className="rounded-[1.5rem] overflow-hidden" style={{ background: r.background, color: r.text }}>
        <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ background: r.primary, color: r.onPrimary }}>
          <div className="font-black text-sm">Discover</div>
          <div className="flex items-center gap-2"><Search size={15} /><Bell size={15} /></div>
        </div>
        <div className="p-3 space-y-2.5">
          <div className="rounded-xl p-3" style={{ background: r.accent, color: r.onPrimary }}>
            <div className="text-[10px] opacity-90">Featured</div>
            <div className="font-bold text-sm">Your daily mix</div>
          </div>
          {['Morning focus', 'Deep work', 'Wind down'].map((t, i) => (
            <div key={t} className="flex items-center gap-3 rounded-xl p-2.5" style={{ background: r.surface, border: `1px solid ${r.border}` }}>
              <span className="w-9 h-9 rounded-lg" style={{ background: i % 2 ? r.primary : r.accent }} />
              <div>
                <div className="text-xs font-bold">{t}</div>
                <div className="text-[10px]" style={{ color: r.muted }}>24 tracks</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-around px-4 py-3" style={{ borderTop: `1px solid ${r.border}` }}>
          {[r.primary, r.muted, r.muted, r.muted].map((c, i) => (
            <span key={i} className="w-5 h-5 rounded-md" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const RENDERERS = { landing: Landing, dashboard: Dashboard, mobile: Mobile };

const PalettePreview = ({ colors }) => {
  const [mockup, setMockup] = useState('landing');
  const [offset, setOffset] = useState(0);
  const roles = assignRoles(colors, offset);
  const Renderer = RENDERERS[mockup];

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex gap-2">
          {MOCKUPS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMockup(m.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                mockup === m.id ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <m.icon size={13} /> {m.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOffset((o) => o + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/60 text-slate-300 border border-slate-800 hover:border-slate-700"
        >
          <Shuffle size={13} /> Shuffle roles
        </button>
      </div>

      {/* role legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          ['Background', roles.background],
          ['Surface', roles.surface],
          ['Primary', roles.primary],
          ['Accent', roles.accent],
          ['Text', roles.text],
        ].map(([label, val]) => (
          <span key={label} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            <span className="w-3 h-3 rounded" style={{ background: val }} /> {label}
          </span>
        ))}
      </div>

      <div className="rounded-2xl p-3 sm:p-5" style={{ background: 'rgba(148,163,184,0.06)' }}>
        {Renderer(roles)}
      </div>
      <p className="text-xs text-slate-500 mt-3">
        Roles are auto-assigned from your palette (lightest - background, most saturated - primary) with contrast-safe text. Use Shuffle roles to explore other mappings.
      </p>
    </div>
  );
};

export default PalettePreview;
