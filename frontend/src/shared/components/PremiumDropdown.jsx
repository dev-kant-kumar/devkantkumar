import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PremiumDropdown = ({
  value,
  onChange,
  options,
  variant = 'admin', // 'admin' or 'marketplace'
  placeholder = 'Select option',
  className = '',
  buttonClassName = ''
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
    if (variant === 'marketplace') {
      return {
        active: 'bg-green-50 text-green-700 font-bold',
        hover: 'hover:bg-green-50 hover:text-green-700',
        menu: 'bg-white border-gray-200 shadow-xl',
        item: 'text-gray-700',
        accent: 'text-green-600'
      };
    }
    // Default 'admin' theme - using light mode friendly styles with blue accents
    return {
      active: 'bg-blue-50 text-blue-700 font-bold',
      hover: 'hover:bg-blue-50 hover:text-blue-700',
      menu: 'bg-white border-gray-200 shadow-xl',
      item: 'text-gray-700',
      accent: 'text-blue-600'
    };
  };

  const styles = getVariantStyles();

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClassName} group`}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${styles.accent}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 w-full min-w-[200px] rounded-xl border p-2 ${styles.menu}`}
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 mb-1 last:mb-0 ${
                    value === option.value ? styles.active : `${styles.item} ${styles.hover}`
                  }`}
                >
                  {option.label}
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
