import { isArrayAndNotEmpty } from '@/shared/helpers/arrays';
import type { TTabbar } from '../types';
import { Icon } from '@/shared/ui/icon';
import cx from 'classix';
import { NavLink } from 'react-router';

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
        const { icon, title, path } = item;

        if (!path) return null;

        return (
          <NavLink
            key={index}
            className={({ isActive }) => {
              return cx(
                'shrink-0 flex flex-col items-center gap-8 p-12 rounded-xl',
                isActive ? 'bg-blue-100' : '',
              );
            }}
            to={path}
          >
            {({ isActive }) => {
              return (
                <>
                  {icon && (
                    <Icon
                      className={cx(
                        isActive ? 'fill-blue-200' : 'fill-black-100',
                      )}
                      icon={icon}
                    />
                  )}

                  {title && (
                    <div
                      className={cx(
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
