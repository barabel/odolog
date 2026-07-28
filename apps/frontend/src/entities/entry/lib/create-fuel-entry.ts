import { db } from '@/shared/lib/db';
import { buildFuelEntry } from './build-fuel-entry';

type TCreateFuelEntryInput = {
  vehicleId: string;
  measuredAt: number;
  odometer: number;
  liters: number;
  totalCost: number;
};

export const createFuelEntry = (input: TCreateFuelEntryInput) => {
  const entry = buildFuelEntry({
    ...input,
    now: Date.now(),
  });

  return db.entries.add(entry);
};
