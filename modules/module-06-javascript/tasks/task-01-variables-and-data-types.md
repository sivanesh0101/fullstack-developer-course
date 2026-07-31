# Task 01 — Variables & Data Types

## 🎯 Objective
Learn JavaScript variables and data types by storing product information.

---

## The Problem
You need to store a product's name, price, stock status, and rating. Where does this data live?

---

## Instructions

### Declaring Variables
```js
// const — cannot be reassigned (use by default)
const productName = "Wireless Headphones";
const price = 49.99;
const inStock = true;

// let — can be reassigned (use when value changes)
let quantity = 1;
let cartTotal = 0;

// Never use var — it has scoping issues
```

### Data Types
```js
// String
const name = "Wireless Headphones";
const description = `Price: $${price}`; // Template literal

// Number
const price = 49.99;
const stock = 150;

// Boolean
const inStock = true;
const onSale = false;

// Null — intentionally empty
const selectedColor = null;

// Undefined — not yet assigned
let shippingAddress;

// Array — ordered list
const categories = ["Electronics", "Fashion", "Books"];

// Object — key-value pairs
const product = {
    name: "Wireless Headphones",
    price: 49.99,
    inStock: true,
    rating: 4.5
};
```

### String Methods
```js
const search = "  Wireless Headphones  ";
search.trim();           // "Wireless Headphones"
search.toLowerCase();    // "  wireless headphones  "
search.includes("Wire"); // true
search.startsWith("  W"); // true
search.split(" ");       // ["", "", "Wireless", "Headphones", "", ""]
```

### Number Operations
```js
const subtotal = price * quantity;     // 49.99
const tax = subtotal * 0.18;           // 8.9982
const total = (subtotal + tax).toFixed(2); // "58.99"
Math.round(tax * 100) / 100;          // 9.00
```

### Type Checking
```js
typeof "hello"   // "string"
typeof 42        // "number"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof null      // "object" (JavaScript quirk!)
typeof []        // "object"
typeof {}        // "object"
Array.isArray([]) // true
```

---

## 💡 Key Rules
| Rule | Reason |
|------|--------|
| Use `const` by default | Prevents accidental reassignment |
| Use `let` only when the value changes | Cart quantity, totals |
| Never use `var` | Scoping issues cause bugs |
| Use template literals (\`\`) | Easier string interpolation |

---

[Next Task → Functions & Scope](./task-02-functions-and-scope.md)

[← Back to Module 06](../README.md)
