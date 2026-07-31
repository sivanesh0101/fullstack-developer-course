# Task 02 — Components & JSX

## 🎯 Objective
Build reusable React components for the ecommerce site — ProductCard, Header, Footer.

---

## Instructions

### ProductCard Component
```tsx
interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    onAddToCart: (id: number) => void;
}

function ProductCard({ id, name, price, image, rating, onAddToCart }: ProductCardProps) {
    return (
        <article className="product-card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p className="price">${price.toFixed(2)}</p>
            <p className="rating">{"⭐".repeat(Math.round(rating))}</p>
            <button onClick={() => onAddToCart(id)}>Add to Cart</button>
        </article>
    );
}

export default ProductCard;
```

### Key JSX Rules
- Use `className` instead of `class`
- Use `{}` for JavaScript expressions
- Components must return a single root element (use `<>...</>` fragments)
- Self-closing tags: `<img />`, `<input />`

---

[Previous Task ← Setup](./task-01-react-setup-vite.md) · [Next Task → Props & State](./task-03-props-and-state.md)

[← Back to Module 08](../README.md)
