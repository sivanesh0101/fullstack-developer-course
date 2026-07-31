# Task 01 — Performance Optimization

## 🎯 Objective

Optimize the ecommerce app for fast load times with lazy loading, code splitting, and image optimization.

---

## Instructions

### React: Lazy Loading Routes

```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Only load these when the user navigates to them
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin/*" element={<AdminPage />} />
            </Routes>
        </Suspense>
    );
}
```

### Image Optimization

```tsx
// components/OptimizedImage.tsx
interface OptimizedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
}

function OptimizedImage({ src, alt, width, height, priority = false }: OptimizedImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}  // Lazy load images below the fold
            decoding="async"
            style={{ aspectRatio: `${width}/${height}` }}
        />
    );
}
```

### Cloudinary Image Transformations

```js
// utils/cloudinary.js
function getOptimizedImageUrl(publicId, { width, height, quality = 'auto' } = {}) {
    const params = [
        'f_auto',        // Auto format (WebP for browsers that support it)
        `q_${quality}`,  // Auto quality
        width && `w_${width}`,
        height && `h_${height}`,
        'c_limit',       // Don't upscale small images
    ].filter(Boolean).join(',');

    return `https://res.cloudinary.com/YOUR_CLOUD/${params}/v1/${publicId}`;
}

// Usage
getOptimizedImageUrl('products/headphones', { width: 400 });
// → https://res.cloudinary.com/.../f_auto,q_auto,w_400,c_limit/v1/products/headphones
```

### Vite Build Optimizations

```ts
// vite.config.ts
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'query': ['@tanstack/react-query'],
                    'forms': ['react-hook-form', 'zod', '@hookform/resolvers'],
                }
            }
        },
        chunkSizeWarningLimit: 500, // Warn if chunk > 500KB
    }
});
```

### useMemo and useCallback

```tsx
// Prevent expensive recalculations on every render
function ProductGrid({ products, filters }: Props) {
    // Only recalculate when products or filters change
    const filteredProducts = useMemo(() => {
        return products
            .filter(p => filters.category === 'all' || p.category === filters.category)
            .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
            .sort((a, b) => {
                if (filters.sort === 'price-low') return a.price - b.price;
                if (filters.sort === 'price-high') return b.price - a.price;
                return b.rating - a.rating;
            });
    }, [products, filters]);

    // Stable function reference (prevent child re-renders)
    const handleAddToCart = useCallback((id: number) => {
        addToCart(id);
    }, [addToCart]);

    return (/* ... */);
}
```

### Lighthouse Score Targets

Run Chrome DevTools → **Lighthouse** audit and aim for:

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 90 |

---

[Next Task → Security Hardening](./task-02-security-hardening.md)

[← Back to Module 16](../README.md)
