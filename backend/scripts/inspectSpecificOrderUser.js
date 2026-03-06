const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const inspect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const order = await Order.findOne({ orderNumber: 'ORD-000007' });
    if (!order) {
        console.log('Order ORD-000007 not found.');
        process.exit(0);
    }

    console.log(`Order: ${order.orderNumber}, User: ${order.user}, Est. Delivery: ${order.estimatedDelivery}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

inspect();
