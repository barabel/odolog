import type { TPopupsRegistry } from '@/shared/lib/popups';
import { PopupDateTimePicker, type TPopupDateTimePicker } from './date-time-picker';
import { PopupFuel, type TPopupFuel } from './fuel';
import { PopupMessage, type TPopupMessage } from './message';
import { PopupOdometer, type TPopupOdometer } from './odometer';

declare module '@/shared/lib/popups' {
  interface PopupsMap {
    odometer: TPopupOdometer;
    fuel: TPopupFuel;
    dateTimePicker: TPopupDateTimePicker;
    message: TPopupMessage;
  }
}

export const popupsRegistry = {
  odometer: PopupOdometer,
  fuel: PopupFuel,
  dateTimePicker: PopupDateTimePicker,
  message: PopupMessage,
} satisfies TPopupsRegistry;
