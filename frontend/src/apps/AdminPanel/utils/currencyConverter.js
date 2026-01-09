export const EXCHANGE_RATES = {
  USD: 1,    // Base Currency
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 155.0,
  CNY: 7.23
};

export const REGION_MAPPING = {
  USD: 'US',
  INR: 'IN',
  EUR: 'EU',
  GBP: 'GB',
  CAD: 'CA',
  AUD: 'AU',
  JPY: 'JP',
  CNY: 'CN'
};

export const calculateRegionalPricing = (basePriceInUSD) => {
  if (basePriceInUSD === undefined || basePriceInUSD === null || basePriceInUSD === '') {
    return [];
  }

  const price = parseFloat(basePriceInUSD);
  if (isNaN(price)) {
    return [];
  }

  return Object.entries(EXCHANGE_RATES).map(([currency, rate]) => ({
    region: REGION_MAPPING[currency] || 'GLOBAL',
    currency: currency,
    price: parseFloat((price * rate).toFixed(2)),
    discount: 0
  }));
};
