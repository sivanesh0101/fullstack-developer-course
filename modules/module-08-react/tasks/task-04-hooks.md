# Task 04 — Hooks

## 🎯 Objective
Use React hooks — useEffect for side effects, useRef for DOM access, and custom hooks for reusable logic.

---

## Instructions

### useEffect — Fetching Products
```tsx
import { useState, useEffect } from 'react';

function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []); // Empty dependency array = runs once on mount

    return { products, loading, error };
}
```

### useRef — Focus Input
```tsx
const searchRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    searchRef.current?.focus();
}, []);

<input ref={searchRef} type="search" placeholder="Search..." />
```

### Custom Hook — useLocalStorage
```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}

// Usage
const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
```

---

[Previous Task ← Props & State](./task-03-props-and-state.md) · [Next Task → React Router](./task-05-react-router.md)

[← Back to Module 08](../README.md)
