const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../src/db/connection');
const Product = require('../src/models/Product');
const Service = require('../src/models/Service');

const dump = async () => {
  try {
    await connectDB();
    const products = await Product.find({ isActive: true }, 'title slug category price lastUpdated updatedAt');
    const services = await Service.find({ isActive: true }, 'title slug category packages lastUpdated updatedAt');
    console.log('--- PRODUCTS ---');
    console.log(JSON.stringify(products, null, 2));
    console.log('--- SERVICES ---');
    console.log(JSON.stringify(services, null, 2));
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

dump();
