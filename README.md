# AP Tourism AI Chatbot

Multi-language tourism chatbot for Andhra Pradesh with AI-powered responses.

## Project Structure

```
tourism/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express backend with OpenAI
│   ├── server.js
│   └── package.json
└── .env              # API keys
```

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node server.js
```

## Features

- 🗣️ Voice input/output in English, Hindi, Telugu
- 💬 Text chat with AI responses
- 🌐 Language auto-detection
- 🎨 AP Tourism themed UI
- 🤖 OpenAI/ChatGPT powered responses

## Environment Variables

Create `.env` in root with:
```
VITE_OPENAI_API_KEY=your_openai_api_key
```

## Running the App

1. Start backend: `cd backend && node server.js`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173
