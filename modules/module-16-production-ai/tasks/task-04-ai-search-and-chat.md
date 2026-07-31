# Task 04 — AI Search & Chat

## 🎯 Objective

Build AI-powered semantic product search and a live chat support assistant.

---

## Instructions

### Part 1: Semantic Search

Traditional keyword search fails for: *"something to listen to music while running"*. Semantic search understands **meaning**, not just keywords.

```bash
npm install openai
```

```js
// services/semanticSearch.js
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate embedding for a text
async function getEmbedding(text) {
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
    });
    return response.data[0].embedding;
}

// Cosine similarity between two vectors
function cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normA * normB);
}

exports.semanticSearch = async (query, products) => {
    const queryEmbedding = await getEmbedding(query);

    const results = products.map(product => ({
        ...product,
        similarity: cosineSimilarity(queryEmbedding, product.embedding || [])
    }));

    return results
        .filter(p => p.similarity > 0.6)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 10);
};
```

### Part 2: Chat Support Assistant

```js
// controllers/chatController.js
const OpenAI = require('openai');
const Product = require('../models/Product');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.chat = async (req, res, next) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        // Get relevant context from database
        const products = await Product.find(
            { $text: { $search: message } },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } }).limit(3);

        const productContext = products.length > 0
            ? `Available products:\n${products.map(p =>
                `- ${p.name}: $${p.price}, ${p.inStock ? 'In stock' : 'Out of stock'}`
            ).join('\n')}`
            : '';

        const messages = [
            {
                role: 'system',
                content: `You are a helpful customer support agent for ShopZone, an ecommerce store.

${productContext}

Guidelines:
- Be friendly and concise
- Help with product questions, orders, and returns
- For complex issues, suggest contacting support@shopzone.com
- Don't make up information not in the context`
            },
            ...conversationHistory.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            { role: 'user', content: message }
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            max_tokens: 300,
            temperature: 0.5,
        });

        const reply = response.choices[0].message.content;

        res.json({
            status: 'success',
            data: { reply }
        });
    } catch (error) {
        next(error);
    }
};
```

### React Chat Widget

```tsx
// components/ChatWidget.tsx
function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi! How can I help you today? 👋' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const { data } = await api.post('/chat', {
                message: input,
                conversationHistory: messages
            });
            setMessages(prev => [...prev, { role: 'assistant', content: data.data.reply }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-widget">
            <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
                💬
            </button>
            {isOpen && (
                <div className="chat-panel">
                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                        {loading && <div className="message assistant">Typing...</div>}
                    </div>
                    <div className="chat-input">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask a question..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}
```

---

[Previous Task ← AI Product Descriptions](./task-03-ai-product-descriptions.md) · [Next Task → Final Review](./task-05-final-review.md)

[← Back to Module 16](../README.md)
