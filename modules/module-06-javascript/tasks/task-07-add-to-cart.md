# Task 07 — Add to Cart

## 🎯 Objective
Build a complete Add to Cart system with quantity management, total calculation, and cart display.

---

## The Problem
> "I click Add to Cart. Nothing happens."

This is the task where everything comes together — variables, functions, DOM manipulation, events, arrays, and objects working as one system.

---

## Instructions

### Cart Data Structure
```js
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) return removeFromCart(productId);

    const item = cart.find(item => item.id === productId);
    if (item) item.quantity = newQuantity;

    updateCartUI();
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}
```

### Cart UI
```js
function updateCartUI() {
    // Update cart count in header
    document.querySelector('.cart-count').textContent = getCartCount();

    // Update cart panel
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" width="60">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div>
                <button class="btn-qty-minus" data-id="${item.id}">−</button>
                <span>${item.quantity}</span>
                <button class="btn-qty-plus" data-id="${item.id}">+</button>
            </div>
            <button class="btn-remove" data-id="${item.id}">🗑️</button>
        </div>
    `).join('');

    // Update total
    document.querySelector('.cart-total').textContent = `$${getCartTotal().toFixed(2)}`;
}
```

### Event Delegation for Cart
```js
document.querySelector('.cart-items').addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);

    if (e.target.matches('.btn-qty-plus')) {
        const item = cart.find(i => i.id === id);
        updateQuantity(id, item.quantity + 1);
    }

    if (e.target.matches('.btn-qty-minus')) {
        const item = cart.find(i => i.id === id);
        updateQuantity(id, item.quantity - 1);
    }

    if (e.target.matches('.btn-remove')) {
        removeFromCart(id);
    }
});
```

---

## ✅ Expected Output
- Click "Add to Cart" → cart count updates
- Same product added twice → quantity increments
- Cart panel shows items with + / − / remove buttons
- Total price updates in real-time

---

[Previous Task ← Loops](./task-06-loops-and-iteration.md) · [Next Task → Search & Filter](./task-08-search-and-filter.md)

[← Back to Module 06](../README.md)
