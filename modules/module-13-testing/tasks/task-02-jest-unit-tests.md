# Task 02 — Jest Unit Tests

## 🎯 Objective

Write unit tests for business logic — cart calculations, price formatting, and auth utilities.

---

## Instructions

### Install Jest

```bash
npm install -D jest
```

Add to `package.json`:
```json
{
    "scripts": {
        "test": "jest",
        "test:watch": "jest --watch",
        "test:coverage": "jest --coverage"
    },
    "jest": {
        "testEnvironment": "node"
    }
}
```

### Test Structure

```
src/
├── utils/
│   ├── cart.js
│   └── cart.test.js     ← Test lives next to the file it tests
├── utils/
│   ├── price.js
│   └── price.test.js
```

### Test: Cart Calculations

```js
// utils/cart.js
function calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateTax(subtotal, rate = 0.18) {
    return subtotal * rate;
}

function calculateTotal(subtotal, tax, shipping = 0) {
    return subtotal + tax + shipping;
}

function applyDiscount(price, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error('Discount must be between 0 and 100');
    }
    return price * (1 - discountPercent / 100);
}

module.exports = { calculateSubtotal, calculateTax, calculateTotal, applyDiscount };
```

```js
// utils/cart.test.js
const { calculateSubtotal, calculateTax, calculateTotal, applyDiscount } = require('./cart');

describe('Cart calculations', () => {
    // Test data
    const items = [
        { name: 'Headphones', price: 49.99, quantity: 2 },
        { name: 'Case', price: 9.99, quantity: 1 }
    ];

    describe('calculateSubtotal', () => {
        test('calculates total for multiple items', () => {
            expect(calculateSubtotal(items)).toBeCloseTo(109.97, 2);
        });

        test('returns 0 for empty cart', () => {
            expect(calculateSubtotal([])).toBe(0);
        });

        test('handles single item', () => {
            expect(calculateSubtotal([{ price: 50, quantity: 1 }])).toBe(50);
        });
    });

    describe('calculateTax', () => {
        test('calculates 18% tax by default', () => {
            expect(calculateTax(100)).toBeCloseTo(18, 2);
        });

        test('uses custom tax rate', () => {
            expect(calculateTax(100, 0.28)).toBeCloseTo(28, 2);
        });

        test('returns 0 for 0 subtotal', () => {
            expect(calculateTax(0)).toBe(0);
        });
    });

    describe('applyDiscount', () => {
        test('applies 10% discount', () => {
            expect(applyDiscount(100, 10)).toBe(90);
        });

        test('applies 0% discount (no change)', () => {
            expect(applyDiscount(100, 0)).toBe(100);
        });

        test('throws for negative discount', () => {
            expect(() => applyDiscount(100, -10)).toThrow('Discount must be between 0 and 100');
        });

        test('throws for discount over 100%', () => {
            expect(() => applyDiscount(100, 110)).toThrow();
        });
    });
});
```

### Test: Password Validation

```js
// utils/validation.test.js
const { isValidEmail, isStrongPassword } = require('./validation');

describe('Input validation', () => {
    describe('isValidEmail', () => {
        test.each([
            ['john@example.com', true],
            ['user.name@domain.co.in', true],
            ['invalid-email', false],
            ['@nodomain.com', false],
            ['', false],
        ])('isValidEmail(%s) → %s', (email, expected) => {
            expect(isValidEmail(email)).toBe(expected);
        });
    });
});
```

### Run Tests

```bash
npm test                  # Run all tests once
npm run test:watch        # Re-run on file changes
npm run test:coverage     # Show coverage report
```

### Reading Coverage Report

```
----------|---------|----------|---------|---------|
File      | % Stmts | % Branch | % Funcs | % Lines |
----------|---------|----------|---------|---------|
cart.js   |   100   |    100   |   100   |   100   |
----------|---------|----------|---------|---------|
```

Aim for **80%+ coverage** on business logic files.

---

[Previous Task ← API Testing with Postman](./task-01-api-testing-postman.md) · [Next Task → Supertest API Tests](./task-03-supertest-api.md)

[← Back to Module 13](../README.md)
