# Odolog — контекст проекта

Приложение для учёта пробега и расхода топлива. Замена связки Telegram + Google Sheets.
Работает офлайн (PWA), синхронизируется с VPS-сервером.

---

## Доменный язык

| Термин | Значение |
|--------|----------|
| **Vehicle** | Автомобиль. У пользователя может быть несколько. |
| **Odometer entry** | Запись показания одометра. Одна в день, на любую дату. |
| **Fuel entry** | Запись заправки: одометр на момент заправки, литры, общая стоимость. |
| **Mileage** | Пробег — разница одометра между двумя соседними записями. |
| **Consumption** | Расход топлива л/100км — считается между двумя заправками. |
| **Sync** | Двусторонняя синхронизация локальной IndexedDB с сервером. |
| **Active Vehicle** | Текущая выбранная машина — на какую возвращается навигация с глобальных экранов. Device-local, не синкается. |

---

## Архитектура фронтенда — FSD

[Feature-Sliced Design](https://feature-sliced.design/)

```
src/
  app/        # провайдеры, роутинг, глобальные стили
  pages/      # страницы (dashboard, history, analytics)
  widgets/    # составные блоки (entry-list, sync-status-bar)
  features/   # фичи (add-odometer-entry, add-fuel-entry, sync)
  entities/   # сущности (vehicle, odometer-entry, fuel-entry)
  shared/
    lib/      # db.ts (Dexie), api.ts (fetch-клиент), uuid.ts
    ui/       # переиспользуемые компоненты
    types/    # общие TypeScript типы
```

Правило зависимостей: слои импортируют только из слоёв ниже себя.
`features` → `entities` → `shared`. `pages` → `widgets` → `features`.

---

## Архитектура бэкенда — Onion

```
src/
  domain/
    entities/       # Vehicle, OdometerEntry, FuelEntry (чистые TS-типы)
    repositories/   # интерфейсы IVehicleRepository, IOdometerRepository, IFuelRepository
  application/
    use-cases/      # AddOdometerEntry, AddFuelEntry, SyncEntries, ...
  infrastructure/
    db/             # SQLite-реализации репозиториев (better-sqlite3)
    http/           # Express роуты, JWT middleware
    auth/           # login, токены
```

Правило зависимостей: `domain` ничего не импортирует.
`application` импортирует только `domain`.
`infrastructure` импортирует `application` и `domain`.

---

## Синхронизация

- Каждая запись имеет `id` (nanoid, генерируется на клиенте: записи — 21 симв, машины — 6 симв для URL) и `updatedAt` (timestamp ms)
- Локальный флаг `synced: boolean`
- Мягкое удаление: `deletedAt: number | null` — при удалении выставляется timestamp, UI фильтрует `deletedAt === null`; позволяет синкать удаления на сервер
- Push: отправляем все записи с `synced = false`
- Pull: тянем с сервера всё новее `lastSyncAt`
- Конфликт по `id`: побеждает запись с бо́льшим `updatedAt`
