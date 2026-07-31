# Task 05 — Error Handling

## 🎯 Objective
Build a centralized error handling system with custom error classes.

---

## Instructions

### Custom Error Class
```js
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

// Usage
throw new AppError('Product not found', 404);
throw new AppError('Invalid email format', 400);
```

### Error Middleware
```js
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal server error';

    console.error(`[ERROR] ${statusCode}: ${err.message}`);

    res.status(statusCode).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

// Must be LAST middleware
app.use(errorHandler);
```

### Async Wrapper
```js
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/products/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new AppError('Product not found', 404);
    res.json(product);
}));
```

---

[Previous Task ← Middleware](./task-04-middleware.md) · [Next Task → Environment Config](./task-06-environment-config.md)

[← Back to Module 09](../README.md)
