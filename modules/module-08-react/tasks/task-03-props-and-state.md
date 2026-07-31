# Task 03 — Props & State

## 🎯 Objective
Manage data flow with props (parent → child) and state (component-internal data).

---

## Instructions

### useState for Cart
```tsx
import { useState } from 'react';

function App() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Header cartCount={cart.length} cartTotal={cartTotal} />
            <ProductGrid products={products} onAddToCart={addToCart} />
        </>
    );
}
```

### Props vs State
| Feature | Props | State |
|---------|-------|-------|
| Set by | Parent component | Component itself |
| Mutable? | No (read-only) | Yes (via setter) |
| Triggers re-render? | Yes (when parent changes) | Yes (when updated) |

---

[Previous Task ← Components & JSX](./task-02-components-and-jsx.md) · [Next Task → Hooks](./task-04-hooks.md)

[← Back to Module 08](../README.md)
