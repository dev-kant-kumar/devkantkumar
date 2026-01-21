const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../src/models/Product');

const checkProduct = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const productId = '696cd4b0b9dfe5263f524644';
    const product = await Product.findById(productId);

    if (!product) {
      console.log('Product not found');
    } else {
      console.log('Product found:', product.title);
      console.log('Download Files:', JSON.stringify(product.downloadFiles, null, 2));
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkProduct();
