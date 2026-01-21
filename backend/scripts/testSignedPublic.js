require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');

// The public_id from the new upload
const publicId = 'marketplace/n3ny0eqzqu9loyiwttlx.pdf';

const run = async () => {
    console.log('Testing signed URL for public (upload type) file...');

    // Generate signed URL
    const signedUrl = cloudinary.url(publicId, {
        resource_type: 'raw',
        sign_url: true,
        secure: true
    });

    console.log('Signed URL:', signedUrl);

    console.log('\nFetching...');
    try {
        const res = await axios.get(signedUrl, { responseType: 'arraybuffer' });
        console.log('SUCCESS! Status:', res.status);
        console.log('Content-Type:', res.headers['content-type']);
        console.log('Size:', res.data.length, 'bytes');
    } catch (err) {
        console.log('FAILED:', err.response ? err.response.status : err.message);
    }
};

run();
