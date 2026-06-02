import cx from 'classix';
import type { TFabButton } from '../types';
import { isArrayAndNotEmpty } from '@/shared/helpers/arrays';

export const FabButton: FCClass<TFabButton> = ({
  className,
  items,
}) => {
  const hasItems = isArrayAndNotEmpty(items);

  return (
    <button
      className={cx(
        className,
      )}
    >
      {hasItems && (
        <div>
          {items.map((item, index) => {
            return (
              <div
                key={index}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      )}

      FabButton
    </button>
  );
};
