const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const search = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const orders = await Order.find({ 'items.title': /Static Website Development/i });
    console.log(`Found ${orders.length} orders matching title.`);
    orders.forEach(o => {
        console.log(`Order: ${o.orderNumber}, ID: ${o._id}, User: ${o.user}, Status: ${o.status}, Est. Delivery: ${o.estimatedDelivery}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

search();
