import type { DrawerRegistry } from '@/shared/lib/drawer';
import { DrawerOdometer } from './odometer';
import { DrawerFuel } from './fuel';

export const registry = {
  odometer: {
    component: DrawerOdometer,
  },
  fuel: {
    component: DrawerFuel,
  },
} satisfies DrawerRegistry;

// Расширяем карту ключей в shared — `openDrawer(key)` автодополняется и ловит
// опечатку на компиляции (dependency rule: widgets знает про shared).
declare module '@/shared/lib/drawer' {
  interface DrawerRegistryMap {
    odometer: true;
    fuel: true;
  }
}
