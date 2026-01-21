require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');

const testUrl = 'https://res.cloudinary.com/dmcdecnoz/raw/upload/v1768747787/marketplace/n3ny0eqzqu9loyiwttlx.pdf';

console.log('Testing with version extraction...');

// Extract version AND public_id
const versionMatch = testUrl.match(/\/v(\d+)\//);
const version = versionMatch ? versionMatch[1] : null;

const uploadMatch = testUrl.match(/\/(?:upload|authenticated)\/(?:v\d+\/)?(.+)$/);
const publicId = uploadMatch ? uploadMatch[1] : null;

console.log('Version:', version);
console.log('Public ID:', publicId);

// Generate signed URL WITH version
const signedUrl = cloudinary.url(publicId, {
    resource_type: 'raw',
    sign_url: true,
    secure: true,
    version: version  // <-- KEY FIX
});
console.log('Signed URL:', signedUrl);

// Test it
axios.get(signedUrl, { responseType: 'arraybuffer' })
    .then(res => console.log('SUCCESS:', res.status, 'Size:', res.data.length))
    .catch(err => console.log('FAILED:', err.response ? err.response.status : err.message));
