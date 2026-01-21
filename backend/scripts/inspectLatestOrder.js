const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('../src/models/Order');
const Product = require('../src/models/Product');

const inspect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get latest order
    const order = await Order.findOne().sort({ createdAt: -1 });
    if (!order) {
        console.log('No orders found.');
        process.exit(0);
    }

    console.log(`Latest Order ID: ${order._id}`);
    const item = order.items.find(i => i.itemType === 'product');

    if (!item) {
        console.log('No product item in latest order');
        process.exit(0);
    }

    console.log('Order Item Download Links:');
    item.downloadLinks.forEach(link => {
        console.log(`- Token: ${link.token}`);
        console.log(`  Name: ${link.name}`);
        console.log(`  File URL: ${link.fileUrl}`);
        console.log(`  File ID: ${link.fileId}`);
    });

    // Check Product
    const product = await Product.findById(item.itemId);
    if (!product) {
        console.log('Product not found for item');
    } else {
        console.log('\nCorresponding Product Files:');
        product.downloadFiles.forEach(f => {
             console.log(`- ID: ${f._id}`);
             console.log(`  Public ID: ${f.public_id}`);
             console.log(`  URL: ${f.url}`);
        });

        // Check matching
        const link = item.downloadLinks[0];
        const productFile = product.downloadFiles.id(link.fileId);
        if (productFile) {
            console.log('\nMATCH FOUND: Order link matches Product file.');
        } else {
            console.log('\nMISMATCH: Order link fileID not found in Product (re-upload likely changed IDs).');
        }
    }

    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

inspect();
