# Module 11 — Authentication

## 🎯 Securing the Application

**Week 11** · Advanced · 5 Tasks

---

## The Pain Point

> `if(username === "admin")` — "Is this really how authentication works?"

Your ecommerce site lets anyone access everything. There's no login, no user accounts, no security. Real applications need **authentication** (who are you?) and **authorization** (what can you do?).

---

## Tasks

| # | Task | What You Learn |
|---|------|---------------|
| 1 | [Password Hashing](./tasks/task-01-password-hashing.md) | bcrypt, salt rounds, why plain text is dangerous |
| 2 | [JWT Authentication](./tasks/task-02-jwt-auth.md) | Token creation, verification, middleware |
| 3 | [Refresh Tokens](./tasks/task-03-refresh-tokens.md) | Token rotation, secure storage, expiration |
| 4 | [Roles & Permissions](./tasks/task-04-roles-and-permissions.md) | Admin vs user, route protection, authorization |
| 5 | [Session Management](./tasks/task-05-session-management.md) | Cookies, HTTP-only, secure flags, CSRF |

---

## Prerequisites
- Completed [Module 10 — MongoDB](../module-10-mongodb/)

## Next Module
Basic ecommerce works. Real sites need uploads, emails, and payments.

[Module 12 — Advanced Features →](../module-12-advanced-features/)

---

[← Back to Module Index](../README.md) · [← Back to Course Home](../../README.md)
