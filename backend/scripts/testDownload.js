const axios = require('axios');

const testUrl = 'https://res.cloudinary.com/dmcdecnoz/image/upload/v1768745114/marketplace/cjb7qdpth0wyzaquvbtp.pdf';

const runTest = async () => {
  console.log('Testing URL:', testUrl);

  // Test 1: Simple GET
  try {
    console.log('Test 1: Simple GET...');
    const res1 = await axios.get(testUrl);
    console.log('Status:', res1.status);
    console.log('Headers:', res1.headers['content-type']);
  } catch (err) {
    console.log('Test 1 Failed:', err.message);
    if (err.response) console.log('Status:', err.response.status);
  }

  // Test 2: GET with User-Agent
  try {
    console.log('\nTest 2: GET with User-Agent...');
    const res2 = await axios.get(testUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log('Status:', res2.status);
    console.log('Headers:', res2.headers['content-type']);
  } catch (err) {
    console.log('Test 2 Failed:', err.message);
    if (err.response) console.log('Status:', err.response.status);
  }

  // Test 3: GET as Raw (guessing URL)
  try {
    const rawUrl = testUrl.replace('/image/upload/', '/raw/upload/');
    console.log('\nTest 3: GET as Raw...', rawUrl);
    const res3 = await axios.get(rawUrl);
    console.log('Status:', res3.status);
  } catch (err) {
    console.log('Test 3 Failed:', err.message);
    if (err.response) console.log('Status:', err.response.status);
  }
};

runTest();
