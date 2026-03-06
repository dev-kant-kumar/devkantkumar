const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const inspect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const order = await Order.findOne({ orderNumber: 'ORD-000008' });
    if (order) {
        console.log(`Order ${order.orderNumber}:`);
        order.items.forEach(i => console.log(`- ${i.title} (${i.itemType})`));
    } else {
        console.log("Order not found");
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

inspect();
