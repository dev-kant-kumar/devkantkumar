import {
  AlertCircle,
  CheckCircle,
  GitBranch,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden flex items-center justify-center">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Floating Git Symbols */}
      <div className="absolute top-12 left-12 animate-float">
        <GitBranch className="text-cyan-400/40" size={48} />
      </div>
      <div
        className="absolute top-24 right-24 animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <Terminal className="text-purple-400/40" size={40} />
      </div>
      <div
        className="absolute bottom-16 left-32 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Zap className="text-yellow-400/40" size={36} />
      </div>
      <div
        className="absolute bottom-24 right-16 animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        <AlertCircle className="text-red-400/40" size={44} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6 mt-10 animate-bounce-slow shadow-2xl shadow-yellow-500/50">
          <Zap className="text-slate-900" size={20} />
          <span className="text-slate-900 font-black text-sm tracking-wide">
            BATTLE-TESTED BY 10,000+ DEVELOPERS
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-7xl font-black text-white mb-4 leading-tight tracking-tight">
          <span className="inline-block animate-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Git Commands
          </span>
          <br />
          <span className="text-white">Survival Guide</span>
        </h1>

        {/* Subheadline */}
        <p className="text-3xl text-cyan-300 font-bold mb-8 animate-fade-in">
          Real Problems. Real Solutions. Zero BS.
        </p>

        {/* Problem Statement Box */}
        <div className="max-w-3xl mx-auto bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-6 mb-8 backdrop-blur-sm shadow-2xl shadow-red-500/20 animate-slide-up">
          <div className="flex items-start gap-4">
            <AlertCircle
              className="text-red-400 flex-shrink-0 mt-1"
              size={32}
            />
            <div className="text-left">
              <p className="text-red-200 text-lg font-semibold mb-2">
                "I just committed to the wrong branch... again. 😱"
              </p>
              <p className="text-red-300/80 text-sm">
                Sound familiar? Every developer has Googled "git undo commit" at
                2 AM.
              </p>
            </div>
          </div>
        </div>

        {/* Solution Highlight */}
        <div
          className="max-w-3xl mx-auto bg-green-900/30 border-2 border-green-500/50 rounded-2xl p-6 mb-8 backdrop-blur-sm shadow-2xl shadow-green-500/20 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-start gap-4">
            <CheckCircle
              className="text-green-400 flex-shrink-0 mt-1"
              size={32}
            />
            <div className="text-left">
              <p className="text-green-200 text-lg font-semibold mb-2">
                12 Real Scenarios. Instant Copy-Paste Solutions. ✨
              </p>
              <p className="text-green-300/80 text-sm">
                No more 20-minute Google sessions. Get the exact commands you
                need.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className="flex justify-center gap-8 mb-8 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-center bg-slate-900/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-cyan-500/30">
            <div className="text-4xl font-black text-cyan-400 mb-1">12</div>
            <div className="text-gray-300 text-sm font-semibold">
              Common Scenarios
            </div>
          </div>
          <div className="text-center bg-slate-900/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-purple-500/30">
            <div className="text-4xl font-black text-purple-400 mb-1">50+</div>
            <div className="text-gray-300 text-sm font-semibold">
              Commands Covered
            </div>
          </div>
          <div className="text-center bg-slate-900/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-yellow-500/30">
            <div className="text-4xl font-black text-yellow-400 mb-1">∞</div>
            <div className="text-gray-300 text-sm font-semibold">
              Headaches Saved
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-8 animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold border border-cyan-500/30">
            🔍 Interactive Search
          </span>
          <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/30">
            📋 One-Click Copy
          </span>
          <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold border border-green-500/30">
            ✅ Pro Tips Included
          </span>
          <span className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold border border-yellow-500/30">
            🚀 Scenario-Based
          </span>
        </div>

        {/* Bottom CTA */}
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-white text-lg shadow-2xl shadow-cyan-500/50 animate-pulse-slow">
          <Terminal size={24} />
          <span>Stop Googling. Start Solving.</span>
          <TrendingUp size={24} />
        </div>

        {/* Social Proof Badge */}
        <div
          className="flex mt-6 items-center justify-center gap-2 text-gray-400 text-sm animate-fade-in mb-15"
          style={{ animationDelay: "1s" }}
        >
          <Users size={16} />
          <span>Join thousands of developers who bookmarked this</span>
        </div>

        {/* Creator badge (PDF-friendly) */}
        <div className="relative z-10 max-w-5xl mx-auto px-8 mt-6 mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold">
            <span>Created by Dev Kant Kumar</span>
            <a
              href="https://devkantkumar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline"
            >
              devkantkumar.com
            </a>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-cyan-500/50 rounded-tl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-purple-500/50 rounded-br-3xl"></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
