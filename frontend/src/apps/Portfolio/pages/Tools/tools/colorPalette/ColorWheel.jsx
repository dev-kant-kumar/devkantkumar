import { useRef, useState } from 'react';
import { colorFromHsl } from './colorUtils';

const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 18;

// Map hue/sat to x,y on the wheel (hue 0 at top, clockwise; sat = radius).
const polar = (h, s) => {
  const rad = (h * Math.PI) / 180;
  const r = (s / 100) * RADIUS;
  return { x: CENTER + r * Math.sin(rad), y: CENTER - r * Math.cos(rad) };
};

// Inverse: x,y -> hue/sat
const fromXY = (x, y) => {
  const dx = x - CENTER;
  const dy = y - CENTER;
  const r = Math.min(Math.hypot(dx, dy), RADIUS);
  let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
  if (deg < 0) deg += 360;
  return { h: Math.round(deg), s: Math.round((r / RADIUS) * 100) };
};

const ColorWheel = ({ colors, onDragStart, onChange }) => {
  const svgRef = useRef(null);
  const [dragIndex, setDragIndex] = useState(null);

  const pointerToXY = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const scale = SIZE / rect.width;
    return { x: (e.clientX - rect.left) * scale, y: (e.clientY - rect.top) * scale };
  };

  const updateColor = (index, x, y) => {
    const { h, s } = fromXY(x, y);
    onChange(colors.map((c, i) => (i === index ? colorFromHsl(h, s, c.l, c.locked) : c)));
  };

  const handleDown = (index) => (e) => {
    e.preventDefault();
    const c = colors[index];
    if (c.locked) return;
    onDragStart?.();
    setDragIndex(index);
  };

  const handleMove = (e) => {
    if (dragIndex === null) return;
    const { x, y } = pointerToXY(e);
    updateColor(dragIndex, x, y);
  };

  const handleUp = () => setDragIndex(null);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-[280px] h-[280px] touch-none select-none"
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerLeave={handleUp}
      >
        <defs>
          <radialGradient id="wheel-sat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          {/* hue ring via many segments */}
          {Array.from({ length: 360 }).map((_, i) => (
            <linearGradient key={i} id={`h${i}`} />
          ))}
        </defs>

        {/* hue wheel: 60 conic segments */}
        <g>
          {Array.from({ length: 72 }).map((_, i) => {
            const a0 = (i * 5 - 90 - 2.5) * (Math.PI / 180);
            const a1 = (i * 5 - 90 + 2.5) * (Math.PI / 180);
            const x0 = CENTER + RADIUS * Math.cos(a0);
            const y0 = CENTER + RADIUS * Math.sin(a0);
            const x1 = CENTER + RADIUS * Math.cos(a1);
            const y1 = CENTER + RADIUS * Math.sin(a1);
            return (
              <path
                key={i}
                d={`M${CENTER},${CENTER} L${x0},${y0} A${RADIUS},${RADIUS} 0 0 1 ${x1},${y1} Z`}
                fill={`hsl(${i * 5}, 100%, 50%)`}
              />
            );
          })}
        </g>
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#wheel-sat)" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* color handles */}
        {colors.map((c, i) => {
          const { x, y } = polar(c.h, c.s);
          return (
            <g key={i} onPointerDown={handleDown(i)} className={c.locked ? 'cursor-not-allowed' : 'cursor-grab'}>
              <circle cx={x} cy={y} r="13" fill={c.hex} stroke="#fff" strokeWidth="2.5" />
              <circle cx={x} cy={y} r="14.5" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
            </g>
          );
        })}
      </svg>

      <div className="flex-1 w-full">
        <h3 className="text-white font-bold mb-1">Interactive color wheel</h3>
        <p className="text-xs text-slate-500 mb-4">
          Drag any handle to change its hue (angle) and saturation (distance from center). Locked colors stay put. Lightness is kept - tune it with the swatch color picker.
        </p>
        <div className="space-y-2">
          {colors.map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="w-6 h-6 rounded-md shrink-0" style={{ background: c.hex }} />
              <span className="font-mono text-slate-300 w-20">{c.hex.toUpperCase()}</span>
              <span className="text-slate-500">H {c.h}deg · S {c.s}% · L {c.l}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorWheel;
