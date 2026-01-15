import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useVerifyEmailMutation } from '../../store/auth/authApi';

const VerifyEmail = () => {
  const { token } = useParams();
  const [verifyEmail] = useVerifyEmailMutation();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (token) {
      const verify = async () => {
        try {
          // Add artificial delay for smoother UX animation
          await new Promise(resolve => setTimeout(resolve, 1500));
          await verifyEmail(token).unwrap();
          setStatus('success');
        } catch (err) {
          setStatus('error');
          setErrorMessage(err?.data?.message || 'The verification link is invalid or has expired.');
        }
      };
      verify();
    }
  }, [token, verifyEmail]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-center"
      >
        {status === 'verifying' && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="relative bg-white p-4 rounded-full shadow-lg ring-1 ring-gray-100"
              >
                <Loader2 className="h-10 w-10 text-blue-600" />
              </motion.div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Verifying Email</h2>
              <p className="text-gray-500 max-w-xs mx-auto">
                Please wait a moment while we securely verify your email address...
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-60"></div>
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="relative bg-white p-4 rounded-full shadow-lg ring-1 ring-green-100"
              >
                <div className="bg-green-500 rounded-full p-2">
                  <Check className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Email Verified!</h2>
              <p className="text-gray-500 max-w-sm mx-auto">
                Your account has been successfully verified. You now have full access to the Marketplace.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full pt-4"
            >
              <Link
                to="/marketplace/auth/signin"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group"
              >
                Continue to Sign In
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-100 rounded-full blur-xl opacity-60"></div>
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="relative bg-white p-4 rounded-full shadow-lg ring-1 ring-amber-100"
              >
                <div className="bg-amber-500 rounded-full p-2">
                  <RefreshCw className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Link Already Used</h2>
              <p className="text-amber-600 font-medium bg-amber-50 px-4 py-2 rounded-md border border-amber-100 mx-auto inline-block">
                {errorMessage}
              </p>
              <p className="text-gray-500 max-w-xs mx-auto text-sm mt-2">
                This usually means your email is already verified. Try signing in!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full pt-4 space-y-3"
            >
              <Link
                to="/marketplace/auth/signin"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group"
              >
                Continue to Sign In
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs text-center text-gray-400">
                Need help? <a href="/marketplace/support" className="text-blue-600 hover:underline">Contact Support</a>
              </p>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
