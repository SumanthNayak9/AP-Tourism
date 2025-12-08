import { useState, useEffect, useCallback, useRef } from 'react';

export type Language = 'en-US' | 'hi-IN' | 'te-IN';

interface UseSpeechRecognitionProps {
    language: Language;
    onResult: (text: string) => void;
}

export const useSpeechRecognition = ({ language, onResult }: UseSpeechRecognitionProps) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Use ref to track the latest onResult callback without triggering re-renders
    const onResultRef = useRef(onResult);

    useEffect(() => {
        onResultRef.current = onResult;
    }, [onResult]);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();

            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = language;

            recognitionInstance.onstart = () => {
                setIsListening(true);
                setError(null);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                onResultRef.current(transcript);
            };

            recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                setError(event.error);
                setIsListening(false);
            };

            setRecognition(recognitionInstance);

            return () => {
                recognitionInstance.abort();
                setRecognition(null);
            };
        } else {
            setError('Speech recognition not supported in this browser.');
        }
    }, [language]); // Re-create only when language changes

    // Update language dynamically if recognition instance exists
    useEffect(() => {
        if (recognition) {
            recognition.lang = language;
        }
    }, [language, recognition]);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
            } catch (e) {
                console.error("Error starting recognition:", e);
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
        }
    }, [recognition]);

    return { isListening, startListening, stopListening, error };
};
