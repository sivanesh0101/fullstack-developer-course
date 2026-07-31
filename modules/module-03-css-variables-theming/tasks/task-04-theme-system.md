# Task 04 — Theme System

## 🎯 Objective

Build a multi-theme system and briefly compare CSS variables with Sass for maintainability.

---

## The Problem

Dark mode works. But what if the client wants a "Festive Red" theme for Diwali or a "Summer Blue" theme? You need a **system** for managing multiple themes.

---

## Instructions

### Step 1: Multiple Theme Definitions

```css
/* Default / Light */
:root, [data-theme="light"] {
    --color-bg: #eaeded;
    --color-bg-card: #ffffff;
    --color-text: #0f1111;
    --color-primary: #131921;
    --color-accent: #febd69;
    --color-cta: #ffd814;
}

/* Dark */
[data-theme="dark"] {
    --color-bg: #0f1111;
    --color-bg-card: #1a1a2e;
    --color-text: #e0e0e0;
    --color-primary: #0a0a15;
    --color-accent: #febd69;
    --color-cta: #ffd814;
}

/* Festive Red */
[data-theme="festive"] {
    --color-bg: #fff5f5;
    --color-bg-card: #ffffff;
    --color-text: #1a1a1a;
    --color-primary: #9b1b30;
    --color-accent: #d4a574;
    --color-cta: #cc0c39;
}

/* Ocean Blue */
[data-theme="ocean"] {
    --color-bg: #f0f7ff;
    --color-bg-card: #ffffff;
    --color-text: #1a1a2e;
    --color-primary: #1e3a5f;
    --color-accent: #4da8da;
    --color-cta: #2563eb;
}
```

### Step 2: Theme Selector UI

```html
<div class="theme-selector">
    <span>Theme:</span>
    <button data-set-theme="light" aria-label="Light theme">☀️</button>
    <button data-set-theme="dark" aria-label="Dark theme">🌙</button>
    <button data-set-theme="festive" aria-label="Festive theme">🎉</button>
    <button data-set-theme="ocean" aria-label="Ocean theme">🌊</button>
</div>
```

```js
document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-set-theme');
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});
```

### Step 3: Brief Sass Comparison

Sass can do similar things but at **build time**:

```scss
// Sass variables (static — can't change at runtime)
$primary: #131921;
$accent: #febd69;

.header {
    background: $primary;  // Compiled to: background: #131921;
}

// Sass nesting (convenience)
.product-card {
    padding: 16px;

    &:hover {
        transform: translateY(-4px);
    }

    .product-title {
        font-weight: 600;
    }
}

// Sass mixins (reusable patterns)
@mixin responsive($breakpoint) {
    @media (min-width: $breakpoint) {
        @content;
    }
}

.grid {
    grid-template-columns: 1fr;

    @include responsive(768px) {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

### CSS Variables vs Sass

| Feature | CSS Variables | Sass Variables |
|---------|-------------|---------------|
| Runtime changes | ✅ Yes | ❌ No (compiled) |
| Dark mode toggle | ✅ Easy | ❌ Requires separate CSS files |
| Nesting | ✅ Native (modern CSS) | ✅ Yes |
| Mixins | ❌ No | ✅ Yes |
| Build step needed | ❌ No | ✅ Yes |
| Browser support | ✅ All modern | ✅ Compiles to regular CSS |

**Verdict:** Use CSS variables for theming (runtime). Sass can complement for nesting and mixins during development.

---

## 💡 What You Just Learned

| Concept | Purpose |
|---------|---------|
| Multi-theme system | Support unlimited color themes with CSS variables |
| `data-theme` attribute | Clean, scalable approach to theme switching |
| Sass basics | Preprocessing for developer convenience |
| CSS vs Sass variables | CSS = runtime, Sass = build-time |

---

## ✅ Expected Output

- Four working themes: Light, Dark, Festive, Ocean
- Theme selector with visual buttons
- Theme persists across page reloads
- Understanding of when to use CSS variables vs Sass

---

[Previous Task ← Dark Mode Toggle](./task-03-dark-mode-toggle.md)

[← Back to Module 03](../README.md)
