import { ROUTES } from '@/shared/config/routes';
import { Navigate } from 'react-router';
import { useResolvedVehicleId } from '../hooks/use-resolved-vehicle-id';

export const VehicleRedirect: FCClass = () => {
  const targetId = useResolvedVehicleId();

  if (!targetId) {
    return null;
  }

  return (
    <Navigate
      to={ROUTES.list(targetId)}
      replace
    />
  );
};
