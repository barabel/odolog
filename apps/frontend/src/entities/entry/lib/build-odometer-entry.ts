import type { TOdometerEntry } from '@odolog/shared';
import { genId } from '@/shared/lib/id';

type TBuildOdometerEntryParams = {
  vehicleId: string;
  measuredAt: number;
  odometer: number;
  now: number;
};

export const buildOdometerEntry = (params: TBuildOdometerEntryParams): TOdometerEntry => {
  const {
    vehicleId,
    measuredAt,
    odometer,
    now,
  } = params;

  return {
    id: genId(),
    type: 'odometer',
    vehicleId,
    measuredAt,
    odometer,
    createdAt: now,
    updatedAt: now,
    synced: false,
    deletedAt: null,
  };
};
