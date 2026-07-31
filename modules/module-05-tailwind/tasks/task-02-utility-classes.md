# Task 02 — Utility Classes

## 🎯 Objective
Learn Tailwind's utility-first approach for spacing, colors, typography, and layout.

---

## Key Utility Classes

### Spacing
```html
<div class="p-4 m-2 px-6 py-3 mt-8 mb-4 gap-4">
<!-- p = padding, m = margin, x = horizontal, y = vertical, t/b/l/r = side -->
```

### Colors
```html
<div class="bg-gray-900 text-white">Dark header</div>
<p class="text-red-600 font-bold">$49.99</p>
<button class="bg-yellow-400 hover:bg-yellow-500 text-black">Add to Cart</button>
```

### Typography
```html
<h1 class="text-4xl font-bold">Title</h1>
<p class="text-sm text-gray-500 leading-relaxed">Description</p>
<span class="text-xs uppercase tracking-wider font-semibold">Badge</span>
```

### Layout
```html
<div class="flex items-center justify-between">Flexbox</div>
<div class="grid grid-cols-4 gap-4">CSS Grid</div>
<div class="w-full max-w-7xl mx-auto">Container</div>
```

### Product Card Example
```html
<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <img src="product.jpg" alt="Product" class="w-full h-48 object-cover">
    <div class="p-4">
        <h3 class="font-semibold text-gray-900">Wireless Headphones</h3>
        <p class="text-sm text-gray-500 mt-1">Noise cancelling, 30hr battery</p>
        <div class="flex items-center justify-between mt-4">
            <span class="text-xl font-bold text-red-600">$49.99</span>
            <button class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded">
                Add to Cart
            </button>
        </div>
    </div>
</article>
```

---

## CSS vs Tailwind Comparison
```css
/* Custom CSS */
.card { background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
.card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.2); }
```

```html
<!-- Tailwind -->
<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl">
```

Same result. Zero CSS files.

---

[Previous Task ← Setup](./task-01-tailwind-setup-vite.md) · [Next Task → Responsive Utilities](./task-03-responsive-utilities.md)

[← Back to Module 05](../README.md)
