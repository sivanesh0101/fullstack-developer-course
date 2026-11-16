# Task 06 — React Forms & Validation

> **Level:** Beginner → Intermediate  
> **Prerequisites:** React components, props, `useState`, events, conditional rendering, and React Router  
> **Estimated time:** Two 90-minute sessions  
> **Goal:** Build login and registration forms using React Hook Form, Zod, and TypeScript.

[Previous Task ← React Router](./task-05-react-router.md) · [Next Task → Context API](./task-07-context-api.md)  
[← Back to Module 08](../README.md)

---

## 🎯 Learning Outcomes

By the end of this task, you should be able to:

1. Explain how HTML forms and submission events work in React.
2. Read input values using controlled components and `useState`.
3. Write basic manual validation rules.
4. Use React Hook Form's `register`, `handleSubmit`, and `formState.errors`.
5. Define validation schemas using Zod.
6. Connect Zod to React Hook Form with `zodResolver`.
7. Build a working login form and practice building a registration form.

## 6.1 — What Is a Form?

A form collects information from users, such as an email and password on a login page.

**Validation** checks whether the information follows the required rules. It does **not** verify that an account exists or that a password is correct; those checks happen on the server.

| Field | Example rule | Valid example |
| --- | --- | --- |
| Name | At least 3 characters | Siva |
| Email | Valid email format | siva@example.com |
| Password | At least 8 characters | example123 |
| Age | At least 18 | 21 |

**Discuss:** What should happen when someone submits an empty email field?

## 6.2 — First React Form (No Validation)

Create `LoginPage.tsx`:

```tsx
function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
```

**Understand the code:**

- `<form>` groups the fields for submission.
- `onSubmit` calls a function when the form is submitted.
- `event.preventDefault()` stops the browser's default form submission/navigation.
- `type="submit"` makes the button submit the form.

**Try it:** Add a Full Name field. What happens when you click Login?

## 6.3 — Read Input Values with `useState`

A **controlled input** receives its value from React state and updates that state when the user types.

```tsx
import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password length:', password.length);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
```

**Flow:** User types → `onChange` runs → state updates → React displays the new value.

**Discuss:** If a form has 15 fields, how much repetitive state-handling code might we write?

## 6.4 — Add Manual Validation

Replace the `handleSubmit` function from the previous example with:

```tsx
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (email.trim() === '') {
    alert('Email is required');
    return;
  }

  if (password.length < 8) {
    alert('Password must contain at least 8 characters');
    return;
  }

  console.log('Basic validation passed');
};
```

`return` stops the function when a rule fails. This is only a **basic** check: it does not fully validate the email format or authenticate a user.

**Think:** What if a registration form needs 20 fields, multiple rules per field, and error messages next to every input?

## 6.5 — Why React Hook Form?

[React Hook Form](https://react-hook-form.com/) helps manage input registration, submission, validation, and error states with less repetitive code.

Install it:

```bash
npm install react-hook-form
```

Create a new version of `LoginPage.tsx`:

```tsx
import { useForm } from 'react-hook-form';

type LoginForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log('Email:', data.email);
    console.log('Password length:', data.password.length);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
```

### Three key concepts

| Code | Meaning |
| --- | --- |
| `useForm<LoginForm>()` | Creates the form manager and specifies the expected data type. |
| `register('email')` | Connects the email input to React Hook Form. |
| `handleSubmit(onSubmit)` | Handles submission and calls `onSubmit` when configured validation passes. |

`{...register('email')}` uses JavaScript **spread syntax** to pass properties returned by `register` (including event handlers and a ref) into the input.

**Note:** No validation rules have been configured in this example yet.

## 6.6 — Why Zod?

[Zod](https://zod.dev/) defines rules for what valid data should look like. A group of these rules is called a **schema**.

Install the remaining packages:

```bash
npm install zod @hookform/resolvers
```

Define a schema (Zod 4 syntax):

```tsx
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
});
```

- `z.object({...})`: Defines an object with named fields.
- `z.email(...)`: Requires an email-shaped string.
- `z.string().min(8, ...)`: Requires a string of at least eight characters.

| Email | Result |
| --- | --- |
| `siva@example.com` | Valid format |
| `sivaexample.com` | Invalid format |
| `siva@` | Invalid format |

**Important:** A valid email *format* does not prove that the mailbox exists.

## 6.7 — Connect React Hook Form and Zod

The `zodResolver` acts as a bridge between React Hook Form and your Zod schema.

```text
User submits the form
         ↓
React Hook Form: handleSubmit()
         ↓
zodResolver(loginSchema)
         ↓
Zod checks the rules
         ↓
   ┌─────┴─────┐
   ↓           ↓
 Valid       Invalid
   ↓           ↓
onSubmit()   errors object
```

### Complete Login Form

Replace `LoginPage.tsx` with the following:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define the validation rules.
const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
});

