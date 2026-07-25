import type { TSheetRegistry } from '@/shared/lib/bottom-sheet';
import { PopupFuel } from './fuel';
import { PopupOdometer } from './odometer';

declare module '@/shared/lib/bottom-sheet' {
  interface SheetRegistryMap {
    odometer: undefined;
    fuel: undefined;
  }
}

export const sheetRegistry = {
  odometer: PopupOdometer,
  fuel: PopupFuel,
} satisfies TSheetRegistry;
