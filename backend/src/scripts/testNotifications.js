const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createNotification, notifyAdmins, notifyUser } = require('../services/notificationService');
const User = require('../models/User');
const path = require('path');

// Load env vars
const envPath = path.join(__dirname, '../../.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

const testNotifications = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        // 1. Notify Admins - New Order
        console.log('\n--- Testing Admin Notification (New Order) ---');
        await notifyAdmins({
            type: 'order_created',
            title: 'New Order Received',
            message: 'Order #TEST-1234 has been placed by John Doe.',
            data: { orderId: 'TEST-1234', amount: 299.99 },
            link: '/admin/marketplace/orders/TEST-1234',
            priority: 'high'
        });
        console.log('✅ Admin notification sent');

        // 2. Notify Admins - Support Ticket
        console.log('\n--- Testing Admin Notification (Support Ticket) ---');
        await notifyAdmins({
            type: 'support_ticket',
            title: 'New Support Ticket',
            message: 'Ticket #TK-999: "Login issues on mobile"',
            data: { ticketId: 'TK-999' },
            link: '/admin/support/TK-999',
            priority: 'normal'
        });
        console.log('✅ Support ticket notification sent');

        // Get a test user (the first non-admin user found)
        const testUser = await User.findOne({ role: 'user' });

        if (testUser) {
            console.log(`\n--- Testing User Notification for user: ${testUser.email} ---`);

            // 3. Notify User - Order Status
            await notifyUser(testUser._id, {
                type: 'order_status',
                title: 'Order Shipped',
                message: 'Your order #TEST-1234 has been shipped! Track it now.',
                data: { orderId: 'TEST-1234', trackingNumber: 'TRK888' },
                link: '/marketplace/dashboard/orders/TEST-1234',
                priority: 'normal'
            });
            console.log('✅ User order status notification sent');

            // 4. Notify User - Welcome (simulating new signup)
            await notifyUser(testUser._id, {
                type: 'welcome',
                title: 'Welcome to DevKant!',
                message: 'Thanks for joining. Complete your profile to get started.',
                link: '/marketplace/dashboard/profile',
                priority: 'low'
            });
            console.log('✅ User welcome notification sent');

             // 5. Notify User - Message
             await notifyUser(testUser._id, {
                type: 'message',
                title: 'New Message from Support',
                message: 'Hello! regarding your recent inquiry...',
                link: '/marketplace/dashboard/messages',
                priority: 'normal'
            });
            console.log('✅ User message notification sent');

        } else {
            console.log('⚠️ No test user found. Skipping user notification tests.');
        }

        console.log('\n✨ Notification Test Complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Test Failed with Message:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
};

testNotifications();
