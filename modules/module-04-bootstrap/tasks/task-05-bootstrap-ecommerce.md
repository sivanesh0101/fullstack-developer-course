# Task 05 — Bootstrap Ecommerce

## 🎯 Objective
Rebuild your entire ecommerce homepage using Bootstrap components and grid system.

---

## Instructions

Combine everything from Tasks 01–04 to create a complete Bootstrap ecommerce page:

1. **Navbar** — Responsive with search, categories dropdown, cart icon
2. **Hero Section** — Bootstrap carousel with promotional banners
3. **Categories** — Card grid with category images
4. **Products** — Responsive grid of product cards with badges and buttons
5. **Footer** — Multi-column layout with Bootstrap grid

### Hero Carousel
```html
<div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <div class="bg-dark text-white text-center py-5">
                <h2>Summer Sale — Up to 50% Off</h2>
                <p>Shop electronics, fashion, and more.</p>
                <a href="#" class="btn btn-warning btn-lg">Shop Now</a>
            </div>
        </div>
        <div class="carousel-item">
            <div class="bg-primary text-white text-center py-5">
                <h2>New Arrivals</h2>
                <p>Check out the latest products.</p>
                <a href="#" class="btn btn-light btn-lg">Explore</a>
            </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </button>
</div>
```

### Compare: Your Custom CSS vs Bootstrap

| Feature | Custom CSS | Bootstrap |
|---------|-----------|-----------|
| Time to build | Hours | Minutes |
| Responsive | Manual media queries | Built-in grid classes |
| Consistency | Varies | Always consistent |
| Customization | Full control | Limited by framework |
| Unique design | ✅ Unique | ❌ Looks like Bootstrap |

---

## 🧠 Reflection

You now have **three versions** of the same page:
1. **Module 01** — Raw HTML (ugly but functional)
2. **Module 02** — Custom CSS (beautiful but slow to build)
3. **Module 04** — Bootstrap (fast but generic-looking)

Each approach has tradeoffs. Real teams choose based on project needs.

---

## ✅ Expected Output

A complete Bootstrap ecommerce page with navbar, carousel, product grid, modals, and footer.

---

[Previous Task ← Navbar & Modals](./task-04-navbar-and-modals.md)

[← Back to Module 04](../README.md)
