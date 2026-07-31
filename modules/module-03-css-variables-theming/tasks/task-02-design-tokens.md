# Task 02 — Design Tokens

## 🎯 Objective

Create a complete design token system with color palettes, typography scales, and spacing systems.

---

## The Problem

You have CSS variables for colors. But what about font sizes? Line heights? Font weights? Spacing? Without a system, you'll still have inconsistent values scattered throughout your CSS.

---

## Instructions

### Step 1: Typography Tokens

```css
:root {
    /* Font Families */
    --font-sans: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'Fira Code', 'Consolas', monospace;

    /* Font Sizes */
    --text-xs: 0.75rem;    /* 12px */
    --text-sm: 0.875rem;   /* 14px */
    --text-base: 1rem;     /* 16px */
    --text-lg: 1.125rem;   /* 18px */
    --text-xl: 1.25rem;    /* 20px */
    --text-2xl: 1.5rem;    /* 24px */
    --text-3xl: 1.875rem;  /* 30px */
    --text-4xl: 2.25rem;   /* 36px */

    /* Font Weights */
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;

    /* Line Heights */
    --leading-tight: 1.25;
    --leading-normal: 1.5;
    --leading-relaxed: 1.75;
}
```

### Step 2: Apply Typography

```css
body {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--color-text);
}

h1 { font-size: var(--text-4xl); font-weight: var(--font-bold); }
h2 { font-size: var(--text-2xl); font-weight: var(--font-semibold); }
h3 { font-size: var(--text-xl); font-weight: var(--font-semibold); }

.product-price {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--color-text-price);
}

.product-title {
    font-size: var(--text-base);
    font-weight: var(--font-medium);
}

small, .text-sm {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
}
```

### Step 3: Color Palette System

```css
:root {
    /* Neutral Scale */
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;

    /* Semantic Colors */
    --color-success: #059669;
    --color-warning: #d97706;
    --color-error: #dc2626;
    --color-info: #2563eb;

    /* Map semantic to tokens */
    --color-bg: var(--gray-100);
    --color-text: var(--gray-900);
    --color-text-secondary: var(--gray-500);
    --color-border: var(--gray-200);
}
```

### Step 4: Spacing Scale

```css
:root {
    /* 4px base scale */
    --space-0: 0;
    --space-1: 0.25rem;   /* 4px */
    --space-2: 0.5rem;    /* 8px */
    --space-3: 0.75rem;   /* 12px */
    --space-4: 1rem;      /* 16px */
    --space-5: 1.25rem;   /* 20px */
    --space-6: 1.5rem;    /* 24px */
    --space-8: 2rem;      /* 32px */
    --space-10: 2.5rem;   /* 40px */
    --space-12: 3rem;     /* 48px */
    --space-16: 4rem;     /* 64px */
}
```

---

## 💡 What You Just Learned

Design tokens create a **single source of truth** for your entire design system. Instead of guessing sizes and colors, every value comes from a predefined scale.

| Token Type | Purpose |
|-----------|---------|
| Color tokens | Consistent colors across the site |
| Typography tokens | Consistent text sizing and weights |
| Spacing tokens | Consistent padding and margins |
| Shadow tokens | Consistent depth and elevation |
| Radius tokens | Consistent border rounding |

---

## ✅ Expected Output

A complete design token system in your CSS that makes the entire site consistent and easy to modify globally.

---

[Previous Task ← CSS Variables Basics](./task-01-css-variables-basics.md) · [Next Task → Dark Mode Toggle](./task-03-dark-mode-toggle.md)

[← Back to Module 03](../README.md)
