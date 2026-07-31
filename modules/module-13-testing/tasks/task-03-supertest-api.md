# Task 03 — Supertest API Tests

## 🎯 Objective

Test Express API routes end-to-end with Supertest — without a real HTTP server.

---

## Instructions

### Install

```bash
npm install -D supertest
```

### App Setup for Testing

```js
// app.js (separate from server.js)
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

module.exports = app; // Export app WITHOUT calling listen()

// server.js
const app = require('./app');
const connectDB = require('./config/database');

connectDB();
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
});
```

### Test Setup with MongoDB Memory Server

```bash
npm install -D @jest/globals mongodb-memory-server mongoose
```

```js
// jest.config.js
module.exports = {
    testEnvironment: 'node',
    globalSetup: './tests/setup.js',
    globalTeardown: './tests/teardown.js',
};
```

```js
// tests/setup.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

module.exports = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    process.env.MONGODB_URI = uri;
    process.env.JWT_SECRET = 'test-secret-key';
    await mongoose.connect(uri);
    global.__MONGOD__ = mongod;
};
```

### Auth Route Tests

```js
// tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth API', () => {
    beforeEach(async () => {
        await User.deleteMany({}); // Clean slate before each test
    });

    describe('POST /api/auth/register', () => {
        test('registers a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'Password123!'
                });

            expect(res.status).toBe(201);
            expect(res.body.token).toBeDefined();
            expect(res.body.user.email).toBe('john@example.com');
            expect(res.body.user.password).toBeUndefined(); // Never expose password
        });

        test('returns 400 for duplicate email', async () => {
            await User.create({
                name: 'John',
                email: 'john@example.com',
                password: 'Password123!'
            });

            const res = await request(app)
                .post('/api/auth/register')
                .send({ name: 'Jane', email: 'john@example.com', password: 'Pass123!' });

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/already registered/i);
        });

        test('returns 400 for missing required fields', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({ email: 'john@example.com' }); // Missing name and password

            expect(res.status).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Password123!'
            });
        });

        test('logs in with correct credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'Password123!' });

            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
        });

        test('returns 401 for wrong password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' });

            expect(res.status).toBe(401);
        });

        test('returns 401 for non-existent email', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'ghost@example.com', password: 'Password123!' });

            expect(res.status).toBe(401);
        });
    });
});
```

### Product Route Tests

```js
// tests/products.test.js
const request = require('supertest');
const app = require('../app');

let adminToken;

beforeAll(async () => {
    // Create admin user and get token
    const res = await request(app).post('/api/auth/register').send({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'AdminPass123!',
        role: 'admin'
    });
    adminToken = res.body.token;
});

describe('Products API', () => {
    test('GET /api/products returns product list', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('POST /api/products requires admin role', async () => {
        // Without token
        const noAuth = await request(app).post('/api/products').send({});
        expect(noAuth.status).toBe(401);
    });

    test('POST /api/products creates product for admin', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'Test Product',
                price: 29.99,
                category: 'electronics',
                description: 'A test product for testing',
                stock: 10
            });

        expect(res.status).toBe(201);
        expect(res.body.data.name).toBe('Test Product');
    });
});
```

---

## 💡 Why Supertest?

| Feature | Manual Testing | Supertest |
|---------|---------------|----------|
| Speed | Minutes per endpoint | Milliseconds |
| Repeatability | Inconsistent | Always identical |
| CI/CD | ❌ Can't run manually | ✅ Automated |
| Coverage | Partial | 100% of defined cases |

---

[Previous Task ← Jest Unit Tests](./task-02-jest-unit-tests.md) · [Next Task → React Testing Library](./task-04-react-testing-library.md)

[← Back to Module 13](../README.md)
