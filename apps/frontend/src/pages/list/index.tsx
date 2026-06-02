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

  return (
    <div
      className={cx(
        className,
      )}
    >
      <List
        vehicleName={vehicle?.name}
      />
    </div>
  );
};
