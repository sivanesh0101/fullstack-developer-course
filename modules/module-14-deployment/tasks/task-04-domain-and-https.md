# Task 04 — Domain & HTTPS

## 🎯 Objective

Configure a custom domain with HTTPS for both the frontend and API.

---

## Instructions

### Buy a Domain

Popular registrars:
- [Namecheap](https://namecheap.com) — `shopzone.in` (~₹900/year)
- [GoDaddy](https://godaddy.com) — widely available
- [Cloudflare Registrar](https://cloudflare.com) — at-cost pricing

### DNS Configuration

After buying `shopzone.com`, configure DNS records:

```
Type    Name      Value                          TTL
A       @         76.76.21.21                    Auto  ← Vercel frontend
CNAME   www       cname.vercel-dns.com           Auto  ← Vercel frontend
CNAME   api       shopzone-api.railway.app       Auto  ← Railway backend
```

### Frontend (Vercel)

Vercel automatically provisions **SSL** via Let's Encrypt for any connected domain.

1. Vercel Dashboard → Project → **Domains**
2. Add `shopzone.com` and `www.shopzone.com`
3. Follow DNS instructions

### API Subdomain

Point `api.shopzone.com` to your backend:

1. Railway Dashboard → Your service → **Settings** → **Custom Domain**
2. Add: `api.shopzone.com`
3. Verify DNS CNAME record

Update your React environment:
```env
VITE_API_URL=https://api.shopzone.com/api
```

### Understanding HTTPS

```
Browser → HTTPS Request → SSL Certificate → Encrypted Connection → Server
```

- **SSL/TLS**: Encrypts data in transit
- **Let's Encrypt**: Free SSL certificate authority
- **HSTS**: Forces HTTPS even if user types `http://`

### Set HSTS Header in Express

```js
const helmet = require('helmet');
app.use(helmet({
    hsts: {
        maxAge: 31536000,       // 1 year
        includeSubDomains: true,
        preload: true
    }
}));
```

---

## ✅ Expected Output

- `https://shopzone.com` → React frontend
- `https://api.shopzone.com/api/products` → API
- ✅ Padlock icon in browser (HTTPS)
- No mixed content warnings

---

[Previous Task ← Deploy Backend](./task-03-deploy-backend.md) · [Next Task → PM2 & Nginx](./task-05-pm2-nginx.md)

[← Back to Module 14](../README.md)
