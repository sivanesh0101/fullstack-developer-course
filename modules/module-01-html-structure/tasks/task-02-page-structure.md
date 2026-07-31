# Task 02 — Page Structure

## 🎯 Objective

Build the complete page structure for your ecommerce homepage using HTML document structure elements.

---

## The Problem

You have a blank HTML file. Amazon's homepage has a header, navigation, multiple sections, a search bar, product areas, and a footer. How do you organize all of this in a single HTML document?

---

## Instructions

### Step 1: Understand the Page Layout

Before writing code, sketch the structure:

```
┌──────────────────────────────────────┐
│              HEADER                  │
│  Logo    Search Bar    Cart  Login   │
├──────────────────────────────────────┤
│              NAV BAR                 │
│  All  Deals  Electronics  Fashion   │
├──────────────────────────────────────┤
│              HERO BANNER             │
│     Welcome to ShopZone!             │
├──────────────────────────────────────┤
│            CATEGORIES                │
│  📱  👕  📚  🏠  ⚽  💻             │
├──────────────────────────────────────┤
│         FEATURED PRODUCTS            │
│  Card  Card  Card  Card              │
├──────────────────────────────────────┤
│              FOOTER                  │
│  About  Contact  Terms  Privacy      │
└──────────────────────────────────────┘
```

### Step 2: Build the HTML Structure

Update your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ShopZone - Your one-stop online shopping destination for electronics, fashion, books, and more.">
    <meta name="keywords" content="online shopping, ecommerce, electronics, fashion">
    <meta name="author" content="ShopZone">
    <title>ShopZone - Online Shopping for Electronics, Fashion, Home & More</title>
</head>
<body>

    <!-- Top Header: Logo, Search, Account, Cart -->
    <header>
        <div>
            <a href="index.html">ShopZone</a>
        </div>
        <div>
            <form>
                <select>
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="books">Books</option>
                </select>
                <input type="text" placeholder="Search ShopZone">
                <button type="submit">Search</button>
            </form>
        </div>
        <div>
            <a href="login.html">Hello, Sign in</a>
            <a href="orders.html">Orders</a>
            <a href="cart.html">Cart (0)</a>
        </div>
    </header>

    <!-- Navigation Bar -->
    <nav>
        <ul>
            <li><a href="#">All</a></li>
            <li><a href="#">Today's Deals</a></li>
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Home & Kitchen</a></li>
            <li><a href="#">Books</a></li>
            <li><a href="#">Sports</a></li>
            <li><a href="#">Customer Service</a></li>
        </ul>
    </nav>

    <!-- Main Content Area -->
    <main>

        <!-- Hero Banner -->
        <section>
            <h1>Welcome to ShopZone</h1>
            <p>Discover amazing deals on electronics, fashion, home essentials, and more.</p>
            <a href="#products">Shop Now</a>
        </section>

        <!-- Product Categories -->
        <section>
            <h2>Shop by Category</h2>
            <div>
                <div>
                    <h3>Electronics</h3>
                    <a href="#">See more</a>
                </div>
                <div>
                    <h3>Fashion</h3>
                    <a href="#">See more</a>
                </div>
                <div>
                    <h3>Home & Kitchen</h3>
                    <a href="#">See more</a>
                </div>
                <div>
                    <h3>Books</h3>
                    <a href="#">See more</a>
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section id="products">
            <h2>Featured Products</h2>
            <div>
                <div>
                    <h3>Wireless Headphones</h3>
                    <p>High-quality wireless headphones with noise cancellation.</p>
                    <p>$49.99</p>
                    <button>Add to Cart</button>
                </div>
                <div>
                    <h3>Running Shoes</h3>
                    <p>Lightweight and comfortable running shoes for daily use.</p>
                    <p>$79.99</p>
                    <button>Add to Cart</button>
                </div>
                <div>
                    <h3>Backpack</h3>
                    <p>Durable backpack with laptop compartment and USB charging port.</p>
                    <p>$34.99</p>
                    <button>Add to Cart</button>
                </div>
                <div>
                    <h3>Smart Watch</h3>
                    <p>Fitness tracking smartwatch with heart rate monitor.</p>
                    <p>$129.99</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer>
        <div>
            <h4>Get to Know Us</h4>
            <ul>
                <li><a href="#">About ShopZone</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Releases</a></li>
            </ul>
        </div>
        <div>
            <h4>Connect with Us</h4>
            <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
            </ul>
        </div>
        <div>
            <h4>Make Money with Us</h4>
            <ul>
                <li><a href="#">Sell on ShopZone</a></li>
                <li><a href="#">Become an Affiliate</a></li>
                <li><a href="#">Advertise Your Products</a></li>
            </ul>
        </div>
        <div>
            <h4>Let Us Help You</h4>
            <ul>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Returns Centre</a></li>
                <li><a href="#">Help</a></li>
            </ul>
        </div>
        <p>&copy; 2025 ShopZone. All rights reserved.</p>
    </footer>

</body>
</html>
```

---

## 💡 What You Just Learned

| Concept | Why It Matters |
|---------|---------------|
| `<meta>` tags | Search engines use these to understand your page |
| `<header>` | Groups the top section — logo, search, account |
| `<nav>` | Marks navigation — helps screen readers skip to content |
| `<main>` | Contains the primary content of the page |
| `<section>` | Groups related content (hero, categories, products) |
| `<footer>` | Groups the bottom section — links, copyright |
| `<h1>` to `<h4>` | Heading hierarchy — `h1` is most important |
| `<form>` | Groups form controls — search bar |
| Comments `<!-- -->` | Notes for developers, invisible to users |

---

## ✅ Expected Output

A fully structured page with:
- A header with logo, search, and account links
- A navigation bar with category links
- A hero section with welcome message
- Category sections
- Product cards with names, descriptions, prices, and buttons
- A footer with organized link groups

Everything is visible but **unstyled** — raw HTML. That's exactly right.

---

## 🧠 Think About This

Open your page in Chrome DevTools (`F12` → Elements tab). Notice how the browser creates a **tree structure** from your HTML. This is called the **DOM (Document Object Model)**. You'll manipulate this tree with JavaScript in Module 06.

---

[Previous Task ← Project Setup](./task-01-project-setup.md) · [Next Task → Semantic HTML](./task-03-semantic-html.md)

[← Back to Module 01](../README.md)
