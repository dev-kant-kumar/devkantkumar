const Referral = require('../models/Referral');
const User = require('../models/User');
const Order = require('../models/Order');
const logger = require('../utils/logger');

// ==========================================
// PUBLIC
// ==========================================

/**
 * @desc  Get referral program info (commission rate, terms, etc.)
 * @route GET /api/v1/referral/program
 * @access Public
 */
exports.getProgramInfo = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        commissionRate: 10,
        minPayoutAmount: 500,
        cookieDurationDays: 30,
        description: 'Earn 10% commission on every successful order placed by users you refer.',
        payoutMethods: ['bank_transfer', 'upi', 'paypal'],
        termsUrl: '/marketplace/terms'
      }
    });
  } catch (error) {
    logger.error('Get program info error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ==========================================
// PROTECTED (user)
// ==========================================

/**
 * @desc  Get (or create) the current user's referral record
 * @route GET /api/v1/referral/me
 * @access Protected
 */
exports.getMyReferral = async (req, res) => {
  try {
    let referral = await Referral.findOne({ referrer: req.user._id })
      .select('code commissionRate totalReferrals totalConversions totalEarned totalPaid pendingBalance availableBalance conversions payoutRequests isActive createdAt')
      .lean();

    if (!referral) {
      const code = await Referral.generateCode(req.user._id);
      const doc = await Referral.create({ referrer: req.user._id, code });
      referral = doc.toObject();
    }

    // Build referral link
    const baseUrl = process.env.CLIENT_URL || 'https://devkantkumar.com';
    const referralLink = `${baseUrl}/marketplace/auth/signup?ref=${referral.code}`;

    res.json({
      success: true,
      data: {
        ...referral,
        referralLink
      }
    });
  } catch (error) {
    logger.error('Get my referral error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc  Get referral history / conversion list
 * @route GET /api/v1/referral/conversions
 * @access Protected
 */
exports.getConversions = async (req, res) => {
  try {
    const referral = await Referral.findOne({ referrer: req.user._id })
      .populate('conversions.referredUser', 'firstName lastName email')
      .populate('conversions.orderId', 'orderNumber payment.total')
      .lean();

    if (!referral) {
      return res.json({ success: true, data: [] });
    }

    res.json({ success: true, data: referral.conversions || [] });
  } catch (error) {
    logger.error('Get conversions error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc  Request a payout
 * @route POST /api/v1/referral/payout
 * @access Protected
 */
exports.requestPayout = async (req, res) => {
  try {
    const { amount, paymentMethod, paymentDetails } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid payout amount' });
    }

    const MIN_PAYOUT = 500;
    if (amount < MIN_PAYOUT) {
      return res.status(400).json({
        success: false,
        message: `Minimum payout amount is ₹${MIN_PAYOUT}`
      });
    }

    const validMethods = ['bank_transfer', 'upi', 'paypal'];
    if (!validMethods.includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: 'Invalid payment method' });
    }

    let referral = await Referral.findOne({ referrer: req.user._id });
    if (!referral) {
      return res.status(404).json({ success: false, message: 'Referral record not found' });
    }

    if (referral.availableBalance < amount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Available: ₹${referral.availableBalance}`
      });
    }

    // Check no pending payout request exists
    const hasPending = referral.payoutRequests.some(p => p.status === 'pending');
    if (hasPending) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending payout request. Please wait for it to be processed.'
      });
    }

    // Deduct from available balance (holds until processed)
    referral.availableBalance -= amount;
    referral.payoutRequests.push({
      amount,
      paymentMethod,
      paymentDetails: paymentDetails || {},
      status: 'pending'
    });

    await referral.save();

    res.json({ success: true, message: 'Payout request submitted successfully' });
  } catch (error) {
    logger.error('Request payout error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc  Get payout history
 * @route GET /api/v1/referral/payouts
 * @access Protected
 */
exports.getPayouts = async (req, res) => {
  try {
    const referral = await Referral.findOne({ referrer: req.user._id }).lean();
    if (!referral) {
      return res.json({ success: true, data: [] });
    }
    res.json({ success: true, data: referral.payoutRequests || [] });
  } catch (error) {
    logger.error('Get payouts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ==========================================
// INTERNAL / SERVICE FUNCTIONS
// ==========================================

/**
 * Called from auth controller when a new user registers with a referral code.
 * Records the sign-up but does NOT award commission yet (commission awarded on first paid order).
 */
exports.trackSignUp = async (referralCode, newUser) => {
  try {
    if (!referralCode) return;

    const referral = await Referral.findOne({ code: referralCode.toUpperCase() });
    if (!referral || !referral.isActive) return;

    // Don't let users refer themselves
    if (referral.referrer.toString() === newUser._id.toString()) return;

    // Check this user hasn't already been tracked
    const alreadyTracked = referral.conversions.some(
      c => c.referredUser.toString() === newUser._id.toString()
    );
    if (alreadyTracked) return;

    referral.conversions.push({
      referredUser: newUser._id,
      referredUserEmail: newUser.email,
      referredUserName: `${newUser.firstName} ${newUser.lastName}`,
      status: 'pending',
      signedUpAt: new Date()
    });
    referral.totalReferrals += 1;
    await referral.save();

    // Save back-reference on user
    await User.findByIdAndUpdate(newUser._id, {
      referredBy: referral.referrer,
      referredByCode: referralCode.toUpperCase()
    });
  } catch (error) {
    logger.error('Track sign-up referral error:', error);
  }
};

/**
 * Called when an order payment is confirmed.
 * Awards commission to the referrer if applicable.
 */
exports.awardCommission = async (order) => {
  try {
    const user = await User.findById(order.user).select('referredBy referredByCode');
    if (!user || !user.referredBy) return;

    const referral = await Referral.findOne({ referrer: user.referredBy });
    if (!referral || !referral.isActive) return;

    // Find the conversion record
    const conversion = referral.conversions.find(
      c => c.referredUser.toString() === order.user.toString()
    );
    if (!conversion) return;

    // Only award commission if not already awarded
    if (conversion.status === 'pending') {
      const orderTotal = order.payment?.total || 0;
      const commissionRate = referral.commissionRate;
      const commissionAmount = Math.round((orderTotal * commissionRate) / 100);

      conversion.status = 'confirmed';
      conversion.orderId = order._id;
      conversion.orderAmount = orderTotal;
      conversion.commissionAmount = commissionAmount;
      conversion.commissionRate = commissionRate;
      conversion.convertedAt = new Date();

      referral.totalConversions += 1;
      referral.totalEarned += commissionAmount;
      referral.pendingBalance += commissionAmount;
      // Commission is made immediately available for withdrawal
      referral.availableBalance += commissionAmount;

      await referral.save();
      logger.info(`Commission of ₹${commissionAmount} awarded to referrer ${referral.referrer} for order ${order._id}`);
    }
  } catch (error) {
    logger.error('Award commission error:', error);
  }
};

// ==========================================
// ADMIN
// ==========================================

/**
 * @desc  Get all referrals (paginated)
 * @route GET /api/v1/referral/admin/all
 * @access Admin
 */
exports.adminGetAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const referrals = await Referral.find()
      .populate('referrer', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Referral.countDocuments();

    // Aggregate stats
    const stats = await Referral.aggregate([
      {
        $group: {
          _id: null,
          totalReferrals: { $sum: '$totalReferrals' },
          totalConversions: { $sum: '$totalConversions' },
          totalEarned: { $sum: '$totalEarned' },
          totalPaid: { $sum: '$totalPaid' },
          totalPending: { $sum: '$pendingBalance' }
        }
      }
    ]);

    res.json({
      success: true,
      data: referrals,
      stats: stats[0] || {},
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    logger.error('Admin get all referrals error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc  Get pending payout requests
 * @route GET /api/v1/referral/admin/payouts/pending
 * @access Admin
 */
exports.adminGetPendingPayouts = async (req, res) => {
  try {
    const referrals = await Referral.find({
      'payoutRequests.status': 'pending'
    })
      .populate('referrer', 'firstName lastName email')
      .lean();

    const pendingPayouts = [];
    referrals.forEach(r => {
      r.payoutRequests
        .filter(p => p.status === 'pending')
        .forEach(p => {
          pendingPayouts.push({
            ...p,
            referralId: r._id,
            referrer: r.referrer
          });
        });
    });

    res.json({ success: true, data: pendingPayouts });
  } catch (error) {
    logger.error('Admin get pending payouts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc  Process a payout request (approve / reject)
 * @route PATCH /api/v1/referral/admin/payouts/:referralId/:payoutId
 * @access Admin
 */
exports.adminProcessPayout = async (req, res) => {
  try {
    const { referralId, payoutId } = req.params;
    const { status, adminNote, transactionId } = req.body;

    if (!['approved', 'rejected', 'paid'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const referral = await Referral.findById(referralId);
    if (!referral) {
      return res.status(404).json({ success: false, message: 'Referral not found' });
    }

    const payout = referral.payoutRequests.id(payoutId);
    if (!payout) {
      return res.status(404).json({ success: false, message: 'Payout request not found' });
    }

    const prevStatus = payout.status;
    payout.status = status;
    payout.processedAt = new Date();
    if (adminNote) payout.adminNote = adminNote;
    if (transactionId) payout.transactionId = transactionId;

    if (status === 'paid') {
      referral.totalPaid += payout.amount;
      referral.pendingBalance = Math.max(0, referral.pendingBalance - payout.amount);
    } else if (status === 'rejected' && prevStatus === 'pending') {
      // Refund the held balance back to available
      referral.availableBalance += payout.amount;
    }

    await referral.save();

    res.json({ success: true, message: `Payout ${status} successfully` });
  } catch (error) {
    logger.error('Admin process payout error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
