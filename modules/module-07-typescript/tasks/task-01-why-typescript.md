# Task 01 — Why TypeScript

## 🎯 Objective
Understand why TypeScript exists by experiencing JavaScript's type system failures.

---

## The Problem

```js
function calculateTotal(price, tax) {
    return price + tax;
}

// This works
calculateTotal(100, 18);    // 118

// This "works" too — but it's WRONG
calculateTotal(100, "abc"); // "100abc" (string concatenation!)
calculateTotal(100);        // NaN (undefined + 100)
```

JavaScript didn't warn you. It silently produced wrong results.

---

## TypeScript Solution

```ts
function calculateTotal(price: number, tax: number): number {
    return price + tax;
}

calculateTotal(100, 18);      // ✅ 118
calculateTotal(100, "abc");   // ❌ Error: Argument of type 'string' is not assignable
calculateTotal(100);          // ❌ Error: Expected 2 arguments, but got 1
```

TypeScript **stops you before the bug reaches your users**.

---

## Setting Up TypeScript

```bash
npm install -D typescript
npx tsc --init               # Creates tsconfig.json
```

Create a file `app.ts`:
```ts
const greeting: string = "Hello, TypeScript!";
console.log(greeting);
```

Compile:
```bash
npx tsc app.ts               # Produces app.js
```

---

## 💡 Key Insight
TypeScript is JavaScript with a **spell checker for data types**. It doesn't change how your code runs — it just catches mistakes before they happen.

---

[Next Task → Types & Interfaces](./task-02-types-and-interfaces.md)

[← Back to Module 07](../README.md)
