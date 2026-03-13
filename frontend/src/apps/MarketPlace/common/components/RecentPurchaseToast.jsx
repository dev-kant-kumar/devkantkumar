/**
 * RecentPurchaseToast — social-proof "live sale" notification
 *
 * Displays a small animated toast in the bottom-left corner of the page
 * to show that other customers have recently purchased this item.
 * No real API call is made — the data is deterministically generated
 * from the productId, providing consistent social proof across page loads.
 *
 * Usage (render once per detail page):
 *   <RecentPurchaseToast productId={product._id} productTitle={product.title} />
 */

import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Static pools — seeded by productId to look realistic
// ---------------------------------------------------------------------------

const CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Bhopal', 'Patna',
  'London', 'Toronto', 'Singapore', 'Dubai', 'Sydney',
];

function seededInt(seed, min, max) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return min + (Math.abs(h) % (max - min + 1));
}

function buildEvents(productId, count = 6) {
  const id = String(productId || 'x');
  const events = [];
  for (let i = 0; i < count; i++) {
    const citySeed = id + 'city' + i;
    const minAgo = seededInt(id + 'min' + i, 1, 120);
    events.push({
      city: CITIES[seededInt(citySeed, 0, CITIES.length - 1)],
      minutesAgo: minAgo,
    });
  }
  // Sort so the most-recent event shows first
  return events.sort((a, b) => a.minutesAgo - b.minutesAgo);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const SHOW_DURATION_MS = 4500;
const GAP_BETWEEN_MS   = 8000;

const RecentPurchaseToast = ({ productId, productTitle }) => {
  const events = useRef(buildEvents(productId));
  const [currentEvent, setCurrentEvent] = useState(null);
  const [visible, setVisible] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    // Start after a small initial delay so the page has settled
    const initialDelay = setTimeout(() => {
      show();
    }, 4000);
    return () => clearTimeout(initialDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  function show() {
    const ev = events.current[indexRef.current % events.current.length];
    indexRef.current += 1;
    setCurrentEvent(ev);
    setVisible(true);

    // Auto-hide after SHOW_DURATION_MS
    setTimeout(() => {
      setVisible(false);
      // Schedule the next event
      setTimeout(show, GAP_BETWEEN_MS);
    }, SHOW_DURATION_MS);
  }

  const formatTime = (minutes) => {
    if (minutes < 2) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const h = Math.round(minutes / 60);
    return h === 1 ? '1h ago' : `${h}h ago`;
  };

  return (
    <div className="fixed bottom-6 left-4 z-50 pointer-events-none">
      <AnimatePresence>
        {visible && currentEvent && (
          <motion.div
            key={indexRef.current}
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 bg-white border border-gray-200 shadow-xl rounded-2xl px-4 py-3 max-w-xs"
          >
            {/* Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-green-100 rounded-xl">
              <ShoppingBag size={18} className="text-green-600" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 leading-tight truncate">
                Someone from <span className="text-blue-600">{currentEvent.city}</span> purchased
              </p>
              <p className="text-xs text-gray-500 truncate">{productTitle}</p>
              <p className="text-xs text-gray-400 mt-0.5">{formatTime(currentEvent.minutesAgo)}</p>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => setVisible(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentPurchaseToast;
