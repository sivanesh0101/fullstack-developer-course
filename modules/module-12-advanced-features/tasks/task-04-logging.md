# Task 04 — Logging

## 🎯 Objective

Add structured logging with Winston and Morgan for debugging and monitoring.

---

## Instructions

### Install

```bash
npm install winston morgan
```

### Winston Logger

```js
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'shopzone-api' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Console output for development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
```

### Morgan HTTP Logging

```js
// server.js
const morgan = require('morgan');
const logger = require('./utils/logger');

// Stream Morgan logs to Winston
const morganStream = { write: (message) => logger.http(message.trim()) };
app.use(morgan('combined', { stream: morganStream }));
```

### Usage Throughout App

```js
const logger = require('../utils/logger');

// In controllers
logger.info('Product created', { productId: product._id, name: product.name });
logger.warn('Low stock alert', { productId: product._id, stock: product.stock });
logger.error('Payment failed', { orderId, error: error.message });

// In error handler
function errorHandler(err, req, res, next) {
    logger.error(err.message, {
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip
    });
    // ... send response
}
```

### Log Levels

| Level | Use Case |
|-------|----------|
| `error` | Application errors, payment failures |
| `warn` | Low stock, rate limit approaching |
| `info` | User actions, order created, login |
| `http` | HTTP requests (via Morgan) |
| `debug` | Detailed debugging information |

---

[Previous Task ← Payment Integration](./task-03-payment-integration.md)

[← Back to Module 12](../README.md)
