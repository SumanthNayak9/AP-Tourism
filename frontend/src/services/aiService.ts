// Mock responses for demo purposes (fallback if no API key)
const MOCK_RESPONSES: Record<string, Record<string, string>> = {
    'en-US': {
        default: "I'm sorry, I didn't catch that. Could you please repeat? I can help you with AP Tourism.",
        hello: "Hello! Welcome to Andhra Pradesh Tourism. How can I assist you today?",
        visakhapatnam: "Visakhapatnam, also known as Vizag, is a coastal city known for its beaches like RK Beach and Rushikonda. Don't miss the Submarine Museum!",
        tirupati: "Tirupati is famous for the Sri Venkateswara Temple, one of the most visited pilgrimage centers in the world.",
        food: "Andhra cuisine is known for its spicy and tangy flavors. You must try Hyderabadi Biryani, Pesarattu, and Gongura Pachadi.",
    },
    'hi-IN': {
        default: "क्षमा करें, मैं समझ नहीं पाया। क्या आप दोहरा सकते हैं? मैं आंध्र प्रदेश पर्यटन में आपकी मदद कर सकता हूँ।",
        hello: "नमस्ते! आंध्र प्रदेश पर्यटन में आपका स्वागत है। आज मैं आपकी कैसे मदद कर सकता हूँ?",
        visakhapatnam: "विशाखापत्तनम, जिसे विजाग के नाम से भी जाना जाता है, अपने समुद्र तटों जैसे आरके बीच और ऋषिकोंडा के लिए जाना जाता है। पनडुब्बी संग्रहालय देखना न भूलें!",
        tirupati: "तिरुपति श्री वेंकटेश्वर मंदिर के लिए प्रसिद्ध है, जो दुनिया के सबसे अधिक देखे जाने वाले तीर्थ स्थलों में से एक है।",
        food: "आंध्र का भोजन अपने तीखे और खट्टे स्वादों के लिए जाना जाता है। आपको हैदराबादी बिरयानी, पेसरट्टू और गोंगुरा पचड़ी जरूर आजमानी चाहिए।",
    },
    'te-IN': {
        default: "క్షమించండి, నాకు అర్థం కాలేదు. దయచేసి మళ్ళీ చెప్పగలరా? ఆంధ్రప్రదేశ్ పర్యాటకంలో నేను మీకు సహాయం చేయగలను.",
        hello: "నమస్కారం! ఆంధ్రప్రదేశ్ పర్యాటకానికి స్వాగతం. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
        visakhapatnam: "విశాఖపట్నం, వైజాగ్ అని కూడా పిలుస్తారు, ఆర్కే బీచ్ మరియు ఋషికొండ వంటి బీచ్‌లకు ప్రసిద్ధి. సబ్ మెరైన్ మ్యూజియం చూడటం మర్చిపోవద్దు!",
        tirupati: "తిరుపతి శ్రీ వెంకటేశ్వర స్వామి ఆలయానికి ప్రసిద్ధి చెందింది, ఇది ప్రపంచంలో అత్యధికంగా సందర్శించే పుణ్యక్షేత్రాలలో ఒకటి.",
        food: "ఆంధ్రా వంటకాలు కారం మరియు పుల్లని రుచులకు ప్రసిద్ధి. మీరు హైదరాబాదీ బిర్యానీ, పెసరట్టు మరియు గోంగూర పచ్చడి తప్పక రుచి చూడాలి.",
    }
};

export const generateResponse = async (text: string, language: 'en-US' | 'hi-IN' | 'te-IN'): Promise<string> => {
    // Call backend server instead of Claude API directly (to avoid CORS)
    const BACKEND_URL = 'http://localhost:3001';

    try {
        console.log('🤖 Sending request to backend server...');

        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: text,
                language: language
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ AI response received:', data.response.substring(0, 50) + '...');
            return data.response;
        } else {
            console.error('Backend server error:', response.status);
            throw new Error('Backend server not responding');
        }
    } catch (error) {
        console.error("❌ Backend API Error:", error);
        console.log('⚠️ Falling back to mock responses');
        // Fallback to mock
    }

    // 2. Mock Logic
    const lowerText = text.toLowerCase();
    const langResponses = MOCK_RESPONSES[language];

    // Hello checks
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('namaste') || lowerText.includes('namaskaram') ||
        lowerText.includes('नमस्ते') || lowerText.includes('నమస్కారం')) return langResponses.hello;

    // Vizag checks
    if (lowerText.includes('vizag') || lowerText.includes('visakhapatnam') ||
        lowerText.includes('विशाखापत्तनम') || lowerText.includes('విశాఖపట్నం')) return langResponses.visakhapatnam;

    // Tirupati checks
    if (lowerText.includes('tirupati') || lowerText.includes('तिरुपति') || lowerText.includes('తిరుపతి')) return langResponses.tirupati;

    // Food checks
    if (lowerText.includes('food') || lowerText.includes('eat') || lowerText.includes('khana') || lowerText.includes('bhojanam') ||
        lowerText.includes('भोजन') || lowerText.includes('భోజనం')) return langResponses.food;

    return langResponses.default;
};
