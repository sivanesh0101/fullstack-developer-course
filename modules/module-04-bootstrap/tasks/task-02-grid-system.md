# Task 02 — Grid System

## 🎯 Objective
Build responsive layouts using Bootstrap's 12-column grid system.

---

## Instructions

### The 12-Column Grid

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Product 1</div>
        <div class="col-12 col-md-6 col-lg-3">Product 2</div>
        <div class="col-12 col-md-6 col-lg-3">Product 3</div>
        <div class="col-12 col-md-6 col-lg-3">Product 4</div>
    </div>
</div>
```

**Result:**
- Mobile: 1 product per row (12/12)
- Tablet: 2 products per row (6/12)
- Desktop: 4 products per row (3/12)

### Breakpoint Reference

| Prefix | Screen Width | Example |
|--------|-------------|---------|
| (none) | `<576px` | `col-12` |
| `sm` | `≥576px` | `col-sm-6` |
| `md` | `≥768px` | `col-md-4` |
| `lg` | `≥992px` | `col-lg-3` |
| `xl` | `≥1200px` | `col-xl-2` |

### Product Grid

```html
<div class="container py-4">
    <h2 class="mb-4">Featured Products</h2>
    <div class="row g-4">
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100">
                <img src="images/product1.jpg" class="card-img-top" alt="Product">
                <div class="card-body">
                    <h5 class="card-title">Wireless Headphones</h5>
                    <p class="card-text text-danger fw-bold">$49.99</p>
                    <button class="btn btn-warning w-100">Add to Cart</button>
                </div>
            </div>
        </div>
        <!-- Repeat for more products -->
    </div>
</div>
```

### Useful Spacing Classes

| Class | Property | Size |
|-------|----------|------|
| `g-4` | gap | 1.5rem (on row) |
| `py-4` | padding-y | 1.5rem |
| `mb-4` | margin-bottom | 1.5rem |
| `w-100` | width | 100% |

---

## ✅ Expected Output

A responsive product grid that automatically adjusts columns based on screen size.

---

[Previous Task ← Bootstrap Setup](./task-01-bootstrap-setup.md) · [Next Task → Components](./task-03-components.md)

[← Back to Module 04](../README.md)
