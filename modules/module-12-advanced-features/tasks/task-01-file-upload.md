# Task 01 — File Upload

## 🎯 Objective

Upload product images with Multer and store them in Cloudinary for production use.

---

## Instructions

### Step 1: Install Dependencies

```bash
npm install multer cloudinary multer-storage-cloudinary
```

### Step 2: Multer Setup (Local Development)

```js
// middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueName}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .png, and .webp files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

module.exports = upload;
```

### Step 3: Cloudinary Setup (Production)

```js
// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shopzone/products',
        allowed_formats: ['jpg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }]
    }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = { cloudinary, upload };
```

### Step 4: Upload Route

```js
const { upload } = require('../config/cloudinary');

// Single image upload
router.post('/products/:id/image',
    protect,
    authorize('admin'),
    upload.single('image'),
    async (req, res) => {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { image: req.file.path }, // Cloudinary URL
            { new: true }
        );
        res.json({ status: 'success', data: product });
    }
);

// Multiple images
router.post('/products/:id/images',
    protect,
    authorize('admin'),
    upload.array('images', 5), // Max 5 images
    async (req, res) => {
        const imageUrls = req.files.map(f => f.path);
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $push: { images: { $each: imageUrls } } },
            { new: true }
        );
        res.json({ status: 'success', data: product });
    }
);
```

### Step 5: React Upload Form

```tsx
function ImageUpload({ productId }: { productId: string }) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('image', file);

        await api.post(`/products/${productId}/image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleUpload} />
            {preview && <img src={preview} alt="Preview" width="200" />}
        </div>
    );
}
```

---

[Next Task → Email Notifications](./task-02-email-notifications.md)

[← Back to Module 12](../README.md)
