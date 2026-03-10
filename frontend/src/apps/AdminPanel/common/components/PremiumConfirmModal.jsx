import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Loader2, X } from 'lucide-react';

/**
 * PremiumConfirmModal - A high-end replacement for window.confirm()
 * 
 * @param {boolean} isOpen - Controls visibility
 * @param {function} onClose - Called when user cancels or clicks backdrop
 * @param {function} onConfirm - Called when user confirms
 * @param {string} title - Modal title
 * @param {string} message - Warning message
 * @param {string} confirmLabel - Text for the confirm button
 * @param {string} cancelLabel - Text for the cancel button
 * @param {boolean} isLoading - Shows loading state on confirm button
 * @param {string} variant - 'danger' (default), 'warning', 'info'
 */
const PremiumConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    isLoading = false,
    variant = 'danger'
}) => {
    // Prevent scroll when modal is open
    if (typeof window !== 'undefined') {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }

    const colors = {
        danger: {
            icon: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
            button: 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/25',
            glow: 'from-red-600/20 to-transparent'
        },
        warning: {
            icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
            button: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/25',
            glow: 'from-amber-600/20 to-transparent'
        },
        info: {
            icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25',
            glow: 'from-blue-600/20 to-transparent'
        }
    };

    const config = colors[variant] || colors.danger;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10"
                    >
                        {/* Gradient Glow */}
                        <div className={`absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br ${config.glow} blur-3xl rounded-full opacity-50`} />
                        <div className={`absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br ${config.glow} blur-3xl rounded-full opacity-50`} />

                        <div className="relative p-8 px-10">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className={`p-4 rounded-2xl ${config.icon} shadow-lg shadow-current/10`}>
                                    <AlertTriangle size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                        {title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                                        {message}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-10">
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="flex-1 px-6 py-3.5 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {cancelLabel}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`flex-1 px-6 py-3.5 text-sm font-bold rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 ${config.button}`}
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        confirmLabel
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PremiumConfirmModal;
