# Task 06 — Navigation & Links

## 🎯 Objective

Build a complete navigation system with internal links, external links, anchor links, and a breadcrumb trail.

---

## The Problem

Your ecommerce site has multiple pages — homepage, login, signup, product pages, categories. Users need to move between them easily. A broken or confusing navigation is the fastest way to lose customers.

---

## Instructions

### Step 1: Build the Primary Navigation

```html
<nav aria-label="Main navigation">
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="#deals">Today's Deals</a></li>
        <li><a href="categories/electronics.html">Electronics</a></li>
        <li><a href="categories/fashion.html">Fashion</a></li>
        <li><a href="categories/home.html">Home & Kitchen</a></li>
        <li><a href="categories/books.html">Books</a></li>
        <li><a href="categories/sports.html">Sports</a></li>
        <li><a href="help.html">Customer Service</a></li>
    </ul>
</nav>
```

### Step 2: Add Anchor Links (Same Page Navigation)

Link to sections within the same page using `id` attributes:

```html
<!-- Link -->
<a href="#featured-products">See Featured Products</a>

<!-- Target section (somewhere below on the same page) -->
<section id="featured-products">
    <h2>Featured Products</h2>
    ...
</section>
```

### Step 3: Build a Breadcrumb Trail

```html
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="index.html">Home</a></li>
        <li><a href="categories/electronics.html">Electronics</a></li>
        <li><a href="categories/headphones.html">Headphones</a></li>
        <li aria-current="page">Wireless Headphones Pro</li>
    </ol>
</nav>
```

### Step 4: External Links

```html
<!-- Opens in new tab with security attributes -->
<a href="https://www.instagram.com/shopzone"
   target="_blank"
   rel="noopener noreferrer">
    Follow us on Instagram
</a>
```

### Step 5: Link Types Summary

```html
<!-- Internal link (same site) -->
<a href="login.html">Sign In</a>

<!-- Anchor link (same page) -->
<a href="#products">Jump to Products</a>

<!-- External link (different site) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>

<!-- Email link -->
<a href="mailto:support@shopzone.com">Email Support</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call Us</a>

<!-- Download link -->
<a href="files/catalog.pdf" download>Download Catalog</a>
```

### Step 6: Add a "Back to Top" Link

At the top of your page:
```html
<body id="top">
```

At the bottom:
```html
<a href="#top">Back to Top ↑</a>
```

---

## 💡 What You Just Learned

| Concept | What It Does |
|---------|-------------|
| `href="page.html"` | Links to another page |
| `href="#id"` | Jumps to an element on the same page |
| `target="_blank"` | Opens in a new tab |
| `rel="noopener noreferrer"` | Security — prevents the new page from accessing your page |
| `aria-label` | Describes the navigation for screen readers |
| `aria-current="page"` | Tells screen readers "this is the current page" |
| `download` | Triggers a file download instead of navigation |
| Breadcrumbs | Shows the user's location in the site hierarchy |

---

## ✅ Expected Output

- Main navigation with working links
- Breadcrumb trail showing page hierarchy
- Anchor links that scroll to sections
- Footer links with email and phone links

---

[Previous Task ← Images & Media](./task-05-images-and-media.md) · [Next Task → Tables & Lists](./task-07-tables-and-lists.md)

[← Back to Module 01](../README.md)
