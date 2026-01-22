import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <div className="prose prose-blue max-w-none text-gray-600">
            <p className="mb-4 text-sm text-gray-500">Last updated: January 22, 2026</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Dev Kant Kumar Marketplace. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully before making any purchase.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. About Us</h2>
            <p className="mb-4">
              Dev Kant Kumar Marketplace is operated by Dev Kant Kumar, an individual providing digital products and web/app development services. We are based in India.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Business Name: Dev Kant Kumar Marketplace</li>
              <li>Email: hello@devkantkumar.com</li>
              <li>Phone: +91 7294177563</li>
              <li>Location: India</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Products and Services</h2>
            <p className="mb-4">
              We offer digital products (templates, source code, design assets) and development services (web development, app development, consulting). All products are delivered digitally and are available for download immediately after purchase.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. License Terms</h2>
            <p className="mb-4">
              When you purchase a product, you receive a license to use that product according to the license type specified. Please review our <Link to="/marketplace/license" className="text-blue-600 hover:underline">License Agreement</Link> for detailed terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Pricing and Payments</h2>
            <p className="mb-4">
              All prices are displayed in Indian Rupees (INR). Payments are processed securely through Razorpay. We accept credit cards, debit cards, UPI, and net banking.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Refund Policy</h2>
            <p className="mb-4">
              We offer a 14-day refund policy for digital products under specific conditions. Please review our <Link to="/marketplace/refunds" className="text-blue-600 hover:underline">Refund Policy</Link> for complete details.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
            <p className="mb-4">
              All products, content, and materials on this website are owned by Dev Kant Kumar unless otherwise stated. You may not redistribute, resell, or share purchased products without authorization.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Disclaimer</h2>
            <p className="mb-4">
              Products are provided "as is" without warranty of any kind. While we strive for quality, we cannot guarantee that products will meet all your specific requirements or be error-free.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, Dev Kant Kumar shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
            <p className="mb-4">
              These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Contact</h2>
            <p className="mb-4">
              For any questions regarding these terms, please contact us at hello@devkantkumar.com.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
