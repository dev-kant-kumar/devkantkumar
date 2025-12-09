import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validate } from '../../../../../../utils/formValidation';
import InputField from '../../../../common/components/ui/InputField';
import { registerStart, registerSuccess } from '../../../../store/auth/authSlice';
import { mockAuth } from '../../../../utils/mockAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (validate.required(formData.name)) newErrors.name = 'Full Name is required';

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
      setIsSubmitting(true);
      dispatch(registerStart());

      // Use mockAuth service
      try {
        const user = await mockAuth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        dispatch(registerSuccess(user));
        setIsSubmitting(false);
        const from = location.state?.from || '/marketplace/dashboard';
        navigate(from, { replace: true });
      } catch (error) {
        setIsSubmitting(false);
        setErrors(prev => ({ ...prev, email: error.message })); // Usually duplicate email
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Create your account</h3>
        <p className="mt-1 text-sm text-gray-500">
          Already have an account? <Link to="/marketplace/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={User}
          placeholder="John Doe"
        />

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
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>

          {/* Development Helper */}
          {process.env.NODE_ENV === 'development' && (
            <button
              type="button"
              onClick={() => setFormData({
                name: 'Test User',
                email: `test${Math.floor(Math.random() * 1000)}@example.com`,
                password: 'Password123!',
                confirmPassword: 'Password123!',
                agreeTerms: true
              })}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              Dev: Fill Test Data
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
