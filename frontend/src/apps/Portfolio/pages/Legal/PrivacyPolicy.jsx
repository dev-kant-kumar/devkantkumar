import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, Mail, Globe, Calendar } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "October 1, 2025";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-32 pb-16"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-medium">Legal Document</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>

            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Last updated: {lastUpdated}</span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group-hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30">
                      <section.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>

                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-2">
                        <h3 className="text-lg font-semibold text-blue-300">{item.subtitle}</h3>
                        <p className="text-slate-300 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group-hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-600/20 border border-emerald-500/30">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>

                  <div className="space-y-2">
                    <p className="text-slate-300">
                      <span className="text-emerald-400 font-medium">Email:</span> dev.techdeveloper@gmail.com
                    </p>
                    <p className="text-slate-300">
                      <span className="text-emerald-400 font-medium">Website:</span> https://devkantkumar.com/contact
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
