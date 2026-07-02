import type { DrawerRegistry } from '@/shared/lib/drawer';
import { Sheet1 } from './sheet-1/ui';
import { Sheet2 } from './sheet-2/ui';

export const registry = {
  'sheet-1': {
    component: Sheet1,
  },
  'sheet-2': {
    component: Sheet2,
  },
} satisfies DrawerRegistry;

// Расширяем карту ключей в shared — `openDrawer(key)` автодополняется и ловит
// опечатку на компиляции (dependency rule: widgets знает про shared).
declare module '@/shared/lib/drawer' {
  interface DrawerRegistryMap {
    'sheet-1': true;
    'sheet-2': true;
  }
}
