# Task 06 — Advanced Types

## 🎯 Objective
Use utility types, discriminated unions, and type guards for complex type scenarios.

---

## Utility Types
```ts
// Partial — all properties optional
type ProductUpdate = Partial<Product>;

// Pick — select specific properties
type ProductPreview = Pick<Product, "id" | "name" | "price" | "image">;

// Omit — exclude properties
type CreateProduct = Omit<Product, "id">;

// Required — all properties required
type RequiredProduct = Required<Product>;

// Record — key-value map
type CategoryProducts = Record<Category, Product[]>;

// Readonly — immutable
type FrozenProduct = Readonly<Product>;
```

## Discriminated Unions
```ts
type PaymentResult =
    | { status: "success"; transactionId: string; amount: number }
    | { status: "failed"; error: string; code: number }
    | { status: "pending"; estimatedTime: number };

function handlePayment(result: PaymentResult) {
    switch (result.status) {
        case "success":
            console.log(`Paid! Transaction: ${result.transactionId}`);
            break;
        case "failed":
            console.error(`Failed: ${result.error}`);
            break;
        case "pending":
            console.log(`Processing... ~${result.estimatedTime}s`);
            break;
    }
}
```

## Type Guards
```ts
function isProduct(item: unknown): item is Product {
    return typeof item === "object" && item !== null && "id" in item && "price" in item;
}
```

---

[Previous Task ← Refactor to TypeScript](./task-05-refactor-to-typescript.md)

[← Back to Module 07](../README.md)
