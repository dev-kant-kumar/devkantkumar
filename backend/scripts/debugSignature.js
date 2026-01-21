require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');

console.log('Cloud Name:', cloudinary.config().cloud_name);
console.log('API Key:', cloudinary.config().api_key ? cloudinary.config().api_key.substring(0, 4) + '...' : 'MISSING');
console.log('API Secret:', cloudinary.config().api_secret ? cloudinary.config().api_secret.substring(0, 4) + '...' : 'MISSING');

const publicId = 'marketplace/l5rnwfubkuzkgnbgwmid.pdf';
const version = '1768746014';

const testSignature = async (pid, options) => {
    try {
        const url = cloudinary.url(pid, options);
        console.log(`\nTesting URL for ID [${pid}] with options ${JSON.stringify(options)}:`);
        console.log(url);

        try {
            const res = await axios.get(url);
            console.log('SUCCESS! Status:', res.status);
            console.log('Headers:', res.headers['content-type']);
            return true;
        } catch (err) {
            console.log('FAILED:', err.message, err.response ? err.response.status : '');
            return false;
        }
    } catch (e) {
        console.log('Error generating url:', e.message);
        return false;
    }
}

const run = async () => {

    // Case 1: Raw, Signed, NO attachment flag
    await testSignature(publicId, {
        resource_type: 'raw',
        // type: 'upload',
        sign_url: true,
        secure: true,
        // flags: 'attachment', // REMOVED
        version: version,
        expires_at: Math.floor(Date.now() / 1000) + 3600
    });

    // Case 2: Raw, Signed, WITH attachment flag (Control)
    await testSignature(publicId, {
        resource_type: 'raw',
        sign_url: true,
        secure: true,
        flags: 'attachment',
        version: version,
        expires_at: Math.floor(Date.now() / 1000) + 3600
    });

    console.log('Done.');
};

run();
