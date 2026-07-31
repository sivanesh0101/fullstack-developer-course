# Task 05 — Session Management

## 🎯 Objective

Manage sessions with HTTP-only cookies, secure flags, and CSRF protection.

---

## Instructions

### Cookie Configuration

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Secure cookie settings
const cookieOptions = {
    httpOnly: true,     // Not accessible via JavaScript (prevents XSS)
    secure: process.env.NODE_ENV === 'production',  // HTTPS only
    sameSite: 'strict', // Prevents CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
};

res.cookie('refreshToken', token, cookieOptions);
```

### Logout — Clear Cookies

```js
exports.logout = (req, res) => {
    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0) // Expire immediately
    });
    res.json({ status: 'success', message: 'Logged out' });
};
```

### CSRF Protection

```bash
npm install csurf cookie-parser
```

```js
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Apply to state-changing routes
app.use('/api/orders', csrfProtection);
app.use('/api/cart', csrfProtection);

// Send CSRF token to client
app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
```

### Security Headers

```bash
npm install helmet
```

```js
const helmet = require('helmet');
app.use(helmet()); // Adds security headers automatically
```

---

## 💡 Cookie Flags

| Flag | Protects Against |
|------|-----------------|
| `httpOnly` | XSS (JavaScript can't read the cookie) |
| `secure` | Man-in-the-middle (requires HTTPS) |
| `sameSite: 'strict'` | CSRF (cookie only sent from same site) |
| `maxAge` | Session expiration |

---

## ✅ Expected Output

- Refresh tokens stored in HTTP-only cookies
- Logout clears all auth cookies
- CSRF protection on state-changing routes
- Security headers set via Helmet

---

[Previous Task ← Roles & Permissions](./task-04-roles-and-permissions.md)

[← Back to Module 11](../README.md)
