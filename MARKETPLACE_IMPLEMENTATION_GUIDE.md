# Marketplace Implementation Guide - Code Templates

Quick-reference templates for missing features. Copy and adapt for your project.

---

## 1. COUPON SYSTEM

### Create Coupon Model (`backend/src/models/Coupon.js`)

```javascript
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  description: {
    type: String,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  // For percentage discount - max amount that can be discounted
  maxDiscount: {
    type: Number,
    default: null
  },
  // Minimum order amount to apply coupon
  minOrderAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  // Usage limits
  maxUses: {
    type: Number,
    default: null  // null = unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  maxUsesPerCustomer: {
    type: Number,
    default: 1
  },
  // Validity period
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  // Product/Service specific
  applicableProductIds: [mongoose.Schema.Types.ObjectId],  // null = all products
  applicableServiceIds: [mongoose.Schema.Types.ObjectId],  // null = all services
  applicableToAll: {
    type: Boolean,
    default: true
  },
  // Usage tracking
  usedByUsers: [{
    userId: mongoose.Schema.Types.ObjectId,
    orderId: mongoose.Schema.Types.ObjectId,
    usedAt: { type: Date, default: Date.now },
    discountApplied: Number
  }],
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for fast lookup
couponSchema.index({ code: 1, validUntil: 1 });
couponSchema.index({ isActive: 1, validUntil: 1 });

// Instance method to validate coupon
couponSchema.methods.isValid = function(userId, orderTotal) {
  const now = new Date();

  // Check if expired
  if (now > this.validUntil || now < this.validFrom) {
    return { valid: false, reason: 'Coupon expired' };
  }

  // Check if inactive
  if (!this.isActive) {
    return { valid: false, reason: 'Coupon is inactive' };
  }

  // Check max uses
  if (this.maxUses && this.usedCount >= this.maxUses) {
    return { valid: false, reason: 'Coupon usage limit exceeded' };
  }

  // Check user usage limit
  const userUsageCount = this.usedByUsers.filter(u => u.userId.toString() === userId).length;
  if (userUsageCount >= this.maxUsesPerCustomer) {
    return { valid: false, reason: 'You have already used this coupon' };
  }

  // Check minimum order amount
  if (orderTotal < this.minOrderAmount) {
    return { valid: false, reason: `Minimum order amount is ₹${this.minOrderAmount}` };
  }

  return { valid: true };
};

// Instance method to calculate discount
couponSchema.methods.calculateDiscount = function(orderTotal) {
  if (this.discountType === 'percentage') {
    const discount = (orderTotal * this.discountValue) / 100;
    const maxDiscount = this.maxDiscount || discount;
    return Math.min(discount, maxDiscount);
  } else if (this.discountType === 'fixed') {
    return Math.min(this.discountValue, orderTotal);
  }
  return 0;
};

module.exports = mongoose.model('Coupon', couponSchema);
```

### Create Coupon Controller (`backend/src/controllers/couponController.js`)

```javascript
const Coupon = require('../models/Coupon');
const logger = require('../utils/logger');

// Validate coupon
const validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal, userId, itemIds } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Coupon not found' });
    }

    // Check validity
    const valid = coupon.isValid(userId, orderTotal);
    if (!valid.valid) {
      return res.status(400).json(valid);
    }

    // If applicable to specific products, check
    if (!coupon.applicableToAll && coupon.applicableProductIds.length > 0) {
      const applicableItems = itemIds.filter(id =>
        coupon.applicableProductIds.some(pid => pid.toString() === id)
      );
      if (applicableItems.length === 0) {
        return res.status(400).json({
          valid: false,
          message: 'This coupon is not applicable to your items'
        });
      }
    }

    // Calculate discount
    const discountAmount = coupon.calculateDiscount(orderTotal);

    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount
      }
    });
  } catch (error) {
    logger.error('Validate coupon error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create coupon (admin only)
const createCoupon = async (req, res) => {
  try {
    const { code, description, discountType, discountValue, ...rest } = req.body;

    const coupon = new Coupon({
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      createdBy: req.user.id,
      ...rest
    });

    await coupon.save();
    res.status(201).json({ message: 'Coupon created', coupon });
  } catch (error) {
    logger.error('Create coupon error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all coupons (admin)
const getCoupons = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10 } = req.query;

    let query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const skip = (page - 1) * limit;
    const coupons = await Coupon.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Coupon.countDocuments(query);

    res.json({
      coupons,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    logger.error('Get coupons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update coupon (admin)
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json({ message: 'Coupon updated', coupon });
  } catch (error) {
    logger.error('Update coupon error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete coupon (admin)
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    await Coupon.findByIdAndDelete(id);
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    logger.error('Delete coupon error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  validateCoupon,
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon
};
```

