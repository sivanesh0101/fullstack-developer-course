# Task 05 — Relationships

## 🎯 Objective

Model relationships between products, users, orders, and reviews using references and embedded documents.

---

## Instructions

### Two Approaches in MongoDB

| Approach | When to Use | Example |
|----------|------------|---------|
| **Embedded** | Data is always accessed together, rarely changes independently | Reviews inside a Product |
| **Reference** | Data is shared across documents, changes independently | User referenced in Order |

### Embedded: Reviews Inside Product

```js
// models/Product.js — add reviews as embedded documents
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500
    }
}, {
    timestamps: true
});

// Add to product schema
const productSchema = new mongoose.Schema({
    // ... existing fields ...
    reviews: [reviewSchema]
});
```

### Referenced: Order → User, Order → Products

```js
// Already in our Order schema:
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',           // References the User collection
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',    // References the Product collection
            required: true
        },
        quantity: Number,
        price: Number
    }]
});
```

### Populate: Loading Referenced Data

```js
// Without populate — only returns ObjectId
const order = await Order.findById(orderId);
// order.user → "64a7b2c3d4e5f6a7b8c9d0e1" (just an ID)

// With populate — loads the actual user data
const order = await Order.findById(orderId)
    .populate('user', 'name email')          // Only load name and email
    .populate('items.product', 'name price image');

// order.user → { _id: "...", name: "John", email: "john@email.com" }
// order.items[0].product → { _id: "...", name: "Headphones", price: 49.99 }
```

### Adding a Review

```js
// controllers/productController.js
exports.addReview = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === req.user.id
        );
        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Already reviewed' });
        }

        const review = {
            user: req.user.id,
            userName: req.user.name,
            rating: req.body.rating,
            comment: req.body.comment
        };

        product.reviews.push(review);

        // Recalculate average rating
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((sum, r) => sum + r.rating, 0)
            / product.reviews.length;

        await product.save();

        res.status(201).json({ message: 'Review added', data: product });
    } catch (error) {
        next(error);
    }
};
```

---

## 💡 Embedded vs Referenced

| Factor | Embedded | Referenced |
|--------|----------|-----------|
| **Read speed** | ✅ Faster (single query) | Slower (needs populate) |
| **Write speed** | Slower (updates whole doc) | ✅ Faster (updates one doc) |
| **Data duplication** | Possible | ✅ No duplication |
| **Document size** | Can grow large | ✅ Stays small |
| **Independent updates** | Harder | ✅ Easy |

---

## ✅ Expected Output

- Reviews embedded inside Product documents
- Orders reference User and Product via ObjectId
- `populate()` loads full user and product data when needed

---

[Previous Task ← CRUD Operations](./task-04-crud-operations.md) · [Next Task → Indexes & Aggregation](./task-06-indexes-and-aggregation.md)

[← Back to Module 10](../README.md)
