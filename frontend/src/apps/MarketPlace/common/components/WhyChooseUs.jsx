import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Globe,
    Handshake,
    Settings,
    Users,
    Download,
    ShieldCheck,
    Star,
    Headset,
    Calendar,
    Sparkles,
    Zap,
    Award,
    Code2
} from 'lucide-react';
import { useSelector } from 'react-redux';

const iconMap = {
  Handshake,
  Users,
  Settings,
  Globe,
  CheckCircle2,
  Download,
  ShieldCheck,
  Star,
  Headset
};

const WhyChooseUs = () => {
  const { trustData } = useSelector((state) => state.marketplaceUI);
  const { stats, benefits } = trustData || {};

  if (!stats || !benefits) return null;

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side: Text & Benefits */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-emerald-500/10">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                TRUSTED BY 1,000+ DEVELOPERS & STUDENTS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                Why Partner With <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
                  Dev Kant Kumar?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
                We don't just sell templates or write code — we deliver end-to-end production solutions, verified study materials, and direct developer collaboration.
              </p>
            </motion.div>

            {/* Benefit Feature Cards */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Glassmorphism Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon] || Users;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-7 rounded-3xl hover:border-emerald-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xs">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
