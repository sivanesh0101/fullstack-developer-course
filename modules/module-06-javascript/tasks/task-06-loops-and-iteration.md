# Task 06 — Loops & Iteration

## 🎯 Objective
Use loops and array methods to display, filter, sort, and transform product data.

---

## Instructions

### Array Methods (the modern way)

```js
// forEach — do something for each item
products.forEach(product => {
    console.log(product.name);
});

// map — transform each item into something new
const productNames = products.map(p => p.name);
const priceLabels = products.map(p => `$${p.price.toFixed(2)}`);

// filter — keep items that pass a test
const electronics = products.filter(p => p.category === "electronics");
const affordable = products.filter(p => p.price < 50);
const inStock = products.filter(p => p.inStock);

// find — get the first match
const headphones = products.find(p => p.id === 1);

// some / every — check conditions
const hasExpensive = products.some(p => p.price > 100);   // boolean
const allInStock = products.every(p => p.inStock);         // boolean

// reduce — accumulate a single value
const totalValue = products.reduce((sum, p) => sum + p.price, 0);
const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// sort — order items
const byPrice = [...products].sort((a, b) => a.price - b.price);        // Low to high
const byPriceDesc = [...products].sort((a, b) => b.price - a.price);    // High to low
const byName = [...products].sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical

// Chaining
const topAffordable = products
    .filter(p => p.price < 50)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map(p => p.name);
```

---

## 💡 When to Use What
| Method | Returns | Use When |
|--------|---------|----------|
| `forEach` | `undefined` | Side effects (logging, DOM updates) |
| `map` | New array | Transforming data |
| `filter` | New array | Selecting subset of data |
| `find` | Single item | Finding one specific item |
| `reduce` | Any value | Calculating totals, grouping |
| `sort` | Sorted array | Ordering data |

---

[Previous Task ← Arrays & Objects](./task-05-arrays-and-objects.md) · [Next Task → Add to Cart](./task-07-add-to-cart.md)

[← Back to Module 06](../README.md)
