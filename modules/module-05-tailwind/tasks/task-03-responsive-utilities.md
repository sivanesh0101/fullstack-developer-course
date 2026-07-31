# Task 03 — Responsive Utilities

## 🎯 Objective
Build responsive layouts using Tailwind's breakpoint prefixes.

---

## Instructions

### Breakpoint Prefixes
```html
<!-- 1 col mobile, 2 col tablet, 4 col desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div>Product 1</div>
    <div>Product 2</div>
    <div>Product 3</div>
    <div>Product 4</div>
</div>
```

| Prefix | Min Width | Device |
|--------|----------|--------|
| (none) | 0px | Mobile |
| `sm:` | 640px | Large phone |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large screen |

### Responsive Header
```html
<header class="bg-gray-900 text-white p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-7xl mx-auto">
        <a href="#" class="text-2xl font-bold">ShopZone</a>
        <div class="flex-1 max-w-xl">
            <input type="search" placeholder="Search..." class="w-full p-2 rounded text-black">
        </div>
        <div class="flex gap-4 text-sm">
            <a href="#" class="hover:text-yellow-400">Sign In</a>
            <a href="#" class="hover:text-yellow-400">Cart (0)</a>
        </div>
    </div>
</header>
```

### Show/Hide by Breakpoint
```html
<span class="hidden md:inline">Full text on desktop</span>
<span class="md:hidden">Short on mobile</span>
```

---

[Previous Task ← Utility Classes](./task-02-utility-classes.md) · [Next Task → Custom Configuration](./task-04-custom-config.md)

[← Back to Module 05](../README.md)
