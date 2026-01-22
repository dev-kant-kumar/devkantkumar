const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./src/models/Product');

async function checkReviews() {
  try {
    const productsWithReviews = await Product.find({ 'reviews.0': { $exists: true } });
    console.log(`Found ${productsWithReviews.length} products with embedded reviews.`);
    if (productsWithReviews.length > 0) {
      console.log('Sample review:', JSON.stringify(productsWithReviews[0].reviews[0], null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
    checkReviews();
  })
  .catch(err => {
    console.error('DB Connection Error:', err);
  });
