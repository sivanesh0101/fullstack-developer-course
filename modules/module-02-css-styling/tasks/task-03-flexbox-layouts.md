# Task 03 — Flexbox Layouts

## 🎯 Objective

Use CSS Flexbox to build the navigation bar, header layout, and product grid.

---

## The Problem

Your navigation links need to be in a horizontal row. The header needs the logo on the left, search in the center, and account links on the right. The product cards need to wrap into a grid. How do you arrange elements **side by side** and control their alignment?

---

## Instructions

### Step 1: Flexbox Basics

```css
.container {
    display: flex;           /* Turns children into flex items */
    flex-direction: row;     /* row (default) | column */
    justify-content: center; /* Main axis alignment */
    align-items: center;     /* Cross axis alignment */
    gap: 16px;               /* Space between items */
}
```

### Step 2: Build the Header with Flexbox

```html
<header class="site-header">
    <div class="header-logo">
        <a href="index.html">ShopZone</a>
    </div>
    <div class="header-search">
        <form class="search-form">
            <select name="category">
                <option>All</option>
            </select>
            <input type="search" placeholder="Search ShopZone">
            <button type="submit">Search</button>
        </form>
    </div>
    <div class="header-actions">
        <a href="login.html">Sign In</a>
        <a href="orders.html">Orders</a>
        <a href="cart.html">Cart (0)</a>
    </div>
</header>
```

```css
.site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #131921;
    color: white;
}

.header-logo a {
    font-size: 24px;
    font-weight: bold;
    color: white;
    text-decoration: none;
}

.header-search {
    flex: 1;                /* Takes remaining space */
    max-width: 600px;
    margin: 0 20px;
}

.search-form {
    display: flex;
}

.search-form select {
    border-radius: 4px 0 0 4px;
    border: none;
    padding: 8px;
    background: #e6e6e6;
}

.search-form input {
    flex: 1;
    padding: 8px 12px;
    border: none;
    font-size: 14px;
}

.search-form button {
    background-color: #febd69;
    border: none;
    padding: 8px 16px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

.header-actions {
    display: flex;
    gap: 16px;
}

.header-actions a {
    color: white;
    text-decoration: none;
    font-size: 14px;
}
```

### Step 3: Build the Navigation Bar

```css
nav ul {
    display: flex;
    list-style: none;
    gap: 4px;
    padding: 0;
}

nav a {
    display: block;
    padding: 8px 12px;
    color: white;
    text-decoration: none;
    border-radius: 2px;
}

nav a:hover {
    border: 1px solid white;
}
```

### Step 4: Product Grid with Flexbox

```css
.product-grid {
    display: flex;
    flex-wrap: wrap;        /* Allows items to wrap to next row */
    gap: 20px;
    padding: 20px;
    justify-content: center;
}

.product-card {
    flex: 0 1 280px;        /* Don't grow, can shrink, base width 280px */
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column; /* Stack content vertically inside card */
}

.product-card img {
    width: 100%;
    height: 200px;
    object-fit: contain;    /* Fit image without cropping */
}

.product-card .product-price {
    margin-top: auto;       /* Pushes price to bottom of card */
    font-size: 20px;
    font-weight: 700;
    color: #b12704;
}
```

### Step 5: Footer with Flexbox

```css
.footer-columns {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-column {
    flex: 1;
    min-width: 200px;
}

.footer-column h4 {
    color: white;
    margin-bottom: 12px;
}

.footer-column ul {
    list-style: none;
}

.footer-column a {
    color: #ddd;
    text-decoration: none;
    line-height: 2;
}
```

---

## 💡 What You Just Learned

### Flex Container Properties

| Property | Values | Purpose |
|----------|--------|---------|
| `display: flex` | — | Enables flexbox |
| `flex-direction` | `row`, `column` | Main axis direction |
| `justify-content` | `flex-start`, `center`, `space-between`, `space-around`, `space-evenly` | Main axis alignment |
| `align-items` | `flex-start`, `center`, `stretch`, `flex-end`, `baseline` | Cross axis alignment |
| `flex-wrap` | `nowrap`, `wrap` | Allow wrapping |
| `gap` | `16px` | Space between items |

### Flex Item Properties

| Property | Example | Purpose |
|----------|---------|---------|
| `flex: 1` | — | Grow to fill available space |
| `flex: 0 1 280px` | — | Don't grow, can shrink, 280px base |
| `align-self` | `center` | Override container alignment |
| `order` | `1` | Change visual order |
| `margin-top: auto` | — | Push item to bottom |

---

## ✅ Expected Output

- Header with logo left, search center, actions right
- Horizontal navigation bar
- Product cards in a wrapping grid
- Footer with evenly spaced columns

---

[Previous Task ← Box Model & Display](./task-02-box-model-and-display.md) · [Next Task → CSS Grid](./task-04-css-grid.md)

[← Back to Module 02](../README.md)
