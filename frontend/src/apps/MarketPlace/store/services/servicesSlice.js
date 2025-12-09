import { createSlice } from '@reduxjs/toolkit';
import backend from "../../pages/Services/Assets/Images/Products/backend_development.png";
import custom from "../../pages/Services/Assets/Images/Products/custom_software.png";
import mobile from "../../pages/Services/Assets/Images/Products/mobile_app_development.png";
import security from "../../pages/Services/Assets/Images/Products/security_audit.png";
import design from "../../pages/Services/Assets/Images/Products/ui_ux_design.png";
import web from "../../pages/Services/Assets/Images/Products/web_development.png";

const initialServices = [
  {
    id: 'web-development',
    title: 'Custom Web Development',
    description: 'Professional web development services tailored to your business needs',
    longDescription: 'Transform your digital presence with our comprehensive web development services. We create responsive, scalable, and user-friendly websites that drive results and enhance your brand identity.',
    category: 'web',
    price: 2499,
    rating: 4.9,
    reviews: 127,
    deliveryTime: '7-14 days',
    revisions: 'Unlimited',
    seller: 'Dev Kant Kumar',
    image: web,
    tags: ['React', 'Node.js', 'MongoDB', 'Responsive'],
    popular: true,
    features: ['Source Code Included', 'SEO Optimized', 'Responsive Design'],
    packages: [
      {
        name: 'Basic',
        price: 2499,
        description: 'Perfect for small businesses',
        features: ['Responsive Design', '5 Pages', 'Contact Form', 'Basic SEO', '30 Days Support']
      },
      {
        name: 'Standard',
        price: 3999,
        description: 'Most popular choice',
        features: ['Everything in Basic', '10 Pages', 'CMS Integration', 'Advanced SEO', 'Social Media Integration', '60 Days Support']
      },
      {
        name: 'Premium',
        price: 5999,
        description: 'For growing businesses',
        features: ['Everything in Standard', 'Unlimited Pages', 'E-commerce Integration', 'Custom Features', 'Performance Optimization', '90 Days Support']
      }
    ],
    portfolio: [
      { title: 'E-commerce Platform', image: '/api/placeholder/300/200' },
      { title: 'Corporate Website', image: '/api/placeholder/300/200' },
      { title: 'Portfolio Site', image: '/api/placeholder/300/200' }
    ],
    faq: [
      { question: 'What technologies do you use?', answer: 'We use modern technologies like React, Node.js, MongoDB, and other cutting-edge tools based on project requirements.' },
      { question: 'How long does development take?', answer: 'Development time varies based on complexity, typically ranging from 1-4 weeks for most projects.' },
      { question: 'Do you provide ongoing support?', answer: 'Yes, we provide comprehensive support and maintenance packages to keep your website running smoothly.' }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android',
    longDescription: 'Reach your customers on their favorite devices with our mobile app development services. We build high-performance, user-centric mobile apps using React Native and Flutter.',
    category: 'mobile',
    price: 4999,
    rating: 4.8,
    reviews: 89,
    deliveryTime: '14-30 days',
    revisions: 'Unlimited',
    seller: 'Dev Kant Kumar',
    image: mobile,
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    popular: true,
    features: ['iOS & Android', 'App Store Submission', 'Source Code'],
    packages: [
      {
        name: 'Basic',
        price: 4999,
        description: 'Simple App MVP',
        features: ['UI/UX Design', '5 Screens', 'Android & iOS', 'Source Code', 'App Store Submission']
      },
      {
        name: 'Standard',
        price: 7999,
        description: 'Feature-rich App',
        features: ['Everything in Basic', '10 Screens', 'API Integration', 'Push Notifications', 'Admin Panel', '3 Months Support']
      },
      {
        name: 'Premium',
        price: 12999,
        description: 'Complex Application',
        features: ['Everything in Standard', 'Unlimited Screens', 'Advanced Features', 'Payment Gateway', 'Analytics', '6 Months Support']
      }
    ],
    portfolio: [
      { title: 'Food Delivery App', image: '/api/placeholder/300/200' },
      { title: 'Fitness Tracker', image: '/api/placeholder/300/200' },
      { title: 'Social Network', image: '/api/placeholder/300/200' }
    ],
    faq: [
      { question: 'Do you build for both iOS and Android?', answer: 'Yes, we use cross-platform technologies to deliver apps for both platforms efficiently.' },
      { question: 'Will you help with App Store submission?', answer: 'Absolutely, we handle the entire submission process for both Apple App Store and Google Play Store.' }
    ]
  },
  {
    id: 'ui-design',
    title: 'UI/UX Design Services',
    description: 'Modern and user-friendly interface design',
    longDescription: 'Create engaging user experiences with our expert UI/UX design services. We focus on usability, aesthetics, and conversion optimization.',
    category: 'design',
    price: 1499,
    rating: 5.0,
    reviews: 156,
    deliveryTime: '5-10 days',
    revisions: 'Unlimited',
    seller: 'Dev Kant Kumar',
    image: design,
    tags: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    features: ['User Research', 'Interactive Prototype', 'Source Files'],
    packages: [
      {
        name: 'Basic',
        price: 1499,
        description: 'Essential Design',
        features: ['Home Page Design', 'Mobile Responsive', 'Source File', '2 Revisions', 'Commercial Use']
      },
      {
        name: 'Standard',
        price: 2999,
        description: 'Complete Website',
        features: ['Up to 5 Pages', 'Interactive Prototype', 'Style Guide', '5 Revisions', 'Assets Included']
      },
      {
        name: 'Premium',
        price: 4999,
        description: 'App & Web System',
        features: ['Full System Design', 'Design System', 'User Testing', 'Unlimited Revisions', 'Developer Handoff']
      }
    ],
    portfolio: [],
    faq: []
  },
  {
    id: 'backend-api',
    title: 'Backend API Development',
    description: 'Scalable and secure backend solutions',
    longDescription: 'Power your applications with robust backend infrastructure. We build secure, scalable, and high-performance APIs.',
    category: 'backend',
    price: 1999,
    rating: 4.7,
    reviews: 73,
    deliveryTime: '10-15 days',
    revisions: 'Unlimited',
    seller: 'Dev Kant Kumar',
    image: backend,
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    features: ['Secure API', 'Database Design', 'API Documentation'],
    packages: [
      {
        name: 'Basic',
        price: 1999,
        description: 'Simple API',
        features: ['REST API', 'Database Setup', 'Authentication', 'Documentation']
      },
      {
        name: 'Standard',
        price: 3499,
        description: 'Advanced Backend',
        features: ['Complex Logic', '3rd Party Integrations', 'Caching', 'Optimization']
      },
      {
        name: 'Premium',
        price: 5999,
        description: 'Enterprise Solution',
        features: ['Microservices', 'Load Balancing', 'CI/CD Pipeline', 'High Availability']
      }
    ],
    portfolio: [],
    faq: []
  },
  {
    id: 'security-audit',
    title: 'Security Audit & Testing',
    description: 'Comprehensive security assessment and testing',
    longDescription: 'Protect your digital assets with our thorough security audits and penetration testing services.',
    category: 'security',
    price: 1999,
    rating: 4.9,
    reviews: 45,
    deliveryTime: '7-12 days',
    revisions: 'Unlimited',
    seller: 'Dev Kant Kumar',
    image: security,
    tags: ['Penetration Testing', 'Vulnerability Assessment', 'Security'],
    features: ['Detailed Report', 'Vulnerability Fixes', 'Security Cert'],
    packages: [
      {
        name: 'Basic',
        price: 1999,
        description: 'Vulnerability Scan',
        features: ['Automated Scan', 'Basic Report', 'Risk Assessment', 'Recommendations']
      },
      {
        name: 'Standard',
        price: 3999,
        description: 'Penetration Test',
        features: ['Manual Testing', 'Exploitation', 'Detailed Report', 'Fix Verification']
      },
      {
        name: 'Premium',
        price: 6999,
        description: 'Full Audit',
        features: ['Code Review', 'Infrastructure Audit', 'Compliance Check', 'Strategy']
      }
    ],
    portfolio: [],
    faq: []
  },
  {
    id: 'custom-solution',
    title: 'Custom Software Solutions',
    description: 'Tailored software solutions for your business needs',
    longDescription: 'Get software that fits your unique business processes perfectly. We build custom solutions from the ground up.',
    category: 'custom',
    price: 9999,
    rating: 4.8,
    reviews: 62,
    deliveryTime: '21-30 days',
    revisions: 'Unlimited',
    seller: 'Dev Kant Kumar',
    image: custom,
    tags: ['Custom Development', 'Enterprise', 'Scalable', 'Integration'],
    features: ['Full IP Rights', '3 Months Support', 'Scalable Arch'],
    packages: [
      {
        name: 'Basic',
        price: 9999,
        description: 'MVP Development',
        features: ['Core Features', 'Basic UI/UX', 'Admin Panel', 'Deployment']
      },
      {
        name: 'Standard',
        price: 19999,
        description: 'Business Solution',
        features: ['Advanced Features', 'Integrations', 'Reporting', 'Scalable Arch']
      },
      {
        name: 'Premium',
        price: 49999,
        description: 'Enterprise System',
        features: ['Full Digital Transformation', 'Legacy Migration', 'AI Integration', '24/7 Support']
      }
    ],
    portfolio: [],
    faq: []
  }
];

const initialState = {
  items: initialServices,
  filteredItems: initialServices,
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    filterServices: (state, action) => {
      const { searchTerm, category, priceRange } = action.payload;

      state.filteredItems = state.items.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || service.category === category;

        let matchesPrice = true;
        if (priceRange === 'low') matchesPrice = service.price < 1000;
        else if (priceRange === 'medium') matchesPrice = service.price >= 1000 && service.price < 2000;
        else if (priceRange === 'high') matchesPrice = service.price >= 2000;

        return matchesSearch && matchesCategory && matchesPrice;
      });
    },
  },
});

export const { filterServices } = servicesSlice.actions;

export const selectAllServices = (state) => state.services.items;
export const selectFilteredServices = (state) => state.services.filteredItems;
export const selectServiceById = (state, serviceId) =>
  state.services.items.find(service => service.id === serviceId);

export default servicesSlice.reducer;
