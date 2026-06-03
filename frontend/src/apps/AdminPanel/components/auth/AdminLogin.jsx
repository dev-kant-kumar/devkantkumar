import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Shield,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAdminLoginMutation,
  useVerifyAdmin2FALoginMutation,
} from "../../store/api/adminApiSlice";
import {
  clearError,
  loginSuccess,
  selectAuthError,
  selectIsAuthenticated,
} from "../../store/auth/adminAuthSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, { isLoading: isLoginLoading, error: loginError }] =
    useAdminLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authError = useSelector(selectAuthError);

  // 2FA State
  const [verify2FALogin, { isLoading: isVerifying2FA }] =
    useVerifyAdmin2FALoginMutation();
  const [authFlow, setAuthFlow] = useState({
    show2FA: false,
    tempToken: null,
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  // Mouse Parallax & Spotlight Effects
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setCoords({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35,
      });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/__dx9k_ctrl");
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
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

    // Real-time validation as user types
    if (touched[name]) {
      const error =
        name === "email" ? validateEmail(value) : validatePassword(value);
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    }

    // Clear global errors when user types
    if (authError || loginError) {
      dispatch(clearError());
    }
    if (serverError) setServerError("");
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

    // Clear previous errors
    setFieldErrors({ email: "", password: "" });
    setServerError("");

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setTouched({ email: true, password: true });
    setFieldErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    try {
      const result = await adminLogin({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // Check if 2FA is required - be explicit about the check
      const requires2FA = Boolean(
        result?.otpRequired === true ||
          result?.twoFactorRequired === true ||
          (result?.tempToken && result?.tempToken.length > 0),
      );

      if (requires2FA) {
        if (!result.tempToken) {
          console.error(
            "❌ [Login] ERROR: 2FA required but no tempToken provided!",
          );
          setServerError(
            "Authentication error: Missing verification token. Please try again.",
          );
          return;
        }

        setAuthFlow({
          show2FA: true,
          tempToken: result.tempToken,
        });
        setServerError("");
        return;
      }

      navigate("/__dx9k_ctrl");
    } catch (error) {
      // Extract error message from various possible error structures
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "An unexpected error occurred. Please try again.";

      const lowerMsg = errorMessage.toLowerCase();

      // Map specific errors to appropriate fields
      if (
        lowerMsg.includes("user not found") ||
        lowerMsg.includes("no user found") ||
        lowerMsg.includes("invalid email") ||
        lowerMsg.includes("email")
      ) {
        setFieldErrors({
          email: "No account found with this email address",
          password: "",
        });
        setServerError("");
      } else if (
        lowerMsg.includes("invalid password") ||
        lowerMsg.includes("password incorrect") ||
        lowerMsg.includes("password")
      ) {
        setFieldErrors({
          email: "",
          password: "Incorrect password. Please try again.",
        });
        setServerError("");
      } else if (
        lowerMsg.includes("account locked") ||
        lowerMsg.includes("too many")
      ) {
        setServerError(
          "Your account has been temporarily locked due to too many failed login attempts. Please try again later.",
        );
        setFieldErrors({ email: "", password: "" });
      } else if (
        lowerMsg.includes("deactivated") ||
        lowerMsg.includes("inactive")
      ) {
        setServerError(
          "Your account has been deactivated. Please contact support for assistance.",
        );
        setFieldErrors({ email: "", password: "" });
      } else if (
        lowerMsg.includes("verify") ||
        lowerMsg.includes("verification")
      ) {
        setServerError(
          "Please verify your email address before logging in. Check your inbox for the verification link.",
        );
        setFieldErrors({ email: "", password: "" });
      } else if (error.status === 429) {
        setServerError(
          "Too many login attempts. Please wait a few minutes and try again.",
        );
        setFieldErrors({ email: "", password: "" });
      } else if (
        error.status === "FETCH_ERROR" ||
        lowerMsg.includes("network")
      ) {
        setServerError(
          "Network error. Please check your internet connection and try again.",
        );
        setFieldErrors({ email: "", password: "" });
      } else {
        // Generic error for anything else
        setServerError(errorMessage);
        setFieldErrors({ email: "", password: "" });
      }
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input with proper delay
    if (value && index < 5) {
      requestAnimationFrame(() => {
        const nextInput = document.getElementById(`login-otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      });
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setServerError("");

    if (otp.some((d) => !d)) {
      setServerError("Please enter the complete 6-digit code");
      return;
    }

    try {
      const result = await verify2FALogin({
        tempToken: authFlow.tempToken,
        otp: otp.join(""),
      }).unwrap();
      console.log("🔐 [2FA] verify response:", result);

      // Normalize response shape to find token/user in common locations
      const token =
        result?.token || result?.data?.token || result?.data?.data?.token;
      const user =
        result?.user || result?.data?.user || result?.data?.data?.user;

      if (token) {
        // Persist in localStorage and update auth slice (mirrors loginSuccess behavior)
        dispatch(loginSuccess({ token, user }));
        // Ensure local state cleared
        setAuthFlow({ show2FA: false, tempToken: null });
        setOtp(["", "", "", "", "", ""]);
        navigate("/__dx9k_ctrl");
        return;
      }

      // If we don't have a token, surface an error instead of navigating
      setServerError(
        "Verification succeeded but no authentication token was returned. Please try logging in again.",
      );
      console.error("❌ [2FA] Missing token in verify response", result);
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Invalid verification code. Please try again.";

      setServerError(errorMessage);
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("login-otp-0")?.focus();
    }
  };

  const getErrorMessage = () => {
    if (serverError) return serverError;
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
    <div className="min-h-screen flex items-center justify-center bg-[#070809] text-slate-100 transition-colors duration-300 relative overflow-hidden select-none">
      {/* Background radial soft lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: coords.x * -1.5,
            y: coords.y * -1.5,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 25 }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: coords.x * 1.5,
            y: coords.y * 1.5,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 25 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-900/50 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-sm px-4">
        {/* Glow behind card top-left corner */}
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-rose-600/15 blur-2xl pointer-events-none" />

        {/* The Glass Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onMouseMove={handleCardMouseMove}
          style={{
            background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03), transparent 80%), rgba(12, 13, 14, 0.65)`,
          }}
          className="p-9 rounded-[32px] border border-white/[0.08] shadow-2xl backdrop-blur-3xl relative overflow-hidden group"
        >
          {/* Bevel highlights */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-white/15 via-white/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 bottom-0 w-[1.5px] bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-white tracking-tight leading-none flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-[#ff1a53] flex-shrink-0" /> Restricted Access
            </h1>
            <p className="text-xs text-slate-500 mt-3 font-medium px-4 leading-normal">
              Authorised personnel only. Verify your credentials to continue.
            </p>
          </div>

          {/* Alert Error Box */}
          <AnimatePresence mode="wait">
            {(authError || loginError || serverError) && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-5 p-4 bg-rose-950/20 border border-rose-900/30 rounded-2xl backdrop-blur-sm text-left"
              >
                <div className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-rose-200">
                      Authentication Failed
                    </p>
                    <p className="text-[10px] text-rose-400/90 leading-relaxed font-medium mt-0.5">
                      {getErrorMessage()}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic forms */}
          <AnimatePresence mode="wait">
            {authFlow.show2FA && authFlow.tempToken ? (
              <motion.form
                key="2fa-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
                onSubmit={handle2FASubmit}
              >
                <div className="text-center">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-500" /> Two-Factor Verify
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Enter the 6-digit verification code from your authenticator app
                  </p>
                </div>

                <div className="flex gap-1.5 justify-center py-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={`otp-input-${idx}`}
                      id={`login-otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit && idx > 0) {
                          const prevInput = document.getElementById(
                            `login-otp-${idx - 1}`,
                          );
                          if (prevInput) prevInput.focus();
                        }
                      }}
                      className="w-10 h-12 text-center text-md font-bold rounded-xl border border-white/10 bg-white/5 text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10 outline-none transition-all"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                <motion.button
                  type="submit"
                  disabled={isVerifying2FA || otp.some((d) => !d)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-600 to-orange-600 shadow-md hover:shadow-lg hover:shadow-rose-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider cursor-pointer"
                >
                  {isVerifying2FA ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify security token"
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthFlow({ show2FA: false, tempToken: null });
                    setOtp(["", "", "", "", "", ""]);
                    setServerError("");
                  }}
                  className="w-full text-center text-[10px] font-semibold text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  Back to credentials login
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Email Field */}
                <div className="space-y-1">
                  <div className="px-5 py-2.5 rounded-2xl bg-[#131415] border border-white/10 focus-within:border-white/20 focus-within:ring-2 focus-within:ring-white/5 transition-all">
                    <label className="block text-[10px] font-medium text-slate-500 text-left">
                      Email Address:
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("email")}
                      className="block w-full bg-transparent border-0 p-0 text-sm text-slate-200 placeholder-slate-600 focus:ring-0 outline-none text-left mt-0.5 autofill:shadow-[inset_0_0_0_1000px_#131415]"
                      style={formData.email ? { WebkitTextFillColor: "#f1f5f9" } : {}}
                      placeholder="admin@domain.com"
                    />
                  </div>
                  <AnimatePresence>
                    {touched.email && fieldErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 pl-2 pt-0.5"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="relative px-5 py-2.5 rounded-2xl bg-[#131415] border border-white/10 focus-within:border-white/20 focus-within:ring-2 focus-within:ring-white/5 transition-all flex items-center justify-between">
                    <div className="flex-1 pr-8">
                      <label className="block text-[10px] font-medium text-slate-500 text-left">
                        Password:
                      </label>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("password")}
                        className="block w-full bg-transparent border-0 p-0 text-sm text-slate-200 placeholder-slate-700 focus:ring-0 outline-none text-left mt-0.5 autofill:shadow-[inset_0_0_0_1000px_#131415]"
                        style={formData.password ? { WebkitTextFillColor: "#f1f5f9" } : {}}
                        placeholder="••••••••••••"
                      />
                    </div>

                    {/* Visibility Toggle Button inside password box */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {touched.password && fieldErrors.password && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 pl-2 pt-0.5"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dedicated full-width premium submit button */}
                <motion.button
                  type="submit"
                  disabled={isLoginLoading || !isFormValid}
                  whileHover={{ scale: isLoginLoading ? 1 : 1.01 }}
                  whileTap={{ scale: isLoginLoading ? 1 : 0.99 }}
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-[#ff1a53] to-[#ff6a00] shadow-[0_4px_20px_rgba(255,26,83,0.3)] hover:shadow-[0_4px_25px_rgba(255,26,83,0.55)] transition-all uppercase tracking-wider cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 mt-5"
                >
                  {isLoginLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authorizing Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-3.5 h-3.5" />
                      <span>Unlock Portal Gateway</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
