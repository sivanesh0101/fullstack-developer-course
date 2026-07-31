# Task 04 — Roles & Permissions

## 🎯 Objective

Build role-based access control — admin vs customer with route protection.

---

## Instructions

### Authorization Middleware

```js
// middleware/auth.js
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role '${req.user.role}' is not authorized to access this route`
            });
        }
        next();
    };
};
```

### Protecting Admin Routes

```js
const { protect, authorize } = require('../middleware/auth');

// Anyone authenticated can view products
router.get('/products', protect, getAllProducts);

// Only admins can create, update, delete products
router.post('/products', protect, authorize('admin'), createProduct);
router.put('/products/:id', protect, authorize('admin'), updateProduct);
router.delete('/products/:id', protect, authorize('admin'), deleteProduct);

// Only admins can view all orders
router.get('/admin/orders', protect, authorize('admin'), getAllOrders);

// Users can only view their own orders
router.get('/orders', protect, getMyOrders);
```

### Permission Matrix

| Route | Customer | Admin |
|-------|----------|-------|
| `GET /products` | ✅ | ✅ |
| `POST /products` | ❌ 403 | ✅ |
| `PUT /products/:id` | ❌ 403 | ✅ |
| `DELETE /products/:id` | ❌ 403 | ✅ |
| `GET /orders` (own) | ✅ | ✅ |
| `GET /admin/orders` (all) | ❌ 403 | ✅ |
| `GET /admin/users` | ❌ 403 | ✅ |

### Get Current User Profile

```js
exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ status: 'success', data: user });
};

router.get('/me', protect, getMe);
```

---

## 💡 Authentication vs Authorization

| Concept | Question | HTTP Status |
|---------|----------|-------------|
| **Authentication** | Who are you? | 401 Unauthorized |
| **Authorization** | What can you do? | 403 Forbidden |

---

[Previous Task ← Refresh Tokens](./task-03-refresh-tokens.md) · [Next Task → Session Management](./task-05-session-management.md)

[← Back to Module 11](../README.md)
