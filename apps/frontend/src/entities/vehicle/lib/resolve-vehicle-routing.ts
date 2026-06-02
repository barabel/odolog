import { ROUTES } from '@/shared/config/routes';
import type { TVehicles } from '@odolog/shared';

export type VehicleRoutingState
  = | { status: 'loading' }
    | { status: 'redirect'; to: string }
    | { status: 'ready'; vehicleId: string };

type TResolveVehicleRoutingArgs = {
  paramVehicleId: string | undefined;
  vehicles: TVehicles[] | undefined;
  activeVehicleId: string | null;
};

/**
 * Чистая функция резолва Active Vehicle: вся матрица решений в одном месте,
 * без React/Dexie/zustand. URL — источник правды (ADR 0001).
 */
export const resolveVehicleRouting = ({
  paramVehicleId,
  vehicles,
  activeVehicleId,
}: TResolveVehicleRoutingArgs): VehicleRoutingState => {
  if (!vehicles?.length) {
    return { status: 'loading' };
  }

  const storeValid = vehicles.some((vehicle) => {
    return vehicle.id === activeVehicleId;
  });

  const resolved = storeValid ? activeVehicleId! : vehicles[0].id;

  if (!paramVehicleId) {
    return { status: 'ready', vehicleId: resolved };
  }

  const paramValid = vehicles.some((vehicle) => {
    return vehicle.id === paramVehicleId;
  });

  if (paramValid) {
    return { status: 'ready', vehicleId: paramVehicleId };
  }

  return { status: 'redirect', to: ROUTES.list(resolved) };
};
