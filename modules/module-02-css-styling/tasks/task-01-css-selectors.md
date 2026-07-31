# Task 01 — CSS Selectors

## 🎯 Objective

Learn to target HTML elements precisely using CSS selectors — from basic to advanced.

---

## The Problem

You want to change the color of the navigation links, but not the footer links. You want to make the first product card look special, but not the others. How do you tell CSS **which** element to style?

---

## Instructions

### Step 1: Create Your Stylesheet

Create `styles.css` in your project root and link it in `index.html`:

```html
<head>
    <!-- ... other meta tags ... -->
    <link rel="stylesheet" href="styles.css">
</head>
```

### Step 2: Element Selectors

Target HTML elements directly:

```css
/* All paragraphs */
p {
    color: #333;
    line-height: 1.6;
}

/* All headings */
h1, h2, h3 {
    font-family: 'Segoe UI', sans-serif;
    color: #131921;
}

/* All links */
a {
    color: #007185;
    text-decoration: none;
}
```

### Step 3: Class Selectors

Add classes to your HTML and target them:

```html
<article class="product-card">
    <h3 class="product-title">Wireless Headphones</h3>
    <p class="product-price">$49.99</p>
    <button class="btn btn-primary">Add to Cart</button>
</article>
```

```css
.product-card {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
}

.product-title {
    font-size: 16px;
    font-weight: 600;
}

.product-price {
    color: #b12704;
    font-size: 20px;
    font-weight: 700;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary {
    background-color: #ffd814;
    color: #0f1111;
}
```

### Step 4: ID Selectors

```css
#main-content {
    max-width: 1200px;
    margin: 0 auto;
}

#hero-banner {
    background-color: #232f3e;
    color: white;
    padding: 40px;
    text-align: center;
}
```

### Step 5: Combinator Selectors

```css
/* Descendant — any link inside nav */
nav a {
    color: white;
    padding: 8px 12px;
}

/* Direct child — only immediate children */
.product-grid > .product-card {
    margin-bottom: 20px;
}

/* Adjacent sibling — element right after another */
h2 + p {
    font-size: 14px;
    color: #565959;
}

/* General sibling — all siblings after */
h2 ~ p {
    margin-top: 8px;
}
```

### Step 6: Attribute Selectors

```css
/* Links that open in new tab */
a[target="_blank"] {
    padding-right: 16px;
}

/* Required form fields */
input[required] {
    border-left: 3px solid #e47911;
}

/* Email inputs specifically */
input[type="email"] {
    width: 100%;
}
```

### Step 7: Understanding Specificity

```
Inline styles         → 1000 points
#id                   → 100 points
.class, [attr], :pseudo → 10 points
element               → 1 point
```

```css
/* Specificity: 1 (element) */
p { color: black; }

/* Specificity: 10 (class) */
.highlight { color: blue; }

/* Specificity: 11 (element + class) */
p.highlight { color: green; }

/* Specificity: 100 (ID) */
#special { color: red; }

/* Winner: #special (highest specificity) */
```

---

## 💡 What You Just Learned

| Selector | Example | Specificity |
|----------|---------|-------------|
| Element | `p` | 0-0-1 |
| Class | `.card` | 0-1-0 |
| ID | `#hero` | 1-0-0 |
| Descendant | `nav a` | 0-0-2 |
| Child | `ul > li` | 0-0-2 |
| Attribute | `[type="email"]` | 0-1-0 |
| Multiple classes | `.btn.primary` | 0-2-0 |

---

## ✅ Expected Output

Your page should now have:
- Styled text with custom fonts and colors
- Product cards with borders and padding
- Different styled buttons
- Navigation links in a different color than body links

---

[Next Task → Box Model & Display](./task-02-box-model-and-display.md)

[← Back to Module 02](../README.md)
