# Task 0: Understanding Ports

> **Goal:** Understand what ports are and how they are used across frontend, backend, and database services before writing server code.

Before we write our first backend server, we need to talk about **ports**. You've probably seen `localhost:3000` when running React or `localhost:5173` when using Vite. But what does that number actually mean?

## The Building Analogy

Think of your computer's IP address (like `127.0.0.1` for `localhost`) as a large apartment building.
- The **IP address** gets you to the building.
- The **port number** gets you to a specific apartment door inside that building.

When you develop a full-stack application, you are running multiple services on the same computer at the same time:
1. A Frontend development server
2. A Backend API server
3. A Database service

If all three services ran on the same "door," your computer wouldn't know which service should handle a specific request. Ports solve this.

---

## Standard Development Ports

By convention, certain tools default to specific ports. While you can change them, it's best to stick to defaults to avoid confusion.

### 🎨 Frontend (Dev Servers)
- **`3000`**: Create React App (Older standard)
- **`5173`**: Vite (Modern standard for React, Vue, Svelte)
- **`4200`**: Angular

### ⚙️ Backend (API Servers) 
- **`3000`, `4000`, `5000`, `8000`, or `8080`**: Common ports for Node.js/Express, Python, and Java backends.
*(Note: If your frontend uses `3000`, you must use a different port like `5000` or `4000` for your backend!)*

### 🗄️ Databases
Databases run as background services on your machine and have very specific default ports:
- **`27017`**: MongoDB (NoSQL)
- **`5432`**: PostgreSQL (SQL)
- **`3306`**: MySQL (SQL)
- **`6379`**: Redis (Cache)

---

## Ports in Production

In a real production environment (like when users visit `yourwebsite.com`), they don't type a port number. The browser defaults to:
- **`80`** for standard HTTP traffic
- **`443`** for secure HTTPS traffic

In later modules, you'll learn how to use a "Reverse Proxy" (like Nginx) which listens on port `80/443` and internally forwards the traffic to your backend running on port `3000` or `5000`.

---

## ✅ Task Checklist
- [ ] I understand why different services need different ports
- [ ] I know the common ports for frontend, backend, and databases
- [ ] I understand that two services cannot share the same port simultaneously

[Next Task: Node Fundamentals →](./task-01-node-fundamentals.md)
