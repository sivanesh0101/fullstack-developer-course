# Task 08 — CSS Animations

## 🎯 Objective

Add smooth transitions, keyframe animations, and transforms to make your ecommerce site feel alive and professional.

---

## The Problem

Your site is functional but feels static and lifeless. Professional sites have subtle motion — buttons that respond to clicks, images that fade in, banners that slide, and loading indicators. Animation makes the difference between "student project" and "professional site."

---

## Instructions

### Step 1: Transitions

```css
/* Smooth color change */
.btn {
    background-color: #ffd814;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: #f0c814;
    transform: scale(1.02);
}

/* Smooth card elevation */
.product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
```

### Step 2: Transform Properties

```css
/* Scale — grow/shrink */
.icon:hover { transform: scale(1.2); }

/* Rotate */
.loading-icon { transform: rotate(45deg); }

/* Translate — move */
.slide-up { transform: translateY(-20px); }

/* Skew */
.ribbon { transform: skewX(-10deg); }

/* Multiple transforms */
.fancy:hover {
    transform: translateY(-4px) scale(1.02);
}
```

### Step 3: Keyframe Animations

```css
/* Fade in animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.product-card {
    animation: fadeIn 0.5s ease forwards;
}

/* Stagger animation for multiple cards */
.product-card:nth-child(1) { animation-delay: 0.1s; }
.product-card:nth-child(2) { animation-delay: 0.2s; }
.product-card:nth-child(3) { animation-delay: 0.3s; }
.product-card:nth-child(4) { animation-delay: 0.4s; }
```

### Step 4: Loading Spinner

```html
<div class="spinner"></div>
```

```css
@keyframes spin {
    to { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #ddd;
    border-top-color: #e77600;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
```

### Step 5: Sliding Hero Banner

```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.hero-content {
    animation: slideIn 0.8s ease-out;
}
```

### Step 6: Pulse Effect for Notifications

```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.cart-count {
    background: #cc0c39;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s ease-in-out infinite;
}
```

### Step 7: Respect User Preferences

```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 💡 What You Just Learned

### Transition vs Animation

| Feature | `transition` | `@keyframes` + `animation` |
|---------|-------------|---------------------------|
| Triggers on | State change (hover, focus) | Page load or class change |
| Steps | Start → End only | Multiple keyframes (0% → 50% → 100%) |
| Repeating | No | Yes (`infinite`) |
| Use case | Hover effects, focus states | Loading spinners, entrance effects |

### Animation Properties

| Property | Values |
|----------|--------|
| `animation-name` | Name of `@keyframes` |
| `animation-duration` | `0.5s`, `300ms` |
| `animation-timing-function` | `ease`, `linear`, `ease-in-out` |
| `animation-delay` | `0.2s` |
| `animation-iteration-count` | `1`, `infinite` |
| `animation-fill-mode` | `forwards`, `backwards`, `both` |
| `animation-direction` | `normal`, `reverse`, `alternate` |

---

## ✅ Expected Output

- Product cards fade in on page load
- Buttons scale and change color smoothly on hover
- A loading spinner rotates continuously
- Cart notification badge pulses
- Hero content slides in from the left
- All animations respect `prefers-reduced-motion`

---

[Previous Task ← Pseudo-classes & Elements](./task-07-pseudo-classes-elements.md)

[← Back to Module 02](../README.md)
