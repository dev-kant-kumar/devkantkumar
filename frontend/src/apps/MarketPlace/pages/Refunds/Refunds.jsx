import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Refunds = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund Policy</h1>
          <div className="prose prose-blue max-w-none text-gray-600">
            <p className="mb-4 text-sm text-gray-500">Last updated: January 22, 2026</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">
                We offer a 14-day refund policy for digital products under the conditions described below.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Digital Products</h2>
            <p className="mb-4">
              Due to the nature of digital products (they can be copied and used immediately after download), refunds are handled on a case-by-case basis. We understand that exceptional circumstances may occur.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Eligibility for Refund</h2>
            <p className="mb-4">You may be eligible for a refund within 14 days of purchase if:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Technical Defect:</strong> The product has a technical issue that prevents it from working as described, and our support team cannot resolve it.</li>
              <li><strong>Misleading Description:</strong> The product description was materially misleading about its features or functionality.</li>
              <li><strong>Not Downloaded:</strong> You have not downloaded the product files yet.</li>
              <li><strong>Duplicate Purchase:</strong> You accidentally purchased the same product twice.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Non-Refundable Cases</h2>
            <p className="mb-4">Refunds will generally not be provided if:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You have downloaded and used the product</li>
              <li>More than 14 days have passed since purchase</li>
              <li>You changed your mind after purchase</li>
              <li>The product works as described but doesn't meet your expectations</li>
              <li>Your system doesn't meet the stated requirements</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Services</h2>
            <p className="mb-4">
              For development services, refunds are handled according to the specific service agreement. Generally:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Full refund if work has not yet started</li>
              <li>Partial refund based on work completed if project is cancelled mid-way</li>
              <li>No refund after project completion and approval</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. How to Request a Refund</h2>
            <p className="mb-4">To request a refund:</p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Email us at <strong>hello@devkantkumar.com</strong></li>
              <li>Include your order number and the reason for the refund request</li>
              <li>Provide any relevant screenshots or details about the issue</li>
            </ol>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Refund Processing</h2>
            <p className="mb-4">
              We will review your request within 3-5 business days. If approved, refunds will be processed to your original payment method within 7-10 business days. The time for the refund to appear in your account depends on your bank or payment provider.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Contact</h2>
            <p className="mb-4">
              For any questions about this refund policy, please <Link to="/marketplace/contact" className="text-blue-600 hover:underline">contact us</Link>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Refunds;
