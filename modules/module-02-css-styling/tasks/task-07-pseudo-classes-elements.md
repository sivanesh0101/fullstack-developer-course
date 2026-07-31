# Task 07 — Pseudo-classes & Pseudo-elements

## 🎯 Objective

Use CSS pseudo-classes for interactive states and pseudo-elements for decorative content without adding extra HTML.

---

## The Problem

You want buttons to change color on hover, form fields to glow when focused, and "NEW" labels to appear on product cards — without adding extra HTML elements. CSS pseudo-classes and pseudo-elements let you do this.

---

## Instructions

### Step 1: Hover Effects

```css
/* Button hover */
.btn-primary {
    background-color: #ffd814;
    transition: background-color 0.2s ease;
}

.btn-primary:hover {
    background-color: #f0c814;
}

/* Product card hover */
.product-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Link hover */
nav a:hover {
    border: 1px solid white;
    border-radius: 2px;
}
```

### Step 2: Focus States

```css
/* Input focus */
input:focus, select:focus {
    outline: 2px solid #e77600;
    outline-offset: 2px;
    border-color: #e77600;
}

/* Button focus */
.btn:focus-visible {
    outline: 2px solid #007185;
    outline-offset: 2px;
}
```

### Step 3: Structural Pseudo-classes

```css
/* First product card */
.product-card:first-child {
    border: 2px solid #e77600;
}

/* Every other row — zebra striping */
table tbody tr:nth-child(even) {
    background-color: #f7f7f7;
}

/* Last item in list — no border */
.footer-column li:last-child {
    border-bottom: none;
}

/* Empty cart message */
.cart-items:empty::after {
    content: "Your cart is empty";
    color: #565959;
    text-align: center;
    padding: 40px;
    display: block;
}
```

### Step 4: Pseudo-elements

```css
/* "NEW" badge using ::before */
.product-card.new-arrival::before {
    content: "NEW";
    position: absolute;
    top: 10px;
    right: 10px;
    background: #007600;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
}

/* Decorative line under section heading */
section h2::after {
    content: "";
    display: block;
    width: 60px;
    height: 3px;
    background: #febd69;
    margin-top: 8px;
}

/* Required field indicator */
label.required::after {
    content: " *";
    color: #cc0c39;
}

/* Price currency symbol */
.product-price::before {
    content: "₹";
    font-size: 14px;
}
```

### Step 5: Form State Pseudo-classes

```css
/* Valid input */
input:valid {
    border-color: #007600;
}

/* Invalid input (after interaction) */
input:invalid:not(:placeholder-shown) {
    border-color: #cc0c39;
}

/* Disabled elements */
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Checked checkbox/radio */
input[type="checkbox"]:checked + label {
    font-weight: bold;
    color: #007185;
}
```

---

## 💡 What You Just Learned

### Pseudo-classes (State-based)

| Pseudo-class | Triggers When |
|-------------|--------------|
| `:hover` | Mouse is over the element |
| `:focus` | Element is focused (keyboard/click) |
| `:focus-visible` | Focus via keyboard only |
| `:active` | Element is being clicked |
| `:visited` | Link has been visited |
| `:first-child` | First child of its parent |
| `:last-child` | Last child of its parent |
| `:nth-child(n)` | The nth child |
| `:not()` | Negation — excludes matching elements |
| `:empty` | Element has no children |

### Pseudo-elements (Generated content)

| Pseudo-element | What It Does |
|----------------|-------------|
| `::before` | Inserts content before the element |
| `::after` | Inserts content after the element |
| `::first-line` | Styles the first line of text |
| `::first-letter` | Styles the first letter |
| `::placeholder` | Styles input placeholder text |
| `::selection` | Styles selected/highlighted text |

---

## ✅ Expected Output

- Buttons change color on hover
- Product cards lift on hover with shadow
- Form inputs glow on focus
- "NEW" badge appears on new products
- Required fields show a red asterisk

---

[Previous Task ← Responsive Design](./task-06-responsive-design.md) · [Next Task → CSS Animations](./task-08-animations.md)

[← Back to Module 02](../README.md)
