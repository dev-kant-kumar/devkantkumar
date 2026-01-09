const EXCHANGE_RATES = {
  USD: 1,    // Base Currency
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 155.0,
  CNY: 7.23
};

const REGION_MAPPING = {
  USD: 'US',
  INR: 'IN',
  EUR: 'EU',
  GBP: 'GB',
  CAD: 'CA',
  AUD: 'AU',
  JPY: 'JP',
  CNY: 'CN'
};

/**
 * Calculates regional pricing based on a base price in USD.
 * @param {number} basePriceInUSD - The price in USD.
 * @returns {Array} Array of regional pricing objects.
 */
exports.calculateRegionalPricing = (basePriceInUSD) => {
  if (basePriceInUSD === undefined || basePriceInUSD === null) {
    return [];
  }

  const price = parseFloat(basePriceInUSD);
  if (isNaN(price)) {
    return [];
  }

  return Object.entries(EXCHANGE_RATES).map(([currency, rate]) => ({
    region: REGION_MAPPING[currency] || 'GLOBAL',
    currency: currency,
    price: parseFloat((price * rate).toFixed(2)), // Round to 2 decimal places
    discount: 0 
  }));
};

/**
 * specific currency conversion
 * @param {number} amount 
 * @param {string} fromCurrency 
 * @param {string} toCurrency 
 * @returns {number}
 */
exports.convertCurrency = (amount, fromCurrency, toCurrency) => {
    const fromRate = EXCHANGE_RATES[fromCurrency.toUpperCase()];
    const toRate = EXCHANGE_RATES[toCurrency.toUpperCase()];

    if (!fromRate || !toRate) {
        throw new Error('Invalid currency code');
    }

    // Convert to base (USD) then to target
    const amountInBase = amount / fromRate;
    return parseFloat((amountInBase * toRate).toFixed(2));
};
