import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { portfolioData } from '../../apps/Portfolio/store/data/portfolioData';

const Analytics = () => {
  const { seoConfig } = portfolioData;
  const analyticsId = seoConfig.analytics.googleAnalyticsId;
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  // Track whether the initial page load has been handled (by index.html gtag config)
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Determine if GA is loaded; index.html defines window.gtag synchronously
    // so this should be true immediately on first check.
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
    if (!initialized || !analyticsId) return;

    // Skip the first trigger caused by `initialized` changing to true.
    // The initial page_view is already sent by the inline gtag script in index.html.
    // Only subsequent SPA navigation should send additional page_view events.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.gtag('config', analyticsId, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });

  }, [location, analyticsId, initialized]);

  return null;
};

export default Analytics;
