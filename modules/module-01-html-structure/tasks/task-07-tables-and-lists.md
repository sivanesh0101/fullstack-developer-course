# Task 07 — Tables & Lists

## 🎯 Objective

Use HTML tables for product specifications and comparison data. Use ordered and unordered lists for feature lists, steps, and navigation menus.

---

## The Problem

Products have specifications — dimensions, weight, battery life, warranty. Customers want to compare products side by side. You need structured data that's easy to read.

---

## Instructions

### Step 1: Product Specifications Table

Create a product detail page (`product.html`) with a specifications table:

```html
<section>
    <h2>Product Specifications</h2>
    <table>
        <caption>Wireless Headphones Pro — Technical Details</caption>
        <thead>
            <tr>
                <th scope="col">Specification</th>
                <th scope="col">Details</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Brand</th>
                <td>SoundMax</td>
            </tr>
            <tr>
                <th scope="row">Model</th>
                <td>WH-Pro 500</td>
            </tr>
            <tr>
                <th scope="row">Type</th>
                <td>Over-ear, Wireless</td>
            </tr>
            <tr>
                <th scope="row">Battery Life</th>
                <td>30 hours</td>
            </tr>
            <tr>
                <th scope="row">Noise Cancellation</th>
                <td>Active (ANC)</td>
            </tr>
            <tr>
                <th scope="row">Weight</th>
                <td>250g</td>
            </tr>
            <tr>
                <th scope="row">Connectivity</th>
                <td>Bluetooth 5.3, USB-C</td>
            </tr>
            <tr>
                <th scope="row">Warranty</th>
                <td>2 years</td>
            </tr>
        </tbody>
    </table>
</section>
```

### Step 2: Product Comparison Table

```html
<section>
    <h2>Compare Headphones</h2>
    <table>
        <caption>Comparison of our top 3 headphones</caption>
        <thead>
            <tr>
                <th scope="col">Feature</th>
                <th scope="col">WH-Pro 500</th>
                <th scope="col">WH-Basic 200</th>
                <th scope="col">WH-Sport 300</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Price</th>
                <td>$49.99</td>
                <td>$24.99</td>
                <td>$39.99</td>
            </tr>
            <tr>
                <th scope="row">Battery</th>
                <td>30 hrs</td>
                <td>15 hrs</td>
                <td>20 hrs</td>
            </tr>
            <tr>
                <th scope="row">ANC</th>
                <td>Yes</td>
                <td>No</td>
                <td>Yes</td>
            </tr>
            <tr>
                <th scope="row">Water Resistant</th>
                <td>No</td>
                <td>No</td>
                <td>IPX4</td>
            </tr>
        </tbody>
    </table>
</section>
```

### Step 3: Feature Lists

**Unordered list** — features (no specific order):

```html
<section>
    <h3>Key Features</h3>
    <ul>
        <li>Active Noise Cancellation</li>
        <li>30-hour battery life</li>
        <li>Bluetooth 5.3 connectivity</li>
        <li>Foldable design for portability</li>
        <li>Built-in microphone for calls</li>
    </ul>
</section>
```

**Ordered list** — steps (order matters):

```html
<section>
    <h3>How to Set Up</h3>
    <ol>
        <li>Charge the headphones fully using the USB-C cable</li>
        <li>Press and hold the power button for 3 seconds</li>
        <li>Open Bluetooth settings on your device</li>
        <li>Select "WH-Pro 500" from available devices</li>
        <li>Wait for the confirmation sound</li>
    </ol>
</section>
```

**Description list** — terms and definitions:

```html
<section>
    <h3>Shipping Information</h3>
    <dl>
        <dt>Standard Delivery</dt>
        <dd>5-7 business days — Free</dd>

        <dt>Express Delivery</dt>
        <dd>2-3 business days — $9.99</dd>

        <dt>Same Day Delivery</dt>
        <dd>Available in select cities — $14.99</dd>
    </dl>
</section>
```

---

## 💡 What You Just Learned

| Element | When to Use |
|---------|------------|
| `<table>` | Tabular data — specs, comparisons, pricing |
| `<caption>` | Describes the table for accessibility |
| `<thead>` / `<tbody>` | Separates header from body rows |
| `<th scope="col">` | Column header |
| `<th scope="row">` | Row header |
| `<ul>` | Unordered list — features, bullet points |
| `<ol>` | Ordered list — steps, rankings |
| `<dl>` / `<dt>` / `<dd>` | Definition list — terms and descriptions |

### When NOT to Use Tables

- ❌ Don't use tables for page layout (use CSS Flexbox/Grid)
- ❌ Don't use tables for visual alignment
- ✅ Use tables only for **actual tabular data**

---

## ✅ Expected Output

- Product page with a specifications table
- Comparison table showing multiple products
- Feature bullet list
- Ordered setup instructions
- Shipping description list

---

[Previous Task ← Navigation & Links](./task-06-navigation-and-links.md) · [Next Task → Accessibility](./task-08-accessibility.md)

[← Back to Module 01](../README.md)
