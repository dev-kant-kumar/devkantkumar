import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Loader2, Mail, RefreshCw, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validate } from '../../../../../../utils/formValidation';
import InputField from '../../../../common/components/ui/InputField';
import { useForgotPasswordMutation } from '../../../../store/auth/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [forgotPassword, { isLoading: isSubmitting }] = useForgotPasswordMutation();

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const startCooldown = () => {
    setCooldown(60);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validate.required(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    const emailFormatError = validate.email(email);
    if (emailFormatError) {
      setError(emailFormatError);
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      setIsSent(true);
      startCooldown();
    } catch (err) {
      setError(err?.data?.message || 'Failed to send reset email. Please try again.');
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      await forgotPassword({ email }).unwrap();
      startCooldown();
    } catch (err) {
      setError(err?.data?.message || 'Failed to resend. Please try again.');
    }
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-6"
        >
          <Mail className="h-8 w-8 text-green-600" />
        </motion.div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h3>
        <p className="text-sm text-gray-500 mb-2">
          We sent a password reset link to
        </p>
        <p className="text-sm font-medium text-gray-900 mb-6">{email}</p>

        {/* Info Cards */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-start gap-3 mb-3">
            <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">Link expires in 10 minutes</p>
              <p className="text-xs text-gray-500">For security, reset links have limited validity</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">Check spam folder</p>
              <p className="text-xs text-gray-500">If you don't see the email, check your spam or junk folder</p>
            </div>
          </div>
        </div>

        {/* Resend Button */}
        <AnimatePresence mode="wait">
          {cooldown > 0 ? (
            <motion.div
              key="cooldown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-500 mb-4"
            >
              Resend available in <span className="font-medium text-gray-700">{cooldown}s</span>
            </motion.div>
          ) : (
            <motion.button
              key="resend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleResend}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors mb-4 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isSubmitting ? 'animate-spin' : ''}`} />
              {isSubmitting ? 'Sending...' : 'Resend email'}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Back to Sign In */}
        <Link
          to="/marketplace/auth/signin"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign in
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-4">
          <Mail className="h-7 w-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">Forgot your password?</h3>
        <p className="text-sm text-center text-gray-500">
          No worries! Enter your email and we'll send you a reset link.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          error={error}
          icon={Mail}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending link...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Send reset link
            </>
          )}
        </button>

        <div className="text-center pt-2">
          <Link
            to="/marketplace/auth/signin"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign in
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default ForgotPassword;
