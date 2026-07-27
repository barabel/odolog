import type { TPopupsRegistry } from '@/shared/lib/popups';
import { PopupDateTimePicker } from './date-time-picker';
import { PopupFuel } from './fuel';
import { PopupMessage } from './message';
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
    message: {
      title: string;
      description?: string;
    };
  }
}

export const popupsRegistry = {
  odometer: PopupOdometer,
  fuel: PopupFuel,
  dateTimePicker: PopupDateTimePicker,
  message: PopupMessage,
} satisfies TPopupsRegistry;
