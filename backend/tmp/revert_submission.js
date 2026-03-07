const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Order = require('../src/models/Order');

async function revertSubmission() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const order = await Order.findOne({ orderNumber: 'ORD-000006' });
    if (!order) {
      console.log('Order not found');
      process.exit(1);
    }

    console.log('Current Status:', order.status);
    console.log('Current Phase:', order.currentPhase);
    console.log('Current Requirements Data:', JSON.stringify(order.requirementsData, null, 2));

    // Reset requirements data
    order.requirementsData.status = 'pending';
    order.requirementsData.submittedAt = undefined;
    order.requirementsData.responses = [];

    // Add timeline entry
    order.timeline.push({
      status: 'reverted',
      message: 'Requirement submission reverted due to mistaken click.',
      timestamp: new Date()
    });

    await order.save();
    console.log('Order updated successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

revertSubmission();
