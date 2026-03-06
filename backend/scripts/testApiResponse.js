const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const testApi = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const order = await Order.findOne({ orderNumber: 'ORD-000007' });
    if (!order) {
        console.log('Order not found');
        process.exit(0);
    }

    const orderObj = order.toObject();
    // Simulate the map logic in the controller
    orderObj.items = orderObj.items.map((item) => {
      return item;
    });

    console.log('API Response for estimatedDelivery:');
    console.log(orderObj.estimatedDelivery);
    console.log('Type of estimatedDelivery:');
    console.log(typeof orderObj.estimatedDelivery);
    console.log('JSON representation:');
    console.log(JSON.stringify(orderObj.estimatedDelivery));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

testApi();
