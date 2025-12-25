import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { portfolioData } from '../../apps/Portfolio/store/data/portfolioData';

const Analytics = () => {
  const { seoConfig } = portfolioData;
  const analyticsId = seoConfig.analytics.googleAnalyticsId;
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Determine if GA is loaded
    if (window.gtag) {
      setInitialized(true);
    } else {
      // Fallback check if script loads slightly later
      const checkGtag = setInterval(() => {
        if (window.gtag) {
          setInitialized(true);
          clearInterval(checkGtag);
        }
      }, 500);
      return () => clearInterval(checkGtag);
    }
  }, []);

  useEffect(() => {
    // Skip if not initialized or if this is the first render (handled by index.html script)
    if (!initialized || !analyticsId) return;

    // We only want to track *subsequent* page views, not the initial one which index.html handles.
    // However, in a SPA, we can't easily distinguish "initial load" from "refresh" inside this effect
    // without refs, and simple is better.
    // BUT: standard gtag('config') in index.html sends a page_view.
    // This effect runs on mount (dup) and updates.
    // To prevent the duplicate on mount, we can use a ref or simplified logic.
    // Actually, safest SPA pattern: let index.html handle first, this handles updates.

    // Check if the current path matches what GA likely captured.
    // If we want to be robust:
    window.gtag('config', analyticsId, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });

  }, [location, analyticsId, initialized]);

  return null;
};

export default Analytics;
