import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const PremiumDropdown = ({
  value,
  onChange,
  options,
  className = "",
  buttonClassName = "px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-none rounded-xl text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-800/80",
  placeholder = "Select option"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value) || { label: placeholder };

  return (
    <div className={`relative z-20 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between focus:ring-0 outline-none shadow-sm transition-colors ${buttonClassName}`}
      >
        <span className="truncate mr-4 text-sm font-medium">{selectedOption.label}</span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full min-w-[140px] mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl overflow-hidden left-0"
            >
              <div className="max-h-60 overflow-y-auto scrollbar-none py-1">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      value === opt.value
                        ? 'bg-blue-50/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumDropdown;
