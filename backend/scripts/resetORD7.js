const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const resetOrder = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const order = await Order.findOne({ orderNumber: 'ORD-000007' });
    if (order) {
        order.status = 'in_progress';
        order.revisionsUsed = 0;
        // Optionally remove the test timeline entry
        order.timeline = order.timeline.filter(t => t.message !== 'Test revision requested via script');

        await order.save();
        console.log('ORD-000007 reset to in_progress with 0 revisions.');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetOrder();
