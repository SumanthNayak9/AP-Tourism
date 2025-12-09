import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configure ZenMux AI (OpenAI-compatible)
const zenmux = new OpenAI({
    apiKey: process.env.VITE_ZENMUX_API_KEY,
    baseURL: 'https://zenmux.ai/api/v1'
});

console.log('🔑 ZenMux API Key loaded:', process.env.VITE_ZENMUX_API_KEY ? 'Yes ✅' : 'NO - MISSING! ❌');

app.post('/api/chat', async (req, res) => {
    try {
        const { message, language } = req.body;

        const languageMap = {
            'en-US': 'English',
            'hi-IN': 'Hindi',
            'te-IN': 'Telugu'
        };

        const systemPrompt = `You are a helpful AI assistant for Andhra Pradesh Tourism. Answer questions about AP tourism in ${languageMap[language] || 'English'}. Keep responses concise (2-3 sentences) and helpful.`;

        console.log('📤 Calling ZenMux AI...');

        const completion = await zenmux.chat.completions.create({
            model: 'qwen/qwen3-max',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            max_tokens: 200,
            temperature: 0.7,
        });

        const responseText = completion.choices[0].message.content;
        console.log('✅ ZenMux response:', responseText.substring(0, 50) + '...');

        res.json({
            response: responseText
        });

    } catch (error) {
        console.error('❌ ZenMux API Error:', error.message);
        console.error('Full error:', error);
        res.status(500).json({
            error: 'Failed to get response from ZenMux AI',
            details: error.message
        });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Backend server running on http://localhost:${PORT}`);
        console.log(`📡 Ready to handle ZenMux AI requests`);
    });
}

export default app;
