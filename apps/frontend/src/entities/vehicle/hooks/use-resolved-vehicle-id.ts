import { db } from '@/shared/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { useActiveVehicleStore } from '../store/active-vehicle.store';

/**
 * Возвращает ID активного ТС, если оно существует в БД, иначе — ID первого доступного.
 * Если стор устарел (ID не в БД), синкает стор на первый доступный.
 * Null пока список не загружен или пуст.
 */
export const useResolvedVehicleId = (): string | null => {
  const activeVehicleId = useActiveVehicleStore((state) => {
    return state.activeVehicleId;
  });

  const setActiveVehicleId = useActiveVehicleStore((state) => {
    return state.setActiveVehicleId;
  });

  const vehicles = useLiveQuery(() => {
    return db.vehicles.toArray();
  });

  const exists = vehicles?.some((vehicle) => {
    return vehicle.id === activeVehicleId;
  }) ?? false;

  const fallbackId = !exists && vehicles?.length ? vehicles[0].id : null;

  useEffect(() => {
    if (fallbackId) {
      setActiveVehicleId(fallbackId);
    }
  }, [fallbackId, setActiveVehicleId]);

  if (!vehicles?.length) {
    return null;
  }

  return exists ? activeVehicleId! : vehicles[0].id;
};
