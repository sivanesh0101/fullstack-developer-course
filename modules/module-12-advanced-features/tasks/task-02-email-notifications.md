# Task 02 — Email Notifications

## 🎯 Objective

Send order confirmation and password reset emails using Nodemailer.

---

## Instructions

### Install Nodemailer

```bash
npm install nodemailer
```

### Email Service Setup

```js
// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmail({ to, subject, html }) {
    await transporter.sendMail({
        from: `"ShopZone" <${process.env.EMAIL_FROM}>`,
        to,
        subject,
        html
    });
}

module.exports = sendEmail;
```

### Order Confirmation Email

```js
// utils/emailTemplates.js
exports.orderConfirmationHTML = (order) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .header { background: #131921; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .item { display: flex; justify-content: space-between; padding: 10px 0;
                border-bottom: 1px solid #eee; }
        .total { font-size: 20px; font-weight: bold; color: #b12704; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Order Confirmed! 🎉</h1>
    </div>
    <div class="content">
        <p>Hi ${order.user.name},</p>
        <p>Your order <strong>#${order._id}</strong> has been placed successfully.</p>

        <h3>Order Summary</h3>
        ${order.items.map(item => `
            <div class="item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}

        <p class="total">Total: $${order.total.toFixed(2)}</p>
        <p>Payment: ${order.paymentMethod.toUpperCase()}</p>
        <p>We'll notify you when your order ships.</p>
    </div>
</body>
</html>
`;
```

### Send on Order Creation

```js
// controllers/orderController.js
const sendEmail = require('../utils/email');
const { orderConfirmationHTML } = require('../utils/emailTemplates');

exports.createOrder = async (req, res, next) => {
    try {
        const order = await Order.create({
            user: req.user.id,
            ...req.body
        });

        // Send confirmation email
        await sendEmail({
            to: req.user.email,
            subject: `Order Confirmed #${order._id}`,
            html: orderConfirmationHTML(order)
        });

        res.status(201).json({ status: 'success', data: order });
    } catch (error) {
        next(error);
    }
};
```

### Development: Use Mailtrap

For development, use [Mailtrap](https://mailtrap.io/) — it catches emails without sending them to real users.

```env
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass
EMAIL_FROM=noreply@shopzone.com
```

---

[Previous Task ← File Upload](./task-01-file-upload.md) · [Next Task → Payment Integration](./task-03-payment-integration.md)

[← Back to Module 12](../README.md)
