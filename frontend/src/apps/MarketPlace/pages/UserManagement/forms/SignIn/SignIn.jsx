
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validate } from '../../../../../../utils/formValidation';
import InputField from '../../../../common/components/ui/InputField';
import { useLoginMutation, useReactivateAccountMutation, useResendVerificationMutation } from '../../../../store/auth/authApi';
import { selectIsAuthenticated, setCredentials } from '../../../../store/auth/authSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/marketplace/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [login, { isLoading }] = useLoginMutation();
  const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();
  const [reactivateAccount, { isLoading: isReactivating }] = useReactivateAccountMutation();
  const [verificationSent, setVerificationSent] = useState(false);
  const [deactivatedAccount, setDeactivatedAccount] = useState(null); // { scheduledDeletionFormatted }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    // Clear form error when user types
    if (errors.form) {
      setErrors(prev => ({ ...prev, form: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (validate.required(formData.email)) newErrors.email = 'Email is required';
    else if (validate.email(formData.email)) newErrors.email = 'Invalid email address';

    if (validate.required(formData.password)) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResendVerification = async () => {
    try {
      await resendVerification({ email: formData.email }).unwrap();
      setVerificationSent(true);
      setErrors(prev => ({ ...prev, form: 'Verification email sent! Please check your inbox.' }));
    } catch (err) {
      setErrors(prev => ({ ...prev, form: err?.data?.message || 'Failed to send verification email' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userData = await login({ email: formData.email, password: formData.password }).unwrap();
        dispatch(setCredentials(userData));

        // Persist token explicitly for non-persistent store setups
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));

        const from = location.state?.from || '/marketplace/dashboard';
        navigate(from, { replace: true });
      } catch (err) {
        const errorMessage = err?.data?.message || 'Login failed';

        // Check if account is deactivated but within grace period
        if (err?.data?.code === 'ACCOUNT_DEACTIVATED' && err?.data?.canReactivate) {
          setDeactivatedAccount({
            scheduledDeletionFormatted: err.data.scheduledDeletionFormatted,
            scheduledDeletionAt: err.data.scheduledDeletionAt
          });
          setErrors(prev => ({ ...prev, form: null }));
        } else {
          setErrors(prev => ({ ...prev, form: errorMessage }));
          setDeactivatedAccount(null);
        }

        // Reset verification sent state on new attempt
        setVerificationSent(false);
      }
    }
  };

  const handleReactivate = async () => {
    try {
      await reactivateAccount({ email: formData.email, password: formData.password }).unwrap();
      setDeactivatedAccount(null);
      setErrors({ form: null });
      // Now try to login again
      const userData = await login({ email: formData.email, password: formData.password }).unwrap();
      dispatch(setCredentials(userData));
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.user));
      const from = location.state?.from || '/marketplace/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setErrors(prev => ({ ...prev, form: err?.data?.message || 'Failed to reactivate account' }));
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Sign in to your account</h3>
        <p className="mt-1 text-sm text-gray-500">
          Or <Link to="/marketplace/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">start your 14-day free trial</Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
          placeholder="you@example.com"
        />

        {/* Deactivated Account Alert */}
        {deactivatedAccount && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <RefreshCw className="h-5 w-5 text-amber-600" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold text-amber-800">Account Scheduled for Deletion</h3>
                <p className="mt-1 text-sm text-amber-700">
                  Your account will be permanently deleted on <strong>{deactivatedAccount.scheduledDeletionFormatted}</strong>.
                </p>
                <p className="mt-1 text-xs text-amber-600">
                  You can restore your account before this date.
                </p>
                <button
                  type="button"
                  onClick={handleReactivate}
                  disabled={isReactivating}
                  className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isReactivating ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Reactivating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reactivate My Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {errors.form && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="flex flex-col ml-3 w-full">
              <h3 className={`text-sm font-medium ${verificationSent ? 'text-green-800' : 'text-red-800'}`}>{errors.form}</h3>

              {!verificationSent && errors.form && errors.form.toLowerCase().includes('verify') && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 text-left focus:outline-none"
                >
                  {isResending ? 'Sending...' : 'Resend Verification Email'}
                </button>
              )}
            </div>
          </div>
        )}

        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={Lock}
          placeholder="Enter your password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/marketplace/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* Development Helper */}
          {process.env.NODE_ENV === 'development' && (
            <button
              type="button"
              onClick={() => setFormData({ email: 'demo@example.com', password: 'Password123!', rememberMe: true })}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              Dev: Fill Test Data
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with Google</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with GitHub</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
