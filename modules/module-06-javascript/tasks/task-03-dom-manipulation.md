# Task 03 — DOM Manipulation

## 🎯 Objective
Dynamically create, modify, and remove HTML elements using JavaScript to render product cards from data.

---

## Instructions

### Selecting Elements
```js
const header = document.querySelector('.site-header');
const allCards = document.querySelectorAll('.product-card');
const cartBtn = document.getElementById('cart-btn');
```

### Creating Elements
```js
function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
    `;
    return card;
}
```

### Rendering a Product List
```js
const products = [
    { id: 1, name: "Wireless Headphones", price: 49.99, image: "headphones.jpg" },
    { id: 2, name: "Running Shoes", price: 79.99, image: "shoes.jpg" },
    { id: 3, name: "Backpack", price: 34.99, image: "backpack.jpg" },
];

const grid = document.querySelector('.product-grid');

function renderProducts(productList) {
    grid.innerHTML = ''; // Clear existing
    productList.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

renderProducts(products);
```

### Modifying Elements
```js
// Change text
cartBtn.textContent = 'Cart (3)';

// Change styles
card.style.border = '2px solid #e77600';

// Toggle classes
card.classList.add('selected');
card.classList.remove('selected');
card.classList.toggle('selected');

// Set attributes
card.setAttribute('data-id', '123');
```

---

## 💡 Key Insight
Instead of writing 100 product cards in HTML, you write ONE template and JavaScript generates them from data. This is the foundation of how React works (Module 08).

---

[Previous Task ← Functions](./task-02-functions-and-scope.md) · [Next Task → Events](./task-04-events-and-interactivity.md)

[← Back to Module 06](../README.md)
