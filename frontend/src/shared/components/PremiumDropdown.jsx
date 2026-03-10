import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PremiumDropdown = ({
  value,
  onChange,
  options,
  variant = 'admin', // 'admin', 'marketplace', 'danger', 'success'
  placeholder = 'Select option',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  itemClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'marketplace':
        return {
          active: 'bg-indigo-50/80 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold',
          hover: 'hover:bg-indigo-50/50 hover:text-indigo-700 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400',
          menu: 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-xl',
          item: 'text-gray-700 dark:text-gray-300',
          accent: 'text-indigo-600 dark:text-indigo-400',
          button: 'bg-white/80 dark:bg-gray-800/80 border-gray-200/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-200'
        };
      case 'danger':
        return {
          active: 'bg-red-50/80 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-bold',
          hover: 'hover:bg-red-50/50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400',
          menu: 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-xl',
          item: 'text-gray-700 dark:text-gray-300',
          accent: 'text-red-600 dark:text-red-400',
          button: 'bg-red-50/10 dark:bg-red-900/10 border-red-500/20 dark:border-red-500/20 text-red-600 dark:text-red-400'
        };
      default: // 'admin'
        return {
          active: 'bg-blue-50/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-bold',
          hover: 'hover:bg-blue-50/50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400',
          menu: 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-xl',
          item: 'text-gray-700 dark:text-gray-300',
          accent: 'text-blue-600 dark:text-blue-400',
          button: 'bg-white/5 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/10 dark:border-gray-800/50 text-gray-900 dark:text-white'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group flex items-center justify-between min-w-[140px] px-4 py-2.5 
          rounded-xl shadow-sm transition-all duration-300
          text-sm font-semibold
          ${styles.button}
          ${buttonClassName}
        `}
      >
        <span className="truncate mr-2">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`h-4 w-4 ${styles.accent}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 w-full min-w-[200px] rounded-2xl border p-2 ${styles.menu} ${menuClassName}`}
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm rounded-xl transition-all duration-200 ${
                    value === option.value ? styles.active : `${styles.item} ${styles.hover}`
                  } ${itemClassName}`}
                >
                  <span className="truncate">{option.label}</span>
                  {value === option.value && <Check size={14} className={styles.accent} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumDropdown;
