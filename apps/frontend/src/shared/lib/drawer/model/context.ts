import { createContext } from 'react';
import type { DrawerActions, Frame } from '../types';

export const DrawerActionsContext = createContext<DrawerActions | null>(null);

export const DrawerStateContext = createContext<Frame[]>([]);
