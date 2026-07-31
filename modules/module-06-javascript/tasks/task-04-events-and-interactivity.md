# Task 04 — Events & Interactivity

## 🎯 Objective
Handle user interactions — clicks, form submissions, keyboard input — using event listeners and delegation.

---

## Instructions

### Click Events
```js
document.querySelector('.btn-add-cart').addEventListener('click', (e) => {
    const productId = e.target.dataset.id;
    addToCart(productId);
});
```

### Event Delegation (for dynamic elements)
```js
// Instead of adding listeners to each button,
// add ONE listener to the parent
document.querySelector('.product-grid').addEventListener('click', (e) => {
    if (e.target.matches('.btn-add-cart')) {
        const productId = e.target.dataset.id;
        addToCart(productId);
    }
});
```

### Form Events
```js
document.querySelector('.search-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload
    const query = e.target.querySelector('input').value;
    searchProducts(query);
});
```

### Input Events (Real-time search)
```js
document.querySelector('#search-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
});
```

### Keyboard Events
```js
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
```

---

## 💡 Why Event Delegation?
If you dynamically create 100 product cards (Task 03), adding 100 listeners is wasteful. Event delegation uses **one** listener on the parent — events bubble up from child to parent.

---

[Previous Task ← DOM Manipulation](./task-03-dom-manipulation.md) · [Next Task → Arrays & Objects](./task-05-arrays-and-objects.md)

[← Back to Module 06](../README.md)