### Add Routes (`backend/src/routes/marketplaceRoutes.js`)

```javascript
// Add these routes
router.post('/coupons/validate', couponController.validateCoupon); // Public

// Admin routes (add to adminRoutes.js instead)
router.post('/coupons', protect, adminAuth, couponController.createCoupon);
router.get('/coupons', protect, adminAuth, couponController.getCoupons);
router.put('/coupons/:id', protect, adminAuth, couponController.updateCoupon);
router.delete('/coupons/:id', protect, adminAuth, couponController.deleteCoupon);
```

---

## 2. COMPLETE WISHLIST FEATURE

### Update Route (`backend/src/routes/marketplaceRoutes.js`)

```javascript
// Add these routes
router.get('/wishlist', protect, marketplaceController.getWishlist);
router.post('/wishlist/:itemId', protect, marketplaceController.addToWishlist);
router.delete('/wishlist/:itemId', protect, marketplaceController.removeFromWishlist);
router.get('/wishlist/check/:itemId', protect, marketplaceController.checkIfInWishlist);
```

### Add Controller Functions

```javascript
// Add to marketplaceController.js

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites.products')
      .populate('favorites.services');

    if (!user.favorites) {
      return res.json({ products: [], services: [] });
    }

    res.json({
      products: user.favorites.products || [],
      services: user.favorites.services || []
    });
  } catch (error) {
    logger.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { type } = req.body; // 'product' or 'service'

    const user = await User.findById(req.user.id);

    if (!user.favorites) {
      user.favorites = { products: [], services: [] };
    }

    const favoriteArray = type === 'product'
      ? user.favorites.products
      : user.favorites.services;

    // Check if already in wishlist
    if (favoriteArray.includes(itemId)) {
      return res.status(400).json({ message: 'Already in wishlist' });
    }

    favoriteArray.push(itemId);
    await user.save();

    res.json({ message: 'Added to wishlist', item: itemId });
  } catch (error) {
    logger.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { type } = req.body;

    const user = await User.findById(req.user.id);

    if (!user.favorites) {
      return res.status(404).json({ message: 'No wishlist found' });
    }

    const favoriteArray = type === 'product'
      ? user.favorites.products
      : user.favorites.services;

    const index = favoriteArray.indexOf(itemId);
    if (index > -1) {
      favoriteArray.splice(index, 1);
      await user.save();
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    logger.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const checkIfInWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user.favorites) {
      return res.json({ inWishlist: false });
    }

    const inProducts = user.favorites.products.includes(itemId);
    const inServices = user.favorites.services.includes(itemId);

    res.json({ inWishlist: inProducts || inServices });
  } catch (error) {
    logger.error('Check wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
```

### Frontend Wishlist Page

