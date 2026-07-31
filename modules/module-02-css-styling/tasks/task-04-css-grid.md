# Task 04 — CSS Grid

## 🎯 Objective

Use CSS Grid to create complex, two-dimensional layouts for the product grid, category section, and page layout.

---

## The Problem

Flexbox is great for one-dimensional layouts (rows or columns). But the category section needs a **2D grid** — rows AND columns, with some items spanning multiple cells. CSS Grid is designed exactly for this.

---

## Instructions

### Step 1: Grid Basics

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);  /* 4 equal columns */
    grid-template-rows: auto;               /* Rows size to content */
    gap: 20px;                              /* Space between cells */
}
```

### Step 2: Product Grid with CSS Grid

```css
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
```

> `auto-fill` + `minmax(250px, 1fr)` = responsive grid without media queries!

### Step 3: Category Grid with Spanning

```css
.category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 250px);
    gap: 16px;
    padding: 20px;
}

/* Make the first category span 2 rows */
.category-card:first-child {
    grid-row: span 2;
}

/* Make a featured category span 2 columns */
.category-card.featured {
    grid-column: span 2;
}
```

### Step 4: Grid Template Areas

Create a named page layout:

```css
.page-layout {
    display: grid;
    grid-template-areas:
        "header  header  header"
        "sidebar content content"
        "footer  footer  footer";
    grid-template-columns: 250px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.site-header  { grid-area: header; }
.sidebar      { grid-area: sidebar; }
.main-content { grid-area: content; }
.site-footer  { grid-area: footer; }
```

### Step 5: Responsive Grid

```css
.product-grid {
    display: grid;
    gap: 20px;

    /* Mobile: 1 column */
    grid-template-columns: 1fr;
}

/* Tablet: 2 columns */
@media (min-width: 640px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop: 4 columns */
@media (min-width: 1024px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

## 💡 Flexbox vs Grid — When to Use What

| Use Case | Use |
|----------|-----|
| Navigation bar (horizontal) | Flexbox |
| Header layout (logo + search + actions) | Flexbox |
| Product card grid (rows AND columns) | Grid |
| Page layout (header + sidebar + content) | Grid |
| Centering a single element | Flexbox |
| Complex 2D layouts with spanning | Grid |
| Equal-height columns | Both work |

---

## ✅ Expected Output

- Product cards in a responsive grid (4 columns on desktop, 2 on tablet, 1 on mobile)
- Category section with featured items spanning multiple cells
- Clean, consistent spacing between all grid items

---

[Previous Task ← Flexbox Layouts](./task-03-flexbox-layouts.md) · [Next Task → Positioning](./task-05-positioning.md)

[← Back to Module 02](../README.md)
