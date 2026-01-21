require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Order = require('../src/models/Order');
const Product = require('../src/models/Product');

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const order = await Order.findOne().sort({ createdAt: -1 });
    const item = order.items.find(i => i.itemType === 'product');
    const product = await Product.findById(item.itemId);

    console.log('Product:', product.name);
    console.log('Download Files:', product.downloadFiles.length);

    if (product.downloadFiles.length > 0) {
        const file = product.downloadFiles[0];
        console.log('\nFile URL:', file.url);
        console.log('Is Public?', file.url.includes('/upload/') && !file.url.includes('/authenticated/'));

        console.log('\nTesting direct download...');
        try {
            const res = await axios.get(file.url, { responseType: 'arraybuffer' });
            console.log('SUCCESS! Status:', res.status);
            console.log('Content-Type:', res.headers['content-type']);
            console.log('Size:', res.data.length, 'bytes');
        } catch (err) {
            console.log('FAILED:', err.response ? err.response.status : err.message);
        }
    }

    process.exit();
};

run();
