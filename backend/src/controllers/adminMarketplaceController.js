const Product = require("../models/Product");
const Service = require("../models/Service");
const Order = require("../models/Order");
const User = require("../models/User");
const logger = require("../utils/logger");
const { calculateRegionalPricing } = require("../utils/currencyConverter");
const Subscriber = require("../models/Subscriber");
const emailService = require("../services/emailService");
const Notification = require("../models/Notification");

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

    // Notify subscribers (Async)
    (async () => {
      try {
        const subscribers = await Subscriber.find({ isActive: true });
        if (subscribers.length > 0) {
          logger.info(`Sending product notifications to ${subscribers.length} subscribers`);
          // Send in batches or individually (queue handles concurrency)
          for (const sub of subscribers) {
            emailService.sendProductNotificationEmail(sub.email, {
              name: product.title,
              description: product.description,
              price: product.price,
              imageUrl: product.images?.[0]?.url,
              url: `/marketplace/products/${product.slug || product._id}`,
              isService: false
            }).catch(err => logger.error(`Failed to notify ${sub.email}`, err));

            // Increment email count
            sub.emailsSentCount = (sub.emailsSentCount || 0) + 1;
            sub.lastEmailSentAt = new Date();
            await sub.save({ validateBeforeSave: false });
          }
        }
      } catch (err) {
        logger.error("Failed to process subscriber notifications", err);
      }
    })();

    // Notify registered users in-app (Async)
    (async () => {
      try {
        const users = await User.find({ isActive: true, role: 'user' }).select('_id');
        if (users.length > 0) {
          const notifications = users.map(user => ({
            recipient: user._id,
            type: 'product_update',
            title: `New Arrival: ${product.title}`,
            message: `Check out our new ${product.title}! ${product.description.substring(0, 60)}...`,
            link: `/marketplace/products/${product.slug || product._id}`,
            data: { productId: product._id, type: 'product' },
            priority: 'normal'
          }));
          await Notification.insertMany(notifications);
          logger.info(`Created ${notifications.length} in-app notifications for new product`);
        }
      } catch (err) {
        logger.error("Failed to create in-app notifications", err);
      }
    })();
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
    // Check if product has been purchased
    const existingOrders = await Order.exists({ 'items.itemId': req.params.id });
    if (existingOrders) {
      return res.status(400).json({
        message: "Cannot delete this product as it has been purchased by users. Please deactivate it instead to preserve user history."
      });
    }

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

    // Notify subscribers (Async)
    (async () => {
      try {
        const subscribers = await Subscriber.find({ isActive: true });
        if (subscribers.length > 0) {
          logger.info(`Sending service notifications to ${subscribers.length} subscribers`);
          for (const sub of subscribers) {
            emailService.sendProductNotificationEmail(sub.email, {
              name: service.title,
              description: service.description,
              price: service.packages?.[0]?.price || 0,
              imageUrl: service.images?.[0]?.url,
              url: `/marketplace/services/${service.slug || service._id}`,
              isService: true
            }).catch(err => logger.error(`Failed to notify ${sub.email}`, err));

            // Increment email count
            sub.emailsSentCount = (sub.emailsSentCount || 0) + 1;
            sub.lastEmailSentAt = new Date();
            await sub.save({ validateBeforeSave: false });
          }
        }
      } catch (err) {
        logger.error("Failed to process subscriber notifications", err);
      }
    })();

    // Notify registered users in-app (Async)
    (async () => {
      try {
        const users = await User.find({ isActive: true, role: 'user' }).select('_id');
        if (users.length > 0) {
          const notifications = users.map(user => ({
            recipient: user._id,
            type: 'service_update',
            title: `New Service: ${service.title}`,
            message: `Check out our new service ${service.title}! ${service.description.substring(0, 60)}...`,
            link: `/marketplace/services/${service.slug || service._id}`,
            data: { serviceId: service._id, type: 'service' },
            priority: 'normal'
          }));
          await Notification.insertMany(notifications);
          logger.info(`Created ${notifications.length} in-app notifications for new service`);
        }
      } catch (err) {
        logger.error("Failed to create in-app notifications", err);
      }
    })();
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
    // Check if service has been purchased
    const existingOrders = await Order.exists({ 'items.itemId': req.params.id });
    if (existingOrders) {
      return res.status(400).json({
        message: "Cannot delete this service as it has been purchased by users. Please deactivate it instead to preserve user history."
      });
    }

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

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status) order.status = status;
    if (paymentStatus) order.payment.status = paymentStatus;

    // Handle estimatedDelivery if moving to in_progress
    if (status === "in_progress" && !order.estimatedDelivery) {
      let maxDeliveryDays = 0;
      order.items.forEach((item) => {
        if (item.itemType === "service" && item.selectedPackage?.deliveryTime) {
          maxDeliveryDays = Math.max(
            maxDeliveryDays,
            item.selectedPackage.deliveryTime
          );
        }
      });

      if (maxDeliveryDays > 0) {
        const estimatedDate = new Date();
        estimatedDate.setDate(estimatedDate.getDate() + maxDeliveryDays);
        order.estimatedDelivery = estimatedDate;
      }
    }

    // Handle delivery
    if (status === "delivered") {
      order.fulfillment.deliveredAt = new Date();
    }

    await order.save();

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
      .populate("user", "firstName lastName email profile avatar createdAt marketplace")
      .populate(
        "communication.messages.sender",
        "firstName lastName email avatar role"
      )
      .populate({
        path: "items.itemId",
        select:
          "title price images description downloadFiles demoUrl sourceCodeUrl documentationUrl version packages requirements", // Select necessary fields for Products/Services
      });

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

    if ((!message || !message.trim()) && attachments.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Message or attachment is required" });
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
        mimetype: att.mimetype || '',
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

    // Recalculate revision deadline based on actual delivery date
    order.calculateDynamicDeadlines(order.fulfillment.deliveredAt);

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
    // Statuses that represent a successfully paid order.
    // "pending" and "cancelled"/"refunded" are excluded because payment
    // is either not yet captured or has been reversed.
    const PAID_STATUSES = [
      "confirmed",
      "awaiting_requirements",
      "in_progress",
      "revising",
      "delivered",
      "completed",
    ];

    // Robust trend calculator – returns a rounded number (never NaN / Infinity).
    // Returns null when there is no prior-period baseline so the UI can show "N/A".
    const calcTrend = (cur, prev) => {
      const c = Number(cur) || 0;
      const p = Number(prev) || 0;
      if (p === 0 && c === 0) return null; // no data in either window
      if (p === 0) return 100;             // previous period had no data; treat as 100% growth
      const pct = ((c - p) / p) * 100;
      return Math.round(pct * 10) / 10;   // one decimal place, as a number
    };

    const [totalProducts, totalServices, totalOrders] = await Promise.all([
      Product.countDocuments(),
      Service.countDocuments(),
      Order.countDocuments(),
    ]);

    // All-time revenue: sum of total amount on every paid order.
    const revenueAggregation = await Order.aggregate([
      {
        $match: {
          status: { $in: PAID_STATUSES },
          "payment.status": "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $ifNull: ["$payment.amount.total", 0] },
          },
        },
      },
    ]);

    const totalRevenue =
      revenueAggregation.length > 0
        ? revenueAggregation[0].totalRevenue
        : 0;

    // Period windows for trend comparison
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const periodMatch = (from, to) => {
      const match = {
        status: { $in: PAID_STATUSES },
        "payment.status": "completed",
        createdAt: { $gte: from },
      };
      if (to) match.createdAt.$lt = to;
      return match;
    };

    // Current period (last 30 days) and previous period (30–60 days ago)
    const [currentPeriod, previousPeriod] = await Promise.all([
      Order.aggregate([
        { $match: periodMatch(thirtyDaysAgo) },
        {
          $group: {
            _id: null,
            revenue: { $sum: { $ifNull: ["$payment.amount.total", 0] } },
            count: { $sum: 1 },
          },
        },
      ]),
      Order.aggregate([
        { $match: periodMatch(sixtyDaysAgo, thirtyDaysAgo) },
        {
          $group: {
            _id: null,
            revenue: { $sum: { $ifNull: ["$payment.amount.total", 0] } },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const curRev = currentPeriod[0]?.revenue || 0;
    const prevRev = previousPeriod[0]?.revenue || 0;
    const curOrders = currentPeriod[0]?.count || 0;
    const prevOrders = previousPeriod[0]?.count || 0;

    // Revenue timeline: daily breakdown for the last 30 days (paid orders only)
    const [revenueTimeline, statusDistribution] = await Promise.all([
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo },
            status: { $in: PAID_STATUSES },
            "payment.status": "completed",
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            revenue: { $sum: { $ifNull: ["$payment.amount.total", 0] } },
            orders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Order.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
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
          revenue: calcTrend(curRev, prevRev),
          orders: calcTrend(curOrders, prevOrders),
          products: null,
        },
      },
    });
  } catch (error) {
    logger.error("Get marketplace stats error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// @desc    Approve requirements
// @route   POST /api/v1/admin/marketplace/orders/:id/requirements/approve
// @access  Private/Admin
exports.approveRequirements = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.requirementsData || !['submitted', 'resubmitted'].includes(order.requirementsData.status)) {
      return res.status(400).json({
        success: false,
        message: "Requirements are not in a reviewable state",
      });
    }

    order.requirementsData.status = 'approved';
    order.requirementsData.approvedAt = new Date();
    order.requirementsData.adminFeedback = '';

    // Move to next phase
    order.currentPhase = 'legal_documentation';

    // If order was waiting on requirements, move it to in_progress status
    if (['confirmed', 'awaiting_requirements'].includes(order.status)) {
      order.status = 'in_progress';

      // Update pipeline entry
      order.timeline.push({
        status: "requirements_gathering",
        message: "Requirements approved. Phase completed.",
        timestamp: new Date(),
        updatedBy: req.user._id,
      });

      // Also add in_progress status for general order tracking
      order.timeline.push({
        status: "in_progress",
        message: "Project is now in progress.",
        timestamp: new Date(),
        updatedBy: req.user._id,
      });
    } else {
      order.timeline.push({
        status: "requirements_gathering",
        message: "Requirements approved by admin.",
        timestamp: new Date(),
        updatedBy: req.user._id,
      });
    }

    await order.save();

    res.json({
      success: true,
      data: order,
      message: "Requirements approved successfully"
    });
  } catch (error) {
    logger.error("Approve requirements error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Complete a specific Phase
// @route   POST /api/v1/admin/marketplace/orders/:id/phases/:phaseKey/complete
// @access  Admin
exports.completePhase = async (req, res) => {
  try {
    const { id, phaseKey } = req.params;
    const { notes, deliverableUrl, externalLink } = req.body;

    // In a real app we'd save this to `OrderPhase` and `OrderPhaseDeliverable` tables.
    // For this demonstration step we simply mark order's current phase forward and log progress.
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Rough phase progression logic
    const phaseOrder = ['requirements_gathering', 'legal_documentation', 'planning_scoping', 'design', 'development', 'testing_qa', 'delivery', 'revision_window', 'support_window', 'completed'];
    const currentIndex = phaseOrder.indexOf(phaseKey);
    const nextPhase = phaseOrder[currentIndex + 1];

    order.currentPhase = nextPhase;

    // Add timeline entry with deliverable data
    order.timeline.push({
      status: nextPhase === 'completed' ? 'completed' : phaseKey, // Status represents the completed phase
      message: `Phase ${phaseKey.replace('_', ' ')} marked complete by Admin.`,
      timestamp: new Date(),
      updatedBy: req.user._id,
      notes: notes || '',
      deliverableUrl: deliverableUrl || '',
      externalLink: externalLink || '',
    });

    await order.save();

    res.json({
      success: true,
      message: `Phase ${phaseKey} completed successfully. Moved to ${nextPhase}.`,
      data: order,
    });

  } catch (error) {
    logger.error("Complete phase error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark Customer Approval
// @route   POST /api/v1/admin/marketplace/orders/:id/approvals
// @access  Admin
exports.markApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { approval_type, status, notes } = req.body; // e.g., 'design_approval', 'approved'

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Add timeline entry
    order.timeline.push({
      status: status === 'approved' ? 'in_progress' : 'message',
      message: `${approval_type.replace('_', ' ')} marked as ${status} by Admin. ${notes || ''}`,
      timestamp: new Date(),
      updatedBy: req.user._id,
    });

    await order.save();

    res.json({
      success: true,
      message: `Approval recorded successfully.`,
      data: order,
    });

  } catch (error) {
    logger.error("Mark approval error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Request changes to submitted requirements
// @route   POST /api/v1/admin/marketplace/orders/:id/requirements/request-changes
// @access  Private/Admin
exports.requestRequirementsChanges = async (req, res) => {
  try {
    const { feedback } = req.body;

    if (!feedback || !feedback.trim()) {
      return res.status(400).json({
        success: false,
        message: "Feedback is required when requesting changes",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.requirementsData || !['submitted', 'resubmitted'].includes(order.requirementsData.status)) {
      return res.status(400).json({
        success: false,
        message: "Requirements are not in a reviewable state",
      });
    }

    // Update requirements data
    order.requirementsData.status = 'changes_requested';
    order.requirementsData.adminFeedback = feedback.trim();

    // Add to feedback history
    if (!order.requirementsData.feedbackHistory) {
      order.requirementsData.feedbackHistory = [];
    }
    order.requirementsData.feedbackHistory.push({
      feedback: feedback.trim(),
      timestamp: new Date(),
      by: req.user._id,
    });

    // Update order status
    if (order.status !== 'awaiting_requirements') {
      order.status = 'awaiting_requirements';
    }

    // Add timeline entry
    order.timeline.push({
      status: "message",
      message: `Admin requested changes to requirements: "${feedback.trim().substring(0, 100)}${feedback.length > 100 ? '...' : ''}"`,
      timestamp: new Date(),
      updatedBy: req.user._id,
    });

    await order.save();

    // Notify client
    try {
      const { createNotification } = require("../services/notificationService");
      await createNotification({
        user: order.user,
        title: `Changes Requested: ${order.orderNumber}`,
        message: `Admin has requested changes to your project requirements. Please review and resubmit.`,
        type: "order",
        relatedId: order._id,
        priority: "high",
      });
    } catch (notifError) {
      logger.warn("Failed to send changes requested notification:", notifError);
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "Changes requested successfully",
    });
  } catch (error) {
    logger.error(`Request requirements changes error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Error requesting changes",
      error: error.message,
    });
  }
};
