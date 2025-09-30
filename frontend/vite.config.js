import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Ensure static files are served properly
    fs: {
      strict: false
    },
    // Configure middleware for proper MIME types
    middlewareMode: false,
    // Add headers for XML files
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  // Configure asset handling
  assetsInclude: ['**/*.xml'],
  // Add plugin to handle XML files properly
  configureServer(server) {
    server.middlewares.use('/sitemap.xml', (req, res, next) => {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      next();
    });
    server.middlewares.use('/robots.txt', (req, res, next) => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      next();
    });
  }
});
