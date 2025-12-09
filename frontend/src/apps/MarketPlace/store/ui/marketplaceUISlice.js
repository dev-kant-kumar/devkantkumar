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
      { number: "100+", label: "Projects Delivered", icon: "Handshake" },
      { number: "50+", label: "Happy Clients", icon: "Users" },
      { number: "5+", label: "Years Experience", icon: "Settings" },
      { number: "10+", label: "Countries Served", icon: "Globe" }
    ],
    benefits: [
      {
        title: "Expert Team",
        desc: "Senior developers with 5+ years of experience"
      },
      {
        title: "Transparent Pricing",
        desc: "No hidden fees or surprise costs"
      },
      {
        title: "Agile Methodology",
        desc: "Regular updates and flexible iterations"
      },
      {
        title: "Full Ownership",
        desc: "You own 100% of the code and IP"
      }
    ],
    features: [
      {
        icon: "Shield",
        title: "Enterprise Security",
        desc: "Bank-grade security standards implemented in every project we deliver."
      },
      {
        icon: "Zap",
        title: "Lightning Fast",
        desc: "Optimized for performance. We build applications that load in milliseconds."
      },
      {
        icon: "TrendingUp",
        title: "Scalable Architecture",
        desc: "Built to grow with you. Our solutions handle millions of users effortlessly."
      }
    ],
    testimonials: [
      {
        id: 1,
        name: "Sarah Jenkins",
        role: "Freelance Developer",
        content: "The React Dashboard template saved me at least 40 hours of work. The code quality is top-notch and the documentation is super clear.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5
      },
      {
        id: 2,
        name: "Mike Ross",
        role: "Agency Owner",
        content: "We use the SEO plugin for all our client sites now. It's lightweight, effective, and the support team is incredibly responsive.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5
      },
      {
        id: 3,
        name: "Elena Rodriguez",
        role: "UI/UX Designer",
        content: "The icon pack is stunning. I love that it comes in so many formats. It's become my go-to resource for every new project.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5
      }
    ],
    faqs: [
      {
        question: "Can I use these products for client projects?",
        answer: "Yes! All our paid products come with a commercial license that allows you to use them in unlimited client projects. Free products may have different terms, please check the specific license."
      },
      {
        question: "Do I get free updates?",
        answer: "Absolutely. When you purchase a product, you get lifetime access to all future updates and improvements at no extra cost."
      },
      {
        question: "What is your refund policy?",
        answer: "We offer a 30-day money-back guarantee if the product doesn't work as described or has technical issues we can't resolve."
      },
      {
        question: "Is support included?",
        answer: "Yes, all premium products include 6 months of premium support. You can extend this support period if needed."
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
