# Hooksmith
### Write. Shape. Release.

The missing layer between your idea and Suno.

---

## Deploy to Vercel (5 minutes)

### 1. Get the code onto GitHub

- Create a new repository on GitHub
- Upload all these files (drag and drop the folder works)
- Or use Git:
  ```
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/hooksmith.git
  git push -u origin main
  ```

### 2. Deploy on Vercel

- Go to [vercel.com](https://vercel.com) and sign in with GitHub
- Click **Add New Project**
- Import your `hooksmith` repository
- Vercel auto-detects Vite — no config needed

### 3. Add your API key

- In your Vercel project, go to **Settings → Environment Variables**
- Add: `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
- Click **Save**
- Go to **Deployments** and click **Redeploy**

### 4. You're live

Your app is at `https://hooksmith.vercel.app` (or your custom domain).

---

## Local development

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

App runs at `http://localhost:5173`

---

## Project structure

```
hooksmith/
├── api/
│   └── claude.js          # Vercel serverless proxy — keeps API key secure
├── public/
│   └── index.html         # Landing page (served at /)
├── src/
│   ├── main.jsx           # React entry point
│   └── App.jsx            # Main Hooksmith app
├── index.html             # Vite entry point (app shell)
├── vercel.json            # Routing config
├── vite.config.js         # Build config
└── package.json
```

## How routing works

- `/` → Landing page (`public/index.html`)
- `/app` → Hooksmith React app
- `/api/claude` → Serverless proxy to Anthropic API

## Adding an email service

In `public/index.html`, find `handleSignup()` and replace the TODO with your endpoint:

**Mailchimp:**
```js
await fetch('https://YOUR_MAILCHIMP_ENDPOINT', {
  method: 'POST',
  body: new URLSearchParams({ EMAIL: email })
});
```

**ConvertKit:**
```js
await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ api_key: 'YOUR_KEY', email })
});
```

---

Built with React + Vite. Deployed on Vercel.
