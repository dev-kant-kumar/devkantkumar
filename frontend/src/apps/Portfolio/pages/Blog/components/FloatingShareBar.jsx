import { motion } from "framer-motion";
import { Facebook, Linkedin, Link as LinkIcon, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingShareBar = ({ title, url }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
    >
      <div className="flex flex-col gap-3 p-3 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl">
        <ShareButton
          icon={Twitter}
          label="Twitter"
          onClick={() => handleShare("twitter")}
          color="hover:text-sky-400 hover:bg-sky-400/10"
        />
        <ShareButton
          icon={Linkedin}
          label="LinkedIn"
          onClick={() => handleShare("linkedin")}
          color="hover:text-blue-500 hover:bg-blue-500/10"
        />
        <ShareButton
          icon={Facebook}
          label="Facebook"
          onClick={() => handleShare("facebook")}
          color="hover:text-blue-400 hover:bg-blue-400/10"
        />
        <div className="w-full h-px bg-slate-700/50 my-1" />
        <ShareButton
          icon={LinkIcon}
          label={copied ? "Copied!" : "Copy Link"}
          onClick={copyToClipboard}
          color={copied ? "text-green-400 bg-green-400/10" : "hover:text-cyan-400 hover:bg-cyan-400/10"}
        />
      </div>
    </motion.div>
  );
};

const ShareButton = ({ icon: Icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl text-slate-400 transition-all duration-200 group relative ${color}`}
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      {label}
    </span>
  </button>
);

export default FloatingShareBar;
