import { createContext } from 'react';
import type { DrawerActions, Frame } from '../types';

// Разбито на два контекста: actions стабильны (триггеры не ре-рендерятся при
// изменении стека), state меняется — его читает только DrawerStack.
export const DrawerActionsContext = createContext<DrawerActions | null>(null);

export const DrawerStateContext = createContext<Frame[]>([]);
