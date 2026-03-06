const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../src/models/Product');
const Service = require('../src/models/Service');
const Order = require('../src/models/Order');

const testController = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Exact logic from getOrderById
    const order = await Order.findOne({
      orderNumber: 'ORD-000007',
    })
      .populate({
        path: "items.itemId",
        select:
          "title price images description downloadFiles demoUrl sourceCodeUrl documentationUrl version packages", // Select necessary fields for Products/Services
      });

    if (!order) {
      console.log("Order not found");
      process.exit(0);
    }

    const orderObj = order.toObject();

    console.log('Keys in orderObj:');
    console.log(Object.keys(orderObj));
    console.log('Value of estimatedDelivery:');
    console.log(orderObj.estimatedDelivery);
    console.log('JSON value:');
    console.log(JSON.stringify(orderObj.estimatedDelivery));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

testController();
