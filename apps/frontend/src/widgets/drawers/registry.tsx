import type { DrawerRegistry } from '@/shared/lib/drawer';
import { Sheet1 } from './sheet-1/ui';

export const registry = {
  'sheet-1': {
    component: Sheet1,
  },
} satisfies DrawerRegistry;

// Расширяем карту ключей в shared — `openDrawer(key)` автодополняется и ловит
// опечатку на компиляции (dependency rule: widgets знает про shared).
declare module '@/shared/lib/drawer' {
  interface DrawerRegistryMap {
    'sheet-1': true;
  }
}
