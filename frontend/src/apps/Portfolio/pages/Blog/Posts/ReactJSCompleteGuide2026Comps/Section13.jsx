import React from "react";
import { HelpCircle as QuestionIcon, Compass } from "lucide-react";
import { CodeBlock, InfoBox } from "./Shared";

const Section13 = () => {
  return (
    <section id="react-router" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
        <Compass size={32} className="text-orange-500" />
        Section 13: React Router
      </h2>
      <p className="text-slate-400 mb-6">Target Keyword: <strong>react router v6 tutorial 2026</strong></p>

      <div className="prose prose-xl prose-invert max-w-none text-slate-300">
        <p className="text-lg leading-relaxed mb-6">
          Routing in Single Page Applications (SPAs) intercept browser navigation to dynamically update parts of the layout, preventing full page reloads and providing instant navigations.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Code Examples</h3>
        <CodeBlock
          language="jsx"
          filename="RoutingSetup.jsx"
          code={`// React Router v6 setup with layouts and dynamic routes
import { BrowserRouter, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';

const AppLayout = () => (
  <div>
    <nav className="flex gap-4 p-4 border-b">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </nav>
    <main className="p-6">
      {/* Outlet renders matched child route components */}
      <Outlet />
    </main>
  </div>
);

const ProductDetail = () => {
  const { productId } = useParams(); // Reading dynamic slug
  return <h2>Showing Product: {productId}</h2>;
};

const RootRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<h1>Home Page</h1>} />
        <Route path="products/:productId" element={<ProductDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);`}
        />

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
          <QuestionIcon size={24} className="text-orange-400" />
          🎯 Section 13 Interview Questions (10+)
        </h3>

        <div className="space-y-6">
          {[
            {
              q: "1. What is client-side routing and how does it implement it?",
              a: "Client-side routing changes the active viewport content without sending an HTTP document request back to the server. It uses the History API to sync URLs with local application state."
            },
            {
              q: "2. What are the main components of React Router v6?",
              a: "Components: BrowserRouter (context provider), Routes (parent switch block), Route (maps path to element), Link/NavLink (navigation buttons), and Outlet (layout placeholder)."
            },
            {
              q: "3. What is the difference between Link and a in React?",
              a: "a tags perform a full browser page refresh. Link intercepts navigation, updating the history stack and DOM rendering inline while keeping application state intact."
            },
            {
              q: "4. How do you access URL parameters in React Router v6?",
              a: "Use the useParams() hook, which returns a key-value object of dynamic URL tokens defined in Route paths (e.g., :productId)."
            },
            {
              q: "5. What is useNavigate and how does it differ from Redirect?",
              a: "useNavigate() is a hook returning a function that lets you navigate programmatically in JavaScript. Redirect was a component used in v5 to declare redirections; v6 replaces it with <Navigate to='...' />."
            },
            {
              q: "6. How do you implement a protected route?",
              a: "Create a wrapper component that checks user credentials. If authentication passes, render the child Outlet; otherwise, redirect using <Navigate to='/login' replace />."
            },
            {
              q: "7. What is useLocation and what information does it provide?",
              a: "useLocation() returns an object representing the current URL path location, including pathname, search (query params), hash, and navigation state."
            },
            {
              q: "8. What is the difference between BrowserRouter and HashRouter?",
              a: "BrowserRouter uses standard paths (e.g., /dashboard) and requires server rewrite support. HashRouter appends hashes (e.g., #/dashboard) and doesn't require server rewrites because the hash is never sent to the server."
            },
            {
              q: "9. How do you implement nested routes in React Router v6?",
              a: "By nesting Route tags inside Route tags, and rendering the <Outlet /> component inside the parent Route element to specify where the child components should render."
            },
            {
              q: "10. How do you handle 404 pages in React Router?",
              a: "By placing a catch-all route at the bottom of the Routes list: <Route path='*' element={<NotFound />} />."
            },
            {
              q: "11. How do you pass state via navigation in React Router?",
              a: "Pass state objects inside the navigate function options: navigate('/path', { state: { from: 'dashboard' } }). Retrieve it on the destination page using useLocation().state."
            },
            {
              q: "12. What is lazy loading of routes and how do you implement it?",
              a: "Lazy loading splits route bundles so code is only requested when users navigate to that route. Implement it using React.lazy() with React Suspense fallback components wrapping Route elements."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <h4 className="font-bold text-white text-lg mb-2">{item.q}</h4>
              <p className="text-slate-300 pl-4 border-l border-orange-500/30">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section13;