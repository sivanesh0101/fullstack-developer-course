# Task 05 — React Router

## 🎯 Objective
Add client-side routing for Home, Products, Product Detail, Cart, and Login pages.

---

## Instructions

```bash
npm install react-router-dom
```

```tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
```

### URL Parameters
```tsx
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    // Fetch product by id...
}
```

### Navigation
```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/cart'); // Programmatic navigation
```

---

[Previous Task ← Hooks](./task-04-hooks.md) · [Next Task → Forms & Validation](./task-06-forms-and-validation.md)

[← Back to Module 08](../README.md)
