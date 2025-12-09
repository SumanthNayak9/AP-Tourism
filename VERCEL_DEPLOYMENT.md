# Vercel Deployment Guide

## Your Tech Stack

**Frontend:**
- Framework: **Vite**
- React: 19.2.0
- TypeScript: 5.9.3
- Build Output: `dist/`

**Backend:**
- Framework: **Express.js**
- Runtime: Node.js
- Entry: `server.js`

---

## Deployment Option 1: Frontend Only (Easiest)

This deploys only the frontend to Vercel. Backend runs separately.

### Steps:

1. **Push to GitHub first** (if not done)
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_OPENAI_API_KEY` = your OpenAI API key

5. **Deploy Backend Separately** (Choose one):
   - **Render**: https://render.com (Free tier available)
   - **Railway**: https://railway.app
   - **Fly.io**: https://fly.io
   - **Heroku**: https://heroku.com

6. **Update Frontend API URL**
   - After backend is deployed, update your frontend code
   - Change API endpoint from `http://localhost:3000` to your backend URL

---

## Deployment Option 2: Full-Stack on Vercel

Deploy both frontend and backend together.

### Prerequisites:
- A `vercel.json` file (already created for you)
- GitHub repository pushed

### Steps:

1. **Push to GitHub**
   ```bash
   git add vercel.json VERCEL_DEPLOYMENT.md
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect the configuration

3. **Add Environment Variables**
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add: `VITE_OPENAI_API_KEY` = your OpenAI API key
   - Add for: Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Important Notes:
- Backend will run as serverless functions
- API routes will be at `/api/*`
- Frontend will be served from root `/`

---

## Recommended Approach: Split Deployment

For better performance and easier maintenance:

### Frontend → Vercel
- Fast CDN delivery
- Automatic HTTPS
- Easy rollbacks

### Backend → Render/Railway
- Always-on server (not serverless)
- Better for persistent connections
- Free tier available

---

## Quick Answer for Vercel Form

When Vercel asks for framework:

**Framework Preset**: `Vite`

**Root Directory**: `frontend` (if deploying frontend only)

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
- `VITE_OPENAI_API_KEY` = your_openai_api_key_here

---

## After Deployment

1. **Test your deployed site**
2. **Update API endpoints** if backend is on different server
3. **Check environment variables** are loaded correctly
4. **Monitor build logs** for any errors

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
