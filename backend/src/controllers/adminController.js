const User = require('../models/User');
const Order = require('../models/Order');
const logger = require('../utils/logger');
const cloudinary = require('../services/cloudinaryService');
const fs = require('fs');

// @desc    Get admin dashboard data
// @route   GET /api/v1/admin/dashboard
// @access  Admin
const getDashboard = async (req, res) => {
  try {
    // Mock dashboard data for now
    const dashboardData = {
      totalUsers: 150,
      totalOrders: 75,
      totalRevenue: 25000,
      recentOrders: [
        {
          id: 1,
          user: "John Doe",
          amount: 299,
          status: "completed",
          date: new Date()
        }
      ],
      recentUsers: [
        {
          id: 1,
          name: "Jane Smith",
          email: "jane@example.com",
          joinDate: new Date()
        }
      ]
    };

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    logger.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get analytics data
// @route   GET /api/v1/admin/analytics
// @access  Admin
const getAnalytics = async (req, res) => {
  try {
    // Mock analytics data for now
    const analyticsData = {
      userGrowth: [
        { month: 'Jan', users: 10 },
        { month: 'Feb', users: 25 },
        { month: 'Mar', users: 40 }
      ],
      orderStats: [
        { month: 'Jan', orders: 5 },
        { month: 'Feb', orders: 15 },
        { month: 'Mar', orders: 30 }
      ],
      revenueStats: [
        { month: 'Jan', revenue: 1500 },
        { month: 'Feb', revenue: 4500 },
        { month: 'Mar', revenue: 8500 }
      ]
    };

    res.status(200).json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    logger.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Admin
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user status
// @route   PUT /api/v1/admin/users/:id/status
// @access  Admin
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    logger.info(`User ${user.email} status updated to ${isActive ? 'active' : 'inactive'} by admin ${req.user.email}`);

    res.status(200).json({
      success: true,
      data: user,
      message: 'User status updated successfully'
    });
  } catch (error) {
    logger.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/admin/users/:id
// @access  Admin
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    await User.findByIdAndDelete(id);

    logger.info(`User ${user.email} deleted by admin ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get content
// @route   GET /api/v1/admin/content
// @access  Admin
const getContent = async (req, res) => {
  try {
    // Mock content data for now
    const content = {
      pages: [
        {
          id: 1,
          title: "Home Page",
          type: "page",
          status: "published",
          lastModified: new Date()
        }
      ],
      posts: [
        {
          id: 1,
          title: "Welcome Post",
          type: "post",
          status: "published",
          lastModified: new Date()
        }
      ]
    };

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    logger.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update content
// @route   PUT /api/v1/admin/content/:type/:id
// @access  Admin
const updateContent = async (req, res) => {
  try {
    const { type, id } = req.params;
    const updateData = req.body;

    // Mock response for now
    const content = {
      id: parseInt(id),
      type,
      ...updateData,
      lastModified: new Date()
    };

    res.status(200).json({
      success: true,
      data: content,
      message: 'Content updated successfully'
    });
  } catch (error) {
    logger.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get orders
// @route   GET /api/v1/admin/orders
// @access  Admin
const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Mock orders data for now
    const orders = [
      {
        id: 1,
        user: "John Doe",
        email: "john@example.com",
        amount: 299,
        status: "completed",
        items: ["Web Development Service"],
        createdAt: new Date()
      }
    ];

    const total = orders.length;

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/v1/admin/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Mock response for now
    const order = {
      id: parseInt(id),
      status,
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: order,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    logger.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const SystemSetting = require('../models/SystemSetting');
// ... other imports ...

// @desc    Get system settings
// @route   GET /api/v1/admin/settings
// @access  Admin
const getSettings = async (req, res) => {
  try {
    const settings = await SystemSetting.getSettings();

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    logger.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update system settings
// @route   PUT /api/v1/admin/settings
// @access  Admin
const updateSettings = async (req, res) => {
  try {
    const settingsData = req.body;

    // Get existing settings document
    let settings = await SystemSetting.getSettings();

    // Update fields deep merge or specific fields
    // For Mongoose updates, we can use findOneAndUpdate or assigning fields
    // Assuming settingsData matches schema structure

    if (settingsData.marketplace) {
        settings.marketplace = { ...settings.marketplace, ...settingsData.marketplace };
    }
    if (settingsData.general) {
        settings.general = { ...settings.general, ...settingsData.general };
    }
    if (settingsData.seo) {
        settings.seo = { ...settings.seo, ...settingsData.seo };
    }

    await settings.save();

    res.status(200).json({
      success: true,
      data: settings,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    logger.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get admin profile
// @route   GET /api/v1/admin/profile
// @access  Admin
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update admin profile
// @route   PUT /api/v1/admin/profile
// @access  Admin
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, title, bio } = req.body;

    // Build update object
    const updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;

    // Update nested profile fields
    if (title !== undefined) updateFields['profile.title'] = title;
    if (bio !== undefined) updateFields['profile.bio'] = bio;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    logger.error('Update admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Change admin password
// @route   POST /api/v1/admin/change-password
// @access  Admin
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Check old password
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid current password'
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    logger.error('Change admin password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Upload admin avatar
// @route   POST /api/v1/admin/upload-avatar
// @access  Admin
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      width: 300,
      crop: "scale"
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: {
          public_id: result.public_id,
          url: result.secure_url
        }
      },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user,
      message: 'Avatar uploaded successfully'
    });
  } catch (error) {
    logger.error('Upload admin avatar error:', error);
    // Try to delete file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
       fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getDashboard,
  getAnalytics,
  getUsers,
  updateUserStatus,
  deleteUser,
  getContent,
  updateContent,
  getOrders,
  updateOrderStatus,
  getSettings,
  updateSettings,
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar
};
