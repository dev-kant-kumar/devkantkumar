import { AnimatePresence, motion } from 'framer-motion';
import {
    Briefcase,
    Check,
    ChevronDown,
    Globe,
    Percent,
    Save,
    Settings as SettingsIcon,
    ShoppingCart
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    useGetGeneralSettingsQuery,
    useUpdateGeneralSettingsMutation
} from '../../store/api/adminApiSlice';

const CURRENCY_OPTIONS = [
    { value: 'INR', label: 'INR (₹) - Indian Rupee' },
    { value: 'USD', label: 'USD ($) - US Dollar' },
    { value: 'EUR', label: 'EUR (€) - Euro' },
    { value: 'GBP', label: 'GBP (£) - British Pound' },
    { value: 'JPY', label: 'JPY (¥) - Japanese Yen' },
    { value: 'AUD', label: 'AUD ($) - Australian Dollar' },
    { value: 'CAD', label: 'CAD ($) - Canadian Dollar' },
    { value: 'SGD', label: 'SGD ($) - Singapore Dollar' }
];

const PremiumDropdown = ({ value, onChange, options, name, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value) || { label: 'Select Currency' };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white/50 dark:bg-gray-800/50 text-left transition-all duration-200 outline-none
                    ${isOpen ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-gray-900 dark:text-white truncate text-sm font-medium">{selectedOption.label}</span>
                </div>
                <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute z-50 left-0 right-0 mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/30 max-h-60 overflow-y-auto"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors
                                    ${value === option.value
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    }`}
                            >
                                <span className={`text-sm ${value === option.value ? 'font-medium' : ''}`}>{option.label}</span>
                                {value === option.value && (
                                    <Check size={16} className="text-blue-600 dark:text-blue-400" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
// ... (MarketplaceSettings component starts here, assuming no changes to lines 92-227 other than context. But I need to update the loop specifically)

// Skip to inside the render method where the loop is.
// To handle this replacement cleanly without context loss, I'll target the "Exchange Rates Table" block specifically.
// Wait, the previous tool output showed CURRENCY_OPTIONS starting at line 20.
// I can replace the CURRENCY_OPTIONS and PremiumDropdown first if I want, or just replace the whole file section.
// The complexity of replacing lines 20-91 and then 227-273 suggests I should probably do two edits or one large one locally.
// Let's do the render loop first, effectively.

// Wait, I can't redefine PremiumDropdown twice. I should just update PremiumDropdown to accept className and update CURRENCY_OPTIONS.
// And then update the loop.


const MarketplaceSettings = () => {
  const { data, isLoading } = useGetGeneralSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateGeneralSettingsMutation();

  const [formData, setFormData] = useState({
    currency: {
        baseCurrency: 'INR',
        exchangeRates: []
    },
    surchargeRate: 18,
    enableProductSales: true,
    enableServiceBooking: true
  });

  useEffect(() => {
    if (data?.data) {
      const { marketplace, currency } = data.data;
      setFormData(prev => ({
        ...prev,
        ...marketplace,
        currency: currency || prev.currency,
        surchargeRate: marketplace?.surchargeRate ?? 18
      }));
    }
  }, [data]);

  const handleToggle = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Merge with existing settings
      const updatedSettings = {
        ...data.data,
        marketplace: {
          ...formData,
          surchargeRate: Number(formData.surchargeRate)
        },
        currency: formData.currency
      };

      await updateSettings(updatedSettings).unwrap();
      toast.success('Marketplace settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 flex items-center gap-3">

            Marketplace Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Configure global preferences, taxes, and feature availability.
          </p>
        </div>
        <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed font-medium"
        >
            {isUpdating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <Save size={20} />
            )}
            <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Configuration Card (Now Enhanced for Currency) */}
        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm p-8 space-y-8 relative">
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Globe size={120} />
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                    <Percent size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pricing & Surcharges</h2>
            </div>

            <div className="space-y-6">
                {/* Surcharge Rate */}
                <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Global Surcharge Rate (%)
                    </label>
                    <div className="relative">
                        <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="number"
                            name="surchargeRate"
                            value={formData.surchargeRate}
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setFormData(prev => ({ ...prev, [name]: value }));
                            }}
                            min="0"
                            max="100"
                            step="0.1"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                            placeholder="e.g. 18"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Feature Management Card */}
        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <SettingsIcon size={120} />
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
                    <SettingsIcon size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Feature Management</h2>
            </div>

            <div className="space-y-6">
                {/* Product Sales Toggle */}
                <div
                    onClick={() => handleToggle('enableProductSales')}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 group
                    ${formData.enableProductSales
                        ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                        : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}` }
                >
                    <div className={`p-3 rounded-xl ${formData.enableProductSales ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        <ShoppingCart size={24} />
                    </div>
                    <div className="flex-1">
                         <div className="flex items-center justify-between">
                            <h3 className={`font-semibold ${formData.enableProductSales ? 'text-blue-800 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>Product Sales</h3>
                            <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${formData.enableProductSales ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${formData.enableProductSales ? 'translate-x-6' : ''}`} />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Allow vendors to list and sell digital or physical products.
                        </p>
                    </div>
                </div>

                {/* Service Booking Toggle */}
                <div
                    onClick={() => handleToggle('enableServiceBooking')}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 group
                    ${formData.enableServiceBooking
                        ? 'bg-purple-50/50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800'
                        : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}` }
                >
                    <div className={`p-3 rounded-xl ${formData.enableServiceBooking ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                        <Briefcase size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className={`font-semibold ${formData.enableServiceBooking ? 'text-purple-800 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>Service Booking</h3>
                            <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${formData.enableServiceBooking ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${formData.enableServiceBooking ? 'translate-x-6' : ''}`} />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Enable service listings, packages, and appointment booking.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSettings;
