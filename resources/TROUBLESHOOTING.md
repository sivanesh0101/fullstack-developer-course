# 🔥 Troubleshooting

Common issues students face and how to fix them.

---

## HTML & CSS

### "My CSS isn't loading"
- Check the `<link>` tag path: `<link rel="stylesheet" href="styles.css">`
- Make sure the file name and path are correct (case-sensitive on Linux)
- Clear browser cache (`Ctrl+Shift+R`)

### "Flexbox isn't working"
- Make sure you have `display: flex` on the **parent** container, not the children
- Check if `flex-direction` is set correctly

### "My page isn't responsive"
- Add the viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Use `max-width: 100%` on images
- Test in Chrome DevTools device mode

---

## JavaScript

### "Cannot read property of undefined"
- The variable is `undefined` — check if it was initialized
- Use optional chaining: `obj?.property`
- Check if the DOM element exists: `document.querySelector('.class')` returns `null` if not found

### "Fetch is not working / CORS error"
- The API server needs to set CORS headers
- Use `cors` middleware in Express: `app.use(cors())`
- Check the API URL — typos are common

---

## React

### "Cannot update a component while rendering a different component"
- Don't call `setState` inside the render body
- Move state updates to `useEffect` or event handlers

### "Too many re-renders"
- Don't call a function in JSX without an arrow: `onClick={handleClick}` not `onClick={handleClick()}`

---

## Node.js & Express

### "EADDRINUSE: Port already in use"
```bash
# Find and kill the process using the port
lsof -i :3000
kill -9 <PID>
```

### "MongooseServerSelectionError"
- Check your MongoDB connection string
- Make sure your IP is whitelisted in MongoDB Atlas (Network Access → Add Current IP)
- Check if the database user password is correct

---

## Git

### "Merge conflict"
1. Open the conflicted files
2. Look for `<<<<<<<`, `=======`, `>>>>>>>` markers
3. Choose which changes to keep
4. Remove the markers
5. `git add .` then `git commit`

### "Accidentally committed .env"
```bash
# Remove from tracking but keep the file
git rm --cached .env
echo ".env" >> .gitignore
git commit -m "Remove .env from tracking"
```

---

[← Back to Course Home](../README.md)
