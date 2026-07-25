import type { TSheetRegistry } from '@/shared/lib/bottom-sheet';
import type { TPopupsRegistry } from '@/shared/lib/popups';
import { PopupFuel } from './fuel';
import { PopupOdometer } from './odometer';

declare module '@/shared/lib/bottom-sheet' {
  interface SheetRegistryMap {
    fuel: undefined;
  }
}

declare module '@/shared/lib/popups' {
  interface PopupsMap {
    odometer: undefined;
  }
}

export const sheetRegistry = {
  fuel: PopupFuel,
} satisfies TSheetRegistry;

export const popupsRegistry = {
  odometer: PopupOdometer,
} satisfies TPopupsRegistry;
