import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PerformanceMonitor = ({ showStats = false }) => {
  const [stats, setStats] = useState({
    fps: 0,
    memory: 0,
    renderTime: 0,
    animationCount: 0
  });
  const [isVisible, setIsVisible] = useState(showStats);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrame = useRef(null);

  useEffect(() => {
    const updateStats = () => {
      const now = performance.now();
      frameCount.current++;

      // Calculate FPS every second
      if (now - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));

        // Get memory usage (if available)
        const memory = performance.memory
          ? Math.round(performance.memory.usedJSHeapSize / 1048576) // Convert to MB
          : 0;

        // Count active animations (approximate)
        const animationCount = document.querySelectorAll('[data-framer-motion]').length;

        setStats({
          fps,
          memory,
          renderTime: Math.round(now - lastTime.current),
          animationCount
        });

        frameCount.current = 0;
        lastTime.current = now;
      }

      animationFrame.current = requestAnimationFrame(updateStats);
    };

    if (isVisible) {
      updateStats();
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isVisible]);

  // Toggle visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const getPerformanceColor = (value, thresholds) => {
    if (value >= thresholds.good) return 'text-green-400';
    if (value >= thresholds.warning) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Performance</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">FPS:</span>
            <span className={getPerformanceColor(stats.fps, { good: 55, warning: 30 })}>
              {stats.fps}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-300">Memory:</span>
            <span className={getPerformanceColor(100 - stats.memory, { good: 50, warning: 20 })}>
              {stats.memory}MB
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-300">Animations:</span>
            <span className="text-cyan-400">{stats.animationCount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-300">Render:</span>
            <span className="text-purple-400">{stats.renderTime}ms</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-gray-400">
            Ctrl+Shift+P to toggle
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceMonitor;
