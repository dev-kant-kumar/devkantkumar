import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const MarketplaceDropdown = ({
  value,
  onChange,
  options,
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group flex items-center justify-between min-w-[140px] px-4 py-2.5 
          bg-white/80 backdrop-blur-md border border-gray-200/60 
          rounded-xl shadow-sm hover:shadow-md hover:border-blue-400/50 
          transition-all duration-300 active:scale-[0.98]
          text-sm font-medium text-gray-700
          ${buttonClassName}
        `}
      >
        <span className="truncate mr-2">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
              absolute z-[100] mt-3 w-full min-w-[220px] 
              bg-white/90 backdrop-blur-xl border border-gray-200/50 
              rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] 
              p-2 overflow-hidden
              ${menuClassName}
            `}
            style={{ originY: 0 }}
          >
            <div className="max-h-72 overflow-y-auto custom-scrollbar space-y-1">
              {options.map((option) => {
                const isSelected = value === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`
                      relative flex w-full items-center justify-between px-3 py-2.5 
                      text-sm rounded-xl transition-all duration-200
                      ${isSelected 
                        ? 'bg-blue-50/80 text-blue-700 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                      }
                      ${itemClassName}
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex-shrink-0 ml-2"
                      >
                        <Check className="h-4 w-4 text-blue-600" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Subtle bottom gradient for scroll indication if needed */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplaceDropdown;
