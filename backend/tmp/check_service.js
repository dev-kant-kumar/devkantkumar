const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Order = require('../src/models/Order');
const Service = require('../src/models/Service');

async function checkService() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const order = await Order.findOne({ orderNumber: 'ORD-000006' });
    if (!order) {
      console.log('Order not found');
      process.exit(1);
    }

    const serviceItem = order.items.find(i => i.itemType === 'service');
    if (!serviceItem) {
      console.log('No service item in order');
      process.exit(1);
    }

    const service = await Service.findById(serviceItem.itemId);
    console.log('Service Requirements:', JSON.stringify(service?.requirements, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkService();
