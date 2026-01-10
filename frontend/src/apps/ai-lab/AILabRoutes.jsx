import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AILabLayout from './AILabLayout';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home/Home'));
const Sessions = React.lazy(() => import('./pages/Sessions/Sessions'));
const SessionDetail = React.lazy(() => import('./pages/Sessions/SessionDetail'));
const Quiz = React.lazy(() => import('./pages/Quiz/Quiz'));
const QuizDetail = React.lazy(() => import('./pages/Quiz/QuizDetail'));
const Resources = React.lazy(() => import('./pages/Resources/Resources'));

// Simple loader component
const Loader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#0f172a',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '3px solid rgba(168, 85, 247, 0.2)',
      borderTopColor: '#a855f7',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const AILabRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AILabLayout />}>
          <Route index element={<Home />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="sessions/:sessionId" element={<SessionDetail />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quiz/:quizId" element={<QuizDetail />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AILabRoutes;
