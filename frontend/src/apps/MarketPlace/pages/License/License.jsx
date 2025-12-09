import { motion } from 'framer-motion';

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
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Standard License</h2>
            <p className="mb-4">
              The Standard License grants you a non-exclusive, non-transferable right to make use of the product you have purchased.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You may use the item in a single end product.</li>
              <li>You may modify the item to fit your needs.</li>
              <li>You may not redistribute or resell the item.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Extended License</h2>
            <p className="mb-4">
              The Extended License grants you a non-exclusive, non-transferable right to make use of the product you have purchased.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You may use the item in a single end product which may be sold to multiple end users.</li>
              <li>You may modify the item to fit your needs.</li>
              <li>You may not redistribute or resell the item as a stock item.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Intellectual Property</h2>
            <p className="mb-4">
              All products remain the property of Dev Kant Kumar. You are purchasing a license to use the product, not ownership of the product itself.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default License;
