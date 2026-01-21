require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');

// Values observed from the failed case (approximate, will update if inspectLatestOrder gives different)
// But I need the REAL values. I will just query the DB inside this script to be sure.
const mongoose = require('mongoose');
const Order = require('../src/models/Order');
const Product = require('../src/models/Product');

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const order = await Order.findOne().sort({ createdAt: -1 });
    const item = order.items.find(i => i.itemType === 'product');
    const product = await Product.findById(item.itemId);
    const productFile = product.downloadFiles.id(item.downloadLinks[0].fileId);

    console.log('--- Debugging File ---');
    console.log('Public ID:', productFile.public_id);
    console.log('URL:', productFile.url);

    // Extract version
    const vMatch = productFile.url.match(/\/v(\d+)\//);
    const version = vMatch ? vMatch[1] : null;
    console.log('Version:', version);

    const pid = productFile.public_id; // e.g. "marketplace/abc.pdf"

    const test = async (name, opts) => {
        try {
            const url = cloudinary.url(pid, opts);
            console.log(`\n[${name}] URL: ${url}`);
            try {
                const res = await axios.get(url);
                console.log(`RESULT: ${res.status} OK`);
            } catch (err) {
                console.log(`RESULT: ${err.response ? err.response.status : err.message}`);
            }
        } catch (e) { console.log('Gen Error:', e.message); }
    };

    // 0. Fetch Resource Details
    try {
       console.log('\nFetching Resource Details from API...');
       const resource = await cloudinary.api.resource(pid, {
           resource_type: 'raw',
           type: 'authenticated'
       });
       console.log('Resource Found:');
       console.log('  Public ID:', resource.public_id);
       console.log('  Type:', resource.type);
       console.log('  Resource Type:', resource.resource_type);
       console.log('  Version:', resource.version);

       // Now use THESE exact values to test
       await test('Based on API Response', {
            resource_type: resource.resource_type,
            type: resource.type,
            sign_url: true,
            secure: true,
            version: resource.version,
            expires_at: Math.floor(Date.now() / 1000) + 3600
       });

    } catch (err) {
        console.log('Resource Fetch Failed:', err.message);
        // Fallback or retry with 'upload' type check
        try {
             const resource2 = await cloudinary.api.resource(pid, { resource_type: 'raw', type: 'upload' });
             console.log('Resource Found as UPLOAD type:', resource2.public_id);
        } catch(e) { console.log('Also not found as upload:', e.message); }
    }

    process.exit();
};

run();
