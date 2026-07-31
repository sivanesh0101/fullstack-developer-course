# Task 06 — Indexes & Aggregation

## 🎯 Objective

Optimize query performance with indexes and use the aggregation pipeline for analytics.

---

## Instructions

### Creating Indexes

```js
// In your schema file
productSchema.index({ name: 'text', description: 'text' }); // Text search
productSchema.index({ category: 1, price: 1 });              // Compound index
productSchema.index({ createdAt: -1 });                       // Sort by newest

// Check existing indexes
// In MongoDB Compass or shell:
db.products.getIndexes();
```

### Text Search with Index

```js
// Search products by text
const results = await Product.find(
    { $text: { $search: "wireless headphones bluetooth" } },
    { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
```

### Aggregation Pipeline

```js
// Get sales summary by category
const salesByCategory = await Order.aggregate([
    { $unwind: '$items' },
    {
        $group: {
            _id: '$items.category',
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
            totalOrders: { $sum: 1 },
            avgOrderValue: { $avg: { $multiply: ['$items.price', '$items.quantity'] } }
        }
    },
    { $sort: { totalRevenue: -1 } }
]);

// Get top-rated products
const topRated = await Product.aggregate([
    { $match: { numReviews: { $gte: 5 } } },
    { $sort: { rating: -1 } },
    { $limit: 10 },
    { $project: { name: 1, rating: 1, numReviews: 1, price: 1 } }
]);

// Monthly revenue report
const monthlyRevenue = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    {
        $group: {
            _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
            },
            revenue: { $sum: '$total' },
            orders: { $sum: 1 }
        }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } }
]);
```

### Aggregation Stages

| Stage | What It Does |
|-------|-------------|
| `$match` | Filter documents (like `WHERE`) |
| `$group` | Group by field and aggregate (`GROUP BY`) |
| `$sort` | Sort results |
| `$project` | Select/reshape fields (`SELECT`) |
| `$unwind` | Flatten arrays into separate documents |
| `$limit` | Limit number of results |
| `$lookup` | Join with another collection (`JOIN`) |

---

[Previous Task ← Relationships](./task-05-relationships.md) · [Next Task → Redis Caching](./task-07-redis-caching.md)

[← Back to Module 10](../README.md)
