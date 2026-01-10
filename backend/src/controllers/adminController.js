const User = require('../models/User');
const Order = require('../models/Order');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const Visit = require('../models/Visit');
const { getGAOverview } = require('../services/googleAnalytics');
const { getSearchConsoleOverview } = require('../services/searchConsole');
const logger = require('../utils/logger');
const cloudinary = require('../services/cloudinaryService');
const emailService = require('../services/emailService');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// @desc    Get admin dashboard data
// @route   GET /api/v1/admin/dashboard
// @access  Admin
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments({ status: { $in: ['confirmed', 'completed'] } });

    const revenueAggregation = await Order.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: "$payment.amount.total" } } }
    ]);
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'firstName lastName email');

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const projectCount = await Project.countDocuments();
    const blogCount = await BlogPost.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalRevenue,
        projectCount,
        blogCount,
        recentOrders: recentOrders.map(order => ({
          id: order._id,
          user: `${order.billing?.firstName || 'User'} ${order.billing?.lastName || ''}`,
          amount: order.payment.amount.total,
          status: order.status,
          date: order.createdAt
        })),
        recentUsers: recentUsers.map(user => ({
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          joinDate: user.createdAt
        }))
      }
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
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // User Growth
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          users: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Order Stats
    const orderStats = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Revenue Stats
    const revenueStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          revenue: { $sum: "$payment.amount.subtotal" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Visit Stats (Last 30 Days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const visitStats = await Visit.aggregate([
      { $match: { timestamp: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          views: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Google Analytics and Search Console Overview
    let googleAnalytics = null;
    try {
      const [ga, gsc] = await Promise.all([
        getGAOverview().catch(err => {
          logger.error('GA Fetch Error:', err.message);
          return null;
        }),
        getSearchConsoleOverview().catch(err => {
          logger.error('GSC Fetch Error:', err.message);
          return null;
        })
      ]);
      googleAnalytics = { ga, gsc };
    } catch (err) {
      logger.error('Error fetching Google analytics in getAnalytics:', err);
    }

    res.status(200).json({
      success: true,
      data: {
        userGrowth: userGrowth.map(item => ({ month: item._id, users: item.users })),
        orderStats: orderStats.map(item => ({ month: item._id, orders: item.orders })),
        revenueStats: revenueStats.map(item => ({ month: item._id, revenue: item.revenue })),
        visitStats: visitStats.map(item => ({ date: item._id, views: item.views })),
        googleAnalytics
      }
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
    if (settingsData.announcement) {
        settings.announcement = { ...settings.announcement, ...settingsData.announcement };
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
    const { firstName, lastName, email, title, bio } = req.body;

    // Build update object
    const updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;

    // Check email uniqueness if changing
    if (email) {
      if (email !== req.user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({
            success: false,
            message: 'Email already in use'
          });
        }
        updateFields.email = email;
      }
    }

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
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Check old password
    const isMatch = await user.comparePassword(currentPassword);
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

// @desc    Initiate email change (Step 1: Send OTP to current email OR Step 3: Send OTP to new email)
// @route   POST /api/v1/admin/email-update/initiate
// @access  Admin
const initiateEmailChange = async (req, res) => {
  try {
    const { type, newEmail } = req.body; // type: 'current' or 'new'
    const user = await User.findById(req.user.id);

    if (type === 'new') {
      if (!newEmail) {
        return res.status(400).json({ success: false, message: 'New email is required' });
      }

      // Check if new email is taken
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }

      user.tempNewEmail = newEmail;
    }

    // Generate 6 digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    user.emailChangeOTP = otpHash;
    user.emailChangeOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    // Send correct OTP to correct email
    const emailToSend = type === 'new' ? newEmail : user.email;
    await emailService.sendEmailChangeOTP(emailToSend, otp, type);

    res.status(200).json({
      success: true,
      message: `OTP sent to ${type === 'new' ? 'new' : 'current'} email address`
    });

  } catch (error) {
    logger.error('Initiate email change error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Verify OTP and Finalize Email Change
// @route   POST /api/v1/admin/email-update/verify
// @access  Admin
const verifyEmailChangeOTP = async (req, res) => {
  try {
    const { otp, type } = req.body;
    const user = await User.findById(req.user.id);

    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    if (!user.emailChangeOTP || !user.emailChangeOTPExpires || user.emailChangeOTPExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP is invalid or has expired' });
    }

    if (user.emailChangeOTP !== otpHash) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (type === 'current') {
      // Step 2 Completed: Current email verified.
      // Clear OTP but keep state ready for next step (frontend will now ask for new email)
      user.emailChangeOTP = undefined;
      user.emailChangeOTPExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(200).json({
        success: true,
        message: 'Current email verified. Please enter new email.'
      });
    } else if (type === 'new') {
      // Step 4 Completed: New email verified. Update actual email.
      if (!user.tempNewEmail) {
        return res.status(400).json({ success: false, message: 'No new email pending verification' });
      }

      user.email = user.tempNewEmail;
      user.tempNewEmail = undefined;
      user.emailChangeOTP = undefined;
      user.emailChangeOTPExpires = undefined;

      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Email address updated successfully'
      });
    }

  } catch (error) {
    logger.error('Verify email change error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Initiate password change (Verify current & stash new password)
// @route   POST /api/v1/admin/password-change/initiate
// @access  Admin
const initiatePasswordChange = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select('+password');

        // 1. Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid current password' });
        }

        // 2. Hash new password and stash it
        const salt = await bcrypt.genSalt(10);
        const duplicateCheck = await bcrypt.compare(newPassword, user.password);
        if (duplicateCheck) {
             return res.status(400).json({ success: false, message: 'New password cannot be the same as current password' });
        }

        user.tempNewPassword = await bcrypt.hash(newPassword, salt);

        // 3. Generate and send OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

        user.passwordChangeOTP = otpHash;
        user.passwordChangeOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save({ validateBeforeSave: false });

        await emailService.sendPasswordChangeOTP(user.email, otp);

        res.status(200).json({
            success: true,
            message: 'OTP sent to your email address'
        });

    } catch (error) {
        logger.error('Initiate password change error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Verify OTP and Finalize Password Change
// @route   POST /api/v1/admin/password-change/verify
// @access  Admin
const verifyPasswordChangeOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findById(req.user.id).select('+tempNewPassword');

        const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

        if (!user.passwordChangeOTP || !user.passwordChangeOTPExpires || user.passwordChangeOTPExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP is invalid or has expired' });
        }

        if (user.passwordChangeOTP !== otpHash) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (!user.tempNewPassword) {
             return res.status(400).json({ success: false, message: 'No password change pending' });
        }

        // Commit change
        user.password = user.tempNewPassword;
        user.tempNewPassword = undefined;
        user.passwordChangeOTP = undefined;
        user.passwordChangeOTPExpires = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        logger.error('Verify password change error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
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
  uploadAvatar,
  initiateEmailChange,
  verifyEmailChangeOTP,
  initiatePasswordChange,
  verifyPasswordChangeOTP
};
