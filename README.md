# mern-blog

A modular MERN (MongoDB, Express, React, Node) blog application scaffold with Firebase storage and authentication helpers. This repository contains an Express API server under `api/` and a React + Vite frontend under `client/`.

## Key features

- RESTful Express API (MVC-like controllers, Mongoose models)
- React 18 + Vite frontend with React Router v6
- Redux Toolkit + Redux Persist for client state
- Firebase used for storage (images) and optional authentication helpers
- Testing setup: Vitest + React Testing Library for client, Jest/Supertest scaffolding for backend
- Dashboard for users with profile, posts and comments management

## Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React, Vite, Redux Toolkit, Tailwind CSS (Flowbite UI components)
- Storage / auth helpers: Firebase (Storage & Auth)
- Testing: Vitest, @testing-library/react, Jest (backend scaffolding), Supertest

---

## Quickstart (development)

Prerequisites

- Node.js >= 18
- npm
- MongoDB (local or MongoDB Atlas)

Environment

Create a `.env` file in the `api/` folder (or set environment variables) with at least the following:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

For the client, create a `.env` (or set environment variables) at `client/.env` or use Vite `env` variables:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_DEFAULT_IMAGE_URL=https://example.com/default.png
```

Install dependencies and run both server and client locally:

```bash
# from repo root: install server deps
npm install

# install client deps
cd client
npm install

# start backend (in repo root)
npm run dev

# start frontend (in client/)
cd client
npm run dev
```

Open the client at http://localhost:5173 (Vite default) and the API at http://localhost:3000.

---

## Scripts

Top-level scripts (run from repo root):

- `npm run dev` - start the API server with nodemon
- `npm run start` - run both server and client (composed script)
- `npm run build` - build the client
- `npm run test` - run frontend tests (Vitest)
- `npm run test:backend` - run backend jest tests (if configured)

Client scripts (from `client/`):

- `npm run dev` - start Vite dev server
- `npm run build` - build production bundle
- `npm run test` - run Vitest

---

## Testing

- Frontend: Vitest + React Testing Library. Tests live near features under `client/src/features/**/test/`.
- Backend: Jest + Supertest scaffolding is in `api/tests/` — you should wire test DB or mocks for real integration tests.

Run frontend tests:

```bash
cd client
npm run test
```

Run backend tests (after installing dev deps):

```bash
npm run test:backend
```

---

## Environment & Secrets

Keep secrets out of the repository. The app expects environment variables for MongoDB and Firebase. Example variables:

- `MONGO_URI` — MongoDB connection string.
- `JWT_SECRET` — secret used to sign JWT tokens.
- `VITE_FIREBASE_API_KEY` — Firebase API key for client usage.
- `VITE_DEFAULT_IMAGE_URL` — default avatar URL.

If you use GitHub Actions, provide these as repository secrets in the project settings.

---

## Folder structure (high level)

```
api/                # Express API (controllers, models, routes, utils)
client/             # React + Vite frontend
  src/
    features/       # feature-based code (auth, posts, dashboard, etc.)
    shared/         # shared components and hooks
    assets/
README.md
package.json        # top-level scripts
```

---

## Production & Deployment

Typical deployment options:

- Frontend: Vercel or Netlify (deploy `client/dist` after `npm run build`). If using Vite SSR, adjust accordingly.
- Backend: Heroku, Render, Railway, or a container (Docker). Ensure `MONGO_URI` and `JWT_SECRET` are configured in the hosting environment.

Example (Heroku/Render):

1. Build client and serve with a static server or configure separate deployments for frontend and backend.
2. Set environment variables on the host.
3. Use a managed MongoDB (Atlas) and set the connection string in `MONGO_URI`.

---

## Contributing

PRs welcome. A suggested workflow:

1. Fork the repo and create a feature branch `feat/short-description` or `fix/short-description`.
2. Run tests and lint before opening a PR.
3. Use clear Conventional Commit messages (e.g. `feat(auth): add forgot-password`).

---

## Maintainer

Enes Özdemir (GitHub: `enessozdemir`)


