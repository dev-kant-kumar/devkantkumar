import React, { useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { portfolioData } from '../../apps/Portfolio/store/data/portfolioData';

const Analytics = ({ trackingId }) => {
  const { seoConfig } = portfolioData;
  const analyticsId = trackingId || seoConfig.analytics.googleAnalyticsId;

  useEffect(() => {
    // Initialize Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', analyticsId, {
        page_title: document.title,
        page_location: window.location.href
      });
    };

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, [analyticsId]);

  return null;
};

export default Analytics;
