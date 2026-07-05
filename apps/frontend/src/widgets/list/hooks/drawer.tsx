import { useDrawer } from '@/shared/lib/drawer';

export const useDrawerOdometer = () => {
  const { openDrawer } = useDrawer();

  const openDrawerOdometer = () => openDrawer('odometer');

  return {
    openDrawerOdometer,
  };
};

export const useDrawerFuel = () => {
  const { openDrawer } = useDrawer();

  const openDrawerFuel = () => openDrawer('fuel');

  return {
    openDrawerFuel,
  };
};
