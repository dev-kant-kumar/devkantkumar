import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTrackHitMutation } from '../store/api/baseApi';

/**
 * Custom hook to track page views on route changes
 */
const usePageTracking = () => {
  const location = useLocation();
  const [trackHit] = useTrackHitMutation();

  useEffect(() => {
    // Determine the current path
    const path = location.pathname;

    // Don't track in development if needed, or track everything
    // For now, track everything to verify it works
    const track = async () => {
      try {
        await trackHit({
          path,
          referrer: document.referrer || 'direct'
        }).unwrap();
      } catch (error) {
        // Silent fail for analytics tracking
        console.error('Analytics tracking failed:', error);
      }
    };

    // Debounce or delay slightly to ensure page title is set if needed
    const timer = setTimeout(track, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, trackHit]);
};

export default usePageTracking;
