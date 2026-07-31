# Task 02 — Functions & Scope

## 🎯 Objective
Write reusable functions for calculating prices, formatting currency, and handling cart operations.

---

## Instructions

### Function Declarations
```js
function calculateTotal(price, quantity) {
    return price * quantity;
}

function formatPrice(amount) {
    return `$${amount.toFixed(2)}`;
}

console.log(formatPrice(calculateTotal(49.99, 3))); // "$149.97"
```

### Arrow Functions
```js
const calculateTax = (subtotal, rate = 0.18) => subtotal * rate;
const isInStock = (quantity) => quantity > 0;
const greet = (name) => `Hello, ${name}!`;

// One-liner with implicit return
const double = x => x * 2;
```

### Default Parameters
```js
function addToCart(productId, quantity = 1) {
    console.log(`Added ${quantity} of product ${productId}`);
}

addToCart("WH-500");    // Added 1 of product WH-500
addToCart("WH-500", 3); // Added 3 of product WH-500
```

### Closures
```js
function createCart() {
    let items = [];  // Private — only accessible via returned functions

    return {
        add(item) { items.push(item); },
        remove(id) { items = items.filter(i => i.id !== id); },
        getItems() { return [...items]; },
        getTotal() { return items.reduce((sum, i) => sum + i.price * i.quantity, 0); }
    };
}

const cart = createCart();
cart.add({ id: 1, name: "Headphones", price: 49.99, quantity: 1 });
console.log(cart.getTotal()); // 49.99
```

### Higher-Order Functions
```js
// Function that takes a function as argument
function applyDiscount(price, discountFn) {
    return discountFn(price);
}

const tenPercentOff = (price) => price * 0.9;
const flatDiscount = (amount) => (price) => price - amount;

applyDiscount(100, tenPercentOff);        // 90
applyDiscount(100, flatDiscount(15));     // 85
```

---

## 💡 Key Takeaways
- Use arrow functions for short, one-line operations
- Use function declarations for complex, named functions
- Closures let you create **private state** (like cart items)
- Higher-order functions are the foundation of `map`, `filter`, `reduce`

---

[Previous Task ← Variables](./task-01-variables-and-data-types.md) · [Next Task → DOM Manipulation](./task-03-dom-manipulation.md)

[← Back to Module 06](../README.md)
