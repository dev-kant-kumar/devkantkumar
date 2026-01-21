require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const run = async () => {
    // Create a test file
    const testPath = path.join(__dirname, 'test_public.txt');
    fs.writeFileSync(testPath, 'Test public file content');

    try {
        console.log('1. Uploading as PUBLIC (type: upload)...');
        const result = await cloudinary.uploader.upload(testPath, {
            folder: 'marketplace_test',
            resource_type: 'raw'
            // NO type: 'authenticated' - this makes it public
        });

        console.log('\nUpload Success!');
        console.log('  Public ID:', result.public_id);
        console.log('  Secure URL:', result.secure_url);
        console.log('  Type:', result.type || 'upload (default)');

        console.log('\n2. Testing direct access to URL...');
        try {
            const download = await axios.get(result.secure_url);
            console.log('  SUCCESS! Status:', download.status);
            console.log('  Content:', download.data);
        } catch (err) {
            console.log('  FAILED:', err.response ? err.response.status : err.message);
        }

        // Cleanup
        console.log('\n3. Cleaning up test file...');
        await cloudinary.uploader.destroy(result.public_id, { resource_type: 'raw' });
        console.log('  Deleted from Cloudinary');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        if (fs.existsSync(testPath)) fs.unlinkSync(testPath);
    }
};

run();
