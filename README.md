# 🏥 RIZEN CARE — AI Health Assistant Platform

A complete, production-quality full-stack AI healthcare platform built with React 18, Vite, Tailwind CSS, and Node.js Express.

![RIZEN CARE](https://img.shields.io/badge/RIZEN-CARE-00E5FF?style=for-the-badge&labelColor=07090E)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&labelColor=07090E)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&labelColor=07090E)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&labelColor=07090E)

---

## ✨ Features

- 🤖 **Multi-AI Provider Cascading**: Google Gemini → OpenRouter → Groq → Built-in Fallback Engine
- 🎙️ **Voice Interface**: Speech-to-Text (STT) + Text-to-Speech (TTS) in 6 Indian languages
- 🌐 **Multilingual**: English, Hindi, Bengali, Tamil, Telugu, Marathi
- 🩺 **15 Clinical AI Tools**: Symptom Checker, Problem→Medicine, Lab Report OCR, Diet Planner, Wellness Tracker, Emergency SOS & more
- 🛠️ **Create Custom Tools**: Build your own specialized health assessment calculators
- 📄 **Report Upload & AI Cross-Analysis**: Upload PDF / JPG / PNG medical documents for correlation
- 📊 **PDF Export**: Download any AI-generated clinical output
- ☀️/🌙 **Day / Night Mode**: Full light and dark theme toggle
- 📍 **Live Location**: GPS auto-detect + city name search + PIN code lookup
- 📱 **Responsive**: Mobile-first design with animated 3D hologram anatomy visualization

---

## 🚀 Deploying on Vercel

### Frontend (Recommended — One-Click Deploy)

1. Fork / clone this repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import this GitHub repository
4. Set **Root Directory** → `frontend`
5. Vercel auto-detects **Vite** framework — no extra settings needed
6. Add environment variable:
   | Variable | Value |
   |---|---|
   | `VITE_API_URL` | Your backend URL (e.g., `https://rizen-care-api.vercel.app`) |
7. Click **Deploy**

### Backend (Vercel Serverless Functions)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import the same GitHub repository
3. Set **Root Directory** → `backend`
4. Add environment variables:
   | Variable | Description |
   |---|---|
   | `GEMINI_API_KEY` | Google Gemini API key (optional — fallback engine works without it) |
   | `OPENROUTER_API_KEY` | OpenRouter API key (optional) |
   | `GROQ_API_KEY` | Groq API key (optional) |
   | `ALLOWED_ORIGINS` | Your frontend Vercel URL |
5. Click **Deploy**

> **Note**: The platform is fully functional without any API keys thanks to the built-in multilingual fallback medical knowledge engine.

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ (or use the bundled portable Node.js)
- npm 9+

### Setup

```bash
# Clone
git clone https://github.com/princeraj957216-oss/rizenaicare.git
cd rizenaicare

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Configure environment (optional — fallback engine works without API keys)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Edit the .env files with your API keys
```

### Start Development Servers

```bash
# Start Backend (http://localhost:5000)
cd backend && node index.js

# Start Frontend (http://localhost:5173)  — in a new terminal
cd frontend && npm run dev
```

---

## 📁 Project Structure

```
rizenaicare/
├── frontend/                    # React 18 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/          # Layout, Common, Widget components
│   │   │   ├── layout/          # Sidebar, Header, RightPanel, MobileNav
│   │   │   └── common/          # HologramAnatomy, LocationModal, ReportUploadCard, AllToolsModal
│   │   ├── context/             # ThemeContext, LanguageContext, LocationContext, VoiceContext
│   │   ├── pages/               # 17 full pages (Dashboard, AI Chat, Tools, etc.)
│   │   ├── services/            # api.js, pdfGenerator.js, speechService.js
│   │   ├── locales/             # en, hi, bn, ta, te, mr translations
│   │   └── data/                # Mock doctors, hospitals, medicines, lab tests
│   ├── vercel.json              # Vercel SPA routing config
│   └── vite.config.js
│
├── backend/                     # Node.js + Express REST API
│   ├── providers/               # Gemini, OpenRouter, Groq, FallbackKnowledgeEngine
│   ├── services/                # AI orchestration + Report analysis
│   ├── controllers/             # AI + Medical + Health controllers
│   ├── routes/                  # /api/* route definitions
│   ├── middleware/              # Rate limiter, Multer upload, Error handler
│   ├── vercel.json              # Vercel serverless config
│   └── index.js                 # Express server entry point
│
└── README.md
```

---

## 🔑 AI API Keys (All Optional)

| Provider | Get Key | Cost |
|---|---|---|
| Google Gemini | [aistudio.google.com](https://aistudio.google.com) | Free tier available |
| OpenRouter | [openrouter.ai](https://openrouter.ai) | Pay per use |
| Groq | [console.groq.com](https://console.groq.com) | Free tier available |

> The platform includes a **built-in offline medical intelligence engine** and works without any API keys.

---

## ⚠️ Medical Disclaimer

RIZEN CARE is an educational healthcare information platform. It does **not** provide formal medical diagnosis, prescription generation, or replace in-person clinical consultation. Always consult a licensed physician for medical decisions.

---

## 📜 License

MIT License — Free to use, fork, and deploy.
