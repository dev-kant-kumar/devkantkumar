import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  selectedCategory: 'all',
  priceRange: 'all',
  sortBy: 'relevance',
  viewMode: 'grid', // 'grid' or 'list'
  isFilterOpen: false, // for mobile
  trustData: {
    stats: [
      { number: "Instant", label: "Digital Delivery", icon: "Download" },
      { number: "Secure", label: "Payment Gateway", icon: "ShieldCheck" },
      { number: "Quality", label: "Products", icon: "Star" },
      { number: "Direct", label: "Developer Support", icon: "Headset" }
    ],
    benefits: [
      {
        title: "Full Stack Expertise",
        desc: "Professional web and app development services"
      },
      {
        title: "Transparent Pricing",
        desc: "No hidden fees, clear pricing upfront"
      },
      {
        title: "Direct Communication",
        desc: "Work directly with the developer"
      },
      {
        title: "Full Ownership",
        desc: "You own 100% of the deliverables"
      }
    ],
    features: [
      {
        icon: "Shield",
        title: "Secure Transactions",
        desc: "All payments processed through Razorpay with bank-grade security."
      },
      {
        icon: "Zap",
        title: "Instant Delivery",
        desc: "Digital products available for immediate download after purchase."
      },
      {
        icon: "TrendingUp",
        title: "Quality Assured",
        desc: "Every product and service is carefully crafted to meet high standards."
      }
    ],
    testimonials: [],
    faqs: [
      {
        question: "Can I use these products for client projects?",
        answer: "Yes! All our paid products come with a commercial license that allows you to use them in client projects. Please check the specific license terms for each product."
      },
      {
        question: "Do I get updates?",
        answer: "Yes, when you purchase a product, you receive updates as they become available. Check individual product pages for specific update policies."
      },
      {
        question: "What is your refund policy?",
        answer: "We offer a 14-day refund policy for digital products if the product is technically defective, doesn't work as described, or you haven't downloaded it. Refunds are processed on a case-by-case basis."
      },
      {
        question: "Is support included?",
        answer: "Yes, all premium products include 6 months of email support for technical issues and questions about using the product."
      }
    ]
  }
};

const marketplaceUISlice = createSlice({
  name: 'marketplaceUI',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    toggleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.priceRange = 'all';
      state.sortBy = 'relevance';
    },
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setPriceRange,
  setSortBy,
  setViewMode,
  toggleFilter,
  resetFilters,
} = marketplaceUISlice.actions;

export default marketplaceUISlice.reducer;
