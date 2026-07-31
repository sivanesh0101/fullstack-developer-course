# Task 05 — Positioning

## 🎯 Objective

Use CSS positioning to create sticky headers, overlapping elements, fixed cart buttons, and tooltip-style pop-ups.

---

## The Problem

Your navigation bar scrolls away when users scroll down. The "Add to Cart" button should float in the corner. Sale badges need to overlap product images. None of this is possible with normal document flow.

---

## Instructions

### Step 1: Understanding Position Values

```css
/* Static (default) — normal document flow */
.element { position: static; }

/* Relative — offset from normal position, still takes space */
.element { position: relative; top: 10px; left: 20px; }

/* Absolute — positioned relative to nearest positioned ancestor */
.element { position: absolute; top: 0; right: 0; }

/* Fixed — positioned relative to viewport, stays on scroll */
.element { position: fixed; bottom: 20px; right: 20px; }

/* Sticky — normal until scroll threshold, then fixed */
.element { position: sticky; top: 0; }
```

### Step 2: Sticky Navigation

```css
nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #232f3e;
}
```

Now the navigation sticks to the top when users scroll.

### Step 3: Sale Badge on Product Card

```html
<article class="product-card">
    <span class="sale-badge">-30%</span>
    <img src="images/products/headphones.jpg" alt="Headphones">
    <h3>Wireless Headphones</h3>
    <p class="product-price">
        <del>$69.99</del>
        <strong>$49.99</strong>
    </p>
</article>
```

```css
.product-card {
    position: relative;     /* Creates positioning context */
}

.sale-badge {
    position: absolute;     /* Positioned relative to card */
    top: 10px;
    left: 10px;
    background: #cc0c39;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    z-index: 1;
}
```

### Step 4: Fixed "Back to Top" Button

```css
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #232f3e;
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 20px;
    z-index: 200;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

### Step 5: Z-Index and Stacking

```css
/* Higher z-index = appears on top */
.modal-overlay  { z-index: 1000; }
.modal-content  { z-index: 1001; }
.sticky-nav     { z-index: 100; }
.sale-badge     { z-index: 1; }
.tooltip        { z-index: 50; }
```

> **Rule:** z-index only works on positioned elements (`relative`, `absolute`, `fixed`, `sticky`).

---

## 💡 What You Just Learned

| Position | Stays in Flow? | Relative To | Use Case |
|----------|---------------|-------------|----------|
| `static` | ✅ | — | Default |
| `relative` | ✅ | Its own normal position | Sale badges, tooltips (as parent) |
| `absolute` | ❌ | Nearest positioned ancestor | Badges, overlays, dropdowns |
| `fixed` | ❌ | Viewport | Floating buttons, sticky headers |
| `sticky` | ✅ until threshold | Viewport | Sticky nav, table headers |

---

## ✅ Expected Output

- Navigation bar sticks to the top on scroll
- Sale badges overlay product images
- Fixed "back to top" button in the bottom-right corner

---

[Previous Task ← CSS Grid](./task-04-css-grid.md) · [Next Task → Responsive Design](./task-06-responsive-design.md)

[← Back to Module 02](../README.md)
