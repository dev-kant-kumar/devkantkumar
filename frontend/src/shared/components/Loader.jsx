import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = ({
  size = "default",
  fullScreen = true,
  loadingText = "Loading",
}) => {
  const [dots, setDots] = useState("");

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Size configurations
  const sizeConfig = {
    small: {
      spinner: "w-8 h-8",
      border: "border-2",
      glow: "w-12 h-12",
      text: "text-xs mt-8",
    },
    default: {
      spinner: "w-12 h-12",
      border: "border-[3px]",
      glow: "w-16 h-16",
      text: "text-sm mt-10",
    },
    large: {
      spinner: "w-20 h-20",
      border: "border-4",
      glow: "w-24 h-24",
      text: "text-base mt-14",
    },
  };

  const config = sizeConfig[size];
  const containerClasses = fullScreen ? "fixed inset-0" : "w-full h-full";

  return (
    <div
      className={`${containerClasses} flex items-center justify-center bg-[#0a1628] z-50`}
    >
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Loader Container */}
      <div className="relative z-10">
        {/* Outer Rotating Ring */}
        <motion.div
          className={`absolute inset-0 ${config.spinner} -m-2`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-transparent border-t-cyan-500/30 border-r-purple-500/30" />
        </motion.div>

        {/* Middle Rotating Ring */}
        <motion.div
          className={`absolute inset-0 ${config.spinner} -m-1`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-transparent border-t-blue-500/40 border-l-purple-500/40" />
        </motion.div>

        {/* Primary Spinner */}
        <motion.div
          className={`relative ${config.spinner} ${config.border} rounded-full border-transparent`}
          style={{
            borderTopColor: "rgb(34, 211, 238)",
            borderRightColor: "rgb(168, 85, 247)",
            borderBottomColor: "rgb(59, 130, 246)",
            borderLeftColor: "transparent",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pulsing Glow Effect */}
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${config.glow} rounded-full`}
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Loading Text */}
        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 ${config.text} font-medium text-center whitespace-nowrap`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {loadingText}
          </span>
          <span className="text-cyan-400 inline-block w-6 text-left">
            {dots}
          </span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-800 rounded-full overflow-hidden ${
            config.text === "text-xs mt-8"
              ? "mt-12"
              : config.text === "text-sm mt-10"
              ? "mt-16"
              : "mt-20"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Orbiting Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-cyan-400"
            style={{
              transformOrigin: `${
                size === "small" ? 20 : size === "default" ? 30 : 50
              }px 0`,
            }}
            animate={{
              rotate: 360,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Particles Background */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
