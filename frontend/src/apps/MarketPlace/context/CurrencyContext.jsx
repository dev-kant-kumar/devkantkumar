import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { currencyService } from '../../../services/currencyService';
import { useGetSettingsQuery } from '../../AdminPanel/store/api/adminApiSlice';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    // Always refetch settings on mount to ensure surcharge rate is synced with backend
    // Also poll every 60 seconds to catch admin panel changes
    const { data: settingsData, isLoading: isLoadingSettings } = useGetSettingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000, // Refetch every 60 seconds
    });
    const [currency, setCurrency] = useState('INR'); // Only for display preference
    const [countryCode, setCountryCode] = useState('IN');
    const [exchangeRates, setExchangeRates] = useState(null);
    const [surchargeRate, setSurchargeRate] = useState(18); // Default 18%
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);

    // Load Settings (Surcharge Rate)
    useEffect(() => {
        // API returns: { status: 'success', data: { marketplace: { surchargeRate: X } } }
        const marketplace = settingsData?.data?.marketplace;
        if (marketplace) {
            // "surchargeRate" or "taxRate" - handling both just in case, preferring new schema
            const rate = marketplace.surchargeRate ?? marketplace.taxRate ?? 18;
            console.log('[CurrencyContext] Loaded surcharge rate from settings:', rate);
            setSurchargeRate(rate);
        }
    }, [settingsData]);

    // Load Exchange Rates (Cached or API)
    useEffect(() => {
        const loadRates = async () => {
            const rates = await currencyService.getRates();
            if (rates) setExchangeRates(rates);
        };
        loadRates();
    }, []);

    // Detect User Location (for default display currency)
    useEffect(() => {
        const detectLocation = async () => {
            const savedCurrency = localStorage.getItem('user_currency');
            const savedCountry = localStorage.getItem('user_country');

            if (savedCurrency && savedCountry) {
                setCurrency(savedCurrency);
                setCountryCode(savedCountry);
                setIsLoadingLocation(false);
                return;
            }

            try {
                // Determine user's country & currency with 1s timeout
                // If it fails (CORS, block, timeout), we default to INR immediately
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 1000);

                const res = await axios.get('https://ipapi.co/json/', {
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                const detectedCountry = res.data.country_code || 'IN';
                const detectedCurrency = res.data.currency || 'INR';

                setCountryCode(detectedCountry);

                if (!savedCurrency) {
                    setCurrency(detectedCurrency);
                     // Don't save auto-detected to localStorage so we can re-detect if they travel/VPN
                     // unless they manually change it later.
                }
            } catch (error) {
                console.warn("Location detection failed/timed out, defaulting to INR/IN");
                // Default fallback is already set (IN/INR)
            } finally {
                setIsLoadingLocation(false);
            }
        };

        detectLocation();
    }, []);

    const changeCurrency = (code) => {
        setCurrency(code);
        localStorage.setItem('user_currency', code);
    };

    const updateLocation = (newCountryCode, newCurrencyCode) => {
        setCountryCode(newCountryCode);
        if (newCurrencyCode) changeCurrency(newCurrencyCode);
        localStorage.setItem('user_country', newCountryCode);
    };

    /**
     * Calculates the Final Billing Price in INR.
     * Applies the global surcharge/tax rate.
     * @param {number} basePrice - The base price in INR
     * @returns {number} Final price in INR
     */
    const getFinalPrice = (basePrice) => {
        if (!basePrice || isNaN(basePrice)) return 0;
        const multiplier = 1 + (surchargeRate / 100);
        return Math.round(basePrice * multiplier);
    };

    /**
     * Formats price for display.
     * Returns object with final INR string and optional converted string.
     * @param {number} basePrice
     * @returns {{ finalInfo: string, convertedInfo: string|null }}
     */
    const getPriceDisplayInfo = (basePrice) => {
        const finalInr = getFinalPrice(basePrice);

        // Formatter for INR
        const inrFormatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });

        const finalInrString = inrFormatter.format(finalInr);

        // If display currency is INR, no need for conversion
        if (currency.toUpperCase() === 'INR') {
            return {
                final: finalInrString,
                converted: null,
                currency: 'INR'
            };
        }

        // Calculate estimated conversion
        let convertedString = null;
        if (exchangeRates) {
            const convertedAmount = currencyService.convertFromINR(finalInr, currency, exchangeRates);
            if (convertedAmount) {
                 const convertedFormatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                convertedString = convertedFormatter.format(convertedAmount);
            }
        }

        return {
            final: finalInrString,
            converted: convertedString, // e.g., "$12.50"
            currency: currency
        };
    };

    // Legacy support helper (deprecating slowly)
    const formatPrice = (amount) => {
        const info = getPriceDisplayInfo(amount);
        return info.final;
    };

    const getPrice = (item) => {
         // Return base price structure expected by some components
         return {
             amount: item?.price || 0,
             currency: 'INR',
             symbol: '₹'
         }
    }

    const supportedCurrencies = exchangeRates
        ? ['INR', ...Object.keys(exchangeRates).map(c => c.toUpperCase()).filter(c => c !== 'INR').sort()]
        : ['INR'];

    return (
        <CurrencyContext.Provider value={{
            currency,
            countryCode,
            surchargeRate,
            supportedCurrencies,
            isLoading: isLoadingSettings || isLoadingLocation,
            changeCurrency,
            updateLocation,
            getFinalPrice,
            getPriceDisplayInfo,
            // Legacy/Compat
            formatPrice,
            getPrice
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};
