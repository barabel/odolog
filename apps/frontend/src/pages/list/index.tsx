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

  const odometerEntries = useLiveQuery(() => {
    if (!vehicleId) {
      return [];
    }

    return db.odometerEntries
      .where('vehicleId')
      .equals(vehicleId)
      .toArray();
  }, [vehicleId]);

  const fuelEntries = useLiveQuery(() => {
    if (!vehicleId) {
      return [];
    }

    return db.fuelEntries
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
        fuelEntries={fuelEntries}
        odometerEntries={odometerEntries}
      />
    </div>
  );
};
