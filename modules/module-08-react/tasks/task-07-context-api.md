# Task 07 — Context API

## 🎯 Objective
Create global state with React Context for cart and theme data.

---

## Instructions

### Cart Context
```tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => { /* ... */ };
    const removeFromCart = (id: number) => { /* ... */ };
    const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
```

### Usage
```tsx
// In any component:
const { cart, addToCart, cartCount } = useCart();
```

---

[Previous Task ← Forms & Validation](./task-06-forms-and-validation.md) · [Next Task → TSX Typing](./task-08-tsx-typing.md)

[← Back to Module 08](../README.md)
