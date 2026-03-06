const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const inspect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const order = await Order.findOne({ orderNumber: 'ORD-000007' });
    if (order) {
        console.log(`Order: ${order.orderNumber}`);
        console.log(`EST: ${order.estimatedDelivery}`);
        console.log(`ACT: ${order.actualDelivery}`);
        console.log(`JSON_EST: ${JSON.stringify(order.estimatedDelivery)}`);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

inspect();
