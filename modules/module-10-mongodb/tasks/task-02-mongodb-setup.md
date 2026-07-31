# Task 02 — MongoDB Setup

## 🎯 Objective

Set up MongoDB Atlas (cloud), connect with Mongoose, and explore data with MongoDB Compass.

---

## Instructions

### Step 1: Create a MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up for free
3. Create a new cluster (choose **FREE** tier)
4. Select region closest to you
5. Click **Create Cluster**

### Step 2: Configure Access

**Database Access:**
1. Go to **Database Access** → **Add New Database User**
2. Username: `shopzone-admin`
3. Password: auto-generate a strong password (save it!)
4. Role: **Read and write to any database**

**Network Access:**
1. Go to **Network Access** → **Add IP Address**
2. Click **Allow Access from Anywhere** (for development)
3. In production, restrict to your server's IP

### Step 3: Get Connection String

1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Copy the connection string:

```
mongodb+srv://shopzone-admin:<password>@cluster0.xxxxx.mongodb.net/shopzone?retryWrites=true&w=majority
```

### Step 4: Install Mongoose

```bash
cd ecommerce-api
npm install mongoose
```

### Step 5: Connect to MongoDB

```js
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

### Step 6: Update Your Server

```js
// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());

// ... routes ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Step 7: Update `.env`

```
PORT=3000
MONGODB_URI=mongodb+srv://shopzone-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/shopzone?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
```

### Step 8: Install MongoDB Compass

Download [MongoDB Compass](https://www.mongodb.com/products/compass) — a GUI to visually explore your database. Connect using the same connection string.

---

## ✅ Expected Output

```
Server running on port 3000
✅ MongoDB connected: cluster0-shard-00-01.xxxxx.mongodb.net
```

Your API is now connected to a real database. Data will persist forever.

---

[Previous Task ← Why Databases](./task-01-why-databases.md) · [Next Task → Mongoose Schemas](./task-03-mongoose-schemas.md)

[← Back to Module 10](../README.md)
