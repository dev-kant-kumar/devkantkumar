const Product = require('../models/Product');
const Service = require('../models/Service');
const Order = require('../models/Order');
const User = require('../models/User');
const logger = require('../utils/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

    // Clear user's cart
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

// Payment processing
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        userId: req.user.id
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    logger.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Payment processing error' });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      await Order.findByIdAndUpdate(orderId, {
        status: 'paid',
        paymentId: paymentIntentId
      });

      res.json({ message: 'Payment confirmed' });
    } else {
      res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    logger.error('Confirm payment error:', error);
    res.status(500).json({ message: 'Payment confirmation error' });
  }
};

// Reviews
const createReview = async (req, res) => {
  try {
    const { itemId, itemType, rating, comment } = req.body;

    // Add review logic here (you might want a separate Review model)
    res.json({ message: 'Review created successfully' });
  } catch (error) {
    logger.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getReviews = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Get reviews logic here
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
  createPaymentIntent,
  confirmPayment,
  createReview,
  getReviews
};
