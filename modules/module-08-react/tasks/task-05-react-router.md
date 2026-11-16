# Task 05 — React Router

## 🎯 Objective

Split your working ShopZone interface into Home, Products, Product Detail, Cart, and Login pages without losing cart state during navigation.

**Prerequisites:** Complete Task 04. Keep its hooks, API adapter, components, and shared types.

**Outcome:** Working URLs, product links, active navigation, browser back/forward support, and a 404 page.

---

## 5.1 — From HTML Pages to Client-Side Routes

Your Module 01 navigation loaded separate HTML documents. React Router changes which component is displayed inside the current application. A route is a mapping between a URL path and a page component.

Use `Link` or `NavLink` for internal application navigation. Keep ordinary anchors for external websites and downloads.

Inside `ecommerce-react`, run:

```bash
npm install react-router-dom
```

This course uses the declarative routing APIs exported by `react-router-dom`. See [React Router's routing guide](https://reactrouter.com/start/declarative/routing).

## 5.2 — Create the Simple Pages

Create `src/pages/HomePage.tsx`:

```tsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section>
      <h2>Welcome to ShopZone</h2>
      <p>Your favourite products, now built with React.</p>
      <Link to="/products">Browse products</Link>
    </section>
  );
}
```

Create `src/pages/LoginPage.tsx`:

```tsx
export default function LoginPage() {
  return <h2>Sign in — form coming in Task 06</h2>;
}
```

Create `src/pages/NotFoundPage.tsx`:

```tsx
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <Link to="/">Return home</Link>
    </section>
  );
}
```

## 5.3 — Move the Catalogue into a Page

Create `src/pages/ProductsPage.tsx`. Move the search state, focus effect, and product rendering from App into this page. App will continue fetching products once and passing the results down.

```tsx
import { useEffect, useRef, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import type { Product } from '../types/product';

interface ProductsPageProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductsPage({
  products, loading, error, retry, onAddToCart,
}: ProductsPageProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <h2>Products</h2>
      <label htmlFor="product-search">Search products</label>
      <input
        ref={inputRef}
        id="product-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {loading ? <p role="status">Loading products...</p> : error ? (
        <div role="alert">
          <p>{error}</p>
          <button type="button" onClick={retry}>Try again</button>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
      )}
    </section>
  );
}
```

Search is local to this page and resets when you leave it. Cart state stays above the routes and remains shared.

## 5.4 — Add Product Links and URL Parameters

In `src/components/ProductCard.tsx`, import:

```tsx
import { Link } from 'react-router-dom';
```

Replace its product heading with:

```tsx
<h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
```

Keep its existing image, price, stock message, and Add to Cart button.

Create `src/pages/ProductDetailPage.tsx`:

```tsx
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../types/product';

interface ProductDetailPageProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailPage({
  products, loading, error, retry, onAddToCart,
}: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return <p>Invalid product ID. <Link to="/products">Browse products</Link></p>;
  }
  if (loading) return <p role="status">Loading product...</p>;
  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
        <button type="button" onClick={retry}>Try again</button>
      </div>
    );
  }

  const product = products.find((item) => item.id === productId);
  if (!product) {
    return <p>Product not found. <Link to="/products">Browse products</Link></p>;
  }

  return (
    <article>
      <h2>{product.name}</h2>
      <img className="setup-image" src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button
        type="button"
        disabled={!product.inStock}
        onClick={() => {
          onAddToCart(product);
          navigate('/cart');
        }}
      >
        Add and view cart
      </button>
      <p><Link to="/products">Back to products</Link></p>
    </article>
  );
}
```

`:id` is a dynamic segment. `useParams` reads its string value; convert it before comparing with numeric product IDs. This page reuses the catalogue fetched in App, including on a direct URL visit. It waits for loading before deciding whether a product is missing.

`useNavigate` is called at the top level of the component. The returned function is used inside the click handler. Prefer Link for ordinary navigation; programmatic navigation is useful after an action.

## 5.5 — Create the Cart Page

Create `src/pages/CartPage.tsx`:

```tsx
import CartPanel from '../components/CartPanel';
import type { CartItem } from '../types/product';

interface CartPageProps {
  cart: CartItem[];
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

export default function CartPage(props: CartPageProps) {
  return <CartPanel {...props} />;
}
```

The spread passes the three props through to the existing panel. This extra forwarding is simple now; Task 07 will demonstrate how Context removes it as the tree grows.

## 5.6 — Register Routes and Keep Shared State

Replace `src/App.tsx` with the following. It keeps Task 03's cart actions and Task 04's persistence/API hooks. Remove the old search and focus code from App because it now belongs to ProductsPage.

```tsx
import { useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { useProducts } from './hooks/useProducts';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Product, CartItem } from './types/product';

export default function App() {
  const { products, loading, error, retry } = useProducts();
  const [cart, setCart] = useLocalStorage<CartItem[]>('shopzone-react-cart-v1', []);

  function addToCart(product: Product) {
    if (!product.inStock) return;

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

  function updateQuantity(id: number, quantity: number) {
    if (!Number.isInteger(quantity)) return;
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `ShopZone — ${cartCount} items`;
    return () => { document.title = previousTitle; };
  }, [cartCount]);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} cartTotal={cartTotal} />
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>{' | '}
        <NavLink to="/products">Products</NavLink>{' | '}
        <NavLink to="/cart">Cart</NavLink>{' | '}
        <NavLink to="/login">Login</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={
            <ProductsPage products={products} loading={loading} error={error}
              retry={retry} onAddToCart={addToCart} />
          } />
          <Route path="/products/:id" element={
            <ProductDetailPage products={products} loading={loading} error={error}
              retry={retry} onAddToCart={addToCart} />
          } />
          <Route path="/cart" element={
            <CartPage cart={cart} onRemove={removeFromCart}
              onQuantityChange={updateQuantity} />
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```

Keep `main.tsx` as it was in Task 01. Mount exactly one BrowserRouter. Components using router hooks or links must be inside it.

NavLink supplies an `active` class and `aria-current` for the current page. `end` prevents Home from matching every path. Append to `src/index.css`:

```css
nav a.active {
  font-weight: 700;
  text-decoration: underline;
}
```

App remains mounted while pages switch, so its cart state survives internal navigation. Refresh restores the cart through the existing storage hook. Route components can unmount, so local state such as search text resets.

## 5.7 — Practice and Success Checkpoint

- [ ] Home, Products, Cart, and Login navigation works and the active link changes.
- [ ] Product names link to the correct detail page.
- [ ] Add and view cart adds the selected product and opens `/cart`.
- [ ] Quantity controls and Header totals still work across navigation and refresh.
- [ ] Browser back and forward work.
- [ ] Opening a valid `/products/1` directly loads its details after fetching.
- [ ] `/products/abc` shows an invalid-ID message; an absent numeric ID shows product not found.
- [ ] `/missing-page` shows the 404 page.
- [ ] API failure displays retry rather than incorrectly claiming the product is missing.
- [ ] `npm run build` succeeds.

**Practice:** Add an About page and navigation link. Explain why search resets when leaving Products while cart remains.

**Knowledge check:** What does BrowserRouter do? How do Link and NavLink differ? What does `:id` represent? Why is cart state above the routes?

## Common Problems

| Problem | Check |
|---|---|
| Router-context error | Put links and router hooks inside BrowserRouter. |
| Nested-router error | Keep one BrowserRouter; do not add another in main or a page. |
| Cart resets on navigation | Keep its state in App and navigate internally with Link/NavLink. |
| Detail always reports missing | Convert the parameter to a number and wait for loading to finish. |
| Direct URL works locally but fails after deployment | Configure the host to serve `index.html` for application routes; deployment is covered later. |

---

[Previous Task ← Hooks](./task-04-hooks.md) · [Next Task → Forms & Validation](./task-06-forms-and-validation.md)

[← Back to Module 08](../README.md)
