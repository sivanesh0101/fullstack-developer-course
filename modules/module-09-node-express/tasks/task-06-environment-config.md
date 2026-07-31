# Task 06 — Environment Config

## 🎯 Objective
Manage secrets and configuration with environment variables.

---

## Instructions

```bash
npm install dotenv
```

### .env file (NEVER commit this)
```
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shopzone
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### .env.example (commit this — template for other developers)
```
PORT=3000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### .gitignore
```
node_modules/
.env
```

### Usage
```js
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set!');
    process.exit(1);
}
```

---

[Previous Task ← Error Handling](./task-05-error-handling.md)

[← Back to Module 09](../README.md)
