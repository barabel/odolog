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

# Unit tests (Vitest, watch: npm run test:watch)
npm test

# Lint + build + test (CI gate)
npm run check
```

All commands run from the monorepo root via npm workspaces. Node `>=22.16.0` (`.nvmrc` pins `v22.16.0`).

**Tests:** Vitest (config `apps/frontend/vitest.config.ts`, `node` env, `@/` alias). Test files sit next to their module as `*.test.ts`. Use explicit imports (`import { describe, it, expect } from 'vitest'`) — `globals` is off, and `tsconfig.app.json` `types` is a closed array (`["vite/client"]`), so global test APIs would not typecheck. Only pure functions are tested (no jsdom/RTL yet).

## Architecture

**Monorepo** (npm workspaces):
- `apps/frontend` — React 19 PWA (Vite + TypeScript + Tailwind CSS)
- `apps/backend` — Node/Express stub, not yet implemented
- `packages/shared` — shared TypeScript types (`@odolog/shared`), used by both apps

**Frontend follows Feature-Sliced Design (FSD).** Dependency rule: layers import only from layers below.

```
src/
  app/        # providers, routing, global styles, layouts
  pages/      # list, analytics, settings
  widgets/    # composite blocks (tabbar, list)
  features/   # add-odometer-entry, add-fuel-entry, sync (planned)
  entities/   # vehicle (active-vehicle store); odometer-entry, fuel-entry (planned)
  shared/
    lib/      # db/ (Dexie/IndexedDB), id.ts (nanoid), popups/ (facade), date/ (formatting)
    ui/       # reusable components (Icon, date-time-input, calendar, time-field, ...)
    config/   # routes.ts
    enums/    # auto-generated icons enum
    helpers/  # array/util helpers
    types/    # common TypeScript types
