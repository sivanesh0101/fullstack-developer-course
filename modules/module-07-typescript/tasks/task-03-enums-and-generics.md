# Task 03 — Enums & Generics

## 🎯 Objective
Use enums for fixed sets of values and generics for reusable typed functions.

---

## Enums
```ts
enum OrderStatus {
    Pending = "pending",
    Processing = "processing",
    Shipped = "shipped",
    Delivered = "delivered",
    Cancelled = "cancelled"
}

enum PaymentMethod {
    Card = "card",
    UPI = "upi",
    COD = "cod",
    Wallet = "wallet"
}

const order = { status: OrderStatus.Pending, payment: PaymentMethod.Card };
```

## Generics
```ts
// Generic function
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

getFirst<Product>(products);   // returns Product
getFirst<string>(["a", "b"]); // returns string

// Generic API response
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

type ProductResponse = ApiResponse<Product[]>;
type UserResponse = ApiResponse<User>;
```

---

[Previous Task ← Types & Interfaces](./task-02-types-and-interfaces.md) · [Next Task → Modules & Config](./task-04-modules-and-config.md)

[← Back to Module 07](../README.md)
