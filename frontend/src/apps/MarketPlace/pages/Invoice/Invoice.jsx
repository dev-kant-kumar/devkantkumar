import { Download, Printer } from 'lucide-react';
import { useParams } from 'react-router-dom';

const Invoice = () => {
  const { orderId } = useParams();

  const invoiceData = {
    id: orderId || 'INV-2023-001',
    date: 'Oct 24, 2023',
    dueDate: 'Oct 24, 2023',
    status: 'Paid',
    client: {
      name: 'John Doe',
      company: 'Acme Inc.',
      address: '123 Business Rd, Tech City, TC 90210',
      email: 'john@example.com'
    },
    items: [
      { id: 1, description: 'Custom E-commerce Development - Initial Deposit', quantity: 1, price: 1250.00 },
      { id: 2, description: 'UI/UX Design Package', quantity: 1, price: 800.00 },
    ],
    subtotal: 2050.00,
    tax: 0.00,
    total: 2050.00
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Actions */}
        <div className="flex justify-end gap-4 mb-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm">
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>

        {/* Invoice Paper */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none">
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
                <p className="text-gray-500 mt-1">#{invoiceData.id}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Market Place
                </span>
                <p className="text-sm text-gray-500 mt-1">Digital Services & Products</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</h3>
                <p className="font-bold text-gray-900">{invoiceData.client.name}</p>
                <p className="text-sm text-gray-600">{invoiceData.client.company}</p>
                <p className="text-sm text-gray-600">{invoiceData.client.address}</p>
                <p className="text-sm text-gray-600">{invoiceData.client.email}</p>
              </div>
              <div className="text-right">
                <div className="mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date Issued</h3>
                  <p className="font-medium text-gray-900">{invoiceData.date}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Payment Status</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 uppercase">
                    {invoiceData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="text-right py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="text-right py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 text-sm text-gray-900 font-medium">{item.description}</td>
                      <td className="py-4 text-right text-sm text-gray-600">{item.quantity}</td>
                      <td className="py-4 text-right text-sm text-gray-900">${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end border-t border-gray-100 pt-8">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (0%)</span>
                  <span className="font-medium text-gray-900">${invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3 mt-3">
                  <span className="text-gray-900">Total</span>
                  <span className="text-green-600">${invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Thank you for your business! If you have any questions, please contact support@marketplace.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
