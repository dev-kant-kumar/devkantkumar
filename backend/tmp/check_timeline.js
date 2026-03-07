const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Order = require('../src/models/Order');

async function checkTimeline() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const order = await Order.findOne({ orderNumber: 'ORD-000006' });
    if (!order) {
      console.log('Order not found');
      process.exit(1);
    }

    console.log('Timeline:', JSON.stringify(order.timeline, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkTimeline();
