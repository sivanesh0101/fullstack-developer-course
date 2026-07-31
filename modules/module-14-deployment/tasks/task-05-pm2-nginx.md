# Task 05 — PM2 & Nginx

## 🎯 Objective

Use PM2 for Node.js process management and Nginx as a reverse proxy on a VPS.

---

## When You Need This

Railway and Render manage everything automatically. You only need PM2 + Nginx if you're deploying to a **VPS (Virtual Private Server)** like AWS EC2, DigitalOcean Droplet, or Hetzner.

---

## Instructions

### PM2 — Process Manager

```bash
# Install globally
npm install -g pm2

# Start your app
pm2 start server.js --name "shopzone-api"

# Start with Ecosystem file (recommended)
pm2 start ecosystem.config.js
```

### PM2 Ecosystem File

```js
// ecosystem.config.js
module.exports = {
    apps: [{
        name: 'shopzone-api',
        script: 'server.js',
        instances: 'max',        // Use all CPU cores
        exec_mode: 'cluster',    // Load balance across instances
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        watch: false,
        max_memory_restart: '500M',
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        error_file: './logs/pm2-error.log',
        out_file: './logs/pm2-out.log'
    }]
};
```

```bash
pm2 start ecosystem.config.js --env production
pm2 status             # View running apps
pm2 logs               # View logs
pm2 restart shopzone-api
pm2 startup            # Run on server reboot
pm2 save               # Save current process list
```

### Nginx — Reverse Proxy

```bash
# On Ubuntu/Debian server
sudo apt install nginx
sudo nano /etc/nginx/sites-available/shopzone
```

```nginx
# /etc/nginx/sites-available/shopzone
server {
    listen 80;
    server_name api.shopzone.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/shopzone /etc/nginx/sites-enabled/
sudo nginx -t              # Test configuration
sudo systemctl reload nginx

# SSL with Certbot (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.shopzone.com
```

### Architecture on a VPS

```
Internet
    ↓ :443 HTTPS
Nginx (Reverse Proxy)
    ↓ :3000 HTTP
PM2 (Process 1)  PM2 (Process 2)  ...PM2 (Process N)
    ↓ All connect to:
MongoDB Atlas (Cloud)
```

---

[Previous Task ← Domain & HTTPS](./task-04-domain-and-https.md)

[← Back to Module 14](../README.md)
