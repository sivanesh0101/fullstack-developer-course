# Task 03 — DOM Manipulation

## 🎯 Objective
Dynamically create, modify, and remove HTML elements using JavaScript to render product cards from data.

## 📝 Core DOM Commands Used & Why We Need Them
Instead of manually typing out repetitive HTML, we use the Document Object Model (DOM) to build the webpage dynamically from data. Below is a detailed breakdown of each command used in this task and exactly why we need it.

### 1. Selection (Finding Elements)
Before JavaScript can modify the webpage, it needs a way to "grab" or "select" existing HTML elements. 

*   `document.querySelector('selector')`
    *   **Why it's used:** Used to find the **first** element that matches a specific CSS selector (like a class `.product-grid` or tag `header`). We need this to find the exact empty container where we want to inject our dynamic products.
*   `document.querySelectorAll('selector')`
    *   **Why it's used:** Used to find **all** elements that match a CSS selector. It returns a list (NodeList). We need this when we want to select multiple identical items at once, such as grabbing all `.product-card` elements on the screen to apply a change to them collectively.
*   `document.getElementById('id')`
    *   **Why it's used:** The fastest way to find a single, unique element by its `id` attribute (e.g., `cart-btn`). We use this to grab specific, one-of-a-kind interactive elements like a shopping cart button so we can update its text or listen for clicks.

### 2. Creation & Insertion (Adding Elements)
These commands allow us to conjure new HTML out of thin air and place it onto the page.

*   `document.createElement('tagName')`
    *   **Why it's used:** Creates a brand new, empty HTML element (like an `<article>` or `<div>`) strictly in memory. We need this as the "wrapper" for our new product cards before we fill them with content.
*   `element.innerHTML`
    *   **Why it's used:** Allows us to read or replace the entire HTML content *inside* an element. We use this to quickly inject complex structures (like the product image, title, and price) inside the empty `<article>` we just created, or to quickly clear out an old container (e.g., `grid.innerHTML = ''`).
*   `element.appendChild(childElement)`
    *   **Why it's used:** Takes a newly created element and literally "attaches" it to the end of an existing element on the page. Without this, our dynamically created product cards would exist only in memory and would never actually appear on the screen.

### 3. Modification (Changing Elements)
Once an element exists (either hardcoded in HTML or created via JS), these commands let us alter its properties dynamically.

*   `element.textContent`
    *   **Why it's used:** Safely changes the raw text inside an element. We use this to update the cart count (e.g., changing "Cart (0)" to "Cart (3)") without accidentally rendering any HTML tags.
*   `element.style`
    *   **Why it's used:** Allows us to apply inline CSS styles directly to an element via JavaScript. We need this for dynamic visual changes, like adding a highlighted border when a user clicks a specific product card.
*   `element.className`
    *   **Why it's used:** Overwrites the entire `class` attribute of an element. We use this when we create a new element and need to give it its primary class (e.g., `card.className = 'product-card'`) so the CSS stylesheet recognizes it.
*   `element.classList` *(methods: .add(), .remove(), .toggle())*
    *   **Why it's used:** Provides a smart way to manipulate individual classes without erasing existing ones. We use this to toggle states, like adding a `.selected` class to a product when clicked, and removing it when clicked again.
*   `element.setAttribute('name', 'value')`
    *   **Why it's used:** Allows us to add custom attributes (like `data-id="123"`) to an HTML tag. This is crucial for linking our HTML UI back to our JavaScript data—when a user clicks "Add to Cart", the `data-id` tells the script exactly *which* product was clicked.

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
