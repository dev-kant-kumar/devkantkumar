const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const subscriberController = require('../controllers/subscriberController');
const { protect, authorize } = require('../middlewares/auth');

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail()
  ],
  subscriberController.subscribe
);

router.get('/', protect, authorize('admin'), subscriberController.getSubscribers);
router.put('/unsubscribe', subscriberController.unsubscribe);

module.exports = router;
