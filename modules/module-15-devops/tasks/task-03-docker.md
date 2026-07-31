# Task 03 — Docker

## 🎯 Objective

Containerize the ecommerce application with Docker so it runs consistently anywhere.

---

## The Problem

> "It works on my machine."

Different developers have different Node versions, OS configurations, and environment setups. Docker packages your app with everything it needs — the right Node version, dependencies, environment — into a **container** that runs identically everywhere.

---

## Instructions

### Backend Dockerfile

```dockerfile
# backend/Dockerfile

# Base image — Node.js 20 slim (smaller image)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (for layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001
USER nodeuser

# Document which port the app uses
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "server.js"]
```

### Frontend Dockerfile (Multi-stage)

```dockerfile
# frontend/Dockerfile

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Stage 2: Serve with Nginx (tiny image)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# frontend/nginx.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # React Router support
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### docker-compose.yml

```yaml
# docker-compose.yml (project root)
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      args:
        - VITE_API_URL=http://localhost:3000/api
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  mongodb:
    image: mongo:6.0
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=shopzone
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  mongo_data:
```

### Running with Docker

```bash
# Build and start all services
docker compose up --build

# Run in background
docker compose up -d

# View logs
docker compose logs -f backend

# Stop everything
docker compose down

# Stop and remove volumes
docker compose down -v
```

### .dockerignore

```
node_modules
.env
*.log
dist
.git
```

---

## 💡 Why Docker?

| Benefit | Explanation |
|---------|------------|
| Consistency | Same behavior on every machine |
| Isolation | Each service in its own container |
| Scalability | Spin up more containers with one command |
| CI/CD | Build once, run anywhere |

---

[Previous Task ← GitHub Actions CI](./task-02-github-actions-ci.md) · [Next Task → Environment Management](./task-04-environment-management.md)

[← Back to Module 15](../README.md)
