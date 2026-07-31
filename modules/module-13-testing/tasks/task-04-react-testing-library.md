# Task 04 — React Testing Library

## 🎯 Objective

Test React components by simulating real user behavior — clicks, typing, and navigation.

---

## Instructions

### Install

```bash
npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom vitest jsdom
```

### Vite Config for Testing

```js
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
    }
});
```

```ts
// src/tests/setup.ts
import '@testing-library/jest-dom';
```

### Test: ProductCard Component

```tsx
// src/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../ProductCard';

const mockProduct = {
    id: 1,
    name: 'Wireless Headphones',
    price: 49.99,
    image: '/headphones.jpg',
    rating: 4.5,
    inStock: true,
};

describe('ProductCard', () => {
    test('renders product name and price', () => {
        const mockAddToCart = vi.fn();
        render(<ProductCard {...mockProduct} onAddToCart={mockAddToCart} />);

        expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
        expect(screen.getByText('$49.99')).toBeInTheDocument();
    });

    test('calls onAddToCart when button clicked', async () => {
        const mockAddToCart = vi.fn();
        const user = userEvent.setup();
        render(<ProductCard {...mockProduct} onAddToCart={mockAddToCart} />);

        await user.click(screen.getByRole('button', { name: /add to cart/i }));
        expect(mockAddToCart).toHaveBeenCalledWith(1);
        expect(mockAddToCart).toHaveBeenCalledTimes(1);
    });

    test('shows out-of-stock message when not in stock', () => {
        const mockAddToCart = vi.fn();
        render(<ProductCard {...mockProduct} inStock={false} onAddToCart={mockAddToCart} />);

        expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled();
    });
});
```

### Test: Search Input Component

```tsx
// src/components/SearchBar.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
    test('calls onSearch with typed query', async () => {
        const mockSearch = vi.fn();
        const user = userEvent.setup();
        render(<SearchBar onSearch={mockSearch} />);

        const input = screen.getByRole('searchbox');
        await user.type(input, 'headphones');

        expect(mockSearch).toHaveBeenLastCalledWith('headphones');
    });

    test('clears search on clear button click', async () => {
        const mockSearch = vi.fn();
        const user = userEvent.setup();
        render(<SearchBar onSearch={mockSearch} />);

        const input = screen.getByRole('searchbox');
        await user.type(input, 'shoes');
        await user.click(screen.getByRole('button', { name: /clear/i }));

        expect(input).toHaveValue('');
        expect(mockSearch).toHaveBeenLastCalledWith('');
    });
});
```

### Test: Async Data Loading

```tsx
// src/pages/ProductsPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProductsPage from '../ProductsPage';

// Mock the API call
vi.mock('../api/products', () => ({
    fetchProducts: vi.fn().mockResolvedValue([
        { id: 1, name: 'Headphones', price: 49.99, inStock: true, rating: 4 },
    ]),
}));

describe('ProductsPage', () => {
    test('shows loading state initially', () => {
        render(<ProductsPage />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders products after loading', async () => {
        render(<ProductsPage />);
        await waitFor(() => {
            expect(screen.getByText('Headphones')).toBeInTheDocument();
        });
    });
});
```

### Run Tests

```bash
npx vitest           # Interactive watch mode
npx vitest run       # Run once
npx vitest --coverage  # With coverage
```

---

## 💡 Key Principles

> Test the **behavior**, not the implementation.

| ❌ Don't test | ✅ Do test |
|-------------|-----------|
| Component internal state | What the user sees |
| Specific CSS classes | Element roles and text |
| Function names | User interactions and outcomes |

| Query | When to Use |
|-------|------------|
| `getByText` | Visible text content |
| `getByRole` | Accessible roles (button, textbox, heading) |
| `getByLabelText` | Form inputs with labels |
| `queryByText` | Check element does NOT exist (returns null) |
| `findByText` | Async — waits for element to appear |

---

[Previous Task ← Supertest API Tests](./task-03-supertest-api.md)

[← Back to Module 13](../README.md)
