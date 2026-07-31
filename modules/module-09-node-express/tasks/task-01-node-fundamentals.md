# Task 01 — Node Fundamentals

## 🎯 Objective
Understand Node.js as a server-side JavaScript runtime.

---

## Instructions

### Your First Server
```js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from Node.js!' }));
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

### Core Modules
```js
const fs = require('fs');     // File system
const path = require('path'); // File paths
const os = require('os');     // Operating system info
```

### Node vs Browser JavaScript
| Feature | Browser | Node.js |
|---------|---------|---------|
| DOM | ✅ | ❌ |
| `window` | ✅ | ❌ (`global`) |
| File system | ❌ | ✅ |
| HTTP server | ❌ | ✅ |
| `require` / `import` | `import` | Both |

---

[Next Task → Express Setup](./task-02-express-setup.md)

[← Back to Module 09](../README.md)
