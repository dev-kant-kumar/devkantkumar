const Product = require('../models/Product');
const Service = require('../models/Service');
const Order = require('../models/Order');
const User = require('../models/User');
const logger = require('../utils/logger');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

// Get all services
const getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const { category, minPrice, maxPrice, search } = req.query;

    let query = { status: 'active' };

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
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
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    logger.error('Get service by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const { category, minPrice, maxPrice, search } = req.query;

    let query = { status: 'active' };

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
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
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    logger.error('Get product by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get categories
const getCategories = async (req, res) => {
  try {
    const productCategories = await Product.distinct('category');
    const serviceCategories = await Service.distinct('category');

    res.json({
      products: productCategories,
      services: serviceCategories
    });
  } catch (error) {
    logger.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search products and services
const search = async (req, res) => {
  try {
    const { q, type } = req.query;
    const searchQuery = {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ],
      status: 'active'
    };

    let results = {};

    if (!type || type === 'products') {
      results.products = await Product.find(searchQuery).limit(10);
    }

    if (!type || type === 'services') {
      results.services = await Service.find(searchQuery).limit(10);
    }

    res.json(results);
  } catch (error) {
    logger.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cart management (stored in user session/database)
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product cart.service');
    res.json(user.cart || []);
  } catch (error) {
    logger.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { itemId, itemType, quantity = 1 } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.cart) user.cart = [];

    const existingItem = user.cart.find(item =>
      item[itemType].toString() === itemId && item.type === itemType
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem = { type: itemType, quantity };
      cartItem[itemType] = itemId;
      user.cart.push(cartItem);
    }

    await user.save();
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    logger.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
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

    res.json({ message: 'Cart updated' });
  } catch (error) {
    logger.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter(item => item._id.toString() !== itemId);
    await user.save();

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    logger.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { cart: [] });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    logger.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Order management
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Calculate total
    let total = 0;
    for (const item of items) {
      if (item.type === 'product') {
        const product = await Product.findById(item.product);
        total += product.price * item.quantity;
      } else {
        const service = await Service.findById(item.service);
        total += service.price * item.quantity;
      }
    }

    const order = new Order({
      user: req.user.id,
      items,
      total,
      shippingAddress,
      paymentMethod,
      status: 'pending'
    });

    await order.save();

    // Will clear cart after payment confirmation usually, but can do here if desired
    // Keeping existing logic:
    await User.findByIdAndUpdate(req.user.id, { cart: [] });

    res.status(201).json(order);
  } catch (error) {
    logger.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product items.service');

    res.json(orders);
  } catch (error) {
    logger.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('items.product items.service');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    logger.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- RAZORPAY PAYMENT PROCESSING ---

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', items, shippingAddress } = req.body;

    console.log('Initiating Razorpay Order:', {
        amount,
        currency,
        key_id: process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.substring(0, 10) + '...' : 'MISSING'
    });

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    console.log('Razorpay Order Created:', order.id);

    // Create MongoDB Order (Pending)
    const newOrder = new Order({
        user: req.user.id,
        items: items,
        billing: {
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            email: shippingAddress.email,
            phone: shippingAddress.phone,
            address: {
                street: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zipCode: shippingAddress.zipCode,
                country: shippingAddress.country
            }
        },
        payment: {
            method: 'razorpay',
            status: 'pending',
            razorpayOrderId: order.id,
            amount: {
                total: amount,
                subtotal: amount
            },
            currency
        },
        status: 'pending'
    });

    await newOrder.save();
    console.log('MongoDB Order Created:', newOrder._id);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      orderId: newOrder._id
    });
  } catch (error) {
    console.error('FULL RAZORPAY ERROR:', JSON.stringify(error, null, 2));
    logger.error('Create Razorpay order error:', error);
    res.status(500).json({
        message: 'Payment initiation error',
        details: error.error ? error.error.description : error.message
    });
  }
};

const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Payment Verified
      await Order.findByIdAndUpdate(orderId, {
        status: 'confirmed', // Updated to match Schema Enum
        payment: {
          method: 'razorpay',
          status: 'completed',
          transactionId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          razorpaySignature: razorpay_signature,
          paidAt: new Date(),
          currency: 'INR'
        }
      });

      // Also clear cart if not already cleared
      await User.findByIdAndUpdate(req.user.id, { cart: [] });

      res.json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    logger.error('Verify payment error:', error);
    res.status(500).json({ message: 'Payment verification error' });
  }
};

// --- DIGITAL DOWNLOADS ---
const downloadPurchasedItem = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    // 1. Verify Order Ownership & Status
    const order = await Order.findOne({
      _id: orderId,
      user: req.user.id,
      status: 'paid' // CRITICAL: Must be paid
    });

    if (!order) {
      return res.status(403).json({ message: 'Access denied. Order not found or not paid.' });
    }

    // 2. Find Item in Order
    const item = order.items.find(i =>
      (i.product && i.product.toString() === itemId) ||
      (i.itemId && i.itemId.toString() === itemId)
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found in order' });
    }

    // 3. Serve File (Mocking a file path for now - in production use S3 presigned URL)
    // For demo, we'll assume files are in `backend/uploads/products/`
    // You would fetch the actual filename from the Product model using `itemId`

    // MOCK: Sending a dummy file or redirecting
    // In real app: const product = await Product.findById(itemId);
    // const filePath = product.filePath;

    // For now, let's send a JSON as "download" to prove it works securely
    const mockContent = `This is a secure download for Product ID: ${itemId}\n\nThank you for your purchase!\n- DevKant`;
    res.attachment(`product-${itemId}.txt`);
    res.send(mockContent);

  } catch (error) {
    logger.error('Download error:', error);
    res.status(500).json({ message: 'Download failed' });
  }
};

// Reviews
const createReview = async (req, res) => {
  try {
    const { itemId, itemType, rating, comment } = req.body;
    res.json({ message: 'Review created successfully' });
  } catch (error) {
    logger.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getReviews = async (req, res) => {
  try {
    const { itemId } = req.params;
    res.json([]);
  } catch (error) {
    logger.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
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
  createReview,
  getReviews
};
