const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const search = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const userId = '68dbe6dfec7595108454919b';
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    console.log(`Orders for ${userId}: ${orders.length}`);
    orders.forEach(o => {
        const si = o.items.find(i => i.itemType === 'service');
        console.log(`- ${o.orderNumber} | ${o.status} | ${o.estimatedDelivery ? o.estimatedDelivery.toISOString() : 'MISSING'} | ${si?.title || 'None'}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

search();
