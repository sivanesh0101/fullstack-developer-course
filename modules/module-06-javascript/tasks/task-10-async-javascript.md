# Task 10 — Async JavaScript

## 🎯 Objective
Understand asynchronous programming — callbacks, Promises, and async/await.

---

## The Problem
Loading products from a server takes time. JavaScript can't stop and wait — it would freeze the entire page. **Asynchronous code** lets JavaScript do other things while waiting.

---

## Instructions

### Callbacks (old way)
```js
function loadProducts(callback) {
    setTimeout(() => {
        callback([{ id: 1, name: "Headphones" }]);
    }, 1000);
}

loadProducts((products) => {
    console.log(products); // After 1 second
});
```

### Promises (better)
```js
function loadProducts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve([{ id: 1, name: "Headphones" }]);
            } else {
                reject(new Error("Failed to load products"));
            }
        }, 1000);
    });
}

loadProducts()
    .then(products => console.log(products))
    .catch(error => console.error(error))
    .finally(() => console.log("Loading complete"));
```

### Async/Await (modern — recommended)
```js
async function displayProducts() {
    try {
        const products = await loadProducts();
        console.log(products);
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        console.log("Loading complete");
    }
}
```

### Loading States
```js
async function fetchAndRender() {
    showLoader();
    try {
        const products = await loadProducts();
        renderProducts(products);
    } catch (error) {
        showError("Failed to load products. Please try again.");
    } finally {
        hideLoader();
    }
}
```

---

## 💡 Evolution
```
Callbacks → Callback Hell 😱
Promises  → Cleaner, chainable
Async/Await → Reads like synchronous code ✅
```

Always use **async/await** for new code.

---

[Previous Task ← Local Storage](./task-09-local-storage.md) · [Next Task → Fetch API](./task-11-fetch-api.md)

[← Back to Module 06](../README.md)
