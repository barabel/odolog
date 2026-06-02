import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useActiveVehicleStore } from '../store/active-vehicle.store';

/**
 * Синхронизирует :vehicleId из URL в Zustand-стор.
 * URL — источник истины; стор — производная для страниц без vehicleId в пути.
 */
export const useSyncVehicleIdFromUrl = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const setActiveVehicleId = useActiveVehicleStore((state) => {
    return state.setActiveVehicleId;
  });

  useEffect(() => {
    if (vehicleId) {
      setActiveVehicleId(vehicleId);
    }
  }, [vehicleId, setActiveVehicleId]);
};
