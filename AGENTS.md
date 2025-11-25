# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/` with feature-focused folders (components, hooks, services, utils, data). Keep Firebase configs in `src/config/`, TypeScript contracts in `src/types/`, and vitest suites under `src/**/__tests__/`. Use `scripts/` for operational tooling such as `seedStations.ts`, and place design docs plus specs (for example `thai-fuelfind-complete-spec.md`) at repo root for easy reference.

## Build, Test, and Development Commands
Use `npm run dev` for the Vite dev server with hot reload, and `npm run build` to emit the production bundle in `dist/`. Validate the bundle locally via `npm run preview`. Run unit tests headless with `npm run test` (Vitest) or in watch/UI mode with `npx vitest --ui`. To sync mock station data into Firestore, run `node scripts/seedStations.ts --dry-run` first, then remove `--dry-run` once the output looks correct.

## Coding Style & Naming Conventions
Write React components in TypeScript using functional components and hooks. Favor 2-space indentation, single quotes for strings, and trailing commas. File names should be camelCase for utilities (`priceValidation.ts`), PascalCase for components (`MapView.tsx`), and kebab-case for assets. Keep Tailwind classes declarative and grouped by layout → color → typography. Run your formatter (Prettier via editor) before committing.

## Testing Guidelines
Vitest is the primary framework; create files ending in `.test.ts` adjacent to the code under test or inside a sibling `__tests__` directory. Mock Firebase and Leaflet dependencies with lightweight factories. Ensure any price or validation change extends `src/utils/__tests__/priceValidation.test.ts` with boundary cases. Target >80% coverage for utility-heavy files and document any intentional exclusions in the PR description.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`, etc.) so release scripts can auto-generate changelogs later. Each PR must include a short summary, screenshots for UI-facing tweaks, steps for manual verification, and links to related issues or the spec sections it implements. Keep PRs scoped to one feature or fix; large cross-cutting updates should be broken into orchestrated agent-sized chunks.

## Security & Configuration Tips
Never commit `.env.local`, `secrets.txt`, or Firestore service keys; copy from `secrets.example.txt` instead. The seeding script reads `APP_ID` and `GOOGLE_APPLICATION_CREDENTIALS`, so verify those paths before running. When touching agent modules (e.g., trust or backup agents), document any new Firestore rules or IAM requirements alongside the code.
