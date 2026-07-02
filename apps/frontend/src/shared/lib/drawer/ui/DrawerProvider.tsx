import { useMemo, useReducer, type ReactNode } from 'react';
import { genId } from '@/shared/lib/id';
import { drawerStackReducer } from '../model/reducer';
import { DrawerActionsContext, DrawerStateContext } from '../model/context';
import { DrawerStack } from './DrawerStack';
import type { DrawerActions, DrawerRegistry } from '../types';

type TDrawerProvider = {
  registry: DrawerRegistry;
  children: ReactNode;
};

export const DrawerProvider = ({
  registry,
  children,
}: TDrawerProvider) => {
  const [stack, dispatch] = useReducer(drawerStackReducer, []);

  // Стабильные ссылки — триггеры через useDrawer() не ре-рендерятся на стеке.
  const actions = useMemo<DrawerActions>(() => {
    return {
      openDrawer: (key, props, options) => {
        const entry = registry[key];

        dispatch({
          type: 'open',
          frame: {
            id: genId(),
            key,
            props,
            options: {
              ...entry?.options,
              ...options,
            },
            open: true,
          },
        });
      },
      closeDrawer: () => {
        dispatch({ type: 'close' });
      },
      closeAll: () => {
        dispatch({ type: 'closeAll' });
      },
    };
  }, [registry]);

  return (
    <DrawerActionsContext.Provider
      value={actions}
    >
      <DrawerStateContext.Provider
        value={stack}
      >
        {children}

        <DrawerStack
          registry={registry}
          dispatch={dispatch}
        />
      </DrawerStateContext.Provider>
    </DrawerActionsContext.Provider>
  );
};
