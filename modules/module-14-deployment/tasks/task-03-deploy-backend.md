# Task 03 — Deploy Backend

## 🎯 Objective

Deploy the Node.js API and MongoDB to Railway (or Render) for a production backend.

---

## Instructions

### Option A: Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Or connect via **railway.app** dashboard:
1. **New Project** → **Deploy from GitHub repo**
2. Select your backend repo
3. Railway auto-detects Node.js

### Set Environment Variables on Railway

Railway Dashboard → Your service → **Variables**:

```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=another-secret-key
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
EMAIL_HOST=smtp.mailtrap.io
EMAIL_USER=...
EMAIL_PASS=...
```

### Prepare `package.json`

Railway runs `npm start` — make sure it's defined:

```json
{
    "scripts": {
        "dev": "nodemon server.js",
        "start": "node server.js"
    },
    "engines": {
        "node": ">=18.0.0"
    }
}
```

### MongoDB Atlas — Whitelist Railway IP

Railway uses dynamic IPs. In MongoDB Atlas → **Network Access**:
- Add IP: `0.0.0.0/0` (allow all) for development
- For production: get Railway's static IP (requires paid plan)

### Option B: Render

1. **New** → **Web Service** → Connect GitHub repo
2. Configure:
   ```
   Name:         shopzone-api
   Region:       Singapore (closest to India)
   Branch:       main
   Build Command: npm install
   Start Command: node server.js
   ```
3. Add environment variables
4. Deploy

### Verify Deployment

```bash
curl https://shopzone-api.railway.app/api/products
# Should return your product list
```

---

## 💡 Railway vs Render vs Heroku

| Feature | Railway | Render | Heroku |
|---------|---------|--------|--------|
| Free tier | $5 credit/month | ✅ 750hrs/month | ❌ Removed |
| Sleep on idle | ❌ | ✅ (free tier) | N/A |
| Auto-deploy | ✅ | ✅ | ✅ |
| Docker support | ✅ | ✅ | ✅ |
| India latency | Medium | Low (SG) | High |

---

[Previous Task ← Deploy Frontend](./task-02-deploy-frontend.md) · [Next Task → Domain & HTTPS](./task-04-domain-and-https.md)

[← Back to Module 14](../README.md)
