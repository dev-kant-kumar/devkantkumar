import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useGetSettingsQuery } from '../../AdminPanel/store/api/adminApiSlice';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const { data: settingsData, isLoading: isLoadingSettings } = useGetSettingsQuery();
    const [currency, setCurrency] = useState('INR');
    const [countryCode, setCountryCode] = useState('IN');
    const [exchangeRates, setExchangeRates] = useState([]);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);

    // Initialize from settings
    useEffect(() => {
        if (settingsData?.data?.settings?.currency) {
            setExchangeRates(settingsData.data.settings.currency.exchangeRates || []);
            // Default to base currency initially if nothing saved
            if (!localStorage.getItem('user_currency')) {
                 setCurrency(settingsData.data.settings.currency.baseCurrency || 'INR');
            }
        }
    }, [settingsData]);

    // Detect Location
    useEffect(() => {
        const detectLocation = async () => {
            const savedCurrency = localStorage.getItem('user_currency');
            const savedCountry = localStorage.getItem('user_country');

            // Construct supported currencies list including base
            const baseCurrency = settingsData?.data?.settings?.currency?.baseCurrency || 'INR';
            const rates = settingsData?.data?.settings?.currency?.exchangeRates || [];

            if (savedCurrency && savedCountry) {
                setCurrency(savedCurrency);
                setCountryCode(savedCountry);
                setIsLoadingLocation(false);
                return;
            }

            try {
                const res = await axios.get('https://ipapi.co/json/');
                const detectedCurrency = res.data.currency;
                const detectedCountry = res.data.country_code; // e.g., 'IN', 'US'

                setCountryCode(detectedCountry);
                localStorage.setItem('user_country', detectedCountry);

                // If user hasn't manually set currency, use detected if supported
                if (!savedCurrency) {
                    const isSupported = detectedCurrency === baseCurrency || rates.some(r => r.code === detectedCurrency);

                    const finalCurrency = isSupported ? detectedCurrency : baseCurrency;
                    setCurrency(finalCurrency);
                    localStorage.setItem('user_currency', finalCurrency);
                }
            } catch (error) {
                console.warn("Currency detection failed, using fallback", error);
                // Fallback defaults
                if (!savedCountry) setCountryCode('IN');
                if (!savedCurrency) setCurrency(baseCurrency);
            } finally {
                setIsLoadingLocation(false);
            }
        };

        if (settingsData) {
            detectLocation();
        }
    }, [settingsData]);

    const changeCurrency = (code) => {
        setCurrency(code);
        localStorage.setItem('user_currency', code);
    };

    const updateLocation = (newCountryCode, newCurrencyCode) => {
        setCountryCode(newCountryCode);
        setCurrency(newCurrencyCode);
        localStorage.setItem('user_country', newCountryCode);
        localStorage.setItem('user_currency', newCurrencyCode);
    };

    // Helper to get the correct price object for a product/service
    const getPrice = (item) => {
        if (!item) return { amount: 0, currency: currency, symbol: '$' };

        // 1. Check for specific regional pricing match
        if (item.regionalPricing && item.regionalPricing.length > 0) {
            const regionPrice = item.regionalPricing.find(p => p.currency === currency);
            if (regionPrice) {
                const rateInfo = exchangeRates.find(r => r.code === currency);
                return {
                    amount: regionPrice.price,
                    currency: currency,
                    symbol: rateInfo?.symbol || getSymbol(currency)
                };
            }
        }

        // 2. If no regional price, return BASE price.
        const baseCurrency = settingsData?.data?.settings?.currency?.baseCurrency || 'INR';

        // Fallback to base currency price
        return { amount: item.price, currency: baseCurrency, symbol: '$' };
    };

    const formatPrice = (amount, currencyCode = currency) => {
        const rateInfo = exchangeRates.find(r => r.code === currencyCode);
        // Ensure symbol is available, though Intl handles it mostly

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Helper to just get symbol if needed
    const getSymbol = (code) => {
        try {
             return (0).toLocaleString(
                undefined,
                { style: 'currency', currency: code, minimumFractionDigits: 0, maximumFractionDigits: 0 }
            ).replace(/\d/g, '').trim();
        } catch {
            return code;
        }
    };

    return (
        <CurrencyContext.Provider value={{
            currency,
            countryCode,
            changeCurrency,
            updateLocation,
            getPrice,
            formatPrice,
            isLoading: isLoadingSettings || isLoadingLocation,
            supportedCurrencies: [
                settingsData?.data?.settings?.currency?.baseCurrency || 'INR',
                ...exchangeRates.map(r => r.code)
            ]
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};
