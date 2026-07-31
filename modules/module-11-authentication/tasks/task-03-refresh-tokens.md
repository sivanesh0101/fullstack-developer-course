# Task 03 — Refresh Tokens

## 🎯 Objective

Implement token rotation with short-lived access tokens and long-lived refresh tokens.

---

## The Problem

If an access token lasts 7 days and it's stolen, the attacker has access for a full week. **Short-lived access tokens** (15 minutes) with **refresh tokens** (7 days) limit the damage window.

---

## Instructions

### Token Flow

```
1. Login → Access Token (15min) + Refresh Token (7 days)
2. API request → Send Access Token
3. Access Token expires → Send Refresh Token to get a new pair
4. Refresh Token expires → User must log in again
```

### Generate Token Pair

```js
function generateTokens(userId, role) {
    const accessToken = jwt.sign(
        { id: userId, role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
}
```

### Login Response

```js
exports.login = async (req, res) => {
    // ... validate credentials ...

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    // Store refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ accessToken, user: { id: user._id, name: user.name } });
};
```

### Refresh Endpoint

```js
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'User not found' });

        // Generate new token pair (rotation)
        const tokens = generateTokens(user._id, user.role);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken: tokens.accessToken });
    } catch {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};
```

### Client-Side: Auto-Refresh

```js
// Axios interceptor to auto-refresh expired tokens
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true;
            try {
                const { data } = await api.post('/auth/refresh');
                localStorage.setItem('accessToken', data.accessToken);
                error.config.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(error.config);
            } catch {
                // Refresh failed — redirect to login
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
```

---

## 💡 Access Token vs Refresh Token

| Feature | Access Token | Refresh Token |
|---------|-------------|---------------|
| Lifetime | 15 minutes | 7 days |
| Stored in | Memory / localStorage | HTTP-only cookie |
| Sent with | Every API request | Only to `/auth/refresh` |
| If stolen | Limited damage (15min) | Rotate immediately |

---

[Previous Task ← JWT Auth](./task-02-jwt-auth.md) · [Next Task → Roles & Permissions](./task-04-roles-and-permissions.md)

[← Back to Module 11](../README.md)
