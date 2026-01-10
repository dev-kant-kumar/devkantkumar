// DailySessions Index - Auto-exports all sessions
// Just create a new file in this folder and import it here!

// Import session files
import Session1 from './Session1';

// Export all sessions as an array
const allSessions = [
  Session1,
];

// Sort sessions by order
export const sessions = allSessions.sort((a, b) => {
  if (a.order && b.order) return a.order - b.order;
  if (a.date && b.date) return new Date(a.date) - new Date(b.date);
  return 0;
});

export const getSessionCount = () => sessions.length;
export const getSessionBySlug = (slug) => sessions.find(s => s.slug === slug);
