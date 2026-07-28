import type { TFuelEntry } from '@odolog/shared';
import { genId } from '@/shared/lib/id';

type TBuildFuelEntryParams = {
  vehicleId: string;
  measuredAt: number;
  odometer: number;
  liters: number;
  totalCost: number;
  now: number;
};

export const buildFuelEntry = (params: TBuildFuelEntryParams): TFuelEntry => {
  const {
    vehicleId,
    measuredAt,
    odometer,
    liters,
    totalCost,
    now,
  } = params;

  return {
    id: genId(),
    type: 'fuel',
    vehicleId,
    measuredAt,
    odometer,
    liters,
    totalCost,
    createdAt: now,
    updatedAt: now,
    synced: false,
    deletedAt: null,
  };
};
