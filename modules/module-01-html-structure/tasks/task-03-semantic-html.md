# Task 03 — Semantic HTML

## 🎯 Objective

Replace generic `<div>` elements with meaningful semantic HTML5 elements that improve accessibility, SEO, and code readability.

---

## The Problem

Your page structure uses `<div>` for everything. But a `<div>` has no meaning — it's just a box. Screen readers can't tell users "this is the navigation" or "this is the main content." Search engines can't tell which part is important.

**Semantic HTML** solves this by using elements that describe their purpose.

---

## Instructions

### Step 1: Understand Semantic vs Non-Semantic

```html
<!-- Non-semantic — what does this mean? -->
<div class="top-bar">
    <div class="links">...</div>
</div>

<!-- Semantic — this is clearly navigation -->
<nav aria-label="Main navigation">
    <ul>...</ul>
</nav>
```

### Step 2: Replace Generic Elements

Update your `index.html` to use these semantic elements:

| Instead of | Use | When |
|-----------|-----|------|
| `<div>` for header | `<header>` | Site-wide header or section header |
| `<div>` for navigation | `<nav>` | Groups of navigation links |
| `<div>` for content | `<main>` | Primary content of the page (only one per page) |
| `<div>` for sections | `<section>` | Thematic grouping with a heading |
| `<div>` for products | `<article>` | Self-contained content (product card, blog post) |
| `<div>` for sidebar | `<aside>` | Related but secondary content |
| `<div>` for footer | `<footer>` | Site-wide footer or section footer |
| `<div>` for image | `<figure>` + `<figcaption>` | Image with a caption |
| `<b>` or `<div>` for price | `<strong>` | Important text (like a price) |
| `<i>` | `<em>` | Emphasized text |
| `<div>` for time | `<time>` | Dates and times |

### Step 3: Refactor Product Cards

**Before (non-semantic):**

```html
<div>
    <div>
        <h3>Wireless Headphones</h3>
        <p>High-quality wireless headphones</p>
        <p>$49.99</p>
        <button>Add to Cart</button>
    </div>
</div>
```

**After (semantic):**

```html
<article>
    <figure>
        <img src="images/headphones.jpg" alt="Black wireless headphones with cushioned ear cups" width="300" height="300">
    </figure>
    <header>
        <h3>Wireless Headphones</h3>
    </header>
    <p>High-quality wireless headphones with noise cancellation.</p>
    <p><strong>$49.99</strong></p>
    <footer>
        <button type="button">Add to Cart</button>
    </footer>
</article>
```

### Step 4: Add Landmark Roles

While semantic elements have implicit roles, it's good practice to understand them:

```html
<header>         <!-- role="banner" (implicit) -->
<nav>            <!-- role="navigation" (implicit) -->
<main>           <!-- role="main" (implicit) -->
<aside>          <!-- role="complementary" (implicit) -->
<footer>         <!-- role="contentinfo" (implicit) -->
```

### Step 5: Use `<address>` for Contact Info

In your footer:

```html
<address>
    <p>ShopZone Inc.</p>
    <p>Email: <a href="mailto:support@shopzone.com">support@shopzone.com</a></p>
    <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
</address>
```

---

## 💡 What You Just Learned

| Element | Purpose |
|---------|---------|
| `<article>` | Self-contained content — a product card is an article |
| `<figure>` | An image with optional caption |
| `<figcaption>` | Caption for a figure |
| `<strong>` | Important text (not just bold — screen readers emphasize it) |
| `<em>` | Emphasized text (not just italic) |
| `<time>` | Machine-readable dates |
| `<address>` | Contact information |
| `<mark>` | Highlighted/marked text |

---

## ✅ Expected Output

The page looks exactly the same in the browser — but the code is now meaningful. Screen readers can navigate by landmarks. Search engines understand the page structure.

---

## 🧠 Why This Matters

Open Chrome DevTools → Accessibility tab. You'll see a tree of landmarks:

```
banner (header)
  navigation
main
  region (hero section)
  region (categories)
  region (products)
    article (product 1)
    article (product 2)
contentinfo (footer)
```

This is how screen readers see your page. Semantic HTML is not optional — it's **essential for accessibility**.

---

[Previous Task ← Page Structure](./task-02-page-structure.md) · [Next Task → Forms & Inputs](./task-04-forms-and-inputs.md)

[← Back to Module 01](../README.md)
