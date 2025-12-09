import OpenAI from 'openai';

export const config = {
    runtime: 'edge',
};

const zenmux = new OpenAI({
    apiKey: process.env.VITE_ZENMUX_API_KEY,
    baseURL: 'https://zenmux.ai/api/v1'
});

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { message, language } = await req.json();

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

        return new Response(JSON.stringify({ response: responseText }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
