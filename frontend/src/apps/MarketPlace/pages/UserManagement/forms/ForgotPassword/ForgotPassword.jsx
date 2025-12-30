import { Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validate } from '../../../../../../utils/formValidation';
import InputField from '../../../../common/components/ui/InputField';

import { useForgotPasswordMutation } from '../../../../store/auth/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const [forgotPassword, { isLoading: isSubmitting }] = useForgotPasswordMutation();

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(null);
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
    } catch (err) {
      setError(err?.data?.message || 'Failed to send reset email. Please try again.');
    }
  };

  if (isSent) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <Mail className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
        <p className="mt-2 text-sm text-gray-500">
          We sent a password reset link to <strong>{email}</strong>
        </p>
        <div className="mt-6">
          <Link to="/marketplace/auth/signin" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Back to Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Reset your password</h3>
        <p className="mt-1 text-sm text-gray-500">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          error={error}
          icon={Mail}
          placeholder="you@example.com"
        />

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending link...' : 'Send reset link'}
          </button>
        </div>

        <div className="text-center">
          <Link to="/marketplace/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Back to Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
