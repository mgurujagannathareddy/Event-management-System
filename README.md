# Event Manager

Event Manager is a React/Vite frontend with an Express API and MongoDB database.

## Deploying on Render

Deploy the frontend and API as separate Render services from this repository.

### 1. Create the backend web service

In the Render dashboard, choose **New > Web Service**, connect this GitHub repository and select the branch to deploy. Configure:

- **Root Directory:** `backend`
- **Build Command:** `npm ci`
- **Start Command:** `npm start`
- **Health Check Path:** `/`

Add these environment variables in the service's **Environment** settings:

| Key | Value |
| --- | --- |
| `MONGO_URI` | Your MongoDB Atlas connection URI |
| `JWT_SECRET` | A randomly generated secret with at least 32 characters |
| `FRONTEND_URL` | Set after creating the frontend, to its exact `https://...onrender.com` origin |
| `NODE_ENV` | `production` |

Render supplies `PORT`; do not hard-code it. To create a strong JWT secret locally, run `openssl rand -base64 48` and paste the result into Render's environment settings. Do not commit secrets or put them in the frontend environment.

In MongoDB Atlas, add Render's outbound IP addresses to the database network access list, or use Atlas's broad `0.0.0.0/0` rule only if you accept that it permits connection attempts from any IP and use a strong database password. Create a database user with only the access the app needs. URL-encode special characters in the password before including it in the URI.

Wait for the backend deploy to complete and copy its service URL, for example `https://event-manager-api.onrender.com`.

### 2. Create the frontend static site

Choose **New > Static Site**, connect the same repository and branch, then configure:

- **Root Directory:** `frontend`
- **Build Command:** `npm ci && npm run build`
- **Publish Directory:** `dist`

Add this environment variable before the first build:

| Key | Value |
| --- | --- |
| `VITE_API_URL` | The backend service origin copied above, with no trailing slash or `/api` path |

Add a rewrite in the static site's **Redirects/Rewrites** settings so browser refreshes work on nested React routes:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | Rewrite |

Deploy the site and copy its `https://...onrender.com` URL.

### 3. Allow the deployed frontend in the API

Return to the backend web service, set `FRONTEND_URL` to the exact frontend origin (scheme and hostname only, no trailing slash or route), then save and redeploy. For example, use `https://event-manager-frontend.onrender.com`.

When changing `VITE_API_URL`, trigger a new static-site build because Vite embeds this variable in the generated frontend bundle.

### 4. Verify

- Open `<backend-url>/` and confirm it responds that the backend is running.
- Open the frontend URL, register an account, sign in, and try loading the events page.
- Submit the contact form and confirm the inquiry is stored in MongoDB.
- Event create, update, and delete actions require a signed-in user.

Render's free web services may sleep when idle, so the first API request after inactivity can take longer. Static sites remain available.

## Local development

1. Install backend packages: `cd backend && npm ci`.
2. Copy `backend/.env.example` to `backend/.env`, then set a working `MONGO_URI` and a unique `JWT_SECRET` (at least 32 characters).
3. Start the backend with `cd backend && npm run dev`.
4. In another terminal, install frontend packages with `cd frontend && npm ci`, then run `npm run dev`.

Vite proxies local `/api` requests to `http://localhost:5000`. The frontend lint and production build checks are `npm run lint --prefix frontend` and `npm run build --prefix frontend`.
