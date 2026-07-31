# Task 02 — Types & Interfaces

## 🎯 Objective
Define types for your ecommerce data — products, cart items, and users.

---

## Instructions

### Basic Types
```ts
const productName: string = "Wireless Headphones";
const price: number = 49.99;
const inStock: boolean = true;
const tags: string[] = ["wireless", "audio"];
const rating: number | null = null; // Union type
```

### Interfaces
```ts
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: number;
    inStock: boolean;
    image: string;
    tags: string[];
    description?: string; // Optional
}

interface CartItem extends Product {
    quantity: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: "customer" | "admin"; // Literal type
}
```

### Type Aliases
```ts
type Category = "electronics" | "fashion" | "books" | "home" | "sports";
type SortOption = "price-low" | "price-high" | "rating" | "name";
type ID = number | string;
```

### Using Interfaces
```ts
function createProduct(data: Product): Product {
    return { ...data };
}

function getCartTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function filterByCategory(products: Product[], category: Category): Product[] {
    return products.filter(p => p.category === category);
}
```

---

## 💡 Interface vs Type Alias
| Feature | Interface | Type |
|---------|-----------|------|
| Extend | `extends` | `&` (intersection) |
| Implements | ✅ Classes can implement | ✅ |
| Union types | ❌ | ✅ `type X = A \| B` |
| Declaration merging | ✅ | ❌ |
| Best for | Object shapes | Unions, primitives |

---

[Previous Task ← Why TypeScript](./task-01-why-typescript.md) · [Next Task → Enums & Generics](./task-03-enums-and-generics.md)

[← Back to Module 07](../README.md)
