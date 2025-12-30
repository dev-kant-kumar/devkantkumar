export const getPriceForRegion = (item, countryCode, defaultCurrency = 'INR') => {
  if (!item) return { price: 0, currency: defaultCurrency, discount: 0 };

  // Handle both Product and Service (Service packages logic might be different, but this handles basic items)
  // For Service packages, the caller should pass the package object as 'item'
  
  // Check for regional pricing
  if (item.regionalPricing && item.regionalPricing.length > 0) {
    const regionalPrice = item.regionalPricing.find(
      rp => rp.region === countryCode
    );

    if (regionalPrice) {
      return {
        price: regionalPrice.price,
        currency: regionalPrice.currency,
        discount: regionalPrice.discount || 0
      };
    }
  }

  // Fallback to base price
  // Assuming base price is in INR by default unless specified otherwise in future
  return {
    price: item.price,
    currency: defaultCurrency,
    discount: item.discount || 0
  };
};

export const formatCurrency = (amount, currency = 'INR') => {
  const localeMap = {
    INR: 'en-IN',
    USD: 'en-US',
    EUR: 'en-IE',
    GBP: 'en-GB'
  };
  
  return new Intl.NumberFormat(localeMap[currency] || 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};
