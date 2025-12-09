import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaArrowRight,
  FaBolt,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaCloud,
  FaCode,
  FaCogs,
  FaDatabase,
  FaGlobe,
  FaHandshake,
  FaMobileAlt,
  FaQuoteLeft,
  FaRocket,
  FaShieldAlt,
  FaStar,
  FaUsers
} from 'react-icons/fa';

const CustomSolutions = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    features: []
  });
  const [openFaq, setOpenFaq] = useState(null);

  const projectTypes = [
    { id: 'web-app', name: 'Web Application', icon: FaGlobe },
    { id: 'mobile-app', name: 'Mobile Application', icon: FaMobileAlt },
    { id: 'desktop-app', name: 'Desktop Application', icon: FaCode },
    { id: 'api', name: 'API Development', icon: FaDatabase },
    { id: 'cloud', name: 'Cloud Solutions', icon: FaCloud },
    { id: 'security', name: 'Security Solutions', icon: FaShieldAlt }
  ];

  const budgetRanges = [
    { id: 'small', label: '$5,000 - $15,000', value: '5000-15000' },
    { id: 'medium', label: '$15,000 - $50,000', value: '15000-50000' },
    { id: 'large', label: '$50,000 - $100,000', value: '50000-100000' },
    { id: 'enterprise', label: '$100,000+', value: '100000+' }
  ];

  const timelineOptions = [
    { id: 'urgent', label: '1-2 months', value: '1-2' },
    { id: 'normal', label: '3-6 months', value: '3-6' },
    { id: 'extended', label: '6-12 months', value: '6-12' },
    { id: 'flexible', label: 'Flexible', value: 'flexible' }
  ];

  const features = [
    'User Authentication',
    'Payment Integration',
    'Real-time Updates',
    'Admin Dashboard',
    'API Integration',
    'Mobile Responsive',
    'Cloud Hosting',
    'Data Analytics',
    'Third-party Integrations',
    'Custom Reporting',
    'Multi-language Support',
    'Advanced Security'
  ];

  const testimonials = [
    {
      id: 1,
      name: "David Chen",
      role: "CTO, TechFlow",
      content: "The custom CRM they built for us completely transformed our sales process. The attention to detail and code quality is outstanding.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Founder, StartUpX",
      content: "They delivered our MVP in record time without cutting corners. The team is incredibly responsive and truly understands startup needs.",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Director, Enterprise Corp",
      content: "A true partner in digital transformation. Their cloud solutions helped us scale our operations globally with 99.99% uptime.",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Do you sign an NDA?",
      answer: "Yes, absolutely. We respect your intellectual property and are happy to sign a Non-Disclosure Agreement (NDA) before we discuss any specific project details."
    },
    {
      question: "What is your typical payment structure?",
      answer: "We usually work with a milestone-based payment structure: 30% upfront, 40% upon completion of major milestones, and 30% upon final delivery and approval."
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Yes, we offer 3 months of free bug-fixing and support after launch. We also offer ongoing maintenance packages to keep your software secure and up-to-date."
    },
    {
      question: "Who owns the code?",
      answer: "You do. Upon full payment, you receive 100% ownership of the source code and all intellectual property rights."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/50 text-blue-200 text-sm font-bold mb-6 border border-blue-700">
              <FaRocket className="mr-2" /> ENTERPRISE GRADE SOLUTIONS
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Custom Software
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Built for Scale
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Transform your business with tailored software solutions designed specifically for your unique challenges and goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30">
                Get a Free Quote
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all backdrop-blur-sm border border-white/10">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium text-gray-500">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2 text-lg" />
              <span>Top 1% Talent</span>
            </div>
            <div className="flex items-center">
              <FaShieldAlt className="text-blue-500 mr-2 text-lg" />
              <span>NDA Protected</span>
            </div>
            <div className="flex items-center">
              <FaBolt className="text-yellow-500 mr-2 text-lg" />
              <span>On-Time Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to deployment, we follow a proven agile process to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We analyze your requirements and define project scope',
                icon: FaUsers
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Create detailed project roadmap and technical specifications',
                icon: FaCalendarAlt
              },
              {
                step: '03',
                title: 'Development',
                description: 'Build your solution using modern technologies and best practices',
                icon: FaCode
              },
              {
                step: '04',
                title: 'Deployment',
                description: 'Launch your solution and provide ongoing support',
                icon: FaRocket
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="flex items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <item.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">Step {item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">Why Partner With Us?</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We don't just write code; we build business solutions. Our team of expert developers and consultants works closely with you to ensure your software drives real growth.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Expert Team', desc: 'Senior developers with 5+ years of experience' },
                  { title: 'Transparent Pricing', desc: 'No hidden fees or surprise costs' },
                  { title: 'Agile Methodology', desc: 'Regular updates and flexible iterations' },
                  { title: 'Full Ownership', desc: 'You own 100% of the code and IP' }
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <FaCheckCircle className="text-green-400 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <FaHandshake className="text-blue-400 text-4xl mb-4" />
                <div className="text-3xl font-bold mb-1">100+</div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mt-8">
                <FaUsers className="text-purple-400 text-4xl mb-4" />
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <FaCogs className="text-yellow-400 text-4xl mb-4" />
                <div className="text-3xl font-bold mb-1">5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mt-8">
                <FaGlobe className="text-green-400 text-4xl mb-4" />
                <div className="text-3xl font-bold mb-1">10+</div>
                <div className="text-gray-400">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              What We Build
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in various types of custom software solutions tailored to your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-xl mb-6 text-blue-600">
                  <type.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{type.name}</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional {type.name.toLowerCase()} development with modern technologies, scalable architecture, and best practices.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our partners have to say.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-8 relative">
                <FaQuoteLeft className="text-blue-200 text-4xl absolute top-6 left-6" />
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about working with us.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <FaChevronUp className="text-blue-500" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Get Your Custom Quote
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your project and we'll provide a detailed proposal within 24 hours.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your Company Ltd."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Project Type *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select project type</option>
                {projectTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Budget Range *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map(range => (
                    <option key={range.id} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Timeline *
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map(option => (
                    <option key={option.id} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Required Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.map(feature => (
                  <label key={feature} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Please describe your project requirements, goals, and any specific features you need..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Get Custom Quote
              <FaArrowRight className="ml-2" />
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default CustomSolutions;
