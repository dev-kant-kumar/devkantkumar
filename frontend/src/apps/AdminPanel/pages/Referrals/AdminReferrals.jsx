import { motion } from 'framer-motion';
import {
  AlertCircle,
  BadgePercent,
  Check,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  RefreshCw,
  TrendingUp,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  useAdminGetAllReferralsQuery,
  useAdminGetPendingPayoutsQuery,
  useAdminProcessPayoutMutation,
} from '../../store/referral/referralApi';

// ── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(n || 0);

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

// ── ProcessPayoutModal ────────────────────────────────────────────────────────

const ProcessPayoutModal = ({ payout, onClose, onSuccess }) => {
  const [processPayout, { isLoading }] = useAdminProcessPayoutMutation();
  const [status, setStatus] = useState('paid');
  const [adminNote, setAdminNote] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await processPayout({
        referralId: payout.referralId,
        payoutId: payout._id,
        status,
        adminNote,
        transactionId,
      }).unwrap();
      toast.success(`Payout marked as ${status}`);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to process payout');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Process Payout</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Amount:</span> {fmt(payout.amount)}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Method:</span>{' '}
              {payout.paymentMethod?.replace('_', ' ')}
            </p>
            {payout.paymentDetails?.upiId && (
              <p className="text-gray-700">
                <span className="font-medium">UPI ID:</span> {payout.paymentDetails.upiId}
              </p>
            )}
            {payout.paymentDetails?.accountNumber && (
              <p className="text-gray-700">
                <span className="font-medium">Account:</span>{' '}
                {payout.paymentDetails.accountNumber} / {payout.paymentDetails.ifsc}
              </p>
            )}
            {payout.paymentDetails?.paypalEmail && (
              <p className="text-gray-700">
                <span className="font-medium">PayPal:</span> {payout.paymentDetails.paypalEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="paid">Paid</option>
              <option value="approved">Approved (Pending Transfer)</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {status === 'paid' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="UTR / Transaction reference"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Note</label>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows={2}
              placeholder="Optional note for the user…"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 pt-1">
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
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {isLoading ? 'Processing…' : 'Confirm'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// ── AdminReferrals ────────────────────────────────────────────────────────────

const AdminReferrals = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPayout, setSelectedPayout] = useState(null);

  const {
    data: referralsData,
    isLoading: loadingReferrals,
    isError: errorReferrals,
    refetch: refetchReferrals,
  } = useAdminGetAllReferralsQuery({ page: 1, limit: 50 });

  const {
    data: pendingPayoutsData,
    isLoading: loadingPayouts,
    refetch: refetchPayouts,
  } = useAdminGetPendingPayoutsQuery();

  const referrals = referralsData?.data || [];
  const stats = referralsData?.stats || {};
  const pendingPayouts = pendingPayoutsData?.data || [];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'payouts', label: `Pending Payouts (${pendingPayouts.length})`, icon: Wallet },
    { id: 'all', label: 'All Referrers', icon: Users },
  ];

  if (loadingReferrals || loadingPayouts) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (errorReferrals) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load referral data</h3>
        <button
          onClick={() => refetchReferrals()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  const overviewStats = [
    { label: 'Total Referrers', value: referrals.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Referrals', value: stats.totalReferrals || 0, icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
    { label: 'Total Commissions', value: fmt(stats.totalEarned), icon: BadgePercent, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Paid Out', value: fmt(stats.totalPaid), icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Balance', value: fmt(stats.totalPending), icon: Clock, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor referrals, commissions, and process payout requests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {overviewStats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
            >
              <div className={`inline-flex p-2 rounded-lg ${s.color} mb-2`}>
                <s.icon className="h-4 w-4" />
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-900">Top Referrers</h2>
            </div>
            {referrals.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No referrers yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Referrals</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Conversions</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Earned</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Available</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {referrals.map((r) => (
                      <tr key={r._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {r.referrer?.firstName} {r.referrer?.lastName}
                            </p>
                            <p className="text-xs text-gray-400">{r.referrer?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{r.code}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{r.totalReferrals}</td>
                        <td className="px-6 py-4 text-gray-700">{r.totalConversions}</td>
                        <td className="px-6 py-4 font-semibold text-green-600">{fmt(r.totalEarned)}</td>
                        <td className="px-6 py-4 font-semibold text-blue-600">{fmt(r.availableBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'payouts' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-900">Pending Payout Requests</h2>
            </div>
            {pendingPayouts.length === 0 ? (
              <div className="p-12 text-center">
                <DollarSign className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No pending payout requests.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Referrer</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Requested</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingPayouts.map((p) => (
                      <tr key={p._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">
                            {p.referrer?.firstName} {p.referrer?.lastName}
                          </p>
                          <p className="text-xs text-gray-400">{p.referrer?.email}</p>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{fmt(p.amount)}</td>
                        <td className="px-6 py-4 capitalize text-gray-600">
                          {p.paymentMethod?.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{fmtDate(p.requestedAt)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                              statusColor[p.status] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedPayout(p)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Process
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'all' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-900">All Referrers ({referrals.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Referrals</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Conversions</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Earned</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Paid</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Available</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {referrals.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {r.referrer?.firstName} {r.referrer?.lastName}
                          </p>
                          <p className="text-xs text-gray-400">{r.referrer?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{r.code}</span>
                      </td>
                      <td className="px-6 py-4">{r.totalReferrals}</td>
                      <td className="px-6 py-4">{r.totalConversions}</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">{fmt(r.totalEarned)}</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">{fmt(r.totalPaid)}</td>
                      <td className="px-6 py-4 text-purple-600 font-semibold">{fmt(r.availableBalance)}</td>
                      <td className="px-6 py-4 text-gray-500">{fmtDate(r.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {selectedPayout && (
        <ProcessPayoutModal
          payout={selectedPayout}
          onClose={() => setSelectedPayout(null)}
          onSuccess={() => {
            refetchPayouts();
            refetchReferrals();
          }}
        />
      )}
    </>
  );
};

export default AdminReferrals;
