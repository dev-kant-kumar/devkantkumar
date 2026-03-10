import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  BadgePercent,
  CheckCircle,
  Clock,
  Copy,
  DollarSign,
  ExternalLink,
  Gift,
  Loader2,
  RefreshCw,
  Share2,
  TrendingUp,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  useGetMyReferralQuery,
  useGetReferralConversionsQuery,
  useGetReferralPayoutsQuery,
  useRequestPayoutMutation,
} from '../../../store/referral/referralApi';

// ── helpers ──────────────────────────────────────────────────────────────────

const fmt = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount || 0);

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

const statusBadge = (status) => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    approved: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return map[status] || 'bg-gray-100 text-gray-800';
};

// ── PayoutModal ───────────────────────────────────────────────────────────────

const PayoutModal = ({ availableBalance, onClose, onSuccess }) => {
  const [requestPayout, { isLoading }] = useRequestPayoutMutation();
  const [form, setForm] = useState({
    amount: '',
    paymentMethod: 'upi',
    paymentDetails: { upiId: '', accountName: '', accountNumber: '', ifsc: '' },
  });

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));
  const setDetails = (field, value) =>
    setForm((p) => ({
      ...p,
      paymentDetails: { ...p.paymentDetails, [field]: value },
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!amount || amount < 500) {
      toast.error('Minimum payout amount is ₹500');
      return;
    }
    if (amount > availableBalance) {
      toast.error('Amount exceeds available balance');
      return;
    }
    try {
      await requestPayout({
        amount,
        paymentMethod: form.paymentMethod,
        paymentDetails: form.paymentDetails,
      }).unwrap();
      toast.success('Payout request submitted!');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit payout request');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Request Payout</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="bg-green-50 rounded-lg p-3 flex items-center gap-3">
            <Wallet className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">
              Available balance: <span className="font-bold">{fmt(availableBalance)}</span>
            </p>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              min="500"
              max={availableBalance}
              step="1"
              value={form.amount}
              onChange={(e) => set('amount', e.target.value)}
              required
              placeholder="Minimum ₹500"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={form.paymentMethod}
              onChange={(e) => set('paymentMethod', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="upi">UPI</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Conditional fields */}
          {form.paymentMethod === 'upi' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <input
                type="text"
                value={form.paymentDetails.upiId}
                onChange={(e) => setDetails('upiId', e.target.value)}
                required
                placeholder="yourname@upi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          )}

          {form.paymentMethod === 'bank_transfer' && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                <input
                  type="text"
                  value={form.paymentDetails.accountName}
                  onChange={(e) => setDetails('accountName', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={form.paymentDetails.accountNumber}
                  onChange={(e) => setDetails('accountNumber', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={form.paymentDetails.ifsc}
                  onChange={(e) => setDetails('ifsc', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
            </div>
          )}

          {form.paymentMethod === 'paypal' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
              <input
                type="email"
                value={form.paymentDetails.paypalEmail}
                onChange={(e) => setDetails('paypalEmail', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-60 transition-colors"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
              {isLoading ? 'Submitting…' : 'Submit Request'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// ── Main Referral Page ────────────────────────────────────────────────────────

const Referral = () => {
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const {
    data: referralData,
    isLoading: loadingReferral,
    isError: errorReferral,
    refetch: refetchReferral,
  } = useGetMyReferralQuery();

  const { data: conversionsData, isLoading: loadingConversions } =
    useGetReferralConversionsQuery();

  const { data: payoutsData, isLoading: loadingPayouts } =
    useGetReferralPayoutsQuery();

  const referral = referralData?.data;
  const conversions = conversionsData?.data || [];
  const payouts = payoutsData?.data || [];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    });
  };

  const shareReferral = () => {
    if (navigator.share && referral?.referralLink) {
      navigator.share({
        title: 'Join devkantkumar Marketplace',
        text: 'Use my referral link to get started!',
        url: referral.referralLink,
      });
    } else {
      copyToClipboard(referral?.referralLink || '');
    }
  };

  if (loadingReferral) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 h-24" />
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-48" />
      </div>
    );
  }

  if (errorReferral) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load referral data</h3>
        <p className="text-gray-500 mb-4 text-sm">Something went wrong. Please try again.</p>
        <button
          onClick={() => refetchReferral()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Referrals',
      value: referral?.totalReferrals || 0,
      icon: Users,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Conversions',
      value: referral?.totalConversions || 0,
      icon: TrendingUp,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Total Earned',
      value: fmt(referral?.totalEarned),
      icon: BadgePercent,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      label: 'Available Balance',
      value: fmt(referral?.availableBalance),
      icon: Wallet,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
          <p className="mt-1 text-sm text-gray-500">
            Earn 10% commission on every purchase made by users you refer.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Referral Link Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Gift className="h-32 w-32 text-green-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <Share2 className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Your Referral Link</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Share this link with friends. When they sign up and make their first purchase, you earn a commission.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Referral code badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg">
                <span className="text-xs text-gray-400">Code:</span>
                <span className="text-sm font-mono font-bold text-white tracking-widest">
                  {referral?.code}
                </span>
                <button
                  onClick={() => copyToClipboard(referral?.code || '')}
                  className="text-gray-400 hover:text-white transition-colors ml-1"
                  title="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              {/* Full link */}
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-600 truncate">{referral?.referralLink}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(referral?.referralLink || '')}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
                <button
                  onClick={shareReferral}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                icon: Share2,
                title: 'Share Your Link',
                desc: 'Share your unique referral link with friends, colleagues, or on social media.',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                step: '2',
                icon: Users,
                title: 'Friend Signs Up',
                desc: 'When someone uses your link to create an account, they get tracked as your referral.',
                color: 'bg-purple-50 text-purple-600',
              },
              {
                step: '3',
                icon: DollarSign,
                title: 'Earn 10% Commission',
                desc: 'You earn 10% of their first purchase amount, credited to your balance instantly.',
                color: 'bg-green-50 text-green-600',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-xl ${item.color} mb-3`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold text-gray-400 mb-1">Step {item.step}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                {item.step !== '3' && (
                  <ArrowRight className="h-5 w-5 text-gray-300 mt-3 hidden sm:block rotate-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Earnings & Payout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Balance */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="h-8 w-8 text-white/80" />
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">Available</span>
            </div>
            <p className="text-3xl font-bold mb-1">{fmt(referral?.availableBalance)}</p>
            <p className="text-sm text-white/70 mb-5">Ready to withdraw</p>
            <button
              onClick={() => setShowPayoutModal(true)}
              disabled={(referral?.availableBalance || 0) < 500}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-green-700 text-sm font-bold rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <DollarSign className="h-4 w-4" />
              Request Payout
            </button>
            {(referral?.availableBalance || 0) < 500 && (
              <p className="text-xs text-white/60 mt-2 text-center">
                Minimum ₹500 required to withdraw
              </p>
            )}
          </div>

          {/* Stats Summary */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Earnings Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Total Earned (All Time)', value: fmt(referral?.totalEarned), icon: TrendingUp, color: 'text-green-600' },
                { label: 'Total Paid Out', value: fmt(referral?.totalPaid), icon: CheckCircle, color: 'text-blue-600' },
                { label: 'Pending Balance', value: fmt(referral?.pendingBalance), icon: Clock, color: 'text-yellow-600' },
                { label: 'Available Balance', value: fmt(referral?.availableBalance), icon: Wallet, color: 'text-purple-600' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <row.icon className={`h-4 w-4 ${row.color}`} />
                    <span className="text-sm text-gray-600">{row.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Referral Conversions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Referral History</h2>
            <span className="text-sm text-gray-500">
              {conversions.length} referral{conversions.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loadingConversions ? (
            <div className="p-8 text-center">
              <Loader2 className="h-6 w-6 text-green-600 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading conversions…</p>
            </div>
          ) : conversions.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No referrals yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Share your referral link to start earning commissions.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Referred User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Signed Up
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {conversions.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{c.referredUserName || '—'}</p>
                          <p className="text-xs text-gray-400">{c.referredUserEmail || '—'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{fmtDate(c.signedUpAt)}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {c.orderAmount ? fmt(c.orderAmount) : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-600">
                          {c.commissionAmount ? fmt(c.commissionAmount) : '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusBadge(c.status)}`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payout History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Payout History</h2>
            <span className="text-sm text-gray-500">
              {payouts.length} request{payouts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loadingPayouts ? (
            <div className="p-8 text-center">
              <Loader2 className="h-6 w-6 text-green-600 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading payouts…</p>
            </div>
          ) : payouts.length === 0 ? (
            <div className="p-12 text-center">
              <DollarSign className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No payout requests yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Build up your balance and request a payout when ready.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Requested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Processed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payouts.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{fmt(p.amount)}</td>
                      <td className="px-6 py-4 capitalize text-gray-600">
                        {p.paymentMethod?.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{fmtDate(p.requestedAt)}</td>
                      <td className="px-6 py-4 text-gray-600">{fmtDate(p.processedAt)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusBadge(p.status)}`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Program Terms */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <BadgePercent className="h-5 w-5" />
            Program Terms
          </h3>
          <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
            <li>10% commission on the first paid order of each referred user.</li>
            <li>Minimum payout threshold: ₹500.</li>
            <li>Commission is credited after the order payment is confirmed.</li>
            <li>Payouts are processed within 3–5 business days.</li>
            <li>Self-referrals are not permitted.</li>
            <li>We reserve the right to withhold commissions for fraudulent activity.</li>
          </ul>
        </div>
      </motion.div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <PayoutModal
          availableBalance={referral?.availableBalance || 0}
          onClose={() => setShowPayoutModal(false)}
          onSuccess={() => refetchReferral()}
        />
      )}
    </>
  );
};

export default Referral;
