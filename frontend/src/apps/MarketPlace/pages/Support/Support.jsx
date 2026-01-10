import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Book,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Loader2,
  Mail,
  Phone,
  Search,
  Send,
  Users,
  Video
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ICON_MAP = {
  book: Book,
  video: Video,
  file: FileText,
  users: Users
};

// --- Hardcoded Data ---

const FAQS = [
  {
    category: 'General',
    question: 'How do I purchase a digital product?',
    answer: 'You can purchase digital products by browsing our marketplace, selecting the product you want, adding it to cart, and completing the secure checkout process.'
  },
  {
    category: 'Technical',
    question: 'What file formats do you provide?',
    answer: 'We provide various file formats depending on the product type, including source code files, documentation, and deployment guides. Each product page lists the included formats.'
  },
  {
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and various digital wallets through our secure Razorpay payment gateway.'
  },
  {
    category: 'Technical',
    question: 'Do you provide source code?',
    answer: 'Yes, most of our products include full source code. This is clearly indicated on each product page under the "What\'s Included" section.'
  },
  {
    category: 'General',
    question: 'Can I get a refund?',
    answer: 'We offer a 7-day money-back guarantee for digital products if they don\'t work as described. Contact our support team with your order details for assistance.'
  },
  {
    category: 'Technical',
    question: 'Do you provide technical support?',
    answer: 'Yes, we provide technical support for all our products. Submit a support ticket and our team will assist you within 24 hours.'
  },
  {
    category: 'Billing',
    question: 'How do I download my purchased products?',
    answer: 'After successful payment, you\'ll receive download links via email. You can also access all your purchases from your account dashboard.'
  },
  {
    category: 'General',
    question: 'Do you offer custom development services?',
    answer: 'Yes! We offer custom development services. Visit our Custom Solutions page to request a quote for your project.'
  }
];

const RESOURCES = [
  {
    title: 'Documentation',
    description: 'Comprehensive guides and API documentation',
    link: '/marketplace/docs',
    icon: 'book'
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides',
    link: '/marketplace/tutorials',
    icon: 'video'
  },
  {
    title: 'Knowledge Base',
    description: 'Searchable articles and solutions',
    link: '/marketplace/kb',
    icon: 'file'
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users',
    link: '/marketplace/community',
    icon: 'users'
  }
];

const CATEGORIES = [
  { id: 'technical', name: 'Technical Support' },
  { id: 'billing', name: 'Billing & Payments' },
  { id: 'general', name: 'General Inquiry' },
  { id: 'feedback', name: 'Feedback' },
  { id: 'order', name: 'Order Issue' },
  { id: 'refund', name: 'Refund Request' }
];

const CONTACT_INFO = {
  email: 'support@devkantkumar.com',
  phone: '+91 7294177563',
  supportHours: 'Mon-Fri: 10AM-7PM IST'
};

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const filteredFaqs = FAQS.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const newErrors = {};

    if (!contactForm.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!contactForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!contactForm.category) {
      newErrors.category = 'Please select a category';
    }

    if (!contactForm.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!contactForm.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (contactForm.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE}/api/v1/marketplace/support`, contactForm);

      setTicketNumber(response.data.data.ticketNumber);
      setShowSuccess(true);
      setContactForm({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
      setErrors({});
      toast.success('Support ticket submitted successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit ticket. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              How can we help you?
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Get the support you need to make the most of our products and services
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-white/30 focus:border-white text-lg text-gray-900 shadow-xl placeholder-gray-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Help Resources */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RESOURCES.map((resource, index) => {
                  const IconComponent = ICON_MAP[resource.icon] || Book;
                  return (
                    <motion.a
                      key={index}
                      href={resource.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mr-4">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                          <p className="text-gray-600">{resource.description}</p>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mr-3 ${
                            faq.category === 'Technical' ? 'bg-purple-100 text-purple-700' :
                            faq.category === 'Billing' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {faq.category}
                          </span>
                          <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-white rounded-xl">
                    <p className="text-gray-600">No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h3>

              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-4">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-blue-600 hover:underline">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mr-4">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-600 hover:text-blue-600">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mr-4">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Support Hours</p>
                    <p className="text-gray-600">{CONTACT_INFO.supportHours}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={contactForm.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Brief description of your issue"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Describe your issue in detail..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ticket Submitted!</h3>
              <p className="text-gray-600 mb-4">
                Your support ticket has been created successfully.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500">Your ticket number</p>
                <p className="text-xl font-bold text-blue-600">{ticketNumber}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                We'll respond to your inquiry within 24 hours. You'll receive updates at your email address.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Got it, thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Support;
