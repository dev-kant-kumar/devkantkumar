import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter, 
  Sparkles, 
  Clock, 
  Send, 
  CheckCircle2,
  Rocket
} from "lucide-react";
import toast from "react-hot-toast";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Target date for countdown (30 days from now)
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    // Target time set to 30 days from current date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitted(true);
    toast.success("Thank you! You'll be the first to know when we launch.");
    setEmail("");
  };

  return (
    <div className="relative min-h-screen bg-[#05070e] text-white flex flex-col justify-between overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Animated Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div 
          className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] animate-pulse" 
          style={{ animationDuration: "6s" }}
        />
        <div 
          className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] animate-pulse" 
          style={{ animationDuration: "8s" }}
        />
        {/* Subtle Radial Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      {/* Top Navbar Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-400">
            Dev Kant Kumar
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            ACTIVE
          </span>
        </div>

        <a
          href="mailto:hello@devkantkumar.com"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>Get in touch</span>
        </a>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs md:text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]"
        >
          <Sparkles className="w-4 h-4 animate-spin text-cyan-400" style={{ animationDuration: "8s" }} />
          <span>WE'RE BUILDING SOMETHING GREAT</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
        >
          Something <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500">Extraordinary</span> Is Coming Soon
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-normal leading-relaxed"
        >
          My website is currently undergoing a complete redesign. I am working on new features, high-performance web applications, and powerful AI tools to give you an unforgettable experience.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl mb-12"
        >
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINUTES", value: timeLeft.minutes },
            { label: "SECONDS", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <span className="text-2xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300 font-mono group-hover:scale-105 transition-transform duration-300">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider text-slate-500 font-semibold mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Subscription / Notify Me Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-md mb-16"
        >
          {!isSubmitted ? (
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm backdrop-blur-md"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer"
              >
                <span>Notify Me</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-3 backdrop-blur-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">You're on the list! We'll keep you updated.</span>
            </div>
          )}
        </motion.div>

        {/* Quick Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
        >
          <a
            href="mailto:hello@devkantkumar.com"
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-col items-start hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 text-left group"
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">EMAIL</span>
            <span className="text-sm font-semibold text-slate-200 mt-1 truncate w-full group-hover:text-cyan-400 transition-colors">
              hello@devkantkumar.com
            </span>
          </a>

          <a
            href="tel:+917294177563"
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-col items-start hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 text-left group"
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">PHONE</span>
            <span className="text-sm font-semibold text-slate-200 mt-1 group-hover:text-cyan-400 transition-colors">
              +91 7294177563
            </span>
          </a>

          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-col items-start hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 text-left group">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">LOCATION</span>
            <span className="text-sm font-semibold text-slate-200 mt-1 group-hover:text-cyan-400 transition-colors">
              Patna, Bihar, India
            </span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/60 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Dev Kant Kumar. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/devkantkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/devkantkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/devkantkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
            title="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
