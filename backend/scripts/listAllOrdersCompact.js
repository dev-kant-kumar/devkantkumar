const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const listAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const orders = await Order.find({}).sort({ createdAt: -1 });
    console.log(`TOTAL:${orders.length}`);
    orders.forEach(o => {
        const si = o.items.find(i => i.itemType === 'service');
        console.log(`${o.orderNumber}|${o.user}|${o.status}|${o.estimatedDelivery ? o.estimatedDelivery.toISOString() : 'MISSING'}|${si?.title || 'None'}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listAll();
