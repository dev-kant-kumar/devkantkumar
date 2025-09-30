import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PerformanceMonitor = ({ showStats = false }) => {
  const [stats, setStats] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
  });
  const [isVisible, setIsVisible] = useState(showStats);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const updateStats = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        const memory = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : 0;
        const loadTime = Math.round(performance.timing?.loadEventEnd - performance.timing?.navigationStart) || 0;

        setStats({ fps, memory, loadTime });
        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(updateStats);
    };

    if (showStats) {
      updateStats();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [showStats]);

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

  if (!isVisible && !showStats) return null;

  return (
    <AnimatePresence>
      {(isVisible || showStats) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-4 right-4 z-[9999] bg-black/80 text-white p-3 rounded-lg text-xs font-mono backdrop-blur-sm"
        >
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span>Performance Monitor</span>
              <button
                onClick={() => setIsVisible(false)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div>FPS: <span className="text-green-400">{stats.fps}</span></div>
            <div>Memory: <span className="text-blue-400">{stats.memory}MB</span></div>
            <div>Load: <span className="text-yellow-400">{stats.loadTime}ms</span></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PerformanceMonitor;
