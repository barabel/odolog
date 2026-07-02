import { useContext } from 'react';
import { DrawerActionsContext } from './context';
import type { DrawerActions } from '../types';

export const useDrawer = (): DrawerActions => {
  const actions = useContext(DrawerActionsContext);

  if (!actions) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }

  return actions;
};
