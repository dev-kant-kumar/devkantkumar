import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    Camera,
    Eye,
    EyeOff,
    Globe,
    Key,
    Loader2,
    Mail,
    RefreshCw,
    Save,
    Search as SearchIcon,
    Shield,
    Smartphone,
    User,
    X
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
    useChangeAdminPasswordMutation,
    useDisable2FAMutation,
    useGetAdminProfileQuery,
    useGetGeneralSettingsQuery,
    useGetSeoSettingsQuery,
    useInitiateEmailChangeMutation,
    useInitiatePasswordChangeMutation,
    useSetup2FAMutation,
    useUpdateAdminProfileMutation,
    useUpdateGeneralSettingsMutation,
    useUpdateSeoSettingsMutation,
    useUploadAdminAvatarMutation,
    useVerify2FASetupMutation,
    useVerifyEmailChangeOTPMutation,
    useVerifyPasswordChangeOTPMutation
} from "../../store/api/adminApiSlice";

const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors rounded-xl ${
      activeTab === id
        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`}
  >
    <Icon size={18} />
    {label}
    {activeTab === id && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500 mx-6 rounded-full"
      />
    )}
  </button>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: profile, isLoading, refetch } = useGetAdminProfileQuery();

  // Settings hooks
  const { data: genSettings, isLoading: isLoadingGen } = useGetGeneralSettingsQuery();
  const { data: seoSettings, isLoading: isLoadingSeo } = useGetSeoSettingsQuery();
  const [updateGen] = useUpdateGeneralSettingsMutation();
  const [updateSeo] = useUpdateSeoSettingsMutation();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateAdminProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangeAdminPasswordMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAdminAvatarMutation();



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    bio: "",
  });

  const [siteData, setSiteData] = useState({
    siteName: "",
    supportEmail: "",
    metaTitle: "",
    metaDescription: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const [emailVerificationStep, setEmailVerificationStep] = useState(0); // 0: Idle, 1: Verify Current, 2: Enter New, 3: Verify New
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [newEmail, setNewEmail] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  const [passwordVerificationStep, setPasswordVerificationStep] = useState(0); // 0: Idle, 1: Verify OTP
  const [passwordOtp, setPasswordOtp] = useState(["", "", "", "", "", ""]);
  const [passwordOtpTimer, setPasswordOtpTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  useEffect(() => {
    let interval;
    if (passwordOtpTimer > 0) {
      interval = setInterval(() => {
        setPasswordOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [passwordOtpTimer]);

  const [initiateEmailChange, { isLoading: isInitiatingEmail }] = useInitiateEmailChangeMutation();
  const [verifyEmailChangeOTP, { isLoading: isVerifyingEmail }] = useVerifyEmailChangeOTPMutation();
  const [initiatePasswordChange, { isLoading: isInitiatingPasswordChange }] = useInitiatePasswordChangeMutation();
  const [verifyPasswordChangeOTP, { isLoading: isVerifyingPasswordChange }] = useVerifyPasswordChangeOTPMutation();

  // 2FA Hooks
  const [setup2FA, { isLoading: isSettingUp2FA }] = useSetup2FAMutation();
  const [verify2FASetup, { isLoading: isVerifying2FA }] = useVerify2FASetupMutation();
  const [disable2FA, { isLoading: isDisabling2FA }] = useDisable2FAMutation();

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFactorSecret, setTwoFactorSecret] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const is2FAEnabled = profile?.isTwoFactorEnabled;

  const handleEnable2FA = async () => {
    try {
      const result = await setup2FA().unwrap();
      setTwoFactorSecret(result.secret);
      setQrCodeUrl(result.qrCode);
      setShow2FAModal(true);
    } catch (error) {
      toast.error("Failed to generate 2FA secret");
    }
  };

  const handleVerify2FA = async () => {
    try {
      await verify2FASetup({ token: twoFactorCode }).unwrap();
      toast.success("2FA enabled successfully!");
      setShow2FAModal(false);
      setTwoFactorCode("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Invalid code");
    }
  };

  const handleDisable2FA = async () => {
    if (!passwordData.currentPassword) {
      return toast.error("Please enter current password to disable 2FA");
    }

    try {
      await disable2FA({ password: passwordData.currentPassword }).unwrap();
      toast.success("2FA disabled successfully");
      setPasswordData(prev => ({ ...prev, currentPassword: "" }));
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to disable 2FA");
    }
  };

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        title: profile.profile?.title || "",
        bio: profile.profile?.bio || "",
      });
      const avatarUrl = profile.avatar?.url || null;
      setPreviewImage(avatarUrl);
    }
  }, [profile]);

  useEffect(() => {
    if (genSettings?.data || seoSettings?.data) {
       setSiteData({
         siteName: genSettings?.data?.general?.siteName || "",
         supportEmail: genSettings?.data?.general?.supportEmail || "",
         metaTitle: seoSettings?.data?.seo?.metaTitle || "",
         metaDescription: seoSettings?.data?.seo?.metaDescription || ""
       });
    }
  }, [genSettings, seoSettings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSiteInputChange = (e) => {
    const { name, value } = e.target;
    setSiteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await uploadAvatar(formData).unwrap();
      toast.success("Avatar updated successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to upload avatar");
    }
  };

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPasswordData(prev => ({
        ...prev,
        newPassword: password,
        confirmPassword: password
    }));
    toast.success("Strong password generated!");
  };

  const clearEmailState = () => {
    setEmailVerificationStep(0);
    setEmailOtp(["", "", "", "", "", ""]);
    setNewEmail("");
    setOtpTimer(0);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...emailOtp];
    newOtp[index] = value;
    setEmailOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleInitiateEmailChange = async () => {
    try {
      await initiateEmailChange({ type: 'current' }).unwrap();
      setEmailVerificationStep(1);
      setOtpTimer(60);
      toast.success("OTP sent to your current email");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyCurrentEmail = async () => {
    try {
      await verifyEmailChangeOTP({ otp: emailOtp.join(""), type: 'current' }).unwrap();
      setEmailVerificationStep(2);
      setEmailOtp(["", "", "", "", "", ""]);
      setOtpTimer(0);
      toast.success("Current email verified");
    } catch (error) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  };

  const handleSendNewEmailOtp = async () => {
    if (!newEmail) return toast.error("Please enter a new email");
    try {
      await initiateEmailChange({ type: 'new', newEmail }).unwrap();
      setEmailVerificationStep(3);
      setOtpTimer(60);
      toast.success("OTP sent to new email");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyNewEmail = async () => {
    try {
      await verifyEmailChangeOTP({ otp: emailOtp.join(""), type: 'new' }).unwrap();
      toast.success("Email updated successfully!");
      clearEmailState();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  };

  const handlePasswordOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...passwordOtp];
    newOtp[index] = value;
    setPasswordOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pwd-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleInitiatePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return toast.error("Please fill all password fields");
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("New passwords do not match");
    }
    if (passwordData.newPassword.length < 6) {
        return toast.error("Password must be at least 6 characters");
    }

    try {
      await initiatePasswordChange({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }).unwrap();
      setPasswordVerificationStep(1);
      setPasswordOtpTimer(60);
      toast.success("OTP sent to your email to verify password change");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to initiate password change");
    }
  };

  const handleVerifyPasswordChange = async () => {
    try {
      await verifyPasswordChangeOTP({ otp: passwordOtp.join("") }).unwrap();
      toast.success("Password updated successfully");
      setPasswordVerificationStep(0);
      setPasswordOtp(["", "", "", "", "", ""]);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordOtpTimer(0);
    } catch (error) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  };

  const onSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const onSubmitSite = async (e) => {
    e.preventDefault();
    try {
      await updateGen({
        general: { siteName: siteData.siteName, supportEmail: siteData.supportEmail }
      }).unwrap();
      await updateSeo({
        seo: { metaTitle: siteData.metaTitle, metaDescription: siteData.metaDescription }
      }).unwrap();
      toast.success("Site configuration saved");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }).unwrap();
      toast.success("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  if (isLoading || isLoadingGen || isLoadingSeo) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          Admin Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account settings and security preferences
        </p>
      </div>

      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200/50 dark:border-gray-700/50 p-2 gap-2 overflow-x-auto scrollbar-none">
            <TabButton id="profile" label="Profile" icon={User} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="site" label="Site Config" icon={Globe} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="security" label="Security" icon={Shield} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="p-4 md:p-8">
            <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="max-w-4xl"
                    >
                        {/* Avatar Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 group text-center sm:text-left">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                                    <img
                                        src={previewImage || `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=0D8ABC&color=fff`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors z-10">
                                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={isUploading} />
                                </label>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Photo</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your avatar and identity.</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            <div className="flex flex-col gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>

                                    {emailVerificationStep === 0 ? (
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={formData.email}
                                                readOnly
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleInitiateEmailChange}
                                                disabled={isInitiatingEmail}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                            >
                                                {isInitiatingEmail ? <Loader2 size={14} className="animate-spin" /> : "Change"}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10 space-y-4">
                                            {/* Wizard Header */}
                                            <div className="flex items-center justify-between pointer-events-none">
                                                <div className="flex gap-2">
                                                    {[1, 2, 3].map(step => (
                                                        <div key={step} className={`w-8 h-1 rounded-full transition-colors ${emailVerificationStep >= step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                                                    ))}
                                                </div>
                                                <button onClick={clearEmailState} className="pointer-events-auto text-gray-400 hover:text-gray-600"><X size={16} /></button>
                                            </div>

                                            {/* Step 1: Verify Current Email */}
                                            {emailVerificationStep === 1 && (
                                                <div className="space-y-3">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">Enter the 6-digit code sent to <span className="font-semibold">{formData.email}</span></p>
                                                    <div className="flex gap-2 justify-center">
                                                        {emailOtp.map((digit, idx) => (
                                                            <input
                                                                key={idx}
                                                                id={`otp-${idx}`}
                                                                type="text"
                                                                maxLength={1}
                                                                value={digit}
                                                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Backspace' && !digit && idx > 0) {
                                                                        document.getElementById(`otp-${idx-1}`).focus();
                                                                    }
                                                                }}
                                                                className="w-10 h-12 text-center text-lg font-bold rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 outline-none"
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="text-center">
                                                        {otpTimer > 0 ? (
                                                            <p className="text-xs text-gray-400">Resend code in {otpTimer}s</p>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={handleInitiateEmailChange}
                                                                className="text-xs font-bold text-blue-600 hover:text-blue-700"
                                                            >
                                                                Resend Code
                                                            </button>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleVerifyCurrentEmail}
                                                        disabled={isVerifyingEmail || emailOtp.some(d => !d)}
                                                        className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold text-sm disabled:opacity-50"
                                                    >
                                                        {isVerifyingEmail ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Verify Code"}
                                                    </button>
                                                </div>
                                            )}

                                            {/* Step 2: New Email Input */}
                                            {emailVerificationStep === 2 && (
                                                <div className="space-y-3">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">Enter your new email address.</p>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                        <input
                                                            type="email"
                                                            value={newEmail}
                                                            onChange={(e) => setNewEmail(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 outline-none"
                                                            placeholder="new@example.com"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleSendNewEmailOtp}
                                                        disabled={isInitiatingEmail || !newEmail}
                                                        className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold text-sm disabled:opacity-50"
                                                    >
                                                        {isInitiatingEmail ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Send Verification Code"}
                                                    </button>
                                                </div>
                                            )}

                                            {/* Step 3: Verify New Email */}
                                            {emailVerificationStep === 3 && (
                                                <div className="space-y-3">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">Enter the 6-digit code sent to <span className="font-semibold">{newEmail}</span></p>
                                                    <div className="flex gap-2 justify-center">
                                                        {emailOtp.map((digit, idx) => (
                                                            <input
                                                                key={idx}
                                                                id={`otp-${idx}`}
                                                                type="text"
                                                                maxLength={1}
                                                                value={digit}
                                                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                                className="w-10 h-12 text-center text-lg font-bold rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 outline-none"
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="text-center">
                                                        {otpTimer > 0 ? (
                                                            <p className="text-xs text-gray-400">Resend code in {otpTimer}s</p>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={handleSendNewEmailOtp}
                                                                className="text-xs font-bold text-blue-600 hover:text-blue-700"
                                                            >
                                                                Resend Code
                                                            </button>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleVerifyNewEmail}
                                                        disabled={isVerifyingEmail || emailOtp.some(d => !d)}
                                                        className="w-full py-2 bg-green-600 text-white rounded-lg font-bold text-sm disabled:opacity-50"
                                                    >
                                                        {isVerifyingEmail ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Verify & Update Email"}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Job Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile Bio</label>
                                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white resize-none" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" disabled={isUpdating} className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
                                    {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Save Profile
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {activeTab === 'site' && (
                    <motion.div
                        key="site"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-4xl space-y-8"
                    >
                        <form onSubmit={onSubmitSite} className="space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Globe size={18} className="text-blue-500" />
                                    General Branding
                                 </h3>
                                 <div className="space-y-4">
                                    <div className="space-y-2">
                                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Site Name</label>
                                       <input type="text" name="siteName" value={siteData.siteName} onChange={handleSiteInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Support Email</label>
                                       <input type="email" name="supportEmail" value={siteData.supportEmail} onChange={handleSiteInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white" />
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-6">
                                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    <SearchIcon size={18} className="text-purple-500" />
                                    Search Engine (SEO)
                                 </h3>
                                 <div className="space-y-4">
                                    <div className="space-y-2">
                                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Meta Title</label>
                                       <input type="text" name="metaTitle" value={siteData.metaTitle} onChange={handleSiteInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Meta Description</label>
                                       <textarea name="metaDescription" value={siteData.metaDescription} onChange={handleSiteInputChange} rows={3} className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white text-xs resize-none" />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800 flex gap-4">
                              <AlertCircle className="text-blue-500 shrink-0" size={20} />
                              <div className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                                 <p className="font-bold mb-1">Notice:</p>
                                 These global variables affect the entire portfolio application, including meta tags for social sharing (OpenGraph) and the main site header identity.
                              </div>
                           </div>

                           <div className="flex justify-end">
                                <button type="submit" className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
                                    <Save size={18} />
                                    Update Site Config
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {activeTab === 'security' && (
                    <motion.div
                        key="security"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl"
                    >
                         <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Password</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type={showPassword.current ? "text" : "password"}
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData(p => ({ ...p, currentPassword: e.target.value }))}
                                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        placeholder="Enter your current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(p => ({ ...p, current: !p.current }))}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Password</label>
                                    <button
                                        type="button"
                                        onClick={generatePassword}
                                        className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 transition-colors uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg"
                                    >
                                        <RefreshCw size={12} />
                                        Generate Strong Password
                                    </button>
                                </div>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type={showPassword.new ? "text" : "password"}
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData(p => ({ ...p, newPassword: e.target.value }))}
                                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        placeholder="Enter new password (min. 6 characters)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(p => ({ ...p, new: !p.new }))}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type={showPassword.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData(p => ({ ...p, confirmPassword: e.target.value }))}
                                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        placeholder="Re-enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(p => ({ ...p, confirm: !p.confirm }))}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                </div>

                            {/* 2FA Section */}
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <Smartphone size={18} className="text-purple-500" />
                                    Two-Factor Authentication
                                </h3>

                                {is2FAEnabled ? (
                                    <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800 flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-bold text-green-800 dark:text-green-300">2FA is Enabled</p>
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Your account is secured with two-factor authentication.</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleDisable2FA}
                                            disabled={isDisabling2FA}
                                            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            {isDisabling2FA ? <Loader2 size={14} className="animate-spin" /> : "Disable"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">Add Extra Security</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Protect your account using an authenticator app like Google Authenticator.</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleEnable2FA}
                                            disabled={isSettingUp2FA}
                                            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-xs font-bold hover:shadow-lg transition-all"
                                        >
                                            {isSettingUp2FA ? <Loader2 size={14} className="animate-spin" /> : "Enable 2FA"}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* 2FA Setup Modal */}
                            {show2FAModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                                    >
                                        <div className="p-6 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Setup 2FA</h3>
                                                <button onClick={() => setShow2FAModal(false)} className="text-gray-400 hover:text-gray-600">
                                                    <X size={20} />
                                                </button>
                                            </div>

                                            <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                                {qrCodeUrl && <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48 rounded-lg" />}
                                                <p className="text-xs text-center text-gray-500 font-mono break-all">{twoFactorSecret}</p>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                                    Scan the QR code with your authenticator app, then enter the 6-digit code below.
                                                </p>
                                                <input
                                                    type="text"
                                                    value={twoFactorCode}
                                                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    placeholder="Enter 6-digit code"
                                                    className="w-full text-center text-2xl font-bold tracking-widest py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleVerify2FA}
                                                    disabled={isVerifying2FA || twoFactorCode.length !== 6}
                                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                                                >
                                                    {isVerifying2FA ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Verify & Enable"}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* Password OTP Modal */}
                            {passwordVerificationStep === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Verify Password Change</h3>
                                        <button
                                            type="button"
                                            onClick={() => setPasswordVerificationStep(0)}
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Please enter the 6-digit code sent to your email address to confirm this password change.
                                    </p>
                                    <div className="flex gap-2 justify-center">
                                        {passwordOtp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                id={`pwd-otp-${idx}`}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handlePasswordOtpChange(idx, e.target.value)}
                                                onKeyDown={(e) => {
                                                     if (e.key === 'Backspace' && !digit && idx > 0) {
                                                         document.getElementById(`pwd-otp-${idx-1}`).focus();
                                                     }
                                                 }}
                                                className="w-10 h-12 text-center text-lg font-bold rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 outline-none"
                                            />
                                        ))}
                                    </div>
                                    <div className="text-center">
                                        {passwordOtpTimer > 0 ? (
                                            <p className="text-xs text-gray-400">Resend code in {passwordOtpTimer}s</p>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleInitiatePasswordChange}
                                                className="text-xs font-bold text-blue-600 hover:text-blue-700"
                                            >
                                                Resend Code
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleVerifyPasswordChange}
                                        disabled={isVerifyingPasswordChange || passwordOtp.some(d => !d)}
                                        className="w-full py-2 bg-green-600 text-white rounded-lg font-bold text-sm disabled:opacity-50"
                                    >
                                        {isVerifyingPasswordChange ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Verify & Update Password"}
                                    </button>
                                </motion.div>
                            )}

                            <div className="pt-6">
                                <button
                                    type="button"
                                    onClick={handleInitiatePasswordChange}
                                    disabled={
                                        isInitiatingPasswordChange ||
                                        !passwordData.currentPassword ||
                                        !passwordData.newPassword ||
                                        !passwordData.confirmPassword
                                    }
                                    className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isInitiatingPasswordChange ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Update Security
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
