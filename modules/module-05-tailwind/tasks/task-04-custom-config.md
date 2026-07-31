# Task 04 — Custom Configuration

## 🎯 Objective
Customize Tailwind's design tokens — colors, fonts, spacing — to match your brand.

---

## Instructions

### Custom Theme in CSS
```css
@import "tailwindcss";

@theme {
    --color-brand: #131921;
    --color-brand-light: #232f3e;
    --color-accent: #febd69;
    --color-cta: #ffd814;
    --color-price: #b12704;

    --font-sans: 'Inter', sans-serif;
}
```

### Usage
```html
<header class="bg-brand text-white">ShopZone</header>
<button class="bg-cta hover:bg-accent text-black font-semibold py-2 px-4 rounded">
    Add to Cart
</button>
<span class="text-price font-bold text-xl">$49.99</span>
```

Now your Tailwind classes use your brand colors — fully custom design with utility speed.

---

[Previous Task ← Responsive Utilities](./task-03-responsive-utilities.md) · [Next Task → Tailwind Ecommerce](./task-05-tailwind-ecommerce.md)

[← Back to Module 05](../README.md)
