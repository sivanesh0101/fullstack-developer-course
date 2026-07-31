# Task 05 — Images & Media

## 🎯 Objective

Add product images, hero banners, and category images to your ecommerce site with proper accessibility and performance attributes.

---

## The Problem

An ecommerce site without images is just a list of text. Customers need to **see** products before buying them. But images done wrong can slow down your site, break on different screen sizes, and be invisible to screen readers.

---

## Instructions

### Step 1: Create an Images Folder

```
ecommerce-project/
├── index.html
├── login.html
├── signup.html
└── images/
    ├── hero-banner.jpg
    ├── products/
    │   ├── headphones.jpg
    │   ├── shoes.jpg
    │   ├── backpack.jpg
    │   └── smartwatch.jpg
    └── categories/
        ├── electronics.jpg
        ├── fashion.jpg
        ├── home.jpg
        └── books.jpg
```

> **Tip:** For now, you can use placeholder images from [placehold.co](https://placehold.co/) or [unsplash.com](https://unsplash.com/).

### Step 2: Add Product Images

Update your product cards:

```html
<article>
    <figure>
        <img
            src="images/products/headphones.jpg"
            alt="Black wireless over-ear headphones with cushioned ear cups and adjustable headband"
            width="300"
            height="300"
            loading="lazy"
        >
    </figure>
    <header>
        <h3>Wireless Headphones</h3>
    </header>
    <p>High-quality wireless headphones with noise cancellation.</p>
    <p><strong>$49.99</strong></p>
    <button type="button">Add to Cart</button>
</article>
```

### Step 3: Add a Hero Banner

```html
<section>
    <figure>
        <img
            src="images/hero-banner.jpg"
            alt="Summer sale - Up to 50% off on electronics and fashion"
            width="1200"
            height="400"
        >
    </figure>
    <h1>Summer Sale</h1>
    <p>Up to 50% off on electronics, fashion, and home essentials.</p>
    <a href="#products">Shop Now</a>
</section>
```

### Step 4: Add Category Images

```html
<section>
    <h2>Shop by Category</h2>
    <div>
        <article>
            <figure>
                <img
                    src="images/categories/electronics.jpg"
                    alt="Collection of electronic gadgets including phones and laptops"
                    width="300"
                    height="200"
                    loading="lazy"
                >
                <figcaption>Electronics</figcaption>
            </figure>
            <a href="#">See more</a>
        </article>
        <!-- Repeat for other categories -->
    </div>
</section>
```

### Step 5: Using the `<picture>` Element

For responsive images that load different sizes on different screens:

```html
<picture>
    <source
        media="(min-width: 1024px)"
        srcset="images/hero-banner-large.jpg"
    >
    <source
        media="(min-width: 640px)"
        srcset="images/hero-banner-medium.jpg"
    >
    <img
        src="images/hero-banner-small.jpg"
        alt="Summer sale banner with electronics and fashion products"
        width="1200"
        height="400"
    >
</picture>
```

---

## 💡 What You Just Learned

### Image Attributes

| Attribute | Purpose |
|-----------|---------|
| `src` | Path to the image file |
| `alt` | Description for screen readers and when image fails to load |
| `width` / `height` | Prevents layout shift while image loads |
| `loading="lazy"` | Image loads only when it's about to be visible |

### Writing Good Alt Text

| ❌ Bad | ✅ Good |
|--------|---------|
| `alt="image"` | `alt="Black wireless headphones with noise cancellation"` |
| `alt="product"` | `alt="Nike running shoes in blue, side view"` |
| `alt=""` (empty for product) | `alt=""` (only for decorative images) |
| No alt attribute | Always include `alt`, even if empty |

### When to Use Empty `alt=""`

Use empty alt text **only** for purely decorative images:

```html
<!-- Decorative divider — no information content -->
<img src="images/divider.png" alt="" role="presentation">

<!-- Product image — MUST have descriptive alt -->
<img src="images/products/shoes.jpg" alt="Red Nike running shoes, side view">
```

---

## ✅ Expected Output

- Product cards now have images
- Hero banner with a large image
- Category section with image thumbnails
- All images have descriptive alt text

---

[Previous Task ← Forms & Inputs](./task-04-forms-and-inputs.md) · [Next Task → Navigation & Links](./task-06-navigation-and-links.md)

[← Back to Module 01](../README.md)
