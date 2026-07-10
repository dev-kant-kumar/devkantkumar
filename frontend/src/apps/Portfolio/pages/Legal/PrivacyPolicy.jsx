import { motion } from 'framer-motion';
import { Calendar, Eye, Globe, Lock, Mail, Megaphone, Shield, Users } from 'lucide-react';
import SEOHead from '../../../../components/SEO/SEOHead';
import StructuredData from '../../../../components/SEO/StructuredData';

const PrivacyPolicy = () => {
  const lastUpdated = "July 10, 2026";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Eye,
      content: [
        {
          subtitle: "Personal Information",
          text: "When you contact us through our forms, subscribe to our newsletter, or engage with our services, we may collect personal information such as your name, email address, phone number, and message content."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on our site."
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Users,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to respond to your inquiries, provide requested services, and communicate about projects or opportunities."
        },
        {
          subtitle: "Communication",
          text: "With your consent, we may send you newsletters, updates about new projects, blog posts, and other relevant information."
        },
        {
          subtitle: "Website Improvement",
          text: "We analyze usage data to improve our website functionality, user experience, and content relevance."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Globe,
      content: [
        {
          subtitle: "Third-Party Services",
          text: "We may use third-party services for analytics (Google Analytics), email marketing, and hosting. These services have their own privacy policies."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or to protect our rights and safety."
        },
        {
          subtitle: "No Sale of Data",
          text: "We do not sell, trade, or rent your personal information to third parties for marketing purposes."
        }
      ]
    },
    {
      id: "advertising",
      title: "Advertising & Google AdSense",
      icon: Megaphone,
      content: [
        {
          subtitle: "Third-Party Advertising",
          text: "This website uses Google AdSense, a third-party advertising service provided by Google, to display advertisements. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website and other websites across the internet."
        },
        {
          subtitle: "Advertising Cookies",
          text: "Google's use of advertising cookies (including the DoubleClick DART cookie) enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the internet. These cookies do not collect personally identifiable information."
        },
        {
          subtitle: "How to Opt Out",
          text: "You may opt out of personalized advertising by visiting Google Ads Settings at https://adssettings.google.com. You can also opt out of third-party vendors' use of cookies for personalized ads by visiting https://www.aboutads.info. For more details, see Google's Privacy & Terms at https://policies.google.com/technologies/ads."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law."
        },
        {
          subtitle: "Breach Notification",
          text: "In the event of a data breach, we will notify affected users and relevant authorities as required by applicable laws."
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to access, update, or correct your personal information. Contact us to exercise these rights."
        },
        {
          subtitle: "Data Portability",
          text: "You can request a copy of your personal data in a structured, commonly used format."
        },
        {
          subtitle: "Deletion",
          text: "You can request deletion of your personal information, subject to legal and legitimate business requirements."
        },
        {
          subtitle: "Opt-Out",
          text: "You can unsubscribe from our newsletters and marketing communications at any time using the unsubscribe link or by contacting us."
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Privacy Policy – Portfolio Legal Hub"
        description="Read my official Privacy Policy to understand how personal details, usage metrics, and cookies are managed and secured."
        keywords="privacy policy, portfolio legal, security, cookie policy, devkantkumar"
        canonicalUrl="/privacy"
        type="website"
      />
      <StructuredData type="website" />

      <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-hidden">
        {/* Background Grids & Ambient Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-36 pb-16"
          >
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/60 border border-slate-800 rounded-xl text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase shadow-xl mb-6">
                <Shield className="w-4 h-4 text-cyan-400" />
                Legal Protocol // PRIVACY_POLICY
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
                Privacy
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl ml-3.5">
                  Policy
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Your privacy is vital to us. This policy details exactly how we collect, process, secure, and protect your information.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/60 border border-slate-900 text-slate-500 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Last updated // {lastUpdated}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 pb-24">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className="relative bg-slate-950/80 border border-slate-900 rounded-3xl p-8 md:p-10 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-xl shadow-xl shadow-black/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.02)]">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 shadow-md">
                        <section.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{section.title}</h2>
                    </div>

                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-2">
                          <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider">{item.subtitle}</h3>
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-slate-950/80 border border-slate-900 rounded-3xl p-8 md:p-10 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-xl shadow-xl shadow-black/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.02)]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-400 shadow-md">
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Contact Information</h2>
                  </div>

                  <div className="space-y-6">
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      If you have any inquiries, suggestions, or issues regarding this Privacy Policy or our operational data practices, please contact our support team directly:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md">
                        <p className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Email Address</p>
                        <a href="mailto:support@devkantkumar.com" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mt-1 inline-block">
                          support@devkantkumar.com
                        </a>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md">
                        <p className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Secure Portal</p>
                        <a href="https://devkantkumar.com/contact" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mt-1 inline-block">
                          devkantkumar.com/contact
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
