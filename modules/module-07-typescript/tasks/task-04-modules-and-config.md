# Task 04 — Modules & Config

## 🎯 Objective
Organize TypeScript code into modules and configure the compiler.

---

## Module System
```ts
// types/product.ts
export interface Product { id: number; name: string; price: number; }
export type Category = "electronics" | "fashion" | "books";

// utils/cart.ts
import { Product } from "../types/product";

export function getTotal(items: Product[]): number {
    return items.reduce((sum, p) => sum + p.price, 0);
}

// main.ts
import { Product } from "./types/product";
import { getTotal } from "./utils/cart";
```

## tsconfig.json
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "strict": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "esModuleInterop": true,
        "resolveJsonModule": true,
        "declaration": true,
        "sourceMap": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

### Key Config Options
| Option | What It Does |
|--------|-------------|
| `strict: true` | Enables all strict type checks |
| `target` | JavaScript version to compile to |
| `outDir` | Where compiled JS goes |
| `sourceMap` | Maps compiled JS back to TS for debugging |

---

[Previous Task ← Enums & Generics](./task-03-enums-and-generics.md) · [Next Task → Refactor to TypeScript](./task-05-refactor-to-typescript.md)

[← Back to Module 07](../README.md)
