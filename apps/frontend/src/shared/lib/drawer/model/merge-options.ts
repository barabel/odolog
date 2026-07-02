import type { DrawerOptions } from '../types';

export const mergeDrawerOptions = (
  base?: DrawerOptions,
  override?: DrawerOptions,
): DrawerOptions => {
  return {
    ...base,
    ...override,
  };
};
