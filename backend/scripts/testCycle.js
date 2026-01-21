require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const run = async () => {
    // Hardcoded User File Values
    const pid = 'marketplace/orqn1dohpg7rg3l1azhb.pdf';
    const version = '1768746690';

    try {
        console.log('\n2. Generating Signed URL for User File...');

        const options = {
            resource_type: 'raw',
            type: 'authenticated',
            sign_url: true,
            secure: true,
            version: version,
            expires_at: Math.floor(Date.now() / 1000) + 3600
        };

        const url = cloudinary.url(pid, options);
        console.log('Generated URL:', url);

        console.log('\n3. Fetching URL...');
        try {
            const res = await axios.get(url);
            console.log('SUCCESS! Status:', res.status);
            console.log('Headers:', res.headers['content-type']);
        } catch (err) {
            console.log('FAILED:', err.message);
            if (err.response) console.log('Status:', err.response.status);
        }

    } catch (err) {
        console.error('Test Cycle Error:', err);
    }
};

run();
