# Task 08 — Accessibility

## 🎯 Objective

Make your ecommerce site accessible to all users, including those using screen readers, keyboard navigation, and assistive technologies.

---

## The Problem

Over 1 billion people worldwide have some form of disability. If your website isn't accessible, you're excluding potential customers and potentially violating legal requirements. Accessibility isn't a bonus feature — it's a responsibility.

---

## Instructions

### Step 1: Add ARIA Labels to Interactive Elements

```html
<!-- Search button with icon (no visible text) -->
<button type="submit" aria-label="Search products">
    🔍
</button>

<!-- Cart link with count -->
<a href="cart.html" aria-label="Shopping cart, 3 items">
    Cart (3)
</a>

<!-- Close button -->
<button type="button" aria-label="Close dialog">
    ✕
</button>
```

### Step 2: Add Skip Navigation

Add this as the **very first element** inside `<body>`:

```html
<a href="#main-content" class="skip-link">
    Skip to main content
</a>

<!-- ... header and nav ... -->

<main id="main-content">
    <!-- page content -->
</main>
```

> The skip link is visually hidden but accessible to keyboard users and screen readers.

### Step 3: Ensure Keyboard Navigation

All interactive elements should be reachable by pressing `Tab`:

```html
<!-- These are naturally keyboard accessible -->
<a href="...">Link</a>
<button type="button">Button</button>
<input type="text">
<select>...</select>

<!-- These need tabindex to be keyboard accessible -->
<div role="button" tabindex="0">Custom Button</div>
```

> **Rule:** If it looks clickable, it should be a `<button>` or `<a>`, not a `<div>`.

### Step 4: Add `aria-live` for Dynamic Content

```html
<!-- Cart count updates dynamically -->
<span aria-live="polite" aria-atomic="true">
    Cart: 3 items
</span>

<!-- Form error messages -->
<div role="alert">
    Please enter a valid email address.
</div>
```

### Step 5: Image Accessibility Review

Review every image on your site:

```html
<!-- Product image — descriptive alt -->
<img src="headphones.jpg"
     alt="Black wireless over-ear headphones with cushioned ear cups">

<!-- Decorative image — empty alt -->
<img src="divider.png" alt="" role="presentation">

<!-- Complex image — longer description -->
<figure>
    <img src="size-chart.jpg"
         alt="Size chart showing measurements for small, medium, large, and extra-large">
    <figcaption>Size guide for men's t-shirts</figcaption>
</figure>
```

### Step 6: Form Accessibility

```html
<form>
    <!-- Every input needs a label -->
    <div>
        <label for="email">Email address</label>
        <input
            type="email"
            id="email"
            name="email"
            required
            aria-describedby="email-hint"
        >
        <small id="email-hint">We'll never share your email.</small>
    </div>

    <!-- Error state -->
    <div>
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            required
            aria-invalid="true"
            aria-describedby="password-error"
        >
        <span id="password-error" role="alert">
            Password must be at least 8 characters.
        </span>
    </div>

    <!-- Group related fields -->
    <fieldset>
        <legend>Shipping Method</legend>
        <div>
            <input type="radio" id="standard" name="shipping" value="standard">
            <label for="standard">Standard (5-7 days) — Free</label>
        </div>
        <div>
            <input type="radio" id="express" name="shipping" value="express">
            <label for="express">Express (2-3 days) — $9.99</label>
        </div>
    </fieldset>
</form>
```

---

## 💡 What You Just Learned

### ARIA Attributes

| Attribute | Purpose |
|-----------|---------|
| `aria-label` | Provides a label when no visible text exists |
| `aria-describedby` | Points to an element that describes this one |
| `aria-live` | Announces dynamic content changes |
| `aria-invalid` | Indicates a form field has an error |
| `aria-current` | Indicates the current item (page, step, etc.) |
| `aria-hidden` | Hides decorative elements from screen readers |
| `role` | Defines the purpose of an element |

### Accessibility Checklist

- [ ] Every image has appropriate `alt` text
- [ ] Every form input has a `<label>`
- [ ] All interactive elements are keyboard accessible
- [ ] Color is not the only way to convey information
- [ ] Skip navigation link exists
- [ ] Headings follow proper hierarchy (`h1` → `h2` → `h3`)
- [ ] Page has a meaningful `<title>`
- [ ] Language is declared (`<html lang="en">`)

---

## 🧪 Test Your Accessibility

1. **Keyboard test:** Navigate your entire site using only `Tab`, `Shift+Tab`, and `Enter`
2. **Screen reader:** Turn on your OS screen reader (ChromeVox extension in Chrome)
3. **Chrome DevTools:** Open DevTools → Lighthouse → Accessibility audit

---

## ✅ Expected Output

- Skip navigation link at the top
- All images have appropriate alt text
- All forms have labels and error descriptions
- Interactive elements work with keyboard
- Lighthouse accessibility score of 90+

---

[Previous Task ← Tables & Lists](./task-07-tables-and-lists.md)

[← Back to Module 01](../README.md)
