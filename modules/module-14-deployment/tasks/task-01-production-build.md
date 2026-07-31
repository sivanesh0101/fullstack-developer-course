# Task 01 — Production Build

## 🎯 Objective

Create an optimized production build of the React frontend with Vite.

---

## Instructions

### Step 1: Set Production Environment Variables

Create `.env.production` in your React project:

```env
VITE_API_URL=https://api.shopzone.com/api
VITE_RAZORPAY_KEY=rzp_live_XXXXXXXXXX
VITE_CLOUDINARY_CLOUD=your-cloud-name
```

> **Critical:** Variables prefixed with `VITE_` are bundled into the client. **Never put secrets here.**

### Step 2: Build the App

```bash
npm run build
```

Vite creates a `dist/` folder:
```
dist/
├── index.html
├── assets/
│   ├── index-Cf6iLqVo.js    ← Minified + bundled JavaScript
│   ├── index-B3kM2qOb.css   ← Minified CSS
│   └── logo-CKfj0BsP.webp   ← Optimized images
```

### Step 3: Preview the Build Locally

```bash
npm run preview  # Serves dist/ at localhost:4173
```

Check that everything works before deploying.

### Step 4: Analyze Bundle Size

```bash
npm install -D rollup-plugin-visualizer
```

```js
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        react(),
        visualizer({ open: true }) // Opens bundle map in browser
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Split vendor libs into separate chunk
                    'react-vendor': ['react', 'react-dom'],
                    'router': ['react-router-dom'],
                    'query': ['@tanstack/react-query'],
                }
            }
        }
    }
});
```

### Step 5: Check Build Output

```bash
npm run build
```

```
✓ 47 modules transformed.
dist/index.html                   0.46 kB
dist/assets/react-vendor.js      142.25 kB │ gzip: 45.79 kB
dist/assets/index.js              68.14 kB │ gzip: 22.05 kB
dist/assets/index.css              8.21 kB │ gzip: 2.43 kB
```

Good bundle size targets:
- Total JS (gzipped): **< 150 kB**
- CSS (gzipped): **< 20 kB**

---

## 💡 Production vs Development Build

| Feature | Development | Production |
|---------|------------|-----------|
| Minification | ❌ | ✅ Removes spaces/comments |
| Tree-shaking | Partial | ✅ Removes unused code |
| Source maps | ✅ Detailed | Minimal |
| HMR | ✅ | ❌ |
| Build speed | Fast | Slower (optimizing) |
| Bundle size | Large | ✅ Small |

---

[Next Task → Deploy Frontend](./task-02-deploy-frontend.md)

[← Back to Module 14](../README.md)
