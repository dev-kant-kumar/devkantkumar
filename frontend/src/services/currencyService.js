import axios from 'axios';

const API_BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
const CACHE_KEY = 'currency_rates_cache';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

export const currencyService = {
  /**
   * Fetch exchange rates from API or Cache
   * @returns {Promise<Object>} Exchange rates object
   */
  async getRates() {
    const cached = this.getCachedRates();
    if (cached) return cached;

    try {
      // Fetch rates relative to INR (since our base is INR)
      // Note: The API provides rates like "inr": { "usd": 0.012, ... }
      const response = await axios.get(`${API_BASE_URL}/inr.json`);
      const rates = response.data.inr;

      this.cacheRates(rates);
      return rates;
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      return null;
    }
  },

  /**
   * Get rates from local storage if valid
   */
  getCachedRates() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { rates, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      if (isExpired) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return rates;
    } catch (e) {
      return null;
    }
  },

  /**
   * Save rates to local storage
   */
  cacheRates(rates) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      rates,
      timestamp: Date.now()
    }));
  },

  /**
   * Convert INR amount to target currency
   * @param {number} inrAmount - Amount in INR
   * @param {string} targetCurrency - Target currency code (e.g., 'usd')
   * @param {Object} rates - Exchange rates object
   * @returns {number|null} Converted amount or null if invalid
   */
  convertFromINR(inrAmount, targetCurrency, rates) {
    if (!rates || !targetCurrency) return null;

    const code = targetCurrency.toLowerCase();
    const rate = rates[code];

    if (!rate) return null;

    return inrAmount * rate;
  }
};
