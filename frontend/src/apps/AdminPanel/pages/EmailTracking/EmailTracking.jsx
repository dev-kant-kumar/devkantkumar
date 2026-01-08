import { useCallback, useState } from 'react';
import {
    useGetEmailLogsQuery,
    useGetEmailStatsQuery,
    useGetEmailTypesQuery,
    useRetryEmailMutation
} from '../../store/api/emailTrackingApiSlice';
import './EmailTracking.css';

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { label: 'Pending', className: 'status-pending', icon: '⏳' },
    processing: { label: 'Processing', className: 'status-processing', icon: '⚙️' },
    sent: { label: 'Sent', className: 'status-sent', icon: '✅' },
    failed: { label: 'Failed', className: 'status-failed', icon: '❌' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`status-badge ${config.className}`}>
      <span className="status-icon">{config.icon}</span>
      {config.label}
    </span>
  );
};

// Email type badge
const TypeBadge = ({ type }) => {
  const typeLabels = {
    'verification-email': 'Verify',
    'password-reset-email': 'Reset',
    'email-change-otp': 'OTP',
    'password-change-otp': 'OTP',
    'order-confirmation-email': 'Order',
    'contact-admin-notification': 'Contact',
    'contact-user-auto-reply': 'Reply',
    'newsletter-welcome-email': 'Newsletter',
    'generic-email': 'General'
  };

  return (
    <span className="type-badge">
      {typeLabels[type] || type}
    </span>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, subtitle, icon, className }) => (
  <div className={`email-stats-card ${className || ''}`}>
    <div className="stats-icon">{icon}</div>
    <div className="stats-content">
      <div className="stats-value">{value}</div>
      <div className="stats-title">{title}</div>
      {subtitle && <div className="stats-subtitle">{subtitle}</div>}
    </div>
  </div>
);

// Time ago helper
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return new Date(date).toLocaleDateString();
};

const EmailTracking = () => {
  // State
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    search: ''
  });
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Queries
  const { data: statsData, isLoading: statsLoading, refetch: refetchStats } = useGetEmailStatsQuery();
  const { data: logsData, isLoading: logsLoading, refetch: refetchLogs } = useGetEmailLogsQuery({
    page,
    limit: 15,
    ...filters
  });
  const { data: typesData } = useGetEmailTypesQuery();

  // Mutations
  const [retryEmail, { isLoading: isRetrying }] = useRetryEmailMutation();

  // Handlers
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const handleRefresh = useCallback(() => {
    refetchStats();
    refetchLogs();
  }, [refetchStats, refetchLogs]);

  const handleRetry = async (emailId) => {
    try {
      await retryEmail(emailId).unwrap();
      handleRefresh();
    } catch (error) {
      console.error('Failed to retry email:', error);
    }
  };

  const stats = statsData?.data?.overview || {};
  const emails = logsData?.data?.emails || [];
  const pagination = logsData?.data?.pagination || {};
  const emailTypes = typesData?.data || [];

  return (
    <div className="email-tracking-page">
      {/* Header */}
      <div className="email-tracking-header">
        <div className="header-left">
          <h1>📧 Email Tracking</h1>
          <p>Monitor and manage all outgoing emails</p>
        </div>
        <div className="header-right">
          <button className="refresh-btn" onClick={handleRefresh} disabled={statsLoading || logsLoading}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="email-stats-grid">
        <StatsCard
          title="Total Sent"
          value={statsLoading ? '...' : stats.total?.toLocaleString() || 0}
          icon="📊"
          className="stats-total"
        />
        <StatsCard
          title="Success Rate"
          value={statsLoading ? '...' : `${stats.successRate || 0}%`}
          icon="✅"
          className="stats-success"
        />
        <StatsCard
          title="Failed"
          value={statsLoading ? '...' : stats.failed?.toLocaleString() || 0}
          icon="❌"
          className="stats-failed"
        />
        <StatsCard
          title="Pending"
          value={statsLoading ? '...' : (stats.pending + stats.processing) || 0}
          icon="⏳"
          className="stats-pending"
        />
      </div>

      {/* Filters */}
      <div className="email-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by email or subject..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="filter-search"
          />
        </div>
        <div className="filter-group">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
          </select>
        </div>
        <div className="filter-group">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            {emailTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Email Table */}
      <div className="email-table-container">
        {logsLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading emails...</p>
          </div>
        ) : emails.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No emails found</h3>
            <p>No emails match your current filters</p>
          </div>
        ) : (
          <table className="email-table">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Status</th>
                <th>Sent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email._id} className={`email-row status-${email.status}`}>
                  <td className="email-to">
                    <span className="email-address">{email.to}</span>
                  </td>
                  <td className="email-subject">
                    <span title={email.subject}>{email.subject}</span>
                  </td>
                  <td>
                    <TypeBadge type={email.type} />
                  </td>
                  <td>
                    <StatusBadge status={email.status} />
                  </td>
                  <td className="email-time">
                    {timeAgo(email.createdAt)}
                  </td>
                  <td className="email-actions">
                    <button
                      className="action-btn view-btn"
                      onClick={() => setSelectedEmail(email)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    {email.status === 'failed' && (
                      <button
                        className="action-btn retry-btn"
                        onClick={() => handleRetry(email._id)}
                        disabled={isRetrying}
                        title="Retry"
                      >
                        🔄
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="email-pagination">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {page} of {pagination.pages} ({pagination.total} emails)
          </span>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div className="email-modal-overlay" onClick={() => setSelectedEmail(null)}>
          <div className="email-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Email Details</h2>
              <button className="modal-close" onClick={() => setSelectedEmail(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <label>To:</label>
                <span>{selectedEmail.to}</span>
              </div>
              <div className="detail-row">
                <label>From:</label>
                <span>{selectedEmail.from}</span>
              </div>
              <div className="detail-row">
                <label>Subject:</label>
                <span>{selectedEmail.subject}</span>
              </div>
              <div className="detail-row">
                <label>Type:</label>
                <TypeBadge type={selectedEmail.type} />
              </div>
              <div className="detail-row">
                <label>Status:</label>
                <StatusBadge status={selectedEmail.status} />
              </div>
              <div className="detail-row">
                <label>Queued:</label>
                <span>{new Date(selectedEmail.queuedAt).toLocaleString()}</span>
              </div>
              {selectedEmail.sentAt && (
                <div className="detail-row">
                  <label>Sent:</label>
                  <span>{new Date(selectedEmail.sentAt).toLocaleString()}</span>
                </div>
              )}
              {selectedEmail.error && (
                <div className="detail-row error-row">
                  <label>Error:</label>
                  <span className="error-message">{selectedEmail.error.message}</span>
                </div>
              )}
              {selectedEmail.serverResponse?.messageId && (
                <div className="detail-row">
                  <label>Message ID:</label>
                  <span className="message-id">{selectedEmail.serverResponse.messageId}</span>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {selectedEmail.status === 'failed' && (
                <button
                  className="retry-btn-modal"
                  onClick={() => {
                    handleRetry(selectedEmail._id);
                    setSelectedEmail(null);
                  }}
                  disabled={isRetrying}
                >
                  🔄 Retry Email
                </button>
              )}
              <button className="close-btn-modal" onClick={() => setSelectedEmail(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTracking;
