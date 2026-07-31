# 🧰 Technology Stack

Every technology used in this course, when it's introduced, and why.

---

## Frontend

| Technology | Introduced In | Why It's Included |
|-----------|--------------|-------------------|
| **HTML5** | Module 01 | The foundation of every web page — structure and content |
| **CSS3** | Module 02 | Visual design — layout, colors, typography, animations |
| **CSS Variables** | Module 03 | Dynamic theming and dark mode without JavaScript |
| **Sass** | Module 03 | Preprocessing — nesting, mixins, and maintainability (brief coverage) |
| **Bootstrap 5** | Module 04 | Rapid UI development with pre-built, reusable components |
| **Tailwind CSS** | Module 05 | Utility-first CSS for fully custom designs |
| **Vite** | Module 05 | Modern build tool — fast dev server, HMR, bundling |
| **JavaScript (ES6+)** | Module 06 | Interactivity — DOM manipulation, events, async operations |
| **TypeScript** | Module 07 | Type safety — catching bugs before they happen |
| **React 18** | Module 08 | Component-based UI — reusable, declarative, efficient |
| **React Router v6** | Module 08 | Client-side routing for single-page applications |
| **Axios** | Module 08 | HTTP client with interceptors and better error handling |
| **TanStack Query** | Module 08 | Server state management — caching, refetching, sync |
| **React Hook Form** | Module 08 | Performant form handling with minimal re-renders |
| **Zod** | Module 08 | Schema-based validation for forms and API data |

---

## Backend

| Technology | Introduced In | Why It's Included |
|-----------|--------------|-------------------|
| **Node.js** | Module 09 | Server-side JavaScript — same language, full stack |
| **Express.js** | Module 09 | Minimal, flexible HTTP framework for REST APIs |
| **JWT** | Module 11 | Stateless authentication tokens |
| **bcrypt** | Module 11 | Password hashing — never store passwords in plain text |
| **Multer** | Module 12 | File upload handling for product images |
| **Cloudinary** | Module 12 | Cloud-based image storage and transformation |
| **Nodemailer** | Module 12 | Sending emails — order confirmations, password resets |
| **Stripe / Razorpay** | Module 12 | Payment processing — real checkout flows |
| **dotenv** | Module 09 | Environment variable management |
| **Winston / Morgan** | Module 12 | Logging — request logs, error tracking |

---

## Database

| Technology | Introduced In | Why It's Included |
|-----------|--------------|-------------------|
| **MongoDB** | Module 10 | Document-based NoSQL — flexible schema for products, users, orders |
| **Mongoose** | Module 10 | ODM for MongoDB — schemas, validation, relationships |
| **Redis** | Module 10 | In-memory caching — sessions, frequently accessed data |

---

## Testing

| Technology | Introduced In | Why It's Included |
|-----------|--------------|-------------------|
| **Postman** | Module 09 | Manual API testing and documentation |
| **Thunder Client** | Module 09 | Lightweight API testing inside VS Code |
| **Jest** | Module 13 | JavaScript testing framework — unit and integration tests |
| **Supertest** | Module 13 | HTTP assertions for testing Express APIs |
| **React Testing Library** | Module 13 | Component testing — test behavior, not implementation |

---

## DevOps & Deployment

| Technology | Introduced In | Why It's Included |
|-----------|--------------|-------------------|
| **Git** | Module 01 | Version control — track every change |
| **GitHub** | Module 01 | Code hosting, collaboration, portfolio |
| **GitHub Actions** | Module 15 | CI/CD — automated testing and deployment |
| **Docker** | Module 15 | Containerization — consistent environments everywhere |
| **Nginx** | Module 14 | Reverse proxy and serving production builds |
| **PM2** | Module 14 | Process manager — keep Node.js running in production |
| **Vercel** | Module 14 | Frontend deployment — zero-config, instant |
| **Railway / Render** | Module 14 | Backend + database deployment |

---

## AI Integration (Optional)

| Technology | Introduced In | Why It's Included |
|-----------|--------------|-------------------|
| **OpenAI API** | Module 16 | AI-powered features — descriptions, search, chat |
| **Prompt Engineering** | Module 16 | Writing effective prompts for AI tools |

---

## Version Recommendations

```json
{
  "node": ">=18.0.0",
  "npm": ">=9.0.0",
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "bootstrap": "^5.3.0"
}
```

> **Note:** Versions listed are recommendations. The course will work with newer versions, but these are tested and verified.

---

[← Back to Course Home](./README.md)
