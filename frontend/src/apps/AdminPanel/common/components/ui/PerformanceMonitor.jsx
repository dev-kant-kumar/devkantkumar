import React, { useState, useEffect } from "react";

const PerformanceMonitor = ({ showStats = false }) => {
  const [stats, setStats] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
  });

  useEffect(() => {
    if (!showStats) return;

    let frameCount = 0;
    let lastTime = performance.now();

    const updateStats = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        setStats(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime)),
        }));
        frameCount = 0;
        lastTime = currentTime;
      }

      // Memory usage (if available)
      if (performance.memory) {
        setStats(prev => ({
          ...prev,
          memory: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
        }));
      }

      requestAnimationFrame(updateStats);
    };

    updateStats();
  }, [showStats]);

  if (!showStats) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
      <div>FPS: {stats.fps}</div>
      <div>Memory: {stats.memory}MB</div>
    </div>
  );
};

export default PerformanceMonitor;
