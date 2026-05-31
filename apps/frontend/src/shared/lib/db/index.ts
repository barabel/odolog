import Dexie, { type EntityTable } from 'dexie';
import type { TVehicles } from '@odolog/shared';
import i18n from '@/i18n';

export class OdologDb extends Dexie {
  vehicles!: EntityTable<TVehicles, 'id'>;

  constructor() {
    super('odolog');

    this.version(1).stores({
      vehicles: 'id, name',
    });
  }
};

export const db = new OdologDb();

db.on('populate', async () => {
  if (!i18n.isInitialized) {
    await new Promise(resolve => i18n.on('initialized', resolve));
  }

  db.vehicles.add({
    id: crypto.randomUUID(),
    name: i18n.t('db.defaultName'),
  });
});
