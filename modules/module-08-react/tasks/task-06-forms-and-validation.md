# Task 06 — Forms & Validation

## 🎯 Objective
Build forms with React Hook Form and validate with Zod.

---

## Instructions

```bash
npm install react-hook-form zod @hookform/resolvers
```

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'At least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginForm) => {
        console.log('Login:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="Email" />
            {errors.email && <span>{errors.email.message}</span>}

            <input {...register('password')} type="password" placeholder="Password" />
            {errors.password && <span>{errors.password.message}</span>}

            <button type="submit">Sign In</button>
        </form>
    );
}
```

---

[Previous Task ← React Router](./task-05-react-router.md) · [Next Task → Context API](./task-07-context-api.md)

[← Back to Module 08](../README.md)
