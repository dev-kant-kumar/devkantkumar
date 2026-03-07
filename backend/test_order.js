const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Order = require('./src/models/Order');

async function checkOrder() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');
  const order = await Order.findOne({ orderNumber: 'ORD-000007' }).lean();
  if (order) {
    console.log('Order status:', order.status);
    console.log('Timeline length:', order.timeline.length);
    console.log('RequirementsData:', JSON.stringify(order.requirementsData, null, 2));
    if (order.items && order.items[0]) {
      const Service = require('./src/models/Service');
      const service = await Service.findById(order.items[0].itemId).lean();
      if (service) {
        console.log('Live Service Requirements:', service.requirements);
      } else {
        console.log('Live Service not found');
      }
    }
    console.log('Service items:', order.items.map(i => i.title));
  } else {
    console.log('Order not found');
  }
  process.exit(0);
}

checkOrder();
