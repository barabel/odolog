import { sortEntries } from '@/entities/entry';
import { db } from '@/shared/lib/db';
import { List } from '@/widgets/list';
import cx from 'classix';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router';

export const ListPage: FCClass = ({
  className,
}) => {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const vehicle = useLiveQuery(() => {
    if (!vehicleId) {
      return;
    }

    return db.vehicles.get(vehicleId);
  }, [vehicleId]);

  const entries = useLiveQuery(async () => {
    if (!vehicleId) {
      return [];
    }

    const vehicleEntries = await db.entries
      .where('vehicleId')
      .equals(vehicleId)
      .filter(({ deletedAt }) => {
        return deletedAt === null;
      })
      .toArray();

    return sortEntries(vehicleEntries);
  }, [vehicleId]);

  return (
    <div
      className={cx(
        'h-full',
        className,
      )}
    >
      {vehicleId && (
        <List
          className="h-full"
          vehicleId={vehicleId}
          vehicleName={vehicle?.name}
          entries={entries}
        />
      )}
    </div>
  );
};
