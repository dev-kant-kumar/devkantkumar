import { motion } from 'framer-motion';
import {
    CheckCircle,
    Globe,
    Handshake,
    Settings,
    Users
} from 'lucide-react';
import { useSelector } from 'react-redux';

const iconMap = {
  Handshake,
  Users,
  Settings,
  Globe,
  CheckCircle
};

const WhyChooseUs = () => {
  const { trustData } = useSelector((state) => state.marketplaceUI);
  const { stats, benefits } = trustData || {};

  if (!stats || !benefits) return null;

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Text & Benefits */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              We don't just write code; we build business solutions. Our team of expert developers and consultants works closely with you to ensure your software drives real growth.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon] || Users;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
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
