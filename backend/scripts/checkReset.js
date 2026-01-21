const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const verifyReset = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Order.countDocuments();
    console.log(`Orders count: ${count}`);
    if (count === 0) {
      console.log('Verification Successful: Orders collection is empty.');
    } else {
      console.log('Verification Failed: Orders still exist.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

verifyReset();
