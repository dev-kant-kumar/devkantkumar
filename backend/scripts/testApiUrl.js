require('dotenv').config();
const cloudinary = require('../src/services/cloudinaryService');
const axios = require('axios');

const pid = 'marketplace/orqn1dohpg7rg3l1azhb.pdf';

const run = async () => {
    try {
        console.log('1. Fetching resource from API...');
        const res = await cloudinary.api.resource(pid, {
            resource_type: 'raw',
            type: 'authenticated'
        });

        console.log('Resource found!');
        console.log('  secure_url:', res.secure_url);

        console.log('\n2. Trying to fetch the secure_url directly...');
        try {
            const download = await axios.get(res.secure_url);
            console.log('SUCCESS! Status:', download.status);
        } catch (err) {
            console.log('FAILED:', err.message);
            if (err.response) console.log('Status:', err.response.status);
        }

        // Now try generating a fresh signed URL and compare
        console.log('\n3. Generating fresh signed URL...');
        const freshUrl = cloudinary.url(pid, {
            resource_type: 'raw',
            type: 'authenticated',
            sign_url: true,
            secure: true
        });
        console.log('  Generated URL:', freshUrl);

        console.log('\n4. Trying to fetch the fresh signed URL...');
        try {
            const download2 = await axios.get(freshUrl);
            console.log('SUCCESS! Status:', download2.status);
        } catch (err) {
            console.log('FAILED:', err.message);
            if (err.response) console.log('Status:', err.response.status);
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
};

run();
