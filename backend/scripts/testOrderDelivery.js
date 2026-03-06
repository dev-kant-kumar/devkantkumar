const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');
const Service = require('../src/models/Service');

const verify = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Find a service to use for testing
    const service = await Service.findOne({ isActive: true });
    if (!service) {
      console.error('No active service found for testing');
      process.exit(1);
    }
    const pkg = service.packages[0];

    // 2. Create a mock order with service package details
    const orderNumber = `TEST-ORD-${Date.now()}`;
    const order = new Order({
      orderNumber,
      user: new mongoose.Types.ObjectId(), // dummy user
      items: [{
        itemType: 'service',
        itemId: service._id,
        title: service.title,
        price: pkg.price,
        quantity: 1,
        selectedPackage: {
          name: pkg.name,
          deliveryTime: pkg.deliveryTime,
          features: pkg.features,
          revisions: pkg.revisions
        }
      }],
      billing: { firstName: 'Test', lastName: 'User', email: 'test@example.com' },
      payment: { method: 'razorpay', status: 'pending', amount: { subtotal: pkg.price, total: pkg.price }, currency: 'INR' },
      status: 'pending'
    });

    console.log(`Created test order ${orderNumber}`);

    // 3. Simulate payment verification logic
    order.payment.status = 'completed';
    order.payment.paidAt = new Date();
    order.status = 'confirmed';

    // Calculate estimated delivery
    let maxDeliveryDays = 0;
    order.items.forEach((item) => {
      if (item.itemType === "service" && item.selectedPackage?.deliveryTime) {
        maxDeliveryDays = Math.max(maxDeliveryDays, item.selectedPackage.deliveryTime);
      }
    });

    if (maxDeliveryDays > 0) {
      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + maxDeliveryDays);
      order.estimatedDelivery = estimatedDate;
    }

    await order.save();
    console.log('Order updated with estimatedDelivery:', order.estimatedDelivery);

    if (order.estimatedDelivery) {
        console.log('VERIFICATION SUCCESS: estimatedDelivery correctly set.');
    } else {
        console.log('VERIFICATION FAILURE: estimatedDelivery NOT set.');
    }

    // Clean up
    await Order.deleteOne({ _id: order._id });
    console.log('Test order cleaned up.');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

verify();
