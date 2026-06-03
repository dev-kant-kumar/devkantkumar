import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";

const NotFound = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 relative overflow-hidden flex items-center justify-center flex-col select-none">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-10 rounded-3xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl text-center space-y-6 shadow-2xl shadow-cyan-500/5 hover:border-cyan-500/20 transition-all duration-300"
        >
          {/* Header Monospace tag */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
              <AlertCircle className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              ERROR // 404
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
            Page{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Not Found
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            The page you are looking for does not exist, or has been relocated
            to another address.
          </p>

          {/* Action button */}
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer group uppercase tracking-wider"
            >
              <span>Go to Home</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;