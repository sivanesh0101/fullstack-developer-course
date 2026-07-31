# Task 05 — Refactor to TypeScript

## 🎯 Objective
Convert your JavaScript ecommerce project to TypeScript step by step.

---

## Step-by-Step Refactoring

### 1. Rename files: `.js` → `.ts`
### 2. Add type definitions for product data
### 3. Type all function parameters and return values
### 4. Type DOM element selections
### 5. Fix all TypeScript errors

### Example: Cart Functions

**Before (JavaScript):**
```js
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
}
```

**After (TypeScript):**
```ts
let cart: CartItem[] = [];

function addToCart(productId: number): void {
    const product = products.find((p): p is Product => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}
```

### DOM Type Assertions
```ts
const searchInput = document.querySelector('#search-input') as HTMLInputElement;
const form = document.querySelector('.search-form') as HTMLFormElement;
const grid = document.querySelector('.product-grid') as HTMLElement;

// Or with null check
const btn = document.querySelector('.btn-add-cart');
if (btn instanceof HTMLButtonElement) {
    btn.addEventListener('click', handleClick);
}
```

---

## ✅ Expected Output
Your entire ecommerce project now runs in TypeScript with zero type errors. The compiled output is identical JavaScript.

---

[Previous Task ← Modules & Config](./task-04-modules-and-config.md) · [Next Task → Advanced Types](./task-06-advanced-types.md)

[← Back to Module 07](../README.md)
