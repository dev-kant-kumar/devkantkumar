require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');

const publicId = 'marketplace/l5rnwfubkuzkgnbgwmid.pdf';
const version = '1768746014';

const testSignature = async (type) => {
    try {
        const options = {
            resource_type: 'raw',
            type: type,
            sign_url: true,
            secure: true,
            version: version,
            expires_at: Math.floor(Date.now() / 1000) + 3600
        };
        const url = cloudinary.url(publicId, options);
        console.log(`\nTesting [${type.toUpperCase()}] URL:`);
        console.log(url);

        try {
            const res = await axios.get(url);
            console.log('SUCCESS! Status:', res.status);
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
    await testSignature('upload');
    await testSignature('private');
    await testSignature('authenticated');
    console.log('Done.');
};

run();