// 2. Infer a TypeScript type from the schema.
type LoginForm = z.infer<typeof loginSchema>;

function LoginPage() {
  // 3. Connect the schema to React Hook Form.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // 4. This runs only when validation succeeds.
  const onSubmit = (data: LoginForm) => {
    console.log('Validated email:', data.email);
    alert('Form validation passed!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          autoComplete="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && (
          <p id="password-error" role="alert">{errors.password.message}</p>
        )}
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}

export default LoginPage;
```

`noValidate` disables the browser's built-in form validation so students can clearly observe the Zod error messages. In a real application, browser validation and schema validation can be used together deliberately.

### Understand the difficult lines

**`type LoginForm = z.infer<typeof loginSchema>`**

- `typeof loginSchema` obtains the schema's TypeScript type.
- `z.infer<...>` derives the validated data type from that schema.
- For this example, the result is equivalent to `{ email: string; password: string }`.

**`resolver: zodResolver(loginSchema)`**

This tells React Hook Form to validate form values using the Zod schema.

**`formState: { errors }`**

This provides validation errors for individual fields. For example:

```tsx
{errors.email && <p>{errors.email.message}</p>}
```

The message appears only when the email field has a validation error. This is **conditional rendering**.

## 6.8 — Connect the Form to React Router

Reuse what you learned in Task 05:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';

function HomePage() {
  return <h1>Home</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Remember:** React Router chooses **which page** to show; React Hook Form manages **the inputs on that page**. If your project already has a `BrowserRouter` at the root, do not add a second one.

## 6.9 — Practice Exercises

### Exercise A — Login Form (Easy, 20–30 minutes)

Create a login form with an email field and a password field. The email must have a valid format, and the password must contain at least eight characters. Show error messages below the fields.

**Success criteria:** Uses `register`, `handleSubmit`, `zodResolver`, and `errors` correctly.

### Exercise B — Registration Form (Medium, 30–45 minutes)

Create a registration form with:

| Field | Rule |
| --- | --- |
| Full name | Minimum 3 characters |
| Email | Valid email format |
| Password | Minimum 8 characters |
| Confirm password | Must match password |
| Age | Must be at least 18 |

To validate matching passwords, use `.refine()`:

```tsx
const passwordSchema = z.object({
  password: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
```

**Hint:** HTML number inputs often return strings. For age validation, investigate `z.coerce.number()` or React Hook Form's `valueAsNumber` option and handle empty input carefully.

### Exercise C — Student Registration (Challenge, 45–60 minutes)

Build a form with student name, email, phone number, course selection, date of birth, and a terms checkbox.

**Requirements:**

1. Use React Hook Form and Zod.
2. Display useful errors next to fields.
3. Prevent submission when data is invalid.
4. Disable the submit button during an asynchronous submission.
5. Show a success message and reset the form after success.
6. Simulate submission locally; no backend is required yet.

## 6.10 — Quick Knowledge Check

Answer these without looking at the code:

1. Why do we use `event.preventDefault()` in a manually handled form?
2. What makes an input a controlled component?
3. What does `register('email')` do?
4. What is the difference between `handleSubmit` and your own `onSubmit`?
5. Why do we need a Zod schema?
6. What does `zodResolver` connect?
7. When does `errors.password.message` appear?
8. Does client-side validation prove that a user is authenticated? Why not?

## 6.11 — Suggested Class Plan

| Session | Topic | Time |
| --- | --- | --- |
| Day 1 | HTML forms | 15 min |
| Day 1 | Controlled inputs with `useState` | 25 min |
| Day 1 | Manual validation | 20 min |
| Day 1 | React Hook Form | 30 min |
| Day 2 | React Hook Form recap | 10 min |
| Day 2 | Zod schemas | 25 min |
| Day 2 | Resolver integration | 20 min |
| Day 2 | Errors and TypeScript inference | 15 min |
| Day 2 | Guided practice | 20 min |

## ✅ Completion Checklist

- [ ] I can explain forms and validation in my own words.
- [ ] I can read inputs with `useState`.
- [ ] I understand why manual validation becomes repetitive.
- [ ] I can use `register` and `handleSubmit`.
- [ ] I can write a Zod schema.
- [ ] I can connect Zod with `zodResolver`.
- [ ] I can display field-specific error messages.
- [ ] I completed the login form.
- [ ] I attempted the registration form.

## Further Reading

- [React: Responding to Events](https://react.dev/learn/responding-to-events)
- [React: State — A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

---

[Previous Task ← React Router](./task-05-react-router.md) · [Next Task → Context API](./task-07-context-api.md)  
[← Back to Module 08](../README.md)
