# Task 05 — Arrays & Objects

## 🎯 Objective
Model product data using arrays and objects with destructuring, spread syntax, and safe navigation operators.

---

## 📝 Core Data Concepts

Web applications (e-commerce stores, social media feeds, CRMs) handle dynamic data fetched from APIs and databases. JavaScript uses **Arrays** and **Objects** as the primary building blocks to structure and manipulate this data.

---

## Instructions

### 1. Product Data Structure (Array of Objects)
An **Object `{}`** represents a single entity (one product with key-value pairs like `name` or `price`). An **Array `[]`** holds an ordered collection of these objects.

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

---

### 2. Destructuring (Unpacking Values)
Destructuring allows you to extract properties from objects or elements from arrays directly into variables without repetitive `object.property` syntax.

#### Object Destructuring
Unpack specific properties from an object into standalone variables:
```js
const { name, price, category } = products[0];
console.log(name); // Output: "Wireless Headphones"
```

#### Array Destructuring
Unpack array items based on their position/index:
```js
const [firstProduct, secondProduct] = products;
console.log(firstProduct.name); // "Wireless Headphones"
```

#### Function Parameter Destructuring
Unpack properties directly in function arguments for cleaner function signatures:
```js
function displayProduct({ name, price, rating }) {
    return `${name} — $${price} (${rating}⭐)`;
}

console.log(displayProduct(products[0])); // "Wireless Headphones — $49.99 (4.5⭐)"
```

---

### 3. Spread (`...`) & Rest Syntax
The three dots `...` serve two distinct purposes based on where they are used:

#### Spread Syntax (Unpacking / Copying Data)
Used to copy or merge arrays and objects **immutably** (without modifying the original data):

```js
// Copy an array (creates a new array instance)
const productsCopy = [...products];

// Add a new item to an array immutably
const newProduct = { id: 3, name: "Smartwatch", price: 199.99 };
const updatedProducts = [...products, newProduct];

// Copy an object and override specific properties
const discountedProduct = { 
    ...products[0], 
    price: 39.99,   // Overrides original price of 49.99
    onSale: true    // Adds new property
};
```

#### Rest Parameters (Gathering Remaining Items)
Gathers multiple remaining arguments into a single array parameter:
```js
function logProducts(first, ...rest) {
    console.log(`Featured: ${first.name}`);
    console.log(`Others count: ${rest.length} products`);
}

logProducts(products[0], products[1]); 
// Featured: Wireless Headphones
// Others count: 1 products
```

---

### 4. Optional Chaining (`?.`) & Nullish Coalescing (`??`)

#### Optional Chaining (`?.`)
Prevents application crashes (`TypeError: Cannot read properties of undefined`) when reading deeply nested properties from optional or missing API data. If any link in the chain is `null` or `undefined`, it short-circuits and returns `undefined`.

* `product?.reviews?.[0]?.text`

#### Nullish Coalescing (`??`)
Provides a fallback default value **ONLY** when the left-hand side is `null` or `undefined`. Unlike `||` (OR), it preserves valid values like `0`, `""`, and `false`.

| Value | `value \|\| "Default"` | `value ?? "Default"` | Explanation |
| :--- | :--- | :--- | :--- |
| `null` | `"Default"` | **`"Default"`** | Value is missing |
| `undefined` | `"Default"` | **`"Default"`** | Value is missing |
| `0` | `"Default"` ❌ *(Bug)* | **`0`** ✅ | `0` is a valid number |
| `""` | `"Default"` ❌ *(Bug)* | **`""`** ✅ | Empty string is valid text |

#### Combined Example: Safe Access with Fallback
```js
// Safely reads review text without crashing if reviews are missing,
// and falls back to "No reviews yet" if undefined:
const review = product?.reviews?.[0]?.text ?? "No reviews yet";
```

---

[Previous Task ← Events](./task-04-events-and-interactivity.md) · [Next Task → Loops & Iteration](./task-06-loops-and-iteration.md)

[← Back to Module 06](../README.md)
