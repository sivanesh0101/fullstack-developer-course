# Task 03 — Payment Integration

## 🎯 Objective

Integrate Razorpay (or Stripe) for real checkout and payment processing.

---

## Instructions

### Install Razorpay

```bash
npm install razorpay
```

### Backend: Create Order

```js
// config/razorpay.js
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = razorpay;
```

```js
// controllers/paymentController.js
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

exports.createPaymentOrder = async (req, res, next) => {
    try {
        const { amount } = req.body; // Amount in paise (₹499.99 = 49999)

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects paise
            currency: 'INR',
            receipt: `order_${Date.now()}`
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({
            status: 'success',
            data: {
                orderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                keyId: process.env.RAZORPAY_KEY_ID
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        // Update order status
        await Order.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { status: 'processing', paidAt: new Date(), paymentId: razorpay_payment_id }
        );

        res.json({ status: 'success', message: 'Payment verified' });
    } catch (error) {
        next(error);
    }
};
```

### Frontend: Checkout Button

```tsx
function CheckoutButton({ amount, orderId }: { amount: number; orderId: string }) {
    const handlePayment = async () => {
        // 1. Create Razorpay order on backend
        const { data } = await api.post('/payments/create-order', { amount });

        // 2. Open Razorpay checkout
        const options = {
            key: data.data.keyId,
            amount: data.data.amount,
            currency: data.data.currency,
            order_id: data.data.orderId,
            name: 'ShopZone',
            description: `Order #${orderId}`,
            handler: async (response: any) => {
                // 3. Verify payment on backend
                await api.post('/payments/verify', response);
                alert('Payment successful! 🎉');
            },
            prefill: {
                name: user.name,
                email: user.email
            },
            theme: { color: '#131921' }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    };

    return <button onClick={handlePayment}>Pay ₹{amount}</button>;
}
```

### Payment Flow

```
1. User clicks "Pay Now"
2. Frontend → POST /api/payments/create-order → Razorpay creates order
3. Razorpay checkout modal opens
4. User completes payment
5. Frontend → POST /api/payments/verify → Backend verifies signature
6. Order status updated to "processing"
7. Confirmation email sent
```

---

[Previous Task ← Email Notifications](./task-02-email-notifications.md) · [Next Task → Logging](./task-04-logging.md)

[← Back to Module 12](../README.md)
