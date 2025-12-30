import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Megaphone, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetSettingsQuery } from '../../store/api/baseApi';

const AnnouncementBanner = () => {
    const { data: settings, isLoading } = useGetSettingsQuery();
    const [isDismissed, setIsDismissed] = useState(false);
    const location = useLocation();

    // Check if the current page should show the banner
    const shouldShowOnPage = (targetPages) => {
        if (!targetPages || targetPages.includes('all')) return true;

        const currentPath = location.pathname.split('/')[1] || 'home';
        return targetPages.includes(currentPath);
    };

    // Check if the current date is within the banner's schedule
    const isWithinSchedule = (startDate, endDate) => {
        const now = new Date();
        if (startDate && new Date(startDate) > now) return false;
        if (endDate && new Date(endDate) < now) return false;
        return true;
    };

    if (isLoading || isDismissed) return null;

    const announcement = settings?.data?.announcement;

    if (!announcement?.isActive) return null;
    if (!shouldShowOnPage(announcement.targetPages)) return null;
    if (!isWithinSchedule(announcement.startDate, announcement.endDate)) return null;

    const {
        bannerText,
        bannerLink,
        backgroundColor,
        textColor,
        isDismissible
    } = announcement;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -20 }}
                className="relative overflow-hidden z-[60] shadow-lg"
                style={{ backgroundColor }}
            >
                <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap gap-x-4 gap-y-2">
                        <div className="flex-1 flex items-center min-w-0">
                            <span className="flex p-2 rounded-xl bg-black/10 backdrop-blur-md">
                                <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: textColor }} aria-hidden="true" />
                            </span>
                            <div className="ml-3 font-semibold text-sm sm:text-base leading-snug" style={{ color: textColor }}>
                                {bannerText}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                            {bannerLink && (
                                <a
                                    href={bannerLink}
                                    className="flex items-center justify-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all group border border-white/10"
                                    style={{ color: textColor }}
                                >
                                    View Details
                                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            )}

                            {isDismissible && (
                                <button
                                    type="button"
                                    onClick={() => setIsDismissed(true)}
                                    className="flex p-1.5 rounded-full hover:bg-black/10 focus:outline-none transition-colors border border-transparent hover:border-white/10"
                                    style={{ color: textColor }}
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <X className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Animated shimmer effect */}
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 5
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default AnnouncementBanner;
