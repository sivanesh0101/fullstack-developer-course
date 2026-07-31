# Task 04 — Navbar & Modals

## 🎯 Objective
Build a responsive navbar with dropdown menus and a product quick-view modal.

---

## Instructions

### Responsive Navbar
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#">ShopZone</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Categories</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Electronics</a></li>
                        <li><a class="dropdown-item" href="#">Fashion</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">All Categories</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a class="nav-link" href="#">Deals</a></li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search">
                <button class="btn btn-outline-warning" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>
```

### Product Quick-View Modal
```html
<button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#productModal">
    Quick View
</button>

<div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Wireless Headphones</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <img src="headphones.jpg" class="img-fluid" alt="Headphones">
                    </div>
                    <div class="col-md-6">
                        <p class="text-danger fs-4 fw-bold">$49.99</p>
                        <p>High-quality wireless headphones with noise cancellation.</p>
                        <div class="mb-3">
                            <label class="form-label">Quantity</label>
                            <select class="form-select w-auto">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-warning">Add to Cart</button>
                <button class="btn btn-dark">Buy Now</button>
            </div>
        </div>
    </div>
</div>
```

---

## ✅ Expected Output

- Responsive navbar that collapses into a hamburger menu on mobile
- Category dropdown menu
- Product quick-view modal with image and details

---

[Previous Task ← Components](./task-03-components.md) · [Next Task → Bootstrap Ecommerce](./task-05-bootstrap-ecommerce.md)

[← Back to Module 04](../README.md)
