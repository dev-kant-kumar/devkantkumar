const User = require('../models/User');
const Order = require('../models/Order');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

// Get user profile (public)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password -refreshToken');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    logger.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user dashboard
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user stats
    const totalOrders = await Order.countDocuments({ user: userId });
    const recentOrders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('items.product items.service');

    const dashboardData = {
      user: req.user,
      stats: {
        totalOrders,
        totalSpent: recentOrders.reduce((sum, order) => sum + order.total, 0)
      },
      recentOrders
    };

    res.json(dashboardData);
  } catch (error) {
    logger.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phone, address } = req.body;
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phone, address },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    res.json(user);
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.product items.service');

    const total = await Order.countDocuments({ user: req.user.id });

    res.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user downloads
const getUserDownloads = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
      status: 'completed'
    }).populate('items.product items.service');

    const downloads = [];
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.product && item.product.downloadUrl) {
          downloads.push({
            id: item.product._id,
            name: item.product.name,
            downloadUrl: item.product.downloadUrl,
            purchaseDate: order.createdAt
          });
        }
      });
    });

    res.json(downloads);
  } catch (error) {
    logger.error('Get user downloads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites.products favorites.services');

    res.json(user.favorites || { products: [], services: [] });
  } catch (error) {
    logger.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add to favorites
const addToFavorites = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { type } = req.body; // 'product' or 'service'

    const user = await User.findById(req.user.id);
    if (!user.favorites) {
      user.favorites = { products: [], services: [] };
    }

    const favoriteArray = type === 'product' ? user.favorites.products : user.favorites.services;

    if (!favoriteArray.includes(itemId)) {
      favoriteArray.push(itemId);
      await user.save();
    }

    res.json({ message: 'Added to favorites' });
  } catch (error) {
    logger.error('Add to favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { type } = req.body;

    const user = await User.findById(req.user.id);
    if (!user.favorites) {
      return res.status(404).json({ message: 'No favorites found' });
    }

    const favoriteArray = type === 'product' ? user.favorites.products : user.favorites.services;
    const index = favoriteArray.indexOf(itemId);

    if (index > -1) {
      favoriteArray.splice(index, 1);
      await user.save();
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    logger.error('Remove from favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get all users
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password -refreshToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Update user status
const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    logger.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  getDashboard,
  updateProfile,
  getUserOrders,
  getUserDownloads,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getAllUsers,
  updateUserStatus,
  deleteUser
};
