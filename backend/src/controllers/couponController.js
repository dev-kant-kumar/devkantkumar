const Coupon = require("../models/Coupon");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Service = require("../models/Service");
const logger = require("../utils/logger");

/**
 * Validate coupon code and calculate discount
 * Public endpoint - no authentication required
 */
const validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal, userId, itemIds = [] } = req.body;

    // Validate input
    if (!code || !orderTotal) {
      return res.status(400).json({
        valid: false,
        message: "Code and order total are required",
      });
    }

    // Find coupon
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({
        valid: false,
        message: "Coupon code not found",
      });
    }

    // Validate coupon
    const validationResult = coupon.isValid(userId, orderTotal);
    if (!validationResult.valid) {
      return res.status(400).json(validationResult);
    }

    // Check if coupon is applicable to specified items
    if (!coupon.applicableToAll && itemIds.length > 0) {
      const applicableIds = [
        ...coupon.applicableProductIds.map((id) => id.toString()),
        ...coupon.applicableServiceIds.map((id) => id.toString()),
      ];

      const hasApplicableItem = itemIds.some((id) =>
        applicableIds.includes(id.toString()),
      );

      if (!hasApplicableItem) {
        return res.status(400).json({
          valid: false,
          message: "This coupon is not applicable to your selected items",
        });
      }
    }

    // Calculate discount
    const discountAmount = coupon.calculateDiscount(orderTotal);
    const finalTotal = Math.max(0, orderTotal - discountAmount);

    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: Math.round(discountAmount * 100) / 100,
        finalTotal: Math.round(finalTotal * 100) / 100,
      },
    });
  } catch (error) {
    logger.error("Validate coupon error:", error);
    res.status(500).json({ message: "Server error validating coupon" });
  }
};

/**
 * Get all active coupons (public listing)
 */
const getActiveCoupons = async (req, res) => {
  try {
    const now = new Date();

    const coupons = await Coupon.find({
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now },
    }).select("code description discountType discountValue minOrderAmount");

    res.json({ coupons });
  } catch (error) {
    logger.error("Get active coupons error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Create coupon (Admin only)
 */
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      validFrom,
      validUntil,
      ...rest
    } = req.body;

    // Validate required fields
    if (
      !code ||
      !discountType ||
      discountValue === undefined ||
      !validFrom ||
      !validUntil
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: code, discountType, discountValue, validFrom, validUntil",
      });
    }

    // Check if coupon already exists
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    // Validate date range
    if (new Date(validUntil) <= new Date(validFrom)) {
      return res.status(400).json({
        message: "Valid until date must be after valid from date",
      });
    }

    // Validate percentage
    if (
      discountType === "percentage" &&
      (discountValue < 0 || discountValue > 100)
    ) {
      return res.status(400).json({
        message: "Percentage discount must be between 0 and 100",
      });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
      createdBy: req.user.id,
      ...rest,
    });

    await coupon.save();

    logger.info(`Coupon created: ${coupon.code} by user ${req.user.id}`);
    res.status(201).json({
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    logger.error("Create coupon error:", error);
    res.status(500).json({ message: "Error creating coupon" });
  }
};

/**
 * Get all coupons (Admin only)
 */
const getCoupons = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10, search } = req.query;

    let query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    if (search) {
      query.$or = [
        { code: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const coupons = await Coupon.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .populate("createdBy", "email firstName lastName")
      .populate("applicableProductIds", "title")
      .populate("applicableServiceIds", "title");

    const total = await Coupon.countDocuments(query);

    res.json({
      coupons,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    logger.error("Get coupons error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get single coupon details (Admin only)
 */
const getCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id)
      .populate("createdBy", "email firstName lastName")
      .populate("applicableProductIds", "title price")
      .populate("applicableServiceIds", "title")
      .populate("usedByUsers.userId", "email firstName lastName")
      .populate("usedByUsers.orderId", "orderNumber createdAt");

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json(coupon);
  } catch (error) {
    logger.error("Get coupon error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update coupon (Admin only)
 */
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Don't allow updating code
    if (updates.code) {
      return res.status(400).json({ message: "Cannot update coupon code" });
    }

    // Validate date range if updating dates
    if (updates.validFrom && updates.validUntil) {
      if (new Date(updates.validUntil) <= new Date(updates.validFrom)) {
        return res.status(400).json({
          message: "Valid until date must be after valid from date",
        });
      }
    }

    const coupon = await Coupon.findByIdAndUpdate(
      String(id),
      { $set: updates, updatedAt: Date.now() },
      { new: true, runValidators: true },
    );

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    logger.info(`Coupon updated: ${coupon.code} by user ${req.user.id}`);
    res.json({
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    logger.error("Update coupon error:", error);
    res.status(500).json({ message: "Error updating coupon" });
  }
};

/**
 * Delete coupon (Admin only)
 */
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    logger.info(`Coupon deleted: ${coupon.code} by user ${req.user.id}`);
    res.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    logger.error("Delete coupon error:", error);
    res.status(500).json({ message: "Error deleting coupon" });
  }
};

/**
 * Get coupon statistics (Admin only)
 */
const getCouponStats = async (req, res) => {
  try {
    const stats = await Coupon.aggregate([
      {
        $facet: {
          totalCoupons: [{ $count: "count" }],
          activeCoupons: [
            {
              $match: {
                isActive: true,
                validUntil: { $gte: new Date() },
                validFrom: { $lte: new Date() },
              },
            },
            { $count: "count" },
          ],
          expiredCoupons: [
            {
              $match: {
                validUntil: { $lt: new Date() },
              },
            },
            { $count: "count" },
          ],
          totalUsage: [
            {
              $group: {
                _id: null,
                totalUsed: { $sum: "$usedCount" },
                totalRevenueSaved: {
                  $sum: { $sum: "$usedByUsers.discountApplied" },
                },
              },
            },
          ],
        },
      },
    ]);

    res.json(stats[0]);
  } catch (error) {
    logger.error("Get coupon stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  validateCoupon,
  getActiveCoupons,
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponStats,
};
