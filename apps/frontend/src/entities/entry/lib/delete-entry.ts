import { db } from '@/shared/lib/db';

export const deleteEntry = (id: string) => {
  const now = Date.now();

  return db.entries.update(id, {
    deletedAt: now,
    updatedAt: now,
    synced: false,
  });
};
