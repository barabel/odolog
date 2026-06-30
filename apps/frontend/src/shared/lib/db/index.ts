import Dexie, { type EntityTable } from 'dexie';
import type { TVehicles, TEntries } from '@odolog/shared';
import i18n from '@/i18n';
import { genVehicleId } from '@/shared/lib/id';

export class OdologDb extends Dexie {
  vehicles!: EntityTable<TVehicles, 'id'>;
  entries!: EntityTable<TEntries, 'id'>;

  constructor() {
    super('odolog');

    this.version(1).stores({
      vehicles: 'id, name',
      entries: 'id, vehicleId, type, measuredAt, synced, deletedAt',
    });
  }
};

export const db = new OdologDb();

db.on('populate', async () => {
  if (!i18n.isInitialized) {
    await new Promise(resolve => i18n.on('initialized', resolve));
  }

  db.vehicles.add({
    id: genVehicleId(),
    name: i18n.t('db.defaultName'),
  });
});
