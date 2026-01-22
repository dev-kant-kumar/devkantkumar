const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Service = require('./src/models/Service');
const Order = require('./src/models/Order');
const Review = require('./src/models/Review');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const verifyReviews = async () => {
  await connectDB();

  let tempUser, tempProduct, tempOrder, tempReview;

  try {
    console.log('--- Starting Verification ---');

    // 1. Create Temp User
    tempUser = await User.create({
      firstName: 'Test',
      lastName: 'Reviewer',
      email: `testreviewer${Date.now()}@example.com`,
      password: 'password123',
      role: 'user'
    });
    console.log('1. Created Temp User:', tempUser._id);

    // 2. Create Temp Product
    tempProduct = await Product.create({
      title: `Test Product ${Date.now()}`,
      description: 'Test Description for Review Verification',
      price: 100,
      category: 'templates',
      images: [{ url: 'http://example.com/image.jpg' }],
      createdBy: tempUser._id
    });
    console.log('2. Created Temp Product:', tempProduct._id);

    // 3. Create Temp Order (Purchase Verification)
    tempOrder = await Order.create({
      orderNumber: `ORD-TEST-${Date.now()}`,
      user: tempUser._id,
      items: [{
        itemType: 'product',
        itemId: tempProduct._id,
        title: tempProduct.title,
        price: 100,
        quantity: 1
      }],
      billing: {
        firstName: 'Test',
        lastName: 'Reviewer',
        email: tempUser.email
      },
      payment: {
        method: 'stripe',
        status: 'completed',
        amount: { total: 100, subtotal: 100, tax: 0 }
      }
    });
    console.log('3. Created Temp Order:', tempOrder._id);

    // 4. Verify Purchase Logic (Simulation of Controller logic)
    const orders = await Order.find({
      user: tempUser._id,
      'payment.status': 'completed',
      items: {
        $elemMatch: {
          itemId: tempProduct._id,
          itemType: 'product'
        }
      }
    });

    if (orders.length > 0) {
      console.log('4. Purchase Verification PASSED: Found valid order.');
    } else {
      console.error('4. Purchase Verification FAILED: Order not found.');
    }

    // 5. Create Review
    tempReview = await Review.create({
      user: tempUser._id,
      product: tempProduct._id,
      rating: 4,
      comment: 'Great product, verifying reviews system!',
      isVerifiedPurchase: true
    });
    console.log('5. Created Review:', tempReview._id);

    // 6. Check Aggregation
    const updatedProduct = await Product.findById(tempProduct._id);
    console.log('6. Product ID:', updatedProduct._id);
    console.log('   Average Rating:', updatedProduct.rating.average);
    console.log('   Rating Count:', updatedProduct.rating.count);

    if (updatedProduct.rating.average === 4 && updatedProduct.rating.count === 1) {
      console.log('   Aggregation Verification PASSED');
    } else {
      console.error('   Aggregation Verification FAILED');
    }

    // 7. Check Virtual Populate
    const populatedProduct = await Product.findById(tempProduct._id).populate('confirmReviews');
    console.log('7. Virtual Populate Reviews Length:', populatedProduct.confirmReviews.length);
    if (populatedProduct.confirmReviews.length === 1 && populatedProduct.confirmReviews[0].comment === 'Great product, verifying reviews system!') {
      console.log('   Virtual Populate Verification PASSED');
    } else {
      console.error('   Virtual Populate Verification FAILED');
      console.log('   ConfirmReviews:', populatedProduct.confirmReviews);
    }

  } catch (error) {
    console.error('Verification Error:', error);
  } finally {
    // Cleanup
    if (tempReview) await Review.findByIdAndDelete(tempReview._id);
    if (tempOrder) await Order.findByIdAndDelete(tempOrder._id);
    if (tempProduct) await Product.findByIdAndDelete(tempProduct._id);
    if (tempUser) await User.findByIdAndDelete(tempUser._id);

    console.log('--- Cleanup Complete ---');
    mongoose.disconnect();
  }
};

verifyReviews();
