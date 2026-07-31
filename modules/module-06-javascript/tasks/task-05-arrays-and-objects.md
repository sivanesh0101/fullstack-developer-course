# Task 05 — Arrays & Objects

## 🎯 Objective
Model product data using arrays and objects with destructuring and spread syntax.

---

## Instructions

### Product Data Structure
```js
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 49.99,
        category: "electronics",
        rating: 4.5,
        inStock: true,
        tags: ["wireless", "audio", "bluetooth"]
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 79.99,
        category: "fashion",
        rating: 4.2,
        inStock: true,
        tags: ["sports", "running", "shoes"]
    }
];
```

### Destructuring
```js
// Object destructuring
const { name, price, category } = products[0];
console.log(name); // "Wireless Headphones"

// Array destructuring
const [first, second] = products;

// Function parameter destructuring
function displayProduct({ name, price, rating }) {
    return `${name} — $${price} (${rating}⭐)`;
}
```

### Spread & Rest
```js
// Copy an array
const productsCopy = [...products];

// Add to array
const updated = [...products, newProduct];

// Copy an object with overrides
const discounted = { ...products[0], price: 39.99, onSale: true };

// Rest parameters
function logProducts(first, ...rest) {
    console.log(`Featured: ${first.name}`);
    console.log(`Others: ${rest.length} products`);
}
```

### Optional Chaining
```js
const review = product?.reviews?.[0]?.text ?? "No reviews yet";
```

---

[Previous Task ← Events](./task-04-events-and-interactivity.md) · [Next Task → Loops & Iteration](./task-06-loops-and-iteration.md)

[← Back to Module 06](../README.md)
