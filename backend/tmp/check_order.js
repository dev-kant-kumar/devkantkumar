const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Order = require('../src/models/Order');

async function checkOrder() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const order = await Order.findOne({ orderNumber: 'ORD-000006' });
    if (!order) {
      console.log('Order not found');
      process.exit(1);
    }

    console.log('Order Status:', order.status);
    console.log('Current Phase:', order.currentPhase);
    const serviceItem = order.items.find(item => item.itemType === 'service');
    console.log('Service Item:', JSON.stringify(serviceItem, null, 2));
    console.log('Requirements Data:', JSON.stringify(order.requirementsData, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkOrder();
