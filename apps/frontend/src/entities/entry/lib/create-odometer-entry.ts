import { db } from '@/shared/lib/db';
import { buildOdometerEntry } from './build-odometer-entry';

type TCreateOdometerEntryInput = {
  vehicleId: string;
  measuredAt: number;
  odometer: number;
};

export const createOdometerEntry = (input: TCreateOdometerEntryInput) => {
  const entry = buildOdometerEntry({
    ...input,
    now: Date.now(),
  });

  return db.entries.add(entry);
};
