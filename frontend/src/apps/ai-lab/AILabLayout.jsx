import { Outlet } from "react-router-dom";
import Footer from "./common/components/Footer";
import Header from "./common/components/Header";
import "./common/styles/animations.css";
import "./common/styles/index.css";

const AILabLayout = () => {
  return (
    <div
      className="ai-lab-container min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        color: '#ffffff'
      }}
    >
      <Header />
      <main className="relative pt-20 min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AILabLayout;
