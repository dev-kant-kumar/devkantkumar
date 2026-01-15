import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, CheckCircle, Eye, EyeOff, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { validate } from '../../../../../../utils/formValidation';
import InputField from '../../../../common/components/ui/InputField';
import { useResetPasswordMutation } from '../../../../store/auth/authApi';

const PasswordStrength = ({ password }) => {
  const strength = useMemo(() => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    return {
      score,
      checks,
      label: score <= 1 ? 'Weak' : score <= 3 ? 'Fair' : score <= 4 ? 'Good' : 'Strong',
      color: score <= 1 ? 'red' : score <= 3 ? 'yellow' : score <= 4 ? 'blue' : 'green',
    };
  }, [password]);

  if (!password) return null;

  const colorClasses = {
    red: { bar: 'bg-red-500', text: 'text-red-600' },
    yellow: { bar: 'bg-yellow-500', text: 'text-yellow-600' },
    blue: { bar: 'bg-blue-500', text: 'text-blue-600' },
    green: { bar: 'bg-green-500', text: 'text-green-600' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-3 space-y-3"
    >
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= strength.score ? colorClasses[strength.color].bar : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${colorClasses[strength.color].text}`}>
          {strength.label}
        </span>
      </div>

      {/* Requirements Checklist */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          { key: 'length', label: '8+ characters' },
          { key: 'lowercase', label: 'Lowercase letter' },
          { key: 'uppercase', label: 'Uppercase letter' },
          { key: 'number', label: 'Number' },
          { key: 'special', label: 'Special character' },
        ].map(({ key, label }) => (
          <div
            key={key}
            className={`flex items-center gap-1.5 ${
              strength.checks[key] ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                strength.checks[key] ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              {strength.checks[key] && <CheckCircle className="h-2.5 w-2.5" />}
            </div>
            {label}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);

  const [resetPassword, { isLoading: isSubmitting }] = useResetPasswordMutation();

  // Check if token exists
  useEffect(() => {
    if (!token) {
      setIsTokenInvalid(true);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (validate.required(formData.password)) newErrors.password = 'Password is required';
    else if (validate.password(formData.password)) newErrors.password = 'Password does not meet requirements';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await resetPassword({ token, password: formData.password }).unwrap();
        setIsReset(true);
      } catch (err) {
        const errorMessage = err?.data?.message || 'Failed to reset password';
        if (errorMessage.toLowerCase().includes('expired') || errorMessage.toLowerCase().includes('invalid')) {
          setIsTokenInvalid(true);
        } else {
          setErrors(prev => ({
            ...prev,
            password: errorMessage
          }));
        }
      }
    }
  };

  // Invalid/Expired Token State
  if (isTokenInvalid) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Link expired or invalid</h3>
        <p className="text-sm text-gray-500 mb-6">
          This password reset link has expired or is invalid. Please request a new one.
        </p>
        <Link
          to="/marketplace/auth/forgot-password"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
        >
          Request new link
        </Link>
        <div className="mt-4">
          <Link
            to="/marketplace/auth/signin"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign in
          </Link>
        </div>
      </motion.div>
    );
  }

  // Success State
  if (isReset) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-6"
        >
          <ShieldCheck className="h-8 w-8 text-green-600" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Password reset successful!</h3>
        <p className="text-sm text-gray-500 mb-6">
          Your password has been successfully updated. You can now sign in with your new password.
        </p>
        <Link
          to="/marketplace/auth/signin"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all"
        >
          <Lock className="h-4 w-4" />
          Sign in with new password
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4">
          <Lock className="h-7 w-7 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">Create new password</h3>
        <p className="text-sm text-center text-gray-500">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <InputField
            label="New Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
            placeholder="Create a strong password"
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
          <PasswordStrength password={formData.password} />
        </div>

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={Lock}
          placeholder="Confirm your new password"
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

        {/* Password match indicator */}
        {formData.confirmPassword && formData.password && !errors.confirmPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-green-600"
          >
            <CheckCircle className="h-4 w-4" />
            Passwords match
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating password...
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Reset password
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ResetPassword;
