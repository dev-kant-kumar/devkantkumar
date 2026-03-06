const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const list = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const orders = await Order.find({ user: '68dbe6dfec7595108454919b' });
    console.log(`Found ${orders.length} orders for user.`);

    orders.forEach(o => {
        console.log(`Order: ${o.orderNumber}, Status: ${o.status}, Est. Delivery: ${o.estimatedDelivery}`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

list();
