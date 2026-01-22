import { motion } from 'framer-motion';
import { Download, Lock, RefreshCw, Shield } from 'lucide-react';

/**
 * TrustSignals Component - Displays trust badges and security information
 * Use on product pages, checkout, or anywhere you need to build trust
 */
const TrustSignals = ({ variant = 'horizontal' }) => {
  const signals = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Powered by Razorpay',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Lock,
      title: 'SSL Protected',
      description: '256-bit encryption',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Download,
      title: 'Instant Delivery',
      description: 'Immediate download access',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: RefreshCw,
      title: '14-Day Returns',
      description: 'Money-back guarantee',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap justify-center gap-4 py-4">
        {signals.map((signal, index) => (
          <motion.div
            key={signal.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <signal.icon className={`h-4 w-4 ${signal.color}`} />
            <span className="font-medium">{signal.title}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">
          Why Shop With Us
        </h4>
        {signals.map((signal, index) => (
          <motion.div
            key={signal.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className={`p-2 ${signal.bgColor} rounded-lg`}>
              <signal.icon className={`h-4 w-4 ${signal.color}`} />
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">{signal.title}</h5>
              <p className="text-xs text-gray-500">{signal.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Default: horizontal grid
  return (
    <section className="py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Trusted by Developers Worldwide
          </h3>
          <p className="text-gray-500 text-sm">
            Shop with confidence - your purchase is protected
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 ${signal.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <signal.icon className={`h-7 w-7 ${signal.color}`} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{signal.title}</h4>
              <p className="text-sm text-gray-500">{signal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * HowItWorks Component - 3-step process visualization
 */
export const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Browse & Select',
      description: 'Find the perfect digital product or service for your project',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Secure Checkout',
      description: 'Pay securely with Razorpay - cards, UPI, netbanking supported',
      icon: '💳'
    },
    {
      step: '03',
      title: 'Instant Access',
      description: 'Download your files immediately or start your service',
      icon: '🚀'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started in minutes with our simple 3-step process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
              )}

              {/* Step number bubble */}
              <div className="relative inline-block mb-6">
                <div className="text-4xl mb-2">{step.icon}</div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
