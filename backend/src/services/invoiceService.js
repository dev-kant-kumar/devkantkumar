/**
 * Invoice Service
 *
 * Generates professional PDF invoices from Order data using Puppeteer.
 * Handles GST/Tax labelling, multi-currency formatting, and a clean
 * printable HTML template that matches the frontend Invoice.jsx design.
 */

const puppeteer = require('puppeteer');
const Order = require('../models/Order');
const logger = require('../utils/logger');

// ─────────────────────────────────────────────────────────────────────────────
// HTML Template Builder
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the invoice HTML from a populated order object.
 * @param {Object} order  Mongoose Order document (plain object ok too)
 * @returns {string} Complete HTML page string
 */
const buildInvoiceHtml = (order) => {
  const currency = order.payment?.currency || 'INR';
  const currencySymbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
  const symbol = currencySymbols[currency] || (currency + ' ');

  const formatCurrency = (amount) => {
    const num = amount || 0;
    return `${symbol}${num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const subtotal = order.payment?.amount?.subtotal || 0;
  const tax = order.payment?.amount?.tax || 0;
  const discount = order.payment?.amount?.discount || 0;
  const total = order.payment?.amount?.total || 0;
  const isPaid = order.payment?.status === 'completed';

  // Derive effective tax rate for display
  const taxRatePct = subtotal > 0 ? Math.round((tax / subtotal) * 100) : 0;
  const taxLabel = currency === 'INR'
    ? `GST${taxRatePct > 0 ? ` (${taxRatePct}%)` : ''}`
    : `Tax${taxRatePct > 0 ? ` (${taxRatePct}%)` : ''}`;

  const billingAddress = [
    order.billing?.address?.street,
    order.billing?.address?.city,
    order.billing?.address?.state,
    order.billing?.address?.zipCode,
    order.billing?.address?.country,
  ].filter(Boolean).join(', ');

  const itemsHtml = (order.items || []).map((item) => `
    <tr>
      <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; vertical-align: top;">
        <div style="font-weight: 600; color: #111827; font-size: 14px;">${item.title || item.name || 'Item'}</div>
        ${item.selectedPackage?.name
          ? `<div style="font-size: 12px; color: #6b7280; margin-top: 2px;">${item.selectedPackage.name} Package</div>`
          : ''}
        <div style="font-size: 11px; color: #9ca3af; text-transform: capitalize; margin-top: 2px;">${item.itemType || 'digital'}</div>
      </td>
      <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 14px; color: #4b5563; vertical-align: top;">${item.quantity || 1}</td>
      <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 14px; color: #4b5563; vertical-align: top;">${formatCurrency(item.price)}</td>
      <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 14px; font-weight: 600; color: #111827; vertical-align: top;">${formatCurrency((item.price || 0) * (item.quantity || 1))}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invoice #${order.orderNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #fff;
      color: #374151;
      font-size: 14px;
      line-height: 1.5;
    }
    .page { max-width: 800px; margin: 0 auto; padding: 48px; }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 32px;
      border-bottom: 2px solid #e5e7eb;
      margin-bottom: 32px;
    }
    .invoice-label { font-size: 36px; font-weight: 800; color: #111827; line-height: 1; }
    .invoice-number { font-size: 13px; color: #6b7280; margin-top: 6px; }
    .brand-name { font-size: 20px; font-weight: 800; color: #059669; }
    .brand-sub { font-size: 12px; color: #9ca3af; margin-top: 3px; }
    .info-grid {
      display: flex;
      gap: 48px;
      margin-bottom: 40px;
    }
    .info-left { flex: 1; }
    .info-right { min-width: 200px; text-align: right; }
    .section-label {
      font-size: 10px;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
    }
    .info-name { font-weight: 700; color: #111827; font-size: 15px; margin-bottom: 3px; }
    .info-text { font-size: 13px; color: #4b5563; margin-bottom: 2px; }
    .status-pill {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .status-paid { background: #d1fae5; color: #065f46; }
    .status-pending { background: #fef3c7; color: #92400e; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
    thead th {
      text-align: left;
      padding: 12px 0;
      font-size: 11px;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-bottom: 2px solid #e5e7eb;
    }
    thead th:nth-child(2),
    thead th:nth-child(3),
    thead th:nth-child(4) { text-align: right; }
    .totals { display: flex; justify-content: flex-end; border-top: 2px solid #e5e7eb; padding-top: 24px; }
    .totals-box { width: 280px; }
    .total-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; }
    .total-row .label { color: #6b7280; }
    .total-row .value { font-weight: 500; color: #111827; }
    .total-final {
      font-size: 17px;
      font-weight: 800;
      border-top: 2px solid #111827;
      padding-top: 14px;
      margin-top: 10px;
    }
    .total-final .label { color: #111827; }
    .total-final .value { color: #059669; }
    .discount-value { color: #059669; }
    .gst-note { font-size: 11px; color: #9ca3af; margin-top: 6px; text-align: right; }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
    }
    .footer-brand { font-size: 13px; font-weight: 600; color: #059669; margin-bottom: 6px; }
    .footer-text { font-size: 12px; color: #9ca3af; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="page">

    <!-- ── Header ─────────────────────────────────────────────────── -->
    <div class="header">
      <div>
        <div class="invoice-label">INVOICE</div>
        <div class="invoice-number">#${order.orderNumber}</div>
      </div>
      <div style="text-align: right;">
        <div class="brand-name">Dev Kant Kumar</div>
        <div class="brand-sub">Digital Services &amp; Products</div>
        <div class="brand-sub">www.devkantkumar.com</div>
      </div>
    </div>

    <!-- ── Info Grid ───────────────────────────────────────────────── -->
    <div class="info-grid">
      <!-- Left column -->
      <div class="info-left">
        <div style="margin-bottom: 28px;">
          <div class="section-label">Billed To</div>
          <div class="info-name">${order.billing?.firstName || ''} ${order.billing?.lastName || ''}</div>
          ${order.billing?.company ? `<div class="info-text">${order.billing.company}</div>` : ''}
          ${billingAddress ? `<div class="info-text">${billingAddress}</div>` : ''}
          <div class="info-text">${order.billing?.email || ''}</div>
          ${order.billing?.phone ? `<div class="info-text">${order.billing.phone}</div>` : ''}
        </div>

        <div>
          <div class="section-label">Sold By</div>
          <div class="info-name">Dev Kant Kumar</div>
          <div class="info-text">Mehta Residency, Near Gajraj Motors, Sindoor</div>
          <div class="info-text">Hazaribagh, Jharkhand 825301, India</div>
          <div class="info-text">support@devkantkumar.com</div>
        </div>
      </div>

      <!-- Right column -->
      <div class="info-right">
        <div style="margin-bottom: 18px;">
          <div class="section-label">Date Issued</div>
          <div class="info-text" style="font-weight: 600; color: #111827;">${formatDate(order.payment?.paidAt || order.createdAt)}</div>
        </div>
        <div style="margin-bottom: 18px;">
          <div class="section-label">Order Date</div>
          <div class="info-text">${formatDate(order.createdAt)}</div>
        </div>
        <div style="margin-bottom: 18px;">
          <div class="section-label">Payment Method</div>
          <div class="info-text" style="text-transform: capitalize;">${order.payment?.method || 'Online'}</div>
        </div>
        <div>
          <div class="section-label">Payment Status</div>
          <span class="status-pill ${isPaid ? 'status-paid' : 'status-pending'}">
            ${isPaid ? 'Paid' : (order.payment?.status || 'Pending')}
          </span>
        </div>
      </div>
    </div>

    <!-- ── Items Table ─────────────────────────────────────────────── -->
    <table>
      <thead>
        <tr>
          <th style="width: 50%;">Description</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml || '<tr><td colspan="4" style="padding: 20px 0; color:#9ca3af; text-align:center;">No items</td></tr>'}
      </tbody>
    </table>

    <!-- ── Totals ──────────────────────────────────────────────────── -->
    <div class="totals">
      <div class="totals-box">
        <div class="total-row">
          <span class="label">Subtotal</span>
          <span class="value">${formatCurrency(subtotal)}</span>
        </div>

        ${tax > 0 ? `
        <div class="total-row">
          <span class="label">${taxLabel}</span>
          <span class="value">${formatCurrency(tax)}</span>
        </div>
        ` : ''}

        ${discount > 0 ? `
        <div class="total-row">
          <span class="label">Discount</span>
          <span class="value discount-value">-${formatCurrency(discount)}</span>
        </div>
        ` : ''}

        <div class="total-row total-final">
          <span class="label">Total</span>
          <span class="value">${formatCurrency(total)}</span>
        </div>

        ${currency === 'INR' && tax > 0
          ? `<div class="gst-note">* Includes ${taxLabel} of ${formatCurrency(tax)}</div>`
          : ''}
      </div>
    </div>

    <!-- ── Footer ─────────────────────────────────────────────────── -->
    <div class="footer">
      <div class="footer-brand">Dev Kant Kumar Marketplace</div>
      <div class="footer-text">
        Thank you for your purchase! For any queries please contact
        <a href="mailto:support@devkantkumar.com" style="color:#059669;">support@devkantkumar.com</a>
      </div>
      <div class="footer-text" style="margin-top: 8px;">
        This is a computer-generated invoice and does not require a physical signature.
      </div>
    </div>

  </div>
</body>
</html>`;
};

// ─────────────────────────────────────────────────────────────────────────────
// PDF Generator
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a PDF buffer for the given order.
 *
 * @param {string} orderId  MongoDB ObjectId string
 * @returns {Promise<{ buffer: Buffer, order: Object }>}
 */
const generateInvoicePDF = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  const html = buildInvoiceHtml(order);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    });

    logger.info(`Invoice PDF generated for order ${order.orderNumber} (${buffer.length} bytes)`);
    return { buffer: Buffer.from(buffer), order };
  } finally {
    if (browser) {
      try { await browser.close(); } catch (_) { /* ignore */ }
    }
  }
};

module.exports = { generateInvoicePDF, buildInvoiceHtml };
