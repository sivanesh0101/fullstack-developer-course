# Task 04 — Forms & Inputs

## 🎯 Objective

Build a complete search bar, login form, and signup form using HTML form elements with proper input types and validation.

---

## The Problem

Your ecommerce site needs user interaction:
- A **search bar** to find products
- A **login form** for returning users
- A **signup form** for new users
- A **checkout form** for shipping details

HTML provides form elements designed exactly for these needs — with built-in validation, accessibility, and mobile keyboard support.

---

## Instructions

### Step 1: Build the Search Form

Update the header search in `index.html`:

```html
<form action="/search" method="GET" role="search">
    <label for="search-category" class="visually-hidden">Category</label>
    <select id="search-category" name="category">
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
        <option value="home">Home & Kitchen</option>
        <option value="sports">Sports</option>
    </select>

    <label for="search-input" class="visually-hidden">Search</label>
    <input
        type="search"
        id="search-input"
        name="q"
        placeholder="Search ShopZone"
        autocomplete="off"
        aria-label="Search products"
    >

    <button type="submit">
        Search
    </button>
</form>
```

### Step 2: Create a Login Page (`login.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In - ShopZone</title>
</head>
<body>
    <main>
        <section>
            <h1>Sign In</h1>

            <form action="/login" method="POST">
                <div>
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autocomplete="email"
                        placeholder="your@email.com"
                    >
                </div>

                <div>
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        minlength="8"
                        autocomplete="current-password"
                        placeholder="At least 8 characters"
                    >
                </div>

                <div>
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Keep me signed in</label>
                </div>

                <button type="submit">Sign In</button>

                <p>
                    <a href="forgot-password.html">Forgot your password?</a>
                </p>
            </form>

            <hr>

            <p>New to ShopZone?</p>
            <a href="signup.html">Create your ShopZone account</a>
        </section>
    </main>
</body>
</html>
```

### Step 3: Create a Signup Page (`signup.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account - ShopZone</title>
</head>
<body>
    <main>
        <section>
            <h1>Create Account</h1>

            <form action="/signup" method="POST">
                <div>
                    <label for="fullname">Your name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        required
                        autocomplete="name"
                        placeholder="First and last name"
                    >
                </div>

                <div>
                    <label for="signup-email">Email</label>
                    <input
                        type="email"
                        id="signup-email"
                        name="email"
                        required
                        autocomplete="email"
                    >
                </div>

                <div>
                    <label for="phone">Mobile number (optional)</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autocomplete="tel"
                        pattern="[0-9]{10}"
                        placeholder="10-digit number"
                    >
                </div>

                <div>
                    <label for="signup-password">Password</label>
                    <input
                        type="password"
                        id="signup-password"
                        name="password"
                        required
                        minlength="8"
                        autocomplete="new-password"
                        placeholder="At least 8 characters"
                    >
                    <small>Passwords must be at least 8 characters.</small>
                </div>

                <div>
                    <label for="confirm-password">Re-enter password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm_password"
                        required
                        minlength="8"
                        autocomplete="new-password"
                    >
                </div>

                <button type="submit">Create your ShopZone account</button>

                <p>
                    Already have an account? <a href="login.html">Sign in</a>
                </p>
            </form>
        </section>
    </main>
</body>
</html>
```

---

## 💡 What You Just Learned

### Input Types and Why They Matter

| Type | Purpose | Mobile Behavior |
|------|---------|----------------|
| `text` | General text input | Standard keyboard |
| `email` | Email addresses | Shows `@` key on mobile |
| `password` | Hidden input | Hides characters |
| `tel` | Phone numbers | Shows number pad |
| `search` | Search queries | Shows search key |
| `number` | Numeric values | Shows number pad |
| `url` | Website URLs | Shows `.com` key |

### Validation Attributes

| Attribute | What It Does |
|-----------|-------------|
| `required` | Field must be filled out |
| `minlength` | Minimum number of characters |
| `maxlength` | Maximum number of characters |
| `pattern` | Must match a regex pattern |
| `type="email"` | Must be a valid email format |

### Accessibility

| Practice | Why |
|----------|-----|
| `<label for="id">` | Clicking the label focuses the input |
| `aria-label` | Provides a label for screen readers |
| `autocomplete` | Helps browsers autofill correctly |
| `placeholder` | Shows hint text (but never replaces a label) |

---

## ✅ Expected Output

- Search form with category dropdown and search input
- Login page with email and password fields
- Signup page with name, email, phone, and password fields
- Built-in browser validation (try submitting without required fields)

---

## 🧠 Try This

1. Try submitting the login form with an invalid email — the browser stops you
2. Try submitting with a password shorter than 8 characters
3. Try entering letters in the phone field with `pattern="[0-9]{10}"`

This is **HTML validation** — no JavaScript required.

---

[Previous Task ← Semantic HTML](./task-03-semantic-html.md) · [Next Task → Images & Media](./task-05-images-and-media.md)

[← Back to Module 01](../README.md)
