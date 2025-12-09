# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `tourism` or `ap-tourism-chatbot`
3. Description: "AI-powered tourism chatbot for Andhra Pradesh with multi-language support"
4. Choose Public or Private
5. **DO NOT** check "Initialize with README" (we already have one)
6. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, run these commands in your terminal:

```bash
# Navigate to project directory
cd d:\Sumanth\tourism

# Add GitHub remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/tourism.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md will be displayed on the repository homepage

## Important Notes

✅ Your `.env` file with API keys is **NOT** uploaded (protected by `.gitignore`)
✅ `node_modules` folders are **NOT** uploaded (protected by `.gitignore`)
✅ Anyone cloning your repo will need to create their own `.env` file

## For Future Updates

After making changes to your code:

```bash
git add .
git commit -m "Describe your changes here"
git push
```

## Setting Up on Another Machine

If someone (or you) wants to clone this project:

```bash
git clone https://github.com/YOUR_USERNAME/tourism.git
cd tourism

# Create .env file with your API key
echo VITE_OPENAI_API_KEY=your_key_here > .env

# Install and run
cd backend && npm install
cd ../frontend && npm install
```
