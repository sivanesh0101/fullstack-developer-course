# Task 04 — Middleware

## 🎯 Objective
Build custom middleware for logging, authentication, and request validation.

---

## Instructions

### Request Logger
```js
function requestLogger(req, res, next) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
}

app.use(requestLogger);
```

### Auth Middleware
```js
function requireAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}

// Protected route
app.get('/api/orders', requireAuth, getOrders);
```

### Middleware Order
```
Request → CORS → Body Parser → Logger → Auth → Route Handler → Error Handler → Response
```

---

[Previous Task ← REST API Design](./task-03-rest-api-design.md) · [Next Task → Error Handling](./task-05-error-handling.md)

[← Back to Module 09](../README.md)
