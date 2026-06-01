import { db } from '@/shared/lib/db';
import { List } from '@/widgets/list';
import cx from 'classix';
import { useLiveQuery } from 'dexie-react-hooks';
import { Navigate, useParams } from 'react-router';

export const ListPage: FCClass = ({
  className,
}) => {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const vehicle = useLiveQuery(async () => {
    if (!vehicleId) {
      return null;
    }

    return (await db.vehicles.get(vehicleId)) ?? null;
  }, [vehicleId]);

  if (vehicle === null) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

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
