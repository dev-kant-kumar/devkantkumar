const express = require('express');
const referralController = require('../controllers/referralController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// ---- Public ----
router.get('/program', referralController.getProgramInfo);

// ---- Protected (authenticated users) ----
router.use(protect);
router.get('/me', referralController.getMyReferral);
router.get('/conversions', referralController.getConversions);
router.get('/payouts', referralController.getPayouts);
router.post('/payout', referralController.requestPayout);

// ---- Admin ----
router.get('/admin/all', authorize('admin'), referralController.adminGetAll);
router.get('/admin/payouts/pending', authorize('admin'), referralController.adminGetPendingPayouts);
router.patch('/admin/payouts/:referralId/:payoutId', authorize('admin'), referralController.adminProcessPayout);

module.exports = router;
