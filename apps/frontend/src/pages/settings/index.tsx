import { db } from '@/shared/lib/db';
import { useActiveVehicleStore } from '@/entities/vehicle';
import cx from 'classix';
import { useLiveQuery } from 'dexie-react-hooks';

export const SettingsPage: FCClass = ({
  className,
}) => {
  const activeVehicleId = useActiveVehicleStore((state) => {
    return state.activeVehicleId;
  });

  const vehicle = useLiveQuery(async () => {
    if (!activeVehicleId) {
      return null;
    }

    return (await db.vehicles.get(activeVehicleId)) ?? null;
  }, [activeVehicleId]);

  return (
    <div
      className={cx(
        't1',
        className,
      )}
    >
      {vehicle?.name}
    </div>
  );
};
