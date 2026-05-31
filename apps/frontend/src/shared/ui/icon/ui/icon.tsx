import cx from 'classix';
import type { TIcon } from '../types';

export const Icon = ({
  className,
  icon,
  width = 20,
  height = 20,
  style,
  ref,
  ...otherProps
}: TIcon) => (
  <svg
    ref={ref}
    className={cx('inline-block shrink-0 align-top', className)}
    width={width}
    height={height}
    style={style}
    {...otherProps}
  >
    <use href={`/sprite.svg#${icon}`} />
  </svg>
);
