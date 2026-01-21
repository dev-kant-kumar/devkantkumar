require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const run = async () => {
    const testPath = path.join(__dirname, 'compare_test.txt');
    fs.writeFileSync(testPath, 'Compare test');

    try {
        console.log('Uploading file...');
        const result = await cloudinary.uploader.upload(testPath, {
            folder: 'marketplace',
            resource_type: 'raw'
        });

        console.log('\n=== CLOUDINARY RESPONSE ===');
        console.log('Public ID:', result.public_id);
        console.log('Version:', result.version);
        console.log('Secure URL from response:', result.secure_url);

        // Extract signature from response URL
        const respSigMatch = result.secure_url.match(/s--(.+?)--/);
        console.log('Signature in response:', respSigMatch ? respSigMatch[1] : 'N/A');

        console.log('\n=== SDK GENERATED URL ===');
        const sdkUrl = cloudinary.url(result.public_id, {
            resource_type: 'raw',
            sign_url: true,
            secure: true,
            version: result.version
        });
        console.log('SDK URL:', sdkUrl);

        const sdkSigMatch = sdkUrl.match(/s--(.+?)--/);
        console.log('Signature in SDK URL:', sdkSigMatch ? sdkSigMatch[1] : 'N/A');

        console.log('\nSignatures match?', respSigMatch && sdkSigMatch && respSigMatch[1] === sdkSigMatch[1]);

        console.log('\n=== TESTING BOTH URLS ===');

        console.log('Response URL:');
        try {
            await axios.get(result.secure_url);
            console.log('  SUCCESS');
        } catch (err) {
            console.log('  FAILED:', err.response ? err.response.status : err.message);
        }

        console.log('SDK URL:');
        try {
            await axios.get(sdkUrl);
            console.log('  SUCCESS');
        } catch (err) {
            console.log('  FAILED:', err.response ? err.response.status : err.message);
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
