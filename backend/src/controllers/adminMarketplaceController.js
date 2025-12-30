const Product = require('../models/Product');
const Service = require('../models/Service');
const Order = require('../models/Order');
const User = require('../models/User');
const logger = require('../utils/logger');

// Helper to format Mongoose validation errors
const formatValidationErrors = (error) => {
  if (error.name === 'ValidationError') {
    return Object.values(error.errors).map(val => val.message).join(', ');
  }
  return error.message;
};

// --- PRODUCT MANAGEMENT ---

// @desc    Get all products (Admin)
// @route   GET /api/v1/admin/products
// @access  Admin
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const { category, search, status } = req.query;

    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get all products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single product (Admin)
// @route   GET /api/v1/admin/products/:id
// @access  Admin
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
       return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    logger.error('Get product by id error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/v1/admin/products
// @access  Admin
exports.createProduct = async (req, res) => {
  try {
    const { title, price, category, images } = req.body;

    // Manual validation for critical fields
    if (!title || !price || !category) {
       return res.status(400).json({ message: 'Please provide title, price, and category.' });
    }

    const product = new Product({
      ...req.body,
      createdBy: req.user._id
    });
    await product.save();

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (error) {
    logger.error('Create product error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this title or slug already exists' });
    }
    if (error.name === 'ValidationError') {
       return res.status(400).json({ message: formatValidationErrors(error) });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/v1/admin/products/:id
// @access  Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    logger.error('Update product error:', error);
    if (error.code === 11000) {
       return res.status(400).json({ message: 'Product with this title or slug already exists' });
    }
    if (error.name === 'ValidationError') {
       return res.status(400).json({ message: formatValidationErrors(error) });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/v1/admin/products/:id
// @access  Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    logger.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- SERVICE MANAGEMENT ---

// @desc    Get all customers (Admin)
// @route   GET /api/v1/admin/customers
// @access  Admin
exports.getCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { search, status } = req.query;

    const pipeline = [
      // Match phase for search and status
      {
        $match: {
          role: 'user', // Only fetch customers, not admins
          ...(status === 'active' ? { isActive: true } : {}),
          ...(status === 'inactive' ? { isActive: false } : {}),
          ...(search ? {
            $or: [
              { firstName: { $regex: search, $options: 'i' } },
              { lastName: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } }
            ]
          } : {})
        }
      },
      // Lookup orders to calculate stats
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'user',
          as: 'orders'
        }
      },
      {
        $addFields: {
          ordersCount: { $size: '$orders' },
          totalSpent: {
            $reduce: {
              input: '$orders',
              initialValue: 0,
              in: { $add: ['$$value', { $ifNull: ['$$this.payment.amount.total', 0] }] }
            }
          }
        }
      },
      // Remove orders array to keep response light
      {
        $project: {
          orders: 0,
          password: 0,
          __v: 0
        }
      },
      // Sort by joined date descending
      { $sort: { createdAt: -1 } },
      // Pagination with facets
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          customers: [{ $skip: skip }, { $limit: limit }]
        }
      }
    ];

    const result = await User.aggregate(pipeline);

    const customers = result[0].customers;
    const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;

    res.json({
      success: true,
      customers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    logger.error('Get customers error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single customer by ID (Admin)
// @route   GET /api/v1/admin/customers/:id
// @access  Admin
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select('-password');

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Get customer's orders
    const orders = await Order.find({ user: customer._id }).sort({ createdAt: -1 });

    // Calculate aggregated stats
    const stats = {
      totalSpent: orders.reduce((acc, order) => acc + (order.payment?.amount?.total || 0), 0),
      totalOrders: orders.length,
      averageOrderValue: orders.length > 0
        ? orders.reduce((acc, order) => acc + (order.payment?.amount?.total || 0), 0) / orders.length
        : 0,
      lastOrderDate: orders.length > 0 ? orders[0].createdAt : null
    };

    res.json({
      success: true,
      customer,
      orders,
      stats
    });
  } catch (error) {
    logger.error('Get customer by id error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- SERVICE MANAGEMENT ---

// @desc    Get all services (Admin)
// @route   GET /api/v1/admin/services
// @access  Admin
exports.getAdminServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Search by title
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: 'i' };
    }

    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get all services error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single service by ID (Admin)
// @route   GET /api/v1/admin/services/:id
// @access  Admin
exports.getAdminServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
       return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    logger.error('Get service by id error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new service
// @route   POST /api/v1/admin/services
// @access  Admin
exports.createService = async (req, res) => {
  try {
    const { title, category, packages } = req.body;

    if (!title || !category) {
        return res.status(400).json({ message: 'Please provide title and category.' });
    }

    if (!packages || packages.length === 0) {
        return res.status(400).json({ message: 'Service must have at least one package.' });
    }

    const service = new Service({
      ...req.body,
      createdBy: req.user._id
    });
    await service.save();

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    logger.error('Create service error:', error);
     if (error.code === 11000) {
      return res.status(400).json({ message: 'Service with this title or slug already exists' });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: formatValidationErrors(error) });
     }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a service
// @route   PUT /api/v1/admin/services/:id
// @access  Admin
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({
      success: true,
      data: service,
      message: 'Service updated successfully'
    });
  } catch (error) {
    logger.error('Update service error:', error);
    if (error.code === 11000) {
        return res.status(400).json({ message: 'Service with this title or slug already exists' });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: formatValidationErrors(error) });
     }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a service
// @route   DELETE /api/v1/admin/services/:id
// @access  Admin
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    logger.error('Delete service error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --- ORDER MANAGEMENT ---

// @desc    Get all orders (admin view)
// @route   GET /api/v1/admin/marketplace/orders
// @access  Admin
exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate('user', 'firstName lastName email profile')
      .populate('items.itemId') // Polymorphic population if supported or manual required
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments();

    res.json({
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
    logger.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update order status (admin override)
// @route   PUT /api/v1/admin/marketplace/orders/:id
// @access  Admin
exports.updateAdminOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData['payment.status'] = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      data: order,
      message: 'Order status updated'
    });
  } catch (error) {
    logger.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// @desc    Get marketplace statistics
// @route   GET /api/v1/admin/marketplace/stats
// @access  Admin
exports.getStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue from completed/confirmed orders
    const revenueAggregation = await Order.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$payment.amount.subtotal" }
        }
      }
    ]);

    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    res.json({
      success: true,
      stats: {
        products: totalProducts,
        services: totalServices,
        orders: totalOrders,
        revenue: totalRevenue
      }
    });
  } catch (error) {
    logger.error('Get marketplace stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
