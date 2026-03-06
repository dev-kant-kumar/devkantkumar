const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const search = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const orders = await Order.find({ orderNumber: { $in: ['ORD-000006', 'ORD-000007'] } });
    orders.forEach(o => {
        console.log(`${o.orderNumber}|CREATED:${o.createdAt.toISOString()}|EST:${o.estimatedDelivery ? o.estimatedDelivery.toISOString() : 'MISSING'}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

search();
