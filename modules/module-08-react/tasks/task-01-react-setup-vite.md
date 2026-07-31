# Task 01 — React Setup with Vite

## 🎯 Objective
Set up a React + TypeScript project using Vite.

---

## Instructions

```bash
npm create vite@latest ecommerce-react -- --template react-ts
cd ecommerce-react
npm install
npm run dev
```

### Project Structure
```
ecommerce-react/
├── src/
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Helper functions
│   └── context/         # React contexts
├── public/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### First Component
```tsx
function App() {
    return (
        <div>
            <h1>ShopZone</h1>
            <p>React is working! 🎉</p>
        </div>
    );
}

export default App;
```

---

[Next Task → Components & JSX](./task-02-components-and-jsx.md)

[← Back to Module 08](../README.md)
