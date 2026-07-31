# Task 01 — API Testing with Postman

## 🎯 Objective

Test all API endpoints systematically using Postman collections and environments.

---

## Instructions

### Step 1: Install Postman

Download from [postman.com](https://www.postman.com/downloads/)

### Step 2: Create Environment

In Postman → **Environments** → **New**:

```
Environment Name: ShopZone Development

Variables:
  base_url   = http://localhost:3000/api
  token      = (leave empty — will be set by login test)
  user_email = test@example.com
  user_pass  = password123
```

### Step 3: Create Collection

**ShopZone API** collection with these folders:

```
📁 ShopZone API
  📁 Auth
    POST   Register
    POST   Login
    GET    Get Me
    POST   Logout
  📁 Products
    GET    Get All Products
    GET    Get Product by ID
    POST   Create Product (admin)
    PUT    Update Product (admin)
    DELETE Delete Product (admin)
  📁 Cart
    GET    Get Cart
    POST   Add to Cart
    DELETE Remove from Cart
  📁 Orders
    POST   Create Order
    GET    Get My Orders
    GET    Get Order by ID
```

### Step 4: Auto-Set Token After Login

In the **Login** request → **Tests** tab:

```js
// Auto-save token from login response
const response = pm.response.json();
if (response.token) {
    pm.environment.set('token', response.token);
    console.log('Token saved to environment');
}
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("Token received", () => pm.expect(response.token).to.be.a('string'));
```

### Step 5: Use Token in Protected Requests

For all protected routes → **Authorization** tab:
- Type: `Bearer Token`
- Token: `{{token}}`

### Step 6: Write Tests for Each Request

```js
// GET /api/products — Tests tab
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("Response is JSON", () => pm.response.to.be.json);
pm.test("Has results array", () => {
    const json = pm.response.json();
    pm.expect(json.data).to.be.an('array');
    pm.expect(json.results).to.be.a('number');
});
pm.test("Response time < 500ms", () => pm.expect(pm.response.responseTime).to.be.below(500));

// POST /api/products — Tests tab
pm.test("Status is 201", () => pm.response.to.have.status(201));
pm.test("Product has ID", () => {
    const json = pm.response.json();
    pm.expect(json.data._id).to.exist;
    pm.environment.set('product_id', json.data._id);
});
```

### Step 7: Run Collection

**Collection Runner** → Select ShopZone API → Run all tests → Check results.

All tests should pass with ✅ green checks before moving on.

---

## 💡 Test Coverage Checklist

- [ ] Register returns 201 with user object
- [ ] Login returns 200 with JWT token
- [ ] Protected routes return 401 without token
- [ ] Create product returns 201 (admin only)
- [ ] Get products returns paginated array
- [ ] Invalid product ID returns 404
- [ ] Response times are under 500ms

---

[Next Task → Jest Unit Tests](./task-02-jest-unit-tests.md)

[← Back to Module 13](../README.md)
