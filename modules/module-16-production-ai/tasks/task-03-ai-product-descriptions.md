# Task 03 — AI Product Descriptions

## 🎯 Objective

Use the OpenAI API to automatically generate compelling product descriptions.

---

## Instructions

### Install OpenAI SDK

```bash
npm install openai
```

### Backend: Generation Endpoint

```js
// controllers/aiController.js
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.generateProductDescription = async (req, res, next) => {
    try {
        const { productName, category, features, targetAudience } = req.body;

        const prompt = `
Write a compelling product description for an ecommerce website.

Product: ${productName}
Category: ${category}
Key Features: ${features.join(', ')}
Target Audience: ${targetAudience}

Requirements:
- 2-3 sentences
- Highlight benefits, not just features
- Use persuasive language
- End with a call to action
- Tone: Professional but friendly
`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional ecommerce copywriter who creates compelling, conversion-focused product descriptions.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 200,
            temperature: 0.7,
        });

        const description = response.choices[0].message.content;

        res.json({
            status: 'success',
            data: { description }
        });
    } catch (error) {
        next(error);
    }
};

exports.generateProductTags = async (req, res, next) => {
    try {
        const { productName, description } = req.body;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{
                role: 'user',
                content: `Generate 5-8 SEO-friendly tags for this product. Return ONLY a JSON array of strings.
Product: ${productName}
Description: ${description}`
            }],
            response_format: { type: 'json_object' },
        });

        const { tags } = JSON.parse(response.choices[0].message.content);

        res.json({ status: 'success', data: { tags } });
    } catch (error) {
        next(error);
    }
};
```

### React Admin UI

```tsx
// components/admin/AIDescriptionGenerator.tsx
function AIDescriptionGenerator({ onGenerate }: { onGenerate: (desc: string) => void }) {
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const { data } = await api.post('/ai/generate-description', {
                productName: 'Wireless Headphones',
                category: 'electronics',
                features: features.split(',').map(f => f.trim()),
                targetAudience: 'Music lovers and remote workers'
            });
            onGenerate(data.data.description);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-generator">
            <h3>🤖 AI Description Generator</h3>
            <textarea
                placeholder="List key features, comma-separated..."
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={3}
            />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Generating...' : '✨ Generate with AI'}
            </button>
        </div>
    );
}
```

### Cost Management

```js
// Estimate before calling API
const estimatedTokens = prompt.length / 4; // ~4 chars per token
const estimatedCostUSD = (estimatedTokens / 1000) * 0.00015; // gpt-4o-mini pricing

// Cache generated descriptions (don't call API for same product twice)
const cacheKey = `ai:desc:${productId}`;
const cached = await redisClient.get(cacheKey);
if (cached) return res.json({ data: { description: cached } });

// After generation, cache for 30 days
await redisClient.setEx(cacheKey, 30 * 24 * 60 * 60, description);
```

---

[Previous Task ← Security Hardening](./task-02-security-hardening.md) · [Next Task → AI Search & Chat](./task-04-ai-search-and-chat.md)

[← Back to Module 16](../README.md)
