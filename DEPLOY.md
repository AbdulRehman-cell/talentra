# Deploy Talentra to Render in Under 5 Minutes

## Prerequisites
- A [Render](https://render.com) account (free to sign up)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) free cluster (or any reachable MongoDB URI)
- This repo pushed to GitHub

## Step 1 — Add a health check endpoint (if not already present)
Ensure `server/index.js` has this route (required by Docker healthcheck & Render):

```js
app.get("/healthz", (req, res) => res.status(200).json({ status: "ok" }));
```

## Step 2 — Push your code to GitHub

```bash
git add .
git commit -m "Add production deployment configs"
git push origin main
```

## Step 3 — Create the Render service via Blueprint

```bash
# In Render dashboard:
# 1. Click "New +" -> "Blueprint"
# 2. Connect your GitHub repo
# 3. Render auto-detects render.yaml in this repo
```

Render will read `render.yaml`, build the Dockerfile, and create the web service automatically.

## Step 4 — Set required secrets in Render dashboard

Go to your service → **Environment** tab and add:

| Key | Value |
|---|---|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `CORS_ORIGIN` | Your Render app URL, e.g. `https://talentra.onrender.com` |

## Step 5 — (Optional) Enable auto-deploy via GitHub Actions

1. In Render, go to your service → **Settings** → **Deploy Hook**, copy the URL.
2. In GitHub repo → **Settings** → **Secrets and variables** → **Actions**, add:
   - `RENDER_DEPLOY_HOOK_URL` = the copied URL

Now every push to `main` runs tests and triggers a Render deploy automatically.

## Step 6 — Verify deployment

```bash
curl https://talentra.onrender.com/healthz
# Expect: {"status":"ok"}
```

## Local testing with Docker Compose (optional, before deploying)

```bash
docker compose up --build
curl http://localhost:3000/healthz
```

That's it — you're live. 🎉