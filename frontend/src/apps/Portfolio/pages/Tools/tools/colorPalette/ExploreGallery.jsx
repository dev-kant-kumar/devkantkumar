import { useMemo, useState } from 'react';

// Curated starter palettes. Each can be applied and then shared via URL.
const CURATED = [
  { name: 'Sunset Boulevard', tags: ['warm', 'sunset'], colors: ['#f9c74f', '#f8961e', '#f3722c', '#f94144', '#90323d'] },
  { name: 'Deep Ocean', tags: ['cool', 'blue'], colors: ['#012a4a', '#013a63', '#2a6f97', '#468faf', '#a9d6e5'] },
  { name: 'Forest Floor', tags: ['nature', 'green'], colors: ['#1b4332', '#2d6a4f', '#40916c', '#74c69d', '#b7e4c7'] },
  { name: 'Cotton Candy', tags: ['pastel', 'pink'], colors: ['#ffcbf2', '#f3c4fb', '#ecbcfd', '#e5b3fe', '#c8b6ff'] },
  { name: 'Neon Nights', tags: ['vibrant', 'dark'], colors: ['#2b2d42', '#8d99ae', '#ef233c', '#d90429', '#f72585'] },
  { name: 'Corporate Blue', tags: ['corporate', 'blue'], colors: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'] },
  { name: 'Terracotta', tags: ['earthy', 'warm'], colors: ['#582f0e', '#7f4f24', '#936639', '#a68a64', '#c2c5aa'] },
  { name: 'Berry Smoothie', tags: ['vibrant', 'purple'], colors: ['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c'] },
  { name: 'Mint Fresh', tags: ['cool', 'green'], colors: ['#d8f3dc', '#b7e4c7', '#95d5b2', '#74c69d', '#52b788'] },
  { name: 'Retro Pop', tags: ['vintage', 'vibrant'], colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#843b62'] },
  { name: 'Midnight', tags: ['dark', 'cool'], colors: ['#0d1b2a', '#1b263b', '#415a77', '#778da9', '#e0e1dd'] },
  { name: 'Peach Sorbet', tags: ['pastel', 'warm'], colors: ['#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#ffc6ff'] },
  { name: 'Coffee House', tags: ['earthy', 'brown'], colors: ['#3c2a21', '#5c3d2e', '#8b5e3c', '#b08968', '#ddb892'] },
  { name: 'Cyber Grape', tags: ['vibrant', 'purple'], colors: ['#240046', '#3c096c', '#7b2cbf', '#c77dff', '#e0aaff'] },
  { name: 'Autumn Leaves', tags: ['warm', 'earthy'], colors: ['#606c38', '#283618', '#fefae0', '#dda15e', '#bc6c25'] },
  { name: 'Ice & Fire', tags: ['vibrant', 'cool'], colors: ['#03045e', '#0096c7', '#48cae4', '#ff9e00', '#ff5400'] },
  { name: 'Rose Quartz', tags: ['pastel', 'pink'], colors: ['#590d22', '#a4133c', '#ff4d6d', '#ff8fa3', '#ffccd5'] },
  { name: 'Emerald City', tags: ['nature', 'green'], colors: ['#004b23', '#006400', '#38b000', '#70e000', '#ccff33'] },
  { name: 'Dusty Rose', tags: ['vintage', 'muted'], colors: ['#463f3a', '#8a817c', '#bcb8b1', '#f4f3ee', '#e0afa0'] },
  { name: 'Electric', tags: ['vibrant', 'dark'], colors: ['#03071e', '#370617', '#6a040f', '#dc2f02', '#ffba08'] },
  { name: 'Nordic Frost', tags: ['cool', 'muted'], colors: ['#2e3440', '#3b4252', '#4c566a', '#88c0d0', '#eceff4'] },
  { name: 'Tropical', tags: ['vibrant', 'warm'], colors: ['#ff9f1c', '#ffbf69', '#cbf3f0', '#2ec4b6', '#e71d36'] },
  { name: 'Grape Soda', tags: ['pastel', 'purple'], colors: ['#7400b8', '#6930c3', '#5e60ce', '#5390d9', '#48bfe3'] },
  { name: 'Golden Hour', tags: ['warm', 'sunset'], colors: ['#ffba08', '#faa307', '#f48c06', '#e85d04', '#dc2f02'] },
];

const ExploreGallery = ({ onApply }) => {
  const [tag, setTag] = useState('all');
  const tags = useMemo(() => ['all', ...new Set(CURATED.flatMap((p) => p.tags))].sort(), []);
  const list = tag === 'all' ? CURATED : CURATED.filter((p) => p.tags.includes(tag));

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h3 className="text-white font-bold">Explore palettes</h3>
          <p className="text-xs text-slate-500">Hand-picked starting points. Click one to load it, then tweak and export.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-colors ${
              tag === t ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p) => (
          <button
            key={p.name}
            onClick={() => onApply(p.colors)}
            className="group text-left bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex h-20">
              {p.colors.map((hex, i) => (
                <span key={i} className="flex-1 transition-all group-hover:flex-[1.15]" style={{ background: hex }} />
              ))}
            </div>
            <div className="px-3 py-2.5 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">{p.name}</span>
              <span className="text-[10px] text-slate-500">{p.colors.length}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreGallery;
