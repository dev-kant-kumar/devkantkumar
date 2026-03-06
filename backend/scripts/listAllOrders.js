const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const listAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const orders = await Order.find({});
    console.log(`Total orders found: ${orders.length}`);

    orders.forEach(o => {
        const serviceItem = o.items.find(i => i.itemType === 'service');
        console.log(`Order: ${o.orderNumber}, ID: ${o._id}, User: ${o.user}, Status: ${o.status}, Est. Delivery: ${o.estimatedDelivery}, Service: ${serviceItem?.title || 'None'}`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listAll();
