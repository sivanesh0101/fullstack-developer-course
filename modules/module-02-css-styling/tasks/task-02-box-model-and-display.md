# Task 02 — Box Model & Display

## 🎯 Objective

Understand the CSS Box Model and display properties to control spacing, sizing, and element behavior.

---

## The Problem

Your product cards have text jammed against the edges. The navigation links are stacked vertically. Some elements are too wide, others too narrow. You need to control **spacing** and **flow**.

---

## Instructions

### Step 1: The Box Model

Every HTML element is a box with four layers:

```
┌─────────────────────────────────┐
│            MARGIN               │
│  ┌───────────────────────────┐  │
│  │         BORDER            │  │
│  │  ┌───────────────────┐    │  │
│  │  │     PADDING        │   │  │
│  │  │  ┌─────────────┐  │   │  │
│  │  │  │   CONTENT    │  │   │  │
│  │  │  └─────────────┘  │   │  │
│  │  └───────────────────┘    │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

```css
.product-card {
    /* Content size */
    width: 280px;
    height: auto;

    /* Padding — space inside the border */
    padding: 16px;

    /* Border — the visible edge */
    border: 1px solid #ddd;

    /* Margin — space outside the border */
    margin: 12px;

    /* Fix the box model calculation */
    box-sizing: border-box;
}
```

### Step 2: Always Use `box-sizing: border-box`

Without it, padding and border **add to** the width:

```css
/* Without border-box: actual width = 280 + 32 + 2 = 314px */
.card { width: 280px; padding: 16px; border: 1px solid #ddd; }

/* With border-box: actual width = 280px (padding and border fit inside) */
.card { width: 280px; padding: 16px; border: 1px solid #ddd; box-sizing: border-box; }
```

Apply it globally:

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

### Step 3: Reset Default Styles

Browsers add default margins and padding. Reset them:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #0f1111;
    background-color: #eaeded;
}
```

### Step 4: Display Properties

```css
/* Block — takes full width, starts on new line */
div, p, h1, section { display: block; }

/* Inline — only as wide as content, no new line */
span, a, strong { display: inline; }

/* Inline-block — inline but respects width/height */
.badge {
    display: inline-block;
    padding: 4px 8px;
    background: #cc0c39;
    color: white;
    border-radius: 4px;
    font-size: 12px;
}

/* None — completely hidden */
.hidden { display: none; }
```

### Step 5: Apply to Your Ecommerce Site

```css
/* Header */
header {
    background-color: #131921;
    color: white;
    padding: 10px 20px;
}

/* Navigation */
nav {
    background-color: #232f3e;
    padding: 8px 20px;
}

nav ul {
    list-style: none;
}

nav a {
    display: inline-block;
    color: white;
    padding: 8px 12px;
    text-decoration: none;
}

/* Product cards */
.product-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-bottom: 16px;
}

/* Footer */
footer {
    background-color: #232f3e;
    color: #ddd;
    padding: 40px 20px;
    margin-top: 40px;
}
```

---

## 💡 What You Just Learned

| Property | What It Does |
|----------|-------------|
| `padding` | Space inside the element (between content and border) |
| `margin` | Space outside the element (between elements) |
| `border` | Visible edge of the element |
| `box-sizing: border-box` | Makes width/height include padding and border |
| `display: block` | Full width, new line |
| `display: inline` | Content width, same line |
| `display: inline-block` | Content width, same line, but respects width/height |
| `display: none` | Element is completely removed from flow |

### Margin Shorthand

```css
margin: 10px;              /* all sides */
margin: 10px 20px;          /* top/bottom  left/right */
margin: 10px 20px 30px;     /* top  left/right  bottom */
margin: 10px 20px 30px 40px; /* top right bottom left (clockwise) */
```

---

## ✅ Expected Output

- Elements have proper spacing — no text jammed against edges
- Header and footer have background colors
- Product cards have padding, borders, and rounded corners
- Navigation links are inline (side by side)

---

[Previous Task ← CSS Selectors](./task-01-css-selectors.md) · [Next Task → Flexbox Layouts](./task-03-flexbox-layouts.md)

[← Back to Module 02](../README.md)
