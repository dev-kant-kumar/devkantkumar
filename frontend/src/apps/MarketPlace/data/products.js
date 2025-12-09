import iconPack from '../pages/DigitalProducts/Assets/Images/icon_pack.png';
import modernFont from '../pages/DigitalProducts/Assets/Images/modern_font.png';
import reactDashboard from '../pages/DigitalProducts/Assets/Images/react_dashboard.png';
import seoPlugin from '../pages/DigitalProducts/Assets/Images/seo_plugin.png';
import webDevCourse from '../pages/DigitalProducts/Assets/Images/web_dev_course.png';
import wordpressTheme from '../pages/DigitalProducts/Assets/Images/wordpress_theme.png';

export const products = [
  {
    id: 'react-dashboard',
    title: 'Modern React Dashboard Template',
    description: 'Complete admin dashboard template with React, TypeScript, and Tailwind CSS',
    longDescription: 'A comprehensive React admin dashboard template built with modern technologies. Features include user management, analytics, charts, tables, forms, and much more. Perfect for building admin panels, CRM systems, and business applications.',
    image: reactDashboard,
    price: 49,
    originalPrice: 79,
    rating: 4.9,
    reviews: 234,
    downloads: 1250,
    category: 'templates',
    tags: ['React', 'TypeScript', 'Dashboard', 'Admin'],
    features: ['Responsive Design', 'Dark Mode', '20+ Components', 'TypeScript Support', 'Authentication System', 'Charts & Analytics'],
    preview: '/api/placeholder/800/600',
    files: ['Source Code', 'Documentation', 'PSD Files'],
    isPopular: true,
    specifications: {
      'Framework': 'React 18',
      'Language': 'TypeScript',
      'Styling': 'Tailwind CSS',
      'Charts': 'Chart.js',
      'Build Tool': 'Vite',
    },
    includes: [
      'Source Code',
      'Documentation',
      'Design Files (Figma)',
      'Lifetime Updates'
    ],
    changelog: [
      {
        version: '2.1.0',
        date: '2024-01-15',
        changes: ['Added new dashboard layouts', 'Improved mobile responsiveness']
      }
    ]
  },
  {
    id: 'ecommerce-theme',
    title: 'E-commerce WordPress Theme',
    description: 'Professional e-commerce theme for WordPress with WooCommerce integration',
    longDescription: 'Boost your online store with this high-performance WordPress theme. Designed for conversion, it features a clean layout, fast loading times, and seamless WooCommerce integration.',
    image: wordpressTheme,
    price: 69,
    originalPrice: 99,
    rating: 4.8,
    reviews: 189,
    downloads: 890,
    category: 'themes',
    tags: ['WordPress', 'WooCommerce', 'E-commerce', 'Responsive'],
    features: ['WooCommerce Ready', 'Mobile Responsive', 'SEO Optimized', 'One-Click Demo', 'Mega Menu', 'Product Filters'],
    preview: '/api/placeholder/800/600',
    files: ['Theme Files', 'Documentation', 'Demo Content'],
    isPopular: true,
    specifications: {
      'Platform': 'WordPress 6.x',
      'Compatible': 'WooCommerce 8.x',
      'Builder': 'Elementor',
      'Responsive': 'Yes'
    },
    includes: [
      'Theme Files',
      'Child Theme',
      'Documentation',
      '6 Months Support'
    ],
    changelog: []
  },
  {
    id: 'seo-plugin',
    title: 'Advanced SEO Plugin',
    description: 'Powerful SEO plugin to boost your website rankings and performance',
    longDescription: 'Take control of your website SEO with this all-in-one plugin. Features include automatic sitemap generation, meta tag optimization, social media previews, and advanced analytics integration.',
    image: seoPlugin,
    price: 29,
    originalPrice: 49,
    rating: 4.7,
    reviews: 156,
    downloads: 2100,
    category: 'plugins',
    tags: ['SEO', 'WordPress', 'Analytics', 'Performance'],
    features: ['Schema Markup', 'XML Sitemaps', 'Meta Optimization', 'Analytics Integration', 'Redirect Manager', '404 Monitor'],
    preview: '/api/placeholder/800/600',
    files: ['Plugin Files', 'User Guide', 'Video Tutorials'],
    specifications: {
      'Platform': 'WordPress',
      'Version': '3.5.2',
      'PHP Version': '7.4+'
    },
    includes: [
      'Plugin Zip File',
      'License Key',
      'User Manual'
    ],
    changelog: []
  },
  {
    id: 'icon-pack',
    title: 'Premium Icon Pack - 500+ Icons',
    description: 'High-quality vector icons for web and mobile applications',
    longDescription: 'A versatile collection of 500+ pixel-perfect icons. Available in multiple formats (SVG, PNG, AI) and styles (Outline, Filled, Duotone). Perfect for any design project.',
    image: iconPack,
    price: 19,
    originalPrice: 35,
    rating: 4.6,
    reviews: 89,
    downloads: 1680,
    category: 'graphics',
    tags: ['Icons', 'Vector', 'SVG', 'UI'],
    features: ['500+ Icons', 'Multiple Formats', 'Scalable Vector', 'Commercial License', 'Figma File Included'],
    preview: '/api/placeholder/800/600',
    files: ['SVG Files', 'PNG Files', 'Icon Font', 'License'],
    specifications: {
      'Formats': 'SVG, PNG, AI, EPS',
      'Grid Size': '24px',
      'Styles': 'Outline, Filled'
    },
    includes: [
      'All Source Files',
      'IconJar File',
      'PDF Catalog'
    ],
    changelog: []
  },
  {
    id: 'web-dev-course',
    title: 'Complete Web Development Course',
    description: 'Learn modern web development from scratch to advanced level',
    longDescription: 'Master full-stack web development with this comprehensive course. Covers HTML, CSS, JavaScript, React, Node.js, and Database management. Includes real-world projects and certification.',
    image: webDevCourse,
    price: 0,
    originalPrice: 199,
    rating: 4.9,
    reviews: 567,
    downloads: 3200,
    category: 'courses',
    tags: ['Education', 'Web Development', 'JavaScript', 'React'],
    features: ['40+ Hours Content', 'Project-Based Learning', 'Certificate', 'Lifetime Access', 'Q&A Support', 'Source Code'],
    preview: '/api/placeholder/800/600',
    files: ['Video Lessons', 'Source Code', 'Resources', 'Certificate'],
    isPopular: true,
    specifications: {
      'Duration': '42 Hours',
      'Level': 'Beginner to Advanced',
      'Language': 'English'
    },
    includes: [
      'HD Video Lectures',
      'Project Files',
      'Cheatsheets',
      'Certificate of Completion'
    ],
    changelog: []
  },
  {
    id: 'modern-font',
    title: 'Modern Sans Serif Font Family',
    description: 'Professional font family with multiple weights and styles',
    longDescription: 'A clean and modern sans-serif font family designed for readability and versatility. Includes 8 weights from Thin to Black, plus matching italics. Ideal for branding, UI design, and editorial use.',
    image: modernFont,
    price: 39,
    originalPrice: 59,
    rating: 4.8,
    reviews: 78,
    downloads: 456,
    category: 'fonts',
    tags: ['Typography', 'Font', 'Sans Serif', 'Modern'],
    features: ['8 Weights', 'Italic Styles', 'Web Fonts', 'Commercial License', 'Multilingual Support', 'Ligatures'],
    preview: '/api/placeholder/800/600',
    files: ['OTF Files', 'TTF Files', 'Web Fonts', 'License'],
    specifications: {
      'Weights': '8 (Thin to Black)',
      'Format': 'OTF, TTF, WOFF, WOFF2',
      'Glyphs': '450+'
    },
    includes: [
      'Desktop Fonts',
      'Web Fonts',
      'Commercial License'
    ],
    changelog: []
  }
];
