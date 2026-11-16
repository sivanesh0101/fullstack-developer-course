# Task 07 — React Context API

## 🎯 Objective
Understand prop drilling, share values between components with React Context, and build a theme switcher and shopping cart using TypeScript.

**Level:** Beginner → Intermediate  
**Prerequisites:** React components, props, `useState`, event handlers, basic TypeScript, React Router  
**Suggested duration:** Four 90-minute sessions

> **Teaching principle:** Start with a problem students already know (passing props). Introduce Context as a solution, then gradually build toward a cart. Context **shares** values; `useState` **stores and updates** state.

---

## 7.1 — The Problem: Prop Drilling

```tsx
function Profile({ username }: { username: string }) {
  return <h2>Welcome, {username}</h2>;
}

function Dashboard({ username }: { username: string }) {
  return <Profile username={username} />;
}

export default function App() {
  return <Dashboard username="Siva" />;
}
```

`Dashboard` does not use `username`; it only passes it down. This is **prop drilling**. Passing props is not wrong, but repeating it through many intermediate components can be inconvenient.

```text
App → Dashboard → Profile
       (passes username)
```

**Ask:** What happens if five more components sit between `App` and `Profile`?

## 7.2 — What Is Context?

Context lets a component read a value from the closest matching provider above it in the React tree, without passing that value through every intermediate component.

| Concept | Meaning |
|---|---|
| `createContext()` | Creates a context object with a fallback default |
| Provider | Supplies a context value to descendant components |
| `useContext()` | Reads the nearest provider's value |

> We use the classic `<SomeContext.Provider>` syntax here so the examples work in React 18 and React 19.

## 7.3 — First Example: Share a Username

Create `src/UserExample.tsx`:

```tsx
import { createContext, useContext } from 'react';

const UserContext = createContext('Guest');

function Profile() {
  const username = useContext(UserContext);
  return <h2>Welcome, {username}</h2>;
}

function Dashboard() {
  return <Profile />; // No username prop required
}

export default function UserExample() {
  return (
    <UserContext.Provider value="Siva">
      <Dashboard />
    </UserContext.Provider>
  );
}
```

**Try it:** Remove the provider. The heading becomes `Welcome, Guest` because `createContext('Guest')` defines the fallback value.

**Check understanding:** Does Context send values to parents or to descendants? **Descendants.**

## 7.4 — Add Changing State: Theme Switcher

Now combine `useState` (changes data) and Context (shares data).

Create `src/context/ThemeContext.tsx`:

```tsx
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
```

Create `src/ThemeDemo.tsx`:

```tsx
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ThemeButton() {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Switch theme</button>;
}

function ThemePreview() {
  const { theme } = useTheme();
  return (
    <section style={{
      background: theme === 'dark' ? '#222' : '#fff',
      color: theme === 'dark' ? '#fff' : '#222',
      padding: 24,
    }}>
      Current theme: {theme}
    </section>
  );
}

export default function ThemeDemo() {
  return (
    <ThemeProvider>
      <ThemeButton />
      <ThemePreview />
    </ThemeProvider>
  );
}
```

### Explain the new syntax

- `ReactNode`: the type of renderable React content passed as `children`.
- `Theme`: a union type; only `'light'` or `'dark'` is allowed.
- `ThemeContextValue`: the shape of the shared context value.
- `createContext<ThemeContextValue | null>(null)`: sets the initial fallback to `null` and describes the value type.
- `useTheme()`: a **custom hook** that keeps context-reading and missing-provider checks in one place.
- `setTheme(current => ...)`: updates state based on the previous value.

**Exercise:** Change the button label to `Enable dark mode` / `Enable light mode` depending on the current theme.

## 7.5 — Build a Shopping Cart Context

### Step A: Define the types

Create `src/context/CartContext.tsx`:

```tsx
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
```

**Explain:** `CartItem` contains all `Product` fields plus `quantity`. `CartItem[]` means an array of cart items. `(product: Product) => void` means a function accepts a product and returns no useful value.

### Step B: Add the provider and custom hook

Append this code **to the same file**:

```tsx
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
```

### Step C: Understand the array methods

| Code | What it does |
|---|---|
| `find()` | Looks for an existing product in the cart |
| `map()` | Creates an updated array, increasing the matching item's quantity |
| `filter()` | Creates an array without the removed product |
| `reduce()` | Calculates totals across all cart items |
| `...product` | Copies the product's properties into a new object |
| `...currentCart` | Copies existing items into a new array |

**Worked example:** Two T-shirts priced ₹500 each and one cap priced ₹200 produce `cartCount = 3` and `cartTotal = ₹1,200`.

