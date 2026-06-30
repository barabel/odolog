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

  const entries = useLiveQuery(() => {
    if (!vehicleId) {
      return [];
    }

    return db.entries
      .where('vehicleId')
      .equals(vehicleId)
      .toArray();
  }, [vehicleId]);

  return (
    <div
      className={cx(
        'h-full',
        className,
      )}
    >
      <List
        className="h-full"
        vehicleName={vehicle?.name}
        entries={entries}
      />
    </div>
  );
};
