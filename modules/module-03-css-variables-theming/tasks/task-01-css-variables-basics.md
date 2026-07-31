# Task 01 — CSS Variables Basics

## 🎯 Objective

Replace hardcoded color values with CSS custom properties (variables) for maintainability and consistency.

---

## The Problem

Your stylesheet has the same color values repeated dozens of times:

```css
.header    { background: #131921; }
.nav       { background: #232f3e; }
.btn       { background: #ffd814; }
.price     { color: #b12704; }
.link      { color: #007185; }
/* ... 200 more rules with hardcoded colors */
```

Change your brand color? Find and replace across the entire file. Miss one? The site looks broken.

---

## Instructions

### Step 1: Define Variables in `:root`

```css
:root {
    /* Brand Colors */
    --color-primary: #131921;
    --color-primary-light: #232f3e;
    --color-accent: #febd69;
    --color-accent-hover: #f0b050;
    --color-cta: #ffd814;
    --color-cta-hover: #f0c814;

    /* Text Colors */
    --color-text: #0f1111;
    --color-text-secondary: #565959;
    --color-text-link: #007185;
    --color-text-price: #b12704;
    --color-text-deal: #cc0c39;

    /* Background Colors */
    --color-bg: #eaeded;
    --color-bg-white: #ffffff;
    --color-bg-dark: #131921;

    /* Border Colors */
    --color-border: #ddd;
    --color-border-focus: #e77600;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 40px;

    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-full: 50%;

    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.2);
}
```

### Step 2: Use Variables in Your CSS

```css
/* Before — hardcoded */
header {
    background-color: #131921;
    padding: 10px 20px;
}

/* After — variable-based */
header {
    background-color: var(--color-primary);
    padding: var(--spacing-sm) var(--spacing-md);
}

.product-card {
    background: var(--color-bg-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
}

.product-card:hover {
    box-shadow: var(--shadow-md);
}

.product-price {
    color: var(--color-text-price);
}

.btn-primary {
    background-color: var(--color-cta);
    border-radius: var(--radius-sm);
}

.btn-primary:hover {
    background-color: var(--color-cta-hover);
}
```

### Step 3: Fallback Values

```css
/* If the variable doesn't exist, use the fallback */
.element {
    color: var(--color-text, #333);
    padding: var(--spacing-md, 16px);
}
```

### Step 4: Scope Variables

Variables cascade — you can override them for specific components:

```css
/* Global default */
:root {
    --card-padding: 16px;
}

/* Override for large cards */
.product-card.large {
    --card-padding: 24px;
}

/* Both use the same variable, different values */
.product-card {
    padding: var(--card-padding);
}
```

---

## 💡 What You Just Learned

| Concept | Explanation |
|---------|------------|
| `:root` | The highest-level selector — variables defined here are available everywhere |
| `--name` | Custom property — must start with `--` |
| `var(--name)` | References a custom property value |
| `var(--name, fallback)` | Uses fallback if variable is undefined |
| Cascading | Variables inherit and can be overridden in child elements |

---

## ✅ Expected Output

Your site looks exactly the same — but now every color, spacing, and shadow value comes from a CSS variable. Changing `--color-primary` in one place changes it everywhere.

---

[Next Task → Design Tokens](./task-02-design-tokens.md)

[← Back to Module 03](../README.md)
