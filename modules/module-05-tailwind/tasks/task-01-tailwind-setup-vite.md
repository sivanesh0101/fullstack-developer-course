# Task 01 — Tailwind Setup with Vite

## 🎯 Objective
Set up a Vite project with Tailwind CSS for fast development with hot module replacement.

---

## Instructions

### Step 1: Create a Vite Project
```bash
npm create vite@latest ecommerce-tailwind -- --template vanilla
cd ecommerce-tailwind
npm install
```

### Step 2: Install Tailwind CSS
```bash
npm install -D tailwindcss @tailwindcss/vite
```

### Step 3: Configure Vite
Update `vite.config.js`:
```js
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}
```

### Step 4: Add Tailwind to CSS
In your `style.css`:
```css
@import "tailwindcss";
```

### Step 5: Test It
Update `index.html`:
```html
<body class="bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-blue-600 text-center mt-10">
        Tailwind is working! 🎉
    </h1>
</body>
```

### Step 6: Start Dev Server
```bash
npm run dev
```

If you see a styled heading, Tailwind is ready.

---

## 💡 Why Vite?
| Feature | Vite | Opening HTML file directly |
|---------|------|---------------------------|
| Hot reload | ✅ Instant | ❌ Manual refresh |
| Build tools | ✅ PostCSS, Tailwind | ❌ None |
| Dev server | ✅ localhost:5173 | ❌ file:// protocol |

---

[Next Task → Utility Classes](./task-02-utility-classes.md)

[← Back to Module 05](../README.md)
