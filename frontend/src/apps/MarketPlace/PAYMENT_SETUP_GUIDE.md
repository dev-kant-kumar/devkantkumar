# Payment System Setup & Testing Guide

## 1. Environment Configuration

### Backend (.env)
You have already configured this!
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### Frontend (.env)
**Crucial:** Ensure your `frontend/.env` file contains the Razorpay Key ID. This is required for the checkout modal to open.

Create or update `frontend/.env`:
```env
VITE_RAZORPAY_KEY_ID=your_key_id_here
```
*(This must match the `RAZORPAY_KEY_ID` in your backend .env)*

## 2. Testing the Payment Flow

### Step 1: Add Item to Cart
1.  Go to the Marketplace.
2.  Add a product or service to your cart.
3.  Proceed to Checkout.

### Step 2: Checkout
1.  Fill in the billing details.
2.  Click **"Pay Now"**.
3.  The Razorpay modal should open.

### Step 3: Complete Payment (Test Mode)
1.  If you are in **Test Mode**, Razorpay provides a success/failure simulation.
2.  Choose "Success".
3.  The modal should close.
4.  You should be redirected to the **Order Confirmed** page.

### Step 4: Verification
1.  **Frontend:** You should see the success message.
2.  **Backend Console:** You should see logs indicating:
    -   `Razorpay Order Created: order_...`
    -   `MongoDB Order Created: ...`
    -   `Payment verified for order ...` (triggered by frontend)
    -   `Razorpay Webhook Event: payment.captured` (triggered by Razorpay server)

## 3. Testing the Webhook (Fail-Safe)

To verify that the webhook works even if the frontend fails:

1.  Start a checkout flow.
2.  Open the Razorpay modal and complete the payment.
3.  **IMMEDIATELY** close the browser tab *before* the "Order Confirmed" screen appears.
    -   *This simulates a user losing internet connection or crashing right after paying.*
4.  Wait for 1-2 minutes.
5.  Check your **Razorpay Dashboard**: The payment should be "Captured".
6.  Check your **MongoDB / Admin Panel**: The order status should be **"Confirmed"** or **"Completed"**.

If the order is confirmed despite you closing the tab, the Webhook is working perfectly!
