# Task 01 — Why Databases

## 🎯 Objective

Understand why in-memory data disappears and why databases are essential for any real application.

---

## The Problem

Your Express API currently stores products like this:

```js
// server.js
const products = [
    { id: 1, name: "Wireless Headphones", price: 49.99 },
    { id: 2, name: "Running Shoes", price: 79.99 },
];

app.post('/api/products', (req, res) => {
    products.push(req.body); // Added to memory
    res.status(201).json(req.body);
});
```

### Try This

1. Start your server: `npm run dev`
2. Add a product via Postman: `POST /api/products`
3. Verify it exists: `GET /api/products` → ✅ It's there
4. **Restart the server**: `Ctrl+C` then `npm run dev`
5. Check again: `GET /api/products` → ❌ **It's gone**

Everything stored in JavaScript variables lives in **RAM**. When the process stops, RAM is cleared. Your data vanishes.

---

## What a Database Solves

| Problem | In-Memory | Database |
|---------|-----------|----------|
| Server restarts | ❌ Data lost | ✅ Data persisted |
| Multiple servers | ❌ Different data | ✅ Shared data |
| Large datasets | ❌ RAM limit | ✅ Disk storage |
| Querying | ❌ Manual loops | ✅ Built-in queries |
| Relationships | ❌ Manual | ✅ References/joins |
| Backup | ❌ None | ✅ Automated |

---

## Why MongoDB?

| Feature | MongoDB | SQL (MySQL/PostgreSQL) |
|---------|---------|----------------------|
| Data format | JSON-like documents | Tables with rows |
| Schema | Flexible (schema-less) | Strict (defined upfront) |
| Scaling | Horizontal (sharding) | Vertical (bigger server) |
| JavaScript fit | ✅ Native JSON | Requires ORM |
| Learning curve | Lower | Higher |
| Best for | Flexible data, prototyping | Complex relationships |

MongoDB stores data as **documents** — which look exactly like JavaScript objects:

```js
// A MongoDB document
{
    _id: ObjectId("64a7b2c3d4e5f6a7b8c9d0e1"),
    name: "Wireless Headphones",
    price: 49.99,
    category: "electronics",
    inStock: true,
    tags: ["wireless", "audio", "bluetooth"],
    reviews: [
        { user: "John", rating: 5, text: "Great sound!" }
    ]
}
```

No conversion needed. Your JavaScript objects go directly into MongoDB.

---

## Key Vocabulary

| Term | Meaning |
|------|---------|
| **Database** | A container for organized data |
| **Collection** | A group of documents (like a table in SQL) |
| **Document** | A single record (like a row in SQL) |
| **Field** | A key-value pair in a document (like a column) |
| **ObjectId** | MongoDB's unique identifier for each document |
| **BSON** | Binary JSON — MongoDB's internal data format |

### SQL to MongoDB Mapping

| SQL | MongoDB |
|-----|---------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| `SELECT * FROM products` | `db.products.find()` |
| `INSERT INTO products` | `db.products.insertOne()` |

---

## 🧠 Reflection

After this task, you should understand:

1. Why variables aren't enough for real applications
2. Why MongoDB is a natural fit for JavaScript developers
3. The vocabulary: database, collection, document, field

---

[Next Task → MongoDB Setup](./task-02-mongodb-setup.md)

[← Back to Module 10](../README.md)
