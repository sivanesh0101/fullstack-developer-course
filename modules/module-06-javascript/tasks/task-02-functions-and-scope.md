# Task 02 — Functions & Scope

## 🎯 Objective
Write reusable functions for calculating prices, formatting currency, and handling cart operations.

---

## Instructions

### 1. Function Declarations
Functions are reusable blocks of code. They help you avoid writing the same code over and over again. You declare a function using the `function` keyword.

```js
function calculateTotal(price, quantity) {
    return price * quantity;
}

function formatPrice(amount) {
    return `$${amount.toFixed(2)}`;
}

console.log(formatPrice(calculateTotal(49.99, 3))); // "$149.97"
```

### 2. Arrow Functions
Arrow functions provide a more concise syntax for writing functions. They are often used for short, simple operations.

```js
// Standard function
const calculateTax = function(subtotal, rate = 0.18) {
    return subtotal * rate;
};

// Arrow function equivalent
const calculateTaxArrow = (subtotal, rate = 0.18) => {
    return subtotal * rate;
};

// One-liner arrow functions can omit the curly braces and `return` keyword (implicit return)
const isInStock = (quantity) => quantity > 0;
const greet = (name) => `Hello, ${name}!`;
const double = x => x * 2; // Parentheses are optional for a single parameter
```

### 3. Default Parameters
You can set default values for function parameters. If a value isn't provided when the function is called, it will use the default.

```js
function addToCart(productId, quantity = 1) {
    console.log(`Added ${quantity} of product ${productId}`);
}

addToCart("WH-500");    // Added 1 of product WH-500
addToCart("WH-500", 3); // Added 3 of product WH-500
```

### 4. Scope and Closures
**Scope** refers to where variables are accessible. A variable declared inside a function cannot be accessed from outside.
A **closure** is when a function remembers and can access variables from its surrounding scope, even after that surrounding scope has finished executing. This is very useful for creating "private" variables.

```js
function createCart() {
    let items = [];  // Private variable — cannot be accessed directly from outside

    // The returned object contains functions that form closures.
    // They remember the `items` array from their parent function.
    return {
        add(item) { items.push(item); },
        remove(id) { items = items.filter(i => i.id !== id); },
        getItems() { return [...items]; },
        getTotal() { return items.reduce((sum, i) => sum + i.price * i.quantity, 0); }
    };
}

const cart = createCart();
cart.add({ id: 1, name: "Headphones", price: 49.99, quantity: 1 });
console.log(cart.getTotal()); // 49.99
// console.log(cart.items); // undefined (items is private and hidden)
```

### 5. Higher-Order Functions
A higher-order function is simply a function that either takes one or more functions as arguments, or returns a function as its result.

```js
// Function that takes a function (discountFn) as an argument
function applyDiscount(price, discountFn) {
    return discountFn(price);
}

const tenPercentOff = (price) => price * 0.9;

// Function that returns another function
const flatDiscount = (amount) => {
    return (price) => price - amount;
};

applyDiscount(100, tenPercentOff);        // 90
applyDiscount(100, flatDiscount(15));     // 85
```

---

## 🛠️ Practical Application (Connecting to the Bootstrap Project)

Now that you know how functions and variables work, let's start applying them to your `03-bootstrap` project! You might be wondering: *"Why do we need to declare products in JavaScript if they are already in the HTML?"* 

**The Answer:** HTML only knows "text". It cannot do math. If a user clicks to buy 3 headphones, HTML cannot calculate the total. Furthermore, in real-world apps like Amazon, products aren't hardcoded in HTML—they are fetched from a database and injected into the HTML using JavaScript! 

For now, we will declare our data in JavaScript and test it in the console. In the next task, we will connect the JavaScript "brain" to the HTML "body" so they can interact!

### Step 1: Verify the Setup
1. Open your `03-bootstrap/index.html` in the browser.
2. Right-click, select **Inspect**, and go to the **Console** tab. We will test our logic here.

### Step 2: Apply Objects and Arrays
At the bottom of your `script.js`, refactor any loose variables into an Object representing a product on your page, and create a cart array.

```javascript
// 1. Create an Object for a single product
const featuredProduct = {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    originalPrice: 69.99,
    inStock: true,
    category: "Electronics"
};

console.log("Featured Product Name:", featuredProduct.name);

// 2. Create an Array for the cart
let shoppingCart = [];
```

### Step 3: Test Functions in the Console
Use the `calculateTotal` and `formatPrice` functions provided in the file to simulate buying multiple headphones.

```javascript
let quantityToBuy = 3;
let rawTotal = calculateTotal(featuredProduct.price, quantityToBuy);

console.log("Raw Total:", rawTotal); 
console.log("Formatted Total:", formatPrice(rawTotal)); // Outputs: "$149.97"
```

### Step 4: The True Power of Arrow Functions (Array Methods)
In modern real-world projects (and frameworks like React), arrow functions are used everywhere. Their biggest advantage is making code incredibly concise, especially when working with Arrays. 

Let's add some items to our cart and use an arrow function to search for a specific product. Notice how much cleaner the arrow function is!

```javascript
// Add a few items to our cart
shoppingCart.push(featuredProduct);
shoppingCart.push({ id: 2, name: "Running Shoes", price: 79.99 });

// ❌ The Old Way (Standard Function):
const findShoesOld = shoppingCart.find(function(item) {
    return item.name === "Running Shoes";
});

// ✅ The Modern Way (Arrow Function):
const findShoesNew = shoppingCart.find(item => item.name === "Running Shoes");

console.log("Found Item:", findShoesNew);
```

**Why is this important?** Arrow functions let you drop the `function` keyword, the curly braces `{}`, and the `return` keyword when you only have one line of logic. This is the exact syntax you will use all the time when filtering products or managing shopping carts in a real application!

---

## 💡 Key Takeaways
- Use **function declarations** for complex, named functions.
- Use **arrow functions** for short, one-line operations and callbacks.
- **Default parameters** help avoid errors when arguments are missing.
- **Closures** let you create private state (like hiding the cart items array).
- **Higher-order functions** treat functions as values that can be passed around.

---

[Previous Task ← Variables](./task-01-variables-and-data-types.md) · [Next Task → DOM Manipulation](./task-03-dom-manipulation.md)

[← Back to Module 06](../README.md)
