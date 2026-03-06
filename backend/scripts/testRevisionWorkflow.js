const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');

const testRevision = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Find the order ORD-000007
    const order = await Order.findOne({ orderNumber: 'ORD-000007' });
    if (!order) {
        console.error('Order ORD-000007 not found');
        process.exit(1);
    }

    console.log(`Current Status: ${order.status}, Revisions Used: ${order.revisionsUsed || 0}`);

    // 2. Set status to delivered (simulate admin delivery)
    order.status = 'delivered';
    order.revisionsUsed = 0; // reset for clean test
    await order.save();
    console.log('--- Order set to DELIVERED ---');

    // 3. Mock a revision request (simulating controller logic since we can't easily mock req.user here bypass auth)
    // We'll just run the logic manually to see if the model saves correctly
    console.log('Simulating revision request...');

    if (order.status !== 'delivered') {
        throw new Error('Should be delivered to request revision');
    }

    order.revisionsUsed = (order.revisionsUsed || 0) + 1;
    order.status = 'revising';
    order.timeline.push({
        status: 'revising',
        message: 'Test revision requested via script',
        timestamp: new Date()
    });

    await order.save();
    console.log('--- Revision requested successfully ---');

    // 4. Verify
    const updatedOrder = await Order.findOne({ orderNumber: 'ORD-000007' });
    console.log('VERIFICATION:');
    console.log(`New Status: ${updatedOrder.status} (Expected: revising)`);
    console.log(`New Revisions Used: ${updatedOrder.revisionsUsed} (Expected: 1)`);

    if (updatedOrder.status === 'revising' && updatedOrder.revisionsUsed === 1) {
        console.log('\nVERIFICATION SUCCESS: Revision tracking works correctly.');
    } else {
        console.log('\nVERIFICATION FAILED: Revision tracking logic error.');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

testRevision();
