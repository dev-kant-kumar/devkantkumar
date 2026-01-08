import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, FileText, Mail, Scale, Shield, Users } from 'lucide-react';

const TermsOfService = () => {
  const lastUpdated = "October 1, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: Scale,
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms."
        }
      ]
    },
    {
      id: "services",
      title: "Services Description",
      icon: Users,
      content: [
        {
          subtitle: "Portfolio Services",
          text: "This website serves as a professional portfolio showcasing development work, skills, and experience. It provides information about available services and facilitates contact for potential collaborations."
        },
        {
          subtitle: "Marketplace Integration",
          text: "The website includes links to marketplace services where you can purchase development services, digital products, and custom solutions. Separate terms may apply to marketplace transactions."
        },
        {
          subtitle: "Content Accuracy",
          text: "While we strive to keep information accurate and up-to-date, we make no representations or warranties about the completeness, accuracy, or reliability of any information on this website."
        }
      ]
    },
    {
      id: "user-conduct",
      title: "User Conduct",
      icon: Shield,
      content: [
        {
          subtitle: "Acceptable Use",
          text: "You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website."
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use this website to transmit, distribute, store, or destroy material that is unlawful, harmful, threatening, defamatory, obscene, or otherwise objectionable."
        },
        {
          subtitle: "Contact Forms",
          text: "When using contact forms or communication features, you agree to provide accurate information and communicate in a professional and respectful manner."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: FileText,
      content: [
        {
          subtitle: "Website Content",
          text: "All content on this website, including text, graphics, logos, images, and software, is the property of Dev Kant Kumar or its content suppliers and is protected by copyright laws."
        },
        {
          subtitle: "Portfolio Work",
          text: "Portfolio projects and case studies are presented for demonstration purposes. Actual project ownership and usage rights may vary and are subject to individual client agreements."
        },
        {
          subtitle: "User Submissions",
          text: "Any content you submit through contact forms or other communication channels may be used for business purposes, including responding to inquiries and improving services."
        }
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: AlertTriangle,
      content: [
        {
          subtitle: "No Warranties",
          text: "This website is provided 'as is' without any representations or warranties, express or implied. We make no representations or warranties in relation to this website or the information and materials provided."
        },
        {
          subtitle: "Limitation of Liability",
          text: "We will not be liable for any direct, indirect, special, incidental, or consequential damages arising out of the use or inability to use this website."
        },
        {
          subtitle: "External Links",
          text: "This website may contain links to external websites. We have no control over the content of these sites and accept no responsibility for them or for any loss or damage that may arise from your use of them."
        },
        {
          subtitle: "Service Availability",
          text: "We do not guarantee that this website will be constantly available or available at all. We may suspend or withdraw or restrict the availability of all or any part of our website for business and operational reasons."
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
              <Scale className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-medium">Legal Document</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Please read these terms carefully before using our website and services.
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
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group-hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30">
                      <section.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>

                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-2">
                        <h3 className="text-lg font-semibold text-amber-300">{item.subtitle}</h3>
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
                  <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>

                  <div className="space-y-2">
                    <p className="text-slate-300">
                      <span className="text-emerald-400 font-medium">Email:</span> support@devkantkumar.com
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

export default TermsOfService;
