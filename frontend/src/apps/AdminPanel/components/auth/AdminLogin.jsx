import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  clearError,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
} from "../../store/auth/adminAuthSlice";
import { useAdminLoginMutation } from "../../store/api/adminApiSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, { isLoading: isLoginLoading, error: loginError }] =
    useAdminLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authError = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error =
        name === "email" ? validateEmail(value) : validatePassword(value);
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    }

    if (authError || loginError) {
      dispatch(clearError());
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error =
      field === "email"
        ? validateEmail(formData[field])
        : validatePassword(formData[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setTouched({ email: true, password: true });
    setFieldErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    try {
      console.log("🚀 [AdminLogin] Login attempt:", {
        timestamp: new Date().toISOString(),
        email: formData.email,
      });

      const result = await adminLogin({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("✅ [AdminLogin] Success:", {
        timestamp: new Date().toISOString(),
        userRole: result.user?.role,
      });
    } catch (error) {
      console.error("❌ [AdminLogin] Error:", {
        timestamp: new Date().toISOString(),
        error: error.message || error.data?.message,
        status: error.status,
      });
    }
  };

  const getErrorMessage = () => {
    if (loginError) {
      if (loginError.status === 401) return "Invalid email or password";
      if (loginError.status === 403)
        return "Access denied. Admin privileges required";
      if (loginError.status === 429)
        return "Too many attempts. Please try again later";
      if (loginError.status === "FETCH_ERROR")
        return "Network error. Please check your connection";
      return loginError.data?.message || "Login failed. Please try again";
    }
    return authError || "An unexpected error occurred";
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    !fieldErrors.email &&
    !fieldErrors.password;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Left Side - Login Form */}
      <div className="relative flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-24 z-10">
        <div className="mx-auto w-full max-w-md">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Sign in to access your admin dashboard and manage your portfolio
              with powerful tools.
            </p>
          </motion.div>

          {/* Error Alert */}
          <AnimatePresence mode="wait">
            {(authError || loginError) && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-1">
                      Authentication Failed
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">
                      {getErrorMessage()}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Mail
                    className={`w-5 h-5 transition-colors flex-shrink-0 ${
                      touched.email && !fieldErrors.email && formData.email
                        ? "text-green-500"
                        : touched.email && fieldErrors.email
                        ? "text-red-500"
                        : "text-slate-500 dark:text-slate-400 group-focus-within:text-blue-500"
                    }`}
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("email")}
                  className={`block w-full pl-12 pr-12 py-3.5 text-sm bg-white dark:bg-slate-800/50 border-2 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                    touched.email && fieldErrors.email
                      ? "border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : touched.email && !fieldErrors.email && formData.email
                      ? "border-green-300 dark:border-green-800 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none`}
                  placeholder="admin@devkantkumar.com"
                />
                {touched.email && formData.email && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {fieldErrors.email ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                )}
              </div>
              <AnimatePresence>
                {touched.email && fieldErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock
                    className={`w-5 h-5 transition-colors flex-shrink-0 ${
                      touched.password &&
                      !fieldErrors.password &&
                      formData.password
                        ? "text-green-500"
                        : touched.password && fieldErrors.password
                        ? "text-red-500"
                        : "text-slate-500 dark:text-slate-400 group-focus-within:text-blue-500"
                    }`}
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("password")}
                  className={`block w-full pl-12 pr-12 py-3.5 text-sm bg-white dark:bg-slate-800/50 border-2 rounded-xl transition-all duration-200 backdrop-blur-sm ${
                    touched.password && fieldErrors.password
                      ? "border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : touched.password &&
                        !fieldErrors.password &&
                        formData.password
                      ? "border-green-300 dark:border-green-800 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {touched.password && fieldErrors.password && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoginLoading || !isFormValid}
              whileHover={{ scale: isLoginLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoginLoading ? 1 : 0.99 }}
              className={`relative w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white shadow-lg transition-all duration-200 overflow-hidden ${
                isLoginLoading || !isFormValid
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-blue-500/25"
              }`}
            >
              {!isLoginLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity" />
              )}
              <span className="relative flex items-center justify-center gap-2">
                {isLoginLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Sign In Securely</span>
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Protected by enterprise-grade security</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-12 text-white">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Admin Portal</h3>
                  <p className="text-xs text-blue-200">DevKant Kumar</p>
                </div>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent"
            >
              Manage Your Digital Empire
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-blue-100 mb-12 leading-relaxed"
            >
              Access powerful tools to showcase your work and connect with
              opportunities
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-12"
            >
              {[
                {
                  icon: "🎨",
                  title: "Portfolio Management",
                  desc: "Showcase your best projects",
                },
                {
                  icon: "📊",
                  title: "Analytics Dashboard",
                  desc: "Track visitor engagement",
                },
                {
                  icon: "✉️",
                  title: "Message Center",
                  desc: "Connect with opportunities",
                },
                {
                  icon: "🔒",
                  title: "Security First",
                  desc: "Enterprise-grade protection",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-blue-200">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
            >
              <p className="text-blue-100 italic mb-3 leading-relaxed">
                "Excellence is not a skill, it's an attitude. Keep building
                amazing things."
              </p>
              <p className="text-blue-300 text-sm font-semibold">
                — Ralph Marston
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
