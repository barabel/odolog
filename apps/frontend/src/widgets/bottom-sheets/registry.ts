import type { TSheetRegistry } from '@/shared/lib/bottom-sheet';
import { BottomSheetFuel } from './fuel';
import { BottomSheetOdometer } from './odometer';

declare module '@/shared/lib/bottom-sheet' {
  interface SheetRegistryMap {
    odometer: undefined;
    fuel: undefined;
  }
}

export const sheetRegistry = {
  odometer: BottomSheetOdometer,
  fuel: BottomSheetFuel,
} satisfies TSheetRegistry;