```jsx
// frontend/src/apps/MarketPlace/pages/Wishlist/Wishlist.jsx

import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import PriceDisplay from '../../../../components/common/PriceDisplay';

const Wishlist = () => {
  const API_BASE = import.meta.env.VITE_API_BASE;

  // Fetch wishlist
  const { data: wishlist, isLoading, refetch } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/marketplace/wishlist`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return res.json();
    }
  });

  // Remove from wishlist
  const removeWishlistMutation = useMutation({
    mutationFn: async (itemId) => {
      const res = await fetch(`${API_BASE}/marketplace/wishlist/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ type: 'product' })
      });
      return res.json();
    },
    onSuccess: () => {
      refetch();
      toast.success('Removed from wishlist');
    }
  });

  if (isLoading) return <div>Loading...</div>;

  const allItems = [...(wishlist?.products || []), ...(wishlist?.services || [])];

  if (allItems.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="mx-auto mb-4 text-gray-400" size={48} />
        <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-600">Start adding items to your wishlist!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <PriceDisplay price={item.price} />
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button
                  onClick={() => removeWishlistMutation.mutate(item._id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
```

---

## 3. GUEST CHECKOUT

### Modify Order Creation

```javascript
// In marketplaceController.js - createOrder function

const createOrder = async (req, res) => {
  try {
    const { items, billing, guestEmail } = req.body;
    const userId = req.user?.id; // Can be undefined for guests

    // For guests, use email instead of user ID
    const email = guestEmail || req.user?.email;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // ... rest of order creation logic

    const order = new Order({
      orderNumber: `ORD-${Date.now()}`,
      user: userId, // Can be null for guest orders
      items,
      billing: { ...billing, email },
      payment: { method: 'razorpay', status: 'pending' },
      guestCheckout: !userId // Mark as guest checkout
    });

    await order.save();

    res.status(201).json({ order });
  } catch (error) {
    logger.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
```

### Update Order Model

```javascript
// In Order.js schema

const orderSchema = new mongoose.Schema({
  // ... existing fields

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Can be null for guest orders
  },
  guestCheckout: {
    type: Boolean,
    default: false
  },

  // ... rest of schema
});
```

### Remove Auth from Routes

```javascript
// In marketplaceRoutes.js

// Changed from protected to public
router.post('/orders', marketplaceController.createOrder); // No protect middleware

// Keep protected for authenticated users
router.get('/orders', protect, marketplaceController.getUserOrders);
router.get('/orders/:id', protect, marketplaceController.getOrderById);
```

---

## 4. INVOICE PDF GENERATION

### Create Invoice Service

```javascript
// backend/src/services/invoiceService.js

const PDFDocument = require('pdfkit');
const Order = require('../models/Order');

const generateInvoicePDF = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate('items.itemId');

    if (!order) throw new Error('Order not found');

    const doc = new PDFDocument();

    // Company Header
    doc.fontSize(20).font('Helvetica-Bold').text('INVOICE', { align: 'center' });
    doc.fontSize(10).text('Dev Kant Kumar | Digital Products Marketplace', { align: 'center' });
    doc.text('www.devkantkumar.com | support@devkantkumar.com', { align: 'center' });

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // Invoice Details
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('INVOICE #' + order.orderNumber);
    doc.font('Helvetica').text('Date: ' + new Date(order.createdAt).toLocaleDateString());

    // Billing Info
    doc.fontSize(10).font('Helvetica-Bold').text('Bill To:');
    doc.font('Helvetica')
      .text(order.billing.firstName + ' ' + order.billing.lastName)
      .text(order.billing.email)
      .text(order.billing.phone || '')
      .text(order.billing.address.street)
      .text(order.billing.address.city + ', ' + order.billing.address.state);

    doc.moveDown();

    // Items Table Header
    const tableTop = doc.y;
    const col1 = 50, col2 = 250, col3 = 400, col4 = 500;

    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Item', col1, tableTop);
    doc.text('Quantity', col2, tableTop);
    doc.text('Unit Price', col3, tableTop);
    doc.text('Amount', col4, tableTop);

    // Draw line
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    // Items
    let y = tableTop + 30;
    let subtotal = 0;

    order.items.forEach(item => {
      doc.fontSize(10).font('Helvetica');
      doc.text(item.title.substring(0, 30), col1, y);
      doc.text(item.quantity.toString(), col2, y);
      doc.text('₹' + item.price, col3, y);
      doc.text('₹' + (item.price * item.quantity), col4, y);

      subtotal += item.price * item.quantity;
      y += 25;
    });

    // Totals
    doc.moveTo(50, y).lineTo(550, y).stroke();
    y += 15;

    doc.font('Helvetica-Bold');
    doc.text('Subtotal:', col3, y);
    doc.text('₹' + subtotal, col4, y);

    y += 20;
    doc.text('Discount:', col3, y);
    doc.text('-₹' + (order.payment.amount.discount || 0), col4, y);

    y += 20;
    doc.fontSize(12).text('Total:', col3, y);
    doc.text('₹' + order.payment.amount.total, col4, y);

    // Footer
    doc.fontSize(8).moveTo(50, doc.height - 50).lineTo(550, doc.height - 50).stroke();
    doc.text('Thank you for your purchase! Download links are valid for 30 days.', 50, doc.height - 40, { align: 'center' });

    return doc;
  } catch (error) {
    throw error;
  }
};

module.exports = { generateInvoicePDF };
```

### Add Invoice Route

```javascript
// In marketplaceRoutes.js

router.get('/orders/:orderId/invoice', protect, async (req, res) => {
  try {
    const { generateInvoicePDF } = require('../services/invoiceService');
    const { orderId } = req.params;

    const doc = await generateInvoicePDF(orderId);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${orderId}.pdf"`);

    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Error generating invoice' });
  }
});
```

---

## Quick Checklist

- [ ] Create Coupon model and controller
- [ ] Add coupon validation endpoint
- [ ] Add coupon admin management UI
- [ ] Complete wishlist with frontend pages
- [ ] Add wishlist icons to product cards
- [ ] Modify checkout for guest users
- [ ] Add invoice PDF generation
- [ ] Create invoice download endpoint
- [ ] Add tests for new features

---

*For more features, refer to MARKETPLACE_FEATURES_ANALYSIS.md*
