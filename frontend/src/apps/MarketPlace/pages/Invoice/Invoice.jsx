import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Download, Loader2, Printer, RefreshCw } from 'lucide-react';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../store/orders/ordersApi';

const Invoice = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  // Fetch real order data
  const { data: order, isLoading, isError, error, refetch } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format currency
  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Handle print - only prints the invoice content
  const handlePrint = () => {
    const printContent = invoiceRef.current;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore React state
  };

  // Handle PDF download using print dialog with PDF option
  const handleDownloadPDF = () => {
    // Create a new window with only the invoice content
    const printWindow = window.open('', '_blank');
    const invoiceContent = invoiceRef.current.innerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order?.orderNumber || orderId}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background: white;
              color: #111827;
              padding: 40px;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 24px;
              margin-bottom: 24px;
            }
            .invoice-title {
              font-size: 24px;
              font-weight: bold;
              color: #111827;
            }
            .invoice-number {
              color: #6b7280;
              margin-top: 4px;
            }
            .brand-name {
              font-size: 20px;
              font-weight: bold;
              color: #059669;
            }
            .brand-subtitle {
              font-size: 12px;
              color: #6b7280;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 32px;
              margin-bottom: 24px;
            }
            .info-label {
              font-size: 10px;
              font-weight: bold;
              color: #9ca3af;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 8px;
            }
            .client-name {
              font-weight: bold;
              color: #111827;
            }
            .client-detail {
              font-size: 14px;
              color: #4b5563;
            }
            .text-right {
              text-align: right;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              background: #d1fae5;
              color: #065f46;
              font-size: 12px;
              font-weight: bold;
              border-radius: 9999px;
              text-transform: uppercase;
            }
            .status-pending {
              background: #fef3c7;
              color: #92400e;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 24px;
            }
            .items-table th {
              text-align: left;
              padding: 12px 0;
              font-size: 10px;
              font-weight: bold;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              border-bottom: 1px solid #e5e7eb;
            }
            .items-table th:last-child,
            .items-table td:last-child {
              text-align: right;
            }
            .items-table th:nth-child(2),
            .items-table td:nth-child(2) {
              text-align: right;
            }
            .items-table td {
              padding: 16px 0;
              font-size: 14px;
              border-bottom: 1px solid #f3f4f6;
            }
            .item-title {
              font-weight: 500;
              color: #111827;
            }
            .item-type {
              font-size: 12px;
              color: #6b7280;
            }
            .totals-section {
              display: flex;
              justify-content: flex-end;
              border-top: 1px solid #e5e7eb;
              padding-top: 24px;
            }
            .totals-box {
              width: 250px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              margin-bottom: 8px;
            }
            .total-row.final {
              font-size: 18px;
              font-weight: bold;
              border-top: 1px solid #e5e7eb;
              padding-top: 12px;
              margin-top: 12px;
            }
            .total-row.final span:last-child {
              color: #059669;
            }
            .footer {
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          ${invoiceContent}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); }
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-gray-500">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
        <p className="text-gray-700 font-medium mb-2">Failed to load invoice</p>
        <p className="text-sm text-gray-500 mb-4">{error?.data?.message || 'Order not found'}</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-700 font-medium mb-4">Order not found</p>
        <Link
          to="/marketplace/dashboard/orders"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>
      </div>
    );
  }

  // Extract data from order
  const currency = order.payment?.currency || 'INR';
  const paymentStatus = order.payment?.status === 'completed' ? 'Paid' : order.payment?.status || 'Pending';
  const isPaid = order.payment?.status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Back Button & Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
        </button>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Invoice Content - This is what gets printed/downloaded */}
      <div ref={invoiceRef} className="invoice-container bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="invoice-header flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
            <div>
              <h1 className="invoice-title text-2xl font-bold text-gray-900">INVOICE</h1>
              <p className="invoice-number text-gray-500 mt-1">#{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <span className="brand-name text-xl font-bold text-green-600">
                Market Place
              </span>
              <p className="brand-subtitle text-sm text-gray-500 mt-1">Digital Services & Products</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="info-grid grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="info-label text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</h3>
              <p className="client-name font-bold text-gray-900">{order.billing?.firstName} {order.billing?.lastName}</p>
              {order.billing?.company && (
                <p className="client-detail text-sm text-gray-600">{order.billing.company}</p>
              )}
              {order.billing?.address && (
                <p className="client-detail text-sm text-gray-600">
                  {order.billing.address.street && `${order.billing.address.street}, `}
                  {order.billing.address.city && `${order.billing.address.city}, `}
                  {order.billing.address.state && `${order.billing.address.state} `}
                  {order.billing.address.zipCode}
                </p>
              )}
              <p className="client-detail text-sm text-gray-600">{order.billing?.email}</p>
            </div>
            <div className="text-right">
              <div className="mb-4">
                <h3 className="info-label text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date Issued</h3>
                <p className="font-medium text-gray-900">{formatDate(order.payment?.paidAt || order.createdAt)}</p>
              </div>
              <div>
                <h3 className="info-label text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Payment Status</h3>
                <span className={`status-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${isPaid ? 'bg-green-100 text-green-800' : 'status-pending bg-yellow-100 text-yellow-800'}`}>
                  {paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="items-table w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="text-right py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="text-right py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items?.map((item, index) => (
                  <tr key={item._id || index}>
                    <td className="py-4">
                      <span className="item-title text-sm text-gray-900 font-medium">{item.title}</span>
                      {item.selectedPackage?.name && (
                        <span className="item-type text-xs text-gray-500 ml-2">({item.selectedPackage.name} package)</span>
                      )}
                      <p className="item-type text-xs text-gray-500 capitalize">{item.itemType}</p>
                    </td>
                    <td className="py-4 text-right text-sm text-gray-600">{item.quantity || 1}</td>
                    <td className="py-4 text-right text-sm text-gray-900">{formatCurrency(item.price, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="totals-section flex justify-end border-t border-gray-100 pt-8">
            <div className="totals-box w-64 space-y-3">
              <div className="total-row flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">{formatCurrency(order.payment?.amount?.subtotal, currency)}</span>
              </div>
              <div className="total-row flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">{formatCurrency(order.payment?.amount?.tax || 0, currency)}</span>
              </div>
              {order.payment?.amount?.discount > 0 && (
                <div className="total-row flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">-{formatCurrency(order.payment?.amount?.discount, currency)}</span>
                </div>
              )}
              <div className="total-row final flex justify-between text-lg font-bold border-t border-gray-200 pt-3 mt-3">
                <span className="text-gray-900">Total</span>
                <span className="text-green-600">{formatCurrency(order.payment?.amount?.total, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer bg-gray-50 p-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Thank you for your business! If you have any questions, please contact support@devkantkumar.com
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Invoice;
