import type { IconsArray } from '@/shared/enums/icons';

type TTabbarItem = {
  icon?: IconsArray;
  title?: string;
  path?: string;
};

export type TTabbar = {
  items?: TTabbarItem[];
};
