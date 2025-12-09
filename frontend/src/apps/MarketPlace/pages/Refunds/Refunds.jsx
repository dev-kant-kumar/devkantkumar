import { motion } from 'framer-motion';

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
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Digital Products</h2>
            <p className="mb-4">
              Due to the nature of digital products, we generally do not offer refunds once the product has been downloaded. However, we understand that exceptional circumstances may take place.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Eligibility for Refund</h2>
            <p className="mb-4">
              We may offer a refund within 14 days of purchase if:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The product is technically defective and our support team cannot fix it.</li>
              <li>The product description was materially misleading.</li>
              <li>You have not downloaded the product.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Services</h2>
            <p className="mb-4">
              Refunds for services are handled on a case-by-case basis according to the service agreement signed before the project commencement.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. How to Request</h2>
            <p className="mb-4">
              To request a refund, please contact our support team with your order details and the reason for the request.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Refunds;
