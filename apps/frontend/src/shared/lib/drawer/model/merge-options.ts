import type { DrawerOptions } from '../types';

// Гибрид опций шита: registry-дефолт + разовый override через хук. Shallow-мёрдж —
// указанные на вызове ключи перекрывают registry, неуказанные берутся из него.
export const mergeDrawerOptions = (
  base?: DrawerOptions,
  override?: DrawerOptions,
): DrawerOptions => {
  return {
    ...base,
    ...override,
  };
};
