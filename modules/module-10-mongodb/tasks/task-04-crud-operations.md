# Task 04 — CRUD Operations

## 🎯 Objective

Implement Create, Read, Update, and Delete operations with Mongoose in Express routes.

---

## Instructions

### Product Controller

```js
// controllers/productController.js
const Product = require('../models/Product');

// CREATE — POST /api/products
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// READ ALL — GET /api/products
exports.getAllProducts = async (req, res, next) => {
    try {
        // Query parameters
        const {
            category,
            search,
            sort = '-createdAt',
            page = 1,
            limit = 12,
            minPrice,
            maxPrice
        } = req.query;

        // Build filter
        const filter = { isActive: true };
        if (category) filter.category = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (search) {
            filter.$text = { $search: search };
        }

        // Execute query with pagination
        const skip = (Number(page) - 1) * Number(limit);

        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(Number(limit)),
            Product.countDocuments(filter)
        ]);

        res.json({
            status: 'success',
            results: products.length,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// READ ONE — GET /api/products/:id
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }

        res.json({ status: 'success', data: product });
    } catch (error) {
        next(error);
    }
};

// UPDATE — PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }

        res.json({ status: 'success', data: product });
    } catch (error) {
        next(error);
    }
};

// DELETE — DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }

        res.status(204).send(); // No content
    } catch (error) {
        next(error);
    }
};
```

### Product Routes

```js
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.route('/')
    .get(getAllProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
```

### Wire Up in Server

```js
// server.js
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
```

---

## 🧪 Test with Postman

| Method | URL | Body | Expected |
|--------|-----|------|----------|
| POST | `/api/products` | `{ "name": "Headphones", "price": 49.99, "category": "electronics", "stock": 50, "description": "Wireless headphones" }` | 201 Created |
| GET | `/api/products` | — | 200 + product list |
| GET | `/api/products/:id` | — | 200 + single product |
| GET | `/api/products?category=electronics&sort=-price` | — | Filtered & sorted |
| PUT | `/api/products/:id` | `{ "price": 39.99 }` | 200 + updated product |
| DELETE | `/api/products/:id` | — | 204 No Content |

---

## 💡 Key Mongoose Methods

| Method | Purpose |
|--------|---------|
| `Model.create(data)` | Create a new document |
| `Model.find(filter)` | Find all matching documents |
| `Model.findById(id)` | Find by MongoDB ObjectId |
| `Model.findByIdAndUpdate(id, data, options)` | Find and update |
| `Model.findByIdAndDelete(id)` | Find and delete |
| `Model.countDocuments(filter)` | Count matching documents |
| `.sort('-price')` | Sort descending by price |
| `.skip(n).limit(m)` | Pagination |

---

## ✅ Expected Output

Full CRUD API working with MongoDB. Restart the server — data persists. The in-memory problem is solved.

---

[Previous Task ← Mongoose Schemas](./task-03-mongoose-schemas.md) · [Next Task → Relationships](./task-05-relationships.md)

[← Back to Module 10](../README.md)
