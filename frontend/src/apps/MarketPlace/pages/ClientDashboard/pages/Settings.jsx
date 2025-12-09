import { motion } from 'framer-motion';
import { Camera, CheckCircle, ChevronRight, Lock, Mail, Phone, Shield, User } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

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
        {/* Left Sidebar for Settings */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 flex flex-col items-center border-b border-gray-100">
              <div className="relative group cursor-pointer">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl font-bold border-4 border-white shadow-md">
                  J
                </div>
                <div className="absolute bottom-0 right-0 bg-gray-900 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
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
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeSection === 'security' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3" />
                  Login & Security
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
                    <input type="text" defaultValue="John" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option>Select Gender</option>
                      <option selected>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Mail className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">Email Address</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" /> Verified
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">john.doe@example.com</p>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Update</button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">Phone Number</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Unverified
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">Verify</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Update</button>
                    </div>
                  </div>
                </div>
              </div>
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
                        <p className="text-sm text-gray-500 mt-1">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Change Password
                    </button>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Two-Step Verification</h4>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account by requiring a code in addition to your password.</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Enable Two-Step Verification
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
