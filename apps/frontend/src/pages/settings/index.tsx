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

  const vehicle = useLiveQuery(() => {
    if (!activeVehicleId) {
      return;
    }

    return db.vehicles.get(activeVehicleId);
  }, [activeVehicleId]);

  return (
    <div
      className={cx(
        't2',
        className,
      )}
    >
      {vehicle?.name}
    </div>
  );
};
