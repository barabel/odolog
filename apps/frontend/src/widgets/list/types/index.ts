import type { TFuelEntries, TOdometerEntries } from '@odolog/shared';

export type TList = {
  vehicleName?: string;
  odometerEntries?: TOdometerEntries[];
  fuelEntries?: TFuelEntries[];
};
