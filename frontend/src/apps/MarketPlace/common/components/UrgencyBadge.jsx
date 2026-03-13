/**
 * UrgencyBadge — lightweight social-proof + scarcity nudges
 *
 * Shows one of several urgency / FOMO signals below the Add-to-Cart CTA
 * to nudge visitors to buy.  All signals rotate automatically every
 * 5 seconds so the page feels "live" without any API calls.
 *
 * Usage:
 *   <UrgencyBadge productId={product._id} type="product" />
 *   <UrgencyBadge productId={service._id} type="service" />
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Eye, Flame, ShoppingBag, Star, Zap } from 'lucide-react';

// ---------------------------------------------------------------------------
// Deterministic "random" helpers — seeded by productId so the same product
// always shows the same numbers within a session (avoids jarring changes on
// React re-renders), but varies across products.
// ---------------------------------------------------------------------------

function seededRandom(seed, min, max) {
  // Simple, fast hash — good enough for display-only numbers
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  h = Math.abs(h);
  return min + (h % (max - min + 1));
}

/** Derive stable "stats" from product ID so they don't change on re-render */
function getDerivedStats(productId) {
  const id = String(productId || 'x');
  return {
    viewers:   seededRandom(id + 'v', 7, 42),
    purchases: seededRandom(id + 'p', 3, 28),
    cartCount: seededRandom(id + 'c', 2, 11),
    rating:    (seededRandom(id + 'r', 43, 50) / 10).toFixed(1),
    reviews:   seededRandom(id + 'rv', 8, 94),
  };
}

// ---------------------------------------------------------------------------
// Individual signal rows
// ---------------------------------------------------------------------------

const SIGNALS = [
  {
    id: 'viewers',
    icon: Eye,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    build: (stats) => `${stats.viewers} people are viewing this right now`,
  },
  {
    id: 'purchases',
    icon: ShoppingBag,
    color: 'text-green-600',
    bg: 'bg-green-50',
    build: (stats) => `${stats.purchases} purchased in the last 24 hours`,
  },
  {
    id: 'cart',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    build: (stats) => `${stats.cartCount} people have this in their cart`,
  },
  {
    id: 'rating',
    icon: Star,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    build: (stats) => `Rated ${stats.rating} ★ by ${stats.reviews}+ customers`,
  },
  {
    id: 'instant',
    icon: Zap,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    build: () => 'Instant digital delivery — available right after payment',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const UrgencyBadge = ({ productId, type = 'product' }) => {
  const stats = getDerivedStats(productId);
  const [signalIndex, setSignalIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setSignalIndex((i) => (i + 1) % SIGNALS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const signal = SIGNALS[signalIndex];
  const Icon = signal.icon;
  const text = signal.build(stats);

  return (
    <div className="mt-3 space-y-2">
      {/* Rotating live signal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={signal.id}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${signal.bg} ${signal.color}`}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${signal.bg} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${signal.color.replace('text-', 'bg-')}`} />
          </span>
          <Icon size={14} className="shrink-0" />
          <span>{text}</span>
        </motion.div>
      </AnimatePresence>

      {/* Static "limited availability" strip */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">
        <Flame size={12} className="shrink-0" />
        <span>
          {type === 'service'
            ? 'Only a few service slots available this month'
            : 'Limited-time digital product — price may increase'}
        </span>
      </div>
    </div>
  );
};

export default UrgencyBadge;
