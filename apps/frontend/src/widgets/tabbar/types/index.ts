import type { IconsArray } from '@/shared/enums/icons';

export type TTabbarItem = {
  icon?: IconsArray;
  iconType?: 'fill' | 'stroke';
  title?: string;
  path?: string;
};

export type TTabbar = {
  items?: TTabbarItem[];
};
