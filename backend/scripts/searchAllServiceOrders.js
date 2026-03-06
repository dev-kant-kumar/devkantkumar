const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const search = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const orders = await Order.find({ 'items.itemType': 'service' });
    console.log(`Found ${orders.length} service orders.`);
    orders.forEach(o => {
        const si = o.items.find(i => i.itemType === 'service');
        console.log(`${o.orderNumber}|${o.status}|${o.estimatedDelivery ? 'SET' : 'MISSING'}|${si.title}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

search();
