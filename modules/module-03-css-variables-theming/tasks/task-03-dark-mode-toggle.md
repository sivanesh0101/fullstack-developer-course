# Task 03 — Dark Mode Toggle

## 🎯 Objective

Implement a working dark/light mode toggle that respects system preferences and persists across page reloads.

---

## The Problem

The client wants dark mode. Thanks to CSS variables (Task 01), you can change the entire color scheme by swapping variable values. Now you need a way to **toggle** between themes.

---

## Instructions

### Step 1: Define Dark Theme Variables

```css
/* Light theme (default) */
:root {
    --color-bg: #eaeded;
    --color-bg-card: #ffffff;
    --color-text: #0f1111;
    --color-text-secondary: #565959;
    --color-border: #ddd;
    --color-header: #131921;
    --color-nav: #232f3e;
}

/* Dark theme */
[data-theme="dark"] {
    --color-bg: #0f1111;
    --color-bg-card: #1a1a2e;
    --color-text: #e0e0e0;
    --color-text-secondary: #999;
    --color-border: #333;
    --color-header: #0a0a15;
    --color-nav: #16213e;
}
```

### Step 2: Respect System Preferences

```css
/* Auto dark mode based on OS setting */
@media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
        --color-bg: #0f1111;
        --color-bg-card: #1a1a2e;
        --color-text: #e0e0e0;
        --color-text-secondary: #999;
        --color-border: #333;
        --color-header: #0a0a15;
        --color-nav: #16213e;
    }
}
```

### Step 3: Add a Toggle Button

```html
<button
    id="theme-toggle"
    class="theme-toggle"
    aria-label="Toggle dark mode"
    type="button"
>
    🌙
</button>
```

```css
.theme-toggle {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.theme-toggle:hover {
    transform: scale(1.1);
}
```

### Step 4: JavaScript Toggle

Add this at the bottom of your HTML, before `</body>`:

```html
<script>
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved preference or system preference
    function getPreferredTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    // Apply theme
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Initialize
    setTheme(getPreferredTheme());

    // Toggle on click
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
</script>
```

### Step 5: Smooth Theme Transition

```css
/* Add smooth transition when switching themes */
body {
    transition: background-color 0.3s ease, color 0.3s ease;
}

.product-card, header, nav, footer {
    transition: background-color 0.3s ease, color 0.3s ease,
                border-color 0.3s ease;
}
```

---

## 💡 What You Just Learned

| Concept | Why |
|---------|-----|
| `data-theme` attribute | Clean way to switch themes on the root element |
| `prefers-color-scheme` | Respects the user's OS dark mode setting |
| `localStorage` | Persists the preference across page reloads |
| CSS variable overrides | Swapping variables changes the entire site |
| Smooth transitions | Theme change doesn't feel jarring |

---

## ✅ Expected Output

- A toggle button that switches between dark and light mode
- Theme persists when the page is refreshed
- OS dark mode preference is respected on first visit
- Smooth color transition when switching

---

[Previous Task ← Design Tokens](./task-02-design-tokens.md) · [Next Task → Theme System](./task-04-theme-system.md)

[← Back to Module 03](../README.md)
