import { useCurrency } from '../../apps/MarketPlace/context/CurrencyContext';

const PriceDisplay = ({ price, className = '', textClass = 'text-gray-900 dark:text-white', showOriginal = false, originalPrice = 0 }) => {
    const { getPriceDisplayInfo } = useCurrency();

    // Safely handle potentially null/undefined prices
    const safePrice = Number(price) || 0;
    const safeOriginal = Number(originalPrice) || 0;

    const { final, converted, currency } = getPriceDisplayInfo(safePrice);

    // For original price (strike-through), we typically don't apply surcharge visuals
    // or arguably we SHOULD to show accurate discount.
    // Let's stick to base formatting for consistency or same logic.
    // For now, let's just format it similar to the main price but maybe simpler.
    const originalInfo = showOriginal ? getPriceDisplayInfo(safeOriginal) : null;

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-baseline gap-2">
                <span className={`font-bold ${textClass}`}>
                    {final}
                </span>
                {showOriginal && safeOriginal > safePrice && (
                    <span className="text-sm text-gray-500 line-through decoration-red-500/50">
                        {originalInfo?.final}
                    </span>
                )}
            </div>

            {/* Converted Estimate Display */}
            {converted && currency !== 'INR' && (
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    (~{converted})
                </span>
            )}
        </div>
    );
};

export default PriceDisplay;
