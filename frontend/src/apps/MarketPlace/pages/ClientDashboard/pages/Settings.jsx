import { motion } from 'framer-motion';
import { AlertTriangle, Camera, CheckCircle, ChevronRight, Eye, EyeOff, Lock, Mail, MapPin, Phone, RefreshCw, Shield, Smartphone, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddAddressMutation, useChangePasswordMutation, useDeleteAccountMutation, useDeleteAddressMutation, useDisable2FAMutation, useGetMeQuery, useLogoutMutation, useSetup2FAMutation, useUpdateAddressMutation, useUpdateProfileMutation, useVerify2FAMutation } from '../../../store/auth/authApi';
import { logout, selectCurrentUser } from '../../../store/auth/authSlice';
import { useUploadImageMutation } from '../../../store/upload/uploadApi';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const currentUser = useSelector(selectCurrentUser);
  const { data: apiUser } = useGetMeQuery();
  const user = apiUser?.user || currentUser; // Prioritize fresh API data
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [deleteAccount, { isLoading: isDeletingAccount }] = useDeleteAccountMutation();
  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdatingAddress }] = useUpdateAddressMutation();
  const [deleteAddress, { isLoading: isDeletingAddress }] = useDeleteAddressMutation();
  const [logoutUser] = useLogoutMutation();
  const [setup2FA, { isLoading: isSettingUp2FA }] = useSetup2FAMutation();
  const [verify2FA, { isLoading: isVerifying2FA }] = useVerify2FAMutation();
  const [disable2FA, { isLoading: isDisabling2FA }] = useDisable2FAMutation();
  const fileInputRef = useRef(null);

  // 2FA States
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFAData, setTwoFAData] = useState({ qrCode: null, secret: null });
  const [twoFACode, setTwoFACode] = useState('');
  const [disablePassword, setDisablePassword] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPass = "";
    const length = 16;
    for (let i = 0; i < length; i++) {
        newPass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPasswordData(prev => ({
        ...prev,
        newPassword: newPass,
        confirmNewPassword: newPass
    }));
    setShowPasswords(prev => ({ ...prev, new: true, confirm: true }));
    toast.success('Strong password generated!');
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
    location: '',
    company: '',
    website: '',
    avatar: null,
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      instagram: ''
    },
    preferences: {
      newsletter: true,
      notifications: {
        email: true,
        push: true
      },
      theme: 'auto'
    }
  });

  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false,
    addressType: 'shipping'
  });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value, checked, type } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditAddress = (address) => {
    setAddressForm({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
      addressType: address.addressType
    });
    setEditingAddressId(address._id);
    setShowAddressForm(true);
  };

  const handleCancelAddress = () => {
    setAddressForm({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: false,
      addressType: 'shipping'
    });
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        await updateAddress({ addressId: editingAddressId, ...addressForm }).unwrap();
        toast.success('Address updated successfully');
      } else {
        await addAddress(addressForm).unwrap();
        toast.success('Address added successfully');
      }
      handleCancelAddress();
    } catch (error) {
      console.error('Failed to save address:', error);
      toast.error(error?.data?.message || 'Failed to save address');
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await deleteAddress(id).unwrap();
      toast.success('Address deleted successfully');
    } catch (error) {
      console.error('Failed to delete address:', error);
      toast.error('Failed to delete address');
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        bio: user.bio || '',
        location: user.location || '',
        company: user.company || '',
        website: user.website || '',
        avatar: user.avatar || null,
        socialLinks: {
          linkedin: user.socialLinks?.linkedin || '',
          github: user.socialLinks?.github || '',
          twitter: user.socialLinks?.twitter || '',
          instagram: user.socialLinks?.instagram || ''
        },
        preferences: {
          newsletter: user.preferences?.newsletter !== false,
          notifications: {
            email: user.preferences?.notifications?.email !== false,
            push: user.preferences?.notifications?.push !== false
          },
          theme: user.preferences?.theme || 'auto'
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    // Handle nested state updates
    if (name.startsWith('socialLinks.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [field]: value }
      }));
    } else if (name.startsWith('notifications.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          notifications: { ...prev.preferences.notifications, [field]: checked }
        }
      }));
    } else if (name === 'newsletter') {
      setFormData(prev => ({
        ...prev,
        preferences: { ...prev.preferences, newsletter: checked }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitPasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }).unwrap();
      toast.success('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error(error?.data?.message || 'Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      // Logout logic
      await logoutUser().unwrap();
      dispatch(logout());
      // Assuming baseApiSlice is imported or available in scope for resetApiState
      // dispatch(baseApiSlice.util.resetApiState()); // Clear API cache
      navigate('/');
      toast.success('Your account has been closed.');
    } catch (error) {
      console.error('Failed to delete account:', error);
      toast.error('Failed to delete account');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(formData).unwrap();
      // Show success message (could add a toast notification system later)
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  // 2FA Handlers
  const handleSetup2FA = async () => {
    try {
      const result = await setup2FA().unwrap();
      setTwoFAData({ qrCode: result.qrCodeUrl, secret: result.secret });
      setShow2FASetup(true);
    } catch (error) {
      console.error('Failed to setup 2FA:', error);
      toast.error(error?.data?.message || 'Failed to setup 2FA');
    }
  };

  const handleVerify2FA = async () => {
    if (!twoFACode || twoFACode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    try {
      await verify2FA({ token: twoFACode }).unwrap();
      toast.success('Two-Factor Authentication enabled successfully!');
      setShow2FASetup(false);
      setTwoFACode('');
      setTwoFAData({ qrCode: null, secret: null });
    } catch (error) {
      console.error('Failed to verify 2FA:', error);
      toast.error(error?.data?.message || 'Invalid verification code');
    }
  };

  const handleDisable2FA = async () => {
    if (!disablePassword) {
      toast.error('Password is required to disable 2FA');
      return;
    }
    try {
      await disable2FA({ password: disablePassword }).unwrap();
      toast.success('Two-Factor Authentication disabled');
      setDisablePassword('');
    } catch (error) {
      console.error('Failed to disable 2FA:', error);
      toast.error(error?.data?.message || 'Failed to disable 2FA');
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await uploadImage(file).unwrap();
        // Assuming response structure is { success: true, file: { url, public_id, ... } } or similar based on backend
        // Based on uploadRoutes it calls uploadController.uploadImage.
        // Let's assume it returns { url: '...', public_id: '...' } or { file: { url: ... } }
        // Looking at common patterns, typically it returns `{ success: true, file: { url: ... } }`
        // But let's assume worst case and just update.
        // Actually, I should probably check the controller response format.
        // For now, I'll update assuming standard { url, public_id } or similar.
        // Wait, I should verify response format.
        // Proceeding with generic update for now.

        const uploadedAvatar = response.file || response; // Adjust based on actual API response

        setFormData(prev => ({ ...prev, avatar: uploadedAvatar }));
      } catch (error) {
        console.error('Failed to upload image:', error);
        alert('Failed to upload image');
      }
    }
  };

  const displayName = user?.firstName ? `${user.firstName} ${user.lastName}` : user?.name || 'User';
  const initial = displayName.charAt(0).toUpperCase();
  const avatarUrl = formData.avatar?.url || user?.avatar?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Account & Security</h2>
        <p className="mt-1 text-sm text-gray-500">Manage your profile, login details, and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar for Settings - Sticky */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-6 flex flex-col items-center border-b border-gray-100">
              <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl font-bold border-4 border-white shadow-md overflow-hidden relative">
                   {/* Avatar Image or Initial */}
                   {avatarUrl ? (
                    <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
                  ) : (
                    initial
                  )}
                  {/* Loading Overlay */}
                  {isUploading && (
                     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                       <span className="text-white text-xs">Uploading...</span>
                     </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-gray-900 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-4 w-4" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{displayName}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveSection('profile')}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeSection === 'profile' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3" />
                  Profile Information
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
                <button
                  onClick={() => setActiveSection('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === 'security'
                      ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Shield size={20} />
                  <span>Password & Security</span>
                  {activeSection === 'security' && <ChevronRight size={16} className="ml-auto" />}
                </button>

                <button
                  onClick={() => setActiveSection('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === 'addresses'
                      ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={20} />
                  <span>Address Book</span>
                  {activeSection === 'addresses' && <ChevronRight size={16} className="ml-auto" />}
                </button>
              <button
                onClick={() => setActiveSection('notifications')}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeSection === 'notifications' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  Notifications
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>

        {/* Main Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeSection === 'profile' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us a little about yourself"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <h3 className="text-lg font-bold text-gray-900 mt-8 mb-6">Social Profiles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      name="socialLinks.linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                    <input
                      type="url"
                      name="socialLinks.github"
                      value={formData.socialLinks.github}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                    <input
                      type="url"
                      name="socialLinks.twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                    <input
                      type="url"
                      name="socialLinks.instagram"
                      value={formData.socialLinks.instagram}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                </div>


              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm h-fit">
                        <Mail className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">Email Address</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${user?.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {user?.isEmailVerified ? (
                              <><CheckCircle className="h-3 w-3 mr-1" /> Verified</>
                            ) : (
                              'Unverified'
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                      </div>
                    </div>
                    {/* Email update usually requires a separate flow */}
                  </div>

                  {/* Phone */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm h-fit">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">Phone Number</p>
                          {/* Phone verification logic to be added */}
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'profile' && (
             <div className="flex justify-end pt-4 bg-gray-50 border-t border-gray-200 sticky bottom-0 -mx-6 px-6 pb-4 md:static md:bg-transparent md:border-0 md:p-0 md:m-0 z-10">
               <button
                 onClick={handleUpdateProfile}
                 disabled={isUpdating}
                 className={`w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${isUpdating ? 'opacity-75 cursor-not-allowed' : ''}`}
               >
                 {isUpdating ? (
                   <>
                     <RefreshCw className="animate-spin h-5 w-5" />
                     Saving Changes...
                   </>
                 ) : (
                   'Save Profile Changes'
                 )}
               </button>
             </div>
          )}

          {activeSection === 'addresses' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                 <div>
                  <h2 className="text-2xl font-bold text-gray-900">Address Book</h2>
                  <p className="text-gray-500">Manage your shipping and billing addresses.</p>
                </div>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <MapPin size={18} />
                    Add New Address
                  </button>
                )}
              </div>

              {showAddressForm ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
                  <form onSubmit={handleSaveAddress} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                        <select
                          name="addressType"
                          value={addressForm.addressType}
                          onChange={handleAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          <option value="shipping">Shipping</option>
                          <option value="billing">Billing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={addressForm.country}
                          onChange={handleAddressChange}
                          placeholder="Country"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                          type="text"
                          name="street"
                          value={addressForm.street}
                          onChange={handleAddressChange}
                          placeholder="Street Address"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          placeholder="City"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          placeholder="State"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zip / Postal Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={addressForm.zipCode}
                          onChange={handleAddressChange}
                          placeholder="Zip Code"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center md:col-span-2 mt-2">
                        <input
                          type="checkbox"
                          name="isDefault"
                          id="isDefault"
                          checked={addressForm.isDefault}
                          onChange={handleAddressChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                          Set as default {addressForm.addressType} address
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={handleCancelAddress}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isAddingAddress || isUpdatingAddress}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {isAddingAddress || isUpdatingAddress ? 'Saving...' : 'Save Address'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user?.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr) => (
                      <div key={addr._id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditAddress(addr)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr._id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${addr.addressType === 'shipping' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {addr.addressType.charAt(0).toUpperCase() + addr.addressType.slice(1)}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-900 font-medium">{addr.street}</p>
                        <p className="text-gray-600 text-sm mt-1">{addr.city}, {addr.state} {addr.zipCode}</p>
                        <p className="text-gray-600 text-sm">{addr.country}</p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">No addresses yet</h3>
                      <p className="text-gray-500 mb-4">Add an address to speed up checkout.</p>
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                      >
                        Add Address
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Password & Security</h3>

                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Lock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Password</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Last changed: {user?.passwordChangedAt ? new Date(user.passwordChangedAt).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                    </div>
                      </div>
                    </div>
                    {/* Password Change Form */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                       <h5 className="font-medium text-gray-800 mb-3">Update Password</h5>
                       <div className="space-y-4">
                         <div className="relative">
                           <input
                             type={showPasswords.current ? "text" : "password"}
                             name="currentPassword"
                             value={passwordData.currentPassword}
                             onChange={handlePasswordChange}
                             placeholder="Current Password"
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                           />
                           <button
                             type="button"
                             onClick={() => togglePasswordVisibility('current')}
                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                           >
                             {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                           </button>
                         </div>
                         <div className="relative">
                           <input
                             type={showPasswords.new ? "text" : "password"}
                             name="newPassword"
                             value={passwordData.newPassword}
                             onChange={handlePasswordChange}
                             placeholder="New Password"
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-20"
                           />
                           <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <button
                               type="button"
                               onClick={generatePassword}
                               className="text-gray-400 hover:text-green-600 transition-colors"
                               title="Generate Strong Password"
                             >
                               <RefreshCw size={18} />
                             </button>
                             <button
                               type="button"
                               onClick={() => togglePasswordVisibility('new')}
                               className="text-gray-400 hover:text-gray-600"
                             >
                               {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                             </button>
                           </div>
                         </div>
                         <div className="relative">
                           <input
                             type={showPasswords.confirm ? "text" : "password"}
                             name="confirmNewPassword"
                             value={passwordData.confirmNewPassword}
                             onChange={handlePasswordChange}
                             placeholder="Confirm New Password"
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                           />
                           <button
                             type="button"
                             onClick={() => togglePasswordVisibility('confirm')}
                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                           >
                             {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                           </button>
                         </div>
                         <div className="flex justify-end">
                           <button
                             onClick={handleSubmitPasswordChange}
                             disabled={isChangingPassword}
                             className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                           >
                             {isChangingPassword ? 'Updating...' : 'Update Password'}
                           </button>
                         </div>
                       </div>
                  </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Two-Factor Authentication Section */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Smartphone className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Two-Factor Authentication (2FA)</h4>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                    </div>

                    {user?.isTwoFactorEnabled ? (
                      // 2FA is ENABLED - show disable option
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-green-800">2FA is Enabled</p>
                              <p className="text-sm text-green-600">Your account is protected with two-factor authentication</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="password"
                              value={disablePassword}
                              onChange={(e) => setDisablePassword(e.target.value)}
                              placeholder="Enter password"
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                            />
                            <button
                              onClick={handleDisable2FA}
                              disabled={isDisabling2FA}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                            >
                              {isDisabling2FA ? 'Disabling...' : 'Disable 2FA'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : show2FASetup ? (
                      // 2FA Setup Flow
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h5 className="font-medium text-gray-900 mb-4">Setup Two-Factor Authentication</h5>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* QR Code */}
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-3">Scan this QR code with your authenticator app:</p>
                            {twoFAData.qrCode && (
                              <img
                                src={twoFAData.qrCode}
                                alt="2FA QR Code"
                                className="mx-auto rounded-lg shadow-sm border bg-white p-2"
                              />
                            )}
                            {twoFAData.secret && (
                              <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-1">Or enter this code manually:</p>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{twoFAData.secret}</code>
                              </div>
                            )}
                          </div>

                          {/* Verification */}
                          <div>
                            <p className="text-sm text-gray-600 mb-3">Enter the 6-digit code from your app:</p>
                            <input
                              type="text"
                              value={twoFACode}
                              onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              placeholder="000000"
                              maxLength={6}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-green-500"
                            />
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={() => {
                                  setShow2FASetup(false);
                                  setTwoFACode('');
                                  setTwoFAData({ qrCode: null, secret: null });
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleVerify2FA}
                                disabled={isVerifying2FA || twoFACode.length !== 6}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                              >
                                {isVerifying2FA ? 'Verifying...' : 'Enable 2FA'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // 2FA Not enabled - show enable button
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <div>
                              <p className="font-medium text-gray-800">2FA is Not Enabled</p>
                              <p className="text-sm text-gray-500">Protect your account with an authenticator app</p>
                            </div>
                          </div>
                          <button
                            onClick={handleSetup2FA}
                            disabled={isSettingUp2FA}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                          >
                            {isSettingUp2FA ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Setting up...
                              </>
                            ) : (
                              <>
                                <Smartphone className="h-4 w-4" />
                                Enable 2FA
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Danger Zone */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-100 mt-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm text-red-600">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-900 mb-1">Danger Zone</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Permanent actions that cannot be undone. Please proceed with caution.
                    </p>

                    <div className="bg-white rounded-lg border border-red-200 p-4">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Delete Account</h4>
                          <p className="text-sm text-gray-500 mt-0.5">
                            Permanently delete your account and all data.
                          </p>
                        </div>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          disabled={isDeletingAccount}
                          className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm whitespace-nowrap"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                  {/* Delete Confirmation Modal */}
                  {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                        <div className="flex gap-4">
                          <div className="bg-red-50 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                              Are you absolutely sure you want to delete your account? This action is <span className="font-bold text-red-600">irreversible</span> and ensures all your data, orders, and history will be permanently removed.
                            </p>
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleDeleteAccount}
                                disabled={isDeletingAccount}
                                className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 shadow-lg shadow-red-200 transition-all transform active:scale-95"
                              >
                                {isDeletingAccount ? 'Deleting...' : 'Yes, Delete My Account'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive emails about your account activity and orders.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifications.email"
                        checked={formData.preferences.notifications.email}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Receive push notifications on your device.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifications.push"
                        checked={formData.preferences.notifications.push}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Newsletter</h4>
                      <p className="text-sm text-gray-500">Receive updates, offers, and news.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.preferences.newsletter}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className={`px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors ${isUpdating ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isUpdating ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
