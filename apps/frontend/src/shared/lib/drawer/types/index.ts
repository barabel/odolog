import type { DialogProps } from 'vaul';
import type { ComponentType } from 'react';

// Подмножество опций vaul, задаваемых на шит (registry-дефолт + override через хук).
export type DrawerOptions = Pick<
  DialogProps,
  'snapPoints' | 'dismissible' | 'direction' | 'modal'
>;

export type Frame = {
  id: string;
  key: string;
  props?: unknown;
  options?: DrawerOptions;
  open: boolean;
};

export type DrawerStackAction
  = | { type: 'open'; frame: Frame }
    | { type: 'close' }
    | { type: 'remove'; id: string };

// Начинка шита — обычный компонент, свободный от vaul.
export type DrawerRegistryEntry = {
  component: ComponentType<any>;
  options?: DrawerOptions;
};

export type DrawerRegistry = Record<string, DrawerRegistryEntry>;

// Ключи шитов. Расширяется через declaration merging в слое widgets/drawers,
// чтобы `openDrawer(key)` автодополнялся и ловил опечатку на компиляции.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerRegistryMap {}

export type DrawerKey = keyof DrawerRegistryMap;

export type DrawerActions = {
  openDrawer: (key: DrawerKey, props?: unknown, options?: DrawerOptions) => void;
  closeDrawer: () => void;
};