> **Why avoid direct mutation?** React state should be updated with new arrays/objects instead of editing the existing cart array directly.

## 7.6 — Use the Cart Across Components

Create `src/CartDemo.tsx`:

```tsx
import { CartProvider, useCart, type Product } from './context/CartContext';

const products: Product[] = [
  { id: 1, name: 'T-shirt', price: 500 },
  { id: 2, name: 'Cap', price: 200 },
];

function ProductList() {
  const { addToCart } = useCart();

  return (
    <section>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} — ₹{product.price}{' '}
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      ))}
    </section>
  );
}

function CartSummary() {
  const { cart, cartCount, cartTotal, removeFromCart } = useCart();

  return (
    <section>
      <h2>Cart ({cartCount})</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} × {item.quantity} — ₹{item.price * item.quantity}{' '}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <strong>Total: ₹{cartTotal}</strong>
    </section>
  );
}

export default function CartDemo() {
  return (
    <CartProvider>
      <ProductList />
      <CartSummary />
    </CartProvider>
  );
}
```

**Try it:** Add the same product twice. Its quantity should increase instead of creating a second cart row. Removing it removes the whole row.

## 7.7 — Connect Cart Context with React Router

Students already know routing. Extend the cart so it works across two pages.

```text
App
└── CartProvider
    └── BrowserRouter
        ├── /products → ProductList
        └── /cart     → CartSummary
```

Move `ProductList` and `CartSummary` into separate exported components, then register them as routes. **Keep the provider above both routes** so the cart remains shared while navigating.

Example `src/App.tsx` after exporting those components:

```tsx
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductList } from './pages/ProductList';
import { CartSummary } from './pages/CartSummary';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <nav>
          <Link to="/products">Products</Link>{' | '}
          <Link to="/cart">Cart</Link>
        </nav>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartSummary />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
```

> This routing example assumes `react-router-dom` is installed from Task 05. Create the two page files by moving the earlier component implementations and changing `function` to `export function`.

**Important:** Context state is kept while the provider remains mounted. A full browser refresh resets this in-memory cart. Persistence with `localStorage` can be a follow-up lesson.

## 7.8 — When Should You Use Context?

**Good candidates:** theme, language, authenticated-user display information, and cart data used by many distant components.

**Not every state belongs in Context.** Keep input text or a modal's open/closed state local if only one component needs it. Context is not a replacement for all props, and it does not automatically save data or fetch data from a server.

## 7.9 — Student Exercises

### Exercise 1 — Username Context (Easy, 15–20 min)

- Create `UserContext` with a default value of `Guest`.
- Wrap a nested `Profile` component in a provider.
- Display the username without passing it through an intermediate component.

### Exercise 2 — Theme Switcher (Medium, 25–35 min)

- Implement `ThemeProvider` and `useTheme`.
- Toggle light/dark theme from a navbar button.
- Update a separate page's background and text colors.

### Exercise 3 — Shopping Cart (Challenge, 45–60 min)

- Show at least three products.
- Add the same product multiple times and increase quantity.
- Remove products.
- Display cart count and total price.
- Create `/products` and `/cart` routes sharing one provider.
- **Bonus:** Add decrease-quantity and clear-cart actions.

## 7.10 — Knowledge Check

1. What is prop drilling?
2. How is `useContext()` different from `useState()`?
3. What does a provider do?
4. What happens when a component reads a context without a provider?
5. Why does our custom `useCart()` hook throw an error when the provider is missing?
6. Why do we use `map()` instead of modifying an existing cart item directly?
7. What do `cartCount` and `cartTotal` represent?
8. Will the cart survive a full browser refresh? Why or why not?

## 7.11 — Teaching Plan

| Session | Topics | Time |
|---|---|---|
| Day 1 | Props recap, prop drilling, first Context example | 90 min |
| Day 2 | Context + state, theme provider, custom hook | 90 min |
| Day 3 | TypeScript types, cart provider, array methods | 90 min |
| Day 4 | Router integration, cart project, review | 90 min |

## ✅ Completion Checklist

- [ ] I can explain prop drilling in my own words.
- [ ] I can create a context and provide a value.
- [ ] I can read context with `useContext()`.
- [ ] I understand the difference between Context and `useState()`.
- [ ] I can create a reusable custom context hook.
- [ ] I can type context values with TypeScript.
- [ ] I can build a working cart with add, remove, count, and total.
- [ ] I can share cart state between React Router pages.

---

**Official references:** [React — Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context) · [React — useContext](https://react.dev/reference/react/useContext)

[Previous Task ← Forms & Validation](./task-06-forms-and-validation.md) · [Next Task → TSX Typing](./task-08-tsx-typing.md)

[← Back to Module 08](../README.md)
