require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');

const pid = 'marketplace/orqn1dohpg7rg3l1azhb.pdf';

const run = async () => {
    try {
        console.log(`Checking resource: ${pid}`);
        // Try raw first
        try {
            const res = await cloudinary.api.resource(pid, { resource_type: 'raw', type: 'authenticated' });
            console.log('FOUND as RAW/AUTHENTICATED:', JSON.stringify(res, null, 2));
            return;
        } catch (e) { console.log('Not raw/authenticated:', e.message); }

        try {
            const res = await cloudinary.api.resource(pid, { resource_type: 'raw', type: 'upload' });
            console.log('FOUND as RAW/UPLOAD:', JSON.stringify(res, null, 2));
            return;
        } catch (e) { console.log('Not raw/upload:', e.message); }

        try {
            const res = await cloudinary.api.resource(pid, { resource_type: 'image', type: 'upload' });
            console.log('FOUND as IMAGE/UPLOAD:', JSON.stringify(res, null, 2));
             return;
        } catch (e) { console.log('Not image/upload:', e.message); }

        console.log('Resource not found in common combinations.');

    } catch (err) {
        console.error(err);
    }
};

run();
