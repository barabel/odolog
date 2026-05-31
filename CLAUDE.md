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
- `packages/shared` — shared TypeScript types (`@odolog/shared`), used by both apps

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

**Routing:** BrowserRouter (react-router v7). Route path constants in `shared/config/routes.ts`.

**Styling:** Tailwind CSS 4 via `@tailwindcss/vite` plugin. SCSS доступен для edge-cases; кастомные миксины/функции в `assets/styles/lib/`.

- Spacing unit: `--spacing: 0.0625rem` → 1 unit = 1px. `p-12` = 12px, `h-96` = 96px.
- Colors: `black-100`, `blue-100` (#F6F9FE light), `blue-200` (#437AED accent), `gray-100` (#F2F3F5), `white-100`.
- Typography: `.t1` = Onest 16px/400 (defined in `assets/styles/typography.scss` as a Tailwind component).
- Base `<main>` element: `max-width: 375px`, centered — app is designed for mobile viewport width.

**CSS utility:** `classix` (`cx()`) for conditional class merging.

**Icons:** Custom Vite plugin (`apps/frontend/plugins/vite-plugin-icon-sprite.ts`) compiles SVGs from `src/assets/svg/` into `/public/sprite.svg` and auto-generates `shared/enums/icons/index.ts` enum on dev server start and on file changes. To add an icon: drop SVG into `src/assets/svg/`, the enum and sprite regenerate automatically. Icon component renders `<svg><use href="/sprite.svg#name">`.

**i18n:** `i18next` + `react-i18next`. Initialized before app render (`src/i18n/`); Russian only (`src/locales/ru.json`). Used in DB `populate` hook for default vehicle name.

**Shared package:** `@odolog/shared` (`packages/shared`) — shared TypeScript types imported by both apps. Currently contains `TVehicles`.

**Global types** (no import needed, declared in `src/global.d.ts`):
- `FCClass<P>` — React FC with optional `className` + `children` props.
- `GetElementTypeFromArray<T>` — extracts element type from array type.

## Current state (Phase 1 in progress)

- DB schema + default vehicle: done
- Routing + tabbar: done (Analytics, Settings are stubs)
- List page, forms, FAB speed-dial: not yet implemented

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
