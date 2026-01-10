const Product = require("../models/Product");
const Service = require("../models/Service");
const Order = require("../models/Order");
const User = require("../models/User");
const DownloadLog = require("../models/DownloadLog");
const logger = require("../utils/logger");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const downloadService = require("../services/downloadService");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "secret_placeholder",
});

// Get all services
const getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const { category, minPrice, maxPrice, search } = req.query;

    let query = { isActive: true };
    // let query = {};

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments(query);

    res.json({
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error("Get services error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    logger.error("Get service by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const { category, minPrice, maxPrice, search } = req.query;

    let query = { isActive: true };
    // let query = {};

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    logger.error("Get product by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get categories
const getCategories = async (req, res) => {
  try {
    const productCategories = await Product.distinct("category");
    const serviceCategories = await Service.distinct("category");

    res.json({
      products: productCategories,
      services: serviceCategories,
    });
  } catch (error) {
    logger.error("Get categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search products and services
const search = async (req, res) => {
  try {
    const { q, type } = req.query;
    const searchQuery = {
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
      status: "active",
    };

    let results = {};

    if (!type || type === "products") {
      results.products = await Product.find(searchQuery).limit(10);
    }

    if (!type || type === "services") {
      results.services = await Service.find(searchQuery).limit(10);
    }

    res.json(results);
  } catch (error) {
    logger.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cart management (stored in user session/database)
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "cart.product cart.service"
    );
    res.json(user.cart || []);
  } catch (error) {
    logger.error("Get cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { itemId, itemType, quantity = 1 } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.cart) user.cart = [];

    const existingItem = user.cart.find(
      (item) => item[itemType].toString() === itemId && item.type === itemType
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem = { type: itemType, quantity };
      cartItem[itemType] = itemId;
      user.cart.push(cartItem);
    }

    await user.save();
    res.json({ message: "Item added to cart" });
  } catch (error) {
    logger.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const user = await User.findById(req.user.id);

    const cartItem = user.cart.id(itemId);
    if (cartItem) {
      cartItem.quantity = quantity;
      await user.save();
    }

    res.json({ message: "Cart updated" });
  } catch (error) {
    logger.error("Update cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
    await user.save();

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    logger.error("Remove from cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { cart: [] });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    logger.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Order management
const SystemSetting = require("../models/SystemSetting");
const emailService = require("../services/emailService");

// ... existing imports ...

// Order management
const createOrder = async (req, res) => {
  try {
    let { billing, paymentMethod, currency = "INR" } = req.body;
    const countryCode = req.headers["x-country-code"];

    // Fetch system settings for tax rate
    const settings = await SystemSetting.getSettings();
    const taxRate = settings.marketplace.surchargeRate || 0;

    // Fetch user with populated cart
    const user = await User.findById(req.user.id)
      .populate("cart.items.product")
      .populate("cart.items.service");

    if (!user.cart.items || user.cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = [];
    let subtotal = 0;

    // Process cart items
    for (const item of user.cart.items) {
      // ... existing loop code ...
      // item.product or item.service is now populated object
      const productOrService =
        item.type === "service" ? item.service : item.product;

      if (!productOrService) {
        continue; // Skip if reference is missing
      }

      let price = productOrService.price;

      // Check for regional pricing
      if (
        item.type === "service" &&
        item.packageName &&
        productOrService.packages
      ) {
        const pkg = productOrService.packages.find(
          (p) => p.name === item.packageName
        );
        if (pkg) {
          price = pkg.price;
          if (
            pkg.regionalPricing &&
            pkg.regionalPricing.length > 0 &&
            countryCode
          ) {
            const regional = pkg.regionalPricing.find(
              (r) => r.region === countryCode
            );
            if (regional) {
              price = regional.price;
            }
          }
        }
      } else if (
        productOrService.regionalPricing &&
        productOrService.regionalPricing.length > 0 &&
        countryCode
      ) {
        const regional = productOrService.regionalPricing.find(
          (r) => r.region === countryCode
        );
        if (regional) {
          price = regional.price;
        }
      }

      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        itemType: item.type,
        itemId: productOrService._id,
        title: productOrService.title,
        description: productOrService.description, // Optional but good to have
        price: price,
        quantity: item.quantity,
        // Add specific fields if needed
        licenseType: item.type === "product" ? "standard" : undefined,
      });
    }

    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    const order = new Order({
      // ... existing order creation code ...
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user: req.user.id,
      items: orderItems,
      billing: {
        firstName: billing?.firstName || user.firstName,
        lastName: billing?.lastName || user.lastName,
        email: billing?.email || user.email,
        phone: billing?.phone || user.profile?.phone,
        address: billing?.address || {
          street: "N/A",
          city: "N/A",
          state: "N/A",
          zipCode: "N/A",
          country: "US",
        },
      },
      payment: {
        method: paymentMethod || "razorpay",
        status: "pending",
        amount: {
          subtotal,
          tax,
          total,
          currency: currency,
        },
      },
      status: "pending",
    });

    await order.save();

    // Clear cart
    user.cart.items = [];
    user.cart.updatedAt = Date.now();
    await user.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    logger.error("Create order error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.itemId",
        select: "title slug description version demoUrl documentationUrl sourceCodeUrl downloadFiles images packages features technologies"
      });

    res.json(orders);
  } catch (error) {
    logger.error("Get user orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate({
        path: "items.itemId",
        select: "title price images description downloadFiles demoUrl sourceCodeUrl documentationUrl version packages", // Select necessary fields for Products/Services
      })
      .sort("-createdAt");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Sanitize download links in the response (hide real URLs)
    const orderObj = order.toObject();
    orderObj.items = orderObj.items.map(item => {
      if (item.itemType === 'product' && item.downloadLinks) {
        item.downloadLinks = downloadService.sanitizeDownloadLinks(item.downloadLinks);
      }
      return item;
    });

    res.json(orderObj);
  } catch (error) {
    logger.error("Get order by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- RAZORPAY PAYMENT PROCESSING ---

const createRazorpayOrder = async (req, res) => {
  try {
    let { currency = "INR", shippingAddress } = req.body;
    const countryCode = req.headers["x-country-code"];

    // Fetch system settings for tax rate
    const settings = await SystemSetting.getSettings();
    const taxRate = settings.marketplace.surchargeRate || 0;

    // 1. Fetch and Validate Cart
    const user = await User.findById(req.user.id)
      .populate("cart.items.product")
      .populate("cart.items.service");

    if (!user.cart.items || user.cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Calculate Token Amount & Prepare Items
    const orderItems = [];
    let subtotal = 0;

    for (const item of user.cart.items) {
      const productOrService =
        item.type === "service" ? item.service : item.product;
      if (!productOrService) continue;

      let price = productOrService.price;

      // Check for regional pricing
      if (
        item.type === "service" &&
        item.packageName &&
        productOrService.packages
      ) {
        const pkg = productOrService.packages.find(
          (p) => p.name === item.packageName
        );
        if (pkg) {
          price = pkg.price;
          if (
            pkg.regionalPricing &&
            pkg.regionalPricing.length > 0 &&
            countryCode
          ) {
            const regional = pkg.regionalPricing.find(
              (r) => r.region === countryCode
            );
            if (regional) {
              price = regional.price;
            }
          }
        }
      } else if (
        productOrService.regionalPricing &&
        productOrService.regionalPricing.length > 0 &&
        countryCode
      ) {
        const regional = productOrService.regionalPricing.find(
          (r) => r.region === countryCode
        );
        if (regional) {
          price = regional.price;
        }
      }

      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        itemType: item.type,
        itemId: productOrService._id,
        title: productOrService.title,
        description: productOrService.description,
        price: price,
        quantity: item.quantity,
        licenseType: item.type === "product" ? "standard" : undefined,
      });
    }

    const tax = subtotal * (taxRate / 100);
    const totalAmount = subtotal + tax; // Total in standard units (e.g. 50.00)

    // 3. Create Razorpay Order
    const options = {
      amount: Math.round(totalAmount * 100), // Convert to smallest currency unit (paise/cents)
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", razorpayOrder.id);

    // 4. Create MongoDB Order (Pending)
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    console.log("Creating order with orderNumber:", orderNumber);
    const newOrder = new Order({
      orderNumber: orderNumber,
      user: req.user.id,
      items: orderItems,
      billing: {
        firstName: shippingAddress?.firstName || user.firstName,
        lastName: shippingAddress?.lastName || user.lastName,
        email: shippingAddress?.email || user.email,
        phone: shippingAddress?.phone || user.profile?.phone,
        address: shippingAddress?.address
          ? {
              street: shippingAddress.address, // mapping front-end 'address' string to street
              city: shippingAddress.city,
              state: shippingAddress.state,
              zipCode: shippingAddress.zipCode,
              country: shippingAddress.country,
            }
          : undefined,
      },
      payment: {
        method: "razorpay",
        status: "pending",
        razorpayOrderId: razorpayOrder.id,
        amount: {
          total: totalAmount,
          subtotal,
          tax,
          currency,
        },
      },
      status: "pending",
    });

    await newOrder.save();
    console.log("MongoDB Order Created:", newOrder._id);

    res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount, // already in smallest unit
      currency: razorpayOrder.currency,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("FULL RAZORPAY ERROR:", JSON.stringify(error, null, 2));
    logger.error("Create Razorpay order error:", error);
    res.status(500).json({
      message: "Payment initiation error",
      details: error.error ? error.error.description : error.message,
    });
  }
};

const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment Verified - Fetch the order
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Generate SECURE download links for product items
      for (const item of order.items) {
        if (item.itemType === "product") {
          const product = await Product.findById(item.itemId);
          if (product && product.downloadFiles && product.downloadFiles.length > 0) {
            // Use secure download service to generate token-based links
            item.downloadLinks = await downloadService.generateSecureDownloadLinks(
              product,
              order._id,
              req.user.id,
              { expiryHours: 48, maxDownloads: 5 }
            );
            logger.info(`Generated ${item.downloadLinks.length} secure download links for product ${product._id}`);
          }
        }
      }

      // Update order status and payment info
      order.status = "confirmed";
      order.payment.method = "razorpay";
      order.payment.status = "completed";
      order.payment.transactionId = razorpay_payment_id;
      order.payment.razorpayOrderId = razorpay_order_id;
      order.payment.razorpaySignature = razorpay_signature;
      order.payment.paidAt = new Date();

      // Add timeline entry
      order.timeline.push({
        status: "payment_completed",
        message: "Payment verified successfully",
        timestamp: new Date(),
      });

      // For digital products, mark fulfillment as delivered immediately
      const hasOnlyProducts = order.items.every(
        (item) => item.itemType === "product"
      );
      if (hasOnlyProducts) {
        order.fulfillment.status = "delivered";
        order.fulfillment.deliveredAt = new Date();
        order.status = "completed";
        order.timeline.push({
          status: "delivered",
          message: "Digital products delivered - download links available",
          timestamp: new Date(),
        });
      }

      await order.save();

      // Also clear cart if not already cleared
      await User.findByIdAndUpdate(req.user.id, {
        "cart.items": [],
        "cart.updatedAt": Date.now(),
      });

      // Save billing address to user's address book if not already saved
      try {
        const user = await User.findById(req.user.id);
        if (user && order.billing?.address) {
          const billingAddr = order.billing.address;
          // Check if this address already exists
          const addressExists = user.addresses?.some(addr =>
            addr.street === billingAddr.street &&
            addr.city === billingAddr.city &&
            addr.state === billingAddr.state &&
            addr.zipCode === billingAddr.zipCode &&
            addr.country === billingAddr.country
          );

          if (!addressExists && billingAddr.street && billingAddr.city) {
            // Add the address to user's address book
            user.addresses = user.addresses || [];
            user.addresses.push({
              street: billingAddr.street,
              city: billingAddr.city,
              state: billingAddr.state,
              zipCode: billingAddr.zipCode,
              country: billingAddr.country,
              addressType: 'billing',
              isDefault: user.addresses.length === 0 // Set as default if first address
            });
            await user.save();
            logger.info(`Saved billing address for user ${req.user.id}`);
          }
        }
      } catch (addressError) {
        logger.error('Failed to save billing address:', addressError);
        // Don't fail the payment verification if address save fails
      }

      // Send order confirmation email
      try {
        await emailService.sendOrderConfirmationEmail(
          order.billing.email,
          order,
          order.billing.firstName
        );
      } catch (emailError) {
        logger.error('Failed to send order confirmation email:', emailError);
      }

      logger.info(`Payment verified for order ${orderId}`);

      res.json({
        success: true,
        message: "Payment verified successfully",
        orderId: order._id,
        orderNumber: order.orderNumber,
      });
    } else {
      res.status(400).json({ message: "Invalid payment signature" });
    }
  } catch (error) {
    logger.error("Verify payment error:", error);
    res.status(500).json({ message: "Payment verification error" });
  }
};

// --- DIGITAL DOWNLOADS ---
const downloadPurchasedItem = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { token } = req.query; // Expect token in query param

    if (!token) {
      return res.status(400).json({ message: "Download token is required" });
    }

    // Get client IP and User Agent for logging
    const ipAddress = downloadService.getClientIP(req);
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const userId = req.user._id;

    // Validate Token
    const validation = await downloadService.validateDownloadToken(
      token,
      userId,
      ipAddress,
      userAgent
    );

    if (!validation.isValid) {
      return res.status(403).json({ message: validation.error || "Invalid or expired download link" });
    }

    const { link, order, item } = validation;

    // Increment download count
    // Note: This matches the specific sub-document array element
    await Order.updateOne(
      { _id: order._id, "items.downloadLinks.token": token },
      { $inc: { "items.$[i].downloadLinks.$[j].downloadCount": 1 } },
      {
        arrayFilters: [
          { "i._id": item._id },
          { "j.token": token }
        ]
      }
    );

    // Log success
    await downloadService.logDownload({
      user: userId,
      order: order._id,
      product: item.itemId, // The product ID
      token,
      fileName: link.name,
      ipAddress,
      userAgent,
      success: true
    });

    // In a real production environment with protected S3/Cloud storage:
    // const signedUrl = await downloadService.getSignedUrl(link.fileUrl);
    // return res.redirect(signedUrl);

    // For this project (assuming publicly accessible or server-proxied files):
    // If files are on the same server or public URL:
    return res.redirect(link.fileUrl);

    // Improved security later: Proxy the file stream so the user NEVER sees the source URL
    // const response = await axios.get(link.fileUrl, { responseType: 'stream' });
    // res.setHeader('Content-Type', response.headers['content-type']);
    // response.data.pipe(res);

  } catch (error) {
    logger.error("Download item error:", error);
    res.status(500).json({ message: "Server error during download" });
  }
};

// Regenerate download links for an order item
const regenerateDownloadLinks = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: req.user.id,
      status: { $in: ["confirmed", "completed"] },
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const item = order.items.find(
      (i) => i.itemId && i.itemId.toString() === itemId
    );

    if (!item || item.itemType !== "product") {
      return res
        .status(404)
        .json({ success: false, message: "Product item not found" });
    }

    // Fetch product for fresh download links
    const product = await Product.findById(itemId);
    if (!product || !product.downloadFiles || product.downloadFiles.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No files available for this product",
        });
    }

    // Generate new download links with 48 hour expiry
    item.downloadLinks = product.files.map((file) => ({
      name: file.name || "Download",
      url: file.url,
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    }));

    await order.save();

    logger.info(
      `Download links regenerated for order ${orderId}, item ${itemId}`
    );

    res.json({
      success: true,
      message: "Download links regenerated",
      data: {
        downloadLinks: item.downloadLinks,
      },
    });
  } catch (error) {
    logger.error("Regenerate download links error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to regenerate links" });
  }
};

// --- ORDER COMMUNICATION ---

// Add message to order
const addOrderMessage = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { message, attachments = [] } = req.body;
    const userId = req.user.id;

    if (!message || !message.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Verify user owns this order
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Initialize communication if not exists
    if (!order.communication) {
      order.communication = { messages: [] };
    }

    // Add the new message
    const newMessage = {
      sender: userId,
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

    // Also add to timeline
    order.timeline.push({
      status: "message",
      message: "Customer sent a message",
      timestamp: new Date(),
      updatedBy: userId,
    });

    await order.save();

    logger.info(`Message added to order ${orderId} by user ${userId}`);

    res.json({
      success: true,
      message: "Message sent successfully",
      data: {
        message: newMessage,
        totalMessages: order.communication.messages.length,
      },
    });
  } catch (error) {
    logger.error("Add order message error:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

// Get order messages
const getOrderMessages = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findById(orderId)
      .populate(
        "communication.messages.sender",
        "firstName lastName email avatar role"
      )
      .select("communication orderNumber user");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Verify user owns this order
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const messages = order.communication?.messages || [];

    res.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        messages: messages.map((msg) => ({
          id: msg._id,
          sender: msg.sender,
          message: msg.message,
          timestamp: msg.timestamp,
          attachments: msg.attachments || [],
          isOwn: msg.sender?._id?.toString() === userId.toString(),
        })),
        lastMessageAt: order.communication?.lastMessageAt,
      },
    });
  } catch (error) {
    logger.error("Get order messages error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
};

// Reviews
const createReview = async (req, res) => {
  try {
    const { itemId, itemType, rating, comment } = req.body;
    res.json({ message: "Review created successfully" });
  } catch (error) {
    logger.error("Create review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReviews = async (req, res) => {
  try {
    const { itemId } = req.params;
    res.json([]);
  } catch (error) {
    logger.error("Get reviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleRazorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      logger.error("RAZORPAY_WEBHOOK_SECRET is not defined");
      return res.status(500).json({ message: "Configuration error" });
    }

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(req.rawBody);
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      logger.warn("Invalid Razorpay webhook signature");
      return res.status(400).json({ message: "Invalid signature" });
    }

    const event = req.body;
    logger.info(`Razorpay Webhook Event: ${event.event}`);

    if (event.event === "payment.captured" || event.event === "order.paid") {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;

      if (!razorpayOrderId) {
        logger.warn("Webhook received but no razorpayOrderId found");
        return res.status(200).json({ status: "ok" });
      }

      const order = await Order.findOne({
        "payment.razorpayOrderId": razorpayOrderId,
      });

      if (!order) {
        logger.error(
          `Order not found for Razorpay Order ID: ${razorpayOrderId}`
        );
        return res.status(404).json({ message: "Order not found" });
      }

      // Idempotency check
      if (
        order.payment.status === "completed" ||
        order.status === "confirmed"
      ) {
        logger.info(`Order ${order._id} already confirmed. Skipping webhook.`);
        return res.status(200).json({ status: "ok" });
      }

      // Generate download links for product items
      for (const item of order.items) {
        if (item.itemType === "product") {
          const product = await Product.findById(item.itemId);
          if (product && product.downloadFiles && product.downloadFiles.length > 0) {
             // Generate Secure Links
             item.downloadLinks = downloadService.generateSecureDownloadLinks(product, {
              expiryHours: 48,
              maxDownloads: 5
            });
          }
        }
      }

      order.status = "confirmed";
      order.payment.method = "razorpay";
      order.payment.status = "completed";
      order.payment.transactionId = payment.id;
      order.payment.paidAt = new Date();

      order.timeline.push({
        status: "payment_completed",
        message: `Payment verified via Webhook (${event.event})`,
        timestamp: new Date(),
      });

      // Digital delivery logic
      const hasOnlyProducts = order.items.every(
        (item) => item.itemType === "product"
      );
      if (hasOnlyProducts) {
        order.fulfillment.status = "delivered";
        order.fulfillment.deliveredAt = new Date();
        order.status = "completed";
        order.timeline.push({
          status: "delivered",
          message: "Digital products delivered via Webhook",
          timestamp: new Date(),
        });
      }

      await order.save();

      // Clear cart
      await User.findByIdAndUpdate(order.user, {
        "cart.items": [],
        "cart.updatedAt": Date.now(),
      });

      logger.info(`Order ${order._id} confirmed via Webhook`);
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    logger.error("Webhook Error:", error);
    res.status(500).json({ message: "Webhook error" });
  }
};

module.exports = {
  getServices,
  getServiceById,
  getProducts,
  getProductById,
  getCategories,
  search,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  createOrder,
  getUserOrders,
  getOrderById,
  createRazorpayOrder,
  verifyRazorpayPayment,
  downloadPurchasedItem,
  regenerateDownloadLinks,
  addOrderMessage,
  getOrderMessages,
  createReview,
  getReviews,
  handleRazorpayWebhook,
};
