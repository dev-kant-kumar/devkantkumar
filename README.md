<div align="center">

# 🚀 Dev Kant Kumar - Full-Stack Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://devkantkumar.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)

**A full-stack platform featuring a Portfolio, Digital Marketplace, and Admin Panel - built with modern React and Node.js.**

[View Live](https://devkantkumar.com) · [Report Bug](https://github.com/Dev-Kant-Kumar/devkantkumar/issues) · [Request Feature](https://github.com/Dev-Kant-Kumar/devkantkumar/issues)

</div>

---

## 🏗️ Platform Overview

This monorepo contains **3 interconnected applications**:

| App | Description | Status |
|-----|-------------|--------|
| 🎨 **Portfolio** | Personal portfolio with blog, 3D animations, AI tools directory | ✅ Live |
| 🛒 **MarketPlace** | Digital products & services marketplace with cart, checkout, invoicing | ✅ Live |
| ⚙️ **AdminPanel** | Dashboard for managing products, orders, users, and content | ✅ Live |

---

## ✨ Features

### 🎨 Portfolio
- **Premium Dark Theme** with glassmorphism design
- **3D Animations** using Three.js & React Three Fiber
- **Blog Platform** with MDX, Giscus comments, RSS feed
- **AI Tools Directory** - 86+ curated AI tools with filtering
- **SEO Optimized** with prerendering & structured data

### 🛒 MarketPlace
- **Digital Products Catalog** - Browse and purchase digital goods
- **Services Section** - Custom development services
- **Shopping Cart** - Persistent cart functionality
- **Checkout Flow** - Secure payment processing
- **Client Dashboard** - Order history, downloads, profile
- **Invoice Generation** - Automated invoice creation
- **Support System** - FAQ, contact, and support tickets

### ⚙️ AdminPanel
- **Dashboard Analytics** - Sales, users, orders overview
- **Product Management** - CRUD for digital products
- **Order Management** - Process and track orders
- **User Management** - Admin user controls
- **Content Management** - Blog posts, pages

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, Vite, TailwindCSS 4 |
| **3D/Graphics** | Three.js, React Three Fiber, GSAP |
| **Animation** | Framer Motion, Lottie |
| **State** | Redux Toolkit |
| **Icons** | Lucide React, Simple Icons, React Icons |
| **Backend** | Node.js, Express |
| **SEO** | React Helmet, Puppeteer Prerendering |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Dev-Kant-Kumar/devkantkumar.git
cd devkantkumar

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev           # Start dev server (all apps)

# Production
npm run build         # Build for production
npm run preview       # Preview production build

# Utilities
npm run lint          # Run ESLint
npm run generate-rss  # Generate RSS feed for blog
npm run prerender     # Prerender pages for SEO
```

---

## 📁 Project Structure

```
devkantkumar/
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── apps/
│   │   │   ├── Portfolio/      # 🎨 Portfolio App
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Blog/   # Blog system
│   │   │   │   │   ├── Home/   # Landing page
│   │   │   │   │   └── ...
│   │   │   │   └── components/
│   │   │   │
│   │   │   ├── MarketPlace/    # 🛒 Marketplace App
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Home/
│   │   │   │   │   ├── DigitalProducts/
│   │   │   │   │   ├── Services/
│   │   │   │   │   ├── Cart/
│   │   │   │   │   ├── Checkout/
│   │   │   │   │   ├── ClientDashboard/
│   │   │   │   │   ├── Invoice/
│   │   │   │   │   └── ...
│   │   │   │   ├── common/     # Shared components
│   │   │   │   ├── store/      # Redux store
│   │   │   │   └── utils/
│   │   │   │
│   │   │   └── AdminPanel/     # ⚙️ Admin App
│   │   │       ├── pages/
│   │   │       ├── components/
│   │   │       └── store/
│   │   │
│   │   ├── utils/              # Global utilities
│   │   └── styles/             # Global styles
│   │
│   └── package.json
│
├── backend/                    # API Server
│   └── ...
│
├── docs/                       # Documentation
│   ├── SRS.md                  # Software Requirements
│   └── PortfolioSRS.md
│
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

---

## � App Routes

### Portfolio (`/`)
| Route | Description |
|-------|-------------|
| `/` | Home / Landing |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog post |
| `/projects` | Projects showcase |
| `/contact` | Contact form |

### MarketPlace (`/marketplace`)
| Route | Description |
|-------|-------------|
| `/marketplace` | Marketplace home |
| `/marketplace/products` | Digital products |
| `/marketplace/services` | Services catalog |
| `/marketplace/cart` | Shopping cart |
| `/marketplace/checkout` | Checkout flow |
| `/marketplace/dashboard` | Client dashboard |
| `/marketplace/orders` | Order history |

### AdminPanel (`/admin`)
| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard |
| `/admin/products` | Manage products |
| `/admin/orders` | Manage orders |
| `/admin/users` | User management |

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Contact

**Dev Kant Kumar**

- 🌐 Website: [devkantkumar.com](https://devkantkumar.com)
- 💼 LinkedIn: [Dev Kant Kumar](https://linkedin.com/in/devkantkumar)
- 🐙 GitHub: [@Dev-Kant-Kumar](https://github.com/Dev-Kant-Kumar)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Dev Kant Kumar](https://devkantkumar.com)

</div>
