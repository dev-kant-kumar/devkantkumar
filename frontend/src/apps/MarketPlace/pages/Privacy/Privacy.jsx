import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="prose prose-blue max-w-none text-gray-600">
            <p className="mb-4 text-sm text-gray-500">Last updated: January 22, 2026</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Dev Kant Kumar Marketplace ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
              <li><strong>Billing Information:</strong> Address, phone number, and payment details for processing orders</li>
              <li><strong>Usage Data:</strong> Information about how you use our website (pages visited, time spent)</li>
              <li><strong>Device Information:</strong> Browser type, IP address, and device type for security and analytics</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Process your orders and deliver digital products</li>
              <li>Send order confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send marketing communications (only with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Third-Party Services</h2>
            <p className="mb-4">We use the following third-party services to operate our marketplace:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Razorpay:</strong> For payment processing</li>
              <li><strong>Cloudinary:</strong> For file storage and delivery</li>
              <li><strong>Email Services:</strong> For sending transactional emails</li>
            </ul>
            <p className="mb-4">
              These services have their own privacy policies, and we recommend you review them.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as necessary to provide our services and fulfill legal obligations. Order records are kept for 7 years as required by tax regulations.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your data, including encryption of sensitive information and secure payment processing through Razorpay.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Cookies</h2>
            <p className="mb-4">
              We use cookies and similar technologies for authentication, preferences, and analytics. You can manage cookie settings in your browser.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="mb-4">
              Our services are not intended for children under 18. We do not knowingly collect personal information from children.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Grievance Officer</h2>
            <p className="mb-4">
              For any privacy-related concerns or complaints, please contact our Grievance Officer:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name: Dev Kant Kumar</li>
              <li>Email: hello@devkantkumar.com</li>
              <li>Phone: +91 7294177563</li>
            </ul>
            <p className="mb-4">
              We will acknowledge your complaint within 24 hours and resolve it within 30 days.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or website notice.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="mb-4">
              For questions about this Privacy Policy, contact us at hello@devkantkumar.com or visit our <Link to="/marketplace/contact" className="text-blue-600 hover:underline">Contact page</Link>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
