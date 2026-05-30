# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server (frontend only)
npm run dev:front

# Typecheck + build
npm run build

# Lint
npm run lint

# Both (CI gate)
npm run check
```

All commands run from the monorepo root via npm workspaces.

## Architecture

**Monorepo** (npm workspaces):
- `apps/frontend` — React 19 PWA (Vite + TypeScript + Tailwind CSS)
- `apps/backend` — Node/Express stub, not yet implemented
- `packages/shared` — shared TypeScript types used by both apps

**Frontend follows Feature-Sliced Design (FSD).** Dependency rule: layers import only from layers below.

```
src/
  app/        # providers, routing, global styles
  pages/      # dashboard, history, analytics
  widgets/    # composite blocks (entry-list, sync-status-bar)
  features/   # add-odometer-entry, add-fuel-entry, sync
  entities/   # vehicle, odometer-entry, fuel-entry
  shared/
    lib/      # db.ts (Dexie/IndexedDB), api.ts (fetch client), uuid.ts
    ui/       # reusable components
    types/    # common TypeScript types
```

Import direction: `pages` → `widgets` → `features` → `entities` → `shared`.

**Backend (planned) follows Onion Architecture.** Dependency rule: `domain` imports nothing; `application` imports only `domain`; `infrastructure` imports both.

**Path alias:** `@/` maps to `apps/frontend/src/` (configured in Vite + tsconfig).

**Routing:** HashRouter (react-router v7). Routes defined in `shared/config/routes.ts`.

**Styling:** Tailwind CSS 4 via `@tailwindcss/vite` plugin. Sass available for edge cases.

**CSS utility:** `classix` (`cx()`) for conditional class merging.

## Domain

Read `CONTEXT.md` for domain language (Vehicle, OdometerEntry, FuelEntry, Mileage, Consumption, Sync) and sync protocol details (UUID client-side IDs, `updated_at` conflict resolution).

---

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
