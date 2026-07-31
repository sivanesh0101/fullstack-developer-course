# Task 03 — Mongoose Schemas

## 🎯 Objective

Define Product, User, and Order schemas with validation, defaults, and virtual fields.

---

## Instructions

### Product Schema

```js
// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['electronics', 'fashion', 'books', 'home', 'sports'],
            message: '{VALUE} is not a valid category'
        }
    },
    image: {
        type: String,
        default: '/images/default-product.jpg'
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    tags: [String],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
});

// Virtual: check if product is in stock
productSchema.virtual('inStock').get(function() {
    return this.stock > 0;
});

// Virtual: discount percentage
productSchema.virtual('discountPercent').get(function() {
    if (!this.originalPrice || this.originalPrice <= this.price) return 0;
    return Math.round((1 - this.price / this.originalPrice) * 100);
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });

// Index for search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model('Product', productSchema);
```

### User Schema

```js
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false  // Don't include password in queries by default
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    phone: String,
    addresses: [{
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: { type: String, default: 'India' },
        isDefault: { type: Boolean, default: false }
    }]
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Order Schema

```js
// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: String,
        price: Number,
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'cod'],
        required: true
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paidAt: Date,
    deliveredAt: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
```

---

## 💡 What You Just Learned

| Feature | What It Does |
|---------|-------------|
| `required` | Field must have a value |
| `enum` | Field must be one of the listed values |
| `min` / `max` | Range validation for numbers |
| `match` | Regex validation for strings |
| `default` | Default value if none provided |
| `timestamps: true` | Auto-adds `createdAt` and `updatedAt` |
| `virtual` | Computed properties (not stored in DB) |
| `pre('save')` | Hook that runs before saving (password hashing) |
| `select: false` | Excludes field from query results by default |
| `index` | Speeds up queries on these fields |

---

## ✅ Expected Output

Three Mongoose models ready to use:
- `Product` with validation, virtuals, and text indexes
- `User` with automatic password hashing
- `Order` with references to User and Product

---

[Previous Task ← MongoDB Setup](./task-02-mongodb-setup.md) · [Next Task → CRUD Operations](./task-04-crud-operations.md)

[← Back to Module 10](../README.md)
