# Task 02 — GitHub Actions CI

## 🎯 Objective

Set up a CI/CD pipeline that automatically runs tests and builds on every push and pull request.

---

## Instructions

### CI Pipeline for Backend

Create `.github/workflows/backend-ci.yml`:

```yaml
name: Backend CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        working-directory: ./backend

      - name: Run linting
        run: npm run lint
        working-directory: ./backend

      - name: Run tests
        run: npm test -- --coverage
        working-directory: ./backend
        env:
          NODE_ENV: test
          MONGODB_URI: mongodb://localhost:27017/shopzone-test
          JWT_SECRET: test-secret-key

      - name: Upload coverage report
        uses: codecov/codecov-action@v4
        with:
          directory: ./backend/coverage
```

### CI Pipeline for Frontend

Create `.github/workflows/frontend-ci.yml`:

```yaml
name: Frontend CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: ./frontend

      - name: Run type check
        run: npm run type-check
        working-directory: ./frontend

      - name: Run tests
        run: npm run test -- --run
        working-directory: ./frontend

      - name: Build production bundle
        run: npm run build
        working-directory: ./frontend
        env:
          VITE_API_URL: https://api.shopzone.com/api
```

### CD Pipeline — Auto Deploy to Railway

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: [test-backend, build-frontend]  # Only deploy if tests pass

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: shopzone-api
```

### Add Secrets to GitHub

**Repository Settings → Secrets → Actions**:

```
RAILWAY_TOKEN     = your-railway-token
CODECOV_TOKEN     = your-codecov-token
```

### Status Badges

Add to your `README.md`:

```markdown
![Backend CI](https://github.com/yourusername/shopzone/actions/workflows/backend-ci.yml/badge.svg)
![Frontend CI](https://github.com/yourusername/shopzone/actions/workflows/frontend-ci.yml/badge.svg)
```

---

## 💡 CI/CD Flow

```
Developer pushes code
        ↓
GitHub Actions triggers
        ↓
  ┌─────────────────────┐
  │  Install deps        │
  │  Run linter          │
  │  Run tests           │
  │  Build               │
  └─────────────────────┘
        ↓
All green? ✅
        ↓
Auto-deploy to production 🚀
```

---

[Previous Task ← Git Workflows](./task-01-git-workflows.md) · [Next Task → Docker](./task-03-docker.md)

[← Back to Module 15](../README.md)
