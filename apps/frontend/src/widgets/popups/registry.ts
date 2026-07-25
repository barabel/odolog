import type { TPopupsRegistry } from '@/shared/lib/popups';
import { PopupFuel } from './fuel';
import { PopupOdometer } from './odometer';

declare module '@/shared/lib/popups' {
  interface PopupsMap {
    odometer: undefined;
    fuel: undefined;
  }
}

export const popupsRegistry = {
  odometer: PopupOdometer,
  fuel: PopupFuel,
} satisfies TPopupsRegistry;
