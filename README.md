# 🌏 Andhra Pradesh Tourism AI Chatbot

An intelligent, AI-powered tourism chatbot for Andhra Pradesh featuring multi-language support, voice interactions, and real-time AI responses powered by OpenAI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## ✨ Features

- 🗣️ **Voice Input/Output** - Speak and listen in English, Hindi, and Telugu
- 💬 **AI-Powered Chat** - Intelligent responses using OpenAI/ChatGPT
- 🌐 **Language Auto-Detection** - Automatic language detection and translation
- 🎨 **Beautiful UI** - Modern, responsive design themed for AP Tourism
- 🚀 **Real-time Responses** - Fast, contextual answers about Andhra Pradesh tourism

## 📁 Project Structure

```
tourism/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── backend/           # Express.js API server
│   ├── server.js      # Main server file with OpenAI integration
│   └── package.json
├── .env               # Environment variables (not committed)
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tourism.git
   cd tourism
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the **root directory**:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   > ⚠️ **Important**: Never commit your `.env` file! It's already in `.gitignore`.

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

You'll need **two terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3000`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key for AI chat functionality | Yes |

### Getting an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- OpenAI API
- CORS

## 📝 Development

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
# Backend runs as-is in production
node server.js
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👏 Acknowledgments

- Powered by OpenAI
- Tourism data for Andhra Pradesh
- Voice synthesis using Web Speech API
