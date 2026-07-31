# Task 08 — TSX Typing

## 🎯 Objective
Type React components properly with TypeScript — props, events, children, and generics.

---

## Instructions

### Typed Props
```tsx
interface ButtonProps {
    variant: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

function Button({ variant, size = 'md', children, onClick, disabled }: ButtonProps) {
    return (
        <button className={`btn btn-${variant} btn-${size}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
```

### Typed Events
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // ...
};
```

---

[Previous Task ← Context API](./task-07-context-api.md) · [Next Task → TanStack Query](./task-09-tanstack-query.md)

[← Back to Module 08](../README.md)
