# Task 02 — Deploy Frontend

## 🎯 Objective

Deploy the React production build to Vercel with automatic deployments on every push.

---

## Instructions

### Option A: Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel login
vercel  # Deploy from project root
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Your personal account
- **Link to existing project**: No
- **Project name**: shopzone-frontend
- **Directory**: `./`
- **Build command**: `npm run build`
- **Output directory**: `dist`

### Option B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Configure:
   ```
   Framework Preset: Vite
   Build Command:    npm run build
   Output Directory: dist
   ```
4. Add **Environment Variables**:
   ```
   VITE_API_URL = https://api.shopzone.com/api
   ```
5. Click **Deploy**

### Handle React Router on Vercel

React Router is client-side — Vercel doesn't know `/products/123` is a valid route.

Create `vercel.json` in project root:

```json
{
    "rewrites": [
        { "source": "/(.*)", "destination": "/" }
    ]
}
```

This ensures all routes serve `index.html` and React Router handles them.

### Automatic Deployments

Once connected to GitHub:
- **Push to `main`** → Production deployment
- **Open a Pull Request** → Preview deployment (unique URL for every PR)

### Custom Domain

1. Vercel Dashboard → Your project → **Settings** → **Domains**
2. Add `shopzone.com` and `www.shopzone.com`
3. Update your domain registrar's DNS:
   ```
   Type  Name  Value
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```
4. Wait 24–48 hours for DNS propagation
5. Vercel auto-provisions free SSL via Let's Encrypt

---

## 💡 Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Best for | React/Next.js | Static sites |
| Free tier | Generous | Generous |
| Edge functions | ✅ | ✅ |
| Analytics | ✅ Built-in | Paid |
| Deploy previews | ✅ | ✅ |

---

[Previous Task ← Production Build](./task-01-production-build.md) · [Next Task → Deploy Backend](./task-03-deploy-backend.md)

[← Back to Module 14](../README.md)
