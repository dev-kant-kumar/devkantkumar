import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import MarketPlaceSEO from "./MarketPlaceSEO";

const routeSeoMap = {
  "/marketplace": {
    title: "Premium React Templates & Dev Services",
    description:
      "Buy premium React templates, Next.js boilerplates, MERN stack kits, and hire a full-stack developer. Instant digital download.",
  },
  "/marketplace/services": {
    title: "Development & Design Services",
    description:
      "Hire world-class developers and designers for your next project. Custom web development, APIs, SaaS, and more.",
  },
  "/marketplace/products": {
    title: "Premium Digital Products & Templates",
    description:
      "Save hundreds of hours with our premium web templates, UI components, and software solutions.",
  },
  "/marketplace/products/templates": {
    title: "Premium Website Templates | React, Next.js & HTML",
    description:
      "Buy production-ready website templates built with React, Next.js, and Tailwind CSS. Instantly downloadable, fully customizable. Starting from ₹999.",
  },
  "/marketplace/products/components": {
    title: "React UI Components & Libraries | Ready-to-Use",
    description:
      "Drop-in React UI components, design systems, and component libraries. Save development time with production-ready code.",
  },
  "/marketplace/products/tools": {
    title: "Developer Tools & Utilities | Productivity Boosters",
    description:
      "Premium developer tools, CLI utilities, and productivity scripts to speed up your workflow. Instant download.",
  },
  "/marketplace/products/courses": {
    title: "Web Development Courses | React, MERN & Full Stack",
    description:
      "Learn React, Node.js, MongoDB, and full-stack web development with project-based online courses. One-time purchase, lifetime access.",
  },
  "/marketplace/products/notes": {
    title: "Study Notes & Developer Reference Guides | Buy & Download",
    description:
      "Download concise, well-structured study notes and developer reference guides for React, JavaScript, DSA, system design, and more. Instant access.",
  },
  "/marketplace/products/ebooks": {
    title: "Programming eBooks | React, JavaScript & Web Dev",
    description:
      "Buy premium programming eBooks on React, JavaScript, Node.js, and web development. Deep-dive guides written by experienced developers.",
  },
  "/marketplace/products/themes": {
    title: "Premium UI Themes | Dark & Light Design Systems",
    description:
      "Professional dark and light UI themes for React and Next.js. Beautiful design systems with instant download and free updates.",
  },
  "/marketplace/products/plugins": {
    title: "React Plugins & Extensions | Ready-to-Use Code Packages",
    description:
      "Drop-in React plugins for auth, payments, charts, and tables. Save weeks of development with our battle-tested packages.",
  },
  "/marketplace/products/graphics": {
    title: "Digital Graphics & Design Assets | SVG & Illustrations",
    description:
      "Download premium SVG illustrations, icon sets, and UI graphics for your web projects. Commercial license included.",
  },
  "/marketplace/products/fonts": {
    title: "Premium Web Fonts & Typography Kits",
    description:
      "Download premium web font bundles and typography kits optimized for React and Next.js. Commercial-use license included.",
  },
  "/marketplace/custom-solutions": {
    title: "Request Custom Solutions",
    description:
      "Need something specific? Request custom web development, mobile apps, or enterprise solutions.",
  },
  "/marketplace/support": { title: "Support & Help Center" },
  "/marketplace/cart": { title: "Shopping Cart" },
  "/marketplace/checkout": { title: "Secure Checkout" },
  "/marketplace/dashboard": { title: "Client Dashboard Overview" },
  "/marketplace/dashboard/orders": { title: "My Orders" },
  "/marketplace/dashboard/services": { title: "Active Services" },
  "/marketplace/dashboard/products": { title: "Purchased Products" },
  "/marketplace/dashboard/notifications": { title: "Notifications" },
  "/marketplace/dashboard/support": { title: "My Support Tickets" },
  "/marketplace/dashboard/billing": { title: "Billing & Invoices" },
  "/marketplace/dashboard/referral": { title: "Referral Program" },
  "/marketplace/dashboard/settings": { title: "Account Settings" },
  "/marketplace/dashboard/wishlist": { title: "My Wishlist" },
  "/marketplace/auth/signin": { title: "Sign In to MarketPlace" },
  "/marketplace/auth/signup": { title: "Create an Account" },
  "/marketplace/docs": { title: "Documentation" },
  "/marketplace/faq": { title: "Frequently Asked Questions" },
  "/marketplace/contact": { title: "Contact Us" },
  "/marketplace/terms": { title: "Terms of Service" },
  "/marketplace/privacy": { title: "Privacy Policy" },
  "/marketplace/refunds": { title: "Refund Policy" },
  "/marketplace/license": { title: "Licensing Information" },
  "/marketplace/tutorials": { title: "Tutorials & Guides" },
  "/marketplace/kb": { title: "Knowledge Base" },
  "/marketplace/community": { title: "Community Forum" },
};

const formatPathName = (path) => {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return "MarketPlace";

  // If it's a deep dynamic route like /products/123, try to find a base mapping or just use "Product Details"
  if (path.includes("/products/") && parts.length > 2) return "Product Details";
  if (path.includes("/services/") && parts.length > 2) return "Service Details";
  if (path.includes("/dashboard/orders/") && parts.length > 3)
    return "Invoice Details";

  const lastPart = parts[parts.length - 1];
  return lastPart
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const MarketPlaceSEOManager = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase().replace(/\/$/, ""); // Remove trailing slash

  const seoData = useMemo(() => {
    // 1. Check exact match
    if (routeSeoMap[path]) {
      return routeSeoMap[path];
    }

    // 2. Identify parameterized routes
    if (path.match(/\/marketplace\/products\/[a-f0-9]+$/)) {
      return { title: "Product Details" }; // Handled deeper inside ProductDetail.jsx ideally
    }

    if (path.match(/\/marketplace\/services\/[a-f0-9]+$/)) {
      return { title: "Service Details" };
    }

    // 3. Fallback formatting
    return {
      title: formatPathName(path),
    };
  }, [path]);

  // Because react-helmet puts deeper nested <Helmet> tags at higher priority,
  // this top-level SEOManager will provide the fallback/default title for any route that
  // doesn't explicitly render its own <MarketPlaceSEO>!
  return (
    <MarketPlaceSEO
      title={seoData.title}
      description={seoData.description}
      url={`https://www.devkantkumar.com${path}`}
    />
  );
};

export default MarketPlaceSEOManager;
