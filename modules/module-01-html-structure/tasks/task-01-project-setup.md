# Task 01 — Project Setup

## 🎯 Objective

Set up your development environment and create the first file of your ecommerce project.

---

## The Problem

You want to build a website. You have a computer. But where exactly do you write the code? How do you see it in a browser? Where do you save the files?

---

## Instructions

### Step 1: Open VS Code

Launch Visual Studio Code. If you haven't installed it yet, download it from [code.visualstudio.com](https://code.visualstudio.com/).

### Step 2: Install Essential Extensions

Open the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`) and install:

- **Live Server** — Auto-refreshes the browser when you save
- **Prettier** — Auto-formats your code
- **Auto Rename Tag** — Renames matching HTML tags

### Step 3: Create Your Project Folder

```bash
mkdir ecommerce-project
cd ecommerce-project
```

### Step 4: Open the Folder in VS Code

```bash
code .
```

Or use **File → Open Folder** in VS Code.

### Step 5: Create Your First HTML File

Create a new file called `index.html` in the root of your project folder.

Type the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShopZone - Your Online Store</title>
</head>
<body>
    <h1>Welcome to ShopZone</h1>
    <p>Your one-stop online shopping destination.</p>
</body>
</html>
```

### Step 6: View in Browser

Right-click the file in VS Code and select **"Open with Live Server"**.

Your default browser will open and display your page. Every time you save the file, the browser will automatically refresh.

---

## 💡 What You Just Learned

| Concept | What It Means |
|---------|--------------|
| `<!DOCTYPE html>` | Tells the browser this is an HTML5 document |
| `<html lang="en">` | Root element, `lang` helps screen readers |
| `<meta charset="UTF-8">` | Supports all characters (emojis, accents, etc.) |
| `<meta name="viewport">` | Makes the page responsive on mobile |
| `<title>` | Text shown in the browser tab |
| `<h1>` | Main heading — every page should have exactly one |
| `<p>` | Paragraph — for text content |

---

## ✅ Expected Output

A browser window showing:

- **"Welcome to ShopZone"** as a large heading
- **"Your one-stop online shopping destination."** as a paragraph below it

No styling. No colors. Just text. And that's perfect for now.

---

## 📂 File Structure

```
ecommerce-project/
└── index.html
```

---

## 🔗 Quick Tip

> **VS Code Shortcut:** Type `!` and press `Tab` in an empty `.html` file. VS Code will generate the HTML boilerplate for you automatically (called Emmet).

---

[Next Task → Page Structure](./task-02-page-structure.md)

[← Back to Module 01](../README.md)
