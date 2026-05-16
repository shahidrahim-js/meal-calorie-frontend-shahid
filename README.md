Meal Calorie Count Generator

## Getting Started

First, run the development server:

# Setup

```bash
npm install
npm run dev
```

# Environment

NEXT_PUBLIC_API_BASE_URL=...

# Features

- Authentication
- JWT persistence
- Protected routes
- Calorie Search
- Meal History
- Dark mode
- Responsive UI

# UI Flow

-   / [Home Page]
   ↓
- /register or /login [Register/Login Page]
   ↓
- /dashboard  [Dashboard Page]
   ↓
- /calories  [Calories Page]
   ↓
- Result Card  [On Calories Page]
   ↓
- History Saved [On Dashboard Page]

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Decisions

- Zustand for lightweight global state
- App Router for SSR support
- Tailwind
- shadcn/ui
- React hook form
- Zod for schema validation

## Deploy on Vercel

Deployed on Vercel
[Click Here To See](https://meal-calorie-frontend-shahid-pi.vercel.app/)
