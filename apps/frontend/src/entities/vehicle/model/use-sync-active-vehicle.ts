import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useActiveVehicleStore } from './active-vehicle.store';

// Зеркалит vehicleId из URL в store (URL — источник правды).
// Вызывается там, где в URL есть :vehicleId (list/analytics).
export const useSyncActiveVehicle = () => {
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
