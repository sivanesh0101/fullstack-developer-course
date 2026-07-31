# Task 03 — Components

## 🎯 Objective
Use Bootstrap's pre-built components: cards, buttons, badges, alerts, and forms.

---

## Instructions

### Cards
```html
<div class="card" style="width: 18rem;">
    <img src="product.jpg" class="card-img-top" alt="Product">
    <div class="card-body">
        <h5 class="card-title">Product Name</h5>
        <p class="card-text">Short description of the product.</p>
        <span class="badge bg-success">In Stock</span>
        <p class="text-danger fw-bold mt-2">$49.99</p>
        <a href="#" class="btn btn-warning">Add to Cart</a>
    </div>
</div>
```

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-warning">Add to Cart</button>
<button class="btn btn-outline-danger">Remove</button>
<button class="btn btn-dark btn-lg">Checkout</button>
<button class="btn btn-secondary btn-sm">Details</button>
```

### Alerts
```html
<div class="alert alert-success" role="alert">
    ✅ Item added to cart successfully!
</div>
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    ❌ This item is out of stock.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

### Forms
```html
<form>
    <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" required>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" required>
    </div>
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember">Remember me</label>
    </div>
    <button type="submit" class="btn btn-primary w-100">Sign In</button>
</form>
```

### Badges
```html
<span class="badge bg-danger">Sale</span>
<span class="badge bg-success">New</span>
<span class="badge bg-warning text-dark">Hot Deal</span>
<span class="badge rounded-pill bg-primary">99+</span>
```

---

## ✅ Expected Output

Professional-looking cards, buttons, alerts, forms, and badges — all styled and responsive with zero custom CSS.

---

[Previous Task ← Grid System](./task-02-grid-system.md) · [Next Task → Navbar & Modals](./task-04-navbar-and-modals.md)

[← Back to Module 04](../README.md)
