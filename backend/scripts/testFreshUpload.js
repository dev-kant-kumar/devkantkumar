require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const run = async () => {
    // Upload fresh and immediately get signed URL
    const testPath = path.join(__dirname, 'fresh_test.txt');
    fs.writeFileSync(testPath, 'Fresh test content');

    try {
        console.log('1. Uploading fresh file...');
        const result = await cloudinary.uploader.upload(testPath, {
            folder: 'marketplace',
            resource_type: 'raw'
        });

        console.log('   Public ID:', result.public_id);
        console.log('   Secure URL:', result.secure_url);

        console.log('\n2. Testing direct access (should fail with 401 if strict)...');
        try {
            const res = await axios.get(result.secure_url);
            console.log('   Direct: SUCCESS', res.status);
        } catch (err) {
            console.log('   Direct: FAILED', err.response ? err.response.status : err.message);
        }

        console.log('\n3. Testing signed URL...');
        const signedUrl = cloudinary.url(result.public_id, {
            resource_type: 'raw',
            sign_url: true,
            secure: true
        });
        console.log('   Signed URL:', signedUrl);

        try {
            const res = await axios.get(signedUrl);
            console.log('   Signed: SUCCESS', res.status);
        } catch (err) {
            console.log('   Signed: FAILED', err.response ? err.response.status : err.message);
        }

        // Cleanup
        await cloudinary.uploader.destroy(result.public_id, { resource_type: 'raw' });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        if (fs.existsSync(testPath)) fs.unlinkSync(testPath);
    }
};

run();
