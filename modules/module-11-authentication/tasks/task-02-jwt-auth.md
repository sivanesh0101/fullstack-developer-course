# Task 02 — JWT Authentication

## 🎯 Objective

Create and verify JSON Web Tokens (JWT) for stateless authentication with Express middleware.

---

## Instructions

### Install JWT

```bash
npm install jsonwebtoken
```

### How JWT Works

```
User logs in → Server creates JWT → Client stores token → Client sends token with requests → Server verifies token
```

A JWT has three parts: `Header.Payload.Signature`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.     ← Header (algorithm)
eyJpZCI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoiYWRta  ← Payload (user data)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c ← Signature (verification)
```

### Auth Middleware

```js
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        // 1. Get token from header
        let token;
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated. Please log in.' });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Check if user still exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User no longer exists.' });
        }

        // 4. Attach user to request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        }
        next(error);
    }
};
```

### Protecting Routes

```js
// routes/orderRoutes.js
const { protect } = require('../middleware/auth');

// All order routes require authentication
router.use(protect);

router.get('/', getMyOrders);
router.post('/', createOrder);
```

### Client-Side: Sending Token

```js
// React — using Axios
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Add token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Usage
const { data } = await api.get('/orders');
```

---

## 💡 Key Concepts

| Concept | Explanation |
|---------|------------|
| **Stateless** | Server doesn't store session data — the token contains everything |
| **Bearer Token** | Token sent in `Authorization: Bearer <token>` header |
| **Payload** | Data stored in the token (user ID, role) — NOT a secret |
| **Signature** | Proves the token wasn't tampered with |
| **Expiration** | Token becomes invalid after a set time |

---

[Previous Task ← Password Hashing](./task-01-password-hashing.md) · [Next Task → Refresh Tokens](./task-03-refresh-tokens.md)

[← Back to Module 11](../README.md)
