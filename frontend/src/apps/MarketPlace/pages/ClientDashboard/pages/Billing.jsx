import { motion } from 'framer-motion';
import { CreditCard, Download, Plus, ShieldCheck, Zap } from 'lucide-react';

const Billing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your subscription, payment methods, and invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="h-32 w-32 text-green-600" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Current Plan</h3>
                  <p className="text-sm text-gray-500">You are on the <span className="font-bold text-green-600">Pro Member</span> plan.</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">Active</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-gray-900">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Unlimited Downloads</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Priority Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Access to Premium Assets</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                  Upgrade Plan
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
              <button className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add New
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase">Default</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Invoice History</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">Oct 24, 2023</p>
                  <p className="text-xs text-gray-500">$29.00 • Pro Plan</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            View All Invoices
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Billing;
