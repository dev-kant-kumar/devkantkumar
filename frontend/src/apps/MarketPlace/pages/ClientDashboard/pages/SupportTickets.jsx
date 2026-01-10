import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

const SupportTickets = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, redirect to email
    const mailtoLink = `mailto:support@devkantkumar.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          <p className="mt-1 text-sm text-gray-500">Get help with your orders and services.</p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Support */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
            </div>
          </div>
          <a
            href="mailto:support@devkantkumar.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="h-4 w-4" />
            Email Us
          </a>
        </div>

        {/* Order-Specific Support */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Order Messages</h3>
              <p className="text-sm text-gray-500">Chat directly in your service workspace</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            For order-specific questions, use the messaging feature in your service workspace for faster responses.
          </p>
          <a
            href="/marketplace/dashboard/services"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Go to My Services
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div
          className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => setShowContactForm(!showContactForm)}
        >
          <h3 className="text-lg font-medium text-gray-900">Send a Message</h3>
          <span className="text-sm text-gray-500">{showContactForm ? 'Hide' : 'Show'}</span>
        </div>

        {showContactForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleSubmit}
            className="p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="general">General Inquiry</option>
                <option value="order">Order Issue</option>
                <option value="billing">Billing Question</option>
                <option value="technical">Technical Support</option>
                <option value="refund">Refund Request</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Describe your issue in detail..."
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </motion.form>
        )}
      </div>

      {/* FAQ Link */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Looking for quick answers?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Check out our FAQ section for common questions about orders, payments, and services.
        </p>
        <a
          href="/marketplace/faq"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          View FAQ →
        </a>
      </div>
    </motion.div>
  );
};

export default SupportTickets;
