import { ROUTES } from '@/shared/config/routes';
import { Navigate } from 'react-router';
import { useVehicleRouting } from '../hooks/use-vehicle-routing';

export const VehicleRedirect: FCClass = () => {
  const state = useVehicleRouting();

  if (state.status !== 'ready') {
    return null;
  }

  return (
    <Navigate
      to={ROUTES.list(state.vehicleId)}
      replace
    />
  );
};
