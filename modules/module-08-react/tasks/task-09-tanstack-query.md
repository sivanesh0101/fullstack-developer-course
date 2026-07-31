# Task 09 — TanStack Query

## 🎯 Objective
Manage server state with TanStack Query — caching, refetching, loading/error states.

---

## Instructions

```bash
npm install @tanstack/react-query
```

```tsx
import { useQuery } from '@tanstack/react-query';

function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('https://fakestoreapi.com/products');
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json() as Promise<Product[]>;
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });
}

function ProductsPage() {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <Spinner />;
    if (error) return <ErrorMessage message={error.message} />;

    return <ProductGrid products={products!} />;
}
```

### Why TanStack Query over useEffect?
| Feature | useEffect + useState | TanStack Query |
|---------|---------------------|----------------|
| Caching | ❌ Manual | ✅ Automatic |
| Refetch on focus | ❌ Manual | ✅ Built-in |
| Loading/error states | Manual | ✅ Automatic |
| Deduplication | ❌ | ✅ |
| Background updates | ❌ | ✅ |

---

[Previous Task ← TSX Typing](./task-08-tsx-typing.md) · [Next Task → React Ecommerce](./task-10-react-ecommerce.md)

[← Back to Module 08](../README.md)
