import type React from 'react';
import type { RefObject } from 'react';
import type { IconsArray } from '@/shared/enums/icons';

export interface IIconProps {
  /** Название иконки */
  icon: IconsArray | `${IconsArray}`;
  /** Ширина иконки */
  width?: number | string;
  /** Высота иконки */
  height?: number | string;
  /** Инлайн-стили */
  style?: React.CSSProperties;
  ref?: RefObject<SVGSVGElement | null>;
}

export type TIcon = IIconProps & React.SVGProps<SVGSVGElement>;
