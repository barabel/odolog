import type { TPopupsRegistry } from '@/shared/lib/popups';
import { PopupDateTimePicker } from './date-time-picker';
import { PopupFuel } from './fuel';
import { PopupOdometer } from './odometer';

declare module '@/shared/lib/popups' {
  interface PopupsMap {
    odometer: {
      vehicleId: string;
    };
    fuel: undefined;
    dateTimePicker: {
      value: Date;
      onConfirm: (value: Date) => void;
    };
  }
}

export const popupsRegistry = {
  odometer: PopupOdometer,
  fuel: PopupFuel,
  dateTimePicker: PopupDateTimePicker,
} satisfies TPopupsRegistry;
