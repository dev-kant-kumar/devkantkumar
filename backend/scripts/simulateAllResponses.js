const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../src/models/Product');
const Service = require('../src/models/Service');
const Order = require('../src/models/Order');

const simulateAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const orders = await Order.find({});

    orders.forEach(o => {
      const orderObj = o.toObject();
      console.log(`ORDER:${o.orderNumber}|ID:${o._id}|EST:${JSON.stringify(orderObj.estimatedDelivery)}`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

simulateAll();
