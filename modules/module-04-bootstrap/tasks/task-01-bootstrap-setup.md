# Task 01 — Bootstrap Setup

## 🎯 Objective
Set up Bootstrap in your project using CDN and understand the Bootstrap file structure.

---

## Instructions

### Option A: CDN (Quick Start)

Add these to your `<head>`:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

Add before `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Option B: npm (For later modules)
```bash
npm install bootstrap
```

### Test It

```html
<div class="container mt-5">
    <h1 class="text-primary">Bootstrap is working!</h1>
    <button class="btn btn-warning">Click Me</button>
</div>
```

If you see a styled heading and a yellow button, Bootstrap is ready.

---

## 💡 Key Concepts

| Class | What It Does |
|-------|-------------|
| `container` | Centered, responsive wrapper with max-width |
| `mt-5` | Margin-top level 5 (3rem) |
| `text-primary` | Bootstrap's primary blue color |
| `btn btn-warning` | Styled button with warning (yellow) color |

---

[Next Task → Grid System](./task-02-grid-system.md)

[← Back to Module 04](../README.md)
