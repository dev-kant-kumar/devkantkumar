const Product = require("../models/Product");
const Service = require("../models/Service");
const Order = require("../models/Order");
const User = require("../models/User");
const logger = require("../utils/logger");
const { calculateRegionalPricing } = require("../utils/currencyConverter");

// Helper to format Mongoose validation errors
const formatValidationErrors = (error) => {
  if (error.name === "ValidationError") {
    return Object.values(error.errors)
      .map((val) => val.message)
      .join(", ");
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
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
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
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error("Get all products error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single product (Admin)
// @route   GET /api/v1/admin/products/:id
// @access  Admin
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    logger.error("Get product by id error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
      return res
        .status(400)
        .json({ message: "Please provide title, price, and category." });
    }

    // Calculate regional pricing based on the base price (assumed USD) if not provided
    let regionalPricing = req.body.regionalPricing;
    if (!regionalPricing && price) {
      regionalPricing = calculateRegionalPricing(price);
    }

    const product = new Product({
      ...req.body,
      regionalPricing, // Auto-populated
      createdBy: req.user._id,
    });
    await product.save();

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    logger.error("Create product error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Product with this title or slug already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: formatValidationErrors(error) });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/v1/admin/products/:id
// @access  Admin
exports.updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // If price is being updated, recalculate regional pricing if not explicitly provided
    if (updateData.price !== undefined && !updateData.regionalPricing) {
      updateData.regionalPricing = calculateRegionalPricing(updateData.price);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    logger.error("Update product error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Product with this title or slug already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: formatValidationErrors(error) });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/v1/admin/products/:id
// @access  Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    logger.error("Delete product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
          role: "user", // Only fetch customers, not admins
          ...(status === "active" ? { isActive: true } : {}),
          ...(status === "inactive" ? { isActive: false } : {}),
          ...(search
            ? {
                $or: [
                  { firstName: { $regex: search, $options: "i" } },
                  { lastName: { $regex: search, $options: "i" } },
                  { email: { $regex: search, $options: "i" } },
                ],
              }
            : {}),
        },
      },
      // Lookup orders to calculate stats
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "user",
          as: "orders",
        },
      },
      {
        $addFields: {
          ordersCount: { $size: "$orders" },
          totalSpent: {
            $reduce: {
              input: "$orders",
              initialValue: 0,
              in: {
                $add: [
                  "$$value",
                  { $ifNull: ["$$this.payment.amount.total", 0] },
                ],
              },
            },
          },
        },
      },
      // Remove orders array to keep response light
      {
        $project: {
          orders: 0,
          password: 0,
          __v: 0,
        },
      },
      // Sort by joined date descending
      { $sort: { createdAt: -1 } },
      // Pagination with facets
      {
        $facet: {
          metadata: [{ $count: "total" }],
          customers: [{ $skip: skip }, { $limit: limit }],
        },
      },
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
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error("Get customers error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single customer by ID (Admin)
// @route   GET /api/v1/admin/customers/:id
// @access  Admin
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select("-password");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Get customer's orders
    const orders = await Order.find({ user: customer._id }).sort({
      createdAt: -1,
    });

    // Calculate aggregated stats
    const stats = {
      totalSpent: orders.reduce(
        (acc, order) => acc + (order.payment?.amount?.total || 0),
        0
      ),
      totalOrders: orders.length,
      averageOrderValue:
        orders.length > 0
          ? orders.reduce(
              (acc, order) => acc + (order.payment?.amount?.total || 0),
              0
            ) / orders.length
          : 0,
      lastOrderDate: orders.length > 0 ? orders[0].createdAt : null,
    };

    res.json({
      success: true,
      customer,
      orders,
      stats,
    });
  } catch (error) {
    logger.error("Get customer by id error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
      query.title = { $regex: req.query.search, $options: "i" };
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
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error("Get all services error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single service by ID (Admin)
// @route   GET /api/v1/admin/services/:id
// @access  Admin
exports.getAdminServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    logger.error("Get service by id error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new service
// @route   POST /api/v1/admin/services
// @access  Admin
exports.createService = async (req, res) => {
  try {
    const { title, category, packages } = req.body;

    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Please provide title and category." });
    }

    if (!packages || packages.length === 0) {
      return res
        .status(400)
        .json({ message: "Service must have at least one package." });
    }

    // Process packages to add regional pricing if not provided
    const processedPackages = packages.map((pkg) => ({
      ...pkg,
      regionalPricing:
        pkg.regionalPricing && pkg.regionalPricing.length > 0
          ? pkg.regionalPricing
          : calculateRegionalPricing(pkg.price),
    }));

    const service = new Service({
      ...req.body,
      packages: processedPackages,
      createdBy: req.user._id,
    });
    await service.save();

    res.status(201).json({
      success: true,
      data: service,
      message: "Service created successfully",
    });
  } catch (error) {
    logger.error("Create service error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Service with this title or slug already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: formatValidationErrors(error) });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a service
// @route   PUT /api/v1/admin/services/:id
// @access  Admin
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      success: true,
      data: service,
      message: "Service updated successfully",
    });
  } catch (error) {
    logger.error("Update service error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Service with this title or slug already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: formatValidationErrors(error) });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a service
// @route   DELETE /api/v1/admin/services/:id
// @access  Admin
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    logger.error("Delete service error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
    const { status, search } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      // Check if search term looks like an ObjectID
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(search);

      if (isObjectId) {
        query._id = search;
      } else {
        query.$or = [
          { orderNumber: { $regex: search, $options: "i" } },
          // Note: Advanced search on populated fields requires aggregation
          // For now, we support searching by Order Number or ID
        ];
      }
    }

    const orders = await Order.find(query)
      .populate("user", "firstName lastName email profile")
      .populate("items.itemId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error("Get all orders error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
    if (paymentStatus) updateData["payment.status"] = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      data: order,
      message: "Order status updated",
    });
  } catch (error) {
    logger.error("Update order status error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single order detail (Admin)
// @route   GET /api/v1/admin/marketplace/orders/:id
// @access  Admin
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "firstName lastName email profile avatar createdAt")
      .populate(
        "communication.messages.sender",
        "firstName lastName email avatar role"
      );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error("Get order by id error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add milestone to order timeline
// @route   POST /api/v1/admin/marketplace/orders/:id/milestones
// @access  Admin
exports.addMilestone = async (req, res) => {
  try {
    const { status, message } = req.body;

    if (!status || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Status and message are required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Add timeline entry
    order.timeline.push({
      status,
      message,
      timestamp: new Date(),
      updatedBy: req.user._id,
    });

    await order.save();

    logger.info(`Milestone added to order ${req.params.id}: ${status}`);

    res.json({
      success: true,
      message: "Milestone added successfully",
      data: {
        timeline: order.timeline,
      },
    });
  } catch (error) {
    logger.error("Add milestone error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update order milestone
// @route   PUT /api/v1/admin/marketplace/orders/:id/milestones/:milestoneId
// @access  Admin
exports.updateMilestone = async (req, res) => {
  try {
    const { id, milestoneId } = req.params;
    const { status, message } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const milestone = order.timeline.id(milestoneId);
    if (!milestone) {
      return res
        .status(404)
        .json({ success: false, message: "Milestone not found" });
    }

    if (status) milestone.status = status;
    if (message) milestone.message = message;

    await order.save();

    res.json({
      success: true,
      message: "Milestone updated successfully",
      data: { timeline: order.timeline },
    });
  } catch (error) {
    logger.error("Update milestone error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add admin message to order
// @route   POST /api/v1/admin/marketplace/orders/:id/messages
// @access  Admin
exports.addAdminMessage = async (req, res) => {
  try {
    const { message, attachments = [] } = req.body;

    if (!message || !message.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Initialize communication if not exists
    if (!order.communication) {
      order.communication = { messages: [] };
    }

    const newMessage = {
      sender: req.user._id,
      message: message.trim(),
      timestamp: new Date(),
      attachments: attachments.map((att) => ({
        name: att.name,
        url: att.url,
        size: att.size || 0,
      })),
    };

    order.communication.messages.push(newMessage);
    order.communication.lastMessageAt = new Date();

    // Add to timeline
    order.timeline.push({
      status: "message",
      message: "Admin replied to customer",
      timestamp: new Date(),
      updatedBy: req.user._id,
    });

    await order.save();

    logger.info(`Admin message added to order ${req.params.id}`);

    res.json({
      success: true,
      message: "Message sent successfully",
      data: {
        message: newMessage,
        totalMessages: order.communication.messages.length,
      },
    });
  } catch (error) {
    logger.error("Add admin message error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark order as delivered
// @route   POST /api/v1/admin/marketplace/orders/:id/deliver
// @access  Admin
exports.markDelivered = async (req, res) => {
  try {
    const { deliveryNotes, downloadLinks = [] } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Update order status
    order.status = "completed";
    order.actualDelivery = new Date();
    order.fulfillment.status = "delivered";
    order.fulfillment.deliveredAt = new Date();
    order.fulfillment.notes = deliveryNotes || "Order delivered successfully";

    // Add download links to items if provided
    if (downloadLinks.length > 0) {
      for (const link of downloadLinks) {
        const item = order.items.find(
          (i) => i.itemId.toString() === link.itemId
        );
        if (item) {
          item.downloadLinks = item.downloadLinks || [];
          item.downloadLinks.push({
            name: link.name,
            url: link.url,
            expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
          });
        }
      }
    }

    // Add timeline entry
    order.timeline.push({
      status: "delivered",
      message: "Order has been delivered",
      timestamp: new Date(),
      updatedBy: req.user._id,
    });

    await order.save();

    logger.info(`Order ${req.params.id} marked as delivered`);

    res.json({
      success: true,
      message: "Order marked as delivered",
      data: order,
    });
  } catch (error) {
    logger.error("Mark delivered error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
          status: { $in: ["confirmed", "completed"] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$payment.amount.subtotal" },
        },
      },
    ]);

    const totalRevenue =
      revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    // Timeline & Trend Calculation
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Current period revenue/orders
    const currentPeriod = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          status: { $in: ["confirmed", "completed"] },
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$payment.amount.subtotal" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Previous period revenue/orders
    const previousPeriod = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
          status: { $in: ["confirmed", "completed"] },
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$payment.amount.subtotal" },
          count: { $sum: 1 },
        },
      },
    ]);

    const curRev = currentPeriod[0]?.revenue || 0;
    const prevRev = previousPeriod[0]?.revenue || 0;
    const curOrders = currentPeriod[0]?.count || 0;
    const prevOrders = previousPeriod[0]?.count || 0;

    const calcTrend = (cur, prev) => {
      if (prev === 0) return cur > 0 ? 100 : 0;
      return ((cur - prev) / prev) * 100;
    };

    const revenueTimeline = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          status: { $in: ["confirmed", "completed"] },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$payment.amount.subtotal" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const statusDistribution = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      stats: {
        products: totalProducts,
        services: totalServices,
        orders: totalOrders,
        revenue: totalRevenue,
        revenueTimeline,
        statusDistribution,
        trends: {
          revenue: calcTrend(curRev, prevRev).toFixed(1),
          orders: calcTrend(curOrders, prevOrders).toFixed(1),
          products: "0.0", // Content growth trend could be added similarly
        },
      },
    });
  } catch (error) {
    logger.error("Get marketplace stats error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
