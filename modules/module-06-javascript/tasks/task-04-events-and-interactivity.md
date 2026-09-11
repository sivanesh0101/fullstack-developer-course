# Task 04 — Events & Interactivity

## 🎯 Objective
Handle user interactions — clicks, form submissions, keyboard input — using event listeners and delegation.

---

## ⚡ Common DOM Events & When They Are Used

Browsers provide **many dozens of standard DOM events**, grouped by purpose. Below are the most commonly used event types along with real-world scenarios of when to use them:

| Category | Event | When It's Used |
| :--- | :--- | :--- |
| **Mouse** | `click` | User clicks an element (button clicks, navigating links, opening modals). |
| | `dblclick` | User double-clicks an element (editing inline text, zooming in/out). |
| | `mousedown` / `mouseup` | Mouse button pressed down or released (drawing canvases, custom drag-and-drop). |
| | `mousemove` | Cursor moves over an element (tooltips, tracking cursor position). |
| | `mouseenter` / `mouseleave` | Cursor enters or leaves an element without bubbling (hover states, dropdown menus). |
| **Keyboard** | `keydown` | Key is pressed down (keyboard shortcuts like `Escape` to close modals, game controls). |
| | `keyup` | Key is released (triggering action after user finishes pressing a key). |
| **Form** | `submit` | Form is submitted (intercepting submit to prevent page reload with `e.preventDefault()`). |
| | `input` | Value changes instantly in `<input>` or `<textarea>` (real-time search, live preview, char counter). |
| | `change` | Value changes and field loses focus, or dropdown select choice changes. |
| | `focus` / `blur` | Field gains or loses focus (highlighting active input, validating email on blur). |
| | `reset` | Form is reset (clearing custom error messages or restoring defaults). |
| **Clipboard** | `copy` / `cut` / `paste` | Copying, cutting, or pasting text (auto-formatting OTP/credit card inputs on paste). |
| **Drag & Drop** | `dragstart` / `dragover` / `drop` | Dragging elements on screen (Kanban boards like Trello, file upload dropzones). |
| **Touch** | `touchstart` / `touchmove` / `touchend` | Mobile screen finger touches & swipes (mobile swipe carousels, touch gestures). |
| **Pointer** | `pointerdown` / `pointermove` | Unified events for Mouse + Touch + Stylus (cross-device interactive widgets & drawing apps). |
| **Window** | `DOMContentLoaded` / `load` | HTML parsed or entire page with images fully loaded (initializing JS scripts safely). |
| | `resize` | Window dimensions change (recalculating responsive layouts or canvas size). |
| | `scroll` | Page or element is scrolled (infinite scrolling, sticky navbar, scroll animations). |
| | `beforeunload` | User leaves or refreshes page (showing "Unsaved changes will be lost" prompt). |
| **Media** | `play` / `pause` / `ended` | Audio or video playback state changes (custom media player controls, auto-playing next track). |
| | `volumechange` | Volume or mute state changes (syncing custom volume slider UI). |

There are **well over 100 standardized event types** when you include specialized events.

---

## Instructions

### Click Events
```js
document.querySelector('.btn-add-cart').addEventListener('click', (e) => {
    const productId = e.target.dataset.id;
    addToCart(productId);
});
```

### Event Delegation (for dynamic elements)
```js
// Instead of adding listeners to each button,
// add ONE listener to the parent
document.querySelector('.product-grid').addEventListener('click', (e) => {
    if (e.target.matches('.btn-add-cart')) {
        const productId = e.target.dataset.id;
        addToCart(productId);
    }
});
```

### Form Events
```js
document.querySelector('.search-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload
    const query = e.target.querySelector('input').value;
    searchProducts(query);
});
```

### Input Events (Real-time search)
```js
document.querySelector('#search-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
});
```

### Keyboard Events
```js
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
```

---

## 💡 Why Event Delegation?
If you dynamically create 100 product cards (Task 03), adding 100 listeners is wasteful. Event delegation uses **one** listener on the parent — events bubble up from child to parent.

---

[Previous Task ← DOM Manipulation](./task-03-dom-manipulation.md) · [Next Task → Arrays & Objects](./task-05-arrays-and-objects.md)

[← Back to Module 06](../README.md)
