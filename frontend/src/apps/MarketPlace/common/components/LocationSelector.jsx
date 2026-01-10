import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useCurrency } from '../../context/CurrencyContext';

// Comprehensive country to currency mapping
const COUNTRIES = [
    { code: 'AF', name: 'Afghanistan', currency: 'AFN' },
    { code: 'AL', name: 'Albania', currency: 'ALL' },
    { code: 'DZ', name: 'Algeria', currency: 'DZD' },
    { code: 'AS', name: 'American Samoa', currency: 'USD' },
    { code: 'AD', name: 'Andorra', currency: 'EUR' },
    { code: 'AO', name: 'Angola', currency: 'AOA' },
    { code: 'AI', name: 'Anguilla', currency: 'XCD' },
    { code: 'AG', name: 'Antigua and Barbuda', currency: 'XCD' },
    { code: 'AR', name: 'Argentina', currency: 'ARS' },
    { code: 'AM', name: 'Armenia', currency: 'AMD' },
    { code: 'AW', name: 'Aruba', currency: 'AWG' },
    { code: 'AU', name: 'Australia', currency: 'AUD' },
    { code: 'AT', name: 'Austria', currency: 'EUR' },
    { code: 'AZ', name: 'Azerbaijan', currency: 'AZN' },
    { code: 'BS', name: 'Bahamas', currency: 'BSD' },
    { code: 'BH', name: 'Bahrain', currency: 'BHD' },
    { code: 'BD', name: 'Bangladesh', currency: 'BDT' },
    { code: 'BB', name: 'Barbados', currency: 'BBD' },
    { code: 'BY', name: 'Belarus', currency: 'BYN' },
    { code: 'BE', name: 'Belgium', currency: 'EUR' },
    { code: 'BZ', name: 'Belize', currency: 'BZD' },
    { code: 'BJ', name: 'Benin', currency: 'XOF' },
    { code: 'BM', name: 'Bermuda', currency: 'BMD' },
    { code: 'BT', name: 'Bhutan', currency: 'BTN' },
    { code: 'BO', name: 'Bolivia', currency: 'BOB' },
    { code: 'BA', name: 'Bosnia and Herzegovina', currency: 'BAM' },
    { code: 'BW', name: 'Botswana', currency: 'BWP' },
    { code: 'BR', name: 'Brazil', currency: 'BRL' },
    { code: 'IO', name: 'British Indian Ocean Territory', currency: 'USD' },
    { code: 'VG', name: 'British Virgin Islands', currency: 'USD' },
    { code: 'BN', name: 'Brunei', currency: 'BND' },
    { code: 'BG', name: 'Bulgaria', currency: 'BGN' },
    { code: 'BF', name: 'Burkina Faso', currency: 'XOF' },
    { code: 'BI', name: 'Burundi', currency: 'BIF' },
    { code: 'KH', name: 'Cambodia', currency: 'KHR' },
    { code: 'CM', name: 'Cameroon', currency: 'XAF' },
    { code: 'CA', name: 'Canada', currency: 'CAD' },
    { code: 'CV', name: 'Cape Verde', currency: 'CVE' },
    { code: 'BQ', name: 'Caribbean Netherlands', currency: 'USD' },
    { code: 'KY', name: 'Cayman Islands', currency: 'KYD' },
    { code: 'CF', name: 'Central African Republic', currency: 'XAF' },
    { code: 'TD', name: 'Chad', currency: 'XAF' },
    { code: 'CL', name: 'Chile', currency: 'CLP' },
    { code: 'CN', name: 'China', currency: 'CNY' },
    { code: 'CO', name: 'Colombia', currency: 'COP' },
    { code: 'KM', name: 'Comoros', currency: 'KMF' },
    { code: 'CG', name: 'Congo', currency: 'XAF' },
    { code: 'CK', name: 'Cook Islands', currency: 'NZD' },
    { code: 'CR', name: 'Costa Rica', currency: 'CRC' },
    { code: 'HR', name: 'Croatia', currency: 'EUR' },
    { code: 'CU', name: 'Cuba', currency: 'CUP' },
    { code: 'CW', name: 'Curaçao', currency: 'ANG' },
    { code: 'CY', name: 'Cyprus', currency: 'EUR' },
    { code: 'CZ', name: 'Czech Republic', currency: 'CZK' },
    { code: 'CD', name: 'DR Congo', currency: 'CDF' },
    { code: 'DK', name: 'Denmark', currency: 'DKK' },
    { code: 'DJ', name: 'Djibouti', currency: 'DJF' },
    { code: 'DM', name: 'Dominica', currency: 'XCD' },
    { code: 'DO', name: 'Dominican Republic', currency: 'DOP' },
    { code: 'EC', name: 'Ecuador', currency: 'USD' },
    { code: 'EG', name: 'Egypt', currency: 'EGP' },
    { code: 'SV', name: 'El Salvador', currency: 'USD' },
    { code: 'GQ', name: 'Equatorial Guinea', currency: 'XAF' },
    { code: 'ER', name: 'Eritrea', currency: 'ERN' },
    { code: 'EE', name: 'Estonia', currency: 'EUR' },
    { code: 'SZ', name: 'Eswatini', currency: 'SZL' },
    { code: 'ET', name: 'Ethiopia', currency: 'ETB' },
    { code: 'FK', name: 'Falkland Islands', currency: 'FKP' },
    { code: 'FO', name: 'Faroe Islands', currency: 'DKK' },
    { code: 'FJ', name: 'Fiji', currency: 'FJD' },
    { code: 'FI', name: 'Finland', currency: 'EUR' },
    { code: 'FR', name: 'France', currency: 'EUR' },
    { code: 'GF', name: 'French Guiana', currency: 'EUR' },
    { code: 'PF', name: 'French Polynesia', currency: 'XPF' },
    { code: 'GA', name: 'Gabon', currency: 'XAF' },
    { code: 'GM', name: 'Gambia', currency: 'GMD' },
    { code: 'GE', name: 'Georgia', currency: 'GEL' },
    { code: 'DE', name: 'Germany', currency: 'EUR' },
    { code: 'GH', name: 'Ghana', currency: 'GHS' },
    { code: 'GI', name: 'Gibraltar', currency: 'GIP' },
    { code: 'GR', name: 'Greece', currency: 'EUR' },
    { code: 'GL', name: 'Greenland', currency: 'DKK' },
    { code: 'GD', name: 'Grenada', currency: 'XCD' },
    { code: 'GP', name: 'Guadeloupe', currency: 'EUR' },
    { code: 'GU', name: 'Guam', currency: 'USD' },
    { code: 'GT', name: 'Guatemala', currency: 'GTQ' },
    { code: 'GG', name: 'Guernsey', currency: 'GBP' },
    { code: 'GN', name: 'Guinea', currency: 'GNF' },
    { code: 'GW', name: 'Guinea-Bissau', currency: 'XOF' },
    { code: 'GY', name: 'Guyana', currency: 'GYD' },
    { code: 'HT', name: 'Haiti', currency: 'HTG' },
    { code: 'HN', name: 'Honduras', currency: 'HNL' },
    { code: 'HK', name: 'Hong Kong', currency: 'HKD' },
    { code: 'HU', name: 'Hungary', currency: 'HUF' },
    { code: 'IS', name: 'Iceland', currency: 'ISK' },
    { code: 'IN', name: 'India', currency: 'INR' },
    { code: 'ID', name: 'Indonesia', currency: 'IDR' },
    { code: 'IR', name: 'Iran', currency: 'IRR' },
    { code: 'IQ', name: 'Iraq', currency: 'IQD' },
    { code: 'IE', name: 'Ireland', currency: 'EUR' },
    { code: 'IM', name: 'Isle of Man', currency: 'GBP' },
    { code: 'IL', name: 'Israel', currency: 'ILS' },
    { code: 'IT', name: 'Italy', currency: 'EUR' },
    { code: 'CI', name: 'Ivory Coast', currency: 'XOF' },
    { code: 'JM', name: 'Jamaica', currency: 'JMD' },
    { code: 'JP', name: 'Japan', currency: 'JPY' },
    { code: 'JE', name: 'Jersey', currency: 'GBP' },
    { code: 'JO', name: 'Jordan', currency: 'JOD' },
    { code: 'KZ', name: 'Kazakhstan', currency: 'KZT' },
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'KI', name: 'Kiribati', currency: 'AUD' },
    { code: 'XK', name: 'Kosovo', currency: 'EUR' },
    { code: 'KW', name: 'Kuwait', currency: 'KWD' },
    { code: 'KG', name: 'Kyrgyzstan', currency: 'KGS' },
    { code: 'LA', name: 'Laos', currency: 'LAK' },
    { code: 'LV', name: 'Latvia', currency: 'EUR' },
    { code: 'LB', name: 'Lebanon', currency: 'LBP' },
    { code: 'LS', name: 'Lesotho', currency: 'LSL' },
    { code: 'LR', name: 'Liberia', currency: 'LRD' },
    { code: 'LY', name: 'Libya', currency: 'LYD' },
    { code: 'LI', name: 'Liechtenstein', currency: 'CHF' },
    { code: 'LT', name: 'Lithuania', currency: 'EUR' },
    { code: 'LU', name: 'Luxembourg', currency: 'EUR' },
    { code: 'MO', name: 'Macau', currency: 'MOP' },
    { code: 'MG', name: 'Madagascar', currency: 'MGA' },
    { code: 'MW', name: 'Malawi', currency: 'MWK' },
    { code: 'MY', name: 'Malaysia', currency: 'MYR' },
    { code: 'MV', name: 'Maldives', currency: 'MVR' },
    { code: 'ML', name: 'Mali', currency: 'XOF' },
    { code: 'MT', name: 'Malta', currency: 'EUR' },
    { code: 'MH', name: 'Marshall Islands', currency: 'USD' },
    { code: 'MQ', name: 'Martinique', currency: 'EUR' },
    { code: 'MR', name: 'Mauritania', currency: 'MRU' },
    { code: 'MU', name: 'Mauritius', currency: 'MUR' },
    { code: 'YT', name: 'Mayotte', currency: 'EUR' },
    { code: 'MX', name: 'Mexico', currency: 'MXN' },
    { code: 'FM', name: 'Micronesia', currency: 'USD' },
    { code: 'MD', name: 'Moldova', currency: 'MDL' },
    { code: 'MC', name: 'Monaco', currency: 'EUR' },
    { code: 'MN', name: 'Mongolia', currency: 'MNT' },
    { code: 'ME', name: 'Montenegro', currency: 'EUR' },
    { code: 'MS', name: 'Montserrat', currency: 'XCD' },
    { code: 'MA', name: 'Morocco', currency: 'MAD' },
    { code: 'MZ', name: 'Mozambique', currency: 'MZN' },
    { code: 'MM', name: 'Myanmar', currency: 'MMK' },
    { code: 'NA', name: 'Namibia', currency: 'NAD' },
    { code: 'NR', name: 'Nauru', currency: 'AUD' },
    { code: 'NP', name: 'Nepal', currency: 'NPR' },
    { code: 'NL', name: 'Netherlands', currency: 'EUR' },
    { code: 'NC', name: 'New Caledonia', currency: 'XPF' },
    { code: 'NZ', name: 'New Zealand', currency: 'NZD' },
    { code: 'NI', name: 'Nicaragua', currency: 'NIO' },
    { code: 'NE', name: 'Niger', currency: 'XOF' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN' },
    { code: 'NU', name: 'Niue', currency: 'NZD' },
    { code: 'NF', name: 'Norfolk Island', currency: 'AUD' },
    { code: 'KP', name: 'North Korea', currency: 'KPW' },
    { code: 'MK', name: 'North Macedonia', currency: 'MKD' },
    { code: 'MP', name: 'Northern Mariana Islands', currency: 'USD' },
    { code: 'NO', name: 'Norway', currency: 'NOK' },
    { code: 'OM', name: 'Oman', currency: 'OMR' },
    { code: 'PK', name: 'Pakistan', currency: 'PKR' },
    { code: 'PW', name: 'Palau', currency: 'USD' },
    { code: 'PS', name: 'Palestine', currency: 'ILS' },
    { code: 'PA', name: 'Panama', currency: 'PAB' },
    { code: 'PG', name: 'Papua New Guinea', currency: 'PGK' },
    { code: 'PY', name: 'Paraguay', currency: 'PYG' },
    { code: 'PE', name: 'Peru', currency: 'PEN' },
    { code: 'PH', name: 'Philippines', currency: 'PHP' },
    { code: 'PL', name: 'Poland', currency: 'PLN' },
    { code: 'PT', name: 'Portugal', currency: 'EUR' },
    { code: 'PR', name: 'Puerto Rico', currency: 'USD' },
    { code: 'QA', name: 'Qatar', currency: 'QAR' },
    { code: 'RE', name: 'Réunion', currency: 'EUR' },
    { code: 'RO', name: 'Romania', currency: 'RON' },
    { code: 'RU', name: 'Russia', currency: 'RUB' },
    { code: 'RW', name: 'Rwanda', currency: 'RWF' },
    { code: 'BL', name: 'Saint Barthélemy', currency: 'EUR' },
    { code: 'SH', name: 'Saint Helena', currency: 'SHP' },
    { code: 'KN', name: 'Saint Kitts and Nevis', currency: 'XCD' },
    { code: 'LC', name: 'Saint Lucia', currency: 'XCD' },
    { code: 'MF', name: 'Saint Martin', currency: 'EUR' },
    { code: 'PM', name: 'Saint Pierre and Miquelon', currency: 'EUR' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines', currency: 'XCD' },
    { code: 'WS', name: 'Samoa', currency: 'WST' },
    { code: 'SM', name: 'San Marino', currency: 'EUR' },
    { code: 'ST', name: 'São Tomé and Príncipe', currency: 'STN' },
    { code: 'SA', name: 'Saudi Arabia', currency: 'SAR' },
    { code: 'SN', name: 'Senegal', currency: 'XOF' },
    { code: 'RS', name: 'Serbia', currency: 'RSD' },
    { code: 'SC', name: 'Seychelles', currency: 'SCR' },
    { code: 'SL', name: 'Sierra Leone', currency: 'SLE' },
    { code: 'SG', name: 'Singapore', currency: 'SGD' },
    { code: 'SX', name: 'Sint Maarten', currency: 'ANG' },
    { code: 'SK', name: 'Slovakia', currency: 'EUR' },
    { code: 'SI', name: 'Slovenia', currency: 'EUR' },
    { code: 'SB', name: 'Solomon Islands', currency: 'SBD' },
    { code: 'SO', name: 'Somalia', currency: 'SOS' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'KR', name: 'South Korea', currency: 'KRW' },
    { code: 'SS', name: 'South Sudan', currency: 'SSP' },
    { code: 'ES', name: 'Spain', currency: 'EUR' },
    { code: 'LK', name: 'Sri Lanka', currency: 'LKR' },
    { code: 'SD', name: 'Sudan', currency: 'SDG' },
    { code: 'SR', name: 'Suriname', currency: 'SRD' },
    { code: 'SE', name: 'Sweden', currency: 'SEK' },
    { code: 'CH', name: 'Switzerland', currency: 'CHF' },
    { code: 'SY', name: 'Syria', currency: 'SYP' },
    { code: 'TW', name: 'Taiwan', currency: 'TWD' },
    { code: 'TJ', name: 'Tajikistan', currency: 'TJS' },
    { code: 'TZ', name: 'Tanzania', currency: 'TZS' },
    { code: 'TH', name: 'Thailand', currency: 'THB' },
    { code: 'TL', name: 'Timor-Leste', currency: 'USD' },
    { code: 'TG', name: 'Togo', currency: 'XOF' },
    { code: 'TK', name: 'Tokelau', currency: 'NZD' },
    { code: 'TO', name: 'Tonga', currency: 'TOP' },
    { code: 'TT', name: 'Trinidad and Tobago', currency: 'TTD' },
    { code: 'TN', name: 'Tunisia', currency: 'TND' },
    { code: 'TR', name: 'Turkey', currency: 'TRY' },
    { code: 'TM', name: 'Turkmenistan', currency: 'TMT' },
    { code: 'TC', name: 'Turks and Caicos Islands', currency: 'USD' },
    { code: 'TV', name: 'Tuvalu', currency: 'AUD' },
    { code: 'UG', name: 'Uganda', currency: 'UGX' },
    { code: 'UA', name: 'Ukraine', currency: 'UAH' },
    { code: 'AE', name: 'United Arab Emirates', currency: 'AED' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
    { code: 'US', name: 'United States', currency: 'USD' },
    { code: 'UY', name: 'Uruguay', currency: 'UYU' },
    { code: 'VI', name: 'US Virgin Islands', currency: 'USD' },
    { code: 'UZ', name: 'Uzbekistan', currency: 'UZS' },
    { code: 'VU', name: 'Vanuatu', currency: 'VUV' },
    { code: 'VA', name: 'Vatican City', currency: 'EUR' },
    { code: 'VE', name: 'Venezuela', currency: 'VES' },
    { code: 'VN', name: 'Vietnam', currency: 'VND' },
    { code: 'WF', name: 'Wallis and Futuna', currency: 'XPF' },
    { code: 'EH', name: 'Western Sahara', currency: 'MAD' },
    { code: 'YE', name: 'Yemen', currency: 'YER' },
    { code: 'ZM', name: 'Zambia', currency: 'ZMW' },
    { code: 'ZW', name: 'Zimbabwe', currency: 'ZWG' }
];

const LocationSelector = () => {
    const { countryCode, currency, updateLocation, supportedCurrencies } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    // Local state for modal selection
    const [selectedCountry, setSelectedCountry] = useState(countryCode || 'IN');
    const [selectedCurrency, setSelectedCurrency] = useState(currency || 'INR');

    useEffect(() => {
        if (countryCode) setSelectedCountry(countryCode);
        if (currency) setSelectedCurrency(currency);
    }, [countryCode, currency, isOpen]);

    const handleSave = () => {
        updateLocation(selectedCountry, selectedCurrency);
        setIsOpen(false);
    };

    const handleCountryChange = (e) => {
        const newCountry = e.target.value;
        setSelectedCountry(newCountry);
        // Auto-select currency based on country if possible
        const countryData = COUNTRIES.find(c => c.code === newCountry);
        if (countryData && supportedCurrencies?.includes(countryData.currency)) {
            setSelectedCurrency(countryData.currency);
        }
    };

    return (
        <>
            {/* Header Trigger */}
            <button
                onClick={() => setIsOpen(true)}
                className="hidden lg:flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                title="Choose your location"
            >
                <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                        Deliver to
                    </span>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 dark:text-white">
                         <ReactCountryFlag
                            countryCode={countryCode || 'IN'}
                            svg
                            className="text-lg rounded-sm shadow-sm"
                            aria-label={countryCode}
                        />
                        <span>{countryCode || 'IN'}</span>
                    </div>
                </div>
            </button>

            {/* Mobile Trigger (Icon Only) */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400"
            >
                <Globe size={20} />
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            ref={modalRef}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Choose your location
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Product pricing and availability may vary based on your location and currency preference.
                                    </p>

                                    {/* Country Selector */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Manage Region/Country
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={selectedCountry}
                                                onChange={handleCountryChange}
                                                className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            >
                                                {COUNTRIES.map(c => (
                                                    <option key={c.code} value={c.code} className="bg-white dark:bg-gray-800">
                                                        {c.name} ({c.code})
                                                    </option>
                                                ))}
                                                {/* Fallback if user's country isn't in common list */}
                                                {!COUNTRIES.find(c => c.code === selectedCountry) && (
                                                    <option value={selectedCountry} className="bg-white dark:bg-gray-800">
                                                        {selectedCountry}
                                                    </option>
                                                )}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>

                                    {/* Currency Selector */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Currency
                                        </label>
                                        <div className="relative">
                                             <select
                                                value={selectedCurrency}
                                                onChange={(e) => setSelectedCurrency(e.target.value)}
                                                className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            >
                                                {(supportedCurrencies || []).map(c => (
                                                    <option key={c} value={c} className="bg-white dark:bg-gray-800">
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>

                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/20 transition-all"
                                >
                                    Done
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LocationSelector;
