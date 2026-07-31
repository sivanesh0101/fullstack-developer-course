# Task 09 — Local Storage

## 🎯 Objective
Persist cart data across page refreshes using the browser's LocalStorage API.

---

## The Problem
> Refresh the page. The cart is empty. All data is gone.

JavaScript variables live in memory. When the page reloads, memory is cleared. LocalStorage saves data in the browser permanently.

---

## Instructions

```js
// Save cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from LocalStorage
function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}

// Update addToCart and removeFromCart to save
function addToCart(productId) {
    // ... existing logic ...
    saveCart();   // <-- Add this
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();   // <-- Add this
    updateCartUI();
}

// Load on page start
document.addEventListener('DOMContentLoaded', loadCart);
```

### Save Theme Preference (Already done in Module 03)
```js
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
localStorage.removeItem('theme');
localStorage.clear(); // Removes everything
```

---

## 💡 Key Points
| Method | What It Does |
|--------|-------------|
| `setItem(key, value)` | Save a string |
| `getItem(key)` | Read a string (or null) |
| `removeItem(key)` | Delete one item |
| `JSON.stringify()` | Convert object/array to string |
| `JSON.parse()` | Convert string back to object/array |

**Limitation:** LocalStorage only stores **strings**. Always use `JSON.stringify` / `JSON.parse`.

---

[Previous Task ← Search & Filter](./task-08-search-and-filter.md) · [Next Task → Async JavaScript](./task-10-async-javascript.md)

[← Back to Module 06](../README.md)
