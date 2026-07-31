# Task 07 — Redis Caching

## 🎯 Objective

Cache frequently accessed data with Redis to reduce database load and speed up responses.

---

## The Problem

Every time a user visits the homepage, the API queries MongoDB for the same product list. With 10,000 concurrent users, that's 10,000 identical database queries per second. **Redis** stores data in memory for instant access.

---

## Instructions

### Setup

```bash
npm install redis
```

### Redis Connection

```js
// config/redis.js
const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('connect', () => console.log('✅ Redis connected'));

redisClient.connect();

module.exports = redisClient;
```

### Caching Middleware

```js
// middleware/cache.js
const redisClient = require('../config/redis');

function cache(duration) {
    return async (req, res, next) => {
        const key = `cache:${req.originalUrl}`;

        try {
            const cached = await redisClient.get(key);
            if (cached) {
                console.log(`Cache HIT: ${key}`);
                return res.json(JSON.parse(cached));
            }
            console.log(`Cache MISS: ${key}`);

            // Store original res.json to intercept the response
            const originalJson = res.json.bind(res);
            res.json = async (data) => {
                await redisClient.setEx(key, duration, JSON.stringify(data));
                originalJson(data);
            };

            next();
        } catch (error) {
            next(); // If Redis fails, skip caching
        }
    };
}

module.exports = cache;
```

### Usage

```js
const cache = require('../middleware/cache');

// Cache product list for 5 minutes (300 seconds)
router.get('/', cache(300), getAllProducts);

// Cache single product for 10 minutes
router.get('/:id', cache(600), getProduct);

// DON'T cache: POST, PUT, DELETE — they modify data
```

### Invalidate Cache on Updates

```js
// When a product is updated or deleted, clear the cache
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(/* ... */);

        // Clear related caches
        await redisClient.del(`cache:/api/products/${req.params.id}`);
        await redisClient.del('cache:/api/products');

        res.json({ status: 'success', data: product });
    } catch (error) {
        next(error);
    }
};
```

---

## 💡 When to Cache

| Cache? | Resource | Reason |
|--------|----------|--------|
| ✅ Yes | Product listing | Read-heavy, rarely changes |
| ✅ Yes | Categories | Almost never changes |
| ❌ No | Cart | User-specific, changes frequently |
| ❌ No | Order creation | Must be real-time |
| ✅ Yes | Product detail | Read-heavy |

### Performance Difference

```
Without cache:  GET /api/products → ~150ms (MongoDB query)
With cache:     GET /api/products → ~2ms   (Redis in-memory)
```

**75x faster.**

---

[Previous Task ← Indexes & Aggregation](./task-06-indexes-and-aggregation.md)

[← Back to Module 10](../README.md)
