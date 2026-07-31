# Task 04 — Environment Management

## 🎯 Objective

Manage multiple environments (development, staging, production) with feature flags and zero-downtime deployments.

---

## Instructions

### Environment Tiers

```
Development (local)
    ↓ PR merged to develop
Staging (pre-production)
    ↓ QA approved, merged to main
Production (live)
```

### Environment Files

```bash
.env                  # Development (never commit)
.env.staging          # Staging (commit without secrets)
.env.production       # Production (commit without secrets)
.env.example          # Template (always commit)
```

```bash
# .env.example — COMMIT THIS
NODE_ENV=development
PORT=3000
MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
EMAIL_HOST=
EMAIL_USER=
EMAIL_PASS=
REDIS_URL=
```

### Config Module

```js
// config/index.js
module.exports = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    },
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
};
```

### Feature Flags

```js
// config/features.js
const features = {
    aiSearch: process.env.FEATURE_AI_SEARCH === 'true',
    razorpay: process.env.FEATURE_RAZORPAY === 'true',
    reviews: process.env.FEATURE_REVIEWS === 'true',
    wishlist: process.env.FEATURE_WISHLIST === 'true',
};

module.exports = features;

// Usage in routes
const features = require('../config/features');

if (features.wishlist) {
    app.use('/api/wishlist', wishlistRoutes);
}
```

### Zero-Downtime Deployment with PM2

```bash
# Deploy without downtime
pm2 reload shopzone-api

# Or with ecosystem:
pm2 reload ecosystem.config.js --env production
```

PM2's `reload` does a rolling restart — starts new processes before killing old ones. Zero dropped requests.

### Health Check Endpoint

```js
// routes/healthRoutes.js
router.get('/health', async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: dbStatus,
        uptime: process.uptime(),
        version: process.env.npm_package_version
    });
});
```

```bash
# Check if deployment succeeded
curl https://api.shopzone.com/health
# {"status":"ok","database":"connected","environment":"production"...}
```

---

## 💡 Deployment Checklist

Before every production deployment:
- [ ] Tests pass in CI
- [ ] Staging tested and approved
- [ ] Database migrations run (if any)
- [ ] Environment variables updated
- [ ] Rollback plan ready
- [ ] Team notified

---

[Previous Task ← Docker](./task-03-docker.md)

[← Back to Module 15](../README.md)
