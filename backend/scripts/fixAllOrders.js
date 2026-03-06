const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');
const Service = require('../src/models/Service');

const fixAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const orders = await Order.find({
        'items.itemType': 'service',
        estimatedDelivery: { $exists: false }
    });

    console.log(`Found ${orders.length} orders to fix.`);

    for (const order of orders) {
        console.log(`Fixing order ${order.orderNumber}...`);
        const item = order.items.find(i => i.itemType === 'service');
        if (!item) continue;

        const service = await Service.findById(item.itemId);
        let deliveryTime = 7; // default

        if (service) {
            const pkgName = item.selectedPackage?.name || 'standard';
            const pkg = service.packages.find(p => p.name === pkgName) || service.packages[0];
            if (pkg) deliveryTime = pkg.deliveryTime;
        }

        const date = new Date(order.createdAt);
        date.setDate(date.getDate() + deliveryTime);
        order.estimatedDelivery = date;

        // Also ensure selectedPackage is populated if missing name
        if (service && (!item.selectedPackage || !item.selectedPackage.name)) {
            const pkg = service.packages[0];
            item.selectedPackage = {
                name: pkg.name,
                deliveryTime: pkg.deliveryTime,
                features: pkg.features,
                revisions: pkg.revisions
            };
        }

        await order.save();
        console.log(`Updated ${order.orderNumber} with estimatedDelivery: ${order.estimatedDelivery}`);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixAll();
