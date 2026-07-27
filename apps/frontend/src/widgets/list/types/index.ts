import type { TEntries } from '@odolog/shared';

export type TList = {
  vehicleId: string;
  vehicleName?: string;
  entries?: TEntries[];
};
