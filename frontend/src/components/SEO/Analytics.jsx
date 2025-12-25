import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { portfolioData } from '../../apps/Portfolio/store/data/portfolioData';

const Analytics = () => {
  const { seoConfig } = portfolioData;
  const analyticsId = seoConfig.analytics.googleAnalyticsId;
  const location = useLocation();

  useEffect(() => {
    if (!analyticsId) return;

    // 1. Initialize Script if not present
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${analyticsId}"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', analyticsId);
      };
    }
  }, [analyticsId]);

  useEffect(() => {
    if (!analyticsId || !window.gtag) return;

    // 2. Track Page View on Route Change
    window.gtag('config', analyticsId, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location, analyticsId]);

  return null;
};

export default Analytics;
