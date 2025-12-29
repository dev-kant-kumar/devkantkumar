import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    Copy,
    Lock,
    RefreshCw,
    Shield
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../../../components/SEO/SEOHead';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ level: 0, text: '', color: '' });

  const generatePassword = useCallback(() => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Select at least one option');
      return;
    }

    let pwd = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pwd += chars[array[i] % chars.length];
    }
    setPassword(pwd);
  }, [length, options]);

  const calculateStrength = useCallback((pwd) => {
    if (!pwd || pwd === 'Select at least one option') {
      return { level: 0, text: 'N/A', color: 'text-slate-500' };
    }

    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 2) return { level: 1, text: 'Weak', color: 'text-red-400' };
    if (score <= 4) return { level: 2, text: 'Fair', color: 'text-yellow-400' };
    if (score <= 5) return { level: 3, text: 'Good', color: 'text-blue-400' };
    return { level: 4, text: 'Strong', color: 'text-green-400' };
  }, []);

  useEffect(() => {
    generatePassword();
  }, []);

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password, calculateStrength]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <SEOHead
        title="Strong Password Generator - Free Secure Password Tool | Dev Kant Kumar"
        description="Generate strong, secure random passwords instantly. Customize length, include uppercase, lowercase, numbers, and symbols. Free online password generator with strength meter."
        keywords="password generator, strong password, random password, secure password, password creator, generate password online"
      />
      <StructuredData
        type="software"
        pageData={{
          name: 'Strong Password Generator',
          description: 'Generate secure random passwords with customizable length and character types.',
          category: 'SecurityApplication',
          keywords: ['password generator', 'random password', 'secure password', 'strong password'],
          slug: 'password-generator'
        }}
      />

      <div className="min-h-screen bg-slate-950 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <Link to="/tools" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg mb-4">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Strong Password Generator</h1>
            <p className="text-slate-400 mt-2">Generate secure, random passwords instantly</p>
          </motion.div>

          {/* Password Display */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 p-4 bg-slate-800/50 rounded-xl border border-slate-700 overflow-x-auto">
                  <code className="text-xl sm:text-2xl font-mono text-cyan-400 whitespace-nowrap">{password}</code>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  {copied ? <Check size={24} className="text-green-400" /> : <Copy size={24} className="text-slate-400" />}
                </button>
                <button
                  onClick={generatePassword}
                  className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all"
                >
                  <RefreshCw size={24} className="text-white" />
                </button>
              </div>

              {/* Strength Meter */}
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm">Strength:</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength.level === 1 ? 'bg-red-500 w-1/4' :
                      strength.level === 2 ? 'bg-yellow-500 w-2/4' :
                      strength.level === 3 ? 'bg-blue-500 w-3/4' :
                      strength.level === 4 ? 'bg-green-500 w-full' : 'w-0'
                    }`}
                  />
                </div>
                <span className={`text-sm font-medium ${strength.color}`}>{strength.text}</span>
              </div>
            </div>
          </motion.div>

          {/* Length Slider */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Password Length</span>
                <span className="px-3 py-1 bg-slate-800 rounded-lg text-cyan-400 font-mono">{length}</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-green-500 [&::-webkit-slider-thumb]:to-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-slate-500 text-sm">
                <span>8</span>
                <span>64</span>
              </div>
            </div>
          </motion.div>

          {/* Options */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <span className="text-white font-medium block mb-4">Include Characters</span>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'uppercase', label: 'Uppercase (A-Z)', sample: 'ABC' },
                  { key: 'lowercase', label: 'Lowercase (a-z)', sample: 'abc' },
                  { key: 'numbers', label: 'Numbers (0-9)', sample: '123' },
                  { key: 'symbols', label: 'Symbols (!@#)', sample: '!@#' }
                ].map(({ key, label, sample }) => (
                  <button
                    key={key}
                    onClick={() => toggleOption(key)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      options[key]
                        ? 'bg-green-500/10 border-green-500/50 text-green-400'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{label}</span>
                      <span className="font-mono text-lg">{sample}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Generate Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
            <button
              onClick={generatePassword}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all text-lg"
            >
              Generate New Password
            </button>
          </motion.div>

          {/* Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="text-green-400" /> Password Security Tips
            </h2>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>• Use at least 12-16 characters for strong security</li>
              <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>• Never reuse passwords across different accounts</li>
              <li>• Consider using a password manager to store passwords securely</li>
              <li>• Enable two-factor authentication whenever possible</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;
