import { useState, useEffect, useCallback } from 'react';
import type { Language } from './useSpeechRecognition';

export const useTextToSpeech = (language: Language) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            setSupported(true);

            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);
            };

            loadVoices();

            // Chrome loads voices asynchronously
            window.speechSynthesis.onvoiceschanged = loadVoices;

            return () => {
                window.speechSynthesis.onvoiceschanged = null;
            };
        }
    }, []);

    const speak = useCallback((text: string, langOverride?: Language) => {
        if (!supported) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const targetLang = langOverride || language;
        utterance.lang = targetLang;

        // Try to find a specific voice for the language
        // 1. Exact match (e.g., 'te-IN')
        // 2. Base language match (e.g., 'te')
        // 3. Fallback to any available voice
        let voice = voices.find(v => v.lang === targetLang);

        if (!voice) {
            const baseLang = targetLang.split('-')[0];
            voice = voices.find(v => v.lang.startsWith(baseLang));
        }

        // Fallback: Use English or Hindi voice if Telugu not available
        if (!voice && targetLang.startsWith('te')) {
            console.warn(`No Telugu voice found, using fallback voice`);
            voice = voices.find(v => v.lang.startsWith('hi')) || voices.find(v => v.lang.startsWith('en'));
        }

        if (voice) {
            utterance.voice = voice;
            console.log(`Using voice: ${voice.name} (${voice.lang})`);
        } else {
            console.warn(`No voice found for language: ${targetLang}, using default`);
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error("Speech synthesis error:", e);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [language, supported, voices]);

    const cancel = useCallback(() => {
        if (supported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [supported]);

    return { speak, cancel, isSpeaking, supported };
};
