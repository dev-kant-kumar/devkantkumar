import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validate } from '../../../../../../utils/formValidation';
import InputField from '../../../../common/components/ui/InputField';
import { useRegisterMutation, useResendVerificationMutation } from '../../../../store/auth/authApi';
import { selectIsAuthenticated } from '../../../../store/auth/authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
      if (isAuthenticated) {
        navigate('/marketplace/dashboard', { replace: true });
      }
    }, [isAuthenticated, navigate]);

  const [register, { isLoading }] = useRegisterMutation();
  const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState(null); // 'sent', 'error', or null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (validate.required(formData.firstName)) newErrors.firstName = 'First Name is required';
    if (validate.required(formData.lastName)) newErrors.lastName = 'Last Name is required';

    if (validate.required(formData.email)) newErrors.email = 'Email is required';
    else if (validate.email(formData.email)) newErrors.email = 'Invalid email address';

    if (validate.required(formData.password)) newErrors.password = 'Password is required';
    else if (validate.password(formData.password)) newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special char';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }).unwrap();

        setIsSuccess(true);
        // Don't auto-login anymore as email verification is required
      } catch (error) {
        setErrors(prev => ({ ...prev, email: error?.data?.message || 'Registration failed' }));
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-4">
        {/* Animated Icon */}
        <div className="relative mx-auto w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-lg opacity-40 animate-pulse" />
          <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
            <Mail className="h-10 w-10 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          We've sent a verification link to
        </p>
        <p className="font-semibold text-gray-800 bg-gray-100 py-2 px-4 rounded-lg inline-block mb-4">
          {formData.email}
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Click the link in the email to activate your account.
        </p>

        {/* Resend Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          {resendStatus === 'sent' ? (
            <div className="text-green-600 font-medium flex items-center justify-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verification email sent!
            </div>
          ) : resendStatus === 'error' ? (
            <div className="text-red-600 text-sm">Failed to resend. Please try again.</div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the email?
              </p>
              <button
                onClick={async () => {
                  try {
                    await resendVerification({ email: formData.email }).unwrap();
                    setResendStatus('sent');
                  } catch (err) {
                    setResendStatus('error');
                  }
                }}
                disabled={isResending}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Back Link */}
        <Link
          to="/marketplace/auth/signin"
          className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
        >
          ← Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Create your account</h3>
        <p className="mt-1 text-sm text-gray-500">
          Already have an account? <Link to="/marketplace/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            icon={User}
            placeholder="John"
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            icon={User}
            placeholder="Doe"
          />
        </div>

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

        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={Lock}
          placeholder="Create a password"
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

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={Lock}
          placeholder="Confirm your password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeTerms" className="font-medium text-gray-700">
              I agree to the <Link to="/marketplace/terms" className="text-blue-600 hover:text-blue-500">Terms</Link> and <Link to="/marketplace/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
            </label>
            {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
