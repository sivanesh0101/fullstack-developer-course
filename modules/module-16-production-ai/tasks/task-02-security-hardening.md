# Task 02 — Security Hardening

## 🎯 Objective

Harden the application against OWASP Top 10 vulnerabilities with Helmet, rate limiting, and input sanitization.

---

## Instructions

### Helmet — Security Headers

```bash
npm install helmet
```

```js
const helmet = require('helmet');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'res.cloudinary.com'],
            scriptSrc: ["'self'", 'checkout.razorpay.com'],
            styleSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: ["'self'", 'api.razorpay.com'],
        }
    },
    crossOriginEmbedderPolicy: false, // Needed for Razorpay
}));
```

Helmet sets these headers automatically:
| Header | Protects Against |
|--------|-----------------|
| `X-Content-Type-Options` | MIME sniffing |
| `X-Frame-Options` | Clickjacking |
| `X-XSS-Protection` | Reflected XSS |
| `Strict-Transport-Security` | Protocol downgrade |
| `Content-Security-Policy` | XSS, data injection |

### Rate Limiting

```bash
npm install express-rate-limit
```

```js
const rateLimit = require('express-rate-limit');

// Global rate limit
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                   // 100 requests per window
    message: { error: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', globalLimiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,                    // 10 login attempts per hour
    message: { error: 'Too many login attempts. Try again in 1 hour.' },
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

### Input Sanitization

```bash
npm install express-mongo-sanitize xss
```

```js
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');

// Prevent MongoDB injection: $gt, $where attacks
app.use(mongoSanitize());

// Sanitize user input before saving
function sanitizeProduct(product) {
    return {
        ...product,
        name: xss(product.name),
        description: xss(product.description),
    };
}
```

### OWASP Top 10 Coverage

| # | Vulnerability | Our Defense |
|---|-------------|-------------|
| 1 | Broken Access Control | Role-based middleware |
| 2 | Cryptographic Failures | HTTPS, bcrypt passwords |
| 3 | Injection | Input sanitization, Mongoose |
| 4 | Insecure Design | Validation, minimal data |
| 5 | Security Misconfiguration | Helmet, env vars |
| 6 | Vulnerable Components | `npm audit` regularly |
| 7 | Auth Failures | JWT + refresh tokens |
| 8 | Data Integrity Failures | CSRF tokens, signature verify |
| 9 | Security Logging | Winston logger |
| 10 | SSRF | Whitelist allowed domains |

### Run Security Audit

```bash
npm audit                    # Check for known vulnerabilities
npm audit fix                # Auto-fix safe updates
npm audit fix --force        # Fix all (may break things)
```

---

[Previous Task ← Performance Optimization](./task-01-performance-optimization.md) · [Next Task → AI Product Descriptions](./task-03-ai-product-descriptions.md)

[← Back to Module 16](../README.md)
