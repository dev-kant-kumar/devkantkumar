const axios = require('axios');

const testUrl = 'https://res.cloudinary.com/dmcdecnoz/raw/upload/v1768746014/marketplace/l5rnwfubkuzkgnbgwmid.pdf';

const runTest = async () => {
  console.log('Testing URL:', testUrl);

  // Test 1: Simple GET (No Signature)
  try {
    console.log('Test 1: Simple GET (Public Access)...');
    const res1 = await axios.get(testUrl);
    console.log('Status:', res1.status);
    console.log('Headers:', res1.headers['content-type']);
    console.log('Length:', res1.headers['content-length']);
    console.log('Success! File is public.');
  } catch (err) {
    console.log('Test 1 Failed:', err.message);
    if (err.response) console.log('Status:', err.response.status);
  }
};

runTest();
