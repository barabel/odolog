import { db } from '@/shared/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useActiveVehicleStore } from '../store/active-vehicle.store';
import {
  resolveVehicleRouting,
  type VehicleRoutingState,
} from '../lib/resolve-vehicle-routing';

/**
 * Единый владелец логики Active Vehicle: резолв, валидация param, синк стора,
 * решение про редирект. Тонкая обёртка над чистой resolveVehicleRouting.
 * Единственный писатель стора (один идемпотентный синк-effect).
 */
export const useVehicleRouting = (): VehicleRoutingState => {
  const { vehicleId: paramVehicleId } = useParams<{ vehicleId: string }>();

  const activeVehicleId = useActiveVehicleStore((state) => {
    return state.activeVehicleId;
  });

  const setActiveVehicleId = useActiveVehicleStore((state) => {
    return state.setActiveVehicleId;
  });

  const vehicles = useLiveQuery(() => {
    return db.vehicles.toArray();
  });

  const state = resolveVehicleRouting({
    paramVehicleId,
    vehicles,
    activeVehicleId,
  });

  const syncId = state.status === 'ready' ? state.vehicleId : null;

  useEffect(() => {
    if (syncId && syncId !== activeVehicleId) {
      setActiveVehicleId(syncId);
    }
  }, [syncId, activeVehicleId, setActiveVehicleId]);

  return state;
};
