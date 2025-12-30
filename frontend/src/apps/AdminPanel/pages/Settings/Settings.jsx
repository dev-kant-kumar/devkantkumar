import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Mail,
  RefreshCw,
  Save,
  Shield,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useChangeAdminPasswordMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useUploadAdminAvatarMutation
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

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const generateStrongPassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPasswordData(prev => ({
        ...prev,
        newPassword: retVal,
        confirmPassword: retVal
    }));
    toast.success("Strong password generated!");
  };

  const toggleVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        title: profile.profile?.title || "",
        bio: profile.profile?.bio || "",
      });
      // Handle avatar: check for object with url, or fallback to null
      const avatarUrl = profile.avatar?.url || null;
      setPreviewImage(avatarUrl);
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
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

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }).unwrap();
      toast.success("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
        <div className="flex border-b border-gray-200/50 dark:border-gray-700/50 p-2 gap-2">
            <TabButton id="profile" label="Profile Info" icon={User} activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="security" label="Security" icon={Shield} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="p-8">
            <AnimatePresence mode="wait">
                {activeTab === 'profile' ? (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-4xl"
                    >
                        {/* Avatar Section */}
                        <div className="flex items-center gap-6 mb-8 group">
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
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                        disabled={isUploading}
                                    />
                                </label>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Picture</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    JPG, GIF or PNG. Max size of 800K
                                </p>
                            </div>
                        </div>

                        <form onSubmit={onSubmitProfile} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Last Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Email cannot be changed directly.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Job Title</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Senior Administrator"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Write a short bio about yourself..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="security"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl"
                    >
                        <form onSubmit={onSubmitPassword} className="space-y-6">
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Current Password</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type={showPassword.current ? "text" : "password"}
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility('current')}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    >
                                        {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">New Password</label>
                                    <button
                                        type="button"
                                        onClick={generateStrongPassword}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 font-medium transition-colors"
                                    >
                                        <RefreshCw size={12} />
                                        Generate Strong Password
                                    </button>
                                </div>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type={showPassword.new ? "text" : "password"}
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility('new')}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    >
                                        {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Confirm New Password</label>
                                <div className="relative">
                                    <Check className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type={showPassword.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility('confirm')}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    >
                                        {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl flex gap-3 text-yellow-800 dark:text-yellow-200 text-sm mb-6">
                                    <Shield className="shrink-0 mt-0.5" size={18} />
                                    <p>Ensure your password is at least 8 characters long and includes a mix of letters, numbers, and special characters for optimal security.</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isChangingPassword}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isChangingPassword ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Update Password
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
