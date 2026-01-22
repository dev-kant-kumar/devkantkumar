import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const License = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">License Agreement</h1>
          <div className="prose prose-blue max-w-none text-gray-600">
            <p className="mb-4 text-sm text-gray-500">Last updated: January 22, 2026</p>

            <p className="mb-6">
              This License Agreement governs the use of digital products purchased from Dev Kant Kumar Marketplace. By purchasing and downloading any product, you agree to these terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Standard License</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="font-medium text-gray-900 mb-2">What you CAN do:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the product in a single end project (personal or client)</li>
                <li>Modify the product to suit your needs</li>
                <li>Use for personal or commercial projects</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <p className="font-medium text-gray-900 mb-2">What you CANNOT do:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Redistribute or resell the product</li>
                <li>Share the product files with others</li>
                <li>Use the product in a template or theme that you sell</li>
                <li>Claim the product as your own creation</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Extended License</h2>
            <p className="mb-4">
              Some products may offer an Extended License. This grants additional rights:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-6 space-y-1">
                <li>Use in unlimited end projects</li>
                <li>Use in products that are sold to multiple end users (SaaS, apps)</li>
                <li>Still cannot redistribute the source files themselves</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Support and Updates</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Support:</strong> 6 months of email support for technical issues</li>
              <li><strong>Updates:</strong> Access to updates as they are released (check product page for specifics)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              All products remain the intellectual property of Dev Kant Kumar. You are purchasing a <strong>license to use</strong> the product, not ownership of the product itself. The original source code, designs, and assets remain our property.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. License Violation</h2>
            <p className="mb-4">
              If you violate the terms of this license:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your license will be immediately terminated</li>
              <li>You must stop using and delete the product files</li>
              <li>We reserve the right to take legal action for damages</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Questions</h2>
            <p className="mb-4">
              If you're unsure whether your use case is covered, please <Link to="/marketplace/contact" className="text-blue-600 hover:underline">contact us</Link> before purchasing. We're happy to clarify.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default License;
