import { motion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";

const ReadingToolbar = ({
  onFontSizeChange,
  fontSize,
  onReadingModeToggle,
  isReadingMode,
  theme,
  onThemeToggle
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 shadow-2xl flex items-center gap-6"
    >
      {/* Font Size Controls */}


      {/* Reading Mode Toggle */}
      <button
        onClick={onReadingModeToggle}
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
          isReadingMode ? "text-cyan-400" : "text-slate-300 hover:text-white"
        }`}
      >
        {isReadingMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        <span className="hidden sm:inline">Focus</span>
      </button>

      {/* Theme Toggle (Optional, if applicable) */}
      {/*
      <div className="w-px h-6 bg-slate-700/50" />
      <button
        onClick={onThemeToggle}
        className="text-slate-300 hover:text-white transition-colors"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      */}
    </motion.div>
  );
};

export default ReadingToolbar;
