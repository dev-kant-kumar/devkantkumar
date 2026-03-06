const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');
const Service = require('../src/models/Service');

const fix = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const order = await Order.findOne({ orderNumber: 'ORD-000007' });
    if (!order) {
        console.log('Order ORD-000007 not found.');
        process.exit(0);
    }

    const item = order.items.find(i => i.itemType === 'service' && i.title === 'Static Website Development');
    if (!item) {
        console.log('Service item not found in order.');
        process.exit(0);
    }

    // Try to find the service to get delivery time
    const service = await Service.findById(item.itemId);
    if (!service) {
        console.log('Original service not found.');
        // Fallback: use a default if we can't find it
        if (!order.estimatedDelivery) {
            const date = new Date(order.createdAt);
            date.setDate(date.getDate() + 7); // Assume 7 days if unknown
            order.estimatedDelivery = date;
            await order.save();
            console.log('Fallback: Set estimated delivery to 7 days from creation.');
        }
        process.exit(0);
    }

    // If we found the service, use the standard package delivery time if name is missing
    const pkgName = item.selectedPackage?.name || 'standard';
    const pkg = service.packages.find(p => p.name === pkgName) || service.packages[0];

    if (pkg) {
        console.log(`Found package: ${pkg.name} with delivery time: ${pkg.deliveryTime}`);
        item.selectedPackage = {
            name: pkg.name,
            deliveryTime: pkg.deliveryTime,
            features: pkg.features,
            revisions: pkg.revisions
        };

        if (!order.estimatedDelivery) {
            const date = new Date(order.createdAt);
            date.setDate(date.getDate() + pkg.deliveryTime);
            order.estimatedDelivery = date;
            console.log(`Setting estimated delivery based on package: ${order.estimatedDelivery}`);
        }

        await order.save();
        console.log('Order ORD-000007 updated successfully.');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fix();
