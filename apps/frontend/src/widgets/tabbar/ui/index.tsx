import { isArrayAndNotEmpty } from '@/shared/helpers/arrays';
import type { TTabbar, TTabbarItem } from '../types';
import { Icon } from '@/shared/ui/icon';
import cx from 'classix';
import { NavLink } from 'react-router';
import { motion } from 'motion/react';

const ACTIVE_BG_LAYOUT_ID = 'tabbar-active-bg' as const;

type TGetIconColorParams = {
  iconType: TTabbarItem['iconType'];
  isActive: boolean;
};

const getIconColor = (params: TGetIconColorParams) => {
  const { iconType, isActive } = params;

  switch (iconType) {
    case 'stroke':
      return isActive ? 'stroke-blue-200' : 'stroke-black-100';
    case 'fill':
    default:
      return isActive ? 'fill-blue-200' : 'fill-black-100';
  }
};

export const Tabbar: FCClass<TTabbar> = ({
  className,
  items,
}) => {
  const hasItems = isArrayAndNotEmpty(items);

  return (
    <div
      className={cx(
        'flex items-center justify-between p-12 border-t-1 border-gray-100',
        className,
      )}
    >
      {hasItems && items.map((item, index) => {
        const {
          icon,
          iconType = 'fill',
          title,
          path,
          end,
        } = item;

        if (!path) return null;

        return (
          <NavLink
            key={index}
            className={cx(
              'relative shrink-0 flex flex-col items-center gap-8 p-12 rounded-xl',
            )}
            to={path}
            end={end}
          >
            {({ isActive }) => {
              return (
                <>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-blue-100 rounded-xl"
                      layoutId={ACTIVE_BG_LAYOUT_ID}
                      transition={{
                        type: 'tween',
                        ease: 'linear',
                        duration: 0.15,
                      }}
                    />
                  )}

                  {icon && (
                    <Icon
                      className={cx(
                        'z-1 relative transition-colors duration-300',
                        getIconColor({ isActive, iconType }),
                      )}
                      icon={icon}
                    />
                  )}

                  {title && (
                    <div
                      className={cx(
                        'z-1 relative transition-colors duration-300',
                        isActive ? 'text-blue-200' : 'text-black-100',
                        't1',
                      )}
                    >
                      {title}
                    </div>
                  )}
                </>
              );
            }}
          </NavLink>
        );
      })}
    </div>
  );
};
