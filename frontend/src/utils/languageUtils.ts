import type { Language } from '../hooks/useSpeechRecognition';

export const detectLanguage = (text: string): Language | null => {
    // Telugu Unicode Range: \u0C00-\u0C7F
    const teluguRegex = /[\u0C00-\u0C7F]/;

    // Devanagari (Hindi) Unicode Range: \u0900-\u097F
    const hindiRegex = /[\u0900-\u097F]/;

    if (teluguRegex.test(text)) {
        return 'te-IN';
    }

    if (hindiRegex.test(text)) {
        return 'hi-IN';
    }

    // Return 'en-US' for Latin script (English)
    if (/[a-zA-Z]/.test(text)) {
        return 'en-US';
    }

    // Return null for other symbols/numbers to allow fallback to current context
    return null;
};
