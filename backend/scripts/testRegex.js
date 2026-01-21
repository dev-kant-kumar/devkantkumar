require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');

// Test the exact regex I'm using in marketplaceController
const testUrl = 'https://res.cloudinary.com/dmcdecnoz/raw/upload/v1768747787/marketplace/n3ny0eqzqu9loyiwttlx.pdf';

console.log('Testing URL parsing...');
console.log('URL:', testUrl);

// My current regex
const uploadMatch = testUrl.match(/\/(?:upload|authenticated)\/(?:v\d+\/)?(.+)$/);
if (uploadMatch) {
    console.log('Extracted public_id:', uploadMatch[1]);

    // Generate signed URL with this
    const signedUrl = cloudinary.url(uploadMatch[1], {
        resource_type: 'raw',
        sign_url: true,
        secure: true
    });
    console.log('Signed URL:', signedUrl);

    // Test it
    axios.get(signedUrl, { responseType: 'arraybuffer' })
        .then(res => console.log('SUCCESS:', res.status, 'Size:', res.data.length))
        .catch(err => console.log('FAILED:', err.response ? err.response.status : err.message));
} else {
    console.log('Regex did not match!');
}
