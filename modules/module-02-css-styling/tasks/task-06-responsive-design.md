# Task 06 — Responsive Design

## 🎯 Objective

Make your ecommerce site look great on phones, tablets, and desktops using mobile-first design and media queries.

---

## The Problem

Your site looks perfect on a desktop monitor. Open it on a phone — the text is tiny, images overflow, and the navigation is unusable. Over 60% of web traffic is mobile. Your site **must** work on small screens.

---

## Instructions

### Step 1: Mobile-First Approach

Write CSS for mobile first, then add complexity for larger screens:

```css
/* Mobile (default) */
.product-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
}

/* Tablet (640px+) */
@media (min-width: 640px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .product-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        padding: 24px;
    }
}
```

### Step 2: Responsive Header

```css
/* Mobile: stack vertically */
.site-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
}

.header-search {
    width: 100%;
    order: 3; /* Move search below actions on mobile */
}

/* Desktop: horizontal layout */
@media (min-width: 768px) {
    .site-header {
        flex-direction: row;
        justify-content: space-between;
    }

    .header-search {
        order: 0; /* Reset order */
        flex: 1;
        max-width: 600px;
        margin: 0 20px;
    }
}
```

### Step 3: Responsive Navigation

```css
/* Mobile: horizontal scroll */
nav ul {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    gap: 4px;
    padding: 8px;
}

/* Desktop: centered */
@media (min-width: 768px) {
    nav ul {
        justify-content: center;
        overflow: visible;
    }
}
```

### Step 4: Responsive Images

```css
/* All images responsive by default */
img {
    max-width: 100%;
    height: auto;
    display: block;
}
```

### Step 5: Responsive Typography

```css
/* Use clamp() for fluid typography */
h1 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
}

h2 {
    font-size: clamp(1.25rem, 3vw, 2rem);
}

body {
    font-size: clamp(0.875rem, 2vw, 1rem);
}
```

### Step 6: Common Breakpoints

```css
/* Small phones */
@media (min-width: 480px) { }

/* Large phones / small tablets */
@media (min-width: 640px) { }

/* Tablets */
@media (min-width: 768px) { }

/* Laptops */
@media (min-width: 1024px) { }

/* Desktops */
@media (min-width: 1280px) { }

/* Large screens */
@media (min-width: 1536px) { }
```

### Step 7: Hide/Show Elements

```css
/* Hide on mobile */
.desktop-only {
    display: none;
}

@media (min-width: 768px) {
    .desktop-only { display: block; }
    .mobile-only  { display: none; }
}
```

---

## 💡 What You Just Learned

| Concept | What It Does |
|---------|-------------|
| Mobile-first | Write mobile CSS first, add desktop with `min-width` |
| `@media (min-width)` | Apply styles when screen is **at least** this wide |
| `clamp()` | Fluid sizing between a min and max value |
| `max-width: 100%` | Prevents images from overflowing containers |
| `overflow-x: auto` | Enables horizontal scrolling |

---

## 🧪 Test Your Responsive Design

1. Open Chrome DevTools (`F12`)
2. Click the device toggle toolbar (📱 icon)
3. Test on: iPhone SE, iPad, Desktop

---

## ✅ Expected Output

- Single-column layout on mobile
- Two-column grid on tablet
- Four-column grid on desktop
- Header stacks vertically on mobile
- Images scale without overflow

---

[Previous Task ← Positioning](./task-05-positioning.md) · [Next Task → Pseudo-classes & Elements](./task-07-pseudo-classes-elements.md)

[← Back to Module 02](../README.md)
