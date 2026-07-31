# Task 02 — Express Setup

## 🎯 Objective
Set up an Express.js server with basic routing.

---

## Instructions

```bash
mkdir ecommerce-api && cd ecommerce-api
npm init -y
npm install express cors dotenv
npm install -D nodemon
```

```js
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'Headphones', price: 49.99 },
        { id: 2, name: 'Running Shoes', price: 79.99 },
    ]);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
```

### package.json scripts
```json
{
    "scripts": {
        "dev": "nodemon server.js",
        "start": "node server.js"
    }
}
```

---

[Previous Task ← Node Fundamentals](./task-01-node-fundamentals.md) · [Next Task → REST API Design](./task-03-rest-api-design.md)

[← Back to Module 09](../README.md)
