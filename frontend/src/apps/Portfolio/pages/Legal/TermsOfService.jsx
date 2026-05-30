import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, FileText, Mail, Scale, Shield, Users } from 'lucide-react';
import SEOHead from '../../../../components/SEO/SEOHead';
import StructuredData from '../../../../components/SEO/StructuredData';

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
    <>
      <SEOHead
        title="Terms of Service – Portfolio Legal Hub"
        description="Review my official Terms of Service governing the use of this professional portfolio website and marketplace integrations."
        keywords="terms of service, portfolio legal, accept terms, user conduct, devkantkumar"
        canonicalUrl="/terms"
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/60 border border-slate-800 rounded-xl text-amber-400 text-xs font-mono font-bold tracking-wider uppercase shadow-xl mb-6">
                <Scale className="w-4 h-4 text-amber-400" />
                Legal Protocol // TERMS_OF_SERVICE
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
                Terms of
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl ml-3.5">
                  Service
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Please read these terms carefully before navigating our portfolio site and exploring marketplace integrations.
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
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 shadow-md">
                        <section.icon className="w-5 h-5 text-amber-400" />
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
                      If you have any inquiries, suggestions, or issues regarding these Terms of Service or our operational platforms, please reach out to our administration team:
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

export default TermsOfService;
