import type { IconsArray } from '@/shared/enums/icons';

type TFabButtonItem = {
  title: string;
  value: string;
  icon: IconsArray;
  iconClassName: string;
};

export type TFabButton = {
  items: TFabButtonItem[];
  onFabItemClick?: (itemValue: TFabButtonItem['value']) => void;
};
