# Task 03 — REST API Design

## 🎯 Objective
Design RESTful API endpoints for the ecommerce platform.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| GET | `/api/products?category=electronics` | Filter by category |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart` | Add to cart |
| DELETE | `/api/cart/:itemId` | Remove from cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Get user's orders |

### HTTP Status Codes
| Code | Use When |
|------|----------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request (validation error) |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Resource not found |
| 500 | Server error |

---

[Previous Task ← Express Setup](./task-02-express-setup.md) · [Next Task → Middleware](./task-04-middleware.md)

[← Back to Module 09](../README.md)
