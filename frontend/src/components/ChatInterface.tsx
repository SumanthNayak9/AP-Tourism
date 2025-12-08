import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import type { Language } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { generateResponse } from '../services/aiService';
import { detectLanguage } from '../utils/languageUtils';
import './ChatInterface.css';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const LANGUAGES: { code: Language; label: string; native: string }[] = [
    { code: 'en-US', label: 'English', native: 'English' },
    { code: 'hi-IN', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te-IN', label: 'Telugu', native: 'తెలుగు' },
];

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Welcome to AP Tourism! How can I help you today?\n\n(Try asking about Vizag, Tirupati, or Food)",
            sender: 'bot',
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [currentLanguage, setCurrentLanguage] = useState<Language>('en-US');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { isListening, startListening, stopListening, error: speechError } = useSpeechRecognition({
        language: currentLanguage,
        onResult: (text) => {
            setInput(text);
        }
    });

    const { speak, isSpeaking } = useTextToSpeech(currentLanguage);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const detectedLang = detectLanguage(input);
        const finalLang = detectedLang || currentLanguage;

        if (detectedLang && detectedLang !== currentLanguage) {
            setCurrentLanguage(detectedLang);
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await generateResponse(userMessage.text, finalLang);

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
            speak(responseText, finalLang);
        } catch (error) {
            console.error("Error generating response:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className="chat-container">
            {/* Header */}
            <header className="chat-header">
                <div className="header-content">
                    <div className="header-left">
                        <div className="header-icon">
                            <span>🏛️</span>
                        </div>
                        <div>
                            <h1 className="header-title">AP Tourism AI</h1>
                            <p className="header-subtitle">
                                <span>🎤</span> Voice & Text Support
                            </p>
                        </div>
                    </div>

                    <div>
                        <select
                            value={currentLanguage}
                            onChange={(e) => setCurrentLanguage(e.target.value as Language)}
                            className="language-select"
                        >
                            {LANGUAGES.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.native} ({lang.label})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div className="chat-messages">
                <div className="messages-container">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                            <div className={`message-bubble ${msg.sender}`}>
                                <div className="message-text">{msg.text}</div>
                                <div className="message-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="loading-wrapper">
                            <div className="loading-bubble">
                                <div className="loading-dot"></div>
                                <div className="loading-dot"></div>
                                <div className="loading-dot"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="chat-input-area">
                <div className="input-container">
                    <button
                        onClick={toggleListening}
                        className={`mic-button ${isListening ? 'listening' : 'idle'}`}
                        title={isListening ? "Stop Listening" : "Start Listening"}
                    >
                        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>

                    <div className="text-input-wrapper">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={isListening ? "Listening..." : "Type your message..."}
                            className="text-input"
                            rows={1}
                        />
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="send-button"
                    >
                        <Send size={24} />
                    </button>
                </div>

                <div className="status-indicators">
                    <span>{isSpeaking ? "Speaking..." : ""}</span>
                    <span>{speechError ? `Error: ${speechError}` : ""}</span>
                </div>
            </div>
        </div>
    );
};