```

Import direction: `pages` → `widgets` → `features` → `entities` → `shared`.

**Backend (planned) follows Onion Architecture.** Dependency rule: `domain` imports nothing; `application` imports only `domain`; `infrastructure` imports both.

**Path alias:** `@/` maps to `apps/frontend/src/` (configured in Vite + tsconfig).

**Routing:** BrowserRouter (react-router v7). List and analytics are **vehicle-scoped** (`/:vehicleId`, `/:vehicleId/analytics`); settings is **global** (`/settings`, no `vehicleId`). Root `/` redirects (replace) to the active vehicle's list (or first vehicle if none active). Path constants + builders in `shared/config/routes.ts` (`ROUTES.list(id)`, `ROUTES.settings`, `ROUTES.patterns.*`).

**Active Vehicle (state):** Zustand store `useActiveVehicleStore` (`entities/vehicle/store`), persisted to localStorage (`odolog:active-vehicle`), holds `activeVehicleId`. **URL is the source of truth** — all resolve/validate/sync/redirect logic lives in one hook `useVehicleRouting()` (`entities/vehicle`), over the pure function `resolveVehicleRouting({ paramVehicleId, vehicles, activeVehicleId }) → VehicleRoutingState` (`loading | redirect | ready`). The hook does a single `useLiveQuery(db.vehicles.toArray())` and is the **only** store writer (one idempotent sync effect: writes `activeVehicleId` only in `ready` when it differs). Consumers render the directive: `LayoutIndex` (`switch (status)`) and `VehicleRedirect` (root `/`). Active Vehicle is device-local — not part of the sync protocol. See `docs/adr/0001-active-vehicle-url-vs-store.md`. **Zustand** (`zustand` v5) is the app's client-state library.

**Data layer:** Single Dexie DB `odolog` (`shared/lib/db`), v1 with 3 tables: `vehicles`, `odometerEntries`, `fuelEntries`. Field names are **camelCase** (`vehicleId`, `updatedAt`, `deletedAt`). Soft delete via `deletedAt: number | null` (UI filters `deletedAt === null`). On first run the `populate` hook seeds one default vehicle (waits for i18n init). Live data via `useLiveQuery` (dexie-react-hooks). IDs: `genId(size?)` (nanoid, 21 default) for entries, `genVehicleId()` (6-char URL-safe custom alphabet) for vehicles — both in `shared/lib/id.ts`.

**Styling:** Tailwind CSS 4 via `@tailwindcss/vite` plugin. SCSS доступен для edge-cases; кастомные миксины/функции в `assets/styles/lib/`.

- Spacing unit: `--spacing: 0.0625rem` → 1 unit = 1px. `p-12` = 12px, `h-96` = 96px.
- Colors: `black-100`, `blue-100` (#F6F9FE light), `blue-200` (#437AED accent), `gray-100` (#F2F3F5), `white-100`.
- Typography: `.t1` = Onest 16px/400 (defined in `assets/styles/typography.scss` as a Tailwind component).
- Base `<main>` element: `max-width: 375px`, centered — app is designed for mobile viewport width.

**CSS utility:** `classix` (`cx()`) for conditional class merging.

**Icons:** Custom Vite plugin (`apps/frontend/plugins/vite-plugin-icon-sprite.ts`) compiles SVGs from `src/assets/svg/` into `/public/sprite.svg` and auto-generates `shared/enums/icons/index.ts` enum on dev server start and on file changes. To add an icon: drop SVG into `src/assets/svg/`, the enum and sprite regenerate automatically. Icon component renders `<svg><use href="/sprite.svg#name">`.

**Popups:** модальные формы открываются **центрированным попапом** на `@idem.agency/popups-engine` (bottom sheets убраны совсем — `vaul` ломался с клавиатурой, собственный механизм глючил драгом в webview; термин «шит»/«drawer» в проекте не используется). Подключение — одной точкой: `app/providers/popups` (`PopupsEngineProvider` + `PopupsEngineRoot`) оборачивает `<Routes>` в `App.tsx`. Wrapper кастомный (`app/providers/popups/ui/wrapper.tsx`): `RemoveScroll` (декларативный лок скролла фона; `lockBodyScroll`/`enableBodyScroll` либе не передаются) + `motion.div` с `motionVariants` из либы + закрытие по клику вне. Реестр «ключ → компонент» — `widgets/popups` (eager). API — типизированный фасад `shared/lib/popups`: хук `usePopups()` → `openPopup(key, props)` / `closePopup()`, типы пропов попадают в `shared` через declaration merging (`PopupsMap`). Зарегистрированный компонент получает `closePopup` в пропах. Аппаратной «Назад», закрытия по смене роута и дедупа дабл-тапа **нет** — осознанно. См. `docs/adr/0003-popups-instead-of-bottom-sheets.md`.

**Сторонние либы — только через собственную точку входа.** Каждая внешняя библиотека оборачивается в свой модуль-адаптер (`shared/ui/*` для компонентов, `shared/lib/*` для фасадов), и остальной код ходит только через него — прямых импортов либы по проекту нет. Цель — заменить или дополнить либу правкой одного файла. Правило действует и при единственном потребителе: «не абстрагируй под одно использование» здесь не применяется, потому что изолируется не наша логика, а чужой рантайм. Так сделаны `shared/lib/popups` над `@idem.agency/popups-engine`, `shared/ui/calendar` над `react-day-picker`, `shared/ui/time-field` над `timepicker-ui`.

**Дата и время:** ввод `measuredAt` — поле `shared/ui/date-time-input` → попап `widgets/popups/date-time-picker` (календарь + строка времени + «Готово», владеет черновиком `Date`) → модалка циферблата от `timepicker-ui`. Календарь — `react-day-picker@10` (тащит транзитивную `date-fns@4`, границы 01.1900–12.2100, дропдаун месяца/года), циферблат — `timepicker-ui@4.4` в 24h (внешнее кольцо 0-11, внутреннее 12-23), рисует свою модалку в `body` поверх нашего попапа с `backdrop: false` и `enableScrollbar: true`. Обе темизуются переменными (`--rdp-*`, `--tp-*`) в SCSS рядом с обёрткой, не мапой классов. Форматирование — фасад `shared/lib/date` на `Intl`, локаль из `i18next.language`; `date-fns` за пределы `shared/ui/calendar` не выходит. Дефолт `measuredAt` — «сейчас» с обнулёнными секундами, шаг минут 1. Коммит значения — только кнопками, тап по оверлею отменяет. См. `docs/adr/0004-date-time-picker-on-libraries.md`.

**i18n:** `i18next` + `react-i18next`. Initialized before app render (`src/i18n/`); Russian only (`src/locales/ru.json`). Used in DB `populate` hook for default vehicle name.

**Shared package:** `@odolog/shared` (`packages/shared`) — shared TypeScript types imported by both apps: `TVehicles`, `TOdometerEntries`, `TFuelEntries`.

**Global types** (no import needed, declared in `src/global.d.ts`):
- `FCClass<P>` — React FC with optional `className` + `children` props.
- `GetElementTypeFromArray<T>` — extracts element type from array type.

## Current state (Phase 1 in progress)

- DB schema (3 tables) + default vehicle: done
- Routing (vehicle-scoped list/analytics + global settings) + tabbar + active-vehicle store: done (Analytics, Settings are stubs)
- List widget (`widgets/list`): in progress
- Popup mechanism (`popups-engine`): in progress (migration from own bottom-sheet mechanism)
- Date/time picker (calendar + clock face): decided, not yet implemented (ADR 0004) — replaces the `react-mobile-picker` wheel in `shared/ui/date-picker`
- Forms (odometer/fuel popups), FAB speed-dial: not yet implemented

Phase tracking and full UI spec live in `docs/plan.md`. Architectural decisions in `docs/adr/`.

## Domain

Read `CONTEXT.md` for domain language (Vehicle, OdometerEntry, FuelEntry, Mileage, Consumption, Sync, Active Vehicle) and sync protocol details (nanoid client-side IDs, `synced` flag, `updatedAt` last-write-wins conflict resolution, `deletedAt` soft delete).

---

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
