import OpenAI from 'openai';

const zenmux = new OpenAI({
    apiKey: process.env.VITE_ZENMUX_API_KEY,
    baseURL: 'https://zenmux.ai/api/v1'
});

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message, language } = req.body;

        const languageMap = {
            'en-US': 'English',
            'hi-IN': 'Hindi',
            'te-IN': 'Telugu'
        };

        const systemPrompt = `You are a helpful AI assistant for Andhra Pradesh Tourism. Answer questions about AP tourism in ${languageMap[language] || 'English'}. Keep responses concise (2-3 sentences) and helpful.`;

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

        res.status(200).json({ response: responseText });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}
