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
  "/marketplace/products/templates": { title: "Website Templates" },
  "/marketplace/products/components": { title: "UI Components" },
  "/marketplace/products/tools": { title: "Developer Tools" },
  "/marketplace/products/courses": { title: "Educational Courses" },
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
