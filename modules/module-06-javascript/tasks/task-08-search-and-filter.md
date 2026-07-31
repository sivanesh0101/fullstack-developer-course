# Task 08 — Search & Filter

## 🎯 Objective
Implement real-time product search, category filtering, and price sorting.

---

## Instructions

```js
// Real-time search
document.querySelector('#search-input').addEventListener('input', (e) => {
    applyFilters();
});

// Category filter
document.querySelector('#category-filter').addEventListener('change', (e) => {
    applyFilters();
});

// Sort
document.querySelector('#sort-select').addEventListener('change', (e) => {
    applyFilters();
});

function applyFilters() {
    const searchQuery = document.querySelector('#search-input').value.toLowerCase();
    const category = document.querySelector('#category-filter').value;
    const sortBy = document.querySelector('#sort-select').value;

    let filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery) ||
                              p.tags.some(t => t.includes(searchQuery));
        const matchesCategory = category === 'all' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    // Sort
    switch (sortBy) {
        case 'price-low':  filtered.sort((a, b) => a.price - b.price); break;
        case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
        case 'rating':     filtered.sort((a, b) => b.rating - a.rating); break;
        case 'name':       filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    renderProducts(filtered);

    // Show result count
    document.querySelector('.result-count').textContent =
        `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`;
}
```

---

## ✅ Expected Output
- Type in search → products filter instantly
- Select category → shows only matching products
- Change sort → products reorder
- Result count updates in real-time

---

[Previous Task ← Add to Cart](./task-07-add-to-cart.md) · [Next Task → Local Storage](./task-09-local-storage.md)

[← Back to Module 06](../README.md)
