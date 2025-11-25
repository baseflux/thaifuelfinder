# THAI FuelFind

Mobile-first web dashboard for comparing real-time Thai fuel prices. Built with React + Vite + Tailwind, data modeled after the specs in `thai-fuelfind-complete-spec.md`, and Firebase scripts for uploading station snapshots.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:4173 by running the dev server with `npm run dev -- --host 0.0.0.0 --port 4173` (handy for remote demos). Use `npm run build` to produce the optimized bundle and `npm run preview` to verify it locally.

## Environment & Secrets

Copy `.env.example` to `.env.local` and `secrets.example.txt` to `secrets.txt`, then set:

- `APP_ID` – Firestore namespace for the seeding script.
- `GOOGLE_APPLICATION_CREDENTIALS` – path to your Firebase Admin SDK key.
- `VITE_*` variables – client-side Firebase + map keys referenced by the UI.

All sensitive files remain ignored through `.gitignore`.

## Project Layout

```
src/
  components/        // future UI modules (map, controls, modals)
  data/              // seed data for scripts & demos
  types/             // shared TS contracts
  utils/             // price validation helpers + tests
scripts/seedStations.ts // dry-run friendly Firestore seeder
```

Run `npm run test` (Vitest) for utilities like `validatePrice`. Tailwind configuration lives in `tailwind.config.js`, and PostCSS plugins are declared in `postcss.config.js`.

See `AGENTS.md` for collaboration guidelines and `thai-fuelfind-complete-spec.md` for the long-form architecture. EOF