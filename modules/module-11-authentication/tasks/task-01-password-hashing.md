# Task 01 — Password Hashing

## 🎯 Objective

Hash passwords with bcrypt — never store passwords in plain text.

---

## The Problem

```js
// ❌ NEVER do this
const users = [
    { email: "john@email.com", password: "password123" }
];
```

If your database is breached, every user's password is exposed. **Hashing** converts passwords into irreversible strings. Even if the hash is stolen, the original password cannot be recovered.

---

## Instructions

### Install bcrypt

```bash
npm install bcrypt
```

### How Hashing Works

```js
const bcrypt = require('bcrypt');

// Hash a password
const password = "mySecurePassword123";
const saltRounds = 12;

const hash = await bcrypt.hash(password, saltRounds);
// "$2b$12$LJ3m4iM5MzMkD8.Vx5kKuO8QYzPGFPD0X9YTvF4Kx3tPzR5q2C6e"

// Compare a password with its hash
const isMatch = await bcrypt.compare("mySecurePassword123", hash); // true
const isWrong = await bcrypt.compare("wrongPassword", hash);       // false
```

### Register User

```js
// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create user (password is hashed automatically via pre-save hook)
        const user = await User.create({ name, email, password });

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.status(201).json({
            status: 'success',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};
```

### Login User

```js
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        // Find user and include password (normally excluded by select: false)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            status: 'success',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};
```

---

## 💡 Security Rules

| Rule | Why |
|------|-----|
| Never store plain text passwords | Database breaches expose all passwords |
| Use bcrypt (not MD5/SHA) | bcrypt is intentionally slow — harder to brute-force |
| Use 12+ salt rounds | Higher = slower = more secure |
| Never log passwords | Even in development |
| Same error for wrong email AND password | Prevents email enumeration |

### What Salt Rounds Mean

```
Rounds  →  Time to hash
10      →  ~10ms
12      →  ~40ms   ← Recommended
14      →  ~150ms
16      →  ~600ms
```

Higher rounds = more secure but slower. 12 is the sweet spot.

---

## ✅ Expected Output

- `POST /api/auth/register` creates user with hashed password
- `POST /api/auth/login` compares password and returns JWT
- Database stores `$2b$12$...` instead of plain text

---

[Next Task → JWT Authentication](./task-02-jwt-auth.md)

[← Back to Module 11](../README.md)
