# Task 11 — Fetch API

## 🎯 Objective
Load product data from an external API using the Fetch API.

---

## The Problem
Products are currently hardcoded in a JavaScript array. Real ecommerce sites load products from a server. The **Fetch API** makes HTTP requests to get data.

---

## Instructions

### Basic Fetch
```js
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    return products;
}
```

### With Error Handling
```js
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        showError(`Failed to load products: ${error.message}`);
    }
}
```

### With Loading State
```js
async function loadProductsFromAPI() {
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = '<div class="spinner"></div>';

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Network error');

        const products = await response.json();

        if (products.length === 0) {
            grid.innerHTML = '<p>No products found.</p>';
            return;
        }

        renderProducts(products);
    } catch (error) {
        grid.innerHTML = `
            <div class="error-message">
                <p>😔 Failed to load products</p>
                <button onclick="loadProductsFromAPI()">Try Again</button>
            </div>
        `;
    }
}

// Load on page start
document.addEventListener('DOMContentLoaded', loadProductsFromAPI);
```

### Fetch with Query Parameters
```js
async function fetchByCategory(category) {
    const url = `https://fakestoreapi.com/products/category/${category}`;
    const response = await fetch(url);
    return response.json();
}
```

---

## 💡 HTTP Response Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK — success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---

## ✅ Expected Output
- Products load from an external API on page load
- Loading spinner shows while fetching
- Error message with "Try Again" button on failure
- Products render dynamically from API data

---

[Previous Task ← Async JavaScript](./task-10-async-javascript.md)

[← Back to Module 06](../README.md)
